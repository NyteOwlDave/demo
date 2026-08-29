<style>
@import url("./../style/every-page.css");
</style>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[demo-omega]:
<http://dave-omega/demo/demo-menu.html>
"Omega Edition"

[basic-group]:
<https://www.facebook.com/groups/2057165187928233>
"BASIC Programming Group"

[author]:
<https://www.facebook.com/groups/2057165187928233/user/100000879515133>
"Aurel Wizzard"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[specbas-ide]:    <./auto/> "( pending )"
[spectrum-zx]:    <./auto/> "( pending )"
[spectrum-basic]: <./auto/> "( pending )"

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->

[me-omega]:
<http://dave-omega/demo/spectrum/random-hearts.html>
"Omega Edition"

[me-tower]:
<http://dave-tower/demo/spectrum/random-hearts.html>
"Tower Edition"

[me-legacy]:
<http://dave-legacy/demo/spectrum/random-hearts.html>
"Legacy Edition"

----------------------------------------------------------------

# Random Hearts

----------------------------------------------------------------

> [Omega][me-omega]
> [Tower][me-tower]
> [Legacy][me-legacy]

> [File System](./)

----------------------------------------------------------------

> [BASIC Demos][demo-omega]
> [BASIC Group][basic-group]
> [Author][author]

----------------------------------------------------------------

# [Source Code](./random-hearts.bas)

```basic

' AUTHOR   : Aurel Wizzard
' GROUP    : BASIC Programming
' FILENAME : random-hearts.bas
' LANGUAGE : Spectrum ZX
' IDE      : SpecBAS

var x,y,i,p,j,w,h,turn,x1,y1,rc,gc,bc

wcolor 60,0,0 : fcolor 220,200,0

w=800 : h=800 : j=1

while turn < 70

  i = 0
  rc = rand(250)
  gc = rand(250)

  fcolor rc,gc,0

  p = rand(50)

  while i < 1.78

    j = -j
    x = x1 + w/16 + p*j*i
    y = y1 + h/16 + ( sqr(cos(i)) * cos(313*i) - sqr(i) )
    pset x, y

    i = i + 0.0005

  wend

  swap

  turn = turn + 1
  x1 = rand(w)
  y1 = rand(h)

wend

```

----------------------------------------------------------------

# Project Details

| Item     | Value               |
|----------|---------------------|
| AUTHOR   | Aurel Wizzard       |
| GROUP    | BASIC Programming   |
| FILENAME | random-hearts.bas   |
| LANGUAGE | Spectrum ZX         |
| IDE      | SpecBAS             |

----------------------------------------------------------------

# Author Details

| Item     | Value           |
|----------|-----------------|
| AUTHOR   | Aurel Wizzard   |
| USER-ID  | 100000879515133 |

----------------------------------------------------------------

# Group Details

| Item     | Value               |
|----------|---------------------|
| PROVIDER | Facebook            |
| GROUP    | BASIC Programming   |
| GROUP-ID | 2057165187928233    |

----------------------------------------------------------------

# Toolkit

- [SpecBAS IDE][specbas-ide]

----------------------------------------------------------------

# References

- [Spectrum ZX][spectrum-zx]
- [Spectrum Basic][spectrum-basic]

----------------------------------------------------------------

<script>
; doc = document
; doc . title = ( `Random Hearts Demo` )
</script>

<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
