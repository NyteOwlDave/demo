
basic_source = ( `
01 REM Jan Hroch
02 Sean Hodges
20 GCLEAR
30 SCALE 0,700,0,700
40 FOR Y=-22 TO 22 STEP 1.5
50 FOR X=-22 TO 22
70 D=SQR(X*X+Y*Y)
80 Z=50
90 IF D>0 THEN Z=Z*SIN(D)/D
100 SX=INT(320+(X-Y)*7)
110 SY=INT(160+(X+Y)*3+Z*4)
120 IF X=-22 THEN MOVE SX,SY
130 PLOT SX,SY
140 NEXT X
150 NEXT Y
` );

SelfDot =( x, y )=> ( x*x + y*y );

init_screen = function() {
  Background();
  Pen( "gold" );
  srf= Surface();
  SW = srf.width;
  SH = srf.height;
  CX = SW / 2;
  CY = SH / 2;
};

random_pixels = function() {
  n=0;
  while ( ++n <= SW * SH * .125 ) {
    x = irnd( SW );
    y = irnd( SH );
    Pen.dot( x, y );
  }
};

render_demo = function() {
  init_screen();
  let pt0, pt1;
  for( let y = -22; y <= 22; y += 0.42 ) {
    for( let x = -22; x <= 22; x += 0.42 ) {
      let d = SelfDot( x, y );
      let z = 50;
      if ( d > 0 ) { z=z*sin(d)/d; }
      let sx = floor( CX + ( x - y ) * 6 );
      let sy = floor( CY - ( x + y ) * 3 - z * 4 );
      if ( x === -22 ) {
         pt0 = Point( sx, sy );
         tx = sx; ty = sy;
      } else {
         pt1 = Point( sx, sy );
         Pen.lineseg( pt0, pt1, "blue" );
         pt0 = pt1;
      }
    } // next x
  }   // next y
};


;
; ( 1 ) && render_demo()
; ( 0 ) && random_pixels()
;

