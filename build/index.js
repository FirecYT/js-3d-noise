/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Block.ts":
/*!**********************!*\
  !*** ./src/Block.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Block: () => (/* binding */ Block),
/* harmony export */   BlockType: () => (/* binding */ BlockType)
/* harmony export */ });
var BlockType;
(function (BlockType) {
    BlockType[BlockType["EMPTY"] = 0] = "EMPTY";
    BlockType[BlockType["SOLID"] = 1] = "SOLID";
    BlockType[BlockType["CAVE"] = 2] = "CAVE";
})(BlockType || (BlockType = {}));
class Block {
    type;
    constructor(type) {
        this.type = type;
    }
}


/***/ }),

/***/ "./src/Chunk.ts":
/*!**********************!*\
  !*** ./src/Chunk.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Chunk)
/* harmony export */ });
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Block */ "./src/Block.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _Randomizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Randomizer */ "./src/Randomizer.ts");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Transform */ "./src/Transform.ts");
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Vector3 */ "./src/Vector3.ts");





class Chunk {
    transform;
    data;
    constructor(x, z) {
        this.transform = new _Transform__WEBPACK_IMPORTED_MODULE_3__["default"](new _Vector3__WEBPACK_IMPORTED_MODULE_4__["default"](x * _config__WEBPACK_IMPORTED_MODULE_1__.CHUNK_SIZE, 0, z * _config__WEBPACK_IMPORTED_MODULE_1__.CHUNK_SIZE));
        this.data = this.initializeData();
        this.generateLandscape();
        this.generateCaves();
    }
    initializeData() {
        const data = [];
        for (let x = 0; x < _config__WEBPACK_IMPORTED_MODULE_1__.CHUNK_SIZE; x++) {
            data[x] = [];
            for (let z = 0; z < _config__WEBPACK_IMPORTED_MODULE_1__.CHUNK_SIZE; z++) {
                data[x][z] = [];
                for (let y = 0; y < _config__WEBPACK_IMPORTED_MODULE_1__.MAP_HEIGHT; y++) {
                    data[x][z][y] = new _Block__WEBPACK_IMPORTED_MODULE_0__.Block(_Block__WEBPACK_IMPORTED_MODULE_0__.BlockType.EMPTY);
                }
            }
        }
        return data;
    }
    generateLandscape() {
        for (let x = 0; x < _config__WEBPACK_IMPORTED_MODULE_1__.CHUNK_SIZE; x++) {
            for (let z = 0; z < _config__WEBPACK_IMPORTED_MODULE_1__.CHUNK_SIZE; z++) {
                const random = (0,_Randomizer__WEBPACK_IMPORTED_MODULE_2__.noise)(this.transform.position.x + x, this.transform.position.z + z, 0);
                const height = Math.floor(random * _config__WEBPACK_IMPORTED_MODULE_1__.MAP_HEIGHT / 2 + _config__WEBPACK_IMPORTED_MODULE_1__.MAP_HEIGHT / 2);
                for (let y = 0; y < height; y++) {
                    this.data[x][z][y] = new _Block__WEBPACK_IMPORTED_MODULE_0__.Block(_Block__WEBPACK_IMPORTED_MODULE_0__.BlockType.SOLID);
                }
            }
        }
    }
    generateCaves() {
        for (let block_x = 0; block_x < _config__WEBPACK_IMPORTED_MODULE_1__.CHUNK_SIZE; block_x++) {
            for (let block_z = 0; block_z < _config__WEBPACK_IMPORTED_MODULE_1__.CHUNK_SIZE; block_z++) {
                for (let block_y = 0; block_y < _config__WEBPACK_IMPORTED_MODULE_1__.MAP_HEIGHT; block_y++) {
                    const random = (0,_Randomizer__WEBPACK_IMPORTED_MODULE_2__.noise)(this.transform.position.x + block_x, this.transform.position.z + block_z, block_y, _config__WEBPACK_IMPORTED_MODULE_1__.NOISE_COUNT / 4);
                    let fact = 1;
                    if (block_y < 32) {
                        fact = Math.max(0, block_y / 32);
                    }
                    if (block_y > _config__WEBPACK_IMPORTED_MODULE_1__.MAP_HEIGHT / 2) {
                        fact = Math.max(0, 1 - (block_y - _config__WEBPACK_IMPORTED_MODULE_1__.MAP_HEIGHT / 2) / (_config__WEBPACK_IMPORTED_MODULE_1__.MAP_HEIGHT / 2));
                    }
                    if (this.data[block_x][block_z][block_y].type != _Block__WEBPACK_IMPORTED_MODULE_0__.BlockType.EMPTY && random ** 2 < 0.15 * fact) {
                        this.data[block_x][block_z][block_y].type = _Block__WEBPACK_IMPORTED_MODULE_0__.BlockType.CAVE;
                    }
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Block */ "./src/Block.ts");
/* harmony import */ var _Chunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chunk */ "./src/Chunk.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Renderer */ "./src/Renderer.ts");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Transform */ "./src/Transform.ts");
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Vector3 */ "./src/Vector3.ts");






class Game {
    canvas;
    renderer;
    chunks;
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderer = new _Renderer__WEBPACK_IMPORTED_MODULE_3__["default"](this.canvas);
        this.chunks = this.generateChunks();
    }
    generateChunks() {
        const chunks = [];
        for (let x = 0; x < _config__WEBPACK_IMPORTED_MODULE_2__.MAP_SIZE; x++) {
            for (let z = 0; z < _config__WEBPACK_IMPORTED_MODULE_2__.MAP_SIZE; z++) {
                chunks.push(new _Chunk__WEBPACK_IMPORTED_MODULE_1__["default"](x, z));
            }
        }
        return chunks;
    }
    draw() {
        this.renderer.clearScreen(this.canvas.width, this.canvas.height);
        for (const chunk of this.chunks) {
            for (let block_x = 0; block_x < _config__WEBPACK_IMPORTED_MODULE_2__.CHUNK_SIZE; block_x++) {
                for (let block_z = 0; block_z < _config__WEBPACK_IMPORTED_MODULE_2__.CHUNK_SIZE; block_z++) {
                    for (let block_y = 0; block_y < _config__WEBPACK_IMPORTED_MODULE_2__.MAP_HEIGHT; block_y++) {
                        const block = chunk.data[block_x][block_z][block_y];
                        if (block.type !== _Block__WEBPACK_IMPORTED_MODULE_0__.BlockType.EMPTY) {
                            const transform = new _Transform__WEBPACK_IMPORTED_MODULE_4__["default"](new _Vector3__WEBPACK_IMPORTED_MODULE_5__["default"](chunk.transform.position.x + block_x, block_y, chunk.transform.position.z + block_z));
                            switch (block.type) {
                                case _Block__WEBPACK_IMPORTED_MODULE_0__.BlockType.SOLID:
                                    this.renderer.changeColor(`rgb(
										${Math.floor(255 * (block_y / _config__WEBPACK_IMPORTED_MODULE_2__.MAP_HEIGHT))},
										${Math.floor(255 * (block_y / _config__WEBPACK_IMPORTED_MODULE_2__.MAP_HEIGHT))},
										${Math.floor(255 * (block_y / _config__WEBPACK_IMPORTED_MODULE_2__.MAP_HEIGHT))}
									)`);
                                    break;
                                case _Block__WEBPACK_IMPORTED_MODULE_0__.BlockType.CAVE:
                                    this.renderer.changeColor(`rgba(0, 0, 0, 0.5)`);
                                    break;
                            }
                            this.renderer.drawCube(transform);
                        }
                    }
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/Randomizer.ts":
/*!***************************!*\
  !*** ./src/Randomizer.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bicubicRandXYZ: () => (/* binding */ bicubicRandXYZ),
/* harmony export */   noise: () => (/* binding */ noise),
/* harmony export */   randXYZ: () => (/* binding */ randXYZ)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");

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
function randXYZ(x, y, z) {
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
function noise(x, z, y, noise_count = _config__WEBPACK_IMPORTED_MODULE_0__.NOISE_COUNT) {
    let result = 0;
    for (let i = 2; i < noise_count + 2; i++) {
        const tmp = bicubicRandXYZ((x + 3418731287) / (2 ** i), (y - 1376312589) / (2 ** i), (z + 132897987) / (2 ** i));
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
function cubicInterpolate(p0, p1, p2, p3, t) {
    const a = -0.5 * p0 + 1.5 * p1 - 1.5 * p2 + 0.5 * p3;
    const b = p0 - 2.5 * p1 + 2 * p2 - 0.5 * p3;
    const c = -0.5 * p0 + 0.5 * p2;
    const d = p1;
    return a * t * t * t + b * t * t + c * t + d;
}
function bicubicRandXYZ(x, y, z) {
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


/***/ }),

/***/ "./src/Renderer.ts":
/*!*************************!*\
  !*** ./src/Renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _Transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transform */ "./src/Transform.ts");
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vector3 */ "./src/Vector3.ts");



class Renderer {
    transform;
    ctx;
    constructor(canvas) {
        this.transform = new _Transform__WEBPACK_IMPORTED_MODULE_1__["default"](new _Vector3__WEBPACK_IMPORTED_MODULE_2__["default"](_config__WEBPACK_IMPORTED_MODULE_0__.MAP_SIZE / 2 * _config__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE, _config__WEBPACK_IMPORTED_MODULE_0__.MAP_HEIGHT, _config__WEBPACK_IMPORTED_MODULE_0__.MAP_SIZE / 2 * _config__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE), new _Vector3__WEBPACK_IMPORTED_MODULE_2__["default"](40 * Math.PI / 180, 45 * Math.PI / 180, 0));
        this.ctx = canvas.getContext('2d');
        this.ctx.translate(canvas.width / 2, canvas.height / 2);
        this.ctx.scale(_config__WEBPACK_IMPORTED_MODULE_0__.SCALE, _config__WEBPACK_IMPORTED_MODULE_0__.SCALE);
        this.ctx.lineWidth = 1 / _config__WEBPACK_IMPORTED_MODULE_0__.SCALE;
        this.ctx.strokeStyle = `rgba(0, 0, 0, 1)`;
    }
    changeColor(color) {
        this.ctx.fillStyle = color;
    }
    drawCube(transform) {
        // const coords = this.isometricCoord(transform.position.x, -transform.position.y, transform.position.z);
        this._drawCube(transform.position.x - this.transform.position.x, transform.position.y - this.transform.position.y, transform.position.z - this.transform.position.z);
        // this.ctx.fillRect(transform.position.x, transform.position.z, 1, 1);
    }
    clearScreen(width, height) {
        this.changeColor('#444');
        this.ctx.fillRect(-width / 2, -height / 2, width, height);
    }
    isometricCoord(x, y, z) {
        const alpha_angle = this.transform.angle.x;
        const beta_angle = this.transform.angle.y;
        const isometric_matrix = [
            [Math.cos(beta_angle), 0, -Math.sin(beta_angle)],
            [Math.sin(alpha_angle) * Math.sin(beta_angle), Math.cos(alpha_angle), Math.sin(alpha_angle) * Math.cos(beta_angle)],
            [Math.cos(alpha_angle) * Math.sin(beta_angle), -Math.sin(alpha_angle), Math.cos(alpha_angle) * Math.cos(beta_angle)]
        ];
        return {
            x: isometric_matrix[0][0] * x + isometric_matrix[0][1] * y + isometric_matrix[0][2] * z,
            y: isometric_matrix[1][0] * x + isometric_matrix[1][1] * y + isometric_matrix[1][2] * z,
        };
    }
    _drawCube(x, y, z) {
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


/***/ }),

/***/ "./src/Transform.ts":
/*!**************************!*\
  !*** ./src/Transform.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Transform)
/* harmony export */ });
/* harmony import */ var _Vector3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vector3 */ "./src/Vector3.ts");

class Transform {
    position;
    angle;
    scale;
    constructor(position = _Vector3__WEBPACK_IMPORTED_MODULE_0__["default"].zero(), angle = _Vector3__WEBPACK_IMPORTED_MODULE_0__["default"].zero(), scale = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["default"](1, 1, 1)) {
        this.position = position;
        this.angle = angle;
        this.scale = scale;
    }
    setPosition(x, y, z) {
        this.position = new _Vector3__WEBPACK_IMPORTED_MODULE_0__["default"](x, y, z);
    }
}


/***/ }),

/***/ "./src/Vector3.ts":
/*!************************!*\
  !*** ./src/Vector3.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Vector3)
/* harmony export */ });
class Vector3 {
    x;
    y;
    z;
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static zero() {
        return new Vector3(0, 0, 0);
    }
}


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHUNK_SIZE: () => (/* binding */ CHUNK_SIZE),
/* harmony export */   MAP_HEIGHT: () => (/* binding */ MAP_HEIGHT),
/* harmony export */   MAP_SIZE: () => (/* binding */ MAP_SIZE),
/* harmony export */   NOISE_COUNT: () => (/* binding */ NOISE_COUNT),
/* harmony export */   SCALE: () => (/* binding */ SCALE)
/* harmony export */ });
const MAP_HEIGHT = 16;
const CHUNK_SIZE = 16;
const MAP_SIZE = 2;
const NOISE_COUNT = 4;
const SCALE = 16;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/Game.ts");


