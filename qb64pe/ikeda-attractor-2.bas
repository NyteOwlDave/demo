
'
' NyteOwlDave ~ 2026-AUG-07
' Inspired by Equations in Motion
' https://www.facebook.com/equationsinmotion
' Platform : QB64 Phoenix
' Dedicated to the BASIC Programming "Gang"
'

_Title "Ikeda Attractor 2.0"

Dim Shared C_MIDNIGHT
Dim Shared C_BLUE
Dim Shared C_GOLD
Dim Shared C_CRIMSON
Dim Shared U0#
Dim Shared UX#
Dim Shared UNOW#
Dim Shared INC#
Dim Shared DOTS_PER_FRAME%
Dim Shared TOTAL_FRAMES%
Dim Shared THIS_FRAME%
Dim Shared SW
Dim Shared SH
Dim Shared CX
Dim Shared CY

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Screen _NewImage(SW, SH, 32)

C_GOLD = _RGB(255, 215, 0)
C_BLUE = _RGB(8, 8, 255)
C_MIDNIGHT = _RGB(20, 20, 64)
C_CRIMSON = _RGB(142, 42, 42)

DOTS_PER_FRAME% = 1750
TOTAL_FRAMES% = 350
THIS_FRAME% = 0

U0# = 0.7
U1# = 0.92
UX# = U1# - U0#

UNOW# = U0#
INC# = UX# / TOTAL_FRAMES%


' Time to Set Up Screen Recorder
Print "Press a Key to Begin"
Sleep 30


Background

Do
    _Limit 60
    Render
    If InKey$ = Chr$(27) Then
        Exit Do
    End If
Loop

End


' Angle for Next Pattern Point
Function Theta (xn, yn)
    n = 1 + xn * xn + yn * yn
    Theta = (0.4 - 6 / n)
End Function

' Advance to the Next Pattern Point
Sub Advance (u, pt())
    xn = pt(1)
    yn = pt(2)
    t = Theta(xn, yn)
    ct = Cos(t)
    st = Sin(t)
    pt(1) = u * (xn * ct - yn * st) + 1
    pt(2) = u * (xn * st + yn * ct)
End Sub

' Render a Single Frame
Sub Render ()
    If (THIS_FRAME% >= TOTAL_FRAMES%) Then
        THIS_FRAME% = 0
        UNOW# = U0#
        Background
    Else
        THIS_FRAME% = THIS_FRAME% + 1
        UNOW# = UNOW# + INC#
        u = Round(UNOW#, 3)
        Locate 2, 2
        Print " U = "; u; " "
        Locate 4, 2
        Print " Frame = "; THIS_FRAME%; " "
    End If
    Dim pt(2)
    pt(1) = 0: pt(2) = 0
    For i = 1 To DOTS_PER_FRAME%
        Advance UNOW#, pt()
        x = 200 * pt(1): y = 200 * pt(2)
        ' Vary Color Based on U
        k = (UNOW# - U0#) / UX#
        cr = Int(42 * k + (1 - k) * 182)
        cg = Int(42 * k + (1 - k) * 142)
        cb = Int(42 * k)
        c = _RGB(cr, cg, cb)
        PSet (CX + x - 150, CY - y - 120), c
    Next i
End Sub

Sub Background
    c = _RGB(22, 22, 255)
    Line (1, 1)-(SW - 1, SH - 1), c, BF
End Sub

Function Round (n!, digits%)
    k% = 10 ^ digits%
    n! = Int(n! * k% + 0.5)
    Round = n! / k%
End Function

' Used During Testing & Debugging
Sub RandomPoint (pt())
    pt(1) = Rnd * SW - CX
    pt(2) = Rnd * SH - CY
End Sub


