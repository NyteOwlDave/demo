' Poincare disk             K Moerman 2026
' relation between coord. on plane (x,y) and coord. on Poincare disk (xd,yd)
' r=sqr(x^2 + y^2)
' xd = tanh(r / 2) * x / r
' yd = tanh(r / 2) * y / r

DefDbl A-Z ' variables without postfix are double precision float numbers iso. single  precision

Const W = 950, HW = W / 2
Const linecol& = _RGB32(80, 255, 80)
Const D = 8 ' max coord. of plane figure before conversion to Poincare disk
Const S = .45 ' size of one line drawing sector in plane figure before conversion to Poincare disk

Screen _NewImage(W, W, 32)
' calc. maximum coordinate the Poincare disk will reach
r = Sqr(2) * D: xymax = Sqr(2) * TANH(r / 2) * D / r
Window (-xymax, -xymax)-(xymax, xymax) ' scaling coordinate system automatically
_Title "Poincare Disk"
Do
    For ds = 0 To 2 * S - S / 120 Step S / 120 ' animation loop, translates figure in x and y dir.
        Cls
        For xs = -D To D Step 2 * S ' drawing the set of line drawings
            For ys = -D To D Step 2 * S
                DrawSector xs + ds, ys + ds, S
            Next ys
        Next xs
        _Display
        _Limit 60
    Next ds
Loop

' draw 1 line drawing centered around xs,ys with size s before conversion to Poincare disk
Sub DrawSector (xs, ys, s)
    For ds = 0 To s Step s / 9
        PoincareLine xs + ds, ys, xs, ys + s - ds, linecol&
        PoincareLine xs + ds, ys, xs, ys - s + ds, linecol&
        PoincareLine xs - ds, ys, xs, ys + s - ds, linecol&
        PoincareLine xs - ds, ys, xs, ys - s + ds, linecol&
    Next ds
End Sub

' draw a line on the Poincare disk, coordinates of start and end points are converted
Sub PoincareLine (x1, y1, x2, y2, col&)
    ' converting x and y coord from plane (x,y) to Poincare disk (xd,yd)
    ' r=sqr(x^2 + y^2)
    ' xd = tanh(r / 2) * x / r
    ' yd = tanh(r / 2) * y / r
    r = _Hypot(x1, y1)
    tanhr = TANH(r / 2)
    p_x1 = tanhr * x1 / r
    p_y1 = tanhr * y1 / r
    r = _Hypot(x2, y2)
    tanhr = TANH(r / 2)
    p_x2 = tanhr * x2 / r
    p_y2 = tanhr * y2 / r
    Line (p_x1, p_y1)-(p_x2, p_y2), col&
End Sub

' From QB64 help Hyperbolic Tangent or SINH(x) / COSH(x)
Function TANH (x)
    TANH = (Exp(2 * x) - 1) / (Exp(2 * x) + 1)
End Function

