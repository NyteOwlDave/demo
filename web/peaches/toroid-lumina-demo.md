
/* toroid-lumina-demo.js */

function setup() {
    const vw = 2.0;
    const vh = 1.5;
    const sw = sh = 600;
    Xform.scale( sw / vw, sh / vh, 1 );
    Xform.xlate( sw / 2.0, sh / 2.0, 0 );
    Background( "black" );
    Pen( "gold" );
}

function render( erase=true ) {

    if ( erase ) { Background(); }

    const pt = {};

    CAMDIST = 6;

    // Presentation angle: 30 degrees
    A3 = -30 * _TAU / 360;
    C3 = cos( A3 ); S3 = sin( A3 );

    // Presentation offset: move up a bit
    OY = .75; A1 = 0; A2 = 0;

    // Loop Counter and Bound
    LIMIT = 50000; INC = 0;

    // TODO : Draw Toroid
    while ( ++INC < LIMIT ) {

        A1 = A1 + 0.1;
        if ( A1 >= _TAU ) { A1 = A1 - _TAU; }

        A2 = A2 + ( cos( A1 ) + 1.2 ) * 2e-2;
        if ( A2 >= _TAU ) { A2 = A2 - _TAU; }

        // Generate point on surface of tube at angle 0
        X1 = cos( A1 ) + 3; Y = sin( A1 );

        // Rotate (top-down) to correct position in tube. Y is unchanged.
        C2 = cos( A2 ); S2 = sin( A2 );
        X = X1 * C2;
        Z = X1 * S2;

        // Rotate (from side) for presentation. X is unchanged.
        YY = Y * C3 - Z * S3;
        ZZ = Y * S3 + Z * C3;

        // Vertical offset.
        YY = YY + OY;

        // Project
        SZ = ZZ + CAMDIST;
        pt.x = X  / SZ;
        pt.y = - ( YY / SZ );

        // Center and Scale
        Xform.apply( pt, pt );

        // Draw Point
        Pen.dot( pt.x, pt.y );

    }
};

;
; ( 1 ) && setup()
; ( 1 ) && render()
;
; console.log( "OK!" )
;

