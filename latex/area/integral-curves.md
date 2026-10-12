<style>
@import url("https://nyteowldave.neocities.com/style.css");
@import url("https://nyteowldave.github.io/std/style/ghost.css");
</style>

<style>
* { box-sizing : border-box; }
</style>

<style>
#surface {
	width      : 800px;
	height     : 600px;
	background : black;
	color      : mintcream;
	border     : 1px dashed gold;
}
</style>

<style>
#footer_input {
	width : calc( 100vw - 160px ) !important;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/latex/area/integral-curves.html>
"Tower Edition"

[me-omega]:
<http://dave-omega/demo/latex/area/integral-curves.html>
"Omega Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<h1 id="_T_"> Integral Curves </h1>

----------------------------------------------------------------

> [Tower][me-tower]
> [Omega][me-omega]

> [Area Menu](./../area-menu.html)
> [Math Peaches](./../../web/peaches/math/)

> [File System](./)

----------------------------------------------------------------

<h1> Gaussian </h1>

----------------------------------------------------------------

$$
\int_{-\infty}^{+\infty} { e^{-{x^2}} } dx = \sqrt{\pi}
$$

----------------------------------------------------------------

<h3> JavaScript </h3>

```
f =(x)=> 1 / exp( x*x );
```

----------------------------------------------------------------

<h1> Lorentzian </h1>

----------------------------------------------------------------

$$
\int_{-\infty}^{+\infty} { \frac {1} { x^2 + 1 } } dx = \pi
$$

----------------------------------------------------------------

<h3> JavaScript </h3>

```
f =(x)=> 1 / ( x * x + 1 );
```

----------------------------------------------------------------

<h1> Sine </h1>

----------------------------------------------------------------

$$
\int_{-\infty}^{+\infty} { \frac { \sin { (x) } } { x } } dx = \pi
$$

----------------------------------------------------------------

<h3> JavaScript </h3>

```
f =(x)=> sin( x ) / x;
```

----------------------------------------------------------------

<h1> Damped Cosine </h1>

----------------------------------------------------------------

$$
\int_{-\infty}^{+\infty}
{ \frac { \cos { (x) } } { 1 + {x^2} } }
dx = \frac { \pi } { e }
$$

----------------------------------------------------------------

<h3> JavaScript </h3>

```
f =(x)=> cos( x ) / ( 1 * x * x );
```

----------------------------------------------------------------

# Diagram

<div center>
	<img src="./art/integral-curves.png" />
</div>

----------------------------------------------------------------

# Plot

<div center>
	<canvas id="surface"></canvas>
</div>

----------------------------------------------------------------

<header id="messages"></header>
<footer id="footer">
 <input id="footer_input" wide onchange="perform(event)" />
</footer>

----------------------------------------------------------------

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc = ( document )
; doc . title = ( _T_.textContent ).trim()
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="https://nyteowldave.github.io/std/api/gems/prolog-beta.js"></script>
<script src="https://nyteowldave.github.io/std/api/gems/interpreter-lite.js"></script>
<script src="https://nyteowldave.github.io/std/api/install.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="https://nyteowldave.github.io/chachi/api/math.js"></script>
<script src="https://nyteowldave.github.io/chachi/api/mathplus.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="https://nyteowldave.github.io/std/api/bluto/message-ops.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="https://nyteowldave.github.io/std/api/bluto/gems/acquire.js"></script>
<script src="https://nyteowldave.github.io/std/api/bluto/gems/docify.js"></script>
<script src="https://nyteowldave.github.io/std/api/bluto/gems/suggestions.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
;
; _fn = []
; _fn[ 0 ] =(x)=> ( 1 / exp( x * x  ) )
; _fn[ 1 ] =(x)=> ( 1 / ( x * x + 1 ) )
; _fn[ 2 ] =(x)=> ( sin( x ) / x )
; _fn[ 3 ] =(x)=> ( cos( x ) / ( 1 * x * x ) )
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
	try {
		plot . xctr   = 0;
		plot . yctr   = 400;
		plot . xscale = 1.0;
		plot . yscale = Math.floor( plot . yctr * 0.95 );
		blurt( "Ready for Action!" );
	} catch ( e ) {
		bummer ( e );
	}
};

addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function plot( fn, lo, hi, steps ) {
	try {
		_plot( fn, lo, hi, steps );
	} catch ( e ) {
		bummer( e );
	}
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
;
; plot.xctr   = 0
; plot.yctr   = 400
; plot.xscale = 1.0
; plot.yscale = 1.0
;
; srf = ( null )
; gfx = ( null )
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function _plot( fn, lo, hi, steps ) {
	const gfx = plot . graphics();

	fn = ( fn || _fn[ 0 ] );
	lo = ( lo || 0   );
	hi = ( hi || 800 );
	const gap = ( hi - lo );

	steps     = ( steps || ( gap / 3 ) );
	const dx  = ( gap / steps );

	plot . clear( gfx );

	gfx . lineWidth   = dx * 0.9;
	gfx . strokeStyle = "mintcream";
	for ( let x = lo; x < hi; x += dx ) {
		let y = fn( x );
		plot.vline( x, y, gfx );
	};
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
plot.graphics = function() {
	if ( null === srf ) {
		srf = gid( "surface" );
		srf . width  = 800;
		srf . height = 600;
	}
	gfx = srf . getContext( "2d" );
	gfx . strokeStyle = ( gfx . strokeStyle || "mintcream" );
	return ( gfx );
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
plot.clear = function( gfx ) {
	const srf = gfx.canvas;
	const w = srf . width;
	const h = srf . height;
	gfx . clearRect( 0, 0, w, h );
	return ( gfx );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
plot.vline = function( x, y, gfx ) {
	const kx = plot . xscale;
	const ky = plot . yscale;
	const xo = plot . xctr;
	const yo = plot . yctr;
	y *= ky;
	x = xo + x * kx;
	console.debug( { x, y } );
	gfx = ( gfx || plot.graphics() );
	gfx . beginPath();
	gfx . moveTo( x, yo     );
	gfx . lineTo( x, yo - y );
	gfx . stroke();
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
plot.example = function( index ) {
	const i  = parseInt( index );
	const fn = _fn[ i ];
	if (! fn ) {
		alert( "Example Index is Out of Bounds" );
		return;
	}
	plot( fn );
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

