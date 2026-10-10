'
' Altered World
' Original Author : Mike Bostick
' Original Platform : https://observablehq.com
' Ported to QB64 Phoenix by NyteOwlDave
' Noise Routines based on work by Ken Perlin
'
_Title "Altered World ~ Mike Bostick"

Randomize Timer

Dim Shared SW As Integer
Dim Shared SH As Integer

Dim Shared samples%
Dim Shared octaves%
Dim Shared period#
Dim Shared length%

SW = 800: SH = 600
IMG = _NewImage(SW, SH, 32)

length% = 400
samples% = 512
octaves% = 1
period# = 0.01

Dim Shared P(samples%) As Integer

Screen IMG

InitPerlinSamples

Test02
Sleep
End


Sub Test02 ()
    For j = 1 To SH
        y = j - 1
        For i = 1 To SW
            x = i - 1
            pn = Perlin2D#(x * period#, y * period#)
            b = (Abs(Int(pn * 2560))) Mod 256
            ' Print b, pn
            PSet (x, y), _RGB32(b, b * 0.9, b * 0.2)
        Next i
    Next j
End Sub

Sub InitPerlinSamples ()
    ' Print samples%
    For i% = 1 To samples%
        P(i%) = Int(Rnd * 256)
        ' Print P(i%),
    Next i%
End Sub

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

Function Perlin# (x#, y#)
    e# = 1: k# = 1: s# = 0
    For i% = 0 To octaves%
        e# = e# * 0.5
        s# = s# + 0.5 * e# * (1 + Perlin2D#(k# * x#, k# * y#))
        k# = k# * 2
    Next i%
    Perlin# = s#
End Function

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

Function Lerp# (t#, a#, b#)
    Lerp# = (a# + t# * (b# - a#))
End Function