const game = new _Game__WEBPACK_IMPORTED_MODULE_0__["default"]('canvas');
function tick() {
    game.draw();
    game.renderer.transform.angle.y = Math.sin(+(new Date()) / 5000) * 30 * Math.PI / 180 + 45 * Math.PI / 180;
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUVsQixrREFBa0Q7SUFDbEQsTUFBTSxXQUFXLEdBQUc7UUFDbkIsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzlVLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUM5VSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDOVUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO0tBQzlVLENBQUM7SUFFRiwwQ0FBMEM7SUFDMUMsTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2hKLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoSixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEosTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXBKLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FB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Z0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUN2RjtJQUNGLENBQUM7SUFFTyxTQUFTLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFckIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFckIsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ25CLENBQUM7Q0FDRDs7Ozs7Ozs7Ozs7Ozs7OztBQ3JHK0I7QUFFakIsTUFBTSxTQUFTO0lBQ3RCLFFBQVEsQ0FBVTtJQUNsQixLQUFLLENBQVU7SUFDZixLQUFLLENBQVU7SUFFdEIsWUFBWSxXQUFvQixnREFBTyxDQUFDLElBQUksRUFBRSxFQUFFLFFBQWlCLGdEQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBaUIsSUFBSSxnREFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JILElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnREFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7QUNoQmMsTUFBTSxPQUFPO0lBQ1I7SUFBa0I7SUFBa0I7SUFBdkQsWUFBbUIsQ0FBUyxFQUFTLENBQVMsRUFBUyxDQUFTO1FBQTdDLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1FBQVMsTUFBQyxHQUFELENBQUMsQ0FBUTtJQUFJLENBQUM7SUFFckUsTUFBTSxDQUFDLElBQUk7UUFDVixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTk0sTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFFbkIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXRCLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQzs7Ozs7OztVQ054QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTmE7QUFFYTtBQUUxQixNQUFNLElBQUksR0FBRyxJQUFJLDZDQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFaEMsU0FBUyxJQUFJO0lBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRVosSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztJQUUzRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9CbG9jay50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9DaHVuay50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL1JhbmRvbWl6ZXIudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvVHJhbnNmb3JtLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL1ZlY3RvcjMudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8zZF9ub2ljZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gQmxvY2tUeXBlIHtcblx0RU1QVFksXG5cdFNPTElELFxuXHRDQVZFXG59XG5cbmV4cG9ydCBjbGFzcyBCbG9jayB7XG5cdHB1YmxpYyB0eXBlOiBCbG9ja1R5cGU7XG5cblx0Y29uc3RydWN0b3IodHlwZTogQmxvY2tUeXBlKSB7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0fVxufVxuIiwiaW1wb3J0IHsgQmxvY2ssIEJsb2NrVHlwZSB9IGZyb20gXCIuL0Jsb2NrXCI7XG5pbXBvcnQgeyBDSFVOS19TSVpFLCBNQVBfSEVJR0hULCBOT0lTRV9DT1VOVCB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbm9pc2UgfSBmcm9tIFwiLi9SYW5kb21pemVyXCI7XG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuL1RyYW5zZm9ybVwiO1xuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4vVmVjdG9yM1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaHVuayB7XG5cdHB1YmxpYyB0cmFuc2Zvcm06IFRyYW5zZm9ybTtcblx0cHVibGljIGRhdGE6IEJsb2NrW11bXVtdO1xuXG5cdGNvbnN0cnVjdG9yKHg6IG51bWJlciwgejogbnVtYmVyKSB7XG5cdFx0dGhpcy50cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKG5ldyBWZWN0b3IzKHggKiBDSFVOS19TSVpFLCAwLCB6ICogQ0hVTktfU0laRSkpO1xuXHRcdHRoaXMuZGF0YSA9IHRoaXMuaW5pdGlhbGl6ZURhdGEoKTtcblx0XHR0aGlzLmdlbmVyYXRlTGFuZHNjYXBlKCk7XG5cdFx0dGhpcy5nZW5lcmF0ZUNhdmVzKCk7XG5cdH1cblxuXHRwcml2YXRlIGluaXRpYWxpemVEYXRhKCk6IEJsb2NrW11bXVtdIHtcblx0XHRjb25zdCBkYXRhOiBCbG9ja1tdW11bXSA9IFtdO1xuXHRcdGZvciAobGV0IHggPSAwOyB4IDwgQ0hVTktfU0laRTsgeCsrKSB7XG5cdFx0XHRkYXRhW3hdID0gW107XG5cdFx0XHRmb3IgKGxldCB6ID0gMDsgeiA8IENIVU5LX1NJWkU7IHorKykge1xuXHRcdFx0XHRkYXRhW3hdW3pdID0gW107XG5cdFx0XHRcdGZvciAobGV0IHkgPSAwOyB5IDwgTUFQX0hFSUdIVDsgeSsrKSB7XG5cdFx0XHRcdFx0ZGF0YVt4XVt6XVt5XSA9IG5ldyBCbG9jayhCbG9ja1R5cGUuRU1QVFkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZUxhbmRzY2FwZSgpIHtcblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IENIVU5LX1NJWkU7IHgrKykge1xuXHRcdFx0Zm9yIChsZXQgeiA9IDA7IHogPCBDSFVOS19TSVpFOyB6KyspIHtcblx0XHRcdFx0Y29uc3QgcmFuZG9tID0gbm9pc2UoXG5cdFx0XHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueCArIHgsXG5cdFx0XHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueiArIHosXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGNvbnN0IGhlaWdodCA9IE1hdGguZmxvb3IocmFuZG9tICogTUFQX0hFSUdIVCAvIDIgKyBNQVBfSEVJR0hUIC8gMik7XG5cblx0XHRcdFx0Zm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuXHRcdFx0XHRcdHRoaXMuZGF0YVt4XVt6XVt5XSA9IG5ldyBCbG9jayhCbG9ja1R5cGUuU09MSUQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZUNhdmVzKCkge1xuXHRcdGZvciAobGV0IGJsb2NrX3ggPSAwOyBibG9ja194IDwgQ0hVTktfU0laRTsgYmxvY2tfeCsrKSB7XG5cdFx0XHRmb3IgKGxldCBibG9ja196ID0gMDsgYmxvY2tfeiA8IENIVU5LX1NJWkU7IGJsb2NrX3orKykge1xuXHRcdFx0XHRmb3IgKGxldCBibG9ja195ID0gMDsgYmxvY2tfeSA8IE1BUF9IRUlHSFQ7IGJsb2NrX3krKykge1xuXHRcdFx0XHRcdGNvbnN0IHJhbmRvbSA9IG5vaXNlKFxuXHRcdFx0XHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueCArIGJsb2NrX3gsXG5cdFx0XHRcdFx0XHR0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi56ICsgYmxvY2tfeixcblx0XHRcdFx0XHRcdGJsb2NrX3ksXG5cdFx0XHRcdFx0XHROT0lTRV9DT1VOVCAvIDRcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0bGV0IGZhY3QgPSAxO1xuXG5cdFx0XHRcdFx0aWYgKGJsb2NrX3kgPCAzMikge1xuXHRcdFx0XHRcdFx0ZmFjdCA9IE1hdGgubWF4KDAsIGJsb2NrX3kgLyAzMilcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoYmxvY2tfeSA+IE1BUF9IRUlHSFQgLyAyKSB7XG5cdFx0XHRcdFx0XHRmYWN0ID0gTWF0aC5tYXgoMCwgMSAtIChibG9ja195IC0gTUFQX0hFSUdIVCAvIDIpIC8gKE1BUF9IRUlHSFQgLyAyKSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5kYXRhW2Jsb2NrX3hdW2Jsb2NrX3pdW2Jsb2NrX3ldLnR5cGUgIT0gQmxvY2tUeXBlLkVNUFRZICYmIHJhbmRvbSAqKiAyIDwgMC4xNSAqIGZhY3QpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGF0YVtibG9ja194XVtibG9ja196XVtibG9ja195XS50eXBlID0gQmxvY2tUeXBlLkNBVkU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgeyBCbG9ja1R5cGUgfSBmcm9tIFwiLi9CbG9ja1wiO1xuaW1wb3J0IENodW5rIGZyb20gXCIuL0NodW5rXCI7XG5pbXBvcnQgeyBDSFVOS19TSVpFLCBNQVBfSEVJR0hULCBNQVBfU0laRSB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gXCIuL1JlbmRlcmVyXCI7XG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuL1RyYW5zZm9ybVwiO1xuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4vVmVjdG9yM1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcblx0cHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuXHRwdWJsaWMgcmVuZGVyZXI6IFJlbmRlcmVyO1xuXHRwcml2YXRlIGNodW5rczogQ2h1bmtbXTtcblxuXHRjb25zdHJ1Y3RvcihjYW52YXNJZDogc3RyaW5nKSB7XG5cdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNJZCkgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5cdFx0dGhpcy5jYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblx0XHR0aGlzLmNhbnZhcy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0dGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih0aGlzLmNhbnZhcyk7XG5cdFx0dGhpcy5jaHVua3MgPSB0aGlzLmdlbmVyYXRlQ2h1bmtzKCk7XG5cdH1cblxuXHRwcml2YXRlIGdlbmVyYXRlQ2h1bmtzKCk6IENodW5rW10ge1xuXHRcdGNvbnN0IGNodW5rczogQ2h1bmtbXSA9IFtdO1xuXHRcdGZvciAobGV0IHggPSAwOyB4IDwgTUFQX1NJWkU7IHgrKykge1xuXHRcdFx0Zm9yIChsZXQgeiA9IDA7IHogPCBNQVBfU0laRTsgeisrKSB7XG5cdFx0XHRcdGNodW5rcy5wdXNoKG5ldyBDaHVuayh4LCB6KSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBjaHVua3M7XG5cdH1cblxuXHRwdWJsaWMgZHJhdygpIHtcblx0XHR0aGlzLnJlbmRlcmVyLmNsZWFyU2NyZWVuKHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuXG5cdFx0Zm9yIChjb25zdCBjaHVuayBvZiB0aGlzLmNodW5rcykge1xuXHRcdFx0Zm9yIChsZXQgYmxvY2tfeCA9IDA7IGJsb2NrX3ggPCBDSFVOS19TSVpFOyBibG9ja194KyspIHtcblx0XHRcdFx0Zm9yIChsZXQgYmxvY2tfeiA9IDA7IGJsb2NrX3ogPCBDSFVOS19TSVpFOyBibG9ja196KyspIHtcblx0XHRcdFx0XHRmb3IgKGxldCBibG9ja195ID0gMDsgYmxvY2tfeSA8IE1BUF9IRUlHSFQ7IGJsb2NrX3krKykge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBibG9jayA9IGNodW5rLmRhdGFbYmxvY2tfeF1bYmxvY2tfel1bYmxvY2tfeV07XG5cblx0XHRcdFx0XHRcdGlmIChibG9jay50eXBlICE9PSBCbG9ja1R5cGUuRU1QVFkpIHtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybShcblx0XHRcdFx0XHRcdFx0XHRuZXcgVmVjdG9yMyhcblx0XHRcdFx0XHRcdFx0XHRcdGNodW5rLnRyYW5zZm9ybS5wb3NpdGlvbi54ICsgYmxvY2tfeCxcblx0XHRcdFx0XHRcdFx0XHRcdGJsb2NrX3ksXG5cdFx0XHRcdFx0XHRcdFx0XHRjaHVuay50cmFuc2Zvcm0ucG9zaXRpb24ueiArIGJsb2NrX3pcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRcdFx0c3dpdGNoIChibG9jay50eXBlKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FzZSBCbG9ja1R5cGUuU09MSUQ6XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmNoYW5nZUNvbG9yKGByZ2IoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCR7TWF0aC5mbG9vcigyNTUgKiAoYmxvY2tfeSAvIE1BUF9IRUlHSFQpKX0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCR7TWF0aC5mbG9vcigyNTUgKiAoYmxvY2tfeSAvIE1BUF9IRUlHSFQpKX0sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCR7TWF0aC5mbG9vcigyNTUgKiAoYmxvY2tfeSAvIE1BUF9IRUlHSFQpKX1cblx0XHRcdFx0XHRcdFx0XHRcdClgKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgQmxvY2tUeXBlLkNBVkU6XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmNoYW5nZUNvbG9yKGByZ2JhKDAsIDAsIDAsIDAuNSlgKTtcblx0XHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5kcmF3Q3ViZSh0cmFuc2Zvcm0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHsgTk9JU0VfQ09VTlQgfSBmcm9tIFwiLi9jb25maWdcIjtcblxuY29uc3QgU0VFRCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIxNDc0ODM2NDcpID4+PiAwO1xuXG5jb25zb2xlLmxvZyhTRUVEKTtcblxuLy8gPT09PT0gbm9pc2UgPT09PT1cblxuLy8gY29uc3QgX3JhbmRYWVpDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbi8vIGZ1bmN0aW9uIF9yYW5kWFlaKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBudW1iZXIge1xuLy8gXHRjb25zdCBrZXkgPSBgJHt4fV8ke3p9XyR7eX1gO1xuXG4vLyBcdGlmICghX3JhbmRYWVpDYWNoZS5oYXMoa2V5KSkge1xuLy8gXHRcdF9yYW5kWFlaQ2FjaGUuc2V0KGtleSwgX3JhbmRYWVooeCwgeiwgeSkpO1xuLy8gXHR9XG5cbi8vIFx0cmV0dXJuIF9yYW5kWFlaQ2FjaGUuZ2V0KGtleSkgYXMgbnVtYmVyO1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZFhZWih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogbnVtYmVyIHtcblx0bGV0IG4gPSAoeCAqIDM0MTg3MzEyODcgKyB5ICogMTMyODk3OTg3ICsgeiAqIDEzNzYzMTI1ODkgKyBTRUVEKSA+Pj4gMDtcblxuXHRuID0gKG4gXiAobiA+PiAyMSkpID4+PiAwO1xuXHRuID0gKG4gXiAobiA8PCAzNSkpID4+PiAwO1xuXHRuID0gKG4gXiAobiA+PiA0KSkgPj4+IDA7XG5cdG4gPSAobiAqIDI2ODU4MjE2NTc3MykgPj4+IDA7XG5cdG4gPSAobiBeIChuID4+IDE1KSkgPj4+IDA7XG5cblx0cmV0dXJuIG4gJSAyNTYgLyAyNTY7XG59XG5cbi8vID09PT09IG5vaXNlID09PT09XG5cbi8vIGNvbnN0IF9ub2lzZUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuLy8gZnVuY3Rpb24gX25vaXNlKHg6IG51bWJlciwgejogbnVtYmVyLCB5OiBudW1iZXIsIG5vaXNlX2NvdW50OiBudW1iZXIgPSBOT0lTRV9DT1VOVCk6IG51bWJlciB7XG4vLyBcdGNvbnN0IGtleSA9IGAke3h9XyR7en1fJHt5fV8ke25vaXNlX2NvdW50fWA7XG5cbi8vIFx0aWYgKCFfbm9pc2VDYWNoZS5oYXMoa2V5KSkge1xuLy8gXHRcdF9ub2lzZUNhY2hlLnNldChrZXksIF9ub2lzZSh4LCB6LCB5LCBub2lzZV9jb3VudCkpO1xuLy8gXHR9XG5cbi8vIFx0cmV0dXJuIF9ub2lzZUNhY2hlLmdldChrZXkpIGFzIG51bWJlcjtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG5vaXNlKHg6IG51bWJlciwgejogbnVtYmVyLCB5OiBudW1iZXIsIG5vaXNlX2NvdW50OiBudW1iZXIgPSBOT0lTRV9DT1VOVCk6IG51bWJlciB7XG5cdGxldCByZXN1bHQgPSAwO1xuXG5cdGZvciAobGV0IGkgPSAyOyBpIDwgbm9pc2VfY291bnQgKyAyOyBpKyspIHtcblx0XHRjb25zdCB0bXAgPSBiaWN1YmljUmFuZFhZWihcblx0XHRcdCh4ICsgMzQxODczMTI4NykgLyAoMiAqKiBpKSxcblx0XHRcdCh5IC0gMTM3NjMxMjU4OSkgLyAoMiAqKiBpKSxcblx0XHRcdCh6ICsgMTMyODk3OTg3KSAvICgyICoqIGkpXG5cdFx0KTtcblxuXHRcdHJlc3VsdCArPSB0bXA7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0IC8gbm9pc2VfY291bnQ7XG59XG5cbi8vID09PT09IGN1YmljSW50ZXJwb2xhdGUgPT09PT1cblxuLy8gY29uc3QgX2N1YmljSW50ZXJwb2xhdGVDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbi8vIGZ1bmN0aW9uIF9jdWJpY0ludGVycG9sYXRlKHAwOiBudW1iZXIsIHAxOiBudW1iZXIsIHAyOiBudW1iZXIsIHAzOiBudW1iZXIsIHQ6IG51bWJlcik6IG51bWJlciB7XG4vLyBcdGNvbnN0IGtleSA9IGAke3AwfV8ke3AxfV8ke3AyfV8ke3AzfV8ke3R9YDtcblxuLy8gXHRpZiAoIV9jdWJpY0ludGVycG9sYXRlQ2FjaGUuaGFzKGtleSkpIHtcbi8vIFx0XHRfY3ViaWNJbnRlcnBvbGF0ZUNhY2hlLnNldChrZXksIF9jdWJpY0ludGVycG9sYXRlKHAwLCBwMSwgcDIsIHAzLCB0KSk7XG4vLyBcdH1cblxuLy8gXHRyZXR1cm4gX2N1YmljSW50ZXJwb2xhdGVDYWNoZS5nZXQoa2V5KSBhcyBudW1iZXI7XG4vLyB9XG5cbmZ1bmN0aW9uIGN1YmljSW50ZXJwb2xhdGUocDA6IG51bWJlciwgcDE6IG51bWJlciwgcDI6IG51bWJlciwgcDM6IG51bWJlciwgdDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBhID0gLTAuNSAqIHAwICsgMS41ICogcDEgLSAxLjUgKiBwMiArIDAuNSAqIHAzO1xuICAgIGNvbnN0IGIgPSBwMCAtIDIuNSAqIHAxICsgMiAqIHAyIC0gMC41ICogcDM7XG4gICAgY29uc3QgYyA9IC0wLjUgKiBwMCArIDAuNSAqIHAyO1xuICAgIGNvbnN0IGQgPSBwMTtcblxuXHRyZXR1cm4gYSAqIHQgKiB0ICogdCArIGIgKiB0ICogdCArIGMgKiB0ICsgZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpY3ViaWNSYW5kWFlaKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBudW1iZXIge1xuXHRjb25zdCB4YiA9IE1hdGguZmxvb3IoeCk7XG5cblx0Y29uc3QgeDAgPSB4YiAtIDE7XG5cdGNvbnN0IHgxID0geGIgKyAwO1xuXHRjb25zdCB4MiA9IHhiICsgMTtcblx0Y29uc3QgeDMgPSB4YiArIDI7XG5cblx0Y29uc3QgeWIgPSBNYXRoLmZsb29yKHkpO1xuXG5cdGNvbnN0IHkwID0geWIgLSAxO1xuXHRjb25zdCB5MSA9IHliICsgMDtcblx0Y29uc3QgeTIgPSB5YiArIDE7XG5cdGNvbnN0IHkzID0geWIgKyAyO1xuXG5cdGNvbnN0IHpiID0gTWF0aC5mbG9vcih6KTtcblxuXHRjb25zdCB6MCA9IHpiIC0gMTtcblx0Y29uc3QgejEgPSB6YiArIDA7XG5cdGNvbnN0IHoyID0gemIgKyAxO1xuXHRjb25zdCB6MyA9IHpiICsgMjtcblxuXHQvLyDQn9C+0LvRg9GH0LDQtdC8INC30L3QsNGH0LXQvdC40Y8gXCLRiNGD0LzQvtCyXCIg0LTQu9GPIDE2INGB0L7RgdC10LTQvdC40YUg0YLQvtGH0LXQulxuXHRjb25zdCBub2lzZVZhbHVlcyA9IFtcblx0XHRyYW5kWFlaKHgwLCB5MCwgejApLCByYW5kWFlaKHgxLCB5MCwgejApLCByYW5kWFlaKHgyLCB5MCwgejApLCByYW5kWFlaKHgzLCB5MCwgejApLCByYW5kWFlaKHgwLCB5MSwgejApLCByYW5kWFlaKHgxLCB5MSwgejApLCByYW5kWFlaKHgyLCB5MSwgejApLCByYW5kWFlaKHgzLCB5MSwgejApLCByYW5kWFlaKHgwLCB5MiwgejApLCByYW5kWFlaKHgxLCB5MiwgejApLCByYW5kWFlaKHgyLCB5MiwgejApLCByYW5kWFlaKHgzLCB5MiwgejApLCByYW5kWFlaKHgwLCB5MywgejApLCByYW5kWFlaKHgxLCB5MywgejApLCByYW5kWFlaKHgyLCB5MywgejApLCByYW5kWFlaKHgzLCB5MywgejApLFxuXHRcdHJhbmRYWVooeDAsIHkwLCB6MSksIHJhbmRYWVooeDEsIHkwLCB6MSksIHJhbmRYWVooeDIsIHkwLCB6MSksIHJhbmRYWVooeDMsIHkwLCB6MSksIHJhbmRYWVooeDAsIHkxLCB6MSksIHJhbmRYWVooeDEsIHkxLCB6MSksIHJhbmRYWVooeDIsIHkxLCB6MSksIHJhbmRYWVooeDMsIHkxLCB6MSksIHJhbmRYWVooeDAsIHkyLCB6MSksIHJhbmRYWVooeDEsIHkyLCB6MSksIHJhbmRYWVooeDIsIHkyLCB6MSksIHJhbmRYWVooeDMsIHkyLCB6MSksIHJhbmRYWVooeDAsIHkzLCB6MSksIHJhbmRYWVooeDEsIHkzLCB6MSksIHJhbmRYWVooeDIsIHkzLCB6MSksIHJhbmRYWVooeDMsIHkzLCB6MSksXG5cdFx0cmFuZFhZWih4MCwgeTAsIHoyKSwgcmFuZFhZWih4MSwgeTAsIHoyKSwgcmFuZFhZWih4MiwgeTAsIHoyKSwgcmFuZFhZWih4MywgeTAsIHoyKSwgcmFuZFhZWih4MCwgeTEsIHoyKSwgcmFuZFhZWih4MSwgeTEsIHoyKSwgcmFuZFhZWih4MiwgeTEsIHoyKSwgcmFuZFhZWih4MywgeTEsIHoyKSwgcmFuZFhZWih4MCwgeTIsIHoyKSwgcmFuZFhZWih4MSwgeTIsIHoyKSwgcmFuZFhZWih4MiwgeTIsIHoyKSwgcmFuZFhZWih4MywgeTIsIHoyKSwgcmFuZFhZWih4MCwgeTMsIHoyKSwgcmFuZFhZWih4MSwgeTMsIHoyKSwgcmFuZFhZWih4MiwgeTMsIHoyKSwgcmFuZFhZWih4MywgeTMsIHoyKSxcblx0XHRyYW5kWFlaKHgwLCB5MCwgejMpLCByYW5kWFlaKHgxLCB5MCwgejMpLCByYW5kWFlaKHgyLCB5MCwgejMpLCByYW5kWFlaKHgzLCB5MCwgejMpLCByYW5kWFlaKHgwLCB5MSwgejMpLCByYW5kWFlaKHgxLCB5MSwgejMpLCByYW5kWFlaKHgyLCB5MSwgejMpLCByYW5kWFlaKHgzLCB5MSwgejMpLCByYW5kWFlaKHgwLCB5MiwgejMpLCByYW5kWFlaKHgxLCB5MiwgejMpLCByYW5kWFlaKHgyLCB5MiwgejMpLCByYW5kWFlaKHgzLCB5MiwgejMpLCByYW5kWFlaKHgwLCB5MywgejMpLCByYW5kWFlaKHgxLCB5MywgejMpLCByYW5kWFlaKHgyLCB5MywgejMpLCByYW5kWFlaKHgzLCB5MywgejMpLFxuXHRdO1xuXG5cdC8vINCY0L3RgtC10YDQv9C+0LvQuNGA0YPQtdC8INC/0L4gJ3knINC/0L4g0YfQtdGC0YvRgNC10Lwg0YHRgtGA0L7QutCw0Lxcblx0Y29uc3Qgc2xpY2Uwcm93MCA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAwICsgMF0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDFdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAyXSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgM10sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMHJvdzEgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMCArIDRdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyA1XSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgNl0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDddLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTByb3cyID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDAgKyA4XSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgOV0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDEwXSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMTFdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTByb3czID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDAgKyAxMl0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDEzXSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMTRdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxNV0sIHggLSB4Yik7XG5cblx0Y29uc3Qgc2xpY2Uxcm93MCA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAxICsgMF0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDFdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAyXSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgM10sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMXJvdzEgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMSArIDRdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyA1XSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgNl0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDddLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTFyb3cyID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDEgKyA4XSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgOV0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDEwXSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMTFdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTFyb3czID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDEgKyAxMl0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDEzXSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMTRdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxNV0sIHggLSB4Yik7XG5cblx0Y29uc3Qgc2xpY2Uycm93MCA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAyICsgMF0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDFdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAyXSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgM10sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMnJvdzEgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMiArIDRdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyA1XSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgNl0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDddLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTJyb3cyID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDIgKyA4XSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgOV0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDEwXSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMTFdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTJyb3czID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDIgKyAxMl0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDEzXSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMTRdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxNV0sIHggLSB4Yik7XG5cblx0Y29uc3Qgc2xpY2Uzcm93MCA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAzICsgMF0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDFdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAyXSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgM10sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlM3JvdzEgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMyArIDRdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyA1XSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgNl0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDddLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTNyb3cyID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDMgKyA4XSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgOV0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDEwXSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMTFdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTNyb3czID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDMgKyAxMl0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDEzXSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMTRdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxNV0sIHggLSB4Yik7XG5cblx0Y29uc3Qgc2xpY2UwID0gY3ViaWNJbnRlcnBvbGF0ZShzbGljZTByb3cwLCBzbGljZTByb3cxLCBzbGljZTByb3cyLCBzbGljZTByb3czLCB5IC0geWIpO1xuXHRjb25zdCBzbGljZTEgPSBjdWJpY0ludGVycG9sYXRlKHNsaWNlMXJvdzAsIHNsaWNlMXJvdzEsIHNsaWNlMXJvdzIsIHNsaWNlMXJvdzMsIHkgLSB5Yik7XG5cdGNvbnN0IHNsaWNlMiA9IGN1YmljSW50ZXJwb2xhdGUoc2xpY2Uycm93MCwgc2xpY2Uycm93MSwgc2xpY2Uycm93Miwgc2xpY2Uycm93MywgeSAtIHliKTtcblx0Y29uc3Qgc2xpY2UzID0gY3ViaWNJbnRlcnBvbGF0ZShzbGljZTNyb3cwLCBzbGljZTNyb3cxLCBzbGljZTNyb3cyLCBzbGljZTNyb3czLCB5IC0geWIpO1xuXG5cdC8vINCY0L3RgtC10YDQv9C+0LvQuNGA0YPQtdC8INC/0L4gJ3gnINC/0L4g0YfQtdGC0YvRgNC10Lwg0YHRgtGA0L7QutCw0Lxcblx0cmV0dXJuIGN1YmljSW50ZXJwb2xhdGUoc2xpY2UwLCBzbGljZTEsIHNsaWNlMiwgc2xpY2UzLCB6IC0gemIpO1xufVxuXG5jb25zb2xlLmxvZyhiaWN1YmljUmFuZFhZWik7XG4iLCJpbXBvcnQgeyBDSFVOS19TSVpFLCBNQVBfSEVJR0hULCBNQVBfU0laRSwgU0NBTEUgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBUcmFuc2Zvcm0gZnJvbSBcIi4vVHJhbnNmb3JtXCI7XG5pbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi9WZWN0b3IzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIHtcblx0cHVibGljIHRyYW5zZm9ybTogVHJhbnNmb3JtO1xuXHRwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG5cdGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcblx0XHR0aGlzLnRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0oXG5cdFx0XHRuZXcgVmVjdG9yMyhNQVBfU0laRSAvIDIgKiBDSFVOS19TSVpFLCBNQVBfSEVJR0hULCBNQVBfU0laRSAvIDIgKiBDSFVOS19TSVpFKSxcblx0XHRcdG5ldyBWZWN0b3IzKDQwICogTWF0aC5QSSAvIDE4MCwgNDUgKiBNYXRoLlBJIC8gMTgwLCAwKVxuXHRcdCk7XG5cdFx0dGhpcy5jdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG5cblx0XHR0aGlzLmN0eC50cmFuc2xhdGUoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIpO1xuXHRcdHRoaXMuY3R4LnNjYWxlKFNDQUxFLCBTQ0FMRSk7XG5cdFx0dGhpcy5jdHgubGluZVdpZHRoID0gMSAvIFNDQUxFO1xuXHRcdHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gYHJnYmEoMCwgMCwgMCwgMSlgO1xuXHR9XG5cblx0Y2hhbmdlQ29sb3IoY29sb3I6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybikge1xuXHRcdHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuXHR9XG5cblx0ZHJhd0N1YmUodHJhbnNmb3JtOiBUcmFuc2Zvcm0pIHtcblx0XHQvLyBjb25zdCBjb29yZHMgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHRyYW5zZm9ybS5wb3NpdGlvbi54LCAtdHJhbnNmb3JtLnBvc2l0aW9uLnksIHRyYW5zZm9ybS5wb3NpdGlvbi56KTtcblx0XHR0aGlzLl9kcmF3Q3ViZShcblx0XHRcdHRyYW5zZm9ybS5wb3NpdGlvbi54IC0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueCxcblx0XHRcdHRyYW5zZm9ybS5wb3NpdGlvbi55IC0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueSxcblx0XHRcdHRyYW5zZm9ybS5wb3NpdGlvbi56IC0gdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uelxuXHRcdCk7XG5cdFx0Ly8gdGhpcy5jdHguZmlsbFJlY3QodHJhbnNmb3JtLnBvc2l0aW9uLngsIHRyYW5zZm9ybS5wb3NpdGlvbi56LCAxLCAxKTtcblx0fVxuXG5cdGNsZWFyU2NyZWVuKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKSB7XG5cdFx0dGhpcy5jaGFuZ2VDb2xvcignIzQ0NCcpO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCgtd2lkdGggLyAyLCAtaGVpZ2h0IC8gMiwgd2lkdGgsIGhlaWdodCk7XG5cdH1cblxuXHRpc29tZXRyaWNDb29yZCh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XG5cdFx0Y29uc3QgYWxwaGFfYW5nbGUgPSB0aGlzLnRyYW5zZm9ybS5hbmdsZS54O1xuXHRcdGNvbnN0IGJldGFfYW5nbGUgID0gdGhpcy50cmFuc2Zvcm0uYW5nbGUueTtcblxuXHRcdGNvbnN0IGlzb21ldHJpY19tYXRyaXggPSBbXG5cdFx0XHRbIE1hdGguY29zKGJldGFfYW5nbGUpLCAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgICAgICAgICAgICAgICAgICAgICAtTWF0aC5zaW4oYmV0YV9hbmdsZSkgICAgICAgICAgICAgICAgICAgICAgICAgXSxcblx0XHRcdFsgTWF0aC5zaW4oYWxwaGFfYW5nbGUpICogTWF0aC5zaW4oYmV0YV9hbmdsZSksICBNYXRoLmNvcyhhbHBoYV9hbmdsZSksICBNYXRoLnNpbihhbHBoYV9hbmdsZSkgKiBNYXRoLmNvcyhiZXRhX2FuZ2xlKSBdLFxuXHRcdFx0WyBNYXRoLmNvcyhhbHBoYV9hbmdsZSkgKiBNYXRoLnNpbihiZXRhX2FuZ2xlKSwgLU1hdGguc2luKGFscGhhX2FuZ2xlKSwgIE1hdGguY29zKGFscGhhX2FuZ2xlKSAqIE1hdGguY29zKGJldGFfYW5nbGUpIF1cblx0XHRdO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHg6IGlzb21ldHJpY19tYXRyaXhbMF1bMF0gKiB4ICsgaXNvbWV0cmljX21hdHJpeFswXVsxXSAqIHkgKyBpc29tZXRyaWNfbWF0cml4WzBdWzJdICogeixcblx0XHRcdHk6IGlzb21ldHJpY19tYXRyaXhbMV1bMF0gKiB4ICsgaXNvbWV0cmljX21hdHJpeFsxXVsxXSAqIHkgKyBpc29tZXRyaWNfbWF0cml4WzFdWzJdICogeixcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIF9kcmF3Q3ViZSh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XG5cdFx0dGhpcy5jdHguYmVnaW5QYXRoKCk7XG5cblx0XHRsZXQgY29vcmQgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHggKyAwLCAteSArIDAsIHogKyAwKTtcblx0XHR0aGlzLmN0eC5tb3ZlVG8oY29vcmQueCwgY29vcmQueSk7XG5cblx0XHRjb29yZCA9IHRoaXMuaXNvbWV0cmljQ29vcmQoeCArIDEsIC15ICsgMCwgeiArIDApO1xuXHRcdHRoaXMuY3R4LmxpbmVUbyhjb29yZC54LCBjb29yZC55KTtcblxuXHRcdGNvb3JkID0gdGhpcy5pc29tZXRyaWNDb29yZCh4ICsgMSwgLXkgKyAxLCB6ICsgMCk7XG5cdFx0dGhpcy5jdHgubGluZVRvKGNvb3JkLngsIGNvb3JkLnkpO1xuXG5cdFx0Y29vcmQgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHggKyAxLCAteSArIDEsIHogKyAxKTtcblx0XHR0aGlzLmN0eC5saW5lVG8oY29vcmQueCwgY29vcmQueSk7XG5cblx0XHRjb29yZCA9IHRoaXMuaXNvbWV0cmljQ29vcmQoeCArIDAsIC15ICsgMSwgeiArIDEpO1xuXHRcdHRoaXMuY3R4LmxpbmVUbyhjb29yZC54LCBjb29yZC55KTtcblxuXHRcdGNvb3JkID0gdGhpcy5pc29tZXRyaWNDb29yZCh4ICsgMCwgLXkgKyAwLCB6ICsgMSk7XG5cdFx0dGhpcy5jdHgubGluZVRvKGNvb3JkLngsIGNvb3JkLnkpO1xuXG5cdFx0dGhpcy5jdHguZmlsbCgpO1xuXHRcdHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuXG5cdFx0Y29vcmQgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHggKyAwLCAteSArIDAsIHogKyAwKTtcblx0XHR0aGlzLmN0eC5tb3ZlVG8oY29vcmQueCwgY29vcmQueSk7XG5cblx0XHRjb29yZCA9IHRoaXMuaXNvbWV0cmljQ29vcmQoeCArIDEsIC15ICsgMCwgeiArIDApO1xuXHRcdHRoaXMuY3R4LmxpbmVUbyhjb29yZC54LCBjb29yZC55KTtcblxuXHRcdGNvb3JkID0gdGhpcy5pc29tZXRyaWNDb29yZCh4ICsgMSwgLXkgKyAwLCB6ICsgMSk7XG5cdFx0dGhpcy5jdHgubGluZVRvKGNvb3JkLngsIGNvb3JkLnkpO1xuXG5cdFx0Y29vcmQgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHggKyAwLCAteSArIDAsIHogKyAxKTtcblx0XHR0aGlzLmN0eC5saW5lVG8oY29vcmQueCwgY29vcmQueSk7XG5cblx0XHRjb29yZCA9IHRoaXMuaXNvbWV0cmljQ29vcmQoeCArIDEsIC15ICsgMCwgeiArIDEpO1xuXHRcdHRoaXMuY3R4Lm1vdmVUbyhjb29yZC54LCBjb29yZC55KTtcblxuXHRcdGNvb3JkID0gdGhpcy5pc29tZXRyaWNDb29yZCh4ICsgMSwgLXkgKyAxLCB6ICsgMSk7XG5cdFx0dGhpcy5jdHgubGluZVRvKGNvb3JkLngsIGNvb3JkLnkpO1xuXG5cdFx0dGhpcy5jdHguY2xvc2VQYXRoKCk7XG5cdFx0dGhpcy5jdHguc3Ryb2tlKCk7XG5cdH1cbn1cblxuIiwiaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4vVmVjdG9yM1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFuc2Zvcm0ge1xuXHRwdWJsaWMgcG9zaXRpb246IFZlY3RvcjM7XG5cdHB1YmxpYyBhbmdsZTogVmVjdG9yMztcblx0cHVibGljIHNjYWxlOiBWZWN0b3IzO1xuXG5cdGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IzID0gVmVjdG9yMy56ZXJvKCksIGFuZ2xlOiBWZWN0b3IzID0gVmVjdG9yMy56ZXJvKCksIHNjYWxlOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMSwgMSwgMSkpIHtcblx0XHR0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG5cdFx0dGhpcy5hbmdsZSA9IGFuZ2xlO1xuXHRcdHRoaXMuc2NhbGUgPSBzY2FsZTtcblx0fVxuXG5cdHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcblx0XHR0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoeCwgeSwgeik7XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjMge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyLCBwdWJsaWMgejogbnVtYmVyKSB7IH1cblxuXHRzdGF0aWMgemVybygpIHtcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XG5cdH1cbn1cbiIsImV4cG9ydCBjb25zdCBNQVBfSEVJR0hUID0gMTY7XG5leHBvcnQgY29uc3QgQ0hVTktfU0laRSA9IDE2O1xuZXhwb3J0IGNvbnN0IE1BUF9TSVpFID0gMjtcblxuZXhwb3J0IGNvbnN0IE5PSVNFX0NPVU5UID0gNDtcblxuZXhwb3J0IGNvbnN0IFNDQUxFID0gMTY7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xuXG5jb25zdCBnYW1lID0gbmV3IEdhbWUoJ2NhbnZhcycpO1xuXG5mdW5jdGlvbiB0aWNrKCkge1xuXHRnYW1lLmRyYXcoKTtcblxuXHRnYW1lLnJlbmRlcmVyLnRyYW5zZm9ybS5hbmdsZS55ID0gTWF0aC5zaW4oKyhuZXcgRGF0ZSgpKSAvIDUwMDApICogMzAgKiBNYXRoLlBJIC8gMTgwICsgNDUgKiBNYXRoLlBJIC8gMTgwO1xuXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9