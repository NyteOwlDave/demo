<style>
@import url("https://nyteowldave.neocities.org/style.css");
</style>

<style>
@import url("http://dave-omega/demo/style/sce-hud.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/gems/houdini-notes.html>
"Omega Edition"

----------------------------------------------------------------

# Houdini Gem

> ( `Web Demo Gems` )

----------------------------------------------------------------

> [Primary][me-omega]
> [File System](./)

----------------------------------------------------------------

## Houdini Usage

- Call `houdini( )`
- Pass in some __Gadget ID__ or __Reference__
- The __Houdini Methods__ will be attached to this __Gadget__

----------------------------------------------------------------

# Houdini Hints

[houdini-host]:  <http://dave-omega/demo/web/web-menu.html> 
"Web Demo Menu ~ Omega"

[houdini-code]:  <http://dave-omega/demo/web/gems/houdini.js>
"Houdini Source Code ~ Omega"

[houdini-notes]: <http://dave-omega/demo/web/gems/houdini-notes.html>
"Houdini Notes ~ Omega"

> [Source Code][houdini-code]
> [Provider][houdini-host]
> [Notes][houdini-notes]

----------------------------------------------------------------

| Member      | Purpose  |
|-------------|----------------------------|
| visible     | Verify Object is Visible   |
| show        | Show Object                |
| hide        | Hide Object                |
| toggle      | Toggle Object's Visibility |
| zoom        | Request Full Screen Mode   |
| hints       | Display Object's Members   |

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

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
footer_input.value = "hud()";
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
