<style>
html, body {
    margin  : 0;
    padding : 0;
    border  : 0;
}
</style>

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc =  document;
; doc . title = ( `Pixel Map` )
</script>

<script>
; str =( o )=> String( s || "" ).trim()
; arr =( o )=> Array.from( o || [] )
; unq =( o )=> ( new Set ( o || [] ) )
; dct =(   )=> ( new Map() )
</script>

<script>
; ole =( q, e )=>    ( e.querySelector   ( q ) )
; ale =( q, e )=> arr( e.querySelectorAll( q ) )
; one =( q )=> ole( q, doc )
; all =( q )=> ale( q, doc )
</script>

<script>
; elx =( t )=> doc.createElement ( t )
; gid =( i )=> doc.getElementById( t )
</script>

<script src="./scalar.js"></script>
<script src="./vector.js"></script>
<script src="./rgba.js"></script>
<script src="./geom-2d.js"></script>
<script src="./pixmap.js"></script>

<script>
function RandomColor() {
    return RandomRGB();
}
</script>

<script>
function RandomPixels( density ) {
    const map = Screen.map;
    const area = ( map.width * map.height );
    Screen.fill( _RGB( 20, 20, 64 ) );
    let count = Floor( density * area );
    while ( count-- > 0 ) {
        const c = RandomColor();
        const pt = RandomPoint( 0, 0, SW, SH );
        SetPixel( pt.x, pt.y, c );
    }
}
</script>

<script>
function test01() {
    SW = 600; SH = 600;
	Screen( SW, SW );
    Background( _RGB( 20, 20, 64 ) );
	RandomPixels( 0.3 );
	Screen.present();
}
</script>

<script>
function main( event ) {
	try {
		test01();
	} catch ( e ) {
		crashed ( e )
	}
}
</script>

<script>
addEventListener( "load", main );
</script>

<script>
function crashed( e ) {
	alert ( e );
	throw ( e );
}
</script>



