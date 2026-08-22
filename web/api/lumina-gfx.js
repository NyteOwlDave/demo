
/*

    lumina-gfx.js

    Successor to Magde and Madge-Deux

*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* colors-hex.js */

colors_hex = [
'#ff00ff','#000000','#020000','#040100',
'#060100','#090200','#0b0200','#0d0300',
'#100300','#120400','#140400','#160500',
'#190500','#1b0600','#1d0600','#200700',
'#220700','#240800','#270800','#290900',
'#2b0a00','#2d0a00','#300b00','#320b00',
'#340c00','#370c00','#390d00','#3b0d00',
'#3e0e00','#400e00','#420f00','#440f00',
'#471000','#491000','#4b1100','#4e1100',
'#501200','#521200','#551300','#571400',
'#591400','#5b1500','#5e1500','#601600',
'#621600','#651700','#671700','#691800',
'#6c1800','#6e1900','#701900','#721a00',
'#751a00','#771b00','#791b00','#7c1c00',
'#7e1c00','#801d00','#831e00','#851e00',
'#871f00','#891f00','#8c2000','#8e2000',
'#902100','#932100','#952200','#972200',
'#9a2300','#9c2300','#9e2400','#a02400',
'#a32500','#a52500','#a72600','#aa2700',
'#ac2700','#ae2800','#b12800','#b32900',
'#b52900','#b72a00','#ba2a00','#bc2b00',
'#be2b00','#c12c00','#c32c00','#c52d00',
'#c82d00','#ca2e00','#cc2e00','#ce2f00',
'#d12f00','#d33000','#d53100','#d83100',
'#da3200','#dc3200','#df3300','#e13300',
'#e33400','#e53400','#e83500','#ea3500',
'#ec3600','#ef3600','#f13700','#f33700',
'#f63800','#f83800','#fa3900','#fc3900',
'#fc3a00','#fc3c00','#fc3e00','#fc4000',
'#fc4100','#fc4300','#fc4500','#fc4700',
'#fc4800','#fc4a00','#fc4c00','#fc4e00',
'#fc4f00','#fc5100','#fc5300','#fc5500',
'#fc5700','#fc5800','#fc5a00','#fc5c00',
'#fc5e00','#fc5f00','#fc6100','#fc6300',
'#fc6500','#fc6600','#fc6800','#fc6a00',
'#fc6c00','#fc6e00','#fc6f00','#fc7100',
'#fc7300','#fc7500','#fc7600','#fc7800',
'#fc7a00','#fd7c00','#fd7d00','#fd7f00',
'#fd8100','#fd8300','#fd8500','#fd8600',
'#fd8800','#fd8a00','#fd8c00','#fd8d00',
'#fd8f00','#fd9100','#fd9300','#fd9400',
'#fd9600','#fd9800','#fd9a00','#fd9c00',
'#fd9d00','#fd9f00','#fda100','#fda300',
'#fda400','#fda600','#fda800','#fdaa00',
'#fdab00','#fdad00','#fdaf00','#fdb100',
'#fdb200','#fdb400','#fdb600','#fdb800',
'#fdba00','#fdbb00','#febd00','#febf00',
'#fec100','#fec200','#fec400','#fec600',
'#fec800','#fec900','#fecb00','#fecd00',
'#fecf00','#fed100','#fed200','#fed400',
'#fed600','#fed800','#fed900','#fedb00',
'#fedd00','#fedf00','#fee000','#fee200',
'#fee400','#fee600','#fee800','#fee900',
'#feeb00','#feed00','#feef00','#fef000',
'#fef200','#fef400','#fef600','#fef700',
'#fef900','#fefb00','#fefd00','#ffff00',
'#ffff07','#ffff0f','#ffff17','#ffff1f',
'#ffff27','#ffff2f','#ffff37','#ffff3f',
'#ffff47','#ffff4f','#ffff57','#ffff5f',
'#ffff67','#ffff6f','#ffff77','#ffff7f',
'#ffff87','#ffff8f','#ffff97','#ffff9f',
'#ffffa7','#ffffaf','#ffffb7','#ffffbf',
'#ffffc7','#ffffcf','#ffffd7','#ffffdf',
'#ffffe7','#ffffef','#fffff7','#ffffff'
];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* colors-rgba.js */

