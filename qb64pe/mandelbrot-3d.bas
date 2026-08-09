
' NyteOwlDave ~ 2026-AUG-03
' Mandelbrot 3D Demo
' Dedicated to the BASIC Programming "Gang"

_Title "Mandelbrot 3D Demo"

Dim Shared SW, SH, CX, CY
Dim Shared VW, VH, VD
Dim Shared C_BGND, C_BORDER, C_BAR
Dim Shared MAX_ITERATIONS, BAILOUT, POWER

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Screen _NewImage(SW, SH, 32)

C_BGND = _RGB(20, 20, 64)
C_BORDER = _RGB(212, 190, 84)
C_BAR = _RGB(255, 215, 32)

' Define constants and parameters
MAX_ITERATIONS = 64
BAILOUT = 4.0

' Standard power for Mandelbulb detail
POWER = 8.0

' Studio Virtual Dimensions
VW = 200: VH = 200: VD = 200

' Color Index Voxel Map
Dim Shared voxmap(VW, VH)

' Transform Matrix
Dim Shared mtx(3, 3)

' Area of Interest in Virtual Space
Dim Shared x_lo, y_lo, z_lo
x_lo = -2.0: x_hi = 0.5
y_lo = -1.25: y_hi = 1.25
z_lo = -1.25: z_hi = 1.25

' Scaling Factor
' Voxel Space => Virtual Space
scale = 1 / (z_hi - z_lo)

' Rotates for Camera Viewpoint
' Scales Voxel => Virtual
MtxRotateScale 0, -1, 0.1, _Pi / 160, scale, mtx()

' RenderFractal

Dim v1(3) As Single
Vector 2, 4, 5, v1()
Print VecLen(v1())

Sleep
End

' Main Routine
Sub RenderFractal ()

    Background 20, 20, 64

    UpdateProgressV 0
    UpdateProgressX 0
    UpdateProgressY 0

    PlotGrid

    ' Background 20, 20, 64

    DrawGrid

End Sub

' Iterate through a 3D voxel grid (X, Y, Z)
' Draw Color Shades
Sub DrawGrid ()
    For x = 0 To VW - 1
        For y = 0 To VH - 1
            DrawVoxel x, y
        Next y
    Next x
End Sub

Sub DrawVoxel (x, y)
    shade = voxmap(x, y)
    If shade <= 0 Then
        shade = 0.05 + 0.1 * Rnd ' Noise
    End If
    c& = _RGB(255 * shade, 215 * shade, 32 * shade)
    xs = SW / VW: ys = SH / VH
    xx = x * xs
    yy = y * ys
    Line (xx, yy)-(xx + xs - 1, yy + ys - 1), c&, BF
End Sub

' Iterate through a 3D voxel grid (X, Y, Z)
' Plot Color Shades
Sub PlotGrid ()
    hits = 0
    UpdateProgressV hits
    For x = 0 To VW - 1
        UpdateProgressX (1 + x) / VW
        For y = 0 To VH - 1
            UpdateProgressY (1 + y) / VH
            For z = VD - 1 To 0 Step -1
                hit = PlotVoxel(x, y, z)
                If (hit <> 0) Then
                    hits = hits + 1
                    UpdateProgressV hits
                End If
            Next z
        Next y
    Next x
End Sub

Function PlotVoxel (x, y, z)

    Dim Z(3) As Single
    Dim C(3) As Single

    ' Transform Voxel Coords to Virtual Space
    Transform x, y, z, C()

    Vector 0.0, 0.0, 0.0, Z() ' Initial value

    iteration = 0
    is_bounded = 1

    While (iteration < MAX_ITERATIONS)

        ' Cartesian => Spherical
        r = VecLen(Z())

        ' Over Limit?
        If (r > BAILOUT) Then
            is_bounded = 0
            Exit While
        End If

        theta = _Atan2(Sqr(Z(1) * Z(1) + Z(2) * Z(2)), Z(3))
        phi = _Atan2(Z(2), Z(3))

        ' Raise radius to POWER
        zr = r ^ POWER

        ' Scale and Rotate Angles by POWER
        theta = theta * POWER
        phi = phi * POWER

        ' Spherical => Cartesian
        st = Sin(theta): sp = Sin(phi)
        ct = Cos(theta): cp = Cos(phi)

        ' Sum with Constant C
        Z(1) = C(1) + zr * st * cp
        Z(2) = C(2) + zr * st * sp
        Z(3) = C(3) + zr * ct

        iteration = iteration + 1

    Wend

    If (is_bounded <> 0) Then
        voxmap(x, y) = ShadeFrom(iteration)
        PlotVoxel = 1
    Else
        voxmap(x, y) = 0
        PlotVoxel = 0
    End If

