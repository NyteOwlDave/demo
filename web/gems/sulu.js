
/* 

| sulu.js |
|-----------------|
| @ Demo          |
| Omega Edition   |
| 2026-AUG-08     |

# Dependencies

| Symbol       | API Module        |
|--------------|-------------------|
| DocReader    | doc-read-write.js |

*/

class NavDoc {
    constructor( source ) {
        this.read( source );
    }
    reset() {
        this.state = { 
            value : "" , parts : {}
        };
        return this;
    }
    read( source ) {
        if ( source ) {
           // doc-read-write.js
           const rdr = new DocReader( source );
           this.value = rdr.readText();
        }
        return this;
    }
    get lines() {
        return this.value.split( "\n" )
            .map( s => s.trim() )
            .filter( s => (!! s ) );
    }
    get titles() {
        return ( this.state.parts.titles || [] );
    }
    get links() {
        return ( this.state.parts.links || [] );
    }
    get others() {
        return ( this.state.parts.others || [] );
    }
    get value() {
        return ( this.state.value || "" );
    }
    set value( doc ) {
        this.reset();
        this.state.value = String( doc );
    }
    parse( source ) {           // source is optional
        this.read( source );
        const titles = [];
        const links  = [];
        const others = [];
        const lines = this.lines;
        let s, line;
        while ( lines.length ) {
            line = lines.shift();
            s = this.readTitle( line );
            if ( s.length ) {
                titles.push( s );
                continue;
            }
            s = this.readLink( line );
            if ( s.length ) {
                links.push( s );
                continue;
            }
            others.push( line );
        }
        this.state.parts = { titles, links, others };
        return this;
    }
    readTitle( s ) { return NavDoc.readTitle( s ); }
    readLink ( s ) { return NavDoc.readLink ( s ); }
    createAnchor( title, url, id ) {
        return NavDoc.createAnchor( title, url, id );
    }
    composeAnchor( title, url, id ) {
        return NavDoc.composeAnchor( title, url, id );
    }
    createAnchorList() {
        const anchors = [];
        const titles = Array.from( this.titles );
        const links  = Array.from( this.links  );
        while( titles.length || links.length ) {
            let s = titles.shift();
            let u = links.shift();
            const ae = this.createAnchor( s, u );
            anchors.push( ae );
        }
        return anchors;
    }
    createMenu( title, id, type="nav" ) {
        const menu = elx( type || "nav" );
        menu.title = ( title || "Untitled Menu" );
        menu.id = this.safeID( id );
        const list = this.createAnchorList();
        list.forEach( anchor => menu.appendChild( anchor ) );
        return menu;
    }
    composeMenu( title, id, type="nav" ) {
        return this.createMenu( title, id, type ).outerHTML;
    }
    safeID( id ) {
        return NavDoc.safeID( id );
    }
}

NavDoc.readTitle = function( s ) {
    if ( s.startsWith( '+' ) ) {
        return s.slice( 1 ).trim();
    }
    return "";
}

NavDoc.readLink = function( s ) {
    if ( s.startsWith( '@' ) ) {
        return s.slice( 1 ).trim();
    }
    return "";
}

NavDoc.createAnchor = function( title, url, id ) {
    const ae = elx( 'a' );
    ae.textContent = ae.title = ( title || "Unknown" );
    ae.href = ( url || "./" );
    ae.id = NavDoc.safeID( id );
    return ae;
}

NavDoc.composeAnchor = function( title, url, id ) {
    return NavDoc.createAnchor( title, url, id ).outerHTML;
}

NavDoc.safeID = function( id ) {
    if ( id = str( id ) ) { return id; }
    const rnd = () => Math.random();
    const a = Date.now();
    const b = ( a * rnd() + rnd() ) . toString( 32 );
    return ( "id-" + b . split( "." ) . join( "-" ) );
}

const Sulu =( NavDocCodec )= NavDoc;


console.log( `🧭 Loaded "sulu.js" module` );


