<style>
html,body,canvas {
    box-sizing : border-box;
    border  : none;
    margin  : 0;
    padding : 0;
}
</style>

<script>
vb_source = ( `
' Small Visual Basic code By M. Hamdy
GW.FullScreen = True
Turtle.Speed = 50
Turtle.UseAnimation = False
Turtle.X = GW.Width / 2
Turtle.Y = GW.Height / 2 - 30
For N = 1 To 100
   Turtle.PenUp()
   Turtle.Move(N * 1.1)
   Turtle.Turn(360 / 20)
   Turtle.PenDown()
   Turtle.CreateFigure()
   For M = 1 To 6
      Turtle.Move(N / 3)
      Turtle.Turn(360 / 6)
   Next
   GW.BrushColor = Colors.Random
   Turtle.FillFigure()
Next
` );
</script>

<script>
function blurt( s ) {
    console.log( s );
}
</script>

<script>
GraphicsWindow = {};

( ops => {

const id = "canvas";

doc = document;
boo = ( doc . body );

canvas = doc.getElementById( id );

ops.Size = function( w, h ) {
    ops.Width  = ( canvas.width  = w );
    ops.Height = ( canvas.height = h );
    blurt( `Surface Size : ${w} x ${h}` );
};

if (! canvas ) {
    canvas = doc.createElement( "canvas" );
    canvas.id = id;
    boo.appendChild( canvas );
    ops.surface = canvas;
    ops.Size( 500, 500 );
    ops.graphics = ( gfx = canvas.getContext( "2d" ) );
} else {
    ops.Size( canvas.width, canvas.height );
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

</script>

<script>

Colors = {};

( ops => {

ops.Random = function() {
    const r = ops.irnd( 255 );
    const g = ops.irnd( 255 );
    const b = ops.irnd( 255 );
    const c = ops.rgb( r, g, b );
    blurt( `Random Color : ${c}`);
    return ( c );
};

ops.irnd = function( n ) {
    n = Math.trunc( n );
    const k = Math.random() * n;
    return Math.round( k );
};

ops.rgb = function( r, g, b ) {
    return ( `rgb(${r},${g},${b})` );
};

ops.rgba = function( r, g, b, a ) {
    return ( `rgba(${r},${g},${b},${a})` );
};

} ) ( Colors );

</script>

<script>

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

</script>

<script>
Turtle = {};

( ops => {

const GW = ( ops.window = GraphicsWindow );

ops.decal = ( `🐢` );

ops.surface  = GW.surface;
ops.graphics = GW.graphics;

ops.Angle = 0;

ops.X = 0;
ops.Y = 0;

ops.inspect = function() {
    const _a = [ "Angle", ops.Angle ];
    const _x = [ "X", ops.X ];
    const _y = [ "Y", ops.Y ];
    const _t = [ _a, _x, _y ];
    const c = console;
    c.groupCollapsed( "Turtle 🐢 State" );
    c.table( _t );
    c.groupEnd();
};

ops.Position = function() {
    return Vector2.Coords( ops.X, ops.Y );
};

ops.PenUp = function() {
    const gfx = ops.graphics;
    gfx.lineTo( ops.X, ops.Y );
};

ops.PenDown = function() {
    const gfx = ops.graphics;
    gfx.moveTo( ops.X, ops.Y );
};

ops.Move = function( dist ) {
    let x, y;
    if ( dist ) {
        const gfx = ops.graphics;
        const t = Vector2.Rad( ops.Angle );
        const r = ( dist );
        x = ( ops.X  += ( r * Math.cos( t ) ) );
        y = ( ops.Y  += ( r * Math.sin( t ) ) );
        blurt( `New Position : ( ${x} , ${y} )` );
    }
    return ops.Position();
};

ops.Turn = function( deg ) {
    const gfx = ops.graphics;
    if ( deg ) {
        ops.Angle += deg;
        blurt( `New Angle : ${ops.Angle}°` ); // U+00B0 = deg
    }
    return ( ops.Angle );
};

ops.CreateFigure = function() {
    const gfx = ops.graphics;
    gfx.beginPath();
};

ops.FillFigure = function() {
    const gfx = ops.graphics;
    gfx.closePath();
    gfx.stroke();
}

ops.OutlineFigure = function() {
    const gfx = ops.graphics;
    gfx.closePath();
    gfx.fill();
}

} ) ( Turtle );

</script>

<script>
js_source = ( `
// JavaScript code By NyteOwl Dave
GW = GraphicsWindow;
GW.Background( "mintcream" );
Turtle.X = GW.Width / 2;
Turtle.Y = GW.Height / 2 - 30;
for ( N = 1; N <= 100; N += 1 ) {
    Turtle.PenUp()
    Turtle.Move(N * 1.1)
    Turtle.Turn(360 / 20)
    Turtle.PenDown()
    Turtle.CreateFigure()
    For M = 1 To 6
        Turtle.Move(N / 3)
        Turtle.Turn(360 / 6)
    Next
    GW.BrushColor( Colors.Random() )
    Turtle.FillFigure()
}
` );
</script>

<script>
function main( event ) {
    try {
        GW = GraphicsWindow;
        GW.Background( "gold" );
    } catch( e ) {
        crashed( e );
    }
}
</script>

<script>
addEventListener( "load", main );
</script>

<script>
function crashed( e, mt, silent  ) {
    if (! silent ) {
        console.error( e );
    }
    if (! crashed.mute ) {
        window.alert( e );
    }
    if ( mt ) { throw ( e ); }
    return ( e );
}
crashed.mute = false;
</script>

<style>
@import url("http://dave-tower/app/jarvis/style/every-page.css");
html { text-align : center; }
canvas {
    z-index : 500;
}
</style>

<div center>
  <img src="./turtle.png" title="Turtle Graphics Demo" onclick="run(event)"/>
</div>

<script>
function scan_gw_keys() {
    RS = "\n";
    alert ( Object.keys( GW ).sort().join( RS ) );
}
</script>

<script>
function run( event ) {
    try {
        GW = GraphicsWindow;
        GW.Zoom();
        exec( js_source );
    } catch( e ) {
        crashed( e );
    }
}
</script>

<script>
function perform( event ) {
    const str =( s )=> ( String( s || "" ).trim() );
    try {
        let js;
        const ge = event.target;
        switch ( ge.nodeName ) {
        case "INPUT" : case "TEXTAREA" :
            js = ge.value;
            break;
        case "CODE" : case "PRE" :
            js = ge.innerText;
            break;
        default :
            throw new TypeError( `Wrong gadget type` );
        }
        if (! str( js ) ) { return; };
        exec( js );
    } catch( e ) {
        crashed( e );
    }
}
</script>

<script>
function exec( js ) {
    const str =( s )=> ( String( s || "" ).trim() );
    try {
        const cmd = str( js );
        if (! cmd ) { return; }
        if ( macro( cmd ) ) { return; }
        exec . prior = String( exec . input || "" );
        exec . input = String( js );
        exec . error = ( "" );
        exec . output = window.eval( exec . input );
        return ( exec . output );
    } catch( e ) {
        console . error( e );
        exec . error = ( e.message );
        exec . output =  ( "" );
        return ( e );
    }
}
</script>

<script>
function macro( cmd ) {
    const str =( s )=> ( String( s || "" ).trim() );
    try {
        console.warn( "Macro interpreter is incomplete" );
    } catch( e ) {
        crashed( e );
    }
    return false;
}
</script>


