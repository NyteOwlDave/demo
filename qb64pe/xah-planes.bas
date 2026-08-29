' Recreation of an image by Xah Lee
' http://xahlee.info/SpecialPlaneCurves_dir/InversionGallery_dir/InversionGallery.html
' Expressed in QuickBASIC by Jonathan Gilbert 2026-08-26

Type CircleType
    CX As Single
    CY As Single
    CR As Single
    CC As Integer
End Type

DECLARE SUB DrawCircles (circles() AS CircleType)
DECLARE SUB DrawFigure
DECLARE SUB InvertCircle (original AS CircleType, across AS CircleType, reflection AS CircleType)
DECLARE SUB InvertCircles (this AS CircleType, circles() AS CircleType, depth%)
DECLARE SUB InvertPoint (xc!, yc!, rc!, xp!, yp!)
DECLARE SUB OutputVGAColourCMYK (c!, m!, y!, k!)
DECLARE SUB SetPalette ()

Const PI! = 3.141593

Const MaxDepth% = 7 ' depth of iterations > 2 (0-based)

Const Delta! = .00001 ' underflow

Screen 12

SetPalette

DrawFigure

Sleep

Sub DrawFigure
    scale! = 240 / 2.2

    Dim circles(0 To 6) As CircleType

    '   O
    ' O   O
    '   O
    ' O   O
    '   O

    mx! = 320
    my! = 240

    circles(0).CX = mx!
    circles(0).CY = my!
    circles(0).CR = scale! ' Central circle
    circles(0).CC = 1

    For i% = 1 To 6
        a! = PI! / 2 - (i% - 1) * (PI! / 3)

        circles(i%).CX = mx! + 2.02 * scale! * Cos(a!)
        circles(i%).CY = my! - 2.02 * scale! * Sin(a!) + d!
        circles(i%).CR = scale!
        circles(i%).CC = i% + 1
    Next i%

    For i% = 0 To 6
        InvertCircles circles(i%), circles(), 2
    Next i%

    Window
End Sub

Sub InvertCircle (across As CircleType, original As CircleType, reflection As CircleType)
    ' Invert circle original in circle across
    ' Writes result to reflection

    d! = Sqr((original.CX - across.CX) ^ 2 + (original.CY - across.CY) ^ 2)

    If d! < Delta! Then d! = 1

    ir! = original.CR / d!

    ix! = (original.CX - across.CX) * ir!
    iy! = (original.CY - across.CY) * ir!

    xa! = original.CX + ix!
    xb! = original.CX - ix!

    ya! = original.CY + iy!
    yb! = original.CY - iy!

    InvertPoint across.CX, across.CY, across.CR, xa!, ya!
    InvertPoint across.CX, across.CY, across.CR, xb!, yb!

    reflection.CX = (xa! + xb!) * .5 ' xinvcircle
    reflection.CY = (ya! + yb!) * .5 ' yinvcircle
    reflection.CR = Sqr((xa! - xb!) ^ 2 + (ya! - yb!) ^ 2) * .5 ' rinvcircle
    reflection.CC = original.CC
End Sub

Sub InvertCircles (this As CircleType, circles() As CircleType, depth%)
    ' Recursively inverts this circle into each of the others
    ' Will only recurse while depth% < MaxDepth%

    Dim reflections(LBound(circles) To UBound(circles)) As CircleType

    nextdepth% = depth% + 1

    ' Draw this circle
    If this.CR >= .5 Then Circle (this.CX, this.CY), this.CR, this.CC

    ' Do the inversion
    For i% = LBound(reflections) To UBound(reflections)
        InvertCircle this, circles(i%), reflections(i%)
    Next i%

    ' Do the recursion
    If depth% < MaxDepth% Then
        For i% = LBound(circles) To UBound(circles)
            InvertCircles circles(i%), reflections(), nextdepth%
        Next i%
    End If
End Sub

Sub InvertPoint (xc!, yc!, rc!, xp!, yp!)
    ' Invert point xp yp in circle xc yc rc
    ' Modifies xp, yp in place
    xp! = xp! - xc!
    yp! = yp! - yc!

    d! = xp! * xp! + yp! * yp!

    If d! < Delta! Then d! = 1

    ir! = rc! * rc! / d! 'rc^2/(xp-xc)^2+(yp-yc)^2

    xp! = xc! + xp! * ir!
    yp! = yc! + yp! * ir!
End Sub

Sub SetPalette
    Out &H3C8, 1

    ' 7-colour palette evenly spaced in hue with saturation and value locked at 1

    For hueidx% = 0 To 6
        hue! = hueidx% * 360 / 7
        relativehue! = hue! - 60 * (hue! \ 60)
        cv! = relativehue! / 60

        r! = 0
        g! = 0
        b! = 0

        Select Case hue!
            Case 0 To 60: r! = 1: g! = cv!
            Case 60 To 120: r! = 1 - cv!: g! = 1
            Case 120 To 180: g! = 1: b! = cv!
            Case 180 To 240: g! = 1 - cv!: b! = 1
            Case 240 To 300: b! = 1: r! = cv!
            Case 300 To 360: b! = 1 - cv!: r! = 1
        End Select

        rr% = Int(r! * 64)
        gg% = Int(g! * 64)
        bb% = Int(b! * 64)

        If rr% > 63 Then rr% = 63
        If gg% > 63 Then gg% = 63
        If bb% > 63 Then bb% = 63

        Out &H3C9, rr%
        Out &H3C9, gg%
        Out &H3C9, bb%
    Next hueidx%
End Sub

