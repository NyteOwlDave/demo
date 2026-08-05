<head> <link rel="icon" href="favicon.ico" /> </head>

[cairo]:    <https://www.cairographics.org/>
[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>

[me]: <http://dave-omega/demo/web/pixmap/pixmap-notes.html>

----------------------------------------------------------------

# [Pixel Map Notes][me]

----------------------------------------------------------------

# Components

- Core Ops
- Scalar Ops
- Vector Ops
- Geometry 2D
- Geometry 3D
- Geometry 4D
- RGB Color
- Pixel Map

----------------------------------------------------------------

# Core Ops

<div center>
  <textarea id="core-ops-editor"></textarea>
</div>

----------------------------------------------------------------

# Scalar Ops

<div center>
  <textarea id="scalar-ops-editor"></textarea>
</div>

----------------------------------------------------------------

# Vector Ops

<div center>
  <textarea id="vector-ops-editor"></textarea>
</div>

----------------------------------------------------------------

# Geometry 2D

<div center>
  <textarea id="geom-2d-editor"></textarea>
</div>

----------------------------------------------------------------

# Geometry 3D

<div center>
  <textarea id="geom-3d-editor"></textarea>
</div>

----------------------------------------------------------------

# Geometry 4D

<div center>
  <textarea id="geom-4d-editor"></textarea>
</div>

----------------------------------------------------------------

# RGB Color

<div center>
  <textarea id="rgb-editor"></textarea>
</div>

----------------------------------------------------------------

# Pixel Map

<div center>
  <textarea id="pixmap-editor"></textarea>
</div>

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

<script>
; str =( o )=> String( s || "" ).trim()
; arr =( o )=> Array.from( o || [] )
; unq =( o )=> ( new Set ( o || [] ) )
; dct =(   )=> ( new Map() )
</script>

<script>
; ole =( q, e )=>    ( e.querySelector   ( q ) )
; ale =( q, e )=> arr( e.querySelectorAll( q ) )
; one =( q )=> ole( q, doc )
; all =( q )=> ale( q, doc )
</script>

<script>
; elx =( t )=> doc.createElement ( t )
; gid =( i )=> doc.getElementById( t )
</script>

<script src="./scalar.js"></script>
<script src="./vector.js"></script>
<script src="./rgba.js"></script>
<script src="./geom-2d.js"></script>
<script src="./pixmap.js"></script>

<script>
function main( event ) {
	try {
		// test01();
        doc . title = ( `Pixel Map Notes` );
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



