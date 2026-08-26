<style>
@import url( "./../../style/every-page.css" );
</style>

<style>
img {
    box-sizing : border-box;
    display    : inline-block;
    height     : 80vh;
    margin-top :  4vh;
}
</style>

<style>
#surface {
    box-sizing : border-box;
    position   : fixed;
    border     : 1px dashed black;
    background : transparent;
}
</style>

<style>
#control-panel {
    box-sizing : border-box;
    position   : fixed;
    top  : 5;
    left : 5;
    border     : 1px dashed black;
    background : lemonchiffon;
    color      : midnightblue;
    padding : 1ch;
}
label ,
input[type="checkbox"] {
    user-select : none;
    cursor : pointer;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<div id="control-panel">
  <input id="show-surface-flag" type="checkbox" onchange="show_surface_changed()" checked>
  <label for="show-surface-flag">Show Surface</label>
  <br>
  <button onclick="home()">Home</button>
</div>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<div id="surface-owner">

<div center>
<img src="https://nyteowldave.github.io/art/png/spline-figure-1.png"></img>
</div>

<canvas id="surface"></canvas>

</div>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<footer>
  <input id="footer_input" onchange="perfecto(event)" />
</footer>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
;
; doc = document
;
; gid =( i )=> ( doc.getElementById( i ) )
;
</script>

<script>
function move_surface( rc ) {
    const srf = surface;
    const st = srf.style;
    const px =( n )=> ( `${n}px` );
    st.left   = px( rc.left   );
    st.top    = px( rc.top    );
    st.width  = px( rc.width  );
    st.height = px( rc.height );
}
</script>

<script>
function get_image_rect() {
    const d = document;
    const ce = d.querySelector( "IMG" );
    const rc = ce.getBoundingClientRect();
    return ( rc );
}
</script>

<script>
function main( event ) {
    try {
        const rc = get_image_rect();
        move_surface( rc );
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
</script>

<script>
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function show_surface_changed() {
    try {
        const cb = gid( "show-surface-flag" );
        const so = gid( "surface-owner" );
        if ( cb.checked ) {
            show( so );
        } else {
            hide( so );
        }
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function show( o ) {
    o.classList.remove( "hide" )
}
</script>

<script>
function hide( o ) {
    o.classList.add( "hide" )
}
</script>

<script>
function toggle( o ) {
    if ( hidden( o ) ) {
        return show( o );
    } else {
        return hide( o );
    }
}
</script>

<script>
function hidden( o ) {
    return o.classList.contains( "hide" );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function perfecto( event ) {
    const ops = perfecto;
    try {
        const ev = ( ops.event = event );
        ev.preventDefault();
        ev.stopPropagation();
        const sender = ev.target;
        const s = window.eval( sender.value );
        console.log( s );
    } catch ( e ) {
        console.error( e );
        alert ( e );
        ops.error = ( e.message );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function minnie( event ) {
    const ops = minnie;
    function move( event ) {
        const ops = minnie;
        ops.state.recent_x = event.clientX;
        ops.state.recent_y = event.clientY;
    }
    function release( event ) {
        const ops = minnie;
        move( event );
        switch( ops.mode ) {
        case "point" : return draw_point();
        case "line " : return draw_line();
        }
        end_task();
    }
    function end_task() {
        const ops = minnie;
        ops.state.mode = null;
        ops.state.dragging = false;
        removeEventLister( "mousemove", move   );
        removeEventLister( "mouseup",  release );
    }
    function start_task( mode ) {
        const ops = minnie;
        if ( ops.state.dragging ) {
            end_task();
            return;
        }
        const x = ops.state.start_x = event.clientX;
        const y = ops.state.start_y = event.clientY;
        ops.state.recent_x = x;
        ops.state.recent_y = y;
        ops.state.dragging = true;
        ops.state.mode = mode;
        addEventLister( "mousemove", move   );
        addEventLister( "mouseup",  release );
    }
    function add_point() {}
    function add_line() {}
    function draw_shapes() {}
}
</script>

<script>
minnie.state = {
   dragging : false
,  mode     : "point"
,  start_x  : 0
,  start_y  : 0
,  recent_x : 0
,  recent_y : 0
};
</script>

<script>
addEventListener( "mousedown", minnie );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
XShapes = {};
XShapes.line   = {};
XShapes.point  = {};
// XShapes.curve  = {};
// XShapes.circle = {};
// XShapes.rect   = {};
// XShapes.poly   = {};
// XShapes.trigon = {};
// XShapes.sprite = {};
</script>

<script>
XShapes.get_members = function( type ) {
    const ops = XShapes;
    return Object.keys( ops[ type ] );
};
</script>

<script>
XShapes.get_count = function( type ) {
    const ops = XShapes;
    const m = ops.members( type );
    if ( m ) { return m.length; }
    return ( 0 );
};
</script>

<script>
XShapes.new_name = function( type ) {
    const ops = XShapes;
    const count = ops.get_count( type );
    counst i = ( 1 + count );
    const s  = ( `${type}-${i}` );
    return ( s );
};
</script>

<script>
XShapes.point.add = function( x, y ) {
    const ops = XShapes;
    const key = ops.new_name( "point" );
    const obj = new XPoint( x, y );
    obj.key = ( key );
    ops.point[ key ] = obj;
    return ( obj );
};
</script>

<script>
XShapes.line.add = function( x, y, dx, dy ) {
    const ops = XShapes;
    const key = ops.new_name( "line" );
    const obj = new XLine( x, y, dx, dy );
    obj.key = ( key );
    ops.line[ key ] = obj;
    return ( obj );
};
</script>

<script>
class XCoreShape {
    constructor( type, xo, yo ) {
        this.type = type;
        this.xo = xo;
        thos.yo = yo;
    }
    surface() {
        return gid( "surface" );
    }
    graphics() {
        return this.surface.getContext( "2d" );
    }
};
</script>

<script>
class XPoint extends XCoreShape {
    constructor( x, y ) {
        super( "point", x, y );
        this.filled = true;
    }
    draw( radius=5, gfx ) {
        gfx = ( gfx || this.graphics() );
        if ( this.filled ) {
            gfx.fillStyle = ( this.color || gfx.fillStyle );
        } else {
            gfx.strokeStyle = ( this.color || gfx.strokeStyle );
        }
        gfx.beginPath();
        gfx.ellipse( x, y, r, r, 0, 0, TAU );
        gfx.closePath();
        if ( this.filled ) {
            gfx.fill();
        } else {
            gfx.stroke();
        }
    }
};
</script>

<script>
class XLine extends XCoreShape {
    constructor( x, y, dx, dy ) {
        super( "point", x, y );
        this.dx = dx;
        this.dy = dy;
    }
    draw( gfx ) {
        gfx = ( gfx || this.graphics() );
        gfx.strokeStyle = ( this.color || gfx.strokeStyle );
        gfx.beginPath();
        let x = this.xo; let y = this.yo;
        gfx.moveTo( x, y );
        x += this.dx; y += this.dx;
        gfx.lineTo( x, y );
        gfx.closePath();
        gfx.stroke();
    }
};
</script>

<script>
// class XCurve  extends XCoreShape {};
// class XCircle extends XCoreShape {};
// class XRect   extends XCoreShape {};
// class XPoly   extends XCoreShape {};
// class XTrigon extends XCoreShape {};
// class XSprite extends XCoreShape {};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function home() {
    try {
        const h = home.hostname;
        const p = ( `http://${h}` );
        const s = "demo/web/lines";
        const k = "spline-curve.html";
        const u = [ p, s, k ].join( "/" );
        visit( u );
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
;
; home.hostname = "dave-omega"
;
</script>

<script>
function visit( url ) {
    const d = document;
    const a = d.createElement( "A" );
    a . href = ( url );
    a . click();
}
</script>

<script>
visit.show = function( url ) {
    const s = url.split( "/" ).join( "\n" );
    alert( s );
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

