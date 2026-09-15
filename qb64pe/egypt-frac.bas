' Using sVB code to derive Egyptian fractions (unit fractions)
' By, Eng. M. Hamdy
' Ported to QB64pe

$Console:Only

t = Timer
N = 8
X = 1 / N
Start = Date.Now

For I = N + 1 To 100
    Y = 1 / I
    For J = 100 To I + 1 Step -1
        Z = Y + 1 / J
        If Z = X Then ' Sum of 2 fractions
            Print "1/"; N; " = 1/"; I; " + 1/;j"
        ElseIf Z > X Then
            Exit For
        Else
            K = (N * I * J) / (I * J - N * (I + J))
            If K Mod 1 = 0 Then ' Sum of 3 fractions
                Print "1/"; N; " = 1/"; I; " + 1/"; J; " + 1/"; K
            End If
        End If
    Next
Next
Print "Time = "; Timer - t; " seconds"

'(could use an option to filter out non-integral divisors)
If Abs(K - Int(K)) < 0.0001 Then
    If K Mod 1 = 0 Then ' Sum of 3 fractions
        Print "1/"; N; " = 1/"; I; " + 1/"; J; " + 1/"; K
    End If
End If
