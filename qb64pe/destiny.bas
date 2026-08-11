
'
' NyteOwlDave ~ 2026-AUG-08
' Platform : QB64 Phoenix
' Dedicated to the BASIC Programming "Gang"
'

_Title "Dial of Destiny"

Dim Shared SW As Integer
Dim Shared SH As Integer

Dim Shared CX As Integer
Dim Shared CY As Integer

SW = 800: CX = SW \ 2
SH = 800: CY = SH \ 2

img& = _NewImage(SW, SH, 32)

Screen img&

Const TRUE = 1
Const FALSE = 0
Const TAU# = 2 * _Pi

Type Date
    Year As Integer
    Month As Integer
    Day As Integer
End Type

Dim Shared DaysInMonth(12) As Integer

'  JAN FEB MAR APR
Data 31,28,31,30

'  MAY JUN JUL AUG
Data 31,30,31,31

'  SEP OCT NOV DEC
Data 30,31,30,31

For m% = 1 To 12
    Read DaysInMonth(m%)
Next m%

' UNCOMMENT THIS FOR CUSTOM FONT
' See Notes Below Regarding Pathname

' UseCustomFont

Dim now As Date
GetToday now

julian% = JulianDate(now)

If IsLeapYear(now.Year) Then
    days% = 366
Else
    days% = 365
End If

ratio# = julian% / CDbl(days%)

pct$ = Percent$(ratio#)

Color _RGB32(200, 255, 200)
Locate 2, 5: Print "Today : "; Date$
Locate 3, 5: Print "Days Total : "; days%
Locate 4, 5: Print "Days Passed : "; julian%; " ("; pct$; ")"

DrawDial ratio#

Sleep
End

Function IsLeapYear (year%)
    If (0 = (year% Mod 400)) Then
        IsLeapYear = TRUE
        Exit Function
    End If
    If (0 = (year% Mod 100)) Then
        IsLeapYear = FALSE
        Exit Function
    End If
    IsLeapYear = (0 = (year% Mod 4))
End Function

Function GetDaysInMonth% (dt As Date)
    If (2 = dt.Month) Then
        If (IsLeapYear(dt.Year)) Then
            GetDaysInMonth% = 29
            Exit Function
        End If
    End If
    GetDaysInMonth% = DaysInMonth(dt.Month)
End Function

Function JulianDate% (dt As Date)
    sum% = dt.Day
    limit% = dt.Month - 1
    For m% = 1 To limit%
        sum% = sum% + DaysInMonth%(m%)
    Next m%
    If (limit% < 2) Then
        JulianDate% = sum%
        Exit Function
    End If
    If (IsLeapYear(dt.Year)) Then
        sum% = sum% + 1
    End If
    JulianDate% = sum%
End Function

Sub GetToday (dt As Date)
    ParseDate Date$, dt
End Sub

Sub ParseDate (d$, dt As Date)
    dt.Year = Val(Right$(d$, 4))
    dt.Month = Val(Left$(d$, 2))
    dt.Day = Val(Mid$(d$, 4, 2))
End Sub

Sub ShowDaysPerMonth ()
    Dim dt As Date
    Cls
    Print "Days Per Month"
    Print "Today : "; Date$
    Print
    GetToday dt
    For m% = 1 To 6
        dt.Month = m%
        Print GetDaysInMonth(dt),
    Next m%
    Print
    For m% = 7 To 12
        dt.Month = m%
        Print GetDaysInMonth(dt),
    Next m%
    Print
End Sub

Sub ShowDate (dt As Date)
    Cls
    Print "Year : "; dt.Year
    Print "Month : "; dt.Month
    Print "Day : "; dt.Day
End Sub

Sub ShowToday ()
    Dim dt As Date
    GetToday dt
    ShowDate dt
End Sub

Sub DrawDial (ratio#)
    ox = CX
    oy = CY + 40
    c = _RGB32(255, 215, 15)
    Circle (ox, oy), 150, c
    If (ratio# < 0.004) Then
        Exit Sub
    End If
    If (ratio# >= 0.997) Then
        Paint (ox, oy), c
        Exit Sub
    End If
    theta# = -(ratio# * TAU# - _Pi(0.5))
    x = ox + 150 * Cos(theta#)
    y = oy - 150 * Sin(theta#)
    Line (ox, oy)-(ox, oy - 150), c
    Line (x, y)-(ox, oy), c
    Paint (ox + 1, oy - 149), c
End Sub

Function Percent$ (ratio#)
    n = Int(1000 * ratio#) / 10
    Percent$ = Str$(n) + "%"
End Function

' If you decide to use the custom font, you'll need
' to modify the pathname for the file's location on
' your file system.
Sub UseCustomFont ()
    fnt& = _LoadFont("/home/dave/Mount/REPO/demo/qb64pe/font/KeeponTruckin.ttf", 40)
    _Font fnt&
End Sub


