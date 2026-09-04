_TITLE "Orion 3D - Extended Costellation with periferal stars and sword - made by Mimmo Derix (in 2005)"
'By MImmo Derix 2005

SCREEN _NEWIMAGE(1440, 810, 32)

CONST RAGGIO_VISTA = 520.0
WINDOW (-RAGGIO_VISTA * (16.0 / 9.0), -RAGGIO_VISTA)-(RAGGIO_VISTA * (16.0 / 9.0), RAGGIO_VISTA)

CONST NUM_STELLE = 19
CONST PI = 3.141592653589793
CONST TOTAL_FRAMES = 5000

TYPE Stella
    nome AS STRING * 16
    ra AS SINGLE
    dec AS SINGLE
    dist AS SINGLE
    x AS SINGLE
    y AS SINGLE
    z AS SINGLE
    col AS _UNSIGNED LONG
    baseDim AS SINGLE
END TYPE

DIM SHARED s(1 TO NUM_STELLE) AS Stella


' --- 10 PERIPHERAL STARS (Bow/Shield, Sword, and Club) ---
s(10).nome = "Pi1 Ori": s(10).ra = 4.914: s(10).dec = 10.151: s(10).dist = 120: s(10).col = _RGB32(255, 255, 255): s(10).baseDim = 2.5
s(11).nome = "Pi2 Ori": s(11).ra = 4.945: s(11).dec = 8.900: s(11).dist = 224: s(11).col = _RGB32(210, 225, 255): s(11).baseDim = 2.5
s(12).nome = "Tabit (Pi3)": s(12).ra = 4.829: s(12).dec = 6.960: s(12).dist = 26: s(12).col = _RGB32(255, 250, 200): s(12).baseDim = 3.5
s(13).nome = "Pi4 Ori": s(13).ra = 4.853: s(13).dec = 5.603: s(13).dist = 1050: s(13).col = _RGB32(190, 210, 255): s(13).baseDim = 3.0
s(14).nome = "Pi5 Ori": s(14).ra = 4.904: s(14).dec = 2.440: s(14).dist = 1340: s(14).col = _RGB32(200, 220, 255): s(14).baseDim = 3.0
s(15).nome = "c Ori (42 Ori)": s(15).ra = 5.591: s(15).dec = -4.837: s(15).dist = 900: s(15).col = _RGB32(190, 210, 255): s(15).baseDim = 2.5
s(16).nome = "Iota Ori": s(16).ra = 5.590: s(16).dec = -5.910: s(16).dist = 1300: s(16).col = _RGB32(190, 210, 255): s(16).baseDim = 3.0
s(17).nome = "Mu Ori": s(17).ra = 6.040: s(17).dec = 9.647: s(17).dist = 150: s(17).col = _RGB32(255, 250, 220): s(17).baseDim = 2.5
s(18).nome = "Nu Ori": s(18).ra = 6.126: s(18).dec = 14.770: s(18).dist = 515: s(18).col = _RGB32(200, 220, 255): s(18).baseDim = 2.5
s(19).nome = "Xi Ori": s(19).ra = 6.199: s(19).dec = 14.208: s(19).dist = 600: s(19).col = _RGB32(200, 220, 255): s(19).baseDim = 2.5

' --- 9 MAIN STARS ---
s(1).nome = "Betelgeuse": s(1).ra = 5.919: s(1).dec = 7.407: s(1).dist = 548: s(1).col = _RGB32(255, 130, 80): s(1).baseDim = 6.0
s(2).nome = "Bellatrix": s(2).ra = 5.418: s(2).dec = 6.349: s(2).dist = 250: s(2).col = _RGB32(200, 225, 255): s(2).baseDim = 5.0
s(3).nome = "Mintaka": s(3).ra = 5.533: s(3).dec = -0.299: s(3).dist = 1200: s(3).col = _RGB32(220, 235, 255): s(3).baseDim = 4.5
s(4).nome = "Alnilam": s(4).ra = 5.603: s(4).dec = -1.201: s(4).dist = 2000: s(4).col = _RGB32(220, 235, 255): s(4).baseDim = 4.5
s(5).nome = "Alnitak": s(5).ra = 5.679: s(5).dec = -1.940: s(5).dist = 1260: s(5).col = _RGB32(220, 235, 255): s(5).baseDim = 4.5
s(6).nome = "Saiph": s(6).ra = 5.795: s(6).dec = -9.669: s(6).dist = 650: s(6).col = _RGB32(190, 215, 255): s(6).baseDim = 5.0
s(7).nome = "Rigel": s(7).ra = 5.242: s(7).dec = -8.201: s(7).dist = 860: s(7).col = _RGB32(180, 220, 255): s(7).baseDim = 6.5
s(8).nome = "Meissa": s(8).ra = 5.584: s(8).dec = 9.933: s(8).dist = 1100: s(8).col = _RGB32(200, 220, 255): s(8).baseDim = 4.0
s(9).nome = "M42 Nebula": s(9).ra = 5.590: s(9).dec = -5.390: s(9).dist = 1344: s(9).col = _RGB32(255, 140, 210): s(9).baseDim = 5.5

