
/* toggle.js */

zoom = function( o ) { o.requestFullscreen(); o.focus(); }

hide = function( o ) { o.classList.add( hide.cname ); };

hide.cname = ( "hide" );

show = function( o ) { o.classList.remove( hide.cname ); };

toggle = function( o ) { 
    const cl = o.classList;
    if ( cl.contains( hide.cname ) ) {
        show( o );
    } else {
        hide( o );
    }
};


