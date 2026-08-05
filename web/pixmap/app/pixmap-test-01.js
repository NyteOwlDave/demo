
/* 
    pixmap-test-01.js
*/

function test_01() {
    SW = 600; SH = 600;
	Screen( SW, SW );
    Background( _RGB( 20, 20, 64 ) );
	RandomPixels( 0.3 );
	Screen.present();
}

function RandomPixels( density ) {
    const map = Screen.map;
    const area = ( map.width * map.height );
    Screen.fill( _RGB( 20, 20, 64 ) );
    let count = Floor( density * area );
    while ( count-- > 0 ) {
        const c = RandomRGB();
        const pt = RandomPoint( 0, 0, SW, SH );
        SetPixel( pt.x, pt.y, c );
    }
}
