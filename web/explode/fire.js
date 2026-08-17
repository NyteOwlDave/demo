
/* fire.js */


function prepare_fire_palette( count ) {
    throw new Error( `This feature is incomplete` );
}

function copy_fire_palette() {
    const pal = htmlFirePalette.color;
    for ( let i = 0; i < 256; i += 1 ) {
        Sprites.color[ i ] = pal[ i ];
    }
}

function draw_palette( pal, canvas ) {
    const gfx = canvas.getContext( "2d" );
    canvas.width = canvas.height = 18*16+2;
    gfx.fillStyle = "black";
    gfx.fillRect( 0, 0, 200, 200 );
    for ( let j = 0; j < 16; j += 1 ) {
        let y = 2 + j * 18;
        for ( let i = 0; i < 16; i += 1 ) {
            let x = 2 + i * 18;
            let c = y * 18 + x;
            gfx.fillStyle = pal[ c ];
            gfx.fillRect( x, y, 16, 16 );
        }
    }
}

