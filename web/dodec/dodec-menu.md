<head> <link rel="icon" href="favicon.ico" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sulu]: <http://dave-ryzen/nav/sulu.html>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]:
<http://dave-omega/demo/web/dodec/dodec-menu.html>
"Omega Edition"

----------------------------------------------------------------

# [Dodecahedron Menu][me]

> ( `Web Demos` )

----------------------------------------------------------------

# Demo Page

> [Dodecahedron](./dodec.html)

----------------------------------------------------------------

# [Navigation][sulu]

> [Web Menu](./../web-menu.html)
> [Demo Menu](./../../demo-menu.html)

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
; prolog = {}
; prolog . title = ( `Dodecahedron Menu` )
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


