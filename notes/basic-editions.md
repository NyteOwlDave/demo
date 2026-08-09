
<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[xojo]:
<https://xojo.com>
"Xojo IDE"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[basix]:
<https://www.facebook.com/groups/basicxgame/>
"BASIX Facebook Group"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[editions-wiki]:
<https://en.wikipedia.org/wiki/List_of_BASIC_dialects>
"BASIC Edition Wiki"

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

[ramdisk-tower]:
<http://dave-tower/ramdisk/basic/basic-editions.html>
"Tower Edition"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]:
<http://dave-omega/demo/notes/basic-editions.html>
"Omega Edition"

----------------------------------------------------------------

# [BASIC Editions][me]

----------------------------------------------------------------

## HAL Links

```hal

https://freebasic.net
https://github.com/fritzone/berrybasic
https://github.com/logiclrd/QBX
https://marketplace.visualstudio.com/items?itemName=ModernVBNET.sVBInstaller
https://qb64.com
https://qb64phoenix.com
https://qbjs.org
https://robhagemans.github.io/pcbasic/doc/2.0/
https://segaretro.org/BASIC_Level_III_A
https://smallbasic-publicwebsite.azurewebsites.net/
https://tarjan.itch.io/thoreaubasic
https://visionbasic.net/
https://www.bbcbasic.co.uk/bbcsdl/index.html
https://www.brilorsoftware.com/fb/pages/home.html
https://www.parallax.com/education/programming-languages/pbasic
https://www.playbasic.com/
https://www.purebasic.com

```

----------------------------------------------------------------

## NAV Links

```nav

+ B4X
@ https://www.b4x.com/
| Folder := b4x

+ Berry BASIC
@ https://github.com/fritzone/berrybasic
| Folder := berry

+ BBC BASIC
@ https://www.bbcbasic.co.uk/bbcsdl/index.html
| Folder := bbc

+ Free BASIC
@ https://freebasic.net
| Folder := free

+ Future BASIC
@ https://www.brilorsoftware.com/fb/pages/home.html
| Folder := future

+ PBASIC
@ https://www.parallax.com/education/programming-languages/pbasic
| Folder := pbasic

+ PC Basic
@ https://robhagemans.github.io/pcbasic/doc/2.0/
| Folder := pc

+ Play Basic
@ https://www.playbasic.com/
| Folder := play

+ Pure Basic
@ https://www.purebasic.com
| Folder := pure

+ QB64
@ https://qb64.com
| Folder := qb64

+ QB64 Phoenix
@ https://qb64phoenix.com
| Folder := qb64pe

+ QBJS
@ https://qbjs.org
| Folder := qbjs

+ QBX
@ https://github.com/logiclrd/QBX
| Folder := qbx

+ Sega Level III
@ https://segaretro.org/BASIC_Level_III_A
| Folder := sega

+ Small Basic
@ https://marketplace.visualstudio.com/items?itemName=ModernVBNET.sVBInstaller
| Folder := vbsmall

+ Small Basic 2
@ https://smallbasic-publicwebsite.azurewebsites.net/
| Folder := vbsmall2

+ Thoreau BASIC
@ https://tarjan.itch.io/thoreaubasic
| Folder := thoreau

+ Vision BASIC
@ https://visionbasic.net/
| Folder := vision

```

----------------------------------------------------------------

# [Edition List][editions-wiki]

<div center>
<section id="droplist_section">
  <select id="edition_droplist"></select>
</section>
</div>

----------------------------------------------------------------

