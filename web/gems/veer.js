
/*
	id    = "veer.js"
	repo  = "demo"
	group = "web"
*/

function veer( hostname ) {
	location.hostname = hostname;
}

veer.tower   = function() { veer( "dave-tower"   ); };
veer.omega   = function() { veer( "dave-omega"   ); };
veer.legacy  = function() { veer( "dave-legacy"  ); };
veer.lenovo  = function() { veer( "dave-lenovo"  ); };
veer.probook = function() { veer( "dave-probook" ); };
veer.pi      = function() { veer( "dave-pi"      ); };
veer.jefr    = function() { veer( "dave-jefr"    ); };
veer.ryzen   = function() { veer( "dave-ryzen"   ); };

veer.hostnames = [
  "dave-tower"
, "dave-omega"
, "dave-legacy"
, "dave-lenovo"
, "dave-probook"
, "dave-pi"
, "dave-jefr"
, "dave-ryzen"
];


console.log( `Loaded "veer.js" Gem` );

