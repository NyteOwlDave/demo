' *******************************************
' ** SOLVER OF SYSTEMS OF LINEAR EQUATIONS **
' ** USING THE GAUSS-JORDAN METHOD         **
' *******************************************
' ** ORIGINAL : guass.bas                  **
' *******************************************
' ** NEVER TESTED!                         **
' *******************************************

Dim MAT(26, 27)
LIT = Asc("a")

Print
Print "LINEAR EQUATIONS SOLVER"
Print "-----------------------"
Print
Print "Unknown Quantities: ";
Input UQS
Print
Print "Enter the Coefficients..."

For I = 1 To UQS
    Print
    Print "Equation: "; I
    For J = 1 To UQS + 1
        If J <= UQS Then
            Print "indep_t = ";
            Input ITERM
            MAT(I, J) = ITERM
        Else
            Print "coeff_"; Chr$(LIT + J - 1); " = ";
            Input MATV
            MAT(I, J) = MATV
        End If
    Next J
Next I

For I = 1 To UQS
    For J = 1 To UQS + 1
        If I <> J Then
            MAT(I, J) = MAT(I, J) / MAT(I, I)
        End If
    Next J
    For K = 1 To UQS
        If K <> I Then
            For J = 1 To UQS + 1
                If I <> J Then
                    MAT(K, J) = MAT(K, J) - MAT(K, I) * MAT(I, J)
                End If
            Next J
        End If
    Next K
Next I

Print
Print "Solution:"
For I = 1 To UQS
    Print Chr$(LIT + I + 1); " = "; MAT(I, UQS + 1)
Next I
End


