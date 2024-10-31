import { BlockType } from "./Block";
import Chunk from "./Chunk";
import { CHUNK_SIZE, MAP_HEIGHT, MAP_SIZE } from "./config";
import Renderer from "./Renderer";
import Transform from "./Transform";
import Vector3 from "./Vector3";

import * as glMatrix from './glMatrix/gl-matrix';
import Keyboard from "./Keyboard";

export default class Game {
	private canvas: HTMLCanvasElement;
	public renderer: Renderer;
	private chunks: Chunk[];
	private camera: Transform;
	private keyboard: Keyboard;

	constructor(canvasId: string) {
		this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.renderer = new Renderer(this.canvas);
		this.chunks = this.generateChunks();
		this.keyboard = new Keyboard();

		this.camera = new Transform(new Vector3(-MAP_SIZE * CHUNK_SIZE / 2, -MAP_HEIGHT, -MAP_SIZE * CHUNK_SIZE / 2 - 32));

		this.canvas.addEventListener("click", () => {
			this.canvas.requestPointerLock();
		});

		this.canvas.addEventListener("mousemove", event => {
			this.camera.angle.y += event.movementX / 500;
			this.camera.angle.x += event.movementY / 500;
		});
	}

	private generateChunks(): Chunk[] {
		const chunks: Chunk[] = [];
		for (let x = 0; x < MAP_SIZE; x++) {
			for (let z = 0; z < MAP_SIZE; z++) {
				chunks.push(new Chunk(x, z));
			}
		}
		return chunks;
	}

	public draw() {
		if (this.keyboard.isKeyPressed("KeyW")) {
			this.camera.position.x += Math.sin(-this.camera.angle.y) / 5;
			this.camera.position.z += Math.cos(-this.camera.angle.y) / 5;
		}
		if (this.keyboard.isKeyPressed("KeyS")) {
			this.camera.position.x -= Math.sin(-this.camera.angle.y) / 5;
			this.camera.position.z -= Math.cos(-this.camera.angle.y) / 5;
		}

		if (this.keyboard.isKeyPressed("KeyA")) {
			this.camera.position.x += Math.sin(-this.camera.angle.y + Math.PI / 2) / 5;
			this.camera.position.z += Math.cos(-this.camera.angle.y + Math.PI / 2) / 5;
		}
		if (this.keyboard.isKeyPressed("KeyD")) {
			this.camera.position.x -= Math.sin(-this.camera.angle.y + Math.PI / 2) / 5;
			this.camera.position.z -= Math.cos(-this.camera.angle.y + Math.PI / 2) / 5;
		}

		if (this.keyboard.isKeyPressed("ShiftLeft")) {
			this.camera.position.y += 0.2;
		}
		if (this.keyboard.isKeyPressed("Space")) {
			this.camera.position.y -= 0.2;
		}

		this.renderer.clearScreen();

		this.renderer.modelMatrix = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.renderer.modelMatrix);

		glMatrix.mat4.rotate(this.renderer.modelMatrix, this.renderer.modelMatrix, this.camera.angle.x, [1, 0, 0]);
		glMatrix.mat4.rotate(this.renderer.modelMatrix, this.renderer.modelMatrix, this.camera.angle.y, [0, 1, 0]);
		glMatrix.mat4.translate(this.renderer.modelMatrix, this.renderer.modelMatrix, [
			this.camera.position.x,
			this.camera.position.y,
			this.camera.position.z
		]);

		for (const chunk of this.chunks) {
			for (let block_x = 0; block_x < CHUNK_SIZE; block_x++) {
				for (let block_z = 0; block_z < CHUNK_SIZE; block_z++) {
					for (let block_y = 0; block_y < MAP_HEIGHT; block_y++) {

						const block = chunk.data[block_x][block_z][block_y];

						let opened = false;

						if (block_x == 0 || block_y == 0 || block_z == 0) {
							opened = true;
						}

						if (block_x == CHUNK_SIZE - 1 || block_y == MAP_HEIGHT - 1 || block_z == CHUNK_SIZE - 1) {
							opened = true;
						}

						if (!opened) {
							if (chunk.data[block_x + 1][block_z][block_y].type != BlockType.SOLID) {
								opened = true;
							} else if (chunk.data[block_x - 1][block_z][block_y].type != BlockType.SOLID) {
								opened = true;
							} else if (chunk.data[block_x][block_z + 1][block_y].type != BlockType.SOLID) {
								opened = true;
							} else if (chunk.data[block_x][block_z - 1][block_y].type != BlockType.SOLID) {
								opened = true;
							} else if (chunk.data[block_x][block_z][block_y + 1].type != BlockType.SOLID) {
								opened = true;
							} else if (chunk.data[block_x][block_z][block_y - 1].type != BlockType.SOLID) {
								opened = true;
							}
						}

						if (opened && block.type === BlockType.SOLID) {
							const transform = new Transform(
								new Vector3(
									chunk.transform.position.x + block_x,
									block_y,
									chunk.transform.position.z + block_z
								)
							);

							// switch (block.type) {
							// 	case BlockType.SOLID:
							// 		this.renderer.changeColor(`rgb(
							// 			${Math.floor(255 * (block_y / MAP_HEIGHT))},
							// 			${Math.floor(255 * (block_y / MAP_HEIGHT))},
							// 			${Math.floor(255 * (block_y / MAP_HEIGHT))}
							// 		)`);
							// 		break;
							// 	case BlockType.CAVE:
							// 		this.renderer.changeColor(`rgba(0, 0, 0, 0.5)`);
							// 		break;
							// }

							this.renderer.drawCube(transform);
						}
					}
				}
			}
		}
	}
}
