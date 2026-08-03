
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'
' Inspiration ~ Math Artists
' Nico van der Watt
' https://www.facebook.com/groups/313919979559265/user/100011535244644
'
' P = "https://www.facebook.com";
' K = "photo";
' Q = {};
' Q . fbid = "fbid=2740092973051851";
' Q . set = "gm.2159158828368695";
' Q . idorvanity = "313919979559265";
'
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

_Title "Poincare Disk Demo"

SW = 800
SH = 800

Screen _NewImage(SW, SH, 32)

RenderPoincareDisk SW, SH

Sleep
End


' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Function Minimum (A, B)
    If B < A Then
        Minimum = B
    Else
        Minimum = A
    End If
End Function

Function DotSelf (a, b)
    DotSelf = a * a + b * b
End Function

Function Floor (x)
    Floor = Int(x) - (x < Int(x))
End Function

' Hack for Fractional '%' Modulus from JavaScript
Function FloatMod (a As Double, b As Double)
    FloatMod = a - (Fix(a / b) * b)
End Function

Sub SetPixel (x, y, c)
    PSet (x, y), c
End Sub

Sub RenderPoincareDisk (SW, SH)

    GRID_SIZE = 1
    C_DISK = _RGB(255, 255, 255)
    C_BGND = _RGB(30, 30, 30)
    C_GRID = _RGB(0, 0, 0)
    C_LIGHT = _RGB(220, 220, 240)
    C_DARK = _RGB(80, 80, 242)

    ' Determine the center and radius of the disk on screen
    centerX = SW / 2
    centerY = SH / 2

    ' 95% of screen size to fit nicely
    radius = Minimum(SW, SH) / 2 * 0.95

    ' Loop through every pixel on the screen
    For Y = 0 To SH - 1
        For X = 0 To SW - 1

            ' Step 1: Translate pixel to disk-centered
            ' coordinates (u, v)
            u = (X - centerX) / radius
            v = (centerY - Y) / radius ' +Y = UP

            disk_radius_squared = DotSelf(u, v)

            ' Step 2: Check if pixel is inside the Poincaré
            ' disk boundary
            If (disk_radius_squared >= 1.0) Then
                ' Outside the disk boundary
                SetPixel X, Y, C_BGND
                GoTo Skip
            End If

            ' Step 3: Map disk coordinates (u, v)
            ' to Upper Half-Plane (x, y)
            denominator = (u * u) + ((1.0 - v) * (1.0 - v))

            ' Guard against division by zero exactly at the
            ' top boundary edge
            If denominator = 0 Then
                SetPixel X, Y, C_BGND
                GoTo Skip
            End If

            hyperX = (2.0 * u) / denominator
            hyperY = (1.0 - disk_radius_squared) / denominator

            ' Step 4: Generate a visual pattern (Checkerboard)
            ' Use modulo math (are close to a grid line?)
            modX = FloatMod(Abs(hyperX), GRID_SIZE)
            modY = FloatMod(Abs(hyperY), GRID_SIZE)

            ' Define thickness for grid lines
            lineWidth = 0.05

            If (modX < lineWidth) Or (modY < lineWidth) Then
                SetPixel X, Y, C_GRID
            Else
                ' Alternating checkerboard color pattern
                ' for depth perception
                cellX = Floor(hyperX / GRID_SIZE)
                cellY = Floor(hyperY / GRID_SIZE)
                If (0 = (cellX + cellY) Mod 2) Then
                    SetPixel X, Y, C_LIGHT
                Else
                    SetPixel X, Y, C_DARK
                End If
            End If
            Skip:
        Next X
    Next Y
End Sub



