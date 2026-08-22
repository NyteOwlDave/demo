
<style>
@import url("./../../style/every-page.css");
</style>

[me-omega]:
<http://dave-omega/demo/web/api/core-api-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [Core API Notes][me-omega]

----------------------------------------------------------------

> ( `Web Demos` )

----------------------------------------------------------------

# Description

- ( `pending` )

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
; prolog . title = ( `Core API Notes` )
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

