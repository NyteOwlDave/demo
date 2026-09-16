
/* balloon.js */

function balloon( s ) {
    const ops = balloon;
    ops.stop();
    const ge = elx( "DIV" );
    ge.classList.add( "balloon" );
    ge.innerHTML = ( s );
    doc.body.appendChild( ge );
    ops.gadget = ge;
    ops.timer = setTimeout( function (e) {
        balloon.stop();
    }, ops.delay );
}

balloon.stop = function() {
    const  ops = balloon;
    if ( ops.timer !== null ) {
        clearTimeout( ops.timer );
        ops.timer = null;
    }
    if ( ops.gadget ) {
        ops.gadget . remove();
        ops.gadget = null;
    }
};

balloon.test = function() {
    try {
        balloon( "Hi! Glad to see ya ..." );
    } catch ( e ) {
        alert( e );
    }
};

;
; balloon.delay  = 4200
; balloon.timer  = null
; balloon.gadget = null
;

// Required Global Symbols
balloon.symbols = [
  "elx", "doc"
];

// Required API Modules
balloon.needs = [];

// Preferred Application(s)
balloon.wants = [];

// Helpful Modules
balloon.helps = [];

// Gadget ID Values
balloon.uses = [];

// CSS Classes
balloon.classes  = [
  "balloon"
];



