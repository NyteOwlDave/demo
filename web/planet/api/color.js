
/*

  color.js
  
  Color and pixel functions

  Dave Wellsted, NyteOwl Computer Software
  2020-MAY-17
  
  REQUIRES:

    nada

  2020-FEB-13
  Updated to produce Lerped palette and to
  import array-based palette.

  2020-APR-01
  Updated SetPixel for transparent pixel capability

  2020-APR-03
  Added MakeArrayPalette function
  Moved PaletteDocument class to docs.js
  Made fixed-size palette functions use variable-size palettes
  Programmable gamma for LerpPalette() function
  Cosmetic improvements

  2020-APR-04
  Added DrawPalette function

  2020-MAY-17
  Cosmetic changes

*/

//-----------------------------------
// JS Colors - PART 1 of 6
//-----------------------------------

// Create a color object
function MakeColor(r,g,b) {
    return {
        "R" : r,
        "G" : g,
        "B" : b
    };
}

// Convert RGB color to grey-scale equivalent
function ColorToGreyScale(c) {
    return {
        "R": Math.floor(c.R * 0.2989),
        "G": Math.floor(c.G * 0.5870),
        "B": Math.floor(c.B * 0.1140)
    };
}

//-----------------------------------
// JS Colors - PART 2 of 6
//-----------------------------------

// Gamma function for color correction
function Gamma(n,max,gamma) {
    return (max * Math.pow(n/max, 1/gamma));
}

// Create grey-scale palette
function GreyPalette(count=256, gamma=1.2) {
    const pal = [];
    const limit = count-1;
    for (let x=0; x<count; x++) {
        const luma = Math.round(Gamma(x, limit, gamma));
        pal.push(MakeColor(luma, luma, luma));
    }
    return pal;
} 

// Linearly interpolated palette
function LerpPalette(first, last, count=256, gamma=1.2) {
    const pal = [];
    if ((count < 1) || !isFinite(count)) return pal;
    const rdiff = last[0] - first[0];
    const gdiff = last[1] - first[1];
    const bdiff = last[2] - first[2];
    const dist = count - 1;
    const scale = 1 / dist;
    const dr = rdiff * scale;
    const dg = gdiff * scale;
    const db = bdiff * scale;
    for (let x=0; x<count; x++) {
        let r = Gamma(first[0], 255, gamma);
        let g = Gamma(first[1], 255, gamma);
        let b = Gamma(first[2], 255, gamma);
        pal.push(MakeColor(r, g, b));
        first[0] += dr;
        first[1] += dg;
        first[2] += db;
    }
    return pal;
}

//-----------------------------------
// JS Colors - PART 3 of 6
//-----------------------------------

// Read pixel color from ImageData
function GetPixel(img,x,y) {
    const i = 4*(y*img.width+x);
    const r = img.data[i];
    const g = img.data[i+1];
    const b = img.data[i+2];
    return MakeColor(r,g,b);
}

// Write pixel color to ImageData
function SetPixel(img,x,y,c) {
    const i = 4*(y*img.width+x);
    if (c) {
        img.data[i  ] = c.R;
        img.data[i+1] = c.G;
        img.data[i+2] = c.B;
        img.data[i+3] = 255;
    } else {
        img.data[i  ] = 0;
        img.data[i+1] = 0;
        img.data[i+2] = 0;
        img.data[i+3] = 0;
    }
}

//-----------------------------------
// JS Colors - PART 4 of 6
//-----------------------------------

// Do nearest match for palette color
function GetNearestColor(pal,r,g,b) {
    let i=0, best=Infinity;
    const count = pal.length;
    for (let y=0; y<count; y++) {
        let rdiff = r - pal[y].R;
        let gdiff = g - pal[y].G;
        let bdiff = b - pal[y].B;
        let diff = rdiff*rdiff +
                   gdiff*gdiff +
                   bdiff*bdiff;
        if (diff < best) {
            i = y;
            best = diff;
        }
    }
    return i;
}

//-----------------------------------
// JS Colors - PART 5 of 6
//-----------------------------------

// Convert array-based palette entries to object-based
// This is the inverse of MakeArrayPalette
function MakeStandardPalette(other) {
    const result = [];
    const count = other.length;
    for (let i=0; i<count; i++) {
        const r = other[i][0];
        const g = other[i][1];
        const b = other[i][2];
        result.push(MakeColor(r, g, b));
    }
    return result;
}

// Convert object-based palette to array-based
// This is the inverse of MakeStandardPalette
function MakeArrayPalette(other) {
    const result = [];
    const count = other.length;
    for (let i=0; i<count; i++) {
        const r = other[i].R;
        const g = other[i].G;
        const b = other[i].B;
        result.push([r, g, b]);
    }
    return result;
}

//-----------------------------------
// JS Colors - PART 6 of 6 
//-----------------------------------

// Clone object-based palette
function ClonePalette(other) {
    const result = [];
    other = other || GreyPalette();
    const count = other.length;
    for (let i=0; i<count; i++) {
        const r = other[i].R;
        const g = other[i].G;
        const b = other[i].B;
        result.push(MakeColor(r, g, b));
    }
    return result;
}

// Draw palette to canvas
function DrawPalette(canvas, pal) {
    if (!pal) {
        Grafix.clear(canvas);
        return;
    }
    const rgb = (c) => c ? `rgb(${c.R},${c.G},${c.B})` : 0;
    const ctx = canvas.getContext('2d');
    let i = 0;
    const w = canvas.width;  const xs = Math.floor(w / 16);
    const h = canvas.height; const ys = Math.floor(h / 16);
    let xp = 0;
    let yp = 0;
    for (let y=0; y<16; y++) {
        yp += ys;
        xp = 0;
        for (let x=0; x<16; x++) {
            xp += xs;
            ctx.beginPath();
            ctx.fillStyle = rgb(pal[i++]);
            ctx.fillRect(xp, yp, xs, ys);
        }
    }
}

