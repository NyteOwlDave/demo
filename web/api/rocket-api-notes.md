<head>
  <link rel="icon" href="favicon.ico" />
</head>


[me-tower]:
<http://dave-tower/demo/web/api/rocket-api-notes.html>
"Tower Edition"

[me-omega]:
<http://dave-omega/demo/web/api/rocket-api-notes.html>

----------------------------------------------------------------

# [`🚀` Dorothy Rockets API][me-tower]

> ( `rocket-api-notes.md` ~ `2026-AUG-20` )

----------------------------------------------------------------

### `>>>` FEATURING `<<<`

### [`🌐` Dorothy Home](http://tiny.cc/dorothy-rockets)

----------------------------------------------------------------

| Manuscript Filename    | Comment |
|------------------------|--------------|
| `dorothy-rockets.json` | Recommended  |

### Registered Documents

| TiKey     | TiDate    | Title |
|-----------|-----------|------------------------|
| (pending) | (pending) | `dorothy-rockets.json` |
| (pending) | (pending) | `dorothy-rockets.md`   |
| (pending) | (pending) | `dorothy-rockets.html` |

----------------------------------------------------------------

# Accessor

----------------------------------------------------------------

| Name      | Type   |
|-----------|--------|
| `dorothy` | Object |

----------------------------------------------------------------

# Internals

----------------------------------------------------------------

| Name       | Type   | Comment |
|------------|--------|--------------------------------|
| `_rockets` | Object | Rockey Dictionary              |
| `store`    | Method | Acquire Store Object Reference |

----------------------------------------------------------------

# Properties

----------------------------------------------------------------

| Name       | Type   | Contents |
|------------|--------|-----------------------------------|
| `storekey` | String | Manuscript Store Key and Filename |
| `needs`    | Array  | Required Global Member Names      |
| `helps`    | Array  | Optional Global Member Names      |

----------------------------------------------------------------

# Methods

----------------------------------------------------------------

| Name       | Args    | Description |
|------------|---------|---------------------------------------|
| `persist`  |         | Write Rocket Manuscript to Store      |
| `recover`  |         | Read Rocket Manuscript from Store     |
| `request`  | `url`   | Request Remote Rocket Manuscript      |
| `compose`  | `※`    | Compose as JSON (Manuscript or Entry) |
| `parse`    | `json`  | Parse JSON to Rocket Manuscript       |
| `tabulate` | `index` | Tabulate Rocket Entries               |
| `inspect`  | `※`    | Show in Console (Manuscript or Entry) |
| `contains` | `key`   | True if Rocket Key Exists             |
| `prepare`  | `※`    | Prepare Entry from Field Values       |
| `validate` | `entry` | Ensure Entry Structure is Valid       |
| `delete`   | `key`   | Delete Rocket Entry                   |
| `insert`   | `※`    | Insert New Rocket Entry               |
| `update`   | `※`    | Update Existing Rocket Entry          |
| `read`     | `key`   | Read Existing Rocket Entry            |
| `select`   | `rex`   | Select Matching Rocket Entries        |
| `index`    | `rex`   | Select Matching Rocket Keys           |
| `launch`   | `key`   | Launch a Rocket                       |
| `save`     | `※`    | Save Manuscript to JSON File          |
| `copy`     | `※`    | Copy to Clipbd (Manuscript or Entry)  |
| `accept`   | `ed`    | Read and Parse Manuscript from Editor |
| `edit`     | `ed`    | Compose Manuscript & Write to Editor  |

----------------------------------------------------------------

### `※` NOTES:

- Args for `prepare` match `entry` properties (below)
- Args for `insert` are ( `key`, `entry` )
- Args for `update` are ( `key`, `entry` )
- The `save` method accepts a `filename`(same as a `key`)
- Some methods allow an optional `key` argument
- Optional `keys` override the entire Manuscript default
- The `compose` method allows an optional `key`
- The `copy` method allows an optional `key`
- The `inspect` method allows an optional `key`

----------------------------------------------------------------

# Extended `tabulate` Methods

----------------------------------------------------------------

| Name    | Args  | Description                      |
|---------|-------|----------------------------------|
| `entry` | `key` | Tabulate a Single Entry (Record) |

----------------------------------------------------------------

# Entry Structure Properties

| Name       | Type   | Description   | Example |
|------------|--------|---------------|-----------------------|
| `title`    | String | Friendly Name | Example Web Page      |
| `address`  | String | URL Address   | `https://example.com` |
| `decal`    | String | Unicode Decal | `🌐`                  |
| `icon`     | String | Icon Filename | `example.png`         |
| `filename` | String | Rocket File Name | `example.html`     |

----------------------------------------------------------------

### `※` NOTES:

> Only `title` and `address` are required. Others are optional.

----------------------------------------------------------------

<footer>
  <input id="footer_input" onchange="perform(event)" />
</footer>

----------------------------------------------------------------

<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
;
; iwm = Object.keys( window ).sort()
;
</script>

<script>
;
; doc = document
; doc . title = ( `Rocket API Notes` )
;
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./../gems/core-ops.js"></script>
<script src="./../gems/veer.js"></script>
<script src="./../gems/interpreter-lite.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->


