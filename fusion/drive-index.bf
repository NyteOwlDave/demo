
' REM ~ https://basicfusion.org/
' REM ~ https://www.edubasic.net/

DIM SHARED index( 1 to 26, 1 to 3 ) as String

CLS 
PRINT "Drive Index"

ReadIndex()

' TestSingle()
TestRange()

END

SUB TestSingle()
    s$ = "E"
    n = FindIndex( s$ )
    ShowLink( n )
END SUB

SUB TestRange()
    ShowLinks( 8, 5 )
END SUB

SUB ReadIndex()
    FOR x = 1 TO 26
        READ T$ : READ U$: READ C$
        index( x, 1 ) = T$
        index( x, 2 ) = U$
        index( x, 3 ) = C$
    NEXT x
END SUB

SUB ShowLink( i )
    T$ = index( i, 1 )
    U$ = index( i, 2 )
    C$ = index( i, 3 )
    PRINT
    PRINT "Index of "; T$; " : "; i
    PRINT "Value of "; T$; " : "; U$
    PRINT "Comment : "; C$
END SUB

SUB ShowLinks( first, count )
    CLS : PRINT
    IF ( first < 1 ) THEN first = 1
    IF ( count > 6 ) THEN count = 6
    si = first
    ei = first + count - 1
    FOR i = si TO ei
        IF ( i > 26 ) THEN EXIT FOR
        PRINT "+ "; index( i, 1 )
        PRINT "@ "; index( i, 2 )
        PRINT "| Comment := "; index( i, 3 )
        PRINT
    NEXT i
    PRINT
END SUB

FUNCTION FindIndex( title$ )
    FOR x = 1 TO 26
        T$ = index( x, 1 )
        IF ( T$ = title$ ) THEN
            FindIndex = x
            EXIT FUNCTION
        END IF
    NEXT x
    FindIndex = 0
END FUNCTION

DATA "A", "?", "BASIC Anywhere"
DATA "B", "https://www.facebook.com/groups/2057165187928233", "BASIC Programming"
DATA "C", "?", "Online Clipboard"
DATA "D", "?", "DropBox"
DATA "E", "https://www.edubasic.net/", "EduBASIC"
DATA "F", "https://basicfusion.org/", "BASIC Fusion"
DATA "G", "?", "Google Drive"
DATA "H", "?", "Hysteresis"
DATA "I", "?", "I-Drive"
DATA "J", "?", "J: Drive"
DATA "K", "?", "K: Drive"
DATA "L", "?", "L: Drive"
DATA "M", "?", "Microsoft OneDrive"
DATA "N", "?", "N: Drive"
DATA "O", "?", "O: Drive"
DATA "P", "?", "P: Drive"
DATA "Q", "?", "Q: Drive"
DATA "R", "?", "R: Drive"
DATA "S", "?", "S: Drive"
DATA "T", "?", "T: Drive"
DATA "U", "?", "U: Drive"
DATA "V", "?", "V: Drive"
DATA "W", "?", "W: Drive"
DATA "X", "?", "X: Drive"
DATA "Y", "?", "Y: Drive"
DATA "Z", "?", "Z: Drive"


