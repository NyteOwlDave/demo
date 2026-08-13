
/* 

# Explode Web App

> ( `explode-app.js` )

*/


function at_load( event ) {
    try {
        main( event );
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

addEventListener( "load", at_load );

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

function incomplete( s ) {
    s = str( s );
    s = ( `The "${s}" feature is complete.` );
    console.warn( s );
}

