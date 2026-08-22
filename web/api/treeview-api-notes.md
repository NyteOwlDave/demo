
<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[treeview-api]: <./treeview.js> "TreeView API Source Code"

[treeview-gadget]:
<http://dave-omega/demo/web/gadgets/treeview.html>
"TreeView Gadget Example"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/api/hud-api-notes.html>
"Omega Edition"

----------------------------------------------------------------

# [TreeView API Notes][me-omega]

----------------------------------------------------------------

> ( `Web Demos` )

----------------------------------------------------------------

# Description

----------------------------------------------------------------

The [`TreeView API`][treeview-api] supports
the [`TreeView Gadget`][treeview-gadget].

----------------------------------------------------------------

# Accessor Method

----------------------------------------------------------------

```javascript

function treeview( title, contents, parent, id )

/*
title    : String      => Root Node's Title
contents : Object      => Object for Tree Nodes
parent   : HTMLElement => Parent Element
id       : String      => Optional ID for Root Node
returns  : HTMLElement => Root DETAILS Element
*/

```

----------------------------------------------------------------

The main (global) method is `treeview()`. This method constructs
a complete __TreeView Gadget__.

This gadget is comprised of a hierarchy of `DETAILS` elements.

Each element has a `SUMMARY` child for the title.

----------------------------------------------------------------

## Contents Property

Each `SUMMARY` element has a `contents` property as a __leaf__.

This Property can be accessed at run time to examine the contents
used to create the Leaf.

Primitive types are duplicated.

Object Types are References, so any alteration modifies the
original Object.

----------------------------------------------------------------

## CSS Classes

Each node (any type) has a CSS Class of `treeview`.

The `SUMMARY` nodes have a `leaf` class.

The `DETAILS` nodes have a `node` class.

The __Root__ `DETAILS` node has a `root` class.

The __Active__ node has an `active` class.

----------------------------------------------------------------

# Properties

----------------------------------------------------------------

> These Properties are Members of the `treeview` accessor.

----------------------------------------------------------------

- __Class names__ are listed in `cnames`
- __Element Types__ are listed in `types`
- __Active Node__ is stored in `active_node`

----------------------------------------------------------------

# Usage Hints

----------------------------------------------------------------

## Code Spelunking

You can use `TreeView Gadgets` for __code spelunking__. This is
useful for hierarchical data that has more then one level of
depth.

Alternatively, you can use the `mapper` accessor from the
`Core API` for creating a `TABLE` gadget to display flat data.
That is, an Object that has only a single level of depth.

Both of these tools are useful for Run Time Hints any for
Documenting Source Code.

----------------------------------------------------------------

## Active Node Tracking

At present, the __Active Node__ must be set __manually__.

This might be handled by a __Timer__ (like the demo does), or
some other means.

To set the __Active Node__, invoke the `activate()` method
for the `treeview` accessor. Pass in a Reference to the
active __Leaf Node__ (`SUMMARY`).

Generally, this can be detected using `document.activeElement`.
Assuming that the leaf has input focus.

As mentioned above, this reference is stored in the`
`active_node` Property for `treeview`.

----------------------------------------------------------------

# Example TreeView

For an example of the `TreeView`
gadget, [Click Here][treeview-gadget].

----------------------------------------------------------------

# Example Details Table

<section id="details_section"></section>

<div>
<h3>Hints</h3>
<pre>
<code>details_table.edit();</code>
</pre>
<article>
Issue the above command to edit the script.
</article>
<pre>
<code>details_table.notes();</code>
</pre>
<article>
Issue the above command to edit the notes.
</article>
</div>

<script id="details-table.js">
function details_table( o, title ) {
    try {
        title = ( str( title ) || "Details" );
        if (! o ) {
            o = treeview;
            title = ( "TreeView Details" );
        }
        const se = details_section;
        se.innerHTML = "";
        const te = elx( "TABLE" );
        const ce = te.createCaption();
        ce.textContent = ( title );
        se.appendChild( te );
        const m = mapper( o );
        mapper.tabulate( m, te );
    } catch ( e ) {
        alert ( e );
        throw ( e );
    }
}
</script>

<script>
details_table.edit = function() {
    const ed = hud.editor();
    const se = gid( "details-table.js" );
    ed.value = se.innerText;
    hud.show();
};
</script>

<script>
details_table.notes = function() {
    const ops = details_table;
    const ed = hud.editor();
    ed.value = ( ops.hints );
    hud.show();
};
</script>

<script>
details_table.hints = ( `

/*
  To Show Accessor Details:
*/

_caption = "Details Table";
_accessor = details_table;

details_table( _accessor, _caption );

` );
</script>

<script>
addEventListener(
  "load" ,
  ( e ) => { details_table(); }
);
</script>

----------------------------------------------------------------

# References

[notes-menu]:
<http://dave-omega/app/jarvis/auto/notes-menu.html>
"Omega Edition"

> [Notes Menu][notes-menu]

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

<script>
;
; iwm = Object.keys( window ).sort()
;
</script>

<script>
;
; prolog = {}
; prolog . title = ( `TreeView API Notes` )
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
<script src="./core-api.js"></script>
<script src="./treeview.js"></script>

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

<style>
@import url("./../../style/sce-hud.css");
</style>
<textarea id="sce" class="hide"></textarea>
<script src="./hud.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

