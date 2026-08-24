<style>
@import url("./../../style/every-page.css");
pre {
    max-width : calc( 100vw - 120px );
    margin-left : 30px;
}
canvas {
    background : black;
    border     : 1px dashed gold;
    width      : 640px;
    height     : 480px;
}
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/lines/line-math.html>
"Omega Edition"

[me-tower]:
<http://dave-tower/demo/web/lines/line-math.html>
"Tower Edition"

<script>
; iwm = Object.keys( window ).sort()
</script>

----------------------------------------------------------------

# Line Math

<script>
; doc = document
; doc . title = ( `Line Math` )
</script>

----------------------------------------------------------------

> [Omega][me-omega]
> [Tower][me-tower]
> [File System](./)

----------------------------------------------------------------

| Name     | Type  | Group   | Description                 |
|----------|-------|---------|-----------------------------|
| `POI`    | Point | Result  | Point of Intersection       |
| `A0`     | Point | Origin  | Line 0 Start Point          |
| `A1`     | Point | Origin  | Line 0 End Point            |
| `B0`     | Point | Subject | Line 1 Start Point          |
| `B1`     | Point | Subject | Line 1 End Point            |
| `L0`     | Line  | Origin  | Line 0 { A0 , A1 }          |
| `L1`     | Line  | Subject | Line 1 { B0 , B1 }          |
| `U`      | Vec   | Origin  | Line 0 Vector               |
| `V`      | Vec   | Subject | Line 1 Vector               |
| `μ`      | Real  | Slope   | Scale for Ray Projection    |
| `Δ`      | Real  | Denom   | Denominator for mu          |
| `p`      | Real  | Numer   | LHS Numerator for mu        |
| `q`      | Real  | Numer   | RHS Numerator for mu        |

<script>
Tables = [ "Line Intersection Table" ];
</script>

----------------------------------------------------------------

# Symbols

| Symbol | Meaning |
|--------|-------------------|
|  `μ`   | Mu (Slope)        |
|  `Δ`   | Delta             |
|  `⟂`   | Perp-Dot Product  |
|  `∥`   | Parallel Lines    |

<script>
Tables.push( "Symbols" );
</script>

----------------------------------------------------------------

# Calculate `U` and `V`

----------------------------------------------------------------

$$
\overrightarrow{U} = ( A1 - A0 )
$$

----------------------------------------------------------------

$$
\overrightarrow{V} = ( B1 - B0 )
$$

----------------------------------------------------------------

# Calculate Delta ( `Δ` )

----------------------------------------------------------------

$$
\Delta = ( \overrightarrow{U} ⟂ \overrightarrow{V} )
$$

----------------------------------------------------------------

# Check for Parallel Lines ( L0 `∥` L1 )

$$
\text{if  } ( \Delta \approx 0 ) \text {  error()}
$$

----------------------------------------------------------------

# Calculate Numerator ( `p` and `q` )

$$
F(a,b,c) = ((a-b) \cdot c)
$$

$$
p = F( B0_x, A0_x, V_x )
$$

$$
q = F( B0_y, A0_y, V_y )
$$

----------------------------------------------------------------

# Calculate Mu ( `μ` )

----------------------------------------------------------------

$$
\mu = \frac { ( p - q ) } { \Delta }
$$

----------------------------------------------------------------

# Calculate Intersection ( POI )

----------------------------------------------------------------

$$
F(O,t,R) = ( O + t \cdot R )
$$

$$
POI = F( A0, \mu, V )
$$

----------------------------------------------------------------

# Try It Out

----------------------------------------------------------------

## POI

> <code id="poi">?</code>

----------------------------------------------------------------

## Variable Values

| 🔑   | X   |  Y  |  Hint              | Color |
|------|-----|-----|--------------------|------------------------|
| `A0` |  10 | 470 | Line 0 Start Point | <input type="color" /> |
| `A1` | 630 |  10 | Line 0 End Point   | <input type="color" /> |
| `B0` | 400 | 410 | Line 1 Start Point | <input type="color" /> |
| `B1` |  60 | 80  | Line 1 End Point   | <input type="color" /> |

<script>
Tables.push( "Variable Values" );
</script>

----------------------------------------------------------------

## Rendered Sample

<div center>
<canvas id="surface"></canvas>
</div>

----------------------------------------------------------------

## Derived Lines

| 🔑   | P0 | P1 | Hint |
|------|----|----|-------------------|
| `L0` | ?  | ?  | Line 0 ( A0, A1 ) |
| `L1` | ?  | ?  | Line 1 ( B0, B1 ) |

<script>
Tables.push( "Derived Lines" );
</script>

----------------------------------------------------------------

## Derived Vectors

| 🔑  | X | Y | Hint |
|-----|---|---|----------------|
| `U` | ? | ? | Line 0 Vector  |
| `V` | ? | ? | Line 1 Vector  |

<script>
Tables.push( "Derived Vectors" );
</script>

----------------------------------------------------------------

## Derived Scalars

| 🔑  | Value  | Hint |
|-----|--------|---------------|
| `p` |   ?    | LHS Numerator |
| `q` |   ?    | RHS Numerator |
| `Δ` |   ?    | Denominator   |
| `μ` |   ?    | Mu (Slope)    |

<script>
Tables.push( "Derived Scalars" );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function find_table( title ) {
    const i = Tables.indexOf( title );
    if ( i < 0 ) { return; }
    const m = all( "TABLE" );
    return m[ i ];
}
</script>

<script src="./../gems/core-ops.js"></script>


