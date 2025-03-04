export default class Mash {
	public vertices: number[];
	public indices: number[];

	constructor(vertices: number[] = [], indices: number[] = []) {
		this.vertices = vertices;
		this.indices = indices;
	}

	toString() {
		return JSON.stringify(this);
	}
}
