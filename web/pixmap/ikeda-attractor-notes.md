
<style>
@import url("./../../style/every-page.css");
</style>

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

<header id="header">
  <div id="messages"></div>
</header>

<footer id="footer">
  <input wide id="footer_input" onchange="perform(event)" />
</footer>

----------------------------------------------------------------

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc = document
</script>

<script>
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

<script>
function main( event ) {
    try {
        doc . title = ( `Ikeda Attractor Notes` );
        message( "Ready for Action!" );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script>
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
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

<script>
function on_edit( event ) {
    try {
        mine( event );
        const viewer = get_viewer( event );
        const cc = viewer.innerText.length;
        const s = ( `Character Count : ${cc}` );
    } catch ( e ) {
        crashed ( e );
    }
}
</script>

<script>
function on_view( event ) {
    on_edit( event );
}
</script>

