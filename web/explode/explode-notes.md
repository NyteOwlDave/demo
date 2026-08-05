
<head> <link rel="icon" href="favicon.ico" /> </head>

[allegro]: <https://liballeg.org/>
[djgpp]: <https://www.delorie.com/djgpp/>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]: <http://dave-omega/demo/web/explode/explode-notes.html>

----------------------------------------------------------------

# [Explosion Demo][me]

This demo was inspired by __Shawn Hargreaves__, author of
The [`Allegro Game Library`][allegro] for `DJGPP`.

[`DJGPP`][djgpp] is a `C++ Compiler` by __DJ Delorie__.

----------------------------------------------------------------

## Draw Frame

```javascript

let frame = -1

function draw() {
	if ( frame < 0 ) { return; }
	if ( frame >= Sprites.EXPLODE_FRAMES ) {
        frame = 0;
    }
	const pal = htmlFirePalette.color;
	Sprites.drawFrame( idCanvas, frame++, 10, 10, pal );
}

```

----------------------------------------------------------------

## Main Method

```javascript

function main() {
	Sprites.createFrames();
	Sprites.createExplosions();
	messages.textContent = 'Enjoy!';
	frame = 0;
	window.setInterval( draw, 20 );
}

```

----------------------------------------------------------------

## Sprite Rendering

```javascript

const Sprites = {
	EXPLODE_SIZE     : 80  ,
    EXPLODE_HOTSPOTS : 64  ,
	EXPLODE_FRAMES   : 64  ,
	EXPLODE_COLORS   : 256 ,
	frame : [] ,
    color : [] ,
    // [x] Decomposed
	createFrames : ( () => {
		const ops = Sprites;
        const frames = ops.EXPLODE_FRAMES;
        const size   = ops.EXPLODE_SIZE;
        const pixels = size * size;
		const create = ( ( n ) => {
			if ( n < 1 ) { return; }
			ops.frame.push( new Uint8Array( pixels ) );
			create( n - 1 );
		} );
		create( frames );
		console.log( `Created ${spr.EXPLODE_FRAMES} frames` );
	} ),
    // [x] Decomposed
	gettext : ( ( i, x, y ) => {
		const ops = Sprites;
        const w = ops.EXPLODE_SIZE;
		return ( ops.frame[ i ][ y*w + x ] );
	} ),
    // [x] Decomposed
	puttexel : ( ( i, x, y, c ) => {
		const ops = Sprites;
        const w = ops.EXPLODE_SIZE;
		return ( ops.frame[ i ][ y*w + x ] = c );
	} ),
    // [x] Decomposed
	createExplosions : ( () => {
		const ops = Sprites;
		// Pixel read/write methods
		const get = ops.gettexel;
		const put = ops.puttexel;
        // Random Value
        const rnd =()=> Math.random();
		// Frame count
		const frames = ops.EXPLODE_FRAMES;
		// Frame size (width and height)
		const size = ops.EXPLODE_SIZE;
		// Center of frame
		const ctr = ( size >> 1 );
		// Number of hot spots
		const HOTSPOTS = ops.EXPLODE_HOTSPOTS;
        const hot = [];
		// Create a new hot spot
		const newSpot = function( c ) {
            return {
				x  : ( c + 12 * rnd() - 6 ) ,
				y  : ( c + 12 * rnd() - 6 ) ,
				xc : ( rnd() - 0.5 ) ,
				yc : ( rnd() - 0.5 )
    		}
		};
		// Initialize Hotspot map
		for ( let spot = 0; spot < HOTSPOTS; spot += 1 ) {
			let f = newSpot( ctr );
			// console.log( JSON.stringify( f ) );
			hot.push( f );
		}
		// For each sprite (animation frame)
		for ( let frame = 0; frame < frames; frame += 1 ) {
			// Calculate axis and rise
			const axis = frames >> 2;
			const rise = 128 / axis;
			// Color delta @ the hotspot
			let dc = ( frame < axis )
                ? ( frame * rise )
                : ( frames - frame + 8 );
			// For each hotspot
			for ( let spot = 0; spot < HOTSPOTS; spot += 1 ) {
				// Get centerpoint for this hotspot
				let hot_x = Math.floor( hot[ spot ].x );
				let hot_y = Math.floor( hot[ spot ].y );
				// We'll scan horizontally from -6 to +6 pixels from hot_x
				for ( let x = -6; x <= 6; x += 1 ) {
					// Offset horizontally from hotspot center
					let xx = hot_x + x;
					// We'll scan vertically from -6 to +6 pixels from hot_y
					for ( let y=-6; y <= 6; y += 1 ) {
						// Offset vertically from hotspot center
						let yy = hot_y + y;
						// If pixel is within the sprite
						if ( ( xx >= 0   ) &&
							 ( yy >= 0   ) &&
							 ( xx < size ) &&
							 ( yy<size   ) ) {
							// Get the falloff shift factor
							let falloff_shift = Math.floor(
								( Math.abs ( x ) + Math.abs( y ) ) / 3
							)
							// Read pixel at (xx,yy) for this frame
							//  and adjust color according to
							//  color delta and falloff shift factor.
							let pel = (
                                 get( frame, xx, yy )
                              + ( dc >> falloff_shift )
                            );
							// Clamp Palette Index
                            pel = ( ( pel > 255 ) ? 255 : pel );
							// Write new Color
							put( frame, xx, yy, pel );
						}
					}
				}
				// Move the hotspot ( for the next frame )
				hot[ spot ].x += hot[ spot ].xc;
				hot[ spot ].y += hot[ spot ].yc;
			}
		}
	} ),
    // [x] Decomposed
	drawFrame : function( canvas, i, u, v, palette ) {
		const ops = Sprites;
		const frames = ops.EXPLODE_FRAMES;
		const size   = ops.EXPLODE_SIZE;
		if ( ( i<0 ) || ( i > frames ) ) { return; }
		const gfx = canvas.getContext( '2d' );
		const get = ops.getpixel;
		const put = function( p, q, c ) {
			gfx.beginPath()
			gfx.fillStyle = (
                ( c ) ? ( palette[ c ] ) : ( 'black' )
            );
			gfx.fillRect(p,q,1,1)
		};
		for ( let y = 0; y < size; y += 1 ) {
			for ( let x = 0; x < size; x += 1 ) {
				put( u+x, v+y, get( i, x, y ) );
			}
		}
	}
};

```

