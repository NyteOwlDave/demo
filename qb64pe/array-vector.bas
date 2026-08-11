
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' NyteOwlDave ~ 2026-AUG-10
' Array Vector 3
' Dedicated to the BASIC Programming "Gang"
'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

Sub ShowVector (v())
    Print v(1); v(2); v(3)
End Sub

