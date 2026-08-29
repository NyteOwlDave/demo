
<style>
@import url("./../style/every-page.css");
</style>

----------------------------------------------------------------

# [Explore](https://dropbox.com)

----------------------------------------------------------------

> [Cairo Graphics](https://www.cairographics.org/)

> [Folder Tree](./tree.php)
> [File System](./)

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


