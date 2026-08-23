<style>
@import url("./style/every-page.css");
</style>

[bpg-main]:
<https://www.facebook.com/groups/2057165187928233/>
"Facebook"

[bpg-users]: <https://www.facebook.com/groups/2057165187928233/members>
[bpg-photos]: <./auto/>
[bpg-uploads]: <./auto/>

----------------------------------------------------------------

# BASIC Demos to Port

> [BASIC Programming Group][bpg-main]
> [Users][bpg-users]
> [Photos][bpg-photos]
> [Uploads][bpg-uploads]

----------------------------------------------------------------

- __Group-ID__ : `2057165187928233`

----------------------------------------------------------------

<fieldset>
<style>
input[w] {
  	display : inline-block;
	width   : 60ch;
}
</style>
<legend>User Locator</legend>
<section center id="user_locator_section">
 <input w id="user_id" placeholder="User-ID" /><br>
 <input w id="splitter" placeholder="Splitter" /></br>
 <input w id="provider" placeholder="Provider" /></br>
 <button action="locate_user()" onclick="action(event)">Locate</button>
</section>
</fieldset>

----------------------------------------------------------------

<fieldset>
<legend>Generated Links</legend>
<section center id="menu_section">
<h3>( pending )</h3>
</section>
</fieldset>

----------------------------------------------------------------

```nav
+ Guillermo Ibáñez
@ https://www.facebook.com/photo/?fbid=10234209378728203&set=g.2057165187928233
| Demo := Polygon Mesh
| User := 1601695945
```

----------------------------------------------------------------

```nav
+ Eric Schraf
@ https://www.facebook.com/photo/?fbid=4140937962818078&set=g.2057165187928233
| Demo := Fractals
| User := 100007057442887
```

----------------------------------------------------------------

```nav
+ Antoni Gual Via
@ https://www.facebook.com/groups/2057165187928233/permalink/3841673986144002/
| Demo : Ray Traced Spheres
| User := 100002131736360
```

----------------------------------------------------------------

```nav
+ Darren Northcott
@ https://www.facebook.com/groups/2057165187928233/permalink/3561120927532644/
| Demo := Ray Traced Spheres
| User := 100000805306699
```

----------------------------------------------------------------

```nav
+ Richard Keijzer
@ https://www.facebook.com/photo?fbid=4121240264781784&set=gm.4107519982892733&idorvanity=2057165187928233
| Demo := Bird Swarm
| User := 100006875531173
```

----------------------------------------------------------------

# Standard O/P

----------------------------------------------------------------

<pre id="vop"></pre>

----------------------------------------------------------------

<script>
function main( event ) {
	try {
		let owner = menu_section;
		code_anchors_menu( owner );
		// test_07();
	} catch ( e ) {
		alert( e );
	}
}
</script>

<script>
;
; ( 1 ) && addEventListener( "load", main )
;
</script>

<script>
function get_code_gadgets( lang ) {
	const d = document;
	const g =( o )=> Array.from( o );
	const a =( q )=> g( d.querySelectorAll( q ) );
	const s = String( lang || "" ).trim();
	if (! s ) {
		return a( "code" );
	}
	const q = ( `code[class="language-${s}"]` );
	return a( q );
}
</script>

<script>
function get_code_blocks( lang ) {
	const m = get_code_gadgets( lang );
	return m.map( ce => ce.innerText );
}
</script>

<script>
function parse_navlink( s ) {
	let str =( o )=> String( o || "" ).trim();
	let title   = "Untitled";
	let address = "./";
	let icon    = "";
	let decal   = "";
	let props   = [];
	function read( s ) {
		return str( s.slice( 1 ) );
	}
	function kvp( s ) {
		let key, value;
		s = str( s );
		if ( s.includes( ":=" ) ) {
			const p = s.split( ":=" ).map( str );
			key = p.shift();
			if ( p.length ) {
				value = p.join( " := " );
			} else {
				value = "";
			}
		} else {
			key = "?";
			value = ( s );
		}
		return { key, value };
	}
	const m = s.split( "\n" );
	const parse =( t )=> {
		t = str( t );
		if ( t.length < 1 ) { return; }
		if ( t.startsWith( "+" ) ) {
			title = read( t );
			return;
		}
		if ( t.startsWith( "@" ) ) {
			address = read( t );
			return;
		}
		if (! t.startsWith ( "|" ) ) {
			return;
		}
		const kv = kvp( t );
		if ( kv.key.toLowerCase === "icon" ) {
			icon = value( t );
			return;
		}
		if ( kv.key.toLowerCase === "decal" ) {
			decal = value( t );
			return;
		}
		props.push( read( t ) );
	}
	m.forEach( parse );
	return { title, address, icon, decal, props };
}
</script>

