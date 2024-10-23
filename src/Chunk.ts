import { Block, BlockType } from "./Block";
import { CHUNK_SIZE, MAP_HEIGHT, NOISE_COUNT } from "./config";
import { bicubicRandXYZ, noise } from "./Randomizer";
import Transform from "./Transform";
import Vector3 from "./Vector3";

export default class Chunk {
	public transform: Transform;
	public data: Block[][][];

	constructor(x: number, z: number) {
		this.transform = new Transform(new Vector3(x * CHUNK_SIZE, 0, z * CHUNK_SIZE));
		this.data = this.initializeData();
		this.generateLandscape();
		this.generateCaves();
	}

	private initializeData(): Block[][][] {
		const data: Block[][][] = [];
		for (let x = 0; x < CHUNK_SIZE; x++) {
			data[x] = [];
			for (let z = 0; z < CHUNK_SIZE; z++) {
				data[x][z] = [];
				for (let y = 0; y < MAP_HEIGHT; y++) {
					data[x][z][y] = new Block(BlockType.EMPTY);
				}
			}
		}
		return data;
	}

	private generateLandscape() {
		for (let x = 0; x < CHUNK_SIZE; x++) {
			for (let z = 0; z < CHUNK_SIZE; z++) {
				const random = noise(
					this.transform.position.x + x,
					this.transform.position.z + z,
					0
				);

				const height = Math.floor(random * MAP_HEIGHT / 2 + MAP_HEIGHT / 2);

				for (let y = 0; y < height; y++) {
					this.data[x][z][y] = new Block(BlockType.SOLID);
				}
			}
		}
	}

	private generateCaves() {
		console.log(performance.now());
		for (let block_x = 0; block_x < CHUNK_SIZE; block_x++) {
			for (let block_z = 0; block_z < CHUNK_SIZE; block_z++) {
				for (let block_y = 0; block_y < MAP_HEIGHT; block_y++) {
					const random = noise(
						this.transform.position.x + block_x,
						this.transform.position.z + block_z,
						block_y,
						NOISE_COUNT / 4
					);

					let fact = 1;

					if (block_y < 32) {
						fact = Math.max(0, block_y / 32)
					}

					if (block_y > MAP_HEIGHT / 2) {
						fact = Math.max(0, 1 - (block_y - MAP_HEIGHT / 2) / (MAP_HEIGHT / 2))
					}

					if (this.data[block_x][block_z][block_y].type != BlockType.EMPTY && random ** 2 < 0.15 * fact) {
						this.data[block_x][block_z][block_y].type = BlockType.CAVE;
					}
				}
			}
		}

		console.log(performance.now());

		debugger;
	}
}
