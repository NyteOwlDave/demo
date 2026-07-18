
/* turtle-001.js */

js_source = ( `
// JavaScript code By NyteOwl Dave
GW = GraphicsWindow;
GW.Background( Colors.RGB( 182, 182, 255 ) );
Turtle.X = GW.Width / 2;
Turtle.Y = GW.Height / 2 - 30;
for ( let N = 1; N <= 110; N += 1 ) {
    Turtle.PenUp()
    Turtle.Move(N * 0.84)
    Turtle.Turn(360 / 20)
    Turtle.PenDown()
    Turtle.CreateFigure()
    for ( let M = 1; M <= 6; M += 1 ) {
        Turtle.Move(N / 4)
        Turtle.Turn(360 / 6)
    }
    GW.BrushColor( Colors.Random() )
    Turtle.FillFigure()
}
` );
