
Screen _NewImage(800, 800, 32)
Window (-400, 600)-(400, -200)

Dim x0 As Integer
Dim y0 As Integer

Dim x1 As Integer
Dim y1 As Integer

Dim x2 As Integer
Dim y2 As Integer

cone_height = 500
cone_radius = 200
cone_slope = cone_radius / cone_height
cone_rings = cone_height / 20
cone_sides = 360 / 15

rho = cone_radius

For y = -200 To (-200 + cone_height) Step 20
    For t = 0 To 360 Step 15
        tr = t / 180 * _Pi
        x = rho * Cos(tr)
        z = rho * Sin(tr) + 0.01
        If t = 0 Then
            x1 = x / z
            y1 = y / z
        Else
            x2 = x / z
            y2 = y / z
            'PSet (x2, y2)
            Line (x1, y1)-(x2, y2)
            x1 = x2
            y1 = y2
        End If
    Next t
    rho = rho - 10
Next y

