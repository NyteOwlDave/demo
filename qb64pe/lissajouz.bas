
' 'lissajous' 3d wave knot
' Ported to QB64 Phoenix by NyteOwlDave
' Original Author : David Mainprize
' Original Platform : Sinclair QL
' BASIC Programming Language

_Title "Lissajous ~ D. Mainprize"

Screen _NewImage(800, 600, 32)
Window (-2, -1.4)-(2, 1.4)

Color _RGB32(255, 215, 15), _RGB32(8, 8, 42)
Cls

A = 0: t = 0
x = 0: y = 0
inc = 0

Do
    x = Sin(2 * t) * Cos(A) - Cos(3 * t) * Sin(A)
    y = Sin(2 * t) * Sin(A) + Cos(3 * t) * Cos(A)
    PSet (x, y)
    t = t + 1: A = A + 0.5
    inc = inc + 1: If inc = 2000 Then Exit Do
Loop


