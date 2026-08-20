
/* dorothy-rockets.js */

dorothy = {};

( ops => {

let _rockets = {};

function store() {
    const db = localStorage;
    if ( null == db ) {
        console.warn( `Store is Unavailable` );
    }
    return ( db );
};

ops.storekey = "dorothy-rockets.json";

ops.index = function( rex ) {
    let m = Object.keys( _rockets ).sort();
    if ( rex = str( rex ) ) {
        rex = new RegExp( rex );
        m = m.filter( 
            ( k ) => ( rex.test( k ) ) 
        );
    }
    return ( m );
};

ops.compose = function( key ) {
    let o;
    if ( key = str( key ) ) {
        o = ( _rockets[ key ] || {} );
    } else {
        o = _rockets;        
    }
    return JSON.stringify( o, null, 2 );
};

ops.parse = function( json ) {
    const o = JSON.parse( json );
    if ( o instanceof Object ) {
        _rockets = ( o );
        return ( o );
    } else {
        throw new TypeError( `Expected an Object` );
    }
};

ops.persist = function() {
    const db = store();
    if (! db ) { return; }
    const k = ops.storekey;
    const v = ops.compose();
    db.setItem( k, v );
    console.log( `Wrote "${k}" to Store` );
};

ops.recover = function() {
    const db = store();
    if (! db ) { return; }
    const k = ops.storekey;
    const v = db.getItem( k );
    if ( null === v ) {
        console.warn( `Missing Dorothy's Store Entry` );
        return;
    }
    ops.parse( v );
    console.log( `Read "${k}" from Store` );
};

ops.request = function( url ) {
    if ( "function" !== typeof fetch ) {
        throw new Error( `Fetch Method isn't Supported` );
    }
    function accept( s ) {
        ops.parse( s );
        console.log( `Loaded Dorothy's Rockets` );
    }
    function reject( e ) {
        console.error( e );
    }
    const req = fetch( url );
    ( req )
    . then  ( rsp => rsp.text() )
    . then  ( accept )
    . catch ( reject );
    return ( req );
};

ops.tabulate = function( index ) {
    function entry( k ) {
        return ops.tabulate.entry( k );
    };
    index = Array.isArray( index ) ? ( index ) : ( 0 );
    const m = ( index || ops.index() );
    const v = ( m ).map( entry );
    return ( v );
};

ops.tabulate.entry = function( key ) {
    const k = str( key );
    const v = ( _rockets[ k ] || {} );
    const t = str( v.title   );
    const a = str( v.address );
    const d = str( v.decal   );
    const i = str( v.icon    );
    return [ k, t, a, d, i ];
};

ops.inspect = function() {
    const c = console;
    c.groupCollapsed( "Dorothy's Rockets" );
    c.table( ops.tabulate() );
    c.groupEnd();
};

ops.contains = function( key ) {
    key = str( key );
    return (!! _rockets[ key ] );
};

ops.delete = function( key ) {
    key = str( key );
    return ( delete _rockets[ key ] );
};

ops.prepare = function( title, address, decal, icon, filename ) {
    title    = str( title    );
    address  = str( address  );
    decal    = str( decal    );
    icon     = str( icon     );
    filename = str( filename );
    return { title, address, decal, icon, filename };
};

ops.validate = function( entry ) {
    let s;
    if ( entry instanceof Object) {
        s = str( entry.address );
        if (! s ) { missing( "address" ); }
        s = str( entry.title );
        if (! s ) { missing( "title" ); }
    } else {
        throw new TypeError( `Expected an Object` );
    }
    function missing( k ) {
        throw new Error( `Missing Field : ${k}` );
    }
}

ops.insert = function( key, entry ) {
    key = str( key );
    if ( ops.contains( key ) ) {
        throw new Error( `Rocket Already Exists : "${key}"` );
    }
    ops.update( key, entry );
};

ops.update = function( key, entry ) {
    entry = ( entry || ops.prepare() );
    key = str( key );
    if ( key.length < 1 ) {
        throw new TypeError( `Expected a Rocket Key` );
    }
    _rockets[ key ] = entry;
};

ops.read = function( key ) {
    key = str( key );
    return ( _rockets[ key ] );
};

ops.select = function( rex ) {
    const m = ops.index();
    let v ;
    if ( rex = str( rex ) ) {
        rex = new RegExp( rex );
        v = m.filter( ( k ) => ( rex.test( k ) ) );
    } else {
        v = m;
    }
    const results = [];
    v.forEach(
        ( k )=> {
            const entry = _rockets[ k ];
            entry.key = ( k );
            results.push( entry );
        }
    );
    return ( results );
};

ops.launch = function( key ) {
    if ( "function" !== typeof visit ) {
        throw new Error( "Visit Method is Unavailable" );
    }
    const entry = ops.read( key );
    if (! entry ) {
        throw new Error( `No Such Rocket : "${key}"` );
    }
    visit( entry.address );
};

ops.save = function( filename ) {
    if ( "function" !== typeof riccola ) {
        throw new Error( "Riccola Method is Unavailable" );
    }
    const k = ( str( filename ) || ops.storekeys );
    const v = ops.compose();
    riccola( k, v );
};

ops.edit = function( ed ) {
    if (! ged( ed ) ) { ed = gid( ed ); }
    ed.storekey = ops.storekey;
    ed.value = ops.compose();
    ed.focus();
};

ops.accept = function( ed ) {
    function read( o ) {
        if ( o ) {
            if ( ged( o ) ) {
                return ( o.value );
            }
            if ( gvw( o ) ) {
                return ( o.innerText )
            }
            if ( gad( o ) ) {
                return ( o.innerHTML )
            }
            o = gid( o );
            if ( o ) {
                return read( o )
            }
        }
        throw new TypeError( `Expected an HTML Element or ID` );
    }
    const json = str( read( ed ) );
    if (! json ) {
        console.warn( `Ignoring Empty Element` );
        return;
    }
    ops.parse( json );
};

ops.copy = function( key ) {
    ops.copy.error = ( "" );
    const json = ops.compose( key );
    if (! json ) {
        console.warn( `Unknown Rocket:`, key );
        return;
    }
    const ed = elx( "TEXTAREA" );
    const boo = document.body;
    boo.appendChild( ed );
    try {
        const st = ed.style;
        st.position = "fixed";
        st.left = "-2000px";
        st.opacity = "0";
        ed.value = json;
        ed.focus();
        ed.select();
        document.execCommand( "copy" );
        return ( true );
    } catch ( e ) {
        console.error( e );
        ops.copy.error = ( e.message );
        return ( false );
    } finally {
        boo.removeChild( ed );
    }
};

ops.needs = [ "gad", "ged", "gid", "gvw", "elx", "str" ];

ops.helps = [ "riccola", "visit" ];

} ) ( dorothy );


console.log( `Loaded "dorothy-rockets.js" API Module` );

