<head> <link href="favicon.ico" rel="icon" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/art/texture/texture-menu.html>
"Omega Edition"

----------------------------------------------------------------

# [Texture Menu][me-omega]

----------------------------------------------------------------

<div center>
  <img src="favicon.ico" class="texture" />
</div>

----------------------------------------------------------------

# Textures

----------------------------------------------------------------

<section id="texture_section">
 <img class="texture" src="./triples.png" />
 <img class="texture" src="./lattice-001x.png" />
 <img class="texture" src="./shield-001x.png" />
 <img class="texture" src="./shield-002x.png" />
</section>

----------------------------------------------------------------

<style>
@import url("./../../../style/every-page.css");
</style>

<style>
.texture {
    display : inline-block;
    margin  : 5px;
    width   : 100px;
    height  : auto;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc = document
</script>

<script>
; cls =()=> console.clear()
; agn =()=> location.reload();
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./../../gems/core-ops.js"></script>
<script src="./../../gems/json-ops.js"></script>
<script src="./../../gems/texture-ops.js"></script>

<script src="./../../api/core-api.js"></script>

<!--
<script src="./../../api/hud.js"></script>
<script src="./../../api/lumina-gfx.js"></script>
-->

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        doc . title = "Texture Menu";
        init_tex_all();
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script>
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function crashed( e ) {
    crashed.error = ( e );
    alert ( e );
    throw ( e );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function init_tex( tex ) {
    tex.title = tex.alt = Texture.filename( tex.src );
    const st = tex.style;
    st.cursor = "pointer";
    tex.onclick = function(e) {
        visit( tex.src );
    };
}
</script>

<script>
function init_tex_all() {
    const m = get_tex_all();
    m.forEach( init_tex );
}
</script>

<script>
function get_tex( index ) {
    const ops = Texture;
    return ops.pick( index );
}
</script>

<script>
function get_tex_all( index ) {
    const ops = Texture;
    return ops.all();
}
</script>

<script>
function visit( url ) {
    try {
        _visit( url );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script>
function _visit( url ) {
    visit.places.add( url );
    if ( null === localStorage ) {
        const a = elx( "A" );
        a . href = ( url );
        a . click();
    } else {
        const w = window;
        const o = visit.options;
        w.open( url, url, o );
    }
}
;
; visit.places = ( new Set() )
; visit.options = ( `left=10,top=10,width=800,height=680` )
;
</script>

