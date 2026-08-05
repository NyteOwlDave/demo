
/*
    mandelbulb.js
*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

FractalPalette = [
  [ 128, 128, 128 ]
, [ 128, 128, 255 ]
, [ 128, 255, 128 ]
, [ 128, 255, 255 ]
, [ 255, 128, 128 ]
, [ 255, 128, 255 ]
, [ 255, 255, 128 ]
, [ 255, 255, 255 ]
];

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*

IN:

    CameraPosition   : Vec3
    ScreenResolution : Size
    MaxRaySteps      : Integer
    HitThreshold     : Real
    MaxDistance      : Real

*/

function RenderMandelbulb(
  CameraPosition
, ScreenResolution
, MaxDistance
, MaxRaySteps
, HitThreshold
) {

	const RayDirection= {};

    const vw = ScreenResolution.w;
    const vh = ScreenResolution.h;

	const cx  = vw / 2;
	const cy  = vh / 2;

    for ( let y=0; y < vh; y += 1 ) {

        for ( let x=0; x < vw; x += 1 ) {

			UpdateProgress( (x+1) / vw, (y+1) / vh );

            // Calculate ray direction for this pixel
            CalculateRayDirection(
                x, y, cx, cy
                , CameraPosition
				, RayDirection
            );

            // March Ray to Determine Color
            PixelColor = MarchRay(
                  RayDirection
                , MaxDistance
                , MaxRaySteps
                , HitThreshold
                , CameraPosition
            );

            // Draw Pixel
            SetPixel( x, y, PixelColor )

        }

    }

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function CalculateRayDirection(
  x , y
, cx, cy
, CameraPosition
, RayDirection
) {
	const scale = 1 / Min( cx, cy );
	x = ( x - cx + 0.5 ) * scale;
	y = ( y - cy + 0.5 ) * scale;
	const v1 = Vec3( x, y, 1 );
	const v2 = VecSub3( v1, CameraPosition );
	VecNorm3( v2, RayDirection );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function MarchRay(
  RayDirection
, MaxDistance
, MaxRaySteps
, HitThreshold
, CameraPosition
) {

	const C_BGND = _RGB( 84, 84, 32 );

    const SurfaceNormal = {};
    const CurrentPosition = {};
    const Offset = {};
    const result = {};

    // Initialize marching parameters
    let TotalDistanceMarched = 0.0;
    let HasHitSurface        = false;
    let IterationCount       = 0;

    let DistanceToSurface, EscapeIterations;

    // March the Ray through space
    while (
         ( TotalDistanceMarched < MaxDistance )
      && ( IterationCount < MaxRaySteps )
    ) {

        VecScale3(
              RayDirection
            , TotalDistanceMarched
            , Offset
        );

        VecAdd3(
            CameraPosition
          , Offset
          , CurrentPosition
        );

        // Get safe distance to closest fractal surface
        EstimateFractalDistance(
             CurrentPosition
           , result
        );

        DistanceToSurface = result . DistanceToSurface;
        EscapeIterations  = result . EscapeIterations;

        // Check if ray hit the Mandelbulb
        if ( DistanceToSurface < HitThreshold ) {
            HasHitSurface = true;
            break;
        }

        // Advance the ray forward safely
        TotalDistanceMarched = (
             TotalDistanceMarched
           + DistanceToSurface
        );

        IterationCount = IterationCount + 1;

    }

    // Shade pixel based on hit result
    if ( HasHitSurface ) {
        CalculateNormal( CurrentPosition, SurfaceNormal );
        PixelColor = ComputeShading(
              CurrentPosition
            , SurfaceNormal
            , EscapeIterations
        );
    } else {
        PixelColor = C_BGND;
    }

    return PixelColor;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*

IN:

    PositionC : Vec3

OUT:

    result : {
        DistanceEstimate   : Real
        TotalIterationsRun : Integer
    }

*/

function EstimateFractalDistance( PositionC, result ) {

	const VectorZ = {};

    const Power_n = 8.0; // Standard Mandelbulb order
    const MaxFractalIterations = 64;

    let Derivative_dr = 1.0;  // Running derivative tracker

	let st, ct, sp, cp, dd;
    let Radius_r;
	let ScaledRadius, Theta, Phi;
    let TotalIterationsRun;

    VecCopy3( PositionC, VectorZ );

    for ( let i=0; i < MaxFractalIterations; i += 1 ) {

        TotalIterationsRun = i;
        Radius_r = VecLen3( VectorZ );

        // If point escapes the bailout radius
        // it is outside the fractal
        if ( Radius_r > 2.0 ) {
            break;
        }

        // Cartesian => Spherical
        Theta = ACos  ( VectorZ.y / Radius_r );
        Phi   = ATan2 ( VectorZ.x, VectorZ.z );

        // Update the derivative tracker
		dd = Pow( Radius_r, ( Power_n - 1.0 ) );
        Derivative_dr = (
            dd * Power_n * Derivative_dr + 1.0
        );

        // Scale the radius and multiply the spherical angles
        ScaledRadius = Pow( Radius_r, Power_n );
        Theta = ( Theta * Power_n );
        Phi   = ( Phi   * Power_n );

        st = Sin( Theta ); sp = Sin( Phi );
        ct = Cos( Theta ); cp = Cos( Phi );

        // Spherical => Cartesian
        // ( VectorZ = Z^n + C )
        VectorZ.x = ScaledRadius * st * sp;
        VectorZ.y = ScaledRadius * ct;
        VectorZ.z = ScaledRadius * st * cp;
        VecAdd3( VectorZ, PositionC, VectorZ );

    }

    // Hubbard-Douady distance estimator formula
    result.DistanceEstimate = (
        0.5 * Log( Radius_r ) * Radius_r / Derivative_dr
    );

    // For Color Calculation
    result.TotalIterationsRun = TotalIterationsRun;

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/*

IN:
    Position : Vec3

OUT:
    Normal   : Vec3

*/
function CalculateNormal( Position, Normal ) {

    // Tiny offset to sample surrounding points
    const Epsilon = 0.001;

    // For EstimateFractalDistance
    const result = {};

    let v1 = {}, v2 = {};

    v1 = Vec3( Position.x + Epsilon, Position.y, Position.z );
    v2 = Vec3( Position.x - Epsilon, Position.y, Position.z );

    // Sample distances slightly offset on each axis
    EstimateFractalDistance( v1, result );
    DistanceX1 = result.DistanceEstimate;
    EstimateFractalDistance( v2, result );
    DistanceX2 = result.DistanceEstimate;

    v1 = Vec3( Position.x, Position.y + Epsilon, Position.z );
    v2 = Vec3( Position.x, Position.y - Epsilon, Position.z );

    EstimateFractalDistance( v1, result );
    DistanceY1 = result.DistanceEstimate;
    EstimateFractalDistance( v2, result );
    DistanceY2 = result.DistanceEstimate;

    v1 = Vec3( Position.x, Position.y, Position.z + Epsilon );
    v2 = Vec3( Position.x, Position.y, Position.z - Epsilon );

    EstimateFractalDistance( v1, result );
    DistanceZ1 = result.DistanceEstimate;
    EstimateFractalDistance( v2, result );
    DistanceZ2 = result.DistanceEstimate;

    // Compute gradient vector
    v1 = Vec3(
        DistanceX1 - DistanceX2,
        DistanceY1 - DistanceY2,
        DistanceZ1 - DistanceZ2
    );

    VecNorm3( v1, Normal );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function ComputeShading(
  Position
, Normal
, Iterations
) {

    const v1 = Vec3( 1.0, 1.0, -1.0 );
    const v2 = VecSub3( v1, Position );

    const LightDirection = VecNorm3( v2 );

    // Simple Diffuse Shading ( Lambertian )
    const DiffuseIntensity = VecDot3(
          Normal
        , LightDirection
    );

	// No Diffuse Light?
    if ( 0 >= DiffuseIntensity ) {
        return _RGB( 0, 0, 0 );
    }

    // Escape-time color mapping mixed with lighting
	const BaseColor = MapIterationsToColor(
  		Iterations
    );

	// Account for Diffusion
    return ScaleRGB( BaseColor, DiffuseIntensity );

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function MapIterationsToColor(
    Iterations
) {
    let pal = FractalPalette;
    function rgb( entry ) {
        return _RGB( entry[ 0 ], entry[ 1 ], entry[ 2 ] );
    }
	// If Palette isn't Initialized
	// convert Table to Array of RGB Objects
    if ( Array.isArray( pal[ 0 ] ) ) {
        pal = FractalPalette = pal.map( rgb );
    }
    const ratio = Median( Iterations / 64, 0.0, 1.0 );
    const index = Floor( ratio * pal.length );
    return ( pal[ index ] );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


