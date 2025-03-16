import Chunk from "./Chunk";
import { MAP_HEIGHT, MAP_SIZE } from "./config";
import Renderer from "./Renderer";
import Transform from "./Transform";
import Vector3 from "./Vector3";

import * as glMatrix from './glMatrix/gl-matrix';
import Keyboard from "./Keyboard";
import { BlockType } from "./Block";

const PLAYER_SPEED = 10;

const coord = document.querySelector('#coord');
const nCoord = document.querySelector('#nCoord');

class Player {
	public camera: Transform;
    public position: Vector3;
    public acceleration: Vector3;
	public onGround: boolean;

	constructor(initialPosition: Vector3) {
		this.position = initialPosition;
        this.acceleration = new Vector3(0, 0, 0);
		this.onGround = false;

		this.camera = new Transform(
			new Vector3(0, -1.5, 0),
			new Vector3(Math.PI / 8, Math.PI / 4 + Math.PI / 2, 0)
		);
	}

	public getCameraPosition() {
		return this.position.copy().multipy(-1).add(this.camera.position);
	}

	public update() {
		this.position.add(this.acceleration);

		if (this.acceleration.x >= 0.01) {
			this.acceleration.x *= 0.2;
		} else {
			this.acceleration.x = 0;
		}

		if (this.acceleration.z >= 0.01) {
			this.acceleration.z *= 0.2;
		} else {
			this.acceleration.z = 0;
		}
	}
}

export default class Game {
	private canvas: HTMLCanvasElement;
	public renderer: Renderer;
	private chunks: Map<string, Chunk>;
	private player: Player;
	private keyboard: Keyboard;

	constructor(canvasId: string) {
		this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.renderer = new Renderer(this.canvas);
		this.chunks = this.generateChunks();
		this.keyboard = new Keyboard();

		this.player = new Player(
			new Vector3((MAP_SIZE << 4) * 0, MAP_HEIGHT + 5, (MAP_SIZE << 4) * 0)
		);

		this.canvas.addEventListener("click", () => {
			this.canvas.requestPointerLock();
		});

		this.canvas.addEventListener("mousemove", event => {
			this.player.camera.angle.y += event.movementX / 500;
			this.player.camera.angle.x += event.movementY / 500;
		});
	}

	private generateChunks(): Map<string, Chunk> {
		const chunks: Map<string, Chunk> = new Map<string, Chunk>();
		for (let x = 0; x < MAP_SIZE; x++) {
			for (let z = 0; z < MAP_SIZE; z++) {
				chunks.set(`${x}_${z}`, new Chunk(x, z));
				console.log(`${x * MAP_SIZE + z} / ${MAP_SIZE * MAP_SIZE}`);
			}
		}
		return chunks;
	}

	public getChunk(x: number, y: number) {
		return this.chunks.get(`${x >> 4}_${y >> 4}`);
	}

	public getBlock(x: number, y: number, z: number) {
		const chunk = this.getChunk(x, z);

		if (!chunk) {
			return undefined;
		}

		const blockX = x & 15;
		const blockY = y << 0;
		const blockZ = z & 15;

		return chunk?.data[blockX + (blockZ << 4) + (blockY << 8)];
	}

	public isSolid(x: number, y: number, z: number) {
		const block = this.getBlock(x, y, z);

		if (!block) {
			return false;
		}

		return block.type === BlockType.SOLID;
	}

	public canMove(dX: number, dY: number, dZ: number) {
		const halfSize = 0.3;

		const blocksChecks = false ||
			this.isSolid(dX - halfSize, dY, dZ - halfSize) ||
			this.isSolid(dX - halfSize, dY, dZ + halfSize) ||
			this.isSolid(dX - halfSize, dY + 1.8, dZ - halfSize) ||
			this.isSolid(dX - halfSize, dY + 1.8, dZ + halfSize) ||
			this.isSolid(dX + halfSize, dY, dZ - halfSize) ||
			this.isSolid(dX + halfSize, dY, dZ + halfSize) ||
			this.isSolid(dX + halfSize, dY + 1.8, dZ - halfSize) ||
			this.isSolid(dX + halfSize, dY + 1.8, dZ + halfSize);

		return !blocksChecks;
	}

