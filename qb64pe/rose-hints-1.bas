
_Title "Stained Glass Rose"

Dim Shared C_GOLD&, C_GOLD2&

Screen _NewImage(800, 800, 32)

Window (-6, -6)-(6, 6)

C_GOLD& = _RGB32(255, 215, 0)
C_GOLD2& = _RGB32(255, 215, 15)

Dim pt(2)

' Draw the Wavy Spiral and Petal Separator Spokes
i = 0
For t = 0 To 12.1 * _Pi Step 0.001
    PlotSample t
    i = i + 1
    If ((0 = (i Mod 400)) And (i < 22000)) Then
        r = Rho(t)
        PlotRay r, t, pt()
        x1 = pt(1): y1 = pt(2)
        r = Rho(t + 2 * _Pi)
        PlotRay r, t, pt()
        x2 = pt(1): y2 = pt(2)
        Line (x1, y1)-(x2, y2), C_GOLD2&
    End If
Next t

' Innermost Area
Paint (0.2, 0.1), _RGB32(75, 5, 5), C_GOLD2&


' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' Was Easier for Me to think in Degrees
' and Larger Coord Space for Petal Painting
Window (-100, -100)-(100, 100)


' Next few Petals w/ Speckles
r = 30
For t = _Pi / 5 To _Pi * 1.4 Step _Pi / 8
    x = Int(r * Cos(t)): y = Int(r * Sin(t))
    Paint (x, y), _RGB32(95, 7, 7), C_GOLD2&
    Circle (x, y), 0.25, _RGB32(150, 50, 40)
Next t

' Next few Petals w/ Speckles
r = 39
For t = t + _Pi / 24 To _Pi * 2.3 Step _Pi / 8
    x = Int(r * Cos(t)): y = Int(r * Sin(t))
    Paint (x, y), _RGB32(95, 7, 7), C_GOLD2&
    Circle (x, y), 0.25, _RGB32(150, 50, 40)
Next t

' Next few Petals w/ Speckles
r = 44
For t = t To _Pi * 3.2 Step _Pi / 8
    x = Int(r * Cos(t)): y = Int(r * Sin(t))
    Paint (x, y), _RGB32(125, 27, 15), C_GOLD2&
    Circle (x, y), 0.25, _RGB32(150, 50, 40)
Next t

' Next few Petals w/ Speckles
r = 46.2
For t = t To _Pi * 3.7 Step _Pi / 8
    x = Int(r * Cos(t)): y = Int(r * Sin(t))
    Paint (x, y), _RGB32(165, 37, 19), C_GOLD2&
    Circle (x, y), 0.25, _RGB32(150, 50, 40)
Next t

' Next few Petals w/ Speckles
r = 48
For t = 0.1 + t To _Pi * 4.1 Step _Pi / 8
    x = Int(r * Cos(t)): y = Int(r * Sin(t))
    Paint (x, y), _RGB32(195, 57, 29), C_GOLD2&
    Circle (x, y), 0.25, _RGB32(150, 50, 40)
Next t

' Start Point is Last Plotted "Speckle"
pt(1) = x: pt(2) = y

' Shoot Rays from Point to Point
' Each Lands Inside a Petal for Painting
' This Would Be Cleaner as DATA Statements
' and a Loop

r = 20: t = D2R(100)
PaintNextPetal r, t, pt(), _RGB32(155, 95, 20)

r = 20: t = D2R(120)
PaintNextPetal r, t, pt(), _RGB32(165, 115, 20)

r = 16: t = D2R(155)
PaintNextPetal r, t, pt(), _RGB32(175, 135, 20)

r = 25: t = D2R(175)
PaintNextPetal r, t, pt(), _RGB32(185, 145, 30)

r = 15: t = D2R(182)
PaintNextPetal r, t, pt(), _RGB32(195, 165, 30)

r = 16: t = D2R(214)
PaintNextPetal r, t, pt(), _RGB32(175, 135, 20)

r = 24: t = D2R(234)
PaintNextPetal r, t, pt(), _RGB32(165, 115, 20)

r = 19: t = D2R(260)
PaintNextPetal r, t, pt(), _RGB32(150, 85, 18)

