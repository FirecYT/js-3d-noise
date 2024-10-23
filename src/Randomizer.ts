import { NOISE_COUNT } from "./config";

const SEED = Math.floor(Math.random() * 2147483647) >>> 0;

console.log(SEED);

// ===== noise =====

// const _randXYZCache = new Map<string, number>();

// function _randXYZ(x: number, y: number, z: number): number {
// 	const key = `${x}_${z}_${y}`;

// 	if (!_randXYZCache.has(key)) {
// 		_randXYZCache.set(key, _randXYZ(x, z, y));
// 	}

// 	return _randXYZCache.get(key) as number;
// }

export function randXYZ(x: number, y: number, z: number): number {
	let n = (x * 3418731287 + y * 132897987 + z * 1376312589 + SEED) >>> 0;

	n = (n ^ (n >> 21)) >>> 0;
	n = (n ^ (n << 35)) >>> 0;
	n = (n ^ (n >> 4)) >>> 0;
	n = (n * 268582165773) >>> 0;
	n = (n ^ (n >> 15)) >>> 0;

	return n % 256 / 256;
}

// ===== noise =====

// const _noiseCache = new Map<string, number>();

// function _noise(x: number, z: number, y: number, noise_count: number = NOISE_COUNT): number {
// 	const key = `${x}_${z}_${y}_${noise_count}`;

// 	if (!_noiseCache.has(key)) {
// 		_noiseCache.set(key, _noise(x, z, y, noise_count));
// 	}

// 	return _noiseCache.get(key) as number;
// }

export function noise(x: number, z: number, y: number, noise_count: number = NOISE_COUNT): number {
	let result = 0;

	for (let i = 2; i < noise_count + 2; i++) {
		const tmp = bicubicRandXYZ(
			(x + 3418731287) / (2 ** i),
			(y - 1376312589) / (2 ** i),
			(z + 132897987) / (2 ** i)
		);

		result += tmp;
	}

	return result / noise_count;
}

// ===== cubicInterpolate =====

// const _cubicInterpolateCache = new Map<string, number>();

// function _cubicInterpolate(p0: number, p1: number, p2: number, p3: number, t: number): number {
// 	const key = `${p0}_${p1}_${p2}_${p3}_${t}`;

// 	if (!_cubicInterpolateCache.has(key)) {
// 		_cubicInterpolateCache.set(key, _cubicInterpolate(p0, p1, p2, p3, t));
// 	}

// 	return _cubicInterpolateCache.get(key) as number;
// }

function cubicInterpolate(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const a = -0.5 * p0 + 1.5 * p1 - 1.5 * p2 + 0.5 * p3;
    const b = p0 - 2.5 * p1 + 2 * p2 - 0.5 * p3;
    const c = -0.5 * p0 + 0.5 * p2;
    const d = p1;

	return a * t * t * t + b * t * t + c * t + d;
}

