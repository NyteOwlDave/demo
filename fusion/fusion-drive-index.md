<style>
@import url("https://nyteowldave.neocities.org/style.css");
</style>

<style>
@import url("http://dave-omega/demo/style/sce-hud.css");
</style>

<style>
input[w] {
    width : calc( 100% - 20ch ) !important;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sheet]:
<https://docs.google.com/spreadsheets/d/1j3if4lFQii3OBWYX1tAu6CQ3O1hqj03oLJwB0h59HYo>
"Virtual Drives Spreadsheet"

[me-omega]:
<http://dave-omega/demo/fusion/fusion-drive-index.html>
"Omega Edition"

-----------------------------------------------------------------

# Fusion BASIC Virtual Drives

> [Omega][me-omega]

> [Virtual Drives][sheet]

> [File System](./)

-----------------------------------------------------------------

# Drive Table

-----------------------------------------------------------------

<!--
https://www.edubasic.net/
https://basicfusion.org/
-->

| Index | Letter | Address | Comment                        |
|-------|--------|---------|--------------------------------|
|  1    |   A    | ?       | BASIC Anywhere                 |
|  2    |   B    | ?       | BASIC 256                      |
|  3    |   C    | ?       | Classic BASIC                  |
|  4    |   D    | ?       | Drop Box                       |
|  5    |   E    | ?       | EduBASIC                       |
|  6    |   F    | ?       | BASIC Fusion                   |
|  7    |   G    | ?       | GW BASIC                       |
|  8    |   H    | ?       | Help                           |
|  9    |   I    | ?       | I-Drive                        |
|  10   |   J    | ?       | Jarvis                         |
|  11   |   K    | ?       | Keep Notes                     |
|  12   |   L    | ?       | BASIC Programming Language     |
|  13   |   M    | ?       | Miscrosoft OneDrive            |
|  14   |   N    | ?       | Cloud Notepad                  |
|  15   |   O    | ?       | Online Clipboard               |
|  16   |   P    | ?       | P BASIC                        |
|  17   |   Q    | ?       | QB js                          |
|  18   |   R    | ?       | Real BASIC                     |
|  19   |   S    | ?       | Sedai BASIC                    |
|  20   |   T    | ?       | Thoreau BASIC                  |
|  21   |   U    | ?       | Unicode Standard               |
|  22   |   V    | ?       | Vintage BASIC                  |
|  23   |   W    | ?       | Web QB                         |
|  24   |   X    | ?       | BASIC Wiki                     |
|  25   |   Y    | ?       | BASIC Editions                 |
|  26   |   Z    | ?       | Spectrum ZX BASIC              |

-----------------------------------------------------------------

<div center id="drive_table_menu">
📝 | 📄 | 🔓 | 🔏 | ✅ | ❎ | 📂 | 💾 | 📨 | 🗄️ 
</div>

-----------------------------------------------------------------

# Drive Definition

-----------------------------------------------------------------

<div center id="drive_form">
  <input w id="letter_input"  placeholder="Letter"  />
  <input w id="address_input" placeholder="Address" />
  <input w id="comment_input" placeholder="Comment" />
  <input w id="index_input"   type="number" min="1" max="26" value="1" />
</div>

-----------------------------------------------------------------

<div center id="drive_form_menu">
📝 | 📄 | ⏮️ | ⏪ | ⏩ | ⏭️ | ✅ | ❎ | 🔄 | ⤵️ | ⤴️ | 💠 | 🗑️
</div>

-----------------------------------------------------------------

# BASIC Data

> [BASIC Source Code](./drive-index.bf)

-----------------------------------------------------------------

