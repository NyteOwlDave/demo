
/*
    Web Demo Gadgets
    Cool Address Bar
    Version 1.4.0.1
*/

__kEy__ = "cool-address-bar-v1p4.js";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*

# Arg Options ( `o` )

- URL Address
- Vanilla Object
- HTML Element

*/

function goto( o ) {
    const earl =( oo )=> ( goto . earl( oo ) );
    const gurl =( uu )=> ( goto . gurl( uu ) );
    if ( o instanceof Object ) {
        if ( earl( o.value   ) ) { return gurl( o.value   ); }
        if ( earl( o.home    ) ) { return gurl( o.home    ); }
        if ( earl( o.address ) ) { return gurl( o.address ); }
        if ( earl( o.manual  ) ) { return gurl( o.manual  ); }
        if ( earl( o.url     ) ) { return gurl( o.url     ); }
        if ( earl( o.src     ) ) { return gurl( o.src     ); }
        if ( earl( o.href    ) ) { return gurl( o.href    ); }
    }
    throw new Error( "Invalid Argument ( no URL )" );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*
    True Forces Popup in `gurl()` method
*/

;
; ( goto ) . debug = ( false )
;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*
    Type Checking
*/

; ( goto )
. earl = function( o ) {
    return ( "string" === typeof o );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*
    Navigation
*/

; ( goto )
. gurl = function( url ) {
    if ( url . startsWith( "file:" ) ) {
        alert( "File Protocol isn't Supported" );
        return;
    }
    if ( goto . debug ) { alert( url ); return; }
    if ( "function" === typeof window.visit ) {
        return ( visit( url ) );
    }
    if ( null === localStorage ) {
        const a = document . createElement( "A" );
        a . href = ( url );
        a . click();
    } else {
        return window.open( url, url );
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*
    UI Gadget I/O
*/

function write_address_bar( url ) {
    const ge = gid( "address_bar" );
    if (! ge ) {
        console.warn( "Missing : Cool Address Bar" );
        return;
    }
    url = String( url || "" ).trim();
    ge . value = (
        url || window . location . href
    );
    return ( ge . value );
}

function read_address_bar() {
    return write_address_bar( "" );
}


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*
    UI Gadget Creation
*/

function create_address_bar( owner ) {
    const HDR$ = "Cool Address Bar ~ Version 1.4";
    const DOT$ = "dot-button";
    const ID$  = "address_bar";
    const _atr =( e, k, v )=> ( e . setAttribute( k, v ) );
    const _str =( s )=> String( s || "" ).trim();
    const _wrt =( u, ge )=> {
        ge = ( ge || gid( ID$ ) );
        let u1 = _str( u );
        let u2 = _str( ge . value );
        let u3 = _str( u1 || u2 || "./" );
        return (
            ( ge )
            . value = ( u3 )
        );
    };
    const top = elx( "DIV"    ); // center note="Version 1.4"
    const hdr = elx( "H3"     ); // Cool Address Bar ~ Version 1.4
    const bar = elx( "DIV"    ); // [ input | dot-button ]
    const ipe = elx( "INPUT"  ); // wide id="address_input"
    const btn = elx( "DIV"    ); // Go
    const scr = elx( "SCRIPT" ); // http://dave-legacy/demo/web/gadgets/cool-address-bar-v1p4.js
    _atr( ipe , "wide", "true" );
    ipe . id = ( ID$ );
    ipe . value   = ( location . href );
    ipe . write   =( u )=> _wrt( u, ipe );
    ipe . read    =(   )=> _wrt( u      );
    ipe . explore =(   )=> _wrt( "./"   );
    btn . onclick =(   )=> ( goto( ipe ) );
    btn . textContent = "Go";
    btn . classList . add( DOT$ );
    hdr . textContent = HDR$;
    bar . appendChild( ipe );
    bar . appendChild( btn );
    top . appendChild( hdr );
    top . appendChild( bar );
    top . appendChild( scr );

    // write_address_bar( "" )

; ( scr )
. src = (
  "http://dave-legacy/demo/web/gadgets/cool-address-bar-v1p4.js"
)
;

;
; console . info( "Created : Cool Address Bar" )
;
    const o = ( owner || document . body );
    return ( o . appendChild( top ) );
}

;
; console . info( `Loaded Gadget : ${__kEy__}` );
; console . info( "REMINDER : Call create_address_bar()" )
;


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~ [[ CUT HERE ]] ~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

/*

    IMPORTANT!
    ~~~~~~~~~~

    - Owl System has an Older Version
    - So does Omega ReText Notes
    - SYNC ALL THREE !!!

    VERSION 1.4.0.1 NOTES
    ~~~~~~~~~~~~~~~~~~~~~

    - See Legacy ReText Notes
    - See Sinkro Notes ( pending )

    FILE NAMES
    ~~~~~~~~~~

    # Markdown

        - rt-cool-address-bar.md
        - rt-cool-address-bar-notes.md

    # JavaScript

        - cool-address-bar-v1p3.js
        - cool-address-bar-v1p4.js

    # CSS

        - cool-address-bar.css

*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~ [[ CUT HERE ]] ~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //


