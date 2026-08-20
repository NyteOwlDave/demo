
'
' NyteOwlDave ~ 2026-AUG-19
'
' This is just the Turtle Graphics and Some Test Code
' Complete Serpentine Demo is Forthcoming...
'
' Hint : The "Serpent" is Both Smart & Hungry
'
' Platform : QB64 Phoenix
'

_Title "Serpentine"

Const D2R# = _Pi / 180
Const R2D# = 180 / _Pi

SW& = 1200: SH& = 800

Screen _NewImage(SW&, SH&, 32)
Window (-600, -400)-(600, 400)

Type Vec2
    x As Double
    y As Double
End Type

Type Size2
    w As Double
    h As Double
End Type

Type Polar2
    rho As Double
    theta As Double
End Type

Type Turtle
    x As Double
    y As Double
    facing As Double
End Type

Dim Shared pt(10) As Vec2
Dim Shared pv(10) As Polar2
Dim Shared sz(10) As Size2
Dim Shared terry As Turtle
Dim Shared markers As Integer
Dim Shared fgc As _Unsigned Integer

SnakeTest
'SpinningBarsTest
Sleep: End


' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' Snake
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sub SnakeTest

    markers = 1.5

    dst# = 70
    gap# = dst# / 4
    deg# = 95
    swing# = 12.5

    pt(0).x = 0
    pt(0).y = 0

    sz(0).w = gap#
    sz(0).h = dst#

    Color , _RGB32(7, 12, 42)
    Cls

    Print "Snake Test"

    For n = 1 To 10

        GoldPen (n + 2) / 12
        DrawBar pt(0), sz(0), deg#

        Face deg#
        Skip dst# - 0.5 * gap#

        pt(0).x = terry.x
        pt(0).y = terry.y

        deg# = deg# + swing#

        swing# = swing# * 0.95

    Next n

    DrawBar pt(0), sz(0), deg#

    Color _RGB32(100, 200, 100)
    Circle (400, 300), 20
    Paint (400, 300)

End Sub

' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' Spinning Bars
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sub SpinningBarsTest
    markers = 0

    pt(0).x = 0
    pt(0).y = 0

    sz(0).w = 5
    sz(0).h = 50

    phase# = 20

    Color , _RGB32(7, 12, 42)
    Cls

    For n = 8.0 To 1.0 Step -.4
        sz(1).w = sz(0).w * n
        sz(1).h = sz(0).h * n
        GoldPen n / 8.0
        For deg# = 0 To 360 Step 30
            DrawBar pt(0), sz(1), deg# + phase#
        Next deg#
        phase# = phase# + 3.33
    Next n
End Sub


Sub DrawBar (anchor As Vec2, size As Size2, angle#)
    hw = size.w / 2 ' Width Should be the Smaller Dimension
    MoveTo anchor ' Axis of Rotation
    FillArea anchor
    Face angle# + 180 ' Skip back a half width step
    Skip hw
    Turn 90 ' To the left a half step
    Walk hw
    Turn 90 ' To the left a full height step
    Walk size.h
    Turn 90 ' To the left a full width step
    Walk size.w
    Turn 90 ' To the left another full height step
    Walk size.h
    Turn 90 ' Final half width step to close the outline
    Walk hw
    DrawMarker anchor
End Sub

Sub FillArea (pt As Vec2)
    '    Paint (pt.x, pt.y), fgc, fgc
End Sub

Sub DrawMarker (pt As Vec2)
    If markers > 0 Then
        Circle (pt.x, pt.y), markers, _RGB32(240, 120, 62)
    End If
End Sub


' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' Turtle Graphics
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Function CleanAngle# (t As Double)
    While t < 0
        t = t + 360
    Wend
    While t >= 360
        t = t - 360
    Wend
    CleanAngle# = t
End Function

Sub Ray (pv As Polar2, rv As Vec2)
    rv.x = pv.rho * Cos(pv.theta * D2R#)
    rv.y = pv.rho * Sin(pv.theta * D2R#)
End Sub

Sub TerryRay (distance#, rv As Vec2)
    theta# = terry.facing * D2R
    rv.x = distance# * Cos(theta#)
    rv.y = distance# * Sin(theta#)
End Sub

Sub Turn (degrees#)
    terry.facing = CleanAngle#(terry.facing + degrees#)
End Sub

Sub Face (degrees#)
    terry.facing = CleanAngle#(degrees#)
End Sub

Sub MoveTo (pt As Vec2)
    terry.x = pt.x
    terry.y = pt.y
End Sub

Sub MoveBy (rv As Vec2)
    terry.x = terry.x + rv.x
    terry.y = terry.y + rv.y
End Sub

Sub Skip (distance#)
    Dim rv As Vec2
    TerryRay distance#, rv
    MoveBy rv
End Sub

Sub Walk (distance#)
    Dim rv As Vec2
    TerryRay distance#, rv
    x1 = terry.x: y1 = terry.y
    x2 = x1 + rv.x: y2 = y1 + rv.y
    Line (x1, y1)-(x2, y2)
    terry.x = x2
    terry.y = y2
End Sub

Sub LookAt (pt As Vec2)
    dx# = pt.x - terry.x
    dy# = pt.y - terry.y
    rad# = _Atan2(dy#, dx#)
    terry.facing = rad# * R2D
End Sub

Sub GoldPen (luma#)
    r% = Int(luma# * 255)
    g% = Int(luma# * 215)
    b% = Int(luma# * 15)
    c& = _RGB32(r%, g%, b%)
    Color c&
    fgc = c&
End Sub


