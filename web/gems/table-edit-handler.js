
/*
	table-edit-handler.js
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function toggle_edit_mode( event ) {
	const sender = event.target;
	let ge = sender;
	while( ge.nodeName !== "TABLE" ) {
		if ( ge.nodeName === "BODY" ) {
			return oops();
		}
		ge = ge.parentElement;
	}
	const arr =( o )=> Array.from( o );
	const ale =( q, e )=> arr( ( e ).querySelectorAll( q ) );
	const te = ( ge );
	const m = ale( "TD", te );
	// NEEDS : jarvis/gems/recent/canedit.js
	if ( te.editable = (! te.editable ) ) {
		canedit( m, true  );
	} else {
		canedit( m, false );
	}
	function oops() {
		throw new TypeError( "Expected a TABLE Gadget" );
	}
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function init_table_edit_handler( te ) {
	const he = te.tHead;
	he.addEventListener( "click", toggle_edit_mode );
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

;
; console.log( `Loaded "table-edit-handler.js" Gem Module` )
;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
