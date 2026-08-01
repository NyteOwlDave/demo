#!/usr/bin/env python3
# trs80_basic_final.py
# TRS-80 Level II style BASIC interpreter with extended Level II features:
# - Extended KEYWORDS
# - Math and string functions (ABS,SIN,COS,TAN,ATN,EXP,LOG,SQR,SGN,VAL,STR$,CHR$,ASC,INSTR)
# - TAB(n), SPC(n)
# - File I/O: OPEN, CLOSE, PRINT#, INPUT#, GET, PUT, EOF, LOF, LSET, RSET, CLOAD, CSAVE
# - DEF FN user functions and FN(...) evaluation
# - USR/DEFUSR/CALL placeholders
# - ON ERROR GOTO / ON ERROR RESUME NEXT
# - RANDOMIZE and SYSTEM
# - Preserves original behavior and REPL commands (RUN, LIST, NEW, SAVE, LOAD, QUIT)
import re, sys, random, os, threading, time, json, math

# Cross-platform key detection imports
try:
    import msvcrt  # Windows
    _HAS_MS = True
except Exception:
    _HAS_MS = False
    import tty, termios, select

# Program storage and runtime state
program = {}                # line_no -> token list
memory = bytearray(0x10000) # 64KB memory for PEEK/POKE
vars_num = {}
vars_str = {}
arrays = {}
data_pool = []
data_ptr = 0
pc = None
call_stack = []
for_stack = []
running = False

# File and user-function tables, error handler, RNG seed
open_files = {}    # channel -> {'file': fileobj, 'mode': mode}
user_fns = {}      # name -> (param_list, token_list)
error_handler = None  # None or ('GOTO', line) or ('RESUME',)
break_requested = False
_key_listener_thread = None
_key_listener_stop = None
_term_settings = None

# Extended Level II / common BASIC keywords and functions
KEYWORDS = {
    'PRINT','LET','INPUT','IF','THEN','GOTO','GOSUB','RETURN','FOR','TO','STEP','NEXT',
    'DIM','READ','RESTORE','DATA','ON','STOP','END','REM','POKE','PEEK','RND','INT',
    'LEN','LEFT$','RIGHT$','MID$','LIST','RUN','NEW','SAVE','LOAD','QUIT','EXIT',
    'ABS','ATN','COS','EXP','LOG','SGN','SQR','SIN','TAN','VAL','STR$','CHR$','ASC',
    'TAB','SPC','USING','DEF','FN','USR','OPEN','CLOSE','PRINT#','INPUT#','FIELD','GET',
    'PUT','EOF','LOF','LSET','RSET','CLOAD','CSAVE','CALL','SYSTEM','INSTR','RANDOMIZE',
    'ON','ERROR','DEFUSR'
}

# Tokenizer
token_re = re.compile(r'''
    "(?:[^"]*)"            |   # quoted strings
    \d+\.\d+               |   # floats
    \d+                    |   # integers
    [A-Za-z]\w*\$?         |   # identifiers (may end with $)
    <=|>=|<>               |   # multi-char relational
    [=+\-*/(),:<>]             # single-char tokens
''', re.VERBOSE)

def tokenize_line(src):
    src = src.rstrip()
    m = re.match(r'^\s*(\d+)\s*(.*)$', src)
    if not m:
        return None, None
    ln = int(m.group(1))
    rest = m.group(2)
    toks = token_re.findall(rest)
    norm = []
    for t in toks:
        if re.match(r'^[A-Za-z]\w*\$?$', t):
            up = t.upper()
            if up in KEYWORDS:
                norm.append(up)
            else:
                norm.append(t)
        else:
            norm.append(t)
    return ln, norm

# --- Expression evaluator and runtime helpers ---
def is_string_var(name): return name.endswith('$')
def get_var(name): return vars_str.get(name, "") if is_string_var(name) else vars_num.get(name, 0.0)
def set_var(name, value):
    if is_string_var(name): vars_str[name] = str(value)
    else:
        try: vars_num[name] = float(value)
        except: vars_num[name] = 0.0

def eval_expr(tokens, i=0):
    val, i = eval_relational(tokens, i)
    return val, i

def eval_relational(tokens, i):
    left, i = eval_addsub(tokens, i)
    if i < len(tokens) and tokens[i] in ('=','<>','<','>','<=','>='):
        op = tokens[i]; i += 1
        right, i = eval_addsub(tokens, i)
        if op == '=': return (1.0 if left == right else 0.0), i
        if op == '<>': return (1.0 if left != right else 0.0), i
        if op == '<': return (1.0 if left < right else 0.0), i
        if op == '>': return (1.0 if left > right else 0.0), i
        if op == '<=': return (1.0 if left <= right else 0.0), i
        if op == '>=': return (1.0 if left >= right else 0.0), i
    return left, i

