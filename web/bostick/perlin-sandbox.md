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

	n# = Abs( n# )

	h# = ( n# * SH - SH / 3 ) Mod 360
	s# = 1.0
	l# = ( 0.01 * SW * n# * n# * n# )

	c# = ( 1 − Abs( 2 * l# - 1 ) ) * s#

    ka# = ( h# / 2 ) Mod 2
    kb# = Abs( ka# - 1 )
    kc# = ( 1 - kb# )

    x# = c# * kc#
    m# = l# - c# / 2

    IF ( h# < 60 ) THEN
		r# = c# : g# = x# : b# = 0
	ELSE IF ( h# < 120 ) THEN
		r# = x# : g# = c# : b# = 0
	ELSE IF ( h# < 180 ) THEN
		r# = 0 : g# = c# : b# = x#
    ELSE IF ( h# < 240 ) THEN
		r# = 0 : g# = x# : b# = c#
    ELSE IF ( h# < 300 ) THEN
		r# = x# : g# = 0 : b# = c#
    ELSE
		r# = c# : g# = 0 : b# = x
	END IF

	ri% = Int( m# + r# * 255 )
	gi% = Int( m# + g# * 255 )
	bi% = Int( m# + b# * 255 )

	MakeColor& = _RGBA32( ri%, gi%. bi%, alpha% )

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

    const c = ( 1 −abs( 2 * l - 1 ) ) * s;

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

