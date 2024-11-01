import { Block, BlockType } from "./Block";
import { CHUNK_SIZE, MAP_HEIGHT, NOISE_COUNT } from "./config";
import { noise } from "./Randomizer";
import Transform from "./Transform";
import Vector3 from "./Vector3";

export default class Chunk {
	public transform: Transform;
	public data: Block[];

	constructor(x: number, z: number) {
		this.transform = new Transform(new Vector3(x * CHUNK_SIZE, 0, z * CHUNK_SIZE));
		this.data = this.initializeData();
		this.generateLandscape();
		// this.generateCaves();
	}

	private initializeData(): Block[] {
		const data: Block[] = [];
		for (let i = 0; i < CHUNK_SIZE * CHUNK_SIZE * MAP_HEIGHT; i++) {
			data[i] = new Block(
				BlockType.EMPTY,
				new Transform(
					new Vector3(
						i % CHUNK_SIZE,
						((i / CHUNK_SIZE / CHUNK_SIZE) << 0) % CHUNK_SIZE,
						((i / CHUNK_SIZE) << 0) % CHUNK_SIZE,
					)
				)
			);
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
					this.data[x + z * CHUNK_SIZE + y * CHUNK_SIZE * CHUNK_SIZE].type = BlockType.SOLID;
				}
			}
		}
	}

	private generateCaves() {
		for (let block_x = 0; block_x < CHUNK_SIZE; block_x++) {
			for (let block_z = 0; block_z < CHUNK_SIZE; block_z++) {
				for (let block_y = 0; block_y < MAP_HEIGHT; block_y++) {
					const index = block_x + block_z * CHUNK_SIZE + block_y * CHUNK_SIZE * CHUNK_SIZE;

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

					if (this.data[index].type != BlockType.EMPTY && random ** 2 < 0.15 * fact) {
						this.data[index].type = BlockType.CAVE;
					}
				}
			}
		}
	}
}
