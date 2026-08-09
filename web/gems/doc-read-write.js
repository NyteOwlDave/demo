
/*

| doc-read-write.js |
|-------------------|
| @ Demo            |
| Omega Edition     |
| 2026-AUG-08       |

# Dependencies

| Symbol         | API Module  |
|----------------|-------------|
| StatefulObject | stateful.js |

*/

class DocReader extends StatefulObject {
    constructor( source ) {
        super( source );
    }
    get source() { return this.state.arg; }
    readText( splitter="\n" ) {
        if ( this.isString() ) {
            return this.source;
        }
        if ( this.isAction() ) {
            return String( this.source() );
        }
        if ( this.isObject() ) {
            if ( this.isEditor() ) {
                return this.source.value;
            }
            if ( this.isElement() ) {
                return this.source.innerText;
            }
            if ( this.isIterable() ) {
                return Array.from( this.source ).join( splitter );
            }
            return JSON.stringify( this.source, null, 2 );
        }
        return String( this.source );
    }
}

class DocWriter extends StatefulObject {
    constructor( source ) {
        super( source );
        if ( this.isObject() ) { return; }
        throw new TypeError( "Source must be an object" );
    }
    get source() { return this.state.arg; }
    writeText( doc ) {
        if ( this.isEditor()  ) {
            this.source.value = doc;
            return;
        }
        if ( this.isElement() ) {
            this.source.innerText = doc;
            return;
        }
        this.source.value = doc;
    }
}


console.log( `🧭 Loaded "doc-read-write.js" module` );


