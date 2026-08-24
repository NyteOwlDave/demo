import os
import sys
import time
import datetime
import math
import random
import re
import subprocess
import winsound
import pickle

if os.name == 'nt':
    os.system('chcp 65001 >nul')
    import msvcrt

SPECTRUM_CMDS = {"PRINT", "LET", "INPUT", "CLS", "BORDER", "FOR", "NEXT", "STEP", "GOTO", "GOSUB", "RETURN", "STOP", "END", "CONT", "CONTINUE", "RUN", "LIST", "NEW", "CLEAR", "RESTORE", "READ", "DATA", "PLOT", "DRAW", "CIRCLE", "PAUSE", "BEEP", "POKE", "PEEK", "RANDOMIZE", "REM", "INK", "PAPER", "FLASH", "BRIGHT", "INVERSE", "OVER", "OUT", "IN", "AUTO", "ON", "SAVE", "LOAD", "MERGE", "DIR", "IF", "THEN", "ELSE", "ENDIF", "DIM"}
BETA_CMDS = {"PROC", "ENDPROC", "CALL", "LOCAL", "GLOBAL", "TRON", "TROFF", "LABEL", "EDIT", "DELETE", "RENUM", "RENUMBER", "POINT", "AFTER", "EVERY", "SET", "CONS", "CONSTANT", "FIX", "DEF", "GET"}
OTHER_CMDS = {"CASE", "WHEN", "DEFAULT", "ENDCASE", "WHILE", "WEND", "REPEAT", "UNTIL", "DO", "LOOP", "EXIT", "INCLUDE", "MAT", "OPEN", "CLOSE", "OBJECT", "AT", "TAB", "LINE", "LOCATE", "PUSH", "POP", "MAIN", "SWAP", "KEY", "WIDTH", "HEIGHT", "FIND", "EXTRACT", "UPDATE", "SELECT", "WRITE", "PEN", "MODE", "CHAIN", "COMMON", "COLOUR", "COLOR", "GCOL", "VDU", "ERASE", "CONSOLE", "CMODE", "CAT", "WINDOW", "FILL", "PAINT", "ARC", "BOX", "ELLIPSE", "DI", "EI", "RESUME", "FORMAT", "USING", "WRITELN", "PLAY", "SOUND", "ENVELOPE"}
FUNCTIONS = {"ABS", "SGN", "INT", "SQR", "SIN", "COS", "TAN", "ASN", "ACS", "ATN", "LN", "EXP", "LEN", "CHR$", "STR$", "VAL", "VAL$", "PI", "TRUE", "FALSE", "ERL", "POSX", "POSY", "TIME$", "DATE$", "INSTR", "MID$", "LEFT$", "RIGHT$", "INKEY$", "ATTR", "SCREEN$", "USR", "FN", "ZER", "CON", "IDN", "TRN", "INV", "HEX$", "OCT$", "SPACE$", "STRING$", "FRE", "JULIAN", "NUM", "BIN$", "REPORT", "CINT", "CREAL", "ROUND", "UNT", "MAX", "MIN"}
VALID_COMMANDS = SPECTRUM_CMDS | BETA_CMDS | OTHER_CMDS

class DataObject:
    def __init__(self): self.properties = {}
    def __repr__(self): return f"{{{', '.join(f'{k}: {v}' for k, v in self.properties.items())}}}"

