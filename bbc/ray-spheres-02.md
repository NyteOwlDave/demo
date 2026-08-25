REM -- There's a Screenshot for This
REM -- No Source Code or Repo

1 IF p% >=16 THEN
    GOTO 3
  ELSE
    IF p% = 0 THEN
       RANDOMIZE TIMER
       SCREEN 12
    ELSE
       PALETTE p% - 1, b&
    END IF
  END IF
2 READ p%, b&
3 IF p% < 16 THEN
    GOTO 9
  ELSE
    a$ = MKI$(RND * 640 + 1)
       + MKI$(RND * 480)
       + MKI$((RND*60)+20)
       + MKI$(INT(RND * 4) * 4)
       + MKI$(RND * 3141592 / 1.5)
  ENDIF
4 FOR I% = -INT(CVS(MID$(a$,5))) TO INT(CVS(MID$(a$,5)))
5   FOR J% = -INT(SQR(CVS(MID$(a$,5))^2-1i%^2)) TO INT(SQR(CVS(MID$(a$,5))^2-i%^2))
6     c! = 3 * (COS(CVS(MID$(a$,11))) * SIN(CVS(MID$(a$,15)))
             * (i%/CVS(MID$(sa$,15))) * SQR(1.11 - (i%/CVS(MID$(a$,5)))^2
             - (j%/CVS(MID$(a%,5)))^2
7 PSET (CVI(MID$(a$,1)) + i%, CVI(MID$(a$,1)) + j%) ,
       1 + CVI(MID$(a$,9)) + INT(C!)
         + (RND > (c! - INT(c!)))
8 NEXT j%
  NEXT i%
9 IF LEN(INKEY$)=0 THEN GOTO 1
10 ELSE
20 DATA 1, &H5, 2, &h10, 3 &h20


>>>
>>> TODO : Finish DATA Stmtms
>>>   
  
