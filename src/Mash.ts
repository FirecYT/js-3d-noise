export default class Mash {
	public vertices: number[];
	public indices: number[];

	public hash: string;

	constructor(vertices: number[] = [], indices: number[] = []) {
		this.vertices = vertices;
		this.indices = indices;

		this.hash = this.generateHash();
	}

	private generateHash(): string {
		return JSON.stringify({
			vertex: this.vertices,
			indices: this.indices
		});
	}

	public updateHash() {
		this.hash = this.generateHash();
	}
}
