'Matrices.
'Matrix multiplication
'addition and subtraction
'Inverses and scalar multiply.
'...by David Mainprize Oct 3rd/4th/5th/6th/7th 2026
'(Assistance with code 'Mathematics on the Sinclair QL' Book
'- Czes Kosniowski)
'Refs to 'Mathematics Describing the Real World...'- Prof. Bruce H Edwards.
''Mathematics A Level Course Companion'-D.Graham,C.Graham & A.Whitcombe.
'And of course, info from my phone (Google).

'main:
Clear

Color 7, 1 'White on blue background
Cls

Common Shared m, n1, n2, p, n As Integer '!!!!!
Common Shared two_mtx, single_mtx As Integer
Common Shared inv, scalar_mult As Integer
Common Shared k As Single

two_mtx = 0: single_mtx = 0
inv = 0: scalar_mult = 0
add_sub = 0: mult = 0
op = 0

Print "Matrices Oct 2026 by DpM."
Print: Print "One matrix key 1 (Inverse, scalar multiple)"
Print: Print "Two matrices key 2 (Addition, Subtraction, Multiplication)"
Print

Do
    key$ = InKey$
    If key$ = "1" Then single_mtx = 1: Exit Do
    If key$ = "2" Then two_mtx = 1: Exit Do
    If key$ = "x" Then Print "Exit.": End
Loop

Cls

If two_mtx Then
    Print "Two matrices. Operations,": Print
    get_mtx_order 1
    get_mtx_order 2
    If n1 <> n2 Then
        Print "Matrices not compatible": Print "for multiplication."
    End If
    If m = n2 And n1 = p Or m = n1 And n2 = p Then
        add_sub = 1
        Print "Matrices suitable for": Print "addition and subtraction."
    Else
        Print "Matrices not suitable"
        Print "for addition or subtraction."
    End If
    If (m = n1 And n2 = p And n1 = n2) Or n1 = n2 Then
        mult = 1
        Print "Matrices suitable for multiplication."
    End If

    If add_sub Or mult Then GoTo jump
    If Not add_sub And Not mult Then End

    jump:
    Print: Print "Operation?"
    If mult Then Print "Multiplication key m"
    If add_sub Then Print "Addition or Subtraction key a or s"
    Do
        op$ = InKey$
        If op$ = "m" And mult Then op = 1: Exit Do
        If op$ = "a" And add_sub Then op = 2: Exit Do
        If op$ = "s" And add_sub Then op = 3: Exit Do
        If op$ = "x" Then Cls: Print "Exit.": End
    Loop

    Dim Shared a(m, n1)
    Dim Shared b(n2, p)
    Dim Shared c(m, p)

    n = n1: '? (for the calculate_m multiplication sub
    Call get_matrix_elements(1, m, n1)
    Call get_matrix_elements(2, n2, p)
    Cls
    If op = 1 Then calculate_m
    If op = 2 Then calculate_a_s 2
    If op = 3 Then calculate_a_s 3

    Call display(1, m, n1)
    Call display(2, n2, p)
    Call display(3, m, p)
End If

If single_mtx Then
    Print "One matrix. Operations.": Print
    Print "Inverse key i"
    Print "Multiplication by a scalar quanity key k"
    Do
        op$ = InKey$
        If op$ = "i" Then inv = 1: Exit Do
        If op$ = "k" Then scalar_mult = 1: Exit Do
        If op$ = "x" Then Cls: Print "Exit.": End
    Loop
    If inv Then
        Cls
        Print "One matrix inverse."
        Print "Inverse (if it exists), only from a 'Square' matrix..."
        Input "Order n x n "; n
        Dim Shared a(n, n)
        Dim Shared b(n, n)
        If n >= 3 Then Dim Shared c(n + 1, n)
        Call get_matrix_elements(1, n, n)
        Cls
        If n = 0 Then End
        If n = 1 Or n = 2 Then
            Call inverse(n)
        Else
            Call inverse_higher_order
            'Regarding read-out of data... Matrix A and B?
        End If
        Call display(1, n, n)
        Call display(2, n, n)
    End If
    If scalar_mult Then
        Cls
        Print "Matrix by scalar.": Print
        get_mtx_order 1
        Dim Shared a(m, n1)
        Dim Shared b(m, n1)
        Call get_matrix_elements(1, m, n1)
        Input "Scalar quantity to multiply by "; k
        Cls
        Call scalar
        Call display(1, m, n1)
        Call display(2, m, n1)
    End If
End If
' GoTo main ?

Sub get_mtx_order (mtx_num)
    'Get Rows and Columns data
    If mtx_num = 1 Then
        Print "Order of matrix 1 (A) ?"
        Input "Rows "; m
        Input "Columns "; n1
    End If
    If mtx_num = 2 Then
        Print "Order of matrix 2 (B) ?"
        Input "Rows "; n2
        Input "Columns "; p
    End If
    Print
End Sub

Sub get_matrix_elements (mtx_num, mtx_rows, mtx_cols)
    'Read in the data
    Print: Print "Matrix "; mtx_num
    For i = 1 To mtx_rows
        Print "Row "; i
        For j = 1 To mtx_cols
            Print "Column "; j; " ";
            If mtx_num = 1 Then Input a(i, j)
            If mtx_num = 2 Then Input b(i, j)
        Next j
        Print
    Next i
End Sub

