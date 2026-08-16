
/* mtx.js */


// Global 4x4 Matrix object
Mtx = {};

// Return empty matrix
Mtx.zero = function() {
    return [
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ],
      [ 0, 0, 0, 0 ]
    ];
};

// Return identity matrix
Mtx.identity = function() {
    return [
      [ 1, 0, 0, 0 ],
      [ 0, 1, 0, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 1 ]
    ];
};

// Return x,y,z translate matrix
Mtx.translate = function( tx, ty, tz ) {
    return [
      [ 1, 0, 0, tx ],
      [ 0, 1, 0, ty ],
      [ 0, 0, 1, tz ],
      [ 0, 0, 0,  1 ]
    ];
};

// Return x rotate matrix
Mtx.rotateX = function( angle ) {
    const c = Math.cos( angle );
    const s = Math.sin( angle );
    return [
      [ 1, 0, 0, 0 ],
      [ 0, c,-s, 0 ],
      [ 0, s, c, 0 ],
      [ 0, 0, 0, 1 ]
    ];
};

// Return y rotate matrix
Mtx.rotateY = function( angle ) {
    const c = Math.cos( angle );
    const s = Math.sin( angle );
    return [
      [  c, 0, s, 0 ],
      [  0, 1, 0, 0 ],
      [ -s, 0, c, 0 ],
      [  0, 0, 0, 1 ]
    ];
};

// Return z rotate matrix
Mtx.rotateZ = function( angle ) {
    const c = Math.cos( angle );
    const s = Math.sin( angle );
    return [
      [ c,-s, 0, 0 ],
      [ s, c, 0, 0 ],
      [ 0, 0, 1, 0 ],
      [ 0, 0, 0, 1 ]
    ];
};

// Concatenate two matrices A x B => C (alternate #1)
Mtx.cat = function( a, b ) {
    const m = Mtx.zero();
    for (let i=0; i<4; i++) {
        for (let j=0; j<4; j++) {
            for (let k=0; k<4; k++) {
                m[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return m;
};

// Return transformed vector
Mtx.transVector = function( m, v ) {
    let u = [
      (
        m[ 0 ][ 0 ] * v[ 0 ] +
        m[ 0 ][ 1 ] * v[ 1 ] +
        m[ 0 ][ 2 ] * v[ 2 ] +
        m[ 0 ][ 3 ]
      ),
      (
        m[ 1 ][ 0 ] * v[ 0 ] +
        m[ 1 ][ 1 ] * v[ 1 ] +
        m[ 1 ][ 2 ] * v[ 2 ] +
        m[ 1 ][ 3 ]
      ),
      (
        m[ 2 ][ 0 ] * v[ 0 ] +
        m[ 2 ][ 1 ] * v[ 1 ] +
        m[ 2 ][ 2 ] * v[ 2 ] +
        m[ 2 ][ 3 ]
      )
    ];
    const k = 1 / m[ 3 ][ 3 ];
    Vec.S( k, u, u );
    return u;
};

// Return camera matrix
Mtx.lookat = ( function() {
    let x, y, z;
    return function( eye, target, up ) {
      if (!x) {
        x = [ 0, 0, 0 ];
        y = [ 0, 0, 0 ];
        z = [ 0, 0, 0 ];
      }
      Vec.Sub( eye, target, z );
      if ( Vec.LenSqr( z ) < Vec.TINY ) {
        // Eye and target are in the same position
        z[ 2 ] = 1;
      }
      Vec.Normalize( z );
      Vec.Cross( up, z, x );
      if ( Vec.LenSqr( x ) < Vec.TINY ) {
        // eye and target are in the same vertical
        z[ 2 ] += 0.0001;
        Vec.Cross( up, z, x );
      }
      Vec.Normalize( x );
      Vec.Cross( z, x, y );
      return [
        [ x[ 0 ], x[ 1 ], x[ 2 ], 0 ],
        [ y[ 0 ], y[ 1 ], y[ 2 ], 0 ],
        [ z[ 0 ], z[ 1 ], z[ 2 ], 0 ],
        [ 0, 0, 0, 1 ]
      ];
    };
} )();
