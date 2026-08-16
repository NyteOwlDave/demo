
/*

  dodec.js -- Rhomboid dodecahedron with cubes
  Dave Wellsted, NyteOwl Computer Software
  2026-AUG-15

*/


;
; doc = document
;

;
; str =( s )=> String( s || "" ).trim()
;

;
; elx =( t )=> doc.createElement( t )
; gid =( i )=> doc.getElementById( i )
;

const get_canvas  = () => gid( "idCanvas" );
const get_context = () => get_canvas().getContext( "2d" );

function main() {
    try {
        Screen.init( get_canvas(), 60 );
        render();
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

addEventListener( "load", main );


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


// Singleton Screen Object
const Screen = {
    canvas: null,     // HTML5 canvas element
    w: 0,             // Canvas width
    h: 0,             // Canvas height
    scale: 1,         // Scaling factor
    xOffset: 0,       // Horizontal center
    yOffset: 0,       // Vertical center
    fov: 90,          // Field of view (degrees)
    // Initialize the screen object
    init: function(canvas, fov) {
      Screen.canvas = canvas;
      Screen.fov = fov;
      const w = canvas.width;
      const h = canvas.height;
      Screen.w = w;
      Screen.h = h;
      Screen.xOffset = Math.floor( w / 2 );
      Screen.yOffset = Math.floor( h / 2 );
      const r = Vec.deg2rad( fov / 2 );
      Screen.scale = Screen.xOffset / Math.tan( r );
    },
    // Convert 3D view coords to 2D screen coords
    mapToScreen: function( vec3 ) {
        const k = Screen.scale / vec3[ 2 ];
        const x = Screen.xOffset + vec3[ 0 ] * k;
        const y = Screen.yOffset - vec3[ 1 ] * k;
        return new Vector2( x, y );
    },
    // Clear the screen
    clear: function() {
        Screen.fill( Screen.canvas, 'black' );
    },
    // Fill canvas will a color
    fill: function( canvas, color ) {
        const w = canvas.width;
        const h = canvas.height;
        const gfx = canvas.getContext( '2d' );
        gfx.fillStyle = color;
        gfx.fillRect( 0, 0, w, h );
    }
};


// Singleton Polygon Object
const Polygon = {
    // Algebraic sign [ -1, 0, +1 ]
    sign: function( r ) {
        if ( r > Vec.TINY ) {
            return 1;
        }
        if ( r < -Vec.TINY ) {
            return -1;
        }
        return 0;
    },
    // Determine 2D polygon orientation
    // p0, p1, p2 -- polygon vertices
    // Returns:
    // +1 for CW
    // -1 for CCW
    // 0 for degenerate
    orientation: function( p0, p1, p2 ) {
        const ops = Polygon;
        const d1 = {}, d2 = {};
        d1.x = p1.x - p0.x; d1.y = p1.y - p0.y;
        d2.x = p2.x - p1.x; d2.y = p2.y - p1.y;
        return ops.sign( d1.x * d2.y - d1.y * d2.x );
    }
};


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


// Singleton Dodecahedron Object
const Dodec = {
    // Camera orientation
    camera: {
        eye: [ 13, 9, 30 ],
        at:  [  0, 0,  0 ],
        up:  [  0,-1,  0 ]
    },
    // View matrix
    Q: Mtx.identity(),
    // Height
    height: 1,
    // Polygon list (all cubes)
    polyList: [],
    // Add a unit cube's facets to the polygon list
    // centered at the specified (x,y,z) coordinates
    addCube: function( x, y, z ) {
        const v2 = [];
        const view = [];
        Cube.vert.forEach(
            ( v ) =>{
                Vec.Add( v, [ x, y, z ], v2 );
                view.push( Mtx.transVector( Dodec.Q, v2 ) );
            }
        );
        let n;
        for ( n=0; n<6; n++ ) {
            let poly = [];
            let face = Cube.face[ n ];
            let totalZ = 0;
            let countZ = 0;
            face.forEach(
                ( index ) => {
                    let vec3 = [
                        view[ index ][ 0 ],
                        view[ index ][ 1 ],
                        view[ index ][ 2 ]
                    ];
                    totalZ += view[ index ][ 2 ];
                    countZ++;
                    poly.push( Screen.mapToScreen( vec3 ) );
                }
            );
            if ( Polygon.orientation( poly[0], poly[1], poly[2] ) > 0 ) {
                Dodec.polyList.push(
                    {
                        p : poly,
                        z : totalZ / countZ
                    }
                );
            }
        }
    },
    // Initialize
    init: function( height ) {
        height = Vec.mid( 1, height, 15 );
        Dodec.height = height;
        Dodec.polyList = [];
        Cube.init( 1, [ 0, 0, 0 ] );
        function xform( C ) {
            const cam = Dodec.camera;
            const A = Mtx.lookat( cam.eye, cam.at, cam.up );
            const B = Mtx.translate( -cam.eye[0], -cam.eye[1], -cam.eye[2] );
            if (! C ) {
                Dodec.Q = Mtx.cat( A, B );
            } else {
                const AB = Mtx.cat( A,  B );
                Dodec.Q  = Mtx.cat( AB, C ) ;
            }
        }
        xform();
        if ( height===1 ) {
            Dodec.addCube( 0, 0, 0 );
        } else if( height===2 ) {
            Dodec.addCube(  1, 0, 0 );
            Dodec.addCube( -1, 0, 0 );
            Dodec.addCube(  0, 1, 0 );
            Dodec.addCube(  0,-1, 0 );
            Dodec.addCube(  0, 0, 1 );
            Dodec.addCube(  0, 0,-1 );
        } else {
            function drawSide() {
                let x, y;
                let x0 = 0, x1 = 0;
                let y0 = 0, y1 = 0;
                let z = Dodec.height-1;
                const zMax = Math.floor( z/2 );
                Dodec.addCube( x0, y0, z );
                z--;
                while ( z >= zMax ) {
                    x0--; x1++;
                    y0--; y1++;
                    y = y0;
                    for ( x=x0; x<=x1; x++ ) {
                        Dodec.addCube( x, y, z );
                    }
                    x = x1;
                    for ( y=y0+1; y<=y1; y++ ) {
                        Dodec.addCube( x, y, z );
                    }
                    y = y1;
                    for ( x=x1-1; x>=x0; x-- ) {
                        Dodec.addCube( x, y, z );
                    }
                    x = x0;
                    for ( y=y1-1; y>y0; y-- ) {
                        Dodec.addCube( x, y, z );
                    }
                    z--;
                }
            }
            drawSide();
            let R = Mtx.rotateX( Vec.deg2rad( 90 ) );
            xform( R );
            drawSide();
            R = Mtx.rotateX( Vec.deg2rad( 270 ) );
            xform( R );
            drawSide();
            R = Mtx.rotateX( Vec.deg2rad( 180 ) );
            xform( R );
            drawSide();
            R = Mtx.rotateY( Vec.deg2rad( 90 ) );
            xform( R );
            drawSide();
            R = Mtx.rotateY( Vec.deg2rad( 270 ) );
            xform( R );
            drawSide();
        }
        Dodec.polyList.sort(
            ( a, b ) => {
                if ( a.z > b.z ) { return  1; }
                if ( b.z > a.z ) { return -1; }
                return 0;
            }
        );
    },
    // Draw
    draw: function( context ) {
        context.lineWidth = 1;
        context.strokeStyle = 'white';
        context.fillStyle = 'gray';
        function drawPoly( p ) {
            context.beginPath();
            context.moveTo( p[ 0 ].x, p[ 0 ].y );
            for ( let n=1; n < p.length; n++ ) {
                context.lineTo( p[ n ].x, p[ n ].y );
                context.stroke();
            }
            context.closePath();
            context.stroke();
            context.fill();
        }
        Dodec.polyList.forEach( poly=>drawPoly( poly.p ) );
    }
};

function get_height() {
    return ( parseInt( idHeight.value ) & ~1 ) + 1;
}

function render() {
    Screen.clear();
    Dodec.init( get_height () );
    Dodec.draw( get_context() );
    requestAnimationFrame( render );
}


function visit( url ) {
    try {
        url = str( url );
        if (! url ) {
            console.warn( "Ignoring Empty URL" );
            return;
        }
        if ( null === localStorage ) {
            const a = elx( "A" );
            a . href = ( url );
            a . click();
        } else {
            const wnd = window;
            wnd.open( url, url );
        }
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

visit.codepen = function() {
    const url = (
        `https://codepen.io/NyteOwlDave/full/poLJbBr` 
    );
    visit( url );
};

