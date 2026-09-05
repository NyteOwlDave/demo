<style>
@import url("https://nyteowldave.neocities.com/style.css");
</style>

<style>
html {
	background-image : url("http://dave-tower/art/bgi/bgi-retro-future.png");
}
</style>

----------------------------------------------------------------

#Grafico 3D Plotter ~ Mimmo Derix

----------------------------------------------------------------

<fieldset>
<section> <h2>Editors</h2> </section>
<section>
  <textarea id="sce" class="siox" wrap="off" locked></textarea>
</section>
</fieldset>

----------------------------------------------------------------

[tck]:  <https://ticktick.com/webapp/#p/6a97e1d08f0842fe13ce518d/tasks>
[cpad]: <https://texteditor.co/?id=drive-1cmolKg6ZCW-Nj8zArDwQkn0R5OWIR7am>
[bpg]:  <https://www.facebook.com/groups/2057165187928233>
[meow]: <https://nyteowldave.neocities.com>

> [Tick-Tick][tck]
> [Cloud Pad][cpad]

> [BASIC Group][bpg]
> [Neo City][meow]

> [Zephyr](./zephyr.html)
> [Web Demos](./../web-menu.html)

----------------------------------------------------------------

<script>

basic_source = ( `

' 3D FUNCTIONS in QB64
' Original : Mimmo Derix ~ 2026-MAY-10
' English Version : NyteOwlDave ~ 2026-SEP-02

_Title "3D Function Plot ~ Mimmo Derix"

Const SW = 640 ' Screen Dimensions
Const SH = 480

Const DIST = 800 ' Eye Distance from Origin (0,0,0)
Const D_LAT = 36 ' 30 deg Elevation
Const D_LNG = 64 ' 50 deg Polar Axis Spin

Const ELEMENTS = 50 ' Vertices per Side
Const GRID_SIDE = 300 ' Length of Any Side
Const Z_SCALE = 30 ' Depth Scale
Const XY_SCALE = 1 / Z_SCALE ' Horizontal & Vertical Scale
Const XO = SW / 2 ' Horizontal Center Offset
Const YO = SH / 2 ' Vertical Center Offset
Const PI = _Pi

' 3D Vertex (Point)
Type Vert
    x As Single
    y As Single
    z As Single
End Type

' Grid Vertices
Dim Shared verts(1 To ELEMENTS, 1 To ELEMENTS) As Vert

Screen 12
Cls

' Generate Grid Metrics
Const DELTA = GRID_SIDE / (ELEMENTS - 1)
Const CENTER = GRID_SIDE / 2

' Iterate Through Sample Plots
TestSeries

' Offer to Run Again
Color 11, 8
Cls
Print "Again (Y/n) ";
Input k$
k$ = LCase$(k$)
If k$ = "n" Then End
Run

' Test Series
Sub TestSeries ()
    For show% = 1 To 3
        Cls

        ' Row Stepper
        GenerateMesh show%

        ' Draw Mesh (Extruded Grid)
        DrawMesh

        k$ = Input$(1)

    Next show%
End Sub

' Generate Mesh
Sub GenerateMesh (index%)
    For r = 1 To ELEMENTS
        ' Column Stepper
        For c = 1 To ELEMENTS
            ' Vertex to View Space ( 2D )
            verts(r, c).x = (c - 1) * DELTA - CENTER
            verts(r, c).y = (r - 1) * DELTA - CENTER
            x = verts(r, c).x * XY_SCALE
            y = verts(r, c).y * XY_SCALE
            ' Extrude into 3D Space ( Z )
            Select Case index%
                Case 1: verts(r, c).z = Sin(x) * Cos(y) * Z_SCALE
                Case 2: verts(r, c).z = Sin(Sqr(x ^ 2 + y ^ 2) * 3) / Sqr(x ^ 2 + y ^ 2) * 30
                Case 3: verts(r, c).z = (1 + Atn(Sqr(x ^ 2 + y ^ 2) * -.8)) * 128 + 24
            End Select
        Next c
    Next r
End Sub

' Draw Mesh
Sub DrawMesh ()
    For r = 1 To ELEMENTS
        For c = 1 To ELEMENTS
            If c < ELEMENTS Then DrawEdge verts(r, c), verts(r, c + 1)
            If r < ELEMENTS Then DrawEdge verts(r, c), verts(r + 1, c)
        Next c
    Next r
End Sub

' Draw Edge
Sub DrawEdge (P1 As Vert, P2 As Vert)

    Dim A As Vert, B As Vert
    A = P1: B = P2

    ' Degrees => Radians
    lat! = D_LAT * PI / 180
    lon! = D_LNG * PI / 180

    ' Longitude Rotation
    x1! = A.x * Cos(lon!) + A.y * Sin(lon!)
    y1! = -A.x * Sin(lon!) + A.y * Cos(lon!)
    A.x = x1!: A.y = y1!

    x2! = B.x * Cos(lon!) + B.y * Sin(lon!)
    y2! = -B.x * Sin(lon!) + B.y * Cos(lon!)
    B.x = x2!: B.y = y2!

    ' Lattitude Rotation
    y1! = A.y * Cos(lat!) - A.z * Sin(lat!)
    z1! = A.y * Sin(lat!) + A.z * Cos(lat!)
    A.y = y1!: A.z = z1!

    y2! = B.y * Cos(lat!) - B.z * Sin(lat!)
    z2! = B.y * Sin(lat!) + B.z * Cos(lat!)
    B.y = y2!: B.z = z2!

    ' Perspective Foreshortening for A
    f1! = DIST / (DIST + A.y)

    ' Transorm Vertex A
    ax2d = XO + A.x * f1!
    ay2d = YO - A.z * f1!

    ' Perspective Foreshortening for B
    f2! = DIST / (DIST + B.y)

    ' Transform Vertex B
    bx2d = XO + B.x * f2!
    by2d = YO - B.z * f2!

    ' Connect Vertices w / Line Segment
    Color 11
    Line (ax2d, ay2d)-(bx2d, by2d)

End Sub

` );

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>

js_source = ( `` );

</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

<script>
sce.value = basic_source;
</script>

