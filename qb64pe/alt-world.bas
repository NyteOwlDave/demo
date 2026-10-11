'
' Altered World ~ 2026-OCT-10
' Original Author : Mike Bostick
' Original Platform : https://observablehq.com
' Ported to QB64 Phoenix by NyteOwlDave
' Noise Routines based on work by Ken Perlin
'
_Title "Altered World ~ Mike Bostick"

Randomize Timer

Dim Shared SW As Integer
Dim Shared SH As Integer

Dim Shared IMG As Long
Dim Shared length%
Dim Shared samples%
Dim Shared octaves%
Dim Shared period#
Dim Shared alpha#

SW = 800: SH = 600

IMG = _NewImage(SW, SH, 32)

length% = 400
samples% = 512
octaves% = 1
period# = 0.01
alpha# = 0.05

' Perlin Noise Samples
Dim Shared P(samples%) As Integer

' Helpful Hints
Foreword

' TestNoise
Animate

Sleep
End

Sub TestNoise ()
    InitPerlinSamples
    Screen IMG
    For j = 1 To SH
        y = j - 1
        For I = 1 To SW
            x = I - 1
            pn = Perlin2D#(x * period#, y * period#)
            b = (Abs(Int(pn * 2560))) Mod 256
            PSet (x, y), _RGB32(b, b * 0.9, b * 0.2)
        Next I
    Next j
End Sub

Sub InitPerlinSamples ()
    For i% = 1 To samples%
        P(i%) = Int(Rnd * 256)
    Next i%
End Sub

' Perlin Helper Function
Function Perlin2D# (x2d#, y2d#)
    ix% = Int(x2d#) And 255
    iy% = Int(y2d#) And 255
    ' Print ix%; " "; iy%
    x# = x2d# - Int(x2d#)
    y# = y2d# - Int(y2d#)
    ' Print x#; " "; y#; " "; x2d#; " "; y2d#
    fx# = (3 - 2 * x#) * x# * x#
    fy# = (3 - 2 * y#) * y# * y#
    p0% = P(1 + ix%) + iy%
    p1% = P(2 + ix%) + iy%
    ' Print fx#; " "; fy#; " "; p0%; " "; p1%
    a# = Grad2D#(P(1 + p0%), x#, y#)
    b# = Grad2D#(P(1 + p1%), x# - 1, y#)
    c# = Grad2D#(P(2 + p0%), x#, y# - 1)
    d# = Grad2D#(P(2 + p1%), x# - 1, y# - 1)
    ' Print a#; " "; b#; " "; c#; " "; d#
    fxab# = Lerp#(fx#, a#, b#)
    fxcd# = Lerp#(fx#, c#, d#)
    result# = Lerp#(fy#, fxab#, fxcd#)
    ' Print result#
    Perlin2D# = result#
End Function

' Primary Perlin Function
Function Perlin# (x#, y#)
    e# = 1: k# = 1: s# = 0
    For i% = 0 To octaves%
        e# = e# * 0.5
        s# = s# + 0.5 * e# * (1 + Perlin2D#(k# * x#, k# * y#))
        k# = k# * 2
    Next i%
    Perlin# = s#
End Function

' Gradient Selection
' Returns one of [ +x, +y, -x, -y ]
Function Grad2D# (i%, x#, y#)
    If (i% And 1) = 0 Then
        v# = x#
    Else
        v# = y#
    End If
    If (i% And 2) = 0 Then
        Grad2D# = -v#
    Else
        Grad2D# = v#
    End If
End Function

' Linear Interpolation
Function Lerp# (t#, a#, b#)
    Lerp# = (a# + t# * (b# - a#))
End Function

' Render One Pixel Column (px), With Wisps
Sub FrameColumn (px%)
    For i% = 0 To (SH / 6) ' Gap = 100 pixels
        x# = px%
        y# = SH * Rnd
        n# = Perlin#(x# * period#, y# * period#)
        c& = MakeColor(n#) ' Color from Noise
        PSet (x#, y#), c&
        m% = 0 ' Wisp Loop Counter
        While ((y >= 0) And (y <= height) And (m% < length%))
            n# = Perlin#(x# * period#, y# * period#)
            x# = x# + Cos(n# * 14)
            y# = y# + Sin(n# * 14)
            Line -(x#, y#), c&
            m% = m% + 1
        Wend
    Next i%
End Sub

' Animation Loop
Sub Animate ()
    Screen IMG
    InitPerlinSamples
    x% = 0
    Do
        _Limit 60
        FrameColumn x%
        x% = (x% + 1) Mod SW
        K$ = InKey$
        If K$ = Chr$(27) Then
            Exit Sub
        End If
        If K$ = "c" Or K$ = "C" Then
            Cls
            x% = 0
        End If
        If K$ = "n" Or K$ = "N" Then
            InitPerlinSamples
        End If
    Loop
End Sub

' Map Noise Value to Color
' Noise => HSL => RGBA
Function MakeColor& (n#)

    n# = Abs(n#)

    h# = (n# * SH - SH / 3) Mod 360
    s# = 1.0
    l# = (0.01 * SW * n# * n# * n#)

    c# = (1 - Abs(2 * l# - 1)) * s#

    ka# = (h# / 2) Mod 2
    kb# = Abs(ka# - 1)
    kc# = (1 - kb#)

    x# = c# * kc#
    m# = l# - c# / 2

    If (h# < 60) Then
        r# = c#: g# = x#: b# = 0
    ElseIf (h# < 120) Then
        r# = x#: g# = c#: b# = 0
    ElseIf (h# < 180) Then
        r# = 0: g# = c#: b# = x#
    ElseIf (h# < 240) Then
        r# = 0: g# = x#: b# = c#
    ElseIf (h# < 300) Then
        r# = x#: g# = 0: b# = c#
    Else
        r# = c#: g# = 0: b# = x
    End If

    ri% = Int((m# + r#) * 255)
    gi% = Int((m# + g#) * 255)
    bi% = Int((m# + b#) * 255)
    ai% = Int(alpha# * 255)

    MakeColor& = _RGBA32(ri%, gi%, bi%, ai%)

End Function

Sub Foreword
    Screen 1
    Color 1, 14
    Print "The Animation Loop is infinite."
    Print "Hit ESC to exit."
    Print "Hit 'C' to Clear and Continue."
    Print "Hit 'N' for new Noise Samples."
    Sleep
End Sub