r = 34: t = D2R(288)
PaintNextPetal r, t, pt(), _RGB32(185, 145, 30)

r = 11: t = D2R(292)
PaintNextPetal r, t, pt(), _RGB32(165, 115, 32)

r = 15: t = D2R(335)
PaintNextPetal r, t, pt(), _RGB32(175, 135, 20)

r = 16: t = D2R(338)
PaintNextPetal r, t, pt(), _RGB32(175, 135, 20)

r = 16: t = D2R(356)
PaintNextPetal r, t, pt(), _RGB32(165, 75, 19)

r = 16: t = D2R(22)
PaintNextPetal r, t, pt(), _RGB32(175, 55, 14)

r = 15: t = D2R(28)
PaintNextPetal r, t, pt(), _RGB32(115, 5, 4)

r = 15: t = D2R(42)
PaintNextPetal r, t, pt(), _RGB32(115, 5, 4)

r = 14: t = D2R(68)
PaintNextPetal r, t, pt(), _RGB32(135, 25, 14)

r = 33: t = D2R(87)
PaintNextPetal r, t, pt(), _RGB32(175, 45, 45)

r = 16: t = D2R(118)
PaintNextPetal r, t, pt(), _RGB32(205, 115, 105)

r = 31: t = D2R(133)
PaintNextPetal r, t, pt(), _RGB32(195, 85, 45)

r = 14: t = D2R(170)
PaintNextPetal r, t, pt(), _RGB32(175, 45, 37)

r = 14: t = D2R(180)
PaintNextPetal r, t, pt(), _RGB32(165, 37, 31)

r = 25: t = D2R(185)
PaintNextPetal r, t, pt(), _RGB32(145, 47, 74)

r = 23: t = D2R(230)
PaintNextPetal r, t, pt(), _RGB32(125, 77, 94)

r = 27: t = D2R(236)
PaintNextPetal r, t, pt(), _RGB32(55, 67, 124)

r = 76: t = D2R(298)
PaintNextPetal r, t, pt(), _RGB32(35, 43, 97)

r = 65: t = D2R(7)
PaintNextPetal r, t, pt(), _RGB32(31, 40, 117)

r = 50: t = D2R(65)
PaintNextPetal r, t, pt(), _RGB32(64, 32, 107)

Sleep
End

' Plot and Draw Sample Point
' For Wavy Spiral Line
Sub PlotSample (theta)
    r = Rho(theta)
    x = r * Cos(theta)
    y = r * Sin(theta)
    PSet (x, y), _RGB32(255, 215, 15)
End Sub

' Plot Ray from Origin (0,0)
Sub PlotRay (r, t, pt())
    pt(1) = r * Cos(t)
    pt(2) = r * Sin(t)
End Sub

' Advance Ray from Existing Point
Sub AdvanceRay (r, t, pt())
    pt(1) = pt(1) + r * Cos(t)
    pt(2) = pt(2) + r * Sin(t)
End Sub

' Used While Coding to Determine Ray Params
Sub ShootRay (r, t, pt(), c&)
    x1 = pt(1): y1 = pt(2)
    AdvanceRay r, t, pt()
    x2 = pt(1): y2 = pt(2)
    Line (x1, y1)-(x2, y2), c&
End Sub

' Shoot Ray to Next Point and Paint The Area
Sub PaintNextPetal (r, t, pt(), c&)
    'AdvanceRay r, t, pt()
    'x = pt(1): y = pt(2)
    'Paint (x, y), c&, C_GOLD2&
    ShootRay r, t, pt(), _RGB32(60, 255, 255)
    Oval pt()
End Sub

Sub Oval (pt())
    x = pt(1): y = pt(2)
    Circle (x, y), 2.2, _RGB32(60, 255, 255)
End Sub

' Here's where we get our wavy spiral
Function Rho (theta)
    Rho = 1.05 * Log(1 + theta) + 0.15 * Sin(3 * theta ^ (1.2))
End Function

Function R2D (r)
    R2D = r * 180 / _Pi
End Function

Function D2R (d)
    D2R = d * _Pi / 180
End Function

' For Debugging
Sub Pip (x, y, pt())
    Locate x, y: Print pt(1); pt(2)
End Sub


