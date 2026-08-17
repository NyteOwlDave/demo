
<style>
html, body {
	margin : 0;
	border : none;
}
.panel {
	position : fixed;
	box-sizing : border-box;
	margin : 0;
	border : 1px dashed gold;
}
.dock-left  {
	left   : 0;
	top    : 0;
	width  : calc( 50vw  - 2px  );
	height : calc( 100vh - 70px );
}
.dock-right {
	right  : 0;
	top    : 0;
	width  : calc( 50vw  - 2px  );
	height : calc( 100vh - 70px );
}
#sce ,
#surface {
	display : inline-block;
	width   : 100%;
	height  : 100%;
	border  : none;
	margin  : 0;
}
#sce {
	resize   : none;
	padding  : 0.4ch 1ch;
	font     : 12pt monospace;
	outline  : none;
	tab-size : 4;
}
#surface {
	padding : 0;
}
hr {
	display : none;
}
</style>

----------------------------------------------------------------

<div class="panel dock-left">
  <canvas id="surface"></canvas>
</div>

----------------------------------------------------------------

<div class="panel dock-right">
  <textarea id="sce" wrap="off"></textarea>
</div>

----------------------------------------------------------------

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc = document
</script>

<script src="./gems/core-ops.js"></script>
<script src="./gems/json-ops.js"></script>

<script>
colors_hex = [
	'#ff00ff',
	'#000000',
	'#020000',
	'#040100',
	'#060100',
	'#090200',
	'#0b0200',
	'#0d0300',
	'#100300',
	'#120400',
	'#140400',
	'#160500',
	'#190500',
	'#1b0600',
	'#1d0600',
	'#200700',
	'#220700',
	'#240800',
	'#270800',
	'#290900',
	'#2b0a00',
	'#2d0a00',
	'#300b00',
	'#320b00',
	'#340c00',
	'#370c00',
	'#390d00',
	'#3b0d00',
	'#3e0e00',
	'#400e00',
	'#420f00',
	'#440f00',
	'#471000',
	'#491000',
	'#4b1100',
	'#4e1100',
	'#501200',
	'#521200',
	'#551300',
	'#571400',
	'#591400',
	'#5b1500',
	'#5e1500',
	'#601600',
	'#621600',
	'#651700',
	'#671700',
	'#691800',
	'#6c1800',
	'#6e1900',
	'#701900',
	'#721a00',
	'#751a00',
	'#771b00',
	'#791b00',
	'#7c1c00',
	'#7e1c00',
	'#801d00',
	'#831e00',
	'#851e00',
	'#871f00',
	'#891f00',
	'#8c2000',
	'#8e2000',
	'#902100',
	'#932100',
	'#952200',
	'#972200',
	'#9a2300',
	'#9c2300',
	'#9e2400',
	'#a02400',
	'#a32500',
	'#a52500',
	'#a72600',
	'#aa2700',
	'#ac2700',
	'#ae2800',
	'#b12800',
	'#b32900',
	'#b52900',
	'#b72a00',
	'#ba2a00',
	'#bc2b00',
	'#be2b00',
	'#c12c00',
	'#c32c00',
	'#c52d00',
	'#c82d00',
	'#ca2e00',
	'#cc2e00',
	'#ce2f00',
	'#d12f00',
	'#d33000',
	'#d53100',
	'#d83100',
	'#da3200',
	'#dc3200',
	'#df3300',
	'#e13300',
	'#e33400',
	'#e53400',
	'#e83500',
	'#ea3500',
	'#ec3600',
	'#ef3600',
	'#f13700',
	'#f33700',
	'#f63800',
	'#f83800',
	'#fa3900',
	'#fc3900',
	'#fc3a00',
	'#fc3c00',
	'#fc3e00',
	'#fc4000',
	'#fc4100',
	'#fc4300',
	'#fc4500',
	'#fc4700',
	'#fc4800',
	'#fc4a00',
	'#fc4c00',
	'#fc4e00',
	'#fc4f00',
	'#fc5100',
	'#fc5300',
	'#fc5500',
	'#fc5700',
	'#fc5800',
	'#fc5a00',
	'#fc5c00',
	'#fc5e00',
	'#fc5f00',
	'#fc6100',
	'#fc6300',
	'#fc6500',
	'#fc6600',
	'#fc6800',
	'#fc6a00',
	'#fc6c00',
	'#fc6e00',
	'#fc6f00',
	'#fc7100',
	'#fc7300',
	'#fc7500',
	'#fc7600',
	'#fc7800',
	'#fc7a00',
	'#fd7c00',
	'#fd7d00',
	'#fd7f00',
	'#fd8100',
	'#fd8300',
	'#fd8500',
	'#fd8600',
	'#fd8800',
	'#fd8a00',
	'#fd8c00',
	'#fd8d00',
	'#fd8f00',
	'#fd9100',
	'#fd9300',
	'#fd9400',
	'#fd9600',
	'#fd9800',
	'#fd9a00',
	'#fd9c00',
	'#fd9d00',
	'#fd9f00',
	'#fda100',
	'#fda300',
	'#fda400',
	'#fda600',
	'#fda800',
	'#fdaa00',
	'#fdab00',
	'#fdad00',
	'#fdaf00',
	'#fdb100',
	'#fdb200',
	'#fdb400',
	'#fdb600',
	'#fdb800',
	'#fdba00',
	'#fdbb00',
	'#febd00',
	'#febf00',
	'#fec100',
	'#fec200',
	'#fec400',
	'#fec600',
	'#fec800',
	'#fec900',
	'#fecb00',
	'#fecd00',
	'#fecf00',
	'#fed100',
	'#fed200',
	'#fed400',
	'#fed600',
	'#fed800',
	'#fed900',
	'#fedb00',
	'#fedd00',
	'#fedf00',
	'#fee000',
	'#fee200',
	'#fee400',
	'#fee600',
	'#fee800',
	'#fee900',
	'#feeb00',
	'#feed00',
	'#feef00',
	'#fef000',
	'#fef200',
	'#fef400',
	'#fef600',
	'#fef700',
	'#fef900',
	'#fefb00',
	'#fefd00',
	'#ffff00',
	'#ffff07',
	'#ffff0f',
	'#ffff17',
	'#ffff1f',
	'#ffff27',
	'#ffff2f',
	'#ffff37',
	'#ffff3f',
	'#ffff47',
	'#ffff4f',
	'#ffff57',
	'#ffff5f',
	'#ffff67',
	'#ffff6f',
	'#ffff77',
	'#ffff7f',
	'#ffff87',
	'#ffff8f',
	'#ffff97',
	'#ffff9f',
	'#ffffa7',
	'#ffffaf',
	'#ffffb7',
	'#ffffbf',
	'#ffffc7',
	'#ffffcf',
	'#ffffd7',
	'#ffffdf',
	'#ffffe7',
	'#ffffef',
	'#fffff7',
	'#ffffff'
];
</script>

