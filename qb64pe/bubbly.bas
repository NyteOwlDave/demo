
_Title "Bouncing Bubbles"

Const TAU! = 2 * _Pi
Const N_BUBBLES% = 30

Screen _NewImage(1000, 800, 32)
Window (-500, -400)-(500, 400)

Type Vec3
    x As Integer
    y As Integer
    z As Integer
End Type

Type Color3
    r As Integer
    g As Integer
    b As Integer
End Type

Type Bubble
    px As Double
    py As Double
    pz As Double
    nx As Double
    ny As Double
    nz As Double
    cc As _Unsigned Long
End Type

Dim Shared blist(N_BUBBLES%) As Bubble

Randomize Timer

MakeBubbles blist()

Do
    _Limit 20
    DrawFrame blist()
    AdvanceBubbles blist()
    If InKey$ = Chr$(27) Then
        Exit Do
    End If
Loop

Sleep
End

Sub DrawBubble (index%, blist() As Bubble)
    x! = blist(index%).px
    y! = -blist(index%).py
    z! = blist(index%).pz
    r! = 250 / z!
    c = blist(index%).cc
    Circle (x!, y!), r!, c
    Paint (x!, y!), c
End Sub

Sub DrawBubbles (blist() As Bubble)
    For i% = 0 To N_BUBBLES% - 1
        DrawBubble i%, blist()
    Next i%
End Sub

Sub DrawFrame (blist() As Bubble)
    Cls
    ZSort blist()
    DrawBubbles blist()
    AdvanceBubbles blist()
End Sub

Sub MakeBubbles (blist() As Bubble)
    For i% = 0 To N_BUBBLES% - 1
        MakeBubble i%, blist()
    Next i%
End Sub

Sub MakeBubble (index%, blist() As Bubble)
    blist(index%).px = IRand(-450, 450)
    blist(index%).py = IRand(-350, 350)
    blist(index%).pz = IRand(1, 50)
    Dim n As Vec3: RandomVec n
    blist(index%).nx = n.x
    blist(index%).ny = n.y
    blist(index%).nz = n.z
    blist(index%).cc = RandomColor
End Sub

Sub AdvanceBubbles (blist() As Bubble)
    For i% = 0 To N_BUBBLES% - 1
        AdvanceBubble i%, blist()
    Next i%
End Sub

Sub AdvanceBubble (index%, blist() As Bubble)
    Dim v As Vec3: Dim n As Vec3
    v.x = blist(index%).px: n.x = blist(index%).nx
    v.y = blist(index%).py: n.y = blist(index%).ny
    v.z = blist(index%).pz: n.z = blist(index%).nz
    v.x = v.x + n.z: v.y = v.y + n.y: v.z = v.z + n.z
    For p% = 0 To 5
        If HitTest(p%, v) Then
            ReflectRay p%, n
            v.x = blist(index%).px + n.x
            v.y = blist(index%).py + n.y
            v.z = blist(index%).pz + n.z
            Exit For
        End If
    Next p%
    blist(index%).px = v.x
    blist(index%).py = v.y
    blist(index%).pz = v.z
End Sub

Function HitTest (p%, v As Vec3)
    Select Case p%
        Case 0: HitTest = v.z <= 1: Exit Function
        Case 1: HitTest = v.z >= 48: Exit Function
        Case 2: HitTest = v.y <= -350: Exit Function
        Case 3: HitTest = v.y >= 350: Exit Function
        Case 4: HitTest = v.x <= -450: Exit Function
        Case 5: HitTest = v.x >= 450: Exit Function
    End Select
End Function

Sub ReflectRay (p%, v As Vec3)
    Select Case p%
        Case 0: v.z = -v.z: Exit Sub
        Case 1: v.z = -v.z: Exit Sub
        Case 2: v.y = -v.y: Exit Sub
        Case 3: v.y = -v.y: Exit Sub
        Case 4: v.x = -v.x: Exit Sub
        Case 5: v.x = -v.x: Exit Sub
    End Select
End Sub

Function IRand% (lo%, hi%)
    d! = hi% - lo%
    IRand% = Int(lo% + Rnd * d!)
End Function

Function RandomColor ()
    r% = IRand%(10, 255)
    g% = IRand%(10, 255)
    b% = IRand%(10, 255)
    RandomColor = _RGB32(r%, g%, b%)
End Function

' Unit Length
Sub RandomVec (n As Vec3)
    Do
        x = Rnd
        y = Rnd
        z = Rnd
        k = x * x + y * y + z * z
        If k > 1E-8 Then
            k = 1 / Sqr(k)
            n.x = x * k
            n.y = y * k
            n.z = z * k
            Exit Sub
        End If
    Loop
End Sub

' Depth Sort Bubbles using Bubble Sort
' (wink, wink!)
Sub ZSort (blist() As Bubble)
    Dim tmp As Bubble
    Do
        swapped = 0
        For i = 1 To N_BUBBLES%
            z0 = blist(i - 1).pz
            z1 = blist(i).pz
            If (z0 < z1) Then
                tmp = blist(i)
                blist(i) = blist(i - 1)
                blist(i - 1) = tmp
                swapped = true
            End If
        Next i
    Loop While swapped
End Sub


