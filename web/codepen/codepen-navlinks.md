<head> <link rel="icon" href="./nav.png" /> </head>

<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-tower]:
<http://dave-tower/demo/web/codepen/codepen-navlinks.html>
"Tower Edition"

----------------------------------------------------------------

<div center>
  <img class="logo2" src="./nav.png" />
</div>

# CodePen NavLinks

----------------------------------------------------------------

> [Sulu](http://dave-ryzen/nav/)
> [Codepen](https://codepen.io/)

> [Tower][me-tower]
> [File System](./)

----------------------------------------------------------------

<pre contenteditable id="navlinks">

+ Infinite Ball Roll
@ https://codepen.io/editor/amit_sheen/pen/01a02b4d-a460-72ae-ad11-69ce77d5eb2e

+ Infinite Gallery
@ https://codepen.io/editor/daniel-mu-oz/pen/019ff149-8cea-7d08-bc76-29a54cd08f79

+ Storage Form
@ https://darn.es/storage-form-web-component/#storage-form

+ Mail Form
@ https://codepen.io/editor/team/codepen/pen/019fc95c-0c74-7a17-876e-30c4e0731af6

</pre>

----------------------------------------------------------------

<!-- [[ NEEDS: header-footer.js ]] -->
<header id="header"></header>
<footer id="footer"></footer>

----------------------------------------------------------------

<!-- [[ RESERVER FOR HUD EDITOR ]] -->


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
; doc = document
; doc . title = ( `Code Pen Nav Links` )
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
