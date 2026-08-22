1 REMark ~ 'lissajous' 3d wave knot
2 REMark ~ Author : David Mainprize
3 REMark ~ For : BASIC Programming Language
4 REMark ~ Platform : Sinclair QL
10 SCALE 2, -2, -1
20 PAPER 1 : INK 7 : CLS : CLS#0
30 A=0 : t=0
40 x-0 : y=0
50 inc=0
60 REPeat loop
70 x=sin(2*t)*cos(A) - cos(3*t)*sin(A)
80 x=sin(2*t)*sin(A) + cos(3*t)*cos(A)
90 POINT x,y
100 t=t+1
110 A=A+0.5
120 inc=inc+1 : IF inc=2000 THEN EXIT loop
130 END REPeat loop
