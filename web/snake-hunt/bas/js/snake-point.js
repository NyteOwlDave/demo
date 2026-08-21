
/* snake-point.js */

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	length() {
		return Math.hypot(this.x, this.y);
	}
	angle() {
		return Math.atan2(this.y, this.x);
	}
	lengthTo(pt) {
		const xdelta = this.x - pt.x;
		const ydelta = this.y - pt.y;
		return Math.hypot(xdelta, ydelta);
	}
	angleTo(pt) {
		const xdelta = this.x - pt.x;
		const ydelta = this.y - pt.y;
		return Math.atan2(ydelta, xdelta);
	}
	render(context) {
		context.strokeStyle = context.fillStyle = Settings.point.style;
		context.beginPath();
		context.arc(this.x, this.y, Settings.point.radius, 0, 2*Math.PI);
		context.stroke();
		context.fill();
	}
}


