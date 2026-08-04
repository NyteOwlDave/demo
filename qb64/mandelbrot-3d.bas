
Dim Shared SW, SH, CX, CY
Dim Shared VW, VH, VD
Dim Shared C_BGND, C_BORDER, C_BAR
Dim Shared radius, scale as Integer

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Screen _NewImage( SW, SH, 32 )

C_BGND = _RGB( 20, 20, 64 )
C_BORDER = _RGB( 212, 190, 84 )
C_BAR = _RGB( 255, 215, 32 )

' Define constants and parameters
MAX_ITERATIONS = 64
BAILOUT = 4.0

' Standard power for Mandelbulb detail
POWER = 8.0

' Studio Virtual Dimensions
VH = 200: VV = 200: VD = 200

' Color Index Voxel Map
Dim Shared voxmap( VW, VH, VD )

Background 20, 20, 64

UpdateProgressX 0.42
UpdateProgressY 0.64

Sleep
End

 Iterate through a 3D voxel grid (X, Y, Z)
Sub DrawGrid ()
    for x = 0 to VW - 1
				UpdateProgressX (1+x) / VW
        for y = 0 to VH - 1
				    UpdateProgressX (1+y) / VH
            for z = 0 to VD - 1
                DrawVoxel( x, y, z )
            next z
						IF ( INKEYS$ = CHR$(27) ) THEN
							END
            END IF
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

        ' Cartesian => Spherical
        r = VecLen( Z )

				' Over Limit?
        IF ( r > BAILOUT ) THEN
            is_bounded = false
            EXIT WHILE
        END IF

        theta = _ATAN2( SQR ( Z(1) * Z(1) + Z(2) * Z(2) ), Z(3) )
        phi   = _ATAN2( Z(2), Z(3) )

        ' Raise radius to POWER
        zr = r ^ POWER

        ' Scale and Rotate Angles by POWER
        theta = theta * POWER
        phi   = phi * POWER

        ' Spherical => Cartesian
				st = Sin( theta ) : sp = Sin( phi )
				ct = Cos( theta ) : cp = Cos( phi )

				' Sum with Constant C
        Z(1) = C(1) + zr * st * cp
        Z(2) = C(2) + zr * st * sp
        Z(3) = C(3) + zr * ct

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

' Update Progress Bar for X Dimension
Sub UpdateProgressX( ratio )
	DrawProgress SH - 80, ratio
End Sub

' Update Progress Bar for Y Dimension
Sub UpdateProgressY( ratio )
	DrawProgress SH - 40, ratio
End Sub

' Update Progress Bar for Y Dimension
Sub DrawProgress( y, ratio )
  x = 10 : x2 = SW - 10
  y2 = y + 32
	LINE ( x, y )-( x2, y2 ), C_BGND, BF
	LINE ( x, y )-( x2, y2 ), C_BORDER, B
  x2 = ( x2 - x1 - 4 ) * ratio
  x = x + 2 : y = y + 2 : y2 = y2 - 2
	LINE ( x, y )-( x2, y2 ), C_BAR, BF
End Sub
