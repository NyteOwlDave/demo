
<style>
@import url("./../../style/every-page.css");
@import url("./../../style/cool-icons.css");
</style>

----------------------------------------------------------------

# Cool Icons Gadget

----------------------------------------------------------------

## Places

<div class="cool-icons">

  <div class="cool-icon" url="./dot/basic-group.html" onclick="ignite(event)">
    <img src="./icons/basic.png">
    <label> BASIC Group </label>
  </div>

  <div class="cool-icon" url="./dot/jarvis.html" onclick="ignite(event)">
    <img src="./icons/jarvis.png">
    <label> Jarvis </label>
  </div>

  <div class="cool-icon" url="./dot/ffmpeg.html" onclick="ignite(event)">
    <img src="./icons/ffmpeg.png">
    <label> FFMPEG </label>
  </div>

  <div class="cool-icon" url="./dot/mathjs.html" onclick="ignite(event)">
    <img src="./icons/mathjs.png">
    <label> Math JS </label>
  </div>

</div>

## Projects

<div class="cool-icons">

  <div class="cool-icon" url="./dot/json-editor.html" onclick="ignite(event)">
    <img src="./icons/json-editor.png" class="todo">
    <label> JSON Editor </label>
  </div>

  <div class="cool-icon" url="./dot/json-editor.html" onclick="ignite(event)">
    <img src="./icons/dorothy.png" class="todo">
    <label> Dorothy Rockets </label>
  </div>

  <div class="cool-icon" url="./dot/json-editor.html" onclick="ignite(event)">
    <img src="./icons/serpentine.png" class="todo">
    <label> Serpentine Port </label>
  </div>

</div>

## Tools

<div class="cool-icons">

  <div class="cool-icon" url="./dot/manuscript-editor.html" onclick="ignite(event)">
    <img src="./icons/manuscript-editor.png">
    <label> Manuscript Editor </label>
  </div>

  <div class="cool-icon" url="./dot/mathjax.html" onclick="ignite(event)">
    <img src="./icons/mathjax.png">
    <label> Math Jax Editor </label>
  </div>

  <div class="cool-icon" url="./dot/jsfiddle.html" onclick="ignite(event)">
    <img src="./icons/jsfiddle.png">
    <label> JS Fiddle </label>
  </div>

  <div class="cool-icon" url="./dot/codepen.html" onclick="ignite(event)">
    <img src="./icons/codepen.png">
    <label> Code Pen </label>
  </div>

  <div class="cool-icon" url="./dot/code-lab.html" onclick="ignite(event)">
    <img src="./icons/code-lab.png">
    <label> Code Lab </label>
  </div>

  <div class="cool-icon" url="./dot/code-sandbox.html" onclick="ignite(event)">
    <img src="./icons/code-sandbox.png">
    <label> Code Sandbox </label>
  </div>

  <div class="cool-icon" url="./dot/p5.html" onclick="ignite(event)">
    <img src="./icons/p5js.png">
    <label> P5 Sketches </label>
  </div>

  <div class="cool-icon" url="./dot/w3-spaces.html" onclick="ignite(event)">
    <img src="./icons/w3-spaces.png">
    <label> W3 Spaces </label>
  </div>

  <div class="cool-icon" url="./dot/trinkets.html" onclick="ignite(event)">
    <img src="./icons/trinkets.png">
    <label> Trinkets </label>
  </div>

</div>

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
; prolog . title = ( `Cool Icons Gadget` )
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
<script src="./../api/core-api.js"></script>

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

<script>
function ignite( event ) {
    try {
        let sender = event.target;
        if (! sender.classList.contains( "cool-icon" ) ) {
            sender = sender.parentElement;
        }
        const url = sender.getAttribute( "url" );
        visit( url );
    } catch ( e ) {
        crashed( e );
    }
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<style>
@import url("./../../style/sce-hud.css");
</style>
<textarea id="sce" class="hide"></textarea>
<script src="./../api/hud.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

