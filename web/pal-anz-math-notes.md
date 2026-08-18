<head> <link rel="icon" href="favicon.ico" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>
[ideaflip]: <https://ideaflip.com/>
[luminous]: <http://tiny.cc/jarvis-snipper-101>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[math-js]:
<https://mathjs.org/>
"Math JS Home Site"

[glmatrix-js]:
<https://glmatrix.net/docs/>
"GL Matrix Manual"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]:
<http://dave-tower/demo/web/palette-analyzer-notes.html>
"Tower Edition"

----------------------------------------------------------------

# [`🗒️` Palette Analyzer Math Notes][me]

<div center>
  <div class="decal-icon">🗒️</div>
</div>

### `>>` FEATURING `<<`

> [`🎨` Palette Analyzer](./palette-analyzer.html)

----------------------------------------------------------------

# Description

This document is devoted to the __Math__ components of the
`Palette Analyzer` app.

There are three components of interest:

- `MathProps` ( Scalar Constants )
- `MathOps` ( Scalar Math )
- `StatOps` ( Vector Math )

----------------------------------------------------------------

## MathOps ( Scalar Math )

| Method   | Args    | Purpose |
|----------|---------|--------------------------------|
| `abs`    | n       | Absolute Value of N            |
| `sgn`    | n       | Algebraic Sign of N            |
| `min`    | a, b    | Minimum of A and B             |
| `max`    | a, b    | Maximum of A and B             |
| `mid`    | a, b, c | Clamp A to Range [ B ... C ]   |
| `round`  | n       | Round N to Nearest Integer     |
| `trunc`  | n       | Truncate N to Integer          |
| `floor`  | n       | Round N Toward -Infinity       |
| `ceil`   | n       | Round N Toward +Infinity       |
| `pow`    | x, n    | Raise X to the Power of N      |
| `rootn`  | x, n    | Raise X to the Power of 1 / N  |
| `sqrt`   | n       | Square Root of N               |
| `cbrt`   | n       | Cube Root of N                 |
| `square` | n       | Calculate N Squared            |
| `cube`   | n       | Calculate N Cubed              |
| `exp`    | n       | Natural Exponential for N      |
| `log`    | n       | Natural Logarithm for N        |
| `logn`   | x, n    | Base-N Logarithm for X         |
| `rnd`    | k       | Random Real [ 0 ... K ]        |
| `irnd`   | k       | Random Integer [ 0 ... K-1 ]   |
| `crnd`   | k       | Random Real [ -K/2 ... +K/2 ]  |
| `arnd`   |         | Random Angle [ -PHI ... +PHI ] |
| `constants` |      | Inspect Math Constants         |

----------------------------------------------------------------

## MathProps ( Constants )

| Property | Type   | Approximate Value  | Description  |
|----------|--------|--------------------|--------------|
| `_E`     | Real   | 2.718281828459045  | Base-E       |
| `_PI`    | Real   | 3.141592653589793  | Pi           |
| `_PHI`   | Real   | 1.5707963267948966 | Pi / 2       |
| `_TAU`   | Real   | 6.283185307179586  | Pi * 2       |
| `_PSI`   | Real   | 1.618033988749895  | Golden Ratio |
| `_SR2`   | Real   | 1.4142135623730951 | 2 ^ (1/2)    |
| `_SR3`   | Real   | 1.7320508075688772 | 3 ^ (1/2)    |
| `_SR5`   | Real   | 2.23606797749979   | 5 ^ (1/2)    |

----------------------------------------------------------------

## StatOps ( Vector Math )

| Method    | Args    | Purpose |
|-----------|---------|------------------------------------|
| `vmax`    | v       | Maximum Sample Value               |
| `vmin`    | v       | Minimum Sample Value               |
| `vmedian` | v       | Median Sample Value                |
| `vavg`    | v       | Mean Average of Sample Values      |
| `vsum`    | v       | Sum of Sample Values               |
| `vbounds` | v       | Lower and Upper Sample Bounds      |
| `vlerp`   | v, t    | Linear Interpolation               |
| `vhalf`   | v       | Midpoint of Lower and Upper Bounds |
| `vrange`  | v       | Distance from Lower to Upper Bound |
| `vnorm`   | v       | Normalize Samples [ -1 ... +1 ]    |
| `vmse`    | v       | Variance (Mean Squared Error)      |
| `vstd`    | v       | Standard Deviation                 |
| `vstats`  | v       | Comprehensive Statistics           |

### Extended `vstat` Methods

| Method     | Args | Purpose |
|------------|------|--------------------------|
| `tabulate` | o    | Create Core Table from O |
| `inspect`  | o    | Inspect Core Table O     |

### Extended `vstat` Properties

| Property | Type   | Purpose |
|----------|--------|----------------------------------|
| `hints`  | Object | Property Hints for `stat` Object |
| `pubs`   | String | URL Address for Math Pubs        |

### Properties for `stat` Object

| Property  | Type    | Purpose                     |
|-----------|---------|-----------------------------|
| `n`       | Integer | Sample Count                |
| `avg`     | Real    | Mean Average                |
| `m`       | Real    | Slope                       |
| `b`       | Real    | Intercept                   |
| `lo`      | Real    | Lower Y Bound               |
| `hi`      | Real    | Upper Y Bound               |
| `xsum`    | Real    | Sum of X Indices            |
| `ysum`    | Real    | Sum of Y Samples            |
| `xx`      | Real    | Sum of Squares of X Indices |
| `yy`      | Real    | Sum of Squares of Y Samples |
| `xy`      | Real    | Sum of X-Y Products         |
| `sse`     | Real    | Sum of Squared Errors       |
| `mse`     | Real    | Mean Squared Error          |
| `std`     | Real    | Standard Deviation          |
| `samples` | Vector  | Sample Set Y                |

----------------------------------------------------------------

# Third Party Packages

- [`math.js`][math-js]
- [`glmatrix.js`][glmatrix-js]

----------------------------------------------------------------

# Usage Notes

- ( `pending` )

----------------------------------------------------------------

## [`🧭` Navigation][sulu]

> [`☰` Web Menu](./web-menu.html)
> [`☰` Demo Menu](./../demo-menu.html)

> [`🗒️` Palette Analyzer Notes](./palette-analyzer-notes.html)

> [`🎨` Palette Analyzer](./palette-analyzer.html)
> [`🎇` Explosion Demo](./explode/explode-deux.html)

> [`💎` RGB Gem](./explode/rgb.js)
> [`💎` Fire Gem](./explode/fire.js)
> [`💎` Fire Palette Gem](./explode/fire-palette.js)

> [`🌲` Folder Tree](./tree.php)
> [`🗃️` File System](./)

----------------------------------------------------------------

<style>
@import url("./../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
;
; iwm = Object.keys( window ).sort()
;
</script>

<script>
;
; prolog = {}
; prolog . title = ( `Palette Analyzer Math Notes` )
;
</script>

<script>
;
; doc = document
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./gems/core-ops.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./app/notes-app.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
// Called from note-app.js
function main( event ) {
    doc . title = ( prolog . title );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
