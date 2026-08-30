
PEACH_KEY = ( `garcia-002.js` );
PRIMARY_HOST = ( `dave-tower` );

rgb =( r, g, b )=> Color.from_rgb( r, g, b );
int =( n )=> Math.round( m );
pnt =( x, y )=> ( { x, y } );

xform =( xc, yc, scale )=> {
    xform.xc    = xc;
    xform.yc    = yc;
    xform.scale = scale;
};

xform.apply = function( pts ) {
  function apply( pt ) {
    const o = xform;
    const x = o.xc + pt.x * o.scale;
    const y = o.yc - pt.y * o.scale;
    return pnt( x, y );
  }
  return pts.map( apply );
};

bezier =( pts )=> {
   gfx.beginPath()
   gfx.moveTo( pts[ 0 ].x, pts[ 0 ].y );
   gfx.bezierCurveTo(
      pts[ 1 ].x, pts[ 1 ].y,
      pts[ 2 ].x, pts[ 2 ].y,
      pts[ 3 ].x, pts[ 3 ].y
   );
   gfx.closePath()
   gfx.stroke();
};

k0 = 1;
kn = 2646.744302;
ki = 0.739129388;
pi = Math.PI;

r = g = b = 0;

x1k = y1k = x2k = y2k = 0;

p = [];

xform( 5.5, 9.82716, 0.09488 );

for ( let k = k0; k < kn; k += ki ) {

x1k = ( -2179        * cos( 0.9999 * k ) / pi )
    + ( -587.752974  * cos( 0.9999 * k )      )
    + ( -5.564929291 * sin( 0.3333 * k )      );

y1k = ( sin( 0.3333 * k ) / pi            )
    - ( -2500.0 * sin( 0.6666 * k )       )
    + ( -2500.0 * cos( 0.6666 * k ) / pi  );

x2k = ( -2179.50995  * cos(0.9999 * k ) / pi )
    + ( -5.564929291 * cos(0.9999 * k ) )
    + ( -2179.50995  * sin(0.3333 * k ) ); 

y2k = ( sin(0.3333 * ) / pi                  )
    - ( -3690.7116488281 * sin( 0.6666 * k ) )
    + ( -4577.45827 * cos(0.6666 * k ) / pi  );

Pen.thickness (
	 ( 8.58864 )
   + ( abs(y2k) - abs(trunc(y2k)) ) 
   / ( abs(x2k) - abs(trunc(x2k)) )
   / 10
);

r = int( 
   ( 158.80142  )
 + ( abs( y2k ) ) - abs( trunc(y2k) ) )
     * ( 100 )
     * ( abs( ( x1k+x2k ) / 2 ) 
         - abs(trunc( (x1k +y1k)/2) )
     )
) % 225;

g = int( 
   ( 191.584643  )
 + ( abs( y2k ) ) - abs( trunc(y2k) ) )
     * ( 100 )
     * ( abs( y2k )-abs( trunc( y2k ) ) )
) % 225;

b =int( 
   ( 208.12137  )
 + ( abs( y2k ) ) - abs( trunc(y2k) ) )
     * ( 100 )
     * ( abs( x2k ) - abs( trunc( x2k ) ) )
) % 225;

c = rgb( r, g, b )

Pen( c );

p[ 0 ] = _point( x1k, y1k );
p[ 3 ] = _point( x2k, y2k );
p[ 1 ] = _point( x2k, y1k );
p[ 2 ] = _point( x2k, y1k );

p = xform.apply( p );

bezier( p );

}


function setup() {
   Background();
   // ...
}

function render() {
   // ...
}

;
; ( 0 ) && hud.persist()
; ( 1 ) && setup()
; ( 0 ) && render()
;

"OK!";


