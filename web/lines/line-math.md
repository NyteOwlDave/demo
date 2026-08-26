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
\text{if  } ( | \Delta | \approx 0 ) \text {  error()}
$$

----------------------------------------------------------------

# Calculate Numerator ( `p` and `q` )

$$
F(a,b,c) = ((a-b) \cdot c)
$$

$$
p = F( B0_x, A0_x, U_y )
$$

$$
q = F( B0_y, A0_y, U_x )
$$

----------------------------------------------------------------

Note the this implies ( `p` - `q` ) is a __perpdot__ product
between vector `W` (`B0` - `A0`) and vector `U`.

$$
( p - q ) = ( \overrightarrow{W} ⟂ \overrightarrow{U} )
$$

I haven't defined `W` until now, though I sensed there was
an easier way to think about this as a __perpdot__.

----------------------------------------------------------------

# Calculate Mu ( `μ` )

----------------------------------------------------------------

$$
\mu = \frac { ( p - q ) } { \Delta }
$$

## Alternatively

$$
\mu = \frac
 { \overrightarrow{W} ⟂ \overrightarrow{U} }
 { \overrightarrow{U} ⟂ \overrightarrow{V} }
$$


----------------------------------------------------------------

# Calculate Intersection ( POI )

----------------------------------------------------------------

$$
F(O,t,R) = ( O + t \cdot R )
$$

$$
POI = F( A0, \mu, U )
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
| `B1` |  60 |  80 | Line 1 End Point   | <input type="color" /> |

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

<script>
function get_table_body( table_name ) {
    const index = Tables.indexOf( table_name );
    if ( index < 0 ) {
        const n = ( table_name );
        const s = ( `Invalid Table Name: ${tn}` );
        throw new Error( s );
    }
    const tables = all( "TABLE" );
    const te = tables[ index ];
    return ( te.tBodies[ 0 ] );
}
</script>

<script>
function read_variable_names( be ) {
    const rows = arr( be.rows );
    return (
        rows.map(
            ( r ) => ( r.cells[ 0 ].textContent )
        )
    );
}
</script>

<script>
function read_table_point( be, m, varname ) {
    const i = m.indexOf( varname );
    const re = be.rows[ i ];
    const x = read_table_cell( re.cells[ 1 ] );
    const y = read_table_cell( re.cells[ 2 ] );
    return { x, y };
} 
</script>

<script>
function read_table_cell( ce ) {
    const real =( s )=> {
        s = str( s );
        let n = parseFloat( s );
        return ( n || 0 );
    };
    let ie = ce.querySelector( "INPUT" );
    if ( ie ) { return real( ie.value ); }
    ie = elx( "INPUT" );
    ie . value = real( ce.textContent );
    ce . innerHTML = "";
    ce . appendChild( ie );
    return real( ie.value );
}
</script>

<script>
function read_input_values() {
    const be = get_table_body( "Variable Values" );
    const m = read_variable_names( be );
    const A0 = read_table_point( be, m, "A0" );
    const A1 = read_table_point( be, m, "A1" );
    const B0 = read_table_point( be, m, "B0" );
    const B1 = read_table_point( be, m, "B1" );
    return { A0, A1, B0, B1 };
}
</script>

<script>
function write_derived_lines( values ) {
    const be = get_table_body( "Derived Lines" );
    const m = read_variable_names( be );
    function compose_point( p ) {}
    const write_point =( varname, index, s )=> {
        const ri = m.indexOf( varname );
        const re = be.rows[ ri ];
        const ce = re.cells[ index ];
        ce.textContent = ( s );
    }
    let L = values.L0;
    let P0 = compose_point( L.p0 );
    let P1 = compose_point( L.p1 );
    write_point( "L0", 1, P0 );
    write_point( "L0", 2, P1 );
    L = values.L1;
    P0 = compose_point( L.p0 );
    P1 = compose_point( L.p1 );
    write_point( "L1", 1, P0 );
    write_point( "L1", 2, P1 );
};
</script>

<script>
function write_derived_vectors( values ) {
    // <<<===================================== TODO
};
</script>

<script>
function write_derived_scalars( values ) {
    // <<<===================================== TODO
};
</script>

<script>
function write_derived_values( values ) {
    write_derived_lines( values );
    write_derived_vectors( values );
    write_derived_scalars( values );
}
</script>

