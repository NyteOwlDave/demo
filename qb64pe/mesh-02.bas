
' mesh-02.bas
' Animated Mesh
' Original Author Unknown
' Animation Added by NyteOwlDave
' Platorm : QB64 Phoenix

_Title "Animated Mesh"

' Original : 1024 x 768
SW = 800: SH = 800

Screen _NewImage(SW, SH, 32)

Color _RGB32(255, 215, 15), _RGB32(12, 12, 42)

' WaitForInput

Animate 30, 5

' Render 7

End

Sub Animate (n1%, n2%)

    If n1% > n2% Then
        inc% = -1
    Else
        inc% = 1
    End If

    For segs = n1% To n2% Step inc%
        Render segs
        If InKey$ <> "" Then
            Exit For
        End If
    Next segs

End Sub


Sub Render (segs)

    Cls

    lim = segs / 2

    Dim a(segs), b(segs)

    For n = 1 To segs
        k = n / lim * 3.1415927#
        a(n) = 395 + 350 * Sin(k)
        b(n) = 395 + 350 * Cos(k)
    Next n

    For n = 1 To segs
        For m = 1 To segs
            Line (a(n), b(n))-(a(m), b(m))
        Next m
    Next n

    _Delay 0.5

End Sub

' Delay for Screen Recorder
Sub WaitForInput ()
    Print "Press Enter to Begin ..."
    Input OK$
End Sub

