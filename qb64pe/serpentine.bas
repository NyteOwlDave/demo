
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

pt(0).x = 0
pt(0).y = 0

sz(0).w = 5
sz(0).h = 50

phase# = 0


For n = 1.0 To 8.0 Step 0.4
    sz(1).w = sz(0).w * n
    sz(1).h = sz(0).h * n
    GoldPen n / 8.0
    For deg# = 0 To 360 Step 30
        DrawBar pt(0), sz(1), deg# + phase#
    Next deg#
    phase# = phase# + 7.5
Next n

Sleep: End

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

Sub DrawBar (anchor As Vec2, size As Size2, angle#)
    hw = size.w / 2
    MoveTo anchor
    Face angle# + 180
    Skip hw
    Turn 90
    Walk hw
    Turn 90
    Walk size.h
    Turn 90
    Walk size.w
    Turn 90
    Walk size.h
    Turn 90
    Walk hw
End Sub

Sub GoldPen (luma#)
    r% = Int(luma# * 255)
    g% = Int(luma# * 215)
    b% = Int(luma# * 15)
    Color _RGB32(r%, g%, b%)
End Sub


