Cls
Screen 12

XNEW = 0: YNEW = 0
XOLD = 0: YOLD = 0

XA = 6: YA = 5: ZA = 11: XB = 15: YB = 4: ZB = -13

For Y = 0 To 10
    For X = 0 To 20
        T = X
        DrawT
    Next X
Next Y

For X = 0 To 20
    For Y = 0 To 10
        T = Y
        DrawT
    Next Y
Next X

Sub DrawT ()

    XNEW = X * 20 + 10 * Y: Rem subroutine
    L = Sqr((XA - X) ^ 2 + (YA - Y) ^ 2) + 1: Rem distance
    L2 = Sqr((XB - X) ^ 2 + (YB - Y) ^ 2) + 1: Rem 2nd distance
    YNEW = 200 - Y * 5 - 10 * (ZA / L + ZB / L2)
    If T > 0 Then Line (XOLD, YOLD)-(XNEW, YNEW), 10
    XOLD = XNEW: YOLD = YNEW

End Sub
