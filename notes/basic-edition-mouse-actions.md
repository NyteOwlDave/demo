<style>
@import url("./../style/every-page.css");
</style>

----------------------------------------------------------------

# Mouse Actions

----------------------------------------------------------------

> ( `BASIC Editions` )

----------------------------------------------------------------

# Modifier Key Legend

----------------------------------------------------------------

| Letter | Modifier    |
|--------|-------------|
| 〖A〗   | ALT Key     |
| 〖C〗   | CTRL Key    |
| 〖M〗   | META Key    |
| 〖S〗 | SHIFT Key   |

----------------------------------------------------------------

> These letters are used for brevity.

----------------------------------------------------------------

# Table Header Click Actions

----------------------------------------------------------------

| 〖A〗 | 〖C〗 | 〖M〗 | 〖S〗 | Action |
|------|------|-------|-------|--------------------------|
| `🔴` | `🔴` | `🔴`  | `🔴` | Toggle Edit Mode         |
| `🔴` | `🟢` | `🔴`  | `🔴` | Recover Store Entry      |
| `🔴` | `🟢` | `🔴`  | `🟢` | Persist Store Entry      |
| `🟢` | `🟢` | `🔴`  | `🔴` | Save as File             |

<!--
`🔴`  Red
`🟢`  Green
-->

----------------------------------------------------------------

> Actions are invoked by clicking on the Table's Header.

----------------------------------------------------------------

# Key Handler Members ( `minnie` )

----------------------------------------------------------------

All of the below items are members of the `minnie()` Accessor.

----------------------------------------------------------------

The __Accessor__ doubles as an Event Handler for `mousedown` 
events. It detects the __Element Node Name__ and dispatches 
events for __Custom Handling__ based on this type.

----------------------------------------------------------------

## Properties 

| Name       | Type   | Contents |
|------------|--------|------------------------|
| `th.hints` | Object | Mouse Action Hints Map |

----------------------------------------------------------------

## Methods

| Name         | Args   | Action |
|--------------|--------|-----------------------------------|
| `assist`     |        | Show This Help Page               |
| `tabulate`   | o      | Convert Object to Core Table (read entries) |
| `th`         | event  | Header Click Event Handler        |
| `th.inspect` |        | Show Mouse Actions in Console     |
| `th.show`    |        | Show Mouse Action in Popup Dialog |

----------------------------------------------------------------

# Usage Notes

----------------------------------------------------------------

There are two ways to trigger these __Mouse Actions__:

----------------------------------------------------------------

- 1) Click the __Table's Header__ ( `THEAD` ) Element
- 2) Call Methods from the __Console__ or __Footer Input__

----------------------------------------------------------------

## Mouse Clicks

Position the __Mouse Cursor__ over the __Table's Header__, hold
down the proper __Modifer Key(s)__, then __Left Click__.

----------------------------------------------------------------

## Console

Open the Browser's __Debug Console__ and run the desired
`JavaScipt` command.

----------------------------------------------------------------

## Footer Input

The `INPUT` Gadget located in the `FOOTER` also
runs `JavaScript` commands. You can enter code here and
press the `〖ENTER〗` key.

----------------------------------------------------------------

<script>
; doc = document
; doc . title = ( `BASIC Edition Mouse Actions` )
</script>


