
/*

# PCL Ultra Gem

> ( `pcl-ultra.js` )

*/

; mem =( o )=> Object.keys( o || window ).sort()
; dir =( o )=> mem( o || localStorage || {} )
; tmp =( o )=> mem( o || sessionStorage || {} )

; str =( s )=> String( s || "" ).trim()
; arr =( o )=> Array.from( o || [] )
; unq =( o )=> ( new Set( o || [] ) )

; gid =( i )=> doc.getElementById( i )
; elx =( t )=> doc.createElement ( t )

; gad =( o )=> ( o instanceof HTMLElement )
; iob =( o )=> ( o instanceof Object )
; iar =( o )=> Array.isArray( o )

; ale =( q, o )=> arr( o.querySelectorAll( q ) )
; ole =( q, o )=>    ( o.querySelector   ( q ) )
; all =( q )=> ale( q, doc )
; one =( q )=> ole( q, doc )


function resolve( o ) {
    if ( o ) {
        if ( gad( o ) ) {
            return ( o );
        }
        if ( o = gid( o ) ) {
            return ( o );
        }
    }
    return ( null );
}

function pclx( s, u, s, d ) {
    let m = pcl( s );
    if ( u ) {
        m = arr( unq( m ) );
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
    if ( iob( o ) ) {
        if (! iar( o ) ) {
            if ( gad( o ) ) {
                return pcl.read( o );
            } else {
                o = mem( o || {} );
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
        const m = ale( "OPTION", owner );
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
        const m = ale( "LI", owner );
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
                    ce . value = ( t )
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



