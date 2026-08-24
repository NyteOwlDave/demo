
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	[x] input-footer
	[ ] eventlog-section
	[ ] script-section
	[ ] comments-section

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	[ ] .css
    [x] .js

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


function create_input_footer() {
	const id = ( "footer_input" );
	let ce = gid( id );
	if ( ce ) { return ce; }
	ce = elx( "input" );
	const pe = gid( "footer" );
	pe.appendChild( ce );
	ce . id = ( id );
	ce . onchange = perform;
	return ( ce );
}

addEventListener( "load", create_input_footer );

;
; console.log( `INCOMPLETE : "input-footer.js"` )
;