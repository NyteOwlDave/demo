
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' NyteOwlDave ~ 2026-AUG-10
' Array Matrix 3x3
' Dedicated to the BASIC Programming "Gang"
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
