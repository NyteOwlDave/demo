
/*

  texmap.js -- texture map functions
  
  Dave Wellsted, NCS
  Last Updated: 2020-MAY-17
  
  Based on original code by Simon Hern

  REQUIRES:

    color.js
    optpal.js

  2020-APR-02
  Added TextureDocument class.
  Made GetImageSize() function global
  Made IsValidTextureSize() function global
  Added clone capability to PaletteIndexMap() function

  2020-APR-03
  Improvements to PaletteIndexMap
  Added CloneTexture alias
  Added CreateTexture alias
  Cosmetic improvements

  2020-APR-04
  PictureToTexture now generates optimal palette if needed

  2020-MAY-17
  Cosmetics

*/

// Creates/clones a one dimensional byte array (logically square)
// to contain pixels/texels encoded as palette indices
// If arg is an index map (texture), it's cloned
// Else arg must be a valid size [64, 128, 256]
function PaletteIndexMap(arg) {
    function check_size(n) {
        if (!IsValidTextureSize(n)) {
            throw new RangeError("Texture size must be in [64,128,256]");
        }
    }
    if (arg instanceof Object) {
        const other = arg;
        const map = other.map;
        if ((typeof map !== "object") || 
            !(map instanceof Uint8ClampedArray)) {
            throw new TypeError("Texture contains no texel array");
        }
        const size = other.size;
        check_size(size);
        // Shallow copy
        const clone = Object.assign({}, other);
        // Deep copy texels
        clone.map = new Uint8ClampedArray(map);
        // Return result
        return clone;
    }
    else {
        const size = parseInt(arg);
        check_size(size);
        return {
            size: size,
            map: new Uint8ClampedArray(size*size)
        };
    }
}

// For readability
const CloneTexture = PaletteIndexMap;
const CreateTexture = PaletteIndexMap;

// Determine size of any image (or other object)
function GetImageSize(img) {
    return {
        w: img.naturalWidth||img.width,
        h: img.naturalHeight||img.height
    };
}

// Whether image size is valid for a texture
function IsValidTextureSize(s) {
    if (typeof s === "object") {
        if (s.w !== s.h) return false;
        s = s.w;
    }
    if (s ===  64) return true;
    if (s === 128) return true;
    if (s === 256) return true;
    return false;
}

// Creates a texture map from a palette and
// picture represented as ImageData.  Each
// texel is an index in to the palette.  The
// texture map itself is a 1-dimensional array
// of texel color indices.
function PictureToTexture(img,pal) {
    const s = GetImageSize(img);
    if (!IsValidTextureSize(s)) {
        throw 'Invalid texture size';
    }
    if (!pal) {
        pal = createOptimalPalette(img);    // optpal.js
        pal = MakeStandardPalette(pal);     // color.js
    }
    const size = s.w;
    const tex = CreateTexture(size);
    const tels = tex.map;
    let idx = 0;
    for (let y=0; y<size; y++) {
        for (let x=0; x<size; x++) {
        // NOTE: Requires color.js
        let c = GetPixel(img, x, y);
            tels[idx++] = GetNearestColor(pal, c.R, c.G, c.B);
        }
    }
    return tex;
}

// Performs the inverse function for the PictureToTexture()
// function.  In other words, takes a paletted texture
// map and converts it to a 32-bpp pixel map in ImageData
// format.
function TextureToPicture(tex,pal) {
    const w = tex.size;
    const h = tex.size;
    if (!IsValidTextureSize({w:w, h:h})) {
        throw 'Invalid texture size';
    }
    pal = pal || GreyPalette();
    const tels = tex.map;
    const img = new ImageData(w, h);
    let idx = 0;
    for (let y=0; y<h; y++) {
        for (let x=0; x<w; x++) {
            const c = pal[tels[idx++]];
            // NOTE: Requires color.js
            SetPixel(img, x, y, c);
        }
    }
    return img;
}

// Creates a 256x256 texture map displaying surface fractures
// simulating meteor hits on a planet or moon
const GenerateFractureMap = (function() {
    const riff = [];
    const prob = [];
    const skin = [];
    // Riff, skin and probability table generators
    function MakeRiff() {
        if (riff.length > 0) return;
        const texToRad = Math.PI/128;
        const radToTex = 128/Math.PI;
        for (let y=0; y<64; y++) {
            riff[y] = new Uint8Array(64);
            let b = (y + 0.5) * texToRad;
            let c = Math.sin(b);
            prob[y] = c*c;
            let a = Math.tan(b);
            for (let x=0; x<63; x++) {
                b = (x + 0.5) * texToRad;
                c = Math.atan(a*b) * radToTex;
                riff[y][x] = (64 - Math.floor(c + 0.5));
            }
        }
        for (let y=0; y<128; y++) {
            skin[y] = new Int16Array(256);
        }
    }
    // Skin blast generator
    function MakeBlast(ri,energy,col) {
        for (let x=0; x<64; x++) {
            let x1 = (col+x) & 0xFF;
            let x2 = (col+255-x) & 0xFF;
            let ymax = riff[ri][x];
            for (let y=ymax; y>0; y--) {
                skin[y][x1] += energy;
                skin[y][x2] += energy;
            }
            skin[0][x1] += energy;
            skin[0][x2] += energy;
            ymax = 127 - riff[ri][x];
            for (let y=ymax; y>0; y--) {
                skin[y][x1] += energy;
                skin[y][x2] += energy;
            }
            skin[0][x1] += energy;
            skin[0][x2] += energy;
        }
    }
    // Random integer in range [min .. max]
    function irnd(min,max) {
        return (min+Math.floor(Math.random()*(max-min)));
    }
    // Probability of n
    const Pr = (n) => Math.random()<(n);
    // Probability of !n
    const Pn = (n) => (n)<Math.random();
    // The skin table generator
    function MakeSkin(base,expo) {
        const numfrac = Math.pow(base,expo);
        const inve = 1 / expo;
        let disp = 0;
        for (let frac=numfrac; frac>0; frac--) {
            let col = irnd(0,255);
            let ri = irnd(0,63);
            if (Pn(prob[ri])) ri = 63-ri;
            energy=Math.round(base/Math.pow(frac,inve));
            if (Pr(0.5)) energy = -energy;
            if (Pr(0.5)) disp -= energy;
            MakeBlast(ri, energy, col);
        }
        for (let y=0; y<128; y++) {
            for (let x=0; x<256; x++) {
                skin[y][x] += disp;
            }
        }
    }
    // The texture map generator function
    // NOTE: 20,3 is a good arg choice here
    return (function(base,expo) {
        base = base || 20;
        expo = expo || 3;
        MakeRiff();
        MakeSkin(base, expo);
        let maxAmp = 0;
        let minAmp = 256;
        for (let y=0; y<128; y++) {
            for (let x=0; x<256; x++) {
                amp = skin[y][x];
                if (amp<minAmp) minAmp = amp;
                if (amp>maxAmp) maxAmp = amp;
            }
        }
        numAmp = maxAmp - minAmp;
        let scale = 255 / numAmp;
        const tex = CreateTexture(256);
        const tels = tex.map;
        for (let y=0; y<128; y++) {
            let idx1 = y * 512;
            let idx2 = idx1 + 256;
            for (let x=0; x<256; x++) {
                amp = skin[y][x] - minAmp;
                let tel = (amp*scale);
                tels[idx1+x] = tel;
                tels[idx2+x] = tel;
            }
        }
        return tex;
    });
})();

