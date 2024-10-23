export default class Vector3 {
	constructor(public x: number, public y: number, public z: number) { }

	static zero() {
		return new Vector3(0, 0, 0);
	}
}
