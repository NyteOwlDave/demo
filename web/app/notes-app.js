
/* notes-app.js */

; cls =()=> console.clear()
; agn =()=> location.reload()


function at_load( event ) {
    try {
        if ( "function" === typeof main ) {
            main( event );
        }
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

addEventListener( "load", at_load );

