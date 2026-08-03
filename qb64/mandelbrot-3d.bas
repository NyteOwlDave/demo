
Dim Shared SW, SH, CX, CY
Dim Shared radius, scale as Integer

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Screen _NewImage( SW, SH, 32 )


// Define constants and parameters
constant POWER = 8.0              // Standard power for Mandelbulb detail
constant MAX_ITERATIONS = 64
constant BAILOUT = 4.0

Function Mandelbrot3D()

' Iterate through a 3D voxel grid (X, Y, Z)
Sub DrawGrid ()
End Sub

Sub DrawVoxel (x, y, z)

    Vector x, y, z, C()          ' Constant coordinate in 3D space
    Vector 0.0, 0.0, 0.0, Z()    ' Initial value

    iteration = 0
    is_bounded = true

    while iteration < MAX_ITERATIONS do
        ' 1. Convert Cartesian coordinates
        ' (Zx, Zy, Zz) to spherical (r, theta, phi)
        r = VecLen( Z )
        if r > BAILOUT then
            is_bounded := false
            break
        end if

        theta := atan2(sqrt(Z.x * Z.x + Z.y * Z.y), Z.z)
        phi := atan2(Z.y, Z.x)

        // 2. Scale and rotate angles by POWER, raise radius to POWER
        zr := r ^ POWER
        theta := theta * POWER
        phi := phi * POWER

        // 3. Convert back to Cartesian coordinates
        Z.x := zr * sin(theta) * cos(phi)
        Z.y := zr * sin(theta) * sin(phi)
        Z.z := zr * cos(theta)

        // 4. Add constant C
        Z := Z + C
        iteration := iteration + 1
    end while

    if is_bounded then
        plot_voxel(C, color_from(iteration))
    end if
end for


' Fill Rectangle
Sub FillRect( x, y, w, h, c )
	x2 = x + w - 1
	y2 = y + h - 1
	LINE ( x, y )-( x2, y2 ), c, BF
End Sub

' Background Fill
Sub Background( r, g, b )
	c = _RGB( r, g, b )
  FillRect( 0, 0, SW, SH, c )
End Sub

