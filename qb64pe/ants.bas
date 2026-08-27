' Ants Aug26 version
' By James D.  Jarvis
' QB64_Phoenix Edition Code (shouldn't be too hard to rework for other versions of basic that use the GW draw commands)
' I did an earlier version of this but went with spiffy ants for this version
' Ant Graphic drawn with VecDraw by RetroNick
'
_Title "Ants ~ JD Jarvis"
Screen _NewImage(1200, 500, 9) 'using EGA colors but a larger screen area
splat& = _NewImage(1200, 500, 9)
Cls
Randomize Timer
Type Ant_type
    x As Single ' ant x position
    y As Single ' ant y posiiton
    s As Single ' ant size
    a As Single ' angle ant is facing
    hp As Single ' ant health points
    m As Single ' ant speed
    la As Single ' ant last angle turned
    c As Integer
End Type
numants = 500
Dim ant(numants) As Ant_type
' the draw statements for the ant
A$ = "  G8 D16 F8 M+8,-7 U17 H8 BD33 M-15,23 M+15,41 M+15,-41 M-15,-23 BU33 H8 U8 M+8,-2 M+8,2 D8 G8 BU18 M-8,-6 M+3,-6 G6 M+3,8 M+8,-2 BR M+7,-6 M-4,-6 M+8,6 M-4,8 M-7,-2 BM+39,34 M+3,-6 M+6,-1 M-4,3 M-3,4 F7"
A$ = A$ + " M-6,-2 M-3,-5 BL16 M+16,-3 D5 M-16,-2 BL16 M+16,-3 D5 M-16,-2 BM+27,-25 U7 E4 M-2,5 D5 M+10,2 M-7,1 M-5,-2 BM-13,8 M+12,-11 M+2,4 M-14,7 BM-14,9 M+12,-11 M+3,4 M-15,7 BM+27,34 M+6,-3 M+6,2 M-5,1 M-5,1 M+2,10 M-4,-5"
A$ = A$ + " U6 BM-13,-8 M+15,6 M-3,4 M-12,-10 BM-14,-9 M+15,6 M-2,5 M-13,-11 BM-44,16 D7 M-5,3 M+3,-4 U5 M-10,-3 M+7,-1 M+5,3 BM+13,-8 M-12,11 M-2,-4 M+14,-7 BM+15,-8 M-13,10 M-3,-4 M+16,-6 BM-32,-10 M-3,6 M-6,1 M+4,-3 M+3,-4 H7"
A$ = A$ + " M+6,2 M+3,5 BM+16,1 M-16,2 U5 M+16,3 BM+16,1 M-16,2 U5 M+16,3 BM-26,-27 M-6,2 M-6,-2 M+5,-1 R5 M-1,-10 M+3,5 D6 BM+13,8 M-15,-6 M+3,-4 M+12,10 BM+13,10 M-14,-7 M+2,-5 F12"
PSet (100, 100), 0
antpop = numants
For n = 1 To numants
    ant(n).x = Int(Rnd * _Width)
    ant(n).y = Int(Rnd * _Height)
    ant(n).s = 0.5 + Rnd * 1
    ant(n).a = (Rnd * 60) - 30
    ant(n).hp = Int((2 + Rnd * 4) * ant(n).s)
    ant(n).m = Int(2 + Rnd * 4)
    ant(n).c = Int(2 + Rnd * 11)
Next n
Do 'press escape to end the program
    _PutImage (0, 0), splat&, 0
    _Limit 20
    For n = 1 To numants
        If ant(n).hp >= 1 Then 'draw the at if it is alive
            D = Int(Rnd * ant(n).m) 'distance the ant walks this cycle
            ant(n).x = ant(n).x + D * Sin(0.01745329 * (180 + ant(n).a)) 'plot the x and y graphics for movement along the angle
            ant(n).y = ant(n).y + D * Cos(0.01745329 * (180 + ant(n).a))
            PSet (ant(n).x, ant(n).y), 0
            _Dest splat& ' lets clean up splats so the screen doesn't too confusing
            Line (ant(n).x - 1, ant(n).y - 1)-(ant(n).x + 1, ant(n).y + 1), 0, BF
            tx = ant(n).x + Int(-2 + Rnd * 4): ty = ant(n).x + Int(-2 + Rnd * 4)
            Line (tx - 2, ty - 2)-(tx + 2, ty + 2), 0, BF
            tx = Int(Rnd * _Width): ty = Int(Rnd * _Height)
            Line (tx - 3, ty - 3)-(tx + 3, ty + 3), 0, B
            _Dest 0
            Draw "S" + Str$(ant(n).s) + "c" + Str$(ant(n).c) + "TA" + Str$(ant(n).a) + A$ 'draw the amt with the proper alignment
            Select Case Int(Rnd * 10)
                Case 1, 2
                    ant(n).a = ant(n).a + 3
                Case 3, 4
                    ant(n).a = ant(n).a - 3
            End Select
            'turn the ants around if they wander off the visible screen too far
            If ant(n).x < -20 Then ant(n).a = ant(n).a - 180
            If ant(n).x > _Width + 20 Then ant(n).a = ant(n).a - 180
            If ant(n).y < -20 Then ant(n).a = ant(n).a - 180
            If ant(n).y > _Height + 20 Then ant(n).a = ant(n).a - 180
            For o = 1 To numants 'check for ant bites
                If ant(n).c <> ant(o).c And ant(o).hp > 0 Then
                    DX = Abs(ant(o).x - ant(n).x)
                    dy = Abs(ant(o).y - ant(n).y)
                    If DX <= ant(n).s * 10 And dy <= ant(n).s * 10 Then
                        Locate 1, 1: Print "ANT "; n; " Bites Ant "; o; "  Ant population is now "; antpop
                        If Rnd * 20 > 16 Then ant(o).hp = ant(o).hp - ((Int(1 + Rnd * 2)) - 1)
                        ant(o).a = ant(o).a + Rnd * 180
                        splats = Int(2 + Rnd * 5)
                        _Dest splat& 'drop some splats for the fight
                        For s = 1 To splats
                            Circle (ant(o).x + Rnd * (ant(o).s * 4) - Rnd * (ant(o).s * 4), ant(o).y + Rnd * (ant(o).s * 4) - Rnd * (ant(o).s * 4)), ant(o).s * 3, ant(o).c
                            Circle (ant(o).x + Rnd * (ant(o).s * 4) - Rnd * (ant(o).s * 4), ant(o).y + Rnd * (ant(o).s * 4) - Rnd * (ant(o).s * 4)), ant(o).s * 3, 0
                        Next s
                        _Dest 0
                        If ant(o).hp < 1 Then 'dead ant, dead ant, dead ant...
                            antpop = antpop - 1
                            ant(o).x = -100
                            ant(o).y = -100
                            ant(n).s = ant(n).s + .05
                            ant(n).hp = ant(n).hp + ant(o).s
                            ant(o).s = 0.1
                        End If
                    End If
                End If
            Next o
        End If
    Next n
    _Display 'for flicker free graphics
Loop Until InKey$ = Chr$(27)
_AutoDisplay 'yeah... well probably don't need this but just in case.
End

