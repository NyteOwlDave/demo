
/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	[ ] input-footer
	[x] eventlog-section
	[ ] script-section
	[ ] comments-section

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	[ ] .css
    [x] .js

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/


event_log = {};

event_log.id = "event-log";

function create_event_log() {
	const ops = event_log;
	const id = "event-log";
    let log = gid( id );
	if ( log ) { return log; };
	const owner = gid( "eventlog_section" );
	log = elx( "UL" );
	log . id = ( id );
	return ( owner.appendChild( log ) );
}

event_log.gadget  = function() {
	return create_event_log();
};

event_log.section = function() {
	return gid( "eventlog_section" );
};

event_log.length = function() {
	const ops = event_log;
	const  gadget = ops.gadget();
	const  items = gadget.querySelectorAll( "LI" )
	return ( items . length );
};

event_log.add = function( o ) {
	const ops = event_log;
	if ( o instanceof Object ) {
		if ( Array.isArray( o ) ) {
			o.forEach(
				( t ) => ops.add( t )
			);
			return;
		}
		return ops.add( mem( o ) );
	}
	const pe = event_log.gadget();
	const ce = elx( "LI" );
	ce . textContent = String( o ).trim();
	return pe.appendChild( ce );
};

event_log.clear = function() {
	const ops = event_log;
	const gadget = ops.gadget();
	gadget.innerHTML = "";
	return ( gadget );
};

event_log.banner = function( s ) {
	const ops = event_log;
	ops.clear();
	const pe = event_log.gadget();
	const ce = elx( "LI" );
	ce.classList.add( "banner" );
	s = ( str( s ) || "Results" );
	ce . textContent = ( s );
	return pe.appendChild( ce );
};

event_log.list = function( o, caption ) {
	const ops = event_log;
	ops.banner( caption );
	ops.add( o );
};

;
; console.log( `UNTESTED : "eventlog-section.js"` )
;

