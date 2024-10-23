import { CHUNK_SIZE, MAP_HEIGHT, MAP_SIZE, SCALE } from "./config";
import Transform from "./Transform";
import Vector3 from "./Vector3";

export default class Renderer {
	public transform: Transform;
	private ctx: CanvasRenderingContext2D;

	constructor(canvas: HTMLCanvasElement) {
		this.transform = new Transform(
			new Vector3(MAP_SIZE / 2 * CHUNK_SIZE, MAP_HEIGHT, MAP_SIZE / 2 * CHUNK_SIZE),
			new Vector3(40 * Math.PI / 180, 45 * Math.PI / 180, 0)
		);
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		this.ctx.translate(canvas.width / 2, canvas.height / 2);
		this.ctx.scale(SCALE, SCALE);
		this.ctx.lineWidth = 1 / SCALE;
		this.ctx.strokeStyle = `rgba(0, 0, 0, 1)`;
	}

	changeColor(color: string | CanvasGradient | CanvasPattern) {
		this.ctx.fillStyle = color;
	}

	drawCube(transform: Transform) {
		// const coords = this.isometricCoord(transform.position.x, -transform.position.y, transform.position.z);
		this._drawCube(
			transform.position.x - this.transform.position.x,
			transform.position.y - this.transform.position.y,
			transform.position.z - this.transform.position.z
		);
		// this.ctx.fillRect(transform.position.x, transform.position.z, 1, 1);
	}

	clearScreen(width: number, height: number) {
		this.changeColor('#444');
        this.ctx.fillRect(-width / 2, -height / 2, width, height);
	}

	isometricCoord(x: number, y: number, z: number) {
		const alpha_angle = this.transform.angle.x;
		const beta_angle  = this.transform.angle.y;

		const isometric_matrix = [
			[ Math.cos(beta_angle),                          0,                     -Math.sin(beta_angle)                         ],
			[ Math.sin(alpha_angle) * Math.sin(beta_angle),  Math.cos(alpha_angle),  Math.sin(alpha_angle) * Math.cos(beta_angle) ],
			[ Math.cos(alpha_angle) * Math.sin(beta_angle), -Math.sin(alpha_angle),  Math.cos(alpha_angle) * Math.cos(beta_angle) ]
		];

		return {
			x: isometric_matrix[0][0] * x + isometric_matrix[0][1] * y + isometric_matrix[0][2] * z,
			y: isometric_matrix[1][0] * x + isometric_matrix[1][1] * y + isometric_matrix[1][2] * z,
		}
	}

	private _drawCube(x: number, y: number, z: number) {
		this.ctx.beginPath();

		let coord = this.isometricCoord(x + 0, -y + 0, z + 0);
		this.ctx.moveTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 1, -y + 0, z + 0);
		this.ctx.lineTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 1, -y + 1, z + 0);
		this.ctx.lineTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 1, -y + 1, z + 1);
		this.ctx.lineTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 0, -y + 1, z + 1);
		this.ctx.lineTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 0, -y + 0, z + 1);
		this.ctx.lineTo(coord.x, coord.y);

		this.ctx.fill();
		this.ctx.closePath();

		coord = this.isometricCoord(x + 0, -y + 0, z + 0);
		this.ctx.moveTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 1, -y + 0, z + 0);
		this.ctx.lineTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 1, -y + 0, z + 1);
		this.ctx.lineTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 0, -y + 0, z + 1);
		this.ctx.lineTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 1, -y + 0, z + 1);
		this.ctx.moveTo(coord.x, coord.y);

		coord = this.isometricCoord(x + 1, -y + 1, z + 1);
		this.ctx.lineTo(coord.x, coord.y);

		this.ctx.closePath();
		this.ctx.stroke();
	}
}

