<head> <link rel="icon" href="favicon.ico" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[jarvis]:   <http://dave-omega/app/jarvis/jarvis-menu.html>
[sulu]:     <http://dave-ryzen/nav/sulu.html>
[ideaflip]: <https://ideaflip.com/>
[luminous]: <http://tiny.cc/jarvis-snipper-101>
[jimbo]:    <http://dave-omega/app/jarvis/toolkit/ncs/jimbo/jimbo-menu.html>
[nancy]:    <https://sites.google.com/view/nancys-notebooks/home>
[raindrop]: <https://app.raindrop.io/my/45357558>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[named-colors]: <http://dave-jefr/palettes/named-colors/named-colors.html>
[math-groups]: <http://dave-tower/demo/dot/md/math-groups.html>
[math-links]: <http://dave-probook/std/pubs/math/links.html>
[math-formulas]: <http://dave-probook/std/pubs/math/formulas.html>
[least-squares]: <http://dave-probook/std/pubs/math/least-squares.html>
[bell-curve]: <http://dave-probook/std/pubs/math/bell-curve.html>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[mdn-gfx]: <https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D>
[math-js]: <https://mathjs.org/>
[glmatrix-js]: <https://glmatrix.net/docs/>
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

# `🧝` Description

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

__Candidate Packages:__

- `p5.js`
- `three.js`
- `chart.js`
- `tabulator.js`
- `papa-parse.js`
- `moment.js`

----------------------------------------------------------------

# [`🤖` Jarvis Support][jarvis]

`Pal-Anz` supports both `Jarvis` and `seeker` for Spelunking
source code.

----------------------------------------------------------------

# `🍏` Core Ops

`Pal-Anz` imports the simplified `core-ops.js` gem common to
many of the Demo Web Apps.

This isn't a comprehensive version. It does suffice for most
app requirements.

----------------------------------------------------------------

# `🧮` Scalar Math

`Pal-Anz` uses a subset of the `Vulcan Math` API. Components
include:

- `MathProps`
- `MathOps`
- `TrigOps`

----------------------------------------------------------------

# `🧮` Statistics Math

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

# [`🖌️` Madge Graphics][mdn-gfx]

`Pal-Anz` uses a variation on the `Madge` Graphics paradigm.
This provides `Surface`, `Graphics`, `Pen` and similar
constructs for plotting lines and other basic `2D` drawing.

----------------------------------------------------------------

# [`🎨` Palette Analysis][named-colors]

There's an embedded `script` with the __id__ of `analyzer.js`.

This script is intended to server as a __Peach__. That is, a
starting point or basis for custom scripts at run-time. This
script is loaded into the `sce` Script Editor at load time.

----------------------------------------------------------------

# `☸` UI Layout

The __User Interface__ layout is comprised of two docked
vertical __Panels__ and a __Footer__.

The __Left Panel__ contains a `canvas` ( id : `surface` ).

The __Right Panel__ contains a `textarea` ( id : `sce` ).

The __Footer__ contains an `input` and a `div`.

The `input` is for __Commands__ ( id : `footer_input` ).

The `div` serves as  __Button Tray__ ( id : `tray` ).

----------------------------------------------------------------

# `🚧` Incomplete Topics

__These components need their own sections:__

- `JsonOps`
- `DebugOps`
- `SupportOps`
- `NavOps`
- `ColorOps`

## `✔️` Completed Topics

- `MadgeOps`
- `MathOps`
- `TrigOps`
- `StatOps`
- `Jarvis`
- `Palette Analysis`
- `UI Layout`

----------------------------------------------------------------

# Future Improvements

- Import `pcl-ultra.js` Gem
- Import `filter.js` Gem
- Import My Notepad Gem
- Finish `analyzer.js` Embedded Peach
- Finish `fire.js` Gem (for Explode Demo)
- Finish `dot()` Method
- Finish `macro()` Method
- Keyboard Handler
- Mouse Handler
- Gadget Ops
- Module Ops
- Store Ops
- Session Ops
- File I/O Ops
- Extract Madge Graphics
- Convert Plot 3D Peach to API
- Complex Math
- Vec2D, Vec3D, Vec4D Math
- Matrix Math

----------------------------------------------------------------

## [`🧭` Navigation][sulu]

> [`☰` Palette Analyzer Menu](./pal-anz-menu.html)
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


