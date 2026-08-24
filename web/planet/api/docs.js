
/*

    docs.js

    Document classes and support
   
    Dave Wellsted, NCS
    Last Updated: 2020-MAY-17

    REQUIRES:

    * p5.js

    From ntyeowl/api/2020
    * v4/dlg.js
    * v4/color.js
    * v4/texmap.js
    * v4/planet.js

    2020-APR-04
    Bug fixes to BlobDocument

    2020-APR-05
    Enhancements to PaletteDocument and TextureDocument classes
    Completed PlanetDocument class

    2020-MAY-17
    Cosmetics
    PaletteDocument.array_map method repaired

*/

// Text document tokenizer class
class Tokenizer {
    constructor(doc) {
        this.acquire(doc);
    }
    // Remove all tokens
    clear() {
        const me = this;
        me.tokens = [];
    }
    // How many tokens are present
    get count() {
        const me = this;
        return me.tokens.length;
    }
    // Whether token array is empty
    done() {
        const me = this;
        return me.count < 1;
    }
    // Parses a multi-line text file or line array into tokens
    // Removes comments and empty lines
    // All tokens are guaranteed to contain no whitespace
    acquire(doc) {
        const me = this;
        // Handle multi-line text file first (split into line array)
        if (Array.isArray(doc)) {
            doc = doc.join(" ");
        }
        doc = String(doc).split("\n");
        // Trim leading/trailing whitespace (each line)
        // Remove empty lines
        // Remove comment lines
        doc = doc.map(e=>e.trim())
        .filter(e=>e.length)
        .filter(e=>e[0] !== '#');
        // Merge all lines into a single long line
        // Split into tokens
        // Remove leading/trailing whitespace (each token)
        // Remove empty tokens
        me.tokens = doc.join(" ")
        .split(" ")
        .map(e=>e.trim())
        .filter(e=>e.length);
        // Return token count
        return me.count;
    }
    // Unread a value (make it the next to read)
    unread(s) {
        const me = this;
        me.tokens.unshift(String(s));
        return me;
    }
    // Skip at next token
    skip() {
        const me = this;
        me.tokens.shift();
        return !me.done();
    }
    // Peek at next token
    peek() {
        const me = this;
        return String(me.tokens[0]).trim().toLowerCase();
    }
    // Read next token (string)
    read() {
        const me = this;
        me.assert_ready();
        const token = me.peek();
        me.skip();
        return token;
    }
    // Read next token (integer)
    read_int(radix) {
        const me = this;
        const n = parseInt(me.read(), radix);
        if (!isFinite(n)) {
            throw new TypeError("Expected an integer");
        }
        return n;
    }
    // Read next token (float)
    read_real() {
        const me = this;
        const n = parseFloat(me.read());
        if (!isFinite(n)) {
            throw new TypeError("Expected a real number");
        }
        return n;
    }
    // Read next token (boolean)
    read_bool() {
        const me = this;
        const b = me.read();
        switch (b) {
        case "true":    return true;
        case "false":   return false;
        default:        break;
        }
        throw new TypeError("Expected true or false");
    }
    // Read next token (date)
    read_date() {
        const me = this;
        return new Date(me.read());
    }
    // Read next token (object)
    read_json() {
        const me = this;
        return JSON.parse(me.read());
    }
    // Performs a regex match without removing the token
    match(pattern, invert) {
        const me = this;
        me.assert_ready();
        pattern = new RegExp("^"+pattern+"$", "i");
        const ok = pattern.test(me.peek());
        return invert ? (!ok) : ok;
    }
    // Assert not finished
    assert_ready() {
        const me = this;
        if (me.done()) {
            const msg = "No more tokens";
            throw new Error(msg);
        }
        return "OK";
    }
    // Read next token and assert match
    assert_match(pattern, invert, skip) {
        const me = this;
        if (!me.match(pattern, invert)) {
            const got = me.peek();
            const want = pattern;
            const msg = `Unexpected token : found'${got}' : wanted '${want}'`;
            throw new Error(msg);
        }
        if (skip) me.skip();
        return "OK";
    }
}

