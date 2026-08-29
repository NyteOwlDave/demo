
var x,y,i,p,j,w,h,turn,x1,y1,rc,gc,bc

wcolor 60,0,0 : fcolor 220,200,0

w=800 : h=800 : j=1

while turn < 70

  i = 0
  rc = rand(250)
  gc = rand(250)

  fcolor rc,gc,0

  p = rand(50)

  while i < 1.78

    j = -j
    x = x1 + w/16 + p*j*i
    y = y1 + h/16 + ( sqr(cos(i)) * cos(313*i) - sqr(i) )
    pset x, y

    i = i + 0.0005

  wend

  swap

  turn = turn + 1
  x1 = rand(w)
  y1 = rand(h)

wend


