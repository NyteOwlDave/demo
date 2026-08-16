
' polygon.bas (polygon.js)

' Polygon 2D Orientation
' +1 = CW
' -1 = CCW
'  0 = Degenerate
Function PolyOrientation% ( p0 As Vector2, p1 As Vector2, p2 As Vector2 )
    d1x = p1.x - p0.x : d1y = p1.y - p0.y
    d2x = p2.x - p1.x : d2y = p2.y - p1.y
    dz = d1x * d2y - d1y * d2x
    if ( dz > TINY ) Then
        PolyOrientation% = 1
    Else If ( dz < -TINY ) Then
        PolyOrientation% = -1
    Else
        PolyOrientation% = 0
    End If
End Function

