
PEACH_KEY = ( `garcia-002.js` );
PRIMARY_HOST = ( `dave-tower` );
RECENT_HOST  = ( `dave-omega` );

midpt =( a, b )=> abs( ( a + b ) / 2 );

frac =( n )=> ( abs( n ) - abs( trunc( n ) ) );

int =( n )=> Math.round( n );

pnt =( x, y )=> ( { x, y } );

rgb =( r, g, b )=> (
    Color.from_rgb( 
        int( r ) % 225 , 
        int( g ) % 225 , 
        int( b ) % 225 
    ) 
);

xform =( xc, yc, scale, aspect )=> {
    xform.xc     = xc;
    xform.yc     = yc;
    xform.scale  = scale;
    xform.aspect = aspect;
};

xform.apply = function( pts ) {
    function apply( pt ) {
        const m = xform;
        const x = m.xc + pt.x * m.scale * m.aspect;
        const y = m.yc + pt.y * m.scale;
        return pnt( x, y );
    }
    return pts.map( apply );
};

gfx = Graphics();

bezier =( pts )=> {
    gfx . beginPath()
    gfx . moveTo( pts[ 0 ].x, pts[ 0 ].y );
    gfx . bezierCurveTo(
        pts[ 1 ].x, pts[ 1 ].y,
        pts[ 2 ].x, pts[ 2 ].y,
        pts[ 3 ].x, pts[ 3 ].y
    );
    gfx . closePath()
    gfx . stroke();
};

function render() {

k0 = 1;
kn = 2646.744302;
ki = 0.739129388;
pi = Math.PI;

r = g = b = 0;

x1k = y1k = x2k = y2k = 0;

p = [];

xform( 300, 300, 0.045, 2 );

rho = []; theta = []; ck = [];

rho[ 0 ] = ( -2179.50995  );
rho[ 1 ] = ( -587.752974  );
rho[ 2 ] = ( -5.564929291 );

rho[ 3 ] = ( 1.0     );
rho[ 4 ] = ( -2500.0 );
rho[ 5 ] = ( -2500.0 );

rho[ 6 ] = ( -2179.50995   );
rho[ 7 ] = (  -5.564929291 );
rho[ 8 ] = ( -2179.50995   );

rho[  9 ] = ( 1.0              );
rho[ 10 ] = ( -3690.7116488281 );
rho[ 11 ] = ( -4577.45827      );

ck[ 0 ] = ( 158.80142  );
ck[ 1 ] = ( 191.584643 );
ck[ 2 ] = ( 208.12137  );

for ( let k = k0; k < kn; k += ki ) {

theta[ 0 ] = 0.9999 * k;
theta[ 1 ] = 0.6666 * k;
theta[ 2 ] = 0.3333 * k;

x1k = (
  ( rho[ 0 ] ) * ( cos( theta[ 0 ] ) / pi ) 
+ ( rho[ 1 ] ) * ( cos( theta[ 0 ] )      )
+ ( rho[ 2 ] ) * ( sin( theta[ 2 ] )      ) 
);

y1k = ( 
  ( rho[ 3 ] ) * ( sin( theta[ 2 ] ) / pi ) 
- ( rho[ 4 ] ) * ( sin( theta[ 1 ] )      )
+ ( rho[ 5 ] ) * ( cos( theta[ 1 ] ) / pi ) 
);

x2k = (
  ( rho[ 6 ] ) * ( cos( theta[ 0 ] ) / pi ) 
+ ( rho[ 7 ] ) * ( cos( theta[ 0 ] )      )
+ ( rho[ 8 ] ) * ( sin( theta[ 2 ] )      ) 
);

y2k = (
  ( rho[  9 ] ) * ( sin( theta[ 2 ] ) / pi ) 
- ( rho[ 10 ] ) * ( sin( theta[ 1 ] )      )
+ ( rho[ 11 ] ) * ( cos( theta[ 1 ] ) / pi ) 
);

Pen.thickness (
	 ( 8.58864 )
   + ( abs( y2k ) - abs( trunc( y2k ) ) ) 
   / ( abs( x2k ) - abs( trunc( x2k ) ) )
   / 10
);

fx2k = frac( x2k );
fy2k = frac( y2k );
py2k = 100 * fy2k;

mx1y2 = midpt( x1k, y2k );
fx1y2 = abs( trunc( mx1y2 ) );

r = ( ck[ 0 ] ) + ( py2k )  * ( mx1y2 - fx1y2 );
g = ( ck[ 1 ] ) + ( py2k )  * ( fy2k ) ;
b = ( ck[ 2 ] ) + ( py2k )  * ( fx2k ) ;

Pen( rgb( r, g, b ) );

p[ 0 ] = pnt( x1k, y1k );
p[ 3 ] = pnt( x2k, y2k );
p[ 1 ] = pnt( x2k, y1k );
p[ 2 ] = pnt( x2k, y1k );

p = xform.apply( p );

bezier( p );

} // for loop

} // render


function setup() {
   Background( "#010050" );
   // ...
}

;
; ( 0 ) && hud.persist()
; ( 1 ) && setup()
; ( 1 ) && render()
;

"OK!";


