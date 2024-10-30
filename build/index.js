/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Block.ts":
/*!**********************!*\
  !*** ./src/Block.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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
/* harmony import */ var _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./glMatrix/gl-matrix */ "./src/glMatrix/gl-matrix.js");
/* harmony import */ var _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Keyboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Keyboard */ "./src/Keyboard.ts");








class Game {
    canvas;
    renderer;
    chunks;
    camera;
    keyboard;
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.renderer = new _Renderer__WEBPACK_IMPORTED_MODULE_3__["default"](this.canvas);
        this.chunks = this.generateChunks();
        this.keyboard = new _Keyboard__WEBPACK_IMPORTED_MODULE_7__["default"]();
        this.camera = new _Transform__WEBPACK_IMPORTED_MODULE_4__["default"](new _Vector3__WEBPACK_IMPORTED_MODULE_5__["default"](-_config__WEBPACK_IMPORTED_MODULE_2__.MAP_SIZE * _config__WEBPACK_IMPORTED_MODULE_2__.CHUNK_SIZE / 2, -_config__WEBPACK_IMPORTED_MODULE_2__.MAP_HEIGHT, -_config__WEBPACK_IMPORTED_MODULE_2__.MAP_SIZE * _config__WEBPACK_IMPORTED_MODULE_2__.CHUNK_SIZE / 2));
        this.canvas.addEventListener("click", () => {
            this.canvas.requestPointerLock();
        });
        this.canvas.addEventListener("mousemove", event => {
            this.camera.angle.y += event.movementX / 500;
            this.camera.angle.x += event.movementY / 500;
        });
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
        if (this.keyboard.isKeyPressed("w")) {
            this.camera.position.x += Math.sin(-this.camera.angle.y) / 5;
            this.camera.position.z += Math.cos(-this.camera.angle.y) / 5;
        }
        if (this.keyboard.isKeyPressed("s")) {
            this.camera.position.x -= Math.sin(-this.camera.angle.y) / 5;
            this.camera.position.z -= Math.cos(-this.camera.angle.y) / 5;
        }
        if (this.keyboard.isKeyPressed("a")) {
            this.camera.position.x += Math.sin(-this.camera.angle.y + Math.PI / 2) / 5;
            this.camera.position.z += Math.cos(-this.camera.angle.y + Math.PI / 2) / 5;
        }
        if (this.keyboard.isKeyPressed("d")) {
            this.camera.position.x -= Math.sin(-this.camera.angle.y + Math.PI / 2) / 5;
            this.camera.position.z -= Math.cos(-this.camera.angle.y + Math.PI / 2) / 5;
        }
        if (this.keyboard.isKeyPressed("Shift")) {
            this.camera.position.y += 0.2;
        }
        if (this.keyboard.isKeyPressed(" ")) {
            this.camera.position.y -= 0.2;
        }
        this.renderer.clearScreen();
        this.renderer.modelMatrix = _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_6__.mat4.create();
        _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_6__.mat4.identity(this.renderer.modelMatrix);
        _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_6__.mat4.rotate(this.renderer.modelMatrix, this.renderer.modelMatrix, this.camera.angle.x, [1, 0, 0]);
        _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_6__.mat4.rotate(this.renderer.modelMatrix, this.renderer.modelMatrix, this.camera.angle.y, [0, 1, 0]);
        _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_6__.mat4.translate(this.renderer.modelMatrix, this.renderer.modelMatrix, [
            this.camera.position.x,
            this.camera.position.y,
            this.camera.position.z
        ]);
        for (const chunk of this.chunks) {
            for (let block_x = 0; block_x < _config__WEBPACK_IMPORTED_MODULE_2__.CHUNK_SIZE; block_x++) {
                for (let block_z = 0; block_z < _config__WEBPACK_IMPORTED_MODULE_2__.CHUNK_SIZE; block_z++) {
                    for (let block_y = 0; block_y < _config__WEBPACK_IMPORTED_MODULE_2__.MAP_HEIGHT; block_y++) {
                        const block = chunk.data[block_x][block_z][block_y];
                        let opened = true;
                        // if (block_x == 0 || block_y == 0 || block_z == 0) {
                        // 	opened = true;
                        // }
                        // if (block_x == CHUNK_SIZE - 1 || block_y == MAP_HEIGHT - 1 || block_z == CHUNK_SIZE - 1) {
                        // 	opened = true;
                        // }
                        // if (!opened) {
                        // 	if (chunk.data[block_x + 1][block_z][block_y].type != BlockType.SOLID) {
                        // 		opened = true;
                        // 	} else if (chunk.data[block_x - 1][block_z][block_y].type != BlockType.SOLID) {
                        // 		opened = true;
                        // 	} else if (chunk.data[block_x][block_z + 1][block_y].type != BlockType.SOLID) {
                        // 		opened = true;
                        // 	} else if (chunk.data[block_x][block_z - 1][block_y].type != BlockType.SOLID) {
                        // 		opened = true;
                        // 	} else if (chunk.data[block_x][block_z][block_y + 1].type != BlockType.SOLID) {
                        // 		opened = true;
                        // 	} else if (chunk.data[block_x][block_z][block_y + 1].type != BlockType.SOLID) {
                        // 		opened = true;
                        // 	}
                        // }
                        if (opened && block.type === _Block__WEBPACK_IMPORTED_MODULE_0__.BlockType.SOLID) {
                            const transform = new _Transform__WEBPACK_IMPORTED_MODULE_4__["default"](new _Vector3__WEBPACK_IMPORTED_MODULE_5__["default"](chunk.transform.position.x + block_x, block_y, chunk.transform.position.z + block_z));
                            // switch (block.type) {
                            // 	case BlockType.SOLID:
                            // 		this.renderer.changeColor(`rgb(
                            // 			${Math.floor(255 * (block_y / MAP_HEIGHT))},
                            // 			${Math.floor(255 * (block_y / MAP_HEIGHT))},
                            // 			${Math.floor(255 * (block_y / MAP_HEIGHT))}
                            // 		)`);
                            // 		break;
                            // 	case BlockType.CAVE:
                            // 		this.renderer.changeColor(`rgba(0, 0, 0, 0.5)`);
                            // 		break;
                            // }
                            this.renderer.drawCube(transform);
                        }
                    }
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/Keyboard.ts":
/*!*************************!*\
  !*** ./src/Keyboard.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keyboard)
/* harmony export */ });
class Keyboard {
    keys;
    constructor() {
        this.keys = new Set();
        // Инициализация событий нажатия клавиш
        document.addEventListener('keydown', (event) => {
            this.keys.add(event.key);
        });
        // Инициализация событий отпускания клавиш
        document.addEventListener('keyup', (event) => {
            this.keys.delete(event.key);
        });
    }
    isKeyPressed(key) {
        return this.keys.has(key);
    }
}


/***/ }),

/***/ "./src/Randomizer.ts":
/*!***************************!*\
  !*** ./src/Randomizer.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./glMatrix/gl-matrix */ "./src/glMatrix/gl-matrix.js");
/* harmony import */ var _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0__);

class Renderer {
    gl;
    vertexShader;
    fragmentShader;
    program;
    modelMatrix;
    perspectiveMatrix;
    positionAttribute;
    offsetUniform;
    modelUniform;
    perspectiveUniform;
    constructor(canvas) {
        this.gl = canvas.getContext('webgl');
        this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, `
			attribute vec4 a_position;

			uniform vec3 u_offset;

			uniform mat4 u_model_matrix;
			uniform mat4 u_perspective_matrix;

			varying vec4 v_position;

			void main() {
				gl_Position = u_perspective_matrix * u_model_matrix * (a_position + vec4(u_offset, 0));

				v_position = a_position;
			}
		`);
        this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, `
			precision mediump float;

			varying vec4 v_position;

			void main() {
				float factor = 1.2 - 1. / length(v_position);
				gl_FragColor = vec4(vec3(1, 0, 0.5) * factor, 1);
			}
		`);
        this.program = this.createProgram(this.vertexShader, this.fragmentShader);
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.modelMatrix = _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.create();
        this.perspectiveMatrix = _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.create();
        _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.perspective(this.perspectiveMatrix, 1.04, this.gl.canvas.width / this.gl.canvas.height, 0.1, 1000.0);
        _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.identity(this.modelMatrix);
        _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.translate(this.modelMatrix, this.modelMatrix, [0, -64, 0]);
        _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_0__.mat4.rotate(this.modelMatrix, this.modelMatrix, Math.PI / 4 + Math.PI / 2, [0, 1, 0]);
        const cube = getCube();
        this.gl.useProgram(this.program);
        const verticesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, verticesBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(cube.vertices), this.gl.STATIC_DRAW);
        const indicesBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cube.indices), this.gl.STATIC_DRAW);
        this.positionAttribute = this.gl.getAttribLocation(this.program, 'a_position');
        this.offsetUniform = this.gl.getUniformLocation(this.program, 'u_offset');
        this.modelUniform = this.gl.getUniformLocation(this.program, 'u_model_matrix');
        this.perspectiveUniform = this.gl.getUniformLocation(this.program, 'u_perspective_matrix');
        this.gl.enableVertexAttribArray(this.positionAttribute);
        this.gl.vertexAttribPointer(this.positionAttribute, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
    }
    changeColor(color) {
        //
    }
    drawCube(transform) {
        const cube = getCube();
        this.gl.uniform3fv(this.offsetUniform, [transform.position.x, transform.position.y, transform.position.z]);
        this.gl.uniformMatrix4fv(this.modelUniform, false, this.modelMatrix);
        this.gl.uniformMatrix4fv(this.perspectiveUniform, false, this.perspectiveMatrix);
        this.gl.drawElements(this.gl.TRIANGLES, cube.indices.length, this.gl.UNSIGNED_SHORT, 0);
    }
    clearScreen() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        console.log(this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        throw new Error("Ошибка при инициализации шейдера");
    }
    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            return program;
        }
        console.log(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
        throw new Error("Ошибка при инициализации программы");
    }
}
function getCube() {
    const vertices = [
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
    ];
    const indices = [
        // лицевая часть
        2, 1, 0,
        0, 3, 2,
        // //нижняя часть
        0, 4, 7,
        7, 3, 0,
        // // левая боковая часть
        0, 1, 5,
        5, 4, 0,
        // // правая боковая часть
        2, 3, 7,
        7, 6, 2,
        // // верхняя часть
        6, 1, 2,
        6, 5, 1,
        // // задняя часть
        4, 5, 6,
        6, 7, 4,
    ];
    return {
        vertices,
        indices
    };
}


/***/ }),

/***/ "./src/Transform.ts":
/*!**************************!*\
  !*** ./src/Transform.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHUNK_SIZE: () => (/* binding */ CHUNK_SIZE),
/* harmony export */   MAP_HEIGHT: () => (/* binding */ MAP_HEIGHT),
/* harmony export */   MAP_SIZE: () => (/* binding */ MAP_SIZE),
/* harmony export */   NOISE_COUNT: () => (/* binding */ NOISE_COUNT)
/* harmony export */ });
const MAP_HEIGHT = 64;
const CHUNK_SIZE = 16;
const MAP_SIZE = 2;
const NOISE_COUNT = 8;


/***/ }),

/***/ "./src/glMatrix/gl-matrix.js":
/*!***********************************!*\
  !*** ./src/glMatrix/gl-matrix.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports) {


/*!
@fileoverview gl-matrix - High performance matrix and vector operations
@author Brandon Jones
@author Colin MacKenzie IV
@version 3.4.0

Copyright (c) 2015-2021, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
(function (global, factory) {
   true ? factory(exports) :
  0;
})(this, (function (exports) { 'use strict';

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== "undefined" ? Float32Array : Array;
  var RANDOM = Math.random;
  var ANGLE_ORDER = "zyx";
  /**
   * Sets the type of array used when creating new vectors and matrices
   *
   * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
   */

  function setMatrixArrayType(type) {
    ARRAY_TYPE = type;
  }
  var degree = Math.PI / 180;
  /**
   * Convert Degree To Radian
   *
   * @param {Number} a Angle in Degrees
   */

  function toRadian(a) {
    return a * degree;
  }
  /**
   * Tests whether or not the arguments have approximately the same value, within an absolute
   * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less
   * than or equal to 1.0, and a relative tolerance is used for larger values)
   *
   * @param {Number} a The first number to test.
   * @param {Number} b The second number to test.
   * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
   */

  function equals$9(a, b) {
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b));
  }
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
        i = arguments.length;

    while (i--) {
      y += arguments[i] * arguments[i];
    }

    return Math.sqrt(y);
  };

  var common = /*#__PURE__*/Object.freeze({
    __proto__: null,
    EPSILON: EPSILON,
    get ARRAY_TYPE () { return ARRAY_TYPE; },
    RANDOM: RANDOM,
    ANGLE_ORDER: ANGLE_ORDER,
    setMatrixArrayType: setMatrixArrayType,
    toRadian: toRadian,
    equals: equals$9
  });

  /**
   * 2x2 Matrix
   * @module mat2
   */

  /**
   * Creates a new identity mat2
   *
   * @returns {mat2} a new 2x2 matrix
   */

  function create$8() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
    }

    out[0] = 1;
    out[3] = 1;
    return out;
  }
  /**
   * Creates a new mat2 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat2} a matrix to clone
   * @returns {mat2} a new 2x2 matrix
   */

  function clone$8(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Copy the values from one mat2 to another
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the source matrix
   * @returns {mat2} out
   */

  function copy$8(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Set a mat2 to the identity matrix
   *
   * @param {mat2} out the receiving matrix
   * @returns {mat2} out
   */

  function identity$5(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  /**
   * Create a new mat2 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out A new 2x2 matrix
   */

  function fromValues$8(m00, m01, m10, m11) {
    var out = new ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
  }
  /**
   * Set the components of a mat2 to the given values
   *
   * @param {mat2} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m10 Component in column 1, row 0 position (index 2)
   * @param {Number} m11 Component in column 1, row 1 position (index 3)
   * @returns {mat2} out
   */

  function set$8(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
  }
  /**
   * Transpose the values of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the source matrix
   * @returns {mat2} out
   */

  function transpose$2(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache
    // some values
    if (out === a) {
      var a1 = a[1];
      out[1] = a[2];
      out[2] = a1;
    } else {
      out[0] = a[0];
      out[1] = a[2];
      out[2] = a[1];
      out[3] = a[3];
    }

    return out;
  }
  /**
   * Inverts a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the source matrix
   * @returns {mat2} out
   */

  function invert$5(out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3]; // Calculate the determinant

    var det = a0 * a3 - a2 * a1;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] = a0 * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat2
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the source matrix
   * @returns {mat2} out
   */

  function adjoint$2(out, a) {
    // Caching this value is necessary if out == a
    var a0 = a[0];
    out[0] = a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a0;
    return out;
  }
  /**
   * Calculates the determinant of a mat2
   *
   * @param {ReadonlyMat2} a the source matrix
   * @returns {Number} determinant of a
   */

  function determinant$3(a) {
    return a[0] * a[3] - a[2] * a[1];
  }
  /**
   * Multiplies two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the first operand
   * @param {ReadonlyMat2} b the second operand
   * @returns {mat2} out
   */

  function multiply$8(out, a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
  }
  /**
   * Rotates a mat2 by the given angle
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */

  function rotate$4(out, a, rad) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
  }
  /**
   * Scales the mat2 by the dimensions in the given vec2
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the matrix to rotate
   * @param {ReadonlyVec2} v the vec2 to scale the matrix by
   * @returns {mat2} out
   **/

  function scale$8(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.rotate(dest, dest, rad);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2} out
   */

  function fromRotation$4(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2.identity(dest);
   *     mat2.scale(dest, dest, vec);
   *
   * @param {mat2} out mat2 receiving operation result
   * @param {ReadonlyVec2} v Scaling vector
   * @returns {mat2} out
   */

  function fromScaling$3(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
  }
  /**
   * Returns a string representation of a mat2
   *
   * @param {ReadonlyMat2} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */

  function str$8(a) {
    return "mat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  /**
   * Returns Frobenius norm of a mat2
   *
   * @param {ReadonlyMat2} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */

  function frob$3(a) {
    return Math.hypot(a[0], a[1], a[2], a[3]);
  }
  /**
   * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
   * @param {ReadonlyMat2} L the lower triangular matrix
   * @param {ReadonlyMat2} D the diagonal matrix
   * @param {ReadonlyMat2} U the upper triangular matrix
   * @param {ReadonlyMat2} a the input matrix to factorize
   */

  function LDU(L, D, U, a) {
    L[2] = a[2] / a[0];
    U[0] = a[0];
    U[1] = a[1];
    U[3] = a[3] - L[2] * U[1];
    return [L, D, U];
  }
  /**
   * Adds two mat2's
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the first operand
   * @param {ReadonlyMat2} b the second operand
   * @returns {mat2} out
   */

  function add$8(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the first operand
   * @param {ReadonlyMat2} b the second operand
   * @returns {mat2} out
   */

  function subtract$6(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat2} a The first matrix.
   * @param {ReadonlyMat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function exactEquals$8(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat2} a The first matrix.
   * @param {ReadonlyMat2} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function equals$8(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2} out the receiving matrix
   * @param {ReadonlyMat2} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2} out
   */

  function multiplyScalar$3(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  /**
   * Adds two mat2's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2} out the receiving vector
   * @param {ReadonlyMat2} a the first operand
   * @param {ReadonlyMat2} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2} out
   */

  function multiplyScalarAndAdd$3(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
  }
  /**
   * Alias for {@link mat2.multiply}
   * @function
   */

  var mul$8 = multiply$8;
  /**
   * Alias for {@link mat2.subtract}
   * @function
   */

  var sub$6 = subtract$6;

  var mat2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$8,
    clone: clone$8,
    copy: copy$8,
    identity: identity$5,
    fromValues: fromValues$8,
    set: set$8,
    transpose: transpose$2,
    invert: invert$5,
    adjoint: adjoint$2,
    determinant: determinant$3,
    multiply: multiply$8,
    rotate: rotate$4,
    scale: scale$8,
    fromRotation: fromRotation$4,
    fromScaling: fromScaling$3,
    str: str$8,
    frob: frob$3,
    LDU: LDU,
    add: add$8,
    subtract: subtract$6,
    exactEquals: exactEquals$8,
    equals: equals$8,
    multiplyScalar: multiplyScalar$3,
    multiplyScalarAndAdd: multiplyScalarAndAdd$3,
    mul: mul$8,
    sub: sub$6
  });

  /**
   * 2x3 Matrix
   * @module mat2d
   * @description
   * A mat2d contains six elements defined as:
   * <pre>
   * [a, b,
   *  c, d,
   *  tx, ty]
   * </pre>
   * This is a short form for the 3x3 matrix:
   * <pre>
   * [a, b, 0,
   *  c, d, 0,
   *  tx, ty, 1]
   * </pre>
   * The last column is ignored so the array is shorter and operations are faster.
   */

  /**
   * Creates a new identity mat2d
   *
   * @returns {mat2d} a new 2x3 matrix
   */

  function create$7() {
    var out = new ARRAY_TYPE(6);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[4] = 0;
      out[5] = 0;
    }

    out[0] = 1;
    out[3] = 1;
    return out;
  }
  /**
   * Creates a new mat2d initialized with values from an existing matrix
   *
   * @param {ReadonlyMat2d} a matrix to clone
   * @returns {mat2d} a new 2x3 matrix
   */

  function clone$7(a) {
    var out = new ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
  }
  /**
   * Copy the values from one mat2d to another
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the source matrix
   * @returns {mat2d} out
   */

  function copy$7(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
  }
  /**
   * Set a mat2d to the identity matrix
   *
   * @param {mat2d} out the receiving matrix
   * @returns {mat2d} out
   */

  function identity$4(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Create a new mat2d with the given values
   *
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} A new mat2d
   */

  function fromValues$7(a, b, c, d, tx, ty) {
    var out = new ARRAY_TYPE(6);
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }
  /**
   * Set the components of a mat2d to the given values
   *
   * @param {mat2d} out the receiving matrix
   * @param {Number} a Component A (index 0)
   * @param {Number} b Component B (index 1)
   * @param {Number} c Component C (index 2)
   * @param {Number} d Component D (index 3)
   * @param {Number} tx Component TX (index 4)
   * @param {Number} ty Component TY (index 5)
   * @returns {mat2d} out
   */

  function set$7(out, a, b, c, d, tx, ty) {
    out[0] = a;
    out[1] = b;
    out[2] = c;
    out[3] = d;
    out[4] = tx;
    out[5] = ty;
    return out;
  }
  /**
   * Inverts a mat2d
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the source matrix
   * @returns {mat2d} out
   */

  function invert$4(out, a) {
    var aa = a[0],
        ab = a[1],
        ac = a[2],
        ad = a[3];
    var atx = a[4],
        aty = a[5];
    var det = aa * ad - ab * ac;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
  }
  /**
   * Calculates the determinant of a mat2d
   *
   * @param {ReadonlyMat2d} a the source matrix
   * @returns {Number} determinant of a
   */

  function determinant$2(a) {
    return a[0] * a[3] - a[1] * a[2];
  }
  /**
   * Multiplies two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the first operand
   * @param {ReadonlyMat2d} b the second operand
   * @returns {mat2d} out
   */

  function multiply$7(out, a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
  }
  /**
   * Rotates a mat2d by the given angle
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */

  function rotate$3(out, a, rad) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    out[0] = a0 * c + a2 * s;
    out[1] = a1 * c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
  }
  /**
   * Scales the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to translate
   * @param {ReadonlyVec2} v the vec2 to scale the matrix by
   * @returns {mat2d} out
   **/

  function scale$7(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
  }
  /**
   * Translates the mat2d by the dimensions in the given vec2
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to translate
   * @param {ReadonlyVec2} v the vec2 to translate the matrix by
   * @returns {mat2d} out
   **/

  function translate$3(out, a, v) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var v0 = v[0],
        v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.rotate(dest, dest, rad);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat2d} out
   */

  function fromRotation$3(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.scale(dest, dest, vec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {ReadonlyVec2} v Scaling vector
   * @returns {mat2d} out
   */

  function fromScaling$2(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    out[4] = 0;
    out[5] = 0;
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat2d.identity(dest);
   *     mat2d.translate(dest, dest, vec);
   *
   * @param {mat2d} out mat2d receiving operation result
   * @param {ReadonlyVec2} v Translation vector
   * @returns {mat2d} out
   */

  function fromTranslation$3(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = v[0];
    out[5] = v[1];
    return out;
  }
  /**
   * Returns a string representation of a mat2d
   *
   * @param {ReadonlyMat2d} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */

  function str$7(a) {
    return "mat2d(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ")";
  }
  /**
   * Returns Frobenius norm of a mat2d
   *
   * @param {ReadonlyMat2d} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */

  function frob$2(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], 1);
  }
  /**
   * Adds two mat2d's
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the first operand
   * @param {ReadonlyMat2d} b the second operand
   * @returns {mat2d} out
   */

  function add$7(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the first operand
   * @param {ReadonlyMat2d} b the second operand
   * @returns {mat2d} out
   */

  function subtract$5(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat2d} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat2d} out
   */

  function multiplyScalar$2(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    return out;
  }
  /**
   * Adds two mat2d's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat2d} out the receiving vector
   * @param {ReadonlyMat2d} a the first operand
   * @param {ReadonlyMat2d} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat2d} out
   */

  function multiplyScalarAndAdd$2(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat2d} a The first matrix.
   * @param {ReadonlyMat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function exactEquals$7(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat2d} a The first matrix.
   * @param {ReadonlyMat2d} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function equals$7(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5));
  }
  /**
   * Alias for {@link mat2d.multiply}
   * @function
   */

  var mul$7 = multiply$7;
  /**
   * Alias for {@link mat2d.subtract}
   * @function
   */

  var sub$5 = subtract$5;

  var mat2d = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$7,
    clone: clone$7,
    copy: copy$7,
    identity: identity$4,
    fromValues: fromValues$7,
    set: set$7,
    invert: invert$4,
    determinant: determinant$2,
    multiply: multiply$7,
    rotate: rotate$3,
    scale: scale$7,
    translate: translate$3,
    fromRotation: fromRotation$3,
    fromScaling: fromScaling$2,
    fromTranslation: fromTranslation$3,
    str: str$7,
    frob: frob$2,
    add: add$7,
    subtract: subtract$5,
    multiplyScalar: multiplyScalar$2,
    multiplyScalarAndAdd: multiplyScalarAndAdd$2,
    exactEquals: exactEquals$7,
    equals: equals$7,
    mul: mul$7,
    sub: sub$5
  });

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */

  function create$6() {
    var out = new ARRAY_TYPE(9);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Copies the upper-left 3x3 values into the given mat3.
   *
   * @param {mat3} out the receiving 3x3 matrix
   * @param {ReadonlyMat4} a   the source 4x4 matrix
   * @returns {mat3} out
   */

  function fromMat4$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
  }
  /**
   * Creates a new mat3 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat3} a matrix to clone
   * @returns {mat3} a new 3x3 matrix
   */

  function clone$6(a) {
    var out = new ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Copy the values from one mat3 to another
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the source matrix
   * @returns {mat3} out
   */

  function copy$6(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Create a new mat3 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} A new mat3
   */

  function fromValues$6(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  /**
   * Set the components of a mat3 to the given values
   *
   * @param {mat3} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m10 Component in column 1, row 0 position (index 3)
   * @param {Number} m11 Component in column 1, row 1 position (index 4)
   * @param {Number} m12 Component in column 1, row 2 position (index 5)
   * @param {Number} m20 Component in column 2, row 0 position (index 6)
   * @param {Number} m21 Component in column 2, row 1 position (index 7)
   * @param {Number} m22 Component in column 2, row 2 position (index 8)
   * @returns {mat3} out
   */

  function set$6(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
  }
  /**
   * Set a mat3 to the identity matrix
   *
   * @param {mat3} out the receiving matrix
   * @returns {mat3} out
   */

  function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Transpose the values of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the source matrix
   * @returns {mat3} out
   */

  function transpose$1(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      var a01 = a[1],
          a02 = a[2],
          a12 = a[5];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a01;
      out[5] = a[7];
      out[6] = a02;
      out[7] = a12;
    } else {
      out[0] = a[0];
      out[1] = a[3];
      out[2] = a[6];
      out[3] = a[1];
      out[4] = a[4];
      out[5] = a[7];
      out[6] = a[2];
      out[7] = a[5];
      out[8] = a[8];
    }

    return out;
  }
  /**
   * Inverts a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the source matrix
   * @returns {mat3} out
   */

  function invert$3(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    var b01 = a22 * a11 - a12 * a21;
    var b11 = -a22 * a10 + a12 * a20;
    var b21 = a21 * a10 - a11 * a20; // Calculate the determinant

    var det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the source matrix
   * @returns {mat3} out
   */

  function adjoint$1(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    out[0] = a11 * a22 - a12 * a21;
    out[1] = a02 * a21 - a01 * a22;
    out[2] = a01 * a12 - a02 * a11;
    out[3] = a12 * a20 - a10 * a22;
    out[4] = a00 * a22 - a02 * a20;
    out[5] = a02 * a10 - a00 * a12;
    out[6] = a10 * a21 - a11 * a20;
    out[7] = a01 * a20 - a00 * a21;
    out[8] = a00 * a11 - a01 * a10;
    return out;
  }
  /**
   * Calculates the determinant of a mat3
   *
   * @param {ReadonlyMat3} a the source matrix
   * @returns {Number} determinant of a
   */

  function determinant$1(a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
  }
  /**
   * Multiplies two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @returns {mat3} out
   */

  function multiply$6(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    var a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    var a20 = a[6],
        a21 = a[7],
        a22 = a[8];
    var b00 = b[0],
        b01 = b[1],
        b02 = b[2];
    var b10 = b[3],
        b11 = b[4],
        b12 = b[5];
    var b20 = b[6],
        b21 = b[7],
        b22 = b[8];
    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;
    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;
    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
  }
  /**
   * Translate a mat3 by the given vector
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the matrix to translate
   * @param {ReadonlyVec2} v vector to translate by
   * @returns {mat3} out
   */

  function translate$2(out, a, v) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        x = v[0],
        y = v[1];
    out[0] = a00;
    out[1] = a01;
    out[2] = a02;
    out[3] = a10;
    out[4] = a11;
    out[5] = a12;
    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
  }
  /**
   * Rotates a mat3 by the given angle
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */

  function rotate$2(out, a, rad) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;
    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;
    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
  }
  /**
   * Scales the mat3 by the dimensions in the given vec2
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the matrix to rotate
   * @param {ReadonlyVec2} v the vec2 to scale the matrix by
   * @returns {mat3} out
   **/

  function scale$6(out, a, v) {
    var x = v[0],
        y = v[1];
    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];
    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.translate(dest, dest, vec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyVec2} v Translation vector
   * @returns {mat3} out
   */

  function fromTranslation$2(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.rotate(dest, dest, rad);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat3} out
   */

  function fromRotation$2(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = -s;
    out[4] = c;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat3.identity(dest);
   *     mat3.scale(dest, dest, vec);
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyVec2} v Scaling vector
   * @returns {mat3} out
   */

  function fromScaling$1(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
  }
  /**
   * Copies the values from a mat2d into a mat3
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat2d} a the matrix to copy
   * @returns {mat3} out
   **/

  function fromMat2d(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;
    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;
    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
  }
  /**
   * Calculates a 3x3 matrix from the given quaternion
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyQuat} q Quaternion to create matrix from
   *
   * @returns {mat3} out
   */

  function fromQuat$1(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;
    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;
    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;
    return out;
  }
  /**
   * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
   *
   * @param {mat3} out mat3 receiving operation result
   * @param {ReadonlyMat4} a Mat4 to derive the normal matrix from
   *
   * @returns {mat3} out
   */

  function normalFromMat4(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    return out;
  }
  /**
   * Generates a 2D projection matrix with the given bounds
   *
   * @param {mat3} out mat3 frustum matrix will be written into
   * @param {number} width Width of your gl context
   * @param {number} height Height of gl context
   * @returns {mat3} out
   */

  function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
  }
  /**
   * Returns a string representation of a mat3
   *
   * @param {ReadonlyMat3} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */

  function str$6(a) {
    return "mat3(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ")";
  }
  /**
   * Returns Frobenius norm of a mat3
   *
   * @param {ReadonlyMat3} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */

  function frob$1(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8]);
  }
  /**
   * Adds two mat3's
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @returns {mat3} out
   */

  function add$6(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @returns {mat3} out
   */

  function subtract$4(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat3} out the receiving matrix
   * @param {ReadonlyMat3} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat3} out
   */

  function multiplyScalar$1(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
  }
  /**
   * Adds two mat3's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat3} out the receiving vector
   * @param {ReadonlyMat3} a the first operand
   * @param {ReadonlyMat3} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat3} out
   */

  function multiplyScalarAndAdd$1(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat3} a The first matrix.
   * @param {ReadonlyMat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function exactEquals$6(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat3} a The first matrix.
   * @param {ReadonlyMat3} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function equals$6(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7],
        a8 = a[8];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7],
        b8 = b[8];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8));
  }
  /**
   * Alias for {@link mat3.multiply}
   * @function
   */

  var mul$6 = multiply$6;
  /**
   * Alias for {@link mat3.subtract}
   * @function
   */

  var sub$4 = subtract$4;

  var mat3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$6,
    fromMat4: fromMat4$1,
    clone: clone$6,
    copy: copy$6,
    fromValues: fromValues$6,
    set: set$6,
    identity: identity$3,
    transpose: transpose$1,
    invert: invert$3,
    adjoint: adjoint$1,
    determinant: determinant$1,
    multiply: multiply$6,
    translate: translate$2,
    rotate: rotate$2,
    scale: scale$6,
    fromTranslation: fromTranslation$2,
    fromRotation: fromRotation$2,
    fromScaling: fromScaling$1,
    fromMat2d: fromMat2d,
    fromQuat: fromQuat$1,
    normalFromMat4: normalFromMat4,
    projection: projection,
    str: str$6,
    frob: frob$1,
    add: add$6,
    subtract: subtract$4,
    multiplyScalar: multiplyScalar$1,
    multiplyScalarAndAdd: multiplyScalarAndAdd$1,
    exactEquals: exactEquals$6,
    equals: equals$6,
    mul: mul$6,
    sub: sub$4
  });

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$5() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {ReadonlyMat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */

  function clone$5(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Copy the values from one mat4 to another
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function copy$5(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Create a new mat4 with the given values
   *
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} A new mat4
   */

  function fromValues$5(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  /**
   * Set the components of a mat4 to the given values
   *
   * @param {mat4} out the receiving matrix
   * @param {Number} m00 Component in column 0, row 0 position (index 0)
   * @param {Number} m01 Component in column 0, row 1 position (index 1)
   * @param {Number} m02 Component in column 0, row 2 position (index 2)
   * @param {Number} m03 Component in column 0, row 3 position (index 3)
   * @param {Number} m10 Component in column 1, row 0 position (index 4)
   * @param {Number} m11 Component in column 1, row 1 position (index 5)
   * @param {Number} m12 Component in column 1, row 2 position (index 6)
   * @param {Number} m13 Component in column 1, row 3 position (index 7)
   * @param {Number} m20 Component in column 2, row 0 position (index 8)
   * @param {Number} m21 Component in column 2, row 1 position (index 9)
   * @param {Number} m22 Component in column 2, row 2 position (index 10)
   * @param {Number} m23 Component in column 2, row 3 position (index 11)
   * @param {Number} m30 Component in column 3, row 0 position (index 12)
   * @param {Number} m31 Component in column 3, row 1 position (index 13)
   * @param {Number} m32 Component in column 3, row 2 position (index 14)
   * @param {Number} m33 Component in column 3, row 3 position (index 15)
   * @returns {mat4} out
   */

  function set$5(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */

  function identity$2(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Transpose the values of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
      var a01 = a[1],
          a02 = a[2],
          a03 = a[3];
      var a12 = a[6],
          a13 = a[7];
      var a23 = a[11];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a01;
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a02;
      out[9] = a12;
      out[11] = a[14];
      out[12] = a03;
      out[13] = a13;
      out[14] = a23;
    } else {
      out[0] = a[0];
      out[1] = a[4];
      out[2] = a[8];
      out[3] = a[12];
      out[4] = a[1];
      out[5] = a[5];
      out[6] = a[9];
      out[7] = a[13];
      out[8] = a[2];
      out[9] = a[6];
      out[10] = a[10];
      out[11] = a[14];
      out[12] = a[3];
      out[13] = a[7];
      out[14] = a[11];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Inverts a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function invert$2(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32; // Calculate the determinant

    var det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
      return null;
    }

    det = 1.0 / det;
    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
    return out;
  }
  /**
   * Calculates the adjugate of a mat4
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the source matrix
   * @returns {mat4} out
   */

  function adjoint(out, a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b00 = a00 * a11 - a01 * a10;
    var b01 = a00 * a12 - a02 * a10;
    var b02 = a00 * a13 - a03 * a10;
    var b03 = a01 * a12 - a02 * a11;
    var b04 = a01 * a13 - a03 * a11;
    var b05 = a02 * a13 - a03 * a12;
    var b06 = a20 * a31 - a21 * a30;
    var b07 = a20 * a32 - a22 * a30;
    var b08 = a20 * a33 - a23 * a30;
    var b09 = a21 * a32 - a22 * a31;
    var b10 = a21 * a33 - a23 * a31;
    var b11 = a22 * a33 - a23 * a32;
    out[0] = a11 * b11 - a12 * b10 + a13 * b09;
    out[1] = a02 * b10 - a01 * b11 - a03 * b09;
    out[2] = a31 * b05 - a32 * b04 + a33 * b03;
    out[3] = a22 * b04 - a21 * b05 - a23 * b03;
    out[4] = a12 * b08 - a10 * b11 - a13 * b07;
    out[5] = a00 * b11 - a02 * b08 + a03 * b07;
    out[6] = a32 * b02 - a30 * b05 - a33 * b01;
    out[7] = a20 * b05 - a22 * b02 + a23 * b01;
    out[8] = a10 * b10 - a11 * b08 + a13 * b06;
    out[9] = a01 * b08 - a00 * b10 - a03 * b06;
    out[10] = a30 * b04 - a31 * b02 + a33 * b00;
    out[11] = a21 * b02 - a20 * b04 - a23 * b00;
    out[12] = a11 * b07 - a10 * b09 - a12 * b06;
    out[13] = a00 * b09 - a01 * b07 + a02 * b06;
    out[14] = a31 * b01 - a30 * b03 - a32 * b00;
    out[15] = a20 * b03 - a21 * b01 + a22 * b00;
    return out;
  }
  /**
   * Calculates the determinant of a mat4
   *
   * @param {ReadonlyMat4} a the source matrix
   * @returns {Number} determinant of a
   */

  function determinant(a) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];
    var b0 = a00 * a11 - a01 * a10;
    var b1 = a00 * a12 - a02 * a10;
    var b2 = a01 * a12 - a02 * a11;
    var b3 = a20 * a31 - a21 * a30;
    var b4 = a20 * a32 - a22 * a30;
    var b5 = a21 * a32 - a22 * a31;
    var b6 = a00 * b5 - a01 * b4 + a02 * b3;
    var b7 = a10 * b5 - a11 * b4 + a12 * b3;
    var b8 = a20 * b2 - a21 * b1 + a22 * b0;
    var b9 = a30 * b2 - a31 * b1 + a32 * b0; // Calculate the determinant

    return a13 * b6 - a03 * b7 + a33 * b8 - a23 * b9;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function multiply$5(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to translate
   * @param {ReadonlyVec3} v vector to translate by
   * @returns {mat4} out
   */

  function translate$1(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }
  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to scale
   * @param {ReadonlyVec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/

  function scale$5(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @returns {mat4} out
   */

  function rotate$1(out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;

    if (len < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11]; // Construct the elements of the rotation matrix

    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    return out;
  }
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateX$3(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[0] = a[0];
      out[1] = a[1];
      out[2] = a[2];
      out[3] = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateY$3(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a20 = a[8];
    var a21 = a[9];
    var a22 = a[10];
    var a23 = a[11];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged rows
      out[4] = a[4];
      out[5] = a[5];
      out[6] = a[6];
      out[7] = a[7];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
  }
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function rotateZ$3(out, a, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    var a00 = a[0];
    var a01 = a[1];
    var a02 = a[2];
    var a03 = a[3];
    var a10 = a[4];
    var a11 = a[5];
    var a12 = a[6];
    var a13 = a[7];

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[8] = a[8];
      out[9] = a[9];
      out[10] = a[10];
      out[11] = a[11];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    } // Perform axis-specific matrix multiplication


    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
  }
  /**
   * Creates a matrix from a vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyVec3} v Translation vector
   * @returns {mat4} out
   */

  function fromTranslation$1(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a vector scaling
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.scale(dest, dest, vec);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyVec3} v Scaling vector
   * @returns {mat4} out
   */

  function fromScaling(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a given angle around a given axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotate(dest, dest, rad, axis);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @returns {mat4} out
   */

  function fromRotation$1(out, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;

    if (len < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c; // Perform rotation-specific matrix multiplication

    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the X axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateX(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function fromXRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Y axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateY(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function fromYRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = c;
    out[1] = 0;
    out[2] = -s;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from the given angle around the Z axis
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.rotateZ(dest, dest, rad);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {Number} rad the angle to rotate the matrix by
   * @returns {mat4} out
   */

  function fromZRotation(out, rad) {
    var s = Math.sin(rad);
    var c = Math.cos(rad); // Perform axis-specific matrix multiplication

    out[0] = c;
    out[1] = s;
    out[2] = 0;
    out[3] = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @returns {mat4} out
   */

  function fromRotationTranslation$1(out, q, v) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 from a dual quat.
   *
   * @param {mat4} out Matrix
   * @param {ReadonlyQuat2} a Dual Quaternion
   * @returns {mat4} mat4 receiving operation result
   */

  function fromQuat2(out, a) {
    var translation = new ARRAY_TYPE(3);
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7];
    var magnitude = bx * bx + by * by + bz * bz + bw * bw; //Only scale if it makes sense

    if (magnitude > 0) {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2 / magnitude;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2 / magnitude;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2 / magnitude;
    } else {
      translation[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
      translation[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
      translation[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    }

    fromRotationTranslation$1(out, a, translation);
    return out;
  }
  /**
   * Returns the translation vector component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslation,
   *  the returned vector will be the same as the translation vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive translation component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */

  function getTranslation$1(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];
    return out;
  }
  /**
   * Returns the scaling factor component of a transformation
   *  matrix. If a matrix is built with fromRotationTranslationScale
   *  with a normalized Quaternion paramter, the returned vector will be
   *  the same as the scaling vector
   *  originally supplied.
   * @param  {vec3} out Vector to receive scaling factor component
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {vec3} out
   */

  function getScaling(out, mat) {
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);
    return out;
  }
  /**
   * Returns a quaternion representing the rotational component
   *  of a transformation matrix. If a matrix is built with
   *  fromRotationTranslation, the returned quaternion will be the
   *  same as the quaternion originally supplied.
   * @param {quat} out Quaternion to receive the rotation component
   * @param {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @return {quat} out
   */

  function getRotation(out, mat) {
    var scaling = new ARRAY_TYPE(3);
    getScaling(scaling, mat);
    var is1 = 1 / scaling[0];
    var is2 = 1 / scaling[1];
    var is3 = 1 / scaling[2];
    var sm11 = mat[0] * is1;
    var sm12 = mat[1] * is2;
    var sm13 = mat[2] * is3;
    var sm21 = mat[4] * is1;
    var sm22 = mat[5] * is2;
    var sm23 = mat[6] * is3;
    var sm31 = mat[8] * is1;
    var sm32 = mat[9] * is2;
    var sm33 = mat[10] * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out[3] = 0.25 * S;
      out[0] = (sm23 - sm32) / S;
      out[1] = (sm31 - sm13) / S;
      out[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out[3] = (sm23 - sm32) / S;
      out[0] = 0.25 * S;
      out[1] = (sm12 + sm21) / S;
      out[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out[3] = (sm31 - sm13) / S;
      out[0] = (sm12 + sm21) / S;
      out[1] = 0.25 * S;
      out[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out[3] = (sm12 - sm21) / S;
      out[0] = (sm31 + sm13) / S;
      out[1] = (sm23 + sm32) / S;
      out[2] = 0.25 * S;
    }

    return out;
  }
  /**
   * Decomposes a transformation matrix into its rotation, translation
   * and scale components. Returns only the rotation component
   * @param  {quat} out_r Quaternion to receive the rotation component
   * @param  {vec3} out_t Vector to receive the translation vector
   * @param  {vec3} out_s Vector to receive the scaling factor
   * @param  {ReadonlyMat4} mat Matrix to be decomposed (input)
   * @returns {quat} out_r
   */

  function decompose(out_r, out_t, out_s, mat) {
    out_t[0] = mat[12];
    out_t[1] = mat[13];
    out_t[2] = mat[14];
    var m11 = mat[0];
    var m12 = mat[1];
    var m13 = mat[2];
    var m21 = mat[4];
    var m22 = mat[5];
    var m23 = mat[6];
    var m31 = mat[8];
    var m32 = mat[9];
    var m33 = mat[10];
    out_s[0] = Math.hypot(m11, m12, m13);
    out_s[1] = Math.hypot(m21, m22, m23);
    out_s[2] = Math.hypot(m31, m32, m33);
    var is1 = 1 / out_s[0];
    var is2 = 1 / out_s[1];
    var is3 = 1 / out_s[2];
    var sm11 = m11 * is1;
    var sm12 = m12 * is2;
    var sm13 = m13 * is3;
    var sm21 = m21 * is1;
    var sm22 = m22 * is2;
    var sm23 = m23 * is3;
    var sm31 = m31 * is1;
    var sm32 = m32 * is2;
    var sm33 = m33 * is3;
    var trace = sm11 + sm22 + sm33;
    var S = 0;

    if (trace > 0) {
      S = Math.sqrt(trace + 1.0) * 2;
      out_r[3] = 0.25 * S;
      out_r[0] = (sm23 - sm32) / S;
      out_r[1] = (sm31 - sm13) / S;
      out_r[2] = (sm12 - sm21) / S;
    } else if (sm11 > sm22 && sm11 > sm33) {
      S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
      out_r[3] = (sm23 - sm32) / S;
      out_r[0] = 0.25 * S;
      out_r[1] = (sm12 + sm21) / S;
      out_r[2] = (sm31 + sm13) / S;
    } else if (sm22 > sm33) {
      S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
      out_r[3] = (sm31 - sm13) / S;
      out_r[0] = (sm12 + sm21) / S;
      out_r[1] = 0.25 * S;
      out_r[2] = (sm23 + sm32) / S;
    } else {
      S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
      out_r[3] = (sm12 - sm21) / S;
      out_r[0] = (sm31 + sm13) / S;
      out_r[1] = (sm23 + sm32) / S;
      out_r[2] = 0.25 * S;
    }

    return out_r;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @param {ReadonlyVec3} s Scaling vector
   * @returns {mat4} out
   */

  function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
  }
  /**
   * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     mat4.translate(dest, origin);
   *     let quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *     mat4.scale(dest, scale)
   *     mat4.translate(dest, negativeOrigin);
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {quat4} q Rotation quaternion
   * @param {ReadonlyVec3} v Translation vector
   * @param {ReadonlyVec3} s Scaling vector
   * @param {ReadonlyVec3} o The origin vector around which to scale and rotate
   * @returns {mat4} out
   */

  function fromRotationTranslationScaleOrigin(out, q, v, s, o) {
    // Quaternion math
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var xy = x * y2;
    var xz = x * z2;
    var yy = y * y2;
    var yz = y * z2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    var sx = s[0];
    var sy = s[1];
    var sz = s[2];
    var ox = o[0];
    var oy = o[1];
    var oz = o[2];
    var out0 = (1 - (yy + zz)) * sx;
    var out1 = (xy + wz) * sx;
    var out2 = (xz - wy) * sx;
    var out4 = (xy - wz) * sy;
    var out5 = (1 - (xx + zz)) * sy;
    var out6 = (yz + wx) * sy;
    var out8 = (xz + wy) * sz;
    var out9 = (yz - wx) * sz;
    var out10 = (1 - (xx + yy)) * sz;
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = 0;
    out[4] = out4;
    out[5] = out5;
    out[6] = out6;
    out[7] = 0;
    out[8] = out8;
    out[9] = out9;
    out[10] = out10;
    out[11] = 0;
    out[12] = v[0] + ox - (out0 * ox + out4 * oy + out8 * oz);
    out[13] = v[1] + oy - (out1 * ox + out5 * oy + out9 * oz);
    out[14] = v[2] + oz - (out2 * ox + out6 * oy + out10 * oz);
    out[15] = 1;
    return out;
  }
  /**
   * Calculates a 4x4 matrix from the given quaternion
   *
   * @param {mat4} out mat4 receiving operation result
   * @param {ReadonlyQuat} q Quaternion to create matrix from
   *
   * @returns {mat4} out
   */

  function fromQuat(out, q) {
    var x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    var x2 = x + x;
    var y2 = y + y;
    var z2 = z + z;
    var xx = x * x2;
    var yx = y * x2;
    var yy = y * y2;
    var zx = z * x2;
    var zy = z * y2;
    var zz = z * z2;
    var wx = w * x2;
    var wy = w * y2;
    var wz = w * z2;
    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;
    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;
    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a frustum matrix with the given bounds
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Number} left Left bound of the frustum
   * @param {Number} right Right bound of the frustum
   * @param {Number} bottom Bottom bound of the frustum
   * @param {Number} top Top bound of the frustum
   * @param {Number} near Near bound of the frustum
   * @param {Number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function frustum(out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left);
    var tb = 1 / (top - bottom);
    var nf = 1 / (near - far);
    out[0] = near * 2 * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = near * 2 * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = far * near * 2 * nf;
    out[15] = 0;
    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspectiveNO(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      var nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }
  /**
   * Alias for {@link mat4.perspectiveNO}
   * @function
   */

  var perspective = perspectiveNO;
  /**
   * Generates a perspective projection matrix suitable for WebGPU with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
   * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspectiveZO(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      var nf = 1 / (near - far);
      out[10] = far * nf;
      out[14] = far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -near;
    }

    return out;
  }
  /**
   * Generates a perspective projection matrix with the given field of view.
   * This is primarily useful for generating projection matrices to be used
   * with the still experiemental WebVR API.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function perspectiveFromFieldOfView(out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI / 180.0);
    var downTan = Math.tan(fov.downDegrees * Math.PI / 180.0);
    var leftTan = Math.tan(fov.leftDegrees * Math.PI / 180.0);
    var rightTan = Math.tan(fov.rightDegrees * Math.PI / 180.0);
    var xScale = 2.0 / (leftTan + rightTan);
    var yScale = 2.0 / (upTan + downTan);
    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = (upTan - downTan) * yScale * 0.5;
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = far * near / (near - far);
    out[15] = 0.0;
    return out;
  }
  /**
   * Generates a orthogonal projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
   * which matches WebGL/OpenGL's clip volume.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function orthoNO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Alias for {@link mat4.orthoNO}
   * @function
   */

  var ortho = orthoNO;
  /**
   * Generates a orthogonal projection matrix with the given bounds.
   * The near/far clip planes correspond to a normalized device coordinate Z range of [0, 1],
   * which matches WebGPU/Vulkan/DirectX/Metal's clip volume.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} left Left bound of the frustum
   * @param {number} right Right bound of the frustum
   * @param {number} bottom Bottom bound of the frustum
   * @param {number} top Top bound of the frustum
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum
   * @returns {mat4} out
   */

  function orthoZO(out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right);
    var bt = 1 / (bottom - top);
    var nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = near * nf;
    out[15] = 1;
    return out;
  }
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];

    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity$2(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);

    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);

    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }
  /**
   * Generates a matrix that makes something look at something else.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {ReadonlyVec3} eye Position of the viewer
   * @param {ReadonlyVec3} center Point the viewer is looking at
   * @param {ReadonlyVec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function targetTo(out, eye, target, up) {
    var eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2];
    var z0 = eyex - target[0],
        z1 = eyey - target[1],
        z2 = eyez - target[2];
    var len = z0 * z0 + z1 * z1 + z2 * z2;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      z0 *= len;
      z1 *= len;
      z2 *= len;
    }

    var x0 = upy * z2 - upz * z1,
        x1 = upz * z0 - upx * z2,
        x2 = upx * z1 - upy * z0;
    len = x0 * x0 + x1 * x1 + x2 * x2;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
  }
  /**
   * Returns a string representation of a mat4
   *
   * @param {ReadonlyMat4} a matrix to represent as a string
   * @returns {String} string representation of the matrix
   */

  function str$5(a) {
    return "mat4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + ")";
  }
  /**
   * Returns Frobenius norm of a mat4
   *
   * @param {ReadonlyMat4} a the matrix to calculate Frobenius norm of
   * @returns {Number} Frobenius norm
   */

  function frob(a) {
    return Math.hypot(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
  }
  /**
   * Adds two mat4's
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function add$5(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
  }
  /**
   * Subtracts matrix b from matrix a
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @returns {mat4} out
   */

  function subtract$3(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
  }
  /**
   * Multiply each element of the matrix by a scalar.
   *
   * @param {mat4} out the receiving matrix
   * @param {ReadonlyMat4} a the matrix to scale
   * @param {Number} b amount to scale the matrix's elements by
   * @returns {mat4} out
   */

  function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
  }
  /**
   * Adds two mat4's after multiplying each element of the second operand by a scalar value.
   *
   * @param {mat4} out the receiving vector
   * @param {ReadonlyMat4} a the first operand
   * @param {ReadonlyMat4} b the second operand
   * @param {Number} scale the amount to scale b's elements by before adding
   * @returns {mat4} out
   */

  function multiplyScalarAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    out[4] = a[4] + b[4] * scale;
    out[5] = a[5] + b[5] * scale;
    out[6] = a[6] + b[6] * scale;
    out[7] = a[7] + b[7] * scale;
    out[8] = a[8] + b[8] * scale;
    out[9] = a[9] + b[9] * scale;
    out[10] = a[10] + b[10] * scale;
    out[11] = a[11] + b[11] * scale;
    out[12] = a[12] + b[12] * scale;
    out[13] = a[13] + b[13] * scale;
    out[14] = a[14] + b[14] * scale;
    out[15] = a[15] + b[15] * scale;
    return out;
  }
  /**
   * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyMat4} a The first matrix.
   * @param {ReadonlyMat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function exactEquals$5(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] && a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
  }
  /**
   * Returns whether or not the matrices have approximately the same elements in the same position.
   *
   * @param {ReadonlyMat4} a The first matrix.
   * @param {ReadonlyMat4} b The second matrix.
   * @returns {Boolean} True if the matrices are equal, false otherwise.
   */

  function equals$5(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7];
    var a8 = a[8],
        a9 = a[9],
        a10 = a[10],
        a11 = a[11];
    var a12 = a[12],
        a13 = a[13],
        a14 = a[14],
        a15 = a[15];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    var b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7];
    var b8 = b[8],
        b9 = b[9],
        b10 = b[10],
        b11 = b[11];
    var b12 = b[12],
        b13 = b[13],
        b14 = b[14],
        b15 = b[15];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7)) && Math.abs(a8 - b8) <= EPSILON * Math.max(1.0, Math.abs(a8), Math.abs(b8)) && Math.abs(a9 - b9) <= EPSILON * Math.max(1.0, Math.abs(a9), Math.abs(b9)) && Math.abs(a10 - b10) <= EPSILON * Math.max(1.0, Math.abs(a10), Math.abs(b10)) && Math.abs(a11 - b11) <= EPSILON * Math.max(1.0, Math.abs(a11), Math.abs(b11)) && Math.abs(a12 - b12) <= EPSILON * Math.max(1.0, Math.abs(a12), Math.abs(b12)) && Math.abs(a13 - b13) <= EPSILON * Math.max(1.0, Math.abs(a13), Math.abs(b13)) && Math.abs(a14 - b14) <= EPSILON * Math.max(1.0, Math.abs(a14), Math.abs(b14)) && Math.abs(a15 - b15) <= EPSILON * Math.max(1.0, Math.abs(a15), Math.abs(b15));
  }
  /**
   * Alias for {@link mat4.multiply}
   * @function
   */

  var mul$5 = multiply$5;
  /**
   * Alias for {@link mat4.subtract}
   * @function
   */

  var sub$3 = subtract$3;

  var mat4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$5,
    clone: clone$5,
    copy: copy$5,
    fromValues: fromValues$5,
    set: set$5,
    identity: identity$2,
    transpose: transpose,
    invert: invert$2,
    adjoint: adjoint,
    determinant: determinant,
    multiply: multiply$5,
    translate: translate$1,
    scale: scale$5,
    rotate: rotate$1,
    rotateX: rotateX$3,
    rotateY: rotateY$3,
    rotateZ: rotateZ$3,
    fromTranslation: fromTranslation$1,
    fromScaling: fromScaling,
    fromRotation: fromRotation$1,
    fromXRotation: fromXRotation,
    fromYRotation: fromYRotation,
    fromZRotation: fromZRotation,
    fromRotationTranslation: fromRotationTranslation$1,
    fromQuat2: fromQuat2,
    getTranslation: getTranslation$1,
    getScaling: getScaling,
    getRotation: getRotation,
    decompose: decompose,
    fromRotationTranslationScale: fromRotationTranslationScale,
    fromRotationTranslationScaleOrigin: fromRotationTranslationScaleOrigin,
    fromQuat: fromQuat,
    frustum: frustum,
    perspectiveNO: perspectiveNO,
    perspective: perspective,
    perspectiveZO: perspectiveZO,
    perspectiveFromFieldOfView: perspectiveFromFieldOfView,
    orthoNO: orthoNO,
    ortho: ortho,
    orthoZO: orthoZO,
    lookAt: lookAt,
    targetTo: targetTo,
    str: str$5,
    frob: frob,
    add: add$5,
    subtract: subtract$3,
    multiplyScalar: multiplyScalar,
    multiplyScalarAndAdd: multiplyScalarAndAdd,
    exactEquals: exactEquals$5,
    equals: equals$5,
    mul: mul$5,
    sub: sub$3
  });

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$4() {
    var out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {ReadonlyVec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */

  function clone$4(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Calculates the length of a vec3
   *
   * @param {ReadonlyVec3} a vector to calculate length of
   * @returns {Number} length of a
   */

  function length$4(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */

  function fromValues$4(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Copy the values from one vec3 to another
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the source vector
   * @returns {vec3} out
   */

  function copy$4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */

  function set$4(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function add$4(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function subtract$2(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  /**
   * Multiplies two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function multiply$4(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
  }
  /**
   * Divides two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function divide$2(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
  }
  /**
   * Math.ceil the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to ceil
   * @returns {vec3} out
   */

  function ceil$2(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
  }
  /**
   * Math.floor the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to floor
   * @returns {vec3} out
   */

  function floor$2(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
  }
  /**
   * Returns the minimum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function min$2(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
  }
  /**
   * Returns the maximum of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function max$2(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
  }
  /**
   * Math.round the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to round
   * @returns {vec3} out
   */

  function round$2(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
  }
  /**
   * Scales a vec3 by a scalar number
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec3} out
   */

  function scale$4(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
  }
  /**
   * Adds two vec3's after scaling the second operand by a scalar value
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec3} out
   */

  function scaleAndAdd$2(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {Number} distance between a and b
   */

  function distance$2(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
  }
  /**
   * Calculates the squared euclidian distance between two vec3's
   *
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {Number} squared distance between a and b
   */

  function squaredDistance$2(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return x * x + y * y + z * z;
  }
  /**
   * Calculates the squared length of a vec3
   *
   * @param {ReadonlyVec3} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */

  function squaredLength$4(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return x * x + y * y + z * z;
  }
  /**
   * Negates the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to negate
   * @returns {vec3} out
   */

  function negate$2(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to invert
   * @returns {vec3} out
   */

  function inverse$2(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
  }
  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a vector to normalize
   * @returns {vec3} out
   */

  function normalize$4(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len = x * x + y * y + z * z;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec3's
   *
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot$4(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @returns {vec3} out
   */

  function cross$2(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    var bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */

  function lerp$4(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */

  function slerp$1(out, a, b, t) {
    var angle = Math.acos(Math.min(Math.max(dot$4(a, b), -1), 1));
    var sinTotal = Math.sin(angle);
    var ratioA = Math.sin((1 - t) * angle) / sinTotal;
    var ratioB = Math.sin(t * angle) / sinTotal;
    out[0] = ratioA * a[0] + ratioB * b[0];
    out[1] = ratioA * a[1] + ratioB * b[1];
    out[2] = ratioA * a[2] + ratioB * b[2];
    return out;
  }
  /**
   * Performs a hermite interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {ReadonlyVec3} c the third operand
   * @param {ReadonlyVec3} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */

  function hermite(out, a, b, c, d, t) {
    var factorTimes2 = t * t;
    var factor1 = factorTimes2 * (2 * t - 3) + 1;
    var factor2 = factorTimes2 * (t - 2) + t;
    var factor3 = factorTimes2 * (t - 1);
    var factor4 = factorTimes2 * (3 - 2 * t);
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  /**
   * Performs a bezier interpolation with two control points
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the first operand
   * @param {ReadonlyVec3} b the second operand
   * @param {ReadonlyVec3} c the third operand
   * @param {ReadonlyVec3} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */

  function bezier(out, a, b, c, d, t) {
    var inverseFactor = 1 - t;
    var inverseFactorTimesTwo = inverseFactor * inverseFactor;
    var factorTimes2 = t * t;
    var factor1 = inverseFactorTimesTwo * inverseFactor;
    var factor2 = 3 * t * inverseFactorTimesTwo;
    var factor3 = 3 * factorTimes2 * inverseFactor;
    var factor4 = factorTimes2 * t;
    out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
    out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
    out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec3} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
   * @returns {vec3} out
   */

  function random$3(out, scale) {
    scale = scale === undefined ? 1.0 : scale;
    var r = RANDOM() * 2.0 * Math.PI;
    var z = RANDOM() * 2.0 - 1.0;
    var zScale = Math.sqrt(1.0 - z * z) * scale;
    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
  }
  /**
   * Transforms the vec3 with a mat4.
   * 4th vector component is implicitly '1'
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec3} out
   */

  function transformMat4$2(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
  }
  /**
   * Transforms the vec3 with a mat3.
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to transform
   * @param {ReadonlyMat3} m the 3x3 matrix to transform with
   * @returns {vec3} out
   */

  function transformMat3$1(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
  }
  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec3} a the vector to transform
   * @param {ReadonlyQuat} q quaternion to transform with
   * @returns {vec3} out
   */

  function transformQuat$1(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];
    var x = a[0],
        y = a[1],
        z = a[2]; // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);

    var uvx = qy * z - qz * y,
        uvy = qz * x - qx * z,
        uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

    var uuvx = qy * uvz - qz * uvy,
        uuvy = qz * uvx - qx * uvz,
        uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2; // vec3.scale(uuv, uuv, 2);

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  /**
   * Rotate a 3D vector around the x-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */

  function rotateX$2(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0];
    r[1] = p[1] * Math.cos(rad) - p[2] * Math.sin(rad);
    r[2] = p[1] * Math.sin(rad) + p[2] * Math.cos(rad); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the y-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */

  function rotateY$2(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[2] * Math.sin(rad) + p[0] * Math.cos(rad);
    r[1] = p[1];
    r[2] = p[2] * Math.cos(rad) - p[0] * Math.sin(rad); //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Rotate a 3D vector around the z-axis
   * @param {vec3} out The receiving vec3
   * @param {ReadonlyVec3} a The vec3 point to rotate
   * @param {ReadonlyVec3} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec3} out
   */

  function rotateZ$2(out, a, b, rad) {
    var p = [],
        r = []; //Translate point to the origin

    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2]; //perform rotation

    r[0] = p[0] * Math.cos(rad) - p[1] * Math.sin(rad);
    r[1] = p[0] * Math.sin(rad) + p[1] * Math.cos(rad);
    r[2] = p[2]; //translate to correct position

    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];
    return out;
  }
  /**
   * Get the angle between two 3D vectors
   * @param {ReadonlyVec3} a The first operand
   * @param {ReadonlyVec3} b The second operand
   * @returns {Number} The angle in radians
   */

  function angle$1(a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        bx = b[0],
        by = b[1],
        bz = b[2],
        mag = Math.sqrt((ax * ax + ay * ay + az * az) * (bx * bx + by * by + bz * bz)),
        cosine = mag && dot$4(a, b) / mag;
    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  /**
   * Set the components of a vec3 to zero
   *
   * @param {vec3} out the receiving vector
   * @returns {vec3} out
   */

  function zero$2(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {ReadonlyVec3} a vector to represent as a string
   * @returns {String} string representation of the vector
   */

  function str$4(a) {
    return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
  }
  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyVec3} a The first vector.
   * @param {ReadonlyVec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  function exactEquals$4(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {ReadonlyVec3} a The first vector.
   * @param {ReadonlyVec3} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  function equals$4(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2));
  }
  /**
   * Alias for {@link vec3.subtract}
   * @function
   */

  var sub$2 = subtract$2;
  /**
   * Alias for {@link vec3.multiply}
   * @function
   */

  var mul$4 = multiply$4;
  /**
   * Alias for {@link vec3.divide}
   * @function
   */

  var div$2 = divide$2;
  /**
   * Alias for {@link vec3.distance}
   * @function
   */

  var dist$2 = distance$2;
  /**
   * Alias for {@link vec3.squaredDistance}
   * @function
   */

  var sqrDist$2 = squaredDistance$2;
  /**
   * Alias for {@link vec3.length}
   * @function
   */

  var len$4 = length$4;
  /**
   * Alias for {@link vec3.squaredLength}
   * @function
   */

  var sqrLen$4 = squaredLength$4;
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$2 = function () {
    var vec = create$4();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  var vec3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$4,
    clone: clone$4,
    length: length$4,
    fromValues: fromValues$4,
    copy: copy$4,
    set: set$4,
    add: add$4,
    subtract: subtract$2,
    multiply: multiply$4,
    divide: divide$2,
    ceil: ceil$2,
    floor: floor$2,
    min: min$2,
    max: max$2,
    round: round$2,
    scale: scale$4,
    scaleAndAdd: scaleAndAdd$2,
    distance: distance$2,
    squaredDistance: squaredDistance$2,
    squaredLength: squaredLength$4,
    negate: negate$2,
    inverse: inverse$2,
    normalize: normalize$4,
    dot: dot$4,
    cross: cross$2,
    lerp: lerp$4,
    slerp: slerp$1,
    hermite: hermite,
    bezier: bezier,
    random: random$3,
    transformMat4: transformMat4$2,
    transformMat3: transformMat3$1,
    transformQuat: transformQuat$1,
    rotateX: rotateX$2,
    rotateY: rotateY$2,
    rotateZ: rotateZ$2,
    angle: angle$1,
    zero: zero$2,
    str: str$4,
    exactEquals: exactEquals$4,
    equals: equals$4,
    sub: sub$2,
    mul: mul$4,
    div: div$2,
    dist: dist$2,
    sqrDist: sqrDist$2,
    len: len$4,
    sqrLen: sqrLen$4,
    forEach: forEach$2
  });

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$3() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @param {ReadonlyVec4} a vector to clone
   * @returns {vec4} a new 4D vector
   */

  function clone$3(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */

  function fromValues$3(x, y, z, w) {
    var out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the source vector
   * @returns {vec4} out
   */

  function copy$3(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Set the components of a vec4 to the given values
   *
   * @param {vec4} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} out
   */

  function set$3(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Adds two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */

  function add$3(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */

  function subtract$1(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
  }
  /**
   * Multiplies two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */

  function multiply$3(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
  }
  /**
   * Divides two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */

  function divide$1(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
  }
  /**
   * Math.ceil the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to ceil
   * @returns {vec4} out
   */

  function ceil$1(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    out[3] = Math.ceil(a[3]);
    return out;
  }
  /**
   * Math.floor the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to floor
   * @returns {vec4} out
   */

  function floor$1(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    out[3] = Math.floor(a[3]);
    return out;
  }
  /**
   * Returns the minimum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */

  function min$1(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
  }
  /**
   * Returns the maximum of two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {vec4} out
   */

  function max$1(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
  }
  /**
   * Math.round the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to round
   * @returns {vec4} out
   */

  function round$1(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    out[3] = Math.round(a[3]);
    return out;
  }
  /**
   * Scales a vec4 by a scalar number
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec4} out
   */

  function scale$3(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
  }
  /**
   * Adds two vec4's after scaling the second operand by a scalar value
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec4} out
   */

  function scaleAndAdd$1(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    out[2] = a[2] + b[2] * scale;
    out[3] = a[3] + b[3] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec4's
   *
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {Number} distance between a and b
   */

  function distance$1(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return Math.hypot(x, y, z, w);
  }
  /**
   * Calculates the squared euclidian distance between two vec4's
   *
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {Number} squared distance between a and b
   */

  function squaredDistance$1(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    var w = b[3] - a[3];
    return x * x + y * y + z * z + w * w;
  }
  /**
   * Calculates the length of a vec4
   *
   * @param {ReadonlyVec4} a vector to calculate length of
   * @returns {Number} length of a
   */

  function length$3(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return Math.hypot(x, y, z, w);
  }
  /**
   * Calculates the squared length of a vec4
   *
   * @param {ReadonlyVec4} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */

  function squaredLength$3(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    return x * x + y * y + z * z + w * w;
  }
  /**
   * Negates the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to negate
   * @returns {vec4} out
   */

  function negate$1(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to invert
   * @returns {vec4} out
   */

  function inverse$1(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    out[3] = 1.0 / a[3];
    return out;
  }
  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a vector to normalize
   * @returns {vec4} out
   */

  function normalize$3(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }

    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec4's
   *
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot$3(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }
  /**
   * Returns the cross-product of three vectors in a 4-dimensional space
   *
   * @param {ReadonlyVec4} result the receiving vector
   * @param {ReadonlyVec4} U the first vector
   * @param {ReadonlyVec4} V the second vector
   * @param {ReadonlyVec4} W the third vector
   * @returns {vec4} result
   */

  function cross$1(out, u, v, w) {
    var A = v[0] * w[1] - v[1] * w[0],
        B = v[0] * w[2] - v[2] * w[0],
        C = v[0] * w[3] - v[3] * w[0],
        D = v[1] * w[2] - v[2] * w[1],
        E = v[1] * w[3] - v[3] * w[1],
        F = v[2] * w[3] - v[3] * w[2];
    var G = u[0];
    var H = u[1];
    var I = u[2];
    var J = u[3];
    out[0] = H * F - I * E + J * D;
    out[1] = -(G * F) + I * C - J * B;
    out[2] = G * E - H * C + J * A;
    out[3] = -(G * D) + H * B - I * A;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the first operand
   * @param {ReadonlyVec4} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec4} out
   */

  function lerp$3(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec4} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
   * @returns {vec4} out
   */

  function random$2(out, scale) {
    scale = scale === undefined ? 1.0 : scale; // Marsaglia, George. Choosing a Point from the Surface of a
    // Sphere. Ann. Math. Statist. 43 (1972), no. 2, 645--646.
    // http://projecteuclid.org/euclid.aoms/1177692644;

    var v1, v2, v3, v4;
    var s1, s2;

    do {
      v1 = RANDOM() * 2 - 1;
      v2 = RANDOM() * 2 - 1;
      s1 = v1 * v1 + v2 * v2;
    } while (s1 >= 1);

    do {
      v3 = RANDOM() * 2 - 1;
      v4 = RANDOM() * 2 - 1;
      s2 = v3 * v3 + v4 * v4;
    } while (s2 >= 1);

    var d = Math.sqrt((1 - s1) / s2);
    out[0] = scale * v1;
    out[1] = scale * v2;
    out[2] = scale * v3 * d;
    out[3] = scale * v4 * d;
    return out;
  }
  /**
   * Transforms the vec4 with a mat4.
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec4} out
   */

  function transformMat4$1(out, a, m) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
  }
  /**
   * Transforms the vec4 with a quat
   *
   * @param {vec4} out the receiving vector
   * @param {ReadonlyVec4} a the vector to transform
   * @param {ReadonlyQuat} q quaternion to transform with
   * @returns {vec4} out
   */

  function transformQuat(out, a, q) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3]; // calculate quat * vec

    var ix = qw * x + qy * z - qz * y;
    var iy = qw * y + qz * x - qx * z;
    var iz = qw * z + qx * y - qy * x;
    var iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    out[3] = a[3];
    return out;
  }
  /**
   * Set the components of a vec4 to zero
   *
   * @param {vec4} out the receiving vector
   * @returns {vec4} out
   */

  function zero$1(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {ReadonlyVec4} a vector to represent as a string
   * @returns {String} string representation of the vector
   */

  function str$3(a) {
    return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  /**
   * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyVec4} a The first vector.
   * @param {ReadonlyVec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  function exactEquals$3(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {ReadonlyVec4} a The first vector.
   * @param {ReadonlyVec4} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  function equals$3(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
  }
  /**
   * Alias for {@link vec4.subtract}
   * @function
   */

  var sub$1 = subtract$1;
  /**
   * Alias for {@link vec4.multiply}
   * @function
   */

  var mul$3 = multiply$3;
  /**
   * Alias for {@link vec4.divide}
   * @function
   */

  var div$1 = divide$1;
  /**
   * Alias for {@link vec4.distance}
   * @function
   */

  var dist$1 = distance$1;
  /**
   * Alias for {@link vec4.squaredDistance}
   * @function
   */

  var sqrDist$1 = squaredDistance$1;
  /**
   * Alias for {@link vec4.length}
   * @function
   */

  var len$3 = length$3;
  /**
   * Alias for {@link vec4.squaredLength}
   * @function
   */

  var sqrLen$3 = squaredLength$3;
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$1 = function () {
    var vec = create$3();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  var vec4 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$3,
    clone: clone$3,
    fromValues: fromValues$3,
    copy: copy$3,
    set: set$3,
    add: add$3,
    subtract: subtract$1,
    multiply: multiply$3,
    divide: divide$1,
    ceil: ceil$1,
    floor: floor$1,
    min: min$1,
    max: max$1,
    round: round$1,
    scale: scale$3,
    scaleAndAdd: scaleAndAdd$1,
    distance: distance$1,
    squaredDistance: squaredDistance$1,
    length: length$3,
    squaredLength: squaredLength$3,
    negate: negate$1,
    inverse: inverse$1,
    normalize: normalize$3,
    dot: dot$3,
    cross: cross$1,
    lerp: lerp$3,
    random: random$2,
    transformMat4: transformMat4$1,
    transformQuat: transformQuat,
    zero: zero$1,
    str: str$3,
    exactEquals: exactEquals$3,
    equals: equals$3,
    sub: sub$1,
    mul: mul$3,
    div: div$1,
    dist: dist$1,
    sqrDist: sqrDist$1,
    len: len$3,
    sqrLen: sqrLen$3,
    forEach: forEach$1
  });

  /**
   * Quaternion in the format XYZW
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */

  function create$2() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    out[3] = 1;
    return out;
  }
  /**
   * Set a quat to the identity quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */

  function identity$1(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
  }
  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyVec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/

  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  /**
   * Gets the rotation axis and angle for a given
   *  quaternion. If a quaternion is created with
   *  setAxisAngle, this method will return the same
   *  values as providied in the original parameter list
   *  OR functionally equivalent values.
   * Example: The quaternion formed by axis [0, 0, 1] and
   *  angle -90 is the same as the quaternion formed by
   *  [0, 0, 1] and 270. This method favors the latter.
   * @param  {vec3} out_axis  Vector receiving the axis of rotation
   * @param  {ReadonlyQuat} q     Quaternion to be decomposed
   * @return {Number}     Angle, in radians, of the rotation
   */

  function getAxisAngle(out_axis, q) {
    var rad = Math.acos(q[3]) * 2.0;
    var s = Math.sin(rad / 2.0);

    if (s > EPSILON) {
      out_axis[0] = q[0] / s;
      out_axis[1] = q[1] / s;
      out_axis[2] = q[2] / s;
    } else {
      // If s is zero, return any axis (no rotation - axis does not matter)
      out_axis[0] = 1;
      out_axis[1] = 0;
      out_axis[2] = 0;
    }

    return rad;
  }
  /**
   * Gets the angular distance between two unit quaternions
   *
   * @param  {ReadonlyQuat} a     Origin unit quaternion
   * @param  {ReadonlyQuat} b     Destination unit quaternion
   * @return {Number}     Angle, in radians, between the two quaternions
   */

  function getAngle(a, b) {
    var dotproduct = dot$2(a, b);
    return Math.acos(2 * dotproduct * dotproduct - 1);
  }
  /**
   * Multiplies two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @returns {quat} out
   */

  function multiply$2(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the X axis
   *
   * @param {quat} out quat receiving operation result
   * @param {ReadonlyQuat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */

  function rotateX$1(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the Y axis
   *
   * @param {quat} out quat receiving operation result
   * @param {ReadonlyQuat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */

  function rotateY$1(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var by = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
  }
  /**
   * Rotates a quaternion by the given angle about the Z axis
   *
   * @param {quat} out quat receiving operation result
   * @param {ReadonlyQuat} a quat to rotate
   * @param {number} rad angle (in radians) to rotate
   * @returns {quat} out
   */

  function rotateZ$1(out, a, rad) {
    rad *= 0.5;
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bz = Math.sin(rad),
        bw = Math.cos(rad);
    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
  }
  /**
   * Calculates the W component of a quat from the X, Y, and Z components.
   * Assumes that quaternion is 1 unit in length.
   * Any existing W component will be ignored.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate W component of
   * @returns {quat} out
   */

  function calculateW(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
  }
  /**
   * Calculate the exponential of a unit quaternion.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate the exponential of
   * @returns {quat} out
   */

  function exp(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var et = Math.exp(w);
    var s = r > 0 ? et * Math.sin(r) / r : 0;
    out[0] = x * s;
    out[1] = y * s;
    out[2] = z * s;
    out[3] = et * Math.cos(r);
    return out;
  }
  /**
   * Calculate the natural logarithm of a unit quaternion.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate the exponential of
   * @returns {quat} out
   */

  function ln(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var r = Math.sqrt(x * x + y * y + z * z);
    var t = r > 0 ? Math.atan2(r, w) / r : 0;
    out[0] = x * t;
    out[1] = y * t;
    out[2] = z * t;
    out[3] = 0.5 * Math.log(x * x + y * y + z * z + w * w);
    return out;
  }
  /**
   * Calculate the scalar power of a unit quaternion.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate the exponential of
   * @param {Number} b amount to scale the quaternion by
   * @returns {quat} out
   */

  function pow(out, a, b) {
    ln(out, a);
    scale$2(out, out, b);
    exp(out, out);
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    var omega, cosom, sinom, scale0, scale1; // calc cosine

    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  /**
   * Generates a random unit quaternion
   *
   * @param {quat} out the receiving quaternion
   * @returns {quat} out
   */

  function random$1(out) {
    // Implementation of http://planning.cs.uiuc.edu/node198.html
    // TODO: Calling random 3 times is probably not the fastest solution
    var u1 = RANDOM();
    var u2 = RANDOM();
    var u3 = RANDOM();
    var sqrt1MinusU1 = Math.sqrt(1 - u1);
    var sqrtU1 = Math.sqrt(u1);
    out[0] = sqrt1MinusU1 * Math.sin(2.0 * Math.PI * u2);
    out[1] = sqrt1MinusU1 * Math.cos(2.0 * Math.PI * u2);
    out[2] = sqrtU1 * Math.sin(2.0 * Math.PI * u3);
    out[3] = sqrtU1 * Math.cos(2.0 * Math.PI * u3);
    return out;
  }
  /**
   * Calculates the inverse of a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate inverse of
   * @returns {quat} out
   */

  function invert$1(out, a) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    var dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    var invDot = dot ? 1.0 / dot : 0; // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
  }
  /**
   * Calculates the conjugate of a quat
   * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quat to calculate conjugate of
   * @returns {quat} out
   */

  function conjugate$1(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyMat3} m rotation matrix
   * @returns {quat} out
   * @function
   */

  function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w

      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)

      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      // |w| <= 1/2
      var i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
  }
  /**
   * Creates a quaternion from the given euler angle x, y, z using the provided intrinsic order for the conversion.
   *
   * @param {quat} out the receiving quaternion
   * @param {x} x Angle to rotate around X axis in degrees.
   * @param {y} y Angle to rotate around Y axis in degrees.
   * @param {z} z Angle to rotate around Z axis in degrees.
   * @param {'zyx'|'xyz'|'yxz'|'yzx'|'zxy'|'zyx'} order Intrinsic order for conversion, default is zyx.
   * @returns {quat} out
   * @function
   */

  function fromEuler(out, x, y, z) {
    var order = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ANGLE_ORDER;
    var halfToRad = Math.PI / 360;
    x *= halfToRad;
    z *= halfToRad;
    y *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);

    switch (order) {
      case "xyz":
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
        break;

      case "xzy":
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        break;

      case "yxz":
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        break;

      case "yzx":
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
        break;

      case "zxy":
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
        break;

      case "zyx":
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
        break;

      default:
        throw new Error('Unknown angle order ' + order);
    }

    return out;
  }
  /**
   * Returns a string representation of a quaternion
   *
   * @param {ReadonlyQuat} a vector to represent as a string
   * @returns {String} string representation of the vector
   */

  function str$2(a) {
    return "quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
  }
  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {ReadonlyQuat} a quaternion to clone
   * @returns {quat} a new quaternion
   * @function
   */

  var clone$2 = clone$3;
  /**
   * Creates a new quat initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} a new quaternion
   * @function
   */

  var fromValues$2 = fromValues$3;
  /**
   * Copy the values from one quat to another
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the source quaternion
   * @returns {quat} out
   * @function
   */

  var copy$2 = copy$3;
  /**
   * Set the components of a quat to the given values
   *
   * @param {quat} out the receiving quaternion
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {quat} out
   * @function
   */

  var set$2 = set$3;
  /**
   * Adds two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @returns {quat} out
   * @function
   */

  var add$2 = add$3;
  /**
   * Alias for {@link quat.multiply}
   * @function
   */

  var mul$2 = multiply$2;
  /**
   * Scales a quat by a scalar number
   *
   * @param {quat} out the receiving vector
   * @param {ReadonlyQuat} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {quat} out
   * @function
   */

  var scale$2 = scale$3;
  /**
   * Calculates the dot product of two quat's
   *
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */

  var dot$2 = dot$3;
  /**
   * Performs a linear interpolation between two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   * @function
   */

  var lerp$2 = lerp$3;
  /**
   * Calculates the length of a quat
   *
   * @param {ReadonlyQuat} a vector to calculate length of
   * @returns {Number} length of a
   */

  var length$2 = length$3;
  /**
   * Alias for {@link quat.length}
   * @function
   */

  var len$2 = length$2;
  /**
   * Calculates the squared length of a quat
   *
   * @param {ReadonlyQuat} a vector to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */

  var squaredLength$2 = squaredLength$3;
  /**
   * Alias for {@link quat.squaredLength}
   * @function
   */

  var sqrLen$2 = squaredLength$2;
  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */

  var normalize$2 = normalize$3;
  /**
   * Returns whether or not the quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyQuat} a The first quaternion.
   * @param {ReadonlyQuat} b The second quaternion.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  var exactEquals$2 = exactEquals$3;
  /**
   * Returns whether or not the quaternions point approximately to the same direction.
   *
   * Both quaternions are assumed to be unit length.
   *
   * @param {ReadonlyQuat} a The first unit quaternion.
   * @param {ReadonlyQuat} b The second unit quaternion.
   * @returns {Boolean} True if the quaternions are equal, false otherwise.
   */

  function equals$2(a, b) {
    return Math.abs(dot$3(a, b)) >= 1 - EPSILON;
  }
  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {ReadonlyVec3} a the initial vector
   * @param {ReadonlyVec3} b the destination vector
   * @returns {quat} out
   */

  var rotationTo = function () {
    var tmpvec3 = create$4();
    var xUnitVec3 = fromValues$4(1, 0, 0);
    var yUnitVec3 = fromValues$4(0, 1, 0);
    return function (out, a, b) {
      var dot = dot$4(a, b);

      if (dot < -0.999999) {
        cross$2(tmpvec3, xUnitVec3, a);
        if (len$4(tmpvec3) < 0.000001) cross$2(tmpvec3, yUnitVec3, a);
        normalize$4(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross$2(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot;
        return normalize$2(out, out);
      }
    };
  }();
  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {ReadonlyQuat} a the first operand
   * @param {ReadonlyQuat} b the second operand
   * @param {ReadonlyQuat} c the third operand
   * @param {ReadonlyQuat} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  var sqlerp = function () {
    var temp1 = create$2();
    var temp2 = create$2();
    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {ReadonlyVec3} view  the vector representing the viewing direction
   * @param {ReadonlyVec3} right the vector representing the local "right" direction
   * @param {ReadonlyVec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */

  var setAxes = function () {
    var matr = create$6();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize$2(out, fromMat3(out, matr));
    };
  }();

  var quat = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$2,
    identity: identity$1,
    setAxisAngle: setAxisAngle,
    getAxisAngle: getAxisAngle,
    getAngle: getAngle,
    multiply: multiply$2,
    rotateX: rotateX$1,
    rotateY: rotateY$1,
    rotateZ: rotateZ$1,
    calculateW: calculateW,
    exp: exp,
    ln: ln,
    pow: pow,
    slerp: slerp,
    random: random$1,
    invert: invert$1,
    conjugate: conjugate$1,
    fromMat3: fromMat3,
    fromEuler: fromEuler,
    str: str$2,
    clone: clone$2,
    fromValues: fromValues$2,
    copy: copy$2,
    set: set$2,
    add: add$2,
    mul: mul$2,
    scale: scale$2,
    dot: dot$2,
    lerp: lerp$2,
    length: length$2,
    len: len$2,
    squaredLength: squaredLength$2,
    sqrLen: sqrLen$2,
    normalize: normalize$2,
    exactEquals: exactEquals$2,
    equals: equals$2,
    rotationTo: rotationTo,
    sqlerp: sqlerp,
    setAxes: setAxes
  });

  /**
   * Dual Quaternion<br>
   * Format: [real, dual]<br>
   * Quaternion format: XYZW<br>
   * Make sure to have normalized dual quaternions, otherwise the functions may not work as intended.<br>
   * @module quat2
   */

  /**
   * Creates a new identity dual quat
   *
   * @returns {quat2} a new dual quaternion [real -> rotation, dual -> translation]
   */

  function create$1() {
    var dq = new ARRAY_TYPE(8);

    if (ARRAY_TYPE != Float32Array) {
      dq[0] = 0;
      dq[1] = 0;
      dq[2] = 0;
      dq[4] = 0;
      dq[5] = 0;
      dq[6] = 0;
      dq[7] = 0;
    }

    dq[3] = 1;
    return dq;
  }
  /**
   * Creates a new quat initialized with values from an existing quaternion
   *
   * @param {ReadonlyQuat2} a dual quaternion to clone
   * @returns {quat2} new dual quaternion
   * @function
   */

  function clone$1(a) {
    var dq = new ARRAY_TYPE(8);
    dq[0] = a[0];
    dq[1] = a[1];
    dq[2] = a[2];
    dq[3] = a[3];
    dq[4] = a[4];
    dq[5] = a[5];
    dq[6] = a[6];
    dq[7] = a[7];
    return dq;
  }
  /**
   * Creates a new dual quat initialized with the given values
   *
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component
   * @param {Number} y2 Y component
   * @param {Number} z2 Z component
   * @param {Number} w2 W component
   * @returns {quat2} new dual quaternion
   * @function
   */

  function fromValues$1(x1, y1, z1, w1, x2, y2, z2, w2) {
    var dq = new ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    dq[4] = x2;
    dq[5] = y2;
    dq[6] = z2;
    dq[7] = w2;
    return dq;
  }
  /**
   * Creates a new dual quat from the given values (quat and translation)
   *
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component (translation)
   * @param {Number} y2 Y component (translation)
   * @param {Number} z2 Z component (translation)
   * @returns {quat2} new dual quaternion
   * @function
   */

  function fromRotationTranslationValues(x1, y1, z1, w1, x2, y2, z2) {
    var dq = new ARRAY_TYPE(8);
    dq[0] = x1;
    dq[1] = y1;
    dq[2] = z1;
    dq[3] = w1;
    var ax = x2 * 0.5,
        ay = y2 * 0.5,
        az = z2 * 0.5;
    dq[4] = ax * w1 + ay * z1 - az * y1;
    dq[5] = ay * w1 + az * x1 - ax * z1;
    dq[6] = az * w1 + ax * y1 - ay * x1;
    dq[7] = -ax * x1 - ay * y1 - az * z1;
    return dq;
  }
  /**
   * Creates a dual quat from a quaternion and a translation
   *
   * @param {ReadonlyQuat2} dual quaternion receiving operation result
   * @param {ReadonlyQuat} q a normalized quaternion
   * @param {ReadonlyVec3} t translation vector
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */

  function fromRotationTranslation(out, q, t) {
    var ax = t[0] * 0.5,
        ay = t[1] * 0.5,
        az = t[2] * 0.5,
        bx = q[0],
        by = q[1],
        bz = q[2],
        bw = q[3];
    out[0] = bx;
    out[1] = by;
    out[2] = bz;
    out[3] = bw;
    out[4] = ax * bw + ay * bz - az * by;
    out[5] = ay * bw + az * bx - ax * bz;
    out[6] = az * bw + ax * by - ay * bx;
    out[7] = -ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Creates a dual quat from a translation
   *
   * @param {ReadonlyQuat2} dual quaternion receiving operation result
   * @param {ReadonlyVec3} t translation vector
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */

  function fromTranslation(out, t) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = t[0] * 0.5;
    out[5] = t[1] * 0.5;
    out[6] = t[2] * 0.5;
    out[7] = 0;
    return out;
  }
  /**
   * Creates a dual quat from a quaternion
   *
   * @param {ReadonlyQuat2} dual quaternion receiving operation result
   * @param {ReadonlyQuat} q the quaternion
   * @returns {quat2} dual quaternion receiving operation result
   * @function
   */

  function fromRotation(out, q) {
    out[0] = q[0];
    out[1] = q[1];
    out[2] = q[2];
    out[3] = q[3];
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
  }
  /**
   * Creates a new dual quat from a matrix (4x4)
   *
   * @param {quat2} out the dual quaternion
   * @param {ReadonlyMat4} a the matrix
   * @returns {quat2} dual quat receiving operation result
   * @function
   */

  function fromMat4(out, a) {
    //TODO Optimize this
    var outer = create$2();
    getRotation(outer, a);
    var t = new ARRAY_TYPE(3);
    getTranslation$1(t, a);
    fromRotationTranslation(out, outer, t);
    return out;
  }
  /**
   * Copy the values from one dual quat to another
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the source dual quaternion
   * @returns {quat2} out
   * @function
   */

  function copy$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    return out;
  }
  /**
   * Set a dual quat to the identity dual quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @returns {quat2} out
   */

  function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    return out;
  }
  /**
   * Set the components of a dual quat to the given values
   *
   * @param {quat2} out the receiving quaternion
   * @param {Number} x1 X component
   * @param {Number} y1 Y component
   * @param {Number} z1 Z component
   * @param {Number} w1 W component
   * @param {Number} x2 X component
   * @param {Number} y2 Y component
   * @param {Number} z2 Z component
   * @param {Number} w2 W component
   * @returns {quat2} out
   * @function
   */

  function set$1(out, x1, y1, z1, w1, x2, y2, z2, w2) {
    out[0] = x1;
    out[1] = y1;
    out[2] = z1;
    out[3] = w1;
    out[4] = x2;
    out[5] = y2;
    out[6] = z2;
    out[7] = w2;
    return out;
  }
  /**
   * Gets the real part of a dual quat
   * @param  {quat} out real part
   * @param  {ReadonlyQuat2} a Dual Quaternion
   * @return {quat} real part
   */

  var getReal = copy$2;
  /**
   * Gets the dual part of a dual quat
   * @param  {quat} out dual part
   * @param  {ReadonlyQuat2} a Dual Quaternion
   * @return {quat} dual part
   */

  function getDual(out, a) {
    out[0] = a[4];
    out[1] = a[5];
    out[2] = a[6];
    out[3] = a[7];
    return out;
  }
  /**
   * Set the real component of a dual quat to the given quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @param {ReadonlyQuat} q a quaternion representing the real part
   * @returns {quat2} out
   * @function
   */

  var setReal = copy$2;
  /**
   * Set the dual component of a dual quat to the given quaternion
   *
   * @param {quat2} out the receiving quaternion
   * @param {ReadonlyQuat} q a quaternion representing the dual part
   * @returns {quat2} out
   * @function
   */

  function setDual(out, q) {
    out[4] = q[0];
    out[5] = q[1];
    out[6] = q[2];
    out[7] = q[3];
    return out;
  }
  /**
   * Gets the translation of a normalized dual quat
   * @param  {vec3} out translation
   * @param  {ReadonlyQuat2} a Dual Quaternion to be decomposed
   * @return {vec3} translation
   */

  function getTranslation(out, a) {
    var ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3];
    out[0] = (ax * bw + aw * bx + ay * bz - az * by) * 2;
    out[1] = (ay * bw + aw * by + az * bx - ax * bz) * 2;
    out[2] = (az * bw + aw * bz + ax * by - ay * bx) * 2;
    return out;
  }
  /**
   * Translates a dual quat by the given vector
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to translate
   * @param {ReadonlyVec3} v vector to translate by
   * @returns {quat2} out
   */

  function translate(out, a, v) {
    var ax1 = a[0],
        ay1 = a[1],
        az1 = a[2],
        aw1 = a[3],
        bx1 = v[0] * 0.5,
        by1 = v[1] * 0.5,
        bz1 = v[2] * 0.5,
        ax2 = a[4],
        ay2 = a[5],
        az2 = a[6],
        aw2 = a[7];
    out[0] = ax1;
    out[1] = ay1;
    out[2] = az1;
    out[3] = aw1;
    out[4] = aw1 * bx1 + ay1 * bz1 - az1 * by1 + ax2;
    out[5] = aw1 * by1 + az1 * bx1 - ax1 * bz1 + ay2;
    out[6] = aw1 * bz1 + ax1 * by1 - ay1 * bx1 + az2;
    out[7] = -ax1 * bx1 - ay1 * by1 - az1 * bz1 + aw2;
    return out;
  }
  /**
   * Rotates a dual quat around the X axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */

  function rotateX(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateX$1(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat around the Y axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */

  function rotateY(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateY$1(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat around the Z axis
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {number} rad how far should the rotation be
   * @returns {quat2} out
   */

  function rotateZ(out, a, rad) {
    var bx = -a[0],
        by = -a[1],
        bz = -a[2],
        bw = a[3],
        ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7],
        ax1 = ax * bw + aw * bx + ay * bz - az * by,
        ay1 = ay * bw + aw * by + az * bx - ax * bz,
        az1 = az * bw + aw * bz + ax * by - ay * bx,
        aw1 = aw * bw - ax * bx - ay * by - az * bz;
    rotateZ$1(out, a, rad);
    bx = out[0];
    by = out[1];
    bz = out[2];
    bw = out[3];
    out[4] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[5] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[6] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[7] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    return out;
  }
  /**
   * Rotates a dual quat by a given quaternion (a * q)
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {ReadonlyQuat} q quaternion to rotate by
   * @returns {quat2} out
   */

  function rotateByQuatAppend(out, a, q) {
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax * qw + aw * qx + ay * qz - az * qy;
    out[1] = ay * qw + aw * qy + az * qx - ax * qz;
    out[2] = az * qw + aw * qz + ax * qy - ay * qx;
    out[3] = aw * qw - ax * qx - ay * qy - az * qz;
    ax = a[4];
    ay = a[5];
    az = a[6];
    aw = a[7];
    out[4] = ax * qw + aw * qx + ay * qz - az * qy;
    out[5] = ay * qw + aw * qy + az * qx - ax * qz;
    out[6] = az * qw + aw * qz + ax * qy - ay * qx;
    out[7] = aw * qw - ax * qx - ay * qy - az * qz;
    return out;
  }
  /**
   * Rotates a dual quat by a given quaternion (q * a)
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat} q quaternion to rotate by
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @returns {quat2} out
   */

  function rotateByQuatPrepend(out, q, a) {
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3],
        bx = a[0],
        by = a[1],
        bz = a[2],
        bw = a[3];
    out[0] = qx * bw + qw * bx + qy * bz - qz * by;
    out[1] = qy * bw + qw * by + qz * bx - qx * bz;
    out[2] = qz * bw + qw * bz + qx * by - qy * bx;
    out[3] = qw * bw - qx * bx - qy * by - qz * bz;
    bx = a[4];
    by = a[5];
    bz = a[6];
    bw = a[7];
    out[4] = qx * bw + qw * bx + qy * bz - qz * by;
    out[5] = qy * bw + qw * by + qz * bx - qx * bz;
    out[6] = qz * bw + qw * bz + qx * by - qy * bx;
    out[7] = qw * bw - qx * bx - qy * by - qz * bz;
    return out;
  }
  /**
   * Rotates a dual quat around a given axis. Does the normalisation automatically
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the dual quaternion to rotate
   * @param {ReadonlyVec3} axis the axis to rotate around
   * @param {Number} rad how far the rotation should be
   * @returns {quat2} out
   */

  function rotateAroundAxis(out, a, axis, rad) {
    //Special case for rad = 0
    if (Math.abs(rad) < EPSILON) {
      return copy$1(out, a);
    }

    var axisLength = Math.hypot(axis[0], axis[1], axis[2]);
    rad = rad * 0.5;
    var s = Math.sin(rad);
    var bx = s * axis[0] / axisLength;
    var by = s * axis[1] / axisLength;
    var bz = s * axis[2] / axisLength;
    var bw = Math.cos(rad);
    var ax1 = a[0],
        ay1 = a[1],
        az1 = a[2],
        aw1 = a[3];
    out[0] = ax1 * bw + aw1 * bx + ay1 * bz - az1 * by;
    out[1] = ay1 * bw + aw1 * by + az1 * bx - ax1 * bz;
    out[2] = az1 * bw + aw1 * bz + ax1 * by - ay1 * bx;
    out[3] = aw1 * bw - ax1 * bx - ay1 * by - az1 * bz;
    var ax = a[4],
        ay = a[5],
        az = a[6],
        aw = a[7];
    out[4] = ax * bw + aw * bx + ay * bz - az * by;
    out[5] = ay * bw + aw * by + az * bx - ax * bz;
    out[6] = az * bw + aw * bz + ax * by - ay * bx;
    out[7] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
  }
  /**
   * Adds two dual quat's
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the first operand
   * @param {ReadonlyQuat2} b the second operand
   * @returns {quat2} out
   * @function
   */

  function add$1(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    return out;
  }
  /**
   * Multiplies two dual quat's
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a the first operand
   * @param {ReadonlyQuat2} b the second operand
   * @returns {quat2} out
   */

  function multiply$1(out, a, b) {
    var ax0 = a[0],
        ay0 = a[1],
        az0 = a[2],
        aw0 = a[3],
        bx1 = b[4],
        by1 = b[5],
        bz1 = b[6],
        bw1 = b[7],
        ax1 = a[4],
        ay1 = a[5],
        az1 = a[6],
        aw1 = a[7],
        bx0 = b[0],
        by0 = b[1],
        bz0 = b[2],
        bw0 = b[3];
    out[0] = ax0 * bw0 + aw0 * bx0 + ay0 * bz0 - az0 * by0;
    out[1] = ay0 * bw0 + aw0 * by0 + az0 * bx0 - ax0 * bz0;
    out[2] = az0 * bw0 + aw0 * bz0 + ax0 * by0 - ay0 * bx0;
    out[3] = aw0 * bw0 - ax0 * bx0 - ay0 * by0 - az0 * bz0;
    out[4] = ax0 * bw1 + aw0 * bx1 + ay0 * bz1 - az0 * by1 + ax1 * bw0 + aw1 * bx0 + ay1 * bz0 - az1 * by0;
    out[5] = ay0 * bw1 + aw0 * by1 + az0 * bx1 - ax0 * bz1 + ay1 * bw0 + aw1 * by0 + az1 * bx0 - ax1 * bz0;
    out[6] = az0 * bw1 + aw0 * bz1 + ax0 * by1 - ay0 * bx1 + az1 * bw0 + aw1 * bz0 + ax1 * by0 - ay1 * bx0;
    out[7] = aw0 * bw1 - ax0 * bx1 - ay0 * by1 - az0 * bz1 + aw1 * bw0 - ax1 * bx0 - ay1 * by0 - az1 * bz0;
    return out;
  }
  /**
   * Alias for {@link quat2.multiply}
   * @function
   */

  var mul$1 = multiply$1;
  /**
   * Scales a dual quat by a scalar number
   *
   * @param {quat2} out the receiving dual quat
   * @param {ReadonlyQuat2} a the dual quat to scale
   * @param {Number} b amount to scale the dual quat by
   * @returns {quat2} out
   * @function
   */

  function scale$1(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    return out;
  }
  /**
   * Calculates the dot product of two dual quat's (The dot product of the real parts)
   *
   * @param {ReadonlyQuat2} a the first operand
   * @param {ReadonlyQuat2} b the second operand
   * @returns {Number} dot product of a and b
   * @function
   */

  var dot$1 = dot$2;
  /**
   * Performs a linear interpolation between two dual quats's
   * NOTE: The resulting dual quaternions won't always be normalized (The error is most noticeable when t = 0.5)
   *
   * @param {quat2} out the receiving dual quat
   * @param {ReadonlyQuat2} a the first operand
   * @param {ReadonlyQuat2} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat2} out
   */

  function lerp$1(out, a, b, t) {
    var mt = 1 - t;
    if (dot$1(a, b) < 0) t = -t;
    out[0] = a[0] * mt + b[0] * t;
    out[1] = a[1] * mt + b[1] * t;
    out[2] = a[2] * mt + b[2] * t;
    out[3] = a[3] * mt + b[3] * t;
    out[4] = a[4] * mt + b[4] * t;
    out[5] = a[5] * mt + b[5] * t;
    out[6] = a[6] * mt + b[6] * t;
    out[7] = a[7] * mt + b[7] * t;
    return out;
  }
  /**
   * Calculates the inverse of a dual quat. If they are normalized, conjugate is cheaper
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a dual quat to calculate inverse of
   * @returns {quat2} out
   */

  function invert(out, a) {
    var sqlen = squaredLength$1(a);
    out[0] = -a[0] / sqlen;
    out[1] = -a[1] / sqlen;
    out[2] = -a[2] / sqlen;
    out[3] = a[3] / sqlen;
    out[4] = -a[4] / sqlen;
    out[5] = -a[5] / sqlen;
    out[6] = -a[6] / sqlen;
    out[7] = a[7] / sqlen;
    return out;
  }
  /**
   * Calculates the conjugate of a dual quat
   * If the dual quaternion is normalized, this function is faster than quat2.inverse and produces the same result.
   *
   * @param {quat2} out the receiving quaternion
   * @param {ReadonlyQuat2} a quat to calculate conjugate of
   * @returns {quat2} out
   */

  function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    out[4] = -a[4];
    out[5] = -a[5];
    out[6] = -a[6];
    out[7] = a[7];
    return out;
  }
  /**
   * Calculates the length of a dual quat
   *
   * @param {ReadonlyQuat2} a dual quat to calculate length of
   * @returns {Number} length of a
   * @function
   */

  var length$1 = length$2;
  /**
   * Alias for {@link quat2.length}
   * @function
   */

  var len$1 = length$1;
  /**
   * Calculates the squared length of a dual quat
   *
   * @param {ReadonlyQuat2} a dual quat to calculate squared length of
   * @returns {Number} squared length of a
   * @function
   */

  var squaredLength$1 = squaredLength$2;
  /**
   * Alias for {@link quat2.squaredLength}
   * @function
   */

  var sqrLen$1 = squaredLength$1;
  /**
   * Normalize a dual quat
   *
   * @param {quat2} out the receiving dual quaternion
   * @param {ReadonlyQuat2} a dual quaternion to normalize
   * @returns {quat2} out
   * @function
   */

  function normalize$1(out, a) {
    var magnitude = squaredLength$1(a);

    if (magnitude > 0) {
      magnitude = Math.sqrt(magnitude);
      var a0 = a[0] / magnitude;
      var a1 = a[1] / magnitude;
      var a2 = a[2] / magnitude;
      var a3 = a[3] / magnitude;
      var b0 = a[4];
      var b1 = a[5];
      var b2 = a[6];
      var b3 = a[7];
      var a_dot_b = a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
      out[0] = a0;
      out[1] = a1;
      out[2] = a2;
      out[3] = a3;
      out[4] = (b0 - a0 * a_dot_b) / magnitude;
      out[5] = (b1 - a1 * a_dot_b) / magnitude;
      out[6] = (b2 - a2 * a_dot_b) / magnitude;
      out[7] = (b3 - a3 * a_dot_b) / magnitude;
    }

    return out;
  }
  /**
   * Returns a string representation of a dual quaternion
   *
   * @param {ReadonlyQuat2} a dual quaternion to represent as a string
   * @returns {String} string representation of the dual quat
   */

  function str$1(a) {
    return "quat2(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ")";
  }
  /**
   * Returns whether or not the dual quaternions have exactly the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyQuat2} a the first dual quaternion.
   * @param {ReadonlyQuat2} b the second dual quaternion.
   * @returns {Boolean} true if the dual quaternions are equal, false otherwise.
   */

  function exactEquals$1(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7];
  }
  /**
   * Returns whether or not the dual quaternions have approximately the same elements in the same position.
   *
   * @param {ReadonlyQuat2} a the first dual quat.
   * @param {ReadonlyQuat2} b the second dual quat.
   * @returns {Boolean} true if the dual quats are equal, false otherwise.
   */

  function equals$1(a, b) {
    var a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3],
        a4 = a[4],
        a5 = a[5],
        a6 = a[6],
        a7 = a[7];
    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3],
        b4 = b[4],
        b5 = b[5],
        b6 = b[6],
        b7 = b[7];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)) && Math.abs(a4 - b4) <= EPSILON * Math.max(1.0, Math.abs(a4), Math.abs(b4)) && Math.abs(a5 - b5) <= EPSILON * Math.max(1.0, Math.abs(a5), Math.abs(b5)) && Math.abs(a6 - b6) <= EPSILON * Math.max(1.0, Math.abs(a6), Math.abs(b6)) && Math.abs(a7 - b7) <= EPSILON * Math.max(1.0, Math.abs(a7), Math.abs(b7));
  }

  var quat2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create$1,
    clone: clone$1,
    fromValues: fromValues$1,
    fromRotationTranslationValues: fromRotationTranslationValues,
    fromRotationTranslation: fromRotationTranslation,
    fromTranslation: fromTranslation,
    fromRotation: fromRotation,
    fromMat4: fromMat4,
    copy: copy$1,
    identity: identity,
    set: set$1,
    getReal: getReal,
    getDual: getDual,
    setReal: setReal,
    setDual: setDual,
    getTranslation: getTranslation,
    translate: translate,
    rotateX: rotateX,
    rotateY: rotateY,
    rotateZ: rotateZ,
    rotateByQuatAppend: rotateByQuatAppend,
    rotateByQuatPrepend: rotateByQuatPrepend,
    rotateAroundAxis: rotateAroundAxis,
    add: add$1,
    multiply: multiply$1,
    mul: mul$1,
    scale: scale$1,
    dot: dot$1,
    lerp: lerp$1,
    invert: invert,
    conjugate: conjugate,
    length: length$1,
    len: len$1,
    squaredLength: squaredLength$1,
    sqrLen: sqrLen$1,
    normalize: normalize$1,
    str: str$1,
    exactEquals: exactEquals$1,
    equals: equals$1
  });

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */

  function create() {
    var out = new ARRAY_TYPE(2);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec2 initialized with values from an existing vector
   *
   * @param {ReadonlyVec2} a vector to clone
   * @returns {vec2} a new 2D vector
   */

  function clone(a) {
    var out = new ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  /**
   * Creates a new vec2 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} a new 2D vector
   */

  function fromValues(x, y) {
    var out = new ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Copy the values from one vec2 to another
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the source vector
   * @returns {vec2} out
   */

  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
  }
  /**
   * Set the components of a vec2 to the given values
   *
   * @param {vec2} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} out
   */

  function set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Adds two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */

  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
  }
  /**
   * Subtracts vector b from vector a
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */

  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
  }
  /**
   * Multiplies two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */

  function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
  }
  /**
   * Divides two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */

  function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
  }
  /**
   * Math.ceil the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to ceil
   * @returns {vec2} out
   */

  function ceil(out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
  }
  /**
   * Math.floor the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to floor
   * @returns {vec2} out
   */

  function floor(out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
  }
  /**
   * Returns the minimum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */

  function min(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
  }
  /**
   * Returns the maximum of two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec2} out
   */

  function max(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
  }
  /**
   * Math.round the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to round
   * @returns {vec2} out
   */

  function round(out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
  }
  /**
   * Scales a vec2 by a scalar number
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to scale
   * @param {Number} b amount to scale the vector by
   * @returns {vec2} out
   */

  function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
  }
  /**
   * Adds two vec2's after scaling the second operand by a scalar value
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @param {Number} scale the amount to scale b by before adding
   * @returns {vec2} out
   */

  function scaleAndAdd(out, a, b, scale) {
    out[0] = a[0] + b[0] * scale;
    out[1] = a[1] + b[1] * scale;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec2's
   *
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {Number} distance between a and b
   */

  function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.hypot(x, y);
  }
  /**
   * Calculates the squared euclidian distance between two vec2's
   *
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {Number} squared distance between a and b
   */

  function squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
  }
  /**
   * Calculates the length of a vec2
   *
   * @param {ReadonlyVec2} a vector to calculate length of
   * @returns {Number} length of a
   */

  function length(a) {
    var x = a[0],
        y = a[1];
    return Math.hypot(x, y);
  }
  /**
   * Calculates the squared length of a vec2
   *
   * @param {ReadonlyVec2} a vector to calculate squared length of
   * @returns {Number} squared length of a
   */

  function squaredLength(a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
  }
  /**
   * Negates the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to negate
   * @returns {vec2} out
   */

  function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
  }
  /**
   * Returns the inverse of the components of a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to invert
   * @returns {vec2} out
   */

  function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
  }
  /**
   * Normalize a vec2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a vector to normalize
   * @returns {vec2} out
   */

  function normalize(out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec2's
   *
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
  }
  /**
   * Computes the cross product of two vec2's
   * Note that the cross product must by definition produce a 3D vector
   *
   * @param {vec3} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @returns {vec3} out
   */

  function cross(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec2's
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the first operand
   * @param {ReadonlyVec2} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec2} out
   */

  function lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
  }
  /**
   * Generates a random vector with the given scale
   *
   * @param {vec2} out the receiving vector
   * @param {Number} [scale] Length of the resulting vector. If omitted, a unit vector will be returned
   * @returns {vec2} out
   */

  function random(out, scale) {
    scale = scale === undefined ? 1.0 : scale;
    var r = RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
  }
  /**
   * Transforms the vec2 with a mat2
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to transform
   * @param {ReadonlyMat2} m matrix to transform with
   * @returns {vec2} out
   */

  function transformMat2(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
  }
  /**
   * Transforms the vec2 with a mat2d
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to transform
   * @param {ReadonlyMat2d} m matrix to transform with
   * @returns {vec2} out
   */

  function transformMat2d(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
  }
  /**
   * Transforms the vec2 with a mat3
   * 3rd vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to transform
   * @param {ReadonlyMat3} m matrix to transform with
   * @returns {vec2} out
   */

  function transformMat3(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
  }
  /**
   * Transforms the vec2 with a mat4
   * 3rd vector component is implicitly '0'
   * 4th vector component is implicitly '1'
   *
   * @param {vec2} out the receiving vector
   * @param {ReadonlyVec2} a the vector to transform
   * @param {ReadonlyMat4} m matrix to transform with
   * @returns {vec2} out
   */

  function transformMat4(out, a, m) {
    var x = a[0];
    var y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
  }
  /**
   * Rotate a 2D vector
   * @param {vec2} out The receiving vec2
   * @param {ReadonlyVec2} a The vec2 point to rotate
   * @param {ReadonlyVec2} b The origin of the rotation
   * @param {Number} rad The angle of rotation in radians
   * @returns {vec2} out
   */

  function rotate(out, a, b, rad) {
    //Translate point to the origin
    var p0 = a[0] - b[0],
        p1 = a[1] - b[1],
        sinC = Math.sin(rad),
        cosC = Math.cos(rad); //perform rotation and translate to correct position

    out[0] = p0 * cosC - p1 * sinC + b[0];
    out[1] = p0 * sinC + p1 * cosC + b[1];
    return out;
  }
  /**
   * Get the angle between two 2D vectors
   * @param {ReadonlyVec2} a The first operand
   * @param {ReadonlyVec2} b The second operand
   * @returns {Number} The angle in radians
   */

  function angle(a, b) {
    var x1 = a[0],
        y1 = a[1],
        x2 = b[0],
        y2 = b[1],
        // mag is the product of the magnitudes of a and b
    mag = Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2)),
        // mag &&.. short circuits if mag == 0
    cosine = mag && (x1 * x2 + y1 * y2) / mag; // Math.min(Math.max(cosine, -1), 1) clamps the cosine between -1 and 1

    return Math.acos(Math.min(Math.max(cosine, -1), 1));
  }
  /**
   * Set the components of a vec2 to zero
   *
   * @param {vec2} out the receiving vector
   * @returns {vec2} out
   */

  function zero(out) {
    out[0] = 0.0;
    out[1] = 0.0;
    return out;
  }
  /**
   * Returns a string representation of a vector
   *
   * @param {ReadonlyVec2} a vector to represent as a string
   * @returns {String} string representation of the vector
   */

  function str(a) {
    return "vec2(" + a[0] + ", " + a[1] + ")";
  }
  /**
   * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
   *
   * @param {ReadonlyVec2} a The first vector.
   * @param {ReadonlyVec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
  }
  /**
   * Returns whether or not the vectors have approximately the same elements in the same position.
   *
   * @param {ReadonlyVec2} a The first vector.
   * @param {ReadonlyVec2} b The second vector.
   * @returns {Boolean} True if the vectors are equal, false otherwise.
   */

  function equals(a, b) {
    var a0 = a[0],
        a1 = a[1];
    var b0 = b[0],
        b1 = b[1];
    return Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1));
  }
  /**
   * Alias for {@link vec2.length}
   * @function
   */

  var len = length;
  /**
   * Alias for {@link vec2.subtract}
   * @function
   */

  var sub = subtract;
  /**
   * Alias for {@link vec2.multiply}
   * @function
   */

  var mul = multiply;
  /**
   * Alias for {@link vec2.divide}
   * @function
   */

  var div = divide;
  /**
   * Alias for {@link vec2.distance}
   * @function
   */

  var dist = distance;
  /**
   * Alias for {@link vec2.squaredDistance}
   * @function
   */

  var sqrDist = squaredDistance;
  /**
   * Alias for {@link vec2.squaredLength}
   * @function
   */

  var sqrLen = squaredLength;
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach = function () {
    var vec = create();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 2;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }

      return a;
    };
  }();

  var vec2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    create: create,
    clone: clone,
    fromValues: fromValues,
    copy: copy,
    set: set,
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    ceil: ceil,
    floor: floor,
    min: min,
    max: max,
    round: round,
    scale: scale,
    scaleAndAdd: scaleAndAdd,
    distance: distance,
    squaredDistance: squaredDistance,
    length: length,
    squaredLength: squaredLength,
    negate: negate,
    inverse: inverse,
    normalize: normalize,
    dot: dot,
    cross: cross,
    lerp: lerp,
    random: random,
    transformMat2: transformMat2,
    transformMat2d: transformMat2d,
    transformMat3: transformMat3,
    transformMat4: transformMat4,
    rotate: rotate,
    angle: angle,
    zero: zero,
    str: str,
    exactEquals: exactEquals,
    equals: equals,
    len: len,
    sub: sub,
    mul: mul,
    div: div,
    dist: dist,
    sqrDist: sqrDist,
    sqrLen: sqrLen,
    forEach: forEach
  });

  exports.glMatrix = common;
  exports.mat2 = mat2;
  exports.mat2d = mat2d;
  exports.mat3 = mat3;
  exports.mat4 = mat4;
  exports.quat = quat;
  exports.quat2 = quat2;
  exports.vec2 = vec2;
  exports.vec3 = vec3;
  exports.vec4 = vec4;

  Object.defineProperty(exports, '__esModule', { value: true });

}));


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Game */ "./src/Game.ts");



const fps = document.getElementById("fps");
const map_height = document.getElementById('MAP_HEIGHT');
const chunk_size = document.getElementById('CHUNK_SIZE');
const map_size = document.getElementById('MAP_SIZE');
const noise_count = document.getElementById('NOISE_COUNT');
map_height.innerText = _config__WEBPACK_IMPORTED_MODULE_0__.MAP_HEIGHT.toString();
chunk_size.innerText = _config__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE.toString();
map_size.innerText = _config__WEBPACK_IMPORTED_MODULE_0__.MAP_SIZE.toString();
noise_count.innerText = _config__WEBPACK_IMPORTED_MODULE_0__.NOISE_COUNT.toString();
let prev = performance.now();
let now = performance.now();
const game = new _Game__WEBPACK_IMPORTED_MODULE_1__["default"]('canvas');
function tick() {
    now = performance.now();
    fps.innerText = (1000 / (now - prev)).toFixed(0);
    prev = now;
    game.draw();
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlELENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1RSxDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFD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LEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFbEIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLGtEQUFrRDtJQUNsRCxNQUFNLFdBQVcsR0FBRztRQUNuQixPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDOVUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzlVLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUM5VSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDOVUsQ0FBQztJQUVGLDBDQUEwQztJQUMxQyxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDaEosTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2hKLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNsSixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFcEosTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2hKLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoSixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEosTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBRXBKLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoSixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsY0FBYztBQUMzQixlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxlQUFlO0FBQzVCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQzs7QUFFckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsY0FBYztBQUMzQixlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsUUFBUTtBQUNyQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7O0FBR047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07OztBQUdOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOzs7QUFHTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkI7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGVBQWU7QUFDNUIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEOztBQUUzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsY0FBYztBQUM1QixjQUFjLE1BQU07QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsY0FBYztBQUM1QixjQUFjLE1BQU07QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsY0FBYyxNQUFNO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQixjQUFjLE1BQU07QUFDcEIsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsY0FBYztBQUM1QixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0I7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxjQUFjO0FBQzNCLGVBQWUsUUFBUTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsZUFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsU0FBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsU0FBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxjQUFjO0FBQzNCLGVBQWUs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Q3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FB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QU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFVBQVU7QUFDdkIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsT0FBTztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBLHVCQUF1QixPQUFPO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE1BQU07QUFD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UTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsY0FBYztBQUMzQixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsY0FBYztBQUMzQixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsY0FBYztBQUMzQixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFlO0FBQzVCLGVBQWUsT0FBTztBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsZUFBZSxPQUFP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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsY0FBYztBQUMzQixhQUFhLGVBQWU7QUFDNUIsZUFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFlO0FBQzVCLGFBQWEsY0FBYztBQUMzQixhQUFhLFFBQVE7QUFDckIsZUFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFlO0FBQzVCLGFBQWEsZUFBZTtBQUM1QixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsZUFBZTtBQUM1QixhQUFhLGVBQWU7QUFDNUIsZUFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFlO0FBQzVCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsZUFBZTtBQUM1QixlQUFlLFFBQVE7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsZUFBZTtBQUM1QixhQUFhLGVBQWU7QUFDNUIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsT0FBTztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLGVBQWU7QUFDNUIsZUFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsZUFBZTtBQUM1QixlQUFlLE9BQU87QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QixlQUFlLFFBQVE7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGVBQWU7QUFDNUIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsZUFBZTtBQUM1QixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsZUFBZTtBQUM1QixlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsZUFBZTtBQUM1QixlQUFlLFNBQVM7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsZUFBZTtBQUM1QixlQUFlLFNBQVM7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FB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SUFBSSxHQUFHLElBQUksNkNBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVoQyxTQUFTLElBQUk7SUFDWixHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRXhCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakQsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUVYLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVaLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFRCxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovLzNkX25vaWNlLy4vc3JjL0Jsb2NrLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL0NodW5rLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL0dhbWUudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvS2V5Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvUmFuZG9taXplci50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9SZW5kZXJlci50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9UcmFuc2Zvcm0udHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvVmVjdG9yMy50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvZ2xNYXRyaXgvZ2wtbWF0cml4LmpzIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8zZF9ub2ljZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gQmxvY2tUeXBlIHtcblx0RU1QVFksXG5cdFNPTElELFxuXHRDQVZFXG59XG5cbmV4cG9ydCBjbGFzcyBCbG9jayB7XG5cdHB1YmxpYyB0eXBlOiBCbG9ja1R5cGU7XG5cblx0Y29uc3RydWN0b3IodHlwZTogQmxvY2tUeXBlKSB7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0fVxufVxuIiwiaW1wb3J0IHsgQmxvY2ssIEJsb2NrVHlwZSB9IGZyb20gXCIuL0Jsb2NrXCI7XG5pbXBvcnQgeyBDSFVOS19TSVpFLCBNQVBfSEVJR0hULCBOT0lTRV9DT1VOVCB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgbm9pc2UgfSBmcm9tIFwiLi9SYW5kb21pemVyXCI7XG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuL1RyYW5zZm9ybVwiO1xuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4vVmVjdG9yM1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaHVuayB7XG5cdHB1YmxpYyB0cmFuc2Zvcm06IFRyYW5zZm9ybTtcblx0cHVibGljIGRhdGE6IEJsb2NrW11bXVtdO1xuXG5cdGNvbnN0cnVjdG9yKHg6IG51bWJlciwgejogbnVtYmVyKSB7XG5cdFx0dGhpcy50cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKG5ldyBWZWN0b3IzKHggKiBDSFVOS19TSVpFLCAwLCB6ICogQ0hVTktfU0laRSkpO1xuXHRcdHRoaXMuZGF0YSA9IHRoaXMuaW5pdGlhbGl6ZURhdGEoKTtcblx0XHR0aGlzLmdlbmVyYXRlTGFuZHNjYXBlKCk7XG5cdFx0dGhpcy5nZW5lcmF0ZUNhdmVzKCk7XG5cdH1cblxuXHRwcml2YXRlIGluaXRpYWxpemVEYXRhKCk6IEJsb2NrW11bXVtdIHtcblx0XHRjb25zdCBkYXRhOiBCbG9ja1tdW11bXSA9IFtdO1xuXHRcdGZvciAobGV0IHggPSAwOyB4IDwgQ0hVTktfU0laRTsgeCsrKSB7XG5cdFx0XHRkYXRhW3hdID0gW107XG5cdFx0XHRmb3IgKGxldCB6ID0gMDsgeiA8IENIVU5LX1NJWkU7IHorKykge1xuXHRcdFx0XHRkYXRhW3hdW3pdID0gW107XG5cdFx0XHRcdGZvciAobGV0IHkgPSAwOyB5IDwgTUFQX0hFSUdIVDsgeSsrKSB7XG5cdFx0XHRcdFx0ZGF0YVt4XVt6XVt5XSA9IG5ldyBCbG9jayhCbG9ja1R5cGUuRU1QVFkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZUxhbmRzY2FwZSgpIHtcblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IENIVU5LX1NJWkU7IHgrKykge1xuXHRcdFx0Zm9yIChsZXQgeiA9IDA7IHogPCBDSFVOS19TSVpFOyB6KyspIHtcblx0XHRcdFx0Y29uc3QgcmFuZG9tID0gbm9pc2UoXG5cdFx0XHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueCArIHgsXG5cdFx0XHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueiArIHosXG5cdFx0XHRcdFx0MFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGNvbnN0IGhlaWdodCA9IE1hdGguZmxvb3IocmFuZG9tICogTUFQX0hFSUdIVCAvIDIgKyBNQVBfSEVJR0hUIC8gMik7XG5cblx0XHRcdFx0Zm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuXHRcdFx0XHRcdHRoaXMuZGF0YVt4XVt6XVt5XSA9IG5ldyBCbG9jayhCbG9ja1R5cGUuU09MSUQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZUNhdmVzKCkge1xuXHRcdGZvciAobGV0IGJsb2NrX3ggPSAwOyBibG9ja194IDwgQ0hVTktfU0laRTsgYmxvY2tfeCsrKSB7XG5cdFx0XHRmb3IgKGxldCBibG9ja196ID0gMDsgYmxvY2tfeiA8IENIVU5LX1NJWkU7IGJsb2NrX3orKykge1xuXHRcdFx0XHRmb3IgKGxldCBibG9ja195ID0gMDsgYmxvY2tfeSA8IE1BUF9IRUlHSFQ7IGJsb2NrX3krKykge1xuXHRcdFx0XHRcdGNvbnN0IHJhbmRvbSA9IG5vaXNlKFxuXHRcdFx0XHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueCArIGJsb2NrX3gsXG5cdFx0XHRcdFx0XHR0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi56ICsgYmxvY2tfeixcblx0XHRcdFx0XHRcdGJsb2NrX3ksXG5cdFx0XHRcdFx0XHROT0lTRV9DT1VOVCAvIDRcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0bGV0IGZhY3QgPSAxO1xuXG5cdFx0XHRcdFx0aWYgKGJsb2NrX3kgPCAzMikge1xuXHRcdFx0XHRcdFx0ZmFjdCA9IE1hdGgubWF4KDAsIGJsb2NrX3kgLyAzMilcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoYmxvY2tfeSA+IE1BUF9IRUlHSFQgLyAyKSB7XG5cdFx0XHRcdFx0XHRmYWN0ID0gTWF0aC5tYXgoMCwgMSAtIChibG9ja195IC0gTUFQX0hFSUdIVCAvIDIpIC8gKE1BUF9IRUlHSFQgLyAyKSlcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5kYXRhW2Jsb2NrX3hdW2Jsb2NrX3pdW2Jsb2NrX3ldLnR5cGUgIT0gQmxvY2tUeXBlLkVNUFRZICYmIHJhbmRvbSAqKiAyIDwgMC4xNSAqIGZhY3QpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGF0YVtibG9ja194XVtibG9ja196XVtibG9ja195XS50eXBlID0gQmxvY2tUeXBlLkNBVkU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgeyBCbG9ja1R5cGUgfSBmcm9tIFwiLi9CbG9ja1wiO1xuaW1wb3J0IENodW5rIGZyb20gXCIuL0NodW5rXCI7XG5pbXBvcnQgeyBDSFVOS19TSVpFLCBNQVBfSEVJR0hULCBNQVBfU0laRSB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IFJlbmRlcmVyIGZyb20gXCIuL1JlbmRlcmVyXCI7XG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuL1RyYW5zZm9ybVwiO1xuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4vVmVjdG9yM1wiO1xuXG5pbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tICcuL2dsTWF0cml4L2dsLW1hdHJpeCc7XG5pbXBvcnQgS2V5Ym9hcmQgZnJvbSBcIi4vS2V5Ym9hcmRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG5cdHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblx0cHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjtcblx0cHJpdmF0ZSBjaHVua3M6IENodW5rW107XG5cdHByaXZhdGUgY2FtZXJhOiBUcmFuc2Zvcm07XG5cdHByaXZhdGUga2V5Ym9hcmQ6IEtleWJvYXJkO1xuXG5cdGNvbnN0cnVjdG9yKGNhbnZhc0lkOiBzdHJpbmcpIHtcblx0XHR0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKSBhcyBIVE1MQ2FudmFzRWxlbWVudDtcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXHRcdHRoaXMuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHR0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHRoaXMuY2FudmFzKTtcblx0XHR0aGlzLmNodW5rcyA9IHRoaXMuZ2VuZXJhdGVDaHVua3MoKTtcblx0XHR0aGlzLmtleWJvYXJkID0gbmV3IEtleWJvYXJkKCk7XG5cblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUcmFuc2Zvcm0obmV3IFZlY3RvcjMoLU1BUF9TSVpFICogQ0hVTktfU0laRSAvIDIsIC1NQVBfSEVJR0hULCAtTUFQX1NJWkUgKiBDSFVOS19TSVpFIC8gMikpO1xuXG5cdFx0dGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRcdHRoaXMuY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBldmVudCA9PiB7XG5cdFx0XHR0aGlzLmNhbWVyYS5hbmdsZS55ICs9IGV2ZW50Lm1vdmVtZW50WCAvIDUwMDtcblx0XHRcdHRoaXMuY2FtZXJhLmFuZ2xlLnggKz0gZXZlbnQubW92ZW1lbnRZIC8gNTAwO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZUNodW5rcygpOiBDaHVua1tdIHtcblx0XHRjb25zdCBjaHVua3M6IENodW5rW10gPSBbXTtcblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IE1BUF9TSVpFOyB4KyspIHtcblx0XHRcdGZvciAobGV0IHogPSAwOyB6IDwgTUFQX1NJWkU7IHorKykge1xuXHRcdFx0XHRjaHVua3MucHVzaChuZXcgQ2h1bmsoeCwgeikpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2h1bmtzO1xuXHR9XG5cblx0cHVibGljIGRyYXcoKSB7XG5cdFx0aWYgKHRoaXMua2V5Ym9hcmQuaXNLZXlQcmVzc2VkKFwid1wiKSkge1xuXHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueCArPSBNYXRoLnNpbigtdGhpcy5jYW1lcmEuYW5nbGUueSkgLyA1O1xuXHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueiArPSBNYXRoLmNvcygtdGhpcy5jYW1lcmEuYW5nbGUueSkgLyA1O1xuXHRcdH1cblx0XHRpZiAodGhpcy5rZXlib2FyZC5pc0tleVByZXNzZWQoXCJzXCIpKSB7XG5cdFx0XHR0aGlzLmNhbWVyYS5wb3NpdGlvbi54IC09IE1hdGguc2luKC10aGlzLmNhbWVyYS5hbmdsZS55KSAvIDU7XG5cdFx0XHR0aGlzLmNhbWVyYS5wb3NpdGlvbi56IC09IE1hdGguY29zKC10aGlzLmNhbWVyYS5hbmdsZS55KSAvIDU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMua2V5Ym9hcmQuaXNLZXlQcmVzc2VkKFwiYVwiKSkge1xuXHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueCArPSBNYXRoLnNpbigtdGhpcy5jYW1lcmEuYW5nbGUueSArIE1hdGguUEkgLyAyKSAvIDU7XG5cdFx0XHR0aGlzLmNhbWVyYS5wb3NpdGlvbi56ICs9IE1hdGguY29zKC10aGlzLmNhbWVyYS5hbmdsZS55ICsgTWF0aC5QSSAvIDIpIC8gNTtcblx0XHR9XG5cdFx0aWYgKHRoaXMua2V5Ym9hcmQuaXNLZXlQcmVzc2VkKFwiZFwiKSkge1xuXHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueCAtPSBNYXRoLnNpbigtdGhpcy5jYW1lcmEuYW5nbGUueSArIE1hdGguUEkgLyAyKSAvIDU7XG5cdFx0XHR0aGlzLmNhbWVyYS5wb3NpdGlvbi56IC09IE1hdGguY29zKC10aGlzLmNhbWVyYS5hbmdsZS55ICsgTWF0aC5QSSAvIDIpIC8gNTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5rZXlib2FyZC5pc0tleVByZXNzZWQoXCJTaGlmdFwiKSkge1xuXHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueSArPSAwLjI7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmtleWJvYXJkLmlzS2V5UHJlc3NlZChcIiBcIikpIHtcblx0XHRcdHRoaXMuY2FtZXJhLnBvc2l0aW9uLnkgLT0gMC4yO1xuXHRcdH1cblxuXHRcdHRoaXMucmVuZGVyZXIuY2xlYXJTY3JlZW4oKTtcblxuXHRcdHRoaXMucmVuZGVyZXIubW9kZWxNYXRyaXggPSBnbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuXHRcdGdsTWF0cml4Lm1hdDQuaWRlbnRpdHkodGhpcy5yZW5kZXJlci5tb2RlbE1hdHJpeCk7XG5cblx0XHRnbE1hdHJpeC5tYXQ0LnJvdGF0ZSh0aGlzLnJlbmRlcmVyLm1vZGVsTWF0cml4LCB0aGlzLnJlbmRlcmVyLm1vZGVsTWF0cml4LCB0aGlzLmNhbWVyYS5hbmdsZS54LCBbMSwgMCwgMF0pO1xuXHRcdGdsTWF0cml4Lm1hdDQucm90YXRlKHRoaXMucmVuZGVyZXIubW9kZWxNYXRyaXgsIHRoaXMucmVuZGVyZXIubW9kZWxNYXRyaXgsIHRoaXMuY2FtZXJhLmFuZ2xlLnksIFswLCAxLCAwXSk7XG5cdFx0Z2xNYXRyaXgubWF0NC50cmFuc2xhdGUodGhpcy5yZW5kZXJlci5tb2RlbE1hdHJpeCwgdGhpcy5yZW5kZXJlci5tb2RlbE1hdHJpeCwgW1xuXHRcdFx0dGhpcy5jYW1lcmEucG9zaXRpb24ueCxcblx0XHRcdHRoaXMuY2FtZXJhLnBvc2l0aW9uLnksXG5cdFx0XHR0aGlzLmNhbWVyYS5wb3NpdGlvbi56XG5cdFx0XSk7XG5cblx0XHRmb3IgKGNvbnN0IGNodW5rIG9mIHRoaXMuY2h1bmtzKSB7XG5cdFx0XHRmb3IgKGxldCBibG9ja194ID0gMDsgYmxvY2tfeCA8IENIVU5LX1NJWkU7IGJsb2NrX3grKykge1xuXHRcdFx0XHRmb3IgKGxldCBibG9ja196ID0gMDsgYmxvY2tfeiA8IENIVU5LX1NJWkU7IGJsb2NrX3orKykge1xuXHRcdFx0XHRcdGZvciAobGV0IGJsb2NrX3kgPSAwOyBibG9ja195IDwgTUFQX0hFSUdIVDsgYmxvY2tfeSsrKSB7XG5cblx0XHRcdFx0XHRcdGNvbnN0IGJsb2NrID0gY2h1bmsuZGF0YVtibG9ja194XVtibG9ja196XVtibG9ja195XTtcblxuXHRcdFx0XHRcdFx0bGV0IG9wZW5lZCA9IHRydWU7XG5cblx0XHRcdFx0XHRcdC8vIGlmIChibG9ja194ID09IDAgfHwgYmxvY2tfeSA9PSAwIHx8IGJsb2NrX3ogPT0gMCkge1xuXHRcdFx0XHRcdFx0Ly8gXHRvcGVuZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Ly8gfVxuXG5cdFx0XHRcdFx0XHQvLyBpZiAoYmxvY2tfeCA9PSBDSFVOS19TSVpFIC0gMSB8fCBibG9ja195ID09IE1BUF9IRUlHSFQgLSAxIHx8IGJsb2NrX3ogPT0gQ0hVTktfU0laRSAtIDEpIHtcblx0XHRcdFx0XHRcdC8vIFx0b3BlbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdC8vIH1cblxuXHRcdFx0XHRcdFx0Ly8gaWYgKCFvcGVuZWQpIHtcblx0XHRcdFx0XHRcdC8vIFx0aWYgKGNodW5rLmRhdGFbYmxvY2tfeCArIDFdW2Jsb2NrX3pdW2Jsb2NrX3ldLnR5cGUgIT0gQmxvY2tUeXBlLlNPTElEKSB7XG5cdFx0XHRcdFx0XHQvLyBcdFx0b3BlbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdC8vIFx0fSBlbHNlIGlmIChjaHVuay5kYXRhW2Jsb2NrX3ggLSAxXVtibG9ja196XVtibG9ja195XS50eXBlICE9IEJsb2NrVHlwZS5TT0xJRCkge1xuXHRcdFx0XHRcdFx0Ly8gXHRcdG9wZW5lZCA9IHRydWU7XG5cdFx0XHRcdFx0XHQvLyBcdH0gZWxzZSBpZiAoY2h1bmsuZGF0YVtibG9ja194XVtibG9ja196ICsgMV1bYmxvY2tfeV0udHlwZSAhPSBCbG9ja1R5cGUuU09MSUQpIHtcblx0XHRcdFx0XHRcdC8vIFx0XHRvcGVuZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Ly8gXHR9IGVsc2UgaWYgKGNodW5rLmRhdGFbYmxvY2tfeF1bYmxvY2tfeiAtIDFdW2Jsb2NrX3ldLnR5cGUgIT0gQmxvY2tUeXBlLlNPTElEKSB7XG5cdFx0XHRcdFx0XHQvLyBcdFx0b3BlbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdC8vIFx0fSBlbHNlIGlmIChjaHVuay5kYXRhW2Jsb2NrX3hdW2Jsb2NrX3pdW2Jsb2NrX3kgKyAxXS50eXBlICE9IEJsb2NrVHlwZS5TT0xJRCkge1xuXHRcdFx0XHRcdFx0Ly8gXHRcdG9wZW5lZCA9IHRydWU7XG5cdFx0XHRcdFx0XHQvLyBcdH0gZWxzZSBpZiAoY2h1bmsuZGF0YVtibG9ja194XVtibG9ja196XVtibG9ja195ICsgMV0udHlwZSAhPSBCbG9ja1R5cGUuU09MSUQpIHtcblx0XHRcdFx0XHRcdC8vIFx0XHRvcGVuZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Ly8gXHR9XG5cdFx0XHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0XHRcdGlmIChvcGVuZWQgJiYgYmxvY2sudHlwZSA9PT0gQmxvY2tUeXBlLlNPTElEKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0oXG5cdFx0XHRcdFx0XHRcdFx0bmV3IFZlY3RvcjMoXG5cdFx0XHRcdFx0XHRcdFx0XHRjaHVuay50cmFuc2Zvcm0ucG9zaXRpb24ueCArIGJsb2NrX3gsXG5cdFx0XHRcdFx0XHRcdFx0XHRibG9ja195LFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2h1bmsudHJhbnNmb3JtLnBvc2l0aW9uLnogKyBibG9ja196XG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdC8vIHN3aXRjaCAoYmxvY2sudHlwZSkge1xuXHRcdFx0XHRcdFx0XHQvLyBcdGNhc2UgQmxvY2tUeXBlLlNPTElEOlxuXHRcdFx0XHRcdFx0XHQvLyBcdFx0dGhpcy5yZW5kZXJlci5jaGFuZ2VDb2xvcihgcmdiKFxuXHRcdFx0XHRcdFx0XHQvLyBcdFx0XHQke01hdGguZmxvb3IoMjU1ICogKGJsb2NrX3kgLyBNQVBfSEVJR0hUKSl9LFxuXHRcdFx0XHRcdFx0XHQvLyBcdFx0XHQke01hdGguZmxvb3IoMjU1ICogKGJsb2NrX3kgLyBNQVBfSEVJR0hUKSl9LFxuXHRcdFx0XHRcdFx0XHQvLyBcdFx0XHQke01hdGguZmxvb3IoMjU1ICogKGJsb2NrX3kgLyBNQVBfSEVJR0hUKSl9XG5cdFx0XHRcdFx0XHRcdC8vIFx0XHQpYCk7XG5cdFx0XHRcdFx0XHRcdC8vIFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Ly8gXHRjYXNlIEJsb2NrVHlwZS5DQVZFOlxuXHRcdFx0XHRcdFx0XHQvLyBcdFx0dGhpcy5yZW5kZXJlci5jaGFuZ2VDb2xvcihgcmdiYSgwLCAwLCAwLCAwLjUpYCk7XG5cdFx0XHRcdFx0XHRcdC8vIFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0Ly8gfVxuXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuZHJhd0N1YmUodHJhbnNmb3JtKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEtleWJvYXJkIHtcblx0cHJpdmF0ZSBrZXlzOiBTZXQ8c3RyaW5nPjtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmtleXMgPSBuZXcgU2V0KCk7XG5cblx0XHQvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQvdCw0LbQsNGC0LjRjyDQutC70LDQstC40Yhcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG5cdFx0XHR0aGlzLmtleXMuYWRkKGV2ZW50LmtleSk7XG5cdFx0fSk7XG5cblx0XHQvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDRgdC+0LHRi9GC0LjQuSDQvtGC0L/Rg9GB0LrQsNC90LjRjyDQutC70LDQstC40Yhcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuXHRcdFx0dGhpcy5rZXlzLmRlbGV0ZShldmVudC5rZXkpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIGlzS2V5UHJlc3NlZChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLmtleXMuaGFzKGtleSk7XG5cdH1cbn1cbiIsImltcG9ydCB7IE5PSVNFX0NPVU5UIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmNvbnN0IFNFRUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMTQ3NDgzNjQ3KSA+Pj4gMDtcblxuY29uc29sZS5sb2coU0VFRCk7XG5cbi8vID09PT09IG5vaXNlID09PT09XG5cbi8vIGNvbnN0IF9yYW5kWFlaQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG4vLyBmdW5jdGlvbiBfcmFuZFhZWih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogbnVtYmVyIHtcbi8vIFx0Y29uc3Qga2V5ID0gYCR7eH1fJHt6fV8ke3l9YDtcblxuLy8gXHRpZiAoIV9yYW5kWFlaQ2FjaGUuaGFzKGtleSkpIHtcbi8vIFx0XHRfcmFuZFhZWkNhY2hlLnNldChrZXksIF9yYW5kWFlaKHgsIHosIHkpKTtcbi8vIFx0fVxuXG4vLyBcdHJldHVybiBfcmFuZFhZWkNhY2hlLmdldChrZXkpIGFzIG51bWJlcjtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRYWVooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IG51bWJlciB7XG5cdGxldCBuID0gKHggKiAzNDE4NzMxMjg3ICsgeSAqIDEzMjg5Nzk4NyArIHogKiAxMzc2MzEyNTg5ICsgU0VFRCkgPj4+IDA7XG5cblx0biA9IChuIF4gKG4gPj4gMjEpKSA+Pj4gMDtcblx0biA9IChuIF4gKG4gPDwgMzUpKSA+Pj4gMDtcblx0biA9IChuIF4gKG4gPj4gNCkpID4+PiAwO1xuXHRuID0gKG4gKiAyNjg1ODIxNjU3NzMpID4+PiAwO1xuXHRuID0gKG4gXiAobiA+PiAxNSkpID4+PiAwO1xuXG5cdHJldHVybiBuICUgMjU2IC8gMjU2O1xufVxuXG4vLyA9PT09PSBub2lzZSA9PT09PVxuXG4vLyBjb25zdCBfbm9pc2VDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbi8vIGZ1bmN0aW9uIF9ub2lzZSh4OiBudW1iZXIsIHo6IG51bWJlciwgeTogbnVtYmVyLCBub2lzZV9jb3VudDogbnVtYmVyID0gTk9JU0VfQ09VTlQpOiBudW1iZXIge1xuLy8gXHRjb25zdCBrZXkgPSBgJHt4fV8ke3p9XyR7eX1fJHtub2lzZV9jb3VudH1gO1xuXG4vLyBcdGlmICghX25vaXNlQ2FjaGUuaGFzKGtleSkpIHtcbi8vIFx0XHRfbm9pc2VDYWNoZS5zZXQoa2V5LCBfbm9pc2UoeCwgeiwgeSwgbm9pc2VfY291bnQpKTtcbi8vIFx0fVxuXG4vLyBcdHJldHVybiBfbm9pc2VDYWNoZS5nZXQoa2V5KSBhcyBudW1iZXI7XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBub2lzZSh4OiBudW1iZXIsIHo6IG51bWJlciwgeTogbnVtYmVyLCBub2lzZV9jb3VudDogbnVtYmVyID0gTk9JU0VfQ09VTlQpOiBudW1iZXIge1xuXHRsZXQgcmVzdWx0ID0gMDtcblxuXHRmb3IgKGxldCBpID0gMjsgaSA8IG5vaXNlX2NvdW50ICsgMjsgaSsrKSB7XG5cdFx0Y29uc3QgdG1wID0gYmljdWJpY1JhbmRYWVooXG5cdFx0XHQoeCArIDM0MTg3MzEyODcpIC8gKDIgKiogaSksXG5cdFx0XHQoeSAtIDEzNzYzMTI1ODkpIC8gKDIgKiogaSksXG5cdFx0XHQoeiArIDEzMjg5Nzk4NykgLyAoMiAqKiBpKVxuXHRcdCk7XG5cblx0XHRyZXN1bHQgKz0gdG1wO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdCAvIG5vaXNlX2NvdW50O1xufVxuXG4vLyA9PT09PSBjdWJpY0ludGVycG9sYXRlID09PT09XG5cbi8vIGNvbnN0IF9jdWJpY0ludGVycG9sYXRlQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG4vLyBmdW5jdGlvbiBfY3ViaWNJbnRlcnBvbGF0ZShwMDogbnVtYmVyLCBwMTogbnVtYmVyLCBwMjogbnVtYmVyLCBwMzogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuLy8gXHRjb25zdCBrZXkgPSBgJHtwMH1fJHtwMX1fJHtwMn1fJHtwM31fJHt0fWA7XG5cbi8vIFx0aWYgKCFfY3ViaWNJbnRlcnBvbGF0ZUNhY2hlLmhhcyhrZXkpKSB7XG4vLyBcdFx0X2N1YmljSW50ZXJwb2xhdGVDYWNoZS5zZXQoa2V5LCBfY3ViaWNJbnRlcnBvbGF0ZShwMCwgcDEsIHAyLCBwMywgdCkpO1xuLy8gXHR9XG5cbi8vIFx0cmV0dXJuIF9jdWJpY0ludGVycG9sYXRlQ2FjaGUuZ2V0KGtleSkgYXMgbnVtYmVyO1xuLy8gfVxuXG5mdW5jdGlvbiBjdWJpY0ludGVycG9sYXRlKHAwOiBudW1iZXIsIHAxOiBudW1iZXIsIHAyOiBudW1iZXIsIHAzOiBudW1iZXIsIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgYSA9IC0wLjUgKiBwMCArIDEuNSAqIHAxIC0gMS41ICogcDIgKyAwLjUgKiBwMztcbiAgICBjb25zdCBiID0gcDAgLSAyLjUgKiBwMSArIDIgKiBwMiAtIDAuNSAqIHAzO1xuICAgIGNvbnN0IGMgPSAtMC41ICogcDAgKyAwLjUgKiBwMjtcbiAgICBjb25zdCBkID0gcDE7XG5cblx0cmV0dXJuIGEgKiB0ICogdCAqIHQgKyBiICogdCAqIHQgKyBjICogdCArIGQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaWN1YmljUmFuZFhZWih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogbnVtYmVyIHtcblx0Y29uc3QgeGIgPSBNYXRoLmZsb29yKHgpO1xuXG5cdGNvbnN0IHgwID0geGIgLSAxO1xuXHRjb25zdCB4MSA9IHhiICsgMDtcblx0Y29uc3QgeDIgPSB4YiArIDE7XG5cdGNvbnN0IHgzID0geGIgKyAyO1xuXG5cdGNvbnN0IHliID0gTWF0aC5mbG9vcih5KTtcblxuXHRjb25zdCB5MCA9IHliIC0gMTtcblx0Y29uc3QgeTEgPSB5YiArIDA7XG5cdGNvbnN0IHkyID0geWIgKyAxO1xuXHRjb25zdCB5MyA9IHliICsgMjtcblxuXHRjb25zdCB6YiA9IE1hdGguZmxvb3Ioeik7XG5cblx0Y29uc3QgejAgPSB6YiAtIDE7XG5cdGNvbnN0IHoxID0gemIgKyAwO1xuXHRjb25zdCB6MiA9IHpiICsgMTtcblx0Y29uc3QgejMgPSB6YiArIDI7XG5cblx0Ly8g0J/QvtC70YPRh9Cw0LXQvCDQt9C90LDRh9C10L3QuNGPIFwi0YjRg9C80L7QslwiINC00LvRjyAxNiDRgdC+0YHQtdC00L3QuNGFINGC0L7Rh9C10Lpcblx0Y29uc3Qgbm9pc2VWYWx1ZXMgPSBbXG5cdFx0cmFuZFhZWih4MCwgeTAsIHowKSwgcmFuZFhZWih4MSwgeTAsIHowKSwgcmFuZFhZWih4MiwgeTAsIHowKSwgcmFuZFhZWih4MywgeTAsIHowKSwgcmFuZFhZWih4MCwgeTEsIHowKSwgcmFuZFhZWih4MSwgeTEsIHowKSwgcmFuZFhZWih4MiwgeTEsIHowKSwgcmFuZFhZWih4MywgeTEsIHowKSwgcmFuZFhZWih4MCwgeTIsIHowKSwgcmFuZFhZWih4MSwgeTIsIHowKSwgcmFuZFhZWih4MiwgeTIsIHowKSwgcmFuZFhZWih4MywgeTIsIHowKSwgcmFuZFhZWih4MCwgeTMsIHowKSwgcmFuZFhZWih4MSwgeTMsIHowKSwgcmFuZFhZWih4MiwgeTMsIHowKSwgcmFuZFhZWih4MywgeTMsIHowKSxcblx0XHRyYW5kWFlaKHgwLCB5MCwgejEpLCByYW5kWFlaKHgxLCB5MCwgejEpLCByYW5kWFlaKHgyLCB5MCwgejEpLCByYW5kWFlaKHgzLCB5MCwgejEpLCByYW5kWFlaKHgwLCB5MSwgejEpLCByYW5kWFlaKHgxLCB5MSwgejEpLCByYW5kWFlaKHgyLCB5MSwgejEpLCByYW5kWFlaKHgzLCB5MSwgejEpLCByYW5kWFlaKHgwLCB5MiwgejEpLCByYW5kWFlaKHgxLCB5MiwgejEpLCByYW5kWFlaKHgyLCB5MiwgejEpLCByYW5kWFlaKHgzLCB5MiwgejEpLCByYW5kWFlaKHgwLCB5MywgejEpLCByYW5kWFlaKHgxLCB5MywgejEpLCByYW5kWFlaKHgyLCB5MywgejEpLCByYW5kWFlaKHgzLCB5MywgejEpLFxuXHRcdHJhbmRYWVooeDAsIHkwLCB6MiksIHJhbmRYWVooeDEsIHkwLCB6MiksIHJhbmRYWVooeDIsIHkwLCB6MiksIHJhbmRYWVooeDMsIHkwLCB6MiksIHJhbmRYWVooeDAsIHkxLCB6MiksIHJhbmRYWVooeDEsIHkxLCB6MiksIHJhbmRYWVooeDIsIHkxLCB6MiksIHJhbmRYWVooeDMsIHkxLCB6MiksIHJhbmRYWVooeDAsIHkyLCB6MiksIHJhbmRYWVooeDEsIHkyLCB6MiksIHJhbmRYWVooeDIsIHkyLCB6MiksIHJhbmRYWVooeDMsIHkyLCB6MiksIHJhbmRYWVooeDAsIHkzLCB6MiksIHJhbmRYWVooeDEsIHkzLCB6MiksIHJhbmRYWVooeDIsIHkzLCB6MiksIHJhbmRYWVooeDMsIHkzLCB6MiksXG5cdFx0cmFuZFhZWih4MCwgeTAsIHozKSwgcmFuZFhZWih4MSwgeTAsIHozKSwgcmFuZFhZWih4MiwgeTAsIHozKSwgcmFuZFhZWih4MywgeTAsIHozKSwgcmFuZFhZWih4MCwgeTEsIHozKSwgcmFuZFhZWih4MSwgeTEsIHozKSwgcmFuZFhZWih4MiwgeTEsIHozKSwgcmFuZFhZWih4MywgeTEsIHozKSwgcmFuZFhZWih4MCwgeTIsIHozKSwgcmFuZFhZWih4MSwgeTIsIHozKSwgcmFuZFhZWih4MiwgeTIsIHozKSwgcmFuZFhZWih4MywgeTIsIHozKSwgcmFuZFhZWih4MCwgeTMsIHozKSwgcmFuZFhZWih4MSwgeTMsIHozKSwgcmFuZFhZWih4MiwgeTMsIHozKSwgcmFuZFhZWih4MywgeTMsIHozKSxcblx0XTtcblxuXHQvLyDQmNC90YLQtdGA0L/QvtC70LjRgNGD0LXQvCDQv9C+ICd5JyDQv9C+INGH0LXRgtGL0YDQtdC8INGB0YLRgNC+0LrQsNC8XG5cdGNvbnN0IHNsaWNlMHJvdzAgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMCArIDBdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxXSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMl0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDNdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTByb3cxID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDAgKyA0XSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgNV0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDZdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyA3XSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uwcm93MiA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAwICsgOF0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDldLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxMF0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDExXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uwcm93MyA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAwICsgMTJdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxM10sIG5vaXNlVmFsdWVzWzE2ICogMCArIDE0XSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMTVdLCB4IC0geGIpO1xuXG5cdGNvbnN0IHNsaWNlMXJvdzAgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMSArIDBdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxXSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMl0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDNdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTFyb3cxID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDEgKyA0XSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgNV0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDZdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyA3XSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uxcm93MiA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAxICsgOF0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDldLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxMF0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDExXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uxcm93MyA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAxICsgMTJdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxM10sIG5vaXNlVmFsdWVzWzE2ICogMSArIDE0XSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMTVdLCB4IC0geGIpO1xuXG5cdGNvbnN0IHNsaWNlMnJvdzAgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMiArIDBdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxXSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMl0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDNdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTJyb3cxID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDIgKyA0XSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgNV0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDZdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyA3XSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uycm93MiA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAyICsgOF0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDldLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxMF0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDExXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uycm93MyA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAyICsgMTJdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxM10sIG5vaXNlVmFsdWVzWzE2ICogMiArIDE0XSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMTVdLCB4IC0geGIpO1xuXG5cdGNvbnN0IHNsaWNlM3JvdzAgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMyArIDBdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxXSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMl0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDNdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTNyb3cxID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDMgKyA0XSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgNV0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDZdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyA3XSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uzcm93MiA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAzICsgOF0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDldLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxMF0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDExXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uzcm93MyA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAzICsgMTJdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxM10sIG5vaXNlVmFsdWVzWzE2ICogMyArIDE0XSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMTVdLCB4IC0geGIpO1xuXG5cdGNvbnN0IHNsaWNlMCA9IGN1YmljSW50ZXJwb2xhdGUoc2xpY2Uwcm93MCwgc2xpY2Uwcm93MSwgc2xpY2Uwcm93Miwgc2xpY2Uwcm93MywgeSAtIHliKTtcblx0Y29uc3Qgc2xpY2UxID0gY3ViaWNJbnRlcnBvbGF0ZShzbGljZTFyb3cwLCBzbGljZTFyb3cxLCBzbGljZTFyb3cyLCBzbGljZTFyb3czLCB5IC0geWIpO1xuXHRjb25zdCBzbGljZTIgPSBjdWJpY0ludGVycG9sYXRlKHNsaWNlMnJvdzAsIHNsaWNlMnJvdzEsIHNsaWNlMnJvdzIsIHNsaWNlMnJvdzMsIHkgLSB5Yik7XG5cdGNvbnN0IHNsaWNlMyA9IGN1YmljSW50ZXJwb2xhdGUoc2xpY2Uzcm93MCwgc2xpY2Uzcm93MSwgc2xpY2Uzcm93Miwgc2xpY2Uzcm93MywgeSAtIHliKTtcblxuXHQvLyDQmNC90YLQtdGA0L/QvtC70LjRgNGD0LXQvCDQv9C+ICd4JyDQv9C+INGH0LXRgtGL0YDQtdC8INGB0YLRgNC+0LrQsNC8XG5cdHJldHVybiBjdWJpY0ludGVycG9sYXRlKHNsaWNlMCwgc2xpY2UxLCBzbGljZTIsIHNsaWNlMywgeiAtIHpiKTtcbn1cblxuY29uc29sZS5sb2coYmljdWJpY1JhbmRYWVopO1xuIiwiaW1wb3J0IFRyYW5zZm9ybSBmcm9tIFwiLi9UcmFuc2Zvcm1cIjtcbmltcG9ydCAqIGFzIGdsTWF0cml4IGZyb20gJy4vZ2xNYXRyaXgvZ2wtbWF0cml4JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZXIge1xuXHRwcml2YXRlIGdsOiBXZWJHTFJlbmRlcmluZ0NvbnRleHQ7XG5cblx0cHJpdmF0ZSB2ZXJ0ZXhTaGFkZXI6IFdlYkdMU2hhZGVyO1xuXHRwcml2YXRlIGZyYWdtZW50U2hhZGVyOiBXZWJHTFNoYWRlcjtcblxuXHRwcml2YXRlIHByb2dyYW06IFdlYkdMUHJvZ3JhbTtcblxuXHRwdWJsaWMgbW9kZWxNYXRyaXg6IGFueTtcblx0cHVibGljIHBlcnNwZWN0aXZlTWF0cml4OiBhbnk7XG5cblx0cHJpdmF0ZSBwb3NpdGlvbkF0dHJpYnV0ZTogR0xpbnQ7XG5cdHByaXZhdGUgb2Zmc2V0VW5pZm9ybTogV2ViR0xVbmlmb3JtTG9jYXRpb247XG5cdHByaXZhdGUgbW9kZWxVbmlmb3JtOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbjtcblx0cHJpdmF0ZSBwZXJzcGVjdGl2ZVVuaWZvcm06IFdlYkdMVW5pZm9ybUxvY2F0aW9uO1xuXG5cdGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcblx0XHR0aGlzLmdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJykgYXMgV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuXG5cdFx0dGhpcy52ZXJ0ZXhTaGFkZXIgPSB0aGlzLmNyZWF0ZVNoYWRlcih0aGlzLmdsLlZFUlRFWF9TSEFERVIsIGBcblx0XHRcdGF0dHJpYnV0ZSB2ZWM0IGFfcG9zaXRpb247XG5cblx0XHRcdHVuaWZvcm0gdmVjMyB1X29mZnNldDtcblxuXHRcdFx0dW5pZm9ybSBtYXQ0IHVfbW9kZWxfbWF0cml4O1xuXHRcdFx0dW5pZm9ybSBtYXQ0IHVfcGVyc3BlY3RpdmVfbWF0cml4O1xuXG5cdFx0XHR2YXJ5aW5nIHZlYzQgdl9wb3NpdGlvbjtcblxuXHRcdFx0dm9pZCBtYWluKCkge1xuXHRcdFx0XHRnbF9Qb3NpdGlvbiA9IHVfcGVyc3BlY3RpdmVfbWF0cml4ICogdV9tb2RlbF9tYXRyaXggKiAoYV9wb3NpdGlvbiArIHZlYzQodV9vZmZzZXQsIDApKTtcblxuXHRcdFx0XHR2X3Bvc2l0aW9uID0gYV9wb3NpdGlvbjtcblx0XHRcdH1cblx0XHRgKTtcblx0XHR0aGlzLmZyYWdtZW50U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIodGhpcy5nbC5GUkFHTUVOVF9TSEFERVIsIGBcblx0XHRcdHByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xuXG5cdFx0XHR2YXJ5aW5nIHZlYzQgdl9wb3NpdGlvbjtcblxuXHRcdFx0dm9pZCBtYWluKCkge1xuXHRcdFx0XHRmbG9hdCBmYWN0b3IgPSAxLjIgLSAxLiAvIGxlbmd0aCh2X3Bvc2l0aW9uKTtcblx0XHRcdFx0Z2xfRnJhZ0NvbG9yID0gdmVjNCh2ZWMzKDEsIDAsIDAuNSkgKiBmYWN0b3IsIDEpO1xuXHRcdFx0fVxuXHRcdGApO1xuXG5cdFx0dGhpcy5wcm9ncmFtID0gdGhpcy5jcmVhdGVQcm9ncmFtKHRoaXMudmVydGV4U2hhZGVyLCB0aGlzLmZyYWdtZW50U2hhZGVyKTtcblxuXHRcdHRoaXMuZ2wudmlld3BvcnQoMCwgMCwgdGhpcy5nbC5jYW52YXMud2lkdGgsIHRoaXMuZ2wuY2FudmFzLmhlaWdodCk7XG5cblx0XHR0aGlzLm1vZGVsTWF0cml4ID0gZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcblx0XHR0aGlzLnBlcnNwZWN0aXZlTWF0cml4ID0gZ2xNYXRyaXgubWF0NC5jcmVhdGUoKTtcblxuXHRcdGdsTWF0cml4Lm1hdDQucGVyc3BlY3RpdmUodGhpcy5wZXJzcGVjdGl2ZU1hdHJpeCwgMS4wNCwgdGhpcy5nbC5jYW52YXMud2lkdGggLyB0aGlzLmdsLmNhbnZhcy5oZWlnaHQsIDAuMSwgMTAwMC4wKTtcblxuXHRcdGdsTWF0cml4Lm1hdDQuaWRlbnRpdHkodGhpcy5tb2RlbE1hdHJpeCk7XG5cblx0XHRnbE1hdHJpeC5tYXQ0LnRyYW5zbGF0ZSh0aGlzLm1vZGVsTWF0cml4LCB0aGlzLm1vZGVsTWF0cml4LCBbMCwgLTY0LCAwXSk7XG5cdFx0Z2xNYXRyaXgubWF0NC5yb3RhdGUodGhpcy5tb2RlbE1hdHJpeCwgdGhpcy5tb2RlbE1hdHJpeCwgTWF0aC5QSSAvIDQgKyBNYXRoLlBJIC8gMiwgWzAsIDEsIDBdKTtcblxuXHRcdGNvbnN0IGN1YmUgPSBnZXRDdWJlKCk7XG5cblx0XHR0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKTtcblxuXHRcdGNvbnN0IHZlcnRpY2VzQnVmZmVyID0gdGhpcy5nbC5jcmVhdGVCdWZmZXIoKSBhcyBXZWJHTEJ1ZmZlcjtcblx0XHR0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy5nbC5BUlJBWV9CVUZGRVIsIHZlcnRpY2VzQnVmZmVyKTtcblx0XHR0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkoY3ViZS52ZXJ0aWNlcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG5cdFx0Y29uc3QgaW5kaWNlc0J1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCkgYXMgV2ViR0xCdWZmZXI7XG5cdFx0dGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZGljZXNCdWZmZXIpO1xuXHRcdHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkoY3ViZS5pbmRpY2VzKSwgdGhpcy5nbC5TVEFUSUNfRFJBVyk7XG5cblx0XHR0aGlzLnBvc2l0aW9uQXR0cmlidXRlID0gdGhpcy5nbC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLnByb2dyYW0sICdhX3Bvc2l0aW9uJyk7XG5cdFx0dGhpcy5vZmZzZXRVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCAndV9vZmZzZXQnKSBhcyBXZWJHTFVuaWZvcm1Mb2NhdGlvbjtcblx0XHR0aGlzLm1vZGVsVW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgJ3VfbW9kZWxfbWF0cml4JykgYXMgV2ViR0xVbmlmb3JtTG9jYXRpb247XG5cdFx0dGhpcy5wZXJzcGVjdGl2ZVVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sICd1X3BlcnNwZWN0aXZlX21hdHJpeCcpIGFzIFdlYkdMVW5pZm9ybUxvY2F0aW9uO1xuXG5cdFx0dGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0aGlzLnBvc2l0aW9uQXR0cmlidXRlKTtcblx0XHR0aGlzLmdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGhpcy5wb3NpdGlvbkF0dHJpYnV0ZSwgMywgdGhpcy5nbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuXG5cdFx0dGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcblx0XHR0aGlzLmdsLmVuYWJsZSh0aGlzLmdsLkNVTExfRkFDRSk7XG5cdH1cblxuXHRjaGFuZ2VDb2xvcihjb2xvcjogc3RyaW5nIHwgQ2FudmFzR3JhZGllbnQgfCBDYW52YXNQYXR0ZXJuKSB7XG5cdFx0Ly9cblx0fVxuXG5cdGRyYXdDdWJlKHRyYW5zZm9ybTogVHJhbnNmb3JtKSB7XG5cdFx0Y29uc3QgY3ViZSA9IGdldEN1YmUoKTtcblxuXHRcdHRoaXMuZ2wudW5pZm9ybTNmdih0aGlzLm9mZnNldFVuaWZvcm0sIFt0cmFuc2Zvcm0ucG9zaXRpb24ueCwgdHJhbnNmb3JtLnBvc2l0aW9uLnksIHRyYW5zZm9ybS5wb3NpdGlvbi56XSk7XG5cdFx0dGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubW9kZWxVbmlmb3JtLCBmYWxzZSwgdGhpcy5tb2RlbE1hdHJpeCk7XG5cdFx0dGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMucGVyc3BlY3RpdmVVbmlmb3JtLCBmYWxzZSwgdGhpcy5wZXJzcGVjdGl2ZU1hdHJpeCk7XG5cblx0XHR0aGlzLmdsLmRyYXdFbGVtZW50cyh0aGlzLmdsLlRSSUFOR0xFUywgY3ViZS5pbmRpY2VzLmxlbmd0aCwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVCwgMCk7XG5cdH1cblxuXHRjbGVhclNjcmVlbigpIHtcblx0XHR0aGlzLmdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMSk7XG5cdFx0dGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQgfCB0aGlzLmdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVTaGFkZXIodHlwZTogbnVtYmVyLCBzb3VyY2U6IHN0cmluZyk6IFdlYkdMU2hhZGVyIHtcblx0XHRjb25zdCBzaGFkZXIgPSB0aGlzLmdsLmNyZWF0ZVNoYWRlcih0eXBlKSBhcyBXZWJHTFNoYWRlcjtcblxuXHRcdHRoaXMuZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc291cmNlKTtcblx0XHR0aGlzLmdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKTtcblxuXHRcdGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIHRoaXMuZ2wuQ09NUElMRV9TVEFUVVMpO1xuXG5cdFx0aWYgKHN1Y2Nlc3MpIHtcblx0XHRcdHJldHVybiBzaGFkZXIgYXMgV2ViR0xTaGFkZXI7XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2codGhpcy5nbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcikpO1xuXHRcdHRoaXMuZ2wuZGVsZXRlU2hhZGVyKHNoYWRlcik7XG5cblx0XHR0aHJvdyBuZXcgRXJyb3IoXCLQntGI0LjQsdC60LAg0L/RgNC4INC40L3QuNGG0LjQsNC70LjQt9Cw0YbQuNC4INGI0LXQudC00LXRgNCwXCIpO1xuXHR9XG5cblx0cHJpdmF0ZSBjcmVhdGVQcm9ncmFtKHZlcnRleFNoYWRlcjogV2ViR0xTaGFkZXIsIGZyYWdtZW50U2hhZGVyOiBXZWJHTFNoYWRlcik6IFdlYkdMUHJvZ3JhbSB7XG5cdFx0Y29uc3QgcHJvZ3JhbSA9IHRoaXMuZ2wuY3JlYXRlUHJvZ3JhbSgpIGFzIFdlYkdMUHJvZ3JhbTtcblxuXHRcdHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG5cdFx0dGhpcy5nbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuXG5cdFx0dGhpcy5nbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcblxuXHRcdGNvbnN0IHN1Y2Nlc3MgPSB0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgdGhpcy5nbC5MSU5LX1NUQVRVUyk7XG5cblx0XHRpZiAoc3VjY2Vzcykge1xuXHRcdFx0cmV0dXJuIHByb2dyYW07XG5cdFx0fVxuXG5cdFx0Y29uc29sZS5sb2codGhpcy5nbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XG5cdFx0dGhpcy5nbC5kZWxldGVQcm9ncmFtKHByb2dyYW0pO1xuXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwi0J7RiNC40LHQutCwINC/0YDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDQv9GA0L7Qs9GA0LDQvNC80YtcIik7XG5cdH1cbn1cblxuZnVuY3Rpb24gZ2V0Q3ViZSgpIHtcblx0Y29uc3QgdmVydGljZXMgPSBbXG5cdFx0Ly8g0LvQuNGG0LXQstCw0Y8g0YfQsNGB0YLRjFxuXHRcdC0wLjUsIC0wLjUsIDAuNSxcblx0XHQtMC41LCAwLjUsIDAuNSxcblx0XHQwLjUsIDAuNSwgMC41LFxuXHRcdDAuNSwgLTAuNSwgMC41LFxuXHRcdC8vINC30LDQtNC90Y/RjyDRh9Cw0YHRgtGMXG5cdFx0LTAuNSwgLTAuNSwgLTAuNSxcblx0XHQtMC41LCAwLjUsIC0wLjUsXG5cdFx0MC41LCAwLjUsIC0wLjUsXG5cdFx0MC41LCAtMC41LCAtMC41XG5cdF07XG5cblx0Y29uc3QgaW5kaWNlcyA9IFtcblx0XHQvLyDQu9C40YbQtdCy0LDRjyDRh9Cw0YHRgtGMXG5cdFx0MiwgMSwgMCxcblx0XHQwLCAzLCAyLFxuXHRcdC8vIC8v0L3QuNC20L3Rj9GPINGH0LDRgdGC0Yxcblx0XHQwLCA0LCA3LFxuXHRcdDcsIDMsIDAsXG5cdFx0Ly8gLy8g0LvQtdCy0LDRjyDQsdC+0LrQvtCy0LDRjyDRh9Cw0YHRgtGMXG5cdFx0MCwgMSwgNSxcblx0XHQ1LCA0LCAwLFxuXHRcdC8vIC8vINC/0YDQsNCy0LDRjyDQsdC+0LrQvtCy0LDRjyDRh9Cw0YHRgtGMXG5cdFx0MiwgMywgNyxcblx0XHQ3LCA2LCAyLFxuXHRcdC8vIC8vINCy0LXRgNGF0L3Rj9GPINGH0LDRgdGC0Yxcblx0XHQ2LCAxLCAyLFxuXHRcdDYsIDUsIDEsXG5cdFx0Ly8gLy8g0LfQsNC00L3Rj9GPINGH0LDRgdGC0Yxcblx0XHQ0LCA1LCA2LFxuXHRcdDYsIDcsIDQsXG5cdF07XG5cblx0cmV0dXJuIHtcblx0XHR2ZXJ0aWNlcyxcblx0XHRpbmRpY2VzXG5cdH07XG59XG4iLCJpbXBvcnQgVmVjdG9yMyBmcm9tIFwiLi9WZWN0b3IzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRyYW5zZm9ybSB7XG5cdHB1YmxpYyBwb3NpdGlvbjogVmVjdG9yMztcblx0cHVibGljIGFuZ2xlOiBWZWN0b3IzO1xuXHRwdWJsaWMgc2NhbGU6IFZlY3RvcjM7XG5cblx0Y29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvcjMgPSBWZWN0b3IzLnplcm8oKSwgYW5nbGU6IFZlY3RvcjMgPSBWZWN0b3IzLnplcm8oKSwgc2NhbGU6IFZlY3RvcjMgPSBuZXcgVmVjdG9yMygxLCAxLCAxKSkge1xuXHRcdHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcblx0XHR0aGlzLmFuZ2xlID0gYW5nbGU7XG5cdFx0dGhpcy5zY2FsZSA9IHNjYWxlO1xuXHR9XG5cblx0c2V0UG9zaXRpb24oeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yMyh4LCB5LCB6KTtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yMyB7XG5cdGNvbnN0cnVjdG9yKHB1YmxpYyB4OiBudW1iZXIsIHB1YmxpYyB5OiBudW1iZXIsIHB1YmxpYyB6OiBudW1iZXIpIHsgfVxuXG5cdHN0YXRpYyB6ZXJvKCkge1xuXHRcdHJldHVybiBuZXcgVmVjdG9yMygwLCAwLCAwKTtcblx0fVxufVxuIiwiZXhwb3J0IGNvbnN0IE1BUF9IRUlHSFQgPSA2NDtcbmV4cG9ydCBjb25zdCBDSFVOS19TSVpFID0gMTY7XG5leHBvcnQgY29uc3QgTUFQX1NJWkUgPSAyO1xuXG5leHBvcnQgY29uc3QgTk9JU0VfQ09VTlQgPSA4O1xuIiwiXG4vKiFcbkBmaWxlb3ZlcnZpZXcgZ2wtbWF0cml4IC0gSGlnaCBwZXJmb3JtYW5jZSBtYXRyaXggYW5kIHZlY3RvciBvcGVyYXRpb25zXG5AYXV0aG9yIEJyYW5kb24gSm9uZXNcbkBhdXRob3IgQ29saW4gTWFjS2VuemllIElWXG5AdmVyc2lvbiAzLjQuMFxuXG5Db3B5cmlnaHQgKGMpIDIwMTUtMjAyMSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG5cbiovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSB0eXBlb2YgZ2xvYmFsVGhpcyAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWxUaGlzIDogZ2xvYmFsIHx8IHNlbGYsIGZhY3RvcnkoZ2xvYmFsLmdsTWF0cml4ID0ge30pKTtcbn0pKHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbiAgLyoqXG4gICAqIENvbW1vbiB1dGlsaXRpZXNcbiAgICogQG1vZHVsZSBnbE1hdHJpeFxuICAgKi9cbiAgLy8gQ29uZmlndXJhdGlvbiBDb25zdGFudHNcbiAgdmFyIEVQU0lMT04gPSAwLjAwMDAwMTtcbiAgdmFyIEFSUkFZX1RZUEUgPSB0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSBcInVuZGVmaW5lZFwiID8gRmxvYXQzMkFycmF5IDogQXJyYXk7XG4gIHZhciBSQU5ET00gPSBNYXRoLnJhbmRvbTtcbiAgdmFyIEFOR0xFX09SREVSID0gXCJ6eXhcIjtcbiAgLyoqXG4gICAqIFNldHMgdGhlIHR5cGUgb2YgYXJyYXkgdXNlZCB3aGVuIGNyZWF0aW5nIG5ldyB2ZWN0b3JzIGFuZCBtYXRyaWNlc1xuICAgKlxuICAgKiBAcGFyYW0ge0Zsb2F0MzJBcnJheUNvbnN0cnVjdG9yIHwgQXJyYXlDb25zdHJ1Y3Rvcn0gdHlwZSBBcnJheSB0eXBlLCBzdWNoIGFzIEZsb2F0MzJBcnJheSBvciBBcnJheVxuICAgKi9cblxuICBmdW5jdGlvbiBzZXRNYXRyaXhBcnJheVR5cGUodHlwZSkge1xuICAgIEFSUkFZX1RZUEUgPSB0eXBlO1xuICB9XG4gIHZhciBkZWdyZWUgPSBNYXRoLlBJIC8gMTgwO1xuICAvKipcbiAgICogQ29udmVydCBEZWdyZWUgVG8gUmFkaWFuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhIEFuZ2xlIGluIERlZ3JlZXNcbiAgICovXG5cbiAgZnVuY3Rpb24gdG9SYWRpYW4oYSkge1xuICAgIHJldHVybiBhICogZGVncmVlO1xuICB9XG4gIC8qKlxuICAgKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCB0aGUgYXJndW1lbnRzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSB2YWx1ZSwgd2l0aGluIGFuIGFic29sdXRlXG4gICAqIG9yIHJlbGF0aXZlIHRvbGVyYW5jZSBvZiBnbE1hdHJpeC5FUFNJTE9OIChhbiBhYnNvbHV0ZSB0b2xlcmFuY2UgaXMgdXNlZCBmb3IgdmFsdWVzIGxlc3NcbiAgICogdGhhbiBvciBlcXVhbCB0byAxLjAsIGFuZCBhIHJlbGF0aXZlIHRvbGVyYW5jZSBpcyB1c2VkIGZvciBsYXJnZXIgdmFsdWVzKVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgbnVtYmVyIHRvIHRlc3QuXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgbnVtYmVyIHRvIHRlc3QuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBudW1iZXJzIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVxdWFscyQ5KGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoYSAtIGIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEpLCBNYXRoLmFicyhiKSk7XG4gIH1cbiAgaWYgKCFNYXRoLmh5cG90KSBNYXRoLmh5cG90ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB5ID0gMCxcbiAgICAgICAgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB5ICs9IGFyZ3VtZW50c1tpXSAqIGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KHkpO1xuICB9O1xuXG4gIHZhciBjb21tb24gPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIEVQU0lMT046IEVQU0lMT04sXG4gICAgZ2V0IEFSUkFZX1RZUEUgKCkgeyByZXR1cm4gQVJSQVlfVFlQRTsgfSxcbiAgICBSQU5ET006IFJBTkRPTSxcbiAgICBBTkdMRV9PUkRFUjogQU5HTEVfT1JERVIsXG4gICAgc2V0TWF0cml4QXJyYXlUeXBlOiBzZXRNYXRyaXhBcnJheVR5cGUsXG4gICAgdG9SYWRpYW46IHRvUmFkaWFuLFxuICAgIGVxdWFsczogZXF1YWxzJDlcbiAgfSk7XG5cbiAgLyoqXG4gICAqIDJ4MiBNYXRyaXhcbiAgICogQG1vZHVsZSBtYXQyXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDJcbiAgICpcbiAgICogQHJldHVybnMge21hdDJ9IGEgbmV3IDJ4MiBtYXRyaXhcbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlJDgoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDQpO1xuXG4gICAgaWYgKEFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgICBvdXRbMV0gPSAwO1xuICAgICAgb3V0WzJdID0gMDtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBtYXQyIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIG1hdHJpeCB0byBjbG9uZVxuICAgKiBAcmV0dXJucyB7bWF0Mn0gYSBuZXcgMngyIG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBjbG9uZSQ4KGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoNCk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MiB0byBhbm90aGVyXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY29weSQ4KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IGEgbWF0MiB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaWRlbnRpdHkkNShvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBtYXQyIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMCBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAyKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDMpXG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXQgQSBuZXcgMngyIG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tVmFsdWVzJDgobTAwLCBtMDEsIG0xMCwgbTExKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IG0wMDtcbiAgICBvdXRbMV0gPSBtMDE7XG4gICAgb3V0WzJdID0gbTEwO1xuICAgIG91dFszXSA9IG0xMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBtYXQyIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMCBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAwKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAzKVxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldCQ4KG91dCwgbTAwLCBtMDEsIG0xMCwgbTExKSB7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMTA7XG4gICAgb3V0WzNdID0gbTExO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0MlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zcG9zZSQyKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGVcbiAgICAvLyBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgIHZhciBhMSA9IGFbMV07XG4gICAgICBvdXRbMV0gPSBhWzJdO1xuICAgICAgb3V0WzJdID0gYTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICBvdXRbMV0gPSBhWzJdO1xuICAgICAgb3V0WzJdID0gYVsxXTtcbiAgICAgIG91dFszXSA9IGFbM107XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogSW52ZXJ0cyBhIG1hdDJcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZlcnQkNShvdXQsIGEpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdOyAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG5cbiAgICB2YXIgZGV0ID0gYTAgKiBhMyAtIGEyICogYTE7XG5cbiAgICBpZiAoIWRldCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuICAgIG91dFswXSA9IGEzICogZGV0O1xuICAgIG91dFsxXSA9IC1hMSAqIGRldDtcbiAgICBvdXRbMl0gPSAtYTIgKiBkZXQ7XG4gICAgb3V0WzNdID0gYTAgKiBkZXQ7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQyXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRqb2ludCQyKG91dCwgYSkge1xuICAgIC8vIENhY2hpbmcgdGhpcyB2YWx1ZSBpcyBuZWNlc3NhcnkgaWYgb3V0ID09IGFcbiAgICB2YXIgYTAgPSBhWzBdO1xuICAgIG91dFswXSA9IGFbM107XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gYTA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQyXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAgICovXG5cbiAgZnVuY3Rpb24gZGV0ZXJtaW5hbnQkMyhhKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBhWzNdIC0gYVsyXSAqIGFbMV07XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgdHdvIG1hdDInc1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseSQ4KG91dCwgYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM107XG4gICAgdmFyIGIwID0gYlswXSxcbiAgICAgICAgYjEgPSBiWzFdLFxuICAgICAgICBiMiA9IGJbMl0sXG4gICAgICAgIGIzID0gYlszXTtcbiAgICBvdXRbMF0gPSBhMCAqIGIwICsgYTIgKiBiMTtcbiAgICBvdXRbMV0gPSBhMSAqIGIwICsgYTMgKiBiMTtcbiAgICBvdXRbMl0gPSBhMCAqIGIyICsgYTIgKiBiMztcbiAgICBvdXRbM10gPSBhMSAqIGIyICsgYTMgKiBiMztcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgbWF0MiBieSB0aGUgZ2l2ZW4gYW5nbGVcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGUkNChvdXQsIGEsIHJhZCkge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM107XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBhMCAqIGMgKyBhMiAqIHM7XG4gICAgb3V0WzFdID0gYTEgKiBjICsgYTMgKiBzO1xuICAgIG91dFsyXSA9IGEwICogLXMgKyBhMiAqIGM7XG4gICAgb3V0WzNdID0gYTEgKiAtcyArIGEzICogYztcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTY2FsZXMgdGhlIG1hdDIgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgdGhlIHZlYzIgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqKi9cblxuICBmdW5jdGlvbiBzY2FsZSQ4KG91dCwgYSwgdikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM107XG4gICAgdmFyIHYwID0gdlswXSxcbiAgICAgICAgdjEgPSB2WzFdO1xuICAgIG91dFswXSA9IGEwICogdjA7XG4gICAgb3V0WzFdID0gYTEgKiB2MDtcbiAgICBvdXRbMl0gPSBhMiAqIHYxO1xuICAgIG91dFszXSA9IGEzICogdjE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGVcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQyLmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0Mi5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgbWF0MiByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21Sb3RhdGlvbiQ0KG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBjO1xuICAgIG91dFsxXSA9IHM7XG4gICAgb3V0WzJdID0gLXM7XG4gICAgb3V0WzNdID0gYztcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDIuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQyLnNjYWxlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IG1hdDIgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgU2NhbGluZyB2ZWN0b3JcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tU2NhbGluZyQzKG91dCwgdikge1xuICAgIG91dFswXSA9IHZbMF07XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IHZbMV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDJcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBzdHIkOChhKSB7XG4gICAgcmV0dXJuIFwibWF0MihcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIilcIjtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDJcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAgICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvYiQzKGEpIHtcbiAgICByZXR1cm4gTWF0aC5oeXBvdChhWzBdLCBhWzFdLCBhWzJdLCBhWzNdKTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBMLCBEIGFuZCBVIG1hdHJpY2VzIChMb3dlciB0cmlhbmd1bGFyLCBEaWFnb25hbCBhbmQgVXBwZXIgdHJpYW5ndWxhcikgYnkgZmFjdG9yaXppbmcgdGhlIGlucHV0IG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gTCB0aGUgbG93ZXIgdHJpYW5ndWxhciBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IEQgdGhlIGRpYWdvbmFsIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gVSB0aGUgdXBwZXIgdHJpYW5ndWxhciBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIGlucHV0IG1hdHJpeCB0byBmYWN0b3JpemVcbiAgICovXG5cbiAgZnVuY3Rpb24gTERVKEwsIEQsIFUsIGEpIHtcbiAgICBMWzJdID0gYVsyXSAvIGFbMF07XG4gICAgVVswXSA9IGFbMF07XG4gICAgVVsxXSA9IGFbMV07XG4gICAgVVszXSA9IGFbM10gLSBMWzJdICogVVsxXTtcbiAgICByZXR1cm4gW0wsIEQsIFVdO1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIHR3byBtYXQyJ3NcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkJDgob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGFcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc3VidHJhY3QkNihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4YWN0RXF1YWxzJDgoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVxdWFscyQ4KGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdO1xuICAgIHZhciBiMCA9IGJbMF0sXG4gICAgICAgIGIxID0gYlsxXSxcbiAgICAgICAgYjIgPSBiWzJdLFxuICAgICAgICBiMyA9IGJbM107XG4gICAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKTtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSBtYXRyaXgncyBlbGVtZW50cyBieVxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyJDMob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgb3V0WzNdID0gYVszXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gbWF0MidzIGFmdGVyIG11bHRpcGx5aW5nIGVhY2ggZWxlbWVudCBvZiB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiJ3MgZWxlbWVudHMgYnkgYmVmb3JlIGFkZGluZ1xuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyQW5kQWRkJDMob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBtYXQyLm11bHRpcGx5fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG11bCQ4ID0gbXVsdGlwbHkkODtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgbWF0Mi5zdWJ0cmFjdH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzdWIkNiA9IHN1YnRyYWN0JDY7XG5cbiAgdmFyIG1hdDIgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIGNyZWF0ZTogY3JlYXRlJDgsXG4gICAgY2xvbmU6IGNsb25lJDgsXG4gICAgY29weTogY29weSQ4LFxuICAgIGlkZW50aXR5OiBpZGVudGl0eSQ1LFxuICAgIGZyb21WYWx1ZXM6IGZyb21WYWx1ZXMkOCxcbiAgICBzZXQ6IHNldCQ4LFxuICAgIHRyYW5zcG9zZTogdHJhbnNwb3NlJDIsXG4gICAgaW52ZXJ0OiBpbnZlcnQkNSxcbiAgICBhZGpvaW50OiBhZGpvaW50JDIsXG4gICAgZGV0ZXJtaW5hbnQ6IGRldGVybWluYW50JDMsXG4gICAgbXVsdGlwbHk6IG11bHRpcGx5JDgsXG4gICAgcm90YXRlOiByb3RhdGUkNCxcbiAgICBzY2FsZTogc2NhbGUkOCxcbiAgICBmcm9tUm90YXRpb246IGZyb21Sb3RhdGlvbiQ0LFxuICAgIGZyb21TY2FsaW5nOiBmcm9tU2NhbGluZyQzLFxuICAgIHN0cjogc3RyJDgsXG4gICAgZnJvYjogZnJvYiQzLFxuICAgIExEVTogTERVLFxuICAgIGFkZDogYWRkJDgsXG4gICAgc3VidHJhY3Q6IHN1YnRyYWN0JDYsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzJDgsXG4gICAgZXF1YWxzOiBlcXVhbHMkOCxcbiAgICBtdWx0aXBseVNjYWxhcjogbXVsdGlwbHlTY2FsYXIkMyxcbiAgICBtdWx0aXBseVNjYWxhckFuZEFkZDogbXVsdGlwbHlTY2FsYXJBbmRBZGQkMyxcbiAgICBtdWw6IG11bCQ4LFxuICAgIHN1Yjogc3ViJDZcbiAgfSk7XG5cbiAgLyoqXG4gICAqIDJ4MyBNYXRyaXhcbiAgICogQG1vZHVsZSBtYXQyZFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogQSBtYXQyZCBjb250YWlucyBzaXggZWxlbWVudHMgZGVmaW5lZCBhczpcbiAgICogPHByZT5cbiAgICogW2EsIGIsXG4gICAqICBjLCBkLFxuICAgKiAgdHgsIHR5XVxuICAgKiA8L3ByZT5cbiAgICogVGhpcyBpcyBhIHNob3J0IGZvcm0gZm9yIHRoZSAzeDMgbWF0cml4OlxuICAgKiA8cHJlPlxuICAgKiBbYSwgYiwgMCxcbiAgICogIGMsIGQsIDAsXG4gICAqICB0eCwgdHksIDFdXG4gICAqIDwvcHJlPlxuICAgKiBUaGUgbGFzdCBjb2x1bW4gaXMgaWdub3JlZCBzbyB0aGUgYXJyYXkgaXMgc2hvcnRlciBhbmQgb3BlcmF0aW9ucyBhcmUgZmFzdGVyLlxuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQyZFxuICAgKlxuICAgKiBAcmV0dXJucyB7bWF0MmR9IGEgbmV3IDJ4MyBtYXRyaXhcbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlJDcoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDYpO1xuXG4gICAgaWYgKEFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgICBvdXRbMV0gPSAwO1xuICAgICAgb3V0WzJdID0gMDtcbiAgICAgIG91dFs0XSA9IDA7XG4gICAgICBvdXRbNV0gPSAwO1xuICAgIH1cblxuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IG1hdDJkIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSBtYXRyaXggdG8gY2xvbmVcbiAgICogQHJldHVybnMge21hdDJkfSBhIG5ldyAyeDMgbWF0cml4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsb25lJDcoYSkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg2KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MmQgdG8gYW5vdGhlclxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvcHkkNyhvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgYSBtYXQyZCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpZGVudGl0eSQ0KG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBtYXQyZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGEgQ29tcG9uZW50IEEgKGluZGV4IDApXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIENvbXBvbmVudCBCIChpbmRleCAxKVxuICAgKiBAcGFyYW0ge051bWJlcn0gYyBDb21wb25lbnQgQyAoaW5kZXggMilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGQgQ29tcG9uZW50IEQgKGluZGV4IDMpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0eCBDb21wb25lbnQgVFggKGluZGV4IDQpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0eSBDb21wb25lbnQgVFkgKGluZGV4IDUpXG4gICAqIEByZXR1cm5zIHttYXQyZH0gQSBuZXcgbWF0MmRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVZhbHVlcyQ3KGEsIGIsIGMsIGQsIHR4LCB0eSkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg2KTtcbiAgICBvdXRbMF0gPSBhO1xuICAgIG91dFsxXSA9IGI7XG4gICAgb3V0WzJdID0gYztcbiAgICBvdXRbM10gPSBkO1xuICAgIG91dFs0XSA9IHR4O1xuICAgIG91dFs1XSA9IHR5O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDJkIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhIENvbXBvbmVudCBBIChpbmRleCAwKVxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBDb21wb25lbnQgQiAoaW5kZXggMSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGMgQ29tcG9uZW50IEMgKGluZGV4IDIpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkIENvbXBvbmVudCBEIChpbmRleCAzKVxuICAgKiBAcGFyYW0ge051bWJlcn0gdHggQ29tcG9uZW50IFRYIChpbmRleCA0KVxuICAgKiBAcGFyYW0ge051bWJlcn0gdHkgQ29tcG9uZW50IFRZIChpbmRleCA1KVxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzZXQkNyhvdXQsIGEsIGIsIGMsIGQsIHR4LCB0eSkge1xuICAgIG91dFswXSA9IGE7XG4gICAgb3V0WzFdID0gYjtcbiAgICBvdXRbMl0gPSBjO1xuICAgIG91dFszXSA9IGQ7XG4gICAgb3V0WzRdID0gdHg7XG4gICAgb3V0WzVdID0gdHk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogSW52ZXJ0cyBhIG1hdDJkXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaW52ZXJ0JDQob3V0LCBhKSB7XG4gICAgdmFyIGFhID0gYVswXSxcbiAgICAgICAgYWIgPSBhWzFdLFxuICAgICAgICBhYyA9IGFbMl0sXG4gICAgICAgIGFkID0gYVszXTtcbiAgICB2YXIgYXR4ID0gYVs0XSxcbiAgICAgICAgYXR5ID0gYVs1XTtcbiAgICB2YXIgZGV0ID0gYWEgKiBhZCAtIGFiICogYWM7XG5cbiAgICBpZiAoIWRldCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuICAgIG91dFswXSA9IGFkICogZGV0O1xuICAgIG91dFsxXSA9IC1hYiAqIGRldDtcbiAgICBvdXRbMl0gPSAtYWMgKiBkZXQ7XG4gICAgb3V0WzNdID0gYWEgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGFjICogYXR5IC0gYWQgKiBhdHgpICogZGV0O1xuICAgIG91dFs1XSA9IChhYiAqIGF0eCAtIGFhICogYXR5KSAqIGRldDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDJkXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRldGVybWluYW50JDIoYSkge1xuICAgIHJldHVybiBhWzBdICogYVszXSAtIGFbMV0gKiBhWzJdO1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byBtYXQyZCdzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseSQ3KG91dCwgYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM10sXG4gICAgICAgIGE0ID0gYVs0XSxcbiAgICAgICAgYTUgPSBhWzVdO1xuICAgIHZhciBiMCA9IGJbMF0sXG4gICAgICAgIGIxID0gYlsxXSxcbiAgICAgICAgYjIgPSBiWzJdLFxuICAgICAgICBiMyA9IGJbM10sXG4gICAgICAgIGI0ID0gYls0XSxcbiAgICAgICAgYjUgPSBiWzVdO1xuICAgIG91dFswXSA9IGEwICogYjAgKyBhMiAqIGIxO1xuICAgIG91dFsxXSA9IGExICogYjAgKyBhMyAqIGIxO1xuICAgIG91dFsyXSA9IGEwICogYjIgKyBhMiAqIGIzO1xuICAgIG91dFszXSA9IGExICogYjIgKyBhMyAqIGIzO1xuICAgIG91dFs0XSA9IGEwICogYjQgKyBhMiAqIGI1ICsgYTQ7XG4gICAgb3V0WzVdID0gYTEgKiBiNCArIGEzICogYjUgKyBhNTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgbWF0MmQgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlJDMob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdLFxuICAgICAgICBhNCA9IGFbNF0sXG4gICAgICAgIGE1ID0gYVs1XTtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGEwICogYyArIGEyICogcztcbiAgICBvdXRbMV0gPSBhMSAqIGMgKyBhMyAqIHM7XG4gICAgb3V0WzJdID0gYTAgKiAtcyArIGEyICogYztcbiAgICBvdXRbM10gPSBhMSAqIC1zICsgYTMgKiBjO1xuICAgIG91dFs0XSA9IGE0O1xuICAgIG91dFs1XSA9IGE1O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNjYWxlcyB0aGUgbWF0MmQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gdiB0aGUgdmVjMiB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqKi9cblxuICBmdW5jdGlvbiBzY2FsZSQ3KG91dCwgYSwgdikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM10sXG4gICAgICAgIGE0ID0gYVs0XSxcbiAgICAgICAgYTUgPSBhWzVdO1xuICAgIHZhciB2MCA9IHZbMF0sXG4gICAgICAgIHYxID0gdlsxXTtcbiAgICBvdXRbMF0gPSBhMCAqIHYwO1xuICAgIG91dFsxXSA9IGExICogdjA7XG4gICAgb3V0WzJdID0gYTIgKiB2MTtcbiAgICBvdXRbM10gPSBhMyAqIHYxO1xuICAgIG91dFs0XSA9IGE0O1xuICAgIG91dFs1XSA9IGE1O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZXMgdGhlIG1hdDJkIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgdGhlIHZlYzIgdG8gdHJhbnNsYXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICoqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZSQzKG91dCwgYSwgdikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM10sXG4gICAgICAgIGE0ID0gYVs0XSxcbiAgICAgICAgYTUgPSBhWzVdO1xuICAgIHZhciB2MCA9IHZbMF0sXG4gICAgICAgIHYxID0gdlsxXTtcbiAgICBvdXRbMF0gPSBhMDtcbiAgICBvdXRbMV0gPSBhMTtcbiAgICBvdXRbMl0gPSBhMjtcbiAgICBvdXRbM10gPSBhMztcbiAgICBvdXRbNF0gPSBhMCAqIHYwICsgYTIgKiB2MSArIGE0O1xuICAgIG91dFs1XSA9IGExICogdjAgKyBhMyAqIHYxICsgYTU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGVcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQyZC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDJkLnJvdGF0ZShkZXN0LCBkZXN0LCByYWQpO1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgbWF0MmQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVJvdGF0aW9uJDMob3V0LCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGM7XG4gICAgb3V0WzFdID0gcztcbiAgICBvdXRbMl0gPSAtcztcbiAgICBvdXRbM10gPSBjO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDJkLmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0MmQuc2NhbGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IG1hdDJkIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IFNjYWxpbmcgdmVjdG9yXG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21TY2FsaW5nJDIob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gdlswXTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gdlsxXTtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHRyYW5zbGF0aW9uXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0MmQuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQyZC50cmFuc2xhdGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IG1hdDJkIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tVHJhbnNsYXRpb24kMyhvdXQsIHYpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIG91dFs0XSA9IHZbMF07XG4gICAgb3V0WzVdID0gdlsxXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0MmRcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyJDcoYSkge1xuICAgIHJldHVybiBcIm1hdDJkKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiLCBcIiArIGFbNF0gKyBcIiwgXCIgKyBhWzVdICsgXCIpXCI7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQyZFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAgICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvYiQyKGEpIHtcbiAgICByZXR1cm4gTWF0aC5oeXBvdChhWzBdLCBhWzFdLCBhWzJdLCBhWzNdLCBhWzRdLCBhWzVdLCAxKTtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gbWF0MmQnc1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkJDcob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gICAgb3V0WzVdID0gYVs1XSArIGJbNV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGFcbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0JDUob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gICAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gICAgb3V0WzVdID0gYVs1XSAtIGJbNV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyJDIob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgb3V0WzNdID0gYVszXSAqIGI7XG4gICAgb3V0WzRdID0gYVs0XSAqIGI7XG4gICAgb3V0WzVdID0gYVs1XSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gbWF0MmQncyBhZnRlciBtdWx0aXBseWluZyBlYWNoIGVsZW1lbnQgb2YgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYidzIGVsZW1lbnRzIGJ5IGJlZm9yZSBhZGRpbmdcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXJBbmRBZGQkMihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gICAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XSAqIHNjYWxlO1xuICAgIG91dFs1XSA9IGFbNV0gKyBiWzVdICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgVGhlIGZpcnN0IG1hdHJpeC5cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4YWN0RXF1YWxzJDcoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIGFbNF0gPT09IGJbNF0gJiYgYVs1XSA9PT0gYls1XTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgVGhlIGZpcnN0IG1hdHJpeC5cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVxdWFscyQ3KGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdLFxuICAgICAgICBhNCA9IGFbNF0sXG4gICAgICAgIGE1ID0gYVs1XTtcbiAgICB2YXIgYjAgPSBiWzBdLFxuICAgICAgICBiMSA9IGJbMV0sXG4gICAgICAgIGIyID0gYlsyXSxcbiAgICAgICAgYjMgPSBiWzNdLFxuICAgICAgICBiNCA9IGJbNF0sXG4gICAgICAgIGI1ID0gYls1XTtcbiAgICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJiBNYXRoLmFicyhhMiAtIGIyKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiYgTWF0aC5hYnMoYTMgLSBiMykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpICYmIE1hdGguYWJzKGE0IC0gYjQpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE0KSwgTWF0aC5hYnMoYjQpKSAmJiBNYXRoLmFicyhhNSAtIGI1KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNSksIE1hdGguYWJzKGI1KSk7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgbWF0MmQubXVsdGlwbHl9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbXVsJDcgPSBtdWx0aXBseSQ3O1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBtYXQyZC5zdWJ0cmFjdH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzdWIkNSA9IHN1YnRyYWN0JDU7XG5cbiAgdmFyIG1hdDJkID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBjcmVhdGU6IGNyZWF0ZSQ3LFxuICAgIGNsb25lOiBjbG9uZSQ3LFxuICAgIGNvcHk6IGNvcHkkNyxcbiAgICBpZGVudGl0eTogaWRlbnRpdHkkNCxcbiAgICBmcm9tVmFsdWVzOiBmcm9tVmFsdWVzJDcsXG4gICAgc2V0OiBzZXQkNyxcbiAgICBpbnZlcnQ6IGludmVydCQ0LFxuICAgIGRldGVybWluYW50OiBkZXRlcm1pbmFudCQyLFxuICAgIG11bHRpcGx5OiBtdWx0aXBseSQ3LFxuICAgIHJvdGF0ZTogcm90YXRlJDMsXG4gICAgc2NhbGU6IHNjYWxlJDcsXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUkMyxcbiAgICBmcm9tUm90YXRpb246IGZyb21Sb3RhdGlvbiQzLFxuICAgIGZyb21TY2FsaW5nOiBmcm9tU2NhbGluZyQyLFxuICAgIGZyb21UcmFuc2xhdGlvbjogZnJvbVRyYW5zbGF0aW9uJDMsXG4gICAgc3RyOiBzdHIkNyxcbiAgICBmcm9iOiBmcm9iJDIsXG4gICAgYWRkOiBhZGQkNyxcbiAgICBzdWJ0cmFjdDogc3VidHJhY3QkNSxcbiAgICBtdWx0aXBseVNjYWxhcjogbXVsdGlwbHlTY2FsYXIkMixcbiAgICBtdWx0aXBseVNjYWxhckFuZEFkZDogbXVsdGlwbHlTY2FsYXJBbmRBZGQkMixcbiAgICBleGFjdEVxdWFsczogZXhhY3RFcXVhbHMkNyxcbiAgICBlcXVhbHM6IGVxdWFscyQ3LFxuICAgIG11bDogbXVsJDcsXG4gICAgc3ViOiBzdWIkNVxuICB9KTtcblxuICAvKipcbiAgICogM3gzIE1hdHJpeFxuICAgKiBAbW9kdWxlIG1hdDNcbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0M1xuICAgKlxuICAgKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGUkNigpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoOSk7XG5cbiAgICBpZiAoQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICAgIG91dFsxXSA9IDA7XG4gICAgICBvdXRbMl0gPSAwO1xuICAgICAgb3V0WzNdID0gMDtcbiAgICAgIG91dFs1XSA9IDA7XG4gICAgICBvdXRbNl0gPSAwO1xuICAgICAgb3V0WzddID0gMDtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFs0XSA9IDE7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDb3BpZXMgdGhlIHVwcGVyLWxlZnQgM3gzIHZhbHVlcyBpbnRvIHRoZSBnaXZlbiBtYXQzLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIDN4MyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgICB0aGUgc291cmNlIDR4NCBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tTWF0NCQxKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbNF07XG4gICAgb3V0WzRdID0gYVs1XTtcbiAgICBvdXRbNV0gPSBhWzZdO1xuICAgIG91dFs2XSA9IGFbOF07XG4gICAgb3V0WzddID0gYVs5XTtcbiAgICBvdXRbOF0gPSBhWzEwXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IG1hdDMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgbWF0cml4IHRvIGNsb25lXG4gICAqIEByZXR1cm5zIHttYXQzfSBhIG5ldyAzeDMgbWF0cml4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsb25lJDYoYSkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg5KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0MyB0byBhbm90aGVyXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY29weSQ2KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBtYXQzIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMiBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAyKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDMpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMiBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAyIHBvc2l0aW9uIChpbmRleCA1KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDYpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNylcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMiBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAyIHBvc2l0aW9uIChpbmRleCA4KVxuICAgKiBAcmV0dXJucyB7bWF0M30gQSBuZXcgbWF0M1xuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tVmFsdWVzJDYobTAwLCBtMDEsIG0wMiwgbTEwLCBtMTEsIG0xMiwgbTIwLCBtMjEsIG0yMikge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg5KTtcbiAgICBvdXRbMF0gPSBtMDA7XG4gICAgb3V0WzFdID0gbTAxO1xuICAgIG91dFsyXSA9IG0wMjtcbiAgICBvdXRbM10gPSBtMTA7XG4gICAgb3V0WzRdID0gbTExO1xuICAgIG91dFs1XSA9IG0xMjtcbiAgICBvdXRbNl0gPSBtMjA7XG4gICAgb3V0WzddID0gbTIxO1xuICAgIG91dFs4XSA9IG0yMjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBtYXQzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMCBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAwKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMCBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAzKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDQpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMCBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA2KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDcpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggOClcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzZXQkNihvdXQsIG0wMCwgbTAxLCBtMDIsIG0xMCwgbTExLCBtMTIsIG0yMCwgbTIxLCBtMjIpIHtcbiAgICBvdXRbMF0gPSBtMDA7XG4gICAgb3V0WzFdID0gbTAxO1xuICAgIG91dFsyXSA9IG0wMjtcbiAgICBvdXRbM10gPSBtMTA7XG4gICAgb3V0WzRdID0gbTExO1xuICAgIG91dFs1XSA9IG0xMjtcbiAgICBvdXRbNl0gPSBtMjA7XG4gICAgb3V0WzddID0gbTIxO1xuICAgIG91dFs4XSA9IG0yMjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgYSBtYXQzIHRvIHRoZSBpZGVudGl0eSBtYXRyaXhcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpZGVudGl0eSQzKG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0M1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zcG9zZSQxKG91dCwgYSkge1xuICAgIC8vIElmIHdlIGFyZSB0cmFuc3Bvc2luZyBvdXJzZWx2ZXMgd2UgY2FuIHNraXAgYSBmZXcgc3RlcHMgYnV0IGhhdmUgdG8gY2FjaGUgc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICB2YXIgYTAxID0gYVsxXSxcbiAgICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICAgIGExMiA9IGFbNV07XG4gICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgIG91dFszXSA9IGEwMTtcbiAgICAgIG91dFs1XSA9IGFbN107XG4gICAgICBvdXRbNl0gPSBhMDI7XG4gICAgICBvdXRbN10gPSBhMTI7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICBvdXRbMV0gPSBhWzNdO1xuICAgICAgb3V0WzJdID0gYVs2XTtcbiAgICAgIG91dFszXSA9IGFbMV07XG4gICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgb3V0WzVdID0gYVs3XTtcbiAgICAgIG91dFs2XSA9IGFbMl07XG4gICAgICBvdXRbN10gPSBhWzVdO1xuICAgICAgb3V0WzhdID0gYVs4XTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBJbnZlcnRzIGEgbWF0M1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGludmVydCQzKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdO1xuICAgIHZhciBhMTAgPSBhWzNdLFxuICAgICAgICBhMTEgPSBhWzRdLFxuICAgICAgICBhMTIgPSBhWzVdO1xuICAgIHZhciBhMjAgPSBhWzZdLFxuICAgICAgICBhMjEgPSBhWzddLFxuICAgICAgICBhMjIgPSBhWzhdO1xuICAgIHZhciBiMDEgPSBhMjIgKiBhMTEgLSBhMTIgKiBhMjE7XG4gICAgdmFyIGIxMSA9IC1hMjIgKiBhMTAgKyBhMTIgKiBhMjA7XG4gICAgdmFyIGIyMSA9IGEyMSAqIGExMCAtIGExMSAqIGEyMDsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gICAgdmFyIGRldCA9IGEwMCAqIGIwMSArIGEwMSAqIGIxMSArIGEwMiAqIGIyMTtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG4gICAgb3V0WzBdID0gYjAxICogZGV0O1xuICAgIG91dFsxXSA9ICgtYTIyICogYTAxICsgYTAyICogYTIxKSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTEyICogYTAxIC0gYTAyICogYTExKSAqIGRldDtcbiAgICBvdXRbM10gPSBiMTEgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGEyMiAqIGEwMCAtIGEwMiAqIGEyMCkgKiBkZXQ7XG4gICAgb3V0WzVdID0gKC1hMTIgKiBhMDAgKyBhMDIgKiBhMTApICogZGV0O1xuICAgIG91dFs2XSA9IGIyMSAqIGRldDtcbiAgICBvdXRbN10gPSAoLWEyMSAqIGEwMCArIGEwMSAqIGEyMCkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGExMSAqIGEwMCAtIGEwMSAqIGExMCkgKiBkZXQ7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRqb2ludCQxKG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdO1xuICAgIHZhciBhMTAgPSBhWzNdLFxuICAgICAgICBhMTEgPSBhWzRdLFxuICAgICAgICBhMTIgPSBhWzVdO1xuICAgIHZhciBhMjAgPSBhWzZdLFxuICAgICAgICBhMjEgPSBhWzddLFxuICAgICAgICBhMjIgPSBhWzhdO1xuICAgIG91dFswXSA9IGExMSAqIGEyMiAtIGExMiAqIGEyMTtcbiAgICBvdXRbMV0gPSBhMDIgKiBhMjEgLSBhMDEgKiBhMjI7XG4gICAgb3V0WzJdID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgIG91dFszXSA9IGExMiAqIGEyMCAtIGExMCAqIGEyMjtcbiAgICBvdXRbNF0gPSBhMDAgKiBhMjIgLSBhMDIgKiBhMjA7XG4gICAgb3V0WzVdID0gYTAyICogYTEwIC0gYTAwICogYTEyO1xuICAgIG91dFs2XSA9IGExMCAqIGEyMSAtIGExMSAqIGEyMDtcbiAgICBvdXRbN10gPSBhMDEgKiBhMjAgLSBhMDAgKiBhMjE7XG4gICAgb3V0WzhdID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0M1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRldGVybWluYW50JDEoYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdO1xuICAgIHZhciBhMTAgPSBhWzNdLFxuICAgICAgICBhMTEgPSBhWzRdLFxuICAgICAgICBhMTIgPSBhWzVdO1xuICAgIHZhciBhMjAgPSBhWzZdLFxuICAgICAgICBhMjEgPSBhWzddLFxuICAgICAgICBhMjIgPSBhWzhdO1xuICAgIHJldHVybiBhMDAgKiAoYTIyICogYTExIC0gYTEyICogYTIxKSArIGEwMSAqICgtYTIyICogYTEwICsgYTEyICogYTIwKSArIGEwMiAqIChhMjEgKiBhMTAgLSBhMTEgKiBhMjApO1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byBtYXQzJ3NcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHkkNihvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXTtcbiAgICB2YXIgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XTtcbiAgICB2YXIgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XTtcbiAgICB2YXIgYjAwID0gYlswXSxcbiAgICAgICAgYjAxID0gYlsxXSxcbiAgICAgICAgYjAyID0gYlsyXTtcbiAgICB2YXIgYjEwID0gYlszXSxcbiAgICAgICAgYjExID0gYls0XSxcbiAgICAgICAgYjEyID0gYls1XTtcbiAgICB2YXIgYjIwID0gYls2XSxcbiAgICAgICAgYjIxID0gYls3XSxcbiAgICAgICAgYjIyID0gYls4XTtcbiAgICBvdXRbMF0gPSBiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjA7XG4gICAgb3V0WzFdID0gYjAwICogYTAxICsgYjAxICogYTExICsgYjAyICogYTIxO1xuICAgIG91dFsyXSA9IGIwMCAqIGEwMiArIGIwMSAqIGExMiArIGIwMiAqIGEyMjtcbiAgICBvdXRbM10gPSBiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjA7XG4gICAgb3V0WzRdID0gYjEwICogYTAxICsgYjExICogYTExICsgYjEyICogYTIxO1xuICAgIG91dFs1XSA9IGIxMCAqIGEwMiArIGIxMSAqIGExMiArIGIxMiAqIGEyMjtcbiAgICBvdXRbNl0gPSBiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjA7XG4gICAgb3V0WzddID0gYjIwICogYTAxICsgYjIxICogYTExICsgYjIyICogYTIxO1xuICAgIG91dFs4XSA9IGIyMCAqIGEwMiArIGIyMSAqIGExMiArIGIyMiAqIGEyMjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgYSBtYXQzIGJ5IHRoZSBnaXZlbiB2ZWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZSQyKG91dCwgYSwgdikge1xuICAgIHZhciBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMTAgPSBhWzNdLFxuICAgICAgICBhMTEgPSBhWzRdLFxuICAgICAgICBhMTIgPSBhWzVdLFxuICAgICAgICBhMjAgPSBhWzZdLFxuICAgICAgICBhMjEgPSBhWzddLFxuICAgICAgICBhMjIgPSBhWzhdLFxuICAgICAgICB4ID0gdlswXSxcbiAgICAgICAgeSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTAwO1xuICAgIG91dFsxXSA9IGEwMTtcbiAgICBvdXRbMl0gPSBhMDI7XG4gICAgb3V0WzNdID0gYTEwO1xuICAgIG91dFs0XSA9IGExMTtcbiAgICBvdXRbNV0gPSBhMTI7XG4gICAgb3V0WzZdID0geCAqIGEwMCArIHkgKiBhMTAgKyBhMjA7XG4gICAgb3V0WzddID0geCAqIGEwMSArIHkgKiBhMTEgKyBhMjE7XG4gICAgb3V0WzhdID0geCAqIGEwMiArIHkgKiBhMTIgKyBhMjI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIG1hdDMgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlJDIob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XSxcbiAgICAgICAgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGMgKiBhMDAgKyBzICogYTEwO1xuICAgIG91dFsxXSA9IGMgKiBhMDEgKyBzICogYTExO1xuICAgIG91dFsyXSA9IGMgKiBhMDIgKyBzICogYTEyO1xuICAgIG91dFszXSA9IGMgKiBhMTAgLSBzICogYTAwO1xuICAgIG91dFs0XSA9IGMgKiBhMTEgLSBzICogYTAxO1xuICAgIG91dFs1XSA9IGMgKiBhMTIgLSBzICogYTAyO1xuICAgIG91dFs2XSA9IGEyMDtcbiAgICBvdXRbN10gPSBhMjE7XG4gICAgb3V0WzhdID0gYTIyO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNjYWxlcyB0aGUgbWF0MyBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gdiB0aGUgdmVjMiB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICoqL1xuXG4gIGZ1bmN0aW9uIHNjYWxlJDYob3V0LCBhLCB2KSB7XG4gICAgdmFyIHggPSB2WzBdLFxuICAgICAgICB5ID0gdlsxXTtcbiAgICBvdXRbMF0gPSB4ICogYVswXTtcbiAgICBvdXRbMV0gPSB4ICogYVsxXTtcbiAgICBvdXRbMl0gPSB4ICogYVsyXTtcbiAgICBvdXRbM10gPSB5ICogYVszXTtcbiAgICBvdXRbNF0gPSB5ICogYVs0XTtcbiAgICBvdXRbNV0gPSB5ICogYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQzLmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0My50cmFuc2xhdGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tVHJhbnNsYXRpb24kMihvdXQsIHYpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDE7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSB2WzBdO1xuICAgIG91dFs3XSA9IHZbMV07XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBnaXZlbiBhbmdsZVxuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQzLnJvdGF0ZShkZXN0LCBkZXN0LCByYWQpO1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVJvdGF0aW9uJDIob3V0LCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGM7XG4gICAgb3V0WzFdID0gcztcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IC1zO1xuICAgIG91dFs0XSA9IGM7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDMuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQzLnNjYWxlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgU2NhbGluZyB2ZWN0b3JcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tU2NhbGluZyQxKG91dCwgdikge1xuICAgIG91dFswXSA9IHZbMF07XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gdlsxXTtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENvcGllcyB0aGUgdmFsdWVzIGZyb20gYSBtYXQyZCBpbnRvIGEgbWF0M1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIG1hdHJpeCB0byBjb3B5XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICoqL1xuXG4gIGZ1bmN0aW9uIGZyb21NYXQyZChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSBhWzJdO1xuICAgIG91dFs0XSA9IGFbM107XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSBhWzRdO1xuICAgIG91dFs3XSA9IGFbNV07XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGEgM3gzIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgUXVhdGVybmlvbiB0byBjcmVhdGUgbWF0cml4IGZyb21cbiAgICpcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tUXVhdCQxKG91dCwgcSkge1xuICAgIHZhciB4ID0gcVswXSxcbiAgICAgICAgeSA9IHFbMV0sXG4gICAgICAgIHogPSBxWzJdLFxuICAgICAgICB3ID0gcVszXTtcbiAgICB2YXIgeDIgPSB4ICsgeDtcbiAgICB2YXIgeTIgPSB5ICsgeTtcbiAgICB2YXIgejIgPSB6ICsgejtcbiAgICB2YXIgeHggPSB4ICogeDI7XG4gICAgdmFyIHl4ID0geSAqIHgyO1xuICAgIHZhciB5eSA9IHkgKiB5MjtcbiAgICB2YXIgenggPSB6ICogeDI7XG4gICAgdmFyIHp5ID0geiAqIHkyO1xuICAgIHZhciB6eiA9IHogKiB6MjtcbiAgICB2YXIgd3ggPSB3ICogeDI7XG4gICAgdmFyIHd5ID0gdyAqIHkyO1xuICAgIHZhciB3eiA9IHcgKiB6MjtcbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbM10gPSB5eCAtIHd6O1xuICAgIG91dFs2XSA9IHp4ICsgd3k7XG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbNF0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbN10gPSB6eSAtIHd4O1xuICAgIG91dFsyXSA9IHp4IC0gd3k7XG4gICAgb3V0WzVdID0genkgKyB3eDtcbiAgICBvdXRbOF0gPSAxIC0geHggLSB5eTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGEgM3gzIG5vcm1hbCBtYXRyaXggKHRyYW5zcG9zZSBpbnZlcnNlKSBmcm9tIHRoZSA0eDQgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgTWF0NCB0byBkZXJpdmUgdGhlIG5vcm1hbCBtYXRyaXggZnJvbVxuICAgKlxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5vcm1hbEZyb21NYXQ0KG91dCwgYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdO1xuICAgIHZhciBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddO1xuICAgIHZhciBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG4gICAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgICBhMzEgPSBhWzEzXSxcbiAgICAgICAgYTMyID0gYVsxNF0sXG4gICAgICAgIGEzMyA9IGFbMTVdO1xuICAgIHZhciBiMDAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgdmFyIGIwMSA9IGEwMCAqIGExMiAtIGEwMiAqIGExMDtcbiAgICB2YXIgYjAyID0gYTAwICogYTEzIC0gYTAzICogYTEwO1xuICAgIHZhciBiMDMgPSBhMDEgKiBhMTIgLSBhMDIgKiBhMTE7XG4gICAgdmFyIGIwNCA9IGEwMSAqIGExMyAtIGEwMyAqIGExMTtcbiAgICB2YXIgYjA1ID0gYTAyICogYTEzIC0gYTAzICogYTEyO1xuICAgIHZhciBiMDYgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgdmFyIGIwNyA9IGEyMCAqIGEzMiAtIGEyMiAqIGEzMDtcbiAgICB2YXIgYjA4ID0gYTIwICogYTMzIC0gYTIzICogYTMwO1xuICAgIHZhciBiMDkgPSBhMjEgKiBhMzIgLSBhMjIgKiBhMzE7XG4gICAgdmFyIGIxMCA9IGEyMSAqIGEzMyAtIGEyMyAqIGEzMTtcbiAgICB2YXIgYjExID0gYTIyICogYTMzIC0gYTIzICogYTMyOyAvLyBDYWxjdWxhdGUgdGhlIGRldGVybWluYW50XG5cbiAgICB2YXIgZGV0ID0gYjAwICogYjExIC0gYjAxICogYjEwICsgYjAyICogYjA5ICsgYjAzICogYjA4IC0gYjA0ICogYjA3ICsgYjA1ICogYjA2O1xuXG4gICAgaWYgKCFkZXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGRldCA9IDEuMCAvIGRldDtcbiAgICBvdXRbMF0gPSAoYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5KSAqIGRldDtcbiAgICBvdXRbMV0gPSAoYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3KSAqIGRldDtcbiAgICBvdXRbMl0gPSAoYTEwICogYjEwIC0gYTExICogYjA4ICsgYTEzICogYjA2KSAqIGRldDtcbiAgICBvdXRbM10gPSAoYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5KSAqIGRldDtcbiAgICBvdXRbNF0gPSAoYTAwICogYjExIC0gYTAyICogYjA4ICsgYTAzICogYjA3KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2KSAqIGRldDtcbiAgICBvdXRbNl0gPSAoYTMxICogYjA1IC0gYTMyICogYjA0ICsgYTMzICogYjAzKSAqIGRldDtcbiAgICBvdXRbN10gPSAoYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxKSAqIGRldDtcbiAgICBvdXRbOF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSAyRCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggV2lkdGggb2YgeW91ciBnbCBjb250ZXh0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgSGVpZ2h0IG9mIGdsIGNvbnRleHRcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBwcm9qZWN0aW9uKG91dCwgd2lkdGgsIGhlaWdodCkge1xuICAgIG91dFswXSA9IDIgLyB3aWR0aDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAtMiAvIGhlaWdodDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IC0xO1xuICAgIG91dFs3XSA9IDE7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0M1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0ciQ2KGEpIHtcbiAgICByZXR1cm4gXCJtYXQzKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiLCBcIiArIGFbNF0gKyBcIiwgXCIgKyBhWzVdICsgXCIsIFwiICsgYVs2XSArIFwiLCBcIiArIGFbN10gKyBcIiwgXCIgKyBhWzhdICsgXCIpXCI7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQzXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb2IkMShhKSB7XG4gICAgcmV0dXJuIE1hdGguaHlwb3QoYVswXSwgYVsxXSwgYVsyXSwgYVszXSwgYVs0XSwgYVs1XSwgYVs2XSwgYVs3XSwgYVs4XSk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIG1hdDMnc1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBhZGQkNihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzdWJ0cmFjdCQ0KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICAgIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseVNjYWxhciQxKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIG91dFs0XSA9IGFbNF0gKiBiO1xuICAgIG91dFs1XSA9IGFbNV0gKiBiO1xuICAgIG91dFs2XSA9IGFbNl0gKiBiO1xuICAgIG91dFs3XSA9IGFbN10gKiBiO1xuICAgIG91dFs4XSA9IGFbOF0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIG1hdDMncyBhZnRlciBtdWx0aXBseWluZyBlYWNoIGVsZW1lbnQgb2YgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYidzIGVsZW1lbnRzIGJ5IGJlZm9yZSBhZGRpbmdcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseVNjYWxhckFuZEFkZCQxKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICAgIG91dFs0XSA9IGFbNF0gKyBiWzRdICogc2NhbGU7XG4gICAgb3V0WzVdID0gYVs1XSArIGJbNV0gKiBzY2FsZTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XSAqIHNjYWxlO1xuICAgIG91dFs3XSA9IGFbN10gKyBiWzddICogc2NhbGU7XG4gICAgb3V0WzhdID0gYVs4XSArIGJbOF0gKiBzY2FsZTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4YWN0RXF1YWxzJDYoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIGFbNF0gPT09IGJbNF0gJiYgYVs1XSA9PT0gYls1XSAmJiBhWzZdID09PSBiWzZdICYmIGFbN10gPT09IGJbN10gJiYgYVs4XSA9PT0gYls4XTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSBUaGUgZmlyc3QgbWF0cml4LlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBlcXVhbHMkNihhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl0sXG4gICAgICAgIGEzID0gYVszXSxcbiAgICAgICAgYTQgPSBhWzRdLFxuICAgICAgICBhNSA9IGFbNV0sXG4gICAgICAgIGE2ID0gYVs2XSxcbiAgICAgICAgYTcgPSBhWzddLFxuICAgICAgICBhOCA9IGFbOF07XG4gICAgdmFyIGIwID0gYlswXSxcbiAgICAgICAgYjEgPSBiWzFdLFxuICAgICAgICBiMiA9IGJbMl0sXG4gICAgICAgIGIzID0gYlszXSxcbiAgICAgICAgYjQgPSBiWzRdLFxuICAgICAgICBiNSA9IGJbNV0sXG4gICAgICAgIGI2ID0gYls2XSxcbiAgICAgICAgYjcgPSBiWzddLFxuICAgICAgICBiOCA9IGJbOF07XG4gICAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJiBNYXRoLmFicyhhNCAtIGI0KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiYgTWF0aC5hYnMoYTUgLSBiNSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpICYmIE1hdGguYWJzKGE2IC0gYjYpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJiBNYXRoLmFicyhhNyAtIGI3KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiYgTWF0aC5hYnMoYTggLSBiOCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTgpLCBNYXRoLmFicyhiOCkpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDMubXVsdGlwbHl9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbXVsJDYgPSBtdWx0aXBseSQ2O1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBtYXQzLnN1YnRyYWN0fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHN1YiQ0ID0gc3VidHJhY3QkNDtcblxuICB2YXIgbWF0MyA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgY3JlYXRlOiBjcmVhdGUkNixcbiAgICBmcm9tTWF0NDogZnJvbU1hdDQkMSxcbiAgICBjbG9uZTogY2xvbmUkNixcbiAgICBjb3B5OiBjb3B5JDYsXG4gICAgZnJvbVZhbHVlczogZnJvbVZhbHVlcyQ2LFxuICAgIHNldDogc2V0JDYsXG4gICAgaWRlbnRpdHk6IGlkZW50aXR5JDMsXG4gICAgdHJhbnNwb3NlOiB0cmFuc3Bvc2UkMSxcbiAgICBpbnZlcnQ6IGludmVydCQzLFxuICAgIGFkam9pbnQ6IGFkam9pbnQkMSxcbiAgICBkZXRlcm1pbmFudDogZGV0ZXJtaW5hbnQkMSxcbiAgICBtdWx0aXBseTogbXVsdGlwbHkkNixcbiAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZSQyLFxuICAgIHJvdGF0ZTogcm90YXRlJDIsXG4gICAgc2NhbGU6IHNjYWxlJDYsXG4gICAgZnJvbVRyYW5zbGF0aW9uOiBmcm9tVHJhbnNsYXRpb24kMixcbiAgICBmcm9tUm90YXRpb246IGZyb21Sb3RhdGlvbiQyLFxuICAgIGZyb21TY2FsaW5nOiBmcm9tU2NhbGluZyQxLFxuICAgIGZyb21NYXQyZDogZnJvbU1hdDJkLFxuICAgIGZyb21RdWF0OiBmcm9tUXVhdCQxLFxuICAgIG5vcm1hbEZyb21NYXQ0OiBub3JtYWxGcm9tTWF0NCxcbiAgICBwcm9qZWN0aW9uOiBwcm9qZWN0aW9uLFxuICAgIHN0cjogc3RyJDYsXG4gICAgZnJvYjogZnJvYiQxLFxuICAgIGFkZDogYWRkJDYsXG4gICAgc3VidHJhY3Q6IHN1YnRyYWN0JDQsXG4gICAgbXVsdGlwbHlTY2FsYXI6IG11bHRpcGx5U2NhbGFyJDEsXG4gICAgbXVsdGlwbHlTY2FsYXJBbmRBZGQ6IG11bHRpcGx5U2NhbGFyQW5kQWRkJDEsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzJDYsXG4gICAgZXF1YWxzOiBlcXVhbHMkNixcbiAgICBtdWw6IG11bCQ2LFxuICAgIHN1Yjogc3ViJDRcbiAgfSk7XG5cbiAgLyoqXG4gICAqIDR4NCBNYXRyaXg8YnI+Rm9ybWF0OiBjb2x1bW4tbWFqb3IsIHdoZW4gdHlwZWQgb3V0IGl0IGxvb2tzIGxpa2Ugcm93LW1ham9yPGJyPlRoZSBtYXRyaWNlcyBhcmUgYmVpbmcgcG9zdCBtdWx0aXBsaWVkLlxuICAgKiBAbW9kdWxlIG1hdDRcbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0NFxuICAgKlxuICAgKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGUkNSgpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMTYpO1xuXG4gICAgaWYgKEFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgICBvdXRbMV0gPSAwO1xuICAgICAgb3V0WzJdID0gMDtcbiAgICAgIG91dFszXSA9IDA7XG4gICAgICBvdXRbNF0gPSAwO1xuICAgICAgb3V0WzZdID0gMDtcbiAgICAgIG91dFs3XSA9IDA7XG4gICAgICBvdXRbOF0gPSAwO1xuICAgICAgb3V0WzldID0gMDtcbiAgICAgIG91dFsxMV0gPSAwO1xuICAgICAgb3V0WzEyXSA9IDA7XG4gICAgICBvdXRbMTNdID0gMDtcbiAgICAgIG91dFsxNF0gPSAwO1xuICAgIH1cblxuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IG1hdDQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBtYXRyaXhcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgbWF0cml4IHRvIGNsb25lXG4gICAqIEByZXR1cm5zIHttYXQ0fSBhIG5ldyA0eDQgbWF0cml4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsb25lJDUoYSkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgb3V0WzldID0gYVs5XTtcbiAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgbWF0NCB0byBhbm90aGVyXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY29weSQ1KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IG1hdDQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMSBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDMgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMylcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMCBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA0KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDUpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMyBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAzIHBvc2l0aW9uIChpbmRleCA3KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIwIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDAgcG9zaXRpb24gKGluZGV4IDgpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjEgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggOSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMiBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxMClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMyBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxMSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0zMCBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAxMilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0zMSBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxMylcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0zMiBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAxNClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0zMyBDb21wb25lbnQgaW4gY29sdW1uIDMsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAxNSlcbiAgICogQHJldHVybnMge21hdDR9IEEgbmV3IG1hdDRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVZhbHVlcyQ1KG0wMCwgbTAxLCBtMDIsIG0wMywgbTEwLCBtMTEsIG0xMiwgbTEzLCBtMjAsIG0yMSwgbTIyLCBtMjMsIG0zMCwgbTMxLCBtMzIsIG0zMykge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSgxNik7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTAzO1xuICAgIG91dFs0XSA9IG0xMDtcbiAgICBvdXRbNV0gPSBtMTE7XG4gICAgb3V0WzZdID0gbTEyO1xuICAgIG91dFs3XSA9IG0xMztcbiAgICBvdXRbOF0gPSBtMjA7XG4gICAgb3V0WzldID0gbTIxO1xuICAgIG91dFsxMF0gPSBtMjI7XG4gICAgb3V0WzExXSA9IG0yMztcbiAgICBvdXRbMTJdID0gbTMwO1xuICAgIG91dFsxM10gPSBtMzE7XG4gICAgb3V0WzE0XSA9IG0zMjtcbiAgICBvdXRbMTVdID0gbTMzO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIG1hdDQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMiBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAyKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA1KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTMgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMCBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA4KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjMgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTEpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMzEgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMzIgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTQpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0JDUob3V0LCBtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgICBvdXRbMF0gPSBtMDA7XG4gICAgb3V0WzFdID0gbTAxO1xuICAgIG91dFsyXSA9IG0wMjtcbiAgICBvdXRbM10gPSBtMDM7XG4gICAgb3V0WzRdID0gbTEwO1xuICAgIG91dFs1XSA9IG0xMTtcbiAgICBvdXRbNl0gPSBtMTI7XG4gICAgb3V0WzddID0gbTEzO1xuICAgIG91dFs4XSA9IG0yMDtcbiAgICBvdXRbOV0gPSBtMjE7XG4gICAgb3V0WzEwXSA9IG0yMjtcbiAgICBvdXRbMTFdID0gbTIzO1xuICAgIG91dFsxMl0gPSBtMzA7XG4gICAgb3V0WzEzXSA9IG0zMTtcbiAgICBvdXRbMTRdID0gbTMyO1xuICAgIG91dFsxNV0gPSBtMzM7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IGEgbWF0NCB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaWRlbnRpdHkkMihvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zcG9zZSB0aGUgdmFsdWVzIG9mIGEgbWF0NFxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zcG9zZShvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgdmFyIGEwMSA9IGFbMV0sXG4gICAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgICBhMDMgPSBhWzNdO1xuICAgICAgdmFyIGExMiA9IGFbNl0sXG4gICAgICAgICAgYTEzID0gYVs3XTtcbiAgICAgIHZhciBhMjMgPSBhWzExXTtcbiAgICAgIG91dFsxXSA9IGFbNF07XG4gICAgICBvdXRbMl0gPSBhWzhdO1xuICAgICAgb3V0WzNdID0gYVsxMl07XG4gICAgICBvdXRbNF0gPSBhMDE7XG4gICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICBvdXRbOF0gPSBhMDI7XG4gICAgICBvdXRbOV0gPSBhMTI7XG4gICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICBvdXRbMTJdID0gYTAzO1xuICAgICAgb3V0WzEzXSA9IGExMztcbiAgICAgIG91dFsxNF0gPSBhMjM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgb3V0WzRdID0gYVsxXTtcbiAgICAgIG91dFs1XSA9IGFbNV07XG4gICAgICBvdXRbNl0gPSBhWzldO1xuICAgICAgb3V0WzddID0gYVsxM107XG4gICAgICBvdXRbOF0gPSBhWzJdO1xuICAgICAgb3V0WzldID0gYVs2XTtcbiAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgIG91dFsxMV0gPSBhWzE0XTtcbiAgICAgIG91dFsxMl0gPSBhWzNdO1xuICAgICAgb3V0WzEzXSA9IGFbN107XG4gICAgICBvdXRbMTRdID0gYVsxMV07XG4gICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogSW52ZXJ0cyBhIG1hdDRcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZlcnQkMihvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICB2YXIgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuICAgIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgICAgYTMxID0gYVsxM10sXG4gICAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgICBhMzMgPSBhWzE1XTtcbiAgICB2YXIgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICAgIHZhciBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgdmFyIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICB2YXIgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgIHZhciBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gICAgdmFyIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICB2YXIgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICAgIHZhciBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgdmFyIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICB2YXIgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICAgIHZhciBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gICAgdmFyIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gICAgdmFyIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzNdID0gKGEyMiAqIGIwNCAtIGEyMSAqIGIwNSAtIGEyMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzZdID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzddID0gKGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzldID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEwXSA9IChhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDApICogZGV0O1xuICAgIG91dFsxMV0gPSAoYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTJdID0gKGExMSAqIGIwNyAtIGExMCAqIGIwOSAtIGExMiAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzEzXSA9IChhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxNF0gPSAoYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTVdID0gKGEyMCAqIGIwMyAtIGEyMSAqIGIwMSArIGEyMiAqIGIwMCkgKiBkZXQ7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgYWRqdWdhdGUgb2YgYSBtYXQ0XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRqb2ludChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICB2YXIgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuICAgIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgICAgYTMxID0gYVsxM10sXG4gICAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgICBhMzMgPSBhWzE1XTtcbiAgICB2YXIgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICAgIHZhciBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgdmFyIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICB2YXIgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgIHZhciBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gICAgdmFyIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICB2YXIgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICAgIHZhciBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgdmFyIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICB2YXIgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICAgIHZhciBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gICAgdmFyIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjtcbiAgICBvdXRbMF0gPSBhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDk7XG4gICAgb3V0WzFdID0gYTAyICogYjEwIC0gYTAxICogYjExIC0gYTAzICogYjA5O1xuICAgIG91dFsyXSA9IGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMztcbiAgICBvdXRbM10gPSBhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDM7XG4gICAgb3V0WzRdID0gYTEyICogYjA4IC0gYTEwICogYjExIC0gYTEzICogYjA3O1xuICAgIG91dFs1XSA9IGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNztcbiAgICBvdXRbNl0gPSBhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDE7XG4gICAgb3V0WzddID0gYTIwICogYjA1IC0gYTIyICogYjAyICsgYTIzICogYjAxO1xuICAgIG91dFs4XSA9IGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNjtcbiAgICBvdXRbOV0gPSBhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDY7XG4gICAgb3V0WzEwXSA9IGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMDtcbiAgICBvdXRbMTFdID0gYTIxICogYjAyIC0gYTIwICogYjA0IC0gYTIzICogYjAwO1xuICAgIG91dFsxMl0gPSBhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDY7XG4gICAgb3V0WzEzXSA9IGEwMCAqIGIwOSAtIGEwMSAqIGIwNyArIGEwMiAqIGIwNjtcbiAgICBvdXRbMTRdID0gYTMxICogYjAxIC0gYTMwICogYjAzIC0gYTMyICogYjAwO1xuICAgIG91dFsxNV0gPSBhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQ0XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRldGVybWluYW50IG9mIGFcbiAgICovXG5cbiAgZnVuY3Rpb24gZGV0ZXJtaW5hbnQoYSkge1xuICAgIHZhciBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdO1xuICAgIHZhciBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddO1xuICAgIHZhciBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG4gICAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgICBhMzEgPSBhWzEzXSxcbiAgICAgICAgYTMyID0gYVsxNF0sXG4gICAgICAgIGEzMyA9IGFbMTVdO1xuICAgIHZhciBiMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgICB2YXIgYjEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgdmFyIGIyID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgIHZhciBiMyA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgICB2YXIgYjQgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgdmFyIGI1ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICAgIHZhciBiNiA9IGEwMCAqIGI1IC0gYTAxICogYjQgKyBhMDIgKiBiMztcbiAgICB2YXIgYjcgPSBhMTAgKiBiNSAtIGExMSAqIGI0ICsgYTEyICogYjM7XG4gICAgdmFyIGI4ID0gYTIwICogYjIgLSBhMjEgKiBiMSArIGEyMiAqIGIwO1xuICAgIHZhciBiOSA9IGEzMCAqIGIyIC0gYTMxICogYjEgKyBhMzIgKiBiMDsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gICAgcmV0dXJuIGExMyAqIGI2IC0gYTAzICogYjcgKyBhMzMgKiBiOCAtIGEyMyAqIGI5O1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byBtYXQ0c1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseSQ1KG91dCwgYSwgYikge1xuICAgIHZhciBhMDAgPSBhWzBdLFxuICAgICAgICBhMDEgPSBhWzFdLFxuICAgICAgICBhMDIgPSBhWzJdLFxuICAgICAgICBhMDMgPSBhWzNdO1xuICAgIHZhciBhMTAgPSBhWzRdLFxuICAgICAgICBhMTEgPSBhWzVdLFxuICAgICAgICBhMTIgPSBhWzZdLFxuICAgICAgICBhMTMgPSBhWzddO1xuICAgIHZhciBhMjAgPSBhWzhdLFxuICAgICAgICBhMjEgPSBhWzldLFxuICAgICAgICBhMjIgPSBhWzEwXSxcbiAgICAgICAgYTIzID0gYVsxMV07XG4gICAgdmFyIGEzMCA9IGFbMTJdLFxuICAgICAgICBhMzEgPSBhWzEzXSxcbiAgICAgICAgYTMyID0gYVsxNF0sXG4gICAgICAgIGEzMyA9IGFbMTVdOyAvLyBDYWNoZSBvbmx5IHRoZSBjdXJyZW50IGxpbmUgb2YgdGhlIHNlY29uZCBtYXRyaXhcblxuICAgIHZhciBiMCA9IGJbMF0sXG4gICAgICAgIGIxID0gYlsxXSxcbiAgICAgICAgYjIgPSBiWzJdLFxuICAgICAgICBiMyA9IGJbM107XG4gICAgb3V0WzBdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gICAgb3V0WzFdID0gYjAgKiBhMDEgKyBiMSAqIGExMSArIGIyICogYTIxICsgYjMgKiBhMzE7XG4gICAgb3V0WzJdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgb3V0WzNdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gICAgYjAgPSBiWzRdO1xuICAgIGIxID0gYls1XTtcbiAgICBiMiA9IGJbNl07XG4gICAgYjMgPSBiWzddO1xuICAgIG91dFs0XSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICAgIG91dFs1XSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICAgIG91dFs2XSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICAgIG91dFs3XSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICAgIGIwID0gYls4XTtcbiAgICBiMSA9IGJbOV07XG4gICAgYjIgPSBiWzEwXTtcbiAgICBiMyA9IGJbMTFdO1xuICAgIG91dFs4XSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICAgIG91dFs5XSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICAgIG91dFsxMF0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgICBvdXRbMTFdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gICAgYjAgPSBiWzEyXTtcbiAgICBiMSA9IGJbMTNdO1xuICAgIGIyID0gYlsxNF07XG4gICAgYjMgPSBiWzE1XTtcbiAgICBvdXRbMTJdID0gYjAgKiBhMDAgKyBiMSAqIGExMCArIGIyICogYTIwICsgYjMgKiBhMzA7XG4gICAgb3V0WzEzXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICAgIG91dFsxNF0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgICBvdXRbMTVdID0gYjAgKiBhMDMgKyBiMSAqIGExMyArIGIyICogYTIzICsgYjMgKiBhMzM7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogVHJhbnNsYXRlIGEgbWF0NCBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUkMShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sXG4gICAgICAgIHkgPSB2WzFdLFxuICAgICAgICB6ID0gdlsyXTtcbiAgICB2YXIgYTAwLCBhMDEsIGEwMiwgYTAzO1xuICAgIHZhciBhMTAsIGExMSwgYTEyLCBhMTM7XG4gICAgdmFyIGEyMCwgYTIxLCBhMjIsIGEyMztcblxuICAgIGlmIChhID09PSBvdXQpIHtcbiAgICAgIG91dFsxMl0gPSBhWzBdICogeCArIGFbNF0gKiB5ICsgYVs4XSAqIHogKyBhWzEyXTtcbiAgICAgIG91dFsxM10gPSBhWzFdICogeCArIGFbNV0gKiB5ICsgYVs5XSAqIHogKyBhWzEzXTtcbiAgICAgIG91dFsxNF0gPSBhWzJdICogeCArIGFbNl0gKiB5ICsgYVsxMF0gKiB6ICsgYVsxNF07XG4gICAgICBvdXRbMTVdID0gYVszXSAqIHggKyBhWzddICogeSArIGFbMTFdICogeiArIGFbMTVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhMDAgPSBhWzBdO1xuICAgICAgYTAxID0gYVsxXTtcbiAgICAgIGEwMiA9IGFbMl07XG4gICAgICBhMDMgPSBhWzNdO1xuICAgICAgYTEwID0gYVs0XTtcbiAgICAgIGExMSA9IGFbNV07XG4gICAgICBhMTIgPSBhWzZdO1xuICAgICAgYTEzID0gYVs3XTtcbiAgICAgIGEyMCA9IGFbOF07XG4gICAgICBhMjEgPSBhWzldO1xuICAgICAgYTIyID0gYVsxMF07XG4gICAgICBhMjMgPSBhWzExXTtcbiAgICAgIG91dFswXSA9IGEwMDtcbiAgICAgIG91dFsxXSA9IGEwMTtcbiAgICAgIG91dFsyXSA9IGEwMjtcbiAgICAgIG91dFszXSA9IGEwMztcbiAgICAgIG91dFs0XSA9IGExMDtcbiAgICAgIG91dFs1XSA9IGExMTtcbiAgICAgIG91dFs2XSA9IGExMjtcbiAgICAgIG91dFs3XSA9IGExMztcbiAgICAgIG91dFs4XSA9IGEyMDtcbiAgICAgIG91dFs5XSA9IGEyMTtcbiAgICAgIG91dFsxMF0gPSBhMjI7XG4gICAgICBvdXRbMTFdID0gYTIzO1xuICAgICAgb3V0WzEyXSA9IGEwMCAqIHggKyBhMTAgKiB5ICsgYTIwICogeiArIGFbMTJdO1xuICAgICAgb3V0WzEzXSA9IGEwMSAqIHggKyBhMTEgKiB5ICsgYTIxICogeiArIGFbMTNdO1xuICAgICAgb3V0WzE0XSA9IGEwMiAqIHggKyBhMTIgKiB5ICsgYTIyICogeiArIGFbMTRdO1xuICAgICAgb3V0WzE1XSA9IGEwMyAqIHggKyBhMTMgKiB5ICsgYTIzICogeiArIGFbMTVdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNjYWxlcyB0aGUgbWF0NCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMyBub3QgdXNpbmcgdmVjdG9yaXphdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IHRoZSB2ZWMzIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKiovXG5cbiAgZnVuY3Rpb24gc2NhbGUkNShvdXQsIGEsIHYpIHtcbiAgICB2YXIgeCA9IHZbMF0sXG4gICAgICAgIHkgPSB2WzFdLFxuICAgICAgICB6ID0gdlsyXTtcbiAgICBvdXRbMF0gPSBhWzBdICogeDtcbiAgICBvdXRbMV0gPSBhWzFdICogeDtcbiAgICBvdXRbMl0gPSBhWzJdICogeDtcbiAgICBvdXRbM10gPSBhWzNdICogeDtcbiAgICBvdXRbNF0gPSBhWzRdICogeTtcbiAgICBvdXRbNV0gPSBhWzVdICogeTtcbiAgICBvdXRbNl0gPSBhWzZdICogeTtcbiAgICBvdXRbN10gPSBhWzddICogeTtcbiAgICBvdXRbOF0gPSBhWzhdICogejtcbiAgICBvdXRbOV0gPSBhWzldICogejtcbiAgICBvdXRbMTBdID0gYVsxMF0gKiB6O1xuICAgIG91dFsxMV0gPSBhWzExXSAqIHo7XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBtYXQ0IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIGdpdmVuIGF4aXNcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGF4aXMgdGhlIGF4aXMgdG8gcm90YXRlIGFyb3VuZFxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZSQxKG91dCwgYSwgcmFkLCBheGlzKSB7XG4gICAgdmFyIHggPSBheGlzWzBdLFxuICAgICAgICB5ID0gYXhpc1sxXSxcbiAgICAgICAgeiA9IGF4aXNbMl07XG4gICAgdmFyIGxlbiA9IE1hdGguaHlwb3QoeCwgeSwgeik7XG4gICAgdmFyIHMsIGMsIHQ7XG4gICAgdmFyIGEwMCwgYTAxLCBhMDIsIGEwMztcbiAgICB2YXIgYTEwLCBhMTEsIGExMiwgYTEzO1xuICAgIHZhciBhMjAsIGEyMSwgYTIyLCBhMjM7XG4gICAgdmFyIGIwMCwgYjAxLCBiMDI7XG4gICAgdmFyIGIxMCwgYjExLCBiMTI7XG4gICAgdmFyIGIyMCwgYjIxLCBiMjI7XG5cbiAgICBpZiAobGVuIDwgRVBTSUxPTikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGVuID0gMSAvIGxlbjtcbiAgICB4ICo9IGxlbjtcbiAgICB5ICo9IGxlbjtcbiAgICB6ICo9IGxlbjtcbiAgICBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICB0ID0gMSAtIGM7XG4gICAgYTAwID0gYVswXTtcbiAgICBhMDEgPSBhWzFdO1xuICAgIGEwMiA9IGFbMl07XG4gICAgYTAzID0gYVszXTtcbiAgICBhMTAgPSBhWzRdO1xuICAgIGExMSA9IGFbNV07XG4gICAgYTEyID0gYVs2XTtcbiAgICBhMTMgPSBhWzddO1xuICAgIGEyMCA9IGFbOF07XG4gICAgYTIxID0gYVs5XTtcbiAgICBhMjIgPSBhWzEwXTtcbiAgICBhMjMgPSBhWzExXTsgLy8gQ29uc3RydWN0IHRoZSBlbGVtZW50cyBvZiB0aGUgcm90YXRpb24gbWF0cml4XG5cbiAgICBiMDAgPSB4ICogeCAqIHQgKyBjO1xuICAgIGIwMSA9IHkgKiB4ICogdCArIHogKiBzO1xuICAgIGIwMiA9IHogKiB4ICogdCAtIHkgKiBzO1xuICAgIGIxMCA9IHggKiB5ICogdCAtIHogKiBzO1xuICAgIGIxMSA9IHkgKiB5ICogdCArIGM7XG4gICAgYjEyID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gICAgYjIwID0geCAqIHogKiB0ICsgeSAqIHM7XG4gICAgYjIxID0geSAqIHogKiB0IC0geCAqIHM7XG4gICAgYjIyID0geiAqIHogKiB0ICsgYzsgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICAgIG91dFswXSA9IGEwMCAqIGIwMCArIGExMCAqIGIwMSArIGEyMCAqIGIwMjtcbiAgICBvdXRbMV0gPSBhMDEgKiBiMDAgKyBhMTEgKiBiMDEgKyBhMjEgKiBiMDI7XG4gICAgb3V0WzJdID0gYTAyICogYjAwICsgYTEyICogYjAxICsgYTIyICogYjAyO1xuICAgIG91dFszXSA9IGEwMyAqIGIwMCArIGExMyAqIGIwMSArIGEyMyAqIGIwMjtcbiAgICBvdXRbNF0gPSBhMDAgKiBiMTAgKyBhMTAgKiBiMTEgKyBhMjAgKiBiMTI7XG4gICAgb3V0WzVdID0gYTAxICogYjEwICsgYTExICogYjExICsgYTIxICogYjEyO1xuICAgIG91dFs2XSA9IGEwMiAqIGIxMCArIGExMiAqIGIxMSArIGEyMiAqIGIxMjtcbiAgICBvdXRbN10gPSBhMDMgKiBiMTAgKyBhMTMgKiBiMTEgKyBhMjMgKiBiMTI7XG4gICAgb3V0WzhdID0gYTAwICogYjIwICsgYTEwICogYjIxICsgYTIwICogYjIyO1xuICAgIG91dFs5XSA9IGEwMSAqIGIyMCArIGExMSAqIGIyMSArIGEyMSAqIGIyMjtcbiAgICBvdXRbMTBdID0gYTAyICogYjIwICsgYTEyICogYjIxICsgYTIyICogYjIyO1xuICAgIG91dFsxMV0gPSBhMDMgKiBiMjAgKyBhMTMgKiBiMjEgKyBhMjMgKiBiMjI7XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCBsYXN0IHJvd1xuICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlWCQzKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgICB2YXIgYTEwID0gYVs0XTtcbiAgICB2YXIgYTExID0gYVs1XTtcbiAgICB2YXIgYTEyID0gYVs2XTtcbiAgICB2YXIgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIwID0gYVs4XTtcbiAgICB2YXIgYTIxID0gYVs5XTtcbiAgICB2YXIgYTIyID0gYVsxMF07XG4gICAgdmFyIGEyMyA9IGFbMTFdO1xuXG4gICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgcm93c1xuICAgICAgb3V0WzBdID0gYVswXTtcbiAgICAgIG91dFsxXSA9IGFbMV07XG4gICAgICBvdXRbMl0gPSBhWzJdO1xuICAgICAgb3V0WzNdID0gYVszXTtcbiAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuXG4gICAgb3V0WzRdID0gYTEwICogYyArIGEyMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyArIGEyMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyArIGEyMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyArIGEyMyAqIHM7XG4gICAgb3V0WzhdID0gYTIwICogYyAtIGExMCAqIHM7XG4gICAgb3V0WzldID0gYTIxICogYyAtIGExMSAqIHM7XG4gICAgb3V0WzEwXSA9IGEyMiAqIGMgLSBhMTIgKiBzO1xuICAgIG91dFsxMV0gPSBhMjMgKiBjIC0gYTEzICogcztcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFkgYXhpc1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZVkkMyhvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdmFyIGEwMCA9IGFbMF07XG4gICAgdmFyIGEwMSA9IGFbMV07XG4gICAgdmFyIGEwMiA9IGFbMl07XG4gICAgdmFyIGEwMyA9IGFbM107XG4gICAgdmFyIGEyMCA9IGFbOF07XG4gICAgdmFyIGEyMSA9IGFbOV07XG4gICAgdmFyIGEyMiA9IGFbMTBdO1xuICAgIHZhciBhMjMgPSBhWzExXTtcblxuICAgIGlmIChhICE9PSBvdXQpIHtcbiAgICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgIG91dFs0XSA9IGFbNF07XG4gICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgb3V0WzZdID0gYVs2XTtcbiAgICAgIG91dFs3XSA9IGFbN107XG4gICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfSAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cblxuICAgIG91dFswXSA9IGEwMCAqIGMgLSBhMjAgKiBzO1xuICAgIG91dFsxXSA9IGEwMSAqIGMgLSBhMjEgKiBzO1xuICAgIG91dFsyXSA9IGEwMiAqIGMgLSBhMjIgKiBzO1xuICAgIG91dFszXSA9IGEwMyAqIGMgLSBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEwMCAqIHMgKyBhMjAgKiBjO1xuICAgIG91dFs5XSA9IGEwMSAqIHMgKyBhMjEgKiBjO1xuICAgIG91dFsxMF0gPSBhMDIgKiBzICsgYTIyICogYztcbiAgICBvdXRbMTFdID0gYTAzICogcyArIGEyMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVaJDMob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIHZhciBhMDAgPSBhWzBdO1xuICAgIHZhciBhMDEgPSBhWzFdO1xuICAgIHZhciBhMDIgPSBhWzJdO1xuICAgIHZhciBhMDMgPSBhWzNdO1xuICAgIHZhciBhMTAgPSBhWzRdO1xuICAgIHZhciBhMTEgPSBhWzVdO1xuICAgIHZhciBhMTIgPSBhWzZdO1xuICAgIHZhciBhMTMgPSBhWzddO1xuXG4gICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICAgIG91dFs4XSA9IGFbOF07XG4gICAgICBvdXRbOV0gPSBhWzldO1xuICAgICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgICAgb3V0WzExXSA9IGFbMTFdO1xuICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH0gLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG5cbiAgICBvdXRbMF0gPSBhMDAgKiBjICsgYTEwICogcztcbiAgICBvdXRbMV0gPSBhMDEgKiBjICsgYTExICogcztcbiAgICBvdXRbMl0gPSBhMDIgKiBjICsgYTEyICogcztcbiAgICBvdXRbM10gPSBhMDMgKiBjICsgYTEzICogcztcbiAgICBvdXRbNF0gPSBhMTAgKiBjIC0gYTAwICogcztcbiAgICBvdXRbNV0gPSBhMTEgKiBjIC0gYTAxICogcztcbiAgICBvdXRbNl0gPSBhMTIgKiBjIC0gYTAyICogcztcbiAgICBvdXRbN10gPSBhMTMgKiBjIC0gYTAzICogcztcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3IgdHJhbnNsYXRpb25cbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tVHJhbnNsYXRpb24kMShvdXQsIHYpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAxO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSB2WzBdO1xuICAgIG91dFsxM10gPSB2WzFdO1xuICAgIG91dFsxNF0gPSB2WzJdO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHZlY3RvciBzY2FsaW5nXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDQuc2NhbGUoZGVzdCwgZGVzdCwgdmVjKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBTY2FsaW5nIHZlY3RvclxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21TY2FsaW5nKG91dCwgdikge1xuICAgIG91dFswXSA9IHZbMF07XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSB2WzFdO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IHZbMl07XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGUgYXJvdW5kIGEgZ2l2ZW4gYXhpc1xuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQ0LnJvdGF0ZShkZXN0LCBkZXN0LCByYWQsIGF4aXMpO1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tUm90YXRpb24kMShvdXQsIHJhZCwgYXhpcykge1xuICAgIHZhciB4ID0gYXhpc1swXSxcbiAgICAgICAgeSA9IGF4aXNbMV0sXG4gICAgICAgIHogPSBheGlzWzJdO1xuICAgIHZhciBsZW4gPSBNYXRoLmh5cG90KHgsIHksIHopO1xuICAgIHZhciBzLCBjLCB0O1xuXG4gICAgaWYgKGxlbiA8IEVQU0lMT04pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeCAqPSBsZW47XG4gICAgeSAqPSBsZW47XG4gICAgeiAqPSBsZW47XG4gICAgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdCA9IDEgLSBjOyAvLyBQZXJmb3JtIHJvdGF0aW9uLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gICAgb3V0WzBdID0geCAqIHggKiB0ICsgYztcbiAgICBvdXRbMV0gPSB5ICogeCAqIHQgKyB6ICogcztcbiAgICBvdXRbMl0gPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHggKiB5ICogdCAtIHogKiBzO1xuICAgIG91dFs1XSA9IHkgKiB5ICogdCArIGM7XG4gICAgb3V0WzZdID0geiAqIHkgKiB0ICsgeCAqIHM7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB4ICogeiAqIHQgKyB5ICogcztcbiAgICBvdXRbOV0gPSB5ICogeiAqIHQgLSB4ICogcztcbiAgICBvdXRbMTBdID0geiAqIHogKiB0ICsgYztcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWCBheGlzXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDQucm90YXRlWChkZXN0LCBkZXN0LCByYWQpO1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVhSb3RhdGlvbihvdXQsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICB2YXIgYyA9IE1hdGguY29zKHJhZCk7IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSBjO1xuICAgIG91dFs2XSA9IHM7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IC1zO1xuICAgIG91dFsxMF0gPSBjO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0NC5yb3RhdGVZKGRlc3QsIGRlc3QsIHJhZCk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tWVJvdGF0aW9uKG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTsgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gICAgb3V0WzBdID0gYztcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IC1zO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAxO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSBzO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IGM7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFogYXhpc1xuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQ0LnJvdGF0ZVooZGVzdCwgZGVzdCwgcmFkKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21aUm90YXRpb24ob3V0LCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpOyAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgICBvdXRbMF0gPSBjO1xuICAgIG91dFsxXSA9IHM7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IC1zO1xuICAgIG91dFs1XSA9IGM7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uIGFuZCB2ZWN0b3IgdHJhbnNsYXRpb25cbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAgICogICAgIGxldCBxdWF0TWF0ID0gbWF0NC5jcmVhdGUoKTtcbiAgICogICAgIHF1YXQ0LnRvTWF0NChxdWF0LCBxdWF0TWF0KTtcbiAgICogICAgIG1hdDQubXVsdGlwbHkoZGVzdCwgcXVhdE1hdCk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uJDEob3V0LCBxLCB2KSB7XG4gICAgLy8gUXVhdGVybmlvbiBtYXRoXG4gICAgdmFyIHggPSBxWzBdLFxuICAgICAgICB5ID0gcVsxXSxcbiAgICAgICAgeiA9IHFbMl0sXG4gICAgICAgIHcgPSBxWzNdO1xuICAgIHZhciB4MiA9IHggKyB4O1xuICAgIHZhciB5MiA9IHkgKyB5O1xuICAgIHZhciB6MiA9IHogKyB6O1xuICAgIHZhciB4eCA9IHggKiB4MjtcbiAgICB2YXIgeHkgPSB4ICogeTI7XG4gICAgdmFyIHh6ID0geCAqIHoyO1xuICAgIHZhciB5eSA9IHkgKiB5MjtcbiAgICB2YXIgeXogPSB5ICogejI7XG4gICAgdmFyIHp6ID0geiAqIHoyO1xuICAgIHZhciB3eCA9IHcgKiB4MjtcbiAgICB2YXIgd3kgPSB3ICogeTI7XG4gICAgdmFyIHd6ID0gdyAqIHoyO1xuICAgIG91dFswXSA9IDEgLSAoeXkgKyB6eik7XG4gICAgb3V0WzFdID0geHkgKyB3ejtcbiAgICBvdXRbMl0gPSB4eiAtIHd5O1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0geHkgLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0gKHh4ICsgenopO1xuICAgIG91dFs2XSA9IHl6ICsgd3g7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB4eiArIHd5O1xuICAgIG91dFs5XSA9IHl6IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSAoeHggKyB5eSk7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBtYXQ0IGZyb20gYSBkdWFsIHF1YXQuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IE1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgRHVhbCBRdWF0ZXJuaW9uXG4gICAqIEByZXR1cm5zIHttYXQ0fSBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21RdWF0MihvdXQsIGEpIHtcbiAgICB2YXIgdHJhbnNsYXRpb24gPSBuZXcgQVJSQVlfVFlQRSgzKTtcbiAgICB2YXIgYnggPSAtYVswXSxcbiAgICAgICAgYnkgPSAtYVsxXSxcbiAgICAgICAgYnogPSAtYVsyXSxcbiAgICAgICAgYncgPSBhWzNdLFxuICAgICAgICBheCA9IGFbNF0sXG4gICAgICAgIGF5ID0gYVs1XSxcbiAgICAgICAgYXogPSBhWzZdLFxuICAgICAgICBhdyA9IGFbN107XG4gICAgdmFyIG1hZ25pdHVkZSA9IGJ4ICogYnggKyBieSAqIGJ5ICsgYnogKiBieiArIGJ3ICogYnc7IC8vT25seSBzY2FsZSBpZiBpdCBtYWtlcyBzZW5zZVxuXG4gICAgaWYgKG1hZ25pdHVkZSA+IDApIHtcbiAgICAgIHRyYW5zbGF0aW9uWzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMiAvIG1hZ25pdHVkZTtcbiAgICAgIHRyYW5zbGF0aW9uWzFdID0gKGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnopICogMiAvIG1hZ25pdHVkZTtcbiAgICAgIHRyYW5zbGF0aW9uWzJdID0gKGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYngpICogMiAvIG1hZ25pdHVkZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNsYXRpb25bMF0gPSAoYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieSkgKiAyO1xuICAgICAgdHJhbnNsYXRpb25bMV0gPSAoYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBieikgKiAyO1xuICAgICAgdHJhbnNsYXRpb25bMl0gPSAoYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCkgKiAyO1xuICAgIH1cblxuICAgIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uJDEob3V0LCBhLCB0cmFuc2xhdGlvbik7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdHJhbnNsYXRpb24gdmVjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uXG4gICAqICBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGggZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24sXG4gICAqICB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmUgdGhlIHNhbWUgYXMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvclxuICAgKiAgb3JpZ2luYWxseSBzdXBwbGllZC5cbiAgICogQHBhcmFtICB7dmVjM30gb3V0IFZlY3RvciB0byByZWNlaXZlIHRyYW5zbGF0aW9uIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gICAqIEByZXR1cm4ge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbiQxKG91dCwgbWF0KSB7XG4gICAgb3V0WzBdID0gbWF0WzEyXTtcbiAgICBvdXRbMV0gPSBtYXRbMTNdO1xuICAgIG91dFsyXSA9IG1hdFsxNF07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2NhbGluZyBmYWN0b3IgY29tcG9uZW50IG9mIGEgdHJhbnNmb3JtYXRpb25cbiAgICogIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aCBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlXG4gICAqICB3aXRoIGEgbm9ybWFsaXplZCBRdWF0ZXJuaW9uIHBhcmFtdGVyLCB0aGUgcmV0dXJuZWQgdmVjdG9yIHdpbGwgYmVcbiAgICogIHRoZSBzYW1lIGFzIHRoZSBzY2FsaW5nIHZlY3RvclxuICAgKiAgb3JpZ2luYWxseSBzdXBwbGllZC5cbiAgICogQHBhcmFtICB7dmVjM30gb3V0IFZlY3RvciB0byByZWNlaXZlIHNjYWxpbmcgZmFjdG9yIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gICAqIEByZXR1cm4ge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRTY2FsaW5nKG91dCwgbWF0KSB7XG4gICAgdmFyIG0xMSA9IG1hdFswXTtcbiAgICB2YXIgbTEyID0gbWF0WzFdO1xuICAgIHZhciBtMTMgPSBtYXRbMl07XG4gICAgdmFyIG0yMSA9IG1hdFs0XTtcbiAgICB2YXIgbTIyID0gbWF0WzVdO1xuICAgIHZhciBtMjMgPSBtYXRbNl07XG4gICAgdmFyIG0zMSA9IG1hdFs4XTtcbiAgICB2YXIgbTMyID0gbWF0WzldO1xuICAgIHZhciBtMzMgPSBtYXRbMTBdO1xuICAgIG91dFswXSA9IE1hdGguaHlwb3QobTExLCBtMTIsIG0xMyk7XG4gICAgb3V0WzFdID0gTWF0aC5oeXBvdChtMjEsIG0yMiwgbTIzKTtcbiAgICBvdXRbMl0gPSBNYXRoLmh5cG90KG0zMSwgbTMyLCBtMzMpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgYSBxdWF0ZXJuaW9uIHJlcHJlc2VudGluZyB0aGUgcm90YXRpb25hbCBjb21wb25lbnRcbiAgICogIG9mIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoXG4gICAqICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiwgdGhlIHJldHVybmVkIHF1YXRlcm5pb24gd2lsbCBiZSB0aGVcbiAgICogIHNhbWUgYXMgdGhlIHF1YXRlcm5pb24gb3JpZ2luYWxseSBzdXBwbGllZC5cbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgUXVhdGVybmlvbiB0byByZWNlaXZlIHRoZSByb3RhdGlvbiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gICAqIEByZXR1cm4ge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRSb3RhdGlvbihvdXQsIG1hdCkge1xuICAgIHZhciBzY2FsaW5nID0gbmV3IEFSUkFZX1RZUEUoMyk7XG4gICAgZ2V0U2NhbGluZyhzY2FsaW5nLCBtYXQpO1xuICAgIHZhciBpczEgPSAxIC8gc2NhbGluZ1swXTtcbiAgICB2YXIgaXMyID0gMSAvIHNjYWxpbmdbMV07XG4gICAgdmFyIGlzMyA9IDEgLyBzY2FsaW5nWzJdO1xuICAgIHZhciBzbTExID0gbWF0WzBdICogaXMxO1xuICAgIHZhciBzbTEyID0gbWF0WzFdICogaXMyO1xuICAgIHZhciBzbTEzID0gbWF0WzJdICogaXMzO1xuICAgIHZhciBzbTIxID0gbWF0WzRdICogaXMxO1xuICAgIHZhciBzbTIyID0gbWF0WzVdICogaXMyO1xuICAgIHZhciBzbTIzID0gbWF0WzZdICogaXMzO1xuICAgIHZhciBzbTMxID0gbWF0WzhdICogaXMxO1xuICAgIHZhciBzbTMyID0gbWF0WzldICogaXMyO1xuICAgIHZhciBzbTMzID0gbWF0WzEwXSAqIGlzMztcbiAgICB2YXIgdHJhY2UgPSBzbTExICsgc20yMiArIHNtMzM7XG4gICAgdmFyIFMgPSAwO1xuXG4gICAgaWYgKHRyYWNlID4gMCkge1xuICAgICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xuICAgICAgb3V0WzNdID0gMC4yNSAqIFM7XG4gICAgICBvdXRbMF0gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICAgIG91dFsxXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgICAgb3V0WzJdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gICAgfSBlbHNlIGlmIChzbTExID4gc20yMiAmJiBzbTExID4gc20zMykge1xuICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTExIC0gc20yMiAtIHNtMzMpICogMjtcbiAgICAgIG91dFszXSA9IChzbTIzIC0gc20zMikgLyBTO1xuICAgICAgb3V0WzBdID0gMC4yNSAqIFM7XG4gICAgICBvdXRbMV0gPSAoc20xMiArIHNtMjEpIC8gUztcbiAgICAgIG91dFsyXSA9IChzbTMxICsgc20xMykgLyBTO1xuICAgIH0gZWxzZSBpZiAoc20yMiA+IHNtMzMpIHtcbiAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20yMiAtIHNtMTEgLSBzbTMzKSAqIDI7XG4gICAgICBvdXRbM10gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICAgIG91dFswXSA9IChzbTEyICsgc20yMSkgLyBTO1xuICAgICAgb3V0WzFdID0gMC4yNSAqIFM7XG4gICAgICBvdXRbMl0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgICB9IGVsc2Uge1xuICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTMzIC0gc20xMSAtIHNtMjIpICogMjtcbiAgICAgIG91dFszXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgICAgb3V0WzBdID0gKHNtMzEgKyBzbTEzKSAvIFM7XG4gICAgICBvdXRbMV0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgICAgIG91dFsyXSA9IDAuMjUgKiBTO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIERlY29tcG9zZXMgYSB0cmFuc2Zvcm1hdGlvbiBtYXRyaXggaW50byBpdHMgcm90YXRpb24sIHRyYW5zbGF0aW9uXG4gICAqIGFuZCBzY2FsZSBjb21wb25lbnRzLiBSZXR1cm5zIG9ubHkgdGhlIHJvdGF0aW9uIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gIHtxdWF0fSBvdXRfciBRdWF0ZXJuaW9uIHRvIHJlY2VpdmUgdGhlIHJvdGF0aW9uIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gIHt2ZWMzfSBvdXRfdCBWZWN0b3IgdG8gcmVjZWl2ZSB0aGUgdHJhbnNsYXRpb24gdmVjdG9yXG4gICAqIEBwYXJhbSAge3ZlYzN9IG91dF9zIFZlY3RvciB0byByZWNlaXZlIHRoZSBzY2FsaW5nIGZhY3RvclxuICAgKiBAcGFyYW0gIHtSZWFkb25seU1hdDR9IG1hdCBNYXRyaXggdG8gYmUgZGVjb21wb3NlZCAoaW5wdXQpXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRfclxuICAgKi9cblxuICBmdW5jdGlvbiBkZWNvbXBvc2Uob3V0X3IsIG91dF90LCBvdXRfcywgbWF0KSB7XG4gICAgb3V0X3RbMF0gPSBtYXRbMTJdO1xuICAgIG91dF90WzFdID0gbWF0WzEzXTtcbiAgICBvdXRfdFsyXSA9IG1hdFsxNF07XG4gICAgdmFyIG0xMSA9IG1hdFswXTtcbiAgICB2YXIgbTEyID0gbWF0WzFdO1xuICAgIHZhciBtMTMgPSBtYXRbMl07XG4gICAgdmFyIG0yMSA9IG1hdFs0XTtcbiAgICB2YXIgbTIyID0gbWF0WzVdO1xuICAgIHZhciBtMjMgPSBtYXRbNl07XG4gICAgdmFyIG0zMSA9IG1hdFs4XTtcbiAgICB2YXIgbTMyID0gbWF0WzldO1xuICAgIHZhciBtMzMgPSBtYXRbMTBdO1xuICAgIG91dF9zWzBdID0gTWF0aC5oeXBvdChtMTEsIG0xMiwgbTEzKTtcbiAgICBvdXRfc1sxXSA9IE1hdGguaHlwb3QobTIxLCBtMjIsIG0yMyk7XG4gICAgb3V0X3NbMl0gPSBNYXRoLmh5cG90KG0zMSwgbTMyLCBtMzMpO1xuICAgIHZhciBpczEgPSAxIC8gb3V0X3NbMF07XG4gICAgdmFyIGlzMiA9IDEgLyBvdXRfc1sxXTtcbiAgICB2YXIgaXMzID0gMSAvIG91dF9zWzJdO1xuICAgIHZhciBzbTExID0gbTExICogaXMxO1xuICAgIHZhciBzbTEyID0gbTEyICogaXMyO1xuICAgIHZhciBzbTEzID0gbTEzICogaXMzO1xuICAgIHZhciBzbTIxID0gbTIxICogaXMxO1xuICAgIHZhciBzbTIyID0gbTIyICogaXMyO1xuICAgIHZhciBzbTIzID0gbTIzICogaXMzO1xuICAgIHZhciBzbTMxID0gbTMxICogaXMxO1xuICAgIHZhciBzbTMyID0gbTMyICogaXMyO1xuICAgIHZhciBzbTMzID0gbTMzICogaXMzO1xuICAgIHZhciB0cmFjZSA9IHNtMTEgKyBzbTIyICsgc20zMztcbiAgICB2YXIgUyA9IDA7XG5cbiAgICBpZiAodHJhY2UgPiAwKSB7XG4gICAgICBTID0gTWF0aC5zcXJ0KHRyYWNlICsgMS4wKSAqIDI7XG4gICAgICBvdXRfclszXSA9IDAuMjUgKiBTO1xuICAgICAgb3V0X3JbMF0gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICAgIG91dF9yWzFdID0gKHNtMzEgLSBzbTEzKSAvIFM7XG4gICAgICBvdXRfclsyXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgIH0gZWxzZSBpZiAoc20xMSA+IHNtMjIgJiYgc20xMSA+IHNtMzMpIHtcbiAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20xMSAtIHNtMjIgLSBzbTMzKSAqIDI7XG4gICAgICBvdXRfclszXSA9IChzbTIzIC0gc20zMikgLyBTO1xuICAgICAgb3V0X3JbMF0gPSAwLjI1ICogUztcbiAgICAgIG91dF9yWzFdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICBvdXRfclsyXSA9IChzbTMxICsgc20xMykgLyBTO1xuICAgIH0gZWxzZSBpZiAoc20yMiA+IHNtMzMpIHtcbiAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20yMiAtIHNtMTEgLSBzbTMzKSAqIDI7XG4gICAgICBvdXRfclszXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgICAgb3V0X3JbMF0gPSAoc20xMiArIHNtMjEpIC8gUztcbiAgICAgIG91dF9yWzFdID0gMC4yNSAqIFM7XG4gICAgICBvdXRfclsyXSA9IChzbTIzICsgc20zMikgLyBTO1xuICAgIH0gZWxzZSB7XG4gICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMzMgLSBzbTExIC0gc20yMikgKiAyO1xuICAgICAgb3V0X3JbM10gPSAoc20xMiAtIHNtMjEpIC8gUztcbiAgICAgIG91dF9yWzBdID0gKHNtMzEgKyBzbTEzKSAvIFM7XG4gICAgICBvdXRfclsxXSA9IChzbTIzICsgc20zMikgLyBTO1xuICAgICAgb3V0X3JbMl0gPSAwLjI1ICogUztcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0X3I7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHF1YXRlcm5pb24gcm90YXRpb24sIHZlY3RvciB0cmFuc2xhdGlvbiBhbmQgdmVjdG9yIHNjYWxlXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gICAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gICAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XG4gICAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICAgKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSlcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBzIFNjYWxpbmcgdmVjdG9yXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZShvdXQsIHEsIHYsIHMpIHtcbiAgICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgICB2YXIgeCA9IHFbMF0sXG4gICAgICAgIHkgPSBxWzFdLFxuICAgICAgICB6ID0gcVsyXSxcbiAgICAgICAgdyA9IHFbM107XG4gICAgdmFyIHgyID0geCArIHg7XG4gICAgdmFyIHkyID0geSArIHk7XG4gICAgdmFyIHoyID0geiArIHo7XG4gICAgdmFyIHh4ID0geCAqIHgyO1xuICAgIHZhciB4eSA9IHggKiB5MjtcbiAgICB2YXIgeHogPSB4ICogejI7XG4gICAgdmFyIHl5ID0geSAqIHkyO1xuICAgIHZhciB5eiA9IHkgKiB6MjtcbiAgICB2YXIgenogPSB6ICogejI7XG4gICAgdmFyIHd4ID0gdyAqIHgyO1xuICAgIHZhciB3eSA9IHcgKiB5MjtcbiAgICB2YXIgd3ogPSB3ICogejI7XG4gICAgdmFyIHN4ID0gc1swXTtcbiAgICB2YXIgc3kgPSBzWzFdO1xuICAgIHZhciBzeiA9IHNbMl07XG4gICAgb3V0WzBdID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gICAgb3V0WzFdID0gKHh5ICsgd3opICogc3g7XG4gICAgb3V0WzJdID0gKHh6IC0gd3kpICogc3g7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAoeHkgLSB3eikgKiBzeTtcbiAgICBvdXRbNV0gPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgICBvdXRbNl0gPSAoeXogKyB3eCkgKiBzeTtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9ICh4eiArIHd5KSAqIHN6O1xuICAgIG91dFs5XSA9ICh5eiAtIHd4KSAqIHN6O1xuICAgIG91dFsxMF0gPSAoMSAtICh4eCArIHl5KSkgKiBzejtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXTtcbiAgICBvdXRbMTNdID0gdlsxXTtcbiAgICBvdXRbMTRdID0gdlsyXTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZSwgcm90YXRpbmcgYW5kIHNjYWxpbmcgYXJvdW5kIHRoZSBnaXZlbiBvcmlnaW5cbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0NC50cmFuc2xhdGUoZGVzdCwgdmVjKTtcbiAgICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIG9yaWdpbik7XG4gICAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gICAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XG4gICAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICAgKiAgICAgbWF0NC5zY2FsZShkZXN0LCBzY2FsZSlcbiAgICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIG5lZ2F0aXZlT3JpZ2luKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBzIFNjYWxpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBvIFRoZSBvcmlnaW4gdmVjdG9yIGFyb3VuZCB3aGljaCB0byBzY2FsZSBhbmQgcm90YXRlXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbihvdXQsIHEsIHYsIHMsIG8pIHtcbiAgICAvLyBRdWF0ZXJuaW9uIG1hdGhcbiAgICB2YXIgeCA9IHFbMF0sXG4gICAgICAgIHkgPSBxWzFdLFxuICAgICAgICB6ID0gcVsyXSxcbiAgICAgICAgdyA9IHFbM107XG4gICAgdmFyIHgyID0geCArIHg7XG4gICAgdmFyIHkyID0geSArIHk7XG4gICAgdmFyIHoyID0geiArIHo7XG4gICAgdmFyIHh4ID0geCAqIHgyO1xuICAgIHZhciB4eSA9IHggKiB5MjtcbiAgICB2YXIgeHogPSB4ICogejI7XG4gICAgdmFyIHl5ID0geSAqIHkyO1xuICAgIHZhciB5eiA9IHkgKiB6MjtcbiAgICB2YXIgenogPSB6ICogejI7XG4gICAgdmFyIHd4ID0gdyAqIHgyO1xuICAgIHZhciB3eSA9IHcgKiB5MjtcbiAgICB2YXIgd3ogPSB3ICogejI7XG4gICAgdmFyIHN4ID0gc1swXTtcbiAgICB2YXIgc3kgPSBzWzFdO1xuICAgIHZhciBzeiA9IHNbMl07XG4gICAgdmFyIG94ID0gb1swXTtcbiAgICB2YXIgb3kgPSBvWzFdO1xuICAgIHZhciBveiA9IG9bMl07XG4gICAgdmFyIG91dDAgPSAoMSAtICh5eSArIHp6KSkgKiBzeDtcbiAgICB2YXIgb3V0MSA9ICh4eSArIHd6KSAqIHN4O1xuICAgIHZhciBvdXQyID0gKHh6IC0gd3kpICogc3g7XG4gICAgdmFyIG91dDQgPSAoeHkgLSB3eikgKiBzeTtcbiAgICB2YXIgb3V0NSA9ICgxIC0gKHh4ICsgenopKSAqIHN5O1xuICAgIHZhciBvdXQ2ID0gKHl6ICsgd3gpICogc3k7XG4gICAgdmFyIG91dDggPSAoeHogKyB3eSkgKiBzejtcbiAgICB2YXIgb3V0OSA9ICh5eiAtIHd4KSAqIHN6O1xuICAgIHZhciBvdXQxMCA9ICgxIC0gKHh4ICsgeXkpKSAqIHN6O1xuICAgIG91dFswXSA9IG91dDA7XG4gICAgb3V0WzFdID0gb3V0MTtcbiAgICBvdXRbMl0gPSBvdXQyO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gb3V0NDtcbiAgICBvdXRbNV0gPSBvdXQ1O1xuICAgIG91dFs2XSA9IG91dDY7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSBvdXQ4O1xuICAgIG91dFs5XSA9IG91dDk7XG4gICAgb3V0WzEwXSA9IG91dDEwO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSB2WzBdICsgb3ggLSAob3V0MCAqIG94ICsgb3V0NCAqIG95ICsgb3V0OCAqIG96KTtcbiAgICBvdXRbMTNdID0gdlsxXSArIG95IC0gKG91dDEgKiBveCArIG91dDUgKiBveSArIG91dDkgKiBveik7XG4gICAgb3V0WzE0XSA9IHZbMl0gKyBveiAtIChvdXQyICogb3ggKyBvdXQ2ICogb3kgKyBvdXQxMCAqIG96KTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIGEgNHg0IG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgUXVhdGVybmlvbiB0byBjcmVhdGUgbWF0cml4IGZyb21cbiAgICpcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sXG4gICAgICAgIHkgPSBxWzFdLFxuICAgICAgICB6ID0gcVsyXSxcbiAgICAgICAgdyA9IHFbM107XG4gICAgdmFyIHgyID0geCArIHg7XG4gICAgdmFyIHkyID0geSArIHk7XG4gICAgdmFyIHoyID0geiArIHo7XG4gICAgdmFyIHh4ID0geCAqIHgyO1xuICAgIHZhciB5eCA9IHkgKiB4MjtcbiAgICB2YXIgeXkgPSB5ICogeTI7XG4gICAgdmFyIHp4ID0geiAqIHgyO1xuICAgIHZhciB6eSA9IHogKiB5MjtcbiAgICB2YXIgenogPSB6ICogejI7XG4gICAgdmFyIHd4ID0gdyAqIHgyO1xuICAgIHZhciB3eSA9IHcgKiB5MjtcbiAgICB2YXIgd3ogPSB3ICogejI7XG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzFdID0geXggKyB3ejtcbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0genggKyB3eTtcbiAgICBvdXRbOV0gPSB6eSAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBmcnVzdHVtIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHNcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgKiBAcGFyYW0ge051bWJlcn0gbGVmdCBMZWZ0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByaWdodCBSaWdodCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge051bWJlcn0gYm90dG9tIEJvdHRvbSBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge051bWJlcn0gdG9wIFRvcCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge051bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJ1c3R1bShvdXQsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHRvcCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIHJsID0gMSAvIChyaWdodCAtIGxlZnQpO1xuICAgIHZhciB0YiA9IDEgLyAodG9wIC0gYm90dG9tKTtcbiAgICB2YXIgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFswXSA9IG5lYXIgKiAyICogcmw7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSBuZWFyICogMiAqIHRiO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAocmlnaHQgKyBsZWZ0KSAqIHJsO1xuICAgIG91dFs5XSA9ICh0b3AgKyBib3R0b20pICogdGI7XG4gICAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxMV0gPSAtMTtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gZmFyICogbmVhciAqIDIgKiBuZjtcbiAgICBvdXRbMTVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gICAqIFRoZSBuZWFyL2ZhciBjbGlwIHBsYW5lcyBjb3JyZXNwb25kIHRvIGEgbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZSBaIHJhbmdlIG9mIFstMSwgMV0sXG4gICAqIHdoaWNoIG1hdGNoZXMgV2ViR0wvT3BlbkdMJ3MgY2xpcCB2b2x1bWUuXG4gICAqIFBhc3NpbmcgbnVsbC91bmRlZmluZWQvbm8gdmFsdWUgZm9yIGZhciB3aWxsIGdlbmVyYXRlIGluZmluaXRlIHByb2plY3Rpb24gbWF0cml4LlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmb3Z5IFZlcnRpY2FsIGZpZWxkIG9mIHZpZXcgaW4gcmFkaWFuc1xuICAgKiBAcGFyYW0ge251bWJlcn0gYXNwZWN0IEFzcGVjdCByYXRpby4gdHlwaWNhbGx5IHZpZXdwb3J0IHdpZHRoL2hlaWdodFxuICAgKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtLCBjYW4gYmUgbnVsbCBvciBJbmZpbml0eVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBlcnNwZWN0aXZlTk8ob3V0LCBmb3Z5LCBhc3BlY3QsIG5lYXIsIGZhcikge1xuICAgIHZhciBmID0gMS4wIC8gTWF0aC50YW4oZm92eSAvIDIpO1xuICAgIG91dFswXSA9IGYgLyBhc3BlY3Q7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSBmO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzExXSA9IC0xO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNV0gPSAwO1xuXG4gICAgaWYgKGZhciAhPSBudWxsICYmIGZhciAhPT0gSW5maW5pdHkpIHtcbiAgICAgIHZhciBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgICBvdXRbMTBdID0gKGZhciArIG5lYXIpICogbmY7XG4gICAgICBvdXRbMTRdID0gMiAqIGZhciAqIG5lYXIgKiBuZjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0WzEwXSA9IC0xO1xuICAgICAgb3V0WzE0XSA9IC0yICogbmVhcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQucGVyc3BlY3RpdmVOT31cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBwZXJzcGVjdGl2ZSA9IHBlcnNwZWN0aXZlTk87XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCBzdWl0YWJsZSBmb3IgV2ViR1BVIHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cbiAgICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWzAsIDFdLFxuICAgKiB3aGljaCBtYXRjaGVzIFdlYkdQVS9WdWxrYW4vRGlyZWN0WC9NZXRhbCdzIGNsaXAgdm9sdW1lLlxuICAgKiBQYXNzaW5nIG51bGwvdW5kZWZpbmVkL25vIHZhbHVlIGZvciBmYXIgd2lsbCBnZW5lcmF0ZSBpbmZpbml0ZSBwcm9qZWN0aW9uIG1hdHJpeC5cbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgKiBAcGFyYW0ge251bWJlcn0gZm92eSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bSwgY2FuIGJlIG51bGwgb3IgSW5maW5pdHlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBwZXJzcGVjdGl2ZVpPKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMV0gPSAtMTtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTVdID0gMDtcblxuICAgIGlmIChmYXIgIT0gbnVsbCAmJiBmYXIgIT09IEluZmluaXR5KSB7XG4gICAgICB2YXIgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgICAgb3V0WzEwXSA9IGZhciAqIG5mO1xuICAgICAgb3V0WzE0XSA9IGZhciAqIG5lYXIgKiBuZjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0WzEwXSA9IC0xO1xuICAgICAgb3V0WzE0XSA9IC1uZWFyO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHBlcnNwZWN0aXZlIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGZpZWxkIG9mIHZpZXcuXG4gICAqIFRoaXMgaXMgcHJpbWFyaWx5IHVzZWZ1bCBmb3IgZ2VuZXJhdGluZyBwcm9qZWN0aW9uIG1hdHJpY2VzIHRvIGJlIHVzZWRcbiAgICogd2l0aCB0aGUgc3RpbGwgZXhwZXJpZW1lbnRhbCBXZWJWUiBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICogQHBhcmFtIHtPYmplY3R9IGZvdiBPYmplY3QgY29udGFpbmluZyB0aGUgZm9sbG93aW5nIHZhbHVlczogdXBEZWdyZWVzLCBkb3duRGVncmVlcywgbGVmdERlZ3JlZXMsIHJpZ2h0RGVncmVlc1xuICAgKiBAcGFyYW0ge251bWJlcn0gbmVhciBOZWFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBmYXIgRmFyIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXcob3V0LCBmb3YsIG5lYXIsIGZhcikge1xuICAgIHZhciB1cFRhbiA9IE1hdGgudGFuKGZvdi51cERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICAgIHZhciBkb3duVGFuID0gTWF0aC50YW4oZm92LmRvd25EZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgICB2YXIgbGVmdFRhbiA9IE1hdGgudGFuKGZvdi5sZWZ0RGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gICAgdmFyIHJpZ2h0VGFuID0gTWF0aC50YW4oZm92LnJpZ2h0RGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gICAgdmFyIHhTY2FsZSA9IDIuMCAvIChsZWZ0VGFuICsgcmlnaHRUYW4pO1xuICAgIHZhciB5U2NhbGUgPSAyLjAgLyAodXBUYW4gKyBkb3duVGFuKTtcbiAgICBvdXRbMF0gPSB4U2NhbGU7XG4gICAgb3V0WzFdID0gMC4wO1xuICAgIG91dFsyXSA9IDAuMDtcbiAgICBvdXRbM10gPSAwLjA7XG4gICAgb3V0WzRdID0gMC4wO1xuICAgIG91dFs1XSA9IHlTY2FsZTtcbiAgICBvdXRbNl0gPSAwLjA7XG4gICAgb3V0WzddID0gMC4wO1xuICAgIG91dFs4XSA9IC0oKGxlZnRUYW4gLSByaWdodFRhbikgKiB4U2NhbGUgKiAwLjUpO1xuICAgIG91dFs5XSA9ICh1cFRhbiAtIGRvd25UYW4pICogeVNjYWxlICogMC41O1xuICAgIG91dFsxMF0gPSBmYXIgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzExXSA9IC0xLjA7XG4gICAgb3V0WzEyXSA9IDAuMDtcbiAgICBvdXRbMTNdID0gMC4wO1xuICAgIG91dFsxNF0gPSBmYXIgKiBuZWFyIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxNV0gPSAwLjA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgb3J0aG9nb25hbCBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gICAqIFRoZSBuZWFyL2ZhciBjbGlwIHBsYW5lcyBjb3JyZXNwb25kIHRvIGEgbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZSBaIHJhbmdlIG9mIFstMSwgMV0sXG4gICAqIHdoaWNoIG1hdGNoZXMgV2ViR0wvT3BlbkdMJ3MgY2xpcCB2b2x1bWUuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9ydGhvTk8ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KTtcbiAgICB2YXIgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCk7XG4gICAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAtMiAqIGxyO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gLTIgKiBidDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSAyICogbmY7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gICAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gICAgb3V0WzE0XSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5vcnRob05PfVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG9ydGhvID0gb3J0aG9OTztcbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICAgKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbMCwgMV0sXG4gICAqIHdoaWNoIG1hdGNoZXMgV2ViR1BVL1Z1bGthbi9EaXJlY3RYL01ldGFsJ3MgY2xpcCB2b2x1bWUuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge251bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG9ydGhvWk8ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBsciA9IDEgLyAobGVmdCAtIHJpZ2h0KTtcbiAgICB2YXIgYnQgPSAxIC8gKGJvdHRvbSAtIHRvcCk7XG4gICAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSAtMiAqIGxyO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gLTIgKiBidDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSBuZjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gKGxlZnQgKyByaWdodCkgKiBscjtcbiAgICBvdXRbMTNdID0gKHRvcCArIGJvdHRvbSkgKiBidDtcbiAgICBvdXRbMTRdID0gbmVhciAqIG5mO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGxvb2stYXQgbWF0cml4IHdpdGggdGhlIGdpdmVuIGV5ZSBwb3NpdGlvbiwgZm9jYWwgcG9pbnQsIGFuZCB1cCBheGlzLlxuICAgKiBJZiB5b3Ugd2FudCBhIG1hdHJpeCB0aGF0IGFjdHVhbGx5IG1ha2VzIGFuIG9iamVjdCBsb29rIGF0IGFub3RoZXIgb2JqZWN0LCB5b3Ugc2hvdWxkIHVzZSB0YXJnZXRUbyBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBleWUgUG9zaXRpb24gb2YgdGhlIHZpZXdlclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gY2VudGVyIFBvaW50IHRoZSB2aWV3ZXIgaXMgbG9va2luZyBhdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdXAgdmVjMyBwb2ludGluZyB1cFxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxvb2tBdChvdXQsIGV5ZSwgY2VudGVyLCB1cCkge1xuICAgIHZhciB4MCwgeDEsIHgyLCB5MCwgeTEsIHkyLCB6MCwgejEsIHoyLCBsZW47XG4gICAgdmFyIGV5ZXggPSBleWVbMF07XG4gICAgdmFyIGV5ZXkgPSBleWVbMV07XG4gICAgdmFyIGV5ZXogPSBleWVbMl07XG4gICAgdmFyIHVweCA9IHVwWzBdO1xuICAgIHZhciB1cHkgPSB1cFsxXTtcbiAgICB2YXIgdXB6ID0gdXBbMl07XG4gICAgdmFyIGNlbnRlcnggPSBjZW50ZXJbMF07XG4gICAgdmFyIGNlbnRlcnkgPSBjZW50ZXJbMV07XG4gICAgdmFyIGNlbnRlcnogPSBjZW50ZXJbMl07XG5cbiAgICBpZiAoTWF0aC5hYnMoZXlleCAtIGNlbnRlcngpIDwgRVBTSUxPTiAmJiBNYXRoLmFicyhleWV5IC0gY2VudGVyeSkgPCBFUFNJTE9OICYmIE1hdGguYWJzKGV5ZXogLSBjZW50ZXJ6KSA8IEVQU0lMT04pIHtcbiAgICAgIHJldHVybiBpZGVudGl0eSQyKG91dCk7XG4gICAgfVxuXG4gICAgejAgPSBleWV4IC0gY2VudGVyeDtcbiAgICB6MSA9IGV5ZXkgLSBjZW50ZXJ5O1xuICAgIHoyID0gZXlleiAtIGNlbnRlcno7XG4gICAgbGVuID0gMSAvIE1hdGguaHlwb3QoejAsIHoxLCB6Mik7XG4gICAgejAgKj0gbGVuO1xuICAgIHoxICo9IGxlbjtcbiAgICB6MiAqPSBsZW47XG4gICAgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxO1xuICAgIHgxID0gdXB6ICogejAgLSB1cHggKiB6MjtcbiAgICB4MiA9IHVweCAqIHoxIC0gdXB5ICogejA7XG4gICAgbGVuID0gTWF0aC5oeXBvdCh4MCwgeDEsIHgyKTtcblxuICAgIGlmICghbGVuKSB7XG4gICAgICB4MCA9IDA7XG4gICAgICB4MSA9IDA7XG4gICAgICB4MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbiA9IDEgLyBsZW47XG4gICAgICB4MCAqPSBsZW47XG4gICAgICB4MSAqPSBsZW47XG4gICAgICB4MiAqPSBsZW47XG4gICAgfVxuXG4gICAgeTAgPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgICB5MSA9IHoyICogeDAgLSB6MCAqIHgyO1xuICAgIHkyID0gejAgKiB4MSAtIHoxICogeDA7XG4gICAgbGVuID0gTWF0aC5oeXBvdCh5MCwgeTEsIHkyKTtcblxuICAgIGlmICghbGVuKSB7XG4gICAgICB5MCA9IDA7XG4gICAgICB5MSA9IDA7XG4gICAgICB5MiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbiA9IDEgLyBsZW47XG4gICAgICB5MCAqPSBsZW47XG4gICAgICB5MSAqPSBsZW47XG4gICAgICB5MiAqPSBsZW47XG4gICAgfVxuXG4gICAgb3V0WzBdID0geDA7XG4gICAgb3V0WzFdID0geTA7XG4gICAgb3V0WzJdID0gejA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4MTtcbiAgICBvdXRbNV0gPSB5MTtcbiAgICBvdXRbNl0gPSB6MTtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHgyO1xuICAgIG91dFs5XSA9IHkyO1xuICAgIG91dFsxMF0gPSB6MjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gLSh4MCAqIGV5ZXggKyB4MSAqIGV5ZXkgKyB4MiAqIGV5ZXopO1xuICAgIG91dFsxM10gPSAtKHkwICogZXlleCArIHkxICogZXlleSArIHkyICogZXlleik7XG4gICAgb3V0WzE0XSA9IC0oejAgKiBleWV4ICsgejEgKiBleWV5ICsgejIgKiBleWV6KTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBtYXRyaXggdGhhdCBtYWtlcyBzb21ldGhpbmcgbG9vayBhdCBzb21ldGhpbmcgZWxzZS5cbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0YXJnZXRUbyhvdXQsIGV5ZSwgdGFyZ2V0LCB1cCkge1xuICAgIHZhciBleWV4ID0gZXllWzBdLFxuICAgICAgICBleWV5ID0gZXllWzFdLFxuICAgICAgICBleWV6ID0gZXllWzJdLFxuICAgICAgICB1cHggPSB1cFswXSxcbiAgICAgICAgdXB5ID0gdXBbMV0sXG4gICAgICAgIHVweiA9IHVwWzJdO1xuICAgIHZhciB6MCA9IGV5ZXggLSB0YXJnZXRbMF0sXG4gICAgICAgIHoxID0gZXlleSAtIHRhcmdldFsxXSxcbiAgICAgICAgejIgPSBleWV6IC0gdGFyZ2V0WzJdO1xuICAgIHZhciBsZW4gPSB6MCAqIHowICsgejEgKiB6MSArIHoyICogejI7XG5cbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgejAgKj0gbGVuO1xuICAgICAgejEgKj0gbGVuO1xuICAgICAgejIgKj0gbGVuO1xuICAgIH1cblxuICAgIHZhciB4MCA9IHVweSAqIHoyIC0gdXB6ICogejEsXG4gICAgICAgIHgxID0gdXB6ICogejAgLSB1cHggKiB6MixcbiAgICAgICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgIGxlbiA9IHgwICogeDAgKyB4MSAqIHgxICsgeDIgKiB4MjtcblxuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICBsZW4gPSAxIC8gTWF0aC5zcXJ0KGxlbik7XG4gICAgICB4MCAqPSBsZW47XG4gICAgICB4MSAqPSBsZW47XG4gICAgICB4MiAqPSBsZW47XG4gICAgfVxuXG4gICAgb3V0WzBdID0geDA7XG4gICAgb3V0WzFdID0geDE7XG4gICAgb3V0WzJdID0geDI7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB6MSAqIHgyIC0gejIgKiB4MTtcbiAgICBvdXRbNV0gPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICBvdXRbNl0gPSB6MCAqIHgxIC0gejEgKiB4MDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHowO1xuICAgIG91dFs5XSA9IHoxO1xuICAgIG91dFsxMF0gPSB6MjtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gZXlleDtcbiAgICBvdXRbMTNdID0gZXlleTtcbiAgICBvdXRbMTRdID0gZXllejtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgbWF0NFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0ciQ1KGEpIHtcbiAgICByZXR1cm4gXCJtYXQ0KFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiLCBcIiArIGFbNF0gKyBcIiwgXCIgKyBhWzVdICsgXCIsIFwiICsgYVs2XSArIFwiLCBcIiArIGFbN10gKyBcIiwgXCIgKyBhWzhdICsgXCIsIFwiICsgYVs5XSArIFwiLCBcIiArIGFbMTBdICsgXCIsIFwiICsgYVsxMV0gKyBcIiwgXCIgKyBhWzEyXSArIFwiLCBcIiArIGFbMTNdICsgXCIsIFwiICsgYVsxNF0gKyBcIiwgXCIgKyBhWzE1XSArIFwiKVwiO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0NFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9iKGEpIHtcbiAgICByZXR1cm4gTWF0aC5oeXBvdChhWzBdLCBhWzFdLCBhWzJdLCBhWzNdLCBhWzRdLCBhWzVdLCBhWzZdLCBhWzddLCBhWzhdLCBhWzldLCBhWzEwXSwgYVsxMV0sIGFbMTJdLCBhWzEzXSwgYVsxNF0sIGFbMTVdKTtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gbWF0NCdzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkZCQ1KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gKyBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gKyBiWzVdO1xuICAgIG91dFs2XSA9IGFbNl0gKyBiWzZdO1xuICAgIG91dFs3XSA9IGFbN10gKyBiWzddO1xuICAgIG91dFs4XSA9IGFbOF0gKyBiWzhdO1xuICAgIG91dFs5XSA9IGFbOV0gKyBiWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXSArIGJbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXSArIGJbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXSArIGJbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXSArIGJbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XSArIGJbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XSArIGJbMTVdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0JDMob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gICAgb3V0WzRdID0gYVs0XSAtIGJbNF07XG4gICAgb3V0WzVdID0gYVs1XSAtIGJbNV07XG4gICAgb3V0WzZdID0gYVs2XSAtIGJbNl07XG4gICAgb3V0WzddID0gYVs3XSAtIGJbN107XG4gICAgb3V0WzhdID0gYVs4XSAtIGJbOF07XG4gICAgb3V0WzldID0gYVs5XSAtIGJbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdIC0gYlsxMF07XG4gICAgb3V0WzExXSA9IGFbMTFdIC0gYlsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdIC0gYlsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdIC0gYlsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdIC0gYlsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdIC0gYlsxNV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbHkgZWFjaCBlbGVtZW50IG9mIHRoZSBtYXRyaXggYnkgYSBzY2FsYXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSBtYXRyaXgncyBlbGVtZW50cyBieVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIG91dFs0XSA9IGFbNF0gKiBiO1xuICAgIG91dFs1XSA9IGFbNV0gKiBiO1xuICAgIG91dFs2XSA9IGFbNl0gKiBiO1xuICAgIG91dFs3XSA9IGFbN10gKiBiO1xuICAgIG91dFs4XSA9IGFbOF0gKiBiO1xuICAgIG91dFs5XSA9IGFbOV0gKiBiO1xuICAgIG91dFsxMF0gPSBhWzEwXSAqIGI7XG4gICAgb3V0WzExXSA9IGFbMTFdICogYjtcbiAgICBvdXRbMTJdID0gYVsxMl0gKiBiO1xuICAgIG91dFsxM10gPSBhWzEzXSAqIGI7XG4gICAgb3V0WzE0XSA9IGFbMTRdICogYjtcbiAgICBvdXRbMTVdID0gYVsxNV0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIG1hdDQncyBhZnRlciBtdWx0aXBseWluZyBlYWNoIGVsZW1lbnQgb2YgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYidzIGVsZW1lbnRzIGJ5IGJlZm9yZSBhZGRpbmdcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseVNjYWxhckFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gICAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XSAqIHNjYWxlO1xuICAgIG91dFs1XSA9IGFbNV0gKyBiWzVdICogc2NhbGU7XG4gICAgb3V0WzZdID0gYVs2XSArIGJbNl0gKiBzY2FsZTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XSAqIHNjYWxlO1xuICAgIG91dFs4XSA9IGFbOF0gKyBiWzhdICogc2NhbGU7XG4gICAgb3V0WzldID0gYVs5XSArIGJbOV0gKiBzY2FsZTtcbiAgICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXSAqIHNjYWxlO1xuICAgIG91dFsxMV0gPSBhWzExXSArIGJbMTFdICogc2NhbGU7XG4gICAgb3V0WzEyXSA9IGFbMTJdICsgYlsxMl0gKiBzY2FsZTtcbiAgICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXSAqIHNjYWxlO1xuICAgIG91dFsxNF0gPSBhWzE0XSArIGJbMTRdICogc2NhbGU7XG4gICAgb3V0WzE1XSA9IGFbMTVdICsgYlsxNV0gKiBzY2FsZTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4YWN0RXF1YWxzJDUoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIGFbNF0gPT09IGJbNF0gJiYgYVs1XSA9PT0gYls1XSAmJiBhWzZdID09PSBiWzZdICYmIGFbN10gPT09IGJbN10gJiYgYVs4XSA9PT0gYls4XSAmJiBhWzldID09PSBiWzldICYmIGFbMTBdID09PSBiWzEwXSAmJiBhWzExXSA9PT0gYlsxMV0gJiYgYVsxMl0gPT09IGJbMTJdICYmIGFbMTNdID09PSBiWzEzXSAmJiBhWzE0XSA9PT0gYlsxNF0gJiYgYVsxNV0gPT09IGJbMTVdO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBtYXRyaWNlcyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBiIFRoZSBzZWNvbmQgbWF0cml4LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbWF0cmljZXMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVxdWFscyQ1KGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdO1xuICAgIHZhciBhNCA9IGFbNF0sXG4gICAgICAgIGE1ID0gYVs1XSxcbiAgICAgICAgYTYgPSBhWzZdLFxuICAgICAgICBhNyA9IGFbN107XG4gICAgdmFyIGE4ID0gYVs4XSxcbiAgICAgICAgYTkgPSBhWzldLFxuICAgICAgICBhMTAgPSBhWzEwXSxcbiAgICAgICAgYTExID0gYVsxMV07XG4gICAgdmFyIGExMiA9IGFbMTJdLFxuICAgICAgICBhMTMgPSBhWzEzXSxcbiAgICAgICAgYTE0ID0gYVsxNF0sXG4gICAgICAgIGExNSA9IGFbMTVdO1xuICAgIHZhciBiMCA9IGJbMF0sXG4gICAgICAgIGIxID0gYlsxXSxcbiAgICAgICAgYjIgPSBiWzJdLFxuICAgICAgICBiMyA9IGJbM107XG4gICAgdmFyIGI0ID0gYls0XSxcbiAgICAgICAgYjUgPSBiWzVdLFxuICAgICAgICBiNiA9IGJbNl0sXG4gICAgICAgIGI3ID0gYls3XTtcbiAgICB2YXIgYjggPSBiWzhdLFxuICAgICAgICBiOSA9IGJbOV0sXG4gICAgICAgIGIxMCA9IGJbMTBdLFxuICAgICAgICBiMTEgPSBiWzExXTtcbiAgICB2YXIgYjEyID0gYlsxMl0sXG4gICAgICAgIGIxMyA9IGJbMTNdLFxuICAgICAgICBiMTQgPSBiWzE0XSxcbiAgICAgICAgYjE1ID0gYlsxNV07XG4gICAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJiBNYXRoLmFicyhhNCAtIGI0KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiYgTWF0aC5hYnMoYTUgLSBiNSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpICYmIE1hdGguYWJzKGE2IC0gYjYpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJiBNYXRoLmFicyhhNyAtIGI3KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSkgJiYgTWF0aC5hYnMoYTggLSBiOCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTgpLCBNYXRoLmFicyhiOCkpICYmIE1hdGguYWJzKGE5IC0gYjkpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE5KSwgTWF0aC5hYnMoYjkpKSAmJiBNYXRoLmFicyhhMTAgLSBiMTApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMCksIE1hdGguYWJzKGIxMCkpICYmIE1hdGguYWJzKGExMSAtIGIxMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTExKSwgTWF0aC5hYnMoYjExKSkgJiYgTWF0aC5hYnMoYTEyIC0gYjEyKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTIpLCBNYXRoLmFicyhiMTIpKSAmJiBNYXRoLmFicyhhMTMgLSBiMTMpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMyksIE1hdGguYWJzKGIxMykpICYmIE1hdGguYWJzKGExNCAtIGIxNCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTE0KSwgTWF0aC5hYnMoYjE0KSkgJiYgTWF0aC5hYnMoYTE1IC0gYjE1KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTUpLCBNYXRoLmFicyhiMTUpKTtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBtYXQ0Lm11bHRpcGx5fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG11bCQ1ID0gbXVsdGlwbHkkNTtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5zdWJ0cmFjdH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzdWIkMyA9IHN1YnRyYWN0JDM7XG5cbiAgdmFyIG1hdDQgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIGNyZWF0ZTogY3JlYXRlJDUsXG4gICAgY2xvbmU6IGNsb25lJDUsXG4gICAgY29weTogY29weSQ1LFxuICAgIGZyb21WYWx1ZXM6IGZyb21WYWx1ZXMkNSxcbiAgICBzZXQ6IHNldCQ1LFxuICAgIGlkZW50aXR5OiBpZGVudGl0eSQyLFxuICAgIHRyYW5zcG9zZTogdHJhbnNwb3NlLFxuICAgIGludmVydDogaW52ZXJ0JDIsXG4gICAgYWRqb2ludDogYWRqb2ludCxcbiAgICBkZXRlcm1pbmFudDogZGV0ZXJtaW5hbnQsXG4gICAgbXVsdGlwbHk6IG11bHRpcGx5JDUsXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUkMSxcbiAgICBzY2FsZTogc2NhbGUkNSxcbiAgICByb3RhdGU6IHJvdGF0ZSQxLFxuICAgIHJvdGF0ZVg6IHJvdGF0ZVgkMyxcbiAgICByb3RhdGVZOiByb3RhdGVZJDMsXG4gICAgcm90YXRlWjogcm90YXRlWiQzLFxuICAgIGZyb21UcmFuc2xhdGlvbjogZnJvbVRyYW5zbGF0aW9uJDEsXG4gICAgZnJvbVNjYWxpbmc6IGZyb21TY2FsaW5nLFxuICAgIGZyb21Sb3RhdGlvbjogZnJvbVJvdGF0aW9uJDEsXG4gICAgZnJvbVhSb3RhdGlvbjogZnJvbVhSb3RhdGlvbixcbiAgICBmcm9tWVJvdGF0aW9uOiBmcm9tWVJvdGF0aW9uLFxuICAgIGZyb21aUm90YXRpb246IGZyb21aUm90YXRpb24sXG4gICAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb246IGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uJDEsXG4gICAgZnJvbVF1YXQyOiBmcm9tUXVhdDIsXG4gICAgZ2V0VHJhbnNsYXRpb246IGdldFRyYW5zbGF0aW9uJDEsXG4gICAgZ2V0U2NhbGluZzogZ2V0U2NhbGluZyxcbiAgICBnZXRSb3RhdGlvbjogZ2V0Um90YXRpb24sXG4gICAgZGVjb21wb3NlOiBkZWNvbXBvc2UsXG4gICAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZTogZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZSxcbiAgICBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlT3JpZ2luOiBmcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlT3JpZ2luLFxuICAgIGZyb21RdWF0OiBmcm9tUXVhdCxcbiAgICBmcnVzdHVtOiBmcnVzdHVtLFxuICAgIHBlcnNwZWN0aXZlTk86IHBlcnNwZWN0aXZlTk8sXG4gICAgcGVyc3BlY3RpdmU6IHBlcnNwZWN0aXZlLFxuICAgIHBlcnNwZWN0aXZlWk86IHBlcnNwZWN0aXZlWk8sXG4gICAgcGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXc6IHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3LFxuICAgIG9ydGhvTk86IG9ydGhvTk8sXG4gICAgb3J0aG86IG9ydGhvLFxuICAgIG9ydGhvWk86IG9ydGhvWk8sXG4gICAgbG9va0F0OiBsb29rQXQsXG4gICAgdGFyZ2V0VG86IHRhcmdldFRvLFxuICAgIHN0cjogc3RyJDUsXG4gICAgZnJvYjogZnJvYixcbiAgICBhZGQ6IGFkZCQ1LFxuICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCQzLFxuICAgIG11bHRpcGx5U2NhbGFyOiBtdWx0aXBseVNjYWxhcixcbiAgICBtdWx0aXBseVNjYWxhckFuZEFkZDogbXVsdGlwbHlTY2FsYXJBbmRBZGQsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzJDUsXG4gICAgZXF1YWxzOiBlcXVhbHMkNSxcbiAgICBtdWw6IG11bCQ1LFxuICAgIHN1Yjogc3ViJDNcbiAgfSk7XG5cbiAgLyoqXG4gICAqIDMgRGltZW5zaW9uYWwgVmVjdG9yXG4gICAqIEBtb2R1bGUgdmVjM1xuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjM1xuICAgKlxuICAgKiBAcmV0dXJucyB7dmVjM30gYSBuZXcgM0QgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZSQ0KCkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSgzKTtcblxuICAgIGlmIChBUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgICAgb3V0WzBdID0gMDtcbiAgICAgIG91dFsxXSA9IDA7XG4gICAgICBvdXRbMl0gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2xvbmVcbiAgICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBjbG9uZSQ0KGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjM1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICAgKi9cblxuICBmdW5jdGlvbiBsZW5ndGgkNChhKSB7XG4gICAgdmFyIHggPSBhWzBdO1xuICAgIHZhciB5ID0gYVsxXTtcbiAgICB2YXIgeiA9IGFbMl07XG4gICAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeik7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdmVjMyBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAgICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tVmFsdWVzJDQoeCwgeSwgeikge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSgzKTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMyB0byBhbm90aGVyXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY29weSQ0KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldCQ0KG91dCwgeCwgeSwgeikge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIHZlYzMnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBhZGQkNChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzdWJ0cmFjdCQyKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgdHdvIHZlYzMnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseSQ0KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIERpdmlkZXMgdHdvIHZlYzMnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBkaXZpZGUkMihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjZWlsXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY2VpbCQyKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGguY2VpbChhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5jZWlsKGFbMl0pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE1hdGguZmxvb3IgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBmbG9vclxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZsb29yJDIob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjMydzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1pbiQyKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzMnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtYXgkMihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gcm91bmRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3VuZCQyKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLnJvdW5kKGFbMl0pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNjYWxlcyBhIHZlYzMgYnkgYSBzY2FsYXIgbnVtYmVyXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gc2NhbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSB2ZWN0b3IgYnlcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzY2FsZSQ0KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIHZlYzMncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2NhbGVBbmRBZGQkMihvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzMnc1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRpc3RhbmNlJDIoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF07XG4gICAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICAgIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHopO1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZSQyKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICAgIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gICAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgICByZXR1cm4geCAqIHggKyB5ICogeSArIHogKiB6O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzNcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgkNChhKSB7XG4gICAgdmFyIHggPSBhWzBdO1xuICAgIHZhciB5ID0gYVsxXTtcbiAgICB2YXIgeiA9IGFbMl07XG4gICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbiAgfVxuICAvKipcbiAgICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5lZ2F0ZSQyKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBpbnZlcnRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZlcnNlJDIob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICAgIG91dFsyXSA9IDEuMCAvIGFbMl07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTm9ybWFsaXplIGEgdmVjM1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplJDQob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdO1xuICAgIHZhciB5ID0gYVsxXTtcbiAgICB2YXIgeiA9IGFbMl07XG4gICAgdmFyIGxlbiA9IHggKiB4ICsgeSAqIHkgKyB6ICogejtcblxuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgIH1cblxuICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgICBvdXRbMl0gPSBhWzJdICogbGVuO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAgICovXG5cbiAgZnVuY3Rpb24gZG90JDQoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl07XG4gIH1cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY3Jvc3MkMihvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV0sXG4gICAgICAgIGF6ID0gYVsyXTtcbiAgICB2YXIgYnggPSBiWzBdLFxuICAgICAgICBieSA9IGJbMV0sXG4gICAgICAgIGJ6ID0gYlsyXTtcbiAgICBvdXRbMF0gPSBheSAqIGJ6IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheiAqIGJ4IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzMnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxlcnAkNChvdXQsIGEsIGIsIHQpIHtcbiAgICB2YXIgYXggPSBhWzBdO1xuICAgIHZhciBheSA9IGFbMV07XG4gICAgdmFyIGF6ID0gYVsyXTtcbiAgICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgICBvdXRbMl0gPSBheiArIHQgKiAoYlsyXSAtIGF6KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNwaGVyaWNhbCBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzbGVycCQxKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBhbmdsZSA9IE1hdGguYWNvcyhNYXRoLm1pbihNYXRoLm1heChkb3QkNChhLCBiKSwgLTEpLCAxKSk7XG4gICAgdmFyIHNpblRvdGFsID0gTWF0aC5zaW4oYW5nbGUpO1xuICAgIHZhciByYXRpb0EgPSBNYXRoLnNpbigoMSAtIHQpICogYW5nbGUpIC8gc2luVG90YWw7XG4gICAgdmFyIHJhdGlvQiA9IE1hdGguc2luKHQgKiBhbmdsZSkgLyBzaW5Ub3RhbDtcbiAgICBvdXRbMF0gPSByYXRpb0EgKiBhWzBdICsgcmF0aW9CICogYlswXTtcbiAgICBvdXRbMV0gPSByYXRpb0EgKiBhWzFdICsgcmF0aW9CICogYlsxXTtcbiAgICBvdXRbMl0gPSByYXRpb0EgKiBhWzJdICsgcmF0aW9CICogYlsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGhlcm1pdGUgaW50ZXJwb2xhdGlvbiB3aXRoIHR3byBjb250cm9sIHBvaW50c1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGMgdGhlIHRoaXJkIG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGQgdGhlIGZvdXJ0aCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBoZXJtaXRlKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICAgIHZhciBmYWN0b3JUaW1lczIgPSB0ICogdDtcbiAgICB2YXIgZmFjdG9yMSA9IGZhY3RvclRpbWVzMiAqICgyICogdCAtIDMpICsgMTtcbiAgICB2YXIgZmFjdG9yMiA9IGZhY3RvclRpbWVzMiAqICh0IC0gMikgKyB0O1xuICAgIHZhciBmYWN0b3IzID0gZmFjdG9yVGltZXMyICogKHQgLSAxKTtcbiAgICB2YXIgZmFjdG9yNCA9IGZhY3RvclRpbWVzMiAqICgzIC0gMiAqIHQpO1xuICAgIG91dFswXSA9IGFbMF0gKiBmYWN0b3IxICsgYlswXSAqIGZhY3RvcjIgKyBjWzBdICogZmFjdG9yMyArIGRbMF0gKiBmYWN0b3I0O1xuICAgIG91dFsxXSA9IGFbMV0gKiBmYWN0b3IxICsgYlsxXSAqIGZhY3RvcjIgKyBjWzFdICogZmFjdG9yMyArIGRbMV0gKiBmYWN0b3I0O1xuICAgIG91dFsyXSA9IGFbMl0gKiBmYWN0b3IxICsgYlsyXSAqIGZhY3RvcjIgKyBjWzJdICogZmFjdG9yMyArIGRbMl0gKiBmYWN0b3I0O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgYmV6aWVyIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjIHRoZSB0aGlyZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYmV6aWVyKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICAgIHZhciBpbnZlcnNlRmFjdG9yID0gMSAtIHQ7XG4gICAgdmFyIGludmVyc2VGYWN0b3JUaW1lc1R3byA9IGludmVyc2VGYWN0b3IgKiBpbnZlcnNlRmFjdG9yO1xuICAgIHZhciBmYWN0b3JUaW1lczIgPSB0ICogdDtcbiAgICB2YXIgZmFjdG9yMSA9IGludmVyc2VGYWN0b3JUaW1lc1R3byAqIGludmVyc2VGYWN0b3I7XG4gICAgdmFyIGZhY3RvcjIgPSAzICogdCAqIGludmVyc2VGYWN0b3JUaW1lc1R3bztcbiAgICB2YXIgZmFjdG9yMyA9IDMgKiBmYWN0b3JUaW1lczIgKiBpbnZlcnNlRmFjdG9yO1xuICAgIHZhciBmYWN0b3I0ID0gZmFjdG9yVGltZXMyICogdDtcbiAgICBvdXRbMF0gPSBhWzBdICogZmFjdG9yMSArIGJbMF0gKiBmYWN0b3IyICsgY1swXSAqIGZhY3RvcjMgKyBkWzBdICogZmFjdG9yNDtcbiAgICBvdXRbMV0gPSBhWzFdICogZmFjdG9yMSArIGJbMV0gKiBmYWN0b3IyICsgY1sxXSAqIGZhY3RvcjMgKyBkWzFdICogZmFjdG9yNDtcbiAgICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcmFuZG9tJDMob3V0LCBzY2FsZSkge1xuICAgIHNjYWxlID0gc2NhbGUgPT09IHVuZGVmaW5lZCA/IDEuMCA6IHNjYWxlO1xuICAgIHZhciByID0gUkFORE9NKCkgKiAyLjAgKiBNYXRoLlBJO1xuICAgIHZhciB6ID0gUkFORE9NKCkgKiAyLjAgLSAxLjA7XG4gICAgdmFyIHpTY2FsZSA9IE1hdGguc3FydCgxLjAgLSB6ICogeikgKiBzY2FsZTtcbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHpTY2FsZTtcbiAgICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHpTY2FsZTtcbiAgICBvdXRbMl0gPSB6ICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0NC5cbiAgICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NCQyKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIHZhciB3ID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdO1xuICAgIHcgPSB3IHx8IDEuMDtcbiAgICBvdXRbMF0gPSAobVswXSAqIHggKyBtWzRdICogeSArIG1bOF0gKiB6ICsgbVsxMl0pIC8gdztcbiAgICBvdXRbMV0gPSAobVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10pIC8gdztcbiAgICBvdXRbMl0gPSAobVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdKSAvIHc7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgbWF0My5cbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IG0gdGhlIDN4MyBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQzJDEob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgb3V0WzBdID0geCAqIG1bMF0gKyB5ICogbVszXSArIHogKiBtWzZdO1xuICAgIG91dFsxXSA9IHggKiBtWzFdICsgeSAqIG1bNF0gKyB6ICogbVs3XTtcbiAgICBvdXRbMl0gPSB4ICogbVsyXSArIHkgKiBtWzVdICsgeiAqIG1bOF07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgdmVjMyB3aXRoIGEgcXVhdFxuICAgKiBDYW4gYWxzbyBiZSB1c2VkIGZvciBkdWFsIHF1YXRlcm5pb25zLiAoTXVsdGlwbHkgaXQgd2l0aCB0aGUgcmVhbCBwYXJ0KVxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHRyYW5zZm9ybSB3aXRoXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtUXVhdCQxKG91dCwgYSwgcSkge1xuICAgIC8vIGJlbmNobWFya3M6IGh0dHBzOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXRyYW5zZm9ybS12ZWMzLWltcGxlbWVudGF0aW9ucy1maXhlZFxuICAgIHZhciBxeCA9IHFbMF0sXG4gICAgICAgIHF5ID0gcVsxXSxcbiAgICAgICAgcXogPSBxWzJdLFxuICAgICAgICBxdyA9IHFbM107XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07IC8vIHZhciBxdmVjID0gW3F4LCBxeSwgcXpdO1xuICAgIC8vIHZhciB1diA9IHZlYzMuY3Jvc3MoW10sIHF2ZWMsIGEpO1xuXG4gICAgdmFyIHV2eCA9IHF5ICogeiAtIHF6ICogeSxcbiAgICAgICAgdXZ5ID0gcXogKiB4IC0gcXggKiB6LFxuICAgICAgICB1dnogPSBxeCAqIHkgLSBxeSAqIHg7IC8vIHZhciB1dXYgPSB2ZWMzLmNyb3NzKFtdLCBxdmVjLCB1dik7XG5cbiAgICB2YXIgdXV2eCA9IHF5ICogdXZ6IC0gcXogKiB1dnksXG4gICAgICAgIHV1dnkgPSBxeiAqIHV2eCAtIHF4ICogdXZ6LFxuICAgICAgICB1dXZ6ID0gcXggKiB1dnkgLSBxeSAqIHV2eDsgLy8gdmVjMy5zY2FsZSh1diwgdXYsIDIgKiB3KTtcblxuICAgIHZhciB3MiA9IHF3ICogMjtcbiAgICB1dnggKj0gdzI7XG4gICAgdXZ5ICo9IHcyO1xuICAgIHV2eiAqPSB3MjsgLy8gdmVjMy5zY2FsZSh1dXYsIHV1diwgMik7XG5cbiAgICB1dXZ4ICo9IDI7XG4gICAgdXV2eSAqPSAyO1xuICAgIHV1dnogKj0gMjsgLy8gcmV0dXJuIHZlYzMuYWRkKG91dCwgYSwgdmVjMy5hZGQob3V0LCB1diwgdXV2KSk7XG5cbiAgICBvdXRbMF0gPSB4ICsgdXZ4ICsgdXV2eDtcbiAgICBvdXRbMV0gPSB5ICsgdXZ5ICsgdXV2eTtcbiAgICBvdXRbMl0gPSB6ICsgdXZ6ICsgdXV2ejtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB4LWF4aXNcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlWCQyKG91dCwgYSwgYiwgcmFkKSB7XG4gICAgdmFyIHAgPSBbXSxcbiAgICAgICAgciA9IFtdOyAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cbiAgICBwWzBdID0gYVswXSAtIGJbMF07XG4gICAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIHBbMl0gPSBhWzJdIC0gYlsyXTsgLy9wZXJmb3JtIHJvdGF0aW9uXG5cbiAgICByWzBdID0gcFswXTtcbiAgICByWzFdID0gcFsxXSAqIE1hdGguY29zKHJhZCkgLSBwWzJdICogTWF0aC5zaW4ocmFkKTtcbiAgICByWzJdID0gcFsxXSAqIE1hdGguc2luKHJhZCkgKyBwWzJdICogTWF0aC5jb3MocmFkKTsgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gICAgb3V0WzBdID0gclswXSArIGJbMF07XG4gICAgb3V0WzFdID0gclsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gclsyXSArIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeS1heGlzXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZVkkMihvdXQsIGEsIGIsIHJhZCkge1xuICAgIHZhciBwID0gW10sXG4gICAgICAgIHIgPSBbXTsgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXG4gICAgcFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBwWzJdID0gYVsyXSAtIGJbMl07IC8vcGVyZm9ybSByb3RhdGlvblxuXG4gICAgclswXSA9IHBbMl0gKiBNYXRoLnNpbihyYWQpICsgcFswXSAqIE1hdGguY29zKHJhZCk7XG4gICAgclsxXSA9IHBbMV07XG4gICAgclsyXSA9IHBbMl0gKiBNYXRoLmNvcyhyYWQpIC0gcFswXSAqIE1hdGguc2luKHJhZCk7IC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICAgIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICAgIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHotYXhpc1xuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVaJDIob3V0LCBhLCBiLCByYWQpIHtcbiAgICB2YXIgcCA9IFtdLFxuICAgICAgICByID0gW107IC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblxuICAgIHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBwWzFdID0gYVsxXSAtIGJbMV07XG4gICAgcFsyXSA9IGFbMl0gLSBiWzJdOyAvL3BlcmZvcm0gcm90YXRpb25cblxuICAgIHJbMF0gPSBwWzBdICogTWF0aC5jb3MocmFkKSAtIHBbMV0gKiBNYXRoLnNpbihyYWQpO1xuICAgIHJbMV0gPSBwWzBdICogTWF0aC5zaW4ocmFkKSArIHBbMV0gKiBNYXRoLmNvcyhyYWQpO1xuICAgIHJbMl0gPSBwWzJdOyAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgICBvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZXQgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIDNEIHZlY3RvcnNcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBhbmdsZSBpbiByYWRpYW5zXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFuZ2xlJDEoYSwgYikge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBieCA9IGJbMF0sXG4gICAgICAgIGJ5ID0gYlsxXSxcbiAgICAgICAgYnogPSBiWzJdLFxuICAgICAgICBtYWcgPSBNYXRoLnNxcnQoKGF4ICogYXggKyBheSAqIGF5ICsgYXogKiBheikgKiAoYnggKiBieCArIGJ5ICogYnkgKyBieiAqIGJ6KSksXG4gICAgICAgIGNvc2luZSA9IG1hZyAmJiBkb3QkNChhLCBiKSAvIG1hZztcbiAgICByZXR1cm4gTWF0aC5hY29zKE1hdGgubWluKE1hdGgubWF4KGNvc2luZSwgLTEpLCAxKSk7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzMgdG8gemVyb1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHplcm8kMihvdXQpIHtcbiAgICBvdXRbMF0gPSAwLjA7XG4gICAgb3V0WzFdID0gMC4wO1xuICAgIG91dFsyXSA9IDAuMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyJDQoYSkge1xuICAgIHJldHVybiBcInZlYzMoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIilcIjtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZXhhY3RFcXVhbHMkNChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXSAmJiBhWzJdID09PSBiWzJdO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBlcXVhbHMkNChhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl07XG4gICAgdmFyIGIwID0gYlswXSxcbiAgICAgICAgYjEgPSBiWzFdLFxuICAgICAgICBiMiA9IGJbMl07XG4gICAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3VidHJhY3R9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3ViJDIgPSBzdWJ0cmFjdCQyO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLm11bHRpcGx5fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG11bCQ0ID0gbXVsdGlwbHkkNDtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXZpZGV9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZGl2JDIgPSBkaXZpZGUkMjtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5kaXN0YW5jZX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBkaXN0JDIgPSBkaXN0YW5jZSQyO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnNxdWFyZWREaXN0YW5jZX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzcXJEaXN0JDIgPSBzcXVhcmVkRGlzdGFuY2UkMjtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5sZW5ndGh9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbGVuJDQgPSBsZW5ndGgkNDtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkTGVuZ3RofVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNxckxlbiQ0ID0gc3F1YXJlZExlbmd0aCQ0O1xuICAvKipcbiAgICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzNzLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzMuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjM3MgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gYVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGZvckVhY2gkMiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmVjID0gY3JlYXRlJDQoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgdmFyIGksIGw7XG5cbiAgICAgIGlmICghc3RyaWRlKSB7XG4gICAgICAgIHN0cmlkZSA9IDM7XG4gICAgICB9XG5cbiAgICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb3VudCkge1xuICAgICAgICBsID0gTWF0aC5taW4oY291bnQgKiBzdHJpZGUgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgICAgdmVjWzFdID0gYVtpICsgMV07XG4gICAgICAgIHZlY1syXSA9IGFbaSArIDJdO1xuICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgYVtpXSA9IHZlY1swXTtcbiAgICAgICAgYVtpICsgMV0gPSB2ZWNbMV07XG4gICAgICAgIGFbaSArIDJdID0gdmVjWzJdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYTtcbiAgICB9O1xuICB9KCk7XG5cbiAgdmFyIHZlYzMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIGNyZWF0ZTogY3JlYXRlJDQsXG4gICAgY2xvbmU6IGNsb25lJDQsXG4gICAgbGVuZ3RoOiBsZW5ndGgkNCxcbiAgICBmcm9tVmFsdWVzOiBmcm9tVmFsdWVzJDQsXG4gICAgY29weTogY29weSQ0LFxuICAgIHNldDogc2V0JDQsXG4gICAgYWRkOiBhZGQkNCxcbiAgICBzdWJ0cmFjdDogc3VidHJhY3QkMixcbiAgICBtdWx0aXBseTogbXVsdGlwbHkkNCxcbiAgICBkaXZpZGU6IGRpdmlkZSQyLFxuICAgIGNlaWw6IGNlaWwkMixcbiAgICBmbG9vcjogZmxvb3IkMixcbiAgICBtaW46IG1pbiQyLFxuICAgIG1heDogbWF4JDIsXG4gICAgcm91bmQ6IHJvdW5kJDIsXG4gICAgc2NhbGU6IHNjYWxlJDQsXG4gICAgc2NhbGVBbmRBZGQ6IHNjYWxlQW5kQWRkJDIsXG4gICAgZGlzdGFuY2U6IGRpc3RhbmNlJDIsXG4gICAgc3F1YXJlZERpc3RhbmNlOiBzcXVhcmVkRGlzdGFuY2UkMixcbiAgICBzcXVhcmVkTGVuZ3RoOiBzcXVhcmVkTGVuZ3RoJDQsXG4gICAgbmVnYXRlOiBuZWdhdGUkMixcbiAgICBpbnZlcnNlOiBpbnZlcnNlJDIsXG4gICAgbm9ybWFsaXplOiBub3JtYWxpemUkNCxcbiAgICBkb3Q6IGRvdCQ0LFxuICAgIGNyb3NzOiBjcm9zcyQyLFxuICAgIGxlcnA6IGxlcnAkNCxcbiAgICBzbGVycDogc2xlcnAkMSxcbiAgICBoZXJtaXRlOiBoZXJtaXRlLFxuICAgIGJlemllcjogYmV6aWVyLFxuICAgIHJhbmRvbTogcmFuZG9tJDMsXG4gICAgdHJhbnNmb3JtTWF0NDogdHJhbnNmb3JtTWF0NCQyLFxuICAgIHRyYW5zZm9ybU1hdDM6IHRyYW5zZm9ybU1hdDMkMSxcbiAgICB0cmFuc2Zvcm1RdWF0OiB0cmFuc2Zvcm1RdWF0JDEsXG4gICAgcm90YXRlWDogcm90YXRlWCQyLFxuICAgIHJvdGF0ZVk6IHJvdGF0ZVkkMixcbiAgICByb3RhdGVaOiByb3RhdGVaJDIsXG4gICAgYW5nbGU6IGFuZ2xlJDEsXG4gICAgemVybzogemVybyQyLFxuICAgIHN0cjogc3RyJDQsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzJDQsXG4gICAgZXF1YWxzOiBlcXVhbHMkNCxcbiAgICBzdWI6IHN1YiQyLFxuICAgIG11bDogbXVsJDQsXG4gICAgZGl2OiBkaXYkMixcbiAgICBkaXN0OiBkaXN0JDIsXG4gICAgc3FyRGlzdDogc3FyRGlzdCQyLFxuICAgIGxlbjogbGVuJDQsXG4gICAgc3FyTGVuOiBzcXJMZW4kNCxcbiAgICBmb3JFYWNoOiBmb3JFYWNoJDJcbiAgfSk7XG5cbiAgLyoqXG4gICAqIDQgRGltZW5zaW9uYWwgVmVjdG9yXG4gICAqIEBtb2R1bGUgdmVjNFxuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjNFxuICAgKlxuICAgKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZSQzKCkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg0KTtcblxuICAgIGlmIChBUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgICAgb3V0WzBdID0gMDtcbiAgICAgIG91dFsxXSA9IDA7XG4gICAgICBvdXRbMl0gPSAwO1xuICAgICAgb3V0WzNdID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHZlYzQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNsb25lXG4gICAqIEByZXR1cm5zIHt2ZWM0fSBhIG5ldyA0RCB2ZWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gY2xvbmUkMyhhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21WYWx1ZXMkMyh4LCB5LCB6LCB3KSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IHc7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzQgdG8gYW5vdGhlclxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgc291cmNlIHZlY3RvclxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvcHkkMyhvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge051bWJlcn0geCBYIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geSBZIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geiBaIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gdyBXIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldCQzKG91dCwgeCwgeSwgeiwgdykge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IHc7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gdmVjNCdzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkZCQzKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0JDEob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbGllcyB0d28gdmVjNCdzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5JDMob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAqIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAqIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAqIGJbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogRGl2aWRlcyB0d28gdmVjNCdzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRpdmlkZSQxKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNlaWxcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBjZWlsJDEob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLmNlaWwoYVsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5jZWlsKGFbM10pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE1hdGguZmxvb3IgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBmbG9vclxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZsb29yJDEob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGguZmxvb3IoYVsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5mbG9vcihhWzNdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBtaW5pbXVtIG9mIHR3byB2ZWM0J3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbWluJDEob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5taW4oYVsyXSwgYlsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5taW4oYVszXSwgYlszXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjNCdzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1heCQxKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWF4KGFbMl0sIGJbMl0pO1xuICAgIG91dFszXSA9IE1hdGgubWF4KGFbM10sIGJbM10pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE1hdGgucm91bmQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byByb3VuZFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdW5kJDEob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5yb3VuZChhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLnJvdW5kKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgucm91bmQoYVsyXSk7XG4gICAgb3V0WzNdID0gTWF0aC5yb3VuZChhWzNdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTY2FsZXMgYSB2ZWM0IGJ5IGEgc2NhbGFyIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2NhbGUkMyhvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIHR3byB2ZWM0J3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNjYWxlQW5kQWRkJDEob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge051bWJlcn0gZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRpc3RhbmNlJDEoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF07XG4gICAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICAgIHZhciB3ID0gYlszXSAtIGFbM107XG4gICAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeiwgdyk7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgZXVjbGlkaWFuIGRpc3RhbmNlIGJldHdlZW4gdHdvIHZlYzQnc1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAgICovXG5cbiAgZnVuY3Rpb24gc3F1YXJlZERpc3RhbmNlJDEoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF07XG4gICAgdmFyIHkgPSBiWzFdIC0gYVsxXTtcbiAgICB2YXIgeiA9IGJbMl0gLSBhWzJdO1xuICAgIHZhciB3ID0gYlszXSAtIGFbM107XG4gICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWM0XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxlbmd0aCQzKGEpIHtcbiAgICB2YXIgeCA9IGFbMF07XG4gICAgdmFyIHkgPSBhWzFdO1xuICAgIHZhciB6ID0gYVsyXTtcbiAgICB2YXIgdyA9IGFbM107XG4gICAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSwgeiwgdyk7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjNFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAgICovXG5cbiAgZnVuY3Rpb24gc3F1YXJlZExlbmd0aCQzKGEpIHtcbiAgICB2YXIgeCA9IGFbMF07XG4gICAgdmFyIHkgPSBhWzFdO1xuICAgIHZhciB6ID0gYVsyXTtcbiAgICB2YXIgdyA9IGFbM107XG4gICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xuICB9XG4gIC8qKlxuICAgKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gICAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbmVnYXRlJDEob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gLWFbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaW52ZXJzZSBvZiB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGludmVydFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGludmVyc2UkMShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICAgIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gICAgb3V0WzJdID0gMS4wIC8gYVsyXTtcbiAgICBvdXRbM10gPSAxLjAgLyBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIHZlYzRcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZSQzKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXTtcbiAgICB2YXIgeSA9IGFbMV07XG4gICAgdmFyIHogPSBhWzJdO1xuICAgIHZhciB3ID0gYVszXTtcbiAgICB2YXIgbGVuID0geCAqIHggKyB5ICogeSArIHogKiB6ICsgdyAqIHc7XG5cbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgIH1cblxuICAgIG91dFswXSA9IHggKiBsZW47XG4gICAgb3V0WzFdID0geSAqIGxlbjtcbiAgICBvdXRbMl0gPSB6ICogbGVuO1xuICAgIG91dFszXSA9IHcgKiBsZW47XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzQnc1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICAgKi9cblxuICBmdW5jdGlvbiBkb3QkMyhhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV0gKyBhWzJdICogYlsyXSArIGFbM10gKiBiWzNdO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjcm9zcy1wcm9kdWN0IG9mIHRocmVlIHZlY3RvcnMgaW4gYSA0LWRpbWVuc2lvbmFsIHNwYWNlXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSByZXN1bHQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IFUgdGhlIGZpcnN0IHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gViB0aGUgc2Vjb25kIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gVyB0aGUgdGhpcmQgdmVjdG9yXG4gICAqIEByZXR1cm5zIHt2ZWM0fSByZXN1bHRcbiAgICovXG5cbiAgZnVuY3Rpb24gY3Jvc3MkMShvdXQsIHUsIHYsIHcpIHtcbiAgICB2YXIgQSA9IHZbMF0gKiB3WzFdIC0gdlsxXSAqIHdbMF0sXG4gICAgICAgIEIgPSB2WzBdICogd1syXSAtIHZbMl0gKiB3WzBdLFxuICAgICAgICBDID0gdlswXSAqIHdbM10gLSB2WzNdICogd1swXSxcbiAgICAgICAgRCA9IHZbMV0gKiB3WzJdIC0gdlsyXSAqIHdbMV0sXG4gICAgICAgIEUgPSB2WzFdICogd1szXSAtIHZbM10gKiB3WzFdLFxuICAgICAgICBGID0gdlsyXSAqIHdbM10gLSB2WzNdICogd1syXTtcbiAgICB2YXIgRyA9IHVbMF07XG4gICAgdmFyIEggPSB1WzFdO1xuICAgIHZhciBJID0gdVsyXTtcbiAgICB2YXIgSiA9IHVbM107XG4gICAgb3V0WzBdID0gSCAqIEYgLSBJICogRSArIEogKiBEO1xuICAgIG91dFsxXSA9IC0oRyAqIEYpICsgSSAqIEMgLSBKICogQjtcbiAgICBvdXRbMl0gPSBHICogRSAtIEggKiBDICsgSiAqIEE7XG4gICAgb3V0WzNdID0gLShHICogRCkgKyBIICogQiAtIEkgKiBBO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjNCdzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbGVycCQzKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF07XG4gICAgdmFyIGF5ID0gYVsxXTtcbiAgICB2YXIgYXogPSBhWzJdO1xuICAgIHZhciBhdyA9IGFbM107XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgb3V0WzNdID0gYXcgKyB0ICogKGJbM10gLSBhdyk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJhbmRvbSQyKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlID09PSB1bmRlZmluZWQgPyAxLjAgOiBzY2FsZTsgLy8gTWFyc2FnbGlhLCBHZW9yZ2UuIENob29zaW5nIGEgUG9pbnQgZnJvbSB0aGUgU3VyZmFjZSBvZiBhXG4gICAgLy8gU3BoZXJlLiBBbm4uIE1hdGguIFN0YXRpc3QuIDQzICgxOTcyKSwgbm8uIDIsIDY0NS0tNjQ2LlxuICAgIC8vIGh0dHA6Ly9wcm9qZWN0ZXVjbGlkLm9yZy9ldWNsaWQuYW9tcy8xMTc3NjkyNjQ0O1xuXG4gICAgdmFyIHYxLCB2MiwgdjMsIHY0O1xuICAgIHZhciBzMSwgczI7XG5cbiAgICBkbyB7XG4gICAgICB2MSA9IFJBTkRPTSgpICogMiAtIDE7XG4gICAgICB2MiA9IFJBTkRPTSgpICogMiAtIDE7XG4gICAgICBzMSA9IHYxICogdjEgKyB2MiAqIHYyO1xuICAgIH0gd2hpbGUgKHMxID49IDEpO1xuXG4gICAgZG8ge1xuICAgICAgdjMgPSBSQU5ET00oKSAqIDIgLSAxO1xuICAgICAgdjQgPSBSQU5ET00oKSAqIDIgLSAxO1xuICAgICAgczIgPSB2MyAqIHYzICsgdjQgKiB2NDtcbiAgICB9IHdoaWxlIChzMiA+PSAxKTtcblxuICAgIHZhciBkID0gTWF0aC5zcXJ0KCgxIC0gczEpIC8gczIpO1xuICAgIG91dFswXSA9IHNjYWxlICogdjE7XG4gICAgb3V0WzFdID0gc2NhbGUgKiB2MjtcbiAgICBvdXRbMl0gPSBzY2FsZSAqIHYzICogZDtcbiAgICBvdXRbM10gPSBzY2FsZSAqIHY0ICogZDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBtYXQ0LlxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQ0JDEob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdICogdztcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVs5XSAqIHogKyBtWzEzXSAqIHc7XG4gICAgb3V0WzJdID0gbVsyXSAqIHggKyBtWzZdICogeSArIG1bMTBdICogeiArIG1bMTRdICogdztcbiAgICBvdXRbM10gPSBtWzNdICogeCArIG1bN10gKiB5ICsgbVsxMV0gKiB6ICsgbVsxNV0gKiB3O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHZlYzQgd2l0aCBhIHF1YXRcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybVF1YXQob3V0LCBhLCBxKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgdmFyIHF4ID0gcVswXSxcbiAgICAgICAgcXkgPSBxWzFdLFxuICAgICAgICBxeiA9IHFbMl0sXG4gICAgICAgIHF3ID0gcVszXTsgLy8gY2FsY3VsYXRlIHF1YXQgKiB2ZWNcblxuICAgIHZhciBpeCA9IHF3ICogeCArIHF5ICogeiAtIHF6ICogeTtcbiAgICB2YXIgaXkgPSBxdyAqIHkgKyBxeiAqIHggLSBxeCAqIHo7XG4gICAgdmFyIGl6ID0gcXcgKiB6ICsgcXggKiB5IC0gcXkgKiB4O1xuICAgIHZhciBpdyA9IC1xeCAqIHggLSBxeSAqIHkgLSBxeiAqIHo7IC8vIGNhbGN1bGF0ZSByZXN1bHQgKiBpbnZlcnNlIHF1YXRcblxuICAgIG91dFswXSA9IGl4ICogcXcgKyBpdyAqIC1xeCArIGl5ICogLXF6IC0gaXogKiAtcXk7XG4gICAgb3V0WzFdID0gaXkgKiBxdyArIGl3ICogLXF5ICsgaXogKiAtcXggLSBpeCAqIC1xejtcbiAgICBvdXRbMl0gPSBpeiAqIHF3ICsgaXcgKiAtcXogKyBpeCAqIC1xeSAtIGl5ICogLXF4O1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNCB0byB6ZXJvXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gemVybyQxKG91dCkge1xuICAgIG91dFswXSA9IDAuMDtcbiAgICBvdXRbMV0gPSAwLjA7XG4gICAgb3V0WzJdID0gMC4wO1xuICAgIG91dFszXSA9IDAuMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgdmVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyJDMoYSkge1xuICAgIHJldHVybiBcInZlYzQoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIpXCI7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4YWN0RXF1YWxzJDMoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBlcXVhbHMkMyhhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl0sXG4gICAgICAgIGEzID0gYVszXTtcbiAgICB2YXIgYjAgPSBiWzBdLFxuICAgICAgICBiMSA9IGJbMV0sXG4gICAgICAgIGIyID0gYlsyXSxcbiAgICAgICAgYjMgPSBiWzNdO1xuICAgIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJiBNYXRoLmFicyhhMyAtIGIzKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSk7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zdWJ0cmFjdH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzdWIkMSA9IHN1YnRyYWN0JDE7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQubXVsdGlwbHl9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbXVsJDMgPSBtdWx0aXBseSQzO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LmRpdmlkZX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBkaXYkMSA9IGRpdmlkZSQxO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LmRpc3RhbmNlfVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGRpc3QkMSA9IGRpc3RhbmNlJDE7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3F1YXJlZERpc3RhbmNlfVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNxckRpc3QkMSA9IHNxdWFyZWREaXN0YW5jZSQxO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWM0Lmxlbmd0aH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBsZW4kMyA9IGxlbmd0aCQzO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWRMZW5ndGh9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3FyTGVuJDMgPSBzcXVhcmVkTGVuZ3RoJDM7XG4gIC8qKlxuICAgKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjNHMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjNC4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWM0cyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAgICogQHJldHVybnMge0FycmF5fSBhXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZm9yRWFjaCQxID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2ZWMgPSBjcmVhdGUkMygpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoYSwgc3RyaWRlLCBvZmZzZXQsIGNvdW50LCBmbiwgYXJnKSB7XG4gICAgICB2YXIgaSwgbDtcblxuICAgICAgaWYgKCFzdHJpZGUpIHtcbiAgICAgICAgc3RyaWRlID0gNDtcbiAgICAgIH1cblxuICAgICAgaWYgKCFvZmZzZXQpIHtcbiAgICAgICAgb2Zmc2V0ID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgIGwgPSBNYXRoLm1pbihjb3VudCAqIHN0cmlkZSArIG9mZnNldCwgYS5sZW5ndGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbCA9IGEubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGkgPSBvZmZzZXQ7IGkgPCBsOyBpICs9IHN0cmlkZSkge1xuICAgICAgICB2ZWNbMF0gPSBhW2ldO1xuICAgICAgICB2ZWNbMV0gPSBhW2kgKyAxXTtcbiAgICAgICAgdmVjWzJdID0gYVtpICsgMl07XG4gICAgICAgIHZlY1szXSA9IGFbaSArIDNdO1xuICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgYVtpXSA9IHZlY1swXTtcbiAgICAgICAgYVtpICsgMV0gPSB2ZWNbMV07XG4gICAgICAgIGFbaSArIDJdID0gdmVjWzJdO1xuICAgICAgICBhW2kgKyAzXSA9IHZlY1szXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciB2ZWM0ID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBjcmVhdGU6IGNyZWF0ZSQzLFxuICAgIGNsb25lOiBjbG9uZSQzLFxuICAgIGZyb21WYWx1ZXM6IGZyb21WYWx1ZXMkMyxcbiAgICBjb3B5OiBjb3B5JDMsXG4gICAgc2V0OiBzZXQkMyxcbiAgICBhZGQ6IGFkZCQzLFxuICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCQxLFxuICAgIG11bHRpcGx5OiBtdWx0aXBseSQzLFxuICAgIGRpdmlkZTogZGl2aWRlJDEsXG4gICAgY2VpbDogY2VpbCQxLFxuICAgIGZsb29yOiBmbG9vciQxLFxuICAgIG1pbjogbWluJDEsXG4gICAgbWF4OiBtYXgkMSxcbiAgICByb3VuZDogcm91bmQkMSxcbiAgICBzY2FsZTogc2NhbGUkMyxcbiAgICBzY2FsZUFuZEFkZDogc2NhbGVBbmRBZGQkMSxcbiAgICBkaXN0YW5jZTogZGlzdGFuY2UkMSxcbiAgICBzcXVhcmVkRGlzdGFuY2U6IHNxdWFyZWREaXN0YW5jZSQxLFxuICAgIGxlbmd0aDogbGVuZ3RoJDMsXG4gICAgc3F1YXJlZExlbmd0aDogc3F1YXJlZExlbmd0aCQzLFxuICAgIG5lZ2F0ZTogbmVnYXRlJDEsXG4gICAgaW52ZXJzZTogaW52ZXJzZSQxLFxuICAgIG5vcm1hbGl6ZTogbm9ybWFsaXplJDMsXG4gICAgZG90OiBkb3QkMyxcbiAgICBjcm9zczogY3Jvc3MkMSxcbiAgICBsZXJwOiBsZXJwJDMsXG4gICAgcmFuZG9tOiByYW5kb20kMixcbiAgICB0cmFuc2Zvcm1NYXQ0OiB0cmFuc2Zvcm1NYXQ0JDEsXG4gICAgdHJhbnNmb3JtUXVhdDogdHJhbnNmb3JtUXVhdCxcbiAgICB6ZXJvOiB6ZXJvJDEsXG4gICAgc3RyOiBzdHIkMyxcbiAgICBleGFjdEVxdWFsczogZXhhY3RFcXVhbHMkMyxcbiAgICBlcXVhbHM6IGVxdWFscyQzLFxuICAgIHN1Yjogc3ViJDEsXG4gICAgbXVsOiBtdWwkMyxcbiAgICBkaXY6IGRpdiQxLFxuICAgIGRpc3Q6IGRpc3QkMSxcbiAgICBzcXJEaXN0OiBzcXJEaXN0JDEsXG4gICAgbGVuOiBsZW4kMyxcbiAgICBzcXJMZW46IHNxckxlbiQzLFxuICAgIGZvckVhY2g6IGZvckVhY2gkMVxuICB9KTtcblxuICAvKipcbiAgICogUXVhdGVybmlvbiBpbiB0aGUgZm9ybWF0IFhZWldcbiAgICogQG1vZHVsZSBxdWF0XG4gICAqL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IHF1YXRcbiAgICpcbiAgICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlJDIoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDQpO1xuXG4gICAgaWYgKEFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgICBvdXRbMF0gPSAwO1xuICAgICAgb3V0WzFdID0gMDtcbiAgICAgIG91dFsyXSA9IDA7XG4gICAgfVxuXG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgYSBxdWF0IHRvIHRoZSBpZGVudGl0eSBxdWF0ZXJuaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlkZW50aXR5JDEob3V0KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXRzIGEgcXVhdCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhbmQgcm90YXRpb24gYXhpcyxcbiAgICogdGhlbiByZXR1cm5zIGl0LlxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGF4aXMgdGhlIGF4aXMgYXJvdW5kIHdoaWNoIHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSBpbiByYWRpYW5zXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICoqL1xuXG4gIGZ1bmN0aW9uIHNldEF4aXNBbmdsZShvdXQsIGF4aXMsIHJhZCkge1xuICAgIHJhZCA9IHJhZCAqIDAuNTtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgb3V0WzBdID0gcyAqIGF4aXNbMF07XG4gICAgb3V0WzFdID0gcyAqIGF4aXNbMV07XG4gICAgb3V0WzJdID0gcyAqIGF4aXNbMl07XG4gICAgb3V0WzNdID0gTWF0aC5jb3MocmFkKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZXRzIHRoZSByb3RhdGlvbiBheGlzIGFuZCBhbmdsZSBmb3IgYSBnaXZlblxuICAgKiAgcXVhdGVybmlvbi4gSWYgYSBxdWF0ZXJuaW9uIGlzIGNyZWF0ZWQgd2l0aFxuICAgKiAgc2V0QXhpc0FuZ2xlLCB0aGlzIG1ldGhvZCB3aWxsIHJldHVybiB0aGUgc2FtZVxuICAgKiAgdmFsdWVzIGFzIHByb3ZpZGllZCBpbiB0aGUgb3JpZ2luYWwgcGFyYW1ldGVyIGxpc3RcbiAgICogIE9SIGZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHZhbHVlcy5cbiAgICogRXhhbXBsZTogVGhlIHF1YXRlcm5pb24gZm9ybWVkIGJ5IGF4aXMgWzAsIDAsIDFdIGFuZFxuICAgKiAgYW5nbGUgLTkwIGlzIHRoZSBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIGZvcm1lZCBieVxuICAgKiAgWzAsIDAsIDFdIGFuZCAyNzAuIFRoaXMgbWV0aG9kIGZhdm9ycyB0aGUgbGF0dGVyLlxuICAgKiBAcGFyYW0gIHt2ZWMzfSBvdXRfYXhpcyAgVmVjdG9yIHJlY2VpdmluZyB0aGUgYXhpcyBvZiByb3RhdGlvblxuICAgKiBAcGFyYW0gIHtSZWFkb25seVF1YXR9IHEgICAgIFF1YXRlcm5pb24gdG8gYmUgZGVjb21wb3NlZFxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICBBbmdsZSwgaW4gcmFkaWFucywgb2YgdGhlIHJvdGF0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGdldEF4aXNBbmdsZShvdXRfYXhpcywgcSkge1xuICAgIHZhciByYWQgPSBNYXRoLmFjb3MocVszXSkgKiAyLjA7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQgLyAyLjApO1xuXG4gICAgaWYgKHMgPiBFUFNJTE9OKSB7XG4gICAgICBvdXRfYXhpc1swXSA9IHFbMF0gLyBzO1xuICAgICAgb3V0X2F4aXNbMV0gPSBxWzFdIC8gcztcbiAgICAgIG91dF9heGlzWzJdID0gcVsyXSAvIHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHMgaXMgemVybywgcmV0dXJuIGFueSBheGlzIChubyByb3RhdGlvbiAtIGF4aXMgZG9lcyBub3QgbWF0dGVyKVxuICAgICAgb3V0X2F4aXNbMF0gPSAxO1xuICAgICAgb3V0X2F4aXNbMV0gPSAwO1xuICAgICAgb3V0X2F4aXNbMl0gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiByYWQ7XG4gIH1cbiAgLyoqXG4gICAqIEdldHMgdGhlIGFuZ3VsYXIgZGlzdGFuY2UgYmV0d2VlbiB0d28gdW5pdCBxdWF0ZXJuaW9uc1xuICAgKlxuICAgKiBAcGFyYW0gIHtSZWFkb25seVF1YXR9IGEgICAgIE9yaWdpbiB1bml0IHF1YXRlcm5pb25cbiAgICogQHBhcmFtICB7UmVhZG9ubHlRdWF0fSBiICAgICBEZXN0aW5hdGlvbiB1bml0IHF1YXRlcm5pb25cbiAgICogQHJldHVybiB7TnVtYmVyfSAgICAgQW5nbGUsIGluIHJhZGlhbnMsIGJldHdlZW4gdGhlIHR3byBxdWF0ZXJuaW9uc1xuICAgKi9cblxuICBmdW5jdGlvbiBnZXRBbmdsZShhLCBiKSB7XG4gICAgdmFyIGRvdHByb2R1Y3QgPSBkb3QkMihhLCBiKTtcbiAgICByZXR1cm4gTWF0aC5hY29zKDIgKiBkb3Rwcm9kdWN0ICogZG90cHJvZHVjdCAtIDEpO1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byBxdWF0J3NcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5JDIob3V0LCBhLCBiKSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl0sXG4gICAgICAgIGF3ID0gYVszXTtcbiAgICB2YXIgYnggPSBiWzBdLFxuICAgICAgICBieSA9IGJbMV0sXG4gICAgICAgIGJ6ID0gYlsyXSxcbiAgICAgICAgYncgPSBiWzNdO1xuICAgIG91dFswXSA9IGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBiejtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheCAqIGJ4IC0gYXkgKiBieSAtIGF6ICogYno7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIHF1YXRlcm5pb24gYnkgdGhlIGdpdmVuIGFuZ2xlIGFib3V0IHRoZSBYIGF4aXNcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVYJDEob3V0LCBhLCByYWQpIHtcbiAgICByYWQgKj0gMC41O1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgdmFyIGJ4ID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYncgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGF4ICogYncgKyBhdyAqIGJ4O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBheiAqIGJ4O1xuICAgIG91dFsyXSA9IGF6ICogYncgLSBheSAqIGJ4O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheCAqIGJ4O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWSBheGlzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlWSQxKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTtcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV0sXG4gICAgICAgIGF6ID0gYVsyXSxcbiAgICAgICAgYXcgPSBhWzNdO1xuICAgIHZhciBieSA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGJ3ID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBheCAqIGJ3IC0gYXogKiBieTtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXcgKiBieTtcbiAgICBvdXRbMl0gPSBheiAqIGJ3ICsgYXggKiBieTtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXkgKiBieTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFogYXhpc1xuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCBxdWF0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWQgYW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZVokMShvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl0sXG4gICAgICAgIGF3ID0gYVszXTtcbiAgICB2YXIgYnogPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBidyA9IE1hdGguY29zKHJhZCk7XG4gICAgb3V0WzBdID0gYXggKiBidyArIGF5ICogYno7XG4gICAgb3V0WzFdID0gYXkgKiBidyAtIGF4ICogYno7XG4gICAgb3V0WzJdID0gYXogKiBidyArIGF3ICogYno7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF6ICogYno7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgVyBjb21wb25lbnQgb2YgYSBxdWF0IGZyb20gdGhlIFgsIFksIGFuZCBaIGNvbXBvbmVudHMuXG4gICAqIEFzc3VtZXMgdGhhdCBxdWF0ZXJuaW9uIGlzIDEgdW5pdCBpbiBsZW5ndGguXG4gICAqIEFueSBleGlzdGluZyBXIGNvbXBvbmVudCB3aWxsIGJlIGlnbm9yZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSBXIGNvbXBvbmVudCBvZlxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZVcob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl07XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgb3V0WzNdID0gTWF0aC5zcXJ0KE1hdGguYWJzKDEuMCAtIHggKiB4IC0geSAqIHkgLSB6ICogeikpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgZXhwb25lbnRpYWwgb2YgYSB1bml0IHF1YXRlcm5pb24uXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSB0aGUgZXhwb25lbnRpYWwgb2ZcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBleHAob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHZhciByID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG4gICAgdmFyIGV0ID0gTWF0aC5leHAodyk7XG4gICAgdmFyIHMgPSByID4gMCA/IGV0ICogTWF0aC5zaW4ocikgLyByIDogMDtcbiAgICBvdXRbMF0gPSB4ICogcztcbiAgICBvdXRbMV0gPSB5ICogcztcbiAgICBvdXRbMl0gPSB6ICogcztcbiAgICBvdXRbM10gPSBldCAqIE1hdGguY29zKHIpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB0aGUgbmF0dXJhbCBsb2dhcml0aG0gb2YgYSB1bml0IHF1YXRlcm5pb24uXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSB0aGUgZXhwb25lbnRpYWwgb2ZcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBsbihvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXSxcbiAgICAgICAgdyA9IGFbM107XG4gICAgdmFyIHIgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSArIHogKiB6KTtcbiAgICB2YXIgdCA9IHIgPiAwID8gTWF0aC5hdGFuMihyLCB3KSAvIHIgOiAwO1xuICAgIG91dFswXSA9IHggKiB0O1xuICAgIG91dFsxXSA9IHkgKiB0O1xuICAgIG91dFsyXSA9IHogKiB0O1xuICAgIG91dFszXSA9IDAuNSAqIE1hdGgubG9nKHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIHNjYWxhciBwb3dlciBvZiBhIHVuaXQgcXVhdGVybmlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIHRoZSBleHBvbmVudGlhbCBvZlxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHF1YXRlcm5pb24gYnlcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBwb3cob3V0LCBhLCBiKSB7XG4gICAgbG4ob3V0LCBhKTtcbiAgICBzY2FsZSQyKG91dCwgb3V0LCBiKTtcbiAgICBleHAob3V0LCBvdXQpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHF1YXRcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2xlcnAob3V0LCBhLCBiLCB0KSB7XG4gICAgLy8gYmVuY2htYXJrczpcbiAgICAvLyAgICBodHRwOi8vanNwZXJmLmNvbS9xdWF0ZXJuaW9uLXNsZXJwLWltcGxlbWVudGF0aW9uc1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgdmFyIGJ4ID0gYlswXSxcbiAgICAgICAgYnkgPSBiWzFdLFxuICAgICAgICBieiA9IGJbMl0sXG4gICAgICAgIGJ3ID0gYlszXTtcbiAgICB2YXIgb21lZ2EsIGNvc29tLCBzaW5vbSwgc2NhbGUwLCBzY2FsZTE7IC8vIGNhbGMgY29zaW5lXG5cbiAgICBjb3NvbSA9IGF4ICogYnggKyBheSAqIGJ5ICsgYXogKiBieiArIGF3ICogYnc7IC8vIGFkanVzdCBzaWducyAoaWYgbmVjZXNzYXJ5KVxuXG4gICAgaWYgKGNvc29tIDwgMC4wKSB7XG4gICAgICBjb3NvbSA9IC1jb3NvbTtcbiAgICAgIGJ4ID0gLWJ4O1xuICAgICAgYnkgPSAtYnk7XG4gICAgICBieiA9IC1iejtcbiAgICAgIGJ3ID0gLWJ3O1xuICAgIH0gLy8gY2FsY3VsYXRlIGNvZWZmaWNpZW50c1xuXG5cbiAgICBpZiAoMS4wIC0gY29zb20gPiBFUFNJTE9OKSB7XG4gICAgICAvLyBzdGFuZGFyZCBjYXNlIChzbGVycClcbiAgICAgIG9tZWdhID0gTWF0aC5hY29zKGNvc29tKTtcbiAgICAgIHNpbm9tID0gTWF0aC5zaW4ob21lZ2EpO1xuICAgICAgc2NhbGUwID0gTWF0aC5zaW4oKDEuMCAtIHQpICogb21lZ2EpIC8gc2lub207XG4gICAgICBzY2FsZTEgPSBNYXRoLnNpbih0ICogb21lZ2EpIC8gc2lub207XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFwiZnJvbVwiIGFuZCBcInRvXCIgcXVhdGVybmlvbnMgYXJlIHZlcnkgY2xvc2VcbiAgICAgIC8vICAuLi4gc28gd2UgY2FuIGRvIGEgbGluZWFyIGludGVycG9sYXRpb25cbiAgICAgIHNjYWxlMCA9IDEuMCAtIHQ7XG4gICAgICBzY2FsZTEgPSB0O1xuICAgIH0gLy8gY2FsY3VsYXRlIGZpbmFsIHZhbHVlc1xuXG5cbiAgICBvdXRbMF0gPSBzY2FsZTAgKiBheCArIHNjYWxlMSAqIGJ4O1xuICAgIG91dFsxXSA9IHNjYWxlMCAqIGF5ICsgc2NhbGUxICogYnk7XG4gICAgb3V0WzJdID0gc2NhbGUwICogYXogKyBzY2FsZTEgKiBiejtcbiAgICBvdXRbM10gPSBzY2FsZTAgKiBhdyArIHNjYWxlMSAqIGJ3O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHJhbmRvbSB1bml0IHF1YXRlcm5pb25cbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcmFuZG9tJDEob3V0KSB7XG4gICAgLy8gSW1wbGVtZW50YXRpb24gb2YgaHR0cDovL3BsYW5uaW5nLmNzLnVpdWMuZWR1L25vZGUxOTguaHRtbFxuICAgIC8vIFRPRE86IENhbGxpbmcgcmFuZG9tIDMgdGltZXMgaXMgcHJvYmFibHkgbm90IHRoZSBmYXN0ZXN0IHNvbHV0aW9uXG4gICAgdmFyIHUxID0gUkFORE9NKCk7XG4gICAgdmFyIHUyID0gUkFORE9NKCk7XG4gICAgdmFyIHUzID0gUkFORE9NKCk7XG4gICAgdmFyIHNxcnQxTWludXNVMSA9IE1hdGguc3FydCgxIC0gdTEpO1xuICAgIHZhciBzcXJ0VTEgPSBNYXRoLnNxcnQodTEpO1xuICAgIG91dFswXSA9IHNxcnQxTWludXNVMSAqIE1hdGguc2luKDIuMCAqIE1hdGguUEkgKiB1Mik7XG4gICAgb3V0WzFdID0gc3FydDFNaW51c1UxICogTWF0aC5jb3MoMi4wICogTWF0aC5QSSAqIHUyKTtcbiAgICBvdXRbMl0gPSBzcXJ0VTEgKiBNYXRoLnNpbigyLjAgKiBNYXRoLlBJICogdTMpO1xuICAgIG91dFszXSA9IHNxcnRVMSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiB1Myk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBvZiBhIHF1YXRcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIGludmVyc2Ugb2ZcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZlcnQkMShvdXQsIGEpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdO1xuICAgIHZhciBkb3QgPSBhMCAqIGEwICsgYTEgKiBhMSArIGEyICogYTIgKyBhMyAqIGEzO1xuICAgIHZhciBpbnZEb3QgPSBkb3QgPyAxLjAgLyBkb3QgOiAwOyAvLyBUT0RPOiBXb3VsZCBiZSBmYXN0ZXIgdG8gcmV0dXJuIFswLDAsMCwwXSBpbW1lZGlhdGVseSBpZiBkb3QgPT0gMFxuXG4gICAgb3V0WzBdID0gLWEwICogaW52RG90O1xuICAgIG91dFsxXSA9IC1hMSAqIGludkRvdDtcbiAgICBvdXRbMl0gPSAtYTIgKiBpbnZEb3Q7XG4gICAgb3V0WzNdID0gYTMgKiBpbnZEb3Q7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgY29uanVnYXRlIG9mIGEgcXVhdFxuICAgKiBJZiB0aGUgcXVhdGVybmlvbiBpcyBub3JtYWxpemVkLCB0aGlzIGZ1bmN0aW9uIGlzIGZhc3RlciB0aGFuIHF1YXQuaW52ZXJzZSBhbmQgcHJvZHVjZXMgdGhlIHNhbWUgcmVzdWx0LlxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgY29uanVnYXRlIG9mXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY29uanVnYXRlJDEob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcXVhdGVybmlvbiBmcm9tIHRoZSBnaXZlbiAzeDMgcm90YXRpb24gbWF0cml4LlxuICAgKlxuICAgKiBOT1RFOiBUaGUgcmVzdWx0YW50IHF1YXRlcm5pb24gaXMgbm90IG5vcm1hbGl6ZWQsIHNvIHlvdSBzaG91bGQgYmUgc3VyZVxuICAgKiB0byByZW5vcm1hbGl6ZSB0aGUgcXVhdGVybmlvbiB5b3Vyc2VsZiB3aGVyZSBuZWNlc3NhcnkuXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gbSByb3RhdGlvbiBtYXRyaXhcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbU1hdDMob3V0LCBtKSB7XG4gICAgLy8gQWxnb3JpdGhtIGluIEtlbiBTaG9lbWFrZSdzIGFydGljbGUgaW4gMTk4NyBTSUdHUkFQSCBjb3Vyc2Ugbm90ZXNcbiAgICAvLyBhcnRpY2xlIFwiUXVhdGVybmlvbiBDYWxjdWx1cyBhbmQgRmFzdCBBbmltYXRpb25cIi5cbiAgICB2YXIgZlRyYWNlID0gbVswXSArIG1bNF0gKyBtWzhdO1xuICAgIHZhciBmUm9vdDtcblxuICAgIGlmIChmVHJhY2UgPiAwLjApIHtcbiAgICAgIC8vIHx3fCA+IDEvMiwgbWF5IGFzIHdlbGwgY2hvb3NlIHcgPiAxLzJcbiAgICAgIGZSb290ID0gTWF0aC5zcXJ0KGZUcmFjZSArIDEuMCk7IC8vIDJ3XG5cbiAgICAgIG91dFszXSA9IDAuNSAqIGZSb290O1xuICAgICAgZlJvb3QgPSAwLjUgLyBmUm9vdDsgLy8gMS8oNHcpXG5cbiAgICAgIG91dFswXSA9IChtWzVdIC0gbVs3XSkgKiBmUm9vdDtcbiAgICAgIG91dFsxXSA9IChtWzZdIC0gbVsyXSkgKiBmUm9vdDtcbiAgICAgIG91dFsyXSA9IChtWzFdIC0gbVszXSkgKiBmUm9vdDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gfHd8IDw9IDEvMlxuICAgICAgdmFyIGkgPSAwO1xuICAgICAgaWYgKG1bNF0gPiBtWzBdKSBpID0gMTtcbiAgICAgIGlmIChtWzhdID4gbVtpICogMyArIGldKSBpID0gMjtcbiAgICAgIHZhciBqID0gKGkgKyAxKSAlIDM7XG4gICAgICB2YXIgayA9IChpICsgMikgJSAzO1xuICAgICAgZlJvb3QgPSBNYXRoLnNxcnQobVtpICogMyArIGldIC0gbVtqICogMyArIGpdIC0gbVtrICogMyArIGtdICsgMS4wKTtcbiAgICAgIG91dFtpXSA9IDAuNSAqIGZSb290O1xuICAgICAgZlJvb3QgPSAwLjUgLyBmUm9vdDtcbiAgICAgIG91dFszXSA9IChtW2ogKiAzICsga10gLSBtW2sgKiAzICsgal0pICogZlJvb3Q7XG4gICAgICBvdXRbal0gPSAobVtqICogMyArIGldICsgbVtpICogMyArIGpdKSAqIGZSb290O1xuICAgICAgb3V0W2tdID0gKG1bayAqIDMgKyBpXSArIG1baSAqIDMgKyBrXSkgKiBmUm9vdDtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcXVhdGVybmlvbiBmcm9tIHRoZSBnaXZlbiBldWxlciBhbmdsZSB4LCB5LCB6IHVzaW5nIHRoZSBwcm92aWRlZCBpbnRyaW5zaWMgb3JkZXIgZm9yIHRoZSBjb252ZXJzaW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHt4fSB4IEFuZ2xlIHRvIHJvdGF0ZSBhcm91bmQgWCBheGlzIGluIGRlZ3JlZXMuXG4gICAqIEBwYXJhbSB7eX0geSBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFkgYXhpcyBpbiBkZWdyZWVzLlxuICAgKiBAcGFyYW0ge3p9IHogQW5nbGUgdG8gcm90YXRlIGFyb3VuZCBaIGF4aXMgaW4gZGVncmVlcy5cbiAgICogQHBhcmFtIHsnenl4J3wneHl6J3wneXh6J3wneXp4J3wnenh5J3wnenl4J30gb3JkZXIgSW50cmluc2ljIG9yZGVyIGZvciBjb252ZXJzaW9uLCBkZWZhdWx0IGlzIHp5eC5cbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbUV1bGVyKG91dCwgeCwgeSwgeikge1xuICAgIHZhciBvcmRlciA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogQU5HTEVfT1JERVI7XG4gICAgdmFyIGhhbGZUb1JhZCA9IE1hdGguUEkgLyAzNjA7XG4gICAgeCAqPSBoYWxmVG9SYWQ7XG4gICAgeiAqPSBoYWxmVG9SYWQ7XG4gICAgeSAqPSBoYWxmVG9SYWQ7XG4gICAgdmFyIHN4ID0gTWF0aC5zaW4oeCk7XG4gICAgdmFyIGN4ID0gTWF0aC5jb3MoeCk7XG4gICAgdmFyIHN5ID0gTWF0aC5zaW4oeSk7XG4gICAgdmFyIGN5ID0gTWF0aC5jb3MoeSk7XG4gICAgdmFyIHN6ID0gTWF0aC5zaW4oeik7XG4gICAgdmFyIGN6ID0gTWF0aC5jb3Moeik7XG5cbiAgICBzd2l0Y2ggKG9yZGVyKSB7XG4gICAgICBjYXNlIFwieHl6XCI6XG4gICAgICAgIG91dFswXSA9IHN4ICogY3kgKiBjeiArIGN4ICogc3kgKiBzejtcbiAgICAgICAgb3V0WzFdID0gY3ggKiBzeSAqIGN6IC0gc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXRbMl0gPSBjeCAqIGN5ICogc3ogKyBzeCAqIHN5ICogY3o7XG4gICAgICAgIG91dFszXSA9IGN4ICogY3kgKiBjeiAtIHN4ICogc3kgKiBzejtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJ4enlcIjpcbiAgICAgICAgb3V0WzBdID0gc3ggKiBjeSAqIGN6IC0gY3ggKiBzeSAqIHN6O1xuICAgICAgICBvdXRbMV0gPSBjeCAqIHN5ICogY3ogLSBzeCAqIGN5ICogc3o7XG4gICAgICAgIG91dFsyXSA9IGN4ICogY3kgKiBzeiArIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0WzNdID0gY3ggKiBjeSAqIGN6ICsgc3ggKiBzeSAqIHN6O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcInl4elwiOlxuICAgICAgICBvdXRbMF0gPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dFsxXSA9IGN4ICogc3kgKiBjeiAtIHN4ICogY3kgKiBzejtcbiAgICAgICAgb3V0WzJdID0gY3ggKiBjeSAqIHN6IC0gc3ggKiBzeSAqIGN6O1xuICAgICAgICBvdXRbM10gPSBjeCAqIGN5ICogY3ogKyBzeCAqIHN5ICogc3o7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwieXp4XCI6XG4gICAgICAgIG91dFswXSA9IHN4ICogY3kgKiBjeiArIGN4ICogc3kgKiBzejtcbiAgICAgICAgb3V0WzFdID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXRbMl0gPSBjeCAqIGN5ICogc3ogLSBzeCAqIHN5ICogY3o7XG4gICAgICAgIG91dFszXSA9IGN4ICogY3kgKiBjeiAtIHN4ICogc3kgKiBzejtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJ6eHlcIjpcbiAgICAgICAgb3V0WzBdID0gc3ggKiBjeSAqIGN6IC0gY3ggKiBzeSAqIHN6O1xuICAgICAgICBvdXRbMV0gPSBjeCAqIHN5ICogY3ogKyBzeCAqIGN5ICogc3o7XG4gICAgICAgIG91dFsyXSA9IGN4ICogY3kgKiBzeiArIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0WzNdID0gY3ggKiBjeSAqIGN6IC0gc3ggKiBzeSAqIHN6O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcInp5eFwiOlxuICAgICAgICBvdXRbMF0gPSBzeCAqIGN5ICogY3ogLSBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dFsxXSA9IGN4ICogc3kgKiBjeiArIHN4ICogY3kgKiBzejtcbiAgICAgICAgb3V0WzJdID0gY3ggKiBjeSAqIHN6IC0gc3ggKiBzeSAqIGN6O1xuICAgICAgICBvdXRbM10gPSBjeCAqIGN5ICogY3ogKyBzeCAqIHN5ICogc3o7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYW5nbGUgb3JkZXIgJyArIG9yZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIGEgcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0ciQyKGEpIHtcbiAgICByZXR1cm4gXCJxdWF0KFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiKVwiO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyBxdWF0ZXJuaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXRlcm5pb24gdG8gY2xvbmVcbiAgICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBjbG9uZSQyID0gY2xvbmUkMztcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgcXVhdCBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAgICogQHJldHVybnMge3F1YXR9IGEgbmV3IHF1YXRlcm5pb25cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBmcm9tVmFsdWVzJDIgPSBmcm9tVmFsdWVzJDM7XG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgcXVhdCB0byBhbm90aGVyXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgc291cmNlIHF1YXRlcm5pb25cbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGNvcHkkMiA9IGNvcHkkMztcbiAgLyoqXG4gICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHF1YXQgdG8gdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNldCQyID0gc2V0JDM7XG4gIC8qKlxuICAgKiBBZGRzIHR3byBxdWF0J3NcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgYWRkJDIgPSBhZGQkMztcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5tdWx0aXBseX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBtdWwkMiA9IG11bHRpcGx5JDI7XG4gIC8qKlxuICAgKiBTY2FsZXMgYSBxdWF0IGJ5IGEgc2NhbGFyIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzY2FsZSQyID0gc2NhbGUkMztcbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byBxdWF0J3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBkb3QkMiA9IGRvdCQzO1xuICAvKipcbiAgICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byBxdWF0J3NcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBsZXJwJDIgPSBsZXJwJDM7XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSBxdWF0XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gICAqL1xuXG4gIHZhciBsZW5ndGgkMiA9IGxlbmd0aCQzO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBxdWF0Lmxlbmd0aH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBsZW4kMiA9IGxlbmd0aCQyO1xuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSBxdWF0XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAgICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNxdWFyZWRMZW5ndGgkMiA9IHNxdWFyZWRMZW5ndGgkMztcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5zcXVhcmVkTGVuZ3RofVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNxckxlbiQyID0gc3F1YXJlZExlbmd0aCQyO1xuICAvKipcbiAgICogTm9ybWFsaXplIGEgcXVhdFxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdGVybmlvbiB0byBub3JtYWxpemVcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG5vcm1hbGl6ZSQyID0gbm9ybWFsaXplJDM7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBxdWF0ZXJuaW9ucyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIFRoZSBmaXJzdCBxdWF0ZXJuaW9uLlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYiBUaGUgc2Vjb25kIHF1YXRlcm5pb24uXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICB2YXIgZXhhY3RFcXVhbHMkMiA9IGV4YWN0RXF1YWxzJDM7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBxdWF0ZXJuaW9ucyBwb2ludCBhcHByb3hpbWF0ZWx5IHRvIHRoZSBzYW1lIGRpcmVjdGlvbi5cbiAgICpcbiAgICogQm90aCBxdWF0ZXJuaW9ucyBhcmUgYXNzdW1lZCB0byBiZSB1bml0IGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgVGhlIGZpcnN0IHVuaXQgcXVhdGVybmlvbi5cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGIgVGhlIHNlY29uZCB1bml0IHF1YXRlcm5pb24uXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBxdWF0ZXJuaW9ucyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZXF1YWxzJDIoYSwgYikge1xuICAgIHJldHVybiBNYXRoLmFicyhkb3QkMyhhLCBiKSkgPj0gMSAtIEVQU0lMT047XG4gIH1cbiAgLyoqXG4gICAqIFNldHMgYSBxdWF0ZXJuaW9uIHRvIHJlcHJlc2VudCB0aGUgc2hvcnRlc3Qgcm90YXRpb24gZnJvbSBvbmVcbiAgICogdmVjdG9yIHRvIGFub3RoZXIuXG4gICAqXG4gICAqIEJvdGggdmVjdG9ycyBhcmUgYXNzdW1lZCB0byBiZSB1bml0IGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uLlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgaW5pdGlhbCB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIGRlc3RpbmF0aW9uIHZlY3RvclxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIHZhciByb3RhdGlvblRvID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0bXB2ZWMzID0gY3JlYXRlJDQoKTtcbiAgICB2YXIgeFVuaXRWZWMzID0gZnJvbVZhbHVlcyQ0KDEsIDAsIDApO1xuICAgIHZhciB5VW5pdFZlYzMgPSBmcm9tVmFsdWVzJDQoMCwgMSwgMCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvdXQsIGEsIGIpIHtcbiAgICAgIHZhciBkb3QgPSBkb3QkNChhLCBiKTtcblxuICAgICAgaWYgKGRvdCA8IC0wLjk5OTk5OSkge1xuICAgICAgICBjcm9zcyQyKHRtcHZlYzMsIHhVbml0VmVjMywgYSk7XG4gICAgICAgIGlmIChsZW4kNCh0bXB2ZWMzKSA8IDAuMDAwMDAxKSBjcm9zcyQyKHRtcHZlYzMsIHlVbml0VmVjMywgYSk7XG4gICAgICAgIG5vcm1hbGl6ZSQ0KHRtcHZlYzMsIHRtcHZlYzMpO1xuICAgICAgICBzZXRBeGlzQW5nbGUob3V0LCB0bXB2ZWMzLCBNYXRoLlBJKTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgIH0gZWxzZSBpZiAoZG90ID4gMC45OTk5OTkpIHtcbiAgICAgICAgb3V0WzBdID0gMDtcbiAgICAgICAgb3V0WzFdID0gMDtcbiAgICAgICAgb3V0WzJdID0gMDtcbiAgICAgICAgb3V0WzNdID0gMTtcbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNyb3NzJDIodG1wdmVjMywgYSwgYik7XG4gICAgICAgIG91dFswXSA9IHRtcHZlYzNbMF07XG4gICAgICAgIG91dFsxXSA9IHRtcHZlYzNbMV07XG4gICAgICAgIG91dFsyXSA9IHRtcHZlYzNbMl07XG4gICAgICAgIG91dFszXSA9IDEgKyBkb3Q7XG4gICAgICAgIHJldHVybiBub3JtYWxpemUkMihvdXQsIG91dCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSgpO1xuICAvKipcbiAgICogUGVyZm9ybXMgYSBzcGhlcmljYWwgbGluZWFyIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYyB0aGUgdGhpcmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gZCB0aGUgZm91cnRoIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIHZhciBzcWxlcnAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRlbXAxID0gY3JlYXRlJDIoKTtcbiAgICB2YXIgdGVtcDIgPSBjcmVhdGUkMigpO1xuICAgIHJldHVybiBmdW5jdGlvbiAob3V0LCBhLCBiLCBjLCBkLCB0KSB7XG4gICAgICBzbGVycCh0ZW1wMSwgYSwgZCwgdCk7XG4gICAgICBzbGVycCh0ZW1wMiwgYiwgYywgdCk7XG4gICAgICBzbGVycChvdXQsIHRlbXAxLCB0ZW1wMiwgMiAqIHQgKiAoMSAtIHQpKTtcbiAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcbiAgfSgpO1xuICAvKipcbiAgICogU2V0cyB0aGUgc3BlY2lmaWVkIHF1YXRlcm5pb24gd2l0aCB2YWx1ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW5cbiAgICogYXhlcy4gRWFjaCBheGlzIGlzIGEgdmVjMyBhbmQgaXMgZXhwZWN0ZWQgdG8gYmUgdW5pdCBsZW5ndGggYW5kXG4gICAqIHBlcnBlbmRpY3VsYXIgdG8gYWxsIG90aGVyIHNwZWNpZmllZCBheGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdmlldyAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHZpZXdpbmcgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSByaWdodCB0aGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbG9jYWwgXCJyaWdodFwiIGRpcmVjdGlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdXAgICAgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwidXBcIiBkaXJlY3Rpb25cbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICB2YXIgc2V0QXhlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbWF0ciA9IGNyZWF0ZSQ2KCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvdXQsIHZpZXcsIHJpZ2h0LCB1cCkge1xuICAgICAgbWF0clswXSA9IHJpZ2h0WzBdO1xuICAgICAgbWF0clszXSA9IHJpZ2h0WzFdO1xuICAgICAgbWF0cls2XSA9IHJpZ2h0WzJdO1xuICAgICAgbWF0clsxXSA9IHVwWzBdO1xuICAgICAgbWF0cls0XSA9IHVwWzFdO1xuICAgICAgbWF0cls3XSA9IHVwWzJdO1xuICAgICAgbWF0clsyXSA9IC12aWV3WzBdO1xuICAgICAgbWF0cls1XSA9IC12aWV3WzFdO1xuICAgICAgbWF0cls4XSA9IC12aWV3WzJdO1xuICAgICAgcmV0dXJuIG5vcm1hbGl6ZSQyKG91dCwgZnJvbU1hdDMob3V0LCBtYXRyKSk7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciBxdWF0ID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBjcmVhdGU6IGNyZWF0ZSQyLFxuICAgIGlkZW50aXR5OiBpZGVudGl0eSQxLFxuICAgIHNldEF4aXNBbmdsZTogc2V0QXhpc0FuZ2xlLFxuICAgIGdldEF4aXNBbmdsZTogZ2V0QXhpc0FuZ2xlLFxuICAgIGdldEFuZ2xlOiBnZXRBbmdsZSxcbiAgICBtdWx0aXBseTogbXVsdGlwbHkkMixcbiAgICByb3RhdGVYOiByb3RhdGVYJDEsXG4gICAgcm90YXRlWTogcm90YXRlWSQxLFxuICAgIHJvdGF0ZVo6IHJvdGF0ZVokMSxcbiAgICBjYWxjdWxhdGVXOiBjYWxjdWxhdGVXLFxuICAgIGV4cDogZXhwLFxuICAgIGxuOiBsbixcbiAgICBwb3c6IHBvdyxcbiAgICBzbGVycDogc2xlcnAsXG4gICAgcmFuZG9tOiByYW5kb20kMSxcbiAgICBpbnZlcnQ6IGludmVydCQxLFxuICAgIGNvbmp1Z2F0ZTogY29uanVnYXRlJDEsXG4gICAgZnJvbU1hdDM6IGZyb21NYXQzLFxuICAgIGZyb21FdWxlcjogZnJvbUV1bGVyLFxuICAgIHN0cjogc3RyJDIsXG4gICAgY2xvbmU6IGNsb25lJDIsXG4gICAgZnJvbVZhbHVlczogZnJvbVZhbHVlcyQyLFxuICAgIGNvcHk6IGNvcHkkMixcbiAgICBzZXQ6IHNldCQyLFxuICAgIGFkZDogYWRkJDIsXG4gICAgbXVsOiBtdWwkMixcbiAgICBzY2FsZTogc2NhbGUkMixcbiAgICBkb3Q6IGRvdCQyLFxuICAgIGxlcnA6IGxlcnAkMixcbiAgICBsZW5ndGg6IGxlbmd0aCQyLFxuICAgIGxlbjogbGVuJDIsXG4gICAgc3F1YXJlZExlbmd0aDogc3F1YXJlZExlbmd0aCQyLFxuICAgIHNxckxlbjogc3FyTGVuJDIsXG4gICAgbm9ybWFsaXplOiBub3JtYWxpemUkMixcbiAgICBleGFjdEVxdWFsczogZXhhY3RFcXVhbHMkMixcbiAgICBlcXVhbHM6IGVxdWFscyQyLFxuICAgIHJvdGF0aW9uVG86IHJvdGF0aW9uVG8sXG4gICAgc3FsZXJwOiBzcWxlcnAsXG4gICAgc2V0QXhlczogc2V0QXhlc1xuICB9KTtcblxuICAvKipcbiAgICogRHVhbCBRdWF0ZXJuaW9uPGJyPlxuICAgKiBGb3JtYXQ6IFtyZWFsLCBkdWFsXTxicj5cbiAgICogUXVhdGVybmlvbiBmb3JtYXQ6IFhZWlc8YnI+XG4gICAqIE1ha2Ugc3VyZSB0byBoYXZlIG5vcm1hbGl6ZWQgZHVhbCBxdWF0ZXJuaW9ucywgb3RoZXJ3aXNlIHRoZSBmdW5jdGlvbnMgbWF5IG5vdCB3b3JrIGFzIGludGVuZGVkLjxicj5cbiAgICogQG1vZHVsZSBxdWF0MlxuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBkdWFsIHF1YXRcbiAgICpcbiAgICogQHJldHVybnMge3F1YXQyfSBhIG5ldyBkdWFsIHF1YXRlcm5pb24gW3JlYWwgLT4gcm90YXRpb24sIGR1YWwgLT4gdHJhbnNsYXRpb25dXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZSQxKCkge1xuICAgIHZhciBkcSA9IG5ldyBBUlJBWV9UWVBFKDgpO1xuXG4gICAgaWYgKEFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgICBkcVswXSA9IDA7XG4gICAgICBkcVsxXSA9IDA7XG4gICAgICBkcVsyXSA9IDA7XG4gICAgICBkcVs0XSA9IDA7XG4gICAgICBkcVs1XSA9IDA7XG4gICAgICBkcVs2XSA9IDA7XG4gICAgICBkcVs3XSA9IDA7XG4gICAgfVxuXG4gICAgZHFbM10gPSAxO1xuICAgIHJldHVybiBkcTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBxdWF0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgZHVhbCBxdWF0ZXJuaW9uIHRvIGNsb25lXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gbmV3IGR1YWwgcXVhdGVybmlvblxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gY2xvbmUkMShhKSB7XG4gICAgdmFyIGRxID0gbmV3IEFSUkFZX1RZUEUoOCk7XG4gICAgZHFbMF0gPSBhWzBdO1xuICAgIGRxWzFdID0gYVsxXTtcbiAgICBkcVsyXSA9IGFbMl07XG4gICAgZHFbM10gPSBhWzNdO1xuICAgIGRxWzRdID0gYVs0XTtcbiAgICBkcVs1XSA9IGFbNV07XG4gICAgZHFbNl0gPSBhWzZdO1xuICAgIGRxWzddID0gYVs3XTtcbiAgICByZXR1cm4gZHE7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZHVhbCBxdWF0IGluaXRpYWxpemVkIHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0geDEgWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkxIFkgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6MSBaIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gdzEgVyBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHgyIFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5MiBZIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gejIgWiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcyIFcgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gbmV3IGR1YWwgcXVhdGVybmlvblxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVZhbHVlcyQxKHgxLCB5MSwgejEsIHcxLCB4MiwgeTIsIHoyLCB3Mikge1xuICAgIHZhciBkcSA9IG5ldyBBUlJBWV9UWVBFKDgpO1xuICAgIGRxWzBdID0geDE7XG4gICAgZHFbMV0gPSB5MTtcbiAgICBkcVsyXSA9IHoxO1xuICAgIGRxWzNdID0gdzE7XG4gICAgZHFbNF0gPSB4MjtcbiAgICBkcVs1XSA9IHkyO1xuICAgIGRxWzZdID0gejI7XG4gICAgZHFbN10gPSB3MjtcbiAgICByZXR1cm4gZHE7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZHVhbCBxdWF0IGZyb20gdGhlIGdpdmVuIHZhbHVlcyAocXVhdCBhbmQgdHJhbnNsYXRpb24pXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4MSBYIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geTEgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHoxIFogY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3MSBXIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geDIgWCBjb21wb25lbnQgKHRyYW5zbGF0aW9uKVxuICAgKiBAcGFyYW0ge051bWJlcn0geTIgWSBjb21wb25lbnQgKHRyYW5zbGF0aW9uKVxuICAgKiBAcGFyYW0ge051bWJlcn0gejIgWiBjb21wb25lbnQgKHRyYW5zbGF0aW9uKVxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG5ldyBkdWFsIHF1YXRlcm5pb25cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uVmFsdWVzKHgxLCB5MSwgejEsIHcxLCB4MiwgeTIsIHoyKSB7XG4gICAgdmFyIGRxID0gbmV3IEFSUkFZX1RZUEUoOCk7XG4gICAgZHFbMF0gPSB4MTtcbiAgICBkcVsxXSA9IHkxO1xuICAgIGRxWzJdID0gejE7XG4gICAgZHFbM10gPSB3MTtcbiAgICB2YXIgYXggPSB4MiAqIDAuNSxcbiAgICAgICAgYXkgPSB5MiAqIDAuNSxcbiAgICAgICAgYXogPSB6MiAqIDAuNTtcbiAgICBkcVs0XSA9IGF4ICogdzEgKyBheSAqIHoxIC0gYXogKiB5MTtcbiAgICBkcVs1XSA9IGF5ICogdzEgKyBheiAqIHgxIC0gYXggKiB6MTtcbiAgICBkcVs2XSA9IGF6ICogdzEgKyBheCAqIHkxIC0gYXkgKiB4MTtcbiAgICBkcVs3XSA9IC1heCAqIHgxIC0gYXkgKiB5MSAtIGF6ICogejE7XG4gICAgcmV0dXJuIGRxO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZHVhbCBxdWF0IGZyb20gYSBxdWF0ZXJuaW9uIGFuZCBhIHRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gZHVhbCBxdWF0ZXJuaW9uIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIGEgbm9ybWFsaXplZCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB0IHRyYW5zbGF0aW9uIHZlY3RvclxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IGR1YWwgcXVhdGVybmlvbiByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24ob3V0LCBxLCB0KSB7XG4gICAgdmFyIGF4ID0gdFswXSAqIDAuNSxcbiAgICAgICAgYXkgPSB0WzFdICogMC41LFxuICAgICAgICBheiA9IHRbMl0gKiAwLjUsXG4gICAgICAgIGJ4ID0gcVswXSxcbiAgICAgICAgYnkgPSBxWzFdLFxuICAgICAgICBieiA9IHFbMl0sXG4gICAgICAgIGJ3ID0gcVszXTtcbiAgICBvdXRbMF0gPSBieDtcbiAgICBvdXRbMV0gPSBieTtcbiAgICBvdXRbMl0gPSBiejtcbiAgICBvdXRbM10gPSBidztcbiAgICBvdXRbNF0gPSBheCAqIGJ3ICsgYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzVdID0gYXkgKiBidyArIGF6ICogYnggLSBheCAqIGJ6O1xuICAgIG91dFs2XSA9IGF6ICogYncgKyBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICBvdXRbN10gPSAtYXggKiBieCAtIGF5ICogYnkgLSBheiAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBkdWFsIHF1YXQgZnJvbSBhIHRyYW5zbGF0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gZHVhbCBxdWF0ZXJuaW9uIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB0IHRyYW5zbGF0aW9uIHZlY3RvclxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IGR1YWwgcXVhdGVybmlvbiByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVRyYW5zbGF0aW9uKG91dCwgdCkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgb3V0WzRdID0gdFswXSAqIDAuNTtcbiAgICBvdXRbNV0gPSB0WzFdICogMC41O1xuICAgIG91dFs2XSA9IHRbMl0gKiAwLjU7XG4gICAgb3V0WzddID0gMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZHVhbCBxdWF0IGZyb20gYSBxdWF0ZXJuaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gZHVhbCBxdWF0ZXJuaW9uIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIHRoZSBxdWF0ZXJuaW9uXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gZHVhbCBxdWF0ZXJuaW9uIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tUm90YXRpb24ob3V0LCBxKSB7XG4gICAgb3V0WzBdID0gcVswXTtcbiAgICBvdXRbMV0gPSBxWzFdO1xuICAgIG91dFsyXSA9IHFbMl07XG4gICAgb3V0WzNdID0gcVszXTtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgZHVhbCBxdWF0IGZyb20gYSBtYXRyaXggKDR4NClcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IGR1YWwgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbU1hdDQob3V0LCBhKSB7XG4gICAgLy9UT0RPIE9wdGltaXplIHRoaXNcbiAgICB2YXIgb3V0ZXIgPSBjcmVhdGUkMigpO1xuICAgIGdldFJvdGF0aW9uKG91dGVyLCBhKTtcbiAgICB2YXIgdCA9IG5ldyBBUlJBWV9UWVBFKDMpO1xuICAgIGdldFRyYW5zbGF0aW9uJDEodCwgYSk7XG4gICAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24ob3V0LCBvdXRlciwgdCk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIGR1YWwgcXVhdCB0byBhbm90aGVyXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIGR1YWwgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIHNvdXJjZSBkdWFsIHF1YXRlcm5pb25cbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvcHkkMShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IGEgZHVhbCBxdWF0IHRvIHRoZSBpZGVudGl0eSBkdWFsIHF1YXRlcm5pb25cbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpZGVudGl0eShvdXQpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgZHVhbCBxdWF0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge051bWJlcn0geDEgWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkxIFkgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6MSBaIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gdzEgVyBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHgyIFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5MiBZIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gejIgWiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcyIFcgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBzZXQkMShvdXQsIHgxLCB5MSwgejEsIHcxLCB4MiwgeTIsIHoyLCB3Mikge1xuICAgIG91dFswXSA9IHgxO1xuICAgIG91dFsxXSA9IHkxO1xuICAgIG91dFsyXSA9IHoxO1xuICAgIG91dFszXSA9IHcxO1xuICAgIG91dFs0XSA9IHgyO1xuICAgIG91dFs1XSA9IHkyO1xuICAgIG91dFs2XSA9IHoyO1xuICAgIG91dFs3XSA9IHcyO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdldHMgdGhlIHJlYWwgcGFydCBvZiBhIGR1YWwgcXVhdFxuICAgKiBAcGFyYW0gIHtxdWF0fSBvdXQgcmVhbCBwYXJ0XG4gICAqIEBwYXJhbSAge1JlYWRvbmx5UXVhdDJ9IGEgRHVhbCBRdWF0ZXJuaW9uXG4gICAqIEByZXR1cm4ge3F1YXR9IHJlYWwgcGFydFxuICAgKi9cblxuICB2YXIgZ2V0UmVhbCA9IGNvcHkkMjtcbiAgLyoqXG4gICAqIEdldHMgdGhlIGR1YWwgcGFydCBvZiBhIGR1YWwgcXVhdFxuICAgKiBAcGFyYW0gIHtxdWF0fSBvdXQgZHVhbCBwYXJ0XG4gICAqIEBwYXJhbSAge1JlYWRvbmx5UXVhdDJ9IGEgRHVhbCBRdWF0ZXJuaW9uXG4gICAqIEByZXR1cm4ge3F1YXR9IGR1YWwgcGFydFxuICAgKi9cblxuICBmdW5jdGlvbiBnZXREdWFsKG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbNF07XG4gICAgb3V0WzFdID0gYVs1XTtcbiAgICBvdXRbMl0gPSBhWzZdO1xuICAgIG91dFszXSA9IGFbN107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IHRoZSByZWFsIGNvbXBvbmVudCBvZiBhIGR1YWwgcXVhdCB0byB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIGEgcXVhdGVybmlvbiByZXByZXNlbnRpbmcgdGhlIHJlYWwgcGFydFxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNldFJlYWwgPSBjb3B5JDI7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGR1YWwgY29tcG9uZW50IG9mIGEgZHVhbCBxdWF0IHRvIHRoZSBnaXZlbiBxdWF0ZXJuaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgYSBxdWF0ZXJuaW9uIHJlcHJlc2VudGluZyB0aGUgZHVhbCBwYXJ0XG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBzZXREdWFsKG91dCwgcSkge1xuICAgIG91dFs0XSA9IHFbMF07XG4gICAgb3V0WzVdID0gcVsxXTtcbiAgICBvdXRbNl0gPSBxWzJdO1xuICAgIG91dFs3XSA9IHFbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2V0cyB0aGUgdHJhbnNsYXRpb24gb2YgYSBub3JtYWxpemVkIGR1YWwgcXVhdFxuICAgKiBAcGFyYW0gIHt2ZWMzfSBvdXQgdHJhbnNsYXRpb25cbiAgICogQHBhcmFtICB7UmVhZG9ubHlRdWF0Mn0gYSBEdWFsIFF1YXRlcm5pb24gdG8gYmUgZGVjb21wb3NlZFxuICAgKiBAcmV0dXJuIHt2ZWMzfSB0cmFuc2xhdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRUcmFuc2xhdGlvbihvdXQsIGEpIHtcbiAgICB2YXIgYXggPSBhWzRdLFxuICAgICAgICBheSA9IGFbNV0sXG4gICAgICAgIGF6ID0gYVs2XSxcbiAgICAgICAgYXcgPSBhWzddLFxuICAgICAgICBieCA9IC1hWzBdLFxuICAgICAgICBieSA9IC1hWzFdLFxuICAgICAgICBieiA9IC1hWzJdLFxuICAgICAgICBidyA9IGFbM107XG4gICAgb3V0WzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMjtcbiAgICBvdXRbMV0gPSAoYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBieikgKiAyO1xuICAgIG91dFsyXSA9IChheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4KSAqIDI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogVHJhbnNsYXRlcyBhIGR1YWwgcXVhdCBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIGR1YWwgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIGR1YWwgcXVhdGVybmlvbiB0byB0cmFuc2xhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgdmVjdG9yIHRvIHRyYW5zbGF0ZSBieVxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUob3V0LCBhLCB2KSB7XG4gICAgdmFyIGF4MSA9IGFbMF0sXG4gICAgICAgIGF5MSA9IGFbMV0sXG4gICAgICAgIGF6MSA9IGFbMl0sXG4gICAgICAgIGF3MSA9IGFbM10sXG4gICAgICAgIGJ4MSA9IHZbMF0gKiAwLjUsXG4gICAgICAgIGJ5MSA9IHZbMV0gKiAwLjUsXG4gICAgICAgIGJ6MSA9IHZbMl0gKiAwLjUsXG4gICAgICAgIGF4MiA9IGFbNF0sXG4gICAgICAgIGF5MiA9IGFbNV0sXG4gICAgICAgIGF6MiA9IGFbNl0sXG4gICAgICAgIGF3MiA9IGFbN107XG4gICAgb3V0WzBdID0gYXgxO1xuICAgIG91dFsxXSA9IGF5MTtcbiAgICBvdXRbMl0gPSBhejE7XG4gICAgb3V0WzNdID0gYXcxO1xuICAgIG91dFs0XSA9IGF3MSAqIGJ4MSArIGF5MSAqIGJ6MSAtIGF6MSAqIGJ5MSArIGF4MjtcbiAgICBvdXRbNV0gPSBhdzEgKiBieTEgKyBhejEgKiBieDEgLSBheDEgKiBiejEgKyBheTI7XG4gICAgb3V0WzZdID0gYXcxICogYnoxICsgYXgxICogYnkxIC0gYXkxICogYngxICsgYXoyO1xuICAgIG91dFs3XSA9IC1heDEgKiBieDEgLSBheTEgKiBieTEgLSBhejEgKiBiejEgKyBhdzI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIGR1YWwgcXVhdCBhcm91bmQgdGhlIFggYXhpc1xuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBkdWFsIHF1YXRlcm5pb24gdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWQgaG93IGZhciBzaG91bGQgdGhlIHJvdGF0aW9uIGJlXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZVgob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYnggPSAtYVswXSxcbiAgICAgICAgYnkgPSAtYVsxXSxcbiAgICAgICAgYnogPSAtYVsyXSxcbiAgICAgICAgYncgPSBhWzNdLFxuICAgICAgICBheCA9IGFbNF0sXG4gICAgICAgIGF5ID0gYVs1XSxcbiAgICAgICAgYXogPSBhWzZdLFxuICAgICAgICBhdyA9IGFbN10sXG4gICAgICAgIGF4MSA9IGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnksXG4gICAgICAgIGF5MSA9IGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnosXG4gICAgICAgIGF6MSA9IGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYngsXG4gICAgICAgIGF3MSA9IGF3ICogYncgLSBheCAqIGJ4IC0gYXkgKiBieSAtIGF6ICogYno7XG4gICAgcm90YXRlWCQxKG91dCwgYSwgcmFkKTtcbiAgICBieCA9IG91dFswXTtcbiAgICBieSA9IG91dFsxXTtcbiAgICBieiA9IG91dFsyXTtcbiAgICBidyA9IG91dFszXTtcbiAgICBvdXRbNF0gPSBheDEgKiBidyArIGF3MSAqIGJ4ICsgYXkxICogYnogLSBhejEgKiBieTtcbiAgICBvdXRbNV0gPSBheTEgKiBidyArIGF3MSAqIGJ5ICsgYXoxICogYnggLSBheDEgKiBiejtcbiAgICBvdXRbNl0gPSBhejEgKiBidyArIGF3MSAqIGJ6ICsgYXgxICogYnkgLSBheTEgKiBieDtcbiAgICBvdXRbN10gPSBhdzEgKiBidyAtIGF4MSAqIGJ4IC0gYXkxICogYnkgLSBhejEgKiBiejtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgZHVhbCBxdWF0IGFyb3VuZCB0aGUgWSBheGlzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIGR1YWwgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIGR1YWwgcXVhdGVybmlvbiB0byByb3RhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhZCBob3cgZmFyIHNob3VsZCB0aGUgcm90YXRpb24gYmVcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlWShvdXQsIGEsIHJhZCkge1xuICAgIHZhciBieCA9IC1hWzBdLFxuICAgICAgICBieSA9IC1hWzFdLFxuICAgICAgICBieiA9IC1hWzJdLFxuICAgICAgICBidyA9IGFbM10sXG4gICAgICAgIGF4ID0gYVs0XSxcbiAgICAgICAgYXkgPSBhWzVdLFxuICAgICAgICBheiA9IGFbNl0sXG4gICAgICAgIGF3ID0gYVs3XSxcbiAgICAgICAgYXgxID0gYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieSxcbiAgICAgICAgYXkxID0gYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBieixcbiAgICAgICAgYXoxID0gYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCxcbiAgICAgICAgYXcxID0gYXcgKiBidyAtIGF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcbiAgICByb3RhdGVZJDEob3V0LCBhLCByYWQpO1xuICAgIGJ4ID0gb3V0WzBdO1xuICAgIGJ5ID0gb3V0WzFdO1xuICAgIGJ6ID0gb3V0WzJdO1xuICAgIGJ3ID0gb3V0WzNdO1xuICAgIG91dFs0XSA9IGF4MSAqIGJ3ICsgYXcxICogYnggKyBheTEgKiBieiAtIGF6MSAqIGJ5O1xuICAgIG91dFs1XSA9IGF5MSAqIGJ3ICsgYXcxICogYnkgKyBhejEgKiBieCAtIGF4MSAqIGJ6O1xuICAgIG91dFs2XSA9IGF6MSAqIGJ3ICsgYXcxICogYnogKyBheDEgKiBieSAtIGF5MSAqIGJ4O1xuICAgIG91dFs3XSA9IGF3MSAqIGJ3IC0gYXgxICogYnggLSBheTEgKiBieSAtIGF6MSAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBkdWFsIHF1YXQgYXJvdW5kIHRoZSBaIGF4aXNcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZHVhbCBxdWF0ZXJuaW9uIHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkIGhvdyBmYXIgc2hvdWxkIHRoZSByb3RhdGlvbiBiZVxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVaKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIGJ4ID0gLWFbMF0sXG4gICAgICAgIGJ5ID0gLWFbMV0sXG4gICAgICAgIGJ6ID0gLWFbMl0sXG4gICAgICAgIGJ3ID0gYVszXSxcbiAgICAgICAgYXggPSBhWzRdLFxuICAgICAgICBheSA9IGFbNV0sXG4gICAgICAgIGF6ID0gYVs2XSxcbiAgICAgICAgYXcgPSBhWzddLFxuICAgICAgICBheDEgPSBheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5LFxuICAgICAgICBheTEgPSBheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6LFxuICAgICAgICBhejEgPSBheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4LFxuICAgICAgICBhdzEgPSBhdyAqIGJ3IC0gYXggKiBieCAtIGF5ICogYnkgLSBheiAqIGJ6O1xuICAgIHJvdGF0ZVokMShvdXQsIGEsIHJhZCk7XG4gICAgYnggPSBvdXRbMF07XG4gICAgYnkgPSBvdXRbMV07XG4gICAgYnogPSBvdXRbMl07XG4gICAgYncgPSBvdXRbM107XG4gICAgb3V0WzRdID0gYXgxICogYncgKyBhdzEgKiBieCArIGF5MSAqIGJ6IC0gYXoxICogYnk7XG4gICAgb3V0WzVdID0gYXkxICogYncgKyBhdzEgKiBieSArIGF6MSAqIGJ4IC0gYXgxICogYno7XG4gICAgb3V0WzZdID0gYXoxICogYncgKyBhdzEgKiBieiArIGF4MSAqIGJ5IC0gYXkxICogYng7XG4gICAgb3V0WzddID0gYXcxICogYncgLSBheDEgKiBieCAtIGF5MSAqIGJ5IC0gYXoxICogYno7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIGR1YWwgcXVhdCBieSBhIGdpdmVuIHF1YXRlcm5pb24gKGEgKiBxKVxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBkdWFsIHF1YXRlcm5pb24gdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIHF1YXRlcm5pb24gdG8gcm90YXRlIGJ5XG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZUJ5UXVhdEFwcGVuZChvdXQsIGEsIHEpIHtcbiAgICB2YXIgcXggPSBxWzBdLFxuICAgICAgICBxeSA9IHFbMV0sXG4gICAgICAgIHF6ID0gcVsyXSxcbiAgICAgICAgcXcgPSBxWzNdLFxuICAgICAgICBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgb3V0WzBdID0gYXggKiBxdyArIGF3ICogcXggKyBheSAqIHF6IC0gYXogKiBxeTtcbiAgICBvdXRbMV0gPSBheSAqIHF3ICsgYXcgKiBxeSArIGF6ICogcXggLSBheCAqIHF6O1xuICAgIG91dFsyXSA9IGF6ICogcXcgKyBhdyAqIHF6ICsgYXggKiBxeSAtIGF5ICogcXg7XG4gICAgb3V0WzNdID0gYXcgKiBxdyAtIGF4ICogcXggLSBheSAqIHF5IC0gYXogKiBxejtcbiAgICBheCA9IGFbNF07XG4gICAgYXkgPSBhWzVdO1xuICAgIGF6ID0gYVs2XTtcbiAgICBhdyA9IGFbN107XG4gICAgb3V0WzRdID0gYXggKiBxdyArIGF3ICogcXggKyBheSAqIHF6IC0gYXogKiBxeTtcbiAgICBvdXRbNV0gPSBheSAqIHF3ICsgYXcgKiBxeSArIGF6ICogcXggLSBheCAqIHF6O1xuICAgIG91dFs2XSA9IGF6ICogcXcgKyBhdyAqIHF6ICsgYXggKiBxeSAtIGF5ICogcXg7XG4gICAgb3V0WzddID0gYXcgKiBxdyAtIGF4ICogcXggLSBheSAqIHF5IC0gYXogKiBxejtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgZHVhbCBxdWF0IGJ5IGEgZ2l2ZW4gcXVhdGVybmlvbiAocSAqIGEpXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIGR1YWwgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHJvdGF0ZSBieVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIGR1YWwgcXVhdGVybmlvbiB0byByb3RhdGVcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlQnlRdWF0UHJlcGVuZChvdXQsIHEsIGEpIHtcbiAgICB2YXIgcXggPSBxWzBdLFxuICAgICAgICBxeSA9IHFbMV0sXG4gICAgICAgIHF6ID0gcVsyXSxcbiAgICAgICAgcXcgPSBxWzNdLFxuICAgICAgICBieCA9IGFbMF0sXG4gICAgICAgIGJ5ID0gYVsxXSxcbiAgICAgICAgYnogPSBhWzJdLFxuICAgICAgICBidyA9IGFbM107XG4gICAgb3V0WzBdID0gcXggKiBidyArIHF3ICogYnggKyBxeSAqIGJ6IC0gcXogKiBieTtcbiAgICBvdXRbMV0gPSBxeSAqIGJ3ICsgcXcgKiBieSArIHF6ICogYnggLSBxeCAqIGJ6O1xuICAgIG91dFsyXSA9IHF6ICogYncgKyBxdyAqIGJ6ICsgcXggKiBieSAtIHF5ICogYng7XG4gICAgb3V0WzNdID0gcXcgKiBidyAtIHF4ICogYnggLSBxeSAqIGJ5IC0gcXogKiBiejtcbiAgICBieCA9IGFbNF07XG4gICAgYnkgPSBhWzVdO1xuICAgIGJ6ID0gYVs2XTtcbiAgICBidyA9IGFbN107XG4gICAgb3V0WzRdID0gcXggKiBidyArIHF3ICogYnggKyBxeSAqIGJ6IC0gcXogKiBieTtcbiAgICBvdXRbNV0gPSBxeSAqIGJ3ICsgcXcgKiBieSArIHF6ICogYnggLSBxeCAqIGJ6O1xuICAgIG91dFs2XSA9IHF6ICogYncgKyBxdyAqIGJ6ICsgcXggKiBieSAtIHF5ICogYng7XG4gICAgb3V0WzddID0gcXcgKiBidyAtIHF4ICogYnggLSBxeSAqIGJ5IC0gcXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgZHVhbCBxdWF0IGFyb3VuZCBhIGdpdmVuIGF4aXMuIERvZXMgdGhlIG5vcm1hbGlzYXRpb24gYXV0b21hdGljYWxseVxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBkdWFsIHF1YXRlcm5pb24gdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBob3cgZmFyIHRoZSByb3RhdGlvbiBzaG91bGQgYmVcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlQXJvdW5kQXhpcyhvdXQsIGEsIGF4aXMsIHJhZCkge1xuICAgIC8vU3BlY2lhbCBjYXNlIGZvciByYWQgPSAwXG4gICAgaWYgKE1hdGguYWJzKHJhZCkgPCBFUFNJTE9OKSB7XG4gICAgICByZXR1cm4gY29weSQxKG91dCwgYSk7XG4gICAgfVxuXG4gICAgdmFyIGF4aXNMZW5ndGggPSBNYXRoLmh5cG90KGF4aXNbMF0sIGF4aXNbMV0sIGF4aXNbMl0pO1xuICAgIHJhZCA9IHJhZCAqIDAuNTtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgdmFyIGJ4ID0gcyAqIGF4aXNbMF0gLyBheGlzTGVuZ3RoO1xuICAgIHZhciBieSA9IHMgKiBheGlzWzFdIC8gYXhpc0xlbmd0aDtcbiAgICB2YXIgYnogPSBzICogYXhpc1syXSAvIGF4aXNMZW5ndGg7XG4gICAgdmFyIGJ3ID0gTWF0aC5jb3MocmFkKTtcbiAgICB2YXIgYXgxID0gYVswXSxcbiAgICAgICAgYXkxID0gYVsxXSxcbiAgICAgICAgYXoxID0gYVsyXSxcbiAgICAgICAgYXcxID0gYVszXTtcbiAgICBvdXRbMF0gPSBheDEgKiBidyArIGF3MSAqIGJ4ICsgYXkxICogYnogLSBhejEgKiBieTtcbiAgICBvdXRbMV0gPSBheTEgKiBidyArIGF3MSAqIGJ5ICsgYXoxICogYnggLSBheDEgKiBiejtcbiAgICBvdXRbMl0gPSBhejEgKiBidyArIGF3MSAqIGJ6ICsgYXgxICogYnkgLSBheTEgKiBieDtcbiAgICBvdXRbM10gPSBhdzEgKiBidyAtIGF4MSAqIGJ4IC0gYXkxICogYnkgLSBhejEgKiBiejtcbiAgICB2YXIgYXggPSBhWzRdLFxuICAgICAgICBheSA9IGFbNV0sXG4gICAgICAgIGF6ID0gYVs2XSxcbiAgICAgICAgYXcgPSBhWzddO1xuICAgIG91dFs0XSA9IGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzVdID0gYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBiejtcbiAgICBvdXRbNl0gPSBheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4O1xuICAgIG91dFs3XSA9IGF3ICogYncgLSBheCAqIGJ4IC0gYXkgKiBieSAtIGF6ICogYno7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gZHVhbCBxdWF0J3NcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBhZGQkMShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byBkdWFsIHF1YXQnc1xuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHkkMShvdXQsIGEsIGIpIHtcbiAgICB2YXIgYXgwID0gYVswXSxcbiAgICAgICAgYXkwID0gYVsxXSxcbiAgICAgICAgYXowID0gYVsyXSxcbiAgICAgICAgYXcwID0gYVszXSxcbiAgICAgICAgYngxID0gYls0XSxcbiAgICAgICAgYnkxID0gYls1XSxcbiAgICAgICAgYnoxID0gYls2XSxcbiAgICAgICAgYncxID0gYls3XSxcbiAgICAgICAgYXgxID0gYVs0XSxcbiAgICAgICAgYXkxID0gYVs1XSxcbiAgICAgICAgYXoxID0gYVs2XSxcbiAgICAgICAgYXcxID0gYVs3XSxcbiAgICAgICAgYngwID0gYlswXSxcbiAgICAgICAgYnkwID0gYlsxXSxcbiAgICAgICAgYnowID0gYlsyXSxcbiAgICAgICAgYncwID0gYlszXTtcbiAgICBvdXRbMF0gPSBheDAgKiBidzAgKyBhdzAgKiBieDAgKyBheTAgKiBiejAgLSBhejAgKiBieTA7XG4gICAgb3V0WzFdID0gYXkwICogYncwICsgYXcwICogYnkwICsgYXowICogYngwIC0gYXgwICogYnowO1xuICAgIG91dFsyXSA9IGF6MCAqIGJ3MCArIGF3MCAqIGJ6MCArIGF4MCAqIGJ5MCAtIGF5MCAqIGJ4MDtcbiAgICBvdXRbM10gPSBhdzAgKiBidzAgLSBheDAgKiBieDAgLSBheTAgKiBieTAgLSBhejAgKiBiejA7XG4gICAgb3V0WzRdID0gYXgwICogYncxICsgYXcwICogYngxICsgYXkwICogYnoxIC0gYXowICogYnkxICsgYXgxICogYncwICsgYXcxICogYngwICsgYXkxICogYnowIC0gYXoxICogYnkwO1xuICAgIG91dFs1XSA9IGF5MCAqIGJ3MSArIGF3MCAqIGJ5MSArIGF6MCAqIGJ4MSAtIGF4MCAqIGJ6MSArIGF5MSAqIGJ3MCArIGF3MSAqIGJ5MCArIGF6MSAqIGJ4MCAtIGF4MSAqIGJ6MDtcbiAgICBvdXRbNl0gPSBhejAgKiBidzEgKyBhdzAgKiBiejEgKyBheDAgKiBieTEgLSBheTAgKiBieDEgKyBhejEgKiBidzAgKyBhdzEgKiBiejAgKyBheDEgKiBieTAgLSBheTEgKiBieDA7XG4gICAgb3V0WzddID0gYXcwICogYncxIC0gYXgwICogYngxIC0gYXkwICogYnkxIC0gYXowICogYnoxICsgYXcxICogYncwIC0gYXgxICogYngwIC0gYXkxICogYnkwIC0gYXoxICogYnowO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdDIubXVsdGlwbHl9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbXVsJDEgPSBtdWx0aXBseSQxO1xuICAvKipcbiAgICogU2NhbGVzIGEgZHVhbCBxdWF0IGJ5IGEgc2NhbGFyIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBkdWFsIHF1YXQgdG8gc2NhbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSBkdWFsIHF1YXQgYnlcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNjYWxlJDEob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgb3V0WzNdID0gYVszXSAqIGI7XG4gICAgb3V0WzRdID0gYVs0XSAqIGI7XG4gICAgb3V0WzVdID0gYVs1XSAqIGI7XG4gICAgb3V0WzZdID0gYVs2XSAqIGI7XG4gICAgb3V0WzddID0gYVs3XSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIGR1YWwgcXVhdCdzIChUaGUgZG90IHByb2R1Y3Qgb2YgdGhlIHJlYWwgcGFydHMpXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBkb3QkMSA9IGRvdCQyO1xuICAvKipcbiAgICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byBkdWFsIHF1YXRzJ3NcbiAgICogTk9URTogVGhlIHJlc3VsdGluZyBkdWFsIHF1YXRlcm5pb25zIHdvbid0IGFsd2F5cyBiZSBub3JtYWxpemVkIChUaGUgZXJyb3IgaXMgbW9zdCBub3RpY2VhYmxlIHdoZW4gdCA9IDAuNSlcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbGVycCQxKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBtdCA9IDEgLSB0O1xuICAgIGlmIChkb3QkMShhLCBiKSA8IDApIHQgPSAtdDtcbiAgICBvdXRbMF0gPSBhWzBdICogbXQgKyBiWzBdICogdDtcbiAgICBvdXRbMV0gPSBhWzFdICogbXQgKyBiWzFdICogdDtcbiAgICBvdXRbMl0gPSBhWzJdICogbXQgKyBiWzJdICogdDtcbiAgICBvdXRbM10gPSBhWzNdICogbXQgKyBiWzNdICogdDtcbiAgICBvdXRbNF0gPSBhWzRdICogbXQgKyBiWzRdICogdDtcbiAgICBvdXRbNV0gPSBhWzVdICogbXQgKyBiWzVdICogdDtcbiAgICBvdXRbNl0gPSBhWzZdICogbXQgKyBiWzZdICogdDtcbiAgICBvdXRbN10gPSBhWzddICogbXQgKyBiWzddICogdDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBpbnZlcnNlIG9mIGEgZHVhbCBxdWF0LiBJZiB0aGV5IGFyZSBub3JtYWxpemVkLCBjb25qdWdhdGUgaXMgY2hlYXBlclxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIGR1YWwgcXVhdCB0byBjYWxjdWxhdGUgaW52ZXJzZSBvZlxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gICAgdmFyIHNxbGVuID0gc3F1YXJlZExlbmd0aCQxKGEpO1xuICAgIG91dFswXSA9IC1hWzBdIC8gc3FsZW47XG4gICAgb3V0WzFdID0gLWFbMV0gLyBzcWxlbjtcbiAgICBvdXRbMl0gPSAtYVsyXSAvIHNxbGVuO1xuICAgIG91dFszXSA9IGFbM10gLyBzcWxlbjtcbiAgICBvdXRbNF0gPSAtYVs0XSAvIHNxbGVuO1xuICAgIG91dFs1XSA9IC1hWzVdIC8gc3FsZW47XG4gICAgb3V0WzZdID0gLWFbNl0gLyBzcWxlbjtcbiAgICBvdXRbN10gPSBhWzddIC8gc3FsZW47XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgY29uanVnYXRlIG9mIGEgZHVhbCBxdWF0XG4gICAqIElmIHRoZSBkdWFsIHF1YXRlcm5pb24gaXMgbm9ybWFsaXplZCwgdGhpcyBmdW5jdGlvbiBpcyBmYXN0ZXIgdGhhbiBxdWF0Mi5pbnZlcnNlIGFuZCBwcm9kdWNlcyB0aGUgc2FtZSByZXN1bHQuXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHF1YXQgdG8gY2FsY3VsYXRlIGNvbmp1Z2F0ZSBvZlxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBjb25qdWdhdGUob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gLWFbMF07XG4gICAgb3V0WzFdID0gLWFbMV07XG4gICAgb3V0WzJdID0gLWFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSAtYVs0XTtcbiAgICBvdXRbNV0gPSAtYVs1XTtcbiAgICBvdXRbNl0gPSAtYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIGR1YWwgcXVhdFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgZHVhbCBxdWF0IHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAgICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBsZW5ndGgkMSA9IGxlbmd0aCQyO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBxdWF0Mi5sZW5ndGh9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbGVuJDEgPSBsZW5ndGgkMTtcbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgZHVhbCBxdWF0XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSBkdWFsIHF1YXQgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzcXVhcmVkTGVuZ3RoJDEgPSBzcXVhcmVkTGVuZ3RoJDI7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQyLnNxdWFyZWRMZW5ndGh9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3FyTGVuJDEgPSBzcXVhcmVkTGVuZ3RoJDE7XG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSBkdWFsIHF1YXRcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSBkdWFsIHF1YXRlcm5pb24gdG8gbm9ybWFsaXplXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBub3JtYWxpemUkMShvdXQsIGEpIHtcbiAgICB2YXIgbWFnbml0dWRlID0gc3F1YXJlZExlbmd0aCQxKGEpO1xuXG4gICAgaWYgKG1hZ25pdHVkZSA+IDApIHtcbiAgICAgIG1hZ25pdHVkZSA9IE1hdGguc3FydChtYWduaXR1ZGUpO1xuICAgICAgdmFyIGEwID0gYVswXSAvIG1hZ25pdHVkZTtcbiAgICAgIHZhciBhMSA9IGFbMV0gLyBtYWduaXR1ZGU7XG4gICAgICB2YXIgYTIgPSBhWzJdIC8gbWFnbml0dWRlO1xuICAgICAgdmFyIGEzID0gYVszXSAvIG1hZ25pdHVkZTtcbiAgICAgIHZhciBiMCA9IGFbNF07XG4gICAgICB2YXIgYjEgPSBhWzVdO1xuICAgICAgdmFyIGIyID0gYVs2XTtcbiAgICAgIHZhciBiMyA9IGFbN107XG4gICAgICB2YXIgYV9kb3RfYiA9IGEwICogYjAgKyBhMSAqIGIxICsgYTIgKiBiMiArIGEzICogYjM7XG4gICAgICBvdXRbMF0gPSBhMDtcbiAgICAgIG91dFsxXSA9IGExO1xuICAgICAgb3V0WzJdID0gYTI7XG4gICAgICBvdXRbM10gPSBhMztcbiAgICAgIG91dFs0XSA9IChiMCAtIGEwICogYV9kb3RfYikgLyBtYWduaXR1ZGU7XG4gICAgICBvdXRbNV0gPSAoYjEgLSBhMSAqIGFfZG90X2IpIC8gbWFnbml0dWRlO1xuICAgICAgb3V0WzZdID0gKGIyIC0gYTIgKiBhX2RvdF9iKSAvIG1hZ25pdHVkZTtcbiAgICAgIG91dFs3XSA9IChiMyAtIGEzICogYV9kb3RfYikgLyBtYWduaXR1ZGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIGR1YWwgcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgZHVhbCBxdWF0ZXJuaW9uIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGR1YWwgcXVhdFxuICAgKi9cblxuICBmdW5jdGlvbiBzdHIkMShhKSB7XG4gICAgcmV0dXJuIFwicXVhdDIoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIsIFwiICsgYVs0XSArIFwiLCBcIiArIGFbNV0gKyBcIiwgXCIgKyBhWzZdICsgXCIsIFwiICsgYVs3XSArIFwiKVwiO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBkdWFsIHF1YXRlcm5pb25zIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBmaXJzdCBkdWFsIHF1YXRlcm5pb24uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYiB0aGUgc2Vjb25kIGR1YWwgcXVhdGVybmlvbi5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIGR1YWwgcXVhdGVybmlvbnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4YWN0RXF1YWxzJDEoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXSAmJiBhWzNdID09PSBiWzNdICYmIGFbNF0gPT09IGJbNF0gJiYgYVs1XSA9PT0gYls1XSAmJiBhWzZdID09PSBiWzZdICYmIGFbN10gPT09IGJbN107XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIGR1YWwgcXVhdGVybmlvbnMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIGZpcnN0IGR1YWwgcXVhdC5cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBiIHRoZSBzZWNvbmQgZHVhbCBxdWF0LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiB0aGUgZHVhbCBxdWF0cyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZXF1YWxzJDEoYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM10sXG4gICAgICAgIGE0ID0gYVs0XSxcbiAgICAgICAgYTUgPSBhWzVdLFxuICAgICAgICBhNiA9IGFbNl0sXG4gICAgICAgIGE3ID0gYVs3XTtcbiAgICB2YXIgYjAgPSBiWzBdLFxuICAgICAgICBiMSA9IGJbMV0sXG4gICAgICAgIGIyID0gYlsyXSxcbiAgICAgICAgYjMgPSBiWzNdLFxuICAgICAgICBiNCA9IGJbNF0sXG4gICAgICAgIGI1ID0gYls1XSxcbiAgICAgICAgYjYgPSBiWzZdLFxuICAgICAgICBiNyA9IGJbN107XG4gICAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJiBNYXRoLmFicyhhNCAtIGI0KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiYgTWF0aC5hYnMoYTUgLSBiNSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpICYmIE1hdGguYWJzKGE2IC0gYjYpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE2KSwgTWF0aC5hYnMoYjYpKSAmJiBNYXRoLmFicyhhNyAtIGI3KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNyksIE1hdGguYWJzKGI3KSk7XG4gIH1cblxuICB2YXIgcXVhdDIgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIGNyZWF0ZTogY3JlYXRlJDEsXG4gICAgY2xvbmU6IGNsb25lJDEsXG4gICAgZnJvbVZhbHVlczogZnJvbVZhbHVlcyQxLFxuICAgIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uVmFsdWVzOiBmcm9tUm90YXRpb25UcmFuc2xhdGlvblZhbHVlcyxcbiAgICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbjogZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24sXG4gICAgZnJvbVRyYW5zbGF0aW9uOiBmcm9tVHJhbnNsYXRpb24sXG4gICAgZnJvbVJvdGF0aW9uOiBmcm9tUm90YXRpb24sXG4gICAgZnJvbU1hdDQ6IGZyb21NYXQ0LFxuICAgIGNvcHk6IGNvcHkkMSxcbiAgICBpZGVudGl0eTogaWRlbnRpdHksXG4gICAgc2V0OiBzZXQkMSxcbiAgICBnZXRSZWFsOiBnZXRSZWFsLFxuICAgIGdldER1YWw6IGdldER1YWwsXG4gICAgc2V0UmVhbDogc2V0UmVhbCxcbiAgICBzZXREdWFsOiBzZXREdWFsLFxuICAgIGdldFRyYW5zbGF0aW9uOiBnZXRUcmFuc2xhdGlvbixcbiAgICB0cmFuc2xhdGU6IHRyYW5zbGF0ZSxcbiAgICByb3RhdGVYOiByb3RhdGVYLFxuICAgIHJvdGF0ZVk6IHJvdGF0ZVksXG4gICAgcm90YXRlWjogcm90YXRlWixcbiAgICByb3RhdGVCeVF1YXRBcHBlbmQ6IHJvdGF0ZUJ5UXVhdEFwcGVuZCxcbiAgICByb3RhdGVCeVF1YXRQcmVwZW5kOiByb3RhdGVCeVF1YXRQcmVwZW5kLFxuICAgIHJvdGF0ZUFyb3VuZEF4aXM6IHJvdGF0ZUFyb3VuZEF4aXMsXG4gICAgYWRkOiBhZGQkMSxcbiAgICBtdWx0aXBseTogbXVsdGlwbHkkMSxcbiAgICBtdWw6IG11bCQxLFxuICAgIHNjYWxlOiBzY2FsZSQxLFxuICAgIGRvdDogZG90JDEsXG4gICAgbGVycDogbGVycCQxLFxuICAgIGludmVydDogaW52ZXJ0LFxuICAgIGNvbmp1Z2F0ZTogY29uanVnYXRlLFxuICAgIGxlbmd0aDogbGVuZ3RoJDEsXG4gICAgbGVuOiBsZW4kMSxcbiAgICBzcXVhcmVkTGVuZ3RoOiBzcXVhcmVkTGVuZ3RoJDEsXG4gICAgc3FyTGVuOiBzcXJMZW4kMSxcbiAgICBub3JtYWxpemU6IG5vcm1hbGl6ZSQxLFxuICAgIHN0cjogc3RyJDEsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzJDEsXG4gICAgZXF1YWxzOiBlcXVhbHMkMVxuICB9KTtcblxuICAvKipcbiAgICogMiBEaW1lbnNpb25hbCBWZWN0b3JcbiAgICogQG1vZHVsZSB2ZWMyXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3LCBlbXB0eSB2ZWMyXG4gICAqXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSgyKTtcblxuICAgIGlmIChBUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgICAgb3V0WzBdID0gMDtcbiAgICAgIG91dFsxXSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB2ZWMyIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjbG9uZVxuICAgKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsb25lKGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdmVjMiBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAgICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tVmFsdWVzKHgsIHkpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMik7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWMyIHRvIGFub3RoZXJcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBjb3B5KG91dCwgYSkge1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzZXQob3V0LCB4LCB5KSB7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIHZlYzInc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBhZGQob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc3VidHJhY3Qob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbGllcyB0d28gdmVjMidzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIERpdmlkZXMgdHdvIHZlYzInc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBkaXZpZGUob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2VpbFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNlaWwob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5jZWlsKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguY2VpbChhWzFdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gZmxvb3JcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmbG9vcihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBNYXRoLmZsb29yKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGguZmxvb3IoYVsxXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjMidzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1pbihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMyJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbWF4KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWF4KGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWF4KGFbMV0sIGJbMV0pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE1hdGgucm91bmQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byByb3VuZFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdW5kKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTY2FsZXMgYSB2ZWMyIGJ5IGEgc2NhbGFyIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2NhbGUob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gdmVjMidzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzY2FsZUFuZEFkZChvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICAgKi9cblxuICBmdW5jdGlvbiBkaXN0YW5jZShhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHJldHVybiBNYXRoLmh5cG90KHgsIHkpO1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZShhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXSxcbiAgICAgICAgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHJldHVybiB4ICogeCArIHkgKiB5O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSB2ZWMyXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxlbmd0aChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5KTtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMyXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAgICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICAgKi9cblxuICBmdW5jdGlvbiBzcXVhcmVkTGVuZ3RoKGEpIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIHJldHVybiB4ICogeCArIHkgKiB5O1xuICB9XG4gIC8qKlxuICAgKiBOZWdhdGVzIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gbmVnYXRlXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbmVnYXRlKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBpbnZlcnRcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZlcnNlKG91dCwgYSkge1xuICAgIG91dFswXSA9IDEuMCAvIGFbMF07XG4gICAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSB2ZWMyXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBub3JtYWxpemUob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICB2YXIgbGVuID0geCAqIHggKyB5ICogeTtcblxuICAgIGlmIChsZW4gPiAwKSB7XG4gICAgICAvL1RPRE86IGV2YWx1YXRlIHVzZSBvZiBnbG1faW52c3FydCBoZXJlP1xuICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgIH1cblxuICAgIG91dFswXSA9IGFbMF0gKiBsZW47XG4gICAgb3V0WzFdID0gYVsxXSAqIGxlbjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gKiBiWzBdICsgYVsxXSAqIGJbMV07XG4gIH1cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBjcm9zcyBwcm9kdWN0IG9mIHR3byB2ZWMyJ3NcbiAgICogTm90ZSB0aGF0IHRoZSBjcm9zcyBwcm9kdWN0IG11c3QgYnkgZGVmaW5pdGlvbiBwcm9kdWNlIGEgM0QgdmVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyb3NzKG91dCwgYSwgYikge1xuICAgIHZhciB6ID0gYVswXSAqIGJbMV0gLSBhWzFdICogYlswXTtcbiAgICBvdXRbMF0gPSBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IHo7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMyJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBsZXJwKG91dCwgYSwgYiwgdCkge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBheCArIHQgKiAoYlswXSAtIGF4KTtcbiAgICBvdXRbMV0gPSBheSArIHQgKiAoYlsxXSAtIGF5KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSByYW5kb20gdmVjdG9yIHdpdGggdGhlIGdpdmVuIHNjYWxlXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVdIExlbmd0aCBvZiB0aGUgcmVzdWx0aW5nIHZlY3Rvci4gSWYgb21pdHRlZCwgYSB1bml0IHZlY3RvciB3aWxsIGJlIHJldHVybmVkXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcmFuZG9tKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlID09PSB1bmRlZmluZWQgPyAxLjAgOiBzY2FsZTtcbiAgICB2YXIgciA9IFJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICBvdXRbMF0gPSBNYXRoLmNvcyhyKSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IE1hdGguc2luKHIpICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgdmVjMiB3aXRoIGEgbWF0MlxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQyKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgb3V0WzBdID0gbVswXSAqIHggKyBtWzJdICogeTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDJkXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gbSBtYXRyaXggdG8gdHJhbnNmb3JtIHdpdGhcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1NYXQyZChvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHkgKyBtWzRdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHkgKyBtWzVdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDNcbiAgICogM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyhvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVszXSAqIHkgKyBtWzZdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVs0XSAqIHkgKyBtWzddO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDRcbiAgICogM3JkIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMCdcbiAgICogNHRoIHZlY3RvciBjb21wb25lbnQgaXMgaW1wbGljaXRseSAnMSdcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NChvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF07XG4gICAgdmFyIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzEyXTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNV0gKiB5ICsgbVsxM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlIGEgMkQgdmVjdG9yXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IFRoZSByZWNlaXZpbmcgdmVjMlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgdmVjMiBwb2ludCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZShvdXQsIGEsIGIsIHJhZCkge1xuICAgIC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cbiAgICB2YXIgcDAgPSBhWzBdIC0gYlswXSxcbiAgICAgICAgcDEgPSBhWzFdIC0gYlsxXSxcbiAgICAgICAgc2luQyA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGNvc0MgPSBNYXRoLmNvcyhyYWQpOyAvL3BlcmZvcm0gcm90YXRpb24gYW5kIHRyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgICBvdXRbMF0gPSBwMCAqIGNvc0MgLSBwMSAqIHNpbkMgKyBiWzBdO1xuICAgIG91dFsxXSA9IHAwICogc2luQyArIHAxICogY29zQyArIGJbMV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBhbmdsZSBiZXR3ZWVuIHR3byAyRCB2ZWN0b3JzXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIFRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIFRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICAgKi9cblxuICBmdW5jdGlvbiBhbmdsZShhLCBiKSB7XG4gICAgdmFyIHgxID0gYVswXSxcbiAgICAgICAgeTEgPSBhWzFdLFxuICAgICAgICB4MiA9IGJbMF0sXG4gICAgICAgIHkyID0gYlsxXSxcbiAgICAgICAgLy8gbWFnIGlzIHRoZSBwcm9kdWN0IG9mIHRoZSBtYWduaXR1ZGVzIG9mIGEgYW5kIGJcbiAgICBtYWcgPSBNYXRoLnNxcnQoKHgxICogeDEgKyB5MSAqIHkxKSAqICh4MiAqIHgyICsgeTIgKiB5MikpLFxuICAgICAgICAvLyBtYWcgJiYuLiBzaG9ydCBjaXJjdWl0cyBpZiBtYWcgPT0gMFxuICAgIGNvc2luZSA9IG1hZyAmJiAoeDEgKiB4MiArIHkxICogeTIpIC8gbWFnOyAvLyBNYXRoLm1pbihNYXRoLm1heChjb3NpbmUsIC0xKSwgMSkgY2xhbXBzIHRoZSBjb3NpbmUgYmV0d2VlbiAtMSBhbmQgMVxuXG4gICAgcmV0dXJuIE1hdGguYWNvcyhNYXRoLm1pbihNYXRoLm1heChjb3NpbmUsIC0xKSwgMSkpO1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMyIHRvIHplcm9cbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB6ZXJvKG91dCkge1xuICAgIG91dFswXSA9IDAuMDtcbiAgICBvdXRbMV0gPSAwLjA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0cihhKSB7XG4gICAgcmV0dXJuIFwidmVjMihcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIpXCI7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgZXhhY3RseSBoYXZlIHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4YWN0RXF1YWxzKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBlcXVhbHMoYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXTtcbiAgICB2YXIgYjAgPSBiWzBdLFxuICAgICAgICBiMSA9IGJbMV07XG4gICAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSk7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5sZW5ndGh9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbGVuID0gbGVuZ3RoO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnN1YnRyYWN0fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHN1YiA9IHN1YnRyYWN0O1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLm11bHRpcGx5fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG11bCA9IG11bHRpcGx5O1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpdmlkZX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBkaXYgPSBkaXZpZGU7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIuZGlzdGFuY2V9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZGlzdCA9IGRpc3RhbmNlO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWREaXN0YW5jZX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzcXJEaXN0ID0gc3F1YXJlZERpc3RhbmNlO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLnNxdWFyZWRMZW5ndGh9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3FyTGVuID0gc3F1YXJlZExlbmd0aDtcbiAgLyoqXG4gICAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMycy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMyLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICAgKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzJzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBmb3JFYWNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2ZWMgPSBjcmVhdGUoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgdmFyIGksIGw7XG5cbiAgICAgIGlmICghc3RyaWRlKSB7XG4gICAgICAgIHN0cmlkZSA9IDI7XG4gICAgICB9XG5cbiAgICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb3VudCkge1xuICAgICAgICBsID0gTWF0aC5taW4oY291bnQgKiBzdHJpZGUgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgICAgdmVjWzFdID0gYVtpICsgMV07XG4gICAgICAgIGZuKHZlYywgdmVjLCBhcmcpO1xuICAgICAgICBhW2ldID0gdmVjWzBdO1xuICAgICAgICBhW2kgKyAxXSA9IHZlY1sxXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciB2ZWMyID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBjcmVhdGU6IGNyZWF0ZSxcbiAgICBjbG9uZTogY2xvbmUsXG4gICAgZnJvbVZhbHVlczogZnJvbVZhbHVlcyxcbiAgICBjb3B5OiBjb3B5LFxuICAgIHNldDogc2V0LFxuICAgIGFkZDogYWRkLFxuICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCxcbiAgICBtdWx0aXBseTogbXVsdGlwbHksXG4gICAgZGl2aWRlOiBkaXZpZGUsXG4gICAgY2VpbDogY2VpbCxcbiAgICBmbG9vcjogZmxvb3IsXG4gICAgbWluOiBtaW4sXG4gICAgbWF4OiBtYXgsXG4gICAgcm91bmQ6IHJvdW5kLFxuICAgIHNjYWxlOiBzY2FsZSxcbiAgICBzY2FsZUFuZEFkZDogc2NhbGVBbmRBZGQsXG4gICAgZGlzdGFuY2U6IGRpc3RhbmNlLFxuICAgIHNxdWFyZWREaXN0YW5jZTogc3F1YXJlZERpc3RhbmNlLFxuICAgIGxlbmd0aDogbGVuZ3RoLFxuICAgIHNxdWFyZWRMZW5ndGg6IHNxdWFyZWRMZW5ndGgsXG4gICAgbmVnYXRlOiBuZWdhdGUsXG4gICAgaW52ZXJzZTogaW52ZXJzZSxcbiAgICBub3JtYWxpemU6IG5vcm1hbGl6ZSxcbiAgICBkb3Q6IGRvdCxcbiAgICBjcm9zczogY3Jvc3MsXG4gICAgbGVycDogbGVycCxcbiAgICByYW5kb206IHJhbmRvbSxcbiAgICB0cmFuc2Zvcm1NYXQyOiB0cmFuc2Zvcm1NYXQyLFxuICAgIHRyYW5zZm9ybU1hdDJkOiB0cmFuc2Zvcm1NYXQyZCxcbiAgICB0cmFuc2Zvcm1NYXQzOiB0cmFuc2Zvcm1NYXQzLFxuICAgIHRyYW5zZm9ybU1hdDQ6IHRyYW5zZm9ybU1hdDQsXG4gICAgcm90YXRlOiByb3RhdGUsXG4gICAgYW5nbGU6IGFuZ2xlLFxuICAgIHplcm86IHplcm8sXG4gICAgc3RyOiBzdHIsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzLFxuICAgIGVxdWFsczogZXF1YWxzLFxuICAgIGxlbjogbGVuLFxuICAgIHN1Yjogc3ViLFxuICAgIG11bDogbXVsLFxuICAgIGRpdjogZGl2LFxuICAgIGRpc3Q6IGRpc3QsXG4gICAgc3FyRGlzdDogc3FyRGlzdCxcbiAgICBzcXJMZW46IHNxckxlbixcbiAgICBmb3JFYWNoOiBmb3JFYWNoXG4gIH0pO1xuXG4gIGV4cG9ydHMuZ2xNYXRyaXggPSBjb21tb247XG4gIGV4cG9ydHMubWF0MiA9IG1hdDI7XG4gIGV4cG9ydHMubWF0MmQgPSBtYXQyZDtcbiAgZXhwb3J0cy5tYXQzID0gbWF0MztcbiAgZXhwb3J0cy5tYXQ0ID0gbWF0NDtcbiAgZXhwb3J0cy5xdWF0ID0gcXVhdDtcbiAgZXhwb3J0cy5xdWF0MiA9IHF1YXQyO1xuICBleHBvcnRzLnZlYzIgPSB2ZWMyO1xuICBleHBvcnRzLnZlYzMgPSB2ZWMzO1xuICBleHBvcnRzLnZlYzQgPSB2ZWM0O1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IENIVU5LX1NJWkUsIE1BUF9IRUlHSFQsIE1BUF9TSVpFLCBOT0lTRV9DT1VOVCB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vR2FtZVwiO1xuXG5jb25zdCBmcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZwc1wiKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuY29uc3QgbWFwX2hlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdNQVBfSEVJR0hUJykgYXMgSFRNTERpdkVsZW1lbnQ7XG5jb25zdCBjaHVua19zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NIVU5LX1NJWkUnKSBhcyBIVE1MRGl2RWxlbWVudDtcbmNvbnN0IG1hcF9zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ01BUF9TSVpFJykgYXMgSFRNTERpdkVsZW1lbnQ7XG5jb25zdCBub2lzZV9jb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOT0lTRV9DT1VOVCcpIGFzIEhUTUxEaXZFbGVtZW50O1xuXG5tYXBfaGVpZ2h0LmlubmVyVGV4dCA9IE1BUF9IRUlHSFQudG9TdHJpbmcoKTtcbmNodW5rX3NpemUuaW5uZXJUZXh0ID0gQ0hVTktfU0laRS50b1N0cmluZygpO1xubWFwX3NpemUuaW5uZXJUZXh0ID0gTUFQX1NJWkUudG9TdHJpbmcoKTtcbm5vaXNlX2NvdW50LmlubmVyVGV4dCA9IE5PSVNFX0NPVU5ULnRvU3RyaW5nKCk7XG5cbmxldCBwcmV2ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5sZXQgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZSgnY2FudmFzJyk7XG5cbmZ1bmN0aW9uIHRpY2soKSB7XG5cdG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG5cdGZwcy5pbm5lclRleHQgPSAoMTAwMCAvIChub3cgLSBwcmV2KSkudG9GaXhlZCgwKTtcblxuXHRwcmV2ID0gbm93O1xuXG5cdGdhbWUuZHJhdygpO1xuXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9