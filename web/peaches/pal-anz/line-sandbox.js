Surface.xform = function( xo, yo, scale ) {
   return { xo, yo, scale };
};

Pen.line = function( m, b, xform, c ) {
   const mx = Surface.metrics();
   let x = xform.xo;
   let y = xform.yo + b;
   let x1 = 0; 
   let dx = ( x1 - x );
   let dy = ( dx * m );
   let y1 = ( dy + y );
   let x2 = ( mx.w );
   dx = ( x2 - x );
   dy = ( dx * m );
   let y2 = ( dy + y );
   let p0 = Point( x1, y1 );
   let p1 = Point( x1, y2 );
   Pen.lineseg( p0, p1, c );
   Pen.circle( x, y, 10, c );
};

