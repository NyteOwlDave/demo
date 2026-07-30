<head>
  <link rel="icon" href="favicon.ico" />
</head>

<style>
@import url("./style/every-page.css");
</style>

<style>
li {
    font-size   : 18pt !important;
    font-family : monospace;
    margin-top  : 5px;
    padding     : 2px 4px;
    box-sizing  : border-box;
}
li:focus {
    color : #040422;
    background : #f1f1f1;
}
</style>

----------------------------------------------------------------

# Repo Cloning

----------------------------------------------------------------

- http://dave-tower/demo
- https://github.com/NyteOwlDave/demo
- gh repo clone NyteOwlDave/demo

----------------------------------------------------------------

<script>
; doc = document
; doc . title = ( `Demo Repo Cloning` )
</script>

<script>
; arr =( o )=> Array.from( o )
; all =( q )=> arr( doc.querySelectorAll( q ) )
</script>

<script>
function canedit( ge, en=1 ) {
    if ( en ) {
        ge.setAttribute( CE, "true" );
    } else {
        ge.removeAttribute( CE );
    }
}
;
; CE = "contenteditable";
;
</script>

<script>
function init_list() {
    all( "LI" ) . forEach( ce => canedit( ce ) );
}
</script>

<script>
addEventListener( "load", init_list );
</script>



