
/* rgb.js */


function compose_rgb( r, g, b ) {
    function byte( n ) {
        n = ( parseInt( n ) || 0 );
        return Math.min( Math.max( n, 0 ), 255 );
    }
    r = byte( r );
    g = byte( g );
    b = byte( b );
    return ( `rgb(${r},${g},${b})` );
}


