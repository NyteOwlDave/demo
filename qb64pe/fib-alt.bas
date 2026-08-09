
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' [ Fibonacci Numbers ]
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

_Title "Fibonacci and The Golden Ratio"

' For Alternate Function
Const SR5# = Sqr(5)
Const PHI# = (1 + SR5#) / 2 ' Golden Ratio
Const IHP# = (1 - SR5#) / 2 ' Golden Conjugate


Screen 0: Width 80, 30

Test2

Sleep: End


Sub Test1 (n)
    Locate , 4
    Print "N:"; n, "FIB:"; Fib(n), "ALT:"; FibAlt(n)
End Sub

Sub Test2 ()
    Color 14, 1
    Cls
    Print
    For n = 1 To 25
        Test1 n
    Next n
End Sub


' [ Fibonacci Alternate ]
Function FibAlt& (n)
    num# = (PHI# ^ n) - (IHP# ^ n)
    FibAlt& = Int(num# / SR5#)
End Function

' [ Fibonacci Standard (Recursive) ]
Function Fib& (n)
    If (n < 1) Then
        Fib& = 0
        Exit Function
    End If
    If (n < 2) Then
        Fib& = 1
        Exit Function
    End If
    Fib& = Fib&(n - 1) + Fib&(n - 2)
End Function


