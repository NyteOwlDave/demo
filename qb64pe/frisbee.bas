' ================================================
' QB64 Phoenix Edition - Glossy Orange Frisbee Demo
' Simple graphics demo: Flattened sphere / flying disc
' with glossy surface and specular highlights
' ================================================
' https://grok.com/share/c2hhcmQtMg_ba031bcf-9048-476d-a78b-1869679a8a75
' ================================================

Screen _NewImage(800, 600, 32)
_FullScreen _Off

Dim Shared centerX As Integer, centerY As Integer
centerX = 400
centerY = 300

' Main loop
Do
    Cls

    ' Draw the frisbee
    Call DrawGlossyFrisbee(centerX, centerY, 180, 45) ' radius, thickness/height hint

    ' Optional: simple rotation animation (press SPACE to pause)
    _Display
    _Limit 60

    k$ = InKey$
    If k$ = Chr$(27) Then Exit Do ' ESC to quit
Loop

System

' ================================================
Sub DrawGlossyFrisbee (cx As Integer, cy As Integer, radius As Integer, heightHint As Integer)
    Dim i As Integer
    Dim shade As _Unsigned Long
    Dim highlightX As Integer, highlightY As Integer
    Dim dist As Single

    ' 1. Outer rim / bevel (slightly darker orange)
    For i = 0 To 8
        CircleFilled cx, cy, radius + i, _RGB32(200, 90, 20)
    Next i

    ' 2. Main body fill with radial shading (darker toward edges)
    For i = radius To 0 Step -1
        ' Base orange with cosine-based falloff for rounded look
        dist = i / radius
        ' Make edges darker for 3D "flattened sphere" feel
        shade = _RGB32( _
            255 - INT(80 * (1 - dist)), _
            120 - INT(50 * (1 - dist)), _
            30 + INT(40 * dist) _
        )

        Circle (cx, cy), i, shade
        Paint (cx, cy - i + 5), shade, shade ' paint inside
    Next i

    ' 3. Inner concentric rings for disc texture/detail
    For i = 20 To radius - 20 Step 25
        CircleFilled cx, cy, i, _RGB32(220, 140, 60)
    Next i

    ' 4. Glossy specular highlight (bright area)
    ' Positioned off-center for natural lighting
    highlightX = cx - Int(radius * 0.35)
    highlightY = cy - Int(radius * 0.45)

    For i = 0 To 55
        dist = i / 55
        ' Bright white-yellow fading out
        shade = _RGBA32( _
            255, _
            255 - INT(80 * dist), _
            200 + INT(55 * (1 - dist)), _
            180 - INT(140 * dist) _
        )

        CircleFilled highlightX, highlightY, 55 - i, shade
    Next i

    ' Extra small bright core highlight
    CircleFilled highlightX - 8, highlightY - 10, 18, _RGBA32(255, 255, 240, 220)

    ' 5. Subtle rim highlight on top edge (for gloss)
    CircleFilled cx, cy, radius + 2, _RGBA32(255, 230, 180, 100)

    ' 6. Very faint shadow/edge on bottom for depth
    CircleFilled cx + 6, cy + 8, radius + 3, _RGBA32(80, 40, 10, 80)

End Sub

Sub CircleFilled (x, y, r, c)
    Let rr = r * r
    For j = y - r To y + r
        Let dy = j - y
        Let k = Sqr(Abs(rr - dy * dy))
        Let x1 = x - k
        Let x2 = x + k
        Line (x1, j)-(x2, j), c
    Next j
End Sub


