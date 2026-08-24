
/*

    planet-app.js

    This is the planet web app itself.

    Dave Wellsted, NCS
    2020-APR-03

*/


// Current planet
// Has its own palette
let paint_planet = null;

// Current palette saved
let paint_palette = null;

// Animation loop
const paint_loop = () => {
    const p = paint_planet;
    if (p) {
        const frame = new ImageData(256, 256);
        RenderPlanet(p, frame);
        PlanetUI.draw(frame);
        p.spin += getSpinRate();
        p.spin &= (p.texture.size - 1);
    }
}

// p5.js callback
function draw() {
    paint_loop();
}

// Snapshots (save canvas as PNG)
const Snapshot = {
    // Common method
    prompt: function(title, canvas) {
        // const me = Snapshot;
        const filename = title.toLowerCase();
        let name = inputBox(title + " Snapshot Filename", filename)
        if (name.length) {
            saveCanvas(canvas, name, "png");
        }
    },
    // Palette canvas to PNG
    palette: function() {
        const me = Snapshot;
        me.prompt("Palette", idPalette);
    },
    // Texture canvas to PNG
    texture: function() {
        const me = Snapshot;
        me.prompt("Texture", idTexture);
    },
    // Planet canvas to PNG
    planet: function() {
        const me = Snapshot;
        me.prompt("Planet", idCanvas);
    },
}

// Palette utilities
const PaletteUI = {
    init : function() {
        
    },
    // Get optimal palette from image (as ImageData or HTMLCanvasElement)
    // Default image is the texture canvas
    optimal: function(img) {
        const me = PaletteUI;
        img = img || idTexture;
        let p = createOptimalPalette(img);
        return MakeStandardPalette(p);
    },
    // Capture/activate optimal palette from image
    capture: function(img) {
        const me = PaletteUI;
        const pal = me.optimal(img);
        // Draw and make active
        me.draw(pal);
    },
    // Draw/activate palette
    draw: function(pal) {
        const me = PaletteUI;
        pal = pal || paint_palette;
        paint_palette = pal;
        DrawPalette(idPalette, pal);        // color.js
    },
    // Draw/activate grey scale
    draw_grey: function() {
        const me = PaletteUI;
        me.draw(GreyPalette());
    },
    // Apply active palette to planet
    apply: function() {
        const me = PaletteUI;
        const p = paint_planet;
        if (p) {
            const tex = p.texture;
            const pal = p.palette;
            const pic = TextureToPicture(tex, pal);
            const newPal = paint_palette || GreyPalette();
            p.palette = ClonePalette(newPal);
            p.texture = PictureToTexture(pic, p.palette);    
        }
    },
    // Load palette from text file
    load: function() {
        const me = PaletteUI;
        const doc = new PaletteDocument();
        doc.prompt_load(function(doc) {
            // Activate/draw loaded palette
            me.draw(doc.palette);
        });
    },
    // Save palette to text file
    save: function() {
        const me = PaletteUI;
        let pal = paint_palette;
        if (!pal) {
            if (paint_planet) {
                pal = paint_planet.palette;
            }
        }
        pal = pal || me.optimal();
        const doc = new PaletteDocument(pal);
        doc.prompt_save();
    },
    // Save snapshot of palette to PNG file
    snapshot: function() {
        Snapshot.palette();
    },
}

