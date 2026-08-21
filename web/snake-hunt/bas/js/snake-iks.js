
/* snake-iks.js */

const IKSystem = {
	x: 0,
	y: 0,
	arms: null,
	lastArm: null,
	create: function(x, y) {
		var obj = Object.create(this);
		obj.init(x, y);
		return obj;
	},
	init: function(x, y) {
		this.x = x;
		this.y = y;
		this.arms = [];
	},
	addArm: function(length) {
		var arm = Arm.create(0, 0, length, 0);
		if (this.lastArm) {
			arm.x = this.lastArm.getEndX();
			arm.y = this.lastArm.getEndY();
			arm.parent = this.lastArm;
		}
		else {
			arm.x = this.x;
			arm.y = this.y;
		}
		this.arms.push(arm);
		this.lastArm = arm;
	},
	render: function(context) {
		for (var i = 0; i < this.arms.length; i++) {
			this.arms[i].render(context);
		}
	},
	drag: function(x, y) {
		this.lastArm.drag(x, y);
	},
	nudge: function() {
		const x = this.lastArm.x;
		const y = this.lastArm.y;
		const p0 = Waypoint.current;
		const p1 = new Point(x, y);
		const a0 = p1.angleTo(p0);
		let a1 = this.lastArm.angle;
		const diff = a1 - a0;
		if (Math.abs(diff) < Settings.nudge_rate) {
			a1 = a0;
		}
		else {
			a1 += Settings.nudge_rate;
		}
		// console.log(a0, a1);
		const nudgex = x + Math.cos(a1) * Settings.nudge_length;
		const nudgey = y + Math.sin(a1) * Settings.nudge_length;
		this.drag(nudgex, nudgey);
		const p2 = new Point(nudgex, nudgey);
		const dist = p2.lengthTo(p0);
		return (dist < Arm.length);
	}
};


