<style>
html, body {
	border  : none;
	margin  : 0;
	padding : 0;
	background : #080822;
	color      : #F1F1DD;
}
</style>
<style>
.top-pane ,
#surface {
	outline    : none;
	box-sizing : border-box;
	width      : 100%;
	left       : 0;
}
</style>
<style>
.top-pane {
	position   : absolute;
	border     : none;
	top        : 0;
	min-height : 300px;
	resize     : vertical;
	overflow   : scroll;
}
</style>
<style>
#surface {
	margin-bottom : 100px;
	border : 1px dashed gold;
}
</style>

<style>
[hide], .hide {
	display : none !important;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<textarea id="sce" hide class="top-pane" wrap="off" onresize="move_surface()">
</textarea>

<canvas id="surface"></canvas>

----------------------------------------------------------------

<script>
function main( event ) {
	try {
		bug.make_group( 5 );
		circle.test( 3 );
		animate.start();
	} catch ( e ) {
		alert ( e );
		throw ( e );
	}
}
</script>

<script>
addEventListener( "load", main );
</script>

<script>
function move_surface() {
	try {
		const rc = sce.getBoundingClientRect();
		const y = rc.bottom + 4;
		if ( y === surface.y_coord ) {
			return;
		}
		surface.y_coord = ( y );
		surface.style.top = ( `${y}px` );
	} catch ( e ) {
		alert ( e );
		throw ( e );
	}
}
</script>

<script>
addEventListener( "load", move_surface );
</script>

<script>
function render() {
	if ( animate.paused ) { return; }
	move_surface();
	bug.draw_group();
}
</script>

<script>
function animate() {
	const ops = animate;
	if ( ops.running ) {
		render();
		requestAnimationFrame( animate );
	}
}
</script>

<script>
animate.running = 0;
animate.paused  = 0;
</script>

<script>
animate.start = function() {
	animate.running = 1;
	animate.paused  = 0;
	animate();
};
</script>

<script>
animate.stop = function() {
	animate.running = 0;
;
</script>

<script>
animate.pause_play = function() {
	animate.paused = (! animate.paused );
;
</script>

<script>
TAU = Math.PI * 2;
</script>

<script>
function bug( o ) {
	const srf = surface;
	const sw = srf.width;
	const sh = srf.height;
	const gfx = srf.getContext( "2d" );
	let x = o.x_coord;
	let y = o.y_coord;
	circle( x, y, 12, "black", gfx );
	x += o.dx;
	y += o.dy;
 	x = ( x % sw ); if ( x < 0 ) { x += sw; };
 	y = ( y % sh ); if ( y < 0 ) { y += sh; };
	circle( x, y, 10, "gold", gfx );
	o.x_coord = x;
	o.y_coord = y;
	o.counter += 1;
	if ( o.counter > 20 ) {
		o.counter = 0;
		const t = 0.5 * Math.random() - 0.25;
		o.dx += t;
		o.dy -= t;
	}
}
</script>

<script>
bug.make_group = function( count ) {
	while ( count-- > 0 ) {
		bug.create();
	}
}
</script>

<script>
bug.draw_group = function() {
	bug.group.forEach( bug );
}
</script>

<script>
bug.group = [];
</script>

<script>
bug.create = function() {
	const o = {};
	o.counter = 0;
	o.x_coord = 100;
	o.y_coord = 100;
	o.dx = Math.random();
	o.dy = Math.random();
	bug.group.push( o );
	return ( o );
}
</script>

<script>
function circle( x, y, r, c, gfx ) {
	r = ( r || 5 );
	gfx = ( gfx || surface.getContext( "2d" ) );
	gfx . fillStyle = ( c || gfx.fillStyle );
	gfx . beginPath();
	gfx . ellipse( x, y, r, r, 0, 0, TAU );
	gfx . closePath();
	gfx . fill();
}
</script>


<script>
circle.test = function( limit ) {
	const srf = surface;
	const sw = srf.width;
	const sh = srf.height;
	for ( let i = 0 ; i < limit; i += 1 ) {
		const r = ( 0.015 * sw ) + ( 20 * Math.random() );
		const x = ( 0.9 * sw * Math.random() );
		const y = ( 0.9 * sh * Math.random() );
		circle( x, y, r, "green" );
	}
};
</script>

