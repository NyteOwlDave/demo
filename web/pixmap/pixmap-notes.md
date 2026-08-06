<head> <link rel="icon" href="favicon.ico" /> </head>

[cairo]:      <https://www.cairographics.org/>
[json-crack]: <https://jsoncrack.com/editor>

[mdn-imagedata]:
<https://developer.mozilla.org/en-US/docs/Web/API/ImageData>

[sulu]:       <http://dave-ryzen/nav/sulu.html>
[raindrop]:   <https://app.raindrop.io/my/45357558>

[me]: <http://dave-omega/demo/web/pixmap/pixmap-notes.html>

----------------------------------------------------------------

# [Pixel Map Notes][me]

----------------------------------------------------------------

<header id="header">
 <div id="messages"></div>
</header>

<footer id="footer">
  <input wide id="footer_input" onchange="perform(event)"/>
</footer>

----------------------------------------------------------------

# Components

- Core Operations
- Scalar Operations
- Vector Operations
- Geometry 2D Operations
- Geometry 3D Operations
- Geometry 4D Operations
- RGB Color Operations
- Screen Operations
- Pixel Map Operations
- Pixel Map Operation Extras

----------------------------------------------------------------

# Core Operations

<div center>
  <h3><code>CoreOps</code></h3>
  <textarea id="core-ops-editor"></textarea>
</div>

----------------------------------------------------------------

# Scalar Operations

<div center>
  <h3><code>ScalarOps</code></h3>
  <textarea id="scalar-ops-editor"></textarea>
</div>

----------------------------------------------------------------

# Vector Operations

<div center>
  <h3><code>VectorOps</code></h3>
  <textarea id="vector-ops-editor"></textarea>
</div>

----------------------------------------------------------------

# Geometry 2D Operations

<div center>
  <h3><code>Geom2dOps</code></h3>
  <textarea id="geom-2d-editor"></textarea>
</div>

----------------------------------------------------------------

# Geometry 3D Operations

<div center>
  <h3><code>Geom3dOps</code></h3>
  <textarea id="geom-3d-editor"></textarea>
</div>

----------------------------------------------------------------

# Geometry 4D Operations

<div center>
  <h3><code>Geom4dOps</code></h3>
  <textarea id="geom-4d-editor"></textarea>
</div>

----------------------------------------------------------------

# RGB Color Operations

<div center>
  <h3><code>RGBOps</code></h3>
  <textarea id="rgb-editor"></textarea>
</div>

----------------------------------------------------------------

# Screen Operations

<div center>
  <h3><code>Screen</code></h3>
  <textarea id="screen-editor"></textarea>
</div>

----------------------------------------------------------------

# Pixel Map Operations

<div center>
  <h3><code>PixMapOps</code></h3>
  <textarea id="pixmap-editor"></textarea>
</div>

----------------------------------------------------------------

# Pixel Map Operation Extras

<div center>
  <h3><code>PixMapExtras</code></h3>
  <textarea id="extras-editor"></textarea>
</div>

----------------------------------------------------------------

# [References][raindrop]

> [JSON Crack][json-crack]
> [Cairo Graphics][cairo]
> [ImageData ~ MDN][mdn-imagedata]

----------------------------------------------------------------

# [Navigation][sulu]

> [Pixel Map Menu](./pixmap-menu.html)

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc =  document;
</script>

<script src="./core-ops.js"></script>
<script src="./scalar.js"></script>
<script src="./vector.js"></script>
<script src="./rgba.js"></script>
<script src="./geom-2d.js"></script>
<script src="./geom-3d.js"></script>
<script src="./geom-4d.js"></script>
<script src="./pixmap.js"></script>

<script src="./app/pixmap-notes.js"></script>

<script>
function main( event ) {
	try {
        doc . title = ( `Pixel Map Notes` );
		// prepare_editors();
		// prepare_screen();
		// hide_screen()
        populate_editors();
	} catch ( e ) {
		crashed ( e )
	}
}
</script>

<script>
addEventListener( "load", main );
</script>

<script>
function crashed( e ) {
	alert ( e );
	throw ( e );
}
</script>



