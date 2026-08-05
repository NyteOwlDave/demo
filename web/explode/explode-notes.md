
[allegro]: <https://liballeg.org/>
[djgpp]: <https://www.delorie.com/djgpp/>

[me]: <http://dave-omega/demo/web/explode/explode-notes.html>

----------------------------------------------------------------

# [Explosion Animation][me]

This demo was inspired by __Shawn Hargreaves__, author of
The [`Allegro Game Library`][allegro] for `DJGPP`.

[`DJGPP`][djgpp] is a `C++ Compiler` by __DJ Delorie__.

----------------------------------------------------------------

## Draw Frame

```javascript

let frame = -1

function draw() {
	if ( frame<0 ) return;
	if ( frame >= Sprites.EXPLODE_FRAMES ) {
        frame=0;
    }
	const pal = htmlFirePalette.color;
	Sprites.drawFrame( idCanvas, frame++, 10, 10, pal );
}

```

----------------------------------------------------------------

## Main Method

```javascript

function main() {
	Sprites.createFrames()
	Sprites.createExplosions()
	messages.textContent = 'Enjoy!';
	frame = 0
	window.setInterval(draw,20)
}

```

----------------------------------------------------------------

<style>
@import url("./../../style/every-page.css");
</style>
