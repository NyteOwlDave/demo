<head>
  <link rel="icon" href="./icons/dot.png" />
</head>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/dorothy-rockets.html>
"Omega Edition"

----------------------------------------------------------------

# [`🚀` Dorothy's Rockets][me-omega]

> [`💼` Cloud Store](https://www.dropbox.com/home/dot)

----------------------------------------------------------------

<div center>
  <button id="btn_db_save">💾</button>
  <button id="btn_db_open">📂</button>
  <button id="btn_db_copy">📋</button>
  <button id="btn_db_persist">🔏</button>
  <button id="btn_db_recover">🔓</button>
  <button id="btn_db_inspect">🔭</button>
  <button id="btn_db_index">📑</button>
  <button id="btn_db_upload">📤</button>
  <button id="btn_db_download">📥</button>
</div>

----------------------------------------------------------------

# `📑` Index

----------------------------------------------------------------

<div center>
  <select id="rocket_index"></select>
  <button>♻️</button>
</div>

----------------------------------------------------------------

# `📮` Entry Form

----------------------------------------------------------------

<div center>
  <button id="btn_entry_insert">➕</button>
  <button id="btn_entry_delete">➖</button>
  <button id="btn_entry_accept">✅</button>
  <button id="btn_entry_reject">❎</button>
  <button id="btn_entry_search">🔍</button>
</div>

----------------------------------------------------------------

<table>
<thead>
<tr><th>Field</th><th>Value</th></tr>
</thead>
<tbody id="entry-form">
<tr><td>Filename</td><td><input /></td></tr>
<tr><td>Title</td><td><input /></td></tr>
<tr><td>Address</td><td><input /></td></tr>
<tr><td>Decal</td><td><input /></td></tr>
<tr><td>Icon</td><td><input /></td></tr>
</tbody>
</table>

----------------------------------------------------------------

# `🔍` Search Results

----------------------------------------------------------------

<table>
<thead>
<tr>
<th>Filename</th>
<th>Title</th>
<th>Address</th>
<th>Decal</th>
<th>Icon</th>
<th>Actions</th>
</tr>
</thead>
<tbody class="results">
<tr>
 <td><input /></td>
 <td><input /></td>
 <td><input /></td>
 <td><input /></td>
 <td><input /></td>
 <td>
  <button onclick="floob(event)">➕</button>
  <button onclick="floob(event)">➖</button>
  <button onclick="floob(event)">🔃</button>
  <button onclick="floob(event)">⬆️</button>
  <button onclick="floob(event)">⬇️</button>
 </td>
</tr>
</tbody>
</table>

----------------------------------------------------------------

# `🧝` Description

----------------------------------------------------------------

<div center>
 <img src="./icons/dorothy.png" />
</div>

----------------------------------------------------------------

This is the __Dot Rocket Manager__ I've dreamed of, but never
took the time to think through and implement.

The difference is that Dot Rockets are now treated as a JSON
Manuscript rather than individual HTML Files. Though the
entries in the Rocket Database can be easily extracted to
HTML Files, either individually or in batches.

[g-sites]: <https://sites.google.com>
[g-site]: <https://sites.google.com/view/dorothys-rockets>

More notes can be found in the [Official Google Site][g-site]
for __Dorothy__.

> `🤩` Enjoy!

----------------------------------------------------------------

# `🧭` Navigation

- ( `pending` )

----------------------------------------------------------------

<header id="header">
  <div id="messages"></div>
</header>

<footer id="footer">
  <input wide id="footer_input" onchange="perform(event)" />
</footer>

----------------------------------------------------------------

<style>
@import url("./../style/every-page.css");
</style>

<style>
td input {
    width : inherit;
}
.results td input {
    width : 10ch;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="iwm.js">
; iwm = Object.keys( window ).sort()
</script>

<script id="doc.js">
; doc = document
</script>

<script id="debug.js">
cls =()=> console.clear();
agn =()=> location.reload();
</script>

<script src="./gems/core-ops.js"></script>
<script src="./gems/json-ops.js"></script>
<script src="./gems/toggle.js"></script>
<script src="./api/dorothy-rockets.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="main.js">
function main( event ) {
	try {
        doc = document;
        doc . title = ( `Dorothy's Rockets` );
        // crunch.init();
        if ( null !== localStorage ) {
            dorothy.recover();
            update_index();
        }
	} catch ( e ) {
		crashed ( e );
	}
}
</script>

<script id="page-load.js">
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="update_index.js">
function update_index( event ) {
    const owner = rocket_index;
    owner.innerHTML = "";
    const m = dorothy.index();
    m.forEach(
        ( k ) => {
            const ce = elx( "OPTION" );
            ce.value = ce.textContent = ( k );
            owner.appendChild( ce );
        }
    );
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="visit.js">
function visit( url ) {
    url = str( url );
    if (! url ) {
        console.warn( `Ignoring Empty URL` );
        return;
    }
    if ( null === localStorage ) {
        const a = elx( "A" );
        a.href = ( url );
        a.click();
    } else {
        const o = visit.options;
        const w = window;
        w.open( url, url, o );
    }
}
;
; visit.options = ( `left=10,top=10,width=800,height=680` )
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="veer.js">
function veer( hostname ) {
    location.hostname = hostname;
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="home.js">
function home() {
    visit( home.address );
}
;
; home.address = (
  "http://dave-omega/demo/web/dorothy-rockets.html"
)
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
