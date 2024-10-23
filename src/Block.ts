export enum BlockType {
	EMPTY,
	SOLID,
	CAVE
}

export class Block {
	public type: BlockType;

	constructor(type: BlockType) {
		this.type = type;
	}
}
