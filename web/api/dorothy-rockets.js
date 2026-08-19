
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

ops.compose = function() {
    return JSON.stringify( _rockets, null, 2 );
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

ops.tabulate = function( index ) {
    function entry( k ) {
        return ops.tabulate.entry( k );
    };
    index = Array.isArray( index ) ? ( index ) : ( 0 );
    const m = ( index || ops.index() );
    const v = ( m ).map( entry );
    return ( v );
};

ops.tabulate.entry = function( k ) {
    const v = _rockets[ k ];
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

ops.prepare = function( title, address, decal, icon ) {
    title   = str( title   );
    address = str( address );
    decal   = str( decal   );
    icon    = str( icon    );
    return { title, address, decal, icon };
};

ops.insert = function( key, entry ) {
    key = str( key );
    if ( ops.contains( key ) ) {
        throw new Error( `Rocket Already Exists : "${key}"` );
    }
    ops.update( key, entry );
};

ops.update = function( key, entry ) {
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

ops.index = function() {
    return Object.keys( _rockets ).sort();
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

ops.needs = [ "ged", "gid", "visit", "str" ];

ops.helps = [ "riccola.js" ];

} ) ( dorothy );


console.log( `Loaded "dorothy-rockets.js" API Module` );

