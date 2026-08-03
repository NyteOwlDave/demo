' Swimming Quiverbloom            K Moerman 2026
' Based on info at https://community.wolfram.com/groups/-/m/t/3516580?p_p_auth=FgO1nw3g
Screen _NewImage(1000, 900, 32): _Title "Swimming Quiverbloom"
Window Screen(-190, -200)-(190, 200)
Do
    For t = 0 To 2 * _Pi Step _Pi / 400
        Cls
        For x = 0 To 12000 Step .5
            y = x / 235
            k = (4 + Sin(x / 11 + 8 * t)) * Cos(x / 14)
            e = y / 9 - 19
            d = _Hypot(k, e) + Sin(y / 9 + 3 * t)
            q = 2 * Sin(2 * k) + Sin(y / 17) * k * (9 + 2 * Sin(y - 3 * d))
            c = d * d / 50
            xp = q - 50 * Cos(c) - 85
            yp = d * 39 - q * Sin(c) - 620
            xr = xp * Cos(t) - yp * Sin(t)
            yr = xp * Sin(t) + yp * Cos(t)
            col% = 100 * Sin(3 * k)
            PSet (xr, yr), _RGB32(255, col% + 155, 255 - col%)
        Next x
        _Display
        _Limit 60
    Next t
Loop

