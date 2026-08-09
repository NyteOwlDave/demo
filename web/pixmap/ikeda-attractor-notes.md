
<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[sulu]: <http://dave-ryzen/nav/sulu.html>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me]:
<http://dave-omega/demo/web/pixmap/ikeda-attractor-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [Ikeda Attractor Notes][me]

----------------------------------------------------------------

## Comment Section

```basic

'
' NyteOwlDave ~ 2026-AUG-06
' Inspired by Equations in Motion
' https://www.facebook.com/equationsinmotion
' Platform : QB64 Phoenix
' Dedicated to the BASIC Programming "Gang"
'

```

<div center index="0">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Shares Section

```basic

_Title "Ikeda Attractor"

Dim Shared C_MIDNIGHT
Dim Shared C_GOLD
Dim Shared U0#
Dim Shared UNOW#
Dim Shared INC#
Dim Shared DOTS_PER_FRAME%
Dim Shared TOTAL_FRAMES%
Dim Shared THIS_FRAME%
Dim Shared SW
Dim Shared SH
Dim Shared CX
Dim Shared CY

```

<div center index="1">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Screen Setup

```basic

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

Screen _NewImage(SW, SH, 32)

```

<div center index="2">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Color Setup

```basic

C_GOLD = _RGB(255, 215, 0)
C_MIDNIGHT = _RGB(20, 20, 64)

```

<div center index="3">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Animation Setup

```basic

DOTS_PER_FRAME% = 1750
TOTAL_FRAMES% = 350
THIS_FRAME% = 0

U0# = 0.7
U1# = 0.92
UX# = U1# - U0#

UNOW# = U0#
INC# = UX# / TOTAL_FRAMES%

```

<div center index="4">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Animation Loop

```basic

Background C_GOLD

Do
    _Limit 60
    Render
    If InKey$ = Chr$(27) Then
        Exit Do
    End If
Loop

End

```
<div center index="5">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Theta Subroutine

```basic

' Angle for Next Pattern Point
Function Theta (xn, yn)
    n = 1 + xn * xn + yn * yn
    Theta = (0.4 - 6 / n)
End Function

```

<div center index="6">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Advance Subroutine

```basic

' Advance to the Next Pattern Point
Sub Advance (u, pt())
    xn = pt(1)
    yn = pt(2)
    t = Theta(xn, yn)
    ct = Cos(t)
    st = Sin(t)
    pt(1) = u * (xn * ct - yn * st) + 1
    pt(2) = u * (xn * st + yn * ct)
End Sub

```

<div center index="7">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Render Subroutine

```basic

' Render a Single Frame
Sub Render ()
    If (THIS_FRAME% >= TOTAL_FRAMES%) Then
        THIS_FRAME% = 0
        UNOW# = U0#
        Background C_GOLD
    Else
        THIS_FRAME% = THIS_FRAME% + 1
        UNOW# = UNOW# + INC#
        u = Round(UNOW#, 3)
        Locate 2, 2
        Print " U = "; u; " "
        Locate 4, 2
        Print " Frame = "; THIS_FRAME%; " "
    End If
    Dim pt(2)
    pt(1) = 0.1: pt(2) = 0.1
    For i = 1 To DOTS_PER_FRAME%
        Advance UNOW#, pt()
        x = 200 * pt(1): y = 200 * pt(2)
        PSet (CX + x - 140, CY - y - 100), C_MIDNIGHT
    Next i
End Sub

```

<div center index="8">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Background Subroutine

```basic

Sub Background (c)
    Line (1, 1)-(SW - 1, SH - 1), c, BF
End Sub

```

<div center index="9">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## Round Function

```basic

Function Round (n!, digits%)
    k% = 10 ^ digits%
    n! = Int(n! * k% + 0.5)
    Round = n! / k%
End Function

```

<div center index="10">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

## RandomPoint Subroutine

```basic

' Used During Testing & Debugging
Sub RandomPoint (pt())
    pt(1) = Rnd * SW - CX
    pt(2) = Rnd * SH - CY
End Sub

```

