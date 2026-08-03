
'
' NyteOwlDave, 2026-AUG-03
' Based on YouTube Video:
' https://www.youtube.com/watch?v=AcZLWCho2ro
' Ported to QB64 Phoenix Edition
' Dedicated to the BASIC Programmers "Gang"
'

_Title "Depth Sphere Demo"


Dim Shared SW, SH, CX, CY
Dim Shared radius!, scale!

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Screen _NewImage(SW, SH, 32)

Dim Shared depths(SW, SH) As Single

radius! = 0.45 * Minimum(SW, SH)
scale! = 1 / radius! ' For Unit Sphere

DepthSphere

Background 20, 20, 64
DrawSphere 255, 215, 32

Sleep
End


' Draw Shaded Hemisphere
Sub DrawSphere (r, g, b)
    For i = 1 To SW
        x = i - 1
        For j = 1 To SH
            y = j - 1
            z = depths(i, j)
            If z > 0.004 Then
                c = _RGB(r * z, g * z, b * z)
                PSet (x, y), c
            End If
        Next j
    Next i
End Sub

' Hemispherical Depth Map ( For 3D Z-Axis )
' Maps the Visible ( Front ) Side Only
' Range = [ 0.0, ... 1.0 ]
Sub DepthSphere ()
    For i = 1 To SW
        For j = 1 To SH
            depths(i, j) = Depth(i - 1, j - 1)
        Next j
    Next i
End Sub

' Single Z-Depth at 2D Coordinates
' Range = [ 0.0, ... 1.0 ]
Function Depth! (x, y)
    d! = Dist!(x, y, CX, CY) * scale!
    If (d! < 1) Then
        ' Inside Sphere
        Depth! = (1 - (d! * d!))
    Else
        ' Outside Sphere
        Depth! = 0
    End If
End Function

' Minimum of Two Values
Function Minimum (a, b)
    If (b < a) Then
        Minimum = b
    Else
        Minimum = a
    End If
End Function

' 2D Vector Dot Product w/ Self
Function DotSelf! (a!, b!)
    DotSelf! = a! * a! + b! * b!
End Function

' Distance Between 2D Points
' or Line Segment Length
Function Dist! (x1, y1, x2, y2)
    dx! = (x2 - x1)
    dy! = (y2 - y1)
    Dist! = _Hypot(dx!, dy!)
End Function

' Fill Rectangle
Sub FillRect (x, y, w, h, c&)
    x2 = x + w - 1
    y2 = y + h - 1
    Line (x, y)-(x2, y2), c&, BF
End Sub

' Background Fill
Sub Background (r, g, b)
    c& = _RGB(r, g, b)
    Line (0, 0)-(SW, SH), c&, BF
End Sub



