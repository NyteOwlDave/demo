
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
