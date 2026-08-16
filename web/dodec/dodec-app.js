
/*

  dodec.js -- Rhomboid dodecahedron with cubes
  Dave Wellsted, NyteOwl Computer Software
  2026-AUG-15

*/


;
; doc = document
;

;
; str =( s )=> String( s || "" ).trim()
;

;
; elx =( t )=> doc.createElement( t )
; gid =( i )=> doc.getElementById( i )
;

const get_canvas  = () => gid( "idCanvas" );
const get_context = () => get_canvas().getContext( "2d" );

function main() {
    try {
        Screen.init( get_canvas(), 60 );
        render();
        // message( `Ready for Action!` );
        const n = Dodec.polyList.length;
        message( `Total Polygons : ${n}` );
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

addEventListener( "load", main );


function get_height() {
    return ( parseInt( idHeight.value ) & ~1 ) + 1;
}


function render() {
    Screen.clear();
    Dodec.init( get_height () );
    Dodec.draw( get_context() );
    requestAnimationFrame( render );
}


function visit( url ) {
    try {
        url = str( url );
        if (! url ) {
            console.warn( "Ignoring Empty URL" );
            return;
        }
        if ( null === localStorage ) {
            const a = elx( "A" );
            a . href = ( url );
            a . click();
        } else {
            const wnd = window;
            wnd.open( url, url );
        }
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}

visit.codepen = function() {
    const url = (
        `https://codepen.io/NyteOwlDave/full/poLJbBr` 
    );
    visit( url );
};


function message( s, silent ) {
    s = str( s );
    if (! s ) { return; }
    if (! silent ) {
        console.log( s );
    }
    messages.textContent = ( s );
    return ( s );
}

function mine( event ) {
    const ev = event;
    ev.preventDefault();
    ev.stopPropagation();
    return ( ev );
}


