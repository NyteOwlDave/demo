' Author   : Eric Schraf
' Tweaks   : NyteOwlDave ~ 2026-AUG-24
' Platform : QB64 Phoenix

_Title "Fractals ~ E. Schraf"

w = 1280: h = 720
zoom = 2 / w
dmin = 0.06

Screen _NewImage(w, h, 32)
Cls

For a = 0 To w - 1

    For b = 0 To 1.5 * h

        x = (a - w) * zoom
        y = (b - h) * zoom
        i = 0
        d = 100

        Do ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
            u = x * x
            v = y * y
            If (u + v) > 4.8 Or (i > 30) Or (d < dmin) Then
                Exit Do
            End If
            y = 2 * x * y + 0.156
            x = u - v - 0.8
            i = i + 1
            n = Abs(u + v - 1)
            If (n < d) Then d = n
        Loop ' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        If d < dmin Then
            cc% = 255 - Int(4000 * d)
            If cc% < 0 Then cc% = 0
            If cc% > 255 Then cc% = 255
            x1 = a - w / 2
            y1 = b - h / 2
            x2 = w + w / 2 - 1 - a
            y2 = h + h / 2 - b
            Line (x1, y1)-(x1 + 1, y1 + 1), _RGB(cc%, cc%, 215)
            Line (x2, y2)-(x2 + 1, y2 + 1), _RGB(cc%, cc%, 215)
        End If

    Next b
Next a

Sleep: End






















