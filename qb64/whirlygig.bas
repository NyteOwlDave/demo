Screen _NewImage(900, 900, 256): Color 3, 0
Dim WW As Double: Dim W As Single: Dim i As Single: Dim ti As Single
Dim xmid As Single: Dim ymid As Single: Dim pi As Single
pi = 4 * Atn(1): R = pi / 2 'PIE
Locate 1, 2: Print "Enter a number between .001 and 999. Odd Numbers seem to work best"
Locate 2, 2: Print "The smaller the Number the Slower and longer it will run"
Locate 3, 2: Print "Enter a number above 0, Default is .3"
Locate 4, 2: Input "STEP Map Count:"; ti
If ti = 0 Then ti = .3
Cls: Locate 1, 2: Print "SIN/SIN:"; ti
'WW = 2147483646 ' Long: 2147483647
WW = 16 * 1024768 ' Long: 2147483647
START:
IF i THEN CIRCLE (450, 450), i, (i MOD 16) + 32, , ,.8 ELSE
i = i + 1
If i < 380 Then GoTo START Else Dim b2%(10000)
For W = 1 To WW Step ti ' 0.3
    IF LEN(INKEY$) THEN EXIT FOR ELSE
    xmid = 429 + Sin(7 * W / 1000) * 260
    ymid = 429 + Sin(11 * W / 1000) * 130
    ' Change the 1000 to 3000 or 5000 and see the changes even 10 and 100 are cool. 9000 was used for the Image below.
    ' The larger the Number her is Slower the program runs
GET ((xmid - (SIN(w) * 28)), (ymid - (COS(w) * 20)))-((xmid - _
(SIN(w) * 28)) + 40, (ymid - (COS(w) * 20)) + 40), b2%()
    ' Add more PUTs at will, the first one was the org one and the best one.
    Put ((xmid - (Sin(W - .04) * 27.16)), (ymid - (Cos(W - .04) * 19.4))), b2%(), PSet
    ' Put ((xmid - (Sin(W - .05) * 27.18)), (ymid - (Cos(W - .05) * 19.5))), b2%(), PSet
    ' Put ((xmid - (Sin(W - .06) * 27.20)), (ymid - (Cos(W - .06) * 19.6))), b2%(), PSet
    ' Put ((xmid - (Sin(W - .07) * 30.21)), (ymid - (Cos(W - .07) * 19.7))), b2%(), PSet
    Locate 1, 2: Print "Press Any Key to End, By the way there is no Key that says AnyKey."
    Locate 4, 2: Print "TI:"; ti
    Locate 5, 2: Print "W:"; W
    Locate 6, 2: Print "XMID:"; xmid: Locate 7, 2: Print "YMID:"; ymid
    Locate 8, 2: Print "WW:"; WW
    Locate 9, 2: Print "b2%():"; b2%()
Next
doover:
If InKey$ = "" Then GoTo doover Else End

