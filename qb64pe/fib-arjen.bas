
_Title "Arjen's Idea"

Const SR5# = Sqr(5)
Const PHI# = (1 + SR5#) / 2

Width 80, 30

Test2
Sleep
End

' [ Fibbonacci - Short Implementation ]
Function Fib& (n)
    Fib& = _Max(0, n)
    If (n < 2) Then
        Exit Function
    End If
    Fib& = Fib&(n - 1) + Fib&(n - 2)
End Function

' [ Fibbonacci - Arjen ]
Function FibA& (n%)
    FibA& = Int(PHI# ^ n% + 0.5)
End Function


Sub Test1 (n)
    Locate , 3
    Print "N:"; n, "FIB:"; Fib&(n), "ALT:"; FibA&(n)
End Sub

Sub Test2 ()
    Color 14, 1
    Cls
    Locate 2
    For n = 1 To 25
        Test1 n
    Next n
End Sub


