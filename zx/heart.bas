
REM ~ heart-outline.bas
REM ~ Spectrum ZX (probly!)
REM ~ Author : Mimmo Derix
REM ~ Group  : BASIC Programming

w = 600 : cx = w \ 2
h = 600 : cy = h \ 2

scale = 65

color black
line  0, cy,  w, cx
line cx,  0, cy,  h

color red

x0 = -2.0 : xn = 2.0 : xd = 0.005

for x = x0 to xn step xd

  px = cx + x * scale;

  arg1 = 1 - ( abs( x ) -1 ) ^ 2
  if ( arg1 >= 0 ) then
     y = sqrt( arg1 )
     py = cy - y * scale
     plot px, py
  end if

  arg2 = 1 - sqrt( abs( x ) / 2 )
  if ( arg2 >= 0 ) then
     y = -2.5 * sqrt( arg2 )
     py = cy - y * scale
     plot px, py
  end if

next x

refresh

REM ~ [Look](./)

