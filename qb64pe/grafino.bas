' 3D FUNCTIONS in QB64
' FUNZIONI 3D --- by Mimmo Derix ver 10/05/2026

' --- CONFIGURAZIONE OSSERVATORE ---
Const DISTANZA = 800 ' Distanza dell'osservatore dal centro (0,0,0)
Const LATITUDINE = 30 ' Altezza dell'osservatore (30° dall'alto)
Const LONGITUDINE = 50 ' Posizione intorno all'oggetto (40° da destra)

' --- ALTRE COSTANTI ---
Const NUM_ELEMENTI = 50
Const LATO_GRIGLIA = 300
Const SCALA_Z = 30
Const SCALA_XY = 1 / 30
Const ORIGINE_X = 320
Const ORIGINE_Y = 240
Const PI = 3.14159265

Type Punto
    x As Single
    y As Single
    z As Single
End Type

Dim Shared p(1 To NUM_ELEMENTI, 1 To NUM_ELEMENTI) As Punto

Screen 12
Cls

' --- 1. GENERAZIONE GRIGLIA (Sempre fissa al centro) ---
Const PASSO = LATO_GRIGLIA / (NUM_ELEMENTI - 1)
Const MEZZO_LATO = LATO_GRIGLIA / 2

For show = 1 To 3
    Cls
    For r = 1 To NUM_ELEMENTI
        For c = 1 To NUM_ELEMENTI
            p(r, c).x = (c - 1) * PASSO - MEZZO_LATO
            p(r, c).y = (r - 1) * PASSO - MEZZO_LATO
            x = p(r, c).x * SCALA_XY
            y = p(r, c).y * SCALA_XY
            Select Case show
                Case 1: p(r, c).z = Sin(x) * Cos(y) * SCALA_Z
                Case 2: p(r, c).z = Sin(Sqr(x ^ 2 + y ^ 2) * 3) / Sqr(x ^ 2 + y ^ 2) * 30
                Case 3: p(r, c).z = Atn(Sqr(x ^ 2 + y ^ 2) * -.8) * 50
            End Select
        Next c
    Next r

    ' --- 2. DISEGNO ---
    For r = 1 To NUM_ELEMENTI
        For c = 1 To NUM_ELEMENTI
            If c < NUM_ELEMENTI Then COLLEGA p(r, c), p(r, c + 1)
            If r < NUM_ELEMENTI Then COLLEGA p(r, c), p(r + 1, c)
        Next c
    Next r
    k$ = Input$(1)
Next

End


' --- SUB COLLEGA (Logica dell'Osservatore) ---
Sub COLLEGA (P1 As Punto, P2 As Punto)
    Dim A As Punto, B As Punto
    A = P1: B = P2

    ' Trasformiamo in radianti
    lat! = LATITUDINE * PI / 180
    lon! = LONGITUDINE * PI / 180


    ' --- 1. ROTAZIONE DI LONGITUDINE (Asse Y dello schermo) ---
    ' Ora giriamo prima la griglia "destra/sinistra".
    ' Poiché lo facciamo DOPO, l'orizzonte rimarrà parallelo al bordo dello schermo.
    x1! = A.x * Cos(lon!) + A.y * Sin(lon!)
    y1! = -A.x * Sin(lon!) + A.y * Cos(lon!)
    A.x = x1!: A.y = y1!

    x2! = B.x * Cos(lon!) + B.y * Sin(lon!)
    y2! = -B.x * Sin(lon!) + B.y * Cos(lon!)
    B.x = x2!: B.y = y2!

    ' --- 2. ROTAZIONE DI LATITUDINE (Asse X) ---
    ' Incliniamo dopo la griglia "avanti/dietro"
    y1! = A.y * Cos(lat!) - A.z * Sin(lat!)
    z1! = A.y * Sin(lat!) + A.z * Cos(lat!)
    A.y = y1!: A.z = z1!

    y2! = B.y * Cos(lat!) - B.z * Sin(lat!)
    z2! = B.y * Sin(lat!) + B.z * Cos(lat!)
    B.y = y2!: B.z = z2!


    ' --- PROIEZIONE PROSPETTICA ---
    ' Aggiungiamo DISTANZA a y per evitare che l'oggetto ci finisca "dietro"
    f1! = DISTANZA / (DISTANZA + A.y)
    ax2d = ORIGINE_X + A.x * f1!
    ay2d = ORIGINE_Y - A.z * f1!

    f2! = DISTANZA / (DISTANZA + B.y)
    bx2d = ORIGINE_X + B.x * f2!
    by2d = ORIGINE_Y - B.z * f2!

    Line (ax2d, ay2d)-(bx2d, by2d), 11
End Sub