// Document type descriptors
// and load/save dialogs
const DocTypeDescriptors = {
    planet : {
        name : "Planet",
        desc : "Planet Document",
        type : "3dp",
        mime : "text/*"
    },
    texture : {
        name : "Texture",
        desc : "Texture Document",
        type : "tex",
        mime : "text/*"
    },
    palette : {
        name : "Palette",
        desc : "Palette Document",
        type : "map",
        mime : "text/*"
    },
    blob : {
        name : "Blob",
        desc : "Blob Document",
        type : "b64",
        mime : "text/*"
    },
    json : {
        name : "JSON",
        desc : "JSON Document",
        type : "json",
        mime : "text/*"
    },
    png_image : {
        name : "Photo",
        desc : "PNG Photo File",
        type : "png",
        mime : "image/*"
    },
    jpg_image : {
        name : "Photo",
        desc : "JPG Photo File",
        type : "jpg",
        mime : "image/*"
    },
    // Dialog to enter filename for saving
    prompt_save(obj, onsave) {
        const dtd = obj.dtd;
        DocTypeDescriptors.assert_valid(dtd);
        let s = inputBox(dtd.desc, dtd.name.toLowerCase()); // dlg.js
        if (s.length) {
            obj.save(s, onsave);
        }
        return obj;
    },
    // Dialog to choose file for loading
    prompt_load(obj, onload) {
        const dtd = obj.dtd;
        DocTypeDescriptors.assert_valid(dtd);
        let accept = "." + dtd.type + "," + dtd.mime;
        fileDialog(false, accept, files=>{ // dlg.js
            obj.load(files[0], onload);
        });
        return obj;
    },
    // Assert that a Doc Type Descriptor is valid
    assert_valid(dtd) {
        function check(ok) {
            if (ok) return;
            throw new Error("Invalid Document Type Descriptor");
        }
        function prop(name) {
            check(typeof dtd[name] === "string");
        }
        check(typeof dtd === "object");
        ["name", "desc", "type", "mime"].forEach(prop);
        return "OK";
    }
};

// Base class for documents
class DocumentInterface {
    constructor(dtd) {
        DocTypeDescriptors.assert_valid(dtd);
        this.dtd = dtd;
    }
    // Parse planet text file
    // Input can be multi-line string or line array
    parse(doc) {
        throw new Error("Derived class must override parse method");
    }
    // Format as text file
    // Returns multi-line string when merge is true
    // Else line array
    format(merge) {
        throw new Error("Derived class must override format method");
    }
    // Format as text and save to file
    // NOTE: Image file formats should override this!
    save(file, onsave) {
        // const fn = o => typeof o === "function";
        saveStrings(this.format(), file, this.dtd.type);    // p5.js
        if ("function" === typeof onsave) {
            onsave(this);
        }
    }
    // Load from text file
    // The file arg may be a File instance or a filename string
    // NOTE: Image file formats should override this!
    load(file, onload) {
        const fn = o => typeof o === "function";
        const me = this;
        function load(doc) {
            me.parse(doc);
            if (fn(onload)) onload(me);
        }
        if (file instanceof File) {
            const rdr = new FileReader();
            rdr.onload = function(e) {
                load(e.target.result);
            }
            rdr.readAsText(file);
        } else {
            loadStrings(file, function(lines) {             // p5.js
                load(lines);
            });
        }
    }
    // Prompts the user to save to a text file
    prompt_save(onsave) {
        const D = DocTypeDescriptors;
        return D.prompt_save(this, onsave);
    }
    // Prompts the user to load from a text file
    prompt_load(onload) {
        const D = DocTypeDescriptors;
        return D.prompt_load(this, onload);
    }
}

// Represent a blob as a base64 text file
class BlobDocument extends DocumentInterface {
    constructor(size) {
        super(DocTypeDescriptors.blob);
        this.count = size || 0;
    }
    // Get element count
    get count() {
        return this.entry.length;
    }
    // Set element count
    set count(n) {
        n = isFinite(n) ? parseInt(n) : 1;
        this.entry = new Uint8ClampedArray(n);
    }
    // Read as base64 string
    get base64() {
        return btoa(this.entry);
    }
    // Write from base64 string
    set base64(s) {
        this.csv = atob(s);
    }
    // Read as comma separated value string (decimal bytes)
    get csv() {
        return this.entry.join(",");
    }
    // Write from comma separated value string (decimal bytes)
    set csv(s) {
        this.array = s.split(",");
    }
    // Read as raw ASCII string (binary)
    get ascii() {
        return this.array.map(c=>String.fromCharCode(c)).join("");
    }
    // Write from raw ASCII string (binary)
    set ascii(s) {
        this.array = s.split("").map(c=>c.charCodeAt(0));
    }
    // Read as standard array (decimal integers)
    // Creates a clone
    get array() {
        return [... this.entry];
    }
    // Write from standard array (decimal integers)
    set array(arr) {
        this.entry = new Uint8ClampedArray(arr);
    }
    // Parse base64 text file to blob
    parse(doc) {
        if (Array.isArray(doc)) {
            doc = doc.join("");
        }
        this.base64 = doc;
    }
    // Format bloab as base64 text file
    format(merge) {
        return merge ? this.base64 : [ this.base64 ];
    }
}

