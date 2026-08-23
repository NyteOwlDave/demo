
<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[lumina-api]: <./lumina-gfx.js> "Lumina Gfx API Source Code"

[liza]:
<http://dave-omega/demo/zx/lissajous.html>
"Omega Edition"

[pal-anz]:
<http://dave-omega/demo/web/palette-analyzer.html>
"Omega Edition"

[pal-notes]:
<http://dave-omega/demo/web/palette-analyzer-notes.html>
"Omega Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/api/lumina-gfx-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [Lumina Gfx API Notes][me-omega]

----------------------------------------------------------------

<div center>
  <img src="./lumina-gfx.png" />
</div>

----------------------------------------------------------------

> ( `Web Demos` )

----------------------------------------------------------------

# Description

----------------------------------------------------------------

The [`Lumina Gfx API`][lumina-api] supports a wide array of
Wb-based demos.

The [`Palette Analyzer`][pal-anz] was first. Though the concepts
existed with `Midge API` and `Madge Gfx App`, the palette
analyzer served as a sandbox for a fresh new implementation of
the "Line Plotter" style Graphics Engine.

Eventually, the embedded code was extracted and given the name
`Lumina`. Though it remains closely related to `Midge`.

After extraction, the [`Lissajous Demo`][liza] imported the API
and became another powerful example of the usefulness of this
__Graphics and Math__ module.

----------------------------------------------------------------

# Primary Accessor Methods

----------------------------------------------------------------

```javascript

function Surface()
function Graphics()

```

----------------------------------------------------------------

This document is incomplete. Need to thoroughly discuss the
API. A good place to find for related information is in the
extensive [Notes for Palette Analyzer][pal-notes].

----------------------------------------------------------------

# Details Tables

----------------------------------------------------------------

> See [TreeView API Notes](./treeview-api-notes.html) for
> Usage Hints

----------------------------------------------------------------

<section id="details_section"></section>

<script id="details-table.js">
function details_table( o, title ) {
    try {
        title = ( str( title ) || "Details" );
        if (! o ) {
            o = Pen;
            title = ( "Pen Details" );
        }
        const se = details_section;
        se.innerHTML = "";
        const te = elx( "TABLE" );
        const ce = te.createCaption();
        ce.textContent = ( title );
        se.appendChild( te );
        const m = mapper( o );
        mapper.tabulate( m, te );
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
</script>

<script>
details_table.edit = function() {
    const ed = hud.editor();
    const se = gid( "details-table.js" );
    ed.value = se.innerText;
    hud.show();
};
</script>

<script>
details_table.notes = function() {
    const ops = details_table;
    const ed = hud.editor();
    ed.value = ( ops.hints );
    hud.show();
};
</script>

<script>
details_table.hints = ( `

/*
  To Show Accessor Details:
*/

_caption = "Details Table";
_accessor = details_table;

details_table( _accessor, _caption );

` );
</script>

<script>
addEventListener(
  "load" ,
  ( e ) => { details_table(); }
);
</script>

----------------------------------------------------------------

# References

[notes-menu]:
<http://dave-omega/app/jarvis/auto/notes-menu.html>
"Omega Edition"

> [Notes Menu][notes-menu]

----------------------------------------------------------------

# Navigation

> [Web Menu](./../web-menu.html)

> [Folder Tree](./)
> [File System](./)

----------------------------------------------------------------

<footer id="footer">
  <input id="footer_input" onchange="perform(event)" />
</footer>

<header id="footer">
  <div id="messages"></div>
</header>

----------------------------------------------------------------

<script>
;
; iwm = Object.keys( window ).sort()
;
</script>

<script>
;
; prolog = {}
; prolog . title = ( `Lumina Gfx API Notes` )
;
</script>

<script>
;
; cls =()=> console.clear()
; agn =()=> location.reload()
;
</script>

<script>
;
; doc = document
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./../gems/core-ops.js"></script>
<script src="./core-api.js"></script>
<script src="./lumina-gfx.js"></script>
<script src="./treeview.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        doc . title = ( prolog . title );
        footer_input.value = "hud()";
    } catch ( e ) {
        alert ( e )
        throw ( e )
    }
}
</script>

<script>
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<style>
@import url("./../../style/sce-hud.css");
</style>
<textarea id="sce" class="hide"></textarea>
<script src="./hud.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

