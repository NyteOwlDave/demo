
' NyteOwlDave ~ 2026-AUG-24
' Original Concept

_Title "Cornucopia"

Screen _NewImage(800, 800, 32)
Window (-400, 400)-(400, -400)

R1 = 200: R2 = 120

FGC& = _RGB32(255, 215, 15)
BGC& = _RGB32(8, 8, 64)

Color FGB&, BGC&
Cls

For deg = 0 To 360 - 1.5 Step 1.5
    d = deg - 60
    If (d < 0) Then d = d + 360
    theta = d * _Pi / 180
    cx = R1 * Cos(theta)
    cy = R1 * Sin(theta)
    scale = (deg / 360)
    r& = Int(scale * 255)
    g& = Int(scale * 215)
    b& = Int(scale * 15)
    R3 = (0.2 + scale * 0.8) * R2
    Circle (cx, cy), R3, _RGB32(r&, g&, b&)
Next deg

Sleep: End

