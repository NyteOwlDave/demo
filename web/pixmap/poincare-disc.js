
/* poincare-disc.js */

const C_DISK  = _RGB( 255, 255, 255 );
const C_BGND  = _RGB( 20, 20, 64 );
const C_GRID  = _RGB( 0, 0, 0 );
const C_LIGHT = _RGB( 220, 220, 240 );
const C_DARK  = _RGB( 80, 80, 242 );

function RenderPoincareDisk( SW, SH ) {

    const GRID_SIZE = 0.2;

    // Define thickness for grid lines
    const lineWidth = 0.01;

    // Determine the center and radius of the disk on screen
    const centerX = SW / 2;
    const centerY = SH / 2;

    // 95% of screen size to fit nicely
    const radius = Min( SW, SH ) / 2 * 0.95;

    // Loop through every pixel on the screen
    for ( let y = 0; y < SH; y += 1 ) {

		    for ( let x = 0; x < SW; x += 1 ) {

            // Step 1: Translate pixel to disk-centered
            // coordinates ( u, v )
            u = ( x - centerX ) / radius;
            v = ( centerY - y ) / radius;   // +Y = UP

            disk_radius_squared = DotSelf( u, v );

            // Step 2: Check if pixel is inside the Poincaré
            // disk boundary
            if ( disk_radius_squared >= 1.0 ) {
                // Outside the disk boundary
                SetPixel( x, y, C_BGND );
                continue;
            }

            // Step 3: Map disk coordinates ( u, v )
            // to Upper Half-Plane ( x, y )
            denominator = DotSelf( u, 1.0 - v );

            // Guard against division by zero exactly at the
            // top boundary edge
            if (! denominator ) {
                SetPixel( x, y, C_BGND );
                continue;
            }

            const scale = 1 / denominator;

            hyperX = scale * ( 2.0 * u );
            hyperY = scale * ( 1.0 - disk_radius_squared );

            // Step 4: Generate a visual pattern (Checkerboard)
            // Use modulo math (are close to a grid line?)
            modX = ( Abs( hyperX ) % GRID_SIZE );
            modY = ( Abs( hyperY ) % GRID_SIZE );

            const t1 = ( modX < lineWidth );
			const t2 = ( modY < lineWidth );

            if ( t1 || t2 ) {
                SetPixel( x, y, C_GRID );
            } else {
                // Alternating checkerboard color pattern
                // for depth perception
                cellX = Floor( hyperX / GRID_SIZE );
                cellY = Floor( hyperY / GRID_SIZE );
                if ( ( cellX + cellY ) % 2 ) {
		                SetPixel( x, y, C_LIGHT );
                } else {
		                SetPixel( x, y, C_DARK );
                }
            }
        }
    }
}
