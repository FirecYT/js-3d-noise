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
        console.log(performance.now());
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
        console.log(performance.now());
        debugger;
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
const _randXYZCache = new Map();
function _randXYZ(x, y, z) {
    const key = `${x}_${z}_${y}`;
    if (!_randXYZCache.has(key)) {
        _randXYZCache.set(key, _randXYZ(x, z, y));
    }
    return _randXYZCache.get(key);
}
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
const _noiseCache = new Map();
function _noise(x, z, y, noise_count = _config__WEBPACK_IMPORTED_MODULE_0__.NOISE_COUNT) {
    const key = `${x}_${z}_${y}_${noise_count}`;
    if (!_noiseCache.has(key)) {
        _noiseCache.set(key, _noise(x, z, y, noise_count));
    }
    return _noiseCache.get(key);
}
function noise(x, z, y, noise_count = _config__WEBPACK_IMPORTED_MODULE_0__.NOISE_COUNT) {
    let result = 0;
    for (let i = 2; i < noise_count + 2; i++) {
        const tmp = bicubicRandXYZ((x + 3418731287) / (2 ** i), (y - 1376312589) / (2 ** i), (z + 132897987) / (2 ** i));
        result += tmp;
    }
    return result / noise_count;
}
// ===== cubicInterpolate =====
const _cubicInterpolateCache = new Map();
function _cubicInterpolate(p0, p1, p2, p3, t) {
    const key = `${p0}_${p1}_${p2}_${p3}_${t}`;
    if (!_cubicInterpolateCache.has(key)) {
        _cubicInterpolateCache.set(key, _cubicInterpolate(p0, p1, p2, p3, t));
    }
    return _cubicInterpolateCache.get(key);
}
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
const MAP_HEIGHT = 64;
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
    game.renderer.transform.angle.y += 0.01;
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDOVUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzlVLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUM5VSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDOVUsQ0FBQztJQUVGLDBDQUEwQztJQUMxQyxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENB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QixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoSixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDaEosTUFBTSxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2xKLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFF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YyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVyQixLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWxDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbkIsQ0FBQztDQUNEOzs7Ozs7Ozs7Ozs7Ozs7O0FDckcrQjtBQUVqQixNQUFNLFNBQVM7SUFDdEIsUUFBUSxDQUFVO0lBQ2xCLEtBQUssQ0FBVTtJQUNmLEtBQUssQ0FBVTtJQUV0QixZQUFZLFdBQW9CLGdEQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBaUIsZ0RBQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxRQUFpQixJQUFJLGdEQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckgsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdEQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7OztBQ2hCYyxNQUFNLE9BQU87SUFDUjtJQUFrQjtJQUFrQjtJQUF2RCxZQUFtQixDQUFTLEVBQVMsQ0FBUyxFQUFTLENBQVM7UUFBN0MsTUFBQyxHQUFELENBQUMsQ0FBUTtRQUFTLE1BQUMsR0FBRCxDQUFDLENBQVE7UUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO0lBQUksQ0FBQztJQUVyRSxNQUFNLENBQUMsSUFBSTtRQUNWLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOTSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVuQixNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFFdEIsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDOzs7Ozs7O1VDTnhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOYTtBQUVhO0FBRTFCLE1BQU0sSUFBSSxHQUFHLElBQUksNkNBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVoQyxTQUFTLElBQUk7SUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFWixJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUV4QyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9CbG9jay50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9DaHVuay50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL1JhbmRvbWl6ZXIudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvVHJhbnNmb3JtLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL1ZlY3RvcjMudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly8zZF9ub2ljZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLzNkX25vaWNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gQmxvY2tUeXBlIHtcblx0RU1QVFksXG5cdFNPTElELFxuXHRDQVZFXG59XG5cbmV4cG9ydCBjbGFzcyBCbG9jayB7XG5cdHB1YmxpYyB0eXBlOiBCbG9ja1R5cGU7XG5cblx0Y29uc3RydWN0b3IodHlwZTogQmxvY2tUeXBlKSB7XG5cdFx0dGhpcy50eXBlID0gdHlwZTtcblx0fVxufVxuIiwiaW1wb3J0IHsgQmxvY2ssIEJsb2NrVHlwZSB9IGZyb20gXCIuL0Jsb2NrXCI7XG5pbXBvcnQgeyBDSFVOS19TSVpFLCBNQVBfSEVJR0hULCBOT0lTRV9DT1VOVCB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuaW1wb3J0IHsgYmljdWJpY1JhbmRYWVosIG5vaXNlIH0gZnJvbSBcIi4vUmFuZG9taXplclwiO1xuaW1wb3J0IFRyYW5zZm9ybSBmcm9tIFwiLi9UcmFuc2Zvcm1cIjtcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuL1ZlY3RvcjNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2h1bmsge1xuXHRwdWJsaWMgdHJhbnNmb3JtOiBUcmFuc2Zvcm07XG5cdHB1YmxpYyBkYXRhOiBCbG9ja1tdW11bXTtcblxuXHRjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdHRoaXMudHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybShuZXcgVmVjdG9yMyh4ICogQ0hVTktfU0laRSwgMCwgeiAqIENIVU5LX1NJWkUpKTtcblx0XHR0aGlzLmRhdGEgPSB0aGlzLmluaXRpYWxpemVEYXRhKCk7XG5cdFx0dGhpcy5nZW5lcmF0ZUxhbmRzY2FwZSgpO1xuXHRcdHRoaXMuZ2VuZXJhdGVDYXZlcygpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbml0aWFsaXplRGF0YSgpOiBCbG9ja1tdW11bXSB7XG5cdFx0Y29uc3QgZGF0YTogQmxvY2tbXVtdW10gPSBbXTtcblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IENIVU5LX1NJWkU7IHgrKykge1xuXHRcdFx0ZGF0YVt4XSA9IFtdO1xuXHRcdFx0Zm9yIChsZXQgeiA9IDA7IHogPCBDSFVOS19TSVpFOyB6KyspIHtcblx0XHRcdFx0ZGF0YVt4XVt6XSA9IFtdO1xuXHRcdFx0XHRmb3IgKGxldCB5ID0gMDsgeSA8IE1BUF9IRUlHSFQ7IHkrKykge1xuXHRcdFx0XHRcdGRhdGFbeF1bel1beV0gPSBuZXcgQmxvY2soQmxvY2tUeXBlLkVNUFRZKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdHByaXZhdGUgZ2VuZXJhdGVMYW5kc2NhcGUoKSB7XG5cdFx0Zm9yIChsZXQgeCA9IDA7IHggPCBDSFVOS19TSVpFOyB4KyspIHtcblx0XHRcdGZvciAobGV0IHogPSAwOyB6IDwgQ0hVTktfU0laRTsgeisrKSB7XG5cdFx0XHRcdGNvbnN0IHJhbmRvbSA9IG5vaXNlKFxuXHRcdFx0XHRcdHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnggKyB4LFxuXHRcdFx0XHRcdHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnogKyB6LFxuXHRcdFx0XHRcdDBcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRjb25zdCBoZWlnaHQgPSBNYXRoLmZsb29yKHJhbmRvbSAqIE1BUF9IRUlHSFQgLyAyICsgTUFQX0hFSUdIVCAvIDIpO1xuXG5cdFx0XHRcdGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcblx0XHRcdFx0XHR0aGlzLmRhdGFbeF1bel1beV0gPSBuZXcgQmxvY2soQmxvY2tUeXBlLlNPTElEKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZ2VuZXJhdGVDYXZlcygpIHtcblx0XHRjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSk7XG5cdFx0Zm9yIChsZXQgYmxvY2tfeCA9IDA7IGJsb2NrX3ggPCBDSFVOS19TSVpFOyBibG9ja194KyspIHtcblx0XHRcdGZvciAobGV0IGJsb2NrX3ogPSAwOyBibG9ja196IDwgQ0hVTktfU0laRTsgYmxvY2tfeisrKSB7XG5cdFx0XHRcdGZvciAobGV0IGJsb2NrX3kgPSAwOyBibG9ja195IDwgTUFQX0hFSUdIVDsgYmxvY2tfeSsrKSB7XG5cdFx0XHRcdFx0Y29uc3QgcmFuZG9tID0gbm9pc2UoXG5cdFx0XHRcdFx0XHR0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi54ICsgYmxvY2tfeCxcblx0XHRcdFx0XHRcdHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnogKyBibG9ja196LFxuXHRcdFx0XHRcdFx0YmxvY2tfeSxcblx0XHRcdFx0XHRcdE5PSVNFX0NPVU5UIC8gNFxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHRsZXQgZmFjdCA9IDE7XG5cblx0XHRcdFx0XHRpZiAoYmxvY2tfeSA8IDMyKSB7XG5cdFx0XHRcdFx0XHRmYWN0ID0gTWF0aC5tYXgoMCwgYmxvY2tfeSAvIDMyKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChibG9ja195ID4gTUFQX0hFSUdIVCAvIDIpIHtcblx0XHRcdFx0XHRcdGZhY3QgPSBNYXRoLm1heCgwLCAxIC0gKGJsb2NrX3kgLSBNQVBfSEVJR0hUIC8gMikgLyAoTUFQX0hFSUdIVCAvIDIpKVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0aGlzLmRhdGFbYmxvY2tfeF1bYmxvY2tfel1bYmxvY2tfeV0udHlwZSAhPSBCbG9ja1R5cGUuRU1QVFkgJiYgcmFuZG9tICoqIDIgPCAwLjE1ICogZmFjdCkge1xuXHRcdFx0XHRcdFx0dGhpcy5kYXRhW2Jsb2NrX3hdW2Jsb2NrX3pdW2Jsb2NrX3ldLnR5cGUgPSBCbG9ja1R5cGUuQ0FWRTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zb2xlLmxvZyhwZXJmb3JtYW5jZS5ub3coKSk7XG5cblx0XHRkZWJ1Z2dlcjtcblx0fVxufVxuIiwiaW1wb3J0IHsgQmxvY2tUeXBlIH0gZnJvbSBcIi4vQmxvY2tcIjtcbmltcG9ydCBDaHVuayBmcm9tIFwiLi9DaHVua1wiO1xuaW1wb3J0IHsgQ0hVTktfU0laRSwgTUFQX0hFSUdIVCwgTUFQX1NJWkUgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9SZW5kZXJlclwiO1xuaW1wb3J0IFRyYW5zZm9ybSBmcm9tIFwiLi9UcmFuc2Zvcm1cIjtcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuL1ZlY3RvcjNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG5cdHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblx0cHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjtcblx0cHJpdmF0ZSBjaHVua3M6IENodW5rW107XG5cblx0Y29uc3RydWN0b3IoY2FudmFzSWQ6IHN0cmluZykge1xuXHRcdHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXHRcdHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIodGhpcy5jYW52YXMpO1xuXHRcdHRoaXMuY2h1bmtzID0gdGhpcy5nZW5lcmF0ZUNodW5rcygpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZUNodW5rcygpOiBDaHVua1tdIHtcblx0XHRjb25zdCBjaHVua3M6IENodW5rW10gPSBbXTtcblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IE1BUF9TSVpFOyB4KyspIHtcblx0XHRcdGZvciAobGV0IHogPSAwOyB6IDwgTUFQX1NJWkU7IHorKykge1xuXHRcdFx0XHRjaHVua3MucHVzaChuZXcgQ2h1bmsoeCwgeikpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2h1bmtzO1xuXHR9XG5cblx0cHVibGljIGRyYXcoKSB7XG5cdFx0dGhpcy5yZW5kZXJlci5jbGVhclNjcmVlbih0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuXHRcdGZvciAoY29uc3QgY2h1bmsgb2YgdGhpcy5jaHVua3MpIHtcblx0XHRcdGZvciAobGV0IGJsb2NrX3ggPSAwOyBibG9ja194IDwgQ0hVTktfU0laRTsgYmxvY2tfeCsrKSB7XG5cdFx0XHRcdGZvciAobGV0IGJsb2NrX3ogPSAwOyBibG9ja196IDwgQ0hVTktfU0laRTsgYmxvY2tfeisrKSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgYmxvY2tfeSA9IDA7IGJsb2NrX3kgPCBNQVBfSEVJR0hUOyBibG9ja195KyspIHtcblxuXHRcdFx0XHRcdFx0Y29uc3QgYmxvY2sgPSBjaHVuay5kYXRhW2Jsb2NrX3hdW2Jsb2NrX3pdW2Jsb2NrX3ldO1xuXG5cdFx0XHRcdFx0XHRpZiAoYmxvY2sudHlwZSAhPT0gQmxvY2tUeXBlLkVNUFRZKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm0oXG5cdFx0XHRcdFx0XHRcdFx0bmV3IFZlY3RvcjMoXG5cdFx0XHRcdFx0XHRcdFx0XHRjaHVuay50cmFuc2Zvcm0ucG9zaXRpb24ueCArIGJsb2NrX3gsXG5cdFx0XHRcdFx0XHRcdFx0XHRibG9ja195LFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2h1bmsudHJhbnNmb3JtLnBvc2l0aW9uLnogKyBibG9ja196XG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRcdHN3aXRjaCAoYmxvY2sudHlwZSkge1xuXHRcdFx0XHRcdFx0XHRcdGNhc2UgQmxvY2tUeXBlLlNPTElEOlxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5jaGFuZ2VDb2xvcihgcmdiKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQke01hdGguZmxvb3IoMjU1ICogKGJsb2NrX3kgLyBNQVBfSEVJR0hUKSl9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQke01hdGguZmxvb3IoMjU1ICogKGJsb2NrX3kgLyBNQVBfSEVJR0hUKSl9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHQke01hdGguZmxvb3IoMjU1ICogKGJsb2NrX3kgLyBNQVBfSEVJR0hUKSl9XG5cdFx0XHRcdFx0XHRcdFx0XHQpYCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0XHRjYXNlIEJsb2NrVHlwZS5DQVZFOlxuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5yZW5kZXJlci5jaGFuZ2VDb2xvcihgcmdiYSgwLCAwLCAwLCAwLjUpYCk7XG5cdFx0XHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHRoaXMucmVuZGVyZXIuZHJhd0N1YmUodHJhbnNmb3JtKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB7IE5PSVNFX0NPVU5UIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbmNvbnN0IFNFRUQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMTQ3NDgzNjQ3KSA+Pj4gMDtcblxuY29uc29sZS5sb2coU0VFRCk7XG5cbi8vID09PT09IG5vaXNlID09PT09XG5cbmNvbnN0IF9yYW5kWFlaQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG5mdW5jdGlvbiBfcmFuZFhZWih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogbnVtYmVyIHtcblx0Y29uc3Qga2V5ID0gYCR7eH1fJHt6fV8ke3l9YDtcblxuXHRpZiAoIV9yYW5kWFlaQ2FjaGUuaGFzKGtleSkpIHtcblx0XHRfcmFuZFhZWkNhY2hlLnNldChrZXksIF9yYW5kWFlaKHgsIHosIHkpKTtcblx0fVxuXG5cdHJldHVybiBfcmFuZFhZWkNhY2hlLmdldChrZXkpIGFzIG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRYWVooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IG51bWJlciB7XG5cdGxldCBuID0gKHggKiAzNDE4NzMxMjg3ICsgeSAqIDEzMjg5Nzk4NyArIHogKiAxMzc2MzEyNTg5ICsgU0VFRCkgPj4+IDA7XG5cblx0biA9IChuIF4gKG4gPj4gMjEpKSA+Pj4gMDtcblx0biA9IChuIF4gKG4gPDwgMzUpKSA+Pj4gMDtcblx0biA9IChuIF4gKG4gPj4gNCkpID4+PiAwO1xuXHRuID0gKG4gKiAyNjg1ODIxNjU3NzMpID4+PiAwO1xuXHRuID0gKG4gXiAobiA+PiAxNSkpID4+PiAwO1xuXG5cdHJldHVybiBuICUgMjU2IC8gMjU2O1xufVxuXG4vLyA9PT09PSBub2lzZSA9PT09PVxuXG5jb25zdCBfbm9pc2VDYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbmZ1bmN0aW9uIF9ub2lzZSh4OiBudW1iZXIsIHo6IG51bWJlciwgeTogbnVtYmVyLCBub2lzZV9jb3VudDogbnVtYmVyID0gTk9JU0VfQ09VTlQpOiBudW1iZXIge1xuXHRjb25zdCBrZXkgPSBgJHt4fV8ke3p9XyR7eX1fJHtub2lzZV9jb3VudH1gO1xuXG5cdGlmICghX25vaXNlQ2FjaGUuaGFzKGtleSkpIHtcblx0XHRfbm9pc2VDYWNoZS5zZXQoa2V5LCBfbm9pc2UoeCwgeiwgeSwgbm9pc2VfY291bnQpKTtcblx0fVxuXG5cdHJldHVybiBfbm9pc2VDYWNoZS5nZXQoa2V5KSBhcyBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub2lzZSh4OiBudW1iZXIsIHo6IG51bWJlciwgeTogbnVtYmVyLCBub2lzZV9jb3VudDogbnVtYmVyID0gTk9JU0VfQ09VTlQpOiBudW1iZXIge1xuXHRsZXQgcmVzdWx0ID0gMDtcblxuXHRmb3IgKGxldCBpID0gMjsgaSA8IG5vaXNlX2NvdW50ICsgMjsgaSsrKSB7XG5cdFx0Y29uc3QgdG1wID0gYmljdWJpY1JhbmRYWVooXG5cdFx0XHQoeCArIDM0MTg3MzEyODcpIC8gKDIgKiogaSksXG5cdFx0XHQoeSAtIDEzNzYzMTI1ODkpIC8gKDIgKiogaSksXG5cdFx0XHQoeiArIDEzMjg5Nzk4NykgLyAoMiAqKiBpKVxuXHRcdCk7XG5cblx0XHRyZXN1bHQgKz0gdG1wO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdCAvIG5vaXNlX2NvdW50O1xufVxuXG4vLyA9PT09PSBjdWJpY0ludGVycG9sYXRlID09PT09XG5cbmNvbnN0IF9jdWJpY0ludGVycG9sYXRlQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG5mdW5jdGlvbiBfY3ViaWNJbnRlcnBvbGF0ZShwMDogbnVtYmVyLCBwMTogbnVtYmVyLCBwMjogbnVtYmVyLCBwMzogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuXHRjb25zdCBrZXkgPSBgJHtwMH1fJHtwMX1fJHtwMn1fJHtwM31fJHt0fWA7XG5cblx0aWYgKCFfY3ViaWNJbnRlcnBvbGF0ZUNhY2hlLmhhcyhrZXkpKSB7XG5cdFx0X2N1YmljSW50ZXJwb2xhdGVDYWNoZS5zZXQoa2V5LCBfY3ViaWNJbnRlcnBvbGF0ZShwMCwgcDEsIHAyLCBwMywgdCkpO1xuXHR9XG5cblx0cmV0dXJuIF9jdWJpY0ludGVycG9sYXRlQ2FjaGUuZ2V0KGtleSkgYXMgbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBjdWJpY0ludGVycG9sYXRlKHAwOiBudW1iZXIsIHAxOiBudW1iZXIsIHAyOiBudW1iZXIsIHAzOiBudW1iZXIsIHQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgYSA9IC0wLjUgKiBwMCArIDEuNSAqIHAxIC0gMS41ICogcDIgKyAwLjUgKiBwMztcbiAgICBjb25zdCBiID0gcDAgLSAyLjUgKiBwMSArIDIgKiBwMiAtIDAuNSAqIHAzO1xuICAgIGNvbnN0IGMgPSAtMC41ICogcDAgKyAwLjUgKiBwMjtcbiAgICBjb25zdCBkID0gcDE7XG5cblx0cmV0dXJuIGEgKiB0ICogdCAqIHQgKyBiICogdCAqIHQgKyBjICogdCArIGQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiaWN1YmljUmFuZFhZWih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogbnVtYmVyIHtcblx0Y29uc3QgeGIgPSBNYXRoLmZsb29yKHgpO1xuXG5cdGNvbnN0IHgwID0geGIgLSAxO1xuXHRjb25zdCB4MSA9IHhiICsgMDtcblx0Y29uc3QgeDIgPSB4YiArIDE7XG5cdGNvbnN0IHgzID0geGIgKyAyO1xuXG5cdGNvbnN0IHliID0gTWF0aC5mbG9vcih5KTtcblxuXHRjb25zdCB5MCA9IHliIC0gMTtcblx0Y29uc3QgeTEgPSB5YiArIDA7XG5cdGNvbnN0IHkyID0geWIgKyAxO1xuXHRjb25zdCB5MyA9IHliICsgMjtcblxuXHRjb25zdCB6YiA9IE1hdGguZmxvb3Ioeik7XG5cblx0Y29uc3QgejAgPSB6YiAtIDE7XG5cdGNvbnN0IHoxID0gemIgKyAwO1xuXHRjb25zdCB6MiA9IHpiICsgMTtcblx0Y29uc3QgejMgPSB6YiArIDI7XG5cblx0Ly8g0J/QvtC70YPRh9Cw0LXQvCDQt9C90LDRh9C10L3QuNGPIFwi0YjRg9C80L7QslwiINC00LvRjyAxNiDRgdC+0YHQtdC00L3QuNGFINGC0L7Rh9C10Lpcblx0Y29uc3Qgbm9pc2VWYWx1ZXMgPSBbXG5cdFx0cmFuZFhZWih4MCwgeTAsIHowKSwgcmFuZFhZWih4MSwgeTAsIHowKSwgcmFuZFhZWih4MiwgeTAsIHowKSwgcmFuZFhZWih4MywgeTAsIHowKSwgcmFuZFhZWih4MCwgeTEsIHowKSwgcmFuZFhZWih4MSwgeTEsIHowKSwgcmFuZFhZWih4MiwgeTEsIHowKSwgcmFuZFhZWih4MywgeTEsIHowKSwgcmFuZFhZWih4MCwgeTIsIHowKSwgcmFuZFhZWih4MSwgeTIsIHowKSwgcmFuZFhZWih4MiwgeTIsIHowKSwgcmFuZFhZWih4MywgeTIsIHowKSwgcmFuZFhZWih4MCwgeTMsIHowKSwgcmFuZFhZWih4MSwgeTMsIHowKSwgcmFuZFhZWih4MiwgeTMsIHowKSwgcmFuZFhZWih4MywgeTMsIHowKSxcblx0XHRyYW5kWFlaKHgwLCB5MCwgejEpLCByYW5kWFlaKHgxLCB5MCwgejEpLCByYW5kWFlaKHgyLCB5MCwgejEpLCByYW5kWFlaKHgzLCB5MCwgejEpLCByYW5kWFlaKHgwLCB5MSwgejEpLCByYW5kWFlaKHgxLCB5MSwgejEpLCByYW5kWFlaKHgyLCB5MSwgejEpLCByYW5kWFlaKHgzLCB5MSwgejEpLCByYW5kWFlaKHgwLCB5MiwgejEpLCByYW5kWFlaKHgxLCB5MiwgejEpLCByYW5kWFlaKHgyLCB5MiwgejEpLCByYW5kWFlaKHgzLCB5MiwgejEpLCByYW5kWFlaKHgwLCB5MywgejEpLCByYW5kWFlaKHgxLCB5MywgejEpLCByYW5kWFlaKHgyLCB5MywgejEpLCByYW5kWFlaKHgzLCB5MywgejEpLFxuXHRcdHJhbmRYWVooeDAsIHkwLCB6MiksIHJhbmRYWVooeDEsIHkwLCB6MiksIHJhbmRYWVooeDIsIHkwLCB6MiksIHJhbmRYWVooeDMsIHkwLCB6MiksIHJhbmRYWVooeDAsIHkxLCB6MiksIHJhbmRYWVooeDEsIHkxLCB6MiksIHJhbmRYWVooeDIsIHkxLCB6MiksIHJhbmRYWVooeDMsIHkxLCB6MiksIHJhbmRYWVooeDAsIHkyLCB6MiksIHJhbmRYWVooeDEsIHkyLCB6MiksIHJhbmRYWVooeDIsIHkyLCB6MiksIHJhbmRYWVooeDMsIHkyLCB6MiksIHJhbmRYWVooeDAsIHkzLCB6MiksIHJhbmRYWVooeDEsIHkzLCB6MiksIHJhbmRYWVooeDIsIHkzLCB6MiksIHJhbmRYWVooeDMsIHkzLCB6MiksXG5cdFx0cmFuZFhZWih4MCwgeTAsIHozKSwgcmFuZFhZWih4MSwgeTAsIHozKSwgcmFuZFhZWih4MiwgeTAsIHozKSwgcmFuZFhZWih4MywgeTAsIHozKSwgcmFuZFhZWih4MCwgeTEsIHozKSwgcmFuZFhZWih4MSwgeTEsIHozKSwgcmFuZFhZWih4MiwgeTEsIHozKSwgcmFuZFhZWih4MywgeTEsIHozKSwgcmFuZFhZWih4MCwgeTIsIHozKSwgcmFuZFhZWih4MSwgeTIsIHozKSwgcmFuZFhZWih4MiwgeTIsIHozKSwgcmFuZFhZWih4MywgeTIsIHozKSwgcmFuZFhZWih4MCwgeTMsIHozKSwgcmFuZFhZWih4MSwgeTMsIHozKSwgcmFuZFhZWih4MiwgeTMsIHozKSwgcmFuZFhZWih4MywgeTMsIHozKSxcblx0XTtcblxuXHQvLyDQmNC90YLQtdGA0L/QvtC70LjRgNGD0LXQvCDQv9C+ICd5JyDQv9C+INGH0LXRgtGL0YDQtdC8INGB0YLRgNC+0LrQsNC8XG5cdGNvbnN0IHNsaWNlMHJvdzAgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMCArIDBdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxXSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMl0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDNdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTByb3cxID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDAgKyA0XSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgNV0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDZdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyA3XSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uwcm93MiA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAwICsgOF0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDldLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxMF0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDExXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uwcm93MyA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAwICsgMTJdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxM10sIG5vaXNlVmFsdWVzWzE2ICogMCArIDE0XSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMTVdLCB4IC0geGIpO1xuXG5cdGNvbnN0IHNsaWNlMXJvdzAgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMSArIDBdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxXSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMl0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDNdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTFyb3cxID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDEgKyA0XSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgNV0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDZdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyA3XSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uxcm93MiA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAxICsgOF0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDldLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxMF0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDExXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uxcm93MyA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAxICsgMTJdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxM10sIG5vaXNlVmFsdWVzWzE2ICogMSArIDE0XSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMTVdLCB4IC0geGIpO1xuXG5cdGNvbnN0IHNsaWNlMnJvdzAgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMiArIDBdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxXSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMl0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDNdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTJyb3cxID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDIgKyA0XSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgNV0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDZdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyA3XSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uycm93MiA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAyICsgOF0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDldLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxMF0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDExXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uycm93MyA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAyICsgMTJdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxM10sIG5vaXNlVmFsdWVzWzE2ICogMiArIDE0XSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMTVdLCB4IC0geGIpO1xuXG5cdGNvbnN0IHNsaWNlM3JvdzAgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMyArIDBdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxXSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMl0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDNdLCB4IC0geGIpO1xuXHRjb25zdCBzbGljZTNyb3cxID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDMgKyA0XSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgNV0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDZdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyA3XSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uzcm93MiA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAzICsgOF0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDldLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxMF0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDExXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uzcm93MyA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAzICsgMTJdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxM10sIG5vaXNlVmFsdWVzWzE2ICogMyArIDE0XSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMTVdLCB4IC0geGIpO1xuXG5cdGNvbnN0IHNsaWNlMCA9IGN1YmljSW50ZXJwb2xhdGUoc2xpY2Uwcm93MCwgc2xpY2Uwcm93MSwgc2xpY2Uwcm93Miwgc2xpY2Uwcm93MywgeSAtIHliKTtcblx0Y29uc3Qgc2xpY2UxID0gY3ViaWNJbnRlcnBvbGF0ZShzbGljZTFyb3cwLCBzbGljZTFyb3cxLCBzbGljZTFyb3cyLCBzbGljZTFyb3czLCB5IC0geWIpO1xuXHRjb25zdCBzbGljZTIgPSBjdWJpY0ludGVycG9sYXRlKHNsaWNlMnJvdzAsIHNsaWNlMnJvdzEsIHNsaWNlMnJvdzIsIHNsaWNlMnJvdzMsIHkgLSB5Yik7XG5cdGNvbnN0IHNsaWNlMyA9IGN1YmljSW50ZXJwb2xhdGUoc2xpY2Uzcm93MCwgc2xpY2Uzcm93MSwgc2xpY2Uzcm93Miwgc2xpY2Uzcm93MywgeSAtIHliKTtcblxuXHQvLyDQmNC90YLQtdGA0L/QvtC70LjRgNGD0LXQvCDQv9C+ICd4JyDQv9C+INGH0LXRgtGL0YDQtdC8INGB0YLRgNC+0LrQsNC8XG5cdHJldHVybiBjdWJpY0ludGVycG9sYXRlKHNsaWNlMCwgc2xpY2UxLCBzbGljZTIsIHNsaWNlMywgeiAtIHpiKTtcbn1cblxuY29uc29sZS5sb2coYmljdWJpY1JhbmRYWVopO1xuIiwiaW1wb3J0IHsgQ0hVTktfU0laRSwgTUFQX0hFSUdIVCwgTUFQX1NJWkUsIFNDQUxFIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgVHJhbnNmb3JtIGZyb20gXCIuL1RyYW5zZm9ybVwiO1xuaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4vVmVjdG9yM1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlciB7XG5cdHB1YmxpYyB0cmFuc2Zvcm06IFRyYW5zZm9ybTtcblx0cHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcblxuXHRjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG5cdFx0dGhpcy50cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKFxuXHRcdFx0bmV3IFZlY3RvcjMoTUFQX1NJWkUgLyAyICogQ0hVTktfU0laRSwgTUFQX0hFSUdIVCwgTUFQX1NJWkUgLyAyICogQ0hVTktfU0laRSksXG5cdFx0XHRuZXcgVmVjdG9yMyg0MCAqIE1hdGguUEkgLyAxODAsIDQ1ICogTWF0aC5QSSAvIDE4MCwgMClcblx0XHQpO1xuXHRcdHRoaXMuY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykgYXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuXG5cdFx0dGhpcy5jdHgudHJhbnNsYXRlKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyKTtcblx0XHR0aGlzLmN0eC5zY2FsZShTQ0FMRSwgU0NBTEUpO1xuXHRcdHRoaXMuY3R4LmxpbmVXaWR0aCA9IDEgLyBTQ0FMRTtcblx0XHR0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGByZ2JhKDAsIDAsIDAsIDEpYDtcblx0fVxuXG5cdGNoYW5nZUNvbG9yKGNvbG9yOiBzdHJpbmcgfCBDYW52YXNHcmFkaWVudCB8IENhbnZhc1BhdHRlcm4pIHtcblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblx0fVxuXG5cdGRyYXdDdWJlKHRyYW5zZm9ybTogVHJhbnNmb3JtKSB7XG5cdFx0Ly8gY29uc3QgY29vcmRzID0gdGhpcy5pc29tZXRyaWNDb29yZCh0cmFuc2Zvcm0ucG9zaXRpb24ueCwgLXRyYW5zZm9ybS5wb3NpdGlvbi55LCB0cmFuc2Zvcm0ucG9zaXRpb24ueik7XG5cdFx0dGhpcy5fZHJhd0N1YmUoXG5cdFx0XHR0cmFuc2Zvcm0ucG9zaXRpb24ueCAtIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLngsXG5cdFx0XHR0cmFuc2Zvcm0ucG9zaXRpb24ueSAtIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnksXG5cdFx0XHR0cmFuc2Zvcm0ucG9zaXRpb24ueiAtIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnpcblx0XHQpO1xuXHRcdC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRyYW5zZm9ybS5wb3NpdGlvbi54LCB0cmFuc2Zvcm0ucG9zaXRpb24ueiwgMSwgMSk7XG5cdH1cblxuXHRjbGVhclNjcmVlbih3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xuXHRcdHRoaXMuY2hhbmdlQ29sb3IoJyM0NDQnKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QoLXdpZHRoIC8gMiwgLWhlaWdodCAvIDIsIHdpZHRoLCBoZWlnaHQpO1xuXHR9XG5cblx0aXNvbWV0cmljQ29vcmQoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdGNvbnN0IGFscGhhX2FuZ2xlID0gdGhpcy50cmFuc2Zvcm0uYW5nbGUueDtcblx0XHRjb25zdCBiZXRhX2FuZ2xlICA9IHRoaXMudHJhbnNmb3JtLmFuZ2xlLnk7XG5cblx0XHRjb25zdCBpc29tZXRyaWNfbWF0cml4ID0gW1xuXHRcdFx0WyBNYXRoLmNvcyhiZXRhX2FuZ2xlKSwgICAgICAgICAgICAgICAgICAgICAgICAgIDAsICAgICAgICAgICAgICAgICAgICAgLU1hdGguc2luKGJldGFfYW5nbGUpICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG5cdFx0XHRbIE1hdGguc2luKGFscGhhX2FuZ2xlKSAqIE1hdGguc2luKGJldGFfYW5nbGUpLCAgTWF0aC5jb3MoYWxwaGFfYW5nbGUpLCAgTWF0aC5zaW4oYWxwaGFfYW5nbGUpICogTWF0aC5jb3MoYmV0YV9hbmdsZSkgXSxcblx0XHRcdFsgTWF0aC5jb3MoYWxwaGFfYW5nbGUpICogTWF0aC5zaW4oYmV0YV9hbmdsZSksIC1NYXRoLnNpbihhbHBoYV9hbmdsZSksICBNYXRoLmNvcyhhbHBoYV9hbmdsZSkgKiBNYXRoLmNvcyhiZXRhX2FuZ2xlKSBdXG5cdFx0XTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR4OiBpc29tZXRyaWNfbWF0cml4WzBdWzBdICogeCArIGlzb21ldHJpY19tYXRyaXhbMF1bMV0gKiB5ICsgaXNvbWV0cmljX21hdHJpeFswXVsyXSAqIHosXG5cdFx0XHR5OiBpc29tZXRyaWNfbWF0cml4WzFdWzBdICogeCArIGlzb21ldHJpY19tYXRyaXhbMV1bMV0gKiB5ICsgaXNvbWV0cmljX21hdHJpeFsxXVsyXSAqIHosXG5cdFx0fVxuXHR9XG5cblx0cHJpdmF0ZSBfZHJhd0N1YmUoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuXG5cdFx0bGV0IGNvb3JkID0gdGhpcy5pc29tZXRyaWNDb29yZCh4ICsgMCwgLXkgKyAwLCB6ICsgMCk7XG5cdFx0dGhpcy5jdHgubW92ZVRvKGNvb3JkLngsIGNvb3JkLnkpO1xuXG5cdFx0Y29vcmQgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHggKyAxLCAteSArIDAsIHogKyAwKTtcblx0XHR0aGlzLmN0eC5saW5lVG8oY29vcmQueCwgY29vcmQueSk7XG5cblx0XHRjb29yZCA9IHRoaXMuaXNvbWV0cmljQ29vcmQoeCArIDEsIC15ICsgMSwgeiArIDApO1xuXHRcdHRoaXMuY3R4LmxpbmVUbyhjb29yZC54LCBjb29yZC55KTtcblxuXHRcdGNvb3JkID0gdGhpcy5pc29tZXRyaWNDb29yZCh4ICsgMSwgLXkgKyAxLCB6ICsgMSk7XG5cdFx0dGhpcy5jdHgubGluZVRvKGNvb3JkLngsIGNvb3JkLnkpO1xuXG5cdFx0Y29vcmQgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHggKyAwLCAteSArIDEsIHogKyAxKTtcblx0XHR0aGlzLmN0eC5saW5lVG8oY29vcmQueCwgY29vcmQueSk7XG5cblx0XHRjb29yZCA9IHRoaXMuaXNvbWV0cmljQ29vcmQoeCArIDAsIC15ICsgMCwgeiArIDEpO1xuXHRcdHRoaXMuY3R4LmxpbmVUbyhjb29yZC54LCBjb29yZC55KTtcblxuXHRcdHRoaXMuY3R4LmZpbGwoKTtcblx0XHR0aGlzLmN0eC5jbG9zZVBhdGgoKTtcblxuXHRcdGNvb3JkID0gdGhpcy5pc29tZXRyaWNDb29yZCh4ICsgMCwgLXkgKyAwLCB6ICsgMCk7XG5cdFx0dGhpcy5jdHgubW92ZVRvKGNvb3JkLngsIGNvb3JkLnkpO1xuXG5cdFx0Y29vcmQgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHggKyAxLCAteSArIDAsIHogKyAwKTtcblx0XHR0aGlzLmN0eC5saW5lVG8oY29vcmQueCwgY29vcmQueSk7XG5cblx0XHRjb29yZCA9IHRoaXMuaXNvbWV0cmljQ29vcmQoeCArIDEsIC15ICsgMCwgeiArIDEpO1xuXHRcdHRoaXMuY3R4LmxpbmVUbyhjb29yZC54LCBjb29yZC55KTtcblxuXHRcdGNvb3JkID0gdGhpcy5pc29tZXRyaWNDb29yZCh4ICsgMCwgLXkgKyAwLCB6ICsgMSk7XG5cdFx0dGhpcy5jdHgubGluZVRvKGNvb3JkLngsIGNvb3JkLnkpO1xuXG5cdFx0Y29vcmQgPSB0aGlzLmlzb21ldHJpY0Nvb3JkKHggKyAxLCAteSArIDAsIHogKyAxKTtcblx0XHR0aGlzLmN0eC5tb3ZlVG8oY29vcmQueCwgY29vcmQueSk7XG5cblx0XHRjb29yZCA9IHRoaXMuaXNvbWV0cmljQ29vcmQoeCArIDEsIC15ICsgMSwgeiArIDEpO1xuXHRcdHRoaXMuY3R4LmxpbmVUbyhjb29yZC54LCBjb29yZC55KTtcblxuXHRcdHRoaXMuY3R4LmNsb3NlUGF0aCgpO1xuXHRcdHRoaXMuY3R4LnN0cm9rZSgpO1xuXHR9XG59XG5cbiIsImltcG9ydCBWZWN0b3IzIGZyb20gXCIuL1ZlY3RvcjNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhbnNmb3JtIHtcblx0cHVibGljIHBvc2l0aW9uOiBWZWN0b3IzO1xuXHRwdWJsaWMgYW5nbGU6IFZlY3RvcjM7XG5cdHB1YmxpYyBzY2FsZTogVmVjdG9yMztcblxuXHRjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjdG9yMyA9IFZlY3RvcjMuemVybygpLCBhbmdsZTogVmVjdG9yMyA9IFZlY3RvcjMuemVybygpLCBzY2FsZTogVmVjdG9yMyA9IG5ldyBWZWN0b3IzKDEsIDEsIDEpKSB7XG5cdFx0dGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXHRcdHRoaXMuYW5nbGUgPSBhbmdsZTtcblx0XHR0aGlzLnNjYWxlID0gc2NhbGU7XG5cdH1cblxuXHRzZXRQb3NpdGlvbih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKSB7XG5cdFx0dGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IzKHgsIHksIHopO1xuXHR9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IzIHtcblx0Y29uc3RydWN0b3IocHVibGljIHg6IG51bWJlciwgcHVibGljIHk6IG51bWJlciwgcHVibGljIHo6IG51bWJlcikgeyB9XG5cblx0c3RhdGljIHplcm8oKSB7XG5cdFx0cmV0dXJuIG5ldyBWZWN0b3IzKDAsIDAsIDApO1xuXHR9XG59XG4iLCJleHBvcnQgY29uc3QgTUFQX0hFSUdIVCA9IDY0O1xuZXhwb3J0IGNvbnN0IENIVU5LX1NJWkUgPSAxNjtcbmV4cG9ydCBjb25zdCBNQVBfU0laRSA9IDI7XG5cbmV4cG9ydCBjb25zdCBOT0lTRV9DT1VOVCA9IDQ7XG5cbmV4cG9ydCBjb25zdCBTQ0FMRSA9IDE2O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxuY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCdjYW52YXMnKTtcblxuZnVuY3Rpb24gdGljaygpIHtcblx0Z2FtZS5kcmF3KCk7XG5cblx0Z2FtZS5yZW5kZXJlci50cmFuc2Zvcm0uYW5nbGUueSArPSAwLjAxO1xuXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9