
/* hud.js */

function hud( show ) {
    if ( "undefined" === typeof show ) {
        return hud.toggle();
    }
    if ( show ) {
        return hud.show();
    } else {
        return hud.hide();
    }
}

;
; hud.storekey = ( "heads-up-editor.js" )
;

hud.show = function() {
    const ed = hud.editor();
    ed.classList.remove( "hide" );
    return ( ed );
};

hud.hide = function() {
    const ed = hud.editor();
    ed.classList.add( "hide" );
    return ( ed );
};

hud.toggle = function() {
    if ( hud.hidden() ) {
        return hud.show();
    } else {
        return hud.hide();
    }
};

hud.hidden = function() {
    const ed = hud.editor();
    return ( ed.classList.contains( "hide" ) );
};

hud.editor = function() {
    return ( document.getElementById( "sce" ) );
};

hud.zoom = function() {
    const ed = hud.editor();
    ed.classList.remove( "hide" );
    ed.requestFullscreen();
    ed.focus();
}

hud.assist = function() {
    const m = hud.members();
    m.shift( "[ HUD Members ]\n" );
    alert( m.join( "\n" ) );
}

hud.inspect = function() {
    const m = hud.members();
    const c = console;
    c.groupCollapsed( "HUD Members" );
    c.table( m );
    c.groupEnd();
}

hud.members = function() {
    return Object.keys( hud ).sort();
}

hud.persist = function( key, session ) {
    const store = (
          ( session )
        ? ( sessionStorage )
        : ( localStorage   )
    );
    if (! store ) {
        message( `Store is Unavailable` );
        return;
    }
    key = ( str( key ) || ( hud.storekey ) );
    const value = hud.editor().value;
    store.setItem( key, value );
    if ( session ) {
        message( `Wrote "${key}" to Session` );
    } else {
        message( `Wrote "${key}" to Store` );
    }
}

hud.recover = function( key, session ) {
    const store = (
          ( session )
        ? ( sessionStorage )
        : ( localStorage   )
    );
    if (! store ) {
        message( `Store is Unavailable` );
        return;
    }
    key = ( str( key ) || ( hud.storekey ) );
    const value = store.getItem( key );
    if ( null === value ) {
        message( `No Entry for Key : "${key}"` );
        return;
    }
    hud.editor().value = ( value );
    if ( session ) {
        message( `Read "${key}" from Session` );
    } else {
        message( `Read "${key}" from Store` );
    }
}

hud.run = function() {
    const ed = hud.editor();
    try {
        ed.prior = ( ed.input || "" );
        ed.input = ( ed.value );
        ed.output = window.eval( ed.input );
        ed.error = "";
    } catch ( e ) {
        console.error( e );
        ed.error = ( e.message );
        ed.output = "";
    }
    return ( ed );
};

hud.clear = function() {
    const ed = hud.editor();
    ed.value = "";
    return ( ed );
};

hud.memo = function() {
    const ed = hud.editor();
    return ( ed.memo || "" );
};

hud.memo.save = function() {
    const ed = hud.editor();
    ed.memo = ed.value;
    return ( ed );
};

hud.memo.load = function() {
    const ed = hud.editor();
    ed.value = ( ed.memo || "" );
    return ( ed );
};

hud.memo.swap = function() {
    const ed = hud.editor();
    const cl = ed.classList;
    if ( cl.contains( "swapped" ) ) {
        cl.remove( "swapped" );
    } else {
        cl.add( "swapped" );
    }
    const old = ( ed.value );
    ed.value = ( ed.memo || "" );
    ed.memo = ( old );
    return ( ed );
};

hud.stack = function() {
    const ed = hud.editor();
    const stack = ( ed.stack || [] );
    return ( ed.stack = stack );
};

hud.stack.push = function() {
    const ed = hud.editor();
    const stack = hud.stack();
    const value = ed.value;
    if (! value ) { return; }
    if ( stack.includes( value ) ) {
        stack.remove( value );
    }
    stack.push( value );
    return ( ed );
};

hud.stack.pop = function() {
    const ed = hud.editor();
    const stack = hud.stack();
    const value = stack.pop();
    if ( value ) {
        ed.value = ( value );
    }
    return ( ed );
};

hud.stack.rotate = function() {
    const ed = hud.editor();
    const value = ed.value;
    hud.stack.pop();
    if ( value ) {
        ed.stack.shift( value );
    }
    return ( ed );
};

hud.stack.compact = function() {
    const ed = hud.editor();
    const stack = ( ed.stack || [] );
    const m = new Set( stack );
    ed.stack = Array.from( m );
    return ( ed );
};

hud.stack.clear = function() {
    const ed = hud.editor();
    ed.stack = [];
    return ( ed );
};

hud.stack.reverse = function() {
    const ed = hud.editor();
    const stack = ( ed.stack || [] );
    ed.stack = stack.reverse();
    return ( ed );
};

hud.mem = function( o, rex ) {
    o = ( o || window );
    let m = Object.keys( o ).sort();
    if ( rex = str( rex ) ) {
        rex = new RegExp( rex );
        m = m.filter( ( k ) => ( rex.test( k ) ) );
    }
    const ed = hud.editor();
    ed.value = ( m.join( "\n" ) );
    return ( ed );
};

hud.dir = function( rex ) {
    let o = localStorage;
    if ( null === o ) {
        return hud.mem( {} );
    } else {
        return hud.mem( o, rex );
    }
};

hud.tmp = function( rex ) {
    let o = sessionStorage;
    if ( null === o ) {
        return hud.mem( {} );
    } else {
        return hud.mem( o, rex );
    }
};

hud.hello = function() {
    return hud.mem( hud );
};

