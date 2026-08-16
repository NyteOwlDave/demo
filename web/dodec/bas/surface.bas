
'
' surface.bas (screen.js)
'

Type SurfaceState
    image as _UNSIGNED Integer '  Pixel Buffer
    width as Integer '            Buffer Width
    height as Integer '           Buffer Height
    scale as Double '             Scaling Factor
    xOffset as Double '           Horizontal Center
    yOffset as Double '           Vertical Center
    fov as Double '               Field of View
End Type


Dim Surface as SurfaceState


Sub SurfaceInit( width&, height&, fov# )
    Surface.width = width&
    Surface.height = height&
    Surface.fov = fov#
    Surface.xOffset = width& / 2.0
    Surface.yOffset = height& / 2.0
    r = DegToRad( fov# / 2 );
    Surface.scale = Surface.xOffset / TAN( r )
    Surface.image = _NewImage( width, height )
    SCREEN Surface.image
End Sub


' Convert 3D view coords to 2D screen coords
Sub SurfaceMap( vi, vo )
    k# = Surface.scale / vi( 2 )
    x# = Surface.xOffset + vi( 0 ) * k
    y# = Surface.yOffset - vi( 1 ) * k
    vo( 0 ) = Int( x# )
    vo( 1 ) = Int( y# )
End Sub


' Fill Screen with a Color
Sub Background( c& )
    w& = Surface.width;
    h& = Surface.height;
    Line (0,0)-(w,h), c&, BF
End Sub

