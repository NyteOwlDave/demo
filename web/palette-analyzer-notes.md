<head> <link rel="icon" href="favicon.ico" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[nancy]:    <https://sites.google.com/view/nancys-notebooks/home>
[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>
[ideaflip]: <https://ideaflip.com/>
[luminous]: <http://tiny.cc/jarvis-snipper-101>
[jimbo]:    <http://dave-omega/app/jarvis/toolkit/ncs/jimbo/jimbo-menu.html>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[math-groups]: <http://dave-tower/demo/dot/md/math-groups.html>
[math-links]: <http://dave-probook/std/pubs/math/links.html>
[math-formulas]: <http://dave-probook/std/pubs/math/formulas.html>
[math-js]: <https://mathjs.org/>
[glmatrix-js]: <https://glmatrix.net/docs/>
[least-squares]: <http://dave-probook/std/pubs/math/least-squares.html>
[bell-curve]: <http://dave-probook/std/pubs/math/bell-curve.html>
[raindrop-math]: <https://app.raindrop.io/my/46171960>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/web/palette-analyzer-notes.html>
"Tower Edition"

[me-omega]:
<http://dave-omega/demo/web/palette-analyzer-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [`🗒️` Palette Analyzer Notes][me-tower]

<div center>
  <div class="decal-icon">🗒️</div>
</div>

### `>>` FEATURING `<<`

> [`🎨` Palette Analyzer](./palette-analyzer.html)

----------------------------------------------------------------

# Description

## History

The `Palette Analyzer` app began as a simple tool for
graphing __RGB Color Components__.

The need arose to build a function that interpolates colors
in order to replicate the `Fire Demo` palette.

This palette was built dynamically quite some time ago, then
shared with various apps.

I've lost track of the original function used to generate the
fire palette. In order to produce identical results, I needed
a means of determining the parameters for color interpolation.

The easiest way I could think of to accomplish this was to
graph each color component and analyze their slopes. This
basic feature quickly expanded into a fairly extensive
statistical tool.

## Present

The app is now something of a powerhouse in terms of Math,
Stats, and 2D Graphics.

It imports several Third Party Packages for math and graphics.

## Future

Adding more Third Party Packages would improve the app
considerably.

__Candidates include:__

- `p5.js`
- `three.js`
- `chart.js`
- `tabulator.js`
- `papa-parse.js`
- `moment.js`

----------------------------------------------------------------

# Jarvis Support

`Pal-Anz` supports both `Jarvis` and `seeker` for Spelunking
source code.

----------------------------------------------------------------

# Footer Input

`Pal-Anz` supports the standard paradigm for footer input
gadgets, including `perform`, `exec`, and `macro` methods.

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

# Madge Graphics

`Pal-Anz` uses a variation on the `Madge` Graphics paradigm.
This provides `Surface`, `Graphics`, `Pen` and similar
constructs for plotting lines and other basic `2D` drawing.

----------------------------------------------------------------

# Palette Analysis

There's an embedded `script` with the id of `analyzer.js`. This
script is intended to server as a __Peach__. That is, a
starting point or basis for custom scripts at run-time. This
script is loaded into the `sce` Script Editor at load time.

----------------------------------------------------------------

# UI Layout

The __User Interface__ layout is comprised of two docked
vertical __Panels__ and a __Footer__.

The __Left Panel__ contains a `canvas` ( id : `surface` ).

The __Right Panel__ contains a `textarea` ( id : `sce` ).

The __Footer__ contains an `input` and a `div`.

The `input` is for __Commands__ ( id : `footer_input` ).

The `div` serves as  __Button Tray__ ( id : `tray` ).

----------------------------------------------------------------

## [`🗒️` Additional Notes][nancy]

> [`🗒️` Math Notes](./pal-anz-math-notes.html)
> [`🗒️` Navigation Notes](./pal-anz-nav-notes.html)

----------------------------------------------------------------

## [`🧰` Toolkit][luminous]

> [`🧰` Math Jax](http://dave-legacy/math/latex/mathjax-test.html)
> [`🧰` Math Universe](http://dave-legacy/math/math-menu.html)

----------------------------------------------------------------

## [`🧨` Demos](./../demo-menu.html)

> [`🎇` Explosion Demo](./explode/explode-deux.html)

----------------------------------------------------------------

## [`💎` Gems][jimbo]

> [`💎` RGB Gem](./explode/rgb.js)
> [`💎` Fire Gem](./explode/fire.js)
> [`💎` Fire Palette Gem](./explode/fire-palette.js)

----------------------------------------------------------------

## [`💧` References][raindrop]

> [`👨‍👦‍👦` Math Groups][math-groups]
> [`📚` Math Links][math-links]
> [`📙` Least Squares][least-squares]
> [`📙` Bell Curve][bell-curve]
> [`📙` Math Formulas][math-formulas]
> [`📙` Math JS][math-js]
> [`📙` GL Matrix JS][glmatrix-js]
> [`💧` Raindrop Math][raindrop-math]

----------------------------------------------------------------

## [`🧭` Navigation][sulu]

> [`☰` Web Menu](./web-menu.html)
> [`☰` Demo Menu](./../demo-menu.html)

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


