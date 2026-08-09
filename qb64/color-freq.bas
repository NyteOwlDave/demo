
Rem Loosely Based on the Monte Carlo Method
Rem https://editor.p5js.org/nyteowldave64/sketches/B6O0DX-2S
Rem https://live-clipboard.netlify.app/478In
Rem https://en.wikipedia.org/wiki/Monte_Carlo_method
Rem Platform QB 64 Phoenix Edition
Rem UPDATED : 2026-JUN-28 : Bug Fixes

_Title "Color Frequencies"

Const SW = 800
Const SH = 600

Screen _NewImage(SW, SH, 32)

Dim Shared freq(256) As Integer
Dim Shared pal(256, 3) As Integer
Dim Shared colors As Integer

' Black, White, Blue, Green, Red
AddColor 0, 0, 0
AddColor 255, 255, 255
AddColor 0, 0, 255
AddColor 0, 255, 0
AddColor 255, 0, 0

' ChDir "d:\jefr\math\prob\0013"
ChDir "/home/dave/Pictures"
img& = _LoadImage("prob-0013-C.png", 32)
CountColors img&

Cls
ShowResults img&
KeyWait

Cls
ShowCounts

Rem KeyWait
Rem Cls
Rem DrawPalette

End

Sub AddColor (r%, g%, b%)
    colors = colors + 1
    pal(colors, 3) = r%
    pal(colors, 2) = g%
    pal(colors, 1) = b%
End Sub

Sub ReadColor (i%, c( 3) As Integer)
    c(1) = pal(i%, 1)
    c(2) = pal(i%, 2)
    c(3) = pal(i%, 3)
End Sub

Function GetRGB& (i%)
    Let r% = pal(i%, 3)
    Let g% = pal(i%, 2)
    Let b% = pal(i%, 1)
    GetRGB& = _RGB(r%, g%, b%)
End Function

' Palette Index for Nearest Color Shade
' May Add Colors to Palette
Function BestFit% (r%, g%, b%)
    Const cutoff& = 256 * 32
    Let i% = -1
    Let best& = 256 * 1024
    Let rs% = 0: Let gs% = 0: Let bs% = 0
    For n% = 1 To colors
        Let dr& = r% - pal(n%, 3)
        Let dg& = g% - pal(n%, 2)
        Let db& = b% - pal(n%, 1)
        ' For Speed, Using Squared Difference is Fine
        Let dsqr& = dr& * dr& + dg& * dg& + db& * db&
        If (dsqr& < best&) Then
            best& = dsqr&
            i% = n%
            rs% = r%
            gs% = g%
            bs% = b%
        End If
    Next n%
    If (best& > cutoff&) Then
        If (colors < 256) Then
            AddColor rs%, gs%, bs%
            i% = colors
        End If
    End If
    BestFit% = i%
End Function

Sub CountColors (pixmap)
    Dim c As _Unsigned Long
    Let wi = _Width(pixmap)
    Let hi = _Height(pixmap)
    Dim m As _MEM
    m = _MemImage(pixmap)
    For y = 1 To hi
        Let j = (y - 1) * wi
        For x = 1 To wi
            Let k = j + (x - 1)
            Let i = 4 * k
            _MemGet m, m.OFFSET + i, c
            Let r% = _SHR(c, 16) And &HFF
            Let g% = _SHR(c, 8) And &HFF
            Let b% = c And &HFF
            Let index = BestFit(r%, g%, b%)
            freq(index) = freq(index) + 1
        Next x
    Next y
    _MemFree m
End Sub

' Draw 16 x 16 Palette Preview
Sub DrawPalette ()
    Const gold& = _RGB32(255, 215, 0)
    For y = 0 To 15
        For x = 0 To 15
            Let i = y * 16 + x + 1
            Let n% = freq(i)
            If (n% > 0) Then
                Let c& = GetRGB&(i)
                Line (1 + x * 20, 1 + y * 20)-(x * 20 + 15, y * 20 + 15), c&, BF
            End If
            Line (x * 20, y * 20)-(x * 20 + 16, y * 20 + 16), gold&, B
        Next x
    Next y
End Sub

Function Percent$ (ratio)
    Let i = Int(ratio * 1000)
    Let s$ = " (" + Str$(i / 10) + "% )"
    Percent$ = s$
End Function

Function GetTotalCount ()
    Let sum = 0
    For n = 1 To colors
        sum = sum + freq(n)
    Next n
    GetTotalCount = sum
End Function

Sub ShowCounts
    Const gold& = _RGB32(255, 215, 0)
    Const margin = 32
    Let w = 16
    Let h = 16
    Let x = 2
    Let total = GetTotalCount
    Print "Color Statistics"
    For n = 1 To colors
        Let y = margin + h * (n - 1)
        Line (x + 1, y + 1)-(x + w - 2, y + h - 2), GetRGB&(n), BF
        Line (x, y)-(x + w, y + h), gold&, B
        Locate 2 + n, 4
        Let count = freq(n)
        Print count; Percent(count / total)
    Next n
    Print
    Print "Total = "; total; " pixels"
End Sub

Sub ShowResults (image&)
    _PutImage (0, 0), image&
    Let FreqBlue = freq(3)
    Let FreqRed = freq(5)
    Let AreaBlue = 18 * _Pi
    Let RadiusBlue = Sqr(2 * AreaBlue / _Pi)
    Let AreaRed = (FreqRed / FreqBlue) * AreaBlue
    Let RadiusRed = Sqr(AreaRed / _Pi)
    Locate 12
    Print "Area Blue = "; AreaBlue; " (given)"
    Print "Area Red = "; AreaRed
    Print "Radius Blue = "; RadiusBlue
    Print "Radius Red = "; RadiusRed
End Sub

Sub KeyWait ()
    Print
    Print "Press any key to continue"
    Sleep
End Sub


