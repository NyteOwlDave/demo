
----------------------------------------------------------------

# BASIC Editions

----------------------------------------------------------------

```hal

https://freebasic.net/

```

----------------------------------------------------------------

# Edition List

<div center>
<section id="droplist_section">
  <select id="edition_droplist"></select>
</section>
</div>

----------------------------------------------------------------

# Downloads

> [JSON Edition List](./basic-editions-latest.json)

----------------------------------------------------------------

# RAM Disk Menu

> [Tower Edition](http://dave-tower/ramdisk/basic/basic-editions.html)

----------------------------------------------------------------

<style>
@import url("./../style/every-page.css");
</style>

<script>
; doc = document
; doc . title = ( `BASIC Editions` )
</script>

<script>
; elx =( t )=> ( doc.createElement( t ) )
</script>

<script>
function main( event ) {
    try {
        populate_editions();
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
</script>

<script>
addEventListener( "load", main );
</script>

<script updated="2026-AUG-06">
editions = [
  "anywhere",
  "apple",
  "atari",
  "b256",
  "b3d",
  "baby",
  "c64",
  "classic",
  "free",
  "fusion",
  "gw",
  "pc",
  "qbasic",
  "qb45",
  "qb64",
  "qb64pe",
  "qbjs",
  "spectrum",
  "ti99",
  "trs80",
  "vb",
  "vbscript",
  "vbnet",
  "vbsmall",
  "vintage",
  "webqb",
  "zx"
];
</script>

<script>
function populate_droplist( items, owner ) {
    items.forEach( ( s ) => {
        const ce = elx( "OPTION" );
        owner.appendChild( ce );
        ce . textContent = (
            ce.value = ( s )
        );
    } );
}
</script>

<script>
function populate_editions() {
    try {
        const owner = edition_droplist;
        const items = editions;
        populate_droplist( items, owner );
    } catch ( e ) {
        console.error( e );
        alert ( e );
    }
}
</script>

