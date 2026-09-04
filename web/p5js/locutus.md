<style>
@import url("./../../style/every-page.css");
</style>

<style>
@import url("./../../style/sce-hud.css");
</style>

<style>
:root {
	--surface-border : 1px dashed gold;
}
#viewport {
	z-index    : 0;
	box-sizing : border-box;
	position   : fixed;
	top        : 0;
	left       : 0;
	width      : 100vw;
	height     : 100vh;
	margin     : 0;
	padding    : 0;
	border     : none;
	display    : inline-block;
}
.surface {
	box-sizing : border-box;
	width  : calc( 100% - 26px );
	height : calc( 100% - 120px );
	border : var( --surface-border );
}
.surface {
	margin : 60px 12px;
	background : black;
}
</style>

<style>
header , footer {
	z-index : 99999;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<header onclick="_toggle_hud( event )">
  	<div id="messages"></div>
  	<textarea id="sce" class="hide hud" wrap="off"></textarea>
  	<script>
	function _toggle_hud( event ) {
		if ( event.target === sce ) { return; }
		if ( event.ctrlKey ) {
			toggle( sce );
		}
	}
  	</script>
  	<script>
	const _HIDE_ = "hide";
  	function show( o ) {
		o.classList.remove( _HIDE_ );
	}
  	function hide( o ) {
		o.classList.add( _HIDE_ );
	}
  	function visible( o ) {
		const hidden = o.classList.contains( _HIDE_ );
		return (! hidden );
	}
  	function toggle( o ) {
		if ( visible( o ) ) {
			hide( o );
		} else {
			show( o );
		}
	}
  	function zoom( o ) {
		show( o );
		o . requestFullscreen();
		o . focus();
	}
  	</script>
  	<script>
  	function exec( o ) {
		window.eval( o . value );
	}
  	function swap( o ) {
		const t = String( o.memo || "" );
		o . memo  = o.value;
		o . value = ( t );
		o . classList.toggle( "swapped" );
	}
  	</script>
</header>

<main id="viewport">
  <canvas id="surface" class="surface"></canvas>
</main>

<footer id="footer">
  <input id="footer_input" onchange="perform(event)" />
</footer>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; doc = document
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; str =( s )=> String( s || "" ).trim()
; gid =( i )=> doc.getElementById( i )
; elx =( t )=> doc.createElement( t )
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="p5-shim-1.js">

function p5_color( c ) {
	const _X_ = "transparent";
	if ( "string" === typeof c ) {
		return ( c );
	} else if ( isFinite( c = parseInt( c ) ) ) {
		let r, g, b;
		if ( c < 0   ) { return ( _X_ ); }
		if ( c < 255 ) {
			r = g = b;
		} else {
			r = ( c >> 16 ) & 0xFF;
			g = ( c >> 8  ) & 0xFF;
			b = ( c       ) & 0xFF;
		}
		c = ( `${r},${g},${b}` );
		return [ "rgb(", ")" ].join( c );
	}
	return ( _X_ )
}

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="p5-shim-2.js">

function createCanvas( w, h ) {
	const id = "surface";
	let srf = gid( id );
	if ( srf ) {
		return resizeCanvas( w, h );
	}
	srf = elx( "CANVAS"    );
	srf . id = ( id );
    srf . classList . add( id );
	vwe = gid( "viewport"  );
	vwe . appendChild( srf );
	return resizeCanvas( w, h );
}

function resizeCanvas( w, h ) {
	const id = "surface";
	const srf = gid( id );
	if ( w === srf.width ) {
		if ( h === srf.height ) {
			return ( srf );
		}
	}
	srf.width  = ( w );
	srf.height = ( h );
 	return ( srf );
}

function getCanvasMetrics() {
	const id = "surface";
	const srf = gid( id );
	const w = srf.width;
	const h = srf.height;
	return { w, h };
}

function background( c ) {
	const smx = getCanvasMetrics();
	const gfx = surface.getContext( '2d' );
	gfx.fillStyle = p5_color( c );
	gfx.fillRect( 0, 0, smx.w, smx.h );
}

</script>

<script>

verts = [];
paused = false;

function message( s ) {
  messages.textContent = String( s || "" ).trim();
}

function vert( x, y ) {
  verts.push( { x, y } );
}

function setup() {
  // createCanvas(400, 400);
}

function draw() {
	// render();
}

function render() {
  if ( paused ) {
      background( "crimson" );
      return;
  }
  background( 220 );
  let n = verts.length;
  if ( n < 1 ) { return; }
  let i = 0;
  let pb, pa = verts[i++];
  let pm = { x : mouseX, y : mouseY };
  let near = 1 + find_nearest( pm.x, pm.y );
  let pc = verts[ near - 1 ];
  drawingContext.setLineDash([1,1]);
  if ( near < 2 ) {
      fill( "green" );
      circle( pa.x, pa.y, 9 );
      fill( "black" );
  } else {
      fill( "black" );
      circle( pa.x, pa.y, 9 );
  }
  while (!! ( pb = verts[ i++ ] ) ) {
    line( pa.x, pa.y, pb.x, pb.y );
    pa = pb;
    if ( i === near ) {
      fill( "green" );
      circle( pa.x, pa.y, 7 );
      fill( "black" );
    } else {
      circle( pa.x, pa.y, 7 );
    }
  }
  pa = verts[ n - 1 ];
  drawingContext.setLineDash([10, 10]);
  line( pa.x, pa.y, pm.x, pm.y );
  fill( "gold" );
  circle( pm.x, pm.y, 11 );
  if ( pc ) {
    message( gap( pm, pc ) );
  }
}

function remove_vert( i ) {
    if ( i < 0 ) { return; }
    if ( verts[ i ] ) {
        verts[ i ] = null;
        verts = verts.filter( o => o );
    }
}

function touch( event ) {
	const srf = gid( "suface" );
	if ( event.target !== srf ) { return; }
    if ( event.button ) { return; }
    let x = event.clientX;
    let y = event.clientY;
    if ( event.altKey  ) {
        paused = (! paused );
        claim( event );
        return;
    }
    if ( event.ctrlKey ) {
        remove_nearest( x, y );
        claim( event );
        return;
    }
    if ( event.shiftKey ) {
      const n = verts.length;
      if ( n > 2 ) {
        let i = find_nearest( x, y );
        let vb = verts[ i ];
        if (! vb ) { return; }
        let va = { x, y };
        let t = gap( va, vb );
        if ( t > 1 ) {
          if ( t < 10 ) {
            x = vb.x;
            y = vb.y;
          }
        }
      }
    }
    vert( x, y );
    claim( event );
}

function claim( e ) {
  e.preventDefault();
  e.stopPropagation();
}

function gap( va, vb ) {
  return dist( va.x, va.y, vb.x, vb.y );
}

function find_nearest( x, y ) {
  let i = -1;
  let n = ( verts.length - 1 );
  let lo = Infinity;
  let vb = { x, y };
  while ( n >= 0 ) {
      let va = verts[ n ];
      let t = gap( va, vb );
      if ( t < lo ) {
         i  = n;
         lo = t;
      }
      n -= 1;
  }
  return i;
}

function remove_nearest( x, y ) {
    let i = find_nearest( x, y );
    remove_vert( i );
}

addEventListener( "mousedown", touch );

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
footer_input.value = "createCanvas( 600, 400 )";
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function perform( event ) {
	const ops = perform;
	ops . error = "";
	try {
		ops.event = claim( event );
		const sender = event.target;
		const js = sender.value;
		window.eval( js );
	} catch ( e ) {
/*
		message(
			ops.error = ( e.message ) ,
			true
		);
*/
		ops.error = ( e );
		alert( e );
		throw( e );
	}
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function message( s, silent ) {
	s = str( s );
	if (! silent ) {
		console.log( s );
	}
	messages.textContent = ( s );
	return ( s );
}
// message( "Started" );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