<div center index="11">
    <button onclick="on_edit(event)">Edit</button>
    <button onclick="on_view(event)">View</button>
</div>

----------------------------------------------------------------

# [Navigation][sulu]

> [Web Menu](./../web-menu.html)

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

# Remarks

This app has some rather unique and powerful features. For
example, it can __Save__ all __Viewers__ or all __Editors__ as
plain text documents.

Just invoke:

- `save_viewer_doc`
- `save_editor_doc`

It also supports `seeker` for __Spelunking__ global members.

The `gideon` accessor should be extracted into a separate
__API Module__. It manages __Gadget__ operations.

All of the __Pixel Map API Modules__ are linked to this page.
This was done for experimenting.

Also, there are a large number of __Gem Modules__ linked to
this page.

Just invoke:

- `inspect.scripts`
- `inspect.gems`

----------------------------------------------------------------

<header id="header">
  <div id="messages"></div>
</header>

<footer id="footer">
  <input wide id="footer_input" onchange="perform(event)" />
</footer>

----------------------------------------------------------------


<script gem="iwm.js" id="iwm.js">
; iwm = Object.keys( window ).sort()
</script>

<script gem="doc.js" id="doc.js">
; doc = document
</script>

<script gem="debug.js" id="debug.js">
; cls =()=> console.clear()
; agn =()=> location.reload()
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./core-ops.js"></script>
<script src="./scalar.js"></script>
<script src="./vector.js"></script>
<script src="./geom-2d.js"></script>
<script src="./rgba.js"></script>
<script src="./pixmap.js"></script>

