<style>
@import url("http://dave-legacy/jefr/style/every-page.css");
</style>

----------------------------------------------------------------

# [Explore](https://dropbox.com)

----------------------------------------------------------------

# Pages

> [Mandelbulb](./mandelbulb.html)
> [Poincare Disc](./poincare-disc.html)
> [Pixel Map](./pixmap.html)

----------------------------------------------------------------

# References

> [Cairo Graphics](https://www.cairographics.org/)

----------------------------------------------------------------

# Navigation

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

# API Modules

## Generic

- scalar.js
- vector.js
- rgba.js
- geom-2d.js
- geom-3d.js
- geom-4d.js
- pixmap.js

## Specific

- poincare-disc.js
- mandelbulb.js

----------------------------------------------------------------

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; prolog = {}
; prolog . title = ( `Explore` )
</script>

<script>
; cls =()=> console.clear()
; agn =()=> location.reload()
</script>

<script>
; doc = document
</script>

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

<script>
function params() {
		return (
			new URISearchParams( location.search )
		);
}
</script>


