<style>
@import url("https://nyteowldave.neocities.org/style.css");
</style>

<style>
@import url("http://dave-omega/demo/style/sce-hud.css");
</style>

<style>
#footer_input {
    width : calc( 100vw - 100px ) !important;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[cloud-pad]:
<https://texteditor.co/?id=drive-1cmolKg6ZCW-Nj8zArDwQkn0R5OWIR7am>
"Cloud Notepad"

[tick-tick]:
<https://ticktick.com/webapp/#p/6a99f28e8f086b72edb5a98b/tasks>
"Tick-Tick Project Notes"

[express-lane]:
<./express-lane.html>
"Express Lane"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/grafico/templates/menu-empty.html>
"Omega Edition"

----------------------------------------------------------------

# `☰` New Grafico Menu

> [`🔴` Primary][me-omega]

> [`🔴` Cloud Notepad][cloud-pad]
> [`🔴` Tick-Tick][tick-tick]
> [`🔴` Express Lane][express-lane]

> [`🗃️` File System](./)

----------------------------------------------------------------

<header id="messages"></header>

<footer id="footer">
  <input id="footer_input" onchange="perform(event)" />
</footer>

<textarea id="sce" class="hud hide" wrap="off">
</textarea>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
;
; doc = document
; doc . title
= doc . querySelector( "H1" )
. textContent
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="https://nyteowldave.github.io/std/api/gems/prolog-beta.js"></script>
<script src="http://dave-omega/demo/web/api/hud.js"></script>
<script src="http://dave-omega/demo/web/gems/interpreter-lite.js"></script>
<script src="http://dave-omega/demo/web/gems/houdini.js"></script>
<script src="http://dave-omega/demo/web/gems/replace-anchor-decals.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
footer_input.value = "hud()";
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
verified_buttons = [
  "Primary"
, "Tick-Tick"
, "Cloud Notepad"
, "Express Lane"
];
</script>

<script>
addEventListener( "load", (e)=> {
    try {
        replace_anchor_decals( verified_buttons );
    } catch ( e ) {
        console.error( e );
        alert( e );
    }
} );
</script>


