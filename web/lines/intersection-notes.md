<style>
@import url("./../../style/every-page.css");
pre {
    max-width : calc( 100vw - 120px );
    margin-left : 30px;
}
</style>

----------------------------------------------------------------

# ( `===>>>` IMPORTANT `<<<===` )

----------------------------------------------------------------

> The `Gems` folder contains more notes, plus the Source Code 
> in JavaScript.

----------------------------------------------------------------

- Migrate those files to this folder ASAP!

----------------------------------------------------------------

# Line Intersection

----------------------------------------------------------------

# Introduction

This is a pretty important concept in 2D and 3D graphics. With
3D, it's more common to look for line-plane or line shape
intersections, so we'll focus on 2D for now.

----------------------------------------------------------------

# Class Definitions

In cases like this, it can be helpful to use the OOP paradigm
to define geometric constructs as classes.

We need only two and they can be very simple, with just a few
basic methods and properties.

We'll need a `Point` (vector) and a `Line` (segment).

----------------------------------------------------------------

# Point Class

This class needs two properties. One for each coordinate. It
also need a few methods.

```javascript

class Point {
    constructor( x, y ) {
        this.x = ( x || 0 );
        this.y = ( y || 0 );
    }
    add( other ) {
        const x = this.x + other.x;
        const y = this.y + other.y;
        return new Point( x, y );
    }
    sub( other ) {
        const x = this.x - other.x;
        const y = this.y - other.y;
        return new Point( x, y );
    }
    dot( other ) {
        const xx = this.x * other.x;
        const yy = this.y * other.y;
        return ( xx + yy );
    }
    perp( other ) {
        const xy = this.x * other.y;
        const yx = this.y * other.x;
        return ( xy - yx );
    }
    project( mu, norm ) {
        const x = ( this.x + mu * norm.x );
        const y = ( this.y + mu * norm.y );
        return new Point( x, y );
    }
}

Point.clone = function( other ) {
    return new Point( other.x, other.y );
};

Point.delta = function( va, vb ) {
    return va.perp( vb );
};

Point.mu = function( pa, pb, pc, pd ) {
	const u = pb.sub( pa );
	const v = pd.sub( pc );
	const delta = u.perp( v );
	if ( delta < 1e-08 ) { return NaN; }
	const w = pc.sub( pa );
	return ( w.perp( v ) / delta );
};

```

---------------------------------------------------------------

# Line Class

```javascript
class Line {
	constructor( ps, pe ) {
		this.origin = ps;
		this.terminus = pe;
	}
	get origin() {
		return Line.point( this.ps );
	}
	set origin( p ) {
		this.ps = Line.point( p );
	}
	get terminus() {
		return Line.point( this.pe );
	}
	set terminus( p ) {
		this.pe = Line.point( p );
	}
	sub vector() {
		const ps = this.origin;
		const pe = this.terminus;
		return ( pe.sub( ps ) );
	}
	sub length() {
		const v = this.vector();
		return Math.hypot( vy. v.x );
	}
	sub angle() {
		const v = this.vector();
		return Math.atan2( vy. v.x );
	}
	sub slope_dydx() {
		const v = this.vector();
		return ( v.y / v.x );
	}
	sub slope_dxdy() {
		const v = this.vector();
		return ( v.x / v.y );
	}
}
Line.point = function( o ) {
    if ( o instanceof Point  ) { return o; }
    let x=0, y=0;
    if ( o instanceof Object ) {
        x = ( o.x || 0 );
        y = ( o.y || 0 );
    }
    return new Point( x, y );
};
Line.vector = function( xs, ys, xe, ye ) {
	const dx = ( xe - xs );
	const dy = ( xe - xs );
    return new Point( dx, dy );
};
Line.distance = function( xs, ys, xe, ye ) {
	const dx = ( xe - xs );
	const dy = ( xe - xs );
    return Math.hypot( dy, dx );
};
Line.angle = function( xs, ys, xe, ye ) {
	const dx = ( xe - xs );
	const dy = ( xe - xs );
    return Math.atan2( dy, dx );
};
Line.polar = function( xs, ys, xe, ye ) {
	const dx = ( xe - xs );
	const dy = ( xe - xs );
    const rho = Math.atan2( dy, dx );
    const theta = Math.atan2( dy, dx );
	return { rho, theta };
};
Line.cartes = function( xs, ys, rho, theta ) {
	return xs + rho * Math.cos( theta );
	return ys + rho * Math.sin( theta );
};
```

---------------------------------------------------------------

# Intersection Function

```javascript
const intersection = function( line0, line1 ) {
	const ops = intersection;
    const v1 = line0.origin;   // O
    const v2 = line0.vector(); // U
    const v3 = line1.origin(); // Q
    const v4 = line1.vector(); // V
    const delta = v2.perp( v4 );
    if ( Math.abs( delta ) < ops.TINY ) {
      console.log("Parallel");
      return null; // Lines are parallel
    }
    const w = v3.sub( v1 );
    const mu = w.perp( v4 ) / delta;
    return v1.proj( mu, v2 );
}

intersection.TINY = 1e-8;
```

---------------------------------------------------------------

# BASIC Version

```

Sub Intersect (la As Line2, lb As Line2, poi As Point2)
    Dim O As Point2: O.x = la.xs: O.y = la.ys
    Dim P As Point2: P.x = lb.xs: P.y = lb.ys
    Dim U As Vec2: VecLine la, U
    Dim V As Vec2: VecLine lb, V
    Dim W As Vec2: VecSub T, S, W
    delta# = VecPerpDot#(U, V)
    ' Ignore Parallel Lines
    If (Abs(delta#) < TINY#) Then Exit Sub
    mu# = VecPerpDot#(W, V) / delta#
    VecProj O, mu#, U, poi
End Sub

```

---------------------------------------------------------------

# LaTex Version

```latex
$$
POI = \mu \cdot U + O
$$
$$
\mu = \frac {W \perp V} {U \perp V} = \frac {\alpha}{\Delta}
$$
$$
U = P-O, V=R-Q, W=Q-O
$$
```
---------------------------------------------------------------

# Diagram

$$
POI = \mu \cdot U + O
$$
$$
\mu = \frac {W \perp V} {U \perp V} = \frac {\alpha}{\Delta}
$$
$$
U = P-O, V=R-Q, W=Q-O
$$

<div style="text-align:center">
<img src="http://dave-tower/demo/web/art/fig/isect-2.png" width=400>
</div>

---------------------------------------------------------------


