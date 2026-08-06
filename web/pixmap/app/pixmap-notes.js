
/* 
    pixmap-test-01.js
*/

function prepare_screen() {
    SW = 600; SH = 600;
	Screen( SW, SW );
    Background( _RGB( 20, 20, 64 ) );
}

function show_screen() {
    const srf = Screen.surface();
    srf.classList.remove( "hide" );
    return ( srf );
}

function hide_screen() {
    const srf = Screen.surface();
    srf.classList.add( "hide" );
    return ( srf );
}

function toggle_screen() {
    const srf = Screen.surface();
    const cl  = srf.classList;
    if ( cl.contains( "hide" ) ) {
        cl.remove( "hide" );
    } else {
        cl.add( "hide" );
    }
    return ( srf );
}

function prepare_editor( ed ) {
    ed.wrap = "off";
    ed.spellcheck = false;
    ed.classList.add( "siox" );
}

function prepare_editors() {
    const m = all( "TEXTAREA" );
    m.forEach( prepare_editor );
}

function populate_editor( entry ) {
    const id = entry[ 0 ];
    const ed = gid( id );
    if ( ed ) {
        prepare_editor( ed );
        const m  = mem( entry[ 1 ] );
        ed.value = m.join( "\n" );
    } else {
        console.warn( `Can't find Editor`, id );
    }
}

function populate_editors() {
    const m = ops_groups;
    m.forEach( populate_editor );
}

PixMapExtras = {
  prepare_screen
, prepare_editor
, prepare_editors
, populate_editor
, populate_editors
, toggle_screen
, hide_screen
, show_screen
};

function ops_pending( s ) {
    s = str( s ) || "(unnamed)";
    console.warn( `Operations Group is Incomplete`, s );
};

// CoreOps   = { ops_pending };
// Geom2dOps = { ops_pending };
// Geom3dOps = { ops_pending };
// Geom4dOps = { ops_pending };
// PixMapOps = { ops_pending };
// RGBOps    = { ops_pending };

ops_groups = [
  [ "core-ops-editor"   , CoreOps      ]
, [ "scalar-ops-editor" , ScalarOps    ]
, [ "vector-ops-editor" , VectorOps    ]
, [ "geom-2d-editor"    , Geom2dOps    ]
, [ "geom-3d-editor"    , Geom3dOps    ]
, [ "geom-4d-editor"    , Geom4dOps    ]
, [ "rgb-editor"        , RGBOps       ]
, [ "screen-editor"     , Screen       ]
, [ "pixmap-editor"     , PixMapOps    ]
, [ "extras-editor"     , PixMapExtras ]
];

function perform( event ) {
    perform.lite( event );
}

perform.lite = function( event ) {
    const ops = perform;
    try {
        ops.event = mine( event );
        const sender = event.target;
        console.log(
            window.eval( sender.value )
        );
    } catch ( e ) {
        crashed ( e );
    }
};

function message( s, silent ) {
    s = str( s );
    if (! s ) { return; }
    if (! silent ) {
        console.log( s );
    }
    messages.textContent = ( s );
    return ( s );
}

function crashed( e ) {
    let s;
    if ( e instanceof Error ) {
        s = e.message;
    } else {
        s = e;
        e = new Error( s );
    }
    console.error( e );
    message( s, true );
}

function mine( event ) {
    const ev = event;
    ev.preventDefault();
    ev.stopPropagation();
    return ( ev );
}