def eval_addsub(tokens, i):
    val, i = eval_muldiv(tokens, i)
    while i < len(tokens) and tokens[i] in ('+','-'):
        op = tokens[i]; i += 1
        rhs, i = eval_muldiv(tokens, i)
        if isinstance(val, str) or isinstance(rhs, str):
            val = str(val) + str(rhs) if op == '+' else 0.0
        else:
            val = val + rhs if op == '+' else val - rhs
    return val, i

def eval_muldiv(tokens, i):
    val, i = eval_unary(tokens, i)
    while i < len(tokens) and tokens[i] in ('*','/'):
        op = tokens[i]; i += 1
        rhs, i = eval_unary(tokens, i)
        val = val * rhs if op == '*' else (val / rhs if rhs != 0 else 0)
    return val, i

def eval_unary(tokens, i):
    if i < len(tokens) and tokens[i] == '-':
        v, j = eval_primary(tokens, i+1)
        return (-v if not isinstance(v, str) else 0.0), j
    return eval_primary(tokens, i)

def eval_primary(tokens, i):
    if i >= len(tokens): return 0, i
    t = tokens[i]
    if t == '(':
        v, j = eval_expr(tokens, i+1)
        if j < len(tokens) and tokens[j] == ')': j += 1
        return v, j
    if re.match(r'^\d+(\.\d+)?$', t):
        return (float(t) if '.' in t else int(t)), i+1
    if t.startswith('"') and t.endswith('"'):
        return t[1:-1], i+1

    up = t.upper()

    # RND and RANDOMIZE
    if up == 'RND':
        if i+1 < len(tokens) and tokens[i+1] == '(':
            return random.random(), i+3 if i+3<=len(tokens) else i+2
        return random.random(), i+1
    if up == 'RANDOMIZE':
        # RANDOMIZE [seed]
        if i+1 < len(tokens) and tokens[i+1] == '(':
            v, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            random.seed(int(v))
            return 0, j
        random.seed()
        return 0, i+1

    # Numeric and string functions (ABS,SIN,COS,TAN,ATN,EXP,LOG,SQR,SGN)
    if up in ('ABS','SIN','COS','TAN','ATN','EXP','LOG','SQR','SGN'):
        if i+1 < len(tokens) and tokens[i+1] == '(':
            v, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            try: fv = float(v)
            except: fv = 0.0
            if up == 'ABS': return abs(fv), j
            if up == 'SIN': return math.sin(fv), j
            if up == 'COS': return math.cos(fv), j
            if up == 'TAN': return math.tan(fv), j
            if up == 'ATN': return math.atan(fv), j
            if up == 'EXP': return math.exp(fv), j
            if up == 'LOG': return math.log(fv), j
            if up == 'SQR': return math.sqrt(max(0.0, fv)), j
            if up == 'SGN': return (1.0 if fv>0 else (-1.0 if fv<0 else 0.0)), j

    if up == 'VAL':
        if i+1 < len(tokens) and tokens[i+1] == '(':
            v, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            try: return float(str(v)), j
            except: return 0.0, j

    if up == 'STR$':
        if i+1 < len(tokens) and tokens[i+1] == '(':
            v, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            return str(v), j

    if up == 'CHR$':
        if i+1 < len(tokens) and tokens[i+1] == '(':
            v, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            return chr(int(v) & 0xFF), j

    if up == 'ASC':
        if i+1 < len(tokens) and tokens[i+1] == '(':
            v, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            s = str(v)
            return ord(s[0]) if s else 0, j

    if up == 'INSTR':
        # INSTR([start,] s1, s2)
        if i+1 < len(tokens) and tokens[i+1] == '(':
            args = []
            j = i+2
            while j < len(tokens) and tokens[j] != ')':
                if tokens[j] == ',': j += 1; continue
                a, j = eval_expr(tokens, j)
                args.append(a)
            if j < len(tokens) and tokens[j] == ')': j += 1
            if len(args) == 2:
                s1 = str(args[0]); s2 = str(args[1]); pos = s1.find(s2)
                return (pos+1 if pos>=0 else 0), j
            if len(args) == 3:
                start = int(args[0]); s1 = str(args[1]); s2 = str(args[2])
                pos = s1.find(s2, max(0, start-1))
                return (pos+1 if pos>=0 else 0), j

    if up in ('TAB','SPC'):
        if i+1 < len(tokens) and tokens[i+1] == '(':
            v, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            n = int(v) if v else 0
            return ' ' * max(0, n), j

    # User-defined FN calls: FNname(args)
    if re.match(r'^FN[A-Za-z]\w*$', up):
        # token like FNX or FNFOO; user_fns keys stored without 'FN' prefix
        fname = up[2:]
        if fname in user_fns and i+1 < len(tokens) and tokens[i+1] == '(':
            args = []
            j = i+2
            while j < len(tokens) and tokens[j] != ')':
                if tokens[j] == ',': j += 1; continue
                a, j = eval_expr(tokens, j)
                args.append(a)
            if j < len(tokens) and tokens[j] == ')': j += 1
            params, expr_toks = user_fns[fname]
            # save current vars
            saved_num = vars_num.copy()
            saved_str = vars_str.copy()
            # set params
            for p, a in zip(params, args):
                if p.endswith('$'): vars_str[p] = str(a)
                else: vars_num[p] = float(a)
            # evaluate expression tokens
            val, _ = eval_expr(expr_toks, 0)
            # restore
            vars_num.clear(); vars_num.update(saved_num)
            vars_str.clear(); vars_str.update(saved_str)
            return val, j

    # array access, variables, PEEK, etc.
    if re.match(r'^[A-Za-z]\w*\$?$', t):
        if i+1 < len(tokens) and tokens[i+1] == '(':
            idx, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            name = t
            arr = arrays.get(name)
            if arr is None: return 0, j
            idx = int(idx)
            return arr[idx] if 0 <= idx < len(arr) else 0, j
        if is_string_var(t): return vars_str.get(t, ""), i+1
        return vars_num.get(t, 0.0), i+1

    if t.upper() == 'PEEK':
        if i+1 < len(tokens) and tokens[i+1] == '(':
            v, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            addr = int(v) & 0xFFFF
            return memory[addr], j

    # USR placeholder: returns 0 by default
    if up == 'USR':
        if i+1 < len(tokens) and tokens[i+1] == '(':
            # evaluate argument but return 0 (placeholder)
            _, j = eval_expr(tokens, i+2)
            if j < len(tokens) and tokens[j] == ')': j += 1
            return 0, j
        return 0, i+1

    return 0, i+1

