<style>
@import url("https://nyteowldave.neocities.org/style.css");
</style>

<style>
@import url("http://dave-omega/demo/style/sce-hud.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/codelab/markus-bookius-notes.html>
"Omega Edition"

[app]: <./markus.html>
"Markus Bookius Application"

[ide]: <https://www.tutorialrepublic.com/codelab.php>
"Code Lab IDE"

----------------------------------------------------------------

# `🚩` Markus Bookius Notes

> [`🟢` Primary][me-omega]
> [`🟢` Markus Bookius][app]
> [`🟢` Code Lab][ide]

> [`🟢` File System](./)

----------------------------------------------------------------

# Index

- Origin
- Purpose
- Features
- To-Do List
- Toolkit
- References

----------------------------------------------------------------

# Origin

Markus began life as a `Code Lab` experiment. Checking out the
IDE and learning its features and limitations.

After a little while, it grew into a simple
__Bookmark Database__. It combines features from both `Raindrop`
and my `Store Key Notes Manager`.

Like `Raindrop`, `Sulu`, or `Dorothy`, it manages collections
of __URL Addresses__.

Like `SKNM`, `Venus`, or `Slideshow`, it offers the ability
to navigate using "Media Control" arrows.

## Examples

| Decal | Typical Action | Typical Method Name |
|-------|----------------|---------------------|
| ⬆️     | Scroll Up      | scroll_up           |
| ➡️     | Scroll Right   | scroll_right        |
| ⬇️     | Scroll Down    | scroll_down         |
| ⬅️     | Scroll Left    | scroll_left         |
| ◻️     | Zoom In        | scale_magnify       |
| ▫️     | Zoom Out       | scale_reduce        |
| ⏮️    | Home / First   | move_first          |
| ⏪    | Previous Page  | move_prev           |
| ⏩    | Next Page      | move_next           |
| ⏭️    | End / Last     | move_last           |
| ✅     | Accept Changes | accept              |
| ❎     | Reject Changes | reject              |
| 🔄    | Swap / Exchange | swap               |
| ⤵️     | Copy Down      | copy_down           |
| ⤴️     | Copy Up        | copy_up             |
| 💠     | Full Screen    | zoom               |
| 🗑️     | Clear          | clear              |

----------------------------------------------------------------

# Purpose

- ( `pending` )

----------------------------------------------------------------

# Features

- ( `pending` )

----------------------------------------------------------------

# To-Do List

- Test HUD
- Test Footer
- Test Header
- Test Imported Scripts
- Persistent State
- Editable Content
- User Table Section
- Table Click Handler
- Event Log Gadget
- Decal Button Trays

----------------------------------------------------------------

# Toolkit

- ( `pending` )

----------------------------------------------------------------

# References

- ( `pending` )

----------------------------------------------------------------

<header id="messages"></header>

<footer id="footer">
  <input id="footer_input" onchange="perform(event)" />
</footer>

<textarea id="sce" class="hud hide" wrap="off">
</textarea>

----------------------------------------------------------------

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
;
; doc = document
; doc . title
= doc . querySelector( "H1" )
. textContent
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="https://nyteowldave.github.io/std/api/gems/prolog-beta.js"></script>
<script src="http://dave-omega/demo/web/api/hud.js"></script>
<script src="http://dave-omega/demo/web/gems/interpreter-lite.js"></script>
<script src="http://dave-omega/demo/web/gems/houdini.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
footer_input.value = "hud()";
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

