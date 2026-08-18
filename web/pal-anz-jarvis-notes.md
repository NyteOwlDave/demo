<head> <link rel="icon" href="./icons/palette-analyzer.png" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>
[ideaflip]: <https://ideaflip.com/>
[luminous]: <http://tiny.cc/jarvis-snipper-101>
[nancy]:    <https://sites.google.com/view/nancys-notebooks/home>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/web/pal-anz-nav-notes.html>
"Tower Edition"

[me-omega]:
<http://dave-omega/demo/web/pal-anz-nav-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [`🗒️` Jarvis Notes][me-omega]

<div center>
  <div class="decal-icon">🤖</div>
</div>

### `>>` FEATURING `<<`

> [`🎨` Palette Analyzer](./palette-analyzer.html)

----------------------------------------------------------------

# `🧝` Description

This document is devoted to the __Jarvis__ component of the
`Palette Analyzer` app.

`Jarvis` helps with code <i>spelunking</i>. That is, analysis
of available methods and properties within the app.

__Components of Interest:__

- `Jarvis`
- `Jarvis.Aliases`
- `Jarvis.Ops`
- `Jarvis.Props`

----------------------------------------------------------------

### NOTE:

> Additional spelunking methods can be found in `SupportOps`.

----------------------------------------------------------------

## Jarvis.Aliases

| Alias | Original   | Comments |
|-------|------------|------------------------------|
| `iwm` | n/a        | Initial Window Members       |
| `doc` | `document` | Document Object              |

----------------------------------------------------------------

## Jarvis.Ops

| Accessor     | Purpose |
|--------------|---------------------------------|
| `CoreOps`    | Core Methods (DOM, BOM, etc.)   |
| `NavOps`     | Navigation Methods              |
| `JsonOps`    | JSON Methods                    |
| `MadgeOps`   | Madge Graphics System           |
| `MathOps`    | Scalar Math Methods             |
| `StatOps`    | Vector Statistics Methods       |
| `TrigOps`    | Trigonometric Methods           |
| `ColorOps`   | Color Methods                   |
| `SupportOps` | Support Methods                 |
| `DebugOps`   | Debug Methods                   |

----------------------------------------------------------------

## Jarvis.Props

| Property      | Type         | Purpose |
|---------------|--------------|---------------------------|
| `colors_rgba` | String Array | RGBA Palette              |
| `colors_hex`  | String Array | HTML Hexadecimal Palette  |
| `math`        | Object       | Math Constants            |

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
; prolog . title = ( `Palette Analyzer Jarvis Notes` )
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

