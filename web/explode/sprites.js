
/* sprites.js */


Sprites = {
	EXPLODE_SIZE     : 80  ,
    EXPLODE_HOTSPOTS : 64  ,
	EXPLODE_FRAMES   : 64  ,
	EXPLODE_COLORS   : 256 ,
	frame : [] ,
    color : []
};


function read_texel( u, v, i ) {
	const ops = Sprites;
    const w = ops.EXPLODE_SIZE;
    return( ops.frame[ i ][ w * v + u ] );
};


function write_texel( u, v, c, i ) {
	const ops = Sprites;
    const w = ops.EXPLODE_SIZE;
    return ( ops.frame[ i ][ w * v + u ] = c );
};


function read_color( c ) {
	const ops   = Sprites;
    const color = ops.color;
    c = ( c % color.length );
    return ( ( c > 0 ) ? color[ c ] : "black" );
}


function write_color( c, style ) {
	const ops   = Sprites;
    const color = ops.color;
    c = ( c % color.length );
    if ( c > 0 ) {
        return ( color[ c ] = style );
    }
    console.warn( `Color Index is Out of Range`, c );
}


function write_rgb( c, r, g, b ) {
    return write_color( c, compose_rgb( r, g, b ) );
}


function draw_frame( index, x, y, canvas ) {
	const ops  = Sprites;
	const size   = ops.EXPLODE_SIZE;
    const frames = ops.EXPLODE_FRAMES;
	if ( ( index >= frames ) || ( index < 0 ) ) {
        console.warn( `Frame Index is Out of Range`, index );
        return;
    }
	const gfx = canvas.getContext( '2d' );
    let t = 0;
	for ( let j = 0; j < size; j += 1 ) {
		for ( let i = 0; i < size; i += 1 ) {
            draw_pixel(
                ( x+i ) ,
                ( y+j ) ,
                read_texel( i, j, index ) ,
                gfx
            );
            t += 1;
		}
	}
}

function draw_frame_test( index, x, y, canvas ) {
	const ops  = Sprites;
	const size   = ops.EXPLODE_SIZE;
    const frames = ops.EXPLODE_FRAMES;
    console.debug( { index, frames, size, x, y } );
	if ( ( index >= frames ) || ( index < 0 ) ) {
        console.warn( `Frame Index is Out of Range`, index );
        return;
    }
	const gfx = canvas.getContext( '2d' );
	for ( let j = 0; j < size; j += 1 ) {
		for ( let i = 0; i < size; i += 1 ) {
            draw_pixel_raw(
                ( x+i ) ,
                ( y+j ) ,
                "gold"  ,
                gfx
            );
		}
	}
}


function create_hotspot( center ) {
    const rnd =()=> Math.random();
    return {
		x  : ( center + 12 * rnd() - 6 ) ,
		y  : ( center + 12 * rnd() - 6 ) ,
		xc : ( rnd() - 0.5 ) ,
		yc : ( rnd() - 0.5 )
	}
}


function prepare_hotspots() {
    const ops   = Sprites;
	const count = ops.EXPLODE_HOTSPOTS;
	const size  = ops.EXPLODE_SIZE;
	const center = ( size >> 1 );
    const hotspots = [];
	for ( let spot = 0; spot < count; spot += 1 ) {
		const o = create_hotspot( center );
		hotspots.push( o );
	}
    return ( hotspots );
}


function create_sprite_buffers() {
	const ops = Sprites;
    const size   = ops.EXPLODE_SIZE;
    const texels = size * size;
	const create = ( ( n ) => {
		if ( n < 1 ) { return; }
		ops.frame.push( new Uint8Array( texels ) );
		create( n - 1 );
	} );
    ops.frame = [];
    let n = ops.EXPLODE_FRAMES;
	create( n );
    n = ops.frame.length;
	console.log( `Created ${n} frames` );
}


function prepare_sprite_frame( index, hot, axis, rise ) {
	const ops = Sprites;
	const size   = ops.EXPLODE_SIZE;
    const frames = ops.EXPLODE_FRAMES;
	const count  = ops.EXPLODE_HOTSPOTS;
	const dc = (
          ( index < axis )
        ? ( index * rise )
        : ( frames - index + 8 )
    );
    const read =( x, y )=> {
        return read_texel( x, y, index );
    }
    const write =( x, y, c )=> {
        write_texel( x, y, c, index );
    }
    const shift =( x, y )=> {
		return Math.floor(
			( Math.abs( x ) + Math.abs( y ) ) / 3
		);
    }
    let total = 0;
	for ( let spot = 0; spot < count; spot += 1 ) {
		const hot_x = Math.floor( hot[ spot ].x );
		const hot_y = Math.floor( hot[ spot ].y );
		for ( let x = -6; x <= 6; x += 1 ) {
			const xx = hot_x + x;
            if ( xx <  0    ) { continue; }
            if ( xx >= size ) { break;    }
			for ( let y = -6; y <= 6; y += 1 ) {
                const yy = hot_y + y;
                if ( yy <  0    ) { continue; }
                if ( yy >= size ) { break;    }
                const old = read( xx, yy );
                const inc = ( dc >> shift( x, y ) );
				const texel = Math.min(
                     255, old + inc
                );
				write( xx, yy, texel );
                total += 1;
			}
		}
		hot[ spot ].x += hot[ spot ].xc;
		hot[ spot ].y += hot[ spot ].yc;
	}
}


function create_explosion() {
    const ops = Sprites;
    const frames = ops.EXPLODE_FRAMES;
    const axis = frames >> 2;
    const rise = 128 / axis;
    const hot = prepare_hotspots();
    create_sprite_buffers();
    for ( let i = 0; i < frames; i += 1 ) {
        prepare_sprite_frame( i, hot, axis, rise );
    }
}


