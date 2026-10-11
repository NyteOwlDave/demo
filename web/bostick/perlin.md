<style>
* { box-sizing : border-box; }
</style>

<style>
[center]  { text-align : center; }
[onclick] { cursor : pointer;    }
</style>

<style>
html , body {
    color      : mintcream;
    background : #080822;
    margin     : 0;
    border     : none;
}
body {
    text-align : center;
}
</style>

<style>
canvas {
    width  : 800px;
    height : 600px;
    border : 1px dashed gold;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

----------------------------------------------------------------

<h1 id="_T_"> Perlin Noise Demo </h1>

----------------------------------------------------------------

<canvas id="surface"></canvas>

----------------------------------------------------------------

<div center>
  <button id="btn-animate" onclick="do_animate(event)">Animate</button>
  <button id="btn-clear"   onclick="do_clear(event)">Clear</button>
</div>

----------------------------------------------------------------

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

; doc = ( document )
; boo = ( doc . body )

; gid =( i )=> ( doc.getElementById( i ) )
; elx =( t )=> ( doc.createElement ( t ) )

; str =( o )=> String( o ||"" ).trim()

; rnd =(   )=> Math.random()
; cos =( t )=> Math.cos( t )
; sin =( t )=> Math.sin( t )
; floor =( n )=> Math.floor( n )

; doc . title = ( _T_.textContent ).trim()

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

const btn_animate = gid( "btn-animate" );
const btn_clear   = gid( "btn-clear"   );

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

hsl = function( h, s, l ) {
	return [
	"hsl(" + h
	, s
	, l + ")"
	].join( "," );
};

pen = {};
pen . hsl = function( n ) {
	return hsl(
		n * 600 - 200
	  , "100%"
	  , ( 800 * n * n * n ) + "%"
	);
};

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

/*
	Author   : Mike Bostick
	Examples : https://observablehq.com/@mbostock
    Source   : https://observablehq.com/@mbostock/altered-world
*/

period = 0.01;

width  = 800;
height = 600;
length = 400;

perlin   = ( null );
graphics = ( null );

function* canvas() {
  context = graphics . context;
  context . canvas . style . background = "#000";
  context . lineWidth   = 0.5;
  context . globalAlpha = 0.05;
  for ( let px = 0; px < width; ++px ) {
    for ( let i = 0; i < height / 6; ++i ) {
      let x = px;
      let y = height * rnd();
      let n = perlin . noise( x * period, y * period );
      context . strokeStyle = pen.hsl( n );
      context . beginPath();
      context . moveTo( x, y );
      for ( let m = 0;
              ( m < length  )
           && ( y >= 0      )
           && ( y <= height ); ++m ) {
        n = perlin.noise( x * period, y * period );
        x += cos( n * 14 );
        y += sin( n * 14 );
        context . lineTo( x , y );
      }
      context.stroke();
    }
    yield context.canvas;
  }
}

function init_demo() {
    perlin  = new Noise( 3 );
    graphics = new Gfx( width, height );
};

addEventListener( "load", init_demo );

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

class Noise {
  constructor( octaves = 1 ) {
    this . p = new Uint8Array( 512 );
    this . octaves = octaves;
    this . init();
  }
  init() {
    for ( let i = 0; i < 512; ++i ) {
      this . p[ i ] = 256 * rnd();
    }
  }
  noise2d(x2d, y2d) {
    const X = floor( x2d ) & 255;
    const Y = floor( y2d ) & 255;
    const x = x2d - floor( x2d );
    const y = y2d - floor( y2d );
    const fx = ( 3 - 2 * x ) * x * x;
    const fy = ( 3 - 2 * y ) * y * y;
    const p0 = this.p[ X     ] + Y;
    const p1 = this.p[ X + 1 ] + Y;
    return Noise.lerp(
      fy,
      Noise.lerp(
        fx,
        Noise.grad2d( this.p[ p0 ], x, y     ) ,
        Noise.grad2d( this.p[ p1 ], x - 1, y )
      ),
      Noise.lerp(
        fx,
        Noise.grad2d( this.p[ p0 + 1 ], x, y - 1    ) ,
        Noise.grad2d( this.p[ p1 + 1 ], x - 1, y - 1)
      )
    );
  }
  noise( x, y ) {
    let e = 1,
        k = 1,
        s = 0;
    for ( let i = 0; i < this.octaves; ++i ) {
      e *= 0.5;
      s += e * ( 1 + this.noise2d( k * x, k * y ) ) / 2;
      k *= 2;
    }
    return s;
  }
};

Noise.grad2d = function( i, x, y ) {
    const v = ( i & 1 ) === 0 ?  x : y;
    return    ( i & 2 ) === 0 ? -v : v;
};

Noise.lerp = function( t, a, b ) {
    return ( a + t * ( b - a ) );
};

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

class Gfx {
	constructor( w, h, id="surface" ) {
		this.state = {};
		this.init( w, h, id );
	}
	get width() {
		const ce = this . canvas;
		return (  ce . width );
	}
	get height() {
		const ce = this . canvas;
		return (  ce . height );
	}
	get size() {
		const ce = this . canvas;
		const w = ce . width;
		const h = ce . height;
		return { w, h };
	}
	get canvas() {
		return this . state . canvas;
	}
    get context() {
        return (
            this
            . canvas
            . getContext( "2d" )
        );
    }
	init( w, h, id ) {
		id = ( str( id ) || "surface" );
		let ce = gid( id );
		if (! ce ) {
			ce = doc.createElement( "CANVAS" );
			ce . id  = ( id );
			doc . body . appendChild( ce );
		}
		ce . width  = ( w );
		ce . height = ( h );
		this . state . canvas = ( ce );
	}
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function do_clear( event ) {
    try {
        if ( running ) { return; };
        const ctx = graphics.context;
        const w   = graphics.width;
        const h   = graphics.height;
        ctx.clearRect( 0, 0, w, h );
    } catch ( e ) {
        console.error ( e );
        window .alert ( e );
    };
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function do_animate( event ) {
    running = (! running );
    if ( running ) {
        let gen = canvas();
        btn_animate . textContent = "Pause";
        btn_clear . disabled = true;
        function frame() {
            if (! running ) { return; }
            const r = gen . next();
            if ( r . done ) {
                gen = canvas();
            }
            requestAnimationFrame( frame );
        }
        frame();
    } else {
        btn_animate . textContent = "Animate";
        btn_clear . disabled = false;
    }
}
;
; running = ( false )
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

