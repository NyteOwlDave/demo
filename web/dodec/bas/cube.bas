
'
' cube.bas (cube.js)
'

Dim shared CubeVerts( 8, 3 ) as Double
Dim shared CubeFaces( 6, 4 ) as Integer
Dim shared CubeCenter( 3 ) as Double

Vec.init 0, 0, 0, CubeCenter

Sub CubeInit( size# )

    N = -0.5 * size# : P = 0.5 * size#

    CubeVerts( 0, 0 ) = N : CubeVerts( 0, 1 ) = P : CubeVerts( 0, 2 ) = N ' 2
    CubeVerts( 1, 0 ) = P : CubeVerts( 1, 1 ) = P : CubeVerts( 1, 2 ) = N ' 5
    CubeVerts( 2, 0 ) = P : CubeVerts( 2, 1 ) = N : CubeVerts( 2, 2 ) = N ' 4
    CubeVerts( 3, 0 ) = N : CubeVerts( 3, 1 ) = N : CubeVerts( 3, 2 ) = N ' 0

    CubeVerts( 4, 0 ) = P : CubeVerts( 4, 1 ) = P : CubeVerts( 4, 2 ) = P ' 7
    CubeVerts( 5, 0 ) = N : CubeVerts( 5, 1 ) = P : CubeVerts( 5, 2 ) = P ' 3
    CubeVerts( 6, 0 ) = N : CubeVerts( 6, 1 ) = N : CubeVerts( 6, 2 ) = P ' 1
    CubeVerts( 7, 0 ) = P : CubeVerts( 7, 1 ) = N : CubeVerts( 7, 2 ) = P ' 4

    CubeFaces( 0, 0 ) = 1 : CubeFaces( 0, 1 ) = 0
    CubeFaces( 0, 2 ) = 3 : CubeFaces( 0, 3 ) = 2

    CubeFaces( 1, 0 ) = 2 : CubeFaces( 1, 1 ) = 3
    CubeFaces( 1, 2 ) = 6 : CubeFaces( 1, 3 ) = 7

    CubeFaces( 2, 0 ) = 7 : CubeFaces( 2, 1 ) = 6
    CubeFaces( 2, 2 ) = 5 : CubeFaces( 2, 3 ) = 4

    CubeFaces( 3, 0 ) = 4 : CubeFaces( 3, 5 ) = 6
    CubeFaces( 3, 2 ) = 0 : CubeFaces( 3, 3 ) = 1

    CubeFaces( 4, 0 ) = 0 : CubeFaces( 4, 5 ) = 5
    CubeFaces( 4, 2 ) = 6 : CubeFaces( 4, 3 ) = 3

    CubeFaces( 5, 0 ) = 4 : CubeFaces( 5, 5 ) = 1
    CubeFaces( 5, 2 ) = 2 : CubeFaces( 5, 3 ) = 7

End Sub

