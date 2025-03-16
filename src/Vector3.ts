export default class Vector3 {
	constructor(public x: number, public y: number, public z: number) { }

	static zero() {
		return new Vector3(0, 0, 0);
	}

	add(first: Vector3 | number, y?: number, z?: number) {
		if (first instanceof Vector3) {
			this.x += first.x;
			this.y += first.y;
			this.z += first.z;
			return this;
		}

		if (y === undefined || z === undefined) {
			this.x += first;
			this.y += first;
			this.z += first;
			return this;
		}

		this.x += first;
		this.y += y;
		this.z += z;

		return this;
	}

	multipy(x: number) {
		this.x *= x;
		this.y *= x;
		this.z *= x;

		return this;
	}

	length() {
		return this.x * this.x + this.y * this.y + this.z * this.z;
	}

	normalize() {
		const length = this.length();

		this.x /= length;
		this.y /= length;
		this.z /= length;

		return this;
	}

	copy() {
		return new Vector3(this.x, this.y, this.z);
	}
}
