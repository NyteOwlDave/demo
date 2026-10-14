' QuickBasic Demo of "grid life"
' Bobby Brightling
DECLARE SUB CalcGen (gen1 AS INTEGER, gen2 AS INTEGER)
DECLARE SUB DisplayGen (gen AS INTEGER)
' A cellular automata, similar to Conway's life.
' The objects are lines in a square grid.
' Rules
Const LONE1 = 0: Const LONE2 = 2: Const OVER1 = 6: Const OVER2 = 7
Const BIRTH1 = 3: Const BIRTH2 = 5: Const SAME1 = 5: Const SAME2 = 5
Const ROWS = 150: Const COLS = 100
Const COLS2 = 2 * COLS: Const CELLS = ROWS * COLS
Const XSPACE = 640 \ COLS: Const YSPACE = 480 \ ROWS
Const YSPACE2 = YSPACE * 2
Const XOFF = 10: Const YOFF = 10
Const COLOROFF = 0: Const COLORON = 14
Common Shared cell() As Integer
ReDim cell(CELLS, 1) As Integer
Dim gen1 As Integer, gen2 As Integer
Dim keyP As String
gen1 = 0: gen2 = 1
Screen 12
Randomize Timer
' Create a random grid.
c = 0
For row = 3 To ROWS - 2
    For col = 2 To COLS - 1
        If Int(Rnd * 5) = 0 Then
            cell(c, gen1) = 1
        Else
            cell(c, gen1) = 0
        End If
        cell(c, gen2) = cell(c, gen1)
        c = c + 1
    Next col
Next row
' Update generations until <Esc> is pressed.
Do
    Swap gen1, gen2
    CalcGen gen1, gen2
    DisplayGen gen1
    keyP = InKey$
Loop Until keyP = Chr$(27)
Sub CalcGen (gen1 As Integer, gen2 As Integer)
    Dim c As Integer, ct As Integer
    c = COLS2
    For row = 3 To ROWS - 2
        For col = 2 To COLS - 1
            If row Mod 2 = 0 Then ' Horizontal row
                ct = cell(c, gen2)
                ct = ct + cell(c - 1, gen2): ct = ct + cell(c + 1, gen2)
                ct = ct + cell(c - COLS, gen2): ct = ct + cell(c - COLS + 1, gen2)
                ct = ct + cell(c + COLS, gen2): ct = ct + cell(c + COLS + 1, gen2)
            Else ' Vertical row
                ct = cell(c, gen2)
                ct = ct + cell(c - COLS2, gen2): ct = ct + cell(c + COLS2, gen2)
                ct = ct + cell(c - COLS - 1, gen2): ct = ct + cell(c - COLS, gen2)
                ct = ct + cell(c + COLS - 1, gen2): ct = ct + cell(c + COLS, gen2)
            End If
            Select Case ct
                Case LONE1 To LONE2, OVER1 To OVER2
                    cell(c, gen1) = 0
                Case BIRTH1 To BIRTH2
                    cell(c, gen1) = 1
                Case Else
                    cell(c, gen1) = Abs(1 - cell(c, gen2))
            End Select
            c = c + 1
        Next col
    Next row
End Sub
' Displays the current generation.
Sub DisplayGen (gen As Integer)
    Dim x As Integer, y As Integer, c As Integer
    y = YOFF
    c = 0
    For row = 1 To ROWS
        x = XOFF
        For col = 1 To COLS
            If row Mod 2 = 0 Then ' Horizontal row
                If cell(c, gen) Then
                    Line (x, y)-Step(XSPACE, 0), COLORON
                Else
                    Line (x, y)-Step(XSPACE, 0), COLOROFF
                End If
            Else ' Vertical row
                If cell(c, gen) Then
                    Line (x, y - YSPACE)-Step(0, YSPACE2), COLORON
                Else
                    Line (x, y - YSPACE)-Step(0, YSPACE2), COLOROFF
                End If
            End If
            x = x + XSPACE
            c = c + 1
        Next col
        y = y + YSPACE
    Next row
End Sub

