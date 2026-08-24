
/*

  planet.js
  
  Rotating planet support

  Dave Wellsted, NCS
  Last Updated: 2020-MAY-17
  
  Based on original code by Simon Hern

  REQUIRES:

    p5.js
    v4/color.js
    v4/texmap.js
    v4/mtx.js
  
  2020-APR-02
  Added PlanetDocument class

  2020-APR-03
  Moved PlanetDocument class to docs.js
  Added ClonePlanet function

  2020-APR-05
  Added Planet.limits object
  Added Planet.fix method
  Tweaks to Planet function

  2020-MAY-17
  Cosmetics

*/


// Planet factory function
// Creates an empty planet
// Default palette is grey scale
function Planet(pal, nScale, nAspect) {
  return {
    xrot: 12/180*Math.PI,
    yrot: 15/180*Math.PI,
    zrot: 7/180*Math.PI,
    spin: 0,
    scale: parseInt(nScale) || 3,
    aspect: parseFloat(nAspect) || 0.5,
    palette: pal || GreyPalette(),          // color.js
    texture: {
       map: [],
       size: 0
    },
    uvcoord: {
       map: [],
       size: 0
    }
  };
}

// Sets limits, defaults and special handling
// flags for variable planet properties
Planet.limits = {
    xrot:   [-360,360,12,true],
    yrot:   [-360,360,15,true],
    zrot:   [-360,360, 7,true],
    scale:  [1,5,3,false],
    aspect: [0.5,1.0,0.5,false],        // aspect = 0.5*(slices+1)
    slices: [0,1,1,false]               // slices = 2*aspect - 1
};

// Peform fixups on planet properties
Planet.fix = function(n, propname) {
    const rad = (deg) => deg*Math.PI/180;
    const aspect = (n) => (n+1)*0.5;
    const clamp = (n,a,b) => Math.min(Math.max(n,a),b);
    let L = Planet.limits[propname];
    if (L[3]) {
        // Radians are used internally for angles
        n = parseInt(n);
        if (!isFinite(n)) return L[2];
        return rad(clamp(n,L[0],L[1]));
    }
    if (propname==="slices") {
        // Slices to aspect
        n = parseInt(n);
        n = aspect(n);
        propname = "aspect";
        L = Planet.limits[propname];
    } else if (propname==="aspect") {
        // Aspect
        n = parseFloat(n);
    } else {
        // Scale
        n = parseInt(n);
    }
    if (!isFinite(n)) return L[2];
    return clamp(n,L[0],L[1]);
}

// Clone an entire planet object
function ClonePlanet(planet) {
    planet = planet || paint_planet;
    if (!planet) {
        planet = Planet();
        planet.texture = CreateTexture(256);        // texmap.js
        // planet.texture = GenerateFractureMap();
        // CompilePlanet(planet, 256);
        return planet;
    }
    // This does a shallow copy
    const clone = Object.assign({}, planet);
    // Deep copy the palette
    clone.palette = ClonePalette(planet.palette);    // color.js
    // Deep copy the texture
    clone.texture = CloneTexture(planet.texture);
    // Deep copy the uvcoord map (size should be okay)
    clone.uvcoord.map = new Uint16Array(planet.uvcoord.map);
    // Return result
    return clone;
}

// Compile planet uv coordinates map
function CompilePlanet(planet, imageSize) {
    const twid = planet.texture.size;
    imageSize = imageSize || twid;
    if (!IsValidTextureSize({w:twid,h:twid})) {         // texmap.js
        throw 'Texture size is invalid';
    }
    if (!IsValidTextureSize({w:imageSize,h:imageSize})) {
        throw 'Planet size is invalid';
    }
    const scale = planet.scale || 4;
    const NOT_USED = 0xFFFF;
    planet.uvcoord.size = imageSize;
    planet.uvcoord.map = new Uint16Array(imageSize*imageSize);
    planet.aspect = planet.aspect || 1;
    const umask = imageSize-1;
    const vmask = umask-1;
    // mtx.js
    const M = Mtx.rotate2(
        planet.xrot,
        planet.yrot,
        planet.zrot
    );
    const iwid = imageSize;
    const ctr  = iwid/2;
    const r = ctr - 3.5;
    const rSqr = r*r;
    const radToTexY = scale*iwid/Math.PI;
    const radToTexX = radToTexY * planet.aspect;
    let x, y;
    for (y=0; y<iwid; y++) {
        let zi = -((y+0.5)-ctr);
        for (x=0; x<iwid; x++) {
            let cell = y*iwid + x;
            let xi = ((x+0.5)-ctr);
            let k = xi*xi + zi*zi;
            if (k < rSqr) {
                let yi = Math.sqrt(rSqr - k);
                let P = [xi,yi,zi];
                P = Mtx.transVector(M,P);       // mtx.js
                th = -Math.atan2(P[1],P[0]);
                ph = Math.acos(P[2]/r);
                const u = Math.floor(th*radToTexX+0.5) & umask;
                const v = Math.floor(ph*radToTexY+0.5) & vmask;
                const idx = v*iwid+u;
                planet.uvcoord.map[cell] = idx;
            }
            else {
                planet.uvcoord.map[cell] = NOT_USED;
            }
        }
    }
}

// Renders the planet to a frame buffer (ImageData)
function RenderPlanet(planet, frame) {

    const NOT_USED = 0xFFFF;
    const iwid = planet.uvcoord.size;
    const twid = planet.texture.size;
    const tmask = twid - 1;
    const spin = planet.spin & tmask;

    const coords = planet.uvcoord.map;
    const texels = planet.texture.map;
    const colors = planet.palette;

    let i=0;
    for (let y=0; y<iwid; y++) {
        for (let x=0; x<iwid; x++) {
            let uv = coords[i];
            if (uv !== NOT_USED) {
                let n = texels[uv+spin];
                let c = colors[n];
                SetPixel(frame,x,y,c);      // color.js
            }
            else {
                // Null is transparent black -- rgba(0,0,0,0)
                SetPixel(frame,x,y,null);
            }
            i++;
        }
    }
}

