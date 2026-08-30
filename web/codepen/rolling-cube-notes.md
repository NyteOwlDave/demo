<head> <link rel="icon" href="./rolling-cube.png" /> </head>

<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[cube-demo]:
<http://dave-tower/demo/web/codepen/rolling-cube.html>
"Tower Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/web/codepen/rolling-cube-notes.html>
"Tower Edition"

----------------------------------------------------------------

<div center>
  <img class="logo2" src="./rolling-cube.png" />
</div>

# Rolling Cube Notes

----------------------------------------------------------------

> [Tower][me-tower]
> [Rolling Cube][cube-demo]
> [My Pens](https://codepen.io/your-work)

----------------------------------------------------------------

<!-- [[ NEEDS: header-footer.js ]] -->
<header id="header"></header>
<footer id="footer"></footer>

----------------------------------------------------------------

<!-- [[ RESERVER FOR HUD EDITOR ]] -->


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; doc = document
; doc . title = ( `Rolling Cube Notes` )
</script>

<script>
console.group( `[ Jester Suggestions ]` );
console.info( `* Run codepen() to open the source Pen` );
console.info( `* Run codepen.dave() to open Dave's Pens` );
console.groupEnd();
</script>

<script>
function codepen( relpath, options ) {
	relpath = ( relpath || codepen.cubedemo );
	const p = ( codepen.home );
	const u = [ p, relpath ].join( "/" );
	window.open( u, u, options );
}
;
; codepen.home = ( `https://codepen.io` )
; codepen.cubedemo = ( `editor/pjkarlik/pen/01a02be4-5b1d-7381-93ce-c06df0bb7a2e` )
;
codepen.dave = function() {
	 codepen( `your-work` );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
