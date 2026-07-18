<style>
@import url("http://dave-legacy/jefr/style/every-page.css");
</style>

<script>
;
; iwm = Object.keys( window ).sort()
;
</script>

<script>
;
; prolog = {}
; prolog . title = ( `Explore` )
;
</script>

<script>
;
; cls =()=> console.clear()
; agn =()=> location.reload()
;
</script>

<script>
;
; params = new URISearchParams( location.search )
;
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]: <http://dave-tower/demo/web/web-menu.html>


----------------------------------------------------------------

# [Web Menu][me]

> ( `Dave's Demos` ~ Tower Edition )

----------------------------------------------------------------

## Demo Apps

- [`Kurt's Swimmer`](./claude/simple-swimmer.html)
- [`Turtle Demo #001`](./turtle/turtle-001.html)
- [`Turtle Math Graph`](./turtle/turtle-graph.html)

----------------------------------------------------------------

## Workspaces

- [`claude`](./claude/)
- [`turtle`](./turtle/)

----------------------------------------------------------------

## References

- [D-Drive](https://dropbox.com)
- [Cairo Graphics](https://www.cairographics.org/)
    - [Chris Thomasson](https://www.facebook.com/chris.thomasson.31/)
- [Mathematical Tiling and Tessellation](https://www.facebook.com/groups/391950357895182)

----------------------------------------------------------------

## Navigation

> [Demo Checklist](./../demo-checklist.html)

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

<script>
;
; doc = document
; doc . title = ( prolog . title )
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        // alert ( typeof params )
    } catch ( e ) {
        alert ( e )
        throw ( e )
    }
}
</script>

<script>
addEventListener( "load", main );
</script>

