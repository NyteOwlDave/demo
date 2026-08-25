
_Title "Line Intersection"

Type Point2
    x As Double
    y As Double
End Type

Type Line2
    xs As Double ' Start Point
    ys As Double
    xe As Double ' End Point
    ye As Double
End Type

Type Vec2
    dx As Double
    dy As Double
End Type

Screen _NewImage(800, 800, 32)

Window (-400, -400)-(400, 400)

Dim Shared TINY#
Dim Shared C_GOLD&
Dim Shared C_BLUE&
Dim Shared C_LIME&
Dim Shared C_ROSE&

TINY# = 1E-8
C_GOLD& = _RGB32(255, 215, 15)
C_BLUE& = _RGB32(8, 8, 42)
C_LIME& = _RGB32(100, 205, 100)
C_ROSE& = _RGB32(205, 100, 100)

TestSingle
' TestMultiple

Sleep: End

' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sub TestSingle ()

    Color C_GOLD&, C_BLUE&
    Cls

    Dim A1 As Point2: Dim A2 As Point2
    Dim B1 As Point2: Dim B2 As Point2
    Dim L1 As Line2: Dim L2 As Line2

    A1.x = -300: A1.y = -320
    A2.x = 300: A2.y = 360

    B1.x = -330: B1.y = 320
    B2.x = 370: B2.y = -285

    SetPoints A1, A2, L1
    SetPoints B1, B2, L2

    DrawBoth L1, C_LIME&
    DrawBoth L2, C_ROSE&
    DrawIntersection L1, L2

End Sub

Sub TestMultiple ()

    Color C_GOLD&, C_BLUE&
    Cls

    Dim A1 As Point2: Dim A2 As Point2
    Dim B1 As Point2: Dim B2 As Point2
    Dim L1 As Line2: Dim L2 As Line2

    SetPoint -10, -390, A1
    SetPoint 20, 380, A2
    SetPoints A1, A2, L1
    DrawBoth L1, C_LIME&

    For i = -4 To 4
        y2# = i * 750 / 9 + 5
        x2# = Rnd * 70 + 200
        y1# = y2# - (5 + 10 * Rnd)
        x1# = (5 + 10 * Rnd) - x2#
        SetPoint x1#, y1#, B1
        SetPoint x2#, y2#, B2
        SetPoints B1, B2, L2
        DrawBoth L2, C_ROSE&
        DrawIntersection L1, L2
    Next i

End Sub

' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sub GetPoints (lo As Line2, ps As Point2, pe As Point2)
    ps.x = lo.xs: ps.y = lo.ys
    pe.x = lo.xe: pe.y = lo.ye
End Sub

Sub SetPoints (ps As Point2, pe As Point2, lo As Line2)
    lo.xs = ps.x: lo.ys = ps.y
    lo.xe = pe.x: lo.ye = pe.y
End Sub

Sub SetPoint (x#, y#, o As Point2)
    o.x = x#
    o.y = y#
End Sub

Sub SetVec (dx#, dy#, v As Vec2)
    v.dx = dx#
    v.dy = dy#
End Sub

Sub VecSub (pe As Point2, ps As Point2, v As Vec2)
    v.dx = pe.x - ps.x
    v.dy = pe.y - ps.y
End Sub

Sub VecLine (o As Line2, v As Vec2)
    Dim ps As Point2
    Dim pe As Point2
    GetPoints o, ps, pe
    VecSub pe, ps, v
End Sub

Function VecPerpDot# (va As Vec2, vb As Vec2)
    xy# = va.dx * vb.dy
    yx# = va.dy * vb.dx
    VecPerpDot# = (xy# - yx#)
End Function

' Scalar Ray Projection
Function Proj# (a#, b#, c#)
    Proj# = (a# + b# * c#)
End Function

' Vector Ray Projection
Sub VecProj (ps As Point2, dist#, dv As Vec2, pe As Point2)
    pe.x = Proj#(ps.x, dist#, dv.dx)
    pe.y = Proj#(ps.y, dist#, dv.dy)
End Sub

Sub Intersect (la As Line2, lb As Line2, poi As Point2)
    Dim S As Point2: S.x = la.xs: S.y = la.ys
    Dim T As Point2: T.x = lb.xs: T.y = lb.ys
    Dim U As Vec2: VecLine la, U
    Dim V As Vec2: VecLine lb, V
    delta# = VecPerpDot#(U, V)
    If (Abs(delta#) < TINY#) Then
        ' Ignore Parallel Lines
        Exit Sub
    End If
    p# = (T.x - S.x) * V.dy
    q# = (T.y - S.y) * V.dx
    mu# = (p# - q#) / delta#
    VecProj S, mu#, U, poi
End Sub

' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sub FillCircle (x#, y#, r#)
    For j# = -r# To r# Step 1
        v# = y# + j#
        t# = _Asin(j# / r#)
        u# = Int(r# * Cos(t#))
        us# = x# - u#
        ue# = x# + u#
        Line (us#, v#)-(ue#, v#)
    Next j#
End Sub

Sub DrawPoint (o As Point2)
    FillCircle o.x, o.y, 10.0
End Sub

Sub DrawLine (o As Line2)
    Line (o.xs, o.ys)-(o.xe, o.ye)
End Sub

Sub DrawBoth (o As Line2, c&)
    Dim ps As Point2
    Dim pe As Point2
    GetPoints o, ps, pe
    Color C_GOLD&
    DrawLine o
    Color c&
    DrawPoint ps
    DrawPoint pe
End Sub

Sub DrawIntersection (la As Line2, lb As Line2)
    Dim poi As Point2
    Intersect la, lb, poi
    Color C_GOLD&
    DrawPoint poi
    Circle (poi.x, poi.y), 13
End Sub

Sub ShowPoint (po As Point2)
    Locate 2, 2
    Print po.x, po.y
End Sub

Sub ShowVec (vo As Vec2)
    Locate 2, 2
    Print vo.dx, vo.dy
End Sub

Sub ShowLine (lo As Line2)
    Locate 2, 2
    Print lo.xs, lo.ys, " TO ", lo.xe, lo.ye
End Sub


