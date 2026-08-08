
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

function pclx( s, u, s, d ) {
    let m = pcl( s );
    if ( u ) {
        m = Array.from( new Set( m ) );
    }
    if ( s ) {
        m = m.sort();
    }
    if ( d = str( s ) ) {
        return m.map( t => ( `${d} ${t}` ) );
    } else {
        return ( m );
    }
}

function pcl( s ) {
    s = pcl.prepare( s );
    return (
        ( s )
        . split( "\n" )
        . map( str )
        . filter( s => s )
    );
}

pcl.prepare = function( o ) {
    if ( o instanceof Object ) {
        if (! Array.isArray( o ) ) {
            if ( o instanceof HTMLElement ) {
                return pcl.read( o );
            } else {
                o = Object.keys( o || {} ).sort();
            }
        }
        return o.join( "\n" );
    }
    if ( "undefined" === typeof o ) {
        return "";
    }
    return String( o ).trim();
};

pcl.read = function( ge ) {
    ge = resolve( ge );
    switch ( ge.nodeName ) {
    case "INPUT"    : return [ str( ge.value ) ];
    case "TEXTAREA" : return pcl( ge.value     );
    case "PRE"      : return pcl( ge.innerText );
    case "SELECT"   :
    case "DATALIST" : return options( ge );
    case "OL"       :
    case "UL"       : return items( ge );
    default         : return pcl( ge.innerHTML );
    }
    function options( owner ) {
        const m = Array.from(
            owner.querySelectorAll( "OPTION" )
        );
        return (
            ( m )
            . map(
                ( ge ) => (
                       str( ge.value )
                    || str( ge.textContent )
                )
            )
            . filter( s => s )
        );
    }
    function items( owner ) {
        const m = Array.from(
            owner.querySelectorAll( "OPTION" )
        );
        return (
            ( m )
            . map( ge => str( ge.textContent ) )
            . filter( s => s )
        );
    }
};

pcl.write = function( ge, s ) {
    ge = resolve( ge );
    const m = pcl( s );
    switch ( ge.nodeName ) {
    case "INPUT"    : return line ( ge, m );
    case "TEXTAREA" : return value( ge, m );
    case "SELECT"   :
    case "DATALIST" : return options( ge, m );
    case "OL"       :
    case "UL"       : return items( ge, m );
    case "PRE"      : return text ( ge, m );
    default         : return html ( ge, m );
    }
    function line( owner, m ) {
        owner.value = m.join( " " );
        return ( owner );
    }
    function value( owner, m ) {
        owner.value = m.join( "\n" );
        return ( owner );
    }
    function text( owner, m ) {
        owner.innerText = m.join( "\n" );
        return ( owner );
    }
    function html( owner, m ) {
        owner.innerHTML = m.join( "\n" );
        return ( owner );
    }
    function options( owner, m ) {
        let ce;
        owner.innerHTML = "";
        m.forEach(
            ( t ) => {
                ce = elx( "OPTION" );
                ce . textContent = (
                    ce . value = ( t );
                );
                owner . appendChild( ce );
            }
        );
    }
    function items( owner ) {
        let ce;
        owner.innerHTML = "";
        m.forEach(
            ( t ) => {
                ce = elx( "LI" );
                ce . textContent = ( t );
                owner . appendChild( ce );
            }
        );
    }
};

function filter( s, rex ) {
    let r, m = pcl( s );
    if ( r = str( rex ) ) {
        rex = new RegExp( r );
        return m.filter( t => rex.test( t ) );
    }
    return ( m );
}

function resolve( o ) {
    if ( o ) {
        if ( o instanceof HTMLElement ) {
            return ( o );
        }
        if ( o = gid( o ) ) {
            return ( o );
        }
    }
    return ( null );
}