FOR i = 1 TO NUM_STELLE
    DIM alpha AS SINGLE, delta AS SINGLE
    alpha = (s(i).ra * 15.0) * (PI / 180.0)
    delta = s(i).dec * (PI / 180.0)
    s(i).x = -s(i).dist * COS(delta) * SIN(alpha)
    s(i).y = s(i).dist * SIN(delta)
    s(i).z = s(i).dist * COS(delta) * COS(alpha)
NEXT i

DIM SHARED cx AS SINGLE, cy AS SINGLE, cz AS SINGLE
cx = 0: cy = 0: cz = 0
FOR i = 1 TO 9
    cx = cx + s(i).x
    cy = cy + s(i).y
    cz = cz + s(i).z
NEXT i
cx = cx / 9.0: cy = cy / 9.0: cz = cz / 9.0

DIM R_orbita AS SINGLE
R_orbita = SQR(cx * cx + cy * cy + cz * cz)

DIM phi0 AS SINGLE
phi0 = _ATAN2(-cx, -cz)

TYPE PuntoScia
    x AS SINGLE
    y AS SINGLE
    z AS SINGLE
END TYPE
DIM SHARED scia(0 TO TOTAL_FRAMES) AS PuntoScia

DIM frame AS INTEGER
DIM inPausa AS INTEGER
DIM angleH AS SINGLE, angleV AS SINGLE
DIM CamX AS SINGLE, CamY AS SINGLE, CamZ AS SINGLE
DIM projX(1 TO NUM_STELLE) AS SINGLE, projY(1 TO NUM_STELLE) AS SINGLE
DIM pZ_dist(1 TO NUM_STELLE) AS SINGLE
DIM visible(1 TO NUM_STELLE) AS INTEGER
DIM delayCorrente AS SINGLE

CONST FOCALE = 1000.0
CONST LUNGHEZZA_ASSI = 80.0

frame = 0
inPausa = 1

_FONT 8

