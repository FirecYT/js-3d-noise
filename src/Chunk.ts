import { Block, BlockType } from "./Block";
import { MAP_HEIGHT, NOISE_COUNT } from "./config";
import Mash from "./Mash";
import { noise } from "./Randomizer";
import Transform from "./Transform";
import Vector3 from "./Vector3";

export default class Chunk {
	public transform: Transform;
	public data: Block[];
	public mash: Mash;

	constructor(x: number, z: number) {
		this.transform = new Transform(new Vector3(x << 4, 0, (z << 4)));
		this.data = this.initializeData();
		this.generateLandscape();
		this.generateCaves();
		this.generateMashes();
		this.mash = this.mergeMashes();
	}

	private initializeData(): Block[] {
		const data: Block[] = [];
		for (let i = 0; i < (MAP_HEIGHT << 8); i++) {
			data[i] = new Block(
				BlockType.EMPTY,
				new Transform(
					new Vector3(
						i & 15,
						((i >> 8) << 0) % MAP_HEIGHT,
						((i >> 4) << 0) & 15,
					)
				)
			);
		}
		return data;
	}

	private generateLandscape() {
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				const random = noise(
					this.transform.position.x + x,
					this.transform.position.z + z,
					0
				);

				const height = Math.floor(random * MAP_HEIGHT / 2 + MAP_HEIGHT / 2);

				for (let y = 0; y < height; y++) {
					this.data[x + (z << 4) + (y << 8)].type = BlockType.SOLID;
				}
			}
		}
	}

	private generateCaves() {
		for (let block_x = 0; block_x < 16; block_x++) {
			for (let block_z = 0; block_z < 16; block_z++) {
				for (let block_y = 0; block_y < 16; block_y++) {
					const index = block_x + (block_z << 4) + (block_y << 8);

					const random = noise(
						this.transform.position.x + block_x,
						this.transform.position.z + block_z,
						block_y,
						NOISE_COUNT
					);

					let fact = 1;

					if (block_y < 8) {
						fact = Math.max(0, block_y / 8)
					}

					// if (block_y > MAP_HEIGHT / 2) {
					// 	fact = Math.max(0, 1 - (block_y - MAP_HEIGHT / 2) / (MAP_HEIGHT / 2))
					// }

					if (this.data[index].type != BlockType.EMPTY && random < 0.35 * fact) {
						this.data[index].type = BlockType.CAVE;
					}
				}
			}
		}
	}

	public generateMashes() {
		for (let block_x = 0; block_x < 16; block_x++) {
			for (let block_z = 0; block_z < 16; block_z++) {
				for (let block_y = 0; block_y < MAP_HEIGHT; block_y++) {
					const index = block_x + (block_z << 4) + (block_y << 8);

					if (this.testBlock(block_x, block_y, block_z + 1)) {
						this.data[index].mash.indices.push(...[
							// лицевая часть
							2, 1, 0,
							0, 3, 2,
						]);
					}

					if (this.testBlock(block_x, block_y, block_z - 1)) {
						this.data[index].mash.indices.push(...[
							// // задняя часть
							4, 5, 6,
							6, 7, 4,
						]);
					}

					if (this.testBlock(block_x + 1, block_y, block_z)) {
						this.data[index].mash.indices.push(...[
							// // правая боковая часть
							2, 3, 7,
							7, 6, 2,
						]);
					}

					if (this.testBlock(block_x - 1, block_y, block_z)) {
						this.data[index].mash.indices.push(...[
							// // левая боковая часть
							0, 1, 5,
							5, 4, 0,
						]);
					}

					if (this.testBlock(block_x, block_y + 1, block_z)) {
						this.data[index].mash.indices.push(...[
							// // верхняя часть
							6, 1, 2,
							6, 5, 1,
						]);
					}

					if (this.testBlock(block_x, block_y - 1, block_z)) {
						this.data[index].mash.indices.push(...[
							// //нижняя часть
							0, 4, 7,
							7, 3, 0,
						]);
					}

					this.data[index].mash.updateHash();
				}
			}
		}
	}

	private testBlock(x: number, y: number, z: number): boolean {
		const index = x + (z << 4) + (y << 8);

		if (x < 0 || y < 0 || z < 0) {
			return true;
		}

		if (x >= 16) {
			return true;
		}

		if (z >= 16) {
			return true;
		}

		if (y >= MAP_HEIGHT) {
			return true;
		}

		return this.data[index]?.type != BlockType.SOLID;
	}

	public mergeMashes(): Mash {
		const mash = new Mash();
		const vertexMap = new Map<string, number>(); // Карта для хранения уникальных вершин

		for (const block of this.data) {
			if (block.mash.indices.length && block.type === BlockType.SOLID) {
				for (let i = 0; i < block.mash.vertices.length; i += 3) {
					const vertex = [
						block.mash.vertices[i] + block.transform.position.x,
						block.mash.vertices[i + 1] + block.transform.position.y,
						block.mash.vertices[i + 2] + block.transform.position.z
					];

					const vertexKey = vertex.join(','); // Создание уникального ключа для вершины

					if (!vertexMap.has(vertexKey)) {
						// Если вершина ещё не добавлена, добавляем её и запоминаем индекс
						const newIndex = mash.vertices.length / 3;
						mash.vertices.push(...vertex);
						vertexMap.set(vertexKey, newIndex);
					}
				}

				// Обновляем индексы, используя уже добавленные вершины
				block.mash.indices.forEach((el) => {
					// Получаем первичный индекс из векторного массива
					const vertexIndex = vertexMap.get(
						(block.mash.vertices[el * 3] + block.transform.position.x) + ',' +
						(block.mash.vertices[el * 3 + 1] + block.transform.position.y) + ',' +
						(block.mash.vertices[el * 3 + 2] + block.transform.position.z)
					);
					if (vertexIndex !== undefined) {
						mash.indices.push(vertexIndex); // Просто добавляем индекс без учета смещения
					}
				});
			}
		}

		// Оптимизация: удаление лишних вершин и индексов
		return this.optimizeMesh(mash);
	}

	private optimizeMesh(mash: Mash): Mash {
		const optimizedMash = new Mash();
		const vertexMap = new Map<string, number>();

		// Сначала будем хранить новые вершины
		for (let i = 0; i < mash.vertices.length; i += 3) {
			const vertex = mash.vertices.slice(i, i + 3);
			const vertexKey = vertex.join(',');

			if (!vertexMap.has(vertexKey)) {
				const newIndex = optimizedMash.vertices.length / 3;
				optimizedMash.vertices.push(...vertex);
				vertexMap.set(vertexKey, newIndex);
			}
		}

		// Создаем новые индексы для упрощенного меша
		mash.indices.forEach((index) => {
			const vertexKey = mash.vertices.slice(index * 3, index * 3 + 3).join(',');
			const mappedIndex = vertexMap.get(vertexKey);
			if (mappedIndex !== undefined) {
				optimizedMash.indices.push(mappedIndex);
			}
		});

		optimizedMash.updateHash();

		return optimizedMash;
	}
}
