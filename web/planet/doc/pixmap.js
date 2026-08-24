
/*

    pixmap.js

    Support for loading and analyzing a small bitmap image.

    Dave Wellsted, NCS
    2020-APR-15

    REQUIRES:

    From nyteowl/api/2020:
        v8/ez-types.js (or v2/types.js)
        v8/ez-elen.js (or v2/elen.js)

    DESCRIPTION:

    Contains some extraordinary Canvas and Color manipulations.

    * Format/parse incredible range of color/palette notations.
    * Load/save capture bitmaps.
    * Perform most primitive 2D canvas operations.

    TODO:

    * Pattern matching for parsing tokenized color notations (ColorCodec)
    * ColorMap enhanced features

    2020-APR-15
    * Tweaked ColorMap.capture_colors method

*/

// Base class for anything with width, height, area and size
class SizedObjectBase {
    constructor() {}  
    // Stub for unimplemented width getter
    get width() {
        this.notImplemented("width");
    }
    // Stub for unimplemented height getter
    get height() {
        this.notImplemented("height");
    }
    // Width * height
    get area() {
        return this.width * this.height;
    }
    // Geometry object {w, h, a}
    // width, height, area
    get size() {
        return {
            w : this.width,
            h : this.height,
            a : this.area
        };
    }
    // Whether coords are within bounds
    has_coords(x, y) {
        if (isNaN(x)||isNaN(y)) return false;
        if ((0>x) || (x>=this.width )) return false;
        if ((0>y) || (y>=this.height)) return false;
        return true;
    }
    // Whether 1D index is within range (0 <= i < area)
    has_index(i) {
        if (isNaN(i)) return false;
        return ((0<=i)&&(i<this.area));
    }
    // Throw not implemented exception
    notImplemented(name) {
        throw new Error("Derived class must implement the ${name} method");
    }
    // Do fixups on an integer value
    // (Maps illegal values to 0)
    fixInt(n) {
        n = parseInt(n);
        return (isFinite(n) ? n : 0);
    }
    // Do fixups on a float value
    // (Maps illegal values to 0)
    fixFloat(n) {
        n = parseFloat(n);
        return (isFinite(n) ? n : 0);
    }
}

// Canvas class
class Canvas extends SizedObjectBase {
    constructor(arg) {
        super();
        this.acquire(arg);
        Canvas.recent = this;
    }
    // Access to underlying HTML Canvas element
    get surface() {
        return this._canvas;
    }
    // Access to 2D rendering context object
    get context() {
        return this.surface.getContext("2d");
    }
    // Canvas width
    get width() {
        return this.surface.width;
    }
    // Canvas height
    get height() {
        return this.surface.height;
    }
    // Canvas geometry (w, h, area)
    set size(sz) {
        if ("undefined" === typeof this["_canvas"]) {
            this._canvas = Canvas.el("canvas");
            this._canvas.style.display = "none";
        }
        const canvas = this.surface;
        sz = sz || {};
        canvas.width  = this.fixInt(sz.w) || 1;
        canvas.height = this.fixInt(sz.h) || 1;
    }
    // Initialize SIZE from some other object
    acquire(arg) {
        let w = 1, h = 1;
        if ("object" === typeof arg) {
            const psi = (prop) => "undefined" !== typeof arg[prop];
            if (psi("naturalWidth")&&psi("naturalHeight")) {
                w = arg.naturalWidth;
                h = arg.naturalHeight;
            } else if (psi("width")&&psi("height")) {
                w = arg.width;
                h = arg.height;
            } else if (psi("w")&&psi("h")) {
                w = arg.w;
                h = arg.h;
            }
        }
        this.size = {
            w : w,
            h : h
        }
    }
    // Draw ImageData at (0, 0)
    // Inverse of capture()
    overlay(image) {
        return this.draw(image, 0, 0);
    }
    // Draw ImageData at (x, y)
    draw(image, x, y) {
        x = this.fixInt(x);
        y = this.fixInt(y);
        const gfx = this.context;
        gfx.putImageData(image, x, y);
        return this;
    }
    // Draw a stretched image
    // The source must be a Canvas or CanvasImageSource object
    // NOT ImageData!
    stretch(source, x, y, dw, dh) {
        dw = this.fixInt(dw);
        dh = this.fixInt(dh);
        if (dw*dh) {
            if (source instanceof Canvas) {
                source = source.surface;
            }
            let w = this.fixInt(source.width  || source.naturalWidth);
            let h = this.fixInt(source.height || source.naturalHeight);
            if (w*h) {
                x = this.fixInt(x);
                y = this.fixInt(y);
                const gfx = this.context;
                gfx.drawImage(source, x, y, w, h);
            }
        }
        return this;
    }
    // Capture the entire canvas image
    // Returns an ImageData instance
    // Inverse of overlay()
    capture() {
        const w = this.width;
        const h = this.height;
        return this.snip(0, 0, w, h);
    }
    // Snip out a portion of the canvas image
    // Returns an ImageData instance
    snip(x, y, w, h) {
        const gfx = this.context;
        x = super.fixInt(x);
        y = super.fixInt(y);
        w = super.fixInt(w);
        h = super.fixInt(h);
        return gfx.getImageData(x, y, w, h);
    }
    // Fill with arbitrary color
    fill(style) {
        const gfx = this.context;
        const w = this.width;
        const h = this.height;
        gfx.beginPath();
        gfx.fillStyle = style;
        gfx.fillRect(0, 0, w, h);
        return this;
    }
    // Fill with transparent color
    clear() {
        return this.fill("rgba(0,0,0,0)");
    }
    // Rectangle
    rect(x, y, w, h, stroke, fill) {
        const psi = o => typeof o !== "undefined";
        const gfx = this.context;
        gfx.beginPath();
        gfx.rect(x, y, w, h);
        if (psi(fill)) {
            gfx.fillStyle = fill;
            gfx.fill();
        }
        if (psi(stroke)) {
            gfx.strokeStyle = stroke;
            gfx.stroke();
        }
        return this;
    }
    // Ray
    ray(x, y, dx, dy, stroke) {
        const psi = o => typeof o !== "undefined";
        const gfx = this.context;
        gfx.beginPath();
        gfx.moveTo(x, y);
        gfx.lineTo(x+dx, y+dy);
        if (psi(stroke)) {
            gfx.strokeStyle = stroke;
        }
        gfx.stroke();
        return this;
    }
    // Line strip / polygon
    line_strip(points, indices, stroke, fill) {
        const psi = o => typeof o !== "undefined";
        const gfx = this.context;
        const count = indices.length;
        if (count > 1) {
            let i = 0;
            let p = points[indices[i]];
            let x = p.x;
            let y = p.y;
            gfx.beginPath();
            gfx.moveTo(x, y);
            for (i=1; i<count; i++) {
                p = points[indices[i]];
                x = p.x;
                y = p.y;
                gfx.lineTo(x, y);
            }
            if (count > 2) {
                if (psi(fill)) {
                    gfx.closePath();
                    gfx.fillStyle = fill;
                    gfx.fill();
                }
            }
            if (psi(stroke)) {
                gfx.strokeStyle = stroke;
                gfx.stroke();
            }
        }
        return this;
    }
    // Line list
    line_list(points, indices, stroke) {
        const psi = o => typeof o !== "undefined";
        const gfx = this.context;
        const count = Math.floor(indices.length/2);
        function line(i) {
            const ii = i+i;
            const jj = ii+1;
            const p0 = points[indices[ii]];
            const p1 = points[indices[jj]];
            gfx.beginPath();
            gfx.moveTo(p0.x, p0.y);
            gfx.lineTo(p1.x, p1.y);
            gfx.stroke();
        }
        if (count > 0) {
            if (psi(stroke)) {
                gfx.strokeStyle = stroke;
            }
            for (let i=0; i<count; i++) {
                line(i);
            }
        }
        return this;
    }
    // Point (circle)
    point(x, y, radius, stroke, fill) {
        return this.ellipse(x, y, radius, radius, 0, stroke, fill);
    }
    // Draw a regular polygon
    regular_polygon(x, y, radius, angle, numverts, stroke, fill) {
        const me = this;
        radius = Math.abs(parseFloat(radius) || 1);
        radius = isFinite(radius) ? radius : Math.min(this.width, this.height); 
        numverts = parseInt(numverts || 3);
        if (!isFinite(numverts)) {
            numverts = Math.floor(Math.PI*radius);
        } else {
            if (numverts < 0) {
                numverts = numverts % 3 + 6;
            }
            else if (numverts < 3) {
                numverts += 3;
            }
        }
        angle = parseFloat(angle) || 0;
        angle = (isFinite(angle)) ? angle : 0;
        const dv = numverts - 1;
        const da = 2*Math.PI/dv;
        const org = this.make_point(x, y);
        const points = [];
        const indices = [];
        function vert(index) {
            indices.push(index);
            const x = org.x + radius * Math.cos(angle);
            const y = org.y + radius * Math.sin(angle);
            points.push(me.make_point(x, y));
        }
        for(let n=0; n<numverts; n++) {
            vert(n);
            angle += da;
        }
        indices.push(0);    // Close the loop
        return this.line_strip(points, indices, stroke, fill);
    }
    // Ellipse
    ellipse(x, y, rx, ry, angle, stroke, fill) {
        const psi = o => typeof o !== "undefined";
        const gfx = this.context;
        gfx.beginPath();
        gfx.ellipse(x, y, rx, ry, angle, 0, 2*Math.PI, false);
        if (psi(fill)) {
            gfx.fillStyle = fill;
            gfx.fill();
        }
        if (psi(stroke)) {
            gfx.strokeStyle = stroke;
            gfx.stroke();
        }
        return this;
    }
    // Create a duplicate surface (optional resize)
    clone(w, h) {
        const other = new Canvas(this);
        w = w || this.width;
        h = h || this.height;
        other.stretch(this, 0, 0, w, h);
        return other;
    }
    // Append to HTML element
    append(parent,id) {
        parent = parent || document.body;
        if (el.is(parent)) {
            const canvas = this.clone();
            const elem = canvas.surface;
            parent.appendChild(elem);
            // Make the canvas visible! (It's invisible by default)
            elem.style.display = null;
            if ("string" === typeof id) {
                elem.setAttribute("id", id);
            }
            return elem;
        }
        throw new Error("Argument must be an HTML element");
    }
    // Create a new point object
    make_point(x, y) {
        const fix =(n) => ((n=parseFloat(n || 0)), (isFinite(n) ? n : 0));
        return {
            x : fix(x),
            y : fix(y)
        };
    }
    // Create a random point
    random_point() {
        const rnd = (n) => Math.round(Math.random()*(n-1));
        const w = this.width;
        const h = this.height;
        return this.make_point(rnd(w), rnd(h));
    }
}

