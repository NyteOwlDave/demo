<style>
@import url("./../../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/web/gems/refract-notes.html>
"Omega Edition"

[me-tower]:
<http://dave-tower/demo/web/gems/refract-notes.html>
"Tower Edition"

----------------------------------------------------------------

# Refraction and Reflection Notes

----------------------------------------------------------------

> [Omega][me-omega]
> [Tower][me-tower]
> [File System](./)

----------------------------------------------------------------

# reflect

----------------------------------------------------------------

```
/**
 * Calculates the reflected ray vector.
 * @param {number[]} I - Normalized incoming ray direction vector [x, y, z]
 * @param {number[]} N - Normalized surface normal vector [x, y, z]
 * @returns {number[]} Normalized reflected vector.
 */
function reflect( I, N ) {

    // 1. Calculate the dot product of I and N
    const dotNI = I[ 0 ] * N[ 0 ] + I[ 1 ] * N [1 ] + I[ 2 ] * N[ 2 ];

    // 2. Compute the components of the reflected vector
    const R = [
        I[ 0 ] - 2.0 * dotNI * N[ 0 ] ,
        I[ 1 ] - 2.0 * dotNI * N[ 1 ] ,
        I[ 2 ] - 2.0 * dotNI * N[ 2 ]
    ];

    return R;
}

```

----------------------------------------------------------------

# refract

----------------------------------------------------------------

```

/**
 * Calculates the refracted ray vector.
 * @param {number[]} I - Normalized incoming ray direction vector [x, y, z]
 * @param {number[]} N - Normalized surface normal vector [x, y, z]
 * @param {number} eta - Ratio of refractive indices (n1 / n2)
 * @returns {number[]|null} Normalized refracted vector, or null if Total Internal Reflection occurs.
 */
function refract( I, N, eta ) {

    // 1. Calculate the dot product of I and N
    const dotNI = I[ 0 ] * N[ 0 ] + I[ 1 ] * N[ 1 ] + I[ 2 ] * N[ 2 ];

    // 2. Calculate the discriminant for Total Internal Reflection
    const k = 1.0 - eta * eta * ( 1.0 - dotNI * dotNI );

    // 3. Check for Total Internal Reflection
    if ( k < 0.0 ) {
        return null;
    }

    // 4. Compute the components of the refracted vector
    const mu = eta * dotNI + Math.sqrt( k );

    const R = [
        eta * I[ 0 ] - mu * N[ 0 ] ,
        eta * I[ 1 ] - mu * N[ 1 ] ,
        eta * I[ 2 ] - mu * N[ 2 ]
    ];

    return R;
}

```

----------------------------------------------------------------

# refract.test

----------------------------------------------------------------

```
refract.test = function() {

	// Step 1: Define materials and calculate index ratio (eta)
	const n1 = 1.0; // Air
	const n2 = 1.5; // Glass
	const eta = n1 / n2;

	// Step 2: Define and normalize your input vectors
	// Incoming ray pointing down and right:
	// 	[ 1, -1, 0 ] normalized
	const incomingRay = [ Math.SQRT1_2, -Math.SQRT1_2, 0 ];

	// Surface normal pointing straight up: [ 0, 1, 0 ]
	const surfaceNormal = [ 0, 1, 0 ];

	// Step 3: Run the calculation
	const refractedRay = refract(
		 incomingRay
	   , surfaceNormal
	   , eta
	);

	// Step 4: Output results
	if ( refractedRay === null ) {
    	console.log( "Total Internal Reflection occurred!" );
	} else {
		let rx = refractedRay[ 0 ].toFixed( 4 );
		let ry = refractedRay[ 0 ].toFixed( 4 );
		let rz = refractedRay[ 0 ].toFixed( 4 );
    	console.log( "Refracted Vector X:", rx );
    	console.log( "Refracted Vector Y:", ry );
    	console.log( "Refracted Vector Z:", rz );
	}
}

```

----------------------------------------------------------------

<footer id="footer">
  <input id="footer_input" onchange="perform(event)" />
</footer>

----------------------------------------------------------------

<script>
; iwm = Object.keys( window ).sort()
</script>

<script>
; doc = document
</script>

<script>
; cls =()=> console.clear()
; agn =()=> window.reload()
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script src="./core-ops.js"></script>
<script src="./refract.js"></script>

<script src="./../api/core-api.js"></script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
function main( event ) {
    try {
        
    } catch ( e ) {
        alert ( e )
        throw ( e )
    }
}
</script>

<script>
addEventListener( "load", main );
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

