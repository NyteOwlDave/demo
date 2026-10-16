<style>
@import url("./../../style/every-page.css");
</style>

[me-omega]:
<http://dave-omega/demo/web/gemini/rainbow-refraction.html>
"Omega Edition"

[me-tower]:
<http://dave-tower/demo/web/gemini/rainbow-refraction.html>
"Tower Edition"

----------------------------------------------------------------

# Gemini Chat for Rainbow Colors

> [Gemini](https://gemini.google.com)
> [Chat](https://gemini.google.com/app/fdae9a074a0134b7)
> [Omega][me-omega]
> [Tower][me-tower]
> [File System](./)

----------------------------------------------------------------

# Prompt

----------------------------------------------------------------

Please fill in the RGB column with suitable colors
to match what a rainbow might look like on a modern
LED monitor.

The six-digit hexadecimal format from CSS will do nicely.

| Color  | Wavelength (nm) | IOR   | RGB  |
|--------|-----------------|-------|------|
| Violet | 380-450         | 1.522 |      |
| Indigo | 450-475         | 1.528 |      |
| Blue   | 475-495         | 1.523 |      |
| Green  | 495-570         | 1.519 |      |
| Yellow | 570-590         | 1.516 |      |
| Orange | 590-620         | 1.514 |      |
| Red    | 620-750         | 1.511 |      |

----------------------------------------------------------------

# Response

----------------------------------------------------------------

- There were multiple responses. This was the desired result.

----------------------------------------------------------------

| Color  | Wavelength (nm) | IOR   | RGB     |
|--------|-----------------|-------|---------|
| Violet | 380-450         | 1.522 | #8B00FF |
| Indigo | 450-475         | 1.528 | #4B0082 |
| Blue   | 475-495         | 1.523 | #0000FF |
| Green  | 495-570         | 1.519 | #008000 |
| Yellow | 570-590         | 1.516 | #FFFF00 |
| Orange | 590-620         | 1.514 | #FFA500 |
| Red    | 620-750         | 1.511 | #FF0000 |

----------------------------------------------------------------

# Other Responses

----------------------------------------------------------------

## Python

----------------------------------------------------------------

```python

def wavelength_to_rgb(wavelength):
    # Wavelength in nm (380 - 750)
    gamma = 0.8

    if 380 <= wavelength <= 440:
        r = -(wavelength - 440) / (440 - 380)
        g = 0.0
        b = 1.0
    elif 440 < wavelength <= 490:
        r = 0.0
        g = (wavelength - 440) / (490 - 440)
        b = 1.0
    elif 490 < wavelength <= 510:
        r = 0.0
        g = 1.0
        b = -(wavelength - 510) / (510 - 490)
    elif 510 < wavelength <= 580:
        r = (wavelength - 510) / (580 - 510)
        g = 1.0
        b = 0.0
    elif 580 < wavelength <= 645:
        r = 1.0
        g = -(wavelength - 645) / (645 - 580)
        b = 0.0
    elif 645 < wavelength <= 750:
        r = 1.0
        g = 0.0
        b = 0.0
    else:
        r = 0.0
        g = 0.0
        b = 0.0

    # Intensity correction near limits
    if 380 <= wavelength <= 420:
        factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380)
    elif 420 < wavelength <= 700:
        factor = 1.0
    elif 700 < wavelength <= 750:
        factor = 0.3 + 0.7 * (750 - wavelength) / (750 - 700)
    else:
        factor = 0.0

    r = round(255 * (r * factor) ** gamma)
    g = round(255 * (g * factor) ** gamma)
    b = round(255 * (b * factor) ** gamma)

    return f"#{r:02x}{g:02x}{b:02x}"

# Let's test with central wavelengths of each band
bands = [
    ("Violet", 415),
    ("Indigo", 462),
    ("Blue", 485),
    ("Green", 532),
    ("Yellow", 580),
    ("Orange", 605),
    ("Red", 685)
]

for name, wl in bands:
    print(f"{name} ({wl} nm): {wavelength_to_rgb(wl)}")

```

----------------------------------------------------------------

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc = document
</script>

<script>
; cls =()=> console.clear();
; agn =()=> location.reload();
</script>

<script src="./../gems/core-ops.js"></script>
<script src="./../api/core-api.js"></script>

----------------------------------------------------------------

# Test Colors

<style>
#surface {
    border : 1px dashed gold;
}
</style>

<div style="text-align : center">
<canvas id="surface" width="500" height="500"></canvas>
</div>

----------------------------------------------------------------

<script>
Colorizer = {};
</script>

<script>
Colorizer.entries = {};
</script>

<script>
Colorizer.schema = [
  "color"
, "wavelength"
, "ior"
, "rgb"
];
</script>

<script>
Colorizer.rainbow = function() {
	const ops = Colorizer;
	const srf = gid( "surface" );
	const w = srf.width;
	const h = srf.height;
	const gfx = srf.getContext( "2d" );
	const colors = Object.keys( ops.entries );
	const bands = colors.length;
	const band_height = Math.floor( h / bands );
    say( `Bands : ${bands}` );
    mention( `Size : ${w} x ${h}` );
	let entry, t, c, y = 0;
	for ( let j = 0; j < bands; j += 1, y += band_height ) {
		c = colors[ j ];
        entry = ops.entries[ c ];
        c = entry.rgb;
        t = entry.color;
        mention( `Color : ${c} ( ${t} )` );
        gfx.fillStyle = ( c );
		gfx.fillRect( 0, y, w - 1, y + band_height );
	}
};
</script>

<script>
Colorizer.read_table = function( index ) {
	const ops = Colorizer;
	const m = all( "TABLE" );
	const te = m[ index ];
	const be = te.tBodies[ 0 ];
	const rows = arr( be.rows );
	rows . forEach(
		( re ) => {
			entry = ops.read_cells( re.cells );
			ops.add_entry( entry );
		}
	);
};
</script>

<script>
Colorizer.read_cells = function( cells ) {
	const ops = Colorizer;
	const _s =( ce )=> str( ce.textContent )
	const _v =( i  )=> _s( cells[ i ] );
	const _x = ops.schema
	const _r = {};
	_r[ _x[ 0 ] ] = _v( 0 );
	_r[ _x[ 1 ] ] = _v( 1 );
	_r[ _x[ 2 ] ] = _v( 2 );
	_r[ _x[ 3 ] ] = _v( 3 );
	_r.key = ( _r[ _x[ 0 ] ] ).toLowerCase();
	return ( _r );
};
</script>

<script>
Colorizer.add_entry = function( entry ) {
	const ops = Colorizer;
	const key = entry.key
	ops.entries[ key ] = entry;
};
</script>

<script>
Colorizer.clear = function( color ) {
	const ops = Colorizer;
	const srf = gid( "surface" );
	const w = srf.width;
	const h = srf.height;
	const gfx = srf.getContext( "2d" );
    gfx.fillStyle = ( color || "gold" );
    gfx.fillRect( 0, 0, w, h );
};
</script>

---------------------------------------------------------------

# Comments

<style>
@import url("./gadgets/comments-section.css");
</style>
<section id="comments_section"></section>
<script src="./gadgets/comments-section.js"></script>

---------------------------------------------------------------

# Script

<style>
@import url("./gadgets/script-section.css");
</style>
<section id="script_section"></section>
<script src="./gadgets/script-section.js"></script>

---------------------------------------------------------------

# Event Log

<style>
@import url("./gadgets/comments-section.css");
</style>
<section id="eventlog_section"></section>
<script src="./gadgets/eventlog-section.js"></script>

---------------------------------------------------------------

<style>
@import url("./gadgets/input-footer.css");
</style>
<footer id="footer"></footer>
<script src="./gadgets/input-footer.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
	try {
        const ops = Colorizer;
        ops.read_table( 1 );
        test( 6 );
	} catch ( e ) {
		alert ( e );
		throw ( e );
	}
}
</script>

