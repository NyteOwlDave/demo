
Dim Shared SW, SH, CX, CY
Dim Shared radius, scale as Integer

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Screen _NewImage( SW, SH, 32 )


' Define constants and parameters
MAX_ITERATIONS = 64
BAILOUT = 4.0

' Standard power for Mandelbulb detail
POWER = 8.0

 Iterate through a 3D voxel grid (X, Y, Z)
Sub DrawGrid ()
    for x = 0 to VW - 1
        for y = 0 to VH - 1
            for z = 0 to VD - 1
                DrawVoxel( x, y, z )
            next z
        next y
    next x
End Sub

Sub Vector( x, y, z, v() )
    v(1) = x
    v(2) = y
    v(3) = z
End Sub

Sub DrawVoxel (x, y, z)

    Dim C(3) as Single
    Dim Z(3) as Single

    Vector x, y, z, C()          ' Constant coordinate in 3D space
    Vector 0.0, 0.0, 0.0, Z()    ' Initial value

    iteration = 0
    is_bounded = true

    WHILE ( iteration < MAX_ITERATIONS )

        ' 1. Convert Cartesian coordinates
        '    (Zx, Zy, Zz) to Spherical (r, theta, phi)
        r = VecLen( Z )

        IF ( r > BAILOUT ) THEN
            is_bounded = false
            EXIT WHILE
        END IF

        theta = _ATAN2( SQR ( Z(1) * Z(1) + Z(2) * Z(2) ), Z(3) )
        phi   = _ATAN2( Z(2), Z(3) )

        ' 2. Scale and rotate angles by POWER
        '    raise radius to POWER
        zr    = r ^ POWER
        theta = theta * POWER
        phi   = phi * POWER

        // 3. Convert back to Cartesian coordinates
        Z(1) = zr * Sin( theta ) * Cos( phi )
        Z(2) = zr * Sin( theta ) * Sin( phi )
        Z(3) = zr * Cos( theta )

        // 4. Add constant C
        VecAdd Z(), C(), Z()
        iteration = iteration + 1

    WEND

    if is_bounded then
        PlotVoxel C, ColorFrom( iteration )
    end if

End Sub

' Plot Voxel
Sub PlotVoxel (v(), c )
    ' TODO ...
End Sub

' Color from Iteration Count
Function ColorFrom( iteration )
    ' TODO ...
End Function

' Vector 3D Length
Function VecLen( v() )
    x = v(1)
    y = v(2)
    z = v(3)
    return SQR ( x*x + y*y + z*z )
End Function

' Fill Rectangle
Sub FillRect( x, y, w, h, c )
	x2 = x + w - 1
	y2 = y + h - 1
	LINE ( x, y )-( x2, y2 ), c, BF
End Sub

' Background Fill
Sub Background( r, g, b )
	c = _RGB( r, g, b )
	LINE ( 0, 0 )-( SW, SH ), c, BF
End Sub

