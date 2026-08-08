
[xojo]:
<https://xojo.com>
"Xojo IDE"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[basic-wiki]:
<https://en.wikipedia.org/wiki/BASIC>
"BASIC Wiki"

[qb64-wiki]:
<https://qb64.com/wiki>
"QB64 Wiki"

[qb64pe-wiki]:
<https://qb64phoenix.com/qb64wiki/index.php/Main_Page>
"QB64 Phoenix Wiki"

[qb45-wiki]:
<https://en.wikipedia.org/wiki/QuickBASIC>
"QB45 Wiki"

[qbasic-wiki]:
<https://en.wikipedia.org/wiki/QBasic>
"QBasic Wiki"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[pc-help]:
<http://dave-legacy/app/pc-basic/docs/source/documentation.html>
"PC Basic Manual"

[qb64-notes]:
<http://dave-omega/demo/notes/qb64-notes.html>
"Omega Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]:
<http://dave-omega/demo/notes/basic-editions.html>
"Omega Edition"

----------------------------------------------------------------

# [BASIC Editions][me]

----------------------------------------------------------------

```hal

https://freebasic.net
https://marketplace.visualstudio.com/items?itemName=ModernVBNET.sVBInstaller
https://qb64.com
https://qb64phoenix.com
https://qbjs.org
https://segaretro.org/BASIC_Level_III_A
https://smallbasic-publicwebsite.azurewebsites.net/
https://tarjan.itch.io/thoreaubasic
https://www.brilorsoftware.com/fb/pages/home.html
https://www.parallax.com/education/programming-languages/pbasic
https://www.playbasic.com/
https://www.purebasic.com

```

----------------------------------------------------------------

# Edition List

<div center>
<section id="droplist_section">
  <select id="edition_droplist"></select>
</section>
</div>

----------------------------------------------------------------

# Edition Links

<div>
<section id="table_section"></section>
</div>

----------------------------------------------------------------

# Downloads

> [JSON Edition List](./basic-editions-latest.json)

----------------------------------------------------------------

# References

> [BASIC Wiki][basic-wiki]
> [QB64 Notes][qb64-notes]
> [QB64 Wiki][qb64-wiki]
> [QB64 Phoenix Wiki][qb64pe-wiki]
> [QB45 Wiki][qb45-wiki]
> [QBasic Wiki][qbasic-wiki]
> [PC Basic Manual][pc-help]
> [Xojo IDE][xojo]

----------------------------------------------------------------

# RAM Disk Menu

> [Tower Edition](http://dave-tower/ramdisk/basic/basic-editions.html)

----------------------------------------------------------------

<header id="header">
 <div id="messages"></div>
</header>

<footer id="footer">
  <input wide id="footer_input" onchange="perform(event)"/>
</footer>

----------------------------------------------------------------

<style>
@import url("./../style/every-page.css");
</style>

<script>
; doc = document
; doc . title = ( `BASIC Editions` )
</script>

<script>
; str =( s )=> String( s || "" ).trim()
; arr =( o )=> Array.from( o || [] )
; unq =( o )=> ( new Set( o || [] ) )
; dct =(   )=> ( new Map() )
</script>

<script>
; elx =( t )=> ( doc.createElement ( t ) )
; gid =( i )=> ( doc.getElementById( i ) )
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

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
edition = {};
</script>

<script>
edition.index = dct();
</script>

<script updated="2026-AUG-06">
edition.names = [
  "anywhere", "apple", "atari",
  "b256", "b3d", "baby", "bazz", "bbc",
  "c64", "classic",
  "free", "fusion", "future",
  "gw", "pbasic", "pc", "pure", "play",
  "qbasic", "qb45", "qb64", "qb64pe", "qbjs",
  "sega", "spectrum",
  "ti99", "trs80",
  "vb", "vbscript", "vbnet", "vbsmall", "vintage",
  "webqb", "zx"
];
</script>

<script>
edition.read_link = function( name ) {
    const index = edition.index;
    return str( index.get( name ) );
};
</script>

<script>
edition.read_entry = function( name ) {
    const address = edition.read_link( name );
    return { name , address }
};
</script>

<script>
edition.read_names = function() {
    const ops = edition;
    const index = ops.index;
    const names = ( new Set() );
    for ( let name of index.keys() ) {
        names.add( name );
    }
    return Array.from( names ).sort();
};
</script>

<script>
edition.read_entries = function( rex ) {
    const ops = edition;
    const index = ops.index;
    const entries = [];
    let names = ops.read_names();
    if ( rex = str( rex ) ) {
        rex = new RegExp( rex );
        names = names.filter( s => rex.test( s ) );
    }
    ( names )
    . forEach(
        ( name ) => {
            const address = str( index.get( name ) );
            const entry = { name , address };
            entries.push( entry );
        }
    );
    return ( entries );
};
</script>

<script>
edition.write_link = function( name, address ) {
    const index = edition.index;
    index.set( name, address );
    return { name , address };
};
</script>

<script>
edition.make_entry = function( name, address ) {
    return { name , address };
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function populate_droplist( items, owner ) {
    items.forEach( ( s ) => {
        edition.write_link( s, "" );
        const ce = elx( "OPTION" );
        owner.appendChild( ce );
        ce . textContent = (
            ce.value = ( s )
        );
    } );
	const n = ( items.length );
	messages.textContent = ( `Total Versions : ${n}` );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function populate_editions() {
    try {
        const owner = edition_droplist;
        const items = edition.names;
        populate_droplist( items, owner );
        populate_links();
    } catch ( e ) {
        console.error( e );
        alert ( e );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function populate_links() {
    const id = "link_table";
    const owner = gid( "table_section" );
    let table = gid( id );
    if (! table ) {
        table = elx( "TABLE" );
        table . id = ( id );
        owner . appendChild( table );
    }
    table.innerHTML = "";
    const he = table.createTHead();
    let re = he.insertRow();
    let ce = elx( "TH" );
    re.appendChild( ce );
    ce.textContent = "Name";
    ce = elx( "TH" );
    re.appendChild( ce );
    ce.textContent = "Address";
    const be = table.createTBody();
    const entries = edition.read_entries();
    ( entries )
    . forEach(
        ( entry ) => {
            re = be.insertRow();
            ce = re.insertCell();
            ce . textContent = entry.name;
            ce = re.insertCell();
            ce . textContent = str( entry.address ) || "?";
        }
    );
    return ( table );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
