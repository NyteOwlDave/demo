
Type Vec3
    x As Double
    y As Double
    z As Double
End Type

Main
Sleep
End

Sub Main ()
    Dim v1 As Vec3
    VecInit 3, 4, 5, v1
End Sub

Sub VecInit (x, y, z, vo As Vec3)
    vo.x = x
    vo.y = y
    vo.z = z
End Sub

Sub VecCopy (vi As Vec3, vo As Vec3)
    vo.x = vi.x
    vo.y = vi.y
    vo.z = vi.z
End Sub

Sub VecRand (v As Vec3)
    v.x = Rnd
    v.y = Rnd
    v.z = Rnd
End Sub

Sub VecAdd (va As Vec3, vb As Vec3, vo As Vec3)
    vo.x = va.x + vb.x
    vo.y = va.y + vb.y
    vo.z = va.z + vb.z
End Sub

Sub VecSub (va As Vec3, vb As Vec3, vo As Vec3)
    vo.x = va.x - vb.x
    vo.y = va.y - vb.y
    vo.z = va.z - vb.z
End Sub

Sub VecMul (va As Vec3, vb As Vec3, vo As Vec3)
    vo.x = va.x * vb.x
    vo.y = va.y * vb.y
    vo.z = va.z * vb.z
End Sub

Sub VecDiv (va As Vec3, vb As Vec3, vo As Vec3)
    vo.x = va.x / vb.x
    vo.y = va.y / vb.y
    vo.z = va.z / vb.z
End Sub

Sub VecCross (va As Vec3, vb As Vec3, vo As Vec3)
    vo.x = va.y * vb.z - va.z * vb.y
    vo.y = va.z * vb.x - va.x * vb.z
    vo.z = va.x * vb.y - va.y * vb.x
End Sub

Sub VecZero (v As Vec3)
    v.x = 0
    v.y = 0
    v.z = 0
End Sub

Sub VecAxisX (v As Vec3)
    v.x = 1
    v.y = 0
    v.z = 0
End Sub

Sub VecAxisY (v As Vec3)
    v.x = 0
    v.y = 1
    v.z = 0
End Sub

Sub VecAxisZ (v As Vec3)
    v.x = 0
    v.y = 0
    v.z = 1
End Sub

Sub VecPrint (v As Vec3)
    Print "("; v.x;
    Print ","; v.y;
    Print ","; v.z;
    Print ")";
End Sub

Sub VecPrintAt (c%, r%, v As Vec3)
    Locate c%, r%
    Print "("; v.x;
    Print ","; v.y;
    Print ","; v.z;
    Print ")";
End Sub

Sub VecScale (vi As Vec3, k#, vo As Vec3)
    vo.x = vi.x * k#
    vo.y = vi.y * k#
    vo.z = vi.z * k#
End Sub

Sub VecNeg (v As Vec3, vo As Vec3)
    VecScale v, -1, vo
End Sub

Sub VecLerp (va As Vec3, t#, vb As Vec3, vo As Vec3)
    u# = (1 - t#)
    vo.x = va.x * u# + vb.x * t#
    vo.y = va.y * u# + vb.y * t#
    vo.z = va.z * u# + vb.z * t#
End Sub

Sub VecProj (pv As Vec3, t#, nv As Vec3, vo As Vec3)
    vo.x = pv.x + nv.x * t#
    vo.y = pv.y + nv.y * t#
    vo.z = pv.z + nv.z * t#
End Sub

Sub VecComb (va As Vec3, ta#, vb As Vec3, tb#, vo As Vec3)
    vo.x = va.x * ta# + vb.x * tb#
    vo.y = va.y * ta# + vb.y * tb#
    vo.z = va.z * ta# + vb.z * tb#
End Sub

Function VecDot# (va As Vec3, vb As Vec3)
    VecDot = va.x * vb.x + va.y * vb.y + va.z * vb.z
End Function

Function VecDotSelf# (v As Vec3)
    VecDotSelf = v.x * v.x + v.y * v.y + v.z * v.z
End Function

Function VecManhatten# (v As Vec3)
    VecManhatten# = v.x + v.y + v.z
End Function

Function VecSlab# (v As Vec3)
    VecSlab# = v.x * v.y * v.z
End Function

Function VecVol# (va As Vec3, vb As Vec3, vc As Vec3)
    Dim vbxc As Vec3
    VecCross vb, vc, vbxc
    VecVol# = VecDot#(va, vbxc)
End Function

Function VecLen# (v As Vec3)
    VecLen# = Sqr(VecDotSelf(v))
End Function

Function VecNorm# (vi As Vec3, vo As Vec3)
    k# = VecDotSelf(vi)
    If k# > 1E-20 Then
        r# = 1 / Sqr(k#)
        VecScale vi, r#, vo
    Else
        VecAxisX vo
    End If
    VecNorm# = k#
End Function

Function VecRecip (vi As Vec3, vo As Vec3)
    d# = VecDotSelf(vi)
    If (d# > 1E-20) Then
        k# = 1 / d#
        VecScale vi, k#, vo
        VecRecip = k#
    Else
        VecZero vo
    End If
End Function

Function VecRandU# (v As Vec3)
    VecRand v
    VecRandU# = VecNorm#(v, v)
End Function

Function VecRandT# (v As Vec3, t#)
    n# = VecRandU#(v)
    VecScale v, t#, v
    VecRandT# = n#
End Function

' Vo = Vi - 2(Vi \dot N)N
Function VecReflect# (vi As Vec3, n As Vec3, vo As Vec3)
    d# = VecDot#(vi, n)
    VecScale n, 2 * d#, vo
    VecSub vi, vo, vo
    VecReflect# = d#
End Function

' Snell's Law
Function VecRefract# (vi As Vec3, n As Vec3, eta#, vo As Vec3)
    VecRefract# = 0 ' "TODO"
End Function