Sub calculate_m
    'Multiplication
    Print "Calculating...": Print
    Print "C=A*B": Print
    For i = 1 To m
        For j = 1 To p
            c(i, j) = 0
            For k = 1 To n
                c(i, j) = c(i, j) + a(i, k) * b(k, j)
            Next k
        Next j
    Next i
End Sub

Sub calculate_a_s (operation)
    'operation=2 addition
    'operation=3 subtraction
    Print "Calculating...": Print
    If operation = 2 Then Print "C=A+B": Print
    If operation = 3 Then Print "C=A-B": Print
    For i = 1 To m
        For j = 1 To p
            If operation = 2 Then
                c(i, j) = a(i, j) + b(i, j)
            End If
            If operation = 3 Then
                c(i, j) = a(i, j) - b(i, j)
            End If
        Next j
    Next i
End Sub

Sub inverse (order)
    'To get the inverse of a 1x1 or 2x2 matrix..
    Print "Calculating...": Print
    If order = 1 Then
        '1x1 matrix (single number).
        If a(1, 1) <> 0 Then
            Print a(1, 1)
            Print "Inverse of single value is its reciprocal "; 1 / a(1, 1)
            End
        End If
        If a(1, 1) = 0 Then
            Print "Zero matrix has no inverse."
            End
        End If
    End If
    If order = 2 Then
        '2x2 matrix.
        '|a b|
        '|c d|
        'First get the determinant ad-bc
        det = a(1, 1) * a(2, 2) - a(1, 2) * a(2, 1)
        Print "Determinant is "; det: Print
        If det = 0 Then
            Print "Matrix is singular. Therefore no inverse."
            End
        End If
        'Now get the inverse...
        '1/det * |d -b|
        '        |-c a|

        b(1, 1) = 1 / det * a(2, 2)
        b(1, 2) = 1 / det * -a(1, 2)
        b(2, 1) = 1 / det * -a(2, 1)
        b(2, 2) = 1 / det * a(1, 1)

    End If

End Sub

Sub inverse_higher_order
    'Compute for a matrix order, 3x3 or above...
    'This code Czes Kosniowski
    'Mathematics on the Sinclair QL' book 1984
    '(Adapted for QB64 DpM Oct '26)

    'Read matrix a into c, to preserve a
    For i = 1 To n
        For j = 1 To n
            c(i, j) = a(i, j)
        Next j
    Next i

    Print "Calculating...": Print
    For i = 1 To n
        b(i, i) = 1
    Next i
    x = 0
    flag = 1
    Do
        x = x + 1
        z = x
        Do
            If c(z, x) = 0 Then
                z = z + 1
            End If
            If c(z, x) <> 0 Or (z - n) > 1E-6 Then
                Exit Do
            End If
        Loop
        If (z - n) > 1E-6 Then 'Formally if z>n then
            Print "No Inverse!!"
            flag = 0
            End
        End If
        If flag Then
            If z <> x Then
                r = 1 / c(z, x)
                i = x
                k = z
                'Row operation. Add r times row k to row i
                For j = 1 To n
                    c(i, j) = c(i, j) + r * c(k, j)
                    b(i, j) = b(i, j) + r * b(k, j)
                Next j
            End If
            If 1 <> c(x, x) Then
                r = 1 / c(x, x)
                i = x
                'Row operation. Multiply row i by r
                For j = 1 To n
                    c(i, j) = r * c(i, j)
                    b(i, j) = r * b(i, j)
                Next j
            End If
            For i = 1 To n
                If i = x Then
                    i = i + 1
                End If
                If i <= n Then
                    If c(i, x) <> 0 Then
                        r = -c(i, x)
                        k = x
                        'Row operation. Add r times row k to row i
                        For j = 1 To n
                            c(i, j) = c(i, j) + r * c(k, j)
                            b(i, j) = b(i, j) + r * b(k, j)
                        Next j
                    End If
                End If
            Next i
        End If
        If x >= n Then Exit Do
    Loop
End Sub

Sub scalar
    'Multiply a matrix by a scalar quanity,k
    'Each element in the matrix, is multiplied by k.
    Print "Matrix multiplied by scalar "; k: Print
    Print "Calculating...": Print
    For i = 1 To m
        For j = 1 To n1
            b(i, j) = k * a(i, j)
        Next j
    Next i
End Sub

Sub display (mtx_num, mtx_rows, mtx_cols)

    mtx$ = ""
    If mtx_num = 1 Then mtx$ = "A"
    If mtx_num = 2 Then mtx$ = "B"
    If mtx_num = 3 Then mtx$ = "C"
    Print "Matrix "; mtx$
    If mtx_num = 3 Then
        If two_mtx Then Print "The result"
        For i = 1 To mtx_rows
            For j = 1 To mtx_cols: Print c(i, j), ;
            Next j
            Print
        Next i
    End If
    If mtx_num = 1 Then
        For i = 1 To mtx_rows
            For j = 1 To mtx_cols: Print a(i, j), ;
            Next j
            Print
        Next i
    End If
    If mtx_num = 2 Then
        If single_mtx Then
            If inv Then Print "The inverse"
            If scalar_mult Then Print "The result"
        End If
        For i = 1 To mtx_rows
            For j = 1 To mtx_cols: Print b(i, j), ;
            Next j
            Print
        Next i
    End If
    Print
End Sub

