<head> <link rel="icon" href="./favicon.ico" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[textures]:
<http://dave-omega/demo/web/art/texture/texture-menu.html>
"Omega Edition"

[lumina]:
<http://dave-omega/demo/web/api/lumina-gfx-notes.html>
"Lumina Graphics Notes"

[raindrop]:
<https://app.raindrop.io/my/0>
"Raindrop Bookmarks"

[jsinfo]:
<https://javascript.info/>
"JavaScript Info"

[basic-editions]:
<http://dave-omega/demo/basic-edition-menu.html>
"BASIC Editions ~ Omega"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega-zx]:
<http://dave-omega/demo/zx/lissajous.html>
"ZX ~ Omega Edition"

[me-omega]:
<http://dave-omega/demo/web/lissajous/lissajous.html>
"Omega Edition"

[me-tower]:
<http://dave-tower/demo/web/lissajous/lissajous.html>
"Tower Edition"

----------------------------------------------------------------

# [Lissajous Editor][me-omega]

<h3>
( ===> Test and Port Graphics Demos <=== )
</h3>

----------------------------------------------------------------

## [BASIC Source Code][basic-editions]

```basic

' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' Helper Commands
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' recover_viewer()
' persist_viewer()
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

```

----------------------------------------------------------------

# [JavaScript Source Code][jsinfo]

----------------------------------------------------------------

<div center>
  <textarea id="sce" wrap="off" class="fill"></textarea>
</div>

<script>
js_source = ( `

function setup() {
   Background();
   // ...
}

function render() {
   // ...
}

;
; ( 0 ) && hud.persist()
; ( 1 ) && setup()
; ( 0 ) && render()
;

"OK!";

` );
</script>

----------------------------------------------------------------

# [Surface][lumina]

----------------------------------------------------------------

<div center>
  <canvas id="surface"></canvas>
</div>

----------------------------------------------------------------

# [Textures][textures]

----------------------------------------------------------------

<section id="texture_section">
 <img class="texture" src="./../art/texture/triples.png" />
 <img class="texture" src="./../art/texture/lattice-001x.png" />
 <img class="texture" src="./../art/texture/shield-001x.png" />
 <img class="texture" src="./../art/texture/shield-002x.png" />
</section>

----------------------------------------------------------------

# [References][raindrop]

----------------------------------------------------------------

> [HUD API Notes](./../web/api/hud-api-notes.html)
> [Core API Notes](./../web/api/core-api-notes.html)
> [Rocket API Notes](./../web/api/rocket-api-notes.html)
> [DES Shortcut](./des/lissajous.desktop)

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<footer>
 <input id="footer_input" onchange="perfect(event)" />
 <div id="btn_run" action="run()" onclick="action(event)">▶️</div>
 <div id="btn_hud" action="hud()" onclick="action(event)">◩</div>
 <div id="btn_zms" action="zms()" onclick="action(event)">💠</div>
</footer>

<header>
  <div id="messages"></div>
</header>

----------------------------------------------------------------

<style>
html, body {
    color : lemonchiffon;
    background : midnightblue;
}
body {
    margin-top    : 64px;
    margin-bottom : 42vh;
}
hr {
    margin-bottom : 42px;
    opacity : 0.22;
}
</style>

<style>
.center ,
[center] { text-align : center; }
.hide ,
[hide] {
    display : none !important;
}
</style>

<style>
pre {
    padding : 1ch;
}
</style>

<style>
footer {
    box-sizing : border-box;
    position : fixed;
    margin   : 0;
    width    : 100%;
    left     : 0;
    bottom   : 0;
    overflow : clipped;
    text-align : left;
    padding  : 4px 1ch;
    background : lemonchiffon;
    color : midnightblue;
}
footer * {
    box-sizing : border-box;
    display : inline-block;
    font  : 11pt monospace;
}
footer input {
    width : calc( 100% - 160px );
    padding : 4px 1ch;
    margin-right : 10px;
}
footer div {
    width  : 4ch;
    height : 3ch;
    line-height : 3ch;
    text-align : center;
    color : lemonchiffon;
    background : rgba(0,0,200,0.64);
    border-radius : 2ch;
    cursor : pointer;
}
</style>

<style>
.flasher {
    background : gold;
    color : #040422;
}
</style>

<style>
.fill {
    display : inline-block;
    width   : calc( 100% - 10ch );
    min-width  : 300px;
    min-height : 300px;
    resize  : vertical;
    overflow : scroll;
    outline  : none;
    border   : none;
    border-top-left-radius : 1ch;
    font : 13pt monospace;
    tab-size : 4;
}
</style>

<style>
#surface {
    display : inline-block;
    width   : 600px;
    height  : 600px;
    min-width  : 200px;
    min-height : 200px;
    border : 1px dotted gold;
}
</style>

<style>
.texture {
    display : inline-block;
    margin  : 5px;
    width   : 100px;
    height  : auto;
}
</style>

<style>
h1, h2, h3,
h4, h5, h6 {
    text-align : center;
}
</style>

