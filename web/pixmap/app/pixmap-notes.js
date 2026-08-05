
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
    if ( src.classList.includes( "hide" ) ) {
        srf.classList.remove( "hide" );
    } else {
        srf.classList.add( "hide" );
    }
}

function prepare_editor( ed ) {
    editor.wrap = "off";
    editor.spellcheck = false;
    editor.classList.add( "siox" );
}

function prepare_editors() {
    const m = all( "TEXTAREA" );
    m.forEach( prepare_editor );
}
