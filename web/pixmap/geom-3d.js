
/* geom-3d.js */

function RandomPoint3( x, y, z, w, h, d ) {
    x += Floor( w * Random() );
    y += Floor( h * Random() );
    z += Floor( d * Random() );
    return Point3( x, y, z );
}

function Point3( x, y, z ) {
    return { x, y, z };
}

function Size3( w, h, d ) {
    return { w, h, d };
}

function LineSeg3( x1, y1, z1, x2, y2, z2 ) {
    return { x1, y1, z1, x2, y2, z2 };
}

function Cuboid( x, y, z, w, h, d ) {
    return { x, y, z, w, h, d };
}

function Ellipsoid( cx, cy, cz, rx, ry, rz ) {
    return { cx, cy, cz, rx, ry, rz };
}

function Sphere( cx, cy, cz, radius ) {
    return { cx, cy, cz, radius };
}

function Plane( a, b, c, d ) {
    return { a, b, c, d };
}

function Ray3( nx, ny, nz, t ) {
    return { nx, ny, nz, t };
}

function Patch( pa, pb, pc ) {
    return { pa, pb, pc };
}

function Poly3( cx, cy, cz, sides, angle ) {
    return { cx, cy, cz, sides, angle };
}

function PointList3( points ) {
    points = ( points || [] );
    return { points };
}


Geom3dOps = {
  RandomPoint3
, Point3
, Size3
, LineSeg3
, Ray3
, Plane
, Cuboid
, Ellipsoid
, Sphere
, Patch
, Poly3
, PointList3
};

