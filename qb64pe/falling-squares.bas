' Falling Squares    K Moerman
Const W = 784, H = 512, S = 16
Screen _NewImage(W, H, 32): _Title "Falling squares": t% = 0
Do
    For x% = 0 To W Step S
        y% = (x% Xor t%) Mod H
        r% = x% Mod 255: col& = _RGB32(r%, (x% Mod 128) * 2, 255 - r%)
        Line (x%, y%)-Step(S, S), col&, BF: Line (x%, y%)-Step(S, S), _RGB32(0), B
    Next x%
    _Display
    _Limit 60
    t% = (t% + 1) Mod 32767
Loop

