import Vector3 from "./Vector3";

export default class Transform {
	public position: Vector3;
	public angle: Vector3;
	public scale: Vector3;

	constructor(position: Vector3 = Vector3.zero(), angle: Vector3 = Vector3.zero(), scale: Vector3 = new Vector3(1, 1, 1)) {
		this.position = position;
		this.angle = angle;
		this.scale = scale;
	}

	setPosition(x: number, y: number, z: number) {
		this.position = new Vector3(x, y, z);
	}
}
