<head> <link rel="icon" href="favicon.ico" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>
[ideaflip]: <https://ideaflip.com/>
[luminous]: <http://tiny.cc/jarvis-snipper-101>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]:
<http://dave-tower/demo/web/palette-analyzer-notes.html>
"Tower Edition"

----------------------------------------------------------------

# [`🗒️` Palette Analyzer Notes][me]

<div center>
  <div class="decal-icon">🗒️</div>
</div>

### `>>` FEATURING `<<`

> [`🎨` Palette Analyzer](./palette-analyzer.html)

----------------------------------------------------------------

# Description

The `Palette Analyzer` app began as a simple tool for
graphing RGB Color Components.

The need arose to build a function that interpolates colors
in order to replicate the `Fire Demo` palette.

This palette was build dynamically quite some time ago, then
shared with various apps.

I've lost track of the original function used to generate the
fire palette. In order to produce identical results, I needed
a means of determining the parameters for color interpolation.

The easiest way I could think of to accomplish this was to
graph each color component and analyze their slopes. This
basic feature quickly expanded into a fairly extensive
statistical tool.

----------------------------------------------------------------

# Jarvis Support

`Pal-Anz` supports both `Jarvis` and `seeker` for Spelunking
source code.

----------------------------------------------------------------

# Footer Input

`Pal-Anz` supports the standard paradigm for footer input
gadgets, including `perform`, `exec`, and `macro` methods.

----------------------------------------------------------------

# Madge Graphics

`Pal-Anz` uses a variation on the `Madge` Graphics paradigm.
This provides `Surface`, `Graphics`, `Pen` and similar
constructs for plotting lines and other basic `2D` drawing.

----------------------------------------------------------------

# Core Ops

`Pal-Anz` imports the simplified `core-ops.js` gem common to
many of the Demo Web Apps.

This isn't a comprehensive version. It does suffice for most
app requirements.

----------------------------------------------------------------

# Scalar Math

`Pal-Anz` uses a subset of the `Vulcan Math` API. This doesn't
presently support trig. It does support the required math for
the `Statistics` component.

----------------------------------------------------------------

# Statistics Math

`Pal-Anz` has a moderately comprehensive Stats Component. This
includes operations on arbitrary sized sample sets (vectors).

The `vstats` function doubles as an accessor for enhanced
methods, like `hints` and `inspect`.

The `vstats` function returns the most comprehensive set of
statistics for a sample set. This includes Least Squares
slope and intercept, `mse`, `stddev`, and a slew of related
values.

The easiest way to understand the returned object is to use
the `vstats.inspect()` method from within the debug console.
If no arg is passed, member hints are displayed in a table.

If a `stats` return object is passed in, its members are shown
in a table. To clarify, `vstats` is the function. This
function returns a comprehensive `stats` instance.

----------------------------------------------------------------

# Palette Analysis

There's an embedded `script` with the id of `analyzer.js`. This
script is intended to server as a __Peach__. That is, a
starting point or basis for custom scripts at run-time. This
script is loaded into the `sce` Script Editor at load time.

----------------------------------------------------------------

# UI Layout

The User Interface layout is comprised of two docked vertical
panels and a footer. The left panel contains a `canvas`, The
right panel contains a `textarea`. The footer contains an
`input` and s `div` for buttons.

----------------------------------------------------------------

## [`🧰` Toolkit][luminous]

> [`🧰` Math Jax](http://dave-legacy/math/latex/mathjax-test.html)
> [`🧰` Math Universe](http://dave-legacy/math/math-menu.html)

----------------------------------------------------------------

## [`💧` References][raindrop]

> [`💧` Raindrop Math](https://app.raindrop.io/my/46171960)
> [`📙` Least Squares](http://dave-probook/std/pubs/math/least-squares.html)
> [`📙` Bell Curve](http://dave-probook/std/pubs/math/bell-curve.html)
> [`📙` Math Formulas](http://dave-probook/std/pubs/math/formulas.html)
> [`📚` Math Links](http://dave-probook/std/pubs/math/links.html)

----------------------------------------------------------------

## [`🧭` Navigation][sulu]

> [`☰` Web Menu](./web-menu.html)
> [`☰` Demo Menu](./../demo-menu.html)

> [`🗒️` Palette Analyzer Math Notes](./pal-anz-math-notes.html)

> [`🎇` Explosion Demo](./explode/explode-deux.html)

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
; prolog . title = ( `Palette Analyzer Notes` )
;
</script>

<script>
;
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