<div center>
 <button action="visit.edition()" onclick="action(event)">Visit</button>
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
> [Code Beautify](https://beautifier.io/)

----------------------------------------------------------------

# Groups

> ["BASIX Facebook Group][basix]

----------------------------------------------------------------

# RAM Disk Menu

> [Tower Edition][ramdisk-tower]

----------------------------------------------------------------

# [Navigation][sulu]

> [Demo Menu](./../demo-menu.html)

> [Folder Tree](./tree.php)
> [File System](./)

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


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="main.js">
function main( event ) {
    try {
        populate_editions();
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
</script>

<script id="page-load.js">
addEventListener( "load", main );
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<!-- [[ Gems ]] -->
<script src="./../web/gems/core-ops.js"></script>
<script src="./../web/gems/stateful.js"></script>
<script src="./../web/gems/doc-read-write.js"></script>
<script src="./../web/gems/sulu.js"></script>
<script src="./../web/gems/pcl-ultra.js"></script>
<script src="./../web/gems/riccola-lite.js"></script>
<script src="./../web/gems/interpreter-lite.js"></script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script api="edition.js" id="edition.js">
edition = {};
</script>

<script api="edition.js" id="edition-index.js">
edition.index = dct();
</script>

<script api="edition.js" id="edition-titles.js">
edition.titles = dct();
</script>

<script api="edition.js" id="edition-names.js" updated="2026-AUG-06" original="editions.json">
edition.names = [
  "amiga", "anywhere", "apple", "atari",
  "b256", "b3d", "b4x", "baby", "bazz", "berry", "bbc",
  "c64", "classic", "dash",
  "free", "fusion", "future",
  "gw", "pbasic", "pc", "pure", "play",
  "qbasic", "qb45", "qb64", "qb64pe", "qbjs",
  "qbx", "sedai", "sega", "spectrum",
  "thoreau",  "ti99", "trs80",
  "vb", "vbscript", "vbnet", "vbsmall",
  "vintage", "vision",
  "webqb", "zx"
];
</script>

<script api="edition.js" id="edition-write-link.js">
edition.write_link = function( name, address ) {
    const index = edition.index;
    index.set( name, address );
    return { name , address };
};
</script>

<script api="edition.js" id="edition-read-link.js">
edition.read_link = function( name ) {
    const index = edition.index;
    return str( index.get( name ) );
};
</script>

<script api="edition.js" id="edition-read-title.js">
edition.read_title = function( name ) {
    const index = edition.titles;
    return str( index.get( name ) );
};
</script>

<script api="edition.js" id="edition-read-names.js">
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

<script api="edition.js" id="edition-read-entry.js">
edition.read_entry = function( name ) {
    const address = edition.read_link( name );
    return { name , address }
};
</script>

<script api="edition.js" id="edition-read-entries.js">
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

<script api="edition.js" id="edition-make-entry.js">
edition.make_entry = function( name, address ) {
    return { name , address };
};
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="populate-droplist.js">
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
	message( `Total Versions : ${n}` );
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="populate-editions.js">
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

<script id="populate-links.js">
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
    ce.textContent = "Folder";
    ce = elx( "TH" );
    re.appendChild( ce );
    ce.textContent = "Title";
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
            ce . textContent = str( entry.title ) || "?";
            ce = re.insertCell();
            ce . textContent = str( entry.address ) || "?";
        }
    );
    return ( table );
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script gem="dict.js" id="read-map-keys.js">
function read_map_keys( map ) {
    const keys = ( new Set() );
    for ( let key of map.keys() ) {
        keys.add( key);
    }
    return Array.from( Keys ).sort();
}
</script>

<script gem="dict.js" id="read-map-values.js">
function read_map_values( map ) {
    const values = [];
    const keys = read_map_keys( map );
    keys.forEach(
        ( key ) => (
            values.push( str( map.get( key ) ) )
        )
    );
    return ( values );
}
</script>

<script gem="dict.js" id="read-map-entries.js">
function read_map_entries( map ) {
    const entries = [];
    const keys = read_map_keys( map );
    let value;
    keys.forEach(
        ( key ) => {
            value = str( map.get( key ) );
            entries.push( [ key, value ]  );
        }
    );
    return ( entries );
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script gem="visit.js" id="visit.js">
function visit( url ) {
    const ops = visit;
    url = str( url );
    if (! url ) {
        console.warn( "Ignored Empty URL" );
        return;
    }
    if ( null === localStorage ) {
        const a = elx( "A" );
        a . href = ( url );
        a . click();
    } else {
        const o = ops.options;
        const w = window;
        w.open( url, url, o );
    }
}
</script>

<script gem="visit.js" id="visit-options.js">
; visit.options = ( `left=10,top=10,width=800,height=680` )
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="visit-edition.js">
visit.edition = function() {
    try {
        const name = read_edition_name();
        visit( "./../" + name + "/" );
    } catch ( e ) {
        crashed ( e );
    }
};
</script>

<script id="read-edition-name.js">
function read_edition_name() {
    const owner = edition_droplist;
    return ( owner.value );
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="action.js">
function action( event ) {
    const ops = action;
    try {
        ops.event = mine( event );
        const sender = event.target;
        const js = sender.getAttribute( "action" );
        const result = window.eval( js );
        console.log( result );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function crashed( e ) {
    console.error( e );
    window.alert( e );
}
</script>

<script>
function incomplete( s ) {
    message( `The "${s}" feature is incomplete` );
}
</script>

<script>
function message( s, silent ) {
    s = str( s );
    if (! s ) { return; }
    if (! silent ) {
        console.log( s );
    }
    message.textContent = ( s );
    return ( s );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function minnie( event ) {
	const ge = event.target;
	if (! gad( ge ) ) { return; }
	if ( ge.nodeName === "TH" ) {
		return minnie.th( event );
	}
}
</script>

<script>
addEventListener( "click", minnie );
</script>

<script>
minnie.th = function( event ) {
	const th = event.target;
	const re = th.parentElement;
	if (! re ) { return; }
	const he = re.parentElement;
	if (! he ) { return; }
	const te = he.parentElement;
	if (! te ) { return; }
	mine( event );
	if ( event.metaKey ) { return; }
	if ( event.ctrlKey ) {
		if ( event.shiftKey ) {
			recover_table( te );
			return;
		} else if ( event.altKey ) {
			save_table( te );
			return;
		} else {
			preserve_table( te );
			return;
		}
	}
	toggle_table_edit_node( te );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function input_gadget_id( gadget ) {
	let s = gadget.id;
	let m = ( `Filename (id)?` );
	s = str( window.prompt( m , s ) );
	if (! s ) { return null; }
	return ( gadget.id = s );
}
</script>

<script>
function get_gadget_id( gadget ) {
	let s = str( gadget.id );
	if ( s ) {
		return ( gadget.id = s );
	}
	return input_gadget_id( gadget );
}
</script>

<script>
function get_storage() {
	const stg = localStorage;
	if ( null === stg ) {
		message( `Store is Unavailable` );
	}
	return ( stg );
}
</script>

<script>
function preserve_table( table ) {
	const stg = get_storage();
	if (! stg ) { return; }
	const k = get_gadget_id( table );
	if (! k ) { return; }
	const v = table.innerHTML;
	stg.setItem( k, v );
	message( `Wrote "${k}" to Store` );
}
</script>

<script>
function recover_table( table ) {
	const stg = get_storage();
	if (! stg ) { return; }
	const k = get_gadget_id( table );
	if (! k ) { return; }
	const v = stg.getItem( k );
	if ( null === v ) {
		message( `No Entry for Key : "${k}"` );
		return;
	}
	table.innerHTML = str( v );
	message( `Read "${k}" from Store` );
}
</script>

<script>
function save_table( gadget ) {
	const k = get_gadget_id( table );
	if (! k ) { return; }
	const v = table.outerHTML;
	riccola( k, v );
}
</script>

<script>
function toggle_table_edit_node( te ) {
	const m = ale( "TD", te );
	if ( te.editable ) {
		te.editable = false;
		canedit( m, false );
	} else {
		te.editable = true;
		canedit( m, true );
	}
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function canedit( o, en=1 ) {
	if ( iar( o ) ) {
		o.forEach( ce => canedit( ce, en ) );
		return;
	}
	if ( gad( o ) ) {
		const CE = "contenteditable";
		if ( en ) {
			o.setAttribute( CE, "true" );
		} else {
			o.removeAttribute( CE );
		}
		return;
	}
	if ( isa( "string", o ) ) {
		return canedit( all( o ), en );
	}
	throw new TypeError(
		`Expected : String, Array, or Gadget`
	);
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

