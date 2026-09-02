
// PEACH_KEY = ( `zephyr-demo-001.js` );

proj =( a, t, b )=> ( a + t * b );
rnd  =( k )=> ( Math.random() * ( k || 1 ) );
irnd =( k )=> ( Math.floor( rnd( k ) ) );

SW = 800; CX = SW / 2;
SH = 800; CY = SH / 2;

function Surface() {
    srf = surface;
    if ( srf.width !== SW ) {
        srf . width  = SW;
    }
    if ( srf.height !== SH ) {
        srf . height = SH;
    }
    return ( srf );
};

function Graphics() {
    srf = Surface();
    gfx = srf.getContext( "2d" );
    return ( gfx );
};

function starburst( color, beams = 100 ) {
    gfx = Graphics();
    gfx . strokeStyle = ( color || "gold" );
    for ( let i = 0; i < beams; i += 1 ) {
        dx = irnd( SW * 0.90 ) - CX;
        dy = irnd( SH * 0.90 ) - CY;
        x = CX; x2 = x + dx;
        y = CY; y2 = y + dy;
        gfx.beginPath();
        gfx.moveTo( x, y );
        gfx.lineTo( x2, y2 );
        gfx.stroke();
    }
}
