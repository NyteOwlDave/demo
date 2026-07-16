
function crashed( e, must_throw ) {
    const ops = ( crashed );
    if (! ops.silent ) {
        console.error ( e );
    }
    if (! ops.muted ) {
        window.alert ( e );
    }
    if ( must_throw ) {
        throw ( e );
    }
    return ( e );
}

; silent = ( false )    // Suppress Console Write
; muted  = ( false )    // Suppress Alert Popup

