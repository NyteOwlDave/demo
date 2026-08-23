   01 REM ~ BBC Basic 
   10 MODE20:VDU 23;8202;0;0;0;
   11 FORA%=1 TO 15 : VDU19,A%,16,A%*16,A%*16,A%*16:NEXT
   20 DATA 4,1,5,2,6,3
   30 REM FOR n%=1 TO 6:READ c%:VDU 19,n%,c%,0,0,0:NEXT n%
   40 DATA 0,3,4,7,5
   50 DIM cl%(5):FOR n%=1 TO 5:READ cl%(n%):NEXT n%
   60 s%=5:DIM c(s%,3):DIM r(s%):DIM q(s%)
   70 FOR k=1 TO s%:READ c(k,1),c(k,2),c(k,3),r:r(k)=r:q(k)=r*r:NEXT k
   80 DATA -0.9,-1,3.2,.6
   90 DATA 0,-0.45,2,.3
  100 DATA .2,-1.3,3,.3
  110 DATA .4,-1,4,.6
  120 DATA 1.3,-0.7,2.5,.5
  130 FOR i%=0 TO 1023 STEP 2:FOR j%=0 TO 1279 STEP 2
  140 x=0.3:y=-0.5:z=0:ba%=3:dx=j%-640:dy=512-i%:dz=900:dd=dx*dx+dy*dy+dz*dz
  150 GOSUB 170:NEXT j%:NEXT i%
  160 REM g%=GET:*screensave rtM20/spr
  161 END
  170 n%=(y>=0 OR dy<=0):IF NOT n% THEN s=-y/dy
  180 FOR k%=1 TO s%
  190 px=c(k%,1)-x:py=c(k%,2)-y:pz=c(k%,3)-z
  200 sc=px*dx+py*dy+pz*dz
  210 IF sc<=0 THEN GOTO 260
  220 bb=sc*sc/dd
  230 aa=q(k%)-(px*px+py*py+pz*pz)+bb
  240 IF aa<=0 THEN GOTO 260
  250 sc=(SQR bb-SQR aa)/SQR dd:IF sc<s OR n%<0 THEN n%=k%:s=sc
  260 NEXT k%
  270 IF n%<0 THEN GCOL 0,1+(dy*dy/dd)*15:PLOT 69,j%,i%:n%=0:RETURN
  280 dx=dx*s:dy=dy*s:dz=dz*s:dd=dd*s*s
  290 x=x+dx:y=y+dy:z=z+dz
  300 IF n%=0 THEN GOTO 350
  310 nx=x-c(n%,1):ny=y-c(n%,2):nz=z-c(n%,3)
  320 l=2*(dx*nx+dy*ny+dz*nz)/(nx*nx+ny*ny+nz*nz)
  330 dx=dx-nx*l:dy=dy-ny*l:dz=dz-nz*l
  340 GOTO 170
  350 FOR k%=1 TO s%
  360 u=c(k%,1)-x:v=c(k%,3)-z: IF u*u+v*v<=q(k%) THEN ba%=1
  370 NEXT k%
  380 IF (x-INT x>.5)=(z-INT z>.5) THEN GCOL 0,cl%(ba%) ELSE GCOL 0,cl%(ba%+1)
  390 PLOT 69,j%,i%
  400 RETURN
 
