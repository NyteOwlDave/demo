
----------------------------------------------------------------

# To-Do ~ Port w/ Lissajous Editor

> ( `toroid-bas.md` )

----------------------------------------------------------------

> [Lissajous Editor](./lissajous.html)

----------------------------------------------------------------

```basic

01 REMark ' Toroid Shape
02 REMark ' Sinclair QL
03 REMark ' Jonathan D. Gilbert
04 REMark ' David Mainprize
05 REMark ' NyteOwl Dave
10 WINDOW 512,256,0,0: SCALE 2,-1.5,-1
20 PAPER 1: INK 7: CLS: CLS #0
30 PI2 = 2 * PI
40 CAMDIST = 6
50 REMark Presentation angle: 30 degrees
60 A3 = -30 * PI2 / 360
70 C3 = COS(A3): S3 = SIN(A3)
80 REMark Presentation offset: move up a bit
90 OY = .75
95 A1 = 0: A2 = 0
100 REPeat loop
110 A1 = A1 + .1
120 IF A1 >= PI2 THEN A1 = A1 - PI2
130 A2 = A2 + (COS(A1) + 1.2) * 2e-2
140 IF A2 >= PI2 THEN A2 = A2 - PI2
150 REMark Generate pointo n surface of tube at angle 0
160 X1 = COS(A1) + 3: Y = SIN(A1)
170 REMark Rotate (top-down) to correct position in tube. Y is unchanged.
180 C2 = COS(A2): S2 = SIN(A2)
190 X = X1 * C2
200 Z = X1 * S2
210 REMark Rotate (from side) for presentation. X is unchanged.
220 YY = Y * C3 - Z * S3
230 ZZ = Y * S3 + Z * C3
240 REMark Vertical offset.
250 YY = YY + OY
260 REMark Project
270 SZ = ZZ + CAMDIST
280 SX = X / SZ: SY = YY / SZ
290 POINT SX, SY
300 IF INKEY$ <> "" THEN EXIT loop
310 END REPeat loop

```

----------------------------------------------------------------

