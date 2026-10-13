
PEACH_KEY = ( `integral-curves.js`   );
PEACH_APP = ( `integral-curves.html` );
PEACH_LAN = ( `dave-tower` );
PEACH_WKS = ( `WWW/demo` );
PEACH_REL = ( `demo/web/peaches/math` );
PEACH_CAS = ( `Tower ~ FireFox ~ Tower` );

;
; k = PEACH_KEY  ; v = sce.value 
; location       . hash = ( k )
; localStorage   . setItem( k, v )
; sessionStorage . setItem( k, v )
; hud . jot( "Stored Peach" )
;
; cls  =()=> console.clear()
; erun =()=> window.eval( sce.value )
;

function zoom_surface() {
   hud.zoom( gid( "surface" ) );
};

function catalog( o ) {
    const ops = catalog;
    ops . stash();
    o = ( o || window );
    let m = Object.keys( o ).sort();
    if ( o === window ) {
        const our =( k )=> (! iwm.includes( k ) );
        m = m . filter( our );
    }
    sce . value = ( m.join( "\n" ) );
    console . table( m );
}
catalog . recall  =()=> ( sce.value = hud.stashed );
catalog . stash   =()=> ( hud.stashed = sce.value );
catalog . session =()=> catalog( sessionStorage   );
catalog . store   =()=> catalog( localStorage     );

;
; ( 1 ) && cls()
; ( 0 ) && plot.example( 0 )
; ( 0 ) && plot.example( 1 )
; ( 0 ) && plot.example( 2 )
; ( 0 ) && plot.example( 3 )
; ( 1 ) && blurt( "OK!" )
; ( 0 ) && blurt( "Ready!" )
;