// Represents an RGB palette as a text file
class PaletteDocument extends DocumentInterface {
    constructor(other) {
        super(DocTypeDescriptors.palette);
        this.acquire(other);
    }
    // Number of color entries
    get count() {
        return this.palette.length;
    }
    // Gain access to the underlying palette object
    get palette() {
        return this._palette;
    }
    // Get a clone of the internal color palette
    standard_map() {
        return ClonePalette(this.palette);  // color.js
    }
    // Get a clone of the internal color palette
    array_map() {
        return MakeArrayPalette(this.palette);  // color.js
    }
    // Acquire another palette's colors
    acquire(other) {
        if (other) {
            if (typeof other === 'string') {
                this.parse(other);
            } else {
                const ok = Array.isArray(other);
                if (!ok) throw new TypeError("Argument must be string or array type");
                if (typeof other[0] === 'string') {
                    this.parse(other);
                } else {
                    this._palette = ClonePalette(other);    // color.js
                }
            }
        } else {
            this._palette = GreyPalette();    // color.js
        }
        return this;
    }
    // Remove all colors
    clear() {
        this._palette = [];
    }
    // Parse from a text file or string array
    parse(src) {
        this.clear();
        if (!src) return this;
        if (Array.isArray(src)) {
            src = src.join("\n");
        }
        src = String(src).split("\n").map(e=>e.trim()).filter(e=>e.length);
        src = src.join(" ").split(" ").map(e=>parseInt(e));
        const list = [];
        const clamp = (n) => Math.min(Math.max(n,0),255);
        const fix = (n) => isFinite(n) ? clamp(n) : 0;
        const read = () => fix(src.shift());
        // Force token count to exact size we need
        src.length = 256*3;
        // Fill in any missing lines
        while (list.length < 256) {
            let r = read();
            let g = read();
            let b = read();
            list.push(MakeColor(r, g, b));
        }
        this._palette = list;
        return this;
    }
    // Format as a text file or string array
    format(merge) {
        const lines = [];
        const pal = this.palette;
        pal.forEach(c=>{
            lines.push(`${c.R} ${c.G} ${c.B}`);
        });
        return merge ? lines.join("\n") : lines;
    }
}

// Represent a texture document as a text file
class TextureDocument extends DocumentInterface {
    constructor(other) {
        super(DocTypeDescriptors.texture);
        this.acquire(other);
    }
    // Return texture size (64, 128, 256)
    get size() {
        return this.texture.size;
    }
    // Create empty texture having specified size
    set size(n) {
        this._texture = CreateTexture(n);     // texmap.js
    }
    // Return underlying texture map (PaletteIndexMap instance)
    get texture() {
        return this._texture;
    }
    // Acquire copy of another texture
    acquire(other) {
        if (other) {
            if ((typeof other === 'string')||(Array.isArray(other))) {
                this.parse(other);
            } else {
                this._texture = CloneTexture(other);     // texmap.js
            } 
        } else {
            this.size = 256;
        }
        return this;
    }
    // Parse text document as texture map
    parse(doc) {
        const T = new Tokenizer(doc);
        T.assert_match("size", false, true);
        const size = T.read_int();
        if (!IsValidTextureSize(size)) {    // textmap.js
            throw new Error("Invalid texture size");
        }
        let count = size*size;
        const tokens = T.tokens.length;
        if (tokens !== count) {
            console.warn("Texel count mismatch", 
            `Expected ${count}`,
            `Found ${tokens}`);
            count = Math.min(count, tokens);
        }
        this._texture = CreateTexture(size);    // texmap.js
        const map = this._texture.map;
        for (let n=0; n<count; n++) {
            map[n] = T.read_int();
        }
        return this;
    }
    // Format texture map as text document
    format(merge) {
        const size = this.size;
        const map = this.texture.map;
        const lines = ["size " + size];
        const count = size * size;
        let line = [];
        function flush() {
            if (line.length) {
                lines.push(line.join(" "));
                line = [];
            }
        }
        for (let n=0; n<count; n++) {
            const index = n % 20;
            line[index] = map[n];
            if (line.length % 20) continue;
            flush();
        }
        flush();
        return merge ? lines.join("\n") : lines;
    }
}

