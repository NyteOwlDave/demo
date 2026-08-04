
/*
    mandelbulb.js
*/

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

    const vw = ScreenResolution.w;
    const vh = ScreenResolution.h;

    for ( let y=0; y < vw; y += 1 ) {

        for ( let x=0; x < vh; x += 1 ) {

            // Calculate ray direction for this pixel
            CalculateRayDirection(
                x, y, vw, vh,
                CameraPosition, RayDirection
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

function MarchRay(
  RayDirection
, MaxDistance
, MaxRaySteps
, HitThreshold
, CameraPosition
) {

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

function ComputeShading(
  Position
, Normal
, Iterations
) {

    const v1 = {};
    const v2 = {};

    const LightDirection = {};

    const FinalColor = {};
    const BaseColor = {};

    Vec3( 1.0, 1.0, -1.0, v1 );
    VecSub3( v1, Position, v2 );
    VecNorm3( v2, LightDirection );

    // Simple Diffuse Shading ( Lambertian )
    DiffuseIntensity = VecDot3(
          Normal
        , LightDirection
    );

    if ( 0 >= DiffuseIntensity ) {
        return _RGB( 0, 0, 0 );
    }

    // Escape-time color mapping mixed with lighting
    MapIterationsToColor(
          Iterations
        , BaseColor
    );

    ScaleRGB( BaseColor, DiffuseIntensity, FinalColor );

    return FinalColor;
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function MapIterationsToColor(
    Iterations
) {
    let pal = FractalPalette;
    function rgb( entry ) {
        return _RGBA( entry[ 0 ], entry[ 1 ], entry[ 2 ] );
    }
    if ( Array.isArray( pal[ 0 ] ) ) {
        pal = FractalPalette = pal.map( rgb );
    }
    const ratio = Median( Iterations / 64, 0.0, 1.0 );
    const index = Floor( ratio * pal.length );
    return pal[ index ];
}

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

function CalculateRayDirection(
  x , y
, vw, vh
, CameraPosition
, RayDirection
) {
    // TODO ...
    const dx = Ca
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

    VecCopy3( PositionC, VectorZ );

    let Derivative_dr = 1.0;    // Running derivative tracker
    let Radius_r = 0.0;
    let Power_n = 8.0;          // Standard Mandelbulb order

    let MaxFractalIterations = 64;
    let TotalIterationsRun;

    TotalIterationsRun = 0

    for ( let i=0; i < MaxFractalIterations; i += 1 ) {

        TotalIterationsRun = i;
        Radius_r = VecLen3( VectorZ );

        // If point escapes the bailout radius
        // it is outside the fractal
        if ( Radius_r > 2.0 ) {
            break;
        }

        // Cartesian => Spherical
        let Theta = ACos  ( VectorZ.y / Radius_r );
        let Phi   = Atan2 ( VectorZ.x, VectorZ.z );

        // Update the derivative tracker
        Derivative_dr = (
            Pow( Radius_r, ( Power_n - 1.0 ) )
        ) * Power_n * Derivative_dr + 1.0;

        // Scale the radius and multiply the spherical angles
        let ScaledRadius = Pow( Radius_r, Power_n );
        Theta = ( Theta * Power_n );
        Phi   = ( Phi   * Power_n );

        let st = Sin( Theta ), sp = Sin( Phi );
        let ct = Cos( Theta ), cp = Cos( Phi );

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

    const v1 = {}, v2 = {};

    Vec3( Position.x + Epsilon, Position.y, Position.z, v1 );
    Vec3( Position.x - Epsilon, Position.y, Position.z, v2 );

    // Sample distances slightly offset on each axis
    EstimateFractalDistance( v1, result );
    DistanceX1 = result.DistanceEstimate;
    EstimateFractalDistance( v2, result );
    DistanceX2 = result.DistanceEstimate;

    Vec3( Position.x, Position.y + Epsilon, Position.z, v1 );
    Vec3( Position.x, Position.y - Epsilon, Position.z, v2 );

    EstimateFractalDistance( v1, result );
    DistanceY1 = result.DistanceEstimate;
    EstimateFractalDistance( v2, result );
    DistanceY2 = result.DistanceEstimate;

    Vec3( Position.x, Position.y, Position.z + Epsilon, v1 );
    Vec3( Position.x, Position.y, Position.z - Epsilon, v2 );

    EstimateFractalDistance( v1, result );
    DistanceZ1 = result.DistanceEstimate;
    EstimateFractalDistance( v2, result );
    DistanceZ2 = result.DistanceEstimate;

    // Compute gradient vector
    Vec3(
        DistanceX1 - DistanceX2,
        DistanceY1 - DistanceY2,
        DistanceZ1 - DistanceZ2,
        v1
    );

    VecNorm3( v1, Normal );
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

