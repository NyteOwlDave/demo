
/* 
	Web Demo API Component
	Arborist Tree Parser
	arborist.js
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function arborist() {
  arborist . title = "Arborist Tree Generator";
  tips( arborist );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

; ( arborist )
. examine = function( o ) {
    let level = 0;
    const node =( x )=> {
       if ( Array.isArray( x ) ) { return false; }
       return ( x instanceof Object );
    };
    const lines = [];
    const p = [];
    const extend =( k )=> {
       let n = ( level - 1 ) * 2;
       let s = ( "-" ).repeat( n );
       return ( "|" + s + " " + k );
    };
    const descend =( k )=> {
        if ( level > 10 ) {
          console.warn( "Exceeded Depth Limit" );
          return;
        }
        level += 1;
        p . push( o );
        lines . push( extend( k ) );
        o = o[ k ];
        if ( node( o ) ) {
           const w = mem( o );
           w . forEach( descend );
        }
        o = p . pop();
        level -= 1;
    };
    if ( node( o ) ) {
       m = mem( o );
       m . forEach( descend );
    }
    sce . memo = qlc( lines );
    hud . memo . show();
};

hud.persist();

now =()=> Date.now();
say( now() );

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*

# Description

This API module is meant to parse the output from the
Linux `tree` command.

*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