// Represent a planet as a text file
class PlanetDocument extends DocumentInterface {
    constructor(planet) {
        super(DocTypeDescriptors.planet);
        this.acquire(planet);
        this.memo = {};
    }
    // Access to underlying planet object
    get planet() {
        return this._planet;
    }
    // Create palette document
    get palette() {
        return this.planet.palette;
    }
    // Create texture document
    get texture() {
        return this.planet.texture;
    }
    // Acquire planet
    acquire(other) {
        if (other) {
            if ((typeof other === 'string')||(Array.isArray(other))) {
                this.parse(other);
            } else {
                this._planet = ClonePlanet(other);  // planet.js
            }    
        } else {
            this._planet = Planet();  // planet.js
        }
        return this;
    }
    // Parse text document as planet
    parse(doc) {
        const P = this.planet;
        const T = new Tokenizer(doc);
        const L = Planet.limits;  // planet.js
        this.memo = {};
        this.palette_ok = false;
        this.texture_ok = false;
        const read = (propname) => Planet.fix(T.read(), propname);    // planet.js
        T.assert_match("ncs", false, true);
        T.assert_match("planet", false, true);
        T.assert_match("2020", false, true);
        function prop(propname) {
            if (T.match(propname)) {
                T.skip();
                const n = read(propname);
                // Slices are converted to aspect by read() function
                if (propname === "slices") {
                    P["aspect"] = n;
                } else {
                    P[propname] = n;
                }
                return true;
            } else {
                return false;
            }
        }
        while (!T.done()) {
            let got = false;
            for (let propname in L) {
                if (prop(propname)) {
                    got = true;
                    break;
                }
            }
            if (got) continue;
            if (T.match("begin")) {
                T.skip();
                const block_start = T.read();
                function read_to_end() {
                    const tokens = [];
                    while (!T.done()) {
                        if (T.match("end")) {
                            T.skip();
                            if (!T.match(block_start, false, false)) {
                                const block_end = T.peek();
                                const a = `Expected ${block_start}`;
                                const b = `Found ${block_end}`;
                                throw new Error(`Mismatched block end : ${a} : ${b}`);
                            }
                            T.skip();
                            return tokens;
                        }
                        tokens.push(T.read());
                    }
                    throw new Error(`Missing block end for ${block_start}`);
                }
                const tokens = read_to_end();
                console.log(block_start, tokens);
                switch (block_start) {
                case "palette":
                    {
                        const doc = new PaletteDocument(tokens);
                        this.planet.palette = doc.palette;
                        this.palette_ok = true;
                        console.info("Loaded Palette");
                    }
                    break;
                case "texture":
                    {
                        const doc = new TextureDocument(tokens);
                        this.planet.texture = doc.texture;
                        this.texture_ok = true;
                        console.info("Loaded Texture");
                    }
                    break;
                default:
                    {
                        this.memo[block_start] = tokens;
                        console.info("Loaded Memo", block_start);
                    }
                    break;
                }
            } else {
                const token = T.peek();
                throw new Error(`Unknown token : ${token}`);
            }
        }
        return this;
    }
    // Format planet map as text document
    format(merge) {
        const deg = (rad) => Math.round(rad*180/Math.PI);
        const slices = (n) => Math.round(2*n - 1);
        const me = this;
        const p = me.planet;
        const pal_doc = new PaletteDocument(me.palette);
        const tex_doc = new TextureDocument(me.texture);
        const lines = [
            "ncs planet 2020",
            "xrot " + deg(p.xrot),
            "yrot " + deg(p.yrot),
            "zrot " + deg(p.zrot),
            "scale " + p.scale,
            "slices " + slices(p.aspect),
            "begin palette",
            pal_doc.format(true),
            "end palette",
            "begin texture",
            tex_doc.format(true),
            "end texture",
            ""
        ];
        // BUG: memo property needs to be processed here...
        return merge ? lines.join("\n") : lines;
    }
}

