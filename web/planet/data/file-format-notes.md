
<style>
@import url("./../../../style/every-page.css");
pre {
    max-width : calc( 100vw - 120px );
    margin-left : 30px;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

----------------------------------------------------------------

# File Formats

> ( `3D Planet Demo` )

----------------------------------------------------------------

# 3DP Format

----------------------------------------------------------------

This format represents a complete __3D Planet Definition__.

It's encoded as <i>plain text</i>.

----------------------------------------------------------------

```3dp
ncs planet 2020
pitch n
roll n
yaw n
scale n
slices n
begin palette
r g b
...
end palette
begin texture
size n
texel
...
end texture
```

----------------------------------------------------------------

## NOTES:

- Empty lines are removed
- Leading/trailing whitespace (per line) is removed
- Any line beginning with "#" is a comment
- Comments are removed
- (required) Version string must be exact (all tokens match)
- (optional) Spin rate is an integer in [-5 ... +5]
- Pitch, roll and yaw are integers in [-360 ... +360]
- Color r, g, b are integers in [0 ... 255]
- Scale is an integer in [1 ... 5]
- Slices in an integer in [0 ... 2]
- Internally, aspect = 1/(slices+1)
- The size is an integer in [64, 128, 256]
- Size represents both w and h of the texture (w=size, h=size)
- Total texel count = size*size
- Each texel is a decimal integer (an index into the palette)
- Each texture line contains 20 texels (typically)
- Whitespace is ignored except as a token separator (when applicable)
- Unrecognized/missing tokens throw an exception
- Out of range numbers are clamped to sane limits
- Missing/malformed numbers are provided a default
- Extra colors are ignored
- Missing/malformed colors are provided a default
- If entire palette is missing, the default is gray scale
- Extra texels are ignored
- Missing/malformed texels are provided a default
- If entire texture is missing, the default is an NCS Logo

----------------------------------------------------------------

# Header

```
ncs planet 2020
```

----------------------------------------------------------------

Every `3DP` file must contain the above header signature
validation purposes.

----------------------------------------------------------------

# Schema

----------------------------------------------------------------

## State Variables

| Variable | Format  | Purpose |
|----------|---------|---------------------------------------|
| pitch    | Integer | Planet's Pitch (X rotation)           |
| roll     | Integer | Planet's Roll (Y rotation)            |
| yaw      | Integer | Planet's Yaw (Z rotation)             |
| scale    | Integer | Planet's Scale                        |
| slices   | Integer | Number of Vertical Slices             |

----------------------------------------------------------------

## Number Ranges

| Name     | Format  | Min  | Max  | Typical |
|----------|---------|------|------|------------------------|
| pitch    | Integer | -360 | +360 | 0                      |
| roll     | Integer | -360 | +360 | 0                      |
| yaw      | Integer | -360 | +360 | 0                      |
| scale    | Integer | 0    |  5   | 1                      |
| slices   | Integer | 0    |  2   | 1                      |

----------------------------------------------------------------

# Palette Structure (`PAL` File)

----------------------------------------------------------------

```
begin palette
r g b
...
end palette
```
----------------------------------------------------------------

The __Palette Block__ is limited with `begin` and `end` 
keywords.

----------------------------------------------------------------

To identify the block as a palette, the `palette` keyword
must follow each delimiter.

----------------------------------------------------------------

Within the block are `RGB` colors. There must be 256 for
proper scene rendering.

----------------------------------------------------------------

# RGB Structure

----------------------------------------------------------------

| Field | Type    | Purpose |
|-------|---------|---------|
|   r   | Integer | Red Component   |
|   g   | Integer | Green Component |
|   b   | Integer | Blue Component  |

----------------------------------------------------------------

# Texture Format (`TEX` File)

----------------------------------------------------------------

```
begin texture
size n
texel
...
end texture
```

----------------------------------------------------------------


