<style>
@import url("https://nyteowldave.neocities.org/style.css");
</style>

<style>
@import url("http://dave-omega/demo/style/sce-hud.css");
</style>

[me-omega]:
<http://dave-omega/demo/web/templates/hud-app-template.html>
"Omega Edition"

----------------------------------------------------------------

# HUD App

> [Primary][me-omega]
> [File System](./)

----------------------------------------------------------------

- `MyNotepad` should be available
- `houdini` should be available

----------------------------------------------------------------

# My Notepad Hints

[notepad-host]:  <https://nyteowldave.github.io/> "Morpheus"
[notepad-code]:  <https://nyteowldave.github.io/> "Source Code ~ Morpheus"
[notepad-notes]: <https://nyteowldave.github.io/notes/mynotepad.html> "My Notepad Notes ~ Morpheus"

> [Source Code][notepad-code]
> [Provider][notepad-host]
> [Notes][notepad-notes]

----------------------------------------------------------------

| Member      | Purpose                         |
|-------------|---------------------------------|
| assist      | Show Members in Console         |
| bug_fixes   | Show Recent Bug Fix Notes       |
| cdn         | Index of Provider Addresses     |
| clone       | Create Clone for Notes          |
| dir         | Obtain List of Member Names     |
| entries     | Obtain Core Table for Notes     |
| entry       | Obtain Single Entry             |
| filter      | Filter Core List                |
| indexOf     | Obtain Note Index from Key      |
| inspect     | Show Object Members in Console  |
| key         | Obtain Single Note's Key        |
| latest      | Host for Recent Changes         |
| manual      | Visit My Notepad Notes          |
| members     | Obtain List of Member Keys      |
| merge       | Merge Other Notes Index         |
| notes       | Notes Index Object              |
| persist     | Write Notes to Store            |
| persistable | Verify Local Store is Available |
| read        | Read Single Note                |
| recover     | Read Notes from Store           |
| recoverable | Verify Store Entry Exists       |
| remove      | Remove Single Note              |
| rename      | Rename Single Note              |
| stats       | Obtain Note Statistics          |
| storekey    | Store Key for Notes             |
| summarize   | Summarize Notes in Console      |
| value       | Obtain Single Note's Value      |
| updated     | Date of Recent Changes          |
| write       | Write Single Note               |

----------------------------------------------------------------

# Houdini Hints

[houdini-host]:  <http://dave-omega/demo/web/web-menu.html> 
"Web Demo Menu ~ Omega"

[houdini-code]:  <http://dave-omega/demo/web/gems/houdini.js>
"Houdini Source Code ~ Omega"

[houdini-notes]: <http://dave-omega/demo/web/gems/houdini-notes.html>
"Houdini Notes ~ Omega"

> [Source Code][houdini-code]
> [Provider][houdini-host]
> [Notes][houdini-notes]

----------------------------------------------------------------

| Member      | Purpose  |
|-------------|----------------------------|
| visible     | Verify Object is Visible   |
| show        | Show Object                |
| hide        | Hide Object                |
| toggle      | Toggle Object's Visibility |
| zoom        | Request Full Screen Mode   |
| hints       | Display Object's Members   |

----------------------------------------------------------------

## Houdini Usage

- Call `houdini( )`
- Pass in some __Gadget ID__ or __Reference__
- The __Houdini Methods__ will be attached to this __Gadget__

----------------------------------------------------------------

# My Notepad Hints
<header id="messages"></header>

<footer id="footer">
  <input id="footer_input" onchange="perform(event)" />
</footer>

<textarea id="sce" class="hud hide" wrap="off">
</textarea>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

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

<script src="https://nyteowldave.github.io/std/api/gems/prolog-beta.js"></script>
<script src="http://dave-omega/demo/web/api/hud.js"></script>
<script src="http://dave-omega/demo/web/gems/interpreter-lite.js"></script>
<script src="http://dave-omega/demo/web/gems/houdini.js"></script>

<script>
footer_input.value = "hud()";
</script>


