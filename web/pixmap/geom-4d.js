
/* geom-4d.js */

function RandomPoint4( x, y, z, w, dx, dy, dz, dw) {
    x += Floor( dx * Random() );
    y += Floor( dy * Random() );
    z += Floor( dz * Random() );
    w += Floor( dw * Random() );
    return Point3( x, y, z );
}

function Point4( x, y, z, w ) {
    return { x, y, z, w };
}

function Size4( w, h, d, t ) {
    return { w, h, d, t };
}

function LineSeg4( x1, y1, z1, w1, x2, y2, z2, w2 ) {
    return { x1, y1, z1, w1, x2, y2, z2, w2 };
}

function HyperCube( x, y, z, w, dw, dy, dz, dw ) {
    return { x, y, z, w, dx, dy, dz, dw };
}

function HyperEllipe( cx, cy, cz, cw, rx, ry, rz, rw ) {
    return { cx, cy, cz, cw, rx, ry, rz, rw };
}

function PointList4( points ) {
    points = ( points || [] );
    return { points };
}

