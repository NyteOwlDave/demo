
/* core-api.js */

function visit( url ) {
    if ( null === localStorage ) {
        const a = elx( "A" );
        a . href = ( url );
        a . click();
    } else {
        const w = window;
        w.open( url, url );
    }
}


function message( s, silent ) {
    s = str( s );
    if (! s ) { return; }
    if (! silent ) {
        console.log( s );
    }
    messages.textContent = ( s );
}

function crashed( e ) {
    console.error( e );
    message( e.message, true );
}

function perform( event ) {
    const ops = perform;
    try {
        ops.event = mine( event );
        const sender = event.target;
        const js = sender.value;
        const op = window.eval( js );
        console.log( op );
    } catch ( e ) {
        crashed( e );
    }
}

function mine( ev ) {
    if ( ev instanceof Event ) {
        ( ev ).stopPropagation();
        ( ev ).preventDefault();
    }
    return ( ev );
}
