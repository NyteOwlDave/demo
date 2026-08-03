CLS
SCREEN 9

XNEW = 0: YNEW = 0
XOLD = 0: YOLD = 0

XA = 6: YA = 5: ZA = 11: XB = 15: YB = 4: ZB = -13

FOR Y = 0 TO 10
    FOR X = 0 TO 20
        T = X
        DrawT
    NEXT X
NEXT Y

FOR X = 0 TO 20
    FOR Y = 0 TO 10
        T = Y
        DrawT
    NEXT Y
NEXT X

SUB DrawT ()

    XNEW = X * 20 + 10 * Y: REM subroutine
    L = SQR((XA - X) ^ 2 + (YA - Y) ^ 2) + 1: REM distance
    L2 = SQR((XB - X) ^ 2 + (YB - Y) ^ 2) + 1: REM 2nd distance
    YNEW = 200 - Y * 5 - 10 * (ZA / L + ZB / L2)
    IF T > 0 THEN LINE (XOLD, YOLD)-(XNEW, YNEW), 10
    XOLD = XNEW: YOLD = YNEW

END SUB

