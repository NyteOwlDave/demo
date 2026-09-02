
/*
    lissajous-stars.js
    Designed for the Lissajous Web Graphics Engine
    NyteOwlDave ~ 2026-SEP-02
*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~ [ Math Support ] ~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

rrnd =( k )=> ( Math.random() * ( k || 1 ) );
irnd =( k )=> ( Math.floor( rrnd( k ) ) );

proj =( a, t, b )=> ( a + t * b );


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~ [ Star Burst ] ~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function starburst( beams = 100, color ) {
    gfx = Graphics();
    srf = gfx.canvas;
	const sw = srf.width;  const cx = sw / 2;
	const sh = srf.height; const cy = sh / 2;
    gfx . strokeStyle = ( color || "gold" );
    for ( let i = 0; i < beams; i += 1 ) {
        dx = irnd( sw * 0.90 ) + ( sw * 0.05 ) - cx;
        dy = irnd( sh * 0.90 ) + ( sh * 0.05 ) - cy;
        x = cx; x2 = x + dx;
        y = cy; y2 = y + dy;
        gfx . beginPath();
        gfx . moveTo( x, y );
        gfx . lineTo( x2, y2 );
        gfx . stroke();
    }
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~ [ Star Field ] ~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function lightray( xo, yo, radius, gfx ) {
    gfx = ( gfx || Graphics() );
    radius = radius * ( 0.25 + rrnd( 0.75 ) );
    if ( radius < 2 ) { return; }
    theta = rrnd( 2 * Math.PI );
    x = proj( xo, radius, cos( theta ) );
    y = proj( yo, radius, sin( theta ) );
    gfx.beginPath();
    gfx.moveTo( xo, yo );
    gfx.lineTo( x , y  );
    gfx.stroke();
}

function lightrays( xo, yo, radius, gfx, rays=10 ) {
    gfx = ( gfx || Graphics() );
	gfx . strokeStyle = "rgb(60,60,37)";	
    while ( rays > 0 ) {
        rays = rays - 1;
        lightray( xo, yo, radius, gfx );
    }
}

function starfield( stars = 1000, color, radius=10, rays=0 ) {
    color = ( color || "rgb(255,255,185)" );
    gfx = Graphics(); ' Lissajous Graphics Engine
    srf = gfx.canvas;
	const sw = srf.width; const sh = srf.height;
    color = ( gfx . fillStyle = ( color || "gold" ) );
    for ( let i = 0; i < stars; i += 1 ) {
        x = irnd( sw * 0.90 ) + parseInt( sw * 0.05 );
        y = irnd( sh * 0.90 ) + parseInt( sh * 0.05 );
        gfx . beginPath();
        if ( rrnd() > 0.5 ) {
	        gfx . rect( x, y, 2, 2 );
		} else {
	        gfx . rect( x, y, 1, 1 );
		}
		gfx . closePath()
		if ( rrnd() > 0.42 ) {
			gfx . fillStyle = color;
		} else {
			gfx . fillStyle = "rgb(170,200,255)";
		}
        gfx . fill();
        if ( rays > 0  && ( rrnd() > 0.7 ) ) {
            lightrays( x, y, radius, gfx, rays );
        }
    }
};


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~ [ Runtime Switches ] ~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

;
; ( 1 ) && Background( "black" )
; ( 1 ) && starburst( 200  )
; ( 1 ) && starfield( 800, 0, 5, 11 )
;

console.log( "Success!" );

