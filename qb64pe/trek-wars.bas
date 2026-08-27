
' NyteOwlDave ~ 2026-AUG-26
' Alpha Blending is My Algo
' Darken Source:
' https://qb64phoenix.com/qb64wiki/index.php/MEMIMAGE

_Title "Trek Wars"

Screen _NewImage(400, 400, 32)

' Modify Pathname as Needed
i& = _LoadImage("./art/trek-wars.png") ' Any 256x256 24-bit
t& = _LoadImage("./art/phoenix-tile.png") ' Any 200x200 24-bit

'Color _RGB32(255, 215, 15), _RGB32(22, 22, 88)
'Cls

_PutImage (0, 0), t&
_PutImage (0, 200), t&
_PutImage (200, 0), t&
_PutImage (200, 200), t&

' _PutImage (72, 72), i&
' DarkenTest1 i&
GradientTest1 i&

Sleep: End

Sub DarkenTest1 (im&)
    For n! = 1 To 0.2 Step -0.01
        i2& = _CopyImage(im&)
        DarkenImage i2&, n!
        _PutImage (72, 72), i2&
        _FreeImage i2&
        _Delay 0.025
        _Display
    Next
End Sub

Sub GradientTest1 (im&)
    i2& = _CopyImage(im&)
    GradientImage i2&
    _PutImage (72, 72), i2&
    _FreeImage i2&
    _Display
End Sub

Sub DarkenImage (Image As Long, Value_From_0_To_1 As Single)
    If Value_From_0_To_1 <= 0 Or Value_From_0_To_1 >= 1 Or _PixelSize(Image) <> 4 Then Exit Sub
    Dim Buffer As _MEM: Buffer = _MemImage(Image) 'Get a memory reference to our image
    Dim Frac_Value As Long: Frac_Value = Value_From_0_To_1 * 65536 'Used to avoid slow floating point calculations
    Dim O As _Offset, O_Last As _Offset
    O = Buffer.OFFSET 'We start at this offset
    O_Last = Buffer.OFFSET + _Width(Image) * _Height(Image) * 4 'We stop when we get to this offset
    'use on error free code ONLY!
    $Checking:Off
    Do
        _MemPut Buffer, O, _MemGet(Buffer, O, _Unsigned _Byte) * Frac_Value \ 65536 As _Unsigned _Byte
        _MemPut Buffer, O + 1, _MemGet(Buffer, O + 1, _Unsigned _Byte) * Frac_Value \ 65536 As _Unsigned _Byte
        _MemPut Buffer, O + 2, _MemGet(Buffer, O + 2, _Unsigned _Byte) * Frac_Value \ 65536 As _Unsigned _Byte
        O = O + 4
    Loop Until O = O_Last
    'turn checking back on when done!
    $Checking:On
    _MemFree Buffer
End Sub

Sub GradientImage (Image As Long)
    If _PixelSize(Image) <> 4 Then Exit Sub
    Dim Buffer As _MEM: Buffer = _MemImage(Image) 'Get a memory reference to our image
    Dim Frac_Value As Long, Value_From_0_To_1 As Single
    Dim O As _Offset, O_Last As _Offset
    Dim N As Long, N_Last As Long
    Dim Row As Long, Rows As Long, Cols As Long
    Dim Alpha As _Unsigned _Byte
    Rows = _Height(Image): Cols = _Width(Image)
    N_Last = Cols * Rows
    O_Last = Buffer.OFFSET + 4 * N_Last - 4 'We stop when we get to this offset
    O = Buffer.OFFSET 'We start at this offset
    N = 0
    'use on error free code ONLY!
    '$Checking:Off
    Do
        R = _MemGet(Buffer, O, _Unsigned _Byte)
        G = _MemGet(Buffer, O + 1, _Unsigned _Byte)
        B = _MemGet(Buffer, O + 2, _Unsigned _Byte)
        T = R + G + B
        If T <> 0 Then
            Row = Rows - Int((N + 0.5) / N_Last * Rows)
            Value_From_0_To_1 = Row / Rows
            Alpha = Value_From_0_To_1 * 255
        Else
            Alpha = 0
        End If
        _MemPut Buffer, O + 3, Alpha
        O = O + 4: N = N + 1
    Loop Until O >= O_Last
    'turn checking back on when done!
    '$Checking:On
    _MemFree Buffer
End Sub

