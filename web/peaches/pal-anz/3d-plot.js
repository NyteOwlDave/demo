
/*
   3d-plot.js
   3D Plotter Peach
   for Pal-Anz 1.0
*/

srf = Surface();

SW = srf.width;
SH = srf.height;

SLO = min( SW, SH );
SHI = max( SW, SH );

// Surface Size
_W = _H = SLO;

VW = _W / 2;  // Surface Center  X
VH = _H / 4;  // Surface Quarter Y

// Color Helper
_RGB =( r, g, b )=> Color.from_rgb( r, g, b );

// Rendering Engine
gfx = srf.getContext( "2d" );

// Single Pixel
SetPixel = function( x, y, c ) {
   gfx.fillStyle = c;
   gfx.fillRect( x, y, 1, 1 );
};

// Self Dot Product
SelfDot = function( x, y ) {
   return ( x*x + y*y );
};

// Virtual View Size
XMAX = YMAX = 3.9;

// Max Radius Squared
RR = SelfDot( XMAX, YMAX );

// Color Palette
colorHI = _RGB( 242, 242, 142 );
colorLO = _RGB( 182, 182,  84 );
colorBG = _RGB(   2,   2,  22 );

// Render Frame
render = function( cb ) {
  Background( colorBG );
  let c;
  // Horizontal Virtual Sweep
  for ( i = -VW; i <= VW; i += 1 ) {
    let m =  0;       // Furthest Virtual Z
    let n = _H;       // Nearest  Virtual Z
    // Screen X Coord
    let xe = _W * ( 1 + i / VW ) / 2;
    // Vertical Virtual Sweep
    for ( j = -VH; j <= VH; j += 1 ) {
      // Virtual Space X, Y Coords
      let x = -( XMAX * i / VW ) - ( XMAX * j / VH );
      let y =  ( YMAX * i / VW ) - ( YMAX * j / VH );
	  // Virtual Radius
      let k = x * x + y * y;
      // Bounds Check
      if ( k > RR ) { continue; }
      // Virtual Space Z Coord
      let z = ( _H / 2 - j ) - cb( x, y );
      if ( z < n ) {
         c = colorHI;
         n = z;
      } else {
         c = colorLO;
      }
      if ( z > m ) { m = z; }
      if ( ( z >= 0 ) && ( z <= _H ) ) {
        SetPixel( xe, z, c );
      }
    } // next j
  } // next i
}

gf = function( x, y ) {
  return ( 5 * x * sin( 5 * y ) );
}

func = [];

func[ 0 ] = function( x, y ) {
  return 10 * SelfDot( x, y ) - _H/3;
};

func[ 1 ] = function( x, y ) {
  // const zz =  SelfDot( x, y );
  return ( 10 * sin( 4 * x ) * y );
};

func[ 2 ] = function( x, y ) {
  const zz =  SelfDot( x, y );
  return ( 190 * cos( zz ) * exp( -zz / 6 ) );
};

func[ 3 ] = function( x, y ) {
  const zz =  SelfDot( x, y );
  return ( ( y * y ) / ( x * x + 0.0005 ) );
};

func[ 4 ] = function( x, y ) {
  const zz =  SelfDot( x, y );
  return ( 10 * sin( x * ( y + 1 ) ) * y );
};

func[ 5 ] = function( x, y ) {
  const zz =  SelfDot( x, y );
  return ( 100 - 400 / exp( zz ) );
};

func[ 6 ] = function( x, y ) {
  const zz =  SelfDot( x, y );
  return ( 
      ( 80 * cos( 2 * y ) )
    / ( zz + 0.001 ) - 100 
  );
};

func[ 7 ] = function( x, y ) {
  // const zz =  SelfDot( x, y );
  return gf( x, y )
};

test_01 = function( n ) {
   const fn = func[ n ];
   if ( fn ) { render( fn ); }
}

;
; ( op = 0 )
; ( op < 8 ) ? test_01( op )
: alert( "OK!" )
;

