
/* line-intersection.js */

const intersection = function(line0, line1) {
	const ops = intersection
    const v1 = line0.p0;
    const v2 = line0.p1.minus(v1);
    const v3 = line1.p0;
    const v4 = line1.p1.minus(v3);
    const delta = v2.x*v4.y - v2.y*v4.x;
    if ( Math.abs( delta ) < ops.TINY ) {
      console.log("Parallel");
      return null; // Lines are parallel
    }
    const mu = ( ((v3.x-v1.x)*v4.y) - ((v3.y-v1.y)*v4.x) ) / delta;
    return new Point(
        v1.x + mu * v2.x,
        v1.y + mu * v2.y
    );
}

intersection.TINY = 1e-8;

class Point {
    constructor(x, y) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
    }
    minus(other) {
      return new Point(this.x - other.x, this.y - other.y);
    }
    draw(context) {
        const r = Point.radius;
        context.beginPath();
        context.fillStyle = context.strokeStyle = Settings.point_style;
        context.ellipse(this.x, this.y, r, r, 0, 0, 2*Math.PI);
        context.stroke();
        context.fill();
    }
}

Point.radius = 5;

class Line {
    constructor(p0, p1) {
        this.p0 = p0;
        this.p1 = p1;
    }
    draw(context) {
        context.strokeStyle = Settings.line_style;
        context.lineWidth = Settings.line_width;
        context.beginPath();
        context.moveTo(this.p0.x, this.p0.y);
        context.lineTo(this.p1.x, this.p1.y);
        context.stroke();
    }
}


