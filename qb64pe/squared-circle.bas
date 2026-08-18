
' NyteOwlDave ~ 2026-AUG-18
' All Original Code
' Dedicated to the BASIC Programming Crew

_Title "Squaring the Circle"

Randomize Timer

Screen _NewImage(800, 800, 32)

Window (-100, -100)-(100, 100)

Const D2R = _Pi / 180
Const TAU = _Pi * 2

Dim Shared lo#
Dim Shared hi#
Dim Shared c&

lo# = -2
hi# = 10

c& = RandomColor&

' StillShot Int(90 * Rnd) - 45

Print "Hit Enter to Begin": Input A: Cls

Animate
Sleep
End

Sub Animate
    t# = 0
    dt# = (Rnd - 0.5) / 4
    i& = 0
    Do
        _Limit 30
        ' Cls
        Zapper t#
        t# = t# + dt#
        lo# = lo# + (0.015 * Rnd)
        hi# = hi# - (0.015 * Rnd)
        If (t# >= TAU) Then
            t# = t# - TAU
        End If
        If (t# < 0) Then
            t# = t# + TAU
        End If
        If Rnd < 0.005 Then
            dt# = (Rnd - 0.5) / 4
            c& = RandomColor&
        End If
        i& = i& + 1
        If i& > 200 Then
            lo# = -2
            hi# = 10
            i& = 0
            Cls
        End If
        If InKey$ = Chr$(27) Then
            Exit Do
        End If
    Loop
End Sub


Sub Zapper (t#)
    For N = lo# To hi# Step 0.5
        For deg = 0 To 360
            rad = deg * D2R
            s = Cos(rad)
            c = Sin(rad)
            ' Dump
            p = Abs(s) ^ N + Abs(c) ^ N
            If p > 0 Then
                q = 1 / p
                r = 5 + 20 * Sqr(q)
                x = Cos(rad + t#) * r
                y = Sin(rad + t#) * r
                PSet (x, y), c&
            End If
        Next deg
    Next N
End Sub

Function RandomColor& ()
    r% = Int(15 + Rnd * 250)
    g% = Int(15 + Rnd * 215)
    b% = Int(15 + Rnd * 15)
    RandomColor& = _RGB32(r%, g%, b%)
End Function

Sub Hoop (x, y, r, c)
    Circle (x, y), r, c
End Sub

Sub Ring ()
    Hoop 0, 0, 19.3, _RGB32(255, 0, 0)
    Hoop 0, 0, 19.0, _RGB32(255, 0, 0)
    Hoop 0, 0, 18.7, _RGB32(255, 0, 0)
End Sub

Sub StillShot (deg)
    Zapper deg * D2R
    Ring
End Sub

