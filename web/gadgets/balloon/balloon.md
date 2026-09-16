
<!-- [[ balloon.md ]] -->

----------------------------------------------------------------

# Balloon `🗨️` Gadget Demo

----------------------------------------------------------------

### What would you like the balloon to say?

<div center>
  <textarea id="sip" class="siox"></textarea>
</div>

----------------------------------------------------------------

<div center>
  <button action="fly()" onclick="action(event)">Let it Rip!</button>
</div>

----------------------------------------------------------------

# Downloads

> Like this gadget? Want one of your very own? Download the
> files here:

<div center>
 <a download="balloon.zip" href="./pubs/balloon.zip">balloon.zip</a>
 <a download="balloon.md"  href="./pubs/balloon.md" >balloon.md</a>
 <a download="balloon.js"  href="./pubs/balloon.js" >balloon.js</a>
 <a download="balloon.css" href="./pubs/balloon.css">balloon.css</a>
</div>

----------------------------------------------------------------

# Navigation

> [Web Menu](./../../web-menu.html)
> [Demo Menu](./../../../demo-menu.html)

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

<style>
@import url("http://dave-omega/app/jarvis/style/notes.css");
@import url("./balloon.css");
</style>

----------------------------------------------------------------

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc = document
; doc . title = ( `Balloon Gadget Demo` )
</script>

<script>
; str =( s )=> String( s || "" ).trim()
; elx =( t )=> doc.createElement( t )
</script>

<script>
const QUIET = ( `
Nothing to say, eh?
` );
</script>

<script>
function fly() {
    const s = str( sip.value );
    balloon( s || QUIET );
}
</script>

<script>
function action( event ) {
    try {
        const sender = event.target;
        const js = sender.getAttribute( "action" );
        window.eval( js );
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
</script>

<script src="./balloon.js"></script>

