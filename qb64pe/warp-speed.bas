
' Warp Speed Starburst Demo
' Platform ~ QB64 Phoenix
' NyteOwlDave ~ 2026-SEP-02
' Dedicated to the BASIC Programmers Group

_Title "Warp Speed ~ NyteOwlDave"

Dim Shared SW As Integer
Dim Shared SH As Integer

Dim Shared CX As Integer
Dim Shared CY As Integer

Dim Shared C_GOLD&
Dim Shared C_BLACK&
Dim Shared C_BEAM&
Dim Shared C_PALE&
Dim Shared C_LRAY&

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Randomize Timer

Screen _NewImage(SW, SH, 32)

C_BLACK& = _RGB32(0, 0, 0)
C_GOLD& = _RGB32(255, 215, 15)
C_BEAM& = _RGB32(255, 255, 185)
C_PALE& = _RGB32(170, 200, 255)
C_LRAY& = _RGB32(60, 60, 37)

Color C_GOLD#, C_BLACK#
Cls

DrawScene
Sleep: End

Function Proj# (a As Double, t As Double, b As Double)
    Proj# = (a + t * b)
End Function

Function Rand# (k As Double)
    If (Abs(k) < 1E-8) Then
        k = 1
    End If
    Rand# = (k * Rnd)
End Function

Function IRand& (k As Double)
    IRand& = Int(Rand#(k))
End Function

Sub StarBurst (beams%, c&)
    If (beams% < 1) Then beams% = 100
    Color c&
    For i% = 0 To beams%
        dx& = IRand(SW * 0.9) + (SW * 0.05) - CX
        dy& = IRand(SH * 0.9) + (SH * 0.05) - CY
        x1& = CX: x2& = x1& + dx&
        y1& = CY: y2& = y1& + dy&
        Line (x1&, y1&)-(x2&, y2&)
    Next i%
End Sub

Sub LightRay (xo&, yo&, radius#)
    rho# = radius# * (0.25 + Rand#(0.75))
    If (rho# < 2) Then Exit Sub
    theta# = Rand#(2 * _Pi)
    x& = Int(Proj#(xo&, rho#, Cos(theta#)))
    y& = Int(Proj#(yo&, rho#, Sin(theta#)))
    Line (xo&, yo&)-(x&, y&)
End Sub

Sub LightRays (xo&, yo&, radius#, rays%)
    Color C_LRAY& ' rgb( 60, 60, 37 )
    While (rays% > 0)
        rays% = rays% - 1
        LightRay xo&, yo&, radius#
    Wend
End Sub

Sub StarField (stars%, c&, radius#, rays%)
    Color c&:
    rs% = rays% ' Preserve Ray Count (Why?)
    For i% = 0 To stars%
        If (Rand#(1) > 0.42) Then
            Color c&
        Else
            Color C_PALE&
        End If
        x& = Int(Rand#(SW * 0.9) + (SW * 0.05))
        y& = Int(Rand#(SH * 0.9) + (SH * 0.05))
        If (Rand#(1) > 0.5) Then
            Line (x&, y&)-(x& + 2, y& + 2), , BF
        Else
            Line (x&, y&)-(x& + 1, y& + 1), , BF
        End If
        If (rays% > 0) Then
            LightRays x&, y&, radius#, rays%
            rays% = rs% ' QB64 Bug? Why is this NEEDED?
        End If
    Next i%
End Sub

Sub DrawScene
    StarBurst 500, C_GOLD&
    StarField 1200, C_BEAM&, 7.0, 11
End Sub



