
/*

    testing-1.js

    Tests for example-1.html page.

    Dave Wellsted, NCS
    2020-APR-08

*/

// Test SizedObjectBase
SizedObjectBase.test = function() {
    console.log("SizedObjectBase", "No test defined");
    return "OK";
}

// Test Canvas
Canvas.test = function(parent) {
    const me = Canvas;
    // console.log("Canvas", "Testing");
    const rndc = ColorMap.random_color_name;
    const size = {
        width : 500,
        height : 500
    };
    const canvas = new Canvas(size);
    canvas.fill(rndc());
    canvas.context.lineWidth = 3;
    canvas.point(250, 250, 200, rndc(), rndc());
    for (let n=0; n<10; n++) {
        let pt = canvas.random_point();
        let radius = 10 + canvas.width*0.25*Math.random();
        // console.log("radius", radius)
        let angle = 0.5*Math.PI*Math.random();
        angle = Math.round(angle/5)*5;
        let verts = Math.round(0.3 * radius);
        canvas.regular_polygon(pt.x, pt.y, radius, angle, verts, rndc(), rndc());
        pt = canvas.random_point();
        let pt1 = canvas.random_point();
        canvas.ray(pt.x, pt.y, pt1.x-pt.x, pt1.y-pt.y, rndc());
        //
        // TODO: rect and line_list tests
        //
    }
    const div = Tests[0].section();
    canvas.append(div);
    parent = el.is(parent) ? parent : document.body;
    Tests[0].print(parent, "Test Canvas");
    parent.appendChild(div);
    return [canvas, div];
}

// Test PixelMap
PixelMap.test = function(parent, file, onload) {
    const div = Tests[0].section();
    file = file || "ball.png";
    const pix = new PixelMap(file, function(source){
        source.append(div);
        if (is_function(onload)) {
            onload(source);
        }
    });
    parent = el.is(parent) ? parent : document.body;
    Tests[0].print(parent, "Test PixelMap");
    parent.appendChild(div);
    return [pix, div];
}

// Test ColorCodec
ColorCodec.test = function(parent,color) {
    // console.log("ColorCodec", "Testing");
    const div = Tests[0].section();
    color = color || "#DEADBEEF";
    const codec = new ColorCodec(color);
    div.innerText = codec.color_html_rgba;
    parent = el.is(parent) ? parent : document.body;
    Tests[0].print(parent, "Test ColorCodec");
    parent.appendChild(div);
    return [color, codec, div];
}

// Preview a color
ColorCodec.preview_size = 64;
ColorCodec.preview = function(parent, color, nodiv) {
    const me = ColorCodec;
    color = (is_defined(color)) ? color : "#123456";
    const codec = new ColorCodec(color);
    const ps = me.preview_size;
    const canvas = new Canvas({w:ps, h:ps});
    canvas.fill(codec.color_html_rgb);
    if (nodiv) {
        canvas.append(parent);
        return [ps, color, codec, canvas];
    } else {
        const div = Tests[0].section();
        canvas.append(div);
        parent = el.is(parent) ? parent : document.body;
        Tests[0].print(parent, "Preview ColorCodec");
        parent.appendChild(div);
        return [ps, color, codec, canvas, div];
    }
}

// Test ColorMap
// Initializes web safe colors
ColorMap.test = function(parent, cmap, maponly) {
    const me = ColorMap;
    // console.log("ColorMap", "Testing");
    cmap = cmap ? cmap : new ColorMap(null,ColorCodec.Format.color_css_rgba,true);
    // All web-safe color names
    cmap.add_colors_websafe();
    if (maponly) {
        return [cmap];
    } 
    else {
        const div = Tests[0].section();
        const edit = Tests[0].editor();
        div.appendChild(edit);
        edit.value = cmap.format(true);
        parent = el.is(parent) ? parent : document.body;
        Tests[0].print(parent, "Test ColorMap");
        parent.appendChild(div);
        return [cmap, edit, div];
    }
}

// Set background color (w/ optional delayed reset)
ColorMap.bg = function(element, color, delay, onreset) {
    const me = ColorMap;
    element = el.is(element) ? element : document.body;
    function bgnd(c) {
        if (!is_defined(c)) c = me.random_color_name();
        element.style.backgroundColor = c;
        return c;
    }
    delay = parseFloat(delay || 0) * 1000;
    color = bgnd(color);
    if (delay) {
        let id = window.setTimeout(()=>{
            bgnd(null);
            if (is_function(onreset)) {
                onreset();
            }
        }, delay);
        return [color, delay, `Reset in ${delay*0.001} second(s)`, id];
    } else {
        return [color, delay, "No reset", null];
    }
}

