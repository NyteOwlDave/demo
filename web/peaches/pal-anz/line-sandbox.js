
// Prepare 2D Transform
Surface.xform = function( xo, yo, scale ) {
   return { xo, yo, scale };
};

// Plot Line Using y = mx + b
Pen.line = function( m, b, xform, c ) {
   const mx = Surface.metrics();
   const xo = xform.xo;
   const yo = xform.yo;
   const scale = xform.scale;
   let x1,y1,x2,y2;
   const xx =( x )=> ( xo + x );
   const yy =( y )=> ( yo - y*scale );
   const f  =( x )=>  ( m * x + b );
   const lineseg =()=> {
      const pt0 = Point( xx( x1 ), yy( y1 ) );
      const pt1 = Point( xx( x2 ), yy( y2 ) );
      Pen.lineseg( pt0, pt1, c );
   };
   x1 = 0;         y1 = f( x1 );
   x2 = x1 + mx.w; y2 = f( x2 );
   // Draw Trend Line Segment
   lineseg();
   // Draw Y-Intercept Marker
   Pen.circle( xx( x1 ), yy( y1) , 10, c );
};

// Plot Regression Trend Line
Pen.trend = function( stats, xo=10, yo=266, h=256, c ) {
   const m = stats.m;
   const b = stats.b;
   const xform = Surface.xform( xo, yo, h );
   Pen.line( m, b, xform, c );
};



