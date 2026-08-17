
/* draw-pixel.js */


function draw_pixel( x, y, c, gfx ) {
	gfx.beginPath();
	gfx.fillStyle = read_color( c );
	gfx.fillRect( x, y, 1, 1 );
};


function draw_pixel_raw( x, y, style, gfx ) {
	gfx.beginPath();
	gfx.fillStyle = style;
	gfx.fillRect( x, y, 1, 1 );
};


function draw_pixel_test( canvas ) {
    const gfx = canvas.getContext( "2d" );
    const irnd=( k )=> ( Math.round( k * Math.random() ) );
    let r, g, b, c;
    for ( let i = 0; i < 10000; i += 1 ) {
        let x = irnd( 199 );
        let y = irnd( 199 );
        let c = irnd( 255 );
        draw_pixel( x, y, c, gfx );
    }
}

function draw_pixel_test_raw( canvas ) {
    const gfx = canvas.getContext( "2d" );
    const irnd=( k )=> ( Math.round( k * Math.random() ) );
    let r, g, b, c;
    for ( let i = 0; i < 10000; i += 1 ) {
        let x = irnd( 199 );
        let y = irnd( 199 );
        let r = irnd( 255 );
        let g = irnd( 255 );
        let b = irnd( 255 );
        let c = compose_rgb( r, g, b );
        draw_pixel_raw( x, y, c, gfx );
    }
}