// Create HTML element
Canvas.el = function (type, text) {
    // We now have el() available globally
    return el(type, text);
}

// Whether argument can be used with draw() method
Canvas.isDrawable = function(arg) {
    return (arg instanceof ImageData);
}

// Whether argument can be used with stretch() method
Canvas.isStretchable = function(arg) {
    try {
        if (arg && ("object" === typeof arg)) {
            const canvas = document.createElement("canvas");
            canvas.width = 1;
            canvas.height = 1;
            const context = canvas.getContext("2d");
            context.drawImage(arg, 0, 0, 1, 1, 0, 0, 1, 1);
            return true;
        }
        return false;
    } catch(err) {
        return false;
    }
}

// Pixel map class (ImageData wrapper)
class PixelMap extends SizedObjectBase {
    constructor(arg, onload) {
        super();
        this.acquire(arg, onload);
        PixelMap.recent = this;
    }
    // Access to underlying imagedata
    get imagedata() {
        return this._image;
    }
    // Access to pixel array
    get data() {
        return this._image.data;
    }
    // Access to pixel array width
    get width() {
        return this._image.width;
    }
    // Access to pixel array height
    get height() {
        return this._image.height;
    }
    // Acquire image from another source
    // Accepts:
    // File instance
    // URL (string)
    // Canvas instance
    // PixelMap instance
    // Drawable (ImageData) 
    // Stretchable (CanvasImageSource)
    acquire(arg, onload) {
        const me = this;
        // Acquired/loaded callback
        const loaded = () => {
            if ("function" === typeof onload) {
                onload(me);
            }
            return me;
        }
        // Bad arg, create default
        const ignored = () => {
            if ("undefined" !== typeof arg) {
                console.log("Ignored:", arg);
            }
            this._image = new ImageData(1,1);
            return me;
        }
        if (arg) {
            if ("object" === typeof arg) {
                // HTMLCanvasElement object
                if (arg instanceof HTMLCanvasElement) {
                    this.capture(arg);
                    return loaded();
                }
                // Canvas object
                else if (arg instanceof Canvas) {
                    this.capture(arg.surface);
                    return loaded();
                } 
                // File object
                else if (arg instanceof File) {
                    this.load(arg, onload);
                    return this;
                }
                // PixelMap, drawable or stretchable object
                else {
                    const canvas = new Canvas(arg);
                    // ImageData (drawable)
                    if (arg instanceof ImageData) {
                        canvas.overlay(arg);
                    }
                    // PixelMap (drawable)
                    else if (arg instanceof PixelMap) {
                        canvas.overlay(arg.imagedata);
                    }
                    // ??? CanvasImageSource (stretchable)
                    else {
                        const w = canvas.width;
                        const h = canvas.height;
                        try {
                            canvas.stretch(arg, 0, 0, w, h);
                        } catch(err) {
                            return ignored();
                        }
                    }
                    // Grab the image from the canvas
                    this.capture(canvas);
                    return loaded();
                }
            }
            // URL (string)
            else if ("string" === typeof arg) {
                this.load(arg, onload);
                return this;
            }
        }
        // Oops! Default
        return ignored();
    }
    // Load an image file
    // The arg must be a File object or URL string
    load(arg, onload, onfail) {
        const me = this;
        const fn = (o) => "function" === typeof o
        try {
            if (arg) {
                const img = new Image();
                img.onload = function(e) {
                    me.acquire(e.target);
                    if (fn(onload)) {
                        onload(me);
                    }
                }
                if (arg instanceof File) {
                    const rdr = new FileReader();
                    rdr.onload = function(e) {
                        img.src = e.target.result;
                    }
                    rdr.readAsDataURL();
                } else if ("string" === typeof arg) {
                    img.src = String(arg);
                } else {
                    throw new TypeError("Argument must be File instance or URL string");
                }
                return me;
            }
            throw new Error("Missing first argument");
        } catch(err) {
            console.error(err);
            if (fn(onfail)) {
                onfail(me, err);
            }
        }
        return me;
    }
    // Draw to canvas
    draw(canvas) {
        if (canvas instanceof Canvas) {
            canvas = canvas.surface;
        }
        const ok = canvas instanceof HTMLCanvasElement;
        if (!ok) {
            throw new TypeError("Expected HTMLCanvasElement");
        }
        const gfx = canvas.getContext("2d");
        gfx.putImageData(this._image, 0, 0);
        return this;
    }
    // Capture from canvas
    capture(canvas) {
        if (canvas instanceof Canvas) {
            canvas = canvas.surface;
        }
        const ok = canvas instanceof HTMLCanvasElement;
        if (!ok) {
            throw new TypeError("Expected HTMLCanvasElement");
        }
        const gfx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        this._image = gfx.getImageData(0, 0, w, h);
        return this;
    }
    // Read a pixel
    // Pixel is an array like [r, g, b]
    get_pixel(x, y) {
        const i = y * this.width + x;
        const p = this.data;
        return [
            p[i+0],
            p[i+1],
            p[i+2],
            255
        ];
    }
    // Write a pixel
    // Pixel is an array like [r, g, b]
    put_pixel(x, y, pixel) {
        const psi = o => "undefined" !== typeof o;
        const i = y * this.width + x;
        const p = this.data;
        const a = pixel[3];
        p[i+0] = pixel[0];
        p[i+1] = pixel[1];
        p[i+2] = pixel[2];
        p[i+3] = psi(a) ? a : 255;
        return this;
    }
    // Decode a color into a pixel
    pixel_from_color(color) {
        const codec = new ColorCodec(color);
        return codec.pixel;
    }
    // Append to HTML element
    append(parent,id) {
        const canvas = new Canvas(this);
        this.draw(canvas);
        return canvas.append(parent, id);
    }
}

