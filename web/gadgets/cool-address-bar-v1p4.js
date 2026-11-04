
/*
    Web Demo Gadgets
    Cool Address Bar
    Version 1.4
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

addEventListener(
  "load", (e) => { write_address_bar( "" ) }
);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

;
; console . info( `Loaded Gadget : ${__kEy__}` );
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

    VERSION 1.4 NOTES
    ~~~~~~~~~~~~~~~~~

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