----------------------------------------------------------------

# Decomposition

The source code above comprises a __complete working system__.

The only missing part is the `HTML` and `CSS`, which are mere
window dressing for the __presentation__ of the algorithm.

My next goal here is to pick apart the pieces, with the
intention of __porting__ this to __another language__.

----------------------------------------------------------------

## Decomposed Sections

- Sprite Engine State
- Draw Canvas Pixel
- Draw Canvas Pixel Raw
- Read Sprite Texel
- Write Sprite Texel
- Read Palette Color
- Write Palette Color
- Write Palette RGB Color
- Compose RGB Color
- Prepare Fire Palette
- Draw Sprite Frame
- Create Hotspot
- Prepare Hotspot Array
- Create Sprite Buffers
- Prepare Sprite Frame
- Create Explosion


----------------------------------------------------------------

## Sprite Engine State

```javascript

Sprites = {
	EXPLODE_SIZE     : 80  ,
    EXPLODE_HOTSPOTS : 64  ,
	EXPLODE_FRAMES   : 64  ,
	EXPLODE_COLORS   : 256 ,
	frame : [] ,
    color : [] ,
};

```

### Properties

| Property         | Type     | Purpose  |
|------------------|----------|--------------------------|
| EXPLODE_SIZE     | Integer  | Sprite Width and Height  |
| EXPLODE_HOTSPOTS | Integer  | Number of Hotspots       |
| EXPLODE_FRAMES | Integer    | Number of Sprite Frames  |
| EXPLODE_COLORS | Integer    | Number of Palette Colors |
| frame | Array of Uint8Array | Sprite Frame Buffers     |
| color | Array of RGB Color  | Palette Color Buffer     |

### Description

The `Sprites` object contains __global state__ for the 
__Sprite Engine__.

----------------------------------------------------------------

## Draw Canvas Pixel

```javascript

function draw_pixel( x, y, c, gfx ) {
	gfx.beginPath();
	gfx.fillStyle = read_color( c );
	gfx.fillRect( x, y, 1, 1 );
};

```

### Arguments

| Arg  | Purpose  |
|------|-------------------------------|
|  x   | Pixel's Horizontal Coordinate |
|  y   | Pixel's Vertical Coordinate   |
|  c   | Pixel's Palette Color Index   |
|  gfx | Canvas 2D Rendering Context   |

### Description

Draws a single __Pixel__ to a __Canvas__, using 
a __Palette Color Index__.

----------------------------------------------------------------

## Draw Canvas Pixel Raw

```javascript

function draw_pixel_raw( x, y, style, gfx ) {
	gfx.beginPath();
	gfx.fillStyle = style;
	gfx.fillRect( x, y, 1, 1 );
};

```

### Arguments

| Arg    | Purpose  |
|--------|-------------------------------|
|  x     | Pixel's Horizontal Coordinate |
|  y     | Pixel's Vertical Coordinate   |
|  style | Pixel's CSS Fill Style        |
|  gfx   | Canvas 2D Rendering Context   |

### Description

Draws a single __Pixel__ to a __Canvas__, using 
a __CSS Style__.

----------------------------------------------------------------

## Read Sprite Texel

```javascript

function read_texel( u, v, i ) {
	const ops = Sprites;
    const w = ops.EXPLODE_SIZE;
    return( ops.frame[ i ][ w * v + u ] );
};

```

### Arguments

| Arg | Purpose  |
|-----|-------------------------------|
|  u  | Texel's Horizontal Coordinate |
|  v  | Texel's Vertical Coordinate   |
|  i  | Sprite's Frame Buffer Index   |

### Description

Reads a single __Texel__ from any __Sprite Frame Buffer__.

----------------------------------------------------------------

## Write Sprite Texel

```javascript

function write_texel( u, v, c, i ) {
	const ops = Sprites;
    const w = ops.EXPLODE_SIZE;
    return ( ops.frame[ i ][ w * v + u ] = c );
};

```

### Arguments

| Arg | Purpose  |
|-----|-------------------------------|
|  u  | Texel's Horizontal Coordinate |
|  v  | Texel's Vertical Coordinate   |
|  c  | Texel's Palette Color Index   |
|  i  | Sprite's Frame Buffer Index   |

### Description

Writes a single __Texel__ to any __Sprite Frame Buffer__.

----------------------------------------------------------------

## Read Palette Color

```javascript

function read_color( c ) {
	const ops   = Sprites;
    const color = ops.color;
    c = ( c % color.length );
    return ( ( c > 0 ) ? color[ c ] : "black" );
}

```

### Arguments

| Arg | Purpose |
|-----|-----------------------|
|  c  | Color's Palette Index |

### Description

Reads a single __Color__ from the __Color Palette__.

__Colors__ are __CSS Styles__ in `rgb()` format.

----------------------------------------------------------------

## Write Palette Color

```javascript

function write_color( c, style ) {
	const ops   = Sprites;
    const color = ops.color;
    c = ( c % color.length );
    if ( c > 0 ) {
        return ( color[ c ] = style );
    }
    console.warn( `Color Index is Out of Range`, i );
}

```

### Arguments

| Arg   | Purpose |
|-------|-----------------------|
| c     | Color's Palette Index |
| style | Color's CSS Style     |

### Description

Writes a single __Color__ to the __Color Palette__.

__Colors__ are __CSS Styles__ in `rgb()` format.

----------------------------------------------------------------

## Write Palette RGB Color

```javascript

function write_rgb( c, r, g, b ) {
    return write_color( c, compose_rgb( r, g, b ) );
}

```

### Arguments

| Arg | Purpose  |
|-----|-------------------------|
| c   | Color's Palette Index   |
| r   | Color's Red Component   |
| g   | Color's Green Component |
| b   | Color's Blue Component  |

### Description

Writes a single __Color__ to the __Color Palette__.

`RGB` Components are converted to __CSS Styles__ in `rgb()`
format.

----------------------------------------------------------------

## Compose RGB Color

```javascript

function compose_rgb( r, g, b ) {
    function byte( n ) {
        n = ( parseInt( n ) || 0 );
        return Math.min( Math.max( n, 0, 255 ) );
    }
    r = byte( r );
    g = byte( g );
    b = byte( b );
    return ( `rgb(${r},${g},${b})` );
}

```

### Arguments

| Arg | Purpose  |
|-----|-------------------------|
| r   | Color's Red Component   |
| g   | Color's Green Component |
| b   | Color's Blue Component  |

### Description

Converts `RGB` Components to __CSS Styles__ in `rgb()` format.

----------------------------------------------------------------

## Prepare Fire Palette

```javascript

function prepare_fire_palette( count ) {
    // TODO ...
}

```

### Arguments

| Arg   | Purpose |
|-------|---------------------------|
| count | Number of Palette Entries |

### Description

Prepares a __Palette__ using __Fire-like Colors__.

----------------------------------------------------------------

## Draw Sprite Frame

