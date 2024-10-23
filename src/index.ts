'use strict';

import Game from "./Game";

const game = new Game('canvas');

function tick() {
	game.draw();

	game.renderer.transform.angle.y = Math.sin(+(new Date()) / 5000) * 30 * Math.PI / 180 + 45 * Math.PI / 180;

	requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
