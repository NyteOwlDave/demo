
[me-tower]:
<http://dave-tower/demo/web/zephyr/zephyr-todo.html>
"Tower Edition"

----------------------------------------------------------------

# Zephyr To-Do

----------------------------------------------------------------

> ( `zephyr-todo.md` )

----------------------------------------------------------------

> [Tower][me-tower]

----------------------------------------------------------------

# Scripts to Add

----------------------------------------------------------------

<pre>

blurt=(s)=>(sop.value=(s));

function pcl( o ) {
    o = pcl.prep( o );
    if (! Array.isArray( o ) ) {
       o = o.split( "\n" );
    }
    return ( 
        ( o )
        . map( str )
        . filter( s => s )
   	);
}

pcl.prep = function( o ) {
    if ( Array.isArray( o ) ) {
    	return ( o );
    }
    if ( o instanceof Set ) {
       	return arr( o );
   	}
   	if ( o instanceof Object ) {
    	return mem( o );
    }
   	if ( "function" === typeof o ) {
    	return mem( o );
    }
    return String( o );
};

function assist( o, title ) {
    const t = ( str( title ) || "Members" );
    o = pcl( o );
    o . unshift( `[ ${t} ]\n` );
    blurt( ( o ).join( "\n" ) );
}

// blurt(mem(figure).join("\n"));
// blurt( assist.toString() )
// blurt( "OK!" );
assist( exec, "exec" );

</pre>

----------------------------------------------------------------

<script>
; doc = document
</script>

<script>
; doc . title = doc.querySelector( "H1" ).textContent
</script>

<script>
; arr =( o )=> Array.from( o )
; str =( s )=> String( s || "" ).trim()
</script>