// Parses and formats colors/pixels
class ColorCodec {
    constructor(color) {
        this.acquire(color || [0,0,0,0]);
        ColorCodec.recent = this;
    }
    // Original value
    get original() {
        // Return a clone of the original color
        // NOTE: This replaces funky stuff with null 
        // (e.g. NaN, indefined, +/-Infinity, etc)
        return JSON.parse(JSON.stringify(this._original));
    }
    // Access to value as ImageData pixel [r, g, b, a]
    // (cloned)
    get pixel() {
        // Return a clone
        return [... this._pixel];
    }
    // Access to value as ImageData pixel [r, g, b, a]
    set pixel(pel) {
        this._original = pel;
        if (pel) {
            if (Array.isArray(pel)) {
                let a;
                if (pel.length > 3) {
                    a = this.fix(pel[3]);
                } else {
                    a = 255;
                }
                this._pixel = [
                    this.fix(pel[0]),
                    this.fix(pel[1]),
                    this.fix(pel[2]),
                    a
                ];
                return;
            } else {
                if ("string" === typeof pel) {
                    this.acquire(pel);
                    return;
                } else if ("object" === typeof pel) {
                    this.acquire(pel);
                    return;
                }
            }
        }
        this._pixel = [0, 0, 0, 0];
    }
    // Color as token separated r g b fields
    get color_tok_rgb() {
        const me = this;
        function exec(fmt) {
            const r = fmt(me.red);
            const g = fmt(me.green);
            const b = fmt(me.blue);
            return [r, g, b].join(ColorCodec.separator);
        }
        switch (ColorCodec.radix) {
        case 10: return exec(ColorCodec.format_dec);
        case 16: return exec(ColorCodec.format_hex);
        default:
            throw new Error(`Unsupported radix : ${ColorCodec.radix}`);
        }
    }
    // Color as token separated r g b a fields
    get color_tok_rgba() {
        const me = this;
        function exec(fmt) {
            const r = fmt(me.red);
            const g = fmt(me.green);
            const b = fmt(me.blue);
            const a = fmt(me.alpha);
            return [r, g, b, a].join(ColorCodec.separator);
        }
        switch (ColorCodec.radix) {
        case 10: return exec(ColorCodec.format_dec);
        case 16: return exec(ColorCodec.format_hex);
        default:
            throw new Error(`Unsupported radix : ${ColorCodec.radix}`);
        }
    }
    // Color as token separated a r g b fields
    get color_tok_argb() {
        const me = this;
        function exec(fmt) {
            const r = fmt(me.red);
            const g = fmt(me.green);
            const b = fmt(me.blue);
            const a = fmt(me.alpha);
            return [a, r, g, b].join(ColorCodec.separator);
        }
        switch (ColorCodec.radix) {
        case 10: return exec(ColorCodec.format_dec);
        case 16: return exec(ColorCodec.format_hex);
        default:
            throw new Error(`Unsupported radix : ${ColorCodec.radix}`);
        }
    }
    // Color as HTML string #RRGGBB
    get color_html_rgb() {
        const n = this.color_int_rgb;
        const s = n.toString(16);
        return "#" + "0".repeat(6-s.length) + s;
    }
    // Color as HTML string #RRGGBBAA
    get color_html_rgba() {
        const n = this.color_int_rgba;
        const s = n.toString(16);
        return "#" + "0".repeat(8-s.length) + s;
    }
    // Color as hex string 0xRRGGBB
    get color_hex_rgb() {
        const n = this.color_int_rgb;
        const s = n.toString(16);
        return "0x" + "0".repeat(6-s.length) + s;
    }
    // Color as hex string 0xRRGGBBAA
    // NOTE: HTML compatible
    get color_hex_rgba() {
        const n = this.color_int_rgba;
        const s = n.toString(16);
        return "0x" + "0".repeat(8-s.length) + s;
    }
    // Color as hex string 0xAARRGGBB
    // NOTE: Windows compatible
    get color_hex_argb() {
        const n = this.color_int_argb;
        const s = n.toString(16);
        return "0x" + "0".repeat(8-s.length) + s;
    }
    // Color as hex integer 0xRRGGBB
    get color_int_rgb() {
        const r = this.red;
        const g = this.green;
        const b = this.blue;
        return (r<<16) + (g<<8) + b;
    }
    // Color as hex integer 0xRRGGBBAA
    // NOTE: HTML compatible
    // NOTE: This is a DWORD (unsigned 32-bit)
    get color_int_rgba() {
        const r = this.red;
        const g = this.green;
        const b = this.blue;
        const a = this.alpha;
        const n = (r<<24) + (g<<16) + (b<<8) + a;
        return (n<0) ? (n+0x100000000) : n;
    }
    // Color as hex integer 0xAARRGGBB
    // NOTE: Windows compatible
    // NOTE: This is a DWORD (unsigned 32-bit)
    get color_int_argb() {
        const r = this.red;
        const g = this.green;
        const b = this.blue;
        const a = this.alpha;
        const n = (a<<24) + (r<<16) + (g<<8) + b;
        return (n<0) ? (n+0x100000000) : n;
    }
    // Color as css string rgb(r, g, b)
    get color_css_rgb() {
        return `rgb(${this.red},${this.green},${this.blue})`;
    }
    // Color as css string rgba(r, g, b, a)
    get color_css_rgba() {
        let a = Math.round(1000 * this.alpha / 255) * 0.001;
        return `rgba(${this.red},${this.green},${this.blue},${a})`;
    }
    // Color as javascript object {r, g, b}
    get color_rgb() {
        const p = this.pixel;
        return {
            r : p[0],
            g : p[1],
            b : p[2],
            a : 255,
        }
    }
    // Color as javascript object {r, g, b, a}
    get color_rgba() {
        const p = this.pixel;
        return {
            r : p[0],
            g : p[1],
            b : p[2],
            a : p[3],
        }
    }
    // Read red component
    get red() {
        return this._pixel[0];
    }
    // Write red component
    set red(n) {
        this._pixel[0] = this.fix(n);
    }
    // Read green component
    get green() {
        return this._pixel[1];
    }
    // Write green component
    set green(n) {
        this._pixel[1] = this.fix(n);
    }
    // Read blue component
    get blue() {
        return this._pixel[2];
    }
    // Write blue component
    set blue(n) {
        this._pixel[2] = this.fix(n);
    }
    // Read alpha component
    get alpha() {
        return this._pixel[3];
    }
    // Write alpha component
    set alpha(n) {
        this.pixel[3] = this.fix(n);
    }
    // Acquire pixel from original color
    acquire(color,windows) {
        const me = this;
        this._original = color;
        const psi = (o) => "undefined" !== typeof o;
        const clamp = (n,a,b) => Math.min(Math.max(n,a),b);
        // Default to transparent color
        let pel = [0,0,0,0];
        // Fixups on a raw 32-bit integer
        function fixInt(n) {
            n = parseInt(n);
            return (isFinite(n)) ? (n & 0xFFFFFFFF) : 0;
        }
        // Fixups on a floating point value
        function fixFloat(n) {
            n = parseFloat(n);
            return (isFinite(n)) ? (n) : 0;
        }
        // From CSS rgb(r,g,b) string
        function from_css_rgb(css) {
            const ar =css.substr(4)
            .substr(0, css.length - 5)
            .split(",").slice(0, 3)
            .map(e=>me.fix(e.trim()));
            ar[3]=0xFF; // Alpha channel
            return ar;
        }
        // From CSS rgba(r,g,b,a) string
        function from_css_rgba(css) {
            const alpha = (n) => clamp(Math.round(255*fixFloat(n)))
            const ar = css.substr(4)
            .substr(0, css.length - 6)
            .split(",").slice(0, 4);
            [0, 1, 2].forEach((n) => ar[n] = me.fix(ar[n]));
            ar[3] = alpha(ar[3]);
            return ar;
        }
        // From some raw 32-bit integer
        // All raw integers are routed here. The windows arg serves
        // as a selector that determines how to interpret fields.
        // Windows order: 0xAARRGGBB
        // HTML order:    0xRRGGBBAA
        function from_integer(n) {
            if (windows) {
                return from_integer_argb(n);
            } else {
                return from_integer_rgba(n);
            }
        }
        // From some 6-digit hex value
        // Either mode assumes alpha=255
        // NOTE: There's no way to get here from just a raw
        // integer as input. This is only here to support
        // hex strings converted to integers.
        function from_integer_rgb(n) {
            n = fixInt(n);
            return [
                0xFF & (n>>16),
                0xFF & (n>>8),
                0xFF & (n),
                0xFF,
            ];
        }
        // From some parsed 8-digit hex value
        // or some raw integer in HTML order
        // HTML order: 0xRRGGBBAA
        function from_integer_rgba(n) {
            n = fixInt(n);
            return [
                0xFF & (n>>24),
                0xFF & (n>>16),
                0xFF & (n>>8),
                0xFF & (n),
            ];
        }
        // From some parsed 8-digit hex value
        // or some raw integer in Windows order
        // Windows order: 0xAARRGGBB
        function from_integer_argb(n) {
            n = fixInt(n);
            r = 0xFF & (n>>16);
            g = 0xFF & (n>>8);
            b = 0xFF & (n);
            a = 0xFF & (n>>24);
            // Special case
            // Assume maximum alpha when alpha=0
            // But (r,g,b) != (0,0,0)
            if (!a) {
                if (r || g || b) {
                    a = 0xFF;
                }
            }
            return [ r, g, b, a ];
        }
        // Decode various string formats
        // When the input arg is a string, it gets routed here
        // Here we try to figure out the format and parse accordingly
        // Formats include:
        // * Tokenized triplet -- Programmable syntax
        // * HTML -- 8, 6, 4 or 3 characters (# prefix)
        // * JS -- Same as HTML (0x prefix)
        // * CSS -- rgb(n,n,n) or rgba(n,n,n,n)
        // * JSON -- Simple array [n,n,n] or [n,n,n,n]
        // * JSON -- Object {r:n,g:n,b:n} or {r:n,g:n,b:n,a:n}
        function from_string(s) {
            // Split first
            const arr = s.split(ColorCodec.separator)
                .map(e=>e.trim())
                .filter(e=>e.length);
            // Possible tokenised type
            if (arr.length > 2) {
                // Assume all fields are good
                let ok = true;
                // Get pattern for a single field
                const pat = "^" + ColorCodec.get_pattern() + "$";
                // Create regex from pattern
                const rex = new RegExp(pat, "i");
                // Callback for regex check
                const test = (o) => ok &= rex.test(o);
                // Test all fields for match
                arr.forEach(test);
                // If all fields match
                if (ok) {
                    const C = ColorCodec;
                    const parse = (C.radix === 10) ? C.parse_dec : C.parse_hex;
                    const r = parse(arr[0]);
                    const g = parse(arr[1]);
                    const b = parse(arr[2]);
                    let a;
                    if (arr.length > 3) {
                        a = parse(arr[3]);
                    } else {
                        a = 255;
                    }
                    return [ r, g, b, a ];
                }
            }
            // HTML string
            if (s[0]==="#") s = s.replace("#", "0x");
            // Hex string
            if (s.substr(0,2)==="0x") {
                // Hex string 0xRRGGBBAA or 0xRRGGBB
                let rex = /0x[0-9a-z]{8,8}/i;
                if (rex.test(s)) {
                    s = parseInt(s, 16);
                    if (windows) {
                        return from_integer_argb(s);
                    } else {
                        return from_integer_rgba(s);
                    }
                }
                // Hex string 0xRRGGBB
                rex = /0x[0-9a-z]{6,6}/i;
                if (rex.test(s)) {
                    s = parseInt(s, 16);
                    return from_integer_rgb(s);
                }
                // Hex string 0xRGBA
                rex = /0x[0-9a-z]{4,4}/i;
                if (rex.test(s)) {
                    const dual = (n) => ((n &= 0x0F), ((n<<4) + n));
                    const field = (sf) => dual(0x0F & (s>>sf)) << (sf+sf);
                    s = parseInt(s, 16);
                    const r = field(12);
                    const g = field(8);
                    const b = field(4);
                    const a = field(0);
                    return from_integer_rgba(r+g+b+a);
                }
                // Hex string 0xRGB
                rex = /0x[0-9a-z]{3,3}/i;
                if (rex.test(s)) {
                    const dual = (n) => ((n &= 0x0F), ((n<<4) + n));
                    const field = (sf) => dual(0x0F & (s>>sf)) << (sf+sf);
                    s = parseInt(s, 16);
                    const r = field(12);
                    const g = field(8);
                    const b = field(4);
                    const a = field(0);
                    return from_integer_rgb(r+g+b+a);
                }
            } 
            else {
                // Numeric field matching
                const ch = "[0-9]{1,3}";
                const al = "[-+.0-9e]{1,}";
                // CSS rgb() string
                let rex = new RegExp(`^rgb\\(${ch},${ch},${ch}\\)$`);
                if (rex.test(s)) return from_css_rgb(s);
                // CSS rgba() string
                rex = new RegExp(`^rgba\\(${ch},${ch},${ch},${al}\\)$`);
                if (rex.test(s)) return from_css_rgba(s);
                // JSON object or array
                rex = /(^\{.*\}$)|(^\[.*\]$)/;
                if (rex.test(s)) {
                    try {
                        s = JSON.parse(s);
                    } catch(err) {
                        console.error(err);
                        return pel;
                    }
                    return me.acquire(s);
                }
            }
        }
        // Decode from javascript object
        // * Simple array [n,n,n] or [n,n,n,n]
        // * Object {r:n,g:n,b:n} or {r:n,g:n,b:n,a:n}
        // * ColorCodec instance (clone)
        function from_object(o) {
            // Already an array (pixel)?
            if (Array.isArray(o)) {
                return o;
            // Clone?
            } else if (o instanceof ColorCodec) {
                return o.pixel;
            // Other object with (r, g, b) properties
            } else {
                const read = (f) => me.fix(psi(o[f]) ? o[f] : 0);
                return [
                    read("r"),
                    read("g"),
                    read("b"),
                    read("a"),
                ];
            }
        }
        // Dispatcher (based on input arg type)
        switch (typeof color) {
        case "number":      { pel = from_integer(color); break; }
        case "object":      { pel = from_object(color);  break; }
        case "string":      { pel = from_string(color);  break; }
        default:            { break; }
        }
        // Save result
        // NOTE: Use setter so that fixups can take place
        this.pixel = pel;
        return this;
    }
    // Parse color from string
    parse(str) {
        return this.acquire(str);
    }
    // Format string based on format mode (property) name
    format(mode) {
        mode = (Array.isArray(mode)) ? mode[0] : mode;
        if (mode in this) {
            return this[mode];
        } else {
            return this.pixel;
        }
    }
    // Perform fixups on an integer for any channel [0 ... 255]
    fix(n) {
        n = parseInt(n || 0);
        return isFinite(n) ? (n & 0xFF) : 0;
    }
    // Prompt user to edit color
    prompt() {
        const me = this;
        const attr = (e,n,v) => e.setAttribute(n,v);
        const elem = document.createElement("input");
        attr(elem,"type","color");
        elem.value = this.color_html_rgb;
        elem.onchange = function(e) {
            me.acquire(e.target.value);
        };
        elem.click();
        return this;
    }
    // Append color input element to HTML element
    append(parent, id) {
        parent = parent || document.body;
        if (parent instanceof HTMLElement) {
            const me = this;
            const attr = (e,n,v) => e.setAttribute(n,v);
            const elem = Canvas.el("input");
            attr(elem,"type","color");
            elem.value = this.color_html_rgb;
            if ("string" === typeof id) {
                elem.setAttribute("id", id);
            }
            parent.appendChild(elem);
            return elem;
        }
        throw new Error("Argument must be an HTML element");
    }
}

