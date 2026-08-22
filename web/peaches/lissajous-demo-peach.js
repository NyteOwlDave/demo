
// lissajous-demo-peach.md

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

function setup() {
   Xform.scale( 2, -2, 1 );
   Background( "black" );
   Pen( "gold" );
}

function render( erase=true ) {
   const pt={};
   let A=0, t=0;
   let inc = 2000;
   if ( erase ) { Background(); }
   while ( --inc > 0 ) {
     pt.x = sin( 2*t )*cos( A ) - cos( 3*t )*sin( A );
     pt.y = sin( 2*t )*sin( A ) + cos( 3*t )*cos( A );
     Xform.apply( pt, pt );
     Pen.dot( pt.x, pt.y );
     t = t + 1;
     A = A + 0.5;
   }
};

;
; ( 0 ) && setup()
; ( 0 ) && render()
;
; console.log( "OK!" )
;


