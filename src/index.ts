'use strict';

import { MAP_HEIGHT } from "./config";
import Game from "./Game";

import * as glMatrix from './glMatrix/gl-matrix';

const game = new Game('canvas');

function tick() {
	game.draw();

	game.renderer.modelMatrix = glMatrix.mat4.create();
	glMatrix.mat4.identity(game.renderer.modelMatrix);

	glMatrix.mat4.translate(game.renderer.modelMatrix, game.renderer.modelMatrix, [0, -MAP_HEIGHT, 0]);
	glMatrix.mat4.rotate(game.renderer.modelMatrix, game.renderer.modelMatrix, (+new Date()) / 10000, [0, 1, 0]);
	glMatrix.mat4.translate(game.renderer.modelMatrix, game.renderer.modelMatrix, [0, 0, 0]);

	requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
