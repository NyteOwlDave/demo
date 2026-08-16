
/* cube.js */

// Singleton Cube Object
const Cube = {
    vert: [],               // Object coordinates
    face: [],               // Face definitions
    center: [ 0, 0, 0 ],    // Center point
    // Initialize
    init: function( size, center ) {
        const N = -0.5*size;
        const P =  0.5*size;
        Cube.vert[ 0 ] = [ N, P, N ];
        Cube.vert[ 1 ] = [ P, P, N ];
        Cube.vert[ 2 ] = [ P, N, N ];
        Cube.vert[ 3 ] = [ N, N, N ];
        Cube.vert[ 4 ] = [ P, P, P ];
        Cube.vert[ 5 ] = [ N, P, P ];
        Cube.vert[ 6 ] = [ N, N, P ];
        Cube.vert[ 7 ] = [ P, N, P ];
        Cube.face[ 0 ] = [ 1, 0, 3, 2 ];
        Cube.face[ 1 ] = [ 2, 3, 6, 7 ];
        Cube.face[ 2 ] = [ 7, 6, 5, 4 ];
        Cube.face[ 3 ] = [ 4, 5, 0, 1 ];
        Cube.face[ 4 ] = [ 0, 5, 6, 3 ];
        Cube.face[ 5 ] = [ 4, 1, 2, 7 ];
        Vec.Copy( center, Cube.center );
    }
};

