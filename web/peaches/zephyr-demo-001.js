
// PEACH_KEY = ( `zephyr-demo-001.js` );

proj =( a, t, b )=> ( a + t * b );

rnd  =( k )=> ( Math.random() * ( k || 1 ) );
irnd =( k )=> Math.floor( rnd( k ) );

SW = 800; CX = SW / 2;
SH = 800; CY = SH / 2;

srf = surface;
srf . width  = SW;
srf . height = SH;

gfx = srf.getContext( "2d" );

function starburst( color, beams = 100 ) {
    gfx.strokeStyle = ( color || "gold" );
    for ( let i = 0; i < beams; i += 1 ) {
        dx = irand( SW * 0.90 ) - CX;
        dy = irand( SH * 0.90 ) - CY;
        x = CX; x2 = x + dx;
        y = CY; y2 = y + dy;
        gfx.beginPath();
        gfx.moveTo( x, y );
        gfx.lineTo( x2, y2 );
        gfx.stroke();
    }
}
