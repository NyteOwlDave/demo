<style>
@import url("https://nyteowldave.neocities.com/style.css");
@import url("https://nyteowldave.github.io/std/style/ghost.css");
</style>

<style>
* { box-sizing : border-box; }
</style>

----------------------------------------------------------------

# Perlin Sandbox

----------------------------------------------------------------

## QB64 Phoenix

----------------------------------------------------------------

```basic

Function MakeColor&( n# )
	h =	n * 600 - 200
	s = 100
	l = ( 800 * n * n * n )
	r = 
End Function

```

----------------------------------------------------------------

## JavaScript

----------------------------------------------------------------

```javascript

function hsl_to_rgb( h, s, l ) {

    function _rgb( r, g, b, m ) {
        r = floor( ( r + m ) * 255 );
        g = floor( ( g + m ) * 255 );
        b = floor( ( b + m ) * 255 );
        return { r, g, b };
    }

    h = abs( h % 360 );
    l = l / 100;
    s = s / 100;

    const c = (1 −abs( 2 * l - 1 ) ) * s;

    const ka = ( h / 2 ) % 2;
    const kb = abs( ka - 1 );
    const kc = ( 1 - kb );
    const x = c * kc;
    const m = l - c / 2;

    if ( h < 60  ) { return _rgb( c, x, 0, m ); }
    if ( h < 120 ) { return _rgb( x, c, 0, m ); }
    if ( h < 180 ) { return _rgb( 0, c, x, m ); }
    if ( h < 240 ) { return _rgb( 0, X, c, m ); }
    if ( h < 300 ) { return _rgb( x, 0, c, m ); }
    else           { return _rgb( c, 0, x, m ); }

}

```

----------------------------------------------------------------

