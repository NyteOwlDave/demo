
/* rgba.js */


function _RGB( r, g, b ) {
	return { r, g, b };
};

function _RGBA( r, g, b, a ) {
	return { r, g, b, a };
};

function RandomRGB() {
 	const r = Floor( Random() * 255.5 );
 	const g = Floor( Random() * 255.5 );
 	const b = Floor( Random() * 255.5 );
    return _RGB( r, g, b );
}

function RandomRGBA() {
    function byte( n ) {
        n = Floor( n );
        return Median( n, 0, 255 );
    }
 	const r = Floor( Random() * 255.5 );
 	const g = Floor( Random() * 255.5 );
 	const b = Floor( Random() * 255.5 );
 	const a = Floor( Random() * 255.5 );
    return _RGBA( r, g, b, a );
}

function ScaleRGB( c, scale ) {
    function byte( n ) {
        n = Floor( n );
        return Median( n, 0, 255 );
    }
    const r = byte( c.r * scale );
    const g = byte( c.g * scale );
    const b = byte( c.b * scale );
    return _RGB( r, g, b );
}

function RandomPalette( count ) {
    const colors = [];
    while ( count-- > 0 ) {
        colors.push( RandomRGB() );
    }
    return colors;
}