# --- Execution of a single tokenized line ---
def exec_line(tokens):
    global pc, data_ptr, running, break_requested, error_handler
    if not tokens: return
    cmd = tokens[0].upper()
    if cmd == 'REM': return

    # PRINT (chunked to allow break checks)
    if cmd == 'PRINT':
        i = 1
        out_parts = []
        sep = ' '
        while i < len(tokens):
            if tokens[i] == ',':
                sep = '\t'; i += 1; continue
            if tokens[i] == ';':
                sep = ''; i += 1; continue
            v, i = eval_expr(tokens, i)
            out_parts.append(str(v))
            sep = ' '
            if break_requested:
                pc = None
                running = False
                print("\n*** BREAK (Escape pressed) ***")
                return
        if out_parts:
            print(sep.join(out_parts), end='')
        print()
        return

    # PRINT# (file output)
    if cmd == 'PRINT#':
        # Accept forms: PRINT# n, exprs  or PRINT# #n, exprs
        if len(tokens) >= 2:
            # find channel token
            i = 1
            chtok = tokens[i]
            if chtok == ',' and len(tokens) >= 3:
                i += 1
                chtok = tokens[i]
            # normalize channel
            ch = None
            if isinstance(chtok, str) and chtok.startswith('#'):
                try: ch = int(chtok[1:])
                except: ch = None
                i += 1
            else:
                try:
                    ch = int(chtok)
                    i += 1
                except:
                    # maybe token was '#', next token is number
                    if chtok == '#':
                        if i+1 < len(tokens):
                            try: ch = int(tokens[i+1]); i += 2
                            except: ch = None
            if ch is None or ch not in open_files:
                print("PRINT# error: channel not open"); return
            f = open_files[ch]['file']
            # skip optional comma
            if i < len(tokens) and tokens[i] == ',': i += 1
            parts = []
            while i < len(tokens):
                if tokens[i] == ',': i += 1; continue
                v, i = eval_expr(tokens, i)
                parts.append(str(v))
            try:
                f.write(' '.join(parts) + '\n')
                f.flush()
            except Exception as e:
                print("PRINT# write error:", e)
        return

    # LET
    if cmd == 'LET':
        if len(tokens) >= 4 and tokens[2] == '=':
            name = tokens[1]; val, _ = eval_expr(tokens, 3); set_var(name, val)
        return

    # INPUT (robust)
    if cmd == 'INPUT':
        stop_key_listener()
        try:
            i = 1
            prompt = ''
            if i < len(tokens) and isinstance(tokens[i], str) and tokens[i].startswith('"'):
                if tokens[i].endswith('"') and len(tokens[i]) > 1:
                    prompt = tokens[i][1:-1] + ' '
                    i += 1
                else:
                    parts = [tokens[i]]
                    i += 1
                    while i < len(tokens) and not parts[-1].endswith('"'):
                        parts.append(tokens[i]); i += 1
                    joined = ' '.join(parts)
                    if joined.startswith('"') and joined.endswith('"'):
                        prompt = joined[1:-1] + ' '
                    else:
                        prompt = joined.strip('"') + ' '
                if i < len(tokens) and tokens[i] in (',', ';'):
                    i += 1
            vars_to_read = []
            while i < len(tokens) and tokens[i] in (',', ';'):
                i += 1
            while i < len(tokens):
                tok = tokens[i]
                if tok in (',', ';'):
                    i += 1; continue
                if isinstance(tok, str):
                    name = tok.strip()
                    if name:
                        vars_to_read.append(name)
                i += 1
            if not vars_to_read:
                try:
                    raw = input(prompt if prompt else '? ')
                except EOFError:
                    raw = ''
                return
            time.sleep(0.03)
            for vname in vars_to_read:
                try:
                    raw = input(prompt if prompt else '? ')
                except EOFError:
                    raw = ''
                raw = raw.strip()
                if vname.endswith('$'):
                    vars_str[vname] = raw
                else:
                    if raw == '':
                        vars_num[vname] = 0.0
                    else:
                        try:
                            if re.match(r'^[+-]?\d+$', raw):
                                vars_num[vname] = int(raw)
                            else:
                                vars_num[vname] = float(raw)
                        except Exception:
                            vars_num[vname] = 0.0
                prompt = ''
        finally:
            start_key_listener()
        return

    # INPUT# (file input)
    if cmd == 'INPUT#':
        # INPUT# ch, varlist
        if len(tokens) >= 2:
            i = 1
            chtok = tokens[i]
            if chtok == ',' and len(tokens) >= 3:
                i += 1; chtok = tokens[i]
            ch = None
            if isinstance(chtok, str) and chtok.startswith('#'):
                try: ch = int(chtok[1:])
                except: ch = None
                i += 1
            else:
                try:
                    ch = int(chtok); i += 1
                except:
                    if chtok == '#':
                        if i+1 < len(tokens):
                            try: ch = int(tokens[i+1]); i += 2
                            except: ch = None
            if ch is None or ch not in open_files:
                print("INPUT# error: channel not open"); return
            f = open_files[ch]['file']
            # skip comma
            if i < len(tokens) and tokens[i] == ',': i += 1
            vars_to_read = []
            while i < len(tokens):
                if tokens[i] == ',': i += 1; continue
                vars_to_read.append(tokens[i]); i += 1
            # read one line and assign to variables sequentially
            try:
                line = f.readline()
            except Exception as e:
                print("INPUT# read error:", e); line = ''
            if line is None: line = ''
            line = line.rstrip('\n').rstrip('\r')
            parts = [p.strip() for p in line.split(',')]
            for idx, vname in enumerate(vars_to_read):
                val = parts[idx] if idx < len(parts) else ''
                if isinstance(vname, str) and vname.endswith('$'):
                    vars_str[vname] = val
                else:
                    try:
                        vars_num[vname] = float(val) if val != '' else 0.0
                    except:
                        vars_num[vname] = 0.0
        return

    # GOTO
    if cmd == 'GOTO':
        if len(tokens) >= 2: pc = int(tokens[1]); return

    # GOSUB
    if cmd == 'GOSUB':
        if len(tokens) >= 2:
            call_stack.append(next_line(pc)); pc = int(tokens[1]); return

    # RETURN
    if cmd == 'RETURN':
        pc = call_stack.pop() if call_stack else None; return

    # IF ... THEN
    if cmd == 'IF':
        up = [t.upper() for t in tokens]
        if 'THEN' in up:
            ti = up.index('THEN'); cond_tokens = tokens[1:ti]; val, _ = eval_expr(cond_tokens, 0)
            if val != 0 and ti+1 < len(tokens): pc = int(tokens[ti+1])
        return

    # FOR
    if cmd == 'FOR':
        if len(tokens) >= 6 and tokens[2] == '=':
            var = tokens[1]; start, idx = eval_expr(tokens, 3)
            if 'TO' in [t.upper() for t in tokens]:
                ti = [t.upper() for t in tokens].index('TO')
                end, j = eval_expr(tokens, ti+1)
                step = 1
                if 'STEP' in [t.upper() for t in tokens]:
                    si = [t.upper() for t in tokens].index('STEP'); step, _ = eval_expr(tokens, si+1)
                set_var(var, start); for_stack.append((var, float(end), float(step), next_line(pc)))
        return

    # NEXT (checks break each iteration)
    if cmd == 'NEXT':
        if len(tokens) >= 2:
            var = tokens[1]
            if not for_stack: return
            for i in range(len(for_stack)-1, -1, -1):
                vname, end, step, ret = for_stack[i]
                if vname == var:
                    cur = get_var(vname)
                    cur = float(cur) + float(step)
                    set_var(vname, cur)
                    if break_requested:
                        pc = None
                        running = False
                        print("\n*** BREAK (Escape pressed) ***")
                        return
                    if (step > 0 and cur <= end) or (step < 0 and cur >= end):
                        pc = ret
                    else:
                        for_stack.pop(i)
                    return
        return

    # DIM
    if cmd == 'DIM':
        if len(tokens) >= 3:
            name = tokens[1]
            if tokens[2] == '(' and tokens[-1] == ')':
                size_tok = tokens[3]
                size = int(size_tok) if re.match(r'^\d+$', size_tok) else int(eval_expr(tokens,3)[0])
                arrays[name] = [0]*size
        return

    # DATA
    if cmd == 'DATA':
        i = 1
        while i < len(tokens):
            if tokens[i] == ',': i += 1; continue
            t = tokens[i]
            if t.startswith('"') and t.endswith('"'): data_pool.append(t[1:-1])
            elif re.match(r'^\d+(\.\d+)?$', t): data_pool.append(float(t) if '.' in t else int(t))
            else: v, _ = eval_expr(tokens, i); data_pool.append(v)
            i += 1
        return

    # READ
    if cmd == 'READ':
        global data_ptr
        if len(tokens) >= 2:
            name = tokens[1]
            if data_ptr < len(data_pool): val = data_pool[data_ptr]; data_ptr += 1; set_var(name, val)
            else: set_var(name, 0)
        return

    # RESTORE
    if cmd == 'RESTORE':
        data_ptr = 0; return

    # ON ... GOTO ...
    if cmd == 'ON':
        up = [t.upper() for t in tokens]
        if 'GOTO' in up:
            gi = up.index('GOTO'); val, _ = eval_expr(tokens, 1); idx = int(val) - 1
            targets = [int(t) for t in tokens[gi+1:] if t != ',']
            if 0 <= idx < len(targets): pc = targets[idx]
        if 'ERROR' in up:
            # ON ERROR GOTO n  or ON ERROR RESUME NEXT
            if 'GOTO' in up:
                gi = up.index('GOTO'); ifi = gi+1
                if ifi < len(tokens):
                    try:
                        ln = int(tokens[ifi]); error_handler = ('GOTO', ln)
                    except:
                        error_handler = None
            elif 'RESUME' in up:
                # ON ERROR RESUME NEXT
                error_handler = ('RESUME',)
        return

    # POKE
    if cmd == 'POKE':
        if len(tokens) >= 4 and tokens[2] == ',':
            addr = int(eval_expr(tokens,1)[0]) & 0xFFFF; val = int(eval_expr(tokens,3)[0]) & 0xFF; memory[addr] = val
        return

    # STOP / END
    if cmd in ('STOP','END'):
        pc = None
        running = False
        break_requested = False
        try:
            stop_key_listener()
        except Exception:
            pass
        return

    # OPEN
    if cmd == 'OPEN':
        # Very permissive parsing: OPEN "mode",#n,"filename" or OPEN #n,"filename" or OPEN #n,filename
        try:
            # Reconstruct the argument string for easier parsing
            args = ' '.join(tokens[1:])
            # Try patterns: "mode",#n,"filename"
            m = re.match(r'\"?([A-Za-z]*)\"?\s*,\s*#?(\d+)\s*,\s*\"([^\"]+)\"', args)
            if m:
                mode_str, chs, fname = m.group(1), int(m.group(2)), m.group(3)
                mode = 'r'
                if mode_str.upper().startswith('W') or mode_str.upper().startswith('O'):
                    mode = 'w'
                if 'B' in mode_str.upper():
                    mode += 'b'
                f = open(fname, mode)
                open_files[chs] = {'file': f, 'mode': mode}
                print(f"Opened channel {chs} -> {fname}")
                return
            # Try pattern: #n,"filename"
            m2 = re.match(r'#?(\d+)\s*,\s*\"([^\"]+)\"', args)
            if m2:
                chs, fname = int(m2.group(1)), m2.group(2)
                f = open(fname, 'r')
                open_files[chs] = {'file': f, 'mode': 'r'}
                print(f"Opened channel {chs} -> {fname}")
                return
            # Try pattern: #n,filename (unquoted)
            m3 = re.match(r'#?(\d+)\s*,\s*([^\s]+)', args)
            if m3:
                chs, fname = int(m3.group(1)), m3.group(2)
                f = open(fname, 'r')
                open_files[chs] = {'file': f, 'mode': 'r'}
                print(f"Opened channel {chs} -> {fname}")
                return
        except Exception as e:
            print("OPEN error:", e)
        return

    # CLOSE
    if cmd == 'CLOSE':
        if len(tokens) >= 2:
            t = tokens[1]
            ch = None
            if isinstance(t, str) and t.startswith('#'):
                try: ch = int(t[1:])
                except: ch = None
            else:
                try: ch = int(t)
                except: ch = None
            if ch is not None and ch in open_files:
                try: open_files[ch]['file'].close()
                except: pass
                open_files.pop(ch, None)
                return
        # close all
        for ch, info in list(open_files.items()):
            try: info['file'].close()
            except: pass
            open_files.pop(ch, None)
        return

    # GET (read one byte) - GET #n, var
    if cmd == 'GET':
        if len(tokens) >= 3:
            # tokens like GET, #, n, ',', var  or GET, #n, ',', var
            i = 1
            chtok = tokens[i]
            ch = None
            if chtok == '#':
                if i+1 < len(tokens):
                    try: ch = int(tokens[i+1]); i += 2
                    except: ch = None
            elif isinstance(chtok, str) and chtok.startswith('#'):
                try: ch = int(chtok[1:]); i += 1
                except: ch = None
            else:
                try: ch = int(chtok); i += 1
                except: ch = None
            # skip comma
            if i < len(tokens) and tokens[i] == ',': i += 1
            if i < len(tokens):
                vname = tokens[i]
                if ch is None or ch not in open_files:
                    print("GET error: channel not open"); return
                f = open_files[ch]['file']
                try:
                    b = f.read(1)
                except Exception as e:
                    print("GET read error:", e); b = ''
                if b == '':
                    # EOF
                    if isinstance(vname, str) and vname.endswith('$'):
                        vars_str[vname] = ''
                    else:
                        vars_num[vname] = 0.0
                else:
                    if isinstance(vname, str) and vname.endswith('$'):
                        vars_str[vname] = b
                    else:
                        vars_num[vname] = float(ord(b[0]) if isinstance(b, str) else b[0])
        return

    # PUT (write one byte) - PUT #n, var
    if cmd == 'PUT':
        if len(tokens) >= 3:
            i = 1
            chtok = tokens[i]
            ch = None
            if chtok == '#':
                if i+1 < len(tokens):
                    try: ch = int(tokens[i+1]); i += 2
                    except: ch = None
            elif isinstance(chtok, str) and chtok.startswith('#'):
                try: ch = int(chtok[1:]); i += 1
                except: ch = None
            else:
                try: ch = int(chtok); i += 1
                except: ch = None
            if i < len(tokens) and tokens[i] == ',': i += 1
            if i < len(tokens):
                vname = tokens[i]
                if ch is None or ch not in open_files:
                    print("PUT error: channel not open"); return
                f = open_files[ch]['file']
                # get value
                if isinstance(vname, str) and vname.endswith('$'):
                    val = vars_str.get(vname, '')
                    try:
                        f.write(val[0] if val else '')
                        f.flush()
                    except Exception as e:
                        print("PUT write error:", e)
                else:
                    val = vars_num.get(vname, 0)
                    try:
                        f.write(chr(int(val) & 0xFF))
                        f.flush()
                    except Exception as e:
                        print("PUT write error:", e)
        return

    # EOF(#n) and LOF(#n) used as functions in expressions; implement as immediate commands for convenience
    if cmd == 'EOF':
        if len(tokens) >= 2:
            ch = None
            t = tokens[1]
            if isinstance(t, str) and t.startswith('#'):
                try: ch = int(t[1:])
                except: ch = None
            else:
                try: ch = int(t)
                except: ch = None
            if ch is None or ch not in open_files:
                print("EOF error: channel not open"); return
            f = open_files[ch]['file']
            cur = f.tell()
            f.seek(0, os.SEEK_END)
            end = f.tell()
            f.seek(cur)
            print(1 if cur >= end else 0)
        return

    if cmd == 'LOF':
        if len(tokens) >= 2:
            ch = None
            t = tokens[1]
            if isinstance(t, str) and t.startswith('#'):
                try: ch = int(t[1:])
                except: ch = None
            else:
                try: ch = int(t)
                except: ch = None
            if ch is None or ch not in open_files:
                print("LOF error: channel not open"); return
            f = open_files[ch]['file']
            cur = f.tell()
            f.seek(0, os.SEEK_END)
            end = f.tell()
            f.seek(cur)
            print(end)
        return

    # LSET / RSET minimal implementations: LSET var = "string" (left-justify into fixed-length string var)
    if cmd in ('LSET','RSET'):
        # naive: expect form LSET var = "string"
        if len(tokens) >= 4 and tokens[2] == '=':
            name = tokens[1]
            val_tok = tokens[3]
            if isinstance(val_tok, str) and val_tok.startswith('"') and val_tok.endswith('"'):
                s = val_tok[1:-1]
                # store directly into string var
                if name.endswith('$'):
                    vars_str[name] = s
                else:
                    try:
                        vars_num[name] = float(s)
                    except:
                        vars_num[name] = 0.0
        return

    # CLOAD / CSAVE alias to LOAD / SAVE
    if cmd == 'CLOAD':
        if len(tokens) >= 2:
            fname = tokens[1].strip('"')
            load_program_from_file(fname)
        return
    if cmd == 'CSAVE':
        if len(tokens) >= 2:
            fname = tokens[1].strip('"')
            save_program_to_file(fname)
        return

    # DEF FN (store user function)
    if cmd == 'DEF' and len(tokens) >= 2 and tokens[1].upper().startswith('FN'):
        # reconstruct line text to parse reliably
        txt = ' '.join(tokens)
        m = re.match(r'DEF\s+FN([A-Za-z]\w*)\s*\(([^)]*)\)\s*=\s*(.*)', txt, re.IGNORECASE)
        if m:
            fname = m.group(1).upper()
            params = [p.strip() for p in m.group(2).split(',') if p.strip()]
            expr = m.group(3).strip()
            expr_toks = token_re.findall(expr)
            user_fns[fname] = (params, expr_toks)
        return

    # SYSTEM command: run shell command from quoted string
    if cmd == 'SYSTEM':
        if len(tokens) >= 2:
            txt = ' '.join(tokens[1:])
            if txt.startswith('"') and txt.endswith('"'):
                txt = txt[1:-1]
            try:
                os.system(txt)
            except Exception as e:
                print("SYSTEM error:", e)
        return

    # DEFUSR / CALL / USR placeholders (no-op or simple behavior)
    if cmd == 'DEFUSR':
        # placeholder: store nothing, user may map to Python hooks externally
        return
    if cmd == 'CALL':
        # placeholder: no-op
        return
    if cmd == 'USR':
        # USR(n) as immediate call: return 0
        return

    # If we reach here and command not recognized, try immediate expression execution
    # (This allows immediate commands like PRINT 2+2 without line numbers)
    try:
        # attempt to evaluate as expression and print result
        val, _ = eval_expr(tokens, 0)
        print(val)
    except Exception:
        # unknown command: ignore or print error
        print("Unknown command:", tokens[0])
    return

