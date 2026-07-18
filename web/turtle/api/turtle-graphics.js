
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

GraphicsWindow = {};

( ops => {

const id = "canvas";

doc = document;
boo = ( doc . body );

canvas = doc.getElementById( id );

ops.Size = function( w, h, unzoom ) {
    if ( unzoom ) {
        canvas.style.width  = "";
        canvas.style.height = "";
    };
    ops.Width  = ( canvas.width  = w );
    ops.Height = ( canvas.height = h );
    blurt( `Surface Size : ${w} x ${h}` );
};

if (! canvas ) {
    canvas = doc.createElement( "canvas" );
    canvas.id = id;
    boo.appendChild( canvas );
}

ops.Surface = canvas;
ops.Graphics = ( gfx = canvas.getContext( "2d" ) );

if (! ops.Width ) {
    ops.Size( 500, 500 );
}

ops.Zoom = function() {
    canvas.style.width  = "100vw";
    canvas.style.height = "100vh";
    const rc = canvas.getBoundingClientRect();
    ops.Size( rc.width, rc.height );
};

ops.FullScreen = function() {
    canvas.requestFullscreen();
};

ops.Background = function( style ) {
    const w = ops.Width;
    const h = ops.Height;
    ops.BrushColor( style );
    gfx.fillRect( 0, 0, w, h );
};

ops.BrushColor = function( style ) {
    gfx.fillStyle = ( style || gfx.fillStyle );
};

ops.PenColor = function( style ) {
    gfx.lineStyle = ( style || gfx.lineStyle );
};

ops.PenSize = function( w ) {
    gfx.lineWidth = ( w || gfx.lineWidth );
};

} ) ( GraphicsWindow );


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

Colors = {};

( ops => {

ops.Random = function() {
    const r = ops.IRnd( 255 );
    const g = ops.IRnd( 255 );
    const b = ops.IRnd( 255 );
    const c = ops.RGB( r, g, b );
    blurt( `Random Color : ${c}`);
    return ( c );
};

ops.IRnd = function( n ) {
    n = Math.trunc( n );
    const k = Math.random() * n;
    return Math.round( k );
};

ops.RGB = function( r, g, b ) {
    return ( `rgb(${r},${g},${b})` );
};

ops.RGBA = function( r, g, b, a ) {
    return ( `rgba(${r},${g},${b},${a})` );
};

} ) ( Colors );


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

Vector2 = {};

( ops => {

const PI = Math.PI;

const D2R = ( ops.D2R = PI/180 );
const R2D = ( ops.R2D = 180/PI );

blurt( `PI  : ${PI}`  );
blurt( `R2D : ${R2D}` );
blurt( `D2R : ${D2R}` );

ops.Rad = function( deg=0 ) {
    return ( deg * D2R );
};

ops.Deg = function( rad=0 ) {
    return ( rad * R2D );
};

ops.Dot = function( a=0, b=0, c=0, d=0 ) {
    return ( a * c + b * d );
};

ops.PerpDot = function( a=0, b=0, c=0, d=0 ) {
    return ( a * d - b * c );
};

ops.SelfDot = function( x=0, y=0 ) {
    return ( x * x + y * y );
}

ops.Coords = function( x=0, y=0 ) {
    return { x, y };
};

ops.Polar = function( x=0, y=0 ) {
    const r = Math.hypot( y, x );
    const t = Math.atan2( y, x );
    return { r, t };
};

ops.Euler = function( r=0, t=0 ) {
    const x = r * Math.cos( t );
    const y = r * Math.sin( t );
    return { x, y };
};

ops.Normal = function( coords={} ) {
    let x, y;
    if ( coords ) {
        x = ( coords.x || 0 );
        y = ( coords.y || 0  );
    } else {
        x = ( ops.X || 0  );
        y = ( ops.Y || 0  );
    }
    let k = ops.SelfDot( x, y );
    if ( k < 1e-20 ) {
        return ops.Coords( 1, 0 );
    } else {
        k = 1 / Math.sqrt( k );
        return ops.Coords( k * x, k * y );
    }
};

} ) ( Vector2 );


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

Turtle = {};

( ops => {

const GW = ( ops.window = GraphicsWindow );

ops.decal = ( `🐢` );

ops.Surface  = GW.Surface;
ops.Graphics = GW.Graphics;

ops.Drawing = ( false );

ops.Angle = 0;

ops.X = 0;
ops.Y = 0;

ops.Vertices = [];

ops.inspect = function() {
    const jsx =( o )=> JSON.stringify( o );
    const _a = [ "Angle", ops.Angle ];
    const _x = [ "X", ops.X ];
    const _y = [ "Y", ops.Y ];
    const _v = [ "Vertices", jsx( ops.Vertices ) ];
    const _t = [ _a, _x, _y, _v ];
    const c = console;
    c.groupCollapsed( "Turtle 🐢 State" );
    c.table( _t );
    c.groupEnd();
};

ops.Position = function() {
    return Vector2.Coords( ops.X, ops.Y );
};

ops.PenUp = function() {
    ops.Drawing = false;
};

ops.PenDown = function() {
    ops.Drawing = true;
};

ops.Move = function( dist ) {
    if ( dist ) {
        const gfx = ops.Graphics;
        let x = ops.X;
        let y = ops.Y;
        if ( (! ops.Drawing ) && ( ops.Vertices.length < 1 ) ) {
            gfx.moveTo( x, y );
        } else {
            gfx.lineTo( x, y );
        }
        ops.Vertices.push( { x, y } );
        const t = Vector2.Rad( ops.Angle );
        const r = ( dist );
        x = ( ops.X  += ( r * Math.cos( t ) ) );
        y = ( ops.Y  += ( r * Math.sin( t ) ) );
        blurt( `New Position : ( ${x} , ${y} )` );
    }
    return ops.Position();
};

ops.Turn = function( deg ) {
    const gfx = ops.Graphics;
    if ( deg ) {
        ops.Angle += deg;
        blurt( `New Angle : ${ops.Angle}°` ); // U+00B0 = deg
    }
    return ( ops.Angle );
};

ops.CreateFigure = function() {
    const gfx = ops.Graphics;
    gfx.beginPath();
    ops.Vertices = [];
    blurt( `Starting Figure ...` );
};

ops.FillFigure = function() {
    const gfx = ops.Graphics;
    gfx.closePath();
    gfx.fill();
    blurt( `Painting Figure Interior` );
}

ops.OutlineFigure = function() {
    const gfx = ops.Graphics;
    gfx.closePath();
    gfx.stroke();
    blurt( `Drawing Figure Outline` );
}

} ) ( Turtle );

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


;
; console.info( `Loaded "turtle-graphics.js" API Module` )
;
