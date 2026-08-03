<head> <link rel="icon" href="./favicon.ico" /> </head>

----------------------------------------------------------------

# Mandelbrot 3D

> ( `mandelbrot-3d.bas` )

----------------------------------------------------------------

## Source Code

> [mandelbrot-3d.bas](./mandelbrot-3d.bas)

----------------------------------------------------------------

## Coordinate Ranges

```javascript

x_lo = -2.0
x_hi = 0.5

y_lo = -1.25
y_hi = 1.25

z_lo = -1.25
z_hi = 1.25

```

----------------------------------------------------------------

## Normal Vector

```javascript

function normal_vec( x, y, z ) {
   const w = x*x + y*y + z*z;
   if ( k < 1e-20 ) {
       return [ 1, 0, 0, 1 ];
   } else {
       const t = 1 / sqrt( w );
       return [ t*x, t*y, t*z, w ];
   }
}

```

----------------------------------------------------------------

## Rotation Matrix

```javascript

function mtx_rotate( x, y, z, m ) {

	c = cos( theta );
	s = sin( theta );
	t = 1 - c;

	n = normal_vec( x, y, z )
	x = n[ 0 ]
	y = n[ 1 ]
	z = n[ 2 ]

	m[0][0] = t*x*x + c;
	m[0][1] = t*x*y - z*s;
	m[0][2] = t*x*z + y*s;

	m[1][0] = t*x*y + z*s;
	m[1][1] = t*y*y + c;
	m[1][2] = t*y*z - x*s;

	m[2][0] = t*x*z - y*s;
	m[2][1] = t*y*z + x*s;
	m[2][2] = t*z*z + c;

}

```

----------------------------------------------------------------

# References

[euclidean]:
<https://www.euclideanspace.com/maths/algebra/matrix/transforms/index.htm>

[gemini-chat]:
<https://share.gemini.google/Hxg2lJx4Twi8>

----------------------------------------------------------------

> [Gemini Chat][gemini-chat]
> [Euclidean Space][euclidean]

----------------------------------------------------------------

<style>
@import url("./../style/every-page.css");
</style>


