<head> <link rel="icon" href="./icons/palette-analyzer.png" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>
[ideaflip]: <https://ideaflip.com/>
[luminous]: <http://tiny.cc/jarvis-snipper-101>
[nancy]:    <https://sites.google.com/view/nancys-notebooks/home>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/web/pal-anz-support-notes.html>
"Tower Edition"

[me-omega]:
<http://dave-omega/demo/web/pal-anz-support-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [`🗒️` Support Notes][me-omega]

<div center>
  <div class="decal-icon">🧑‍🔧</div>
</div>

### `>>` FEATURING `<<`

> [`🎨` Palette Analyzer](./palette-analyzer.html)

----------------------------------------------------------------

# `🧝` Description

This document is devoted to the __SupportOps__ components of the
`Palette Analyzer` app.

__Components of Interest:__

- `SupportOps` ( Global Methods )

----------------------------------------------------------------

## SupportOps ( Global Methods )

| Method         | Args          | Purpose                     |
|----------------|---------------|-----------------------------|
| `seeker`       | `rex`         | Find Global Member Names    |
| `crashed`      | `e`           | Report Error                |
| `crunch`       | `event`       | Handle Button Click Event   |
| `perform`      | `event`       | Handle Input Change Event   |
| `exec`         | `js`          | Run JavaScript              |
| `macro`        | `cmd`         | Run Macro Command           |
| `run`          |               | Run SCE Value as JavaScript |
| `inspect`      | `title, o`    | Inspect Core Table          |
| `inspect_size` | `title, w, h` | Inspect Size Metrics        |
| `mine`         | `event`       | Signal Event as Handled     |
| `incomplete`   | `s`           | Report Incomplete Feature   |

----------------------------------------------------------------

## Extended `inspect` Methods

| Method     | Args | Purpose                   |
|------------|------|---------------------------|
| `tabulate` | `o`  | Prepare Core Table        |

----------------------------------------------------------------

## Extended `crunch` Methods

- ( `pending` )

----------------------------------------------------------------

## Extended Properties

| Accessor  | Property | Type   | Description |
|-----------|----------|--------|---------------------------|
| `perform` | `event`  | Event  | Trigger Event             |
| `perform` | `error`  | String | Most Recent Error Message |
| `exec`    | `prior`  | String | Previous Input Value      |
| `exec`    | `input`  | String | Most Recent Input Value   |
| `exec`    | `output` | String | Most Recent Output Value  |
| `exec`    | `error`  | String | Most Recent Error Message |
| `macro`   | `input`  | String | Most Recent Input Value   |
| `macro`   | `error`  | String | Most Recent Error Message |

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
; prolog . title = ( `Palette Analyzer Support Notes` )
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
