
_Title "Progress Bars"

Dim Shared SW, SH
Dim Shared C_BGND, C_BORDER, C_BAR

SW = 800: SH = 800

Screen _NewImage(SW, SH, 32)

C_BGND = _RGB32(20, 20, 64)
C_BORDER = _RGB32(212, 190, 84)
C_BAR = _RGB32(255, 215, 32)

bars% = (SW \ 40) - 1

For y% = 0 To bars%
    DrawProgress y% * 40, 0.2 + Rnd * 0.8
Next y%

Sleep
End

' Draw Progress Bar
Sub DrawProgress (y%, ratio#)
    x% = 10: x2% = SW - 10
    y2% = y% + 32
    Line (x%, y%)-(x2%, y2%), C_BGND, BF
    Line (x%, y%)-(x2%, y2%), C_BORDER, B
    x2% = x% + (x2% - x% - 4) * ratio#
    x% = x% + 2: y% = y% + 2: y2% = y2% - 2
    c& = RandomColor&
    Line (x%, y%)-(x2%, y2%), c&, BF
End Sub

Function RandomColor& ()
    r% = 96 + Rnd * 127
    g% = 96 + Rnd * 127
    b% = 96 + Rnd * 127
    RandomColor& = _RGB32(r%, g%, b%)
End Function