# --- Helpers for program flow ---
def next_line(cur):
    keys = sorted(program.keys())
    for k in keys:
        if k > cur: return k
    return None

# --- Key listener implementation using Event and join ---
def _key_listener_windows(stop_event):
    global break_requested
    while not stop_event.is_set():
        if msvcrt.kbhit():
            ch = msvcrt.getch()
            if ch == b'\x1b':
                break_requested = True
                return
        time.sleep(0.01)

def _key_listener_unix(stop_event):
    global break_requested, _term_settings
    fd = sys.stdin.fileno()
    _term_settings = termios.tcgetattr(fd)
    try:
        tty.setcbreak(fd)
        while not stop_event.is_set():
            dr, _, _ = select.select([sys.stdin], [], [], 0.05)
            if dr:
                try:
                    ch = os.read(fd, 1)
                except Exception:
                    ch = b''
                if ch == b'\x1b':
                    break_requested = True
                    return
    finally:
        try:
            termios.tcsetattr(fd, termios.TCSADRAIN, _term_settings)
        except Exception:
            pass

def start_key_listener():
    """Start the background key listener. Safe to call multiple times."""
    global _key_listener_thread, _key_listener_stop
    if _key_listener_thread is not None and _key_listener_thread.is_alive():
        return
    _key_listener_stop = threading.Event()
    if _HAS_MS:
        _key_listener_thread = threading.Thread(target=_key_listener_windows, args=(_key_listener_stop,), daemon=True)
    else:
        _key_listener_thread = threading.Thread(target=_key_listener_unix, args=(_key_listener_stop,), daemon=True)
    _key_listener_thread.start()
    time.sleep(0.01)

