<head> <link rel="icon" href="./icons/palette-analyzer.png" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>
[ideaflip]: <https://ideaflip.com/>
[luminous]: <http://tiny.cc/jarvis-snipper-101>
[nancy]:    <https://sites.google.com/view/nancys-notebooks/home>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/web/pal-anz-math-notes.html>
"Tower Edition"

[me-omega]:
<http://dave-omega/demo/web/pal-anz-math-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [`🗒️` Math Notes][me-omega]

<div center>
  <div class="decal-icon">🧮</div>
</div>

### `>>` FEATURING `<<`

> [`🎨` Palette Analyzer](./palette-analyzer.html)

----------------------------------------------------------------

# `🧝` Description

This document is devoted to the __Math__ components of the
`Palette Analyzer` app.

__Components of Interest:__

- `MathProps` ( Scalar Constants )
- `MathOps` ( Scalar Math Methods )
- `TrigOps` ( Scalar Trig Methods )
- `StatOps` ( Vector Math Methods )

----------------------------------------------------------------

## MathOps ( Scalar Math Methods )

| Method   | Args      | Purpose |
|----------|-----------|--------------------------------|
| `abs`    | `n`       | Absolute Value of N            |
| `sgn`    | `n        | Algebraic Sign of N            |
| `min`    | `a, b`    | Minimum of A and B             |
| `max`    | `a, b`    | Maximum of A and B             |
| `mid`    | `a, b, c` | Clamp A to Range [ B ... C ]   |
| `round`  | `n`       | Round N to Nearest Integer     |
| `trunc`  | `n`       | Truncate N to Integer          |
| `floor`  | `n`       | Round N Toward -Infinity       |
| `ceil`   | `n`       | Round N Toward +Infinity       |
| `pow`    | `x, n`    | Raise X to the Power of N      |
| `rootn`  | `x, n`    | Raise X to the Power of 1 / N  |
| `sqrt`   | `n`       | Square Root of N               |
| `cbrt`   | `n`       | Cube Root of N                 |
| `square` | `n`       | Calculate N Squared            |
| `cube`   | `n`       | Calculate N Cubed              |
| `exp`    | `n`       | Natural Exponential for N      |
| `log`    | `n`       | Natural Logarithm for N        |
| `logn`   | `x, n`    | Base-N Logarithm for X         |
| `rnd`    | `k`       | Random Real [ 0 ... K ]        |
| `irnd`   | `k`       | Random Integer [ 0 ... K-1 ]   |
| `crnd`   | `k`       | Random Real [ -K/2 ... +K/2 ]  |
| `arnd`   |           | Random Angle [ -PHI ... +PHI ] |
| `constants` |        | Inspect Math Constants         |

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

## TrigOps ( Scalar Trig Methods )

| Method   | Args      | Purpose |
|----------|-----------|---------------------------------------|
| `sin`    |   `t`     | Sine of Angle T                       |
| `cos`    |   `t`     | Cosine of Angle T                     |
| `tan`    |   `t`     | Tangent of Angle T                    |
| `asin`   |   `n`     | Inverse Sine of Ratio N               |
| `acos`   |   `n`     | Inverse Cosine of Ratio N             |
| `atan`   |   `n`     | Inverse Tangent of Ratio N            |
| `atan2`  |  `y, x`   | Inverse Tangent of Y / X              |
| `hypot`  |  `y, x`   | Hypotenuse of Vector { X, Y }         |
| `sinh`   |   `t`     | Hyberbolic Sine of Angle T            |
| `cosh`   |   `t`     | Hyberbolic Cosine of Angle T          |
| `tanh`   |   `t`     | Hyberbolic Tangent of Angle T         |
| `asinh`  |   `n`     | Hyberbolic Inverse Sine of Ratio N    |
| `acosh`  |   `n`     | Hyberbolic Inverse Cosine of Ratio N  |
| `atanh`  |   `n`     | Hyberbolic Inverse Tangent of Ratio N |
| `xpose`  |   `n`     | Convert Sine to Cosine or Vice-Versa  |

----------------------------------------------------------------

## StatOps ( Vector Math Methods )

| Method    | Args    | Purpose |
|-----------|---------|------------------------------------|
| `vmax`    | `v`     | Maximum Sample Value               |
| `vmin`    | `v`     | Minimum Sample Value               |
| `vmedian` | `v`     | Median Sample Value                |
| `vavg`    | `v`     | Mean Average of Sample Values      |
| `vsum`    | `v`     | Sum of Sample Values               |
| `vbounds` | `v`     | Lower and Upper Sample Bounds      |
| `vlerp`   | `v, t`  | Linear Interpolation               |
| `vhalf`   | `v`     | Midpoint of Lower and Upper Bounds |
| `vrange`  | `v`     | Distance from Lower to Upper Bound |
| `vnorm`   | `v`     | Normalize Samples [ -1 ... +1 ]    |
| `vmse`    | `v`     | Variance (Mean Squared Error)      |
| `vstd`    | `v`     | Standard Deviation                 |
| `vstats`  | `v`     | Comprehensive Statistics           |

### Extended `vstat` Methods

| Method     | Args | Purpose |
|------------|------|--------------------------|
| `tabulate` | `o`  | Create Core Table from O |
| `inspect`  | `o`  | Inspect Core Table O     |

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

# [`📘` Usage Notes][nancy]

- ( `pending` )

----------------------------------------------------------------

## [`🧭` Navigation][sulu]

> [`☰` Palette Analyzer Menu](./pal-anz-menu.html)

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