<style>
a, a:visited {
    background : #080842;
    color : lemonchiffon;
    text-decoration : none;
    padding : 4px 1.42ch;
    border-radius : 2ch;
    display : inline-block;
}
</style>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="iwm.js">
; iwm = Object.keys( window ).sort()
</script>

<script id="doc.js">
; doc = document
</script>

<script id="debug.js">
; cls =()=> console.clear()
; agn =()=> location.reload();
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./../gems/core-ops.js"></script>
<script src="./../gems/json-ops.js"></script>
<script src="./../gems/texture-ops.js"></script>

<script src="./../api/core-api.js"></script>
<script src="./../api/hud.js"></script>
<script src="./../api/lumina-gfx.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="main.js">
function main( event ) {
    try {
        doc . title = "Lissajous Editor";
        footer_input . value = "hud()";
        init_viewer();
        init_buttons();
        init_tex_all();
        prepare_rgba_colors();
        Surface.zoom = function() {
            surface.requestFullscreen();
            surface.focus();
        };
        edit_javascript();
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script id="load-event.js">
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="crashed.js">
function crashed( e ) {
    crashed.error = ( e );
    alert ( e );
    throw ( e );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="flash-gadget.js">
function flash_gadget( ge ) {
    ge.classList.add( "flasher" );
    setTimeout( (e)=>{
        ge.classList.remove( "flasher" );
    }, 700 );
}
</script>

<script id="edit-basic.js">
function edit_basic() {
    const vw = one( `.language-basic` );
    sce.value = vw.textContent;
    flash_gadget( sce );
}
</script>

<script id="edit-javascript.js">
function edit_javascript() {
    sce.value = js_source;
    flash_gadget( sce );
}
</script>

<script id="accept-javascript.js">
function accept_javascript() {
    js_source = sce.value;
    flash_gadget( sce );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="init-buttons.js">
function init_buttons() {
    btn_run.title = "▶️ Run HUD Script";
    btn_hud.title = "◩ Toggle HUD Editor";
    btn_zms.title = "💠 Zoom Surface";
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="zms.js">
function zms() {
    try {
        const srf = Surface();
        hud.zoom( srf );
    } catch ( e ) {
        zms.error = ( e );
        throw ( e );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="action.js">
function action( event ) {
    const ops = action;
    try {
        ops.error = "";
        ops.event = mine( event );
        const sender = ( event.target );
        const k  = sender.textContent.trim();
        const js = sender.getAttribute( "action" );
        if ( js ) {
            const s = window.eval( js );
            console.log( k, js, s );
        } else {
            throw new Error( `No Action is Assigned : "${k}"` );
        }
    } catch ( e ) {
        ops.error = ( e.message );
        crashed ( e );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="perfect.js">
function perfect( event ) {
    perform( event );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="init-tex.js">
function init_tex( tex ) {
    tex.title = tex.alt = Texture.filename( tex.src );
    tex.classList.add( "texture" );
    const st = tex.style;
    st.cursor = "pointer";
    tex.onclick = function( e ) {
        mine( e );
        if ( e.altKey ) {
            e.target.remove();
            return;
        } else {
            const tex = ( e.target );
            Texture.render( tex );
            return;
        }
    };
}
</script>

<script id="init-all.js">
function init_tex_all() {
    const grp = texture_section;
    const m = arr( grp.querySelectorAll( "IMG" ) );
    m.forEach( init_tex );
}
</script>

<script id="add-tex.js">
function add_tex( url ) {
    const tex = elx( "img" );
    tex.src = ( url );
    init_tex( tex );
    const grp = texture_section;
    return ( grp.appendChild( tex ) );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="init-viewer.js">
function init_viewer() {
   vip = one( "PRE" );
   vip.id = "vip";
   vip.storekey = "lissajous-viewer.js";
   vip.setAttribute( "contenteditable", "true" );
   vip.clear =()=> ( vip.innerText="" );
   console.log( "Assigned ID to Viewer ( 'vip' )" );
   return ( vip );
}
</script>

<script id="persist-viewer.js">
function persist_viewer() {
   const stg = localStorage;
   const vip = init_viewer();
   const k = vip.storekey;
   const v = vip.innerText;
   stg.setItem( k, v );
   console.log( `Wrote "${k}" to Store` );
}
</script>

<script id="recover-viewer.js">
function recover_viewer() {
   const stg = localStorage;
   const vip = init_viewer();
   const k = vip.storekey;
   const v = stg.getItem( k );
   if ( null === v ) {
      console.warn( "Missing Store Key:", k );
      return;
   }
   vip.innerText = ( v );
   console.log( `Read "${k}" from Store` );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="devops-hints.js">
console.info( `DES-II Has Great Event Logging!` );
console.info( `SEE: NCS Tools for Jarvis`       );
console.info( `SEE: Palette Analyzer`           );
console.info( `SEE: Luminosity Gfx Tool`        );
console.info( `SEE: Luminous Gfx API`           );
</script>

<script id="des-ii-url.js">
des_ii_url = (
  `http://dave-omega/app/jarvis/toolkit/ncs/desiree/des-ii.html` 
);
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