End Function

' Color Shade from Iteration Count
Function ShadeFrom (iteration)
    ShadeFrom = 1 - (iteration / MAX_ITERATIONS)
End Function

' Fill Rectangle
Sub FillRect (x, y, w, h, c)
    x2 = x + w - 1
    y2 = y + h - 1
    Line (x, y)-(x2, y2), c, BF
End Sub

' Background Fill
Sub Background (r&, g&, b&)
    c& = _RGB(r&, g&, b&)
    Line (0, 0)-(SW, SH), c&, BF
End Sub

' Update Progress Bar for Voxel Hit Count
Sub UpdateProgressV (hits)
    ratio = hits / (VW * VH * VD)
    DrawProgress SH - 120, ratio
End Sub

' Update Progress Bar for X Dimension
Sub UpdateProgressX (ratio)
    DrawProgress SH - 80, ratio
End Sub

' Update Progress Bar for Y Dimension
Sub UpdateProgressY (ratio)
    DrawProgress SH - 40, ratio
End Sub

' Draw Progress Bar
Sub DrawProgress (y, ratio)
    x = 10: x2 = SW - 10
    y2 = y + 32
    Line (x, y)-(x2, y2), C_BGND, BF
    Line (x, y)-(x2, y2), C_BORDER, B
    x2 = x + (x2 - x - 4) * ratio
    x = x + 2: y = y + 2: y2 = y2 - 2
    Line (x, y)-(x2, y2), C_BAR, BF
End Sub

' Write 3D Vector
Sub Vector (x, y, z, v())
    v(1) = x
    v(2) = y
    v(3) = z
End Sub

' Vector 3D Length
Function VecLen (v())
    x = v(1)
    y = v(2)
    z = v(3)
    VecLen = Sqr(x * x + y * y + z * z)
End Function

' Uniform Scaling
Sub VecScale (scale, vi(), vo())
    vo(1) = scale * vi(1)
    vo(2) = scale * vi(2)
    vo(3) = scale * vi(3)
End Sub

' Random for Testing
Sub VecRnd (scale, v())
    v(1) = scale * Rnd
    v(2) = scale * Rnd
    v(3) = scale * Rnd
End Sub

' Normalize 3D Vector
Sub NormalVec (x, y, z, v())
    w = x * x + y * y + z * z ' Self Dot 3D
    If (w < 1E-14) Then ' Too small? Default
        Vector 1, 0, 0, v()
    Else
        t = 1 / Sqr(w) ' Reciprocal of Vector Length
        Vector x * t, y * t, z * t, v()
    End If
End Sub

' Transform Voxel Coordinates to Virtual Space
' Single Point
Sub Transform (x, y, z, v())
    v(1) = x_lo + x * mtx(1, 1) + y * mtx(1, 2) + z * mtx(1, 3)
    v(2) = y_lo + x * mtx(2, 1) + y * mtx(2, 2) + z * mtx(2, 3)
    v(3) = z_lo + x * mtx(3, 1) + y * mtx(3, 2) + z * mtx(3, 3)
End Sub

' Prepare Rotation and Scaling Matrix
' Rotate by angle theta about vector (x,y,z)
' then Scale
Sub MtxRotateScale (x, y, z, theta, scale, m( 3 , 3))

    c = Cos(theta)
    s = Sin(theta)
    t = 1 - c

    Dim n(3) As Single
    NormalVec x, y, z, n()
    x = n(1)
    y = n(2)
    z = n(3)

    m(1, 1) = scale * (t * x * x + c)
    m(1, 2) = scale * (t * x * y - z * s)
    m(1, 3) = scale * (x * z + y * s)

    m(2, 1) = scale * (t * x * y + z * s)
    m(2, 2) = scale * (t * y * y + c)
    m(2, 3) = scale * (t * y * z - x * s)

    m(3, 1) = scale * (t * x * z - y * s)
    m(3, 2) = scale * (t * y * z + x * s)
    m(3, 3) = scale * (t * z * z + c)

End Sub

Sub ShowMatrix (m())
    Print m(1, 1); m(1, 2); m(1, 3)
    Print m(2, 1); m(2, 2); m(2, 3)
    Print m(3, 1); m(3, 2); m(3, 3)
End Sub

Sub ShowVector (v())
    Print v(1); v(2); v(3)
End Sub