// Names of supported color codec formats
// elem[0] is exact match for a getter function
// elem[1] is for help/documentation purposes
ColorCodec.Format = {
    pixel: [ "pixel", "[r,g,b,a]" ],
    color_rgb: [ "color_rgb", "{r,g,b}" ],
    color_rgba: [ "color_rgba", "{r,g,b,a}" ],
    color_html_rgb : [ "color_html_rgb", "#RRGGBB" ],
    color_html_rgba: [ "color_html_rgba", "#RRGGBBAA" ],
    color_hex_rgb : [ "color_hex_rgb", "0xRRGGBB" ],
    color_hex_rgba: [ "color_hex_rgba", "0xRRGGBBAA" ],
    color_hex_argb: [ "color_hex_argb", "0xAARRGGBB" ],
    color_int_rgb: [ "color_int_rgb", "r<<16|g<<8|b" ],
    color_int_rgba: [ "color_int_rgba", "r<<24|g<<16|b<<8|a" ],
    color_int_argb: [ "color_int_argb", "a<<24|r<<16|g<<8|b" ],
    color_css_rgb: [ "color_css_rgb", "rgb(r,g,b)" ],
    color_css_rgba: [ "color_css_rgba", "rgba(r,g,b,a)" ],
    color_tok_rgb: ["color_tok_rgb","r g b"],
    color_tok_rgba: ["color_tok_rgba","r g b a"],
    color_tok_argb: ["color_tok_argb","a r g b"],
};