def stop_key_listener(timeout=1.0):
    """Signal the listener to stop, wait for it to exit, restore terminal state, and flush stdin."""
    global _key_listener_thread, _key_listener_stop, _term_settings
    if _key_listener_thread is None:
        return
    _key_listener_stop.set()
    _key_listener_thread.join(timeout)
    if not _HAS_MS:
        try:
            fd = sys.stdin.fileno()
            if _term_settings is not None:
                termios.tcsetattr(fd, termios.TCSADRAIN, _term_settings)
            try:
                termios.tcflush(fd, termios.TCIFLUSH)
            except Exception:
                pass
        except Exception:
            pass
    _key_listener_thread = None
    _key_listener_stop = None
    _term_settings = None

# --- Run loop (checks break_requested and ON ERROR handling) ---
def run_program():
    global pc, running, break_requested, error_handler
    if not program:
        return

    running = True
    pc = min(program.keys())
    start_key_listener()

    # Safety counters to detect stuck lines
    last_pc = None
    repeat_count = 0
    REPEAT_LIMIT = 1000  # raise if you expect very tight loops

    try:
        while pc is not None and running:
            if pc == last_pc:
                repeat_count += 1
            else:
                repeat_count = 0
                last_pc = pc

            if repeat_count >= REPEAT_LIMIT:
                print(f"\n*** ABORT: line {pc} executed {repeat_count} times without progress ***")
                running = False
                pc = None
                break

            if break_requested:
                print("\n*** BREAK (Escape pressed) ***")
                break_requested = False
                running = False
                pc = None
                break

            if pc not in program:
                pc = next_line(pc)
                continue

            toks = program[pc]
            prev_pc = pc
            next_pc = next_line(pc)

            try:
                # Wrap exec_line in try/except to support ON ERROR
                try:
                    exec_line(toks)
                except Exception as e:
                    # If ON ERROR handler set, act accordingly
                    if error_handler:
                        if error_handler[0] == 'GOTO':
                            pc = error_handler[1]
                            continue
                        elif error_handler[0] == 'RESUME':
                            # resume next line
                            pc = next_pc
                            continue
                    # otherwise print error and stop
                    print(f"ERROR at line {pc}: {e}")
                    running = False
                    break
            except Exception as e:
                print(f"ERROR at line {pc}: {e}")
                running = False
                break

            if not running:
                break

            if pc is None:
                break

            if pc == prev_pc:
                pc = next_pc
            else:
                continue

            time.sleep(0.0001)

    finally:
        try:
            stop_key_listener()
        except Exception:
            pass
        break_requested = False
        running = False
        pc = None