// Color names test
// Walks through all color names and passes them
// to the bg function above.
ColorMap.test_names = function(element, delay) {
    const me = ColorMap;
    const count = me.ColorNames.length;
    let index = 0;
    delay = delay || 1;
    const read = () => me.ColorNames[index];
    function next() {
        me.bg(element, read(), delay, function() {
            if (++index < count) {
                requestAnimationFrame(next);
            } else {
                console.info("Finished!");
            }
        });
    }
    document.body.onclick = function() {
        index = count;
        document.body.onclick = null;
    }
    console.info("Click on page to cancel");
    next();
    return me.ColorNames;
}

// Preview color defs
ColorMap.test_defs = function(parent) {
    const me = ColorMap;
    const cmap = new ColorMap();
    cmap.add_palette_named(me.ColorDefs);
    return me.preview(parent, cmap);
}

// Preview a color map
ColorMap.preview = function(parent, cmap) {
    const me = ColorMap;
    // Build map of web-safe colors
    cmap = cmap || me.test(null, null, true)[0]; // Element #0 has the map
    // Track return values
    const results = [];
    const div = Tests[0].section();

    /*
    let arr;
    try {
        arr = cmap.get_indices();
    } catch(err) {
        console.log("CMAP", cmap);
        throw err;
    }
    */

    const arr = cmap.get_indices();

    // Iterate over map
    arr.forEach((index)=>{
        const color = cmap.get_color(index);
        const rtn = ColorCodec.preview(div, color, true);
        results.push(rtn);
    });
    parent = el.is(parent) ? parent : document.body;
    Tests[0].print(parent, "Preview ColorMap");
    parent.appendChild(div);
    // Return map
    return [cmap, results, div];
}

// Capture colormap from image
ColorMap.test_capture = function(parent,url,onload) {
    const me = ColorMap;
    // console.log("Testing:", "Image color capture");
    url = ("string" !== typeof url) ? 
    "vga-256.png" : url;
    const cmap = new ColorMap();
    const pmap = new PixelMap();
    const div = Tests[0].section();
    const result = [cmap, pmap, div];
    function exec() {
        cmap.capture_colors(pmap);
        pmap.append(div);
        parent = el.is(parent) ? parent : document.body;
        Tests[0].print(parent, "Capture ColorMap");
        parent.appendChild(div);
        ColorMap.preview(undefined,cmap);
        if ("function" === typeof onload) {
            onload(result);
        }
        return true;
    }
    function oops(err) {
        console.error(err);
        return true;
    }
    pmap.load(url, exec, oops);
    return result;
}

// ColorMap/Palette conversion tests
ColorMap.test_convert = function(parent) {
    const me = ColorMap;
    // Get web safe colormap
    const cmap = ColorMap.test(null,null,true)[0];
    const result = [cmap];
    const div = Tests[0].section();
    // Preview a color map
    function preview(title, map) {
        Tests[0].print(div, title);
        me.preview(div, map);
        result.push([title, map]);
    }
    // Convert to/from standard palette
    function pal_std() {
        const pal = cmap.get_palette();
        const newmap = new ColorMap(pal);
        preview("Standard Palette", newmap);
    }
    // Convert to/from color array palette
    function pal_array() {
        const pal = cmap.get_color_array();
        const newmap = new ColorMap(pal);
        preview("Color Array Palette", newmap);
    }
    // Convert to/from named palette
    function pal_named() {
        const pal = cmap.get_palette_named();
        const newmap = new ColorMap(pal);
        preview("Named Palette", newmap);
    }
    [
        pal_std, pal_array, pal_named
    ].forEach((cb)=>cb());
    parent = el.is(parent) ? parent : document.body;
    parent.appendChild(div);
    return result;
}

