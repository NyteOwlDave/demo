<style>
@import url("./style/zephyr.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<div center title="ID = 'figure'">
  <img id="figure" src="http://dave-omega/demo/web/art/zephyr.png" />
<!--
  <img id="figure" src="http://dave-omega/demo/web/art/snapshots/garcia/garcia-002-src.png" />
-->
</div>

----------------------------------------------------------------

<div center>
  <textarea id="sce" wrap="off"></textarea>
  <textarea id="sop" wrap="off"></textarea>
</div>

----------------------------------------------------------------

<div center>
  <canvas id="surface"></canvas>
</div>

----------------------------------------------------------------

[me-omega]:
<http://dave-omega/demo/web/zephyr/zephyr.html>
"Omega Edition"

> [Omega][me-omega]
> [Notes](./notes/notes-menu.html)
> [To-Do](./zephyr-todo.html)
> [Peaches](./../peaches/)
> [Menu](./../web-menu.html)
> [File System](./)

----------------------------------------------------------------

<script group="prolog">
; iwm = Object.keys( window ).sort()
</script>

<script group="prolog">
; doc = document
</script>

<script group="prolog">
; cls =()=> console.clear()
; agn =()=> location.reload();
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script group="prolog">
; str =( o )=> ( String( o || "" ).trim() )
; arr =( o )=> ( Array.from( o || [] ) )
; unq =( o )=> ( new Set( arr( o ) ) )
; dct =(   )=> ( new Map() )
</script>

<script group="prolog">
; gid =( i )=> ( doc.getElementById ( i ) )
; elx =( t )=> ( doc.createElement  ( t ) )
</script>

<script group="prolog">
; ale =( q, e )=> arr( ( e ).querySelectorAll( q ) )
; ole =( q, e )=>    ( ( e ).querySelector   ( q ) )
; all =( q    )=> ( ale( q, doc ) )
; one =( q    )=> ( ole( q, doc ) )
</script>

<script group="prolog">
; ssg = sessionStorage
; stg = localStorage;
; mem =( o )=> Object.keys( o || window ).sort()
; dir =( o )=> mem( o || stg || {} )
; tmp =( o )=> mem( o || ssg || {} )
</script>

<script group="prolog">
; veer =( s )=> ( location.hostname = s );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="gadget-refs.js">
const figure  = gid( "figure"  );
const surface = gid( "surface" );
const sce = gid( "sce" );
const sip = gid( "sip" );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="prologs.js">
function prologs( ed ) {
    try {
        const m = all( 'SCRIPT[group="prolog"]' );
        const v = (
            ( m )
            . map( se => se.innerText )
        );
        return jsom( v, null, ed );
    } catch ( e ) {
        console.error ( e );
        alert ( e );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="koffee.js">
function koffee( event ) {
	const kc = event.keyCode;
	if ( modkey( kc ) ) { return; }
	const km = modkeys( event );
	if ( km === modkeys.ALT ) {
		if ( kc === 13 ) {
			claim( event );
			exec( sce.value );
			return;
		}
		return;
	}
	if ( km === 0 ) {
		if ( kc === 9 ) {
			claim( event );
			if ( "function" !== typeof sce.insert ) {
				init_editor( sce );
			}
			sce.insert( "\t" );
			return;
		}
		return;
	}
}
</script>

<script>
addEventListener( "keydown", koffee );
</script>

<script>
function claim( event ) {
	event.stopPropagation();
	event.preventDefault();
}
</script>

<script>
function modkey( code ) {
	if ( code instanceof Event ) {
		code = code.keyCode;
	}
	return modkey.codes.includes( code );
}
modkey.codes = [ 16, 17, 18, 92, 93 ];
</script>

<script>
function modkeys( event ) {
 	const _K = modkeys;
 	const _A = event.altKey   ? _K.ALT   : 0;
 	const _C = event.ctrlKey  ? _K.CTRL  : 0;
 	const _M = event.metaKey  ? _K.META  : 0;
 	const _S = event.shiftKey ? _K.SHIFT : 0;
	return ( _A | _C | _M | _S );
}
</script>

<script>
modkeys.ALT   = 0x01;
modkeys.CTRL  = 0x02;
modkeys.META  = 0x04;
modkeys.SHIFT = 0x08;
modkeys.ZERO  = 0x00;
modkeys.MASK  = 0x0F;
</script>

<script>
function exec( js ) {
	try {
		exec.gems.add( js );
		exec.output = window.eval( js );
		exec.error  = "";
	} catch ( e ) {
		console.error ( e );
		exec.error  = ( e.message );
		exec.output = "";
	}
}
;
; exec.gems = ( new Set() )
;
</script>

<script>
exec.jimbo = function( sort ) {
	const m = Array.from( exec.gems );
	return (
		  ( sort     )
		? ( m.sort() )
		: ( m        )
	);
};
</script>

<script>
function color( fg, bg, o ) {
    o = ( o || document.body );
    const st = o.style;
    if ( "string" === typeof fg ) {
        st.color = ( fg );
    }
    if ( "string" === typeof bg ) {
        st.backgroundColor = ( bg );
    }
}
color.reset = function( o ) {
    color( "", "", 0 );
};
</script>

<script>
stashed_scripts = ( `

PEACH_KEY = ( "zephyr-stashed-scripts" );

function check_gems() {
   alert( exec.gems.size );
};

function clear_gems() {
   alert( exec.gems = new Set() );
};

function edit_gems( rex ) {
    jsom( gems, rex, sop );
};

figure.stash();
sce.stash();
sop.stash();

// alert( sce.value.length );
// sce.value = exec.jimbo().join("\\n\\n");

// alert( figure.src );
// assist( figure );
// assist( sce );
// assist( sop );

// check_gems();
// alert( surface.width );

// starburst( 500  );
// starfield( 1000 );

alert( "Ready!" );

` );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="init-surface.js">
function init_surface() {
}
</script>

<script id="init-figure.js">
function init_figure() {
    const ge = figure;
    ge.stash   =(   )=> ( figure.saved = figure.src );
    ge.resume  =(   )=> ( figure.src = figure.saved );
    ge.clear   =(   )=> ( figure.src = ( "" ) );
    ge.request =( u )=> ( figure.src = ( u  ) );
    ge.catalog =(   )=> ( mem( ge ) );
    ge.inspect =(   )=> ( inspect( ge ) );
    ge.assist  =(   )=> ( assist ( ge ) );
}
</script>

<script id="init-editor.js">
function init_editor( ed ) {
    ed = ( ed || sce );
    ed.begin =()=> { ed.value = stashed_scripts; };
    ed.insert =( t )=> ( insert_text( ed, t ) );
    ed.run  =()=> ( exec( ed.value ) );
    ed.zoom =()=> ( zoom( ed ) );
    ed.clear  =()=> ( ed.value = "" );
    ed.resume =()=> ( ed.value = ed.saved );
    ed.stash  =()=> ( ed.saved = ed.value );
    ed.stash();
    return ( ed );
}
</script>

<script id="init-theme.js">
function init_theme() {
    color(
     "lemonchiffon"
    , "midnightblue"
    );
    color(
      "black"
    , "lemonchiffon"
    , sce
    );
    color(
      "black"
    , "gray"
    ,  sop
    );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="assist.js">
function assist( o, title ) {
    const t = ( str( title ) || "Members" );
    const m = Array.from( o );
    m . unshift( `[ ${t} ]\n\n` );
    alert( m );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="inspect.js">
function inspect( o, title ) {
    const t = ( str( title ) || "Members" );
    const m = Array.from( o );
    const c = console;
    c.clear();
    c.group( `[ ${t} ]\n\n` );
    c.table( m );
    c.groupEnd();
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="insert-text.js">
function insert_text( ed, t ) {
    const n = t.length;
    const o = ed.value;
    const s = ed.selectionStart;
    ed.value = [
        o.slice( 0, s )
      , o.slice( ed.selectionEnd )
    ].join( t );
    ed.selectionStart = (
        ed.selectionEnd = ( s + n )
    );
    ed.focus();
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="visit.js">
function visit( url ) {
    const a = elx( "A" );
    a . href = ( url );
    a .click();
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="filter.js">
function filter( o, rex ) {
    o = arr( o );
    if ( rex = str( rex ) ) {
        rex = new RegExp( rex );
        const match =( s )=> ( rex.test( s ) );
        return ( o ).filter( match );
    }
    return ( o );
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="seeker.js">
function seeker( rex, ed ) {
    const m = (
        mem()
        . filter(
            k => (! iwm.includes( k ) )
        )
    );
    const v = filter( m, rex );
    if ( ed ) {
        ed.value = ( v.join( "\n" ) );
        return;
    }
    return ( v );
};
</script>

<script id="kahlan.js">
function kahlan( rex, ed ) {
    const m = (
        mem()
        . filter(
            k => ( iwm.includes( k ) )
        )
    );
    const v = filter( m, rex );
    if ( ed ) {
        ed.value = ( v.join( "\n" ) );
        return;
    }
    return ( v );
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="zoom.js">
function zoom( o ) {
    try {
    	( o ).requestFullscreen();
        ( o ).focus();
        return ( o );
    } catch ( e ) {
        console.error ( e );
        alert  ( e );
        return ( e );
    }
};
</script>

<script id="visible.js">
function visible( ge ) {
    return (
        ! ( ge )
        . classList
        . contains( "hide" )
    );
};
</script>

<script id="hide.js">
function hide( o ) {
    ( o ).classList.add( "hide" );
    return ( o );
};
</script>

<script id="show.js">
function show( o ) {
    ( o ).classList.remove( "hide" );
    return ( o );
};
</script>

<script id="toggle.js">
function toggle( o ) {
    if ( visible( o ) ) {
        return hide( o );
    } else {
        return show( o );
    }
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="gideon.js">
function gideon( type, index ) {
    const m = all( type );
    return ( ( m )[ index ] );
}
</script>

<script id="gideon-group.js">
gideon.group = function( key ) {
    const q = ( '[group="${key}"]' );
    return all( q );
};
</script>

<script id="gideon-status.js">
gideon.status = function( key ) {
    const q = ( '[status="${key}"]' );
    return all( q );
};
</script>

<script id="gideon-modules.js">
gideon.modules = function( rex, ed ) {
    const q = ( 'SCRIPT[id]' );
    const m = all( q );
    let v =(
        ( m )
        . map( ( se ) => ( se.id ) )
    );
    v = filter( v, rex );
    if ( ed ) {
        ed . value = ( v ).join( "\n" );
        return;
    }
    return ( v );
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="jsom.js">
function jsom( o, rex, ed ) {
    const dash = String( "-" ).repeat( 62 );
    const line = ( `\n|${dash}|\n` );
    o = filter( o, rex ).join( line );
    if ( ed ) {
        ed . value = ( o );
        return;
    }
    return ( o );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="main.js">
function main( event ) {
    try {
        doc . title = "🌬️ Zephyr Graphics";
        init_figure();
        init_surface();
        init_theme();
        init_editor( sop );
        init_editor( sce );
        sce.begin();
    } catch ( e ) {
        console.error ( e );
        alert( e );
    }
}
</script>

<script id="page-load.js">
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
