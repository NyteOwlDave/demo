
/* vec.js */


// Vector 2D class
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Singleton vector math object
const Vec = {};

// Constants
Vec.TINY = 1e-8;
Vec.HUGE = 1e+8;
Vec.D2R = Math.PI / 180;
Vec.R2D = 180 / Math.PI;

Vec.deg2rad = function( n ) {
    return ( n * Vec.D2R );
};

Vec.rad2deg = function( n ) {
    return ( n * Vec.R2D );
};

Vec.mid = function( a, b, c ) {
    return (
        ( a <= b )
      ? ( ( b <= c ) ? b : Math.max( a, c ) )
      : ( ( a <= c ) ? a : Math.max( b, c ) )
    );
};

// Copy a -> b
Vec.Copy = function( a, b ) {
    b[ 0 ] = a[ 0 ];
    b[ 1 ] = a[ 1 ];
    b[ 2 ] = a[ 2 ];
};

// Dot product
Vec.Dot = function( a, b ) {
    return (
        a[ 0 ] * b[ 0 ]
      + a[ 1 ] * b[ 1 ]
      + a[ 2 ] * b[ 2 ]
    );
};

// Vector length squared
Vec.LenSqr = function( a ) {
    return Vec.Dot( a, a );
};

// Left handed cross product
Vec.Cross = function( a, b, c ) {
    c[ 0 ] = a[ 1 ]*b[ 2 ] - a[ 2 ]*b[ 1 ];
    c[ 1 ] = a[ 2 ]*b[ 0 ] - a[ 0 ]*b[ 2 ];
    c[ 2 ] = a[ 0 ]*b[ 1 ] - a[ 1 ]*b[ 0 ];
};

// Compute normal vector
Vec.Normal = function( a, b ) {
    let len = Vec.LenSqr( a );
    if ( len > Vec.TINY ) {
        len = Math.sqrt(len);
        const t = 1 / len;
        b[ 0 ] = t * a[ 0 ];
        b[ 1 ] = t * a[ 1 ];
        b[ 2 ] = t * a[ 2 ];
    }
    else {
           len = b[ 0 ] = 1.0;
        b[ 1 ] = b[ 2 ] = 0.0;
    }
    return ( len );
};

// Normalize vector
Vec.Normalize = function( v ) {
    return Vec.Normal( v, v );
};

// A*a -> b
Vec.S = function( A, a, b ) {
    b[ 0 ] = A * a[ 0 ];
    b[ 1 ] = A * a[ 1 ];
    b[ 2 ] = A * a[ 2 ];
};

// Elementwise add
Vec.Add = function( a, b, c ) {
    c[ 0 ] = a[ 0 ] + b[ 0 ];
    c[ 1 ] = a[ 1 ] + b[ 1 ];
    c[ 2 ] = a[ 2 ] + b[ 2 ];
};

// Elementwise subtract
Vec.Sub = function( a, b, c ) {
    c[ 0 ] = a[ 0 ] - b[ 0 ];
    c[ 1 ] = a[ 1 ] - b[ 1 ];
    c[ 2 ] = a[ 2 ] - b[ 2 ];
};

