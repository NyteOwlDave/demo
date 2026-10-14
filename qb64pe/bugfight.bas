' Bug Fight for QB Phoenix
' NyteOwlDave ~ 2026-OCT-14
' Dedicated to BASIC Programming Fans
' Original : https://codepen.io/NyteOwlDave/full/QWQPNKm

_Title "Bug Fight"

' Maximum life for a bug
Const maximum_life = 3

' Range of random values for voracity
Const voracity_range = 10

Randomize Timer

Dim Shared phase%

Dim Shared SW As Integer
Dim Shared SH As Integer

SW = 400: SH = 320

Dim Shared BugLife(SH, SW, 1) As Integer
Dim Shared BugColor(SH, SW, 1) As Integer

Dim Shared species As Integer

species = 32

Dim Shared Colors(species) As Long
Dim Shared EatsColor(species) As Integer
Dim Shared Voracity(species) As Integer

Screen _NewImage(2 * SW, 2 * SH, 32)

Print
Print , "   (                           "
Print , " ( )\   (  (  (                "
Print , " )((_) ))\ )\))(               "
Print , "((_)_ /((_|(_))\               "
Print , " | _ |_))( (()(_)              "
Print , " | _ \ || / _` |               "
Print , " (___/\_,_\__, |          ____ "
Print , " )\ )     |___/   )    ) |   / "
Print , "(()/( (  (  (  ( /( ( /( |  /  "
Print , " /(_)))\ )\))( )\()))\())| /   "
Print , "(_))_((_|(_))\((_)\(_))/ |/    "
Print , "| |_  (_)(()(_) |(_) |_ (      "
Print , "| __| | / _` || ' \|  _|)\     "
Print , "|_|   |_\__, ||_||_|\__((_)    "
Print , "        |___/                  "
Print
Sleep

Screen _NewImage(2 * SW, 2 * SH, 32)

Restart
Do
    _Limit 30
    UpdateBugs phase%
    phase% = 1 - phase%
    DrawBugs phase%
    K$ = InKey$
    If (K$ = Chr$(27)) Then
        Exit Do
    End If
    If (K$ = Chr$(32)) Then
        Restart
    End If
    If Rnd < 0.0025 Then
        Restart
    End If
Loop
Sleep
End

Sub Restart ()
    InitSpecies
    InitBugs
    phase% = 0
End Sub

Sub InitSpecies
    vlo = 1
    vr = voracity_range
    For i = 1 To species
        If Rnd < 0.5 Then
            b = Int(Rnd * 180) + 40
            g = 242 - b
            r = 64
        Else
            r = Int(Rnd * 180) + 40
            g = 242 - r
            b = 64
        End If
        Colors(i) = _RGB32(r, g, b)
        k = (i + 3) Mod species
        EatsColor(i) = 1 + k
        Voracity(i) = vlo + (Int(vr * Rnd) ^ 1.2)
    Next i
End Sub

Sub DrawColors ()
    Let x = 10
    Let y = 10
    For i = 1 To species
        If (x > SW - 10) Then
            y = y + 20
            x = 10
        Else
            x = x + 20
        End If
        Line (x, y)-(x + 16, y + 16), Colors(i), BF
    Next i
End Sub

Sub InitBugs
    For j = 1 To SH
        For i = 1 To SW
            life = 0
            kind = 0
            If Rnd > 0.99999 Then
                t = Int((species - 1) * Rnd)
                kind = t + 1
                life = maximum_life
            End If
            BugColor(j, i, 0) = kind
            BugLife(j, i, 0) = life
            BugColor(j, i, 1) = 0
            BugLife(j, i, 1) = 0
        Next i
    Next j
End Sub

Sub DrawBugs (phase%)
    For j = 1 To SH
        y = 2 * (j - 1)
        For i = 1 To SW
            x = 2 * (i - 1)
            k = BugColor(j, i, phase%)
            If k < 1 Then
                c& = _RGB32(0, 0, 0)
            Else
                c& = Colors(k)
            End If
            Line (x, y)-(x + 1, y + 1), c&, BF
        Next i
    Next j
End Sub

Sub UpdateLine (j, phase%)
    For i = 1 To SW
        life = BugLife(j, i, phase%)
        If life > 0 Then
            kind = BugColor(j, i, phase%)
            ate = Forage%(kind, j, i, phase%)
            If ate < 1 Then
                life = life - 1
            End If
        Else
            life = 0
            kind = 0
            If Rnd > 0.987 Then
                kind = Int((species - 1) * Rnd) + 1
                life = maximum_life
            End If
        End If
        BugColor(j, i, 1 - phase%) = kind
        BugLife(j, i, 1 - phase%) = life
    Next i
End Sub

Sub UpdateBugs (phase%)
    If Rnd > 0.5 Then
        For j = SH To 1 Step -1
            UpdateLine j, phase%
        Next j
    Else
        For j = 1 To SH
            UpdateLine j, phase%
        Next j
    End If
    ' New Births
    For n = 1 To 50
        kind = Int((species - 1) * Rnd) + 1
        life = maximum_life
        i = 1 * Int(Rnd * (SW - 1))
        j = 1 * Int(Rnd * (SH - 1))
        BugColor(j, i, 1 - phase%) = kind
        BugLife(j, i, 1 - phase%) = life
    Next n
End Sub

Function Eaten% (kind, row, col, phase%)
    Eaten% = 0
    If (row > SH) Or (row < 1) Then
        Exit Function
    End If
    If (col > SW) Or (col < 1) Then
        Exit Function
    End If
    prey = BugColor(row, col, phase%)
    If prey < 1 Then
        If Rnd > 0.42 Then Exit Function
        BugColor(row, col, 1 - phase%) = kind
        BugLife(row, col, 1 - phase%) = maximum_life
        Eaten% = 1
        Exit Function
    End If
    eats = EatsColor(kind)
    If prey <> eats Then
        Exit Function
    End If
    elude = Int(Rnd * max_voracity)
    If elude < Voracity(kind) Then
        BugColor(row, col, 1 - phase%) = kind
        BugLife(row, col, 1 - phase%) = maximum_life
        Eaten% = 1
    End If
End Function

Function Forage% (kind, row, col, phase%)
    n = 0
    n = n + Eaten%(kind, row, col - 1, phase%)
    n = n + Eaten%(kind, row, col + 1, phase%)
    n = n + Eaten%(kind, row - 1, col, phase%)
    n = n + Eaten%(kind, row - 1, col - 1, phase%)
    n = n + Eaten%(kind, row - 1, col + 1, phase%)
    n = n + Eaten%(kind, row + 1, col, phase%)
    n = n + Eaten%(kind, row + 1, col - 1, phase%)
    n = n + Eaten%(kind, row + 1, col + 1, phase%)
    Forage% = n
End Function


