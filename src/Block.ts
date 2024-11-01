import Transform from "./Transform";

export enum BlockType {
	EMPTY,
	SOLID,
	CAVE
}

export class Block {
	public type: BlockType;
	public transform: Transform;

	constructor(type: BlockType, transform: Transform) {
		this.type = type;
		this.transform = transform;
	}
}
