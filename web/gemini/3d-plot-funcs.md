<head><link rel="icon" href="./gemini.png" /></head>

<style>
html, body {
	background : rgb( 180, 205, 255 );
}
* { color : #424200 !important; }
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/web/gemini/3d-plot-funcs.html>

----------------------------------------------------------------

# [3D Plot Functions][me-tower]

> ( `Gemini AI` )

----------------------------------------------------------------

# Prompt

```

I recenty wrote an Isometric 3D plotter for Web Dev usage.
It can plot any 3D function using a call-back function of the
form z = fn( x, y ). I'd like a few 3D functions to exercize
the code. Assume a cubic virtual space where each axis is
clipped to the visible range [ -50 ... +50 ].

For example:

// Callbacks
func = [];

// First Example Callback
func[1] =( x, y )=> ( 50 * sin( 1.2*y ) - 45 * cos( 1.4*x ) );

By the way, assume all methods for the JavaScript `Math` object
exist in abbreviated form (as seen in `sin` and `cos` above).

Lets do sets of 10 examples. Do just the first set for now.
I'll bookmark this chat and return later for more sets.

```

----------------------------------------------------------------

# Response

```

// 101. Damped Concentric Ripple (Droplet effect)
func[ 101 ] = (x, y) => {
    let r = SelfDot( x, y );
    return 160 * sin(3 + r / 4) / (4 + r / 15);
};

// 102. Classic Egg-Crate Surface
func[ 102 ] = (x, y) => 25 * (sin(x / 10) * cos(y / 10));

// 103. Inverted Cone / Funnel
func[ 103 ] = (x, y) => 200 - 50 * sqrt(x*x + y*y);

// 104. Hyperbolic Saddle with Wave Modulation
func[ 104 ] = (x, y) => (x*x - y*y) / 45 + 12 * sin(x / 6);

// 105. Spiral Vortex Wave
func[ 105 ] = (x, y) => 30 * sin(sqrt(x*x + y*y) - x / 3);

// 106. Gaussian-Faded Ripple Dome
func[ 106 ] = (x, y) => 45 * exp(-(x*x + y*y) / 2500) * cos(sqrt(x*x + y*y) / 3);

// 107. Diagonal Interference Grid
func[ 107 ] = (x, y) => 30 * sin((x + y) / 10) * cos((x - y) / 10);

// 108. Pyramid Peaks
func[ 108 ] = (x, y) => 50 - abs(x) - abs(y);

// 109. Crossed Troughs
func[ 109 ] = (x, y) => 35 * (sin(x / 8) / (1 + abs(y) / 25) + cos(y / 8) / (1 + abs(x) / 25));

// 110. Multi-Frequency Harmonic Landscape
func[ 110 ] = (x, y) => (
   30 * sin(x / 3) - 20 * cos(y / 3) + 25 * sin((x + y) / 5) 
);

```

----------------------------------------------------------------

# References

> [Gemini Chat Invite](https://share.gemini.google/507pdWtJAmBl)
> [Gemini Chat Main](https://gemini.google.com/app/97f8de5892036e16)

----------------------------------------------------------------

# Navigation

> [File System](./)

----------------------------------------------------------------

<script>
doc = document;
doc . title = "3D Plotter Functions";
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

