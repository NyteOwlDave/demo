Let sw = 1200
Let sh = 1000
Let xc = sw / 2
Let yc = sh / 2
Let rad = sh / 48
Screen _NewImage(sw, sh, 256)
For j = 1 To 9999
    Randomize Timer
    Let a = Rnd
    If a > 0.86 Then Let a = 0.86
    If a < 0.1 Then Let a = 0.1
    If a = 0.5 Then Let a = 0.4999
    Let b = 0.9998
    Print a
    Let p = 15000
    Let c = 2 - 2 * a
    Let x = 0
    Let y = 12.17
    Let w = a * x + c * x * x / (1 + x * x)
    For h = 0 To p
        If h > 100 Then
            Let ct = 1.1 * Sqr(x * x + y * y) / rad
            Let cr = 83 * ct
            Let cg = 177 * ct
            Let cb = 186 * ct
            PSet (x * rad + xc, y * rad + yc), _RGB(cr, cg, cb)
            Let z = x
            Let x = b * y + w
            Let u = x * x
            Let w = a * x + c * u / (1 + u)
            Let y = w - z
        End If
    Next h
    Sleep
    Cls
Next j

