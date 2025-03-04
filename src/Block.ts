import Transform from "./Transform";
import Mash from "./Mash";

export enum BlockType {
	EMPTY,
	SOLID,
	CAVE
}

export class Block {
	public type: BlockType;
	public transform: Transform;
	public mash: Mash;

	constructor(type: BlockType, transform: Transform) {
		this.type = type;
		this.transform = transform;
		this.mash = new Mash([
			// лицевая часть
			-0.5, -0.5, 0.5,
			-0.5, 0.5, 0.5,
			0.5, 0.5, 0.5,
			0.5, -0.5, 0.5,
			// задняя часть
			-0.5, -0.5, -0.5,
			-0.5, 0.5, -0.5,
			0.5, 0.5, -0.5,
			0.5, -0.5, -0.5
		]);
	}
}
