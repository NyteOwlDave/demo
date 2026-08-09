REM Pike's Peak
X2=8 : Y2=8 : REM starting point
CLS
SCREEN 9
FOR X=0 TO 20
    FOR Y=0 TO 20
        D=SQR((X-X2)^2+(Y-Y2)^2)
        XNEW=300+14*Y-X*10
        YNEW=150+X*4+Y*5-150*COS(D/3)/(D+1)
        IF Y <> 0 THEN
            YD=(YNEW-YOLD)/(XNEW-XOLD) : REM delta y
            Y4=YOLD
            FOR N=XOLD TO XNEW
                LINE (N,380)-(N,Y4),0 : REM blank line
                Y4=Y4+YD
            NEXT N
            LINE (XOLD,YOLD)-(XNEW,YNEW),10
        END IF
        XOLD=XNEW
        YOLD=YNEW
    NEXT Y
NEXT X
