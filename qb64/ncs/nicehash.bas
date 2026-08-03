DIM SHARED BTC2DOLLARS AS SINGLE
DIM SHARED SAT2BTC AS SINGLE
SAT2BTC! = 1E-08
BTC2DOLLARS! = 50355.84

DECLARE SUB SolveSat(coin AS SINGLE)
DECLARE SUB SolveBtc(coin AS SINGLE)
DECLARE SUB ShowResults(total AS SINGLE)
DECLARE SUB Main()
DECLARE SUB Banner(title AS STRING)
DECLARE SUB Repeat(ch$ AS STRING, count AS INTEGER)


' Run the application
Main


' Show Final Results
SUB ShowResults (total!)
    PRINT "--------"
    PRINT "1 SAT = "; SAT2BTC!; "btc"
    PRINT "1 BTC = $"; BTC2DOLLARS!
    PRINT "--------"
    PRINT "TOTAL = $"; total!
END SUB


' Solve by SAT Count
SUB SolveSat (coin!)
    DIM total AS SINGLE
    PRINT
    PRINT "COIN = "; coin!; " sat"
    total! = coin! * SAT2BTC! * BTC2DOLLARS!
    ShowResults (total!)
END SUB

' Solve by BTC Count
SUB SolveBtc (coin!)
    DIM total AS SINGLE
    PRINT
    PRINT "COIN = "; coin!; " btc"
    total! = coin! * BTC2DOLLARS!
    ShowResults (total!)
END SUB

' Print Repeating Character
SUB Repeat (ch$, count%)
    PRINT STRING$(count%, ch$);
END SUB

' Print Banner Window
SUB Banner (title$)
    DIM count AS INTEGER
    count% = 2 + LEN(title$)
    PRINT
    Repeat "=", count%
    PRINT
    PRINT " "; title$
    Repeat "=", count%
    PRINT
END SUB

' Main Program
SUB Main ()
    DIM SAT AS SINGLE
    DIM BTC AS SINGLE
    'Banner "Cudo Miner"
    'SAT! = 5033 ' SAT
    'SolveSat SAT!
    'Banner "Cudo Miner"
    'BTC! = 0.00000072
    'SolveBtc BTC!
    Banner "NiceHash"
    SAT! = 9979
    SolveSat SAT!
END SUB




