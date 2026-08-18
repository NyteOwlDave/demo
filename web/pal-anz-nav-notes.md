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

[me-tower]:
<http://dave-tower/demo/web/pal-anz-nav-notes.html>
"Tower Edition"

[me-omega]:
<http://dave-omega/demo/web/pal-anz-nav-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [`🗒️` Navigation Notes][me-tower]

<div center>
  <div class="decal-icon">🗒️</div>
</div>

### `>>` FEATURING `<<`

> [`🎨` Palette Analyzer](./palette-analyzer.html)

----------------------------------------------------------------

# Description

This document is devoted to the __Navigation__ component of the
`Palette Analyzer` app.

There is are two components of interest:

- `NavOps`
- `NavProps`

----------------------------------------------------------------

## NavOps ( Methods )

| Method   | Args       | Purpose |
|----------|------------|--------------------------------|
| `veer`   | `hostname` | Redirect to Altername Host     |
| `dot`    | `filename` | Launch Dot Rocket (See Note)   |
| `visit`  | `url`      | Open URL Address               |
| `home`   |            | Open Home Page                 |
| `notes`  |            | Open Notes Page                |
| `jax`    |            | Open MathJax Editor            |

----------------------------------------------------------------

### NOTE

> The `dot` function is incomplete

----------------------------------------------------------------

## NavProps ( Constants )

| Accessor | Property  | Type   | Description |
|----------|-----------|--------|----------------------|
| `home`   | `address` | String | Palette Analyzer     |
| `notes`  | `address` | String | Pal-Anz Notes        |
| `jax`    | `address` | String | MathJax Editor       |
| `visit`  | `options` | String | Popup Window Options |

----------------------------------------------------------------

### NOTE

> The `NavProps` object isn't implemented yet

----------------------------------------------------------------

# Usage Notes

These methods are very useful when executed from the
__Footer Input__ gadget.

----------------------------------------------------------------

## [`🧭` Navigation][sulu]

> [`🗒️` Palette Analyzer Notes](./palette-analyzer-notes.html)

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
; prolog . title = ( `Palette Analyzer Navigation Notes` )
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

