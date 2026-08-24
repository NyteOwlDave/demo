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
        const xx = this.x * other.y;
        const yy = this.y * other.x;
        return ( xy - yx );
    }
    project( mu, norm ) {
        const x = this.x + mu * norm.x;
        const y = this.y + mu * norm.y;
        return new Point( x, y );
    }
}

Point.clone = function( other ) {
    return new Point( other.x, other.y );
};

Point.delta = function( va, vb ) {
    return va.perp( vb );
};

Point.mu = function( pa, pb, pc, pd, va, vb, delta ) {
    const nx = ( ( pc.x - pa.y ) * va.x );
    const ny = ( ( pd.y - pa.x ) * vb.y );
    return ( ( nx - ny ) / delta );
};

```

---------------------------------------------------------------

# Intersection Function

```javascript
const intersection = function(line0, line1) {
	const ops = intersection
    const v1 = line0.p0;
    const v2 = line0.p1.minus(v1);
    const v3 = line1.p0;
    const v4 = line1.p1.minus(v3);
    const delta = v2.x*v4.y - v2.y*v4.x;
    if ( Math.abs( delta ) < ops.TINY ) {
      console.log("Parallel");
      return null; // Lines are parallel
    }
    const mu = ( ((v3.x-v1.x)*v4.y) - ((v3.y-v1.y)*v4.x) ) / delta;
    return new Point(
        v1.x + mu * v2.x,
        v1.y + mu * v2.y
    );
}

intersection.TINY = 1e-8;
```

---------------------------------------------------------------

