10 REM ZXASCII
20 REM AUTO -1
30 REM PROG demos:graphics/flagwave
40 REM CHANGED FALSE
180 REM =====================================================================
110 REM Waving Flag
150 SCREEN LOCK
160 DEF FN x=phase+x/c*tau+y/c*tau
170 GO SUB 1000
180 REM =====================================================================
200 c=25,e=20,st=MIN(SCRw-40,SCRh-40)/c,cx=(SCRw-40)/st,phase=0,d=c/2
250 CLS 0
210 phase+=0.075
220 FOR y=1 TO c
230 FOR x=1 TO cx
300 xp=x*st+d,yp=y*st+d,xs=e*SIN FN x,ys=e*COS FN x
350 CIRCLE INK GPOINT(flag,xp,yp);xp+xs,yp+ys,6 FILL
400 NEXT x
410 NEXT y
420 WAIT SCREEN
420 GO TO 40
180 REM =====================================================================
1000 REM Draw a union flag
1100 GRAPHIC NEW flag,SCRw,SCRh
1110 WINDOW GRAPHIC flag
1150 b=SCRh,r=SCRw,th=b/3,tth=b*2/3,ho=b/4.472,vo=b/8.944
1200 RECTANGLE INK 1;0,0 TO r,b FILL
1210 INK 7
1250 POLYGON 0,0 TO ho,0 TO r,b-vo TO r,b TO r-ho,b TO 0,vo FILL
1300 POLYGON 0,b TO ho,b TO r,vo TO r,0 TO r-ho,0 TO 0,b-vo FILL
1350 vo=b/13.41,ho=r/3,ho2=(b/3-vo)*(r/b)
1360 INK 2
1400 POLYGON 0,0 TO ho,th TO ho2,th TO 0,vo FILL
1450 POLYGON r,b TO r-ho,tth TO r-ho2,tth TO r,b-vo FILL
1500 ho2=ho+(b/6.945)
1510 POLYGON 0,b TO ho2-ho,b TO ho2,tth TO ho,tth FILL
1550 POLYGON r,0 TO r-ho,th TO r-ho2,th TO r-ho2+ho,0 FILL
1600 INK 7
1610 RECTANGLE r*5/12,0 TO r*7/12,b FILL
1620 RECTANGLE 0,b/3 TO r,b*2/3 FILL
1650 INK 2
1660 RECTANGLE r*9/20,0 TO r*11/20,b FILL
1670 RECTANGLE 0,b*2/5 TO r,b*3/5 FILL
1700 WINDOW 0
1710 RETURN

