
/* snake-waypoint.js */

const Waypoint = {
	current : null ,
	index   : 0    ,
	points  : []   ,
	next: function() {
		const me = Waypoint;
		const count = me.points.length;
		const i = me.index = (me.index + 1) % count;
		me.current = me.points[i];
	},
	init: function() {
		const me = Waypoint;
		me.index = 0;
		me.points = [];
		const w = Settings.screen.width;
		const h = Settings.screen.height;
		[
			[ 0.10, 0.30 ],
			[ 0.90, 0.20 ],
			[ 0.80, 0.90 ],
			[ 0.20, 0.70 ],
			[ 0.80, 0.90 ],
			[ 0.90, 0.20 ]
		].forEach(add);
		function add(point) {
			const x = point[0] * w;
			const y = point[1] * h;
			me.points.push(new Point(x, y));
		}
		me.current = me.points[me.index];
	},
	render: function(context) {
		Waypoint.current.render(context);
	}
};


