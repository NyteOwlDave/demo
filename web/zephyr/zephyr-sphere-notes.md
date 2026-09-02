
----------------------------------------------------------------

# Zephyr Project Notes

----------------------------------------------------------------

I designed Zephyr originally for sphere texture mapping.

The texture should be wrapped in this way:

The center is the North Pole and South pole. Each hemisphere
gets one copy of the texture ( inverted in the Southern portion).

----------------------------------------------------------------

# Algorithm

----------------------------------------------------------------

<pre>

size = min( surface.width, surface.height );
radius = 0.45 * size;

for ( long = 0; long < 255; long += delta_long ) {
    for ( latt = 0; latt < 320; latt += delta_latt ) {
        rho = long / 255 * texmap.size;
        theta = deg2rad( latt );
        ct = cos( theta );
        st = sin( theta );
        z = 1;
        u = rho * ct;
        v = rho * st;
        c = texmap.read_texel( u, v );
        rho = radius;
        x = rho * ct;
        y = rho * ( long - 128 ) / 255;
        z = rho * st;
        pt = xform3.apply( x, y, z );
        Pen.dot( pt.x, pt.y, c );
    }
};

</pre>

----------------------------------------------------------------

# TexMap Class

----------------------------------------------------------------

<pre>

class TexMap {
    constuctor( source ) {
        this.acquire( source );
    }
    acquire( source ) {
        const canvas = new OffscreenCanvas();
        const sw = source.width;
        const sh = source.height;
        if ( sw !== sh ) {
            throw new Error( "Source Dimensions MUST Match" );
        }
        canvas.width = canvas.height = sw;
        const gfx = canvas.getContext( "2d" );
        gfx.drawImage( source, 0, 0, sw, sh );
    }
    // TODO ... Complete this class !!!
}

</pre>

----------------------------------------------------------------



