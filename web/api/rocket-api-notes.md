
----------------------------------------------------------------

# Dorothy Rockets API

> ( `rocket-api-notes.md` )

----------------------------------------------------------------

| Manuscript Filename  |
|----------------------|
| dorothy-rockets.json |

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

| Name       | Args       | Description                         |
|------------|------------|-------------------------------------|
| `persist`  |            | Write Rocket Manuscript to Store    |
| `recover`  |            | Read Rocket Manuscript from Store   |
| `request`  | `url`      | Request Remote Rocket Manuscript    |
| `compose`  | `key`      | Compose Manuscript or Entry as JSON |
| `parse`    | `json`     | Parse JSON to Rocket Manuscript     |
| `tabulate` | `index`    | Tabulate Rocket Entries             |
| `inspect`  | `key`      | Show Entry Table in Console         |
| `contains` | `key`      | True if Rocket Key Exists           |
| `prepare`  | `※`       | Prepare Entry from Field Values     |
| `delete`   | `key`      | Delete Rocket Entry                 |
| `insert`   | `※`       | Insert New Rocket Entry             |
| `update`   | `※`       | Update Existing Rocket Entry        |
| `read`     | `key`      | Read Existing Rockey Entry          |
| `select`   | `rex`      | Search for Matching Rocket Entries  |
| `index`    | `rex`      | Select Matching Rockey Keys         |
| `launch`   | `key`      | Launch a Rocket                     |
| `save`     | `filename` | Save Manuscript to JSON File        |
| `edit`     | `ed`       | Compose Manuscript & Write to Editor |

----------------------------------------------------------------

### `※` Notes

- Args for `prepare` match `entry` properties (below)
- Args for `insert` are ( `key`, `entry` )
- Args for `update` are ( `key`, `entry` )

----------------------------------------------------------------

# Extended `tabulate` Methods

----------------------------------------------------------------

| Name    | Args       | Description                       |
|---------|------------|-----------------------------------|
| `entry` | `key`      |                                   |

----------------------------------------------------------------

# Entry Properties

| title 
| address
| decal
| icon

