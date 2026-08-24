 
<style>

* {
  	color: white;
  	background: black;
}

html, body {
	box-sizing : border-box;
	margin  : 0;
	padding : 0;
	border  : none;
}

body {
	height : 100vh;
}

#idCanvas {
	box-sizing : border-box;
	position : fixed;
	top    : 0;
    left   : 0;
	width  : 50vw;
    height : calc( 100vh - 100px );
	border : 1px dashed gold;
}

</style>

----------------------------------------------------------------

<canvas id="idCanvas"></canvas>

----------------------------------------------------------------

<script src="./line-intersection.js"></script>

<script>

const rnd = function(min, max) {
  const range = max - min;
  return Math.round(min + Math.random() * range);
}

const Settings = {
    point_radius: 3,
    point_style: "#FF0000",
    line_width: 1,
    line_style: "#FFFF00",
    TINY: 1e-08
};


const get_canvas = () => idCanvas;
const get_context = () => get_canvas().getContext("2d");

const get_canvas_size = function() {
  return {
    w: idCanvas.width,
    h: idCanvas.height
  };
}

const set_canvas_size = function( w=0, h=0 ) {
    const srf = idCanvas;
	const rc = srf.getBoundingClientRect();
	w = ( w || 0 ); h = ( h || 0 );
    if ( w < 1 ) { w = rc.width;  }
    if ( h < 1 ) { h = rc.height; }
    srf.width  = ( w );
	srf.height = ( h );
    return { w, h };
}

</script>

<script>

const test = function() {
    const size = get_canvas_size();
    const w = size.w;
    const h = size.h;
    function rand_point() {
        return new Point(rnd(0, w), rnd(0, h));
    }
    function rand_line() {
        return new Line(rand_point(), rand_point());
    }
    const context = get_context();
    for (let i=0; i < 100; i++) {
        const pt = rand_point();
        pt.draw(context);
        const line = rand_line();
        line.draw(context);
    }
}

</script>

<script>

const main = function() {
    const size = set_canvas_size();
    const x1 = size.w * 0.1;
    const y1 = size.h * 0.1;
    const x2 = size.w * 0.9;
    const y2 = size.h * 0.9;
    const pa = new Point( x1, y1 );
    const pb = new Point( x2, y2 );
    const pc = new Point( x1, y2 );
    const pd = new Point( x2, y1 );
    const line0 = new Line( pa, pb );
    const line1 = new Line( pc, pd );
    const poi = intersection(line0, line1);
    const context = get_context();
    [
      line0, line1,
      pa, pb, pc, pd, 
      poi
    ].forEach(obj=>obj.draw(context)); 
}

addEventListener( "load", main );

// https://codepen.io/NyteOwlDave/full/NWYPeaX

</script>