<script>
colors_rgba = [];
</script>

<script>
function rgba_from_hex( s ) {
	s = str( s ).slice( 1 );
	n = parseInt( `0x${s}` );
	a = ( n >> 24 ) & 0xFF;
	r = ( n >> 16 ) & 0xFF;
	g = ( n >>  8 ) & 0xFF;
	b = ( n       ) & 0xFF;
	return { r, g, b, a };
}
</script>

<script>
function prepare_rgba_colors() {
	colors_rgba = colors_hex.map( rgba_from_hex );
}
</script>

<script>
function main( event ) {
	try {
		prepare_rgba_colors();
		sce.value = gid( "analyzer.js" ).innerText;
	} catch ( e ) {
		crashed ( e );
	}
}
</script>

<script>
addEventListener( "load", main );
</script>

<script>
function crashed( e ) {
	alert ( e );
	throw ( e );
}
</script>

<script id="analyzer.js">

xAxis = 266;
yAxis = 10;
scale = 256;

function init_surface() {
    const srf = surface;
    rc = srf.getBoundingClientRect();
    srf.width  = rc.width;
    srf.height = rc.height;
    return ( srf );
}

Graphics = function() {
   return surface.getContext( "2d" );
};

function plot_red( y=10 ) {}

function plot_grn( y=10 ) {}

function plot_blu( y=10 ) {}

function plot_rgb() {}

function plot_rdx( y=10 ) {}

function plot_gdx( y=10 ) {}

function plot_bdx( y=10 ) {}

function plot_rgbdx() {}

function plot( x, dx, count, cb ) {
    const gfx = Graphics();
    gfx.strokeStyle = "black";
    gfx.strokeWidth = 2;
    let u=0;
    while ( count-- > 0 ) {
        const y = cb( x );
        x += dx;
        let p = yAxis + u; u += 1;
        let q = xAxis - v * scale;
        gfx.beginPath();
        gfx.moveTo( p, xAxis );
        gfx.lineTo( p, q );
        gfx.stroke();
    }
}

function draw_axes( xo, yo, w, h ) {
    const gfx = Graphics();
    gfx.strokeStyle = "black";
    gfx.strokeWidth = 2;
    gfx.beginPath();
    gfx.moveTo( xo , yo );
    gfx.lineTo( xo + w , yo );
    gfx.stroke();
    gfx.beginPath();
    gfx.moveTo( xo , yo );
    gfx.lineTo( xo , yo - h );
    gfx.stroke();
}

run =()=> window.eval( sce.value );
cls =()=>console.clear();

</script>

