<head>
  <link rel="icon" href="favicon.ico" />
</head>

<style>
@import url("http://dave-tower/app/jarvis/style/every-page.css");
</style>

<style>
html { text-align : center; }
html, body, canvas {
    box-sizing : border-box;
    border  : none;
    margin  : 0;
    padding : 0;
}
body {
    margin-bottom : 42vh;
}
canvas {
    z-index : 500;
}
fieldset {
    margin-left  : 10px;
    margin-right : 10px;
}
</style>

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; prolog = {}
; prolog . title = ( `VB Turtle Demo #001` )
</script>

<script>
; cls =()=> console.clear()
; agn =()=> location.reload()
</script>

<script>
; doc = document
; doc . title = ( prolog . title )
</script>

<script src="http://dave-tower/app/norma/api/prolog-charlie.js"></script>
<script src="http://dave-omega/chachi/api/karlita-editor.js"></script>
<script src="http://dave-omega/chachi/api/karlita-extender.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

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
    if ( blurt.muted ) { return; }
    console.log( s );
}
; blurt.muted = ( true )
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
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
    ops.Surface = canvas;
    ops.Size( 500, 500 );
    ops.Graphics = ( gfx = canvas.getContext( "2d" ) );
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

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

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

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

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

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
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

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
js_source = ( `
// JavaScript code By NyteOwl Dave
GW = GraphicsWindow;
GW.Background( Colors.RGB( 182, 182, 255 ) );
Turtle.X = GW.Width / 2;
Turtle.Y = GW.Height / 2 - 30;
for ( let N = 1; N <= 110; N += 1 ) {
    Turtle.PenUp()
    Turtle.Move(N * 0.84)
    Turtle.Turn(360 / 20)
    Turtle.PenDown()
    Turtle.CreateFigure()
    for ( let M = 1; M <= 6; M += 1 ) {
        Turtle.Move(N / 4)
        Turtle.Turn(360 / 6)
    }
    GW.BrushColor( Colors.Random() )
    Turtle.FillFigure()
}
` );
</script>

----------------------------------------------------------------

<div center>
  <img src="./turtle.png" title="Turtle Graphics Demo" onclick="run(event)"/>
</div>

----------------------------------------------------------------

<fieldset>
<legend> Editor </legend>
<section id="editor_section" center>
 <textarea id="sce" class="siox" wrap="off"></textarea>
</section>
</fieldset>

----------------------------------------------------------------

<script>
function init_surface() {
    GW = GraphicsWindow;
    GW.Background( "gold" );
    GW.Surface.onclick = function( e ) {
        if ( GW.Width === 500 ) {
            GW.Zoom();
        } else {
            GW.Size( 500, 500, true );
        }
        GW.Background( "gold" );
    };
}
</script>

<script>
function main( event ) {
    try {
        init_surface();
        if ( "function" === typeof init_editor ) {
            init_editor( sce );
            sce.title =
            sce.store_key =
            sce.storekey = ( main.storekey );
        }
    } catch( e ) {
        crashed( e );
    }
}
main.storekey = ( `vb-turtle-demo-001.json` );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

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


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function scan_gw_keys() {
    RS = "\n";
    alert ( Object.keys( GW ).sort().join( RS ) );
}
</script>

<script>
function run( event ) {
    try {
        if ( event.ctrlKey ) {
            dot.home();
        } else if ( event.altKey ) {
            if ( event.shiftKey ) {
                sce.value = vb_source;
            } else {
                sce.value = js_source;
            }
        } else {
            if ( event.shiftKey ) {
                exec( sce.value );
            } else {
                exec( js_source );
            }
        }
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

<script>
function dot( filename ) {
    try {
        const p = ( dot.provider );
        const s = ( dot.splitter );
        const k = ( str( filename ) || ( "rockets.php" ) );
        const u = ( [ p, s, k, ] . join( "/" ) );
        dot.visit( u );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script>
dot.retext   = ( null === localStorage );
dot.provider = ( `http://dave-omega` );
dot.splitter = ( `ramdrive/dot` );
dot.options  = ( `left=10,top=10,width=800,height=680` );
dot.address  = ( `http://dave-omega/demo/vb/turtle-001.html` );
</script>

<script>
dot.visit = function( url ) {
    if ( dot.retext ) {
        dot.click( url );
    } else {
        dot.popup( url );
    }
};
</script>

<script>
dot.click = function( url ) {
    try {
        const d = document;
        const a = d.createElement( "A" );
        a . href = ( url );
        a . click();
    } catch ( e ) {
        crashed ( e );
    }
};
</script>

<script>
dot.popup = function( url ) {
    try {
        // throw new Error( "OOOOPS!!!" );
        window.open( url, url, dot.options );
    } catch ( e ) {
        crashed ( e );
    }
};
</script>

<script>
dot.home = function() {
    try {
        dot.visit( dot.address );
    } catch ( e ) {
        crashed ( e );
    }
};
</script>