```basic
DATA "A", "?", "BASIC Anywhere"
DATA "B", "https://www.facebook.com/groups/2057165187928233", "BASIC Programming"
DATA "C", "?", "Online Clipboard"
DATA "D", "?", "DropBox"
DATA "E", "https://www.edubasic.net/", "EduBASIC"
DATA "F", "https://basicfusion.org/", "BASIC Fusion"
DATA "G", "?", "Google Drive"
DATA "H", "?", "Hysteresis"
DATA "I", "?", "I-Drive"
DATA "J", "?", "J: Drive"
DATA "K", "?", "K: Drive"
DATA "L", "?", "L: Drive"
DATA "M", "?", "Microsoft OneDrive"
DATA "N", "?", "N: Drive"
DATA "O", "?", "O: Drive"
DATA "P", "?", "P: Drive"
DATA "Q", "?", "Q: Drive"
DATA "R", "?", "R: Drive"
DATA "S", "?", "S: Drive"
DATA "T", "?", "T: Drive"
DATA "U", "?", "U: Drive"
DATA "V", "?", "V: Drive"
DATA "W", "?", "W: Drive"
DATA "X", "?", "X: Drive"
DATA "Y", "?", "Y: Drive"
DATA "Z", "?", "Z: Drive"
```

-----------------------------------------------------------------

<div center id="basic_menu">
📝 | 📄 | ✅ | ❎ | 🔄 | ⤵️ | ⤴️ | 💠 | 🗑️
</div>

-----------------------------------------------------------------

# JavaScript Table

-----------------------------------------------------------------

```javascript
```

-----------------------------------------------------------------

<div center id="javascript_menu">
📝 | 📄 | ✅ | ❎ | 🔄 | ⤵️ | ⤴️ | 💠 | 🗑️
</div>

-----------------------------------------------------------------

# Results Table

-----------------------------------------------------------------

<table id="user_table"></table>

-----------------------------------------------------------------

<header id="header"></header>

<footer id="footer">
  <input w id="footer_input" onchange="perform(event)" />
</footer>

<textarea id="sce" class="hud hide" wrap="off"></textarea>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc = document
; doc . title = ( doc.querySelector( "H1" ).textContent )
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="https://nyteowldave.github.io/std/api/gems/prolog-beta.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function gbi( index, type ) {
    const arr =( o )=> Array.from( o );
    const m = arr( doc.querySelectorAll( type ) );
    index = parseInt( index );
    return ( m[ index ] );
}
</script>

