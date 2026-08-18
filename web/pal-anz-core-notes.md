<head> <link rel="icon" href="./icons/palette-analyzer.png" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>
[ideaflip]: <https://ideaflip.com/>
[luminous]: <http://tiny.cc/jarvis-snipper-101>
[nancy]:    <https://sites.google.com/view/nancys-notebooks/home>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/web/pal-anz-core-notes.html>
"Tower Edition"

[me-omega]:
<http://dave-omega/demo/web/pal-anz-core-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [`🗒️` Core Ops Notes][me-omega]

<div center>
  <div class="decal-icon">🍏</div>
</div>

### `>>` FEATURING `<<`

> [`🎨` Palette Analyzer](./palette-analyzer.html)

----------------------------------------------------------------

# `🧝` Description

This document is devoted to the __CoreOps__ components of the
`Palette Analyzer` app.

__Components of Interest:__

- `CoreOps` ( Global Methods )

----------------------------------------------------------------

## CoreOps ( Global Methods )

| Method | Args   | Purpose                         | Note |
|--------|--------|---------------------------------|------|
| `str`  | `o`    | Convert O to Trimmed String     |  1   |
| `arr`  | `o`    | Convert O to Array              |  2   |
| `unq`  | `o`    | Convert O to Set                |  2   |
| `dct`  |        | Create Empty Map                |      |
| `ole`  | `q, e` | First Matching Child of E       |      |
| `ale`  | `q, e` | All Matching Children of E      |      |
| `one`  | `q`    | First Matching Child            |      |
| `all`  | `q`    | All Matching Children           |      |
| `elx`  | `t`    | Create Element of Type T        |      |
| `gid`  | `i`    | Get Element with ID of I        |      |
| `mem`  | `o`    | Get Object Member Names         |  3   |
| `dir`  | `o`    | Get Object Member Names         |  4   |
| `tmp`  | `o`    | Get Object Member Names         |  5   |
| `gad`  | `o`    | Verify O is HTMLElement         |      |
| `ged`  | `o`    | Verify O is HTMLTextAreaElement |      |
| `gvw`  | `o`    | Verify O is HTMLPreElement      |      |
| `gtb`  | `o`    | Verify O is HTMLTableElement    |      |
| `gsc`  | `o`    | Verify O is HTMLSectionElement  |      |
| `isa`  | `t, o` | Verify O has Type T             |      |
| `iar`  | `o`    | Verify O is Array               |      |
| `iob`  | `o`    | Verify O is Object              |      |

----------------------------------------------------------------

### NOTES:

- (1) Default `o` is the Empty String ( `""` )
- (2) Default `o` is the Empty Array ( `[]` )
- (3) Default `o` is `window`
- (4) Default `o` is `localStorage`
- (5) Default `o` is `sessionStorage`

----------------------------------------------------------------

## CoreProps ( Global Properties )

| Property | Type         | Description  |
|----------|--------------|----------------------------------|
| `iwm`    | String Array | Initial Global Member Names      |
| `doc`    | Document     | Alias for `document`             |

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
; prolog . title = ( `Palette Analyzer Core Ops Notes` )
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
