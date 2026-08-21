
<style>
@import url("./../../style/every-page.css");
</style>

<style>
details, summary {
	height      : unset;
	font        : unset;
	font-height : unset;
	line-height : unset;
	text-align  : unset;
	margin-top  : unset;
	margin-bottom : unset;
}
summary {
	margin-left : 10px;
}
</style>

----------------------------------------------------------------

# TreeView Gadget Demo

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

<script>
function now() {
	const dt = ( new Date() );
	return dt.toLocaleString();
}
</script>

<script>
function _rtc( o    ) { return o.textContent.trim(); }
function _wtc( o, v ) { o.textContent =    v.trim(); }
</script>


