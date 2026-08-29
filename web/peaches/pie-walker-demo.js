
/*
Name : Pi and E Walker
Host : Omega
Date : 2026-APR-27
App : http://dave-tower/demo/web/lissajous/lissajous.html
File : http://dave-omega/demo/web/peaches/pie-walker-demo.js
Repo : https://outlook.live.com/mail/0/notes
Idea : https://www.facebook.com/reel/2306574050093481
TiGG : https://nyteowldave.github.io/tigg/tigg.html
TKey : 4b9453da-762e-4c84-b106-bee06e25b74d
*/

PEACH_KEY = ( `pie-walker-demo.js` );
PEACH_URL = ( `http://dave-omega/demo/web/peaches/pie-walker-demo.js` );

function setup() {
    Background( "gold" );
    // ...
}

// Angle from Integer [ 0 ... 9 ]
_ang =( i )=> {
    i = i / 10;
    const theta = ( ( i * _TAU ) + _TAU / 4 );
    console.log( "Angle", { i, theta } );
    return ( theta );
};

// New Point
_pnt =( x, y )=> {
    x = round( x );
    y = round( y );
    return { x, y, value : [] };
};

// Project Ray
_prj =( o, r, t )=> {
    const x = o.x + r * cos( t );
    const y = o.y + r * sin( t );
    return _pnt( x, y );
};

// Draw Line Segment
_seg =( p0, p1 )=> {
    Pen.lineseg( p0, p1, "black" );
};

// Draw Point
_dot =( pt )=>{
    Pen.dot( pt.x, pt.y, "black" );
};

// Encode Real as Text
// Remove Decimal Point
_enc =( n )=> (
    String( n )
    . replace( ".", "" )
    . split( "" )
);

// Increment Point using Next Digit for Angle
_inc =( pt )=>{
    if (! pt.value ) { pt.value = []; }
    let digit;
    if ( pt.value.length < 1 ) {
        digit = parseInt( pt.value.shift() || 0 );
    } else {
        digit = floor( Math.random() * 10 );
    }
    let r = 3;
    let t = _ang( digit );
    let x = r * cos( t );
    let y = r * sin( t );
    pt.x = ceil( pt.x + x );
    pt.y = ceil( pt.y + y );
};

// Render Frame
function render() {
    let m = metrix();
    Pen.thickness( 5 );
    let t, r = m.w * 0.1;
    let p0 = _pnt( m.cx, m.cy );
    // Render Compass Lines
    for ( let i = 0; i < 10; i += 1 ) {
        t = _ang( i );
        p1 = _prj( p0, r, t );
        _seg( p0, p1 );
    }
    // Prepare PI Walker
    let pa = _pnt( m.cx, m.cy / 2 );
    pa.value = _enc( _PI );
    // Prepare E Walker
    let pb = _pnt( m.cx, (m.cy / 2) * 3 );
    pb.value = _enc( _E );
    // Walk/Draw Both Walkers
    for ( let i=1; i<=100; i+=1 ) {
        _dot( pa ); _inc( pa );
        _dot( pb ); _inc( pb );
        // blurt_sample( pa ); _inc( pa );
    }
}

// Get Surface Metrics
function metrix() {
    let srf = Surface();
    let w = srf.width;
    let h = srf.height;
    let cx = w / 2;
    let cy = h / 2;
    return { srf, w, h, cx, cy };
};

function blurt_sample( pt, title ) {
    title = ( title || "Sample Point" );
    const x = pt.x;
    const y = pt.y;
    const digit = ( pt.value[0] || "0" );
    const o = { x, y, digit };
    console.log( title, o );
};

;
; ( 1 ) && hud.persist( PEACH_KEY )
; ( 1 ) && setup()
; ( 0 ) && render()
;
; "OK!"
;

