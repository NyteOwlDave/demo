
/* screen.js */


// Singleton Screen Object
const Screen = {
    canvas: null,     // HTML5 canvas element
    w: 0,             // Canvas width
    h: 0,             // Canvas height
    scale: 1,         // Scaling factor
    xOffset: 0,       // Horizontal center
    yOffset: 0,       // Vertical center
    fov: 90,          // Field of view (degrees)
    // Initialize the screen object
    init: function(canvas, fov) {
      Screen.canvas = canvas;
      Screen.fov = fov;
      const w = canvas.width;
      const h = canvas.height;
      Screen.w = w;
      Screen.h = h;
      Screen.xOffset = Math.floor( w / 2 );
      Screen.yOffset = Math.floor( h / 2 );
      const r = Vec.deg2rad( fov / 2 );
      Screen.scale = Screen.xOffset / Math.tan( r );
    },
    // Convert 3D view coords to 2D screen coords
    mapToScreen: function( vec3 ) {
        const k = Screen.scale / vec3[ 2 ];
        const x = Screen.xOffset + vec3[ 0 ] * k;
        const y = Screen.yOffset - vec3[ 1 ] * k;
        return new Vector2( x, y );
    },
    // Clear the screen
    clear: function() {
        Screen.fill( Screen.canvas, 'black' );
    },
    // Fill canvas will a color
    fill: function( canvas, color ) {
        const w = canvas.width;
        const h = canvas.height;
        const gfx = canvas.getContext( '2d' );
        gfx.fillStyle = color;
        gfx.fillRect( 0, 0, w, h );
    }
};

