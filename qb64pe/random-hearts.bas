
' Random Hearts
' Platform : QB64 Phoenix
' Ported by NyteOwlDave
' Updated ~ 2026-AUG-29
' Original Author   : Aurel Wizard
' Original Platform : SpecBAS

_Title "Random Hearts ~ Aurel Wizzard"

Randomize Timer

Dim Shared SW As Long
Dim Shared SH As Long

Dim Shared CX As Long
Dim Shared CY As Long

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Screen _NewImage(SW, SH, 32)

Dim Shared C_BGND As Long
Dim Shared C_FGND As Long

C_BGND = _RGB32(42, 0, 0)
C_FGND = _RGB32(255, 215, 15)

Setup
Render (75)
'DrawHeart

Sleep: End


' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sub Setup ()
    Color C_FGND, C_BGND
    Cls
End Sub

Sub Render (count)
    If (count < 1) Then count = 10
    While (count > 0)
        count = count - 1
        DrawHeart
    Wend
End Sub

Sub DrawHeart ()
    x1 = IRand(SW): y1 = IRand(SH)
    xo = 0: yo = 0
    j = 1: p = Rnd * 45 + 5
    rc% = IRand(250)
    gc% = IRand(250)
    Color _RGB32(rc%, gc%, 0)
    While (I < 1.57)
        j = -j
        x = x1 + xo + p * j * I
        a = Sqr(Abs(Cos(I)))
        b = Cos(313 * I)
        C = Sqr(Abs(I))
        y = y1 + yo + p * (a * b - C)
        PSet (x, y)
        I = I + 0.0005
    Wend
End Sub

Function IRand# (k)
    IRand# = Int(Rnd * k)
End Function