// Test document parse/format colormap
ColorMap.test_doc = function(parent) {
/*
    Supported parse/format notations
    Passed in to parse as string array or multiline string
    Returned from format as string array of multiline string
    These can all be either named or unnamed
    Names are enabled/disabled by an object property
    * Tokenized triplet -- Programmable syntax
    * HTML -- 8, 6, 4 or 3 characters (# prefix)
    * JS -- Same as HTML (0x prefix)
    * CSS -- rgb(n,n,n) or rgba(n,n,n,n)
    * JSON -- Simple array [n,n,n] or [n,n,n,n]
    * JSON -- Object {r:n,g:n,b:n} or {r:n,g:n,b:n,a:n}

    Supported acquire types include all of the above
    string notations plus these non-string types.
    Names aren't supported.
    Integer order must be specified in a call argument
    * Array of 32-bit unsigned integer (RGBA or ARGB order)
    * Array palette [[n,n,n], ...] or [[n,n,n,n], ...]
    * Standard palette [{r:n,g:n,b:n}, ...] or [{r:n,g:n,b:n,a:n}, ...]
    * Named palette {colorname: [r, g, b, a], ...}
    * ColorMap instance (clone)
    * PixelMap instance (capture)
    * ImageData/drawable instance (capture)
    * Canvas instance (capture)
    * CanvasImageSource/stretchable instance (capture)

    Tokenized Triplets are Strings
    Must be configured before calling parse/format/acquire
    * Have no bracketing (grouping) delimiters
    * Consist of 3 or 4 fields (RGB or RGBA)
    * Field separator is programmable
    * Extra whitespace is permissible around non-white separators
    * Can use decimal or hexadecimal radix
    * Permit programmable scaling for decimal fields
    * Permit programmable precision for decimal fields
    * Permit programmable prefix/suffix codes for hex fields

*/
}

// All in one place!
const Tests = [
    {
        init : () => {
            Recent.update();
            console.info("Tests initialized");
            return "OK";
        },
        names : [
            "{names, dump}",
            "SizedObjectBase.test",
            "Canvas.test",
            "PixelMap.test",
            "ColorCodec.test",
            "ColorCodec.preview",
            "ColorMap.test",
            "ColorMap.test_names",
            "ColorMap.preview",
            "ColorMap.test_capture",
            "ColorMap.test_defs",
            "ColorMap.test_convert",
        ],
        dump : () => {
            const me = Tests;
            const N = me[0].names;
            let count = 0;
            N.forEach((n)=>{
                if (count) {
                    console.log(count, n);
                }
                ++count;
            });
            console.log("Recent", Recent.classes);
            return "OK";
        },
        section : () => {
            const elem = el("section");
            elem.classList.add("testing");
            return elem;
        },
        editor : () => {
            const edit = el("textarea");
            const attr = (e,n,v) => e.setAttribute(n,v);
            attr(edit, "cols", 40);
            attr(edit, "rows", 10);
            attr(edit, "multiline", true);
            attr(edit, "spellcheck", false);
            attr(edit, "wrap", "off");
            return edit;
        },
        cleanup : () => {
            const els = document.querySelectorAll('[class="testing"]');
            for (let el of els) {
                const p = el.parentElement;
                if (p) p.removeChild(el);
            }
        },
        print : (parent,str) => {
            const msg = el("div",str);
            msg.classList.add("testing");
            parent.appendChild(msg);
        },
        append : (parent,child) => {
            const div = el("div");
            div.classList.add("testing");
            div.appendChild(child);
            parent.appendChild(div);
        },
        contrast : (pixel) => {
            const color = [...pixel];
            color.length = 3;
            const luma = Math.max(...color);
            return (luma>127) ? 
                "black" :
                "white";
        }
    },
    SizedObjectBase.test,
    Canvas.test,
    PixelMap.test,
    ColorCodec.test,
    ColorCodec.preview,
    ColorMap.test,
    ColorMap.test_names,
    ColorMap.preview,
    ColorMap.test_capture,
    ColorMap.test_defs,
    ColorMap.test_convert,
];

// Recently created objects
const Recent = {
    update : () => {
        const me = Recent;
        const C = me.classes;
        C.Canvas     = Canvas.recent;
        C.PixelMap   = PixelMap.recent;
        C.ColorCodec = ColorCodec.recent;
        C.ColorMap   = ColorMap.recent;
        console.info("Updated recently created objects list");
        return "OK";
    },
    classes : {}
}

// One time initialization
Tests[0].init();

// Most used function!
function Hello() {
    console.clear();
    Recent.update();
    Tests[0].dump();
    return "OK";
}

console.info("Type 'Hello()' for help");