// Values for parsing/formatting tokenized colors
ColorCodec.hex_prefix = "0x";
ColorCodec.hex_suffix = "";
ColorCodec.hex_digits = "2";
ColorCodec.radix = 10;
ColorCodec.scale = 255;
ColorCodec.precision = 0;
ColorCodec.separator = " ";
ColorCodec.read_token_props = function() {
    const me = ColorCodec;
    return {
        hex_prefix : me.hex_prefix,
        hex_suffix : me.hex_suffix,
        hex_digits : me.hex_digits,
        radix : me.radix,
        scale : me.scale,
        precision : me.precision,
        separator : me.separator,
    }
}
ColorCodec.write_token_props = function(props) {
    const me = ColorCodec;
    const psi = (s) => "undefined" !== typeof s;
    [
        "hex_prefix",
        "hex_suffix",
        "hex_digits",
        "radix",
        "scale",
        "precision",
        "separator",
    ].forEach((prop)=>{
        if (psi(props[prop])) {
            me[prop] = props[prop];
        }
    });
    return "OK";
}

// Format hexadecimal component as text
// Input should be an integer
// Input is clipped to 2**(4*n) bits
// Where: n is the number of desired hex digits.
// e.g. 1=>[0..15], 2=>[0..255], 3=>[0..4095], etc.
ColorCodec.format_hex = function(n) {
    const me = ColorCodec;
    const pfx = me.hex_prefix;
    const sfx = me.hex_suffix;
    const digits = me.hex_digits;
    const mask = (2**(4*digits)) - 1;
    let s = (n & mask).toString(16);
    s = "0".repeat(digits - s.length) + s;
    return `${pfx}${s}${sfx}`;
}
// Parse hex field (inverse of format)
ColorCodec.parse_hex = function(str) {
    const me = ColorCodec;
    str = str
    .replace(me.hex_prefix, "")
    .replace(me.hex_suffix, "");
    return parseInt(str, 16);
}

// Format a decimal component as text
// Input should be an integer in [0..255]
// Output is scaled and rounded to req'd precision
// WARNING: No attempt is made to avoid overflow
// or detect NaN condition.
ColorCodec.format_dec = function(n) {
    const me = ColorCodec;
    const k = me.scale;
    if (k !== 255) {
        const q = me.precision;
        if (q) {
            t = Math.pow(10, q);
            n = Math.round(t*(n/255*k))/t;
        } else {
            n = Math.round(n/255*k);
        }
    }
    return n.toString();
}
// Parse dec field (inverse of format)
ColorCodec.parse_dec = function(str) {
    const me = ColorCodec;
    if (me.scale === 255) {
        return parseInt(str) & 0xFF;
    } else {
        const n = parseFloat(str);
        return Math.round(255*(n/me.scale)) & 0xFF;
    }
}

