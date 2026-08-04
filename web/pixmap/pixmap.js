
/* 

# Pixel Map

- pixmap.js

# Needs

- scalar.js
- rgba.js

*/

SW = 800;
SH = 800;

// https://developer.mozilla.org/en-US/docs/Web/API/ImageData
function PixMap( w, h ) {
	const o = new ImageData( w, h );
	return ( o );
};

function Screen( w, h ) {
   w = SW = ( w || SW );
   h = SH = ( h || SH );
   Screen.map = PixMap( w, h );
};

Screen.surface = function() {
	let srf = one( "CANVAS" );
	if (! srf ) {
		srf = elx( "CANVAS" );
		doc . body . appendChild ( srf );
        Screen.resize( srf )
	}
	return ( srf );
};

Screen.graphics = function() {
	const srf = Screen.surface();
    const gfx = srf.getContext( "2d" );
    return ( gfx );
};

Screen.present = function( x, y ) {
    const map = Screen.map;
    const gfx = Screen.graphics();
	gfx.putImageData( map, 0, 0 );
};

Screen.resize = function( srf ) {
	const st    = srf.style;
	st.width    = "100vw";
	st.height   = "100vh";
	st.position = "fixed";
	const rc    = srf.getBoundingClientRect();
    if ( rc.width != srf.width ) {
    	srf.width   = rc.width;
    }
    if ( rc.height != srf.height ) {
    	srf.height  = rc.height;
    }
    return ( srf );
};

Screen.color = function( r, g, b ) {
    function byte( n ) {
        n = Floor( n );
        return Median( n, 0, 255 );
    }
    r = byte( r );
    g = byte( g );
    b = byte( b );
    return ( `rgb(${r},${g},${b})` );
};

Screen.fill = function( c ) {
    function byte( n ) {
        n = Floor( n );
        return Median( n, 0, 255 );
    }
    const r = byte( c.r );
    const g = byte( c.g );
    const b = byte( c.b );
    const map = Screen.map;
    const vw = map.width;
    const vh = map.height;
    for ( let y=0; y < vh; y += 1 ) {
        const line = y * vw;
        for ( let x=0; x < vw; x += 1 ) {
            const quad = ( line + x ) * 4;
            map.data[ 0 + quad ] = r;
            map.data[ 1 + quad ] = g;
            map.data[ 2 + quad ] = b;
            map.data[ 3 + quad ] = 255;
        }
    }
    return ( map );
};

function SetPixel( x, y, c ) {
    const map = Screen.map;
	const row = ( y * map.width );
	const ofs = ( x + row ) * 4;
	map.data[ 0 + ofs ] = c.r;
	map.data[ 1 + ofs ] = c.g;
	map.data[ 2 + ofs ] = c.b;
    if ( isFinite( c.a ) ) {
    	map.data[ 3 + ofs ] = c.a;
    } else {
    	map.data[ 3 + ofs ] = 255;
    }
}

function FillRect( x, y, w, h, c ) {
    const gfx = Screen.graphics();
    gfx.fillStyle = Screen.color( c.r, c.g, c.b );
    gfx.fillRect( x, y, w, h );
    return ( gfx );
}

function DrawRect( x, y, w, h, c ) {
    const gfx = Screen.graphics();
    gfx.strokeStyle = Screen.color( c.r, c.g, c.b );
    gfx.beginPath();
    gfx.rect( x, y, w, h );
    gfx.stroke();
    return ( gfx );
}

function Background( c ) {
    const srf = Screen.surface();
    const sw = srf.width;
    const sh = srf.height;
    return FillRect( 0, 0, sw, sh, c );
}


