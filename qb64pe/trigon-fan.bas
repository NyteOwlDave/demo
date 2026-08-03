' Blended Edges for a sweep second hand
' QB64PE 4.4.0
Option _Explicit
' _blend
Dim As Long wid, hgt, x0, x1, y0, y1, xc, yc
Dim As Long numradius, hubradius, armlength
Dim scr As Long
Const margin = 10
wid = _DesktopWidth - 2 * margin
hgt = _DesktopHeight - 80 - 2 * margin
wid = _Min(wid, hgt)
hgt = wid
scr = _NewImage(wid, hgt, 32)
Screen scr
_Delay 0.2
$If LINUX <> _TRUE Then
    _ScreenMove 10, 10
$End If
$Color:32
x0 = 0
x1 = wid - 1
y0 = 0
y1 = hgt - 1
xc = wid \ 2
yc = hgt \ 2
Cls , DarkGray
' first a little fun
' draw a series of overlapping wedges
Dim r As Long: r = _Min(wid, hgt) \ 2 - margin
' Dim theta As Single: theta = _Pi / 2
Dim th As Single, nslices As Long
Dim As Single th1, th2
nslices = 10
Dim i As Integer
th = 0
Dim x2, y2, x3, y3
For i = 0 To nslices - 1
    th1 = th + i * _Pi / nslices
    th2 = th + (i + 1) * _Pi / nslices
    Let x2 = xc + r * Cos(th1)
    Let y2 = yc - r * Sin(th1)
    x3 = xc + r * Cos(th2)
    y3 = yc - r * Sin(th2)
    Triangle xc, yc, x2, y2, x3, y3, _RGB(20 * i, 0, 0)
Next i
Sleep
System
Sub Triangle (x1, y1, x2, y2, x3, y3, colr As Long)
    Line (x1, y1)-(x2, y2), colr
    Line (x2, y2)-(x3, y3), colr
    Line (x3, y3)-(x1, y1), colr
    Paint ((x1 + x2 + x3) / 3, (y1 + y2 + y3) / 3), colr
End Sub

' Thoughts:
'   triangle looks gradient-filled?
'   for overlapping blended use, may need to draw triangle on
'   a buffer with a black background, then
'   copy the buffer to the screen (blending).
'   _maptriangle might be useful, to draw with rotation?