class BetaBasicInterpreter:
    def __init__(self):
        self.program, self.variables, self.arrays, self.data_statements = {}, {}, {}, []
        self.data_line_map, self.data_ptr, self.status_message = {}, 0, "0 OK, 0:0"
        self.running, self.needs_redraw, self.running_program_flag, self.jumped = True, True, False, False
        self.pc, self.break_pc, self.error_line, self.sorted_lines, self.last_draw_time = 0, 0, 0, [], 0
        self.console_cols, self.console_rows = 130, 55
        self.break_target, self.resume_target, self.interrupts_enabled = None, None, True
        self.active_after_timers, self.active_every_timers, self.var_types, self.constants = [], [], {}, set()
        self.viewport = {'x': 0, 'y': 0, 'w': 256, 'h': 192}
        self.memory = bytearray(65536)
        self.memory[23610], self.memory[23624] = 0, 7
        self.for_stack, self.gosub_stack, self.proc_stack, self.scope_stack = [], [], [], []
        self.while_stack, self.do_stack, self.repeat_stack, self.case_eval_stack = [], [], [], []
        self.procedures, self.proc_meta, self.labels, self.envelopes = {}, {}, {}, {}
        self.if_blocks, self.case_blocks, self.user_functions = {}, {}, {}
        self.cmode, self.last_error_msg, self.common_vars = 16, "No error", set()
        self.selected_file, self.main_line_num, self.tab_stop_size = None, None, 8
        self.streams, self.tracing, self.error_target = {}, False, None
        self.auto_mode, self.auto_line, self.auto_step = False, 10, 10
        self.border_color = 7
        self.pixels = [[0 for _ in range(256)] for _ in range(192)]
        self.last_plot_pos = (0, 0)
        self.current_ink, self.current_paper, self.current_bright, self.current_flash = 0, 7, 0, 0
        self.text_buffer = [[(" ", 0, 7, 0, 0) for _ in range(128)] for _ in range(48)]
        self.cursor_r, self.cursor_c = 0, 0
        self.current_input, self.input_cursor_pos, self.key_buffer = "", 0, ""

    def flush_keyboard(self):
        if os.name == 'nt':
            while msvcrt.kbhit(): msvcrt.getch()

    def set_console_font(self):
        if os.name == 'nt':
            try:
                import ctypes
                class COORD(ctypes.Structure): _fields_ = [("X", ctypes.c_short), ("Y", ctypes.c_short)]
                class CONSOLE_FONT_INFOEX(ctypes.Structure): _fields_ = [("cbSize", ctypes.c_ulong), ("nFont", ctypes.c_ulong), ("dwFontSize", COORD), ("FontFamily", ctypes.c_uint), ("FontWeight", ctypes.c_uint), ("FaceName", ctypes.c_wchar * 32)]
                font = CONSOLE_FONT_INFOEX()
                font.cbSize, font.nFont, font.dwFontSize.X, font.dwFontSize.Y, font.FontFamily, font.FontWeight, font.FaceName = ctypes.sizeof(CONSOLE_FONT_INFOEX), 12, 8, 12, 54, 400, "Lucida Console"
                ctypes.windll.kernel32.SetCurrentConsoleFontEx(ctypes.windll.kernel32.GetStdHandle(-11), ctypes.c_long(False), ctypes.pointer(font))
            except: pass

    def resize_console(self, cols, lines):
        if os.name == 'nt':
            self.console_cols, self.console_rows = max(80, min(int(cols), 200)), max(25, min(int(lines), 100))
            os.system(f'mode con: cols={self.console_cols} lines={self.console_rows}')
            self.set_console_font()

    def set_console_size(self): self.resize_console(self.console_cols, self.console_rows)
    def set_colors(self): sys.stdout.write("\x1b[47m\x1b[30m\x1b[2J"); sys.stdout.flush()

    def scroll_text(self):
        self.text_buffer.pop(0)
        self.text_buffer.append([(" ", self.current_ink, self.current_paper, self.current_bright, self.current_flash) for _ in range(128)])

    def print_char(self, ch):
        if ch == '\n':
            self.cursor_c = 0; self.cursor_r += 1
        else:
            if self.cursor_c >= 128: self.cursor_c = 0; self.cursor_r += 1
            if self.cursor_r >= 48: self.scroll_text(); self.cursor_r = 47
            self.text_buffer[self.cursor_r][self.cursor_c] = (ch, self.current_ink, self.current_paper, self.current_bright, self.current_flash)
            self.cursor_c += 1
        if self.cursor_r >= 48: self.scroll_text(); self.cursor_r = 47

    def print_output(self, text, end='\n'):
        text = str(text) + end
        i = 0
        while i < len(text):
            if text[i] == '\x1b' and i + 1 < len(text) and text[i+1] == '[':
                j = i + 2
                while j < len(text) and text[j] != 'm': j += 1
                if j < len(text):
                    for p in text[i+2:j].split(';'):
                        if p == '0': self.current_ink, self.current_paper, self.current_bright = 0, 7, 0
                        elif p == '1': self.current_bright = 1
                        elif p.startswith('3') and len(p) == 2: self.current_ink = {'30':0, '34':1, '31':2, '35':3, '32':4, '36':5, '33':6, '37':7}.get(p, self.current_ink)
                        elif p.startswith('4') and len(p) == 2: self.current_paper = {'40':0, '44':1, '41':2, '45':3, '42':4, '46':5, '43':6, '47':7}.get(p, self.current_paper)
                    i = j + 1; continue
            self.print_char(text[i]); i += 1
        self.needs_redraw = True

    def clear_text(self):
        self.text_buffer = [[(" ", self.current_ink, self.current_paper, self.current_bright, self.current_flash) for _ in range(128)] for _ in range(48)]
        self.cursor_r, self.cursor_c = 0, 0
        self.needs_redraw = True

    def clear_graphics(self):
        self.pixels = [[0 for _ in range(256)] for _ in range(192)]
        self.last_plot_pos = (0, 0)
        self.needs_redraw = True

    def auto_list(self):
        self.current_ink, self.current_paper, self.current_bright, self.current_flash = 0, 7, 0, 0
        self.clear_text(); self.clear_graphics()
        for l in sorted(self.program.keys()): 
            self.print_output(f"{l} {self.program[l]}")

    def list_variables(self):
        self.current_ink, self.current_paper, self.current_bright, self.current_flash = 0, 7, 0, 0
        self.clear_text(); self.print_output("--- VARIABLES, ARRAYS & OBJECTS ---")
        all_vars = dict(self.variables)
        if self.scope_stack: all_vars.update(self.scope_stack[-1]['vars'])
        if not all_vars and not self.arrays: self.print_output("No variables assigned.")
        else:
            for k, v in sorted(all_vars.items()):
                t_lbl = f" [{self.var_types[k]}]" if k in self.var_types else ""
                c_lbl = " [CONSTANT]" if k in self.constants else ""
                self.print_output(f"{k.replace('_STR', '$')} = {repr(v) if isinstance(v, DataObject) else v}{t_lbl}{c_lbl}")
            for k, arr in sorted(self.arrays.items()): self.print_output(f"{k.replace('_STR', '$')}({', '.join(str(d) for d in arr['dims'])}) [Array]")
        self.status_message = "0 OK, 0:0"

    def draw_screen(self):
        def get_ansi(ink, paper, bright, flash):
            if self.cmode == 256: return f"\x1b[38;5;{ink % 256};48;5;{paper % 256}m" + ("\x1b[5m" if flash else "\x1b[25m")
            return f"\x1b[{[30, 34, 31, 35, 32, 36, 33, 37][ink % 8] + (60 if bright else 0)};{[40, 44, 41, 45, 42, 46, 43, 47][paper % 8]}m" + ("\x1b[5m" if flash else "\x1b[25m")

        frame = "\x1b[?25l\x1b[?7l\x1b[H"
        for br in range(48):
            row_str, last_ansi = "", ""
            for bc in range(128):
                tch, ink, paper, bright, flash = self.text_buffer[br][bc]
                if tch != " ": char_to_draw = tch
                else:
                    code = 0x2800
                    for dx, dy, b_val in [(0,0,1), (0,1,2), (0,2,4), (1,0,8), (1,1,16), (1,2,32), (0,3,64), (1,3,128)]:
                        if self.pixels[(br * 4) + dy][(bc * 2) + dx]: code += b_val
                    char_to_draw = " " if code == 0x2800 else chr(code)
                curr_ansi = get_ansi(ink, paper, bright, flash)
                if curr_ansi != last_ansi: row_str += curr_ansi; last_ansi = curr_ansi
                row_str += char_to_draw
            frame += f"{row_str}\x1b[K\n"
            
        frame += f"\x1b[30;47m\x1b[25m{'-' * 128}\x1b[K\n{self.status_message.ljust(128)[:128]}\x1b[K\n> {self.current_input}\x1b[K\x1b[?25h\x1b[?7h"
        back_steps = len(self.current_input) - self.input_cursor_pos
        if back_steps > 0: frame += f"\x1b[{back_steps}D"
        
        try: sys.stdout.buffer.write(frame.encode('utf-8')); sys.stdout.buffer.flush()
        except: sys.stdout.write(frame); sys.stdout.flush()

    def auto_caps(self, line_str):
        line_str = re.sub(r'\bGO\s+TO\b', 'GOTO', line_str, flags=re.IGNORECASE)
        line_str = re.sub(r'\bGO\s+SUB\b', 'GOSUB', line_str, flags=re.IGNORECASE)
        return line_str

    def normalize_var(self, v_name): return v_name.strip().upper().replace('$', '_STR')

    def get_variable(self, name):
        norm = self.normalize_var(name)
        if self.scope_stack:
            curr = self.scope_stack[-1]
            if norm in curr['explicit_globals']: return self.variables.get(norm, 0)
            if norm in curr['vars']: return curr['vars'][norm]
            if curr['all_local'] or norm in curr['params'] or norm in curr['explicit_locals']: return curr['vars'].get(norm, 0)
        return self.variables.get(norm, 0)

    def set_variable(self, name, val):
        norm = self.normalize_var(name)
        if norm in self.constants: return
        if norm in self.var_types:
            t = self.var_types[norm]
            val = int(val) if t == 'INT' else float(val) if t in ('FLOAT', 'REAL', 'DEC') else val
        if self.scope_stack:
            curr = self.scope_stack[-1]
            if norm in curr['explicit_globals']: self.variables[norm] = val; return
            if curr['all_local'] or norm in curr['params'] or norm in curr['explicit_locals']: curr['vars'][norm] = val; return
            self.variables[norm] = val
        else: self.variables[norm] = val

    def get_object_property(self, obj_name, prop_name): return self.get_variable(obj_name).properties.get(prop_name.upper(), 0) if isinstance(self.get_variable(obj_name), DataObject) else 0
    def set_object_property(self, obj_name, prop_name, val):
        obj = self.get_variable(obj_name)
        if isinstance(obj, DataObject): obj.properties[prop_name.upper()] = val

    def get_array_value(self, name, indices):
        norm, idx_tup = self.normalize_var(name), tuple(int(self.evaluate_expression(idx)) for idx in indices)
        return self.arrays[norm]['data'].get(idx_tup, "" if norm.endswith("_STR") else 0) if norm in self.arrays else ("" if norm.endswith("_STR") else 0)

    def set_array_value(self, name, indices, val):
        norm, idx_tup = self.normalize_var(name), tuple(int(self.evaluate_expression(idx)) for idx in indices)
        if norm not in self.arrays: self.arrays[norm] = {'dims': [max(idx_tup) + 1] * len(indices), 'data': {}}
        self.arrays[norm]['data'][idx_tup] = val

    def parse_and_execute_line(self, line_str):
        line_str = self.auto_caps(line_str.strip())
        if not line_str: self.status_message = "0 OK, 0:0"; self.needs_redraw = True; return
        parts = line_str.split(' ', 1)
        if parts[0].isdigit():
            line_num = int(parts[0])
            if len(parts) > 1:
                code = parts[1].strip()
                if code.upper().startswith("DEF FN"): self.register_user_function(code[6:].strip())
                self.program[line_num] = code
            else:
                if line_num in self.program: del self.program[line_num]
            self.status_message = "0 OK, 0:0"; self.auto_list()  
        else:
            self.execute_statement(line_str)
        self.needs_redraw = True

    def register_user_function(self, def_str):
        try:
            sig, expr = def_str.split('=', 1)
            fn_name = sig.split('(')[0].strip().upper()
            params = [self.normalize_var(p) for p in sig.split('(')[1].split(')')[0].split(',') if p.strip()]
            self.user_functions[fn_name] = {'params': params, 'expr': expr.strip()}
        except: pass

    def evaluate_expression(self, expr_str):
        parts = expr_str.split('"')
        for i in range(0, len(parts), 2):
            s = parts[i]
            for fn_name, fn_def in self.user_functions.items():
                def replace_fn(match):
                    arg_vals = [self.evaluate_expression(a.strip()) for a in match.group(1).split(',') if a.strip()]
                    fn_vars = {fn_def['params'][idx]: arg_vals[idx] for idx in range(min(len(fn_def['params']), len(arg_vals)))}
                    self.scope_stack.append({'vars': fn_vars, 'params': set(fn_def['params']), 'explicit_locals': set(), 'explicit_globals': set(), 'all_local': True})
                    try: res = self.evaluate_expression(fn_def['expr'])
                    finally: self.scope_stack.pop()
                    return str(res) if isinstance(res, (int, float)) else f'"{res}"'
                s = re.sub(r'\bFN\s*' + re.escape(fn_name) + r'\s*\(([^)]*)\)', replace_fn, s, flags=re.IGNORECASE)

            s = re.sub(r'\b([A-Z][A-Z0-9_\$]*)\.([A-Z][A-Z0-9_\$]*)\b', lambda m: f'__obj_prop("{m.group(1)}", "{m.group(2)}")', s, flags=re.IGNORECASE)

            def replace_arr(match):
                if match.group(1).upper() in {"RND", "SQR", "INT", "ABS", "SGN", "SIN", "COS", "TAN", "ASN", "ACS", "ATN", "LN", "EXP", "LEN", "VAL", "VAL_STR", "CHR_STR", "STR_STR", "CODE", "ATTR", "SCREEN_STR", "USR", "FN", "NUM", "JULIAN", "BIN_STR", "CINT", "CREAL", "FIX", "ROUND", "UNT", "MAX", "MIN", "SPACE_STR", "HEX_STR", "OCT_STR", "INSTR", "MID_STR", "LEFT_STR", "RIGHT_STR", "INKEY_STR", "POINT", "PEEK", "IN", "POSX", "POSY", "WIDTH", "HEIGHT", "TIME_STR", "DATE_STR"}: return match.group(0)
                return f'__array_val("{match.group(1)}", {match.group(2)})'
            s = re.sub(r'\b([A-Z][A-Z0-9_\$]*)\s*\(([^)]+)\)', replace_arr, s, flags=re.IGNORECASE)

            s = s.upper().replace('$', '_STR').replace('^', '**').replace('<>', '!=')
            s = re.sub(r'(?<![<>!])=(?!=)', '==', s)
            for k, v in {"RND": "RND()", "INKEY_STR": "INKEY_STR()", "TIME_STR": "TIME_STR()", "DATE_STR": "DATE_STR()", "PI": str(math.pi), "TRUE": "-1", "FALSE": "0", "ERL": str(self.error_line), "POSX": str(self.cursor_c), "POSY": str(self.cursor_r), "WIDTH": str(self.console_cols), "HEIGHT": str(self.console_rows), "MOD": " % ", "AND": " and ", "OR": " or ", "XOR": " ^ ", "NOT": " not "}.items():
                s = re.sub(r'\b' + k + (r'(?!\()' if "()" in v else r'\b'), v, s)
            
            def repl_tok(match):
                tok = match.group(0)
                if tok in {"AND", "OR", "XOR", "NOT", "MOD", "RND", "SQR", "INT", "ABS", "SGN", "SIN", "COS", "TAN", "LEN", "VAL", "CHR_STR", "STR_STR", "ATTR", "SCREEN_STR", "USR", "INSTR", "MID_STR", "LEFT_STR", "RIGHT_STR", "INKEY_STR", "ASN", "ACS", "ATN", "LN", "EXP", "HEX_STR", "OCT_STR", "SPACE_STR", "STRING_STR", "FRE", "TIME_STR", "DATE_STR", "JULIAN", "NUM", "BIN_STR", "REPORT", "PEEK", "IN", "CINT", "CREAL", "FIX", "ROUND", "UNT", "ERL", "POSX", "POSY", "WIDTH", "HEIGHT", "MAX", "MIN", "__ARRAY_VAL", "__OBJ_PROP", "POINT", "TO", "STEP", "THEN", "ELSE", "OF", "DATA", "REM", "DIM"}: return tok
                val = self.get_variable(tok)
                if isinstance(val, str): return f'"{val}"'
                elif isinstance(val, DataObject): return f'"{{{", ".join(f"{pk}: {pv}" for pk, pv in val.properties.items())}}}"'
                return str(val)

            parts[i] = re.sub(r'\b[A-Z][A-Z0-9_]*_STR\b|\b[A-Z][A-Z0-9_]*\b', repl_tok, s)
            
        py_expr = '"'.join(parts)
        
        def _inkey(): 
            k = self.key_buffer; self.key_buffer = ""
            return k
        def _rnd(): return random.random()
        def _val(s): 
            try: return float(str(s).strip('"')) if '.' in str(s).strip('"') else int(str(s).strip('"'))
            except: return 0
        def _vals(s): return str(self.evaluate_expression(str(s)))
        def _sgn(n): return 1 if float(n) > 0 else (-1 if float(n) < 0 else 0)
        def _code(s): return ord(str(s).strip('"')[0]) if str(s).strip('"') else 0
        def _attr(y, x):
            try:
                r, c = int(y), int(x)
                if 0 <= r < 24 and 0 <= c < 32: return self.text_buffer[r * 2][c * 4][1] + (self.text_buffer[r * 2][c * 4][2] * 8) + (64 if self.text_buffer[r * 2][c * 4][3] else 0) + (128 if self.text_buffer[r * 2][c * 4][4] else 0)
            except: pass
            return 7
        def _screens(y, x):
            try:
                r, c = int(y), int(x)
                if 0 <= r < 24 and 0 <= c < 32: return self.text_buffer[r * 2][c * 4][0]
            except: pass
            return " "
        def _point(x, y):
            try:
                px, py = int(x), int(y)
                if 0 <= px < 256 and 0 <= py < 192: return self.pixels[191 - py][px]
            except: pass
            return 0
        def _in(port_addr):
            try:
                if int(port_addr) == 254 and os.name == 'nt' and msvcrt.kbhit(): return 0
                return 255
            except: pass
            return 255
        def _string(n, c):
            try: return (chr(int(c)) if isinstance(c, (int, float)) else str(c)[0]) * int(n)
            except: return ""
        def _julian(d_str):
            try: return datetime.datetime.strptime(str(d_str).strip('"'), "%m-%d-%Y").toordinal()
            except: return 0
        def _fix(n):
            try: return math.floor(float(n)) if float(n) >= 0 else math.ceil(float(n))
            except: return 0
        def _max(*args):
            try: return max([self.evaluate_expression(str(a)) if not isinstance(a, (int, float, str)) else a for a in args])
            except: return 0
        def _min(*args):
            try: return min([self.evaluate_expression(str(a)) if not isinstance(a, (int, float, str)) else a for a in args])
            except: return 0
        
        safe_globals = {
            "RND": _rnd, "SQR": math.sqrt, "INT": math.floor, "ABS": abs, "SGN": _sgn, "SIN": math.sin, "COS": math.cos, "TAN": math.tan,
            "ASN": lambda n: math.asin(float(n)) if -1 <= float(n) <= 1 else 0, "ACS": lambda n: math.acos(float(n)) if -1 <= float(n) <= 1 else 0, 
            "ATN": math.atan, "LN": math.log, "EXP": math.exp, "LEN": len, "VAL": _val, "VAL_STR": _vals,
            "CHR_STR": chr, "STR_STR": str, "CODE": _code, "ATTR": _attr, "SCREEN_STR": _screens, "USR": int, "POINT": _point, 
            "PEEK": lambda a: self.memory[int(a)] if 0 <= int(a) < 65536 else 0, "IN": _in,
            "HEX_STR": lambda n: hex(int(n))[2:].upper(), "OCT_STR": lambda n: oct(int(n))[2:], "BIN_STR": lambda n: bin(int(n))[2:], 
            "SPACE_STR": lambda n: " " * int(n), "STRING_STR": _string, "JULIAN": _julian, "NUM": lambda s: float(str(s).strip('"')), 
            "CINT": lambda n: round(float(n)), "CREAL": lambda n: float(n), "FIX": _fix, "ROUND": lambda n, d=0: round(float(n), int(d)), "UNT": lambda n: math.floor(float(n)),
            "MAX": _max, "MIN": _min, "WIDTH": self.console_cols, "HEIGHT": self.console_rows,
            "REPORT": lambda: self.last_error_msg, "FRE": lambda dummy=0: 65536,
            "TIME_STR": lambda: time.strftime("%H:%M:%S"), "DATE_STR": lambda: datetime.date.today().strftime("%m-%d-%Y"),
            "__array_val": lambda n, *idx: self.get_array_value(n, [str(i) for i in idx]), "__obj_prop": self.get_object_property,
            "INSTR": lambda s, sub: str(s).find(str(sub)) + 1, 
            "MID_STR": lambda s, st, l=None: str(s)[int(st)-1:] if l is None else str(s)[int(st)-1:int(st)-1+int(l)],
            "LEFT_STR": lambda s, l: str(s)[:int(l)], "RIGHT_STR": lambda s, l: str(s)[-int(l):] if int(l) > 0 else "",
            "INKEY_STR": _inkey, "abs": abs, "int": int, "float": float, "str": str
        }
        try: return eval(py_expr, {"__builtins__": None}, safe_globals)
        except Exception as e:
            self.last_error_msg = str(e)
            raise ValueError(f"{str(e)}")

    def draw_pixel(self, x, y):
        vx, vy, vw, vh = self.viewport['x'], self.viewport['y'], self.viewport['w'], self.viewport['h']
        if vx <= x < vx + vw and vy <= y < vy + vh:
            if 0 <= x < 256 and 0 <= y < 192: 
                self.pixels[191 - y][x] = 1 if self.current_ink != self.current_paper else 0
                br, bc = (191 - y) // 4, x // 2
                tch, _, paper, bright, flash = self.text_buffer[br][bc]
                self.text_buffer[br][bc] = (tch, self.current_ink, paper, bright, flash)

    def draw_line(self, x0, y0, x1, y1):
        dx, dy = abs(x1 - x0), abs(y1 - y0)
        sx, sy = 1 if x0 < x1 else -1, 1 if y0 < y1 else -1
        err = dx - dy
        while True:
            self.draw_pixel(x0, y0)
            if x0 == x1 and y0 == y1: break
            e2 = 2 * err
            if e2 > -dy: err -= dy; x0 += sx
            if e2 < dx: err += dx; y0 += sy

    def flood_fill(self, start_x, start_y):
        if not (0 <= start_x < 256 and 0 <= start_y < 192): return
        t_val = self.pixels[191 - start_y][start_x]
        n_val = 1 if self.current_ink != self.current_paper else 0
        if t_val == n_val: return
        stack = [(start_x, 191 - start_y)]
        while stack:
            c, r = stack.pop()
            if 0 <= r < 192 and 0 <= c < 256 and self.pixels[r][c] == t_val:
                self.pixels[r][c] = n_val
                tch, _, paper, bright, flash = self.text_buffer[r//4][c//2]
                self.text_buffer[r//4][c//2] = (tch, self.current_ink, paper, bright, flash)
                stack.extend([(c+1, r), (c-1, r), (c, r+1), (c, r-1)])

    def execute_statement(self, multi_stmt):
        multi_stmt = multi_stmt.strip()
        if multi_stmt.startswith("."): multi_stmt = "CALL " + multi_stmt[1:].strip()
        elif multi_stmt.upper().startswith("DOT "): multi_stmt = "CALL " + multi_stmt[4:].strip()

        in_str, curr, stmts = False, "", []
        for char in multi_stmt:
            if char == '"': in_str = not in_str
            if char == ':' and not in_str:
                if curr.strip(): stmts.append(curr.strip())
                curr = ""
            else: curr += char
        if curr.strip(): stmts.append(curr.strip())

        for stmt in stmts:
            self._execute_single_statement(stmt)
            if not self.status_message.startswith("0") and not self.tracing: break
            if getattr(self, 'jumped', False): break

    def find_closing_token(self, token_str):
        for idx in range(self.pc + 1, len(self.sorted_lines)):
            s = self.program[self.sorted_lines[idx]].strip().upper()
            if s == token_str or s.startswith(token_str + " "): return idx
        return self.pc + 1

    def resolve_target_pc(self, target_str):
        if target_str.strip().upper() in self.labels: return self.labels[target_str.strip().upper()]
        try:
            line_num = int(self.evaluate_expression(target_str.strip()))
            if line_num in self.sorted_lines: return self.sorted_lines.index(line_num)
        except: pass
        return None

    def prompt_input(self, prompt, var_name):
        if prompt: self.print_output(prompt, end="")
        self.draw_screen()
        user_val = ""
        while self.running:
            if os.name == 'nt' and msvcrt.kbhit():
                char = msvcrt.getch()
                if char == b'\r': break
                elif char == b'\x1b': return False
                elif char == b'\x08': 
                    if len(user_val) > 0: 
                        user_val = user_val[:-1]
                        self.cursor_c = max(0, self.cursor_c - 1)
                        self.print_char(" "); self.cursor_c = max(0, self.cursor_c - 1); self.draw_screen()
                else:
                    try: 
                        dec = char.decode('utf-8', 'ignore')
                        if ord(dec) >= 32:
                            user_val += dec; self.print_char(dec); self.draw_screen()
                    except: pass
            time.sleep(0.01)
        self.print_char('\n')
        try: self.set_variable(var_name, self.evaluate_expression(user_val))
        except: self.set_variable(var_name, user_val)
        return True

    def _execute_single_statement(self, stmt):
        stmt = stmt.strip()
        if not stmt or stmt.startswith("/") or stmt.upper().startswith("REM") or stmt.upper().startswith("DEF FN"): return
        up = stmt.upper()
        cmd = up.split(' ', 1)[0]
        
        try:
            if cmd in ("DATA", "DEF", "SUB", "LABEL", "MAIN"): pass
            
            elif cmd == "CLS":
                self.clear_text(); self.clear_graphics()

            elif cmd == "BORDER":
                args = [a.strip() for a in stmt[7:].split(',')]
                if len(args) >= 1:
                    b_col = int(self.evaluate_expression(args[0]))
                    b_width = int(self.evaluate_expression(args[1])) if len(args) > 1 else 5
                    self.border_color = b_col
                    for w_i in range(b_width):
                        self.draw_line(w_i, w_i, 255 - w_i, w_i); self.draw_line(w_i, 191 - w_i, 255 - w_i, 191 - w_i)
                        self.draw_line(w_i, w_i, w_i, 191 - w_i); self.draw_line(255 - w_i, w_i, 255 - w_i, 191 - w_i)

            elif cmd in ("INK", "PAPER", "BRIGHT", "FLASH", "PEN", "COLOUR", "COLOR", "GCOL"):
                prefix_len = len(cmd) + 1
                args = [a.strip() for a in stmt[prefix_len:].split(',')]
                val1 = int(self.evaluate_expression(args[0])) if args else 0
                if cmd in ("INK", "PEN", "COLOUR", "COLOR", "GCOL"): self.current_ink = val1
                elif cmd == "PAPER": self.current_paper = val1
                elif cmd == "BRIGHT": self.current_bright = 1 if val1 else 0
                elif cmd == "FLASH": self.current_flash = 1 if val1 else 0
                if len(args) > 1 and cmd in ("COLOUR", "COLOR"): self.current_paper = int(self.evaluate_expression(args[1]))

            elif cmd == "WRITELN":
                self.print_output(str(self.evaluate_expression(stmt[7:].strip())).encode().decode('unicode_escape'), end='\n')

            elif cmd in ("WIDTH", "HEIGHT"):
                val = int(self.evaluate_expression(stmt[len(cmd):].strip()))
                if cmd == "WIDTH": self.resize_console(val, self.console_rows)
                else: self.resize_console(self.console_cols, val)

            elif up.startswith("ON ERROR "): self.error_target = stmt[9:].strip()
            elif up == "ON ERROR OFF": self.error_target = None
            elif up.startswith("ON RESUME "): self.resume_target = stmt[10:].strip()
            elif up.startswith("ON BREAK "): self.break_target = stmt[9:].strip()

            elif cmd in ("RESUME", "CONTINUE", "CONT"):
                rest = stmt[len(cmd):].strip()
                if cmd in ("CONT", "CONTINUE"):
                    if hasattr(self, 'break_pc') and self.break_pc < len(self.sorted_lines):
                        self.pc = self.break_pc; self.running_program_flag = True; self.status_message = "0 OK, 0:0"; self.run_program()
                    else: self.status_message = "1 Can't continue"
                else:
                    tgt = self.resolve_target_pc(rest) if rest else (self.resolve_target_pc(self.resume_target) if self.resume_target else self.pc + 1)
                    if tgt is not None: self.pc = tgt; self.jumped = True; self.status_message = "0 OK, 0:0"
                    else: self.status_message = "1 Resume target not found"

            elif up.startswith(("PRINT USING", "FORMAT USING")):
                body = stmt[11:].strip() if up.startswith("P") else stmt[12:].strip()
                if ";" in body:
                    fmt_part, expr_part = body.split(";", 1)
                    fmt, val = str(self.evaluate_expression(fmt_part)).strip('"'), self.evaluate_expression(expr_part)
                    f_str = str(val)
                    if "#" in fmt:
                        try:
                            f_len = fmt.count("#")
                            dec = len(fmt.split(".")[1]) if "." in fmt and len(fmt.split("."))>1 else 0
                            f_str = f"{float(val):0{f_len}.{dec}f}" if "0" in fmt else f"{float(val):.{dec}f}"
                        except: pass
                    if up.startswith("P"): self.print_output(f_str)
                    else: self.set_variable(expr_part.strip(), f_str)

            elif cmd == "PRINT":
                if up.startswith("PRINT #"):
                    m_stream = re.match(r'PRINT\s*#\s*([0-9]+)\s*;\s*(.*)', stmt, re.IGNORECASE)
                    if m_stream:
                        s_num = int(m_stream.group(1))
                        if s_num in self.streams and self.streams[s_num]['mode'] == 'W':
                            self.streams[s_num]['file'].write(str(self.evaluate_expression(m_stream.group(2).strip())) + "\n"); self.streams[s_num]['file'].flush()
                    return
                print_body = stmt[5:].strip()
                at_pos = None
                if print_body.upper().startswith("AT "):
                    m_at = re.match(r'AT\s+([0-9\.\+\-\*/\(\)]+)\s*,\s*([0-9\.\+\-\*/\(\)]+)\s+(.*)', print_body, re.IGNORECASE)
                    if m_at:
                        at_pos = (int(self.evaluate_expression(m_at.group(1))), int(self.evaluate_expression(m_at.group(2))))
                        print_body = m_at.group(3).strip()
                if at_pos: self.cursor_r, self.cursor_c = min(47, max(0, at_pos[0])), min(127, max(0, at_pos[1]))
                if print_body.upper().startswith("OBJECT "): print_body = print_body[7:].strip()
                obj_val = self.get_variable(print_body.split()[0]) if print_body else None
                if isinstance(obj_val, DataObject):
                    style, tab_spaces = "INLINE", 2
                    if " LINE" in print_body.upper(): style = "LINE"
                    elif " TAB " in print_body.upper():
                        style = "TAB"
                        try: tab_spaces = int(self.evaluate_expression(print_body.upper().split(" TAB ")[1].strip()))
                        except: pass
                    if style == "LINE":
                        for k, v in obj_val.properties.items(): self.print_output(f"{k}: {v}")
                    elif style == "TAB": self.print_output((" " * tab_spaces).join(f"{k}: {v}" for k, v in obj_val.properties.items()))
                    else: self.print_output(f"{{{', '.join(f'{k}: {v}' for k, v in obj_val.properties.items())}}}")
                    return

                expr = print_body
                if not expr: self.print_output("")
                else:
                    in_str, parts, curr = False, [], ""
                    for char in expr:
                        if char == '"': in_str = not in_str; curr += char
                        elif not in_str and char in (';', ','):
                            if curr.strip(): parts.append(curr.strip())
                            parts.append(char); curr = ""
                        else: curr += char
                    if curr.strip(): parts.append(curr.strip())
                    out, add_newline = "", True
                    for i, p in enumerate(parts):
                        p_up = p.strip().upper()
                        if p == ';':
                            if i == len(parts) - 1: add_newline = False
                        elif p == ',':
                            out += "    " 
                            if i == len(parts) - 1: add_newline = False
                        elif p_up == 'TAB': out += " " * (self.tab_stop_size - (self.cursor_c % self.tab_stop_size) or self.tab_stop_size)
                        elif p_up.startswith("TAB ") or p_up.startswith("TAB("): out += " " * int(self.evaluate_expression(p[4:].strip().rstrip(')')))
                        else:
                            val_res = self.evaluate_expression(p)
                            if isinstance(val_res, DataObject): out += f"{{{', '.join(f'{k}: {v}' for k, v in val_res.properties.items())}}}"
                            else: out += str(val_res)
                    self.print_output(out, end="\n" if add_newline else "")

            elif cmd == "INPUT":
                if up.startswith("INPUT #"):
                    m_in_stream = re.match(r'INPUT\s*#\s*([0-9]+)\s*;\s*(.*)', stmt, re.IGNORECASE)
                    if m_in_stream:
                        s_num, vars_str = int(m_in_stream.group(1)), m_in_stream.group(2).strip()
                        if s_num in self.streams and self.streams[s_num]['mode'] == 'R':
                            line_data = self.streams[s_num]['file'].readline()
                            if line_data:
                                vals = [v.strip().strip('"') for v in line_data.strip().split(',')]
                                for idx, v_name in enumerate([v.strip() for v in vars_str.split(',')]):
                                    if idx < len(vals):
                                        val = vals[idx]
                                        try: val = float(val) if '.' in val else int(val)
                                        except: pass
                                        self.set_variable(v_name, val)
                    return
                ib = stmt[5:].strip()
                at_pos, prompt = None, "?"
                if ib.upper().startswith("AT "):
                    m_at = re.match(r'AT\s+([0-9\.\+\-\*/\(\)]+)\s*,\s*([0-9\.\+\-\*/\(\)]+)\s+(.*)', ib, re.IGNORECASE)
                    if m_at:
                        at_pos = (int(self.evaluate_expression(m_at.group(1))), int(self.evaluate_expression(m_at.group(2))))
                        ib = m_at.group(3).strip()
                if at_pos: self.cursor_r, self.cursor_c = min(47, max(0, at_pos[0])), min(127, max(0, at_pos[1]))
                if ib.startswith('"'):
                    p_end = ib.find('"', 1)
                    if p_end != -1:
                        prompt = ib[1:p_end]
                        ib = ib[p_end+1:].lstrip(';,').strip()
                var_name = ib
                if os.name == 'nt' and not self.prompt_input(prompt, var_name): 
                    self.status_message = "L BREAK into program"; self.running_program_flag = False

            elif cmd == "GET":
                v_name = self.normalize_var(stmt[3:].strip())
                self.draw_screen()
                if self.key_buffer:
                    self.set_variable(v_name, self.key_buffer); self.key_buffer = ""
                else:
                    got_key = ""
                    while self.running and getattr(self, 'running_program_flag', True):
                        if os.name == 'nt' and msvcrt.kbhit():
                            c = msvcrt.getch()
                            if c == b'\x1b':
                                self.status_message = f"L BREAK into program, {self.sorted_lines[self.pc] if self.sorted_lines else 0}:1"
                                self.running_program_flag = False; break
                            try: got_key = c.decode('utf-8', 'ignore').upper(); break
                            except: pass
                        time.sleep(0.01)
                    if getattr(self, 'running_program_flag', True): self.set_variable(v_name, got_key)

            elif up.startswith("ON ") and not up.startswith(("ON ERROR", "ON BREAK", "ON RESUME")):
                m_on = re.match(r'ON\s+(.+?)\s*,\s*(.+)', stmt, re.IGNORECASE)
                if m_on:
                    idx_val = int(round(float(self.evaluate_expression(m_on.group(1)))))
                    targets = [t.strip() for t in m_on.group(2).split(',')]
                    if 1 <= idx_val <= len(targets):
                        if tgt_pc := self.resolve_target_pc(targets[idx_val - 1]): self.pc = tgt_pc; self.jumped = True

            elif cmd == "FIX":
                args = [a.strip() for a in stmt[3:].split(',')]
                if len(args) == 2:
                    v_name = args[0]
                    try:
                        rounded = round(float(self.get_variable(v_name)), int(self.evaluate_expression(args[1])))
                        if rounded.is_integer() and isinstance(self.get_variable(v_name), int): rounded = int(rounded)
                        self.set_variable(v_name, rounded)
                    except: pass

            elif cmd == "ERASE":
                rest = stmt[5:].strip()
                if rest.startswith('"') and rest.endswith('"'):
                    fname = rest[1:-1]
                    for ext in ['.bb2', '.scr', '.dat', '']:
                        t_file = fname if os.path.exists(fname) else fname + ext
                        if os.path.exists(t_file):
                            try: os.remove(t_file)
                            except: pass
                else:
                    v_name = self.normalize_var(rest)
                    if v_name in self.arrays: del self.arrays[v_name]
                    elif v_name in self.variables: del self.variables[v_name]

            elif cmd in ("FILL", "PAINT"):
                args = [a.strip() for a in stmt[len(cmd):].split(',')]
                if len(args) == 2: self.flood_fill(int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1])))

            elif cmd in ("DI", "EI"): self.interrupts_enabled = (cmd == "EI")

            elif cmd == "SET":
                parts = stmt[3:].strip().split()
                if len(parts) == 2 and parts[1].upper() in ('INT', 'FLOAT', 'REAL', 'DEC'): self.var_types[self.normalize_var(parts[0])] = parts[1].upper()

            elif cmd in ("CONS", "CONSTANT"):
                assignment = stmt[len(cmd):].strip()
                if "=" in assignment:
                    v, e = assignment.split("=", 1)
                    v_name = self.normalize_var(v)
                    self.variables[v_name] = self.evaluate_expression(e); self.constants.add(v_name)

            elif cmd in ("STOP", "END"):
                self.running_program_flag = False
                if cmd == "STOP":
                    self.break_pc = self.pc + 1
                    self.status_message = f"9 STOP statement, {self.sorted_lines[self.pc] if self.sorted_lines else 0}:1"
                    self.draw_screen(); self.flush_keyboard()
                else: self.status_message = "0 OK, 0:0"

            elif cmd == "CLEAR":
                for s in list(self.streams.keys()):
                    try: self.streams[s]['file'].close()
                    except: pass
                self.streams.clear(); self.variables.clear(); self.arrays.clear(); self.user_functions.clear()
                self.for_stack.clear(); self.gosub_stack.clear(); self.proc_stack.clear(); self.scope_stack.clear()
                self.while_stack.clear(); self.do_stack.clear(); self.repeat_stack.clear()
                self.active_after_timers.clear(); self.active_every_timers.clear(); self.data_ptr = 0
                self.status_message = "0 OK, 0:0"

            elif cmd in ("WINDOW", "CONSOLE", "CMODE", "VDU", "MODE"):
                if cmd == "WINDOW":
                    args = [a.strip() for a in stmt[6:].split(',')]
                    if len(args) == 4: self.viewport = {'x': int(self.evaluate_expression(args[0])), 'y': int(self.evaluate_expression(args[1])), 'w': int(self.evaluate_expression(args[2])), 'h': int(self.evaluate_expression(args[3]))}
                elif cmd == "CONSOLE":
                    args = [a.strip() for a in stmt[7:].split(',')]
                    if len(args) == 2: self.resize_console(int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1])))
                elif cmd == "CMODE": self.cmode = int(self.evaluate_expression(stmt[5:].strip()))
                elif cmd == "VDU":
                    vdu_args = [int(self.evaluate_expression(a.strip())) for a in stmt[3:].split(',') if a.strip()]
                    idx = 0
                    while idx < len(vdu_args):
                        code = vdu_args[idx]; idx += 1
                        if code == 7: winsound.Beep(440, 150)
                        elif code == 8: self.cursor_c = max(0, self.cursor_c - 1)
                        elif code == 9: self.cursor_c = min(127, self.cursor_c + 1)
                        elif code == 10: self.cursor_r = min(47, self.cursor_r + 1)
                        elif code == 11: self.cursor_r = max(0, self.cursor_r - 1)
                        elif code == 12: self.clear_text()
                        elif code == 13: self.cursor_c = 0
                        elif code == 16: self.clear_graphics()
                        elif code == 30: self.cursor_r = 0; self.cursor_c = 0
                        elif code == 31 and idx + 1 < len(vdu_args):
                            self.cursor_c = min(127, max(0, vdu_args[idx])); self.cursor_r = min(47, max(0, vdu_args[idx+1])); idx += 2

            elif cmd in ("AFTER", "EVERY"):
                m_timer = re.match(r'(AFTER|EVERY)\s+([0-9\.\+\-\*/\(\)]+)\s*,\s*(.+)', stmt, re.IGNORECASE)
                if m_timer:
                    delay_sec, t_jump = float(self.evaluate_expression(m_timer.group(2))), m_timer.group(3).strip()
                    if cmd == "AFTER":
                        if len(self.active_after_timers) >= 5: self.active_after_timers.pop(0)
                        self.active_after_timers.append({'trigger_time': time.time() + delay_sec, 'target': t_jump})
                    else:
                        if len(self.active_every_timers) >= 5: self.active_every_timers.pop(0)
                        self.active_every_timers.append({'interval': delay_sec, 'next_trigger': time.time() + delay_sec, 'target': t_jump})

            elif cmd in ("OUT", "POKE"):
                args = [a.strip() for a in stmt[len(cmd):].split(',')]
                if len(args) == 2:
                    p1, p2 = int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1]))
                    if cmd == "OUT":
                        if p1 == 254:
                            self.border_color = p2 & 7
                            if (p2 & 16) >> 4: winsound.Beep(800, 10)
                    else:
                        if 0 <= p1 < 65536: self.memory[p1] = p2 % 256

            elif cmd in ("SAVE", "LOAD", "MERGE", "INCLUDE", "CHAIN", "COMMON", "DIR", "CAT"):
                if cmd in ("DIR", "CAT"):
                    files = [f for f in os.listdir('.') if f.lower().endswith('.bb2') or f.lower().endswith('.scr')]
                    if not files: self.print_output("No files found.")
                    else:
                        for f in sorted(files): self.print_output(f)
                    return
                if up == "DIR STREAMS":
                    self.print_output("--- OPEN/CLOSED STREAMS ---")
                    for s_id in range(16): self.print_output(f"Stream #{s_id}: OPEN ({self.streams[s_id]['mode']})" if s_id in self.streams else f"Stream #{s_id}: CLOSED")
                    return
                if up == "DIR SCREEN$":
                    files = [f for f in os.listdir('.') if f.lower().endswith('.scr')]
                    if not files: self.print_output("No .scr files found.")
                    else:
                        for f in sorted(files): self.print_output(f)
                    return
                
                cmd_parts = stmt.split(' ', 1)
                if len(cmd_parts) > 1:
                    if cmd == "COMMON":
                        for v in cmd_parts[1].split(','): self.common_vars.add(self.normalize_var(v))
                        return
                    arg = cmd_parts[1].strip()
                    is_screen = arg.upper().endswith("SCREEN$")
                    fname = str(self.evaluate_expression(arg[:-7].strip() if is_screen else arg))
                    
                    if is_screen:
                        fname += ".scr"
                        if cmd == "SAVE":
                            with open(fname, "wb") as f: pickle.dump({'pixels': self.pixels, 'text_buffer': self.text_buffer}, f)
                            self.print_output(f"Saved screen {fname}")
                        elif cmd == "LOAD" and os.path.exists(fname):
                            with open(fname, "rb") as f:
                                data = pickle.load(f)
                                self.pixels = data['pixels']; self.text_buffer = data['text_buffer']
                            self.print_output(f"Loaded screen {fname}"); self.needs_redraw = True
                    else:
                        if not fname.lower().endswith('.bb2'): fname += ".bb2"
                        if cmd == "SAVE":
                            with open(fname, "w") as f:
                                for l in sorted(self.program.keys()): f.write(f"{l} {self.program[l]}\n")
                            self.print_output(f"Saved {fname}")
                        elif cmd in ("LOAD", "MERGE", "INCLUDE", "CHAIN"):
                            if os.path.exists(fname):
                                is_chain = (cmd == "CHAIN")
                                if cmd == "LOAD" or is_chain:
                                    preserved = {v: self.variables[v] for v in self.common_vars if v in self.variables} if is_chain else {}
                                    self.program.clear(); self.variables.clear(); self.arrays.clear()
                                    self.data_statements.clear(); self.procedures.clear(); self.proc_meta.clear(); self.labels.clear(); self.data_ptr = 0
                                    self.for_stack.clear(); self.gosub_stack.clear(); self.proc_stack.clear(); self.while_stack.clear(); self.repeat_stack.clear(); self.do_stack.clear()
                                    self.current_ink = 0; self.current_paper = 7; self.current_bright = 0; self.current_flash = 0
                                    self.error_target = None; self.tracing = False; self.main_line_num = None
                                    self.clear_text(); self.clear_graphics(); self.variables.update(preserved)
                                
                                inc_prog = {}
                                with open(fname, "r") as f:
                                    for line in f:
                                        line = self.auto_caps(line.strip())
                                        if line and line.split(' ', 1)[0].isdigit():
                                            l_num = int(line.split(' ', 1)[0])
                                            l_code = line.split(' ', 1)[1].strip()
                                            if l_code.upper().startswith("DEF FN"): self.register_user_function(l_code[6:].strip())
                                            if cmd == "INCLUDE": inc_prog[l_num] = l_code
                                            else: self.program[l_num] = l_code
                                            
                                if cmd == "INCLUDE" and inc_prog:
                                    curr_new = (max(self.program.keys()) if self.program else 0) + 100
                                    old_to_new = {l: curr_new + (i*10) for i, l in enumerate(sorted(inc_prog.keys()))}
                                    for old_l, code in inc_prog.items():
                                        def rep(m): return f"{m.group(1)}{old_to_new[int(m.group(2))]}" if int(m.group(2)) in old_to_new else m.group(0)
                                        self.program[old_to_new[old_l]] = re.sub(r'(?i)\b(GOTO|GOSUB|THEN|ELSE)\s+(\d+)\b', rep, code)
                                
                                self.print_output(f"Loaded/Merged {fname}"); self.status_message = "0 OK, 0:0"
                                if is_chain: self.run_program()
                                else: self.scan_program(); self.auto_list()
                            else: self.status_message = "File not found"

            elif cmd in ("SELECT", "FIND", "WRITE", "EXTRACT", "UPDATE"):
                if up.startswith("SELECT "): self.selected_file = str(self.evaluate_expression(stmt[7:].strip()))
                elif up.startswith("FIND "):
                    m_find = re.match(r'FIND\s+([A-Z][A-Z0-9_\$]*)\s*=\s*(.+?)\s+FROM\s+(.+)', stmt, re.IGNORECASE)
                    if m_find:
                        v_name, key_val, fname = m_find.group(1), self.evaluate_expression(m_find.group(2)), str(self.evaluate_expression(m_find.group(3)))
                        if not fname.lower().endswith('.dat'): fname += ".dat"
                        found_val = 0
                        if os.path.exists(fname):
                            with open(fname, "r") as f:
                                for line in f:
                                    if str(key_val) in line: found_val = line.strip(); break
                        self.set_variable(v_name, found_val)
                elif up.startswith("WRITE #"):
                    m_write = re.match(r'WRITE\s*#\s*([0-9]+)\s*,\s*(.*)', stmt, re.IGNORECASE)
                    if m_write:
                        s_num, val = int(m_write.group(1)), str(self.evaluate_expression(m_write.group(2)))
                        if s_num in self.streams and self.streams[s_num]['mode'] == 'W':
                            self.streams[s_num]['file'].write(val + "\n"); self.streams[s_num]['file'].flush()

            elif cmd in ("PUSH", "POP"):
                if cmd == "PUSH":
                    tgt_pc = self.resolve_target_pc(stmt[4:].strip())
                    if tgt_pc is not None: self.gosub_stack.append(tgt_pc)
                    else:
                        try:
                            val = int(self.evaluate_expression(stmt[4:].strip()))
                            if val in self.sorted_lines: self.gosub_stack.append(self.sorted_lines.index(val))
                        except: self.status_message = "2 Syntx error in PUSH"
                elif cmd == "POP":
                    rest = stmt[3:].strip()
                    if self.gosub_stack:
                        pc_val = self.gosub_stack.pop()
                        if rest: self.set_variable(rest, self.sorted_lines[pc_val] if pc_val < len(self.sorted_lines) else pc_val)
                    else: self.status_message = "1 Stack empty for POP"

            elif up.startswith(("RETURN WHEN ", "RETURN IF ")):
                cond_str = stmt[12:].strip() if up.startswith("R W") else stmt[10:].strip()
                if self.evaluate_expression(cond_str):
                    if self.scope_stack and self.proc_stack:
                        ret_pc, _ = self.proc_stack.pop(); self.scope_stack.pop(); self.pc = ret_pc; self.jumped = True
                    elif self.gosub_stack: self.pc = self.gosub_stack.pop(); self.jumped = True
                    else: self.status_message = "1 Return without GOSUB/PROC"

            elif cmd == "RETURN":
                if self.gosub_stack: self.pc = self.gosub_stack.pop(); self.jumped = True
                else: self.status_message = "1 Return without GOSUB"

            elif cmd in ("CALL", "PROC"):
                raw_call = stmt[len(cmd):].strip()
                p_name = raw_call.split('(')[0].strip().upper()
                arg_vals = []
                if '(' in raw_call and raw_call.endswith(')'): arg_vals = [self.evaluate_expression(a.strip()) for a in raw_call[raw_call.index('(')+1:-1].split(',') if a.strip()]
                elif ' ' in raw_call:
                    p_name = raw_call.split(' ', 1)[0].strip().upper()
                    arg_vals = [self.evaluate_expression(a.strip()) for a in raw_call.split(' ', 1)[1].strip().split(',') if a.strip()]
                
                if p_name in self.procedures:
                    meta = self.proc_meta.get(p_name, {'params': [], 'locals': set(), 'all_local': False})
                    local_vars = {meta['params'][i]: arg_vals[i] for i in range(min(len(meta['params']), len(arg_vals)))}
                    frame = {'vars': local_vars, 'params': set(meta['params']), 'explicit_locals': set(meta['locals']), 'explicit_globals': set(), 'all_local': meta['all_local']}
                    self.proc_stack.append((self.pc + 1, frame)); self.scope_stack.append(frame); self.pc = self.procedures[p_name]; self.jumped = True
                else:
                    tgt_pc = self.resolve_target_pc(raw_call)
                    if tgt_pc is not None: self.gosub_stack.append(self.pc + 1); self.pc = tgt_pc; self.jumped = True
                    else: self.status_message = f"C Procedure, Sub, or Label not found: {raw_call}"

            elif up in ("ENDPROC", "END SUB", "ENDSUB"):
                if self.proc_stack: ret_pc, _ = self.proc_stack.pop(); self.scope_stack.pop(); self.pc = ret_pc; self.jumped = True
                else: self.status_message = "1 END without CALL"

            elif cmd == "LOCAL":
                if self.scope_stack:
                    for v in [self.normalize_var(v) for v in stmt[5:].split(',') if v.strip()]: self.scope_stack[-1]['explicit_locals'].add(v)

            elif cmd == "GLOBAL":
                if self.scope_stack:
                    for v in [self.normalize_var(v) for v in stmt[6:].split(',') if v.strip()]:
                        self.scope_stack[-1]['explicit_globals'].add(v)
                        if v in self.scope_stack[-1]['vars']: self.variables[v] = self.scope_stack[-1]['vars'][v]

            elif cmd in ("GOTO", "GOSUB"):
                tgt_pc = self.resolve_target_pc(stmt[len(cmd):].strip())
                if tgt_pc is not None: 
                    if cmd == "GOSUB": self.gosub_stack.append(self.pc + 1)
                    self.pc = tgt_pc; self.jumped = True
                else: self.status_message = "D Out of data / Label not found"

            elif up.startswith("SET TAB "): self.tab_stop_size = max(1, int(self.evaluate_expression(stmt[8:].strip())))

            elif cmd in ("AT", "LOCATE"):
                args = [a.strip() for a in stmt[len(cmd):].split(',')]
                if len(args) == 2: self.cursor_r, self.cursor_c = min(47, max(0, int(self.evaluate_expression(args[0])))), min(127, max(0, int(self.evaluate_expression(args[1]))))

            elif up.startswith(("OPEN #", "CLOSE #")):
                if up.startswith("OPEN"):
                    m_open = re.match(r'OPEN\s*#\s*([0-9]+)\s*,\s*"([WR])"\s*,\s*(.+)', stmt, re.IGNORECASE)
                    if m_open:
                        s_num, mode, fname = int(m_open.group(1)), m_open.group(2).upper(), str(self.evaluate_expression(m_open.group(3)))
                        if not fname.lower().endswith('.dat'): fname += ".dat"
                        if mode == 'W': self.streams[s_num] = {'file': open(fname, "w"), 'mode': 'W', 'name': fname}
                        elif mode == 'R':
                            if os.path.exists(fname): self.streams[s_num] = {'file': open(fname, "r"), 'mode': 'R', 'name': fname}
                            else: self.status_message = f"File not found: {fname}"
                elif up.startswith("CLOSE"):
                    m_close = re.match(r'CLOSE\s*#\s*([0-9]+)', stmt, re.IGNORECASE)
                    if m_close:
                        s_num = int(m_close.group(1))
                        if s_num in self.streams: self.streams[s_num]['file'].close(); del self.streams[s_num]

            elif cmd == "MAT":
                mat_cmd = stmt[3:].strip()
                mat_upper = mat_cmd.upper()
                if mat_upper.startswith("PRINT "):
                    arr = self.arrays.get(self.normalize_var(mat_cmd[6:].strip()))
                    if arr:
                        if len(arr['dims']) == 1: self.print_output("  ".join(str(arr['data'].get((i,), 0)) for i in range(arr['dims'][0])))
                        elif len(arr['dims']) == 2:
                            for r in range(arr['dims'][0]): self.print_output("  ".join(str(arr['data'].get((r, c), 0)) for c in range(arr['dims'][1])))
                    else: self.status_message = f"Array not found: {mat_cmd[6:].strip()}"
                elif mat_upper.startswith("READ "):
                    arr = self.arrays.get(self.normalize_var(mat_cmd[5:].strip()))
                    if arr:
                        if len(arr['dims']) == 1:
                            for i in range(arr['dims'][0]):
                                if self.data_ptr < len(self.data_statements): arr['data'][(i,)] = self.data_statements[self.data_ptr]; self.data_ptr += 1
                        elif len(arr['dims']) == 2:
                            for r in range(arr['dims'][0]):
                                for c in range(arr['dims'][1]):
                                    if self.data_ptr < len(self.data_statements): arr['data'][(r, c)] = self.data_statements[self.data_ptr]; self.data_ptr += 1
                elif "=" in mat_cmd:
                    dest_str, expr_str = mat_cmd.split("=", 1)
                    dest_name, expr_upper = self.normalize_var(dest_str), expr_str.strip().upper()
                    if dest_name not in self.arrays: self.arrays[dest_name] = {'dims': [10, 10], 'data': {}}
                    arr_dest = self.arrays[dest_name]
                    if expr_upper == "ZER": arr_dest['data'].clear()
                    elif expr_upper == "CON":
                        for i in range(arr_dest['dims'][0]):
                            if len(arr_dest['dims']) == 1: arr_dest['data'][(i,)] = 1
                            elif len(arr_dest['dims']) == 2:
                                for c in range(arr_dest['dims'][1]): arr_dest['data'][(i, c)] = 1
                    elif expr_upper == "IDN":
                        arr_dest['data'].clear()
                        if len(arr_dest['dims']) == 2 and arr_dest['dims'][0] == arr_dest['dims'][1]:
                            for i in range(arr_dest['dims'][0]): arr_dest['data'][(i, i)] = 1
                    elif expr_upper.startswith("TRN("):
                        m_trn = re.match(r'TRN\s*\(\s*([A-Z][A-Z0-9_\$]*)\s*\)', expr_str.strip(), re.IGNORECASE)
                        if m_trn and self.normalize_var(m_trn.group(1)) in self.arrays:
                            src_arr = self.arrays[self.normalize_var(m_trn.group(1))]; arr_dest['data'].clear()
                            for k, val in src_arr['data'].items():
                                if len(k) == 2: arr_dest['data'][(k[1], k[0])] = val
                    else:
                        m_scalar = re.match(r'^\(\s*(.+)\s*\)\s*\*\s*([A-Z][A-Z0-9_\$]*)$', expr_str.strip())
                        if m_scalar and self.normalize_var(m_scalar.group(2)) in self.arrays:
                            scalar_val = self.evaluate_expression(m_scalar.group(1))
                            arr_dest['data'] = {k: v * scalar_val for k, v in self.arrays[self.normalize_var(m_scalar.group(2))]['data'].items()}
                        elif self.normalize_var(expr_str.strip()) in self.arrays:
                            src_arr = self.arrays[self.normalize_var(expr_str.strip())]
                            arr_dest['dims'] = list(src_arr['dims']); arr_dest['data'] = dict(src_arr['data'])

            elif cmd in ("LIST", "RUN", "NEW", "PAUSE", "READ", "RESTORE", "AUTO", "DELETE", "RENUMBER", "RENUM", "TRON", "TROFF"):
                if cmd == "LIST": self.auto_list()
                elif cmd == "RUN":
                    self.variables.clear(); self.arrays.clear(); self.gosub_stack.clear(); self.proc_stack.clear()
                    self.for_stack.clear(); self.while_stack.clear(); self.repeat_stack.clear(); self.do_stack.clear()
                    self.active_after_timers.clear(); self.active_every_timers.clear()
                    self.data_ptr, self.current_ink, self.current_paper, self.current_bright, self.current_flash = 0, 0, 7, 0, 0
                    self.error_target, self.tracing = None, False
                    for s in list(self.streams.keys()):
                        try: self.streams[s]['file'].close()
                        except: pass
                    self.streams.clear(); self.key_buffer = "" 
                    self.clear_text(); self.clear_graphics(); self.status_message = "0 OK, 0:0"
                    self.run_program()
                elif cmd == "NEW":
                    self.program.clear(); self.variables.clear(); self.arrays.clear()
                    self.data_statements.clear(); self.procedures.clear(); self.proc_meta.clear(); self.labels.clear(); self.user_functions.clear()
                    self.data_ptr = 0; self.for_stack.clear(); self.gosub_stack.clear(); self.proc_stack.clear()
                    self.while_stack.clear(); self.repeat_stack.clear(); self.do_stack.clear()
                    self.active_after_timers.clear(); self.active_every_timers.clear()
                    self.current_ink, self.current_paper, self.current_bright, self.current_flash = 0, 7, 0, 0
                    self.error_target, self.tracing, self.main_line_num = None, False, None
                    for s in list(self.streams.keys()):
                        try: self.streams[s]['file'].close()
                        except: pass
                    self.streams.clear(); self.clear_text(); self.clear_graphics(); self.status_message = "0 OK, 0:0"
                elif cmd == "PAUSE":
                    self.draw_screen(); self.last_draw_time = time.time()
                    time.sleep(float(self.evaluate_expression(stmt[5:].strip())) / 50.0)
                elif cmd == "READ":
                    for var_name in stmt[4:].split(','):
                        if self.data_ptr < len(self.data_statements): self.set_variable(var_name.strip(), self.data_statements[self.data_ptr]); self.data_ptr += 1
                        else: self.status_message = "D Out of data"; break
                elif cmd == "RESTORE":
                    arg = stmt[7:].strip()
                    if arg:
                        try:
                            tgt_line = int(self.evaluate_expression(arg))
                            if tgt_line in self.data_line_map: self.data_ptr = self.data_line_map[tgt_line]
                            else: self.status_message = "D Out of data / Line not found for RESTORE"
                        except:
                            tgt_pc = self.resolve_target_pc(arg)
                            if tgt_pc is not None and self.sorted_lines[tgt_pc] in self.data_line_map: self.data_ptr = self.data_line_map[self.sorted_lines[tgt_pc]]
                            else: self.status_message = "2 Syntx error in RESTORE"
                    else: self.data_ptr = 0
                elif cmd == "AUTO":
                    args_str, start, step = stmt[4:].strip(), (max(self.program.keys()) + 10) if self.program else 10, 10
                    if args_str:
                        try:
                            if up.startswith("AUTO STEP "): step = int(self.evaluate_expression(stmt[10:].strip()))
                            elif "," in args_str: start, step = int(self.evaluate_expression(args_str.split(",")[0].strip())), int(self.evaluate_expression(args_str.split(",")[1].strip()))
                            elif args_str.startswith(","): step = int(self.evaluate_expression(args_str[1:].strip()))
                            else: start = int(self.evaluate_expression(args_str))
                        except: self.status_message = "2 Syntx error"; return
                    self.auto_mode = True; self.auto_line = start; self.auto_step = step
                    self.current_input = f"{self.auto_line} "; self.input_cursor_pos = len(self.current_input); self.needs_redraw = True
                elif cmd == "DELETE":
                    arg = stmt[6:].strip()
                    try:
                        if '-' in arg:
                            start_str, end_str = arg.split('-')[0].strip(), arg.split('-')[1].strip() if len(arg.split('-')) > 1 else ""
                            start_val = int(self.evaluate_expression(start_str)) if start_str else (min(self.program.keys()) if self.program else 0)
                            end_val = int(self.evaluate_expression(end_str)) if end_str else (max(self.program.keys()) if self.program else 0)
                            for l in [l for l in self.program.keys() if start_val <= l <= end_val]: del self.program[l]
                        else:
                            line_num = int(self.evaluate_expression(arg))
                            if line_num in self.program: del self.program[line_num]
                        self.status_message = "0 OK, 0:0"; self.auto_list()
                    except: self.status_message = "2 Syntx error in DELETE"
                elif cmd in ("RENUMBER", "RENUM"):
                    args_str = stmt[(8 if cmd == "RENUMBER" else 5):].strip()
                    try:
                        new_start, old_start, step = 10, min(self.program.keys()) if self.program else 10, 10
                        if args_str:
                            args = [a.strip() for a in args_str.split(',')]
                            if len(args) >= 1 and args[0]: new_start = int(self.evaluate_expression(args[0]))
                            if len(args) >= 2 and args[1]: old_start = int(self.evaluate_expression(args[1]))
                            if len(args) >= 3 and args[2]: step = int(self.evaluate_expression(args[2]))
                        old_to_new = {l: new_start + i*step for i, l in enumerate(sorted([l for l in self.program.keys() if l >= old_start]))}
                        for l in self.program.keys():
                            if l < old_start: old_to_new[l] = l
                        new_prog = {}
                        for old_l, code in self.program.items():
                            def rep(m): return f"{m.group(1)}{old_to_new[int(m.group(2))]}" if int(m.group(2)) in old_to_new else m.group(0)
                            new_prog[old_to_new.get(old_l, old_l)] = re.sub(r'(?i)\b(GOTO|GOSUB|THEN|ELSE)\s+(\d+)\b', rep, code)
                        self.program = new_prog; self.status_message = "0 OK, 0:0"; self.auto_list()
                    except: self.status_message = "C Nonsense in RENUMBER"
                elif cmd == "TRON": self.tracing = True
                elif cmd == "TROFF": self.tracing = False; self.status_message = "0 OK, 0:0"

            elif up.startswith("EDIT "):
                try:
                    tgt_line = int(self.evaluate_expression(stmt[5:].strip()))
                    if tgt_line in self.program:
                        self.current_input = f"{tgt_line} {self.program[tgt_line]}"
                        self.input_cursor_pos = len(self.current_input); self.needs_redraw = True; self.running_program_flag = False 
                    else: self.status_message = f"Line {tgt_line} not found"
                except: self.status_message = "2 Syntx error"

            elif up in ("LIST VAR", "LIST VARS"): self.list_variables()

            elif cmd in ("QUIT", "EXIT") and len(stmt.split()) == 1:
                for s in list(self.streams.keys()):
                    try: self.streams[s]['file'].close()
                    except: pass
                self.running = False

            elif cmd == "IF":
                parts = re.split(r'(?i)\bTHEN\b', stmt[3:], maxsplit=1)
                if len(parts) == 2:
                    cond, rest = parts[0].strip(), parts[1].strip()
                    if not rest:
                        if not self.evaluate_expression(cond):
                            if self.pc in self.if_blocks:
                                tgt = self.if_blocks[self.pc]['else_pc']
                                self.pc = tgt if tgt is not None else self.if_blocks[self.pc]['endif_pc']
                                self.jumped = True
                    else:
                        if self.evaluate_expression(cond):
                            true_part = re.split(r'(?i)\bELSE\b', rest, maxsplit=1)[0].strip() if re.search(r'(?i)\bELSE\b', rest) else rest
                            tgt_pc = self.resolve_target_pc(true_part)
                            if tgt_pc is not None: self.pc = tgt_pc; self.jumped = True
                            else: self.execute_statement(true_part)
                        else:
                            if re.search(r'(?i)\bELSE\b', rest):
                                false_part = re.split(r'(?i)\bELSE\b', rest, maxsplit=1)[1].strip()
                                tgt_pc = self.resolve_target_pc(false_part)
                                if tgt_pc is not None: self.pc = tgt_pc; self.jumped = True
                                else: self.execute_statement(false_part)
                else: self.status_message = "2 Syntx error in IF"

            elif cmd == "CASE": self.case_eval_stack.append({'val': self.evaluate_expression(stmt[4:].strip()), 'matched': False})
            elif cmd == "WHEN":
                if self.case_eval_stack:
                    if not self.case_eval_stack[-1]['matched']:
                        if self.case_eval_stack[-1]['val'] == self.evaluate_expression(stmt[4:].strip()): self.case_eval_stack[-1]['matched'] = True
                        else:
                            if self.pc in self.case_blocks: self.pc = self.case_blocks[self.pc]['next_branch_pc']; self.jumped = True
                    else:
                        if self.pc in self.case_blocks: self.pc = self.case_blocks[self.pc]['endcase_pc']; self.jumped = True
            elif cmd in ("DEFAULT", "OTHERWISE"):
                if self.case_eval_stack:
                    if self.case_eval_stack[-1]['matched']:
                        if self.pc in self.case_blocks: self.pc = self.case_blocks[self.pc]['endcase_pc']; self.jumped = True
                    else: self.case_eval_stack[-1]['matched'] = True
            elif up in ("ENDCASE", "END CASE"):
                if self.case_eval_stack: self.case_eval_stack.pop()
            elif cmd == "ELSE":
                for if_idx, block in self.if_blocks.items():
                    if block['else_pc'] == self.pc + 1 or block.get('else_pc') == self.pc:
                        if block['endif_pc'] is not None: self.pc = block['endif_pc']; self.jumped = True; break

            elif cmd == "FOR":
                v_name_part, rem = stmt[3:].strip().split("=", 1)
                v_name = self.normalize_var(v_name_part)
                is_active = False
                for idx, stack_frame in enumerate(self.for_stack):
                    if stack_frame['var'] == v_name and stack_frame['pc'] == self.pc:
                        is_active = True; self.for_stack.append(self.for_stack.pop(idx)); break
                if not is_active:
                    if re.search(r'(?i)\bSTEP\b', rem):
                        to_part, step_part = re.split(r'(?i)\bSTEP\b', rem, maxsplit=1)
                        start_str, end_str = re.split(r'(?i)\bTO\b', to_part, maxsplit=1)
                        s_val, e_val, st_val = self.evaluate_expression(start_str), self.evaluate_expression(end_str), self.evaluate_expression(step_part)
                    else:
                        start_str, end_str = re.split(r'(?i)\bTO\b', rem, maxsplit=1)
                        s_val, e_val, st_val = self.evaluate_expression(start_str), self.evaluate_expression(end_str), 1
                    self.set_variable(v_name, s_val); self.for_stack.append({'var': v_name, 'end': e_val, 'step': st_val, 'pc': self.pc})

            elif cmd == "NEXT":
                v_name = self.normalize_var(stmt[4:])
                if self.for_stack:
                    loop = self.for_stack[-1]
                    if loop['var'] == v_name:
                        curr_val = self.get_variable(v_name) + loop['step']
                        self.set_variable(v_name, curr_val)
                        if (curr_val > loop['end']) if loop['step'] > 0 else (curr_val < loop['end']): self.for_stack.pop()
                        else: self.pc = loop['pc']; self.jumped = True 
                    else: self.status_message = "2 Syntx error (NEXT variable mismatch)"
                else: self.status_message = "1 NEXT without FOR"

            elif cmd == "WHILE":
                if self.evaluate_expression(stmt[5:].strip()): 
                    if not self.while_stack or self.while_stack[-1] != self.pc: self.while_stack.append(self.pc)
                else:
                    if self.while_stack and self.while_stack[-1] == self.pc: self.while_stack.pop()
                    while self.pc < len(self.sorted_lines) and not "WEND" in self.program[self.sorted_lines[self.pc]].upper(): self.pc += 1
                    self.jumped = True
            elif cmd == "WEND":
                if self.while_stack: self.pc = self.while_stack[-1]; self.jumped = True

            elif cmd == "REPEAT":
                if not self.repeat_stack or self.repeat_stack[-1] != self.pc: self.repeat_stack.append(self.pc)
            elif cmd == "UNTIL":
                if not self.evaluate_expression(stmt[5:].strip()):
                    if self.repeat_stack: self.pc = self.repeat_stack[-1]; self.jumped = True
                else: 
                    if self.repeat_stack: self.repeat_stack.pop()

            elif cmd == "DO":
                if not self.do_stack or self.do_stack[-1] != self.pc: self.do_stack.append(self.pc)
            elif cmd == "LOOP":
                if self.do_stack: self.pc = self.do_stack[-1]; self.jumped = True

            elif cmd == "EXIT":
                rest = stmt[4:].strip()
                do_exit = bool(self.evaluate_expression(rest[3:].strip())) if rest.upper().startswith("IF ") else True
                target_type = rest[3:].split('IF')[0].strip().upper() if rest.upper().startswith("IF ") else rest.upper()
                if do_exit:
                    if target_type == "FOR" or (not target_type and self.for_stack):
                        if self.for_stack: self.for_stack.pop(); self.pc = self.find_closing_token("NEXT"); self.jumped = True
                    elif target_type == "WHILE" or (not target_type and self.while_stack):
                        if self.while_stack: self.while_stack.pop(); self.pc = self.find_closing_token("WEND"); self.jumped = True
                    elif target_type == "REPEAT" or (not target_type and self.repeat_stack):
                        if self.repeat_stack: self.repeat_stack.pop(); self.pc = self.find_closing_token("UNTIL"); self.jumped = True
                    elif target_type == "DO" or (not target_type and self.do_stack):
                        if self.do_stack: self.do_stack.pop(); self.pc = self.find_closing_token("LOOP"); self.jumped = True
                    elif target_type in ("PROC", "SUB") or (not target_type and self.proc_stack):
                        if self.proc_stack: self.proc_stack.pop(); ret_pc, _ = self.proc_stack.pop() if len(self.proc_stack) > 0 else (0, None); self.scope_stack.pop() if self.scope_stack else None; self.pc = ret_pc; self.jumped = True

            elif cmd in ("PLOT", "DRAW", "CIRCLE", "BOX", "ELLIPSE", "ARC"):
                if cmd == "PLOT":
                    args = [a.strip() for a in stmt[4:].split(',')]
                    if len(args) == 2: self.draw_pixel(int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1]))); self.last_plot_pos = (int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1])))
                elif cmd == "DRAW":
                    args = [a.strip() for a in stmt[4:].split(',')]
                    if len(args) >= 2:
                        x1, y1 = self.last_plot_pos; x2, y2 = x1 + int(self.evaluate_expression(args[0])), y1 + int(self.evaluate_expression(args[1]))
                        self.draw_line(x1, y1, x2, y2); self.last_plot_pos = (x2, y2)
                elif cmd == "CIRCLE":
                    args = [a.strip() for a in stmt[6:].split(',')]
                    if len(args) == 3:
                        x, y, r = int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1])), int(self.evaluate_expression(args[2]))
                        x0, y0, err = r, 0, 0
                        while x0 >= y0:
                            for px, py in [(x+x0, y+y0), (x-x0, y+y0), (x+x0, y-y0), (x-x0, y-y0), (x+y0, y+x0), (x-y0, y+x0), (x+y0, y-x0), (x-y0, y-x0)]: self.draw_pixel(px, py)
                            y0 += 1; err += 1 + 2 * y0
                            if 2 * (err - x0) + 1 > 0: x0 -= 1; err += 1 - 2 * x0
                        self.last_plot_pos = (x + r, y)
                elif cmd == "BOX":
                    args = [a.strip() for a in stmt[3:].split(',')]
                    if len(args) == 4:
                        x1, y1, x2, y2 = int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1])), int(self.evaluate_expression(args[2])), int(self.evaluate_expression(args[3]))
                        self.draw_line(x1, y1, x2, y1); self.draw_line(x2, y1, x2, y2); self.draw_line(x2, y2, x1, y2); self.draw_line(x1, y2, x1, y1)
                elif cmd == "ELLIPSE":
                    args = [a.strip() for a in stmt[7:].split(',')]
                    if len(args) == 4:
                        xc, yc, rx, ry = int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1])), int(self.evaluate_expression(args[2])), int(self.evaluate_expression(args[3]))
                        rx2, ry2, two_rx2, two_ry2 = rx*rx, ry*ry, 2*rx*rx, 2*ry*ry
                        x, y, px, py = 0, ry, 0, 2*rx*rx*ry
                        p = round(ry2 - (rx2 * ry) + (0.25 * rx2))
                        while px < py:
                            x += 1; px += two_ry2
                            if p < 0: p += ry2 + px
                            else: y -= 1; py -= two_rx2; p += ry2 + px - py
                            for cx, cy in [(xc+x, yc+y), (xc-x, yc+y), (xc+x, yc-y), (xc-x, yc-y)]: self.draw_pixel(cx, cy)
                        p = round(ry2 * (x + 0.5) ** 2 + rx2 * (y - 1) ** 2 - rx2 * ry2)
                        while y >= 0:
                            for cx, cy in [(xc+x, yc+y), (xc-x, yc+y), (xc+x, yc-y), (xc-x, yc-y)]: self.draw_pixel(cx, cy)
                            y -= 1; py -= two_rx2
                            if p > 0: p += rx2 - py
                            else: x += 1; px += two_ry2; p += rx2 - py + px
                elif cmd == "ARC":
                    args = [a.strip() for a in stmt[3:].split(',')]
                    if len(args) == 5:
                        xc, yc, r = int(self.evaluate_expression(args[0])), int(self.evaluate_expression(args[1])), int(self.evaluate_expression(args[2]))
                        s_ang, e_ang = float(self.evaluate_expression(args[3])), float(self.evaluate_expression(args[4]))
                        steps = max(10, int(r * abs(e_ang - s_ang) * 2))
                        for i in range(steps + 1): self.draw_pixel(int(xc + r * math.cos(s_ang + (e_ang - s_ang) * (i / steps))), int(yc + r * math.sin(s_ang + (e_ang - s_ang) * (i / steps))))

            elif cmd in ("BEEP", "SOUND", "ENVELOPE", "PLAY"):
                if cmd == "BEEP":
                    args = [a.strip() for a in stmt[4:].split(',')]
                    if len(args) == 2:
                        try: winsound.Beep(max(37, min(int(261.633 * (2.0 ** (float(self.evaluate_expression(args[1])) / 12.0))), 32767)), max(1, int(float(self.evaluate_expression(args[0])) * 1000)))
                        except: self.status_message = "C Nonsense in BEEP"
                elif cmd == "SOUND":
                    args = [a.strip() for a in stmt[5:].split(',')]
                    if len(args) == 4:
                        try:
                            vol, pitch, dur = int(self.evaluate_expression(args[1])), float(self.evaluate_expression(args[2])), float(self.evaluate_expression(args[3]))
                            if vol != 0: winsound.Beep(max(37, min(int(261.633 * (2.0 ** ((pitch - 48.0) / 48.0))), 32767)), max(1, int(dur * 50)))
                            else: time.sleep(dur * 0.05)
                        except: self.status_message = "C Nonsense in SOUND"
                elif cmd == "ENVELOPE":
                    args = [a.strip() for a in stmt[8:].split(',')]
                    if len(args) >= 2:
                        try: self.envelopes[int(self.evaluate_expression(args[0]))] = [self.evaluate_expression(a) for a in args[1:]]
                        except: self.status_message = "C Nonsense in ENVELOPE"
                elif cmd == "PLAY":
                    expr = stmt[4:].strip()
                    if expr.startswith('"') and expr.endswith('"'):
                        note_str, octave, tempo, default_len, volume = expr[1:-1], 4, 120, 4, 15
                        try:
                            i = 0
                            while i < len(note_str):
                                ch = note_str[i].upper(); i += 1
                                if ch == 'O' and i < len(note_str) and note_str[i].isdigit(): octave = int(note_str[i]); i += 1
                                elif ch == 'T':
                                    num_str = ""
                                    while i < len(note_str) and note_str[i].isdigit(): num_str += note_str[i]; i += 1
                                    if num_str: tempo = int(num_str)
                                elif ch == 'L':
                                    num_str = ""
                                    while i < len(note_str) and note_str[i].isdigit(): num_str += note_str[i]; i += 1
                                    if num_str: default_len = int(num_str)
                                elif ch == 'V':
                                    num_str = ""
                                    while i < len(note_str) and note_str[i].isdigit(): num_str += note_str[i]; i += 1
                                    if num_str: volume = int(num_str)
                                elif ch == '>': octave = min(8, octave + 1)
                                elif ch == '<': octave = max(0, octave - 1)
                                elif ch in ('C', 'D', 'E', 'F', 'G', 'A', 'B'):
                                    semitone = {'C':0, 'D':2, 'E':4, 'F':5, 'G':7, 'A':9, 'B':11}[ch]
                                    if i < len(note_str) and note_str[i] in ('#', '+'): semitone += 1; i += 1
                                    elif i < len(note_str) and note_str[i] == '-': semitone -= 1; i += 1
                                    l_val, num_str = default_len, ""
                                    while i < len(note_str) and note_str[i].isdigit(): num_str += note_str[i]; i += 1
                                    if num_str: l_val = int(num_str)
                                    freq_hz = int(261.633 * (2.0 ** (((octave - 4) * 12 + semitone) / 12.0)))
                                    dur_ms = int((240000 / tempo) / l_val)
                                    if volume > 0: winsound.Beep(max(37, min(freq_hz, 32767)), max(1, dur_ms))
                                    else: time.sleep(dur_ms / 1000.0)
                                elif ch == 'P':
                                    l_val, num_str = default_len, ""
                                    while i < len(note_str) and note_str[i].isdigit(): num_str += note_str[i]; i += 1
                                    if num_str: l_val = int(num_str)
                                    time.sleep((int((240000 / tempo) / l_val)) / 1000.0)
                        except: self.status_message = "C Nonsense in PLAY"

            elif cmd == "LET" or ("=" in stmt and cmd not in VALID_COMMANDS):
                assignment = stmt[4:].strip() if cmd == "LET" else stmt
                v, e = assignment.split("=", 1)
                v = v.strip()
                if "(" in v and v.endswith(")"):
                    arr_name, idx_str = v.split("(", 1)
                    self.set_array_value(arr_name, [i.strip() for i in idx_str[:-1].split(",")], self.evaluate_expression(e))
                elif "." in v:
                    obj, prop = v.split(".", 1)
                    self.set_object_property(obj, prop, self.evaluate_expression(e))
                else:
                    self.set_variable(v, DataObject() if e.strip().upper() in ("NEW OBJECT", "OBJECT") else self.evaluate_expression(e))

            else:
                self.status_message = f"2 Syntx error"
                    
        except Exception as e:
            err_str = str(e)
            self.last_error_msg = err_str
            self.error_line = self.sorted_lines[self.pc] if hasattr(self, 'sorted_lines') and self.sorted_lines and self.pc < len(self.sorted_lines) else 0
            if self.break_target:
                if tgt_pc := self.resolve_target_pc(self.break_target):
                    self.pc = tgt_pc; self.jumped = True; self.status_message = "0 OK, 0:0"; return
            if self.error_target:
                if tgt_pc := self.resolve_target_pc(self.error_target):
                    self.pc = tgt_pc; self.jumped = True; self.status_message = "0 OK, 0:0"; return
                else:
                    p_name = self.error_target.upper().split('(')[0].strip()
                    if p_name in self.procedures:
                        self.proc_stack.append((self.pc + 1, {'vars': {}, 'params': set(), 'explicit_locals': set(), 'explicit_globals': set(), 'all_local': False}))
                        self.pc = self.procedures[p_name]; self.jumped = True; self.status_message = "0 OK, 0:0"; return
            
            if err_str and (err_str[0].isdigit() or err_str.upper().startswith(("A ", "B ", "C ", "D ", "E ", "F "))): self.status_message = f"{err_str}, {self.error_line}:1"
            elif " -> " in err_str: self.status_message = f"C Expr Error: {err_str}, {self.error_line}:1"
            else: self.status_message = f"C Nonsense in BASIC: {err_str}, {self.error_line}:1"

    def scan_program(self):
        self.data_statements.clear(); self.data_line_map.clear(); self.procedures.clear(); self.proc_meta.clear(); self.labels.clear(); self.if_blocks.clear(); self.case_blocks.clear(); self.main_line_num = None
        cleaned_program, in_block_comment = {}, False
        for l_num in sorted(self.program.keys()):
            code = self.program[l_num]
            if "/#" in code: in_block_comment = True
            if "#/" in code: in_block_comment = False; continue
            if in_block_comment: continue
            cleaned_program[l_num] = code

        for idx, l_num in enumerate(sorted(cleaned_program.keys())):
            code = cleaned_program[l_num].strip()
            in_str = False; curr = ""; stmts = []
            for char in code:
                if char == '"': in_str = not in_str
                if char == ':' and not in_str:
                    if curr.strip(): stmts.append(curr.strip())
                    curr = ""
                else: curr += char
            if curr.strip(): stmts.append(curr.strip())
            
            for stmt in stmts:
                stmt_up = stmt.upper()
                if stmt_up.startswith("/") or stmt_up.startswith("REM"): continue
                if stmt_up.startswith("DATA"):
                    if l_num not in self.data_line_map: self.data_line_map[l_num] = len(self.data_statements)
                    for item in stmt[4:].split(','):
                        it = item.strip()
                        try: val = float(it) if '.' in it else int(it)
                        except: val = item.strip('"')
                        self.data_statements.append(val)
                elif stmt_up.startswith("MAIN"): self.main_line_num = l_num
                elif stmt_up.startswith("DEF PROC ") or stmt_up.startswith("SUB "):
                    header = stmt[9:].strip() if stmt_up.startswith("DEF PROC ") else stmt[4:].strip()
                    p_name = header.split('(')[0].strip().upper() if '(' in header else header.split('LOCAL')[0].strip().upper()
                    params = []
                    if '(' in header and ')' in header: params = [self.normalize_var(p) for p in header[header.index('(')+1:header.rindex(')')].split(',') if p.strip()]
                    locals_set, all_local = set(), False
                    if 'LOCAL' in header.upper():
                        local_part = header.upper().split('LOCAL')[1].strip()
                        if not local_part: all_local = True
                        else: locals_set = {self.normalize_var(v) for v in local_part.split(',') if v.strip()}
                    self.procedures[p_name] = idx
                    self.proc_meta[p_name] = {'params': params, 'locals': locals_set, 'all_local': all_local}
                elif stmt_up.startswith("LABEL "): self.labels[stmt[6:].strip().upper()] = idx
                elif stmt_up.startswith("DEF FN"): self.register_user_function(stmt[6:].strip())

        self.sorted_lines = sorted(self.program.keys())
        if_stack = []
        for idx, l_num in enumerate(self.sorted_lines):
            code = self.program[l_num].strip().upper()
            if code.startswith("IF ") and code.endswith("THEN"): if_stack.append({'if_idx': idx, 'else_idx': None})
            elif code == "ELSE":
                if if_stack: if_stack[-1]['else_idx'] = idx
            elif code in ("ENDIF", "END IF"):
                if if_stack:
                    frame = if_stack.pop()
                    self.if_blocks[frame['if_idx']] = {'else_pc': frame['else_idx'], 'endif_pc': idx + 1}

        case_stack = []
        for idx, l_num in enumerate(self.sorted_lines):
            code = self.program[l_num].strip().upper()
            if code.startswith("CASE "): case_stack.append({'case_idx': idx, 'branches': []})
            elif code.startswith("WHEN ") or code == "DEFAULT" or code == "OTHERWISE":
                if case_stack: case_stack[-1]['branches'].append(idx)
            elif code in ("ENDCASE", "END CASE"):
                if case_stack:
                    branches = case_stack.pop()['branches']
                    for b_i, b_idx in enumerate(branches):
                        self.case_blocks[b_idx] = {'next_branch_pc': branches[b_i + 1] if b_i + 1 < len(branches) else idx + 1, 'endcase_pc': idx + 1}

    def run_program(self):
        self.scan_program()
        self.running_program_flag = True
        self.sorted_lines = sorted(self.program.keys())
        
        self.pc = 0
        if self.main_line_num is not None:
            for idx, l_num in enumerate(self.sorted_lines):
                if l_num > self.main_line_num:
                    self.pc = idx; break
        
        while self.pc < len(self.sorted_lines) and self.running and getattr(self, 'running_program_flag', True):
            if self.interrupts_enabled:
                now = time.time()
                for t_item in list(self.active_after_timers):
                    if now >= t_item['trigger_time']:
                        self.active_after_timers.remove(t_item)
                        if tgt_pc := self.resolve_target_pc(t_item['target']):
                            self.gosub_stack.append(self.pc + 1); self.pc = tgt_pc; self.jumped = True; break
                for e_item in list(self.active_every_timers):
                    if now >= e_item['next_trigger']:
                        e_item['next_trigger'] = now + e_item['interval']
                        if tgt_pc := self.resolve_target_pc(e_item['target']):
                            self.gosub_stack.append(self.pc + 1); self.pc = tgt_pc; self.jumped = True; break

            if os.name == 'nt' and msvcrt.kbhit():
                char = msvcrt.getch()
                if char == b'\x1b': 
                    self.error_line = self.sorted_lines[self.pc] if self.pc < len(self.sorted_lines) else 0
                    self.status_message = f"L BREAK into program, {self.error_line}:1"
                    if self.break_target:
                        if tgt_pc := self.resolve_target_pc(self.break_target):
                            self.pc = tgt_pc; continue
                    break
                else:
                    try: self.key_buffer = char.decode('utf-8', 'ignore').upper()
                    except: pass

            line_num = self.sorted_lines[self.pc]
            stmt = self.program[line_num]
            
            if stmt.strip().startswith("/#") or stmt.strip().startswith("#/") or stmt.strip().startswith("/") or stmt.strip().upper().startswith("REM"):
                self.pc += 1; continue

            if self.tracing:
                loop_str = f" | LOOP: {self.for_stack[-1]['var']} = {self.get_variable(self.for_stack[-1]['var'])}" if self.for_stack else ""
                self.status_message = f"TRON: LINE {line_num}{loop_str}"

            self.jumped = False
            try:
                self.execute_statement(stmt)
                if not self.status_message.startswith("0") and not self.tracing: raise ValueError(self.status_message)
            except Exception as e:
                err_str = str(e)
                self.last_error_msg = err_str
                self.error_line = self.sorted_lines[self.pc] if hasattr(self, 'sorted_lines') and self.sorted_lines and self.pc < len(self.sorted_lines) else 0
                if self.break_target:
                    if tgt_pc := self.resolve_target_pc(self.break_target):
                        self.pc = tgt_pc; self.jumped = True; self.status_message = "0 OK, 0:0"; continue
                if self.error_target:
                    if tgt_pc := self.resolve_target_pc(self.error_target):
                        self.pc = tgt_pc; self.jumped = True; self.status_message = "0 OK, 0:0"; continue
                    else:
                        p_name = self.error_target.upper().split('(')[0].strip()
                        if p_name in self.procedures:
                            self.proc_stack.append((self.pc + 1, {'vars': {}, 'params': set(), 'explicit_locals': set(), 'explicit_globals': set(), 'all_local': False}))
                            self.pc = self.procedures[p_name]; self.jumped = True; self.status_message = "0 OK, 0:0"; continue
                
                if err_str and (err_str[0].isdigit() or err_str.upper().startswith(("A ", "B ", "C ", "D ", "E ", "F "))): self.status_message = f"{err_str}, {self.error_line}:1"
                elif " -> " in err_str: self.status_message = f"C Expr Error: {err_str}, {self.error_line}:1"
                else: self.status_message = f"C Nonsense in BASIC: {err_str}, {self.error_line}:1"
                break

            if not self.status_message.startswith("0") and not self.tracing: break
            if not getattr(self, 'jumped', False): self.pc += 1
                
            current_time = time.time()
            if current_time - self.last_draw_time >= 0.1 or self.tracing:
                self.draw_screen(); self.last_draw_time = current_time
            time.sleep(0.001)

        for s in list(self.streams.keys()):
            try: self.streams[s]['file'].close()
            except: pass
        self.streams.clear(); self.draw_screen(); self.flush_keyboard()

    def run(self):
        self.set_console_size()
        self.set_colors()

        while self.running:
            if self.needs_redraw:
                self.draw_screen()
                self.needs_redraw = False
                
            if os.name == 'nt':
                if msvcrt.kbhit():
                    char = msvcrt.getch()
                    if char == b'\r':
                        cmd = self.current_input
                        self.current_input = ""
                        self.input_cursor_pos = 0
                        if self.auto_mode:
                            cleaned_cmd = cmd.strip()
                            if not cleaned_cmd:
                                self.auto_mode = False
                                self.status_message = "0 OK, 0:0"
                            else:
                                self.parse_and_execute_line(cleaned_cmd)
                                self.auto_line += self.auto_step
                                if self.auto_mode:
                                    self.current_input = f"{self.auto_line} "
                                    self.input_cursor_pos = len(self.current_input)
                        else:
                            self.parse_and_execute_line(cmd)
                        self.needs_redraw = True
                    elif char == b'\x1b':
                        self.auto_mode = False; self.current_input = ""; self.input_cursor_pos = 0
                        self.status_message = "0 OK, 0:0"; self.needs_redraw = True
                    elif char == b'\x08':
                        if self.input_cursor_pos > 0:
                            self.current_input = self.current_input[:self.input_cursor_pos-1] + self.current_input[self.input_cursor_pos:]
                            self.input_cursor_pos -= 1; self.needs_redraw = True
                    elif char == b'\xe0' or char == b'\x00': 
                        scancode = msvcrt.getch()
                        if scancode == b'K': self.input_cursor_pos = max(0, self.input_cursor_pos - 1); self.needs_redraw = True
                        elif scancode == b'M': self.input_cursor_pos = min(len(self.current_input), self.input_cursor_pos + 1); self.needs_redraw = True
                        elif scancode == b'O': self.running_program_flag = False
                    elif char == b'\x03': self.running = False
                    else:
                        try:
                            dec = char.decode('utf-8', 'ignore')
                            if len(dec) == 1 and ord(dec) >= 32:
                                self.current_input = self.current_input[:self.input_cursor_pos] + dec + self.current_input[self.input_cursor_pos:]
                                self.input_cursor_pos += 1; self.needs_redraw = True
                        except: pass
            else:
                try:
                    cmd = input(f"> {self.current_input}")
                    self.current_input = ""; self.input_cursor_pos = 0
                    self.parse_and_execute_line(cmd); self.needs_redraw = True
                except EOFError: break
            time.sleep(0.01)
        sys.stdout.write("\x1b[0m\x1b[2J"); sys.stdout.flush()

if __name__ == "__main__":
    if os.name == 'nt' and '--standalone' not in sys.argv:
        subprocess.Popen(['start', 'cmd', '/k', sys.executable, __file__, '--standalone'], shell=True)
        sys.exit()
    app = BetaBasicInterpreter()
    app.run()