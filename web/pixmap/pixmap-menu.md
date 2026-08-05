<head> <link rel="icon" href="favicon.ico" /> </head>

[cairo]:    <https://www.cairographics.org/>
[sulu]:     <http://dave-ryzen/nav/sulu.html>
[raindrop]: <https://app.raindrop.io/my/45357558>

[me]: <http://dave-omega/demo/web/pixmap/pixmap-menu.html>

----------------------------------------------------------------

# [Pixel Map Menu][me]

----------------------------------------------------------------

# Pages

> [Mandelbulb](./mandelbulb.html)
> [Poincare Disc](./poincare-disc.html)
> [Pixel Map](./pixmap.html)

----------------------------------------------------------------

# [References][raindrop]

> [Cairo Graphics][cairo]
> [Drop Box](https://dropbox.com)

----------------------------------------------------------------

# [Navigation][sulu]

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

# API Modules

## Generic

- [`scalar.js`](./scalr.js)
- [`vector.js`](./vector.js)
- [`rgba.js`](./rgba.js)
- [`geom-2d.js`](./geom-2d.js)
- [`geom-3d.js`](./geom-3d.js)
- [`geom-4d.js`](./geom-4d.js)
- [`pixmap.js`](./pixmap.js)

## Specific

- [`poincare-disc.js`](./poincare-disc.js)
- [`mandelbulb.js`](./mandelbulb.js)

----------------------------------------------------------------

<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; prolog = {}
; prolog . title = ( `Pixel Map Menu` )
</script>

<script>
; cls =()=> console.clear()
; agn =()=> location.reload()
</script>

<script>
; doc = document
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
		doc . title = ( prolog . title );
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
function params() {
	return (
		new URISearchParams( location.search )
	);
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

