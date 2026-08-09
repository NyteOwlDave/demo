
/*

| stateful.js   |
|---------------|
| @ Demo        |
| Omega Edition |
| 2026-AUG-08   |

# Dependencies

| Symbol | API Module  |
|--------|-------------|
| n/a    | n/a         |

*/

class StatefulObject {
    constructor( arg ) {
        this.reset();
        this.state.arg = arg;
    }
    reset() {
        this.state = {};
        return this;
    }
    resolve( arg ) {
        if ( "undefined" === typeof arg ) {
            return this.state.arg;
        } else {
            return arg;
        }
    }
    isType( type, arg ) {
        arg = this.resolve( arg );
        return ( type === typeof arg );
    }
    isString( arg ) {
        return this.isType( "string", arg );
    }
    isAction( arg ) {
        return this.isType( "function", arg );
    }
    isArray( arg ) {
        arg = this.resolve( arg );
        return Array.isArray( arg );
    }
    isObject( arg ) {
        arg = this.resolve( arg );
        return ( arg instanceof Object );
    }
    isIterable( arg ) {
        const SI = Symbol.iterator;
        arg = this.resolve( arg );
        if ( arg instanceof Object ) {
            return this.isAction( arg[ SI ] );
        }
        return false;
    }
    isElement( arg ) {
        arg = this.resolve( arg );
        return ( arg instanceof HTMLElement );
    }
    isPreview( arg ) {
        arg = this.resolve( arg );
        return ( arg instanceof HTMLPreElement );
    }
    isEditor( arg ) {
        arg = this.resolve( arg );
        return ( arg instanceof HTMLTextAreaElement );
    }
    isNodeType( type, arg ) {
        arg = this.resolve( arg );
        if ( arg instanceof HTMLElement ) {
            type = type.toUpperCase();
            return ( arg.nodeName === type );
        }
        return false;
    }
}


console.log( `🧭 Loaded "stateful.js" module` );

