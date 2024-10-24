import { BlockType } from "./Block";
import Chunk from "./Chunk";
import { CHUNK_SIZE, MAP_HEIGHT, MAP_SIZE } from "./config";
import Renderer from "./Renderer";
import Transform from "./Transform";
import Vector3 from "./Vector3";

export default class Game {
	private canvas: HTMLCanvasElement;
	public renderer: Renderer;
	private chunks: Chunk[];

	constructor(canvasId: string) {
		this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.renderer = new Renderer(this.canvas);
		this.chunks = this.generateChunks();
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
		this.renderer.clearScreen();

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
							} else if (chunk.data[block_x][block_z][block_y + 1].type != BlockType.SOLID) {
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
