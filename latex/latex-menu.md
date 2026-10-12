<head> <link rel="icon" href="./favicon.ico" /> </head>

<style>
@import url("https://nyteowldave.neocities.com/style.css");
@import url("https://nyteowldave.github.io/std/style/ghost.css");
</style>

<style>
* { box-sizing : border-box; }
</style>

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

----------------------------------------------------------------

### Menu

> [Area Menu](./area/area-menu.html)
> [Limits Menu](./limits/limits-menu.html)
> [Demo Menu](./../demo-menu.html)

----------------------------------------------------------------

### Page

> [Pavillion](./pavillion/pavillion.html)
> [Rose](./rose/rose.html)
> [Vec-Line](./vec-line.html)

----------------------------------------------------------------

### Workspace

> [area](./area/)
> [limits](./limits/)
> [pavillion](./pavillion/)
> [rose](./rose/)
> [vec-line](./vec-line/)

----------------------------------------------------------------

### Explore

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

# Assets

----------------------------------------------------------------

## Demo

> [Demo Styles](./../style/)

----------------------------------------------------------------

## Web Demo

> [Demo API Modules](./../web/api/)
> [Demo Gems](./../web/gems/)
> [Demo Peaches](./../web/peaches/)

----------------------------------------------------------------

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