<script>
addEventListener( "load", main );
</script>

<script>
function test_001() {
	alert( "Test #001" );
}
function test_002() {
	alert( typeof event_log );
}
function test_003() {
	event_log.add( typeof event_log );
}
function test_004() {
    const ops = Colorizer;
    ops.read_table( 1 );
    const m = mem( ops.entries );
    const v = m.map( k => ops.entries[ k ].color );
	event_log.list( v, "Color Names"  );
}
function test_005() {
    const ops = Colorizer;
    const entries = ops.entries;
    const color = entries.green.rgb;
    event_log.add( color );
    ops.clear( color );
}
function test_006() {
    const ops = Colorizer;
    ops.rainbow();
}
</script>

<script>
Tests = [
  test_001
, test_002
, test_003
, test_004
, test_005
, test_006
];
</script>

<script>
function test( n=5 ) {
    try {
        n = parseInt( n );
        const fn = Tests[ n - 1 ];
        if (! fn ) {
            throw new Error( `Invalid Test Index: ${n}` );
        }
        fn();
    } catch ( e ) {
        bummer( e );
    }
}
</script>

<script>
function bummer( e ) {
    console.error( e );
    event_log.add( `ERROR : ${e.message}` );
}
</script>

<script>
function mention( s ) {
    console.log( s );
    event_log.add( s );
}
</script>

<script>
function say( s ) {
    event_log.clear();
    mention( s );
}
</script>