// Texture utilities
const TextureUI = {
    // Texture lookup table
    lut_tex: [],
    init : function() {
        const me = TextureUI;
        function el(type, text) {
            if (text) {
              const e = el(type);
              e.innerText = String(text);
              return e;
            }
            return document.createElement(type);
        }
        function newMenuItem(parent, entry) {
            const option = el('option', entry[0]);
            parent.appendChild(option);
        }
        me.lut_tex = [
        ['Heart',                   me.onShowHeart      ],
        ['ILP',                     me.onShowILP        ],
        ['Laptop',                  me.onShowLaptop     ],
        ['Earth',                   me.onShowEarth      ],
        ['Harley',                  me.onShowHarley     ],
        ['Toni & J.J.',             me.onShowToni       ],
        ['Cartesian Graph Paper',   me.onShowRectGraph  ],
        ['Polar Graph Paper',       me.onShowPolarGraph ],
        ['Fracture Terrain',        me.onShowFracture   ],
        ];
        const menu = document.getElementById("idSelectTexture");
        me.lut_tex.forEach(entry=>{
            newMenuItem(menu, entry);
        });
        me.select();
    },
    // Generates and draws a fracture texture
    onShowFracture: function() {
        try {
            const me = TextureUI;
            const pal = GreyPalette();                  // color.js
            const tex = GenerateFractureMap(20, 3);     // texmap.js
            const pic = TextureToPicture(tex, pal);     // texmap.js
            me.draw(pic);
        }
        catch (err) {
            alert(err);
            console.log(err);
        }
    },
    // Draws the polar graph paper
    onShowPolarGraph: function() {
        try {
            const canvas = idTexture;
            Grafix.fill(canvas,'white');        // grafix.js
            Grafix.polar(canvas,'cyan');
        }
        catch (err) {
            alert(err);
            console.log(err);
        }
    },
    // Draws the rectangular graph paper
    onShowRectGraph: function() {
        try {
            const canvas = idTexture;
            Grafix.fill(canvas,'white');        // grafix.js
            Grafix.grid(canvas,'cyan','cyan');
        }
        catch (err) {
            alert(err);
            console.log(err);
        }
    },
    // Loads and displays texture #1
    onShowHeart: function() {
        const me = TextureUI;
        me.show_texture('heart-02.png');
    },
    // Loads and displays texture #2
    onShowILP: function() {
        const me = TextureUI;
        me.show_texture('ilp-terrain-02.png');
    },
    // Loads and displays texture #3
    onShowLaptop: function() {
        const me = TextureUI;
        me.show_texture('laptop-02.png');
    },
    // Loads and displays texture #3
    onShowEarth: function() {
        const me = TextureUI;
        me.show_texture('earth-02.png');
    },
    // Loads and displays texture #3
    onShowHarley: function() {
        const me = TextureUI;
        me.show_texture('harley-01.jpg');
    },
    // Loads and displays texture #3
    onShowToni: function() {
        const me = TextureUI;
        me.show_texture('toni-jj.png');
    },
    // Loads and displays a predefined texture
    show_texture: function(filename) {
        const me = TextureUI;
        const L = ImageLoader;          // loadimg.js
        L.canvas = idTexture;
        L.load(filename, function() {
            if (!paint_palette) {
                PaletteUI.capture();
            }
            if (!paint_planet) {
                me.apply();
            }
        });
    },
    // Select texture
    select : function() {
        const me = TextureUI;
        const i = idSelectTexture.selectedIndex;
        me.lut_tex[i][1]();
    },
    // Draw image into canvas (as ImageData)
    draw: function(pic) {
        const L = ImageLoader;      // loadimg.js
        L.canvas = idTexture;
        L.draw(pic);
    },
    // Draw texture into canvas (as PaletteIndexMap and Palette)
    draw_tex: function(tex, pal) {
        const me = TextureUI;
        const pic = TextureToPicture(tex, pal);     // texmap.js
        me.draw(pic);
    },
    // Map image to new color
    from_palette: function(pal) {
        const me = TextureUI;
        pal = pal || paint_palette || GreyPalette();    // color.js
        const pic = me.image();
        return PictureToTexture(pic, pal);              // texmap.js
    },
    // Read image from texture canvas (as ImageData)
    image: function() {
        // const me = TextureUI;
        const L = ImageLoader;                          // loadimg.js
        L.canvas = idTexture;
        return L.capture();
    },
    // Apply to planet
    // This is the precise inverse of capture()
    apply: function() {
        // const me = TextureUI;
        PlanetUI.create_from_image();
    },
    // Load texture from text file
    load: function() {
        const me = TextureUI;
        const doc = new TextureDocument();
        doc.prompt_load(function(doc){
            const pal = paint_palette || GreyPalette();
            const tex = doc.texture;
            me.draw_tex(tex, pal);
        });
    },
    // Save texture to text file
    save: function() {
        const me = TextureUI;
        const pic = me.image();
        const pal = paint_palette || GreyPalette();
        // docs.js, texmap.js
        const doc = new TextureDocument(PictureToTexture(pic, pal));
        doc.prompt_save(function () {
            // alert("Reminder: You should save the palette too.");
        });
    },
    // Save snapshot of texture to PNG file
    snapshot: function() {
        Snapshot.texture();
    },
    // Import texture from PNG/JPG file
    import: function() {
        const L = ImageLoader;      // loadimg.js
        L.canvas = idTexture;
        L.prompt_load();
    },
    // Capture texture from planet
    // This is the precise inverse of apply()
    capture: function() {
        const me = TextureUI;
        let p = paint_planet;
        p = p || Planet(paint_palette);
        const pal = p.palette;
        const tex = p.texture;
        me.draw_tex(tex, pal);
    }
}