colors_rgba = [];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* rgba-from-hex.js */

function rgba_from_hex( s ) {
	s = str( s ).slice( 1 );
	const n = parseInt( `0x${s}` );
	const a = ( n >> 24 ) & 0xFF;
	const r = ( n >> 16 ) & 0xFF;
	const g = ( n >>  8 ) & 0xFF;
	const b = ( n       ) & 0xFF;
	return { r, g, b, a };
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* prepare-rgba-colors.js */

function prepare_rgba_colors( hex ) {
    hex = ( hex || colors_hex );
	colors_rgba = hex.map( rgba_from_hex );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* math.js */

_E = Math.E;

_PI  = Math.PI;
_PHI = _PI / 2;
_TAU = _PI * 2;

_SR2 = Math.sqrt( 2 );
_SR3 = Math.sqrt( 3 );
_SR5 = Math.sqrt( 5 );

_PSI = ( 1 + _SR5 ) / 2;

round =( n )=> Math.round( n );
trunc =( n )=> Math.trunc( n );
floor =( n )=> Math.floor( n );
ceil  =( n )=> Math.ceil ( n );

abs =( a )=> Math.abs ( a );
sgn =( a )=> Math.sign( a );

max =( a, b )=> Math.max( a, b );
min =( a, b )=> Math.min( a, b );
mid =( a, b, c )=> min( max( a, b ), c );

pow =( x, n )=> Math.pow( x, n );
rootn =( x, n )=> Math.pow( x, 1 / n );

sqrt =( n )=> Math.sqrt( n );
cbrt =( n )=> Math.cbrt( n );

square =( n )=> ( n * n );
cube =( n )=> pow( n, 3 );

exp =( n )=> Math.exp( n );
log =( n )=> Math.log( n );
logn =( x, n )=> ( log( x ) / log( n ) );

rnd  =( k )=> ( (k||1) * Math.random() );
irnd =( k )=> ( floor( rnd( k ) ) );
crnd =( k )=> ( (k=k||1), rnd( k ) - (0.5 * k) );
arnd =(   )=> crnd( _TAU );

function constants() {
    const t = vstats.tabulate( MathProps );
    inspect( "Math Constants", t );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* trig.js */

sin =( t )=> Math.sin( t );
cos =( t )=> Math.cos( t );
tan =( t )=> Math.tan( t );

asin =( n )=> Math.asin( n );
acos =( n )=> Math.acos( n );
atan =( n )=> Math.atan( n );

atan2 =( y, x )=> Math.atan2( y, x );
hypot =( y, x )=> Math.hypot( y, x );

sinh =( t )=> Math.sinh( t );
cosh =( t )=> Math.cosh( t );
tanh =( t )=> Math.tanh( t );

asinh =( n )=> Math.asinh( n );
acosh =( n )=> Math.acosh( n );
atanh =( n )=> Math.atanh( n );

xpose = function( n ) {
    return sqrt( 1 - square( n ) );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* stats.js */

vfill =( v, n )=> ( v.map( _ => n ) );
vzero =( v )=> vfill( v, 0 );

vmax =( v )=> v.reduce((a,b)=>max(a,b),-Infinity);
vmin =( v )=> v.reduce((a,b)=>min(a,b), Infinity);
vsum =( v )=> v.reduce((a,b)=>(a+b),0);
vavg =( v )=> (vsum(v)/(v.length));

vbounds = function( v ) {
    let lower =  Infinity;
    let upper = -Infinity;
    if ( v.length < 1 ) {
        throw new Error( `Expected at least one sample` );
    }
    v.forEach(
        ( n ) => {
            lower = min( n, lower );
            upper = max( n, upper );
        }
    );
    const range = ( upper - lower );
    return { lower, upper, range };
};

vmedian = function( v ) {
    let i, j;
    if ( v.length < 1 ) {
        throw new Error( `Expected at least one sample` );
    }
    v = v.sort();
    if ( v.length % 1 ) {
        i = ceil( v.length / 2 );
        return v[ i ];
    } else {
        i = floor( v.length / 2 );
        j = i + 1;
        return ( 0.5 * ( v[i] + v[j] ) );
    }
};

vlerp = function( v, t ) {
    const bounds = vbounds( v );
    const lo = bounds.lower;
    const hi = bounds.upper;
    const u = ( 1 - t );
    return ( u*lo + t*hi );
};

vhalf =( v )=> vlerp( v, 0.5 );

vrange = function( v ) {
    const bounds = vbounds( v );
    return ( bounds.upper - bounds.lower );
};

vmse = function( v ) {
    const k = ( v.length - 1 );
    if ( k < 0 ) {
        throw new Error( `Expected at least one sample` );
    }
    if ( k < 1 ) {
        return 0;
    }
    const mean = vavg( v );
    let err = 0;
    v.forEach(
        ( x ) => {
            dx = x - mean;
            err += square( dx );
        }
    );
    return ( err / k );
};

vstd =( v )=> sqrt( vmse( v ) );

vnorm = function( v ) {
    const samples = arr( v );
    if ( samples.length < 1 ) {
        throw new Error( `Expected at least one sample` );
    }
    const bounds  = vbounds( samples );
    const scale   = ( 1 / bounds.range );
    if (! isFinite( scale ) ) {
        throw new Error( `Sample Set has Zero Range` );
    }
    const normals = samples.map( n => n * scale );
    return { samples, normals, bounds, scale };
};

vdiff = function( v ) {
    const deltas  = [];
    const samples = arr( v );
    if ( samples.length > 0 ) {
        deltas.push( 0 );
    } else {
        return ( deltas );
    }
    let lower =  Infinity;
    let upper = -Infinity;
    let delta, value, prior = samples.shift();
    while ( samples.length > 0 ) {
        value = samples.shift();
        delta = ( value - prior );
        prior = value;
        deltas.push( delta );
        lower = min( delta, lower );
        upper = max( delta, upper );
    }
    const range  = ( upper - lower );
    const bounds = { lower, upper, range };
    return { bounds, deltas, samples : v };
};

vstats = function( v ) {
    const samples = arr( v );
    const n = samples.length;
    if ( n < 1 ) {
        throw new Error( `Expected at least one sample` );
    }
    let lo = +Infinity;
    let hi = -Infinity;
    let xx = 0; let xsum = 0;
    let yy = 0; let ysum = 0;
    let xy = 0;
    let x = 0;
    samples.forEach(
        ( y ) => {
            xsum += x;
            ysum += y;
            xx += square( x );
            yy += square( y );
            xy += ( x * y );
            lo = min( y, lo );
            hi = max( y, hi );
            x += 1;
        }
    );
    const m = ((n*xy)-(xsum*ysum)) / ((n*xx)-square(xsum));
    const b = ((ysum*xx)-(xsum*xy)) / ((n*xx)-square(xsum));
    const avg = ysum / n;
    const sse = vsum(
        samples.map(
            ( y ) => square( y-avg )
        )
    );
    const mse = sse / ( n - 1 );
    const std = sqrt( mse );
    return {
        n, avg,
        m, b,
        lo, hi,
        xsum, ysum,
        xx, yy, xy,
        sse, mse, std,
        samples
    };
};

vstats.hints = {
  n    : "Sample Count"
, avg  : "Mean Average"
, m    : "Slope"
, b    : "Intercept"
, lo   : "Lower Y Bound"
, hi   : "Upper Y Bound"
, xsum : "Sum of X Indices"
, ysum : "Sum of Y Samples"
, xx   : "Sum of Squares of Indices"
, yy   : "Sum of Squares of Samples"
, xy   : "Sum of X-Y Products"
, sse  : "Sum of Squared Errors"
, mse  : "Mean Squared Error"
, std  : "Standard Deviation"
, samples : "Input Sample Set"
};

vstats.pubs = ( "http://dave-probook/std/pubs/math/" );

vstats.tabulate = function( o ) {
    if ( Array.isArray( o ) ) {
        return ( o );
    }
    if (! ( o instanceof Object ) ) {
        o = vstats.hints;
    }
    const m = Object.keys( o );
    return m.map( k => ( [ k, o[ k ] ] ) );
};

vstats.inspect = function( o ) {
    const t = vstats.tabulate( o );
    inspect( "Statistics", t );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* madge.js */

// Prepare Drawing Surface
function Surface() {
    const ops = Surface;
    const srf = surface;
    const rc = srf.getBoundingClientRect();
    let w = parseInt( rc.width  );
    let h = parseInt( rc.height );
    if ( ops.debug ) {
        inspect.size( `Viewport`, w, h );
    }
    if ( srf.width !== w ) {
        srf.width = w;
    }
    if ( srf.height !== h ) {
        srf.height = h;
    }
    w = srf.width;
    h = srf.height;
    if ( ops.debug ) {
        inspect.size( `Surface`, w, h );
    }
    return ( srf );
}

// Debug Mode
Surface.debug = ( false );

// Prepare Surface Metrics
Surface.metrics = function() {
	const srf = Surface();
	const w = srf.width;
	const h = srf.height;
    const cx = w / 2;
    const cy = h / 2;
    const aspect = ( cx / cy );
    return { srf, w, h, cx, cy, aspect };
};

// Prepare 2D Transform
Surface.xform = function( xo, yo, scale ) {
   return { xo, yo, scale };
};

// Acquire Graphics Engine
function Graphics() {
    return (
        Surface().getContext( "2d" )
    );
};

// Capture Pixel Map
Graphics.pixmap = function( x, y, w, h ) {
    if ( "undefined" === typeof x ) {
        const m = Surface.metrics();
        x = 0; y = 0;
        w = m.w;
        h = m.h;
    }
    const gfx = Graphics();
    return gfx.getImageData( x, y, w, h );
};

// Draw Sprite from Pixel Map
Graphics.sprite = function( dx, dy, pixmap ) {
    const mw = ( pixmap.width  );
    const mh = ( pixmap.height );
    dx = ( dx || 0 );
    dy = ( dy || 0 );
    const gfx = Graphics();
    gfx.putImageData( pixmap, dx, dy, 0, 0, mw, mh );
    return ( gfx );
};

// Draw Sprite from MIP Map
Graphics.mip = function( dx, dy, rc, mipmap ) {
    mw = ( rc.w || rc.width  || mipmap.width  );
    mh = ( rc.h || rc.height || mipmap.height );
    mx = ( rc.x || rc.left || 0 );
    my = ( rc.y || rc.top  || 0 );
    dx = ( dx || 0 );
    dy = ( dy || 0 );
    const gfx = Graphics();
    gfx.putImageData( mipmap, dx, dy, mx, my, mw, mh );
    return ( gfx );
};

// Capture Picture as Canvas
function Snapshot( x, y, w, h ) {
    const m = Surface.metrics();
    w = ( w || m.w );
    h = ( h || m.h );
    x = ( x || 0   );
    y = ( y || 0   );
    const gfx = Graphics();
    const dst = new OffscreenCanvas( w, h );
    const pic = dst.getContext( "2d" );
    pic.drawImage( gfx, x, y, w, h, 0, 0, w, h );
    return ( pic );
}

// Draw Picture to Surface
function Picture( pic, x, y, w, h ) {
    const m = Surface.metrics();
    w = ( w || m.w );
    h = ( h || m.h );
    x = ( x || 0   );
    y = ( y || 0   );
    const gfx = Graphics();
    gfx.drawImage( pix, x, y, w, h );
    return ( gfx );
}

// Fill Background
function Background( c ) {
    const m = Surface.metrics();
    const gfx = Graphics();
    gfx.fillStyle = ( c || gfx.fillStyle );
    gfx.fillRect( 0, 0, m.w, m.h );
    return ( gfx );
}

// Set Pen Color
function Pen( style ) {
    const gfx = Graphics();
    const old = gfx.strokeStyle;
    gfx.strokeStyle = ( style );
    return ( old );
}

// Set Pen Thickness
Pen.thickness = function( n ) {
    const gfx = Graphics();
    n = ( parseInt( n ) || 1 );
    const old = gfx.strokeWidth;
    gfx.strokeWidth = ( n );
    return ( old );
};

// Draw Single Pixel
Pen.dot = function( x, y, c ) {
    const gfx = Graphics();
    gfx.beginPath();
    const old = gfx.fillStyle;
    gfx.fillStyle = ( c || gfx.strokeStyle );
    gfx.fillRect( x, y, 1, 1 );
    gfx.fillStyle = ( old );
    return ( gfx );
};

// Draw Line Segment
Pen.lineseg = function( p0, p1, c ) {
    const gfx = Graphics();
    gfx.strokeStyle = ( c || gfx.strokeStyle );
    gfx.beginPath();
    gfx.moveTo( p0.x, p0.y );
    gfx.lineTo( p1.x, p1.y );
    gfx.stroke();
    return ( gfx );
};

// Draw Line Using y = mx + b
Pen.line = function( m, b, xform, c ) {
   const mx = Surface.metrics();
   const xo = xform.xo;
   const yo = xform.yo;
   const scale = xform.scale;
   let x1,y1,x2,y2;
   const xx =( x )=> ( xo + x );
   const yy =( y )=> ( yo - y*scale );
   const f  =( x )=>  ( m * x + b );
   const lineseg =()=> {
      const pt0 = Point( xx( x1 ), yy( y1 ) );
      const pt1 = Point( xx( x2 ), yy( y2 ) );
      Pen.lineseg( pt0, pt1, c );
   };
   x1 = 0;         y1 = f( x1 );
   x2 = x1 + mx.w; y2 = f( x2 );
   // Draw Trend Line Segment
   lineseg();
   // Draw Y-Intercept Marker
   Pen.circle( xx( x1 ), yy( y1) , 10, c );
};

// Draw Regression Trend Line
Pen.trend = function( stats, xo=10, yo=266, h=256, c ) {
   const m = stats.m;
   const b = stats.b;
   const xform = Surface.xform( xo, yo, h );
   Pen.line( m, b, xform, c );
};

// Draw Rectangle Border
Pen.rect = function( x, y, w, h, c ) {
    const gfx = Graphics();
    gfx.strokeStyle = ( c || gfx.strokeStyle );
    gfx.beginPath();
    gfx.rect( x, y, w, h );
    gfx.stroke();
    return ( gfx );
};

// Draw Circle Border
Pen.circle = function( x, y, r, c ) {
    const gfx = Graphics();
    gfx.strokeStyle = ( c || gfx.strokeStyle );
    gfx.beginPath();
    gfx.ellipse( x, y, r, r, 0, 0, _TAU );
    gfx.stroke();
};

// Draw Polygon Border
Pen.poly = function( points, c ) {
    const sides = points.length;
    if ( sides < 1 ) { return; }
    if ( sides < 2 ) {
        const pt = points[ 0 ];
        Pen.dot( pt.x, pt.y, c );
        return;
    }
    if ( sides < 3 ) {
        Pen.lineseg( points[ 0 ], points[ 1 ], c );
        return;
    }
    const gfx = Graphics();
    gfx.strokeStyle = ( c || gfx.strokeStyle );
    gfx.beginPath();
    let pt = points[ 0 ];
    gfx.moveTo( pt.x, pt.y );
    for( let i = 1; i < sides; i += 1 ) {
        pt = points[ i ];
        gfx.lineTo( pt.x, pt.y );
    }
    pt = points[ 0 ];
    gfx.lineTo( pt.x, pt.y );
    gfx.closePath();
    gfx.stroke();
};

// Prepare 2D Point
function Point( x, y ) {
    return { x, y };
}

// Prepare 3D Vertex
function Vertex( x, y, z ) {
    return { x, y, z };
}

// Flatten 3D Vertex to 2D Point
Vertex.flatten = function( v, scale ) {
    scale = ( scale || 1.0 );
    const k = scale / ( v.z || 1.0 );
    const x = v.x * k;
    const y = v.y * k;
    return Point( x, y );
};

// Acquire RGBA Palette
function Palette() {
    return colors_rgba;
}

// Write RGBA Palette from Hex Palette
Palette.from_hex = function( source ) {
    colors_rgba = source.map( rgba_from_hex );
};

// Read Palette Index
function Color( index ) {
    return ( Palette() [ index ] );
}

// Convert Hex Color to RGBA Color
Color.from_hex = function( source ) {
    return rgba_from_hex( source );
};

// Convert Discrete ( r, g, b ) to RGB Color
Color.from_rgb = function( r, g, b ) {
    const c = ( `${r},${g},${b}` );
    return [ "rgb(", c, ")" ].join( "" );
};

// Convert Discrete ( r, g, b, a ) to RGBA Color
Color.from_rgba = function( r, g, b, a ) {
    const c = ( `${r},${g},${b},${a}` );
    return [ "rgba(", c, ")" ].join( "" );
};

// Convert 32-bit UINT to RGBA Color
Color.from_int = function( n ) {
    const s = "#" + Number( n ).toString( 16 );
    return Color.from_hex( s );
};

// Convert Vec3 to RGB Color
// Channel Bounds : [ 0.0 ... 1.0 ]
Color.from_vec3 = function( v ) {
    function byte( n ) {
        n = round( n * 255 );
        return mid( n, 0, 255 );
    }
    const r = byte( v[ 0 ] );
    const g = byte( v[ 1 ] );
    const b = byte( v[ 2 ] );
    return Color.from_rgb( r, g, b );
};

// Convert Vec4 to RGB Color
// Channel Bounds : [ 0.0 ... 1.0 ]
Color.from_vec4 = function( v ) {
    function byte( n ) {
        n = round( n * 255 );
        return mid( n, 0, 255 );
    }
    function real( n ) {
        return mid( n, 0.0, 1.0 );
    }
    const r = byte( v[ 0 ] );
    const g = byte( v[ 1 ] );
    const b = byte( v[ 2 ] );
    const a = real( v[ 3 ] );
    return Color.from_rgba( r, g, b, a );
};

// Read Pixel as RGB Color
Color.from_pixel = function( x, y, pixmap ) {
    if (! ( pixmap instanceof ImageData ) ) {
        pixmap = Graphics.pixmap();
    }
    const w = pixmap.width;
    const data = pixmap.data;
    const index = 4 * ( w * y + x );
    const r = data[ 0 + index ];
    const g = data[ 1 + index ];
    const b = data[ 2 + index ];
    return Color.from_rgb( r, g, b );
};

// Read Surface Point as RGB Color
Color.from_dot = function( x, y ) {
    const gfx = Graphics();
    const pixmap = gfx.getImageData( x, y, 1, 1 );
    return Color.from_pixel( 0, 0, pixmap );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* shapes.js */

function RegPoly( center, radius, angle, sides ) {
    if ( sides < 3 ) {
        throw new Error( `Expected a minimum of 3 sides` );
    }
	const points = [];
    angle  = ( angle  || 0 );
    radius = ( radius || 1 );
    const dt = _TAU / sides;
    let t = angle;
    const vert =()=> {
        const x = center.x + radius * cos( t );
        const y = center.y - radius * sin( t );
        return { x, y };
    };
    points.push( vert() );
    for ( let i = 1; i < sides; i += 1 ) {
        t += dt;
	    points.push( vert() );
    }
    return ( points );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PaletteAnalyzer = {};

; ( ( ops ) => {

_RGB =(x,y,z)=> Color.from_rgb(x,y,z);

yAxis = 10;     // X for Y-axis
xAxis = 266;    // Y for X-axis
scale = 256;    // Scaling Factor

ops.read_xform = function() {
    return { yAxis, xAxis, scale };
};

function init_xform( xo, yo, k ) {
    xAxis = yo;
    yAxis = xo;
    scale = k;
    console.debug( { xAxis, yAxis, scale } );
}

ops.init_xform = init_xform;

function red_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.r );
    return vnorm( v );
};

function grn_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.g );
    return vnorm( v );
};

function blu_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.b );
    return vnorm( v );
};

ops.red_norm = red_norm;
ops.grn_norm = grn_norm;
ops.blu_norm = blu_norm;

function plot_vec( v, y=266, yScale=256 ) {
    function cb( index ) {
        return ( v[ index ] || 0 );
    }
    const xo = 10;
    const k  = ( yScale || 256 );
    const yo = ( y || ( k + 10 ) );
    v = ( v || [] );
    inspect( `Vector`, v );
    init_xform( xo, yo, k );
    plot( 0, 1, 256, cb );
    draw_axes_positive( xo, yo, 256, k );
    // draw_axes_negative( xo, yo, 256, k );
}

function plot_red( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = red_norm( colors ).normals;
    Pen( "red" );
    plot_vec( v, y, yScale );
}

function plot_grn( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = grn_norm( colors ).normals;
    Pen( "green" );
    plot_vec( v, y, yScale );
}

function plot_blu( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = blu_norm( colors ).normals;
    Pen( "blue" );
    plot_vec( v, y, yScale );
}

function plot_rgb( colors, yScale=128 ) {
    colors = ( colors || Palette() );
    const k = ( yScale || 128 );
    const h = ( 10 + k );
    Background( "black" );
    plot_red( colors, h * 1, 128 );
    plot_grn( colors, h * 2, 128 );
    plot_blu( colors, h * 3, 128 );
}

function plot_rdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_rdx()` );
}

function plot_gdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_gdx()` );
}

function plot_bdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_bdx()` );
}

function plot_xdx( colors ) {
    colors = ( colors || Palette() );
    incomplete( `plot_xdx()` );
}

function plot( x, dx, count, cb ) {
    const gfx = Graphics();
    Pen.thickness( 1 );
    let u=0;
    while ( count-- > 0 ) {
        const y = cb( x );
        x += dx;
        let p = round( yAxis + u ); u += 1;
        let q = round( xAxis - y * scale );
        gfx.beginPath();
        gfx.moveTo( p, xAxis );
        gfx.lineTo( p, q );
        gfx.stroke();
    }
}

ops.plot = plot;

plot.vec = plot_vec;
plot.red = plot_red;
plot.grn = plot_grn;
plot.blu = plot_blu;
plot.rgb = plot_rgb;
plot.rdx = plot_rdx;
plot.gdx = plot_gdx;
plot.bdx = plot_bdx;
plot.xdx = plot_xdx;

function draw_axes( xo, yo, w, ha, hb ) {
    const gfx = Graphics();
    Pen( "white" );
    Pen.thickness( 2 );
    const ya = yo - ha;
    const yb = yo + hb;
    gfx.beginPath();
    gfx.moveTo( xo     , yo );
    gfx.lineTo( xo + w , yo );
    gfx.stroke();
    gfx.beginPath();
    gfx.moveTo( xo , ya );
    gfx.lineTo( xo , yb );
    gfx.stroke();
}

function draw_axes_positive( xo, yo, w, h ) {
    draw_axes( xo, yo, w, h, 0 )
}

function draw_axes_negative( xo, yo, w, h ) {
    draw_axes( xo, yo, w, 0, h )
}

const _draw = ( ops.draw ) = {};

_draw.axes = draw_axes;
_draw.axes.positive = draw_axes_positive;
_draw.axes.negative = draw_axes_negative;

C_CRIMSON = _RGB( 42, 12, 12 );

function crimson_love() {
   Background( C_CRIMSON );
   draw_axes( 10, 300, 500, 290, 290 );
};

ops.color = { _RGB , C_CRIMSON };

ops.bgnd = {
   crimson : crimson_love
};

} ) ( PaletteAnalyzer );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Xform = {};

Xform.real = function( n, orelse=0 ) {
    n = parseFloat( n );
    if ( isFinite( n ) ) { return n; }
    return ( orelse );
};

Xform.xs = ( 1 );
Xform.ys = ( 1 );
Xform.zs = ( 1 );

Xform.scale = function( xs=1, ys=1, zs=1 ) {
    const ops = Xform;
    const real =( n )=> ( ops.real( n, 1 ) );
    xs = ops.xs = real( xs );
    ys = ops.ys = real( ys );
    zs = ops.zs = real( zs );
    return { xs, ys, zs };
};

Xform.scale.reset = function() {
    return Xform.scale( 1, 1, 1 );
};

Xform.xo = ( 0 );
Xform.yo = ( 0 );
Xform.zo = ( 0 );

Xform.xlate = function( xo=0, yo=0, zo=0 ) {
    const ops = Xform;
    const real =( n )=> ( ops.real( n, 0 ) );
    xo = ops.xo = real( xo );
    yo = ops.yo = real( yo );
    zo = ops.zo = real( zo );
    return { xo, yo, zo };
};

Xform.xlate.reset = function() {
    return Xform.xlate( 0, 0, 0 );
};

Xform.reset = function() {
    const ops = Xform;
    ops.scale.reset();
    ops.xlate.reset();
    return ( ops );
};

Xform.apply = function( vi, vo={} ) {
    const ops = Xform;
    const real =( n )=> ( ops.real( n, 0 ) );
    let x = vi.x;
    let y = vi.y;
    let z = vi.z;
    vo.x = real( ops.xo + x * ops.xs );
    vo.y = real( ops.yo + y * ops.ys );
    vo.z = real( ops.zo + z * ops.zs );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