<script src="./app/pixmap-app.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script id="main.js">
function main( event ) {
    try {
        doc . title = ( `Ikeda Attractor Notes` );
        message( "Ready for Action!" );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script id="page-load.js">
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script gem="app-events.js" id="get-viewer.js">
function get_viewer( event ) {
    const sender = event.target;
    const parent = sender.parentElement;
    const i = parent.getAttribute( "index" );
    const m = all( "PRE" );
    const viewer = ( m[ i ] );
    if ( viewer ) { return ( viewer ); }
    throw new Error( `No Viewer at Index : ${i}` );
}
</script>

<script gem="app-events.js" id="on-edit.js">
function on_edit( event ) {
    try {
        mine( event );
        const viewer = get_viewer( event );
        const buddy  = get_buddy_editor( viewer );
        gideon.show( buddy  );
        gideon.hide( viewer );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script gem="app-events.js" id="on-view.js">
function on_view( event ) {
    try {
        mine( event );
        const viewer = get_viewer( event );
        const buddy  = get_buddy_editor( viewer );
        gideon.hide( buddy  );
        gideon.show( viewer );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script gem="get-buddy-editor.js" id="get-buddy-editor.js">
function get_buddy_editor( viewer ) {
    let ed  = viewer.nextElementSibling;
    if (! ged( ed ) ) {
        ed = elx( "TEXTAREA" );
        ed . viewer = viewer;
        ed . value = viewer . innerText;
        ed . classList . add( "siox" );
        ed . wrap = "off";
        ed . spellcheck = false;
        viewer.insertAdjacentElement( "afterend", ed );
    }
    return ( ed );
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<!-- [[ Gems ]] -->
<script src="./../gems/stateful.js"></script>
<script src="./../gems/doc-read-write.js"></script>
<script src="./../gems/sulu.js"></script>
<script src="./../gems/pcl-ultra.js"></script>
<script src="./../gems/riccola-lite.js"></script>
<script src="./../gems/interpreter-lite.js"></script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script gem="gideon.js" id="gideon.js">
gideon = {};
</script>

<script gem="gideon.js" id="gideon-show.js">
gideon.show = function( ge ) {
    ge = resolve( ge );
    const cl = ge.classList;
    cl.remove( "hide" );
    return ( ge );
};
</script>

<script gem="gideon.js" id="gideon-hide.js">
gideon.hide = function( ge ) {
    ge = resolve( ge );
    const cl = ge.classList;
    cl.add( "hide" );
    return ( ge );
};
</script>

<script gem="gideon.js" id="gideon-toggle.js">
gideon.toggle = function( ge ) {
    ge = resolve( ge );
    const cl = ge.classList;
    if ( cl.contains( "hide" ) ) {
        cl.remove( "hide" );
    } else {
        cl.add( "hide" );
    }
    return ( ge );
};
</script>

<script gem="gideon.js" id="gideon-code-blocks.js">
gideon.code_blocks = function( lang ) {
    lang = ( str( lang ) || "basic" );
    const cname = ( `language-${lang}` );
    const q = ( `code[class="${cname}"]` );
    return all( q );
};
</script>

<script gem="gideon.js" id="gideon-code-block.js">
gideon.code_block = function( lang, index ) {
    const m = gideon.code_blocks( lang );
    return ( m[ index ] );
};
</script>

<script gem="gideon.js" id="gideon-code-doc.js">
gideon.code_doc = function( lang ) {
    const m = gideon.code_blocks( lang );
    const v = m.map( ge => str( ge.innerText ) );
    return ( v.join( "\n\n" ) );
};
</script>

<script gem="gideon.js" id="gideon-viewer-doc.js">
gideon.viewer_doc = function() {
    const m = all( "PRE" );
    const v = m.map( ge => str( ge.innerText ) );
    return ( v.join( "\n\n" ) );
};
</script>

<script gem="gideon.js" id="gideon-editor-doc.js">
gideon.editor_doc = function() {
    const m = all( "TEXTAREA" );
    const v = m.map( ge => str( ge.value ) );
    return ( v.join( "\n\n" ) );
};
</script>

<script gem="gideon.js" id="gideon-code-hints.js">
gideon.code_hints = function( lang ) {
    const m = gideon.code_blocks( lang );
    const v = m.map( ge => str( ge.innerText ) );
    function hint( s ) {
        s = s.slice( 0, 36 );
        if ( s.length < 36 ) { return ( s ); }
        return ( `${s} ...` );
    }
    return ( v.map( hint ) );
};
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script gem="save-viewer-doc.js" id="save-viewer-doc.js">
function save_viewer_doc() {
    try {
        const k = "ikeda-viewers.md";
        const v = gideon.viewer_doc();
        riccola( k, v );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script gem="save-editor-doc.js" id="save-editor-doc.js">
function save_editor_doc() {
    try {
        const k = "ikeda-editors.md";
        const v = gideon.editor_doc();
        riccola( k, v );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script gem="seeker.js" id="seeker.js">
function seeker( rex ) {
    const our =( k )=> (! iwm.includes( k ) );
    let m = mem().filter( our );
    return filter( m, rex );
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script gem="incomplete.js" id="incomplete.js">
function incomplete( s ) {
    message( `The "${s}" feature is incomplete` );
}
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script gem="inspect.js" id="inspect.js">
function inspect( o, title ) {
    title = str( title ) || "Items";
    const c = console;
    c.clear();
    c.groupCollapsed( `%c${title}`, "font-size: 16pt" );
    c.table( pcl( o ) );
    c.groupEnd();
}
</script>

<script gem="inspect.js" id="inspect-scripts.js">
inspect.scripts = function() {
    const m = all( "SCRIPT" );
    let v = m.map( ge => (
        ge.id || ge.src
    ) );
    v = v.filter( s => s ).sort();
    inspect( v, "Script Modules" );
};
</script>

<script gem="inspect.js" id="inspect-gems.js">
inspect.gems = function() {
    const m = all( "SCRIPT[gem]" );
    let v = m.map( ge => (
        ge.id || ge.getAttribute( "gem" )
    ) );
    v = arr( unq( v ) );
    v = v.filter( s => s ).sort();
    inspect( v, "Embedded Gem Modules" );
};
</script>


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
