' ******************
' * Voogel18.BAS   *
' * GW-BASIC       *
' ******************
' Author Richard Keitjzer
' Original Platform : PC-BASIC
' Ported to QB64 Phoenix
' by NyteOwlDave ~ 2026-AUG-23

_Title "Voogel 18 ~ Richard Keijzer"

Screen 9

Color 14, 1

Dim X(13), Y(13)
Window (0, 0)-(640, 350): Rem O,0 lower left

Z = 2.1
XL = 245: YL = 152 ' The Lure
Circle (XL, YL), 3, 12
For N = 1 To 13: Read X(N), Y(N): Next N
For YB = 15 To 315 Step 25
    For XB = 20 To 620 Step 35
        XD = XL - XB: YD = YL - YB
        If XD = 0 Then THETA = 1.571 Else THETA = Atn(YD / XD) - _Pi
        If XD < 0 Then THETA = THETA - _Pi
        COST = Cos(THETA): SINT = Sin(THETA)
        For N = 1 To 13
            X2 = X(N): Y2 = Y(N)
            XT = X2 * COST - Y2 * SINT
            YT = X2 * SINT + Y2 * COST
            X3 = Z * XT * 1.4 + XB: Y3 = Z * YT + YB
            If N > 1 Then Line (X3, Y3)-(XA, YA), 14
            XA = X3: YA = Y3
        Next N
    Next XB
Next YB

Sleep: End

Data -5,0,-3.5,0.7,0.5,0.3,1,4,2,4,3,1,5,0
Data 3,-1,2,-4,1,-4,0.5,-0.3,-3.5,-0.7,-5,0


