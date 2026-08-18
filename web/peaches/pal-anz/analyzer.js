
_RGB=(x,y,z)=>Color.from_rgb(x,y,z);

yAxis = 10;     // X for Y-axis
xAxis = 266;    // Y for X-axis
scale = 256;    // Scaling Factor

function init_xform( xo, yo, k ) {
    xAxis = yo;
    yAxis = xo;
    scale = k;
    console.debug( { xAxis, yAxis, scale } );
}

function red_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.r );
    return vnorm( v );
};

function grn_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.g );
    return vnorm( v );
};

function blu_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.b );
    return vnorm( v );
};

function plot_vec( v, y=266, yScale=256 ) {
    function cb( index ) {
        return ( v[ index ] || 0 );
    }
    const xo = 10;
    const k  = ( yScale || 256 );
    const yo = ( y || ( k + 10 ) );
    v = ( v || [] );
    inspect( `Vector`, v );
    init_xform( xo, yo, k );
    plot( 0, 1, 256, cb );
    draw_axes_positive( xo, yo, 256, k );
    // draw_axes_negative( xo, yo, 256, k );
}

function plot_red( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = red_norm( colors ).samples;
    Pen( "red" );
    plot_vec( v, y, yScale );
}

function plot_grn( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = grn_norm( colors ).samples;
    Pen( "green" );
    plot_vec( v, y, yScale );
}

function plot_blu( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = blu_norm( colors ).samples;
    Pen( "blue" );
    plot_vec( v, y, yScale );
}

function plot_rgb( colors, yScale=128 ) {
    colors = ( colors || Palette() );
    const k = ( yScale || 128 );
    const h = ( 10 + k );
    Background( "black" );
    plot_red( colors, h * 1, 128 );
    plot_grn( colors, h * 2, 128 );
    plot_blu( colors, h * 3, 128 );
}

function plot_rdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_rdx()` );
}

function plot_gdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_gdx()` );
}

function plot_bdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_bdx()` );
}

function plot_rgbdx( colors ) {
    colors = ( colors || Palette() );
    incomplete( `plot_rgbdx()` );
}

function plot( x, dx, count, cb ) {
    const gfx = Graphics();
    Pen.thickness( 1 );
    let u=0;
    while ( count-- > 0 ) {
        const y = cb( x );
        x += dx;
        let p = round( yAxis + u ); u += 1;
        let q = round( xAxis - y * scale );
        gfx.beginPath();
        gfx.moveTo( p, xAxis );
        gfx.lineTo( p, q );
        gfx.stroke();
    }
}

function draw_axes( xo, yo, w, ha, hb ) {
    const gfx = Graphics();
    Pen( "white" );
    Pen.thickness( 2 );
    const ya = yo - ha;
    const yb = yo + hb;
    gfx.beginPath();
    gfx.moveTo( xo     , yo );
    gfx.lineTo( xo + w , yo );
    gfx.stroke();
    gfx.beginPath();
    gfx.moveTo( xo , ya );
    gfx.lineTo( xo , yb );
    gfx.stroke();
}

function draw_axes_positive( xo, yo, w, h ) {
    draw_axes( xo, yo, w, h, 0 )
}

function draw_axes_negative( xo, yo, w, h ) {
    draw_axes( xo, yo, w, 0, h )
}

// seeker( rex )
// inspect( "Madge Operations", MadgeOps )

Background( _RGB( 42, 12, 12 ) );
draw_axes( 10, 300, 500, 290, 290 );


_RGB=(x,y,z)=>Color.from_rgb(x,y,z);

yAxis = 10;     // X for Y-axis
xAxis = 266;    // Y for X-axis
scale = 256;    // Scaling Factor

function init_xform( xo, yo, k ) {
    xAxis = yo;
    yAxis = xo;
    scale = k;
    console.debug( { xAxis, yAxis, scale } );
}

function red_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.r );
    return vnorm( v );
};

function grn_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.g );
    return vnorm( v );
};

function blu_norm( colors ) {
    colors = ( colors || Palette() );
    const v = colors.map( c => c.b );
    return vnorm( v );
};

function plot_vec( v, y=266, yScale=256 ) {
    function cb( index ) {
        return ( v[ index ] || 0 );
    }
    const xo = 10;
    const k  = ( yScale || 256 );
    const yo = ( y || ( k + 10 ) );
    v = ( v || [] );
    inspect( `Vector`, v );
    init_xform( xo, yo, k );
    plot( 0, 1, 256, cb );
    draw_axes_positive( xo, yo, 256, k );
    // draw_axes_negative( xo, yo, 256, k );
}

function plot_red( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = red_norm( colors ).samples;
    Pen( "red" );
    plot_vec( v, y, yScale );
}

function plot_grn( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = grn_norm( colors ).samples;
    Pen( "green" );
    plot_vec( v, y, yScale );
}

function plot_blu( colors, y=266, yScale=256 ) {
    colors = ( colors || Palette() );
    const v = blu_norm( colors ).samples;
    Pen( "blue" );
    plot_vec( v, y, yScale );
}

function plot_rgb( colors, yScale=128 ) {
    colors = ( colors || Palette() );
    const k = ( yScale || 128 );
    const h = ( 10 + k );
    Background( "black" );
    plot_red( colors, h * 1, 128 );
    plot_grn( colors, h * 2, 128 );
    plot_blu( colors, h * 3, 128 );
}

function plot_rdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_rdx()` );
}

function plot_gdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_gdx()` );
}

function plot_bdx( colors, y=266 ) {
    colors = ( colors || Palette() );
    incomplete( `plot_bdx()` );
}

function plot_rgbdx( colors ) {
    colors = ( colors || Palette() );
    incomplete( `plot_rgbdx()` );
}

function plot( x, dx, count, cb ) {
    const gfx = Graphics();
    Pen.thickness( 1 );
    let u=0;
    while ( count-- > 0 ) {
        const y = cb( x );
        x += dx;
        let p = round( yAxis + u ); u += 1;
        let q = round( xAxis - y * scale );
        gfx.beginPath();
        gfx.moveTo( p, xAxis );
        gfx.lineTo( p, q );
        gfx.stroke();
    }
}

function draw_axes( xo, yo, w, ha, hb ) {
    const gfx = Graphics();
    Pen( "white" );
    Pen.thickness( 2 );
    const ya = yo - ha;
    const yb = yo + hb;
    gfx.beginPath();
    gfx.moveTo( xo     , yo );
    gfx.lineTo( xo + w , yo );
    gfx.stroke();
    gfx.beginPath();
    gfx.moveTo( xo , ya );
    gfx.lineTo( xo , yb );
    gfx.stroke();
}

function draw_axes_positive( xo, yo, w, h ) {
    draw_axes( xo, yo, w, h, 0 )
}

function draw_axes_negative( xo, yo, w, h ) {
    draw_axes( xo, yo, w, 0, h )
}

// seeker( rex )
// inspect( "Madge Operations", MadgeOps )

crimson_love = function() {
   Background( _RGB( 42, 12, 12 ) );
   draw_axes( 10, 300, 500, 290, 290 );
};

// o = gid("surface").parentElement;
// o = gid("sce").parentElement;
// hide( o );
// show( o );
// console.log( o.classList );

;
; ( 1 ) && crimson_love()
;


