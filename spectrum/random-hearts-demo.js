
PEACH_KEY = ( `random-hearts-demo.js` );

_RGB32 =( r, g, b )=> Color.from_rgb( r, g, b ); 

function setup() {
    Background( _RGB32( 42, 0, 0    ) );
    Pen       ( _RGB32( 220, 200, 0 ) );
};

function render() {
	
	srf = Surface();

	const sw = srf.width;
	const sh = srf.height;

    const xo = 0; // sw / 16;
    const yo = 0; // sh / 16;

	let	x1 = rnd( sw );
  	let	y1 = rnd( sh );

	let j    = 1;
	let turn = 0;

	while ( turn < 25 ) {
  		let i  = 0;
  		let rc = rnd( 250 );
		let gc = rnd( 250 );
  		Pen( _RGB32( rc, gc, 0 ) );
  		let p = 5 + rnd( 45 );
  		while ( i < 1.57 ) {
            let x, y, a, b, c;
    		j = -j;
    		x = x1 + xo + p*j*i;
            a = sqrt( abs( cos( i ) ) );
            b = cos( 313 * i );
            c = sqrt( abs( i ) );
    		y = y1 + yo + p*( a * b - c );
    		// _blurt( { x, y } );
    		Pen.dot( x, y );
    		i = i + 0.0005;
  		}

	  	// Next Heart
  		turn = turn + 1;
		x1 = rnd( 0.8 * sw ) + ( 0.1 * sw );
  		y1 = rnd( 0.8 * sh ) + ( 0.1 * sh );

	}
}

_blurt = function( o ) {
   console.debug( o );
}

;
; ( 1 ) && hud.persist( PEACH_KEY )
; ( 1 ) && setup()
; ( 1 ) && render()
;
; "OK!"
;