<script>
function render_sample() {
    if ( render_sample.paused ) {
        return;
    }
    const gfx = gid( "surface" );
    const values = read_input_values();
    solve_intersection( values );
    write_derived_values( values );
    draw_sample_line( values.L0, gfx );
    draw_sample_line( values.L1, gfx );
    draw_sample_point( values.A0, gfx );
    draw_sample_point( values.A1, gfx );
    draw_sample_point( values.B0, gfx );
    draw_sample_point( values.B1, gfx );
}
;
; render_sample_paused = ( false )
;
</script>

<script>
function draw_sample_line( line, gfx ) {
    gfx.beginPath();
    gfx.moveTo( line.p0.x, line.p0.y );
    gfx.lineTo( line.p1.x, line.p1.y );
    gfx.stroke();
};
</script>

<script>
function draw_sample_point( point, gfx ) {
    point = xform( point, gfx );
    const TAU   = 2 * Math.PI;
    const RHO   = 10;
    const THETA = 0;
    gfx.beginPath();
    gfx.ellipse( point.x, point.y, RHO, RHO, THETA, 0, TAU );
    gfx.closePath();
    gfx.fill();
};
</script>

<script>
function xform_point( point, gfx ) {
    const srf = gfx.canvas;
    const sw = srf.width;  const cx = w / 2;
    const sh = srf.height; const cy = h / 2;
    const k = xform_scale();
    const x = cx + point.x * k;
    const y = cy - point.y * k;
    return { x, y };
}
</script>

<script>
function xform_scale() {
    return ( xform_scale.value );
};
;
; xform_scale.value = 1.0
;
</script>

<script>
function animate() {
    if ( animate.running ) {
        try {
            clear_surface();
            render_sample();
            requestAnimationFrame( animate );
        } catch ( e ) {
            console.error( e );
            animate.stop();
        }
    }
}
;
; animate.running = ( false );
;
</script>

<script>
animate.start = function() {
    animate.running = ( true );
    console.log( `Starting Animation Loop` );
    animate.play();
    animate();
};
</script>

<script>
animate.stop = function() {
    animate.running = ( false );
    console.log( `Stopping Animation Loop` );
    animate.pause();
};
</script>

<script>
animate.pause = function() {
    render_sample.pause = ( true );
    console.log( `Animation Paused` );
};
</script>

<script>
animate.play = function() {
    if ( animate.running ) {
        render_sample.pause = ( false );
        console.log( `Animation Playing` );
    } else {
        animate.start();
    }
};
</script>

<script>
function VecAdd( v1, v2 ) {
    const x = v1.x + v2.x;
    const y = v1.y + v2.y;
    return { x, y };
}
</script>

<script>
function VecSub( v1, v2 ) {
    const x = v1.x - v2.x;
    const y = v1.y - v2.y;
    return { x, y };
}
</script>

<script>
function VecDot( v1, v2 ) {
    const xx = v1.x * v2.x;
    const yy = v1.y * v2.y;
    return ( xx + yy );
}
</script>

<script>
function VecPerpDot( v1, v2 ) {
    const xy = v1.x * v2.y;
    const yx = v1.y * v2.x;
    return ( xy - yx );
}
</script>

<script>
function VecProject( v, t, n ) {
    const x = v.x + t * n.x;
    const y = v.y + t * n.y;
    return { x, y };
}
</script>

<script>
function VecLength( v ) {
    return Math.hypot( v.y, v.x );
}
</script>

<script>
function VecAngle( v ) {
    return Math.atan2( v.y, v.x );
}
</script>

<script>
function VecDist( v1, v2 ) {
    return VecLength( VecSub( v2, v1 ) );
}
</script>

<script>
function solve_intersection( values ) {
    const A0 = values.A0;
    const A1 = values.A1;
    const B0 = values.B0;
    const B1 = values.B1;
    const U = VecSub( A1, A0 );
    const V = VecSub( B1, B0 );
    const W = VecSub( B0, A0 );
    const delta = VecPerpDot( U, V );
    if ( Math.abs( delta ) < 1e-8 ) {
        throw new Error( "Lines are Parallel" );
    }
    const gamma = VecPerpDot( W, V );
    const mu    = ( gamma / delta );
    const POI = VecProject( A0, mu, V );
    const L0 = { p0 : A0, p1 : A1 };
    const L1 = { p0 : B0, p1 : B1 };
    values.derived = {
          U, V, W
        , L0, L1
        , mu, gamma, delta
        , POI
    };
};
</script>

