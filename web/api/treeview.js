
/* treeview.js */

function treeview( title, contents, parent, id ) {
	const ops = treeview;
	const top = ops.details( title, contents, parent );
	top.id = id;
	top.classList.add( "root" );
    return ( top );
}

treeview.details = function( title, contents, parent ) {
	const ops = treeview;
    const det = ops.node( "DETAILS", null, null, parent );
	det . classList . add( "node" );
    const sum = ops.summary( title, contents, det );
	const o = ( contents );
    if (! o ) { return ( det ) };
    if (
	  ! ( o instanceof Object )
	) {
        return ( det );
	}
	const m = Object.keys( o || {} ).sort();
	m.forEach( ( k ) => {
		ops . details( k, o[ k ], det );
    } );
    return ( det )
};

treeview.summary = function( title, contents, parent ) {
	const ops = treeview;
    const sum = ops.node( "SUMMARY", title, contents, parent );
	sum . classList . add( "leaf" );
	return ( sum );
};

treeview.node = function( type, title, contents, parent ) {
	const doc = document;
	const elm = doc.createElement( type );
	elm . classList.add( "treeview" );
	elm . textContent = str( title );
	elm . contents = ( contents );
    if ( parent ) { parent.appendChild( elm ); }
    return ( elm );
};
