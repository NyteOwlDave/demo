
/* geom-2d.js */


function RandomPoint( x, y, w, h ) {
    x += Floor( w * Random() );
    y += Floor( h * Random() );
    return Point( x, y );
}

function RandomSize( wlo, hlo, whi, hhi ) {
    const w = wlo + Floor( whi - wlo );
    const h = hlo + Floor( hhi - hlo );
    return Size( w, h );
}

function RandomRect( xhi, yhi, whi, hhi ) {
    const x = Floor( xhi * Random() );
    const y = Floor( yhi * Random() );
    const w = Floor( whi * Random() );
    const h = Floor( hhi * Random() );
    return Rect( x, y, w, h );
}

function Point( x, y ) {
    return { x, y };
}

function Size( w, h ) {
    return { w, h };
}

function Rect( x, y, w, h ) {
    return { x, y, w, h };
}

function LineSeg( x1, y1, x2, y2 ) {
    return { x1, y1, x2, y2 };
}

function Circle( cx, cy, radius ) {
    return { cx, cy, radius };
}

function Ellipse( cx, cy, rx, ry ) {
    return { cx, cy, rx, ry };
}

function Trigon( a, b, c ) {
    return { a, b, c };
}

function Triangle( ta, tb, tc ) {
    return { ta, tb, tc };
}

function Ray( nx, ny, t ) {
    return { nx, ny, t };
}

function Poly( cx, cy, cz, sides, angle ) {
    return { cx, cy, cz, sides, angle };
}

function PointList( points ) {
    points = ( points || [] );
    return { points };
}


Geom2dOps = {
  RandomPoint
, RandomSize
, RandomRect
, Point, Size, Rect
, LineSeg
, Circle, Ellipse
, Trigon, Triangle
, Ray, Poly, PointList
};

