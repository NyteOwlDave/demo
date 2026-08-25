' "Bird Flocks" animated using palette rotation.  The bird shape is from
' Richard Keizer's "Voogel" post to Facebook (thanks).
' Bobby Brightling

Const bird = 1 ' Set to 1 for long-tail bird or -1 for long-neck bird.
Const BSIZE = 2 ' Bird scaling factor.
Const s1 = 10 ' Velocity (v) scaling.
Const s2 = 1 ' dv scaling.
Const s3 = .5 ' ddv scaling.
Const XM = 640 ' Screen x-maximum (used for wrap-around).
Const YM = 480 ' Screen y-maximum (used to wrap-around).

Dim pal&(31) ' Palette values.
Dim bx(13), by(13) ' Bird shape coordinates.
' Read in bird.
For n = 1 To 13: Read x0, y0: bx(n) = x0 * BSIZE: by(n) = y0 * BSIZE: Next n
Randomize Timer
Screen 12
' Set up palette array.  White for the birds and a grayish-blue for sky.
birdColor& = 256& * 256& * 63 + 256& * 63 + 63
sky& = 256& * 256& * 32 + 256& * 24 + 12
For i = 0 To 31
    pal&(i) = sky&
Next i
pal&(1) = birdColor&
pal&(17) = birdColor&
palOffset% = 0
' Initialize position, velocity, and higher order changes.
x = 0: y = 0
dx = (Rnd + 1) * s1 / 2: dy = (Rnd + 1) * s1 / 2
dx2 = (Rnd * 2 - 1) * s2: dy2 = (Rnd * 2 - 1) * s2
dx3 = (Rnd * 2 - 1) * s3: dy3 = (Rnd * 2 - 1) * s3
' Main loop.
Do
    ' Update changes.
    dx3 = (Rnd * 2) - 1
    dy3 = Sgn((Rnd * 2) - 1) * Sqr(1 - dx3 * dx3)
    dx3 = s3 * dx3: dy3 = s3 * dy3
    dx2 = dx2 + dx3: If Abs(dx2) > s2 Then dx2 = s2 * Sgn(dx2)
    dy2 = dy2 + dy3: If Abs(dy2) > s2 Then dy2 = s2 * Sgn(dy2)
    dx = dx + dx2: If Abs(dx) > s1 Then dx = s1 * Sgn(dx)
    dy = dy + dy2: If Abs(dy) > s1 Then dy = s1 * Sgn(dy)
    ' Draw the object pointing in direction vector.
    c% = c% Mod 15 + 1 ' Next color.
    radius = Sqr(dx * dx + dy * dy)
    If radius > 0 Then
        cosine = bird * (dx / radius): sine = bird * (dy / radius)
    Else
        cosine = 0: sine = 0
    End If
    s = .75 + Rnd * 1 ' Vary size to produce wing flapping and 3D effects.
    For i = 1 To 13
        xt = x + s * (bx(i) * cosine - by(i) * sine)
        yt = y + s * (bx(i) * sine + by(i) * cosine)
        If i = 1 Then
            PSet (xt, yt), c%
        Else
            Line -(xt, yt), c%
        End If
    Next i
    x = x + dx
    If x > XM - 1 Then x = x - XM
    If x < 0 Then x = x + XM
    y = y + dy
    If y > YM - 1 Then y = y - YM
    If y < 0 Then y = y + YM
    ' Shift the palette.
    palOffset% = (palOffset% + 1) Mod 15
    n% = 16 - palOffset%: PTemp& = pal&(n%): pal&(n%) = pal&(0)
    Palette Using pal&(n%)
    pal&(n%) = PTemp&
    ' Wait a bit, then loop.
    t = Timer + .02: While t >= Timer: Wend
Loop Until InKey$ <> ""
' Richard Keizer's Voogel (bird) data from his Facebook post.
Data -5,0,-3.5,0.7,0.5,0.3,1,4,2,4,3,1,5,0
Data 3,-1,2,-4,1,-4,0.5,-0.3,-3.5,-0.7,-5,0


