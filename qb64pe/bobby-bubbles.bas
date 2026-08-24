' "Bubbles" animated using palette rotation.
Const XM = 64: Const YM = 48
Dim Pal&(32)
Randomize Timer
Dim rx As Integer, rx2 As Integer, ry As Integer, ry2 As Integer
Screen 12: Window (0, 0)-(XM, YM)
Pal&(1) = 256& * 256& * 63 + 256& * 63 + 63: Pal&(16) = Pal&(1)
PCount% = 0: x = XM / 2: y = YM / 2
dx = (Rnd * 10!) - 5!: dy = (Rnd * 10!) - 5!
dx2 = (Rnd * 2!) - 1!: dy2 = (Rnd * 2!) - 1!
dx3 = (Rnd * 2!) - 1!: dy3 = (Rnd * 2!) - 1!
Do
    dx3 = (Rnd * 2!) - 1!: dy3 = Sgn((Rnd * 2!) - 1!) * Sqr(1 - dx3 * dx3)
    dx2 = dx2 + dx3: If Abs(dx2) > 1 Then dx2 = Sgn(dx2)
    dy2 = dy2 + dy3: If Abs(dy2) > 1 Then dy2 = Sgn(dy2)
    dx = dx + dx2: If Abs(dx) > 1 Then dx = Sgn(dx)
    dy = dy + dy2: If Abs(dy) > 1 Then dy = Sgn(dy)
    dy = dy + dy2
    c% = c% Mod 15 + 1
    Circle (x, y), 1, c%: Line (x - .3, y + .3)-Step(.1, .1), c%, BF
    x = x + dx
    If x > XM - 1 Then x = x - XM
    If x < 0 Then x = x + XM
    y = y + dy
    If y > YM - 1 Then y = y - YM
    If y < 0 Then y = y + YM
    PCount% = (PCount% + 1) Mod 15
    n% = 15 - PCount%
    PTemp& = Pal&(n%)
    Pal&(n%) = Pal0&
    Palette Using Pal&(n%)
    Pal&(n%) = PTemp&
    t = Timer + .01: While t >= Timer: Wend
Loop Until InKey$ <> ""

