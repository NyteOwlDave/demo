/*

	Image Metrics Helper
	img-metrics-helper.js
	
	Creates a CANVAS Overlay for an IMG Element.
	
	The IMG pixmap is assumed to be an array of
	cells having 5 columns and 4 rows.
	
	Cell Size is 160 x 240
	PixMap Size is 800 x 960
	
	SEE: 
	
	- http://dave-tower/rtj/rt-image-metrics.html
	- http://dave-tower/art/math/Physics/greek-physics.png
	
*/

// Draw Grid Lines to CANVAS
function draw_grid() {
	gfx = srf.getContext( "2d" );
	gfx . lineWidth = 1.5;
	gfx . strokeStyle = "#080822";
	for ( let j=1; j<5; j+=1 ) {
  		let y = j * 240;
		gfx.beginPath();
  		gfx.moveTo( 0  , y );
  		gfx.lineTo( 800, y );
  		gfx.stroke();
	}
	for ( let i=1; i<5; i+=1 ) {
		let x = i * 160;
		gfx.beginPath();
		gfx.moveTo( x ,   0 );
		gfx.lineTo( x , 960 );
  		gfx.stroke();
	}
}

// Create CANVAS
function create_surface( w, h ) {
	const d = document;
	const b = d.body;
	srf = d . getElementById( "srf" );
	if (! srf )	{
		srf = d.createElement( "CANVAS" );
		srf . id = ( "srf" );
		b . appendChild( srf );
	}
	srf . width  = ( w   );
	srf . height = ( h   );
	return ( srf );
}

// Create CANVAS overlay for IMG
function create_overlay() {
	const d = document;
	const b = d.body;
	img = b . firstElementChild;
	img . id = ( "img" );
	const rc = img.getBoundingClientRect();
	const w = rc . width;
	const h = rc . height;
	srf = create_surface( w, h );
	const st = srf.style;
	st . position  = "absolute";
	st . boxSizing = "border-box";
	st . border = "1px dotted green";
	st . top  = (rc . top ) + "px";
	st . left = (rc . left) + "px";
}

// Main Entry Point
function proceed() {
	create_overlay();
	draw_grid();	
}

;
; ( 1 ) && console.clear()
; ( 0 ) && proceed()
; ( 1 ) && "OK!"
;


