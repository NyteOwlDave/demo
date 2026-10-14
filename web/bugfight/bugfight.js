
/* bugfight.js */

// Maximum life for a bug
const maximum_life = 1;

// Number of tries for spawning new bugs
// const spawn_tries = 100;

// Range of random values for voracity
const voracity_range = 30;

// Random bug voracity
const random_bug_voracity = () => Math.floor(Math.random() * 12 + 3);

// Bug details
// Colors are palette indices
const bug_info = [
    { color:  1, eats:  2, voracity: random_bug_voracity() },
    { color:  2, eats:  3, voracity: random_bug_voracity() },
    { color:  3, eats:  4, voracity: random_bug_voracity() },
    { color:  4, eats:  5, voracity: random_bug_voracity() },
    { color:  5, eats:  6, voracity: random_bug_voracity() },
    { color:  6, eats:  1, voracity: random_bug_voracity() },
    { color:  7, eats: 20, voracity: random_bug_voracity() },
    { color:  8, eats:  5, voracity: random_bug_voracity() },
    { color:  9, eats:  4, voracity: random_bug_voracity() },
    { color: 10, eats:  9, voracity: random_bug_voracity() },
    { color: 11, eats:  8, voracity: random_bug_voracity() },
    { color: 12, eats:  7, voracity: random_bug_voracity() },
    { color: 13, eats: 12, voracity: random_bug_voracity() },
    { color: 14, eats: 13, voracity: random_bug_voracity() },
    { color: 15, eats: 11, voracity: random_bug_voracity() },
    { color: 16, eats: 15, voracity: random_bug_voracity() },
    { color: 17, eats: 10, voracity: random_bug_voracity() },
    { color: 18, eats: 17, voracity: random_bug_voracity() },
    { color: 19, eats:  9, voracity: random_bug_voracity() },
    { color: 20, eats: 19, voracity: random_bug_voracity() },
];

// The bug class
class Bug {
    constructor( color ) {
        this.life = maximum_life;
        this.info = Bug.find_info(color);
    }
    // Color of the bug (palette index)
    get color() {
        return this.info.color;
    }
    // What color the bug eats (palette index)
    get eats() {
        return this.info.eats;
    }
    // Voracity of the bug
    get voracity() {
        return this.info.voracity;
    }
    // Update the bug
    // Spawn any children
    // Remove bug if dead
    update( grid_in, grid_out, row, col ) {
		const krnd =( k )=> Math.floor( Math.random() * k );
        const me = this;
        if ( grid_in[ row ][ col ] != this ) {
            throw new Error( "Bug grid logic error" );
        }
        if ( this.life <= 0 ) {
            return this;
        }
        const rows = grid_in.length;
        const cols = grid_in[ 0 ].length;
        let spawned = false;
        function spawn_denied() {
            return (
			 	me.voracity < krnd( voracity_range )
			);
        }
        function spawn( row, col ) {
            if ( row < 0 || col < 0 ) return;
            if ( row >= rows ) return;
            if ( col >= cols ) return;
            const neighbor = grid_in[ row ][ col ];
            if (! neighbor || ( me.eats == neighbor.color ) ) {
                if ( spawn_denied() ) return;
                const child = new Bug( me.color );
                grid_out[ row ][ col ] = child;
                spawned = true;
            }
        }
        spawn( row + 1, col     );
        spawn( row + 1, col - 1 );
        spawn( row + 1, col + 1 );
        spawn( row - 1, col     );
        spawn( row - 1, col - 1 );
        spawn( row - 1, col + 1 );
        spawn( row    , col - 1 );
        spawn( row    , col + 1 );
        if (! spawned ) {
            this.life -= 1;
        }
        if ( this.life > 0 ) {
            grid_out[ row ][ col ] = this;
        }
        return this;
    }
    // Buffer is an ImageData object
    render( buffer, x, y, palette ) {
        const w = buffer.width;
        const h = buffer.height;
        if ( ( x >= w ) || ( x < 0 ) ) return this;
        if ( ( y >= h ) || ( y < 0 ) ) return this;
        const data = buffer.data;
        const index = 4 * ( y * w + x );
        const color = palette.colors[ this.color ];
        if (! color ) {
			throw new Error( "Invalid palette index" );
		}
        data[ index     ] = color.r;
        data[ index + 1 ] = color.g;
        data[ index + 2 ] = color.b;
        data[ index + 3 ] = 255;
        return this;
    }
}

// Find bug info from an integer color
Bug.find_info = function( color ) {
    for ( let info of bug_info ) {
        if ( info.color == color ) return info;
    }
    throw new Error( "Invalid bug color: " + color );
}

// Number of bug species
Bug.num_species = function() {
    return bug_info.length;
}

// Reset random voracities
Bug.reset_voracities = function() {
    for ( let info of bug_info ) {
        info.voracity = random_bug_voracity();
    }
}

