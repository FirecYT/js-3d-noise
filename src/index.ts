'use strict';

import { MAP_HEIGHT, MAP_SIZE, NOISE_COUNT } from "./config";
import Game from "./Game";

const fps = document.getElementById("fps") as HTMLDivElement;

const map_height = document.getElementById('MAP_HEIGHT') as HTMLDivElement;
const map_size = document.getElementById('MAP_SIZE') as HTMLDivElement;
const noise_count = document.getElementById('NOISE_COUNT') as HTMLDivElement;

map_height.innerText = MAP_HEIGHT.toString();
map_size.innerText = MAP_SIZE.toString();
noise_count.innerText = NOISE_COUNT.toString();

let prev = performance.now();
let now = performance.now();

const game = new Game('canvas');

function tick() {
	now = performance.now();

	fps.innerText = (1000 / (now - prev)).toFixed(0);

	prev = now;

	game.draw();

	requestAnimationFrame(tick);
}

requestAnimationFrame(tick);
