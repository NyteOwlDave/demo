Dim musicdata$(113)

ChDir "/home/dave/Apps/qb64/bas/dash"

Open "voice1data" For Input As #1
Open "voice2data" For Input As #2

musicdata$(0) = "l10"

For i = 1 To 113
    Input #1, v1$
    Input #2, v2$
    musicdata$(i) = v1$ + "," + v2$
Next i

Close #2
Close #1

For i = 0 To 113
    Play musicdata$(i)
Next i
Do
Loop While InKey$ = ""

