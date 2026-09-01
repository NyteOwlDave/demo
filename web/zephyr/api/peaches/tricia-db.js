
// Template DB

function template( key, value ) {
	const ops = template;
	key = ops.safe_key( key );
	if ( ops.peek( key ) ) {
		throw new Error( 
			`Duplicate Key : "${key}"` 
		);
	}
	const v = str( value );
	const index = ops.init();
    index . set( key, v );
	ops . message( 
		`Created Template : "${key}"` 
	);
}

;
; template.key       = ( "templates.json" );
;

template.tools = {
  cloud     : "http://tiny.cc/express-lane"
, nas       : "http://neo/shares"
, site      : "http://tiny.cc/daves-notes"
, notepad   : "https://texteditor.co"
, marked    : "https://markdowneditor.org/"
, clipboard : "https://live-clipboard.netlify.app/"
};

template.has = function( key ) {
	const ops = template;
	key = ops . safe_key( key );
	const index = ops.init();
    return (!! index.get( key ) );
};

template.peek = function( key ) {
	const ops = template;
	key = ops . safe_key( key );
	const index = ops.init();
    return str( index.get( key ) );
};

template.update = function( key, value ) {
	const ops = template;
	key = ops . safe_key( key );
	const v = str( value );
	const index = ops.init();
    index . set( key, v );
	console . log( `Updated Template : "${key}"` );
};

template.edit = function( key, ed ) {
	const ops = template;
	key = ops . safe_key( key );
	ed = ops . resolve( ed );
	ed . value = ops.peek( key );
	ed . key = ( key );
	console.log( `Editing Template : "${key}"` );
};

template.accept = function( ed, newkey ) {
	const ops = template;
	ed = ops.resolve( ed );
	newkey = str( newkey );
	const key = ops.safe_key( newkey || ed.key );
	ops.update( key, ed.value );
};

template.init = function() {
	const ops = template;
	if ( "undefined" === typeof ops.index ) {
		if ( ops.available() ) {
			ops.recover();
		} else {
	    	ops.clear();
		}
	};
	return ( ops.index );
};

template.clear = function() {
	const ops = template;
	ops.index = ( new Map() );
	return ( ops.index );
};

template.remove = function( key ) {
	const ops = template;
	key = ops.safe_key( ed.key );
	const index = ops.init();	
	if ( index.has( key ) ) {
		index.delete( key );
		ops.message( `Delete Template : "${key}"` );
	} else {
		ops.message( `Missing Template : "${key}"` );
	}
};

template.available = function() {
	const ops = template;
	const store = ops.store();
	const k = ops.safe_key( ops.key );
	return ( null !== store.getItem( k ) );
};

template.persist = function() {
	const ops = template;
	const store = ops.store();
	const k = ops.safe_key( ops.key );
	const v = ops.compose();
	store.setItem( k, v );
	ops.message( `Wrote "${k}" to Store` );
};

template.recover = function( clear ) {
	const ops = template;
	const store = ops.store();
	const k = ops.safe_key( ops.key );
	const v = store.getItem( k );
	if ( null === v ) {
		return ops.persist();
	}
	ops.message( `Read "${k}" from Store` );
	ops.parse( v, merge );
};

template.parse = function( json, clear ) {
	const ops = template;
	const m = JSON.parse( json );
	if (! clear ) { ops.clear(); }
	const w = arr( m.keys() );
	let v, n=0;
	w.forEach( 
		( k ) => {
			v = m.get( k );
			index.set( k, v );
			n += 1;
		}
	);
	ops.message( `Templates Updated : ${n}` );
};

template.compose = function( ed ) {
	const ops = template;
	const index = ops.init();
	const man = {};
	const w = arr( index.keys() );
	let v, n=0;
	w.forEach( 
		( k ) => {
			v = index.get( k );
			man[ k ] = ( v );
			n += 1;
		}
	);
	ops.message( `Templates Composed : ${n}` );
	if ( ed ) {
		ed = ops.resolve( ed );
		ed . value = JSON.stringify( man, null, 2 );
	} else {
		return ( man );
	}
};

template.message = function( s ) {
	if ( "function" === typeof message ) {
		return message( s );
	} else {
		s = str( s );
		if ( s ) {
			console.log( s );
		}
		return ( s );
	}
};

template.resolve = function( ed ) {
	if ( "string" === typeof ed ) {
		ed = gid( ed );
	}
	if (! ( ed instanceof HTMLElement ) ) {
		throw new TypeError( `Expected an Editor` );
	}
	return ( ed );
};

template.safe_key = function( key ) {
	key = str( key );
	if (! key ) {
		throw new TypeError( `Expected a Key` );
	}
	return ( key );
};

template.store = function() {
	let store = ( localStorage );
    if ( null === store ) { 
  		store = ( sessionStorage );
    }
	return ( store );
};

;
; ( 0 ) && ( zoom( sce.parentElement ) )
; ( 0 ) && ( template.clear() )
; ( 0 ) && ( template( "Dave", "Wellsted" ) )
; ( 0 ) && ( template( "DES" , "[Desktop Entry]" ) )
; ( 1 ) && ( template.edit( "DES", sop ) )
; ( 0 ) && ( template.compose( sop ) )
;

// alert( "OK!" );

