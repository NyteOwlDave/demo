<style>
textarea, canvas {
	box-sizing : border-box;
	display : inline-block;
	margin  : 0;
	width   : calc( 100vw - 32px );
	border  : 1px dotted black;
	outline : none;
}
textarea {
	margin-bottom : 42vh;
	resize : vertical;
	max-height : 80vh;
}
</style>
<div center>
  <img src="http://dave-tower/demo/web/art/zephyr.png" />
</div>
<div center>
  <canvas id="surface"></canvas>
</div>
<div center>
  <textarea id="sce"></textarea>
</div>
<script>
function koffee( event ) {
	const kc = event.keyCode;
	if ( modkey( kc ) ) { return; }
	const km = modkeys( event );
	if ( km === modkeys.ALT ) ) {
		if ( kc === 13 ) {
			claim( event );
			exec( sce.value );
			return;
		}
		return;
	}
	if ( km === 0 ) {
		if ( kc === 9 ) {
			claim( event );
			if ( "function" !== typeof sce.insert ) {
				init_editor( sce );
			}
			sce.insert( "\t" );
			return;
		}
		return;
	}
}
</script>
<script>
addEventListener( "keydown", koffee ) {}
</script>
<script>
function claim( event ) {
	event.stopPropagation();
	event.preventDefault();
}
</script>
<script>
function modkey( code ) {
	if ( code instanceof Event ) {
		code = code.keyCode;
	}
	return modkey.codes.includes( code );
}
modkey.codes = [ 16, 17, 18, 92, 93 ];
</script>
<script>
function modkeys( event ) {
 	const _K = modkeys;
 	const _A = event.altKey   ? _K.ALT   : 0;
 	const _C = event.ctrlKey  ? _K.CTRL  : 0;
 	const _M = event.metaKey  ? _K.META  : 0;
 	const _S = event.shiftKey ? _K.SHIFT : 0;
	return ( _A | _C | _M | _S );
}
</script>
<script>
modkeys.ALT   = 0x01;
modkeys.CTRL  = 0x02;
modkeys.META  = 0x04;
modkeys.SHIFT = 0x08;
modkeys.ZERO  = 0x00;
modkeys.MASK  = 0x0F;
</script>
<script>
function exec( js ) {
	try {
		exec.gems.add( js );
		exec.output = window.eval( js );
		exec.error  = "";
	} catch ( e ) {
		console.error ( e );
		exec.error  = ( e.message );
		exec.output = "";
	}
}
;
; exec.gems = ( new Set() )
;
</script>
<script>
exec.jimbo = function( sort ) {
	const m = Array.from( exec.gems );
	return (
		  ( sort     )
		? ( m.sort() )
		: ( m        )
	);
};
</script>
<script>
exec.jimbo.json = function( sort ) {};
</script>
<script>
</script>
