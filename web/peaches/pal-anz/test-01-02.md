
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Plot Red Statistics
function test_01() {
    const colors = Palette();
    const v = colors.map( c => c.r );
    const r = vstats( v );
    vstats.inspect( r );
}

// Plot Red with Regression Trend Line
function test_02() {
    const colors = Palette();
    const scale = 256;
    const yo = 10 + scale;
    const c = "gold";
    Pen( c );
    Background();
    // Plot Red Channel
    plot_red( colors, yo, scale );
    const v = colors.map( o => ( o.r / 255 ) );
    const stats = vstats( v );
    // Plot Regression Trend Line
    Pen.trend( stats, 10, yo, scale, c );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

;
; ( 0 ) && crimson_love()
; ( 0 ) && test_01()
; ( 0 ) && test_02()
;

