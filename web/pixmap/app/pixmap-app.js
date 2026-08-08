
/*
    pixmap-app.js
*/


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