// Build regex for token format
//---------------------------------------
// This returns the regex for ONE color component
// Caller must split on separator, trim whitespace,
// and match each component individually.
ColorCodec.get_pattern = function() {
    const me = ColorCodec;
    function dec() {
        return "[0-9]*(\\.[0-9]*)?";
    }
    function hex() {
        const pfx = me.hex_prefix;
        const sfx = me.hex_suffix;
        const dc = me.hex_digits;
        return `${pfx}[0-9a-z]{${dc}}${sfx}`;
    }
    switch (me.radix) {
    case 10: return dec();
    case 16: return hex();
    default:
        throw new Error("Unsupported radix : " + me.radix);
    }
}

// Random color
// Returns ColorCodec instance
ColorCodec.random_color = function() {
    const rnd = () => Math.round(Math.random() * 255);
    const codec = new ColorCodec();
    codec.pixel = [ rnd(), rnd(), rnd() ];
    return codec;
}

// Color map
class ColorMap {
    constructor(arg, fmt, named) {
        this.named = named ? true : false;
        this.color_format = fmt;
        this.acquire(arg || undefined);
        ColorMap.recent = this;
    }
    // Number of colors present
    get color_count() {
        return this._colors.length;
    }
    // Number of names present
    get name_count() {
        let count = 0;
        for (let o in this._names) {
            count += ("number" === typeof this._names[o]) ? 1 : 0;
        }
        return count;
    }
    // Get color code format name
    get color_format() {
        return this._fmt;
    }
    // Set color code format name
    set color_format(fmt) {
        if (fmt) {
            if (!(fmt[0] in ColorCodec.Format)) {
                throw new Error("Unexpected format " + fmt);
            }
            this._fmt = fmt;
        } else {
            this._fmt = ColorCodec.Format.pixel;
        }
    }
    // Whether index refers to a ColorCodec instance
    has_index(index) {
        return (this._colors[index] instanceof ColorCodec);
    }
    // Whether name exists and has an associated index
    has_name(name) {
        return ("number" === typeof this._names[name]);
    }
    // Remove color by index and remove name
    remove_color(index) {
        this._colors.slice(index,index+1);
        return this;
    }
    // Remove color by index or name
    // If by name, remove name also
    remove(index_or_name) {
        const i = index_or_name;
        switch (typeof i) {
        case "number": 
        {
            this.remove_color(i);
            break;
        }
        case "string": 
        {
            const name = i;
            i = this.get_index(name);
            this.remove_color(i);
            this.remove_name(name);
            break;
        }
        default: break;
        }
        return this;
    }
    // Remove name only
    remove_name(name) {
        delete this._names[name];
        return this;
    }
    // Remove all colors and names
    clear() {
        this._colors = [];
        this._names = {};
    }
    // Aquire other palette or text document
    acquire(arg) {
        const me = this;
        this.clear();
        // Clone another ColorMap object
        function clone(other) {
            me.add_colormap(other);
            return me;
        }
        // Capture all unique colors from an image
        function capture(source) {
            me.capture_colors(source);
            return me;
        }
        // Grab a color array or standard palette
        function palette(arg) {
            me.add_palette(arg);
            return me;
        }
        // For handling arrays and other objects
        function acquire_object(o) {
            // Primitive palettes (arrays)
            if (Array.isArray(o)) {
                switch (typeof o[0]) {
                case "string":  return acquire_doc(o);
                case "object":  return palette(o);
                default:
                    throw new TypeError("Array element type isn't supported");
                }
            }
            // Other color map
            else if (o instanceof ColorMap) {
                return clone(o);
            }
            // Canvas object
            else if (o instanceof Canvas) {
                return capture(o);
            }
            // PixelMap object
            else if (o instanceof PixelMap) {
                return capture(o);
            }
            // ImageData object
            else if (o instanceof ImageData) {
                return capture(o);
            } 
            // CanvasImageSource ("stretchable") object
            else if (Canvas.isStretchable(o)) {
                return capture(o);
            }
            // Final resort: object whose properties
            // are colornames and values are colordefs
            else {
                me.add_palette_named(arg);
                return me;
            }
        }
        // For parsing multiline text documents
        function acquire_doc(doc) {
            return me.parse(doc);
        }
        // If there IS an argument...
        if (arg) {
            // Dispatch vector for arg types
            switch (typeof arg) {
            case "object": return acquire_object(arg);
            case "string": return acquire_doc(arg);
            default: 
                throw new TypeError("Argument type isn't supported");
            }
        }
        return me;
    }
    // Parse document as palette
    parse(doc) {
        const me = this;
        this.clear();
        function decode_named(lines) {
            function add(line) {
                const tokens = line.split(" ");
                const name = tokens.shift();
                line = tokens.join(" ");
                me.add_color(line, name);
            }
            lines.forEach(add);
        }
        function decode_unnamed(lines) {
            function add(line) {
                me.add_color(line);
            }
            lines.forEach(add);
        }
        function decode(doc) {
            const lines = doc.split("\n")
            .map(e=>e.trim())
            .filter(e=>e.length);
            if (me.named) {
                decode_named(lines);
            } else {
                decode_unnamed(lines);
            }
        }
        function process(arg) {
            switch (typeof arg) {
            case "object":
                if (Array.isArray(arg)) {
                    arg = arg.join("\n");
                    decode(arg);
                }
                return;
            case "string":
                decode(doc);
            default: return;
            }
        }
        process(doc);
        return this;
    }
    // Format palette as document
    // TODO: merge...
    format(merge) {
        const me = this;
        const fmt = this.color_format;
        const read = (c) => c[fmt[0]]; // Reads getter by name in fmt[0]
        const lines = [];
        function add_unnamed(color) {
            const o = read(color);
            if ("object" === typeof o) {
                lines.push(JSON.stringify(o));
            } else {
                lines.push(String(o));
            }
        }
        function add_named(name) {
            const color = me.get_color(name);
            if (!color instanceof ColorCodec) return;
            const o = read(color);
            if ("object" === typeof o) {
                lines.push(name + " " + JSON.stringify(o));
            } else {
                lines.push(name + " " + o);
            }
        }
        if (this.named) {
            this.do_name_fixups();
            for (let name in this._names) {
                add_named(name);
            }
        } else {
            this._colors.forEach(add_unnamed);
        }
        return merge ? lines.join("\n") : lines;
    }
    // Do repairs on name list
    // * Remove/report invalid names (those with an invalid index)
    // * Remove aliased names (additional names for a named color)
    // * Provide default names for all unnamed colors
    do_name_fixups() {
        const me = this;
        let count = 0;
        console.group("ColorMap Name Fixups");
        // Remove alias names
        let list = this.get_aliases();
        list.forEach((name)=>{
            console.info("Removing alias", name);
            count+=1;
            me.remove_name(name);
        });
        // Remove invalid names
        list = this.get_names(true);
        list.forEach((name)=>{
            console.info("Removing defunct name", name);
            count+=1;
            me.remove_name(name);
        });
        // Add default names
        list = this.get_unreferenced_indices();
        list.forEach((index)=>{
            const c = me.get_color(index).color_hex_rgba;
            let name = `unnamed_${c}`;
            console.info("Adding default name", name);
            count+=1;
            me.add_name(name, index);
        });
        // Report activity count
        if (count) {
            if (count===1) {
                console.info("Made just 1 change");
            } else {
                console.info("Change count", count);
            }
        } else {
            console.info("No changes were needed");
        }
        console.groupEnd();
        return this;
    }
    // Retrieve index by name
    get_index(name) {
        return this._names[name];
    }
    // Retrieve color by index or by name
    get_color(index_or_name) {
        let i = index_or_name;
        switch (typeof i) {
        case "string": i = this.get_index(i);   // Fall through
        case "number": return this._colors[i];
        default: return undefined;
        }
    }
    // Get aliased names
    // Returns a list of all names that have an alias
    // i.e. another name referencing the same color
    get_aliases() {
        const me = this;
        const s = new Set();
        const alias = [];
        // Lookup the index for a name
        // If the index is invalid, ignore it
        // Otherwise:
        // If already in set, add name to alias list
        // If not already is set, add index to set
        function check(name) {
            const index = me.get_index(name);
            if ("number" === typeof index) {
                if (s.has(index)) {
                    alias.push(name);
                } else {
                    s.add(index);
                }
            }
        }
        // Check each name
        for (let name in this._names) {
            if (this.has_name(name)) {
                check(name);
            }
        }
        // Return list of alias names
        return alias;
    }
    // Get names (valid or invalid)
    // Valid name refers to an actual color
    // Invalid name refers to a missing/bad color
    get_names(invalid) {
        const me = this;
        const names = [];
        // Add invalid name to list
        function keep_bad(name) {
            const index = me.get_index(name);
            if (!me.has_index(index)) {
                names.push(name);
            }
        }
        // Add valid name to list
        function keep_good(name) {
            const index = me.get_index(name);
            if (me.has_index(index)) {
                names.push(name);
            }
        }
        // Check which filter to use
        const check = invalid ? keep_bad : keep_good;
        // Check all names
        for (let name in this._names) {
            if (this.has_name(name)) {
                check(name);
            }
        }
        // Return valid/invalid names list
        return names;
    }
    // Get names for an index
    get_names_for(index) {
        const names = [];
        const check = (name) => this.get_index(name) === index;
        for (let name in this._names) {
            if (this.has_name(name)) {
                check(name);
            }
        }
        return names;
    }
    // Get list of indices (valid or invalid)
    // Valid index refers to an actual color
    // Invalid index refers to a missing/bad color
    get_indices(invalid) {
        const me = this;
        const indices = [];
        function keep_bad(index) {
            if (!me.has_index(index)) {
                indices.push(index);
            }
        }
        function keep_good(index) {
            if (!me.has_index(index)) {
                return;
            }
            indices.push(index);
        }
        const check = invalid ? keep_bad : keep_good;
        const count = this.color_count;
        for (let n=0; n<count; n++) {
            check(n);
        }
        return indices;
    }
    // Get indices with no name references
    get_unreferenced_indices() {
        const me = this;
        const s = new Set();
        const count = this.color_count;
        // Populate the set with all index numbers
        for (let n=0; n<count; n++) {
            s.add(n);
        }
        // If the name has an index and the index is in
        // the set, remove it
        function check(name) {
            if (me.has_name(name)) {
                const index = me.get_index(name);
                if (s.has(index)) {
                    s.delete(index);
                }
            }
        }
        for (let name in this._names) {
            check(name);
        }
        // Convert set to array and return
        // This is all remaining (unreferenced) indices
        return [... s];
    }
    // Get standard palette
    // Returns {r:n, g:n, b:n, a:n}
    get_palette() {
        const pal = [];
        function mk(c) {
            return {
                r : c.red,
                g : c.green,
                b : c.blue,
                a : c.alpha
            };
        }
        for (let n=0; n<256; n++) {
            let color = this._colors[n];
            if (color instanceof ColorCodec) {
                pal[n] = mk(color);
            } else {
                pal[n] = { r:0, g:0, b:0, a:0 };
            }
        }
        return pal;
    }
    // Get named palette
    // Returns { colorname : [r, g, b, a], ... }
    // colorname => name as property
    get_palette_named() {
        const me = this;
        const pal = {};
        for (let o in me._names) {
            const index = me.get_index(o);
            if (me.has_index(index)) {
                pal[o] = me._colors[index].pixel;
            }
        }
        return pal;
    }
    // Get array-type palette
    // Returns [[r, g, b, a], ...]
    get_color_array() {
        const pal = [];
        for (let n=0; n<256; n++) {
            let color = this._colors[n];
            if (color instanceof ColorCodec) {
                pal[n] = [
                    color.red,
                    color.green,
                    color.blue,
                    color.alpha
                ];
            } else {
                pal[n] = [0, 0, 0, 0];
            }
        }
        return pal;
    }
    // Get 32-bit unsigned integer array (RGBA order)
    // Returns [Uint32, ...]
    // This is used for sorting and compaction
    get_int_array() {
        const pal = [];
        for (let n=0; n<256; n++) {
            let color = this._colors[index];
            if (color instanceof ColorCodec) {
                pal[n] = color.color_int_rgba;
            } else {
                pal[n] = 0;
            }
        }
        return pal;
    }
    // Get unique colors
    // Returns [{r:n,g:n,b:n,a:n}, ...]
    get_unique_colors() {
        const uniq = new Set(... this.get_int_array());
        const arr = [... uniq];
        const codec = new ColorCodec;
        function mkcolor(intval) {
            codec.acquire(intval);
            return codec.color_rgba;
        }
        return arr.map(mkcolor);
    }
    // Get similar colors (those within some distance threshold)
    // The alpha channel is ignored.
    // The dsqr argument is the distance/difference squared [0.0 ... 1.0]
    // This is a normalized range where 0 is exact match only and 1 is match all.
    // that serves as the cutoff (threshold) for acceptance.
    // Returns [{r:n,g:n,b:n,a:n}, ...]
    get_similar_colors(r, g, b, dsqr) {
        const me = this;
        const C = me._colors;
        const count = C.length;
        const pal = {};
        dsqr = parseFloat(dsqr);
        dsqr = isFinite(dqsr) ? dsqr : 0;
        dsqr = Math.min(Math.max(dsqr, 0), 1);
        dsqr *= (3*255*255);    // Scale to correct integer range.
        /*
            Why this specific constant?
            Each channel can be up to 255-0=255 difference.
            This squared is 255*255.
            There are 3 channels, so
                255*255 + 255*255 + 255*255 = 3*255*255
            is the maximum possible squared difference.
        */
        function mkcolor(r, g, b, a) {
            return {
                r : r, g : g, b : b, a : a
            };
        }
        function match_rgb() {
            for (let n=0; n<count; n++) {
                const P = C.pixel;
                const rdiff = P[0] - r;
                const gdiff = P[1] - g;
                const bdiff = P[2] - b;
                const diff = rdiff*rdiff
                           + gdiff*gdiff
                           + bdiff*bdiff;
                if (diff <= dsqr) {
                    pal[n] = mkcolor(r, g, b, P[3]);
                }
            }
            return i;
        }
        match_rgb();
        return pal;
    }
    // Add name and index for name
    add_name(name, index) {
        if ("string" === typeof name) {
            name = name.trim();
            if (name.length) {
                this._names[name] = index;
            }
        }
        return this;
    }
    // Add color and (optionally) name for color
    // NOTE: Color is cloned to prevent cross-talk
    // NOTE: This also makes color arg format VERY flexible!
    add_color(color, name) {
        this._colors.push(new ColorCodec(color));
        this.add_name(name, this.color_count - 1);
        return this;
    }
    // Add a web safe name (standard web color)
    // This will add a single color (web safe names only)
    // or an array of color names. ONLY web safe names are
    // supported. Hierarchical array trees are traversed.
    // Will add all web safe color names if arg is undefined
    // -- OR -- if an array entry is undefined.
    // NOTE: Doesn't remove old colors or avoid duplicates
    add_colors_websafe(arg) {
        const me = this;
        const canvas = new Canvas();        // Default size is 1x1 pixel
        const pixmap = new PixelMap();      // Overwritten later
        let ws_done = false;                // All names added already?
        function exec(o) {
            if ("string" === typeof o) {
                const name = o;
                canvas.fill(name);                      // Fill with named color
                pixmap.capture(canvas);                 // Capture 1x1 ImageData
                const color = pixmap.get_pixel(0,0);    // Read the ONLY pixel
                me.add_color(color, name);              // Add pixel color to map
            } else if ("undefined" === typeof o) {
                // Prevent redundant/recursive adds
                if (ws_done) return;
                ws_done = true;
                // Default to web safe color name array
                exec(ColorMap.ColorNames);
            } else if(Array.isArray(o)) {
                for (let item of o) {
                    exec(item);
                }
            } else {
                console.warn("Ignoring:", o);
            }
            return me;
        }
        return exec(arg);
    }
    // Add colors from a standard palette or color array
    // NOTE: Doesn't remove old colors or avoid duplicates
    // Standard => [{r:n,g:n,b:n,a:n}, ...]
    // Color Array => [[r,g,b,a], ...]
    // Other Array => [(any supported codec format), ...]
    add_palette(pal) {
        const me = this;
        if (Array.isArray(pal)) {
            pal.forEach(entry=>{
                // The codec will accept any recognized
                // color format
                me.add_color(entry);
            });
        }
        return me;
    }
    // This is just a stub for naming symmetry
    // Color Array => [[r,g,b,a], ...]
    // NOTE: Doesn't remove old colors or avoid duplicates
    add_color_array(pal) {
        return this.add_palette(pal);
    }
    // Add colors from a named palette
    // Named => { colorname : colordef, ... }
    // colorname => string property name
    // colordef => any format supported by ColorCodec
    // NOTE: Doesn't remove old colors or avoid duplicates
    add_palette_named(obj) {
        const me = this;
        if (obj && ("object" === typeof obj)) {
            for (let name in obj) {
                me.add_color(obj[name], name);
            }
        }
        return me;
    }
    // Add another color map to this one
    // NOTE: Doesn't remove old colors or avoid duplicates
    add_colormap(other) {
        const me = this;
        if (other instanceof ColorMap) {
            let index = 0;
            other._colors.forEach((c)=>{
                let name = other.get_names_for(index)[0];
                me.add_color(c, name);
                index+=1;
            });
        }
        return me;
    }
    // Add colors from a canvas or other image source
    // NOTE: Doesn't remove old colors or avoid duplicates
    capture_colors(source) {
        const me = this;
        function exec(image) {
            me.clear();
            const s = new Set();
            const p = image.data;
            const w = image.width;
            const h = image.height;
            const count = w*h;
            const codec = new ColorCodec();
            let i = 0;
            for (let n=0; n<count; n+=1, i+=4) {
                codec.pixel = [
                    p[i+0],
                    p[i+1],
                    p[i+2],
                    p[i+3]
                ];
                s.add(codec.color_int_rgba);
            }
            const arr = [... s].sort((a, b)=>a-b);
            arr.forEach((color)=>{
                me.add_color(color);
            });
            return me;
        }
        if (source instanceof ImageData) {
            return exec(source);
        } else {
            const img = new PixelMap(source);
            return exec(img);
        }
    }
    // Find nearest match
    // If arg a is undefined, RGB only match is performed
    // Returns index of nearest matching color.
    match_color(r, g, b, a) {
        const me = this;
        const C = me._colors;
        let i, mindiff=Infinity, count = C.length;
        function match_rgb() {
            for (let n=0; n<count; n++) {
                const P = C.pixel;
                const rdiff = P[0] - r;
                const gdiff = P[1] - g;
                const bdiff = P[2] - b;
                const diff = rdiff*rdiff
                           + gdiff*gdiff
                           + bdiff*bdiff;
                if (diff < mindiff) {
                    mindiff = diff;
                    i = n;
                }
            }
            return i;
        }
        function match_rgba() {
            for (let n=0; n<count; n++) {
                const P = C.pixel;
                const rdiff = P[0] - r;
                const gdiff = P[1] - g;
                const bdiff = P[2] - b;
                const adiff = P[3] - a;
                const diff = rdiff*rdiff
                           + gdiff*gdiff
                           + bdiff*bdiff
                           + adiff*adiff;
                if (diff < mindiff) {
                    mindiff = diff;
                    i = n;
                }
            }
            return i;
        }
        return (is_defined(a)) ? match_rgba() : match_rgb();
    }
}