DO
    CLS

    angleH = phi0 + (frame / TOTAL_FRAMES) * (4.0 * PI)
    angleV = SIN((frame / TOTAL_FRAMES) * (2.0 * PI)) * (PI / 4.5)

    CamX = cx + R_orbita * COS(angleV) * SIN(angleH)
    CamY = cy + R_orbita * SIN(angleV)
    CamZ = cz + R_orbita * COS(angleV) * COS(angleH)

    scia(frame).x = CamX
    scia(frame).y = CamY
    scia(frame).z = CamZ

    DIM fwdX AS SINGLE, fwdY AS SINGLE, fwdZ AS SINGLE, fLen AS SINGLE
    fwdX = cx - CamX: fwdY = cy - CamY: fwdZ = cz - CamZ
    fLen = SQR(fwdX * fwdX + fwdY * fwdY + fwdZ * fwdZ)
    fwdX = fwdX / fLen: fwdY = fwdY / fLen: fwdZ = fwdZ / fLen

    DIM rgtX AS SINGLE, rgtY AS SINGLE, rgtZ AS SINGLE, rLen AS SINGLE
    rgtX = fwdZ: rgtY = 0: rgtZ = -fwdX
    rLen = SQR(rgtX * rgtX + rgtZ * rgtZ)
    IF rLen > 0.0001 THEN
        rgtX = rgtX / rLen: rgtZ = rgtZ / rLen
    END IF

    DIM upX AS SINGLE, upY AS SINGLE, upZ AS SINGLE
    upX = (fwdY * rgtZ) - (fwdZ * rgtY)
    upY = (fwdZ * rgtX) - (fwdX * rgtZ)
    upZ = (fwdX * rgtY) - (fwdY * rgtX)

    ' 1. Cartesian axes at the center of rotation
    DIM ox AS SINGLE, oy AS SINGLE, oz AS SINGLE
    ProiettaPunto cx, cy, cz, CamX, CamY, CamZ, fwdX, fwdY, fwdZ, rgtX, rgtY, rgtZ, upX, upY, upZ, ox, oy, oz
    IF oz > 10 THEN
        DIM axX AS SINGLE, axY AS SINGLE, axZ AS SINGLE
        ProiettaPunto cx + LUNGHEZZA_ASSI, cy, cz, CamX, CamY, CamZ, fwdX, fwdY, fwdZ, rgtX, rgtY, rgtZ, upX, upY, upZ, axX, axY, axZ
        COLOR _RGB32(240, 70, 70): LINE (ox, oy)-(axX, axY)
        ProiettaPunto cx, cy + LUNGHEZZA_ASSI, cz, CamX, CamY, CamZ, fwdX, fwdY, fwdZ, rgtX, rgtY, rgtZ, upX, upY, upZ, axX, axY, axZ
        COLOR _RGB32(70, 240, 70): LINE (ox, oy)-(axX, axY)
        ProiettaPunto cx, cy, cz + LUNGHEZZA_ASSI, CamX, CamY, CamZ, fwdX, fwdY, fwdZ, rgtX, rgtY, rgtZ, upX, upY, upZ, axX, axY, axZ
        COLOR _RGB32(80, 140, 255): LINE (ox, oy)-(axX, axY)
    END IF

    ' 2. Bright yellow trail
    IF frame > 0 THEN
        DIM lastPx AS SINGLE, lastPy AS SINGLE, lastOk AS INTEGER
        lastOk = 0
        FOR tr = 0 TO frame
            DIM pxTr AS SINGLE, pyTr AS SINGLE, pzTr AS SINGLE
            ProiettaPunto scia(tr).x, scia(tr).y, scia(tr).z, CamX, CamY, CamZ, fwdX, fwdY, fwdZ, rgtX, rgtY, rgtZ, upX, upY, upZ, pxTr, pyTr, pzTr
            IF pzTr > 20 THEN
                IF lastOk = 1 THEN
                    COLOR _RGB32(255, 255, 60)
                    LINE (lastPx, lastPy)-(pxTr, pyTr)
                END IF
                lastPx = pxTr: lastPy = pyTr: lastOk = 1
            ELSE
                lastOk = 0
            END IF
        NEXT tr
    END IF

    ' 3. Star projection
    FOR i = 1 TO NUM_STELLE
        ProiettaPunto s(i).x, s(i).y, s(i).z, CamX, CamY, CamZ, fwdX, fwdY, fwdZ, rgtX, rgtY, rgtZ, upX, upY, upZ, projX(i), projY(i), pZ_dist(i)
        IF pZ_dist(i) > 20 THEN
            visible(i) = 1
        ELSE
            visible(i) = 0
        END IF
    NEXT i

    ' Main body lines
    COLOR _RGB32(50, 90, 150)
    DisegnaLinea 8, 1, visible(), projX(), projY()
    DisegnaLinea 8, 2, visible(), projX(), projY()
    DisegnaLinea 1, 5, visible(), projX(), projY()
    DisegnaLinea 2, 3, visible(), projX(), projY()
    DisegnaLinea 3, 4, visible(), projX(), projY()
    DisegnaLinea 4, 5, visible(), projX(), projY()
    DisegnaLinea 5, 6, visible(), projX(), projY()
    DisegnaLinea 3, 7, visible(), projX(), projY()
    DisegnaLinea 6, 7, visible(), projX(), projY()

    ' Sword lines
    COLOR _RGB32(40, 75, 120)
    DisegnaLinea 4, 15, visible(), projX(), projY()
    DisegnaLinea 15, 9, visible(), projX(), projY()
    DisegnaLinea 9, 16, visible(), projX(), projY()

    ' Bow / Shield lines
    COLOR _RGB32(35, 65, 110)
    DisegnaLinea 10, 11, visible(), projX(), projY()
    DisegnaLinea 11, 12, visible(), projX(), projY()
    DisegnaLinea 12, 13, visible(), projX(), projY()
    DisegnaLinea 13, 14, visible(), projX(), projY()

    ' Club / Arm lines
    DisegnaLinea 1, 17, visible(), projX(), projY()
    DisegnaLinea 17, 18, visible(), projX(), projY()
    DisegnaLinea 18, 19, visible(), projX(), projY()

    ' Star rendering
    FOR i = 1 TO NUM_STELLE
        IF visible(i) = 1 THEN
            DIM dimEffettiva AS SINGLE
            dimEffettiva = s(i).baseDim * (1000.0 / pZ_dist(i))
            IF dimEffettiva < 1.2 THEN dimEffettiva = 1.2
            IF dimEffettiva > 10.0 THEN dimEffettiva = 10.0

            CIRCLE (projX(i), projY(i)), dimEffettiva, s(i).col
            PAINT (projX(i), projY(i)), s(i).col, s(i).col

            COLOR s(i).col
            DIM scrX AS INTEGER, scrY AS INTEGER
            scrX = 720 + projX(i) * (405.0 / RAGGIO_VISTA) + INT(dimEffettiva) + 5
            scrY = 405 - projY(i) * (405.0 / RAGGIO_VISTA) - 5
            _PRINTSTRING (scrX, scrY), RTRIM$(s(i).nome)
        END IF
    NEXT i

    ' On-screen information
    COLOR _RGB32(220, 220, 220)
    _PRINTSTRING (20, 20), "3D SIMULATOR: EXTENDED ORION (19 STARS + ARC + SWORD) - made by Mimmo Derix (in 2005)"
    _PRINTSTRING (20, 42), "Frame: " + STR$(frame) + " /" + STR$(TOTAL_FRAMES)
    _PRINTSTRING (20, 64), "Inclination: " + STR$(INT(angleV * 180.0 / PI)) + " deg"
    _PRINTSTRING (20, 86), "Center axis: Red=X  Green=Y  Blue=Z"

    IF inPausa = 1 THEN
        COLOR _RGB32(255, 230, 40)
        _PRINTSTRING (20, 114), ">> WAITING: Press [SPCEBAR] to start the fly, S for temporary pause"
    ELSE
        COLOR _RGB32(50, 255, 120)
        _PRINTSTRING (20, 115), ">> FLYING: Observer Trace as 8 active (yesllow trace in the space)"
    END IF

    COLOR _RGB32(140, 140, 140)
    '_PRINTSTRING (20, 765), "[SPACEBAR] Start / Restaart  | [S] Pause | [ESC] Exit"

    _DISPLAY

    DO
        k$ = INKEY$
        IF k$ = "s" OR k$ = "S" THEN
            DO
                wait$ = INKEY$
            LOOP UNTIL wait$ = "s" OR wait$ = "S"
        END IF
        IF k$ = CHR$(27) THEN SYSTEM

        IF inPausa = 1 THEN
            IF _KEYDOWN(32) THEN
                inPausa = 0
                frame = 1
                _DELAY 0.2
                EXIT DO
            END IF
        ELSE
            IF _KEYDOWN(32) THEN
                frame = 0
                inPausa = 1
                _DELAY 0.2
                EXIT DO
            END IF
            frame = frame + 1
            IF frame > TOTAL_FRAMES THEN
                frame = 0
                inPausa = 1
            END IF

            DIM delayBase AS SINGLE, boost AS SINGLE
            DIM u AS SINGLE, expVal AS SINGLE

            ' Base Gaussian curve for very slow start and stop
            u = (frame / 5000.0) - 0.5
            expVal = EXP(-18.0 * (u * u))
            delayBase = 0.00075 + 0.018 * (1.0 - expVal)

            ' Progressive speed boost between frames 1000 and 4000
            IF frame >= 1000 AND frame <= 4000 THEN
                ' boost goes from 0 to 1 and returns to 0 without any abrupt jump
                boost = (SIN(((frame - 1000) / 3000.0) * PI)) ^ 2
                ' Reaches double speed (halved time) at the center
                delayCorrente = delayBase * (1.0 - 0.55 * boost)
            ELSE
                delayCorrente = delayBase
            END IF

            _DELAY delayCorrente

            ' Gaussian speed control (sped up by 1/4)
            ' DIM u AS SINGLE, expVal AS SINGLE
            'u = (frame / 5000.0) - 0.5
            'expVal = EXP(-18.0 * (u * u))

            'delayCorrente = 0.00075 + 0.018 * (1.0 - expVal)

            '_DELAY delayCorrente

            EXIT DO
        END IF
        _LIMIT 60
    LOOP
