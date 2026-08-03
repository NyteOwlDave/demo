Print "Use relative mouse movement mode with ESC key exit only?(Y/N) ";
K$ = UCase$(Input$(1))
Print K$
Print

For i = 1 To _Devices 'DEVICES MUST be read first!
    Print Str$(i) + ") " + _Device$(i) + " Buttons:"; _LastButton(i); ",Axis:"; _LastAxis(i); ",Wheel:"; _LastWheel(i)
Next
If K$ = "Y" Then dummy = _MouseMovementX 'enable relative mouse movement reads
Print

Do
    x& = _DeviceInput 'determines which device is currently being used
    If x& = 1 Then
        Print "Keyboard: ";
        For b = 1 To _LastButton(x&)
            bb = _ButtonChange(b)
            If bb Then Print b; bb; _Button(b);
        Next
        Print
    End If
    If x& > 1 Then '  skip keyboard reads
        Print "Device:"; x&;
        For b = 1 To _LastButton(x&)
            Print _ButtonChange(b); _Button(b);
        Next
        For a = 1 To _LastAxis(x&)
            Print _Axis(a); 'mouse axis returns -1 to 1 with 0 center screen
        Next
        For w = 1 To _LastWheel(x&)
            Print _Wheel(w); 'wheels 1 and 2 of mouse return relative pixel moves when enabled
        Next
        Print
    End If
Loop Until InKey$ = Chr$(27) 'escape key exit

End

