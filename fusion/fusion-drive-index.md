<style>
@import url("https://nyteowldave.neocities.org/style.css");
</style>

<style>
@import url("http://dave-omega/demo/style/sce-hud.css");
</style>

<style>
input[w] {
    width : calc( 100% - 20ch );
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/fusion/fusion-drive-index.html>
"Omega Edition"

-----------------------------------------------------------------

# Fusion BASIC Virtual Drives

> [Omega][me-omega]

> [File System](./)

-----------------------------------------------------------------

# Drive Table

-----------------------------------------------------------------

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

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; doc = document
; doc . title = ( doc.querySelector( "H1" ).textContent )
</script>

<script>
; str =( o )=> String( o || "" ).trim()
; arr =( o )=> Array.from( o || [] )
; unq =( o )=> ( new Set( o || [] ) )
; map =(   )=> ( new Map() )
</script>

<script>
; ale =( t, e )=> arr( ( e ).querySelectorAll( t ) )
; ole =( t, e )=>    ( ( e ).querySelector   ( t ) )
; all =( t )=> ale( t, doc )
; one =( t )=> ole( t, doc )
</script>

<script>
; gid =( i    )=> ( doc.getElementById( i ) )
; gbi =( i, t )=> ( all( t || "H1" )[ i ] );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
const drive_form    = gid( "drive_form"    );
const index_input   = gid( "index_input"   );
const letter_input  = gid( "letter_input"  );
const address_input = gid( "address_input" );
const comment_input = gid( "comment_input" );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        // show_gadget_types();
        init_drive_table();
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function init_drive_table() {
    drive_table = gbi( 0, "TABLE" );
    drive_table . id = ( "drive_table" );
    drive_table . key = ( "fusion-drive-table.html" );
    drive_table . read = function( target ) {
        const s = drive_table.innerHTML;
        let ge;
        if ( ge = target ) {
            switch( t.nodeName ) {
            case "TEXTAREA" : return _value( ge, s );
            case "PRE"      : return _text ( ge, s );
            default         : return _html ( ge, s );
            }
        }
        function _value( ge, s ) {
            ge . value = str( s );
        }
        function _text ( ge, s ) {
            ge . innerText = str( s );
        }
        function _html ( ge, s ) {
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
            switch( t.nodeName ) {
            case "TEXTAREA" : return _value( ge, dt );
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
                return ( s );
            }
        }
        return ( s );
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
            drive_table . persist();
        }
        return ( store );
    };
}
</script>

<script>
function show_gadget_types() {
    function compose( t ) {
        const whom = ( t );
        const type = ( typeof window[ t ] );
        return ( `${whom} ~ ${type}` );
    }
    const m = [];
    m[ 0 ] = compose( "drive_table"   );
    m[ 1 ] = compose( "drive_form"    );
    m[ 2 ] = compose( "index_input"   );
    m[ 3 ] = compose( "letter_input"  );
    m[ 4 ] = compose( "address_input" );
    m[ 5 ] = compose( "comment_input" );
    m.unshift( `[ Gadget Types]\n` );
    alert( m.join( "\n" ) );
}
</script>

<script>
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function init_drive_form() {
    function read_index() {
        const
    }
    try {
        drive_form.home   = function() {
        };
        drive_form.prev   = function() {
        };
        drive_form.next   = function() {
        };
        drive_form.end    = function() {
        };
        drive_form.accept = function() {
        };
        drive_form.reject = function() {
        };
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
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