<script>
function gvw( index, language ) {
    // [code class="language-basic"]
    const lang = str( language );
    const q = ( `.language-${lang}` );
    index = ( parseInt( index ) );
    return ( all( q ) [ index ] );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
const index_input     = gid( "index_input"     );
const letter_input    = gid( "letter_input"    );
const address_input   = gid( "address_input"   );
const comment_input   = gid( "comment_input"   );
const drive_form      = gid( "drive_form"      );
const drive_form_menu = gid( "drive_form_menu" );
const javascript_menu = gid( "javascript_menu" );
const basic_menu      = gid( "basic_menu"      );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        init_drive_table();
        // init_drive_form();
        // init_javascript_view();
        // init_basic_view();
        // show_gadget_types();
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

</script>

<script>
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function get_gadget_types( record ) {
    function compose( t, r ) {
        const whom = ( t );
        const node = ( window[ t ] );
        const kind = ( typeof node );
        const type = ( node ? node.nodeName : "undefined" );
        if ( r ) {
            return [ whom, type, kind ];
        } else {
            return ( `${whom} ~ ${type} ~ ${kind}` );
        }
    }
    const t = [];
    t[  0 ] = compose( "index_input"     , record );
    t[  1 ] = compose( "letter_input"    , record );
    t[  2 ] = compose( "address_input"   , record );
    t[  3 ] = compose( "comment_input"   , record );
    t[  4 ] = compose( "drive_table"     , record );
    t[  5 ] = compose( "drive_form"      , record );
    t[  6 ] = compose( "javascript_view" , record );
    t[  7 ] = compose( "basic_view"      , record );
    t[  8 ] = compose( "drive_table_menu", record );
    t[  9 ] = compose( "drive_form_menu" , record );
    t[ 10 ] = compose( "javascript_menu" , record );
    t[ 11 ] = compose( "basic_menu"      , record );
    return ( t );
}
</script>

<script>
function inspect_gadget_types() {
    const t = get_gadget_types( true );
    const c = console;
    c.clear();
    c.title ( `[ Gadget Types]` );
    c.table( t );
    c.groupEnd();
}
</script>

<script>
function show_gadget_types() {
    const t = get_gadget_types( false );
    t.unshift( `[ Gadget Types]\n` );
    alert( t.join( "\n" ) );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function init_javascript_view( menu ) {
    javascript_view = gvw( 0, "javascript" );
    console.warn( `TODO ~ init_javascript_view()` );
    menu = ( menu || javascript_menu );
    init_decal_menu( menu, javascript_view );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function init_basic_view( menu ) {
    basic_view = gvw( 0, "basic" );
    console.warn( `TODO ~ init_basic_view()` );
    menu = ( menu || basic_menu );
    init_decal_menu( menu, basic_view );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function init_drive_table( menu ) {
    drive_table = gbi( 0, "TABLE" );
    drive_table . id = ( "drive_table" );
    drive_table . key = ( "fusion-drive-table.html" );
    drive_table . read = function( target ) {
        const s = drive_table.innerHTML;
        let ge;
        if ( ge = target ) {
            switch( ge.nodeName ) {
            case "TEXTAREA" : return _value( ge, s );
            case "CODE"     :
            case "PRE"      : return _text ( ge, s );
            default         : return _html ( ge, s );
            }
        }
        function _value( ge, s ) {
            ge . value = str( s );
        }
        function _text( ge, s ) {
            ge . innerText = str( s );
        }
        function _html( ge, s ) {
            if ( ge instanceof HTMLElement ) {
                ge . innerHTML = str( s );
            } else {
                return str( s );
            }
        }
        return str( s );
    };
    drive_table . write = function( source ) {
        let ge, dt = drive_table;
        if ( ge = source ) {
            switch( ge.nodeName ) {
            case "TEXTAREA" : return _value( ge, dt );
            case "CODE"     :
            case "PRE"      : return _text ( ge, dt );
            default         : return _html ( ge, dt );
            }
        }
        function _value( ge, dt ) {
            dt .innerHTML = str( ce . value );
        }
        function _text ( ge, dt ) {
            dt .innerHTML = str( ce . innerText );
        }
        function _html ( ge, dt ) {
            if ( ge instanceof HTMLElement ) {
                dt .innerHTML = str( ge . innerHTML );
            } else {
                dt . innerHTML = str( ge );
            }
        }
        dt . innerHTML = str( ge );
    };
    drive_table . persist = function() {
        const ops = drive_table;
        const store = ops . store();
        const k = ops . key;
        const v = ops . innerHTML;
        store.setItem( k, v );
        console.log( `Wrote "${k}" to Store` );
    };
    drive_table . recover = function() {
        const ops = drive_table;
        const store = ops . store();
        const k = ops . key;
        const v = store.getItem( k );
        if ( null === v ) {
            ops.persist();
            return;
        }
        console.log( `Read "${k}" from Store` );
        ops . innerHTML = str( v );
    };
    drive_table . store = function() {
        let store = localStorage;
        if ( store === null ) {
            store = sessionStorage;
        }
        return ( store );
    };
    menu = ( menu || drive_table_menu  );
    init_decal_menu( menu, drive_table );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function init_drive_form( menu ) {
    function read_index() {
        let i = parseInt( index_input.value );
        if (! isFinite( i ) ) { return 1; }
        if ( i < 1 ) { return 1; }
        return ( i );
    }
    function wrap_index( n, limit ) {
        n = ( ( n - 1 ) % limit );
        if ( n >= 0 ) { return ( n + 1 ); }
        return ( n + limit + 1 );
    }
    function read_rows( owner ) {
        const be = owner.tBodies[ 0 ];
        const m = ale( be, "TR" );
        return ( m );
    }
    function read_records( owner ) {
        const be = owner.tBodies[ 0 ];
        const  m = read_rows( owner );
        return m . map( read_record );
    }
    function read_record( re ) {
        let ce = re.cells[ 0 ];
        const index = parseInt( ce.textContent );
        ce = re.cells[ 1 ];
        const letter = str( ce.textContent );
        ce = re.cells[ 2 ];
        const address = str( ce.textContent );
        ce = re.cells[ 3 ];
        const comment = str( ce.textContent );
        return [ index, letter, address, comment ];
    }
    function write_record( re, record ) {
        re.cells[ 0 ] = record[ 0 ];
        re.cells[ 1 ] = record[ 1 ];
        re.cells[ 2 ] = record[ 2 ];
        re.cells[ 3 ] = record[ 3 ];
    }
    function find_record( index, owner ) {
        const records = read_records( owner );
        return records[ index ];
    }
    function write_form( record ) {
        const index   = parseInt( record[ 0 ] );
        const letter  = str( record[ 1 ] );
        const address = str( record[ 2 ] );
        const comment = str( record[ 3 ] );
        index_input.value   = index;
        letter_input.value  = letter;
        address_input.value = address;
        comment_input.value = comment;
    }
    function read_form() {
        const index   = read_index();
        const letter  = str( letter_input.value );
        const address = str( address_input.value );
        const comment = str( comment_input.value );
        const record = [ index, letter, address, comment ];
        return ( record );
    }
    function move( i, records ) {
        records = ( records || read_records( drive_table ) );
        i = wrap_index( i, records.length );
        const record = records[ i - 1 ];
        write_form( record );
    }
    try {
        const ops = drive_form;
        ops . home = function() {
            move( 0, record );
        };
        drive_form.prev = function() {
            const i = read_index();
            move( i - 1 );
        };
        drive_form.next = function() {
            const i = read_index();
            move( i + 1 );
        };
        drive_form.end = function() {
            const records = read_records( drive_table );
            move( records.length - 1, records );
        };
        drive_form.accept = function() {
            const rows = read_rows( drive_table );
            let i = read_index();
            i = wrap_index( i );
            const re = rows[ i - 1 ];
            const record = read_form();
            write_record( re, record );
        };
        drive_form.reject = function() {
            const records = read_records( drive_table );
            let i = read_index();
            i = wrap_index( i );
            const record = records[ i - 1 ];
            write_form( record );
        };
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
    menu = ( menu || drive_form_menu  );
    init_decal_menu( menu, drive_form );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function populate_user_table( records, schema, title ) {
    const te = user_table;
    te.innerHTML = "";
    const be = te.createTBody();
    let re, ce, cc, columns = 0;
    records = arr( records );
    while ( records.length ) {
        record = arr( records.shift() );
        cc = record.length;
        columns = Math.max( columns, cc );
        re = be.insertRow();
        while ( record.length ) {
            ce = re.insertCell();
            ce . textContent = record.shift();
        }
    }
    schema = arr( schema );
    while ( schema.length < columns ) {
        const n = schema.length;
        const s = ( `Column ${n}` );
        schema.push( s );
    }
    const he = te.createTHead();
    re = he.insertRow();
    while ( schema.length ) {
        ce = elx( "TH" );
        ce . textContent = schema.shift();
        re . appendChild( ce );
    }
    title = str( title );
    if (! title ) {
        const r = be.rows.length;
        const c = columns;
        const rs = ( `Rows : ${r}`    );
        const cs = ( `Columns : ${c}` );
        title = ( `${rs} ~ ${cs}` );
    }
    te.createCaption().textContent = ( title );
    return ( te );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

function populate_method_table() {
    const o = method_map;
    const m = Object.keys( o );
    const records = (
        ( m )
        . map(
            ( k )=> ( [ k, o[ k ] ] )
        )
    );
    const schema = [ "Decal", "Method Name" ];
    const title  = "Method Table";
    return populate_user_table(
        records, schema, title
    );
}

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function read_table_column( table, icol ) {
    const be = table.tBodies[ 0 ];
    const results = [];
    const rows = arr( be.rows );
    let ce;
    rows.forEach(
        ( re ) => {
            ce = re.cells[ icol ];
            results.push( str( ce.textContent ) );
        }
    );
    return ( results );
}
</script>

<script>
function read_table_row( table, irow ) {
    const be = table.tBodies[ 0 ];
    const results = [];
    const rows = arr( be.rows );
    const re = rows[ irow ];
    let s, cells;
    if ( re ) {
        cells = arr( re.cells );
        cells . forEach(
            ( ce ) => {
                s = str( ce.textContent );
                results.push( s );
            }
        );
    }
    return ( results );
}
</script>

<script>
function read_table_schema( table ) {
    const he = table.tHead;
    const results = [];
    const re = he.rows[ 0 ];
    let ce, s;
    if ( re ) {
        cells = arr( re.cells );
        cells . forEach(
            ( ce ) => {
                s = str( ce.textContent );
                results.push( s );
            }
        );
    }
    return ( results );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
method_map = {
  "🔏" : "persist"
, "🔓" : "recover"
, "✅"  : "accept_changes"
, "❎"  : "reject_changes"
, "📂" : "open_file"
, "💾" : "save_file"
, "📨" : "send_mail"
, "🗄️" : "cloud_store"
, "📝" : "edit_mode"
, "📄" : "view_mode"
, "⏮️" : "move_first"
, "⏪" : "move_prev"
, "⏩" : "move_next"
, "⏭️" : "move_last"
, "🗑️" : "clear"
, "💠"  : "zoom"
, "🔄"  : "swap"
, "⤵️"  : "stash"
, "⤴️"  : "resume"
};
// ⏮️ | ⏪ | ⏩ | ⏭️ | ✅ | ❎ | 🔄 | ⤵️ | ⤴️ | 💠 | 🗑️
// 📝 | 📄
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="http://dave-omega/demo/web/gems/decal-menu.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="claim.js" group="events" status="untested">
function claim( ev ) {
    if ( ev instanceof Event ) {
        ( ev ).preventDefault();
        ( ev ).stopPropagation();
    }
    return ( ev );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="perform.js" group="events" status="untested">
function perform( event ) {
    const ops = perform;
    ops.error = "";
    try {
        ops.event = claim( event );
        const sender = event.target;
        const js = sender.value;
        exec( js );
    } catch ( e ) {
        ops.error = ( e.message );
        crashed ( e );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="exec.js" group="scripting" status="untested">
function exec( js ) {
    const ops = exec;
    ops.error = "";
    try {
        const msg = str( js );
        if ( macro( msg ) ) { return; }
        ops.prior  = String( ops.input || "" );
        ops.input  = String( js );
        ops.gems . add( ops.input );
        ops.output = window.eval( ops.input );
    } catch ( e ) {
        ops.error = ( e.message );
        throw ( e );
    }
}
function macro( cmd ) {
    return (! str( cmd ) );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="exec-props.js" group="scripting" status="untested">
; exec . gems   = ( new Set() )
; exec . prior  = ""
; exec . input  = ""
; exec . output = ""
; exec . error  = ""
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="analyze.js" group="scripting" status="untested">
function analyze( o, silent ) {
    o = ( o || exec );
    const _i = [ "Input"  , o.input  ];
    const _o = [ "Output" , o.output ];
    const _e = [ "Error"  , o.error  ];
    const _t = [ _i, _o, _e ];
    if ( silent ) {
        return ( _t );
    } else {
        const c = console;
        c.clear();
        c.group( "[ Script Results ]" );
        c.table( _t );
        c.groupEnd();
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="crashed.js" group="debug" status="untested">
function crashed( e ) {
    console.error( e );
    alert( e );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
