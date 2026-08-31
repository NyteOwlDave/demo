<style>
@import url("./../../style/every-page.css");
</style>

[me-omega]:
<http://dave-omega/demo/web/peaches/garcia-002-notes.html>
"Omega Edition"

----------------------------------------------------------------

# Garcia Demo #002 Notes

> [Omega][me-omega]
> [File System](./)

----------------------------------------------------------------

# Color Scales

```
ck[ 0 ] = ( 158.80142  );
ck[ 1 ] = ( 191.584643 );
ck[ 2 ] = ( 208.12137  );
```

----------------------------------------------------------------

| Index | Channel | Scale |
|-------|---------|------------|
|   0   | Red     | 158.80142  |
|   1   | Green   | 191.584643 |
|   2   | Blue    | 208.12137  |

----------------------------------------------------------------

# Radius Constants

```
rho[ 0 ] = ( -2179.50995  );
rho[ 1 ] = ( -587.752974  );
rho[ 2 ] = ( -5.564929291 );

rho[ 3 ] = ( 1.0     );
rho[ 4 ] = ( -2500.0 );
rho[ 5 ] = ( -2500.0 );

rho[ 6 ] = ( -2179.50995  );
rho[ 7 ] = ( -5.564929291 );
rho[ 8 ] = ( -2179.50995  );

rho[  9 ] = ( 1.0              );
rho[ 10 ] = ( -3690.7116488281 );
rho[ 11 ] = ( -4577.45827      );
```

----------------------------------------------------------------

| Index | Value            | Coord | Term                   |
|-------|------------------|-------|------------------------|
| 0     | -2179.50995      | x1k   | cos( theta[ 0 ] ) / pi |
| 1     | -587.752974      | x1k   | cos( theta[ 0 ] )      |
| 2     | -5.564929291     | x1k   | sin( theta[ 2 ] )      |
| 3     | 1.0              | y1k   | sin( theta[ 2 ] ) / pi |
| 4     | -2500.0          | y1k   | sin( theta[ 1 ] )      |
| 5     | -2500.0          | y1k   | cos( theta[ 1 ] ) / pi |
| 6     | -2179.50995      | x2k   | cos( theta[ 0 ] ) / pi |
| 7     | -5.564929291     | x2k   | cos( theta[ 0 ] )      |
| 8     | -2179.50995      | x2k   | sin( theta[ 2 ] )      |
| 9     | 1.0              | y2k   | sin( theta[ 2 ] ) / pi |
| 10    | -3690.7116488281 | y2k   | sin( theta[ 1 ] )      |
| 11    | -4577.45827      | y2k   | cos( theta[ 1 ] ) / pi |

----------------------------------------------------------------

# Angles

```
theta[ 0 ] = 0.9999 * k;
theta[ 1 ] = 0.6666 * k;
theta[ 2 ] = 0.3333 * k;
```

----------------------------------------------------------------

# End Point Coordinates

```
x1k
= ( rho[ 0 ] ) * ( cos( theta[ 0 ] ) / pi )
+ ( rho[ 1 ] ) * ( cos( theta[ 0 ] )      )
+ ( rho[ 2 ] ) * ( sin( theta[ 2 ] )      );

y1k
= ( rho[ 3 ] ) * ( sin( theta[ 2 ] ) / pi )
- ( rho[ 4 ] ) * ( sin( theta[ 1 ] )      )
+ ( rho[ 5 ] ) * ( cos( theta[ 1 ] ) / pi );

x2k
= ( rho[ 6 ] ) * ( cos( theta[ 0 ] ) / pi )
+ ( rho[ 7 ] ) * ( cos( theta[ 0 ] )      )
+ ( rho[ 8 ] ) * ( sin( theta[ 2 ] )      );

y2k
= ( rho[  9 ] ) * ( sin( theta[ 2 ] ) / pi )
- ( rho[ 10 ] ) * ( sin( theta[ 1 ] )      )
+ ( rho[ 11 ] ) * ( cos( theta[ 1 ] ) / pi );
```

----------------------------------------------------------------

# Color Channels

```
fx2k = frac( x2k );
fy2k = frac( y2k );
py2k =100 * fy2k;

mx1y2 = midpt( x1k, y2k );
fx1y2 = abs( trunc( mx1y2 ) );

r = ( ck[ 0 ] ) + ( py2k )  * ( mx1y2 - fx1y2 );
g = ( ck[ 1 ] ) + ( py2k )  * ( fy2k ) ;
b = ( ck[ 2 ] ) + ( py2k )  * ( fx2k ) ;
```

----------------------------------------------------------------

# Peach Details

```
PEACH_KEY = ( `garcia-002.js` );
PRIMARY_HOST = ( `dave-tower` );
RECENT_HOST  = ( `dave-omega` );
```

----------------------------------------------------------------

# Math Methods

```

midpt =( a, b )=> abs( ( a + b ) / 2 );

frac =( n )=> ( abs( n ) - abs( trunc( n ) ) );

int =( n )=> Math.round( n );

pnt =( x, y )=> ( { x, y } );

```

----------------------------------------------------------------

# Color Conversion Method

```

rgb =( r, g, b )=> (
    Color.from_rgb(
        int( r ) % 225 ,
        int( g ) % 225 ,
        int( b ) % 225
    )
);

```

----------------------------------------------------------------

# Transform Methods

```

xform =( xc, yc, scale, aspect )=> {
    xform.xc     = xc;
    xform.yc     = yc;
    xform.scale  = scale;
    xform.aspect = aspect;
};

xform.apply = function( pts ) {
    function apply( pt ) {
        const m = xform;
        const x = m.xc + pt.x * m.scale * m.aspect;
        const y = m.yc + pt.y * m.scale;
        return pnt( x, y );
    }
    return pts.map( apply );
};

```

----------------------------------------------------------------

# Bezier Method

```

gfx = Graphics();

bezier =( pts )=> {
    gfx . beginPath()
    gfx . moveTo( pts[ 0 ].x, pts[ 0 ].y );
    gfx . bezierCurveTo(
        pts[ 1 ].x, pts[ 1 ].y,
        pts[ 2 ].x, pts[ 2 ].y,
        pts[ 3 ].x, pts[ 3 ].y
    );
    gfx . closePath()
    gfx . stroke();
};

```

----------------------------------------------------------------

<script>
; doc = document
</script>

<script>
function h1( i ) {
    const arr =( o )=> Array.from( o );
    const m = arr( doc.querySelectorAll( "H1" ) );
    return ( m[ i ] );
}
</script>

<script>
; doc . title = h1( 0 ).textContent;
</script>

