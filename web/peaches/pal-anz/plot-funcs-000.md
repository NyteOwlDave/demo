
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