// HTML color names
ColorMap.ColorNames = [
    "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige",
    "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown",
    "BurlyWood", "CadetBlue", "Chartreuse",  "Chocolate","Coral", 
    "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", 
    "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen",
    "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange",
    "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", 
    "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise",
    "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey",
    "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia",
    "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey",
    "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo",
    "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen",
    "LemonChiffon", "LightBlue", "LightCoral", "LightCyan",
    "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen",
    "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue",
    "LightSlateGray",  "LightSlateGrey", "LightSteelBlue", "LightYellow",
    "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine",
    "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen",
    "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise",
    "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose",
    "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab",
    "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen",
    "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru",
    "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red",
    "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown",
    "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue",
    "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue",
    "Tan","Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat",
    "White", "WhiteSmoke", "Yellow", "YellowGreen"
];

// Load custom color definitions
// This is a "named palette" object
// Stored as a JSON file
ColorMap.ColorDefs = {
    "Transparent" : [0, 0, 0, 0],
};
(function(){
    // Translate string in ImageData pixel [r, g, b]
    function translate(str) {
        return str.split(" ")
        .map(e=>parseFloat(e))
        .map(e=>Math.round(255*e));
    }
    // Repair object
    // Translate all color values ImageData pixels
    function repair(map) {
        for (let key in map) {
            if ("string" === typeof map[key]) {
                map[key] = translate(map[key]);
            }
        }
    }
    url = "named-colors.json";
    fetch(url)
    .then((r)=>r.json())
    .then((o)=>{
        repair(o);
        ColorMap.ColorDefs = Object.assign(ColorMap.ColorDefs, o);
        // console.log("Named Colors", ColorMap.ColorDefs);
    })
    .catch((err)=>{
        console.error(err);
    });
})();

// Random color name
ColorMap.random_color_name = function() {
    const N = ColorMap.ColorNames;
    const rc = Math.round(Math.random() * (N.length - 1));
    return N[rc];
}

// https://www.imdb.com/video/vi1597290009?playlistId=tt0060182&ref_=tt_ov_vi