<script>
function make_anchor( navlink ) {
	const link = parse_navlink( navlink );
	const d = document;
	const a = d.createElement( "A" );
	a . href = link.address;
	a . textContent = a . title = link . title;
	a . icon  = link . icon;
	a . decal = link . decal;
	a . props = link . props;
	return ( a );
}
</script>

<script>
function get_code_anchors() {
	const m = get_code_blocks( "nav" );
	return m.map( make_anchor );
}
</script>

<script>
function code_anchors_menu( owner ) {
	if ( owner ) {
 		owner.innerHTML = "";
	} else {
		const d = document;
		const b = body;
		owner = d.createElement( "section" );
		b.appendChild( d );
	}
	const m = get_code_anchors();
	m.forEach( ce => owner.appendChild( ce ) );
}
</script>

<script>
function say( s ) {
	vop.innerText = ( s );
}
</script>

<script>
function mention( s ) {
	const t = vop.innerText;
	if ( t ) {
		s = ( `${t}\n${s}` );
	}
	say( s );
}
</script>

<script>
function bummer( e ) {
	mention( "ERROR : " + e.message );
}
</script>

<script>
function test_01() {
	const m = get_code_gadgets( "nav" );
	say( "Code Gadgets = " + m.length );
}
</script>

<script>
function test_02() {
	const m = get_code_blocks( "nav" );
	say( "Code Blocks = " + m.length );
}
</script>

<script>
function test_03() {
	const m = get_code_blocks( "nav" );
	say( m[ 0 ] );
}
</script>

<script>
function test_04() {
	const m = get_code_blocks( "nav" );
	say( m.join( "\n---\n" ) );
}
</script>

<script>
function test_05() {
	const jst =( o )=> JSON.stringify( o , null, 2 );
	const link = parse_navlink( "" );
	say( jst( link ) );
}
</script>

<script>
function test_06() {
	const jst =( o )=> JSON.stringify( o , null, 2 );
	const m = get_code_blocks( "nav" );
	const o = parse_navlink( m[ 0 ] );
	say( jst( o ) );
}
</script>

<script>
function test_07() {
	const jst =( o )=> JSON.stringify( o , null, 2 );
	const m = get_code_blocks( "nav" );
	const navlink = ( m[ 0 ] );
	const anchor  = make_anchor( navlink );
	const owner   = ( menu_section );
	owner.appendChild( anchor );
}
</script>

<script>
function set_user_locator( i, s, p ) {
	user_id.value  = i;
	splitter.value = s;
	provider.value = p;
};
</script>

<script>
function init_user_locator( i, s, p ) {
	try {
		i = "";
		s = "groups/2057165187928233/user";
		p = "https://www.facebook.com";
		set_user_locator( i, s, p )
	} catch ( e ) {
		alert ( e );
		throw ( e );
	}
}
</script>

<script>
function get_user_isp() {
	const i = user_id.value;
	const s = splitter.value;
	const p = provider.value;
	return {
	  provider : p
	, splitter : s
	, user_id  : i
	};
}
</script>

<script>
function compose_user_isp( isp ) {
	isp = ( isp || get_user_isp() );
	const i = isp.user_id;
	const s = isp.splitter;
	const p = isp.provider;
	return [ p, s, i ].join( "/" );
}
</script>

<script>
function locate_user( event ) {
	const url = compose_user_isp();
	visit( url );
}
</script>

<script>
addEventListener( "load", init_user_locator );
</script>

<script>
function visit( url ) {
	const d = document;
	const a = d.createElement( "A" );
	a . href = ( url );
	a . click();
}
</script>

<script>
function action( event ) {
	try {
		let t = event.target;
		let s = t.getAttribute( "action" );
		let w = window;
		w . eval( s );
	} catch ( e ) {
		alert ( e );
		throw ( e );
	}
}
</script>

<script>
function _hint( o ) {
    const u = String( o ).trim();
	const v = abbrev( u, 20 );
	const a = ( `Type  : ${typeof o}`   );
	const b = ( `Node  : ${o.nodeName}` );
	const c = ( `Value : ${v}`          );
	const s = [ a, b, c ].join( "\n\n"  );
	alert( s );
}
</script>

<script>
function abbrev( s, n ) {
	return (
    		  ( s.length < n )
		? ( s )
		: ( s.slice( 0, n ) + "..." )
	);
}
</script>
