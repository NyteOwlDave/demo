<link rel="stylesheet" href="help.css">

# Introduction

---

➡ [Index](#Index)

---

# What is PhotoPlanet?

It's a ball with a photo on it that spins around. Not too tough.
But it's a little more than that.

It's an app that can be used to create these balls, animate them
on the screen of any computing device, and share them with other
people.

In other words, once you create your own PhotoPlanet, you can save
it to a file or files and share these with others. The files use
very simple text [formats](formats.html) that can be modified
using any 
[plain text editor](https://en.wikipedia.org/wiki/Text_editor) app.

Not only that, but future enhancements will give the app the 
capability to do special effects like text message marquee, 
bump-maps, fractals, fire, video or other cool stuff.

---

# Buzz Words

Like most tech stuff, we use a few fancy words here to describe 
things. Nothing tough. But we need to get familiar with some of
the words and what they mean before we can learn to use the app
to the fullest.

You've probably heard these words used before. Possibly in
different contexts or situations where they meant other things.
Here we're using the terms primarily from a _computer graphics_
point of view.

The four primary words are:

* [Bitmap](#bitmap)
* [Planet](#planet)
* [Texture](#texture)
* [Palette](#palette)

---

<a id="bitmap"></a>

# Bitmap

See: [Bitmap](https://en.wikipedia.org/wiki/Bitmap)

This is a very general term from computer graphics. It's basically
just a digitized photo image stored as an array of color dots called
_pixels_ (short for _picture elements_). This is what modern cameras
and computing devices with camera capability produce. Older paper
photos may also be _digitized_ by a __scanner__ to produce bitmaps.

The PhotoPlanet app can __import__ bitmap images (photos) and
separate them into the _texture_ and _palette_ information it needs
to draw on the spinning ball.

---

<a id="planet"></a>

# Planet

This is basically the whole ball of wax (pardon the pun). It's all
the information needed to generate the spinning ball on the screen
with an image mapped on the surface. Some of this information is
_static_ and some _dynamic_.

<dt>Static</dt>
<dd>Persistent when stored to a file and shared</dd>

<dt>Dynamic</dt>
<dd>Recreated each time the planet is loaded into the app</dd>

The __static__ information consists of:

* Size [64, 128, or 256]
* Orientation (pitch, yaw and roll angles)
* Scale (vertical texture repeat count)
* Slices (number of horizontal slices)
* Palette (colors used)
* Texture (indexed 2D color map)

The __dynamic__ information consists of:

* Animation map (indexed 3D color map)
* Spin angle
* Spin rate
* Texture aspect ratio

<aside>
If this is all making your head spin, don't fret! You don't need
to understand all the details to use the app. They're here for
you if and/or when you might want to know more.
</aside>

The __static__ information is what gets written to a file and shared
or just saved for later. The __dynamic__ information is generated
as needed when the planet is being used.

---

<a id="texture"></a>

# Texture

See: [Texture Mapping](https://en.wikipedia.org/wiki/Texture_mapping)

This is just a fancy word for the <q>pattern</q> portion of the imagery
drawn on the planet. Technical this is only the _color index map_ part.
But we use the term loosely. For example, when you import a photo
into the app to be applied to the planet, we say you're pulling in
a texture. But internally the app separates the color index part of
the photo from the actual color definitions. We don't want to get too
technical here, but this is what's known as using a _paletted image_.

We can't get too deeply into an understanding of this without first
discussing palettes. Just try to understand these facts:

* When imported, photo __bitmaps__ are separated into _palettes_ and _textures_
* A __bitmap__ is a 2D array of _pixels_ (picture elements)
* A __pixel__ has a _color definition_ and a _2D location_
* A __palette__ is just a simple _list of colors_
* A __palette entry__ is a _color index number_ and a _color definition_
* A __texture__ is a 2D array of _texels_ (texture elements)
* A __texel__ has a _color index number_ and a _2D location_
* Each __texel__ is used to look up a _color definition_ from a _palette_
* That __color definition__ then becomes a _pixel_ again

---

<a id="palette"></a>

# Palette

The palette is the set of colors used to draw the image on the ball.
The app is designed to _import_ full color images (up to 16,777,216
possible colors). But it can't use all of those colors. Instead, it
tries to intelligently choose the most important 256 colors from any
image. This is known as _palette optimization_.
See: [Adaptive Palette](https://en.wikipedia.org/wiki/Palette_(computing)#Adaptive_palette).

Once the optimal palette for an image is determined, another technique
called _color matching_ is used to extract a texture (the bumpiness)
from the photo. Basically, each full color _pixel_ (picture element) in
the original image is examined and matched to the most similar color in
the optimized palette. This results in what we call a _texel_ (texture
element). Texture elements are just index values. They tell which color
from the palette to select when recreating a _pixel_ from the _texel_.
See: [Color Management](https://en.wikipedia.org/wiki/Color_management).

In other words, think of the palette as a collection of colored pencils.
Each one is assigned a number (index) from 0 to 255. The texel value is
then the pencil number to choose when selecting a color for a "bump" in
the texture. See: 
[Indexed Color](https://en.wikipedia.org/wiki/Palette_(computing)).


---

<a id="example"></a>

# Example

---

We realize all this palette and texture and bitmap business can be
quite a headache for the novice. You really don't need to understand
it all in detail. However doing so will make it easier for you to
grasp why certain actions require certain steps. And what all that
info in the files means (if you decide to check them out).

So, here's an [example](example-1.html) to show how this palette and
texture business all words. A very simple example.

---

<a id="Index"></a>

# Index

* [Introduction](intro.html)
* [Planet Operations](planet.html)
* [Texture Operations](texture.html)
* [Palette Operations](palette.html)
* [File Formats](formats.html)
* [Application](../index.html)

---
<footer>
Copright &copy; Dave Wellsted<br>
[NyteOwl Computer Software](https://nyteowl-computer-software.business.site)
</footer>