// Planet utilities
const PlanetUI = {
    init : function() {
        const me = PlanetUI;
        me.rotate_default(false);
    },
    // Create a planet and make it active
    create_from_image: function(img, palette, aspect, scale) {
        const me = PlanetUI;
        const P = PaletteUI;
        const T = TextureUI;
        aspect = aspect || getAspect();                     // planet-ui.js
        scale = scale || getScale();                        // planet-ui.js
        img = img || T.image();
        palette = palette || P.optimal(img);
        const p = Planet(palette, scale, aspect);
        p.texture = PictureToTexture(img, palette);
        me.rotate(p);   // This makes it active
        // If no palette is captured, do so now
        if (!paint_palette) {
            // This makes it active
            P.draw(palette);
        }
    },
    // Create a planet and make it active
    create: function(filename, palette, aspect) {
        const me = PlanetUI;
        ImageLoader.load(filename, function(img) {
            me.create_from_image(img, palette, aspect)
        });
    },
    // Draws a picture (ImageData) to the canvas
    draw: function(pic) {
        const canvas = idCanvas;
        Grafix.draw(canvas, pic);
    },
    // Apply orientation transformation to planet
    rotate: function(planet) {
        // const me = PlanetUI;
        planet = planet || paint_planet;
        paint_planet = planet;
        if (planet) {
            getTransform(planet);           // planet-ui.js
            CompilePlanet(planet, 256);     // planet.js
        }
    },
    // Rotate planet
    rotate_planet: function() {
        const me = PlanetUI;
        if (!paint_planet) {
            TextureUI.apply();
            return;
        }
        me.rotate();
    },
    // Rotate planet
    rotate_clear: function() {
        const me = PlanetUI;
        const fix = e => e.value = 0;
        fix(idRotateX);
        fix(idRotateY);
        fix(idRotateZ);
        me.rotate_planet();
    },
    // Event handler for Default rotation button
    rotate_default: function(compile=true) {
        const me = PlanetUI;
        const home = e => e.getAttribute("home");
        const fix = e => e.value = home(e);
        fix(idRotateX);
        fix(idRotateY);
        fix(idRotateZ);
        if (compile) me.rotate_planet();
    },
    // Extract image from texture and palette (as ImageData)
    image_surface: function() {
        // const me = PlanetUI;
        const p = paint_planet;
        if (p) {
            const tex = p.texture;
            const pal = p.palette;
            return TextureToPicture(tex, pal);      // texmap.js
        }
        return new ImageData(256, 256);
    },
    // Extract image from canvas (as ImageData)
    image: function() {
        // const me = PlanetUI;
        const canvas = idCanvas;
        const sz = GetImageSize(canvas);            // texmap.js
        const gfx = canvas.getContext("2d");
        return gfx.getImageData(0, 0, sz.w, sz.h);
    },
    // Load planet from text file
    load: function() {
        const me = PlanetUI;
        const doc = new PlanetDocument();
        doc.prompt_load(function(doc) {
            const p = doc.planet;
            setControlsFromPlanet(p);
            CompilePlanet(p, 256);
            paint_planet = p;
            me.recent_doc = doc;
        });
    },
    // Save planet to text file
    save: function() {
        const doc = new PlanetDocument(paint_planet);
        doc.prompt_save();
    },
    // Save snapshot of planet to PNG file
    snapshot: function() {
        Snapshot.planet();
    },
}

// Application singleton object
const App = {

    // One time initialization (after document loads)
    onLoad: function() {
        try {
            PlanetUI.init();
            TextureUI.init();
            PaletteUI.init();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Rotate Planet button
    onRotatePlanet: function() {
        try {
            PlanetUI.rotate_planet();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Default Planet rotation button
    onRotatePlanetDefault: function() {
        try {
            PlanetUI.rotate_default();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },
    
    // Event handler for Clear Planet rotation button
    onRotatePlanetClear: function() {
        try {
            PlanetUI.rotate_clear();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Select Texture button
    onSelectTexture: function() {
        try {
            TextureUI.select();
        }
        catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event Handler for Capture Palette button
    onCapturePalette: function() {
        try {
            PaletteUI.capture();
        }
        catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Apply Palette button
    onApplyPalette: function() {
        try {
            PaletteUI.apply();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Apply Texture button
    onApplyTexture: function() {
        try {
            TextureUI.apply();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },
    
    // Event handler for Capture Texture button
    onCaptureTexture: function() {
        try {
            TextureUI.capture();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Load Planet button
    onLoadPlanet: function() {
        try {
            noLoop();
            enableControls( false );
            PlanetUI.load();
        } catch (err) {
            alert(err)
            console.log(err)
        } finally {
            enableControls( true );
            loop();
        }
    },

    // Event handler for Save Planet button
    onSavePlanet: function() {
        try {
            noLoop();
            enableControls( false );
            PlanetUI.save();
        } catch (err) {
            alert(err)
            console.log(err)
        } finally {
            enableControls( true );
            loop();
        }
    },

    // Event handler for Snapshot Planet button
    onSnapshotPlanet: function() {
        try {
            noLoop();
            enableControls( false );
            PlanetUI.snapshot();
        } catch (err) {
            alert(err)
            console.log(err)
        } finally {
            enableControls( true );
            loop();
        }
    },

    // Event handler for Load Texture button
    onLoadTexture: function() {
        try {
            TextureUI.load();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Save Texture button
    onSaveTexture: function() {
        try {
            TextureUI.save();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Import Texture button
    onImportTexture: function() {
        try {
            TextureUI.import();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Snapshot Texture button
    onSnapshotTexture: function() {
        try {
            TextureUI.snapshot();
        } catch (err) {
            alert(err)
            console.log(err)
        }
    },

    // Event handler for Load Palette button
    onLoadPalette: function() {
        try {
            PaletteUI.load();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Save Palette button
    onSavePalette: function() {
        try {
            PaletteUI.save();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Snapshot Palette button
    onSnapshotPalette: function() {
        try {
            PaletteUI.snapshot();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

    // Event handler for Gray Scale Palette button
    onGreyPalette: function() {
        try {
            PaletteUI.draw_grey();
        } catch (err) {
            alert(err);
            console.log(err);
        }
    },

};

