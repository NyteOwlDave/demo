
/////////////////////////////////////////////////////////////////////////////
//
// explosion.js - Generate Explosion Sprites
//   NyteOwl, 2017-JUN-01
//
/////////////////////////////////////////////////////////////////////////////

// Project.register('explosion.js')

const Sprites = {
	EXPLODE_SIZE: 80,
	EXPLODE_FRAMES: 64,
	frame: [],
	createFrames: (()=>{
		const spr = Sprites
		const create = ((a,s,n)=>{
			if (n<1) return
			a.push(new Uint8Array(s*s))
			create(a,s,n-1)
		})
		create(
			spr.frame,
			spr.EXPLODE_SIZE,
			spr.EXPLODE_FRAMES
		)
		console.log(`Created ${spr.EXPLODE_FRAMES} frames`)
	}),
	getpixel: ((i,x,y)=>{
		const spr = Sprites, w = spr.EXPLODE_SIZE
		return spr.frame[i][y*w+x]
	}),
	putpixel: ((i,x,y,c)=>{
		const spr = Sprites, w = spr.EXPLODE_SIZE
		return spr.frame[i][y*w+x] = c
	}),
	createExplosions: (()=>{
		const spr = Sprites
		// Pixel read/write methods
		const get = spr.getpixel
		const put = spr.putpixel
		// Frame count
		const frames = spr.EXPLODE_FRAMES
		// Frame size (width and height)
		const size = spr.EXPLODE_SIZE
		// Center of frame
		const ctr = size>>1
		// Number of hot spots
		const HOTSPOTS = 64, hot = []
		// Create a new hot spot
		const newSpot = (c=>{
			return ({
				x:  (c + 12*Math.random() - 6),
				y:  (c + 12*Math.random() - 6),
				xc: (Math.random() - 0.5),
				yc: (Math.random() - 0.5)
			})
		})
		// Initialize Hotspot map
		var spot
		for (spot=0; spot<HOTSPOTS; spot++) {
			let f = newSpot(ctr)
			// console.log(JSON.stringify(f))
			hot.push(f)
		}
		// For each sprite (animation frame)
		var frame
		for (frame=0; frame<frames; frame++) {
			// Calculate axis and rise
			const axis = frames>>2
			const rise = 128/axis
			// Color delta @ the hotspot
			var dc = (frame<axis) ? 
				(frame * rise) :
				(frames - frame + 8)
			// For each hotspot
			for (spot=0; spot<HOTSPOTS; spot++) {
				// Get centerpoint for this hotspot
				var hot_x = Math.floor(hot[spot].x)
				var hot_y = Math.floor(hot[spot].y)
				// We'll scan horizontally from -6 to +6 pixels from hot_x
				var x
				for (x=-6; x<=6; x++) {
					// Offset horizontally from hotspot center
					var xx = hot_x + x
					// We'll scan vertically from -6 to +6 pixels from hot_y
					var y
					for (y=-6; y<=6; y++) {
						// Offset vertically from hotspot center
						var yy = hot_y + y
						// If pixel is within the sprite
						if ((xx>=0) &&
							(yy>=0) &&
							(xx<size) &&
							(yy<size)) {
							// Get the falloff shift factor
							var falloff_shift = Math.floor(
								(Math.abs(x)+Math.abs(y)) / 3
							)
							// Read pixel at (xx,yy) for this frame
							//  and adjust color according to
							//  color delta and falloff shift factor.
							var pel = get(frame,xx,yy) + (dc >> falloff_shift)
							// Write new color (clamped to max)
							put(frame,xx,yy,(pel>255)?255:pel)
						}
					}
				}
				// Move the hotspot (for the next frame)
				hot[spot].x += hot[spot].xc
				hot[spot].y += hot[spot].yc
			}
		}
	}),
	drawFrame: ((canvas,i,u,v,palette)=>{
		const o = Sprites
		const frames = o.EXPLODE_FRAMES
		const size = o.EXPLODE_SIZE
		if ((i<0)||(i>frames)) return
		const gfx = canvas.getContext('2d')
		if (!gfx) return
		const get = o.getpixel
		const put = ((p,q,c)=>{
			gfx.beginPath()
			gfx.fillStyle = c?(palette[c]):('black')
			gfx.fillRect(p,q,1,1)
		})
		var x, y
		for (y=0; y<size; y++) {
			for (x=0; x<size; x++) {
				put(u+x,v+y,get(i,x,y))
			}
		}
	})
}

console.log('Explosion loaded...')

