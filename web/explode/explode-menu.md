<head> <link rel="icon" href="./favicon.ico" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]:
<http://dave-tower/demo/web/explode/explode-notes.html>
"Tower Edition"

----------------------------------------------------------------

# [Explode Menu][me]

----------------------------------------------------------------

## Demo Pages

> [Explosion Deux](./explosion-deax.html)
> [Explosion Original](./explosion.html)

----------------------------------------------------------------

## Support Modules

### Deax

- [rgb.js](./rgb.js)
- [draw-pixel.js](./draw-pixel.js)
- [fire.js](./fire.js)
- [sprites.js](./sprites.js)
- [explosion-app.js](./explosion-app.js)

### Original

- [fire-palette.js](./fire-palette.js)
- [explosion.js](./explosion.js)

### Common

- [explosion.css](./explosion.css)

----------------------------------------------------------------

## References

> [Cairo Graphics](https://www.cairographics.org/)

----------------------------------------------------------------

## Navigation

> [Web Menu](./../web-menu.html)

> [Explode Notes](./explode-notes.html)

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; prolog = {}
; prolog . title = ( `Explode Menu` )
</script>

<script>
; cls =()=> console.clear()
; agn =()=> location.reload()
</script>

<script>
; doc = document
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

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

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function params() {
	return (
		new URISearchParams( location.search )
	);
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

