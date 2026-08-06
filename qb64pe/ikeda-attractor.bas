
_Title "Ikeda Attractor"

Dim Shared C_MIDNIGHT
Dim Shared C_GOLD
Dim Shared U0#
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

C_GOLD = _RGB(255, 215, 15)
C_MIDNIGHT = _RGB(20, 20, 64)

DOTS_PER_FRAME% = 500
TOTAL_FRAMES% = 500
THIS_FRAME% = 0

U0# = 0.7
U1# = 0.92
UX# = U1# - U0#

UNOW# = U0#
INC# = UX# / TOTAL_FRAMES%


Background C_GOLD

Do
    _Limit 60
    Render
    If InKey$ = Chr$(27) Then
        Exit Do
    End If
Loop

End


Function Theta (xn, yn)
    n = 1 + xn * xn + yn * yn
    Theta = (0.4 - 6 / n)
End Function

Sub Advance (u, pt())
    xn = pt(1)
    yn = pt(2)
    t = Theta(xn, yn)
    ct = Cos(t)
    st = Sin(t)
    pt(1) = u * (xn * ct - yn * st) + 1
    pt(2) = u * (xn * st + yn * ct)
End Sub

Sub Render ()
    If (THIS_FRAME% >= TOTAL_FRAMES%) Then
        THIS_FRAME% = 0
        UNOW# = U0#
        Background C_GOLD
    Else
        THIS_FRAME% = THIS_FRAME% + 1
        UNOW# = UNOW# + INC#
        Locate 1, 2
        Print UNOW#; "          "
    End If
    Dim pt(2)
    pt(1) = 0.1: pt(2) = 0.1
    For i = 1 To 500 'DOTS_PER_FRAME%
        Advance UNOW#, pt()
        x = 200 * pt(1): y = 200 * pt(2)
        PSet (CX + x, CY + y), C_MIDNIGHT
    Next i
End Sub

Sub Background (c)
    Line (1, 1)-(SW - 1, SH - 1), c, BF
End Sub

Sub Test (pt())
    pt(1) = Rnd * SW - CX
    pt(2) = Rnd * SH - CY
End Sub