// Bug World Class
class BugWorld {
    constructor( palette, w=256, h=256 ) {
        this.buffer = new ImageData(w, h);
        this.reset(palette);
    }
    reset( palette ) {
        this.palette = palette;
        if ( (! this.palette )
		  || ( this.palette.length <= Bug.num_species() ) ) {
            throw new Error( "Invalid palette" );
        }
        this.grid = this.create_grid();
        Bug.reset_voracities();
    }
    create_grid() {
        const w = this.width;
        const h = this.height;
        const grid = new Array( h );
        for ( let row = 0; row < h; row++ ) {
            grid[ row ] = new Array( w );
        }
        return grid;
    }
    get width() {
        return this.buffer.width;
    }
    get height() {
        return this.buffer.height;
    }
    get_bug( row, col ) {
        return this.grid[ row ][ col ];
    }
    spawn( count ) {
        const me = this;
        const length = me.palette.colors.length - 1;
        function random_color() {
            return 1 + Math.floor(Math.random() * length);
        }
        if ( length < Bug.num_species() ) {
            throw new Error( "Empty palette" );
        }
        const h = this.height;
        const w = this.width;
        for ( let n = 0; n < count; n++ ) {
            let row = Math.floor( Math.random() * h );
            let col = Math.floor( Math.random() * w );
            const color = random_color();
            this.grid[ row ][ col ] = new Bug( color );
        }
        return this;
    }
    update() {
        const rows = this.height;
        const cols = this.width;
        const grid_temp = this.create_grid();
        for ( let row = 0; row < rows; row +=1 ) {
            for ( let col = 0; col < cols; col +=1 ) {
                const bug = this.grid[ row ][ col ];
                if ( bug instanceof Bug ) {
					bug.update( this.grid, grid_temp, row, col );
				}
            }
        }
        this.grid = grid_temp;
        return this;
    }
    render( canvas ) {
        const cw = canvas.width;
        const ch = canvas.height;
        const iw = this.width;
        const ih = this.height;
        for ( let row = 0; row < ih; row += 1 ) {
            for (let col = 0; col < iw; col += 1 ) {
                const bug = this.grid[ row ][ col ];
                if ( bug instanceof Bug ) {
					bug.render(
						this.buffer,
						col, row,
						this.palette
					);
				}
            }
        }
        const temp = document.createElement( "canvas" );
        temp.width = iw;
        temp.height = ih;
        const ctx_temp = temp.getContext( "2d" );
        ctx_temp.putImageData( this.buffer, 0, 0 );
        const ctx = canvas.getContext( "2d" );
        ctx.resetTransform();
        ctx.drawImage( temp, 0, 0, iw, ih, 0, 0, cw, ch );
    }
}

