
<style>
@import url("./../../style/every-page.css");
</style>

<style>
@import url("./../../style/treeview.css");
</style>

[me-omega]:
<http://dave-omega/demo/web/gadgets/treeview.html>

----------------------------------------------------------------

# [TreeView Gadget Demo][me-omega]

----------------------------------------------------------------

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

----------------------------------------------------------------

# Active Element

| Property | Value                        |
|----------|------------------------------|
| Time     | <code id="time"></code>      |
| Type     | <var id="active_type"></var> |
| Text     | <var id="active_text"></var> |

----------------------------------------------------------------

# Navigation

> [Web Menu](./../web-menu.html)

> [Folder Tree](./)
> [File System](./)

----------------------------------------------------------------

<footer id="footer">
  <input id="footer_input" onchange="perform(event)" />
</footer>

<header id="footer">
  <div id="messages"></div>
</header>

----------------------------------------------------------------

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

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        doc . title = ( prolog . title );
        footer_input.value = "hud()";
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
	let ce = document.activeElement;
	if ( ce ) {
		const t = ce.nodeName;
		_wtc( active_type, t );
		if ( t !== "BODY" ) {
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
