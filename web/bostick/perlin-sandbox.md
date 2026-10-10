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

```

globalAlpha# = 0.05

Sub Frame( px% )
    For i% = 0 to ( SH / 6 ) - 1
      x# = px%;
      y# = SH * Rnd
      n# = Perlin#( x# * period#, y# * period# )
      c& = MakeColor( n# )
      m% = 0
      while ( ( y >= 0 ) AND ( y <= height ) AND ( m% < length% ) )
        n# = Perlin#( x# * period#, y# * period# )
        x2# = x# + Cos( n# * 14 );
        y2# = y# + Sin( n# * 14 );
        LINE (x#,y#)-(x2#,y2#), , c&
        m% = m% + 1
      wend
    }
    yield context.canvas;
End Sub

Sub Animate()
    Frame x%
    x% = ( x% + 1 ) MOD SW
    IF INKEY$ = CHR$(27) THEN RETURN
End Sub

```

----------------------------------------------------------------
