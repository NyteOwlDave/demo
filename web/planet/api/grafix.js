
/*

  grafix.js
  
  Basic graphics functions

  Dave Wellsted, NyteOwl Computer Software
  Last Updated: 2020-MAY-17
  
  REQUIRES:

    nada

  2020-APR-04
  Cosmetic improvements
  Added clear() method

  2020-MAY-17
  Cosmetics

*/

const Grafix = {
    // Fill canvas with transparent color
    clear: function (canvas) {
        const me = Grafix;
        me.fill(canvas, "rgba(0,0,0,0)");
    },
    // Fill canvas with a color
    fill: function(canvas, color="white") {
        const w = canvas.width;
        const h = canvas.height;
        const gfx = canvas.getContext('2d');
        gfx.fillStyle = color;
        gfx.fillRect(0, 0, w, h);
    },
    // Create polar grid lines
    polar: function(canvas,color="white",stepSize=10) {
        const w = canvas.width;
        const h = canvas.height;
        const xc = w/2;
        const yc = h/2;
        const gfx = canvas.getContext('2d');
        gfx.lineCap = "square";
        gfx.lineDashOffset = 0;
        gfx.lineJoin = "miter";
        gfx.miterLimit = 10;
        gfx.strokeStyle = color;
        gfx.lineWidth = 1;
        const rho = 0.5 * Math.sqrt(w*w + h*h);
        function line(n) {
            if (n < 0) return;
            const theta = n*Math.PI/12;
            const dx = rho*Math.cos(theta);
            const dy = rho*Math.sin(theta);
            gfx.beginPath();
            gfx.moveTo(xc+dx,yc+dy);
            gfx.lineTo(xc-dx,yc-dy);
            gfx.stroke();
            line(n-1);
        }
        line(11);
        function circle(n) {
            if (n < 1) return;
            const r = n*stepSize;
            gfx.beginPath();
            gfx.ellipse(xc,yc,r,r,0,0,2*Math.PI);
            gfx.stroke();
            circle(n-1);
        }
        circle(Math.floor(rho/stepSize));
    },
    // Create cartesian grid lines
    grid: function(canvas,axis="white",grid="white",stepSize=10) {
        const gfx = canvas.getContext('2d');
        gfx.lineCap = "square";
        gfx.lineDashOffset = 0;
        gfx.lineJoin = "miter";
        gfx.miterLimit = 10;
        function line(x1,y1,x2,y2,style,width=1) {
            gfx.beginPath();
            gfx.strokeStyle = style;
            gfx.lineWidth = width;
            gfx.moveTo(x1, y1);
            gfx.lineTo(x2, y2);
            gfx.stroke();
        }
        const w = canvas.width;
        const h = canvas.height;
        const xc = w/2;
        const yc = h/2;
        const tmax = Math.ceil(Math.max(w, h) * 0.5);
        const dt = Math.abs(stepSize || 10);
        for (let t = dt; t <= tmax; t += dt) {
            line(xc+t,    0, xc+t,    h, grid);
            line(   0, yc+t,    w, yc+t, grid);
            line(xc-t,    0, xc-t,    h, grid);
            line(   0, yc-t,    w, yc-t, grid);
        }
        line(xc, 0, xc, h, axis, 3);
        line(0, yc, w, yc, axis, 3);
    },
    // Draw CanvasImageSource or ImageData to canvas
    // w,h are only required for these stretchable types:
    // CSSImageValue
    // HTMLImageElement
    // SVGImageElement
    // HTMLVideoElement
    // HTMLCanvasElement
    // OffscreenCanvas
    // NOT: ImageData (which must match canvas size)
    draw: function (canvas, img, bgnd="transparent") {
        Grafix.fill(canvas, bgnd);
        const gfx = canvas.getContext('2d');
        if (img instanceof ImageData) {
            gfx.putImageData(img,0,0);
        } else {
            const cw = canvas.width;
            const ch = canvas.height;
            const iw = img.width;
            const ih = img.height;
            gfx.drawImage(img,0,0,iw,ih,0,0,cw,ch);
        }
    },
    // Capture canvas as ImageData
    capture: function(canvas, x, y, w, h) {
        const gfx = canvas.getContext('2d');
        x = x || 0;
        y = y || 0;
        w = w || canvas.width;
        h = h || canvas.height;
        return gfx.getImageData(x, y, w, h);
    }
}

// For backward compatibility
Grafix.spider = Grafix.polar