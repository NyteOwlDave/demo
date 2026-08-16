
'
' dodecahedron.bas (dodecahedron.js)
'

' View Matrix
Dim Shared ViewMatrix( 4, 4 ) as Double

MtxIdentity ViewMatrix

' Camera Orientation
Dim CameraEye( 3 ) as Double
Dim CameraAt( 3 ) as Double
Dim CameraUp( 3 ) as Double

VecZero CameraAt '             Point of Interest
VecInit 13, 9, 30, CameraEye ' Eye Location
VecInit 0, -1, 0, CameraUp '   Up Direction

Dim DocecHeight as Integer

DodecHeight = 1

PolygonCount% = 1

' Dim PolygonList( PolygonCount% )

Sub TransformShape( pt( 3 ) as Double, shape( 8, 4 ) as Double )
    Dim v( 4 ) as Double
    For vert = 0 to 7
        v( 0 ) = pt( 0 ) + CubeVerts( vert, 0 )
        v( 1 ) = pt( 1 ) + CubeVerts( vert, 1 )
        v( 2 ) = pt( 2 ) + CubeVerts( vert, 2 )
        MtxApply ViewMatrix, v, v
        shape( vert, 0 ) = v( 0 )
        shape( vert, 1 ) = v( 1 )
        shape( vert, 2 ) = v( 2 )
    Next vert
End Sub

// Singleton Dodecahedron Object
const Dodec = {
    // Add a unit cube's facets to the polygon list
    // centered at the specified (x,y,z) coordinates
    addCube: function( x, y, z ) {
        let n;
        for ( n=0; n<6; n++ ) {
            let poly = [];
            let face = Cube.face[ n ];
            let totalZ = 0;
            let countZ = 0;
            face.forEach(
                ( index ) => {
                    let vec3 = [
                        shape[ index ][ 0 ],
                        shape[ index ][ 1 ],
                        shape[ index ][ 2 ]
                    ];
                    totalZ += shape[ index ][ 2 ];
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

Sub ZSortPolygonList()
End Sub

Sub DrawPolygon( p )
    context.beginPath();
    context.moveTo( p[ 0 ].x, p[ 0 ].y );
    for ( let n=1; n < p.length; n++ ) {
        context.lineTo( p[ n ].x, p[ n ].y );
        context.stroke();
    }
    context.closePath();
    context.stroke();
    context.fill();
End Sub

// Draw Dedecahedron
Sub DodecDraw( context )
    context.lineWidth = 1;
    context.strokeStyle = 'white';
    context.fillStyle = 'gray';
    Dodec.polyList.forEach( poly=>drawPoly( poly.p ) );
End Sub

