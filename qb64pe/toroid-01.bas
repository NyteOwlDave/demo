
' Toroid Shape
' Sinclair QL
' Jonathan D. Gilbert
' David Mainprize
' NyteOwl Dave

_Title "Toroid ~ D. Gilbert"

SW = 800: SH = 600

Screen _NewImage(SW, SH, 32)

Window (-2, 1.5)-(2, -1.5)

Color _RGB32(255, 215, 12), _RGB32(8, 8, 64)
Cls

TAU = 2 * _Pi


CAMDIST = 4.5

' Presentation angle: 30 degrees
A3 = -30 * TAU / 360
C3 = Cos(A3): S3 = Sin(A3)

'Presentation offset: move up a bit
OY = .75
A1 = 0: A2 = 0

' Loop Counter and Bound
limit = 2500000: inc = 0

Do
    A1 = A1 + .1
    If A1 >= TAU Then A1 = A1 - TAU

    A2 = A2 + (Cos(A1) + 1.2) * 2E-2
    If A2 >= TAU Then A2 = A2 - TAU

    ' Generate pointo n surface of tube at angle 0
    X1 = Cos(A1) + 3: Y = Sin(A1)

    ' Rotate (top-down) to correct position in tube. Y is unchanged.
    C2 = Cos(A2): S2 = Sin(A2)
    X = X1 * C2
    Z = X1 * S2

    ' Rotate (from side) for presentation. X is unchanged.
    YY = Y * C3 - Z * S3
    ZZ = Y * S3 + Z * C3

    ' Vertical offset.
    YY = YY + OY

    ' Project
    SZ = ZZ + CAMDIST
    SX = X / SZ: SY = YY / SZ + 0.5

    PSet (SX, SY)

    inc = inc + 1: If inc > limit Then Exit Do

    If InKey$ <> "" Then Exit Do

Loop


