
<style>
@import url("./../../style/every-page.css");
</style>

<style>
@import url("./../../style/treeview.css");
.active {
    color : lemonchiffon !important;
    background : #040412 !important;
}
</style>

[me-omega]:
<http://dave-omega/demo/web/gadgets/treeview.html>

----------------------------------------------------------------

# [TreeView Gadget Demo][me-omega]

----------------------------------------------------------------

# Active Element

| Property | Value                        |
|----------|------------------------------|
| Time     | <code id="time"></code>      |
| Type     | <var id="active_type"></var> |
| Text     | <var id="active_text"></var> |

----------------------------------------------------------------

# Dynamic Tree

----------------------------------------------------------------

<section id="dynamic_tree">
</section>

----------------------------------------------------------------

# Static Tree

----------------------------------------------------------------

<section id="static_tree">
<details> <summary>Root</summary>
  <details> <summary>Top Level #1</summary> </details>
  <details> <summary>Top Level #2</summary>
    <details> <summary>Mid Level #A</summary>
      <details> <summary>Lower Level #A-1</summary> </details>
      <details> <summary>Lower Level #A-2</summary> </details>
      <details> <summary>Lower Level #A-3</summary> </details>
    </details>
    <details> <summary>Mid Level #B</summary>
      <details> <summary>Lower Level #B-1</summary> </details>
    </details>
    <details> <summary>Mid Level #C</summary>
      <details> <summary>Lower Level #C-1</summary> </details>
      <details> <summary>Lower Level #C-2</summary> </details>
    </details>
  </details>
  <details> <summary>Top Level #3</summary> </details>
</details>
</section>

----------------------------------------------------------------

# HTML Source Example

```html

<details> <summary>Root</summary>
  <details> <summary>Top Level #1</summary> </details>
  <details> <summary>Top Level #2</summary>
    <details> <summary>Mid Level #A</summary>
      <details> <summary>Lower Level #A-1</summary> </details>
      <details> <summary>Lower Level #A-2</summary> </details>
      <details> <summary>Lower Level #A-3</summary> </details>
    </details>
    <details> <summary>Mid Level #B</summary>
      <details> <summary>Lower Level #B-1</summary> </details>
    </details>
    <details> <summary>Mid Level #C</summary>
      <details> <summary>Lower Level #C-1</summary> </details>
      <details> <summary>Lower Level #C-2</summary> </details>
    </details>
  </details>
  <details> <summary>Top Level #3</summary> </details>
</details>

```

----------------------------------------------------------------

# Navigation

> [Web Menu](./../web-menu.html)

> [Folder Tree](./)
> [File System](./)

----------------------------------------------------------------

# References

[notes-menu]:
<http://dave-omega/app/jarvis/auto/notes-menu.html>
"Omega Edition"

[treeview-api-notes]: 
<http://dave-omega/demo/web/api/treeview-api-notes.html>

> [Notes Menu][notes-menu]
> [Treeview API Notes][treeview-api-notes]

----------------------------------------------------------------

<footer id="footer">
  <input id="footer_input" onchange="perform(event)" />
</footer>

<header id="footer">
  <div id="messages"></div>
</header>

----------------------------------------------------------------

<script>
;
; iwm = Object.keys( window ).sort()
;
</script>

<script>
;
; prolog = {}
; prolog . title = ( `TreeView Gadget` )
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
; doc = document
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./../gems/core-ops.js"></script>
<script src="./../api/core-api.js"></script>
<script src="./../api/treeview.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        doc . title = ( prolog . title );
        footer_input.value = "hud()";
		let owner = dynamic_tree;
		treeview( "HUD", hud, owner, "hud_tree" );
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
function tick( event ) {
	_wtc( time, now() );
    treeview.activate( null );
	let ce = document.activeElement;
	if ( ce ) {
		const t = ce.nodeName;
		_wtc( active_type, t );
		if ( t !== "BODY" ) {
            treeview.activate( ce );
			_wtc( active_text, _rtc( ce )  );
		} else {
			_wtc( active_text, "( html ... )"  );
		}
	} else {
		_wtc( active_type, "?" );
		_wtc( active_text, "?" );
	}
}
</script>

<script>
setInterval( tick, 420 );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function now() {
	const dt = ( new Date() );
	return dt.toLocaleString();
}
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function _rtc( o    ) { return o.textContent.trim(); }
function _wtc( o, v ) { o.textContent =    v.trim(); }
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<style>
@import url("./../../style/sce-hud.css");
</style>
<textarea id="sce" class="hide"></textarea>
<script src="./../api/hud.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

