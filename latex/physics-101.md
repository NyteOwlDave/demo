<style>
html, body {
	border  : none;
	margin  : 0;
	padding : 0;
	box-sizing : border-box;
}
body {
	background-color : #1f1f1f30;
  margin-bottom    : 42vh;
  position         : fixed;
}
body {
	background-image  : url("http://dave-tower/art/math/physics-101.png");
	background-size   : cover;
	background-repeat : no-repeat;
}
.p200 {
  width : calc( 99vw );
	min-height: 200px;
	max-height: 200px;
  text-align : center;
  opacity : 0;
}
.fixed {
	position : fixed ;
  right    : 20px;
	bottom   : calc( 50vh );
	background : #1f1f1f42;
	color : lemonchiffon;
	padding : 8px 16px;
	border-radius : 14px;
 	font : 16pt monospace;
	text-shadow : 1px 1px 3px black;
}
</style>

----------------------------------------------------------------

<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>
<div class="p200">NyteOwl</div>

<div class="fixed" id="winky">Hi!</div>

----------------------------------------------------------------

<script>
__ok = [];
__db =( s )=> ( __ok.push( s ) );
</script>

<script>
addEventListener(
"load", (e)=> {
  console.table( __ok );
} );
</script>

<script>
drag = {};
__db( "drag" );
</script>

<script>
drag.state = {
busy  : false , // Drag in Process
moves : 0     , // Move Event Count
css   : "?"   , // CSS for Translation
prior : null  , // Recent Point
first : null  , // Initial Point
xlate : {       // Recent Translation
   dx : 0 ,
   dy : 0
}
};
__db( "drag.state" );
</script>

<script>
drag.start = function( event ) {
	const ds = drag.state;
  ds.first = (
		ds.prior = read_mouse( event )
	);
	addEventListener( "mousemove", minnie );
	addEventListener( "mouseup"  , pluto  );
	ds.busy  = ( true );
  ds.moves = 0 ;
  console.debug( "Drag Start" );
	mine( event );
};
__db( "drag.start" );
</script>

<script>
drag.move = function( event ) {
	const ds = drag.state;
	const pt = read_mouse( event );
	const xl = ds.xlate;
	const dx = ( pt.x - ds.prior.x ) + xl.dx;
	const dy = ( pt.y - ds.prior.y ) + xl.dy;
	ds.prior = pt;
	ds.xlate = { dx, dy };
	translate( dx, dy );
  ++ds.moves;
	if ( 0 === ( ds.moves % 50 ) ) {
	  console.debug( "Drag Moves", ds.moves );
	  console.debug( "Transform", ds.css );
	}
	mine( event );
};
__db( "drag.move" );
</script>

<script>
drag.end = function( event ) {
	const ds = drag.state;
	removeEventListener( "mousemove", minnie );
	removeEventListener( "mouseup"  , pluto  );
	ds.busy = ( false );
  console.debug( "Drag End" );
	mine( event );
};
__db( "drag.end" );
</script>

<script>
function mine( ev ) {
	ev.preventDefault();
	ev.stopPropagation();
}
</script>

<script>
function mickey( event ) {
		const ds = drag.state;
		const bn = event.button;
		winky.textContent = ( bn );
		if ( bn !== 1 ) { return; }
		if ( ds.busy ) {
			drag.end( event );
			return;
		}
		drag.start( event );
}
__db( "mickey" );
</script>

<script>
addEventListener( "mousedown", mickey );
__db( "mousedown => mickey" );
</script>

<script>
function minnie( event ) {
		const ds = drag.state;
		if (! ds.busy ) { return; }
		drag.move( event );
}
__db( "minnie" );
</script>

<script>
function pluto( event ) {
		const ds = drag.state;
		minnie( event );
		if ( ds.busy ) {
			drag.end( event );
		}
}
__db( "pluto" );
</script>

<script>
function read_mouse( event ) {
	const x = event.clientX;
	const y = event.clientY;
	return { x, y };
}
__db( "read_mouse" );
</script>

<script>
function translate( dx, dy ) {
		const dr = document.body;
		const st = dr.style;
		const ds = drag.state;
		// const xl = ds.xlate;
		// const x = ( `${dx + xl.x}px` );
		// const y = ( `${dy + xl.y}px` );
		ds.css = ( `translate(${dx}px,${dy}px)` );
		st.transform = ( ds.css );
}
__db( "translate" );
</script>



