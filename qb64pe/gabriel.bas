
'
' NyteOwlDave, 2026-AUG-02
' Designed with Claude
' Ported to QB64 Phoenix Edition
' Dedicated to the BASIC Programmers "Gang"
'

_Title "Gabriel's Horn Demo"

Dim Shared SW, SH, CX, CY As Integer

Dim Shared rotationX As Single
Dim Shared rotationY As Single
Dim Shared scaleX As Integer
Dim Shared scaleY As Integer

Dim Shared cosX, sinX, cosY, sinY As Single

Dim Shared segments As Integer
Dim Shared rings As Integer

SW = 1000: CX = SW \ 4
SH = 800: CY = SH \ 2

Screen _NewImage(SW, SH, 32)

rotationX = 20
rotationY = 40
segments = 50
rings = 25

DEG2RAD = _Pi / 180
RAD2DEG = 180 / _Pi

' Precalculate Transformation
cosX = Cos(rotationX * DEG2RAD)
sinX = Sin(rotationX * DEG2RAD)
cosY = Cos(rotationY * DEG2RAD)
sinY = Sin(rotationY * DEG2RAD)
scaleX = 100
scaleY = 250

' Horn Shape
Dim Shared points(rings, segments, 3) As Single

' Transformed Shape (3D projected into 2D)
Dim Shared projected(rings, segments, 3) As Single

' Place these inside a loop for animation
GeneratePoints
ProjectPoints
DrawHorn


Sleep
End


Sub FillRect (x, y, w, h, c)
    x2 = x + w - 1
    y2 = y + h - 1
    Line (x, y)-(x2, y2), c, BF
End Sub

Sub LineSeg (p0() As Single, p1() As Single, c)
    x = p0(1): x2 = p1(1)
    y = p0(2): y2 = p1(2)
    Line (x, y)-(x2, y2), c
End Sub

Sub ReadProjected (i, j, pt() As Single)
    pt(1) = projected(i, j, 1)
    pt(2) = projected(i, j, 2)
End Sub

Sub WriteProjected (i, j, pt() As Single)
    projected(i, j, 1) = pt(1)
    projected(i, j, 2) = pt(2)
End Sub

Sub DrawHorn ()

    C_BGND = _RGB(1, 10, 32)
    C_RING = _RGBA(78, 208, 234, 170)
    C_LONGITUDE = _RGBA(78, 208, 204, 196)
    C_MERIDIAN = _RGB(255, 107, 107)
    C_AXIS = _RGB(255, 205, 25)

    Dim p0(3) As Single
    Dim p1(3) As Single

    FillRect 0, 0, SW, SH, C_BGND

    DrawAxes C_AXIS

    ' Draw longitudinal lines (along the horn)
    For j = 1 To segments
        For i = 1 To rings - 1
            k = i + 1
            ReadProjected i, j, p0()
            ReadProjected k, j, p1()
            LineSeg p0(), p1(), C_LONGITUDE
        Next i
    Next j

    ' Draw Rings
    For i = 1 To rings
        For j = 1 To segments - 1
            k = j + 1
            ReadProjected i, j, p0()
            ReadProjected i, k, p1()
            LineSeg p0(), p1(), C_MERIDIAN
        Next j
        ' Close the Ring
        ReadProjected i, 1, p0()
        LineSeg p1(), p0(), C_MERIDIAN
    Next i


    ' Draw a few highlighted meridians
    For j = 1 To segments Step (segments \ 8)
        For i = 1 To rings - 1
            k = i + 1
            ReadProjected i, j, p0()
            ReadProjected k, j, p1()
            LineSeg p0(), p1(), C_MERIDIAN
        Next i
    Next j

End Sub

' Generate Gabriel's Horn Points
Sub GeneratePoints ()
    ' Draw Only X = [ 1 ... 6 ]
    startX = 1
    endX = 8
    spanX = endX - startX
    ' For each ring (i.e. regular polygon)
    For i = 1 To rings
        ' Essense of the Horn Concept
        x = startX + spanX * (i / rings)
        radius = 1 / x
        ' Plot ring's vertices
        For j = 1 To segments
            angle = (j / segments) * 2 * _Pi
            y = radius * Cos(angle)
            z = radius * Sin(angle)
            points(i, j, 1) = x
            points(i, j, 2) = y
            points(i, j, 3) = z
        Next j
    Next i
End Sub

Sub ProjectPoints ()
    For i = 1 To rings
        For j = 1 To segments
            ProjectPoint i, j
        Next j
    Next i
End Sub

Sub ProjectPoint (i, j)

    x = points(i, j, 1)
    y = points(i, j, 2)
    z = points(i, j, 3)

    ' Rotate around X axis
    y1 = y * cosX - z * sinX
    z1 = y * sinX + z * cosX

    ' Rotate around Y axis
    x2 = x * cosY + z1 * sinY
    z2 = -x * sinY + z1 * cosY

    ' Project to 2D
    projected(i, j, 1) = CX + x2 * scaleX
    projected(i, j, 2) = CY - y1 * scaleY
    projected(i, j, 3) = z2

End Sub

Sub DrawAxes (c)
    Line (0, CY)-(SW, CY), c
    Line (CX, 0)-(CX, SH), c
End Sub

