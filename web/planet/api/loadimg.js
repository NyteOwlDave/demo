
/*

    loadimg.js

    Image file loader

    Dave Wellsted, NyteOwl Computer Software
    Last Update: 2020-MAY-17

    REQUIRES:
    
        p5.js
        v4/dlg.js
        v4/grafix.js

    2020-APR-01
    Updated to use texture canvas (rather than planet canvas).
    Added draw() and capture() methods.

    2020-APR-02
    Rewrote load() method to accept File or String arg
    Added prompt_load() and prompt_save() methods
    
    2020-APR-04
    Cosmetic improvements
    Moved most draw functionality to Grafix object
    Moved most capture functionality to Grafix object
    Tweaked load method

    2020-MAY-17
    Cosmetics

*/

// Singleton image loader object
const ImageLoader = {
    canvas: null,
    gfx: null
}

// Compose URL from filename
ImageLoader.getURL = function(filename) {
    return `./art/${filename}`;
}

// One-time initialization
ImageLoader.init = function() {
    const me = ImageLoader;
    let canvas = me.canvas;
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.style.visibility = 'hidden';
        me.canvas = canvas;
    }
    me.gfx = canvas.getContext('2d');
    return canvas;
}

// Load image from file into canvas
// Filename may be URL or File/Blob object
ImageLoader.load = function(filename, onload) {
    const me = ImageLoader;
    const img = new Image();
    function loaded() {
        img.width  = img.naturalWidth;
        img.height = img.naturalHeight;
        me.draw(img);
        if ('function'===(typeof onload)) {
            onload(me.capture());
        }
    }
    img.onload = loaded;
    if (filename instanceof File) {
        const file = filename;
        const rdr = new FileReader();
        rdr.onload = function(e) {
            img.src = e.target.result;
        }
        rdr.readAsDataURL(file);
        console.log('Blob', file.name);
    } else {
        img.src = me.getURL(filename);
        console.log('Load', img.src);
    }
    return me;
}

// Draw CanvasImageSource or ImageData to canvas
ImageLoader.draw = function(img) {
    const me = ImageLoader;
    const canvas = me.init();
    return Grafix.draw(canvas, img, "black");     // grafix.js
}

// Capture image from canvas (as ImageData)
ImageLoader.capture = function() {
    const me = ImageLoader;
    const canvas = me.init();
    return Grafix.capture(canvas);     // grafix.js
}

// Prompt user to load an image
ImageLoader.prompt_load = function() {
    const me = ImageLoader;
    imageFileDialog(false, files=>{     // dlg.js
        me.load(files[0]);
    });
}

// Prompt user to save an image
ImageLoader.prompt_save = function() {
    const me = ImageLoader;
    let name = inputBox("Texture Filename", "texture");     // dlg.js
    if (name.length) {
      saveCanvas(me.init(), name, "png");                   // p5.js
    }
}