export function bicubicRandXYZ(x: number, y: number, z: number): number {
	const xb = Math.floor(x);

	const x0 = xb - 1;
	const x1 = xb + 0;
	const x2 = xb + 1;
	const x3 = xb + 2;

	const yb = Math.floor(y);

	const y0 = yb - 1;
	const y1 = yb + 0;
	const y2 = yb + 1;
	const y3 = yb + 2;

	const zb = Math.floor(z);

	const z0 = zb - 1;
	const z1 = zb + 0;
	const z2 = zb + 1;
	const z3 = zb + 2;

	// Получаем значения "шумов" для 16 соседних точек
	const noiseValues = [
		randXYZ(x0, y0, z0), randXYZ(x1, y0, z0), randXYZ(x2, y0, z0), randXYZ(x3, y0, z0), randXYZ(x0, y1, z0), randXYZ(x1, y1, z0), randXYZ(x2, y1, z0), randXYZ(x3, y1, z0), randXYZ(x0, y2, z0), randXYZ(x1, y2, z0), randXYZ(x2, y2, z0), randXYZ(x3, y2, z0), randXYZ(x0, y3, z0), randXYZ(x1, y3, z0), randXYZ(x2, y3, z0), randXYZ(x3, y3, z0),
		randXYZ(x0, y0, z1), randXYZ(x1, y0, z1), randXYZ(x2, y0, z1), randXYZ(x3, y0, z1), randXYZ(x0, y1, z1), randXYZ(x1, y1, z1), randXYZ(x2, y1, z1), randXYZ(x3, y1, z1), randXYZ(x0, y2, z1), randXYZ(x1, y2, z1), randXYZ(x2, y2, z1), randXYZ(x3, y2, z1), randXYZ(x0, y3, z1), randXYZ(x1, y3, z1), randXYZ(x2, y3, z1), randXYZ(x3, y3, z1),
		randXYZ(x0, y0, z2), randXYZ(x1, y0, z2), randXYZ(x2, y0, z2), randXYZ(x3, y0, z2), randXYZ(x0, y1, z2), randXYZ(x1, y1, z2), randXYZ(x2, y1, z2), randXYZ(x3, y1, z2), randXYZ(x0, y2, z2), randXYZ(x1, y2, z2), randXYZ(x2, y2, z2), randXYZ(x3, y2, z2), randXYZ(x0, y3, z2), randXYZ(x1, y3, z2), randXYZ(x2, y3, z2), randXYZ(x3, y3, z2),
		randXYZ(x0, y0, z3), randXYZ(x1, y0, z3), randXYZ(x2, y0, z3), randXYZ(x3, y0, z3), randXYZ(x0, y1, z3), randXYZ(x1, y1, z3), randXYZ(x2, y1, z3), randXYZ(x3, y1, z3), randXYZ(x0, y2, z3), randXYZ(x1, y2, z3), randXYZ(x2, y2, z3), randXYZ(x3, y2, z3), randXYZ(x0, y3, z3), randXYZ(x1, y3, z3), randXYZ(x2, y3, z3), randXYZ(x3, y3, z3),
	];

	// Интерполируем по 'y' по четырем строкам
	const slice0row0 = cubicInterpolate(noiseValues[16 * 0 + 0], noiseValues[16 * 0 + 1], noiseValues[16 * 0 + 2], noiseValues[16 * 0 + 3], x - xb);
	const slice0row1 = cubicInterpolate(noiseValues[16 * 0 + 4], noiseValues[16 * 0 + 5], noiseValues[16 * 0 + 6], noiseValues[16 * 0 + 7], x - xb);
	const slice0row2 = cubicInterpolate(noiseValues[16 * 0 + 8], noiseValues[16 * 0 + 9], noiseValues[16 * 0 + 10], noiseValues[16 * 0 + 11], x - xb);
	const slice0row3 = cubicInterpolate(noiseValues[16 * 0 + 12], noiseValues[16 * 0 + 13], noiseValues[16 * 0 + 14], noiseValues[16 * 0 + 15], x - xb);

	const slice1row0 = cubicInterpolate(noiseValues[16 * 1 + 0], noiseValues[16 * 1 + 1], noiseValues[16 * 1 + 2], noiseValues[16 * 1 + 3], x - xb);
	const slice1row1 = cubicInterpolate(noiseValues[16 * 1 + 4], noiseValues[16 * 1 + 5], noiseValues[16 * 1 + 6], noiseValues[16 * 1 + 7], x - xb);
	const slice1row2 = cubicInterpolate(noiseValues[16 * 1 + 8], noiseValues[16 * 1 + 9], noiseValues[16 * 1 + 10], noiseValues[16 * 1 + 11], x - xb);
	const slice1row3 = cubicInterpolate(noiseValues[16 * 1 + 12], noiseValues[16 * 1 + 13], noiseValues[16 * 1 + 14], noiseValues[16 * 1 + 15], x - xb);

	const slice2row0 = cubicInterpolate(noiseValues[16 * 2 + 0], noiseValues[16 * 2 + 1], noiseValues[16 * 2 + 2], noiseValues[16 * 2 + 3], x - xb);
	const slice2row1 = cubicInterpolate(noiseValues[16 * 2 + 4], noiseValues[16 * 2 + 5], noiseValues[16 * 2 + 6], noiseValues[16 * 2 + 7], x - xb);
	const slice2row2 = cubicInterpolate(noiseValues[16 * 2 + 8], noiseValues[16 * 2 + 9], noiseValues[16 * 2 + 10], noiseValues[16 * 2 + 11], x - xb);
	const slice2row3 = cubicInterpolate(noiseValues[16 * 2 + 12], noiseValues[16 * 2 + 13], noiseValues[16 * 2 + 14], noiseValues[16 * 2 + 15], x - xb);

	const slice3row0 = cubicInterpolate(noiseValues[16 * 3 + 0], noiseValues[16 * 3 + 1], noiseValues[16 * 3 + 2], noiseValues[16 * 3 + 3], x - xb);
	const slice3row1 = cubicInterpolate(noiseValues[16 * 3 + 4], noiseValues[16 * 3 + 5], noiseValues[16 * 3 + 6], noiseValues[16 * 3 + 7], x - xb);
	const slice3row2 = cubicInterpolate(noiseValues[16 * 3 + 8], noiseValues[16 * 3 + 9], noiseValues[16 * 3 + 10], noiseValues[16 * 3 + 11], x - xb);
	const slice3row3 = cubicInterpolate(noiseValues[16 * 3 + 12], noiseValues[16 * 3 + 13], noiseValues[16 * 3 + 14], noiseValues[16 * 3 + 15], x - xb);

	const slice0 = cubicInterpolate(slice0row0, slice0row1, slice0row2, slice0row3, y - yb);
	const slice1 = cubicInterpolate(slice1row0, slice1row1, slice1row2, slice1row3, y - yb);
	const slice2 = cubicInterpolate(slice2row0, slice2row1, slice2row2, slice2row3, y - yb);
	const slice3 = cubicInterpolate(slice3row0, slice3row1, slice3row2, slice3row3, y - yb);

	// Интерполируем по 'x' по четырем строкам
	return cubicInterpolate(slice0, slice1, slice2, slice3, z - zb);
}

console.log(bicubicRandXYZ);
