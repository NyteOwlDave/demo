
/* snake-main.js */

function main() {
	let canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d");
	const w = Settings.screen.width  = canvas.width  = window.innerWidth;
	const h = Settings.screen.height = canvas.height = window.innerHeight;
	let iks = IKSystem.create(w / 2, h / 2);
	for (let i = 0; i < 20; i++) {
		iks.addArm(30);
	}
	Waypoint.init();
	update();
	function update() {
		if (iks.nudge()) Waypoint.next();
		context.clearRect(0, 0, Settings.screen.width, Settings.screen.height);
		Waypoint.render(context);
		iks.render(context);
		requestAnimationFrame(update);
	}
}


