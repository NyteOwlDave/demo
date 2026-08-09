_FullScreen
10 Rem Julia Fractal on legacy screen 12
15 Rem Old school approach using line numbers, goto, gosub
20 Screen 12
25 GoSub 270
30 Let width% = 640
40 Let height% = 480
55 Let ci# = 0.5213
60 Let cr# = -0.5125
70 For y% = 0 To height%
    80 For x% = 0 To width%
        90 Let zr# = x% / (width% - 2) * 3 - 1.5
        100 Let zi# = y% / (height% - 2) * 2 - 1
        130 Let i% = 0
        140 Rem start of loop which calculates z values
        150 Let zrnew# = zr# ^ 2 - zi# ^ 2 + cr#
        160 Let zi# = 2 * zr# * zi# + ci#
        170 Let zr# = zrnew#
        180 Let i% = i% + 1
        190 If (i% < 510) And ((zr# ^ 2 + zi# ^ 2) < 4) Then GoTo 150
        220 PSet (x%, y%), i% / 32
    230 Next x%
240 Next y%
250 Sleep
260 End
265 Rem subroutine to modify palette color attributes
270 For k% = 0 To 15
    280 Let blue% = k% ^ 2 / 4
    290 Let red% = Sqr(k%) * 16
    300 Let green% = k% * 4 + 3
    310 Palette k%, red% + green% * 256 + blue% * 65536
320 Next k%
330 Return