	public draw() {
		this.player.acceleration.y -= 0.01;

		if (this.keyboard.isKeyPressed("KeyW")) {
			this.player.acceleration.x -= Math.sin(-this.player.camera.angle.y) / PLAYER_SPEED;
			this.player.acceleration.z -= Math.cos(-this.player.camera.angle.y) / PLAYER_SPEED;
		}

		if (this.keyboard.isKeyPressed("KeyS")) {
			this.player.acceleration.x += Math.sin(-this.player.camera.angle.y) / PLAYER_SPEED;
			this.player.acceleration.z += Math.cos(-this.player.camera.angle.y) / PLAYER_SPEED;
		}

		if (this.keyboard.isKeyPressed("KeyA")) {
			this.player.acceleration.x -= Math.sin(-this.player.camera.angle.y + Math.PI / 2) / PLAYER_SPEED;
			this.player.acceleration.z -= Math.cos(-this.player.camera.angle.y + Math.PI / 2) / PLAYER_SPEED;
		}
		if (this.keyboard.isKeyPressed("KeyD")) {
			this.player.acceleration.x += Math.sin(-this.player.camera.angle.y + Math.PI / 2) / PLAYER_SPEED;
			this.player.acceleration.z += Math.cos(-this.player.camera.angle.y + Math.PI / 2) / PLAYER_SPEED;
		}

		if (this.keyboard.isKeyPressed("ShiftLeft")) {
			const block = this.getBlock(this.player.position.x, this.player.position.y - 1, this.player.position.z);
			const chunk = this.getChunk(this.player.position.x, this.player.position.z);

			if (block && chunk && block.type == BlockType.SOLID) {
				block.type = BlockType.EMPTY;
				chunk.generateMashes();
				chunk.mash = chunk.mergeMashes();
			}
		}

		if (this.keyboard.isKeyPressed("Space") && this.player.onGround) {
			this.player.acceleration.y += 0.17;
		}

		if (!this.canMove(this.player.position.x + this.player.acceleration.x, this.player.position.y, this.player.position.z)) {
			this.player.acceleration.x = 0;
		}

		if (!this.canMove(this.player.position.x + this.player.acceleration.x, this.player.position.y + this.player.acceleration.y, this.player.position.z)) {
			if (this.player.acceleration.y < 0) this.player.onGround = true;
			this.player.acceleration.y = 0;
		} else {
			this.player.onGround = false;
		}

		if (!this.canMove(this.player.position.x + this.player.acceleration.x, this.player.position.y + this.player.acceleration.y, this.player.position.z + this.player.acceleration.z)) {
			this.player.acceleration.z = 0;
		}

		this.player.update();

		for (let _x = -1; _x <= 1; _x++) {
			for (let _z = -1; _z <= 1; _z++) {
				if (!this.getChunk(this.player.position.x + (_x << 4), this.player.position.z + (_z << 4))) {
					let key = "";

					this.chunks.forEach((forChunk, forKey) => {
						const chunk = this.chunks.get(key);

						if (chunk) {
							const distCurrent = (new Vector3(
								chunk.transform.position.x - this.player.position.x + (_x << 4),
								0,
								chunk.transform.position.z - this.player.position.z + (_z << 4)
							)).length();


							const distFor = (new Vector3(
								forChunk.transform.position.x - this.player.position.x + (_x << 4),
								0,
								forChunk.transform.position.z - this.player.position.z + (_z << 4)
							)).length();

							if (distFor > distCurrent) {
								key = forKey;
							}
						}

						if (key === "") {
							key = forKey;
						}
					});

					const chunk = this.chunks.get(key) as Chunk;

					this.renderer.unloadMash(chunk.mash);
					this.chunks.delete(key);

					const newChunkX = (this.player.position.x >> 4) + _x;
					const newChunkZ = (this.player.position.z >> 4) + _z;

					this.chunks.set(`${newChunkX}_${newChunkZ}`, new Chunk(newChunkX, newChunkZ));
				}
			}
		}

		if (nCoord) {
			const accX = (this.player.acceleration.x).toFixed(2);
			const accY = (this.player.acceleration.y).toFixed(2);
			const accZ = (this.player.acceleration.z).toFixed(2);

			nCoord.innerHTML = `${accX} ${accY} ${accZ}`;
		}

		if (coord) {
			const posX = (this.player.position.x).toFixed(2);
			const posY = (this.player.position.y).toFixed(2);
			const posZ = (this.player.position.z).toFixed(2);

			coord.innerHTML = `${posX} ${posY} ${posZ}`;
		}

		this.renderer.clearScreen();

		this.renderer.modelMatrix = glMatrix.mat4.create();
		glMatrix.mat4.identity(this.renderer.modelMatrix);

		glMatrix.mat4.rotate(this.renderer.modelMatrix, this.renderer.modelMatrix, this.player.camera.angle.x, [1, 0, 0]);
		glMatrix.mat4.rotate(this.renderer.modelMatrix, this.renderer.modelMatrix, this.player.camera.angle.y, [0, 1, 0]);
		glMatrix.mat4.translate(this.renderer.modelMatrix, this.renderer.modelMatrix, [
			this.player.getCameraPosition().x,
			this.player.getCameraPosition().y,
			this.player.getCameraPosition().z
		]);

		this.chunks.forEach((chunk) => {
			this.renderer.drawCube(chunk.transform, chunk.mash);
		});
	}
}
