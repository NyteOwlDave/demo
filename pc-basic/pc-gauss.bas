1 REM *******************************************
2 REM ** SOLVER OF SYSTEMS OF LINEAR EQUATIONS **
3 REM ** USING THE GAUSS-JORDAN METHOD         **
4 REM *******************************************
5 REM ** DERIVED : guass-2.bas                 **
6 REM *******************************************
7 REM ** NEVER TESTED                          **
8 REM *******************************************
15 DIM MAT(26,27)
20 LIT=ASC("a")
25 PRINT
30 PRINT "LINEAR EQUATIONS SOLVER"
40 PRINT "-----------------------"
50 PRINT
60 PRINT "Unknown Quantities: ";
70 INPUT UQS
80 PRINT
90 PRINT "Enter the Coefficients..."
100 FOR I=1 TO UQS
110 PRINT
120 PRINT "Equation: ";I
130 FOR J=1 TO UQS+1
140 IF J>UQS THEN GOTO 190
150 PRINT "coeff_";CHR$(LIT+J-1);" = ";
160 INPUT MATV
170 MAT(I,J)=MATV
180 GOTO 220
190 PRINT "indep_t = ";
200 INPUT ITERM
210 MAT(I,J)=ITERM
220 NEXT J
230 NEXT I
240 FOR I=1 TO UQS
250 FOR J=1 TO UQS+1
260 IF I=J THEN GOTO 280
270 MAT(I,J)=MAT(I,J)/MAT(I,I)
280 NEXT J
290 FOR K=1 TO UQS
300 IF K=I THEN GOTO 350
310 FOR J=1 TO UQS+1
320 IF I=J THEN GOTO 340
330 MAT(K,J)=MAT(K,J)-MAT(K,I)*MAT(I,J)
340 NEXT J
350 NEXT K
360 NEXT I
370 PRINT
380 PRINT "Solution:"
390 FOR I=1 TO UQS
400 PRINT CHR$(LIT+I+1);" = ";MAT(I,UQS+1)
410 NEXT I
420 END