// Color Class
class Color {
    constructor( r, g, b ) {
        const clamp = (n) => {
            n = Math.round( n );
            return Math.min( Math.max( n, 0 ), 255 );
        }
        this.r = clamp(r);
        this.g = clamp(g);
        this.b = clamp(b);
    }
    // Convert to HTML hexadecimal string
    to_html() {
        let value =this.to_integer().toString(16);
        while (value.length < 6) value = '0' + value;
        return '#' + value;
    }
    // Convert to integer
    to_integer() {
        const r = this.r << 16;
        const g = this.g << 8;
        const b = this.b;
        return r + g + b;
    }
    // Convert to CSS rgb() string
    to_css() {
        const r = this.r;
        const g = this.g;
        const b = this.b;
        return `rgb(${r}, ${g}, ${b})`;
    }
    // Convert from integer
    from_integer(n) {
        n = parseInt(n);
        if (isNaN(n)) throw new TypeError();
        this.r = (n>>16) & 255;
        this.g = (n>>8) & 255;
        this.b = n & 255;
        return this;
    }
    // Convert from HTML hex string
    from_html(s) {
        s = s.trim();
        return this.from_integer(s.replace(/^#/, "0x"));
    }
    // Convert from CSS rgb() string
    from_css(s) {
        function fail() {
            throw new TypeError("Not CSS rgb");
        }
        const arr = (
			s
			. replace( /^rgb/  , "" )
			. replace( /\(|\)/ , "" )
			. split(",")
			.map( s => s.trim() )
		);
        if (arr.length != 3) fail();
        const r = parseInt(arr[0]) & 255;
        const g = parseInt(arr[1]) & 255;
        const b = parseInt(arr[2]) & 255;
        if (isNaN(r) || isNaN(g) || isNaN(b)) fail();
        this.r = r;
        this.g = g;
        this.b = b;
        return this;
    }
    // Perform gamma correction
    gamma_correct(gamma) {
        if (gamma == 1) return this;
        const inverse_gamma = 1 / (gamma > 0) ? gamma : 1;
        const max = 255;
        const correct = (n) => {
            return max * Math.pow(n / max, inverse_gamma);
        }
        this.r = correct(this.r);
        this.g = correct(this.g);
        this.b = correct(this.b);
        return this;
    }
    // Randomize color
    randomize(gamma = 1) {
        function rnd() {
            return Math.round(Math.random() * 255);
        }
        this.r = rnd();
        this.g = rnd();
        this.b = rnd();
        return this.gamma_correct(gamma);
    }
    // Clone the color
    clone() {
        return new Color(this.r, this.g, this.b);
    }
    // Dump to console
    dump() {
        console.log(this);
    }
    // Convert to string
    toString() {
        return JSON.stringify(this);
    }
}

// Palette Class
class Palette {
    constructor() {
        this.clear();
    }
    // Clear the palette
    clear() {
        this.colors = [];
    }
    // Create a color ramp
    ramp(start_color, end_color, start_index=0, end_index=255, gamma=1) {
        const rs = start_color.r;
        const gs = start_color.g;
        const bs = start_color.b;
        const re = end_color.r;
        const ge = end_color.g;
        const be = end_color.b;
        start_index = Math.min(Math.max(start_index, 0), 255);
        end_index = Math.min(Math.max(end_index, 0), 255);
        if (start_index > end_index) {
            const temp = start_index;
            start_index = end_index;
            end_index = temp;
        }
        const steps = end_index - start_index;
        if (steps < 1) return this;
        if (steps < 2) {
            this.colors[0] = start_color.clone();
            return this;
        }
        const inverse_steps = 1 / steps;
        const r_step = (re - rs) * inverse_steps;
        const g_step = (ge - gs) * inverse_steps;
        const b_step = (be - bs) * inverse_steps;
        let r = rs, g = gs, b = bs;
        if (gamma <= 0) gamma = 1;
        if (gamma == 1) {
            while (start_index <= end_index) {
                this.colors[start_index] = new Color(r, g, b);
                start_index++;
                r += r_step;
                g += g_step;
                b += b_step;
            }
        } else {
            while (start_index <= end_index) {
                this.colors[start_index] = new Color(r, g, b);
                this.colors[start_index].gamma_correct(gamma);
                start_index++;
                r += r_step;
                g += g_step;
                b += b_step;
            }
        }
        return this;
    }
    // Create palette from array of integer colors
    from_integer_colors(array, gamma = 1) {
        const me = this;
        this.clear();
        function add(color) {
            const c = new Color();
            c.from_integer(color);
            me.colors.push(c);
        }
        array.forEach(add);
        return this
    }
    // Random colors
    random(count, gamma=1) {
        this.clear();
        this.colors[0] = new Color(0, 0, 0);
        for (let n=1; n<count; n++) {
            this.colors[n] = new Color().randomize();
        }
        return this;
    }
    // Dump to console
    dump() {
        console.group("Palette");
        for (let i=0; i<256; i++) {
            console.log(i + " => " + this.colors[i].toString());
        }
        console.groupEnd();
    }
    // Convert to string
    toString() {
        const count = this.colors.length;
        let result = [];
        for (let i=0; i<count; i++) {
            const s = this.colors[i].toString();
            result.push(s);
        }
        return "[\n" + result.join("\n") + "]\n";
    }
}

/*
  Here Begins the App Logic
*/


// World dimensions
const settings = {
    world: {
        width  : 256 ,
        height : 256 ,
        spawn  : 35
    },
    gamma: 1.2
}

// Lock rendering
let locked = false;

// Where the bugs live
let world = null;

// The color palette
let palette = null;

// Timer id
let timer_id = null;

// Automatic reset interval
const auto_reset_interval = 10000;

// Handle timer tick (for debugging)
function on_timer_tick(evt) {
    reset_world();
}

// Render the scene
function render_once() {
    if (locked) return;
    world.spawn(settings.world.spawn);
    world.update();
    world.render(idCanvas);
}

// Render loop
function render() {
    render_once();
    requestAnimationFrame(render);
}


// Click handler for canvas
function on_click_pause_play(evt) {
    locked = !locked;
    update_button();
}

// Full Screen Mode
function zoom( ge ) {
	ge . requestFullscreen();
	ge . focus();
}

// New world and palette
function reset_world() {
    if (timer_id) {
        clearInterval(timer_id);
    }
    timer_id = setInterval(on_timer_tick, auto_reset_interval);
    const old_locked = locked;
    locked = true;
    palette = new Palette().random(Bug.num_species() + 1, settings.gamma);
    if (world) world.reset(palette);
    else world = new BugWorld(palette, settings.world.width, settings.world.height);
    locked = old_locked;
}

// Update button content
function update_button() {
    const button = document.getElementById("idPausePlay");
    if (locked) {
        button.innerHTML = "&#9650;";
        button.style.transform = "rotate(90deg)";
        button.setAttribute("hint", "Play");
    } else {
        button.innerHTML = "||";
        button.style.transform = "";
        button.setAttribute("hint", "Pause");
    }
    update_hint(idPausePlay);
}

// Update hint
function update_hint(evt) {
    let target;
    if (evt instanceof HTMLElement) target = evt;
    else target = evt.target;
    const hint = target.getAttribute("hint");
    console.log(hint);
    idHint.innerText = hint;
}

// Initialization
function main() {
    update_button();
    idPausePlay.onclick = on_click_pause_play;
    idPausePlay.addEventListener( "mouseover", update_hint );
    idReset.onclick = reset_world;
    idReset.addEventListener( "mouseover" , update_hint );
	idZoom.onclick =()=> zoom( idCanvas );
	idZoom.addEventListener( "mouseover", update_hint );
    reset_world();
    render();
}

addEventListener( "load", main );



