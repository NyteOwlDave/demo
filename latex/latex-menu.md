<head> <link rel="icon" href="./favicon.ico" /> </head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[cairo]:
<https://www.cairographics.org/>
"Cairo Graphics"

[dropbox]: <https://dropbox.com>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[mathjax]:
<http://dave-legacy/math/latex/mathjax-test.html>
"Legacy Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]:
<http://dave-tower/demo/latex/latex-menu.html>
"Tower Edition"

----------------------------------------------------------------

# [Latex Menu][me]

> ( `Dave's Demos` )

----------------------------------------------------------------

## Toolkit

> [MathJax Editor][mathjax]

----------------------------------------------------------------

## Cloud Store

> [D-Drive][dropbox]

----------------------------------------------------------------

## Reference

> [Cairo Graphics][cairo]

----------------------------------------------------------------

## Navigation

> [Area Menu](./area/area-menu.html)
> [Limits Menu](./limits/limits-menu.html)
> [Demo Menu](./../demo-menu.html)

> [Folder Tree](./tree.php)
> [File System](./)

### Workspaces

> [area](./area/)
> [limits](./limits/)

----------------------------------------------------------------

<style>
@import url("./../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; prolog = {}
; prolog . title = ( `Latex Menu` )
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
