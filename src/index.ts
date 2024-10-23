'use strict';

import Game from "./Game";

const game = new Game('canvas');

function tick() {
	game.draw();

	game.renderer.transform.angle.y += 0.01;

	requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
