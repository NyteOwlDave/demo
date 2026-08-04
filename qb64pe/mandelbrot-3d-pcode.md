
----------------------------------------------------------------

# Mandelbrot 3D Pseudocode

----------------------------------------------------------------

## Prompt: how to render a Mandelbulb fractal

----------------------------------------------------------------

## Response 1 : RenderMandelbulb

```
FUNCTION RenderMandelbulb(CameraPosition, ScreenResolution, MaxRaySteps, HitThreshold, MaxDistance):
    FOR EACH Pixel (x, y) ON ScreenResolution:
        // 1. Calculate ray direction for this pixel
        RayDirection = CalculateRayDirection(Pixel.x, Pixel.y, CameraPosition)

        // 2. Initialize marching parameters
        TotalDistanceMarched = 0.0
        HasHitSurface = FALSE
        IterationCount = 0

        // 3. March the ray through space
        WHILE TotalDistanceMarched < MaxDistance AND IterationCount < MaxRaySteps:
            CurrentPosition = CameraPosition + (RayDirection * TotalDistanceMarched)

            // Get safe distance to closest fractal surface
            DistanceToSurface, EscapeIterations = EstimateFractalDistance(CurrentPosition)

            // Check if ray hit the Mandelbulb
            IF DistanceToSurface < HitThreshold:
                HasHitSurface = TRUE
                BREAK
            END IF

            // Advance the ray forward safely
            TotalDistanceMarched = TotalDistanceMarched + DistanceToSurface
            IterationCount = IterationCount + 1
        END WHILE

        // 4. Shade the pixel based on hit result
        IF HasHitSurface == TRUE:
            SurfaceNormal = CalculateNormal(CurrentPosition)
            PixelColor = ComputeShading(CurrentPosition, SurfaceNormal, EscapeIterations)
        ELSE:
            PixelColor = BackgroundColor (e.g., Black)
        END IF

        WritePixel(Pixel.x, Pixel.y, PixelColor)
    END FOR EACH
END FUNCTION

```

----------------------------------------------------------------

## Response 2 : EstimateFractalDistance

```

FUNCTION EstimateFractalDistance(PositionC):
    VectorZ = PositionC      // Initialize Z_0 = C
    Derivative_dr = 1.0       // Running derivative tracker
    Radius_r = 0.0
    Power_n = 8.0            // Standard Mandelbulb order
    MaxFractalIterations = 64
    TotalIterationsRun = 0

    FOR i FROM 0 TO MaxFractalIterations:
        TotalIterationsRun = i
        Radius_r = Magnitude(VectorZ)   // sqrt(x^2 + y^2 + z^2)

        // If point escapes the bailout radius, it is outside the fractal
        IF Radius_r > 2.0:
            BREAK
        END IF

        // Convert Cartesian (x, y, z) to Triplex Spherical Coordinates
        Theta = arccos(VectorZ.y / Radius_r)
        Phi = arctan2(VectorZ.x, VectorZ.z)

        // Update the derivative tracker
        Derivative_dr = (Radius_r^(Power_n - 1.0)) * Power_n * Derivative_dr + 1.0

        // Scale the radius and multiply the spherical angles
        ScaledRadius = Radius_r^Power_n
        Theta = Theta * Power_n
        Phi = Phi * Power_n

        // Convert Triplex back to Cartesian and add C (VectorZ = Z^n + C)
        VectorZ.x = ScaledRadius * sin(Theta) * sin(Phi)
        VectorZ.y = ScaledRadius * cos(Theta)
        VectorZ.z = ScaledRadius * sin(Theta) * cos(Phi)
        VectorZ = VectorZ + PositionC
    END FOR

    // Hubbard-Douady distance estimator formula
    DistanceEstimate = 0.5 * log(Radius_r) * Radius_r / Derivative_dr

    RETURN DistanceEstimate, TotalIterationsRun
END FUNCTION

```

----------------------------------------------------------------

## Response 3 : CalculateNormal

```

FUNCTION CalculateNormal(Position):
    Epsilon = 0.001 // Tiny offset to sample surrounding points

    // Sample distances slightly offset on each axis
    DistanceX1, _ = EstimateFractalDistance(Vector3(Position.x + Epsilon, Position.y, Position.z))
    DistanceX2, _ = EstimateFractalDistance(Vector3(Position.x - Epsilon, Position.y, Position.z))

    DistanceY1, _ = EstimateFractalDistance(Vector3(Position.x, Position.y + Epsilon, Position.z))
    DistanceY2, _ = EstimateFractalDistance(Vector3(Position.x, Position.y - Epsilon, Position.z))

    DistanceZ1, _ = EstimateFractalDistance(Vector3(Position.x, Position.y, Position.z + Epsilon))
    DistanceZ2, _ = EstimateFractalDistance(Vector3(Position.x, Position.y, Position.z - Epsilon))

    // Compute gradient vector
    Normal = Vector3(
        DistanceX1 - DistanceX2,
        DistanceY1 - DistanceY2,
        DistanceZ1 - DistanceZ2
    )

    RETURN Normalize(Normal)
END FUNCTION

```

----------------------------------------------------------------

## Response 4 : ComputeShading

```

FUNCTION ComputeShading(Position, Normal, EscapeIterations):
    LightDirection = Normalize(Vector3(1.0, 1.0, -1.0) - Position)

    // Simple Diffuse Shading (Lambertian)
    DiffuseIntensity = Max(0.0, DotProduct(Normal, LightDirection))

    // Escape-time color mapping mixed with lighting
    BaseFractalColor = MapIterationsToColor(EscapeIterations)
    FinalColor = BaseFractalColor * DiffuseIntensity

    RETURN FinalColor
END FUNCTION

```

----------------------------------------------------------------

# Navigation

> [Notes](./mandelbrot-3d-notes.html)

> [Folder Tree](./tree.php)
> [File System](./)

----------------------------------------------------------------

<style>
@import url("./../style/every-page.css");
</style>