LOOP

SUB ProiettaPunto (x AS SINGLE, y AS SINGLE, z AS SINGLE, cx AS SINGLE, cy AS SINGLE, cz AS SINGLE, fx AS SINGLE, fy AS SINGLE, fz AS SINGLE, rx AS SINGLE, ry AS SINGLE, rz AS SINGLE, ux AS SINGLE, uy AS SINGLE, uz AS SINGLE, px AS SINGLE, py AS SINGLE, pzOut AS SINGLE)
    DIM dx AS SINGLE, dy AS SINGLE, dz AS SINGLE
    dx = x - cx: dy = y - cy: dz = z - cz
    pzOut = dx * fx + dy * fy + dz * fz
    IF pzOut > 0.1 THEN
        px = (dx * rx + dy * ry + dz * rz) / pzOut * 1000.0
        py = (dx * ux + dy * uy + dz * uz) / pzOut * 1000.0
    ELSE
        px = -9999: py = -9999
    END IF
END SUB

SUB DisegnaLinea (a AS INTEGER, b AS INTEGER, vis() AS INTEGER, px() AS SINGLE, py() AS SINGLE)
    IF vis(a) = 1 AND vis(b) = 1 THEN
        LINE (px(a), py(a))-(px(b), py(b))
    END IF
END SUB