```javascript

function draw_frame( index, x, y, canvas ) {
	const ops  = Sprites;
	const size = ops.EXPLODE_SIZE;
	if ( ( index >= frames ) || ( index < 0 ) ) {
        console.warn( `Frame Index is Out of Range`, index );
        return;
    }
	const gfx = canvas.getContext( '2d' );
	for ( let j = 0; j < size; j += 1 ) {
		for ( let i = 0; i < size; i += 1 ) {
            draw_pixel(
                ( x+i ) ,
                ( y+j ) ,
                read_texel( i, j, index ) ,
                gfx
            );
		}
	}
};

```

### Arguments

| Arg     | Purpose  |
|---------|---------------------------------|
| index   | Sprite's Frame Index            |
| x       | Horizontal Target Coordinate    |
| y       | Vertical Target Coordinate      |
| canvas  | Reference to Target HTML Canvas |

### Description

Draws a single __Sprite Frame__ to the __Canvas__.

----------------------------------------------------------------

## Create Hotspot

```javascript

function create_hotspot( center ) {
    const rnd =()=> Math.random();
    return {
		x  : ( center + 12 * rnd() - 6 ) ,
		y  : ( center + 12 * rnd() - 6 ) ,
		xc : ( rnd() - 0.5 ) ,
		yc : ( rnd() - 0.5 )
	}
}

```

### Arguments

| Arg    | Purpose |
|--------|--------------------------------|
| center | Horizontal and Vertical Center |

### Description

Creates and initializes a __Hotspot__ object.

----------------------------------------------------------------

## Prepare Hotspot Array

```javascript

function prepare_hotspots() {
    const ops   = Sprites;
	const count = ops.EXPLODE_HOTSPOTS;
	const size  = ops.EXPLODE_SIZE;
	const center = ( size >> 1 );
    const hot = [];
	for ( let spot = 0; spot < count; spot += 1 ) {
		const o = create_hotspot( center );
		hot.push( o );
	}
    return ( hot );
}

```

### Arguments

| Arg | Purpose  |
|-----|----------|
| n/a | n/a      |

### Description

Prepares an array of explosion __Hotspot__ objects.

These are <i>temporary</i> constructs. They're used during the
creation of __Explosion Sprite Images__. Once this is finished,
these objects are discarded.

----------------------------------------------------------------

## Create Sprite Buffers

```javascript

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
	console.log( `Created ${s} frames` );
}

```

### Arguments

| Arg  | Purpose  |
|------|----------|
| n/a  | n/a      |

### Description

Creates an empty __Texel__ buffer for each __Sprite Frame__.

----------------------------------------------------------------

## Prepare Sprite Frame

```javascript

function prepare_sprite_frame( index, hot, axis, rise ) {
	const ops = Sprites;
	const size = ops.EXPLODE_SIZE;
	const dc = (
          ( index < axis )
        ? ( index * rise )
        : ( ops.frame.length - index + 8 )
    );
    const read =( x, y )=> {
        read_texel( x, y, index );
    }
    const write =( x, y, c )=> {
        write_texel( x, y, c, index );
    }
    const shift =( x, y )=> {
		return Math.floor(
			( Math.abs( x ) + Math.abs( y ) ) / 3
		);
    }
	for ( let spot = 0; spot < hot.length; spot += 1 ) {
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
				const texel = Math.min(
                     255 ,
                     read( xx, yy )
                  + ( dc >> shift( x, y ) )
                );
				write( xx, yy, texel );
			}
		}
		hot[ spot ].x += hot[ spot ].xc;
		hot[ spot ].y += hot[ spot ].yc;
	}
}

```

### Arguments

| Arg     | Purpose  |
|---------|----------|
| pending | pending  |

### Description

- ( `pending` )

----------------------------------------------------------------

## Create Explosion

```javascript

function create_explosion() {
	const ops = Sprites;
	const frames = ops.EXPLODE_FRAMES;
	const axis = frames >> 2;
	const rise = 128 / axis;
    const hot = prepare_hot_spots();
    create_sprite_buffers();
	for ( let i = 0; i < frames; i += 1 ) {
        prepare_sprite_frame( i, hot, axis, rise );
	}
}

```

### Arguments

| Arg     | Purpose  |
|---------|----------|
| pending | pending  |

### Description

- ( `pending` )

----------------------------------------------------------------

<style>
@import url("./../../style/every-page.css");
</style>

<style>
pre {
    box-sizing : border-box;
    max-width  : calc( 100vw - 64px );
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; prolog = {}
; prolog . title = ( `Explosion Demo` )
</script>

<script>
; cls =()=> console.clear()
; agn =()=> location.reload()
</script>

<script>
; doc = document
; doc . title = ( prolog.title )
</script>
