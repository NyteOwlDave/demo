
/* polygon.js */


// Singleton Polygon Object
const Polygon = {
    // Algebraic sign [ -1, 0, +1 ]
    sign: function( r ) {
        if ( r > Vec.TINY ) {
            return 1;
        }
        if ( r < -Vec.TINY ) {
            return -1;
        }
        return 0;
    },
    // Determine 2D polygon orientation
    // p0, p1, p2 -- polygon vertices
    // Returns:
    // +1 for CW
    // -1 for CCW
    // 0 for degenerate
    orientation: function( p0, p1, p2 ) {
        const ops = Polygon;
        const d1 = {}, d2 = {};
        d1.x = p1.x - p0.x; d1.y = p1.y - p0.y;
        d2.x = p2.x - p1.x; d2.y = p2.y - p1.y;
        return ops.sign( d1.x * d2.y - d1.y * d2.x );
    }
};

