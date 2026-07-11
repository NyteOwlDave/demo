<style>
@import url("http://dave-legacy/jefr/style/every-page.css");
</style>

# Stochastic Font

> ( `Fusion Basic` )

```

' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
' Fusion Basic
' Stochastic Font ~ stochastic-font.bf
' https://basicfusion.org/
' ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
'
' DRAWSTRING - draws a full string in the "handwritten" font
'
' CALL DRAWSTRING(text$, x, y, scale, jitter)
'
'   text$   - what to write, in quotes, e.g. "Hello World"
'             only A-Z and a-z work, space adds a gap, any other
'             characters (digits, commas, etc.) are just skipped
'
'   x       - which pixel column writing starts at
'             (roughly the top-left of the first letter)
'
'   y       - the baseline (bottom of letters, not counting
'             descenders like g/j/p/q/y) sits at this row
'
'   scale   - how big the letters are, 5.0 is the medium size
'             we used in the examples, bigger number = bigger
'             letters (and a wider whole string, watch the
'             canvas width from GRAPHICS)
'
'   jitter  - how much the "pen" shakes, 0.15 is a light tremor,
'             0 = perfectly smooth (but looks fake), above
'             0.4-0.5 starts looking genuinely sloppy


GRAPHICS 900, 600
CLS
PAINT "black"

CONST MAXL = 52
CONST MAXS = 3
CONST MAXP = 10

DIM SCOUNT(MAXL)
DIM ADVANCE(MAXL)
DIM SPTCOUNT(MAXL, MAXS)
DIM SX(MAXL, MAXS, MAXP)
DIM SY(MAXL, MAXS, MAXP)

DIM L
DIM S2
DIM P2
FOR L = 1 TO MAXL
    READ SCOUNT(L), ADVANCE(L)
    FOR S2 = 1 TO SCOUNT(L)
        READ SPTCOUNT(L, S2)
        FOR P2 = 1 TO SPTCOUNT(L, S2)
            READ SX(L, S2, P2), SY(L, S2, P2)
        NEXT P2
    NEXT S2
NEXT L

RANDOMIZE TIMER

CALL DRAWSTRING("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 25, 90, 5.0, 0.15)
CALL DRAWSTRING("abcdefghijklmnopqrstuvwxyz", 25, 220, 5.0, 0.15)
CALL DRAWSTRING("The Quick Brown Fox Jumps", 25, 400, 5.0, 0.15)
CALL DRAWSTRING("Over The Lazy Dog", 25, 530, 5.0, 0.15)

END

' ------------------------------------------------------------
FUNCTION XF(GX, GY, SLANT, ANG, SCL, TX)
    LOCAL SHX
    LOCAL RX
    SHX = GX + GY * SLANT
    RX = SHX * COS(ANG) - GY * SIN(ANG)
    XF = TX + RX * SCL
END FUNCTION

FUNCTION YF(GX, GY, SLANT, ANG, SCL, TY)
    LOCAL SHX
    LOCAL RY
    SHX = GX + GY * SLANT
    RY = SHX * SIN(ANG) + GY * COS(ANG)
    YF = TY - RY * SCL
END FUNCTION

' ------------------------------------------------------------
SUB DRAWCURVE(X1, Y1, X2, Y2, BOW)
    LOCAL DX
    LOCAL DY
    LOCAL LN
    LOCAL PX
    LOCAL PY
    LOCAL T
    LOCAL CX
    LOCAL CY
    LOCAL PXPREV
    LOCAL PYPREV
    LOCAL I
    LOCAL NSUB

    NSUB = 5
    DX = X2 - X1
    DY = Y2 - Y1
    LN = SQR(DX * DX + DY * DY)
    IF LN > 0 THEN
        PX = -DY / LN
        PY = DX / LN
    ELSE
        PX = 0
        PY = 0
    END IF

    PXPREV = X1
    PYPREV = Y1
    FOR I = 1 TO NSUB
        T = I / NSUB
        CX = X1 + DX * T + PX * BOW * SIN(PI * T)
        CY = Y1 + DY * T + PY * BOW * SIN(PI * T)
        LINE (PXPREV, PYPREV)-(CX, CY), "white"
        PXPREV = CX
        PYPREV = CY
    NEXT I
END SUB

' ------------------------------------------------------------
SUB DRAWLETTER(IDX, OX, OY, SCL, JIT)
    LOCAL S
    LOCAL P
    LOCAL N
    LOCAL X1
    LOCAL Y1
    LOCAL X2
    LOCAL Y2
    LOCAL RX1
    LOCAL RY1
    LOCAL RX2
    LOCAL RY2
    LOCAL ANG
    LOCAL SLANT
    LOCAL WOB
    LOCAL BASEY
    LOCAL LOCALSCL
    LOCAL BOW
    LOCAL PW

    ANG = (RND() - 0.5) * 0.06
    SLANT = 0.20 + (RND() - 0.5) * 0.08
    WOB = (RND() - 0.5) * SCL * 0.30
    BASEY = OY + WOB
    LOCALSCL = SCL * (0.92 + RND() * 0.16)

    PW = 1 + INT(RND() * 2)
    LINEWIDTH PW

    FOR S = 1 TO SCOUNT(IDX)
        N = SPTCOUNT(IDX, S)
        FOR P = 1 TO N - 1
            X1 = SX(IDX, S, P) + (RND() - 0.5) * JIT
            Y1 = SY(IDX, S, P) + (RND() - 0.5) * JIT
            X2 = SX(IDX, S, P + 1) + (RND() - 0.5) * JIT
            Y2 = SY(IDX, S, P + 1) + (RND() - 0.5) * JIT

            RX1 = XF(X1, Y1, SLANT, ANG, LOCALSCL, OX)
            RY1 = YF(X1, Y1, SLANT, ANG, LOCALSCL, BASEY)
            RX2 = XF(X2, Y2, SLANT, ANG, LOCALSCL, OX)
            RY2 = YF(X2, Y2, SLANT, ANG, LOCALSCL, BASEY)

            BOW = (RND() - 0.5) * LOCALSCL * 0.9
            CALL DRAWCURVE(RX1, RY1, RX2, RY2, BOW)
        NEXT P
    NEXT S
END SUB

' ------------------------------------------------------------
SUB DRAWSTRING(TXT$, X0, Y0, SCL, JIT)
    LOCAL I
    LOCAL CH$
    LOCAL IDX
    LOCAL PENX

    PENX = X0

    FOR I = 1 TO LEN(TXT$)
        CH$ = MID$(TXT$, I, 1)
        IF CH$ = " " THEN
            PENX = PENX + SCL * 3.2
        ELSE
            IDX = 0
            IF CH$ >= "A" AND CH$ <= "Z" THEN
                IDX = ASC(CH$) - 64
            ELSEIF CH$ >= "a" AND CH$ <= "z" THEN
                IDX = ASC(CH$) - 97 + 27
            END IF

            IF IDX >= 1 AND IDX <= MAXL THEN
                CALL DRAWLETTER(IDX, PENX, Y0, SCL, JIT)
                PENX = PENX + ADVANCE(IDX) * SCL + (RND() - 0.5) * SCL * 0.4
            END IF
        END IF
    NEXT I
END SUB

' ================= FONT DATA (A..Z, a..z) ====================
' Each letter: "SCOUNT, ADVANCE" then one line per stroke:
' "NPTS, x1,y1, x2,y2, ..."
' Baseline y=0 for every letter. Caps use y=0..9. Lowercase
' x-height is y=0..5, ascenders reach ~7.5-9, descenders go
' below 0 (negative y).

' --- UPPERCASE A-Z ---
' A
DATA 2, 6.5
DATA 3, 0,0, 3,9, 6,0
DATA 2, 1.2,3, 4.8,3
' B
DATA 3, 6
DATA 2, 0,0, 0,9
DATA 6, 0,9, 3,9, 4.3,8.3, 4.3,6.2, 3,5, 0,5
DATA 6, 0,5, 3.3,5, 4.6,4.2, 4.6,0.8, 3.3,0, 0,0
' C
DATA 1, 6
DATA 7, 4.6,8.22, 3.2,8.8, 1.22,7.54, 0.4,4.5, 1.22,1.46, 3.2,0.2, 4.6,0.78
' D
DATA 2, 6.5
DATA 2, 0,0, 0,9
DATA 7, 0,9, 2.5,9, 4.5,7.5, 5.2,4.5, 4.5,1.5, 2.5,0, 0,0
' E
DATA 2, 6
DATA 4, 5,9, 0,9, 0,0, 5,0
DATA 2, 0,4.5, 4,4.5
' F
DATA 2, 5.5
DATA 3, 0,0, 0,9, 5,9
DATA 2, 0,4.5, 4,4.5
' G
DATA 1, 6.5
DATA 9, 4.6,8.22, 3.2,8.8, 1.22,7.54, 0.4,4.5, 1.22,1.46, 3.2,0.2, 4.6,0.78, 4.6,3.2, 3,3.2
' H
DATA 3, 6.5
DATA 2, 0,0, 0,9
DATA 2, 5,0, 5,9
DATA 2, 0,4.5, 5,4.5
' I
DATA 1, 4.5
DATA 2, 2.5,0, 2.5,9
' J
DATA 1, 5
DATA 5, 4,9, 4,2, 3.2,0.3, 1.5,0, 0.3,1.2
' K
DATA 3, 6
DATA 2, 0,0, 0,9
DATA 2, 5,9, 0,4.5
DATA 2, 0,4.5, 5,0
' L
DATA 1, 5.5
DATA 3, 0,9, 0,0, 5,0
' M
DATA 1, 7.5
DATA 5, 0,0, 0,9, 3,3, 6,9, 6,0
' N
DATA 1, 6.5
DATA 4, 0,0, 0,9, 6,0, 6,9
' O
DATA 1, 6.5
DATA 9, 5.8,4.5, 5.0,7.54, 3,8.8, 1.02,7.54, 0.2,4.5, 1.02,1.46, 3,0.2, 4.98,1.46, 5.8,4.5
' P
DATA 2, 6
DATA 2, 0,0, 0,9
DATA 6, 0,9, 3.3,9, 4.7,8, 4.7,6, 3.3,5, 0,5
' Q
DATA 2, 6.5
DATA 9, 5.8,4.5, 5.0,7.54, 3,8.8, 1.02,7.54, 0.2,4.5, 1.02,1.46, 3,0.2, 4.98,1.46, 5.8,4.5
DATA 2, 2,2, 4.7,-0.8
' R
DATA 3, 6
DATA 2, 0,0, 0,9
DATA 6, 0,9, 3.3,9, 4.7,8, 4.7,6, 3.3,5, 0,5
DATA 2, 2,5, 5,0
' S
DATA 1, 6
DATA 10, 4.3,8.2, 2.7,9, 0.7,8.3, 0.6,6.3, 2.5,5.3, 3.5,4.5, 4.5,3.5, 4.3,1.7, 2.2,0, 0.5,0.8
' T
DATA 2, 5.5
DATA 2, 0,9, 5,9
DATA 2, 2.5,9, 2.5,0
' U
DATA 1, 6.5
DATA 7, 0,9, 0,2.5, 1.2,0.3, 3,0, 4.8,0.3, 6,2.5, 6,9
' V
DATA 1, 6.5
DATA 3, 0,9, 3,0, 6,9
' W
DATA 1, 7.5
DATA 5, 0,9, 1.5,0, 3,6, 4.5,0, 6,9
' X
DATA 2, 6.5
DATA 2, 0,9, 6,0
DATA 2, 0,0, 6,9
' Y
DATA 2, 6
DATA 3, 0,9, 3,4.5, 6,9
DATA 2, 3,4.5, 3,0
' Z
DATA 1, 6
DATA 4, 0,9, 6,9, 0,0, 6,0

' --- LOWERCASE a-z ---
' a
DATA 2, 4.8
DATA 9, 3.8,2.5, 3.27,4.2, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 3.27,0.8, 3.8,2.5
DATA 2, 3.8,4.3, 3.8,0
' b
DATA 2, 4.8
DATA 2, 0.2,0, 0.2,9
DATA 9, 3.8,2.5, 3.27,4.2, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 3.27,0.8, 3.8,2.5
' c
DATA 1, 4.3
DATA 7, 2.9,4.58, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 2.9,0.42
' d
DATA 2, 4.8
DATA 2, 3.8,0, 3.8,9
DATA 9, 3.8,2.5, 3.27,4.2, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 3.27,0.8, 3.8,2.5
' e
DATA 2, 4.8
DATA 8, 3.69,3.32, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 3.27,0.8, 3.69,1.68
DATA 2, 0.3,2.5, 3.5,2.5
' f
DATA 2, 4.2
DATA 4, 3.0,0, 3.0,7, 2.2,8.5, 3.7,9
DATA 2, 1.0,5, 4.3,5
' g
DATA 2, 4.8
DATA 9, 3.8,2.5, 3.27,4.2, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 3.27,0.8, 3.8,2.5
DATA 4, 3.6,1, 3.6,-2, 2.5,-3.2, 1.0,-2.8
' h
DATA 2, 4.8
DATA 2, 0.2,0, 0.2,9
DATA 5, 0.2,4.8, 1.2,5.3, 2.4,5.2, 3.4,4.4, 3.4,0
' i
DATA 2, 2.5
DATA 2, 2.0,0, 2.0,5
DATA 2, 1.9,6.3, 2.1,6.6
' j
DATA 2, 3.3
DATA 4, 2.5,5, 2.5,-2.2, 1.4,-3.3, 0.4,-2.8
DATA 2, 2.4,6.3, 2.6,6.6
' k
DATA 3, 4.6
DATA 2, 0.2,0, 0.2,9
DATA 2, 3.4,5, 0.2,2.7
DATA 2, 0.2,2.7, 3.4,0
' l
DATA 1, 2.5
DATA 2, 2.0,0, 2.0,9
' m
DATA 2, 7.0
DATA 6, 0.2,0, 0.2,5, 0.5,5.3, 1.5,5.3, 1.9,5, 1.9,0
DATA 5, 1.9,5, 2.2,5.3, 3.2,5.3, 3.6,5, 3.6,0
' n
DATA 1, 4.8
DATA 6, 0.2,0, 0.2,5, 0.5,5.3, 1.5,5.3, 1.9,5, 1.9,0
' o
DATA 1, 4.8
DATA 9, 3.8,2.5, 3.27,4.2, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 3.27,0.8, 3.8,2.5
' p
DATA 2, 4.8
DATA 2, 0.2,-3, 0.2,5
DATA 9, 3.8,2.5, 3.27,4.2, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 3.27,0.8, 3.8,2.5
' q
DATA 2, 4.8
DATA 2, 3.8,-3, 3.8,5
DATA 9, 3.8,2.5, 3.27,4.2, 2,4.9, 0.73,4.2, 0.2,2.5, 0.73,0.8, 2,0.1, 3.27,0.8, 3.8,2.5
' r
DATA 2, 3.6
DATA 2, 0.3,0, 0.3,5
DATA 3, 0.3,4.5, 1.2,5.3, 2.3,5.2
' s
DATA 1, 4.2
DATA 9, 3.6,4.3, 2.2,5, 0.6,4.4, 0.6,3.1, 2.5,2.5, 3.4,1.9, 3.3,0.6, 1.6,0, 0.3,0.6
' t
DATA 2, 4.0
DATA 2, 1.8,0, 1.8,7.5
DATA 2, 0.3,5, 3.2,5
' u
DATA 1, 5.2
DATA 7, 0.3,5, 0.3,1.8, 1.0,0.3, 2.0,0, 3.0,0.3, 3.7,1.8, 3.7,5
' v
DATA 1, 4.3
DATA 3, 0.3,5, 2.0,0, 3.7,5
' w
DATA 1, 5.8
DATA 5, 0.3,5, 1.2,0, 2.0,3.2, 2.8,0, 3.7,5
' x
DATA 2, 4.2
DATA 2, 0.3,5, 3.5,0
DATA 2, 0.3,0, 3.5,5
' y
DATA 2, 4.3
DATA 3, 0.3,5, 2.0,1.5, 3.7,5
DATA 3, 2.0,1.5, 1.2,-2.5, 0.3,-3.3
' z
DATA 1, 4.2
DATA 4, 0.3,5, 3.5,5, 0.3,0, 3.5,0

```
