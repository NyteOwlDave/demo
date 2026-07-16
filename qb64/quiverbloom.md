
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
JarvisGroups = {};
</script>

<script>
_PI  = ( Math.PI );
_TAU = ( 2 * _PI );
</script>

<script>
Constants = { _PI , _TAU };
</script>

<script>
cos =( t )=> Math.cos( t );
sin =( t )=> Math.sin( t );
hypot =( x, y )=> Math.hypot( x, y );
</script>

<script>
MathOps = { cos, sin, hypot };
</script>

<script>
; SURF = {}
; SURF.W  = 800
; SURF.H  = 680
; SURF.ID = ( `quiverbloom` )
; srf = ( null )
</script>

<script>
create_surface = function( w, h ) {
    const ce = doc . createElement( "CANVAS" );
    ce . width  = ( w || 320 );
    ce . height = ( h || 320 );
    return ( ce );
};
</script>

<script>
SurfaceOps = {
  state  : SURF
, create : create_surface
};
</script>

<script>
rgb = function( r, g, b ) {
    r = ( r & 0xFF ) || 0;
    g = ( g & 0xFF ) || 0;
    b = ( b & 0xFF ) || 0;
    p = ( `(${r},${g},${b})` );
    return ( "rgb" + p );
};
</script>

<script>
rgba = function( r, g, b, a ) {
    r = ( r & 0xFF ) || 0;
    g = ( g & 0xFF ) || 0;
    b = ( b & 0xFF ) || 0;
    a = parseFloat( a );
    p = ( `(${r},${g},${b},${a})` );
    return ( "rgba" + p );
};
</script>

<script>
ColorOps = { rgb, rgba };
</script>

<script>
rect = function( gfx, x, y, w, h, style ) {
    if ( gfx instanceof HTMLCanvasElement ) {
       gfx = gfx.getContext( "2d" );
    }
    gfx.fillStyle = ( style );
    gfx.fillRect( x, y, w, h );
};
</script>

<script>
pset = function( gfx, xr, yr, style ) {
    rect( gfx, x, y, x+1, y+1, style );
};
</script>

<script>
background = function( gfx, style ) {
    let canvas;
    if ( gfx instanceof HTMLCanvasElement ) {
       canvas = gfx;
    } else if ( gfx ) {
       canvas = gfx.canvas;
    } else {
       canvas = doc . getElementById( SURF.ID );
    };
    w = canvas.width;
    h = canvas.height;
    rect( gfx, 0, 0, w, h, style );
};
</script>

<script>
GraphicsOps = { rect, pset, background };
</script>

<script>
render_bloom = function( angle, canvas ) {
    const gfx = canvas.getContext( "2d" );
    background( gfx, "black" );
    let x, y, k, c, e, d, p, q, r;
    let xp, yp, xr, yr;
    let col, cr, cg, cb, rgb;
    for ( x=0; x <= 12000; x += 0.5 ) {
        y  = (x/235);
        k  = (4+sin(x/11+8*t))*cos(x/14);
        e  = (y/9-19);
        d  = (hypot(k,e)+sin(y/9+3*t));
        r  = (9+2*sin(y-3*d));
        p  = (sin(y/17)*k*r);
        q  = (2*sin(2*k)+p);
        c  = (d*d/50);
        xp = (q-50*cos(c)-85);
        yp = (d*39-q*sin(c)-620);
        xr = (xp*cos(t)-yp*sin(t));
        yr = (xp*sin(t)+yp*cos(t));
        col = (100*sin(3*k));
        cr  = (255);
        cg  = (col+155);
        cb  = (255-col);
        pset( gfx, xr, yr, rgb( cr, cg, cb ) );
    }
};
</script>

<script>
bloom = {};
</script>

<script>
bloom . start = function() {
    bloom . running = true;
    bloom . stopped = false;
    bloom . angle   = 0;
    render_frame();
};
</script>

<script>
bloom . stop = function() {
    bloom . running = false;
    bloom . stopped = true;
};
</script>

<script>
render_frame = function() {
    if ( bloom.running ) {
        let t = bloom.angle;
        render_bloom( t, srf );
        t += ( _TAU / 800 );
        bloom.angle = ( t % _TAU );
    }
    if ( bloom.stopped ) {
        bloom.running = false;
        return;
    }
    requestAnimationFrame( render_frame );
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
JarvisGroups.constants = Constants;
JarvisGroups.math      = MathOps;
JarvisGroups.surface   = SurfaceOps;
JarvisGroups.color     = ColorOps;
JarvisGroups.graphics  = GraphicsOps;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        init_ui();
        init_io();
        init_demo();
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
function crashed( e, must_throw ) {
    const ops = ( crashed );
    if (! ops.silent ) {
        console.error ( e );
    }
    if (! ops.muted ) {
        window.alert ( e );
    }
    if ( must_throw ) {
        console.error ( e );
        alert ( e );
        throw ( e );
    }
    return ( e );
}
; silent = ( false )    // Suppress Console Write
; muted  = ( false )    // Suppress Alert Popup
</script>

<script>
function init_demo() {
    srf = doc . getElementById( SURF.ID );
    if (! srf ) {
        srf = create_surface( SURF.W, SURF.H );
        srf . id = ( SURF . ID );
        doc . body . appendChild( srf );
    };
    console.debug( `Init Demo` );
}
</script>

<script>
function init_ui() {
    console.debug( `Init User Interface` );
}
</script>

<script>
function init_io() {
    console.debug( `Init File I/O` );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->