# --- Robust SAVE / LOAD using JSON ---
def save_program_to_file(fname):
    try:
        serial = {str(k): program[k] for k in sorted(program.keys())}
        with open(fname, 'w', encoding='utf-8') as f:
            json.dump(serial, f, ensure_ascii=False, indent=2)
        print(f"Saved {len(serial)} lines to '{fname}'")
    except Exception as e:
        print("Save error:", e)

def load_program_from_file(fname):
    global program
    if not os.path.exists(fname):
        print("File not found:", fname); return
    try:
        with open(fname, 'r', encoding='utf-8') as f:
            serial = json.load(f)
        program.clear()
        for k, toks in serial.items():
            try:
                ln = int(k)
            except:
                continue
            program[ln] = [str(t) for t in toks]
        print(f"Loaded {len(program)} lines from '{fname}'")
    except Exception as e:
        print("Load error:", e)

# --- REPL / editor ---
def repl():
    print("TRS-80 Level II style BASIC interpreter. Use RUN, LIST, NEW, SAVE filename, LOAD filename, QUIT.")
    while True:
        try:
            line = input('] ')
        except EOFError:
            print(); break
        s = line.strip()
        if s == '': continue
        up = s.upper()
        if up == 'RUN':
            run_program(); continue
        if up == 'LIST':
            for ln in sorted(program.keys()):
                print(ln, ' '.join(program[ln]))
            continue
        if up == 'NEW':
            program.clear(); vars_num.clear(); vars_str.clear(); arrays.clear(); data_pool.clear(); memory[:] = bytearray(0x10000)
            open_files.clear(); user_fns.clear(); data_ptr = 0
            print("Program cleared."); continue
        if up.startswith('SAVE '):
            fname = line[5:].strip()
            if not fname:
                print("Usage: SAVE filename"); continue
            save_program_to_file(fname); continue
        if up.startswith('LOAD '):
            fname = line[5:].strip()
            if not fname:
                print("Usage: LOAD filename"); continue
            load_program_from_file(fname); continue
        if up in ('QUIT','EXIT'):
            break
        # Program line or immediate command
        ln, toks = tokenize_line(line)
        if ln is None:
            # immediate command
            toks = token_re.findall(line)
            try:
                exec_line(toks)
            except Exception as e:
                print("Error:", e)
            continue
        if toks:
            program[ln] = toks
        else:
            program.pop(ln, None)

if __name__ == '__main__':
    repl()
