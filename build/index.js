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
        this.renderer.clearScreen();
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
const MAP_HEIGHT = 16;
const CHUNK_SIZE = 16;
const MAP_SIZE = 4;
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
/* harmony import */ var _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./glMatrix/gl-matrix */ "./src/glMatrix/gl-matrix.js");
/* harmony import */ var _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2__);




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
    game.renderer.modelMatrix = _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2__.mat4.create();
    _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2__.mat4.identity(game.renderer.modelMatrix);
    _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2__.mat4.rotate(game.renderer.modelMatrix, game.renderer.modelMatrix, Math.PI / 3, [1, 0, 0]);
    _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2__.mat4.rotate(game.renderer.modelMatrix, game.renderer.modelMatrix, (+new Date()) / 10000, [0, 1, 0]);
    _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2__.mat4.translate(game.renderer.modelMatrix, game.renderer.modelMatrix, [0, -_config__WEBPACK_IMPORTED_MODULE_0__.MAP_HEIGHT * 2, 0]);
    _glMatrix_gl_matrix__WEBPACK_IMPORTED_MODULE_2__.mat4.translate(game.renderer.modelMatrix, game.renderer.modelMatrix, [-_config__WEBPACK_IMPORTED_MODULE_0__.MAP_SIZE * _config__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE / 2, 0, -_config__WEBPACK_IMPORTED_MODULE_0__.MAP_SIZE * _config__WEBPACK_IMPORTED_MODULE_0__.CHUNK_SIZE / 2]);
    game.draw();
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDOVUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQzlVLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUM5VSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7S0FDOVUsQ0FBQztJQUVGLDBDQUEwQztJQUMxQyxNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDaEosTUFBTSxVQUFV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QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxlQUFlO0FBQzVCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQzs7QUFFckM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsY0FBYztBQUMzQixlQUFlLFFBQVE7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2Qzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIs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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGVBQWU7QUFDNUIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEOztBQUUzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsY0FBYztBQUM1QixjQUFjLE1BQU07QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsY0FBYztBQUM1QixjQUFjLE1BQU07QUFDcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsY0FBYyxNQUFNO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQixjQUFjLE1BQU07QUFDcEIsY0FBYyxNQUFNO0FBQ3BCLGNBQWMsY0FBYztBQUM1QixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsT0FBTztBQUNwQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLE9BQU87QUFDcEIsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0I7QUFDQSxlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxjQUFjO0FBQzNCLGVBQWUsUUFBUTtBQUN2Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWM7QUFDM0IsZUFBZSxRQUFRO0FBQ3ZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGFBQWEsUUFBUTtB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ckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxRQUFRO0FBQ3JCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGFBQWEsY0FBYztBQUMzQixhQUFhLFFBQVE7QUFDckIsZUFBZSxNQUFNO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsUUFBUTtBQUNyQixlQUFlLE1BQU07QUFDckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsTUFBTTtBQUNuQixhQUFhLGNBQWM7QUFDM0IsYUFBYSxjQUFjO0FBQzNCLGVBQWUsTUFBTTtBQUNyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CLGFBQWEsY0FBYztBQUMz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dEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsY0FBYztBQUMzQixhQUFhLGNBQWM7QUFDM0IsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsY0FBYztBQUMzQixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsY0FBYztBQUMzQixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsY0FBYztBQUMzQixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFl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LGVBQWUsT0FBTztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsY0FBYztBQUMzQixhQUFhLGVBQWU7QUFDNUIsZUFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFlO0FBQzVCLGFBQWEsY0FBYztBQUMzQixhQUFhLFFBQVE7QUFDckIsZUFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxlQUFlO0FBQzVCLGFBQWEsZUFBZTtBQUM1QixlQUFlLE9BQU87QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsZUFBZTtBQUM1QixhQUFhLGVBQWU7QUFDNUIsZUFBZSxPQUFPO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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V0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsK0NBQVUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RyxxREFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsNkNBQVEsR0FBRywrQ0FBVSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyw2Q0FBUSxHQUFHLCtDQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFWixxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9CbG9jay50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9DaHVuay50cyIsIndlYnBhY2s6Ly8zZF9ub2ljZS8uL3NyYy9HYW1lLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL1JhbmRvbWl6ZXIudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvUmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvVHJhbnNmb3JtLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL1ZlY3RvcjMudHMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2UvLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL2dsTWF0cml4L2dsLW1hdHJpeC5qcyIsIndlYnBhY2s6Ly8zZF9ub2ljZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8zZF9ub2ljZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly8zZF9ub2ljZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vM2Rfbm9pY2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly8zZF9ub2ljZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLzNkX25vaWNlLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEJsb2NrVHlwZSB7XG5cdEVNUFRZLFxuXHRTT0xJRCxcblx0Q0FWRVxufVxuXG5leHBvcnQgY2xhc3MgQmxvY2sge1xuXHRwdWJsaWMgdHlwZTogQmxvY2tUeXBlO1xuXG5cdGNvbnN0cnVjdG9yKHR5cGU6IEJsb2NrVHlwZSkge1xuXHRcdHRoaXMudHlwZSA9IHR5cGU7XG5cdH1cbn1cbiIsImltcG9ydCB7IEJsb2NrLCBCbG9ja1R5cGUgfSBmcm9tIFwiLi9CbG9ja1wiO1xuaW1wb3J0IHsgQ0hVTktfU0laRSwgTUFQX0hFSUdIVCwgTk9JU0VfQ09VTlQgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCB7IG5vaXNlIH0gZnJvbSBcIi4vUmFuZG9taXplclwiO1xuaW1wb3J0IFRyYW5zZm9ybSBmcm9tIFwiLi9UcmFuc2Zvcm1cIjtcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuL1ZlY3RvcjNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2h1bmsge1xuXHRwdWJsaWMgdHJhbnNmb3JtOiBUcmFuc2Zvcm07XG5cdHB1YmxpYyBkYXRhOiBCbG9ja1tdW11bXTtcblxuXHRjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHo6IG51bWJlcikge1xuXHRcdHRoaXMudHJhbnNmb3JtID0gbmV3IFRyYW5zZm9ybShuZXcgVmVjdG9yMyh4ICogQ0hVTktfU0laRSwgMCwgeiAqIENIVU5LX1NJWkUpKTtcblx0XHR0aGlzLmRhdGEgPSB0aGlzLmluaXRpYWxpemVEYXRhKCk7XG5cdFx0dGhpcy5nZW5lcmF0ZUxhbmRzY2FwZSgpO1xuXHRcdHRoaXMuZ2VuZXJhdGVDYXZlcygpO1xuXHR9XG5cblx0cHJpdmF0ZSBpbml0aWFsaXplRGF0YSgpOiBCbG9ja1tdW11bXSB7XG5cdFx0Y29uc3QgZGF0YTogQmxvY2tbXVtdW10gPSBbXTtcblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IENIVU5LX1NJWkU7IHgrKykge1xuXHRcdFx0ZGF0YVt4XSA9IFtdO1xuXHRcdFx0Zm9yIChsZXQgeiA9IDA7IHogPCBDSFVOS19TSVpFOyB6KyspIHtcblx0XHRcdFx0ZGF0YVt4XVt6XSA9IFtdO1xuXHRcdFx0XHRmb3IgKGxldCB5ID0gMDsgeSA8IE1BUF9IRUlHSFQ7IHkrKykge1xuXHRcdFx0XHRcdGRhdGFbeF1bel1beV0gPSBuZXcgQmxvY2soQmxvY2tUeXBlLkVNUFRZKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXG5cdHByaXZhdGUgZ2VuZXJhdGVMYW5kc2NhcGUoKSB7XG5cdFx0Zm9yIChsZXQgeCA9IDA7IHggPCBDSFVOS19TSVpFOyB4KyspIHtcblx0XHRcdGZvciAobGV0IHogPSAwOyB6IDwgQ0hVTktfU0laRTsgeisrKSB7XG5cdFx0XHRcdGNvbnN0IHJhbmRvbSA9IG5vaXNlKFxuXHRcdFx0XHRcdHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnggKyB4LFxuXHRcdFx0XHRcdHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnogKyB6LFxuXHRcdFx0XHRcdDBcblx0XHRcdFx0KTtcblxuXHRcdFx0XHRjb25zdCBoZWlnaHQgPSBNYXRoLmZsb29yKHJhbmRvbSAqIE1BUF9IRUlHSFQgLyAyICsgTUFQX0hFSUdIVCAvIDIpO1xuXG5cdFx0XHRcdGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcblx0XHRcdFx0XHR0aGlzLmRhdGFbeF1bel1beV0gPSBuZXcgQmxvY2soQmxvY2tUeXBlLlNPTElEKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZ2VuZXJhdGVDYXZlcygpIHtcblx0XHRmb3IgKGxldCBibG9ja194ID0gMDsgYmxvY2tfeCA8IENIVU5LX1NJWkU7IGJsb2NrX3grKykge1xuXHRcdFx0Zm9yIChsZXQgYmxvY2tfeiA9IDA7IGJsb2NrX3ogPCBDSFVOS19TSVpFOyBibG9ja196KyspIHtcblx0XHRcdFx0Zm9yIChsZXQgYmxvY2tfeSA9IDA7IGJsb2NrX3kgPCBNQVBfSEVJR0hUOyBibG9ja195KyspIHtcblx0XHRcdFx0XHRjb25zdCByYW5kb20gPSBub2lzZShcblx0XHRcdFx0XHRcdHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLnggKyBibG9ja194LFxuXHRcdFx0XHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24ueiArIGJsb2NrX3osXG5cdFx0XHRcdFx0XHRibG9ja195LFxuXHRcdFx0XHRcdFx0Tk9JU0VfQ09VTlQgLyA0XG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdGxldCBmYWN0ID0gMTtcblxuXHRcdFx0XHRcdGlmIChibG9ja195IDwgMzIpIHtcblx0XHRcdFx0XHRcdGZhY3QgPSBNYXRoLm1heCgwLCBibG9ja195IC8gMzIpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGJsb2NrX3kgPiBNQVBfSEVJR0hUIC8gMikge1xuXHRcdFx0XHRcdFx0ZmFjdCA9IE1hdGgubWF4KDAsIDEgLSAoYmxvY2tfeSAtIE1BUF9IRUlHSFQgLyAyKSAvIChNQVBfSEVJR0hUIC8gMikpXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuZGF0YVtibG9ja194XVtibG9ja196XVtibG9ja195XS50eXBlICE9IEJsb2NrVHlwZS5FTVBUWSAmJiByYW5kb20gKiogMiA8IDAuMTUgKiBmYWN0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLmRhdGFbYmxvY2tfeF1bYmxvY2tfel1bYmxvY2tfeV0udHlwZSA9IEJsb2NrVHlwZS5DQVZFO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHsgQmxvY2tUeXBlIH0gZnJvbSBcIi4vQmxvY2tcIjtcbmltcG9ydCBDaHVuayBmcm9tIFwiLi9DaHVua1wiO1xuaW1wb3J0IHsgQ0hVTktfU0laRSwgTUFQX0hFSUdIVCwgTUFQX1NJWkUgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9SZW5kZXJlclwiO1xuaW1wb3J0IFRyYW5zZm9ybSBmcm9tIFwiLi9UcmFuc2Zvcm1cIjtcbmltcG9ydCBWZWN0b3IzIGZyb20gXCIuL1ZlY3RvcjNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZSB7XG5cdHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcblx0cHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjtcblx0cHJpdmF0ZSBjaHVua3M6IENodW5rW107XG5cblx0Y29uc3RydWN0b3IoY2FudmFzSWQ6IHN0cmluZykge1xuXHRcdHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzSWQpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuXHRcdHRoaXMuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgUmVuZGVyZXIodGhpcy5jYW52YXMpO1xuXHRcdHRoaXMuY2h1bmtzID0gdGhpcy5nZW5lcmF0ZUNodW5rcygpO1xuXHR9XG5cblx0cHJpdmF0ZSBnZW5lcmF0ZUNodW5rcygpOiBDaHVua1tdIHtcblx0XHRjb25zdCBjaHVua3M6IENodW5rW10gPSBbXTtcblx0XHRmb3IgKGxldCB4ID0gMDsgeCA8IE1BUF9TSVpFOyB4KyspIHtcblx0XHRcdGZvciAobGV0IHogPSAwOyB6IDwgTUFQX1NJWkU7IHorKykge1xuXHRcdFx0XHRjaHVua3MucHVzaChuZXcgQ2h1bmsoeCwgeikpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gY2h1bmtzO1xuXHR9XG5cblx0cHVibGljIGRyYXcoKSB7XG5cdFx0dGhpcy5yZW5kZXJlci5jbGVhclNjcmVlbigpO1xuXG5cdFx0Zm9yIChjb25zdCBjaHVuayBvZiB0aGlzLmNodW5rcykge1xuXHRcdFx0Zm9yIChsZXQgYmxvY2tfeCA9IDA7IGJsb2NrX3ggPCBDSFVOS19TSVpFOyBibG9ja194KyspIHtcblx0XHRcdFx0Zm9yIChsZXQgYmxvY2tfeiA9IDA7IGJsb2NrX3ogPCBDSFVOS19TSVpFOyBibG9ja196KyspIHtcblx0XHRcdFx0XHRmb3IgKGxldCBibG9ja195ID0gMDsgYmxvY2tfeSA8IE1BUF9IRUlHSFQ7IGJsb2NrX3krKykge1xuXG5cdFx0XHRcdFx0XHRjb25zdCBibG9jayA9IGNodW5rLmRhdGFbYmxvY2tfeF1bYmxvY2tfel1bYmxvY2tfeV07XG5cblx0XHRcdFx0XHRcdGxldCBvcGVuZWQgPSB0cnVlO1xuXG5cdFx0XHRcdFx0XHQvLyBpZiAoYmxvY2tfeCA9PSAwIHx8IGJsb2NrX3kgPT0gMCB8fCBibG9ja196ID09IDApIHtcblx0XHRcdFx0XHRcdC8vIFx0b3BlbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdC8vIH1cblxuXHRcdFx0XHRcdFx0Ly8gaWYgKGJsb2NrX3ggPT0gQ0hVTktfU0laRSAtIDEgfHwgYmxvY2tfeSA9PSBNQVBfSEVJR0hUIC0gMSB8fCBibG9ja196ID09IENIVU5LX1NJWkUgLSAxKSB7XG5cdFx0XHRcdFx0XHQvLyBcdG9wZW5lZCA9IHRydWU7XG5cdFx0XHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0XHRcdC8vIGlmICghb3BlbmVkKSB7XG5cdFx0XHRcdFx0XHQvLyBcdGlmIChjaHVuay5kYXRhW2Jsb2NrX3ggKyAxXVtibG9ja196XVtibG9ja195XS50eXBlICE9IEJsb2NrVHlwZS5TT0xJRCkge1xuXHRcdFx0XHRcdFx0Ly8gXHRcdG9wZW5lZCA9IHRydWU7XG5cdFx0XHRcdFx0XHQvLyBcdH0gZWxzZSBpZiAoY2h1bmsuZGF0YVtibG9ja194IC0gMV1bYmxvY2tfel1bYmxvY2tfeV0udHlwZSAhPSBCbG9ja1R5cGUuU09MSUQpIHtcblx0XHRcdFx0XHRcdC8vIFx0XHRvcGVuZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Ly8gXHR9IGVsc2UgaWYgKGNodW5rLmRhdGFbYmxvY2tfeF1bYmxvY2tfeiArIDFdW2Jsb2NrX3ldLnR5cGUgIT0gQmxvY2tUeXBlLlNPTElEKSB7XG5cdFx0XHRcdFx0XHQvLyBcdFx0b3BlbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdC8vIFx0fSBlbHNlIGlmIChjaHVuay5kYXRhW2Jsb2NrX3hdW2Jsb2NrX3ogLSAxXVtibG9ja195XS50eXBlICE9IEJsb2NrVHlwZS5TT0xJRCkge1xuXHRcdFx0XHRcdFx0Ly8gXHRcdG9wZW5lZCA9IHRydWU7XG5cdFx0XHRcdFx0XHQvLyBcdH0gZWxzZSBpZiAoY2h1bmsuZGF0YVtibG9ja194XVtibG9ja196XVtibG9ja195ICsgMV0udHlwZSAhPSBCbG9ja1R5cGUuU09MSUQpIHtcblx0XHRcdFx0XHRcdC8vIFx0XHRvcGVuZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0Ly8gXHR9IGVsc2UgaWYgKGNodW5rLmRhdGFbYmxvY2tfeF1bYmxvY2tfel1bYmxvY2tfeSArIDFdLnR5cGUgIT0gQmxvY2tUeXBlLlNPTElEKSB7XG5cdFx0XHRcdFx0XHQvLyBcdFx0b3BlbmVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdC8vIFx0fVxuXHRcdFx0XHRcdFx0Ly8gfVxuXG5cdFx0XHRcdFx0XHRpZiAob3BlbmVkICYmIGJsb2NrLnR5cGUgPT09IEJsb2NrVHlwZS5TT0xJRCkge1xuXHRcdFx0XHRcdFx0XHRjb25zdCB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKFxuXHRcdFx0XHRcdFx0XHRcdG5ldyBWZWN0b3IzKFxuXHRcdFx0XHRcdFx0XHRcdFx0Y2h1bmsudHJhbnNmb3JtLnBvc2l0aW9uLnggKyBibG9ja194LFxuXHRcdFx0XHRcdFx0XHRcdFx0YmxvY2tfeSxcblx0XHRcdFx0XHRcdFx0XHRcdGNodW5rLnRyYW5zZm9ybS5wb3NpdGlvbi56ICsgYmxvY2tfelxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHQvLyBzd2l0Y2ggKGJsb2NrLnR5cGUpIHtcblx0XHRcdFx0XHRcdFx0Ly8gXHRjYXNlIEJsb2NrVHlwZS5TT0xJRDpcblx0XHRcdFx0XHRcdFx0Ly8gXHRcdHRoaXMucmVuZGVyZXIuY2hhbmdlQ29sb3IoYHJnYihcblx0XHRcdFx0XHRcdFx0Ly8gXHRcdFx0JHtNYXRoLmZsb29yKDI1NSAqIChibG9ja195IC8gTUFQX0hFSUdIVCkpfSxcblx0XHRcdFx0XHRcdFx0Ly8gXHRcdFx0JHtNYXRoLmZsb29yKDI1NSAqIChibG9ja195IC8gTUFQX0hFSUdIVCkpfSxcblx0XHRcdFx0XHRcdFx0Ly8gXHRcdFx0JHtNYXRoLmZsb29yKDI1NSAqIChibG9ja195IC8gTUFQX0hFSUdIVCkpfVxuXHRcdFx0XHRcdFx0XHQvLyBcdFx0KWApO1xuXHRcdFx0XHRcdFx0XHQvLyBcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdC8vIFx0Y2FzZSBCbG9ja1R5cGUuQ0FWRTpcblx0XHRcdFx0XHRcdFx0Ly8gXHRcdHRoaXMucmVuZGVyZXIuY2hhbmdlQ29sb3IoYHJnYmEoMCwgMCwgMCwgMC41KWApO1xuXHRcdFx0XHRcdFx0XHQvLyBcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRcdC8vIH1cblxuXHRcdFx0XHRcdFx0XHR0aGlzLnJlbmRlcmVyLmRyYXdDdWJlKHRyYW5zZm9ybSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQgeyBOT0lTRV9DT1VOVCB9IGZyb20gXCIuL2NvbmZpZ1wiO1xuXG5jb25zdCBTRUVEID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjE0NzQ4MzY0NykgPj4+IDA7XG5cbmNvbnNvbGUubG9nKFNFRUQpO1xuXG4vLyA9PT09PSBub2lzZSA9PT09PVxuXG4vLyBjb25zdCBfcmFuZFhZWkNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuLy8gZnVuY3Rpb24gX3JhbmRYWVooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IG51bWJlciB7XG4vLyBcdGNvbnN0IGtleSA9IGAke3h9XyR7en1fJHt5fWA7XG5cbi8vIFx0aWYgKCFfcmFuZFhZWkNhY2hlLmhhcyhrZXkpKSB7XG4vLyBcdFx0X3JhbmRYWVpDYWNoZS5zZXQoa2V5LCBfcmFuZFhZWih4LCB6LCB5KSk7XG4vLyBcdH1cblxuLy8gXHRyZXR1cm4gX3JhbmRYWVpDYWNoZS5nZXQoa2V5KSBhcyBudW1iZXI7XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5kWFlaKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBudW1iZXIge1xuXHRsZXQgbiA9ICh4ICogMzQxODczMTI4NyArIHkgKiAxMzI4OTc5ODcgKyB6ICogMTM3NjMxMjU4OSArIFNFRUQpID4+PiAwO1xuXG5cdG4gPSAobiBeIChuID4+IDIxKSkgPj4+IDA7XG5cdG4gPSAobiBeIChuIDw8IDM1KSkgPj4+IDA7XG5cdG4gPSAobiBeIChuID4+IDQpKSA+Pj4gMDtcblx0biA9IChuICogMjY4NTgyMTY1NzczKSA+Pj4gMDtcblx0biA9IChuIF4gKG4gPj4gMTUpKSA+Pj4gMDtcblxuXHRyZXR1cm4gbiAlIDI1NiAvIDI1Njtcbn1cblxuLy8gPT09PT0gbm9pc2UgPT09PT1cblxuLy8gY29uc3QgX25vaXNlQ2FjaGUgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuXG4vLyBmdW5jdGlvbiBfbm9pc2UoeDogbnVtYmVyLCB6OiBudW1iZXIsIHk6IG51bWJlciwgbm9pc2VfY291bnQ6IG51bWJlciA9IE5PSVNFX0NPVU5UKTogbnVtYmVyIHtcbi8vIFx0Y29uc3Qga2V5ID0gYCR7eH1fJHt6fV8ke3l9XyR7bm9pc2VfY291bnR9YDtcblxuLy8gXHRpZiAoIV9ub2lzZUNhY2hlLmhhcyhrZXkpKSB7XG4vLyBcdFx0X25vaXNlQ2FjaGUuc2V0KGtleSwgX25vaXNlKHgsIHosIHksIG5vaXNlX2NvdW50KSk7XG4vLyBcdH1cblxuLy8gXHRyZXR1cm4gX25vaXNlQ2FjaGUuZ2V0KGtleSkgYXMgbnVtYmVyO1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gbm9pc2UoeDogbnVtYmVyLCB6OiBudW1iZXIsIHk6IG51bWJlciwgbm9pc2VfY291bnQ6IG51bWJlciA9IE5PSVNFX0NPVU5UKTogbnVtYmVyIHtcblx0bGV0IHJlc3VsdCA9IDA7XG5cblx0Zm9yIChsZXQgaSA9IDI7IGkgPCBub2lzZV9jb3VudCArIDI7IGkrKykge1xuXHRcdGNvbnN0IHRtcCA9IGJpY3ViaWNSYW5kWFlaKFxuXHRcdFx0KHggKyAzNDE4NzMxMjg3KSAvICgyICoqIGkpLFxuXHRcdFx0KHkgLSAxMzc2MzEyNTg5KSAvICgyICoqIGkpLFxuXHRcdFx0KHogKyAxMzI4OTc5ODcpIC8gKDIgKiogaSlcblx0XHQpO1xuXG5cdFx0cmVzdWx0ICs9IHRtcDtcblx0fVxuXG5cdHJldHVybiByZXN1bHQgLyBub2lzZV9jb3VudDtcbn1cblxuLy8gPT09PT0gY3ViaWNJbnRlcnBvbGF0ZSA9PT09PVxuXG4vLyBjb25zdCBfY3ViaWNJbnRlcnBvbGF0ZUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuLy8gZnVuY3Rpb24gX2N1YmljSW50ZXJwb2xhdGUocDA6IG51bWJlciwgcDE6IG51bWJlciwgcDI6IG51bWJlciwgcDM6IG51bWJlciwgdDogbnVtYmVyKTogbnVtYmVyIHtcbi8vIFx0Y29uc3Qga2V5ID0gYCR7cDB9XyR7cDF9XyR7cDJ9XyR7cDN9XyR7dH1gO1xuXG4vLyBcdGlmICghX2N1YmljSW50ZXJwb2xhdGVDYWNoZS5oYXMoa2V5KSkge1xuLy8gXHRcdF9jdWJpY0ludGVycG9sYXRlQ2FjaGUuc2V0KGtleSwgX2N1YmljSW50ZXJwb2xhdGUocDAsIHAxLCBwMiwgcDMsIHQpKTtcbi8vIFx0fVxuXG4vLyBcdHJldHVybiBfY3ViaWNJbnRlcnBvbGF0ZUNhY2hlLmdldChrZXkpIGFzIG51bWJlcjtcbi8vIH1cblxuZnVuY3Rpb24gY3ViaWNJbnRlcnBvbGF0ZShwMDogbnVtYmVyLCBwMTogbnVtYmVyLCBwMjogbnVtYmVyLCBwMzogbnVtYmVyLCB0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGEgPSAtMC41ICogcDAgKyAxLjUgKiBwMSAtIDEuNSAqIHAyICsgMC41ICogcDM7XG4gICAgY29uc3QgYiA9IHAwIC0gMi41ICogcDEgKyAyICogcDIgLSAwLjUgKiBwMztcbiAgICBjb25zdCBjID0gLTAuNSAqIHAwICsgMC41ICogcDI7XG4gICAgY29uc3QgZCA9IHAxO1xuXG5cdHJldHVybiBhICogdCAqIHQgKiB0ICsgYiAqIHQgKiB0ICsgYyAqIHQgKyBkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmljdWJpY1JhbmRYWVooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IG51bWJlciB7XG5cdGNvbnN0IHhiID0gTWF0aC5mbG9vcih4KTtcblxuXHRjb25zdCB4MCA9IHhiIC0gMTtcblx0Y29uc3QgeDEgPSB4YiArIDA7XG5cdGNvbnN0IHgyID0geGIgKyAxO1xuXHRjb25zdCB4MyA9IHhiICsgMjtcblxuXHRjb25zdCB5YiA9IE1hdGguZmxvb3IoeSk7XG5cblx0Y29uc3QgeTAgPSB5YiAtIDE7XG5cdGNvbnN0IHkxID0geWIgKyAwO1xuXHRjb25zdCB5MiA9IHliICsgMTtcblx0Y29uc3QgeTMgPSB5YiArIDI7XG5cblx0Y29uc3QgemIgPSBNYXRoLmZsb29yKHopO1xuXG5cdGNvbnN0IHowID0gemIgLSAxO1xuXHRjb25zdCB6MSA9IHpiICsgMDtcblx0Y29uc3QgejIgPSB6YiArIDE7XG5cdGNvbnN0IHozID0gemIgKyAyO1xuXG5cdC8vINCf0L7Qu9GD0YfQsNC10Lwg0LfQvdCw0YfQtdC90LjRjyBcItGI0YPQvNC+0LJcIiDQtNC70Y8gMTYg0YHQvtGB0LXQtNC90LjRhSDRgtC+0YfQtdC6XG5cdGNvbnN0IG5vaXNlVmFsdWVzID0gW1xuXHRcdHJhbmRYWVooeDAsIHkwLCB6MCksIHJhbmRYWVooeDEsIHkwLCB6MCksIHJhbmRYWVooeDIsIHkwLCB6MCksIHJhbmRYWVooeDMsIHkwLCB6MCksIHJhbmRYWVooeDAsIHkxLCB6MCksIHJhbmRYWVooeDEsIHkxLCB6MCksIHJhbmRYWVooeDIsIHkxLCB6MCksIHJhbmRYWVooeDMsIHkxLCB6MCksIHJhbmRYWVooeDAsIHkyLCB6MCksIHJhbmRYWVooeDEsIHkyLCB6MCksIHJhbmRYWVooeDIsIHkyLCB6MCksIHJhbmRYWVooeDMsIHkyLCB6MCksIHJhbmRYWVooeDAsIHkzLCB6MCksIHJhbmRYWVooeDEsIHkzLCB6MCksIHJhbmRYWVooeDIsIHkzLCB6MCksIHJhbmRYWVooeDMsIHkzLCB6MCksXG5cdFx0cmFuZFhZWih4MCwgeTAsIHoxKSwgcmFuZFhZWih4MSwgeTAsIHoxKSwgcmFuZFhZWih4MiwgeTAsIHoxKSwgcmFuZFhZWih4MywgeTAsIHoxKSwgcmFuZFhZWih4MCwgeTEsIHoxKSwgcmFuZFhZWih4MSwgeTEsIHoxKSwgcmFuZFhZWih4MiwgeTEsIHoxKSwgcmFuZFhZWih4MywgeTEsIHoxKSwgcmFuZFhZWih4MCwgeTIsIHoxKSwgcmFuZFhZWih4MSwgeTIsIHoxKSwgcmFuZFhZWih4MiwgeTIsIHoxKSwgcmFuZFhZWih4MywgeTIsIHoxKSwgcmFuZFhZWih4MCwgeTMsIHoxKSwgcmFuZFhZWih4MSwgeTMsIHoxKSwgcmFuZFhZWih4MiwgeTMsIHoxKSwgcmFuZFhZWih4MywgeTMsIHoxKSxcblx0XHRyYW5kWFlaKHgwLCB5MCwgejIpLCByYW5kWFlaKHgxLCB5MCwgejIpLCByYW5kWFlaKHgyLCB5MCwgejIpLCByYW5kWFlaKHgzLCB5MCwgejIpLCByYW5kWFlaKHgwLCB5MSwgejIpLCByYW5kWFlaKHgxLCB5MSwgejIpLCByYW5kWFlaKHgyLCB5MSwgejIpLCByYW5kWFlaKHgzLCB5MSwgejIpLCByYW5kWFlaKHgwLCB5MiwgejIpLCByYW5kWFlaKHgxLCB5MiwgejIpLCByYW5kWFlaKHgyLCB5MiwgejIpLCByYW5kWFlaKHgzLCB5MiwgejIpLCByYW5kWFlaKHgwLCB5MywgejIpLCByYW5kWFlaKHgxLCB5MywgejIpLCByYW5kWFlaKHgyLCB5MywgejIpLCByYW5kWFlaKHgzLCB5MywgejIpLFxuXHRcdHJhbmRYWVooeDAsIHkwLCB6MyksIHJhbmRYWVooeDEsIHkwLCB6MyksIHJhbmRYWVooeDIsIHkwLCB6MyksIHJhbmRYWVooeDMsIHkwLCB6MyksIHJhbmRYWVooeDAsIHkxLCB6MyksIHJhbmRYWVooeDEsIHkxLCB6MyksIHJhbmRYWVooeDIsIHkxLCB6MyksIHJhbmRYWVooeDMsIHkxLCB6MyksIHJhbmRYWVooeDAsIHkyLCB6MyksIHJhbmRYWVooeDEsIHkyLCB6MyksIHJhbmRYWVooeDIsIHkyLCB6MyksIHJhbmRYWVooeDMsIHkyLCB6MyksIHJhbmRYWVooeDAsIHkzLCB6MyksIHJhbmRYWVooeDEsIHkzLCB6MyksIHJhbmRYWVooeDIsIHkzLCB6MyksIHJhbmRYWVooeDMsIHkzLCB6MyksXG5cdF07XG5cblx0Ly8g0JjQvdGC0LXRgNC/0L7Qu9C40YDRg9C10Lwg0L/QviAneScg0L/QviDRh9C10YLRi9GA0LXQvCDRgdGC0YDQvtC60LDQvFxuXHRjb25zdCBzbGljZTByb3cwID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDAgKyAwXSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMV0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDJdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAzXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uwcm93MSA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAwICsgNF0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDVdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyA2XSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgN10sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMHJvdzIgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMCArIDhdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyA5XSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMTBdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxMV0sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMHJvdzMgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMCArIDEyXSwgbm9pc2VWYWx1ZXNbMTYgKiAwICsgMTNdLCBub2lzZVZhbHVlc1sxNiAqIDAgKyAxNF0sIG5vaXNlVmFsdWVzWzE2ICogMCArIDE1XSwgeCAtIHhiKTtcblxuXHRjb25zdCBzbGljZTFyb3cwID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDEgKyAwXSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMV0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDJdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAzXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uxcm93MSA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAxICsgNF0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDVdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyA2XSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgN10sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMXJvdzIgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMSArIDhdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyA5XSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMTBdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxMV0sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMXJvdzMgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMSArIDEyXSwgbm9pc2VWYWx1ZXNbMTYgKiAxICsgMTNdLCBub2lzZVZhbHVlc1sxNiAqIDEgKyAxNF0sIG5vaXNlVmFsdWVzWzE2ICogMSArIDE1XSwgeCAtIHhiKTtcblxuXHRjb25zdCBzbGljZTJyb3cwID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDIgKyAwXSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMV0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDJdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAzXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uycm93MSA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAyICsgNF0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDVdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyA2XSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgN10sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMnJvdzIgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMiArIDhdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyA5XSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMTBdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxMV0sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlMnJvdzMgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMiArIDEyXSwgbm9pc2VWYWx1ZXNbMTYgKiAyICsgMTNdLCBub2lzZVZhbHVlc1sxNiAqIDIgKyAxNF0sIG5vaXNlVmFsdWVzWzE2ICogMiArIDE1XSwgeCAtIHhiKTtcblxuXHRjb25zdCBzbGljZTNyb3cwID0gY3ViaWNJbnRlcnBvbGF0ZShub2lzZVZhbHVlc1sxNiAqIDMgKyAwXSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMV0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDJdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAzXSwgeCAtIHhiKTtcblx0Y29uc3Qgc2xpY2Uzcm93MSA9IGN1YmljSW50ZXJwb2xhdGUobm9pc2VWYWx1ZXNbMTYgKiAzICsgNF0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDVdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyA2XSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgN10sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlM3JvdzIgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMyArIDhdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyA5XSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMTBdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxMV0sIHggLSB4Yik7XG5cdGNvbnN0IHNsaWNlM3JvdzMgPSBjdWJpY0ludGVycG9sYXRlKG5vaXNlVmFsdWVzWzE2ICogMyArIDEyXSwgbm9pc2VWYWx1ZXNbMTYgKiAzICsgMTNdLCBub2lzZVZhbHVlc1sxNiAqIDMgKyAxNF0sIG5vaXNlVmFsdWVzWzE2ICogMyArIDE1XSwgeCAtIHhiKTtcblxuXHRjb25zdCBzbGljZTAgPSBjdWJpY0ludGVycG9sYXRlKHNsaWNlMHJvdzAsIHNsaWNlMHJvdzEsIHNsaWNlMHJvdzIsIHNsaWNlMHJvdzMsIHkgLSB5Yik7XG5cdGNvbnN0IHNsaWNlMSA9IGN1YmljSW50ZXJwb2xhdGUoc2xpY2Uxcm93MCwgc2xpY2Uxcm93MSwgc2xpY2Uxcm93Miwgc2xpY2Uxcm93MywgeSAtIHliKTtcblx0Y29uc3Qgc2xpY2UyID0gY3ViaWNJbnRlcnBvbGF0ZShzbGljZTJyb3cwLCBzbGljZTJyb3cxLCBzbGljZTJyb3cyLCBzbGljZTJyb3czLCB5IC0geWIpO1xuXHRjb25zdCBzbGljZTMgPSBjdWJpY0ludGVycG9sYXRlKHNsaWNlM3JvdzAsIHNsaWNlM3JvdzEsIHNsaWNlM3JvdzIsIHNsaWNlM3JvdzMsIHkgLSB5Yik7XG5cblx0Ly8g0JjQvdGC0LXRgNC/0L7Qu9C40YDRg9C10Lwg0L/QviAneCcg0L/QviDRh9C10YLRi9GA0LXQvCDRgdGC0YDQvtC60LDQvFxuXHRyZXR1cm4gY3ViaWNJbnRlcnBvbGF0ZShzbGljZTAsIHNsaWNlMSwgc2xpY2UyLCBzbGljZTMsIHogLSB6Yik7XG59XG5cbmNvbnNvbGUubG9nKGJpY3ViaWNSYW5kWFlaKTtcbiIsImltcG9ydCBUcmFuc2Zvcm0gZnJvbSBcIi4vVHJhbnNmb3JtXCI7XG5pbXBvcnQgKiBhcyBnbE1hdHJpeCBmcm9tICcuL2dsTWF0cml4L2dsLW1hdHJpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIHtcblx0cHJpdmF0ZSBnbDogV2ViR0xSZW5kZXJpbmdDb250ZXh0O1xuXG5cdHByaXZhdGUgdmVydGV4U2hhZGVyOiBXZWJHTFNoYWRlcjtcblx0cHJpdmF0ZSBmcmFnbWVudFNoYWRlcjogV2ViR0xTaGFkZXI7XG5cblx0cHJpdmF0ZSBwcm9ncmFtOiBXZWJHTFByb2dyYW07XG5cblx0cHVibGljIG1vZGVsTWF0cml4OiBhbnk7XG5cdHB1YmxpYyBwZXJzcGVjdGl2ZU1hdHJpeDogYW55O1xuXG5cdHByaXZhdGUgcG9zaXRpb25BdHRyaWJ1dGU6IEdMaW50O1xuXHRwcml2YXRlIG9mZnNldFVuaWZvcm06IFdlYkdMVW5pZm9ybUxvY2F0aW9uO1xuXHRwcml2YXRlIG1vZGVsVW5pZm9ybTogV2ViR0xVbmlmb3JtTG9jYXRpb247XG5cdHByaXZhdGUgcGVyc3BlY3RpdmVVbmlmb3JtOiBXZWJHTFVuaWZvcm1Mb2NhdGlvbjtcblxuXHRjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG5cdFx0dGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpIGFzIFdlYkdMUmVuZGVyaW5nQ29udGV4dDtcblxuXHRcdHRoaXMudmVydGV4U2hhZGVyID0gdGhpcy5jcmVhdGVTaGFkZXIodGhpcy5nbC5WRVJURVhfU0hBREVSLCBgXG5cdFx0XHRhdHRyaWJ1dGUgdmVjNCBhX3Bvc2l0aW9uO1xuXG5cdFx0XHR1bmlmb3JtIHZlYzMgdV9vZmZzZXQ7XG5cblx0XHRcdHVuaWZvcm0gbWF0NCB1X21vZGVsX21hdHJpeDtcblx0XHRcdHVuaWZvcm0gbWF0NCB1X3BlcnNwZWN0aXZlX21hdHJpeDtcblxuXHRcdFx0dmFyeWluZyB2ZWM0IHZfcG9zaXRpb247XG5cblx0XHRcdHZvaWQgbWFpbigpIHtcblx0XHRcdFx0Z2xfUG9zaXRpb24gPSB1X3BlcnNwZWN0aXZlX21hdHJpeCAqIHVfbW9kZWxfbWF0cml4ICogKGFfcG9zaXRpb24gKyB2ZWM0KHVfb2Zmc2V0LCAwKSk7XG5cblx0XHRcdFx0dl9wb3NpdGlvbiA9IGFfcG9zaXRpb247XG5cdFx0XHR9XG5cdFx0YCk7XG5cdFx0dGhpcy5mcmFnbWVudFNoYWRlciA9IHRoaXMuY3JlYXRlU2hhZGVyKHRoaXMuZ2wuRlJBR01FTlRfU0hBREVSLCBgXG5cdFx0XHRwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcblxuXHRcdFx0dmFyeWluZyB2ZWM0IHZfcG9zaXRpb247XG5cblx0XHRcdHZvaWQgbWFpbigpIHtcblx0XHRcdFx0ZmxvYXQgZmFjdG9yID0gMS4yIC0gMS4gLyBsZW5ndGgodl9wb3NpdGlvbik7XG5cdFx0XHRcdGdsX0ZyYWdDb2xvciA9IHZlYzQodmVjMygxLCAwLCAwLjUpICogZmFjdG9yLCAxKTtcblx0XHRcdH1cblx0XHRgKTtcblxuXHRcdHRoaXMucHJvZ3JhbSA9IHRoaXMuY3JlYXRlUHJvZ3JhbSh0aGlzLnZlcnRleFNoYWRlciwgdGhpcy5mcmFnbWVudFNoYWRlcik7XG5cblx0XHR0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuY2FudmFzLndpZHRoLCB0aGlzLmdsLmNhbnZhcy5oZWlnaHQpO1xuXG5cdFx0dGhpcy5tb2RlbE1hdHJpeCA9IGdsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG5cdFx0dGhpcy5wZXJzcGVjdGl2ZU1hdHJpeCA9IGdsTWF0cml4Lm1hdDQuY3JlYXRlKCk7XG5cblx0XHRnbE1hdHJpeC5tYXQ0LnBlcnNwZWN0aXZlKHRoaXMucGVyc3BlY3RpdmVNYXRyaXgsIDEuMDQsIHRoaXMuZ2wuY2FudmFzLndpZHRoIC8gdGhpcy5nbC5jYW52YXMuaGVpZ2h0LCAwLjEsIDEwMDAuMCk7XG5cblx0XHRnbE1hdHJpeC5tYXQ0LmlkZW50aXR5KHRoaXMubW9kZWxNYXRyaXgpO1xuXG5cdFx0Z2xNYXRyaXgubWF0NC50cmFuc2xhdGUodGhpcy5tb2RlbE1hdHJpeCwgdGhpcy5tb2RlbE1hdHJpeCwgWzAsIC02NCwgMF0pO1xuXHRcdGdsTWF0cml4Lm1hdDQucm90YXRlKHRoaXMubW9kZWxNYXRyaXgsIHRoaXMubW9kZWxNYXRyaXgsIE1hdGguUEkgLyA0ICsgTWF0aC5QSSAvIDIsIFswLCAxLCAwXSk7XG5cblx0XHRjb25zdCBjdWJlID0gZ2V0Q3ViZSgpO1xuXG5cdFx0dGhpcy5nbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSk7XG5cblx0XHRjb25zdCB2ZXJ0aWNlc0J1ZmZlciA9IHRoaXMuZ2wuY3JlYXRlQnVmZmVyKCkgYXMgV2ViR0xCdWZmZXI7XG5cdFx0dGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0aWNlc0J1ZmZlcik7XG5cdFx0dGhpcy5nbC5idWZmZXJEYXRhKHRoaXMuZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KGN1YmUudmVydGljZXMpLCB0aGlzLmdsLlNUQVRJQ19EUkFXKTtcblxuXHRcdGNvbnN0IGluZGljZXNCdWZmZXIgPSB0aGlzLmdsLmNyZWF0ZUJ1ZmZlcigpIGFzIFdlYkdMQnVmZmVyO1xuXHRcdHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmRpY2VzQnVmZmVyKTtcblx0XHR0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KGN1YmUuaW5kaWNlcyksIHRoaXMuZ2wuU1RBVElDX0RSQVcpO1xuXG5cdFx0dGhpcy5wb3NpdGlvbkF0dHJpYnV0ZSA9IHRoaXMuZ2wuZ2V0QXR0cmliTG9jYXRpb24odGhpcy5wcm9ncmFtLCAnYV9wb3NpdGlvbicpO1xuXHRcdHRoaXMub2Zmc2V0VW5pZm9ybSA9IHRoaXMuZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMucHJvZ3JhbSwgJ3Vfb2Zmc2V0JykgYXMgV2ViR0xVbmlmb3JtTG9jYXRpb247XG5cdFx0dGhpcy5tb2RlbFVuaWZvcm0gPSB0aGlzLmdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnByb2dyYW0sICd1X21vZGVsX21hdHJpeCcpIGFzIFdlYkdMVW5pZm9ybUxvY2F0aW9uO1xuXHRcdHRoaXMucGVyc3BlY3RpdmVVbmlmb3JtID0gdGhpcy5nbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5wcm9ncmFtLCAndV9wZXJzcGVjdGl2ZV9tYXRyaXgnKSBhcyBXZWJHTFVuaWZvcm1Mb2NhdGlvbjtcblxuXHRcdHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGhpcy5wb3NpdGlvbkF0dHJpYnV0ZSk7XG5cdFx0dGhpcy5nbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRoaXMucG9zaXRpb25BdHRyaWJ1dGUsIDMsIHRoaXMuZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcblxuXHRcdHRoaXMuZ2wuZW5hYmxlKHRoaXMuZ2wuREVQVEhfVEVTVCk7XG5cdFx0dGhpcy5nbC5lbmFibGUodGhpcy5nbC5DVUxMX0ZBQ0UpO1xuXHR9XG5cblx0Y2hhbmdlQ29sb3IoY29sb3I6IHN0cmluZyB8IENhbnZhc0dyYWRpZW50IHwgQ2FudmFzUGF0dGVybikge1xuXHRcdC8vXG5cdH1cblxuXHRkcmF3Q3ViZSh0cmFuc2Zvcm06IFRyYW5zZm9ybSkge1xuXHRcdGNvbnN0IGN1YmUgPSBnZXRDdWJlKCk7XG5cblx0XHR0aGlzLmdsLnVuaWZvcm0zZnYodGhpcy5vZmZzZXRVbmlmb3JtLCBbdHJhbnNmb3JtLnBvc2l0aW9uLngsIHRyYW5zZm9ybS5wb3NpdGlvbi55LCB0cmFuc2Zvcm0ucG9zaXRpb24uel0pO1xuXHRcdHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLm1vZGVsVW5pZm9ybSwgZmFsc2UsIHRoaXMubW9kZWxNYXRyaXgpO1xuXHRcdHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLnBlcnNwZWN0aXZlVW5pZm9ybSwgZmFsc2UsIHRoaXMucGVyc3BlY3RpdmVNYXRyaXgpO1xuXG5cdFx0dGhpcy5nbC5kcmF3RWxlbWVudHModGhpcy5nbC5UUklBTkdMRVMsIGN1YmUuaW5kaWNlcy5sZW5ndGgsIHRoaXMuZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuXHR9XG5cblx0Y2xlYXJTY3JlZW4oKSB7XG5cdFx0dGhpcy5nbC5jbGVhckNvbG9yKDAsIDAsIDAsIDEpO1xuXHRcdHRoaXMuZ2wuY2xlYXIodGhpcy5nbC5DT0xPUl9CVUZGRVJfQklUIHwgdGhpcy5nbC5ERVBUSF9CVUZGRVJfQklUKTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlU2hhZGVyKHR5cGU6IG51bWJlciwgc291cmNlOiBzdHJpbmcpOiBXZWJHTFNoYWRlciB7XG5cdFx0Y29uc3Qgc2hhZGVyID0gdGhpcy5nbC5jcmVhdGVTaGFkZXIodHlwZSkgYXMgV2ViR0xTaGFkZXI7XG5cblx0XHR0aGlzLmdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNvdXJjZSk7XG5cdFx0dGhpcy5nbC5jb21waWxlU2hhZGVyKHNoYWRlcik7XG5cblx0XHRjb25zdCBzdWNjZXNzID0gdGhpcy5nbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCB0aGlzLmdsLkNPTVBJTEVfU1RBVFVTKTtcblxuXHRcdGlmIChzdWNjZXNzKSB7XG5cdFx0XHRyZXR1cm4gc2hhZGVyIGFzIFdlYkdMU2hhZGVyO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKHRoaXMuZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpKTtcblx0XHR0aGlzLmdsLmRlbGV0ZVNoYWRlcihzaGFkZXIpO1xuXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwi0J7RiNC40LHQutCwINC/0YDQuCDQuNC90LjRhtC40LDQu9C40LfQsNGG0LjQuCDRiNC10LnQtNC10YDQsFwiKTtcblx0fVxuXG5cdHByaXZhdGUgY3JlYXRlUHJvZ3JhbSh2ZXJ0ZXhTaGFkZXI6IFdlYkdMU2hhZGVyLCBmcmFnbWVudFNoYWRlcjogV2ViR0xTaGFkZXIpOiBXZWJHTFByb2dyYW0ge1xuXHRcdGNvbnN0IHByb2dyYW0gPSB0aGlzLmdsLmNyZWF0ZVByb2dyYW0oKSBhcyBXZWJHTFByb2dyYW07XG5cblx0XHR0aGlzLmdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuXHRcdHRoaXMuZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcblxuXHRcdHRoaXMuZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cblx0XHRjb25zdCBzdWNjZXNzID0gdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIHRoaXMuZ2wuTElOS19TVEFUVVMpO1xuXG5cdFx0aWYgKHN1Y2Nlc3MpIHtcblx0XHRcdHJldHVybiBwcm9ncmFtO1xuXHRcdH1cblxuXHRcdGNvbnNvbGUubG9nKHRoaXMuZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuXHRcdHRoaXMuZ2wuZGVsZXRlUHJvZ3JhbShwcm9ncmFtKTtcblxuXHRcdHRocm93IG5ldyBFcnJvcihcItCe0YjQuNCx0LrQsCDQv9GA0Lgg0LjQvdC40YbQuNCw0LvQuNC30LDRhtC40Lgg0L/RgNC+0LPRgNCw0LzQvNGLXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGdldEN1YmUoKSB7XG5cdGNvbnN0IHZlcnRpY2VzID0gW1xuXHRcdC8vINC70LjRhtC10LLQsNGPINGH0LDRgdGC0Yxcblx0XHQtMC41LCAtMC41LCAwLjUsXG5cdFx0LTAuNSwgMC41LCAwLjUsXG5cdFx0MC41LCAwLjUsIDAuNSxcblx0XHQwLjUsIC0wLjUsIDAuNSxcblx0XHQvLyDQt9Cw0LTQvdGP0Y8g0YfQsNGB0YLRjFxuXHRcdC0wLjUsIC0wLjUsIC0wLjUsXG5cdFx0LTAuNSwgMC41LCAtMC41LFxuXHRcdDAuNSwgMC41LCAtMC41LFxuXHRcdDAuNSwgLTAuNSwgLTAuNVxuXHRdO1xuXG5cdGNvbnN0IGluZGljZXMgPSBbXG5cdFx0Ly8g0LvQuNGG0LXQstCw0Y8g0YfQsNGB0YLRjFxuXHRcdDIsIDEsIDAsXG5cdFx0MCwgMywgMixcblx0XHQvLyAvL9C90LjQttC90Y/RjyDRh9Cw0YHRgtGMXG5cdFx0MCwgNCwgNyxcblx0XHQ3LCAzLCAwLFxuXHRcdC8vIC8vINC70LXQstCw0Y8g0LHQvtC60L7QstCw0Y8g0YfQsNGB0YLRjFxuXHRcdDAsIDEsIDUsXG5cdFx0NSwgNCwgMCxcblx0XHQvLyAvLyDQv9GA0LDQstCw0Y8g0LHQvtC60L7QstCw0Y8g0YfQsNGB0YLRjFxuXHRcdDIsIDMsIDcsXG5cdFx0NywgNiwgMixcblx0XHQvLyAvLyDQstC10YDRhdC90Y/RjyDRh9Cw0YHRgtGMXG5cdFx0NiwgMSwgMixcblx0XHQ2LCA1LCAxLFxuXHRcdC8vIC8vINC30LDQtNC90Y/RjyDRh9Cw0YHRgtGMXG5cdFx0NCwgNSwgNixcblx0XHQ2LCA3LCA0LFxuXHRdO1xuXG5cdHJldHVybiB7XG5cdFx0dmVydGljZXMsXG5cdFx0aW5kaWNlc1xuXHR9O1xufVxuIiwiaW1wb3J0IFZlY3RvcjMgZnJvbSBcIi4vVmVjdG9yM1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFuc2Zvcm0ge1xuXHRwdWJsaWMgcG9zaXRpb246IFZlY3RvcjM7XG5cdHB1YmxpYyBhbmdsZTogVmVjdG9yMztcblx0cHVibGljIHNjYWxlOiBWZWN0b3IzO1xuXG5cdGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IzID0gVmVjdG9yMy56ZXJvKCksIGFuZ2xlOiBWZWN0b3IzID0gVmVjdG9yMy56ZXJvKCksIHNjYWxlOiBWZWN0b3IzID0gbmV3IFZlY3RvcjMoMSwgMSwgMSkpIHtcblx0XHR0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG5cdFx0dGhpcy5hbmdsZSA9IGFuZ2xlO1xuXHRcdHRoaXMuc2NhbGUgPSBzY2FsZTtcblx0fVxuXG5cdHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpIHtcblx0XHR0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3RvcjMoeCwgeSwgeik7XG5cdH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjMge1xuXHRjb25zdHJ1Y3RvcihwdWJsaWMgeDogbnVtYmVyLCBwdWJsaWMgeTogbnVtYmVyLCBwdWJsaWMgejogbnVtYmVyKSB7IH1cblxuXHRzdGF0aWMgemVybygpIHtcblx0XHRyZXR1cm4gbmV3IFZlY3RvcjMoMCwgMCwgMCk7XG5cdH1cbn1cbiIsImV4cG9ydCBjb25zdCBNQVBfSEVJR0hUID0gMTY7XG5leHBvcnQgY29uc3QgQ0hVTktfU0laRSA9IDE2O1xuZXhwb3J0IGNvbnN0IE1BUF9TSVpFID0gNDtcblxuZXhwb3J0IGNvbnN0IE5PSVNFX0NPVU5UID0gODtcbiIsIlxuLyohXG5AZmlsZW92ZXJ2aWV3IGdsLW1hdHJpeCAtIEhpZ2ggcGVyZm9ybWFuY2UgbWF0cml4IGFuZCB2ZWN0b3Igb3BlcmF0aW9uc1xuQGF1dGhvciBCcmFuZG9uIEpvbmVzXG5AYXV0aG9yIENvbGluIE1hY0tlbnppZSBJVlxuQHZlcnNpb24gMy40LjBcblxuQ29weXJpZ2h0IChjKSAyMDE1LTIwMjEsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuXG4qL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gdHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsVGhpcyA6IGdsb2JhbCB8fCBzZWxmLCBmYWN0b3J5KGdsb2JhbC5nbE1hdHJpeCA9IHt9KSk7XG59KSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBDb21tb24gdXRpbGl0aWVzXG4gICAqIEBtb2R1bGUgZ2xNYXRyaXhcbiAgICovXG4gIC8vIENvbmZpZ3VyYXRpb24gQ29uc3RhbnRzXG4gIHZhciBFUFNJTE9OID0gMC4wMDAwMDE7XG4gIHZhciBBUlJBWV9UWVBFID0gdHlwZW9mIEZsb2F0MzJBcnJheSAhPT0gXCJ1bmRlZmluZWRcIiA/IEZsb2F0MzJBcnJheSA6IEFycmF5O1xuICB2YXIgUkFORE9NID0gTWF0aC5yYW5kb207XG4gIHZhciBBTkdMRV9PUkRFUiA9IFwienl4XCI7XG4gIC8qKlxuICAgKiBTZXRzIHRoZSB0eXBlIG9mIGFycmF5IHVzZWQgd2hlbiBjcmVhdGluZyBuZXcgdmVjdG9ycyBhbmQgbWF0cmljZXNcbiAgICpcbiAgICogQHBhcmFtIHtGbG9hdDMyQXJyYXlDb25zdHJ1Y3RvciB8IEFycmF5Q29uc3RydWN0b3J9IHR5cGUgQXJyYXkgdHlwZSwgc3VjaCBhcyBGbG9hdDMyQXJyYXkgb3IgQXJyYXlcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0TWF0cml4QXJyYXlUeXBlKHR5cGUpIHtcbiAgICBBUlJBWV9UWVBFID0gdHlwZTtcbiAgfVxuICB2YXIgZGVncmVlID0gTWF0aC5QSSAvIDE4MDtcbiAgLyoqXG4gICAqIENvbnZlcnQgRGVncmVlIFRvIFJhZGlhblxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gYSBBbmdsZSBpbiBEZWdyZWVzXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRvUmFkaWFuKGEpIHtcbiAgICByZXR1cm4gYSAqIGRlZ3JlZTtcbiAgfVxuICAvKipcbiAgICogVGVzdHMgd2hldGhlciBvciBub3QgdGhlIGFyZ3VtZW50cyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgdmFsdWUsIHdpdGhpbiBhbiBhYnNvbHV0ZVxuICAgKiBvciByZWxhdGl2ZSB0b2xlcmFuY2Ugb2YgZ2xNYXRyaXguRVBTSUxPTiAoYW4gYWJzb2x1dGUgdG9sZXJhbmNlIGlzIHVzZWQgZm9yIHZhbHVlcyBsZXNzXG4gICAqIHRoYW4gb3IgZXF1YWwgdG8gMS4wLCBhbmQgYSByZWxhdGl2ZSB0b2xlcmFuY2UgaXMgdXNlZCBmb3IgbGFyZ2VyIHZhbHVlcylcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IG51bWJlciB0byB0ZXN0LlxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBUaGUgc2Vjb25kIG51bWJlciB0byB0ZXN0LlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBlcXVhbHMkOShhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhKSwgTWF0aC5hYnMoYikpO1xuICB9XG4gIGlmICghTWF0aC5oeXBvdCkgTWF0aC5oeXBvdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgeSA9IDAsXG4gICAgICAgIGkgPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgeSArPSBhcmd1bWVudHNbaV0gKiBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hdGguc3FydCh5KTtcbiAgfTtcblxuICB2YXIgY29tbW9uID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBFUFNJTE9OOiBFUFNJTE9OLFxuICAgIGdldCBBUlJBWV9UWVBFICgpIHsgcmV0dXJuIEFSUkFZX1RZUEU7IH0sXG4gICAgUkFORE9NOiBSQU5ET00sXG4gICAgQU5HTEVfT1JERVI6IEFOR0xFX09SREVSLFxuICAgIHNldE1hdHJpeEFycmF5VHlwZTogc2V0TWF0cml4QXJyYXlUeXBlLFxuICAgIHRvUmFkaWFuOiB0b1JhZGlhbixcbiAgICBlcXVhbHM6IGVxdWFscyQ5XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAyeDIgTWF0cml4XG4gICAqIEBtb2R1bGUgbWF0MlxuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBtYXQyXG4gICAqXG4gICAqIEByZXR1cm5zIHttYXQyfSBhIG5ldyAyeDIgbWF0cml4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZSQ4KCkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg0KTtcblxuICAgIGlmIChBUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgICAgb3V0WzFdID0gMDtcbiAgICAgIG91dFsyXSA9IDA7XG4gICAgfVxuXG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbM10gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgbWF0MiBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSBtYXRyaXggdG8gY2xvbmVcbiAgICogQHJldHVybnMge21hdDJ9IGEgbmV3IDJ4MiBtYXRyaXhcbiAgICovXG5cbiAgZnVuY3Rpb24gY2xvbmUkOChhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDQpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDIgdG8gYW5vdGhlclxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvcHkkOChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCBhIG1hdDIgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlkZW50aXR5JDUob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbWF0MiB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMCBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAwKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAzKVxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0IEEgbmV3IDJ4MiBtYXRyaXhcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVZhbHVlcyQ4KG0wMCwgbTAxLCBtMTAsIG0xMSkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSBtMDA7XG4gICAgb3V0WzFdID0gbTAxO1xuICAgIG91dFsyXSA9IG0xMDtcbiAgICBvdXRbM10gPSBtMTE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgbWF0MiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMSBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDIpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMylcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzZXQkOChvdXQsIG0wMCwgbTAxLCBtMTAsIG0xMSkge1xuICAgIG91dFswXSA9IG0wMDtcbiAgICBvdXRbMV0gPSBtMDE7XG4gICAgb3V0WzJdID0gbTEwO1xuICAgIG91dFszXSA9IG0xMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDJcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc3Bvc2UkMihvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlXG4gICAgLy8gc29tZSB2YWx1ZXNcbiAgICBpZiAob3V0ID09PSBhKSB7XG4gICAgICB2YXIgYTEgPSBhWzFdO1xuICAgICAgb3V0WzFdID0gYVsyXTtcbiAgICAgIG91dFsyXSA9IGExO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgb3V0WzFdID0gYVsyXTtcbiAgICAgIG91dFsyXSA9IGFbMV07XG4gICAgICBvdXRbM10gPSBhWzNdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEludmVydHMgYSBtYXQyXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaW52ZXJ0JDUob3V0LCBhKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl0sXG4gICAgICAgIGEzID0gYVszXTsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gICAgdmFyIGRldCA9IGEwICogYTMgLSBhMiAqIGExO1xuXG4gICAgaWYgKCFkZXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGRldCA9IDEuMCAvIGRldDtcbiAgICBvdXRbMF0gPSBhMyAqIGRldDtcbiAgICBvdXRbMV0gPSAtYTEgKiBkZXQ7XG4gICAgb3V0WzJdID0gLWEyICogZGV0O1xuICAgIG91dFszXSA9IGEwICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0MlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkam9pbnQkMihvdXQsIGEpIHtcbiAgICAvLyBDYWNoaW5nIHRoaXMgdmFsdWUgaXMgbmVjZXNzYXJ5IGlmIG91dCA9PSBhXG4gICAgdmFyIGEwID0gYVswXTtcbiAgICBvdXRbMF0gPSBhWzNdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGEwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0MlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRldGVybWluYW50JDMoYSkge1xuICAgIHJldHVybiBhWzBdICogYVszXSAtIGFbMl0gKiBhWzFdO1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byBtYXQyJ3NcbiAgICpcbiAgICogQHBhcmFtIHttYXQyfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHkkOChvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdO1xuICAgIHZhciBiMCA9IGJbMF0sXG4gICAgICAgIGIxID0gYlsxXSxcbiAgICAgICAgYjIgPSBiWzJdLFxuICAgICAgICBiMyA9IGJbM107XG4gICAgb3V0WzBdID0gYTAgKiBiMCArIGEyICogYjE7XG4gICAgb3V0WzFdID0gYTEgKiBiMCArIGEzICogYjE7XG4gICAgb3V0WzJdID0gYTAgKiBiMiArIGEyICogYjM7XG4gICAgb3V0WzNdID0gYTEgKiBiMiArIGEzICogYjM7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIG1hdDIgYnkgdGhlIGdpdmVuIGFuZ2xlXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlJDQob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdO1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgb3V0WzBdID0gYTAgKiBjICsgYTIgKiBzO1xuICAgIG91dFsxXSA9IGExICogYyArIGEzICogcztcbiAgICBvdXRbMl0gPSBhMCAqIC1zICsgYTIgKiBjO1xuICAgIG91dFszXSA9IGExICogLXMgKyBhMyAqIGM7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2NhbGVzIHRoZSBtYXQyIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IHRoZSB2ZWMyIHRvIHNjYWxlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKiovXG5cbiAgZnVuY3Rpb24gc2NhbGUkOChvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdO1xuICAgIHZhciB2MCA9IHZbMF0sXG4gICAgICAgIHYxID0gdlsxXTtcbiAgICBvdXRbMF0gPSBhMCAqIHYwO1xuICAgIG91dFsxXSA9IGExICogdjA7XG4gICAgb3V0WzJdID0gYTIgKiB2MTtcbiAgICBvdXRbM10gPSBhMyAqIHYxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIGdpdmVuIGFuZ2xlXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0Mi5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDIucm90YXRlKGRlc3QsIGRlc3QsIHJhZCk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IG1hdDIgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tUm90YXRpb24kNChvdXQsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgb3V0WzBdID0gYztcbiAgICBvdXRbMV0gPSBzO1xuICAgIG91dFsyXSA9IC1zO1xuICAgIG91dFszXSA9IGM7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHNjYWxpbmdcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQyLmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0Mi5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDJ9IG91dCBtYXQyIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IFNjYWxpbmcgdmVjdG9yXG4gICAqIEByZXR1cm5zIHttYXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVNjYWxpbmckMyhvdXQsIHYpIHtcbiAgICBvdXRbMF0gPSB2WzBdO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSB2WzFdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBtYXQyXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIG1hdHJpeCB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBtYXRyaXhcbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyJDgoYSkge1xuICAgIHJldHVybiBcIm1hdDIoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiLCBcIiArIGFbMl0gKyBcIiwgXCIgKyBhWzNdICsgXCIpXCI7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgRnJvYmVuaXVzIG5vcm0gb2YgYSBtYXQyXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb2IkMyhhKSB7XG4gICAgcmV0dXJuIE1hdGguaHlwb3QoYVswXSwgYVsxXSwgYVsyXSwgYVszXSk7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgTCwgRCBhbmQgVSBtYXRyaWNlcyAoTG93ZXIgdHJpYW5ndWxhciwgRGlhZ29uYWwgYW5kIFVwcGVyIHRyaWFuZ3VsYXIpIGJ5IGZhY3Rvcml6aW5nIHRoZSBpbnB1dCBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IEwgdGhlIGxvd2VyIHRyaWFuZ3VsYXIgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBEIHRoZSBkaWFnb25hbCBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IFUgdGhlIHVwcGVyIHRyaWFuZ3VsYXIgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBpbnB1dCBtYXRyaXggdG8gZmFjdG9yaXplXG4gICAqL1xuXG4gIGZ1bmN0aW9uIExEVShMLCBELCBVLCBhKSB7XG4gICAgTFsyXSA9IGFbMl0gLyBhWzBdO1xuICAgIFVbMF0gPSBhWzBdO1xuICAgIFVbMV0gPSBhWzFdO1xuICAgIFVbM10gPSBhWzNdIC0gTFsyXSAqIFVbMV07XG4gICAgcmV0dXJuIFtMLCBELCBVXTtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gbWF0MidzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkZCQ4KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7bWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0JDYob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAtIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAtIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAtIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSAtIGJbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSBUaGUgZmlyc3QgbWF0cml4LlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBleGFjdEVxdWFscyQ4KGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSBUaGUgZmlyc3QgbWF0cml4LlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBlcXVhbHMkOChhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl0sXG4gICAgICAgIGEzID0gYVszXTtcbiAgICB2YXIgYjAgPSBiWzBdLFxuICAgICAgICBiMSA9IGJbMV0sXG4gICAgICAgIGIyID0gYlsyXSxcbiAgICAgICAgYjMgPSBiWzNdO1xuICAgIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJiBNYXRoLmFicyhhMyAtIGIzKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSk7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseVNjYWxhciQzKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIG1hdDIncyBhZnRlciBtdWx0aXBseWluZyBlYWNoIGVsZW1lbnQgb2YgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0Mn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYidzIGVsZW1lbnRzIGJ5IGJlZm9yZSBhZGRpbmdcbiAgICogQHJldHVybnMge21hdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseVNjYWxhckFuZEFkZCQzKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgbWF0Mi5tdWx0aXBseX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBtdWwkOCA9IG11bHRpcGx5JDg7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDIuc3VidHJhY3R9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3ViJDYgPSBzdWJ0cmFjdCQ2O1xuXG4gIHZhciBtYXQyID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBjcmVhdGU6IGNyZWF0ZSQ4LFxuICAgIGNsb25lOiBjbG9uZSQ4LFxuICAgIGNvcHk6IGNvcHkkOCxcbiAgICBpZGVudGl0eTogaWRlbnRpdHkkNSxcbiAgICBmcm9tVmFsdWVzOiBmcm9tVmFsdWVzJDgsXG4gICAgc2V0OiBzZXQkOCxcbiAgICB0cmFuc3Bvc2U6IHRyYW5zcG9zZSQyLFxuICAgIGludmVydDogaW52ZXJ0JDUsXG4gICAgYWRqb2ludDogYWRqb2ludCQyLFxuICAgIGRldGVybWluYW50OiBkZXRlcm1pbmFudCQzLFxuICAgIG11bHRpcGx5OiBtdWx0aXBseSQ4LFxuICAgIHJvdGF0ZTogcm90YXRlJDQsXG4gICAgc2NhbGU6IHNjYWxlJDgsXG4gICAgZnJvbVJvdGF0aW9uOiBmcm9tUm90YXRpb24kNCxcbiAgICBmcm9tU2NhbGluZzogZnJvbVNjYWxpbmckMyxcbiAgICBzdHI6IHN0ciQ4LFxuICAgIGZyb2I6IGZyb2IkMyxcbiAgICBMRFU6IExEVSxcbiAgICBhZGQ6IGFkZCQ4LFxuICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCQ2LFxuICAgIGV4YWN0RXF1YWxzOiBleGFjdEVxdWFscyQ4LFxuICAgIGVxdWFsczogZXF1YWxzJDgsXG4gICAgbXVsdGlwbHlTY2FsYXI6IG11bHRpcGx5U2NhbGFyJDMsXG4gICAgbXVsdGlwbHlTY2FsYXJBbmRBZGQ6IG11bHRpcGx5U2NhbGFyQW5kQWRkJDMsXG4gICAgbXVsOiBtdWwkOCxcbiAgICBzdWI6IHN1YiQ2XG4gIH0pO1xuXG4gIC8qKlxuICAgKiAyeDMgTWF0cml4XG4gICAqIEBtb2R1bGUgbWF0MmRcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEEgbWF0MmQgY29udGFpbnMgc2l4IGVsZW1lbnRzIGRlZmluZWQgYXM6XG4gICAqIDxwcmU+XG4gICAqIFthLCBiLFxuICAgKiAgYywgZCxcbiAgICogIHR4LCB0eV1cbiAgICogPC9wcmU+XG4gICAqIFRoaXMgaXMgYSBzaG9ydCBmb3JtIGZvciB0aGUgM3gzIG1hdHJpeDpcbiAgICogPHByZT5cbiAgICogW2EsIGIsIDAsXG4gICAqICBjLCBkLCAwLFxuICAgKiAgdHgsIHR5LCAxXVxuICAgKiA8L3ByZT5cbiAgICogVGhlIGxhc3QgY29sdW1uIGlzIGlnbm9yZWQgc28gdGhlIGFycmF5IGlzIHNob3J0ZXIgYW5kIG9wZXJhdGlvbnMgYXJlIGZhc3Rlci5cbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgbWF0MmRcbiAgICpcbiAgICogQHJldHVybnMge21hdDJkfSBhIG5ldyAyeDMgbWF0cml4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZSQ3KCkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg2KTtcblxuICAgIGlmIChBUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgICAgb3V0WzFdID0gMDtcbiAgICAgIG91dFsyXSA9IDA7XG4gICAgICBvdXRbNF0gPSAwO1xuICAgICAgb3V0WzVdID0gMDtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBtYXQyZCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIG1hdHJpeFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgbWF0cml4IHRvIGNsb25lXG4gICAqIEByZXR1cm5zIHttYXQyZH0gYSBuZXcgMngzIG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBjbG9uZSQ3KGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoNik7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDJkIHRvIGFub3RoZXJcbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBjb3B5JDcob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IGEgbWF0MmQgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaWRlbnRpdHkkNChvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbWF0MmQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBhIENvbXBvbmVudCBBIChpbmRleCAwKVxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBDb21wb25lbnQgQiAoaW5kZXggMSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGMgQ29tcG9uZW50IEMgKGluZGV4IDIpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBkIENvbXBvbmVudCBEIChpbmRleCAzKVxuICAgKiBAcGFyYW0ge051bWJlcn0gdHggQ29tcG9uZW50IFRYIChpbmRleCA0KVxuICAgKiBAcGFyYW0ge051bWJlcn0gdHkgQ29tcG9uZW50IFRZIChpbmRleCA1KVxuICAgKiBAcmV0dXJucyB7bWF0MmR9IEEgbmV3IG1hdDJkXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21WYWx1ZXMkNyhhLCBiLCBjLCBkLCB0eCwgdHkpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoNik7XG4gICAgb3V0WzBdID0gYTtcbiAgICBvdXRbMV0gPSBiO1xuICAgIG91dFsyXSA9IGM7XG4gICAgb3V0WzNdID0gZDtcbiAgICBvdXRbNF0gPSB0eDtcbiAgICBvdXRbNV0gPSB0eTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBtYXQyZCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge051bWJlcn0gYSBDb21wb25lbnQgQSAoaW5kZXggMClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGIgQ29tcG9uZW50IEIgKGluZGV4IDEpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjIENvbXBvbmVudCBDIChpbmRleCAyKVxuICAgKiBAcGFyYW0ge051bWJlcn0gZCBDb21wb25lbnQgRCAoaW5kZXggMylcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR4IENvbXBvbmVudCBUWCAoaW5kZXggNClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHR5IENvbXBvbmVudCBUWSAoaW5kZXggNSlcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0JDcob3V0LCBhLCBiLCBjLCBkLCB0eCwgdHkpIHtcbiAgICBvdXRbMF0gPSBhO1xuICAgIG91dFsxXSA9IGI7XG4gICAgb3V0WzJdID0gYztcbiAgICBvdXRbM10gPSBkO1xuICAgIG91dFs0XSA9IHR4O1xuICAgIG91dFs1XSA9IHR5O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEludmVydHMgYSBtYXQyZFxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGludmVydCQ0KG91dCwgYSkge1xuICAgIHZhciBhYSA9IGFbMF0sXG4gICAgICAgIGFiID0gYVsxXSxcbiAgICAgICAgYWMgPSBhWzJdLFxuICAgICAgICBhZCA9IGFbM107XG4gICAgdmFyIGF0eCA9IGFbNF0sXG4gICAgICAgIGF0eSA9IGFbNV07XG4gICAgdmFyIGRldCA9IGFhICogYWQgLSBhYiAqIGFjO1xuXG4gICAgaWYgKCFkZXQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGRldCA9IDEuMCAvIGRldDtcbiAgICBvdXRbMF0gPSBhZCAqIGRldDtcbiAgICBvdXRbMV0gPSAtYWIgKiBkZXQ7XG4gICAgb3V0WzJdID0gLWFjICogZGV0O1xuICAgIG91dFszXSA9IGFhICogZGV0O1xuICAgIG91dFs0XSA9IChhYyAqIGF0eSAtIGFkICogYXR4KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYWIgKiBhdHggLSBhYSAqIGF0eSkgKiBkZXQ7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXQyZFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICAgKi9cblxuICBmdW5jdGlvbiBkZXRlcm1pbmFudCQyKGEpIHtcbiAgICByZXR1cm4gYVswXSAqIGFbM10gLSBhWzFdICogYVsyXTtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbGllcyB0d28gbWF0MmQnc1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHkkNyhvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdLFxuICAgICAgICBhNCA9IGFbNF0sXG4gICAgICAgIGE1ID0gYVs1XTtcbiAgICB2YXIgYjAgPSBiWzBdLFxuICAgICAgICBiMSA9IGJbMV0sXG4gICAgICAgIGIyID0gYlsyXSxcbiAgICAgICAgYjMgPSBiWzNdLFxuICAgICAgICBiNCA9IGJbNF0sXG4gICAgICAgIGI1ID0gYls1XTtcbiAgICBvdXRbMF0gPSBhMCAqIGIwICsgYTIgKiBiMTtcbiAgICBvdXRbMV0gPSBhMSAqIGIwICsgYTMgKiBiMTtcbiAgICBvdXRbMl0gPSBhMCAqIGIyICsgYTIgKiBiMztcbiAgICBvdXRbM10gPSBhMSAqIGIyICsgYTMgKiBiMztcbiAgICBvdXRbNF0gPSBhMCAqIGI0ICsgYTIgKiBiNSArIGE0O1xuICAgIG91dFs1XSA9IGExICogYjQgKyBhMyAqIGI1ICsgYTU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIG1hdDJkIGJ5IHRoZSBnaXZlbiBhbmdsZVxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZSQzKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl0sXG4gICAgICAgIGEzID0gYVszXSxcbiAgICAgICAgYTQgPSBhWzRdLFxuICAgICAgICBhNSA9IGFbNV07XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBhMCAqIGMgKyBhMiAqIHM7XG4gICAgb3V0WzFdID0gYTEgKiBjICsgYTMgKiBzO1xuICAgIG91dFsyXSA9IGEwICogLXMgKyBhMiAqIGM7XG4gICAgb3V0WzNdID0gYTEgKiAtcyArIGEzICogYztcbiAgICBvdXRbNF0gPSBhNDtcbiAgICBvdXRbNV0gPSBhNTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTY2FsZXMgdGhlIG1hdDJkIGJ5IHRoZSBkaW1lbnNpb25zIGluIHRoZSBnaXZlbiB2ZWMyXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIG1hdHJpeCB0byB0cmFuc2xhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgdGhlIHZlYzIgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKiovXG5cbiAgZnVuY3Rpb24gc2NhbGUkNyhvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdLFxuICAgICAgICBhNCA9IGFbNF0sXG4gICAgICAgIGE1ID0gYVs1XTtcbiAgICB2YXIgdjAgPSB2WzBdLFxuICAgICAgICB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTAgKiB2MDtcbiAgICBvdXRbMV0gPSBhMSAqIHYwO1xuICAgIG91dFsyXSA9IGEyICogdjE7XG4gICAgb3V0WzNdID0gYTMgKiB2MTtcbiAgICBvdXRbNF0gPSBhNDtcbiAgICBvdXRbNV0gPSBhNTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2xhdGVzIHRoZSBtYXQyZCBieSB0aGUgZGltZW5zaW9ucyBpbiB0aGUgZ2l2ZW4gdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IHRoZSB2ZWMyIHRvIHRyYW5zbGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqKi9cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUkMyhvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdLFxuICAgICAgICBhNCA9IGFbNF0sXG4gICAgICAgIGE1ID0gYVs1XTtcbiAgICB2YXIgdjAgPSB2WzBdLFxuICAgICAgICB2MSA9IHZbMV07XG4gICAgb3V0WzBdID0gYTA7XG4gICAgb3V0WzFdID0gYTE7XG4gICAgb3V0WzJdID0gYTI7XG4gICAgb3V0WzNdID0gYTM7XG4gICAgb3V0WzRdID0gYTAgKiB2MCArIGEyICogdjEgKyBhNDtcbiAgICBvdXRbNV0gPSBhMSAqIHYwICsgYTMgKiB2MSArIGE1O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIGdpdmVuIGFuZ2xlXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0MmQuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQyZC5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IG1hdDJkIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21Sb3RhdGlvbiQzKG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBjO1xuICAgIG91dFsxXSA9IHM7XG4gICAgb3V0WzJdID0gLXM7XG4gICAgb3V0WzNdID0gYztcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHNjYWxpbmdcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQyZC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDJkLnNjYWxlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCBtYXQyZCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gdiBTY2FsaW5nIHZlY3RvclxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tU2NhbGluZyQyKG91dCwgdikge1xuICAgIG91dFswXSA9IHZbMF07XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IHZbMV07XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIHZlY3RvciB0cmFuc2xhdGlvblxuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDJkLmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0MmQudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCBtYXQyZCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAgICogQHJldHVybnMge21hdDJkfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVRyYW5zbGF0aW9uJDMob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICBvdXRbNF0gPSB2WzBdO1xuICAgIG91dFs1XSA9IHZbMV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDJkXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSBtYXRyaXggdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbWF0cml4XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0ciQ3KGEpIHtcbiAgICByZXR1cm4gXCJtYXQyZChcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIiwgXCIgKyBhWzRdICsgXCIsIFwiICsgYVs1XSArIFwiKVwiO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0MmRcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBtYXRyaXggdG8gY2FsY3VsYXRlIEZyb2Jlbml1cyBub3JtIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IEZyb2Jlbml1cyBub3JtXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb2IkMihhKSB7XG4gICAgcmV0dXJuIE1hdGguaHlwb3QoYVswXSwgYVsxXSwgYVsyXSwgYVszXSwgYVs0XSwgYVs1XSwgMSk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIG1hdDJkJ3NcbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkZCQ3KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gKyBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gKyBiWzVdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyBtYXRyaXggYiBmcm9tIG1hdHJpeCBhXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0MmR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzdWJ0cmFjdCQ1KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDJkfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBtYXRyaXggdG8gc2NhbGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSBtYXRyaXgncyBlbGVtZW50cyBieVxuICAgKiBAcmV0dXJucyB7bWF0MmR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseVNjYWxhciQyKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIG91dFs0XSA9IGFbNF0gKiBiO1xuICAgIG91dFs1XSA9IGFbNV0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIG1hdDJkJ3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHttYXQyZH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXG4gICAqIEByZXR1cm5zIHttYXQyZH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5U2NhbGFyQW5kQWRkJDIob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdICogc2NhbGU7XG4gICAgb3V0WzRdID0gYVs0XSArIGJbNF0gKiBzY2FsZTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XSAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG1hdHJpY2VzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBleGFjdEVxdWFscyQ3KGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXSAmJiBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV07XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG1hdHJpY2VzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIFRoZSBmaXJzdCBtYXRyaXguXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQyZH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBlcXVhbHMkNyhhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl0sXG4gICAgICAgIGEzID0gYVszXSxcbiAgICAgICAgYTQgPSBhWzRdLFxuICAgICAgICBhNSA9IGFbNV07XG4gICAgdmFyIGIwID0gYlswXSxcbiAgICAgICAgYjEgPSBiWzFdLFxuICAgICAgICBiMiA9IGJbMl0sXG4gICAgICAgIGIzID0gYlszXSxcbiAgICAgICAgYjQgPSBiWzRdLFxuICAgICAgICBiNSA9IGJbNV07XG4gICAgcmV0dXJuIE1hdGguYWJzKGEwIC0gYjApIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEwKSwgTWF0aC5hYnMoYjApKSAmJiBNYXRoLmFicyhhMSAtIGIxKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMSksIE1hdGguYWJzKGIxKSkgJiYgTWF0aC5hYnMoYTIgLSBiMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTIpLCBNYXRoLmFicyhiMikpICYmIE1hdGguYWJzKGEzIC0gYjMpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEzKSwgTWF0aC5hYnMoYjMpKSAmJiBNYXRoLmFicyhhNCAtIGI0KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNCksIE1hdGguYWJzKGI0KSkgJiYgTWF0aC5hYnMoYTUgLSBiNSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTUpLCBNYXRoLmFicyhiNSkpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDJkLm11bHRpcGx5fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG11bCQ3ID0gbXVsdGlwbHkkNztcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgbWF0MmQuc3VidHJhY3R9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3ViJDUgPSBzdWJ0cmFjdCQ1O1xuXG4gIHZhciBtYXQyZCA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgY3JlYXRlOiBjcmVhdGUkNyxcbiAgICBjbG9uZTogY2xvbmUkNyxcbiAgICBjb3B5OiBjb3B5JDcsXG4gICAgaWRlbnRpdHk6IGlkZW50aXR5JDQsXG4gICAgZnJvbVZhbHVlczogZnJvbVZhbHVlcyQ3LFxuICAgIHNldDogc2V0JDcsXG4gICAgaW52ZXJ0OiBpbnZlcnQkNCxcbiAgICBkZXRlcm1pbmFudDogZGV0ZXJtaW5hbnQkMixcbiAgICBtdWx0aXBseTogbXVsdGlwbHkkNyxcbiAgICByb3RhdGU6IHJvdGF0ZSQzLFxuICAgIHNjYWxlOiBzY2FsZSQ3LFxuICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlJDMsXG4gICAgZnJvbVJvdGF0aW9uOiBmcm9tUm90YXRpb24kMyxcbiAgICBmcm9tU2NhbGluZzogZnJvbVNjYWxpbmckMixcbiAgICBmcm9tVHJhbnNsYXRpb246IGZyb21UcmFuc2xhdGlvbiQzLFxuICAgIHN0cjogc3RyJDcsXG4gICAgZnJvYjogZnJvYiQyLFxuICAgIGFkZDogYWRkJDcsXG4gICAgc3VidHJhY3Q6IHN1YnRyYWN0JDUsXG4gICAgbXVsdGlwbHlTY2FsYXI6IG11bHRpcGx5U2NhbGFyJDIsXG4gICAgbXVsdGlwbHlTY2FsYXJBbmRBZGQ6IG11bHRpcGx5U2NhbGFyQW5kQWRkJDIsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzJDcsXG4gICAgZXF1YWxzOiBlcXVhbHMkNyxcbiAgICBtdWw6IG11bCQ3LFxuICAgIHN1Yjogc3ViJDVcbiAgfSk7XG5cbiAgLyoqXG4gICAqIDN4MyBNYXRyaXhcbiAgICogQG1vZHVsZSBtYXQzXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDNcbiAgICpcbiAgICogQHJldHVybnMge21hdDN9IGEgbmV3IDN4MyBtYXRyaXhcbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlJDYoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDkpO1xuXG4gICAgaWYgKEFSUkFZX1RZUEUgIT0gRmxvYXQzMkFycmF5KSB7XG4gICAgICBvdXRbMV0gPSAwO1xuICAgICAgb3V0WzJdID0gMDtcbiAgICAgIG91dFszXSA9IDA7XG4gICAgICBvdXRbNV0gPSAwO1xuICAgICAgb3V0WzZdID0gMDtcbiAgICAgIG91dFs3XSA9IDA7XG4gICAgfVxuXG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbNF0gPSAxO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ29waWVzIHRoZSB1cHBlci1sZWZ0IDN4MyB2YWx1ZXMgaW50byB0aGUgZ2l2ZW4gbWF0My5cbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyAzeDMgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhICAgdGhlIHNvdXJjZSA0eDQgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbU1hdDQkMShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzRdO1xuICAgIG91dFs0XSA9IGFbNV07XG4gICAgb3V0WzVdID0gYVs2XTtcbiAgICBvdXRbNl0gPSBhWzhdO1xuICAgIG91dFs3XSA9IGFbOV07XG4gICAgb3V0WzhdID0gYVsxMF07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBtYXQzIGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIG1hdHJpeCB0byBjbG9uZVxuICAgKiBAcmV0dXJucyB7bWF0M30gYSBuZXcgM3gzIG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBjbG9uZSQ2KGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoOSk7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDMgdG8gYW5vdGhlclxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvcHkkNihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgbWF0MyB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMCBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAwKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMCBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAzKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTExIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDEgcG9zaXRpb24gKGluZGV4IDQpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTIgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggNSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMCBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA2KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDcpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggOClcbiAgICogQHJldHVybnMge21hdDN9IEEgbmV3IG1hdDNcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVZhbHVlcyQ2KG0wMCwgbTAxLCBtMDIsIG0xMCwgbTExLCBtMTIsIG0yMCwgbTIxLCBtMjIpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoOSk7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTEwO1xuICAgIG91dFs0XSA9IG0xMTtcbiAgICBvdXRbNV0gPSBtMTI7XG4gICAgb3V0WzZdID0gbTIwO1xuICAgIG91dFs3XSA9IG0yMTtcbiAgICBvdXRbOF0gPSBtMjI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgbWF0MyB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDAgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMSBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAxIHBvc2l0aW9uIChpbmRleCAxKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAyIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDIgcG9zaXRpb24gKGluZGV4IDIpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMylcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA0KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDUpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMSBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA3KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDgpXG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0JDYob3V0LCBtMDAsIG0wMSwgbTAyLCBtMTAsIG0xMSwgbTEyLCBtMjAsIG0yMSwgbTIyKSB7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTEwO1xuICAgIG91dFs0XSA9IG0xMTtcbiAgICBvdXRbNV0gPSBtMTI7XG4gICAgb3V0WzZdID0gbTIwO1xuICAgIG91dFs3XSA9IG0yMTtcbiAgICBvdXRbOF0gPSBtMjI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IGEgbWF0MyB0byB0aGUgaWRlbnRpdHkgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaWRlbnRpdHkkMyhvdXQpIHtcbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDE7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDNcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc3Bvc2UkMShvdXQsIGEpIHtcbiAgICAvLyBJZiB3ZSBhcmUgdHJhbnNwb3Npbmcgb3Vyc2VsdmVzIHdlIGNhbiBza2lwIGEgZmV3IHN0ZXBzIGJ1dCBoYXZlIHRvIGNhY2hlIHNvbWUgdmFsdWVzXG4gICAgaWYgKG91dCA9PT0gYSkge1xuICAgICAgdmFyIGEwMSA9IGFbMV0sXG4gICAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgICBhMTIgPSBhWzVdO1xuICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgIG91dFsyXSA9IGFbNl07XG4gICAgICBvdXRbM10gPSBhMDE7XG4gICAgICBvdXRbNV0gPSBhWzddO1xuICAgICAgb3V0WzZdID0gYTAyO1xuICAgICAgb3V0WzddID0gYTEyO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgb3V0WzFdID0gYVszXTtcbiAgICAgIG91dFsyXSA9IGFbNl07XG4gICAgICBvdXRbM10gPSBhWzFdO1xuICAgICAgb3V0WzRdID0gYVs0XTtcbiAgICAgIG91dFs1XSA9IGFbN107XG4gICAgICBvdXRbNl0gPSBhWzJdO1xuICAgICAgb3V0WzddID0gYVs1XTtcbiAgICAgIG91dFs4XSA9IGFbOF07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogSW52ZXJ0cyBhIG1hdDNcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZlcnQkMyhvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXTtcbiAgICB2YXIgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XTtcbiAgICB2YXIgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XTtcbiAgICB2YXIgYjAxID0gYTIyICogYTExIC0gYTEyICogYTIxO1xuICAgIHZhciBiMTEgPSAtYTIyICogYTEwICsgYTEyICogYTIwO1xuICAgIHZhciBiMjEgPSBhMjEgKiBhMTAgLSBhMTEgKiBhMjA7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICAgIHZhciBkZXQgPSBhMDAgKiBiMDEgKyBhMDEgKiBiMTEgKyBhMDIgKiBiMjE7XG5cbiAgICBpZiAoIWRldCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuICAgIG91dFswXSA9IGIwMSAqIGRldDtcbiAgICBvdXRbMV0gPSAoLWEyMiAqIGEwMSArIGEwMiAqIGEyMSkgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMiAqIGEwMSAtIGEwMiAqIGExMSkgKiBkZXQ7XG4gICAgb3V0WzNdID0gYjExICogZGV0O1xuICAgIG91dFs0XSA9IChhMjIgKiBhMDAgLSBhMDIgKiBhMjApICogZGV0O1xuICAgIG91dFs1XSA9ICgtYTEyICogYTAwICsgYTAyICogYTEwKSAqIGRldDtcbiAgICBvdXRbNl0gPSBiMjEgKiBkZXQ7XG4gICAgb3V0WzddID0gKC1hMjEgKiBhMDAgKyBhMDEgKiBhMjApICogZGV0O1xuICAgIG91dFs4XSA9IChhMTEgKiBhMDAgLSBhMDEgKiBhMTApICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0M1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkam9pbnQkMShvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXTtcbiAgICB2YXIgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XTtcbiAgICB2YXIgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XTtcbiAgICBvdXRbMF0gPSBhMTEgKiBhMjIgLSBhMTIgKiBhMjE7XG4gICAgb3V0WzFdID0gYTAyICogYTIxIC0gYTAxICogYTIyO1xuICAgIG91dFsyXSA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICBvdXRbM10gPSBhMTIgKiBhMjAgLSBhMTAgKiBhMjI7XG4gICAgb3V0WzRdID0gYTAwICogYTIyIC0gYTAyICogYTIwO1xuICAgIG91dFs1XSA9IGEwMiAqIGExMCAtIGEwMCAqIGExMjtcbiAgICBvdXRbNl0gPSBhMTAgKiBhMjEgLSBhMTEgKiBhMjA7XG4gICAgb3V0WzddID0gYTAxICogYTIwIC0gYTAwICogYTIxO1xuICAgIG91dFs4XSA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkZXRlcm1pbmFudCBvZiBhIG1hdDNcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge051bWJlcn0gZGV0ZXJtaW5hbnQgb2YgYVxuICAgKi9cblxuICBmdW5jdGlvbiBkZXRlcm1pbmFudCQxKGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXTtcbiAgICB2YXIgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XTtcbiAgICB2YXIgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XTtcbiAgICByZXR1cm4gYTAwICogKGEyMiAqIGExMSAtIGExMiAqIGEyMSkgKyBhMDEgKiAoLWEyMiAqIGExMCArIGExMiAqIGEyMCkgKyBhMDIgKiAoYTIxICogYTEwIC0gYTExICogYTIwKTtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbGllcyB0d28gbWF0MydzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5JDYob3V0LCBhLCBiKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl07XG4gICAgdmFyIGExMCA9IGFbM10sXG4gICAgICAgIGExMSA9IGFbNF0sXG4gICAgICAgIGExMiA9IGFbNV07XG4gICAgdmFyIGEyMCA9IGFbNl0sXG4gICAgICAgIGEyMSA9IGFbN10sXG4gICAgICAgIGEyMiA9IGFbOF07XG4gICAgdmFyIGIwMCA9IGJbMF0sXG4gICAgICAgIGIwMSA9IGJbMV0sXG4gICAgICAgIGIwMiA9IGJbMl07XG4gICAgdmFyIGIxMCA9IGJbM10sXG4gICAgICAgIGIxMSA9IGJbNF0sXG4gICAgICAgIGIxMiA9IGJbNV07XG4gICAgdmFyIGIyMCA9IGJbNl0sXG4gICAgICAgIGIyMSA9IGJbN10sXG4gICAgICAgIGIyMiA9IGJbOF07XG4gICAgb3V0WzBdID0gYjAwICogYTAwICsgYjAxICogYTEwICsgYjAyICogYTIwO1xuICAgIG91dFsxXSA9IGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMTtcbiAgICBvdXRbMl0gPSBiMDAgKiBhMDIgKyBiMDEgKiBhMTIgKyBiMDIgKiBhMjI7XG4gICAgb3V0WzNdID0gYjEwICogYTAwICsgYjExICogYTEwICsgYjEyICogYTIwO1xuICAgIG91dFs0XSA9IGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMTtcbiAgICBvdXRbNV0gPSBiMTAgKiBhMDIgKyBiMTEgKiBhMTIgKyBiMTIgKiBhMjI7XG4gICAgb3V0WzZdID0gYjIwICogYTAwICsgYjIxICogYTEwICsgYjIyICogYTIwO1xuICAgIG91dFs3XSA9IGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMTtcbiAgICBvdXRbOF0gPSBiMjAgKiBhMDIgKyBiMjEgKiBhMTIgKyBiMjIgKiBhMjI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogVHJhbnNsYXRlIGEgbWF0MyBieSB0aGUgZ2l2ZW4gdmVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBhIHRoZSBtYXRyaXggdG8gdHJhbnNsYXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUkMihvdXQsIGEsIHYpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTEwID0gYVszXSxcbiAgICAgICAgYTExID0gYVs0XSxcbiAgICAgICAgYTEyID0gYVs1XSxcbiAgICAgICAgYTIwID0gYVs2XSxcbiAgICAgICAgYTIxID0gYVs3XSxcbiAgICAgICAgYTIyID0gYVs4XSxcbiAgICAgICAgeCA9IHZbMF0sXG4gICAgICAgIHkgPSB2WzFdO1xuICAgIG91dFswXSA9IGEwMDtcbiAgICBvdXRbMV0gPSBhMDE7XG4gICAgb3V0WzJdID0gYTAyO1xuICAgIG91dFszXSA9IGExMDtcbiAgICBvdXRbNF0gPSBhMTE7XG4gICAgb3V0WzVdID0gYTEyO1xuICAgIG91dFs2XSA9IHggKiBhMDAgKyB5ICogYTEwICsgYTIwO1xuICAgIG91dFs3XSA9IHggKiBhMDEgKyB5ICogYTExICsgYTIxO1xuICAgIG91dFs4XSA9IHggKiBhMDIgKyB5ICogYTEyICsgYTIyO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBtYXQzIGJ5IHRoZSBnaXZlbiBhbmdsZVxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZSQyKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGExMCA9IGFbM10sXG4gICAgICAgIGExMSA9IGFbNF0sXG4gICAgICAgIGExMiA9IGFbNV0sXG4gICAgICAgIGEyMCA9IGFbNl0sXG4gICAgICAgIGEyMSA9IGFbN10sXG4gICAgICAgIGEyMiA9IGFbOF0sXG4gICAgICAgIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBjICogYTAwICsgcyAqIGExMDtcbiAgICBvdXRbMV0gPSBjICogYTAxICsgcyAqIGExMTtcbiAgICBvdXRbMl0gPSBjICogYTAyICsgcyAqIGExMjtcbiAgICBvdXRbM10gPSBjICogYTEwIC0gcyAqIGEwMDtcbiAgICBvdXRbNF0gPSBjICogYTExIC0gcyAqIGEwMTtcbiAgICBvdXRbNV0gPSBjICogYTEyIC0gcyAqIGEwMjtcbiAgICBvdXRbNl0gPSBhMjA7XG4gICAgb3V0WzddID0gYTIxO1xuICAgIG91dFs4XSA9IGEyMjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTY2FsZXMgdGhlIG1hdDMgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzJcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgdGhlIHZlYzIgdG8gc2NhbGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqKi9cblxuICBmdW5jdGlvbiBzY2FsZSQ2KG91dCwgYSwgdikge1xuICAgIHZhciB4ID0gdlswXSxcbiAgICAgICAgeSA9IHZbMV07XG4gICAgb3V0WzBdID0geCAqIGFbMF07XG4gICAgb3V0WzFdID0geCAqIGFbMV07XG4gICAgb3V0WzJdID0geCAqIGFbMl07XG4gICAgb3V0WzNdID0geSAqIGFbM107XG4gICAgb3V0WzRdID0geSAqIGFbNF07XG4gICAgb3V0WzVdID0geSAqIGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIG91dFs4XSA9IGFbOF07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHRyYW5zbGF0aW9uXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0My5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDMudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVRyYW5zbGF0aW9uJDIob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAxO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gdlswXTtcbiAgICBvdXRbN10gPSB2WzFdO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgZ2l2ZW4gYW5nbGVcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQzLmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0My5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgbWF0MyByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21Sb3RhdGlvbiQyKG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBjO1xuICAgIG91dFsxXSA9IHM7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAtcztcbiAgICBvdXRbNF0gPSBjO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHNjYWxpbmdcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQzLmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0My5zY2FsZShkZXN0LCBkZXN0LCB2ZWMpO1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSB2IFNjYWxpbmcgdmVjdG9yXG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVNjYWxpbmckMShvdXQsIHYpIHtcbiAgICBvdXRbMF0gPSB2WzBdO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHZbMV07XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDb3BpZXMgdGhlIHZhbHVlcyBmcm9tIGEgbWF0MmQgaW50byBhIG1hdDNcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJkfSBhIHRoZSBtYXRyaXggdG8gY29weVxuICAgKiBAcmV0dXJucyB7bWF0M30gb3V0XG4gICAqKi9cblxuICBmdW5jdGlvbiBmcm9tTWF0MmQob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gYVsyXTtcbiAgICBvdXRbNF0gPSBhWzNdO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gYVs0XTtcbiAgICBvdXRbN10gPSBhWzVdO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBhIDN4MyBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4gICAqXG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVF1YXQkMShvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sXG4gICAgICAgIHkgPSBxWzFdLFxuICAgICAgICB6ID0gcVsyXSxcbiAgICAgICAgdyA9IHFbM107XG4gICAgdmFyIHgyID0geCArIHg7XG4gICAgdmFyIHkyID0geSArIHk7XG4gICAgdmFyIHoyID0geiArIHo7XG4gICAgdmFyIHh4ID0geCAqIHgyO1xuICAgIHZhciB5eCA9IHkgKiB4MjtcbiAgICB2YXIgeXkgPSB5ICogeTI7XG4gICAgdmFyIHp4ID0geiAqIHgyO1xuICAgIHZhciB6eSA9IHogKiB5MjtcbiAgICB2YXIgenogPSB6ICogejI7XG4gICAgdmFyIHd4ID0gdyAqIHgyO1xuICAgIHZhciB3eSA9IHcgKiB5MjtcbiAgICB2YXIgd3ogPSB3ICogejI7XG4gICAgb3V0WzBdID0gMSAtIHl5IC0geno7XG4gICAgb3V0WzNdID0geXggLSB3ejtcbiAgICBvdXRbNl0gPSB6eCArIHd5O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzRdID0gMSAtIHh4IC0geno7XG4gICAgb3V0WzddID0genkgLSB3eDtcbiAgICBvdXRbMl0gPSB6eCAtIHd5O1xuICAgIG91dFs1XSA9IHp5ICsgd3g7XG4gICAgb3V0WzhdID0gMSAtIHh4IC0geXk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBhIDN4MyBub3JtYWwgbWF0cml4ICh0cmFuc3Bvc2UgaW52ZXJzZSkgZnJvbSB0aGUgNHg0IG1hdHJpeFxuICAgKlxuICAgKiBAcGFyYW0ge21hdDN9IG91dCBtYXQzIHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIE1hdDQgdG8gZGVyaXZlIHRoZSBub3JtYWwgbWF0cml4IGZyb21cbiAgICpcbiAgICogQHJldHVybnMge21hdDN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBub3JtYWxGcm9tTWF0NChvdXQsIGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICB2YXIgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuICAgIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgICAgYTMxID0gYVsxM10sXG4gICAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgICBhMzMgPSBhWzE1XTtcbiAgICB2YXIgYjAwID0gYTAwICogYTExIC0gYTAxICogYTEwO1xuICAgIHZhciBiMDEgPSBhMDAgKiBhMTIgLSBhMDIgKiBhMTA7XG4gICAgdmFyIGIwMiA9IGEwMCAqIGExMyAtIGEwMyAqIGExMDtcbiAgICB2YXIgYjAzID0gYTAxICogYTEyIC0gYTAyICogYTExO1xuICAgIHZhciBiMDQgPSBhMDEgKiBhMTMgLSBhMDMgKiBhMTE7XG4gICAgdmFyIGIwNSA9IGEwMiAqIGExMyAtIGEwMyAqIGExMjtcbiAgICB2YXIgYjA2ID0gYTIwICogYTMxIC0gYTIxICogYTMwO1xuICAgIHZhciBiMDcgPSBhMjAgKiBhMzIgLSBhMjIgKiBhMzA7XG4gICAgdmFyIGIwOCA9IGEyMCAqIGEzMyAtIGEyMyAqIGEzMDtcbiAgICB2YXIgYjA5ID0gYTIxICogYTMyIC0gYTIyICogYTMxO1xuICAgIHZhciBiMTAgPSBhMjEgKiBhMzMgLSBhMjMgKiBhMzE7XG4gICAgdmFyIGIxMSA9IGEyMiAqIGEzMyAtIGEyMyAqIGEzMjsgLy8gQ2FsY3VsYXRlIHRoZSBkZXRlcm1pbmFudFxuXG4gICAgdmFyIGRldCA9IGIwMCAqIGIxMSAtIGIwMSAqIGIxMCArIGIwMiAqIGIwOSArIGIwMyAqIGIwOCAtIGIwNCAqIGIwNyArIGIwNSAqIGIwNjtcblxuICAgIGlmICghZGV0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBkZXQgPSAxLjAgLyBkZXQ7XG4gICAgb3V0WzBdID0gKGExMSAqIGIxMSAtIGExMiAqIGIxMCArIGExMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzFdID0gKGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzJdID0gKGExMCAqIGIxMCAtIGExMSAqIGIwOCArIGExMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzNdID0gKGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOSkgKiBkZXQ7XG4gICAgb3V0WzRdID0gKGEwMCAqIGIxMSAtIGEwMiAqIGIwOCArIGEwMyAqIGIwNykgKiBkZXQ7XG4gICAgb3V0WzVdID0gKGEwMSAqIGIwOCAtIGEwMCAqIGIxMCAtIGEwMyAqIGIwNikgKiBkZXQ7XG4gICAgb3V0WzZdID0gKGEzMSAqIGIwNSAtIGEzMiAqIGIwNCArIGEzMyAqIGIwMykgKiBkZXQ7XG4gICAgb3V0WzddID0gKGEzMiAqIGIwMiAtIGEzMCAqIGIwNSAtIGEzMyAqIGIwMSkgKiBkZXQ7XG4gICAgb3V0WzhdID0gKGEzMCAqIGIwNCAtIGEzMSAqIGIwMiArIGEzMyAqIGIwMCkgKiBkZXQ7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgMkQgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0M30gb3V0IG1hdDMgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHlvdXIgZ2wgY29udGV4dFxuICAgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IEhlaWdodCBvZiBnbCBjb250ZXh0XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcHJvamVjdGlvbihvdXQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBvdXRbMF0gPSAyIC8gd2lkdGg7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gLTIgLyBoZWlnaHQ7XG4gICAgb3V0WzVdID0gMDtcbiAgICBvdXRbNl0gPSAtMTtcbiAgICBvdXRbN10gPSAxO1xuICAgIG91dFs4XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDNcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBzdHIkNihhKSB7XG4gICAgcmV0dXJuIFwibWF0MyhcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIiwgXCIgKyBhWzRdICsgXCIsIFwiICsgYVs1XSArIFwiLCBcIiArIGFbNl0gKyBcIiwgXCIgKyBhWzddICsgXCIsIFwiICsgYVs4XSArIFwiKVwiO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIEZyb2Jlbml1cyBub3JtIG9mIGEgbWF0M1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSB0aGUgbWF0cml4IHRvIGNhbGN1bGF0ZSBGcm9iZW5pdXMgbm9ybSBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBGcm9iZW5pdXMgbm9ybVxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9iJDEoYSkge1xuICAgIHJldHVybiBNYXRoLmh5cG90KGFbMF0sIGFbMV0sIGFbMl0sIGFbM10sIGFbNF0sIGFbNV0sIGFbNl0sIGFbN10sIGFbOF0pO1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIHR3byBtYXQzJ3NcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkJDYob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gICAgb3V0WzVdID0gYVs1XSArIGJbNV07XG4gICAgb3V0WzZdID0gYVs2XSArIGJbNl07XG4gICAgb3V0WzddID0gYVs3XSArIGJbN107XG4gICAgb3V0WzhdID0gYVs4XSArIGJbOF07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU3VidHJhY3RzIG1hdHJpeCBiIGZyb20gbWF0cml4IGFcbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc3VidHJhY3QkNChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC0gYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdIC0gYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdIC0gYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdIC0gYls2XTtcbiAgICBvdXRbN10gPSBhWzddIC0gYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdIC0gYls4XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBseSBlYWNoIGVsZW1lbnQgb2YgdGhlIG1hdHJpeCBieSBhIHNjYWxhci5cbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIG1hdHJpeCdzIGVsZW1lbnRzIGJ5XG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXIkMShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICBvdXRbNF0gPSBhWzRdICogYjtcbiAgICBvdXRbNV0gPSBhWzVdICogYjtcbiAgICBvdXRbNl0gPSBhWzZdICogYjtcbiAgICBvdXRbN10gPSBhWzddICogYjtcbiAgICBvdXRbOF0gPSBhWzhdICogYjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIHR3byBtYXQzJ3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHttYXQzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXG4gICAqIEByZXR1cm5zIHttYXQzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXJBbmRBZGQkMShvdXQsIGEsIGIsIHNjYWxlKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF0gKiBzY2FsZTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXSAqIHNjYWxlO1xuICAgIG91dFsyXSA9IGFbMl0gKyBiWzJdICogc2NhbGU7XG4gICAgb3V0WzNdID0gYVszXSArIGJbM10gKiBzY2FsZTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XSAqIHNjYWxlO1xuICAgIG91dFs1XSA9IGFbNV0gKyBiWzVdICogc2NhbGU7XG4gICAgb3V0WzZdID0gYVs2XSArIGJbNl0gKiBzY2FsZTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XSAqIHNjYWxlO1xuICAgIG91dFs4XSA9IGFbOF0gKyBiWzhdICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYSBUaGUgZmlyc3QgbWF0cml4LlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0M30gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBleGFjdEVxdWFscyQ2KGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXSAmJiBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddICYmIGFbOF0gPT09IGJbOF07XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIG1hdHJpY2VzIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGEgVGhlIGZpcnN0IG1hdHJpeC5cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IGIgVGhlIHNlY29uZCBtYXRyaXguXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSBtYXRyaWNlcyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZXF1YWxzJDYoYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM10sXG4gICAgICAgIGE0ID0gYVs0XSxcbiAgICAgICAgYTUgPSBhWzVdLFxuICAgICAgICBhNiA9IGFbNl0sXG4gICAgICAgIGE3ID0gYVs3XSxcbiAgICAgICAgYTggPSBhWzhdO1xuICAgIHZhciBiMCA9IGJbMF0sXG4gICAgICAgIGIxID0gYlsxXSxcbiAgICAgICAgYjIgPSBiWzJdLFxuICAgICAgICBiMyA9IGJbM10sXG4gICAgICAgIGI0ID0gYls0XSxcbiAgICAgICAgYjUgPSBiWzVdLFxuICAgICAgICBiNiA9IGJbNl0sXG4gICAgICAgIGI3ID0gYls3XSxcbiAgICAgICAgYjggPSBiWzhdO1xuICAgIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJiBNYXRoLmFicyhhMyAtIGIzKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkgJiYgTWF0aC5hYnMoYTQgLSBiNCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTQpLCBNYXRoLmFicyhiNCkpICYmIE1hdGguYWJzKGE1IC0gYjUpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJiBNYXRoLmFicyhhNiAtIGI2KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNiksIE1hdGguYWJzKGI2KSkgJiYgTWF0aC5hYnMoYTcgLSBiNykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTcpLCBNYXRoLmFicyhiNykpICYmIE1hdGguYWJzKGE4IC0gYjgpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE4KSwgTWF0aC5hYnMoYjgpKTtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBtYXQzLm11bHRpcGx5fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG11bCQ2ID0gbXVsdGlwbHkkNjtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgbWF0My5zdWJ0cmFjdH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzdWIkNCA9IHN1YnRyYWN0JDQ7XG5cbiAgdmFyIG1hdDMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gICAgX19wcm90b19fOiBudWxsLFxuICAgIGNyZWF0ZTogY3JlYXRlJDYsXG4gICAgZnJvbU1hdDQ6IGZyb21NYXQ0JDEsXG4gICAgY2xvbmU6IGNsb25lJDYsXG4gICAgY29weTogY29weSQ2LFxuICAgIGZyb21WYWx1ZXM6IGZyb21WYWx1ZXMkNixcbiAgICBzZXQ6IHNldCQ2LFxuICAgIGlkZW50aXR5OiBpZGVudGl0eSQzLFxuICAgIHRyYW5zcG9zZTogdHJhbnNwb3NlJDEsXG4gICAgaW52ZXJ0OiBpbnZlcnQkMyxcbiAgICBhZGpvaW50OiBhZGpvaW50JDEsXG4gICAgZGV0ZXJtaW5hbnQ6IGRldGVybWluYW50JDEsXG4gICAgbXVsdGlwbHk6IG11bHRpcGx5JDYsXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUkMixcbiAgICByb3RhdGU6IHJvdGF0ZSQyLFxuICAgIHNjYWxlOiBzY2FsZSQ2LFxuICAgIGZyb21UcmFuc2xhdGlvbjogZnJvbVRyYW5zbGF0aW9uJDIsXG4gICAgZnJvbVJvdGF0aW9uOiBmcm9tUm90YXRpb24kMixcbiAgICBmcm9tU2NhbGluZzogZnJvbVNjYWxpbmckMSxcbiAgICBmcm9tTWF0MmQ6IGZyb21NYXQyZCxcbiAgICBmcm9tUXVhdDogZnJvbVF1YXQkMSxcbiAgICBub3JtYWxGcm9tTWF0NDogbm9ybWFsRnJvbU1hdDQsXG4gICAgcHJvamVjdGlvbjogcHJvamVjdGlvbixcbiAgICBzdHI6IHN0ciQ2LFxuICAgIGZyb2I6IGZyb2IkMSxcbiAgICBhZGQ6IGFkZCQ2LFxuICAgIHN1YnRyYWN0OiBzdWJ0cmFjdCQ0LFxuICAgIG11bHRpcGx5U2NhbGFyOiBtdWx0aXBseVNjYWxhciQxLFxuICAgIG11bHRpcGx5U2NhbGFyQW5kQWRkOiBtdWx0aXBseVNjYWxhckFuZEFkZCQxLFxuICAgIGV4YWN0RXF1YWxzOiBleGFjdEVxdWFscyQ2LFxuICAgIGVxdWFsczogZXF1YWxzJDYsXG4gICAgbXVsOiBtdWwkNixcbiAgICBzdWI6IHN1YiQ0XG4gIH0pO1xuXG4gIC8qKlxuICAgKiA0eDQgTWF0cml4PGJyPkZvcm1hdDogY29sdW1uLW1ham9yLCB3aGVuIHR5cGVkIG91dCBpdCBsb29rcyBsaWtlIHJvdy1tYWpvcjxicj5UaGUgbWF0cmljZXMgYXJlIGJlaW5nIHBvc3QgbXVsdGlwbGllZC5cbiAgICogQG1vZHVsZSBtYXQ0XG4gICAqL1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGlkZW50aXR5IG1hdDRcbiAgICpcbiAgICogQHJldHVybnMge21hdDR9IGEgbmV3IDR4NCBtYXRyaXhcbiAgICovXG5cbiAgZnVuY3Rpb24gY3JlYXRlJDUoKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDE2KTtcblxuICAgIGlmIChBUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgICAgb3V0WzFdID0gMDtcbiAgICAgIG91dFsyXSA9IDA7XG4gICAgICBvdXRbM10gPSAwO1xuICAgICAgb3V0WzRdID0gMDtcbiAgICAgIG91dFs2XSA9IDA7XG4gICAgICBvdXRbN10gPSAwO1xuICAgICAgb3V0WzhdID0gMDtcbiAgICAgIG91dFs5XSA9IDA7XG4gICAgICBvdXRbMTFdID0gMDtcbiAgICAgIG91dFsxMl0gPSAwO1xuICAgICAgb3V0WzEzXSA9IDA7XG4gICAgICBvdXRbMTRdID0gMDtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBtYXQ0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgbWF0cml4XG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIG1hdHJpeCB0byBjbG9uZVxuICAgKiBAcmV0dXJucyB7bWF0NH0gYSBuZXcgNHg0IG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBjbG9uZSQ1KGEpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMTYpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gYVs0XTtcbiAgICBvdXRbNV0gPSBhWzVdO1xuICAgIG91dFs2XSA9IGFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICBvdXRbOF0gPSBhWzhdO1xuICAgIG91dFs5XSA9IGFbOV07XG4gICAgb3V0WzEwXSA9IGFbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIG1hdDQgdG8gYW5vdGhlclxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvcHkkNShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF07XG4gICAgb3V0WzVdID0gYVs1XTtcbiAgICBvdXRbNl0gPSBhWzZdO1xuICAgIG91dFs3XSA9IGFbN107XG4gICAgb3V0WzhdID0gYVs4XTtcbiAgICBvdXRbOV0gPSBhWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV07XG4gICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBtYXQ0IHdpdGggdGhlIGdpdmVuIHZhbHVlc1xuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAwIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDAgcG9zaXRpb24gKGluZGV4IDApXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDEgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMiBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAyIHBvc2l0aW9uIChpbmRleCAyKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAzIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDMgcG9zaXRpb24gKGluZGV4IDMpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTAgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggNClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMSBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA1KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTEyIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDIgcG9zaXRpb24gKGluZGV4IDYpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTMgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggNylcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMCBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAwIHBvc2l0aW9uIChpbmRleCA4KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIxIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDEgcG9zaXRpb24gKGluZGV4IDkpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjIgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTApXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjMgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTEpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMzAgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggMTIpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMzEgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggMTMpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMzIgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMTQpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMzMgQ29tcG9uZW50IGluIGNvbHVtbiAzLCByb3cgMyBwb3NpdGlvbiAoaW5kZXggMTUpXG4gICAqIEByZXR1cm5zIHttYXQ0fSBBIG5ldyBtYXQ0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21WYWx1ZXMkNShtMDAsIG0wMSwgbTAyLCBtMDMsIG0xMCwgbTExLCBtMTIsIG0xMywgbTIwLCBtMjEsIG0yMiwgbTIzLCBtMzAsIG0zMSwgbTMyLCBtMzMpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMTYpO1xuICAgIG91dFswXSA9IG0wMDtcbiAgICBvdXRbMV0gPSBtMDE7XG4gICAgb3V0WzJdID0gbTAyO1xuICAgIG91dFszXSA9IG0wMztcbiAgICBvdXRbNF0gPSBtMTA7XG4gICAgb3V0WzVdID0gbTExO1xuICAgIG91dFs2XSA9IG0xMjtcbiAgICBvdXRbN10gPSBtMTM7XG4gICAgb3V0WzhdID0gbTIwO1xuICAgIG91dFs5XSA9IG0yMTtcbiAgICBvdXRbMTBdID0gbTIyO1xuICAgIG91dFsxMV0gPSBtMjM7XG4gICAgb3V0WzEyXSA9IG0zMDtcbiAgICBvdXRbMTNdID0gbTMxO1xuICAgIG91dFsxNF0gPSBtMzI7XG4gICAgb3V0WzE1XSA9IG0zMztcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBtYXQ0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMCBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAwIHBvc2l0aW9uIChpbmRleCAwKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTAxIENvbXBvbmVudCBpbiBjb2x1bW4gMCwgcm93IDEgcG9zaXRpb24gKGluZGV4IDEpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMDIgQ29tcG9uZW50IGluIGNvbHVtbiAwLCByb3cgMiBwb3NpdGlvbiAoaW5kZXggMilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0wMyBDb21wb25lbnQgaW4gY29sdW1uIDAsIHJvdyAzIHBvc2l0aW9uIChpbmRleCAzKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTEwIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDAgcG9zaXRpb24gKGluZGV4IDQpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMTEgQ29tcG9uZW50IGluIGNvbHVtbiAxLCByb3cgMSBwb3NpdGlvbiAoaW5kZXggNSlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0xMiBDb21wb25lbnQgaW4gY29sdW1uIDEsIHJvdyAyIHBvc2l0aW9uIChpbmRleCA2KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTEzIENvbXBvbmVudCBpbiBjb2x1bW4gMSwgcm93IDMgcG9zaXRpb24gKGluZGV4IDcpXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBtMjAgQ29tcG9uZW50IGluIGNvbHVtbiAyLCByb3cgMCBwb3NpdGlvbiAoaW5kZXggOClcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG0yMSBDb21wb25lbnQgaW4gY29sdW1uIDIsIHJvdyAxIHBvc2l0aW9uIChpbmRleCA5KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIyIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDIgcG9zaXRpb24gKGluZGV4IDEwKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTIzIENvbXBvbmVudCBpbiBjb2x1bW4gMiwgcm93IDMgcG9zaXRpb24gKGluZGV4IDExKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTMwIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDAgcG9zaXRpb24gKGluZGV4IDEyKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTMxIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDEgcG9zaXRpb24gKGluZGV4IDEzKVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTMyIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDIgcG9zaXRpb24gKGluZGV4IDE0KVxuICAgKiBAcGFyYW0ge051bWJlcn0gbTMzIENvbXBvbmVudCBpbiBjb2x1bW4gMywgcm93IDMgcG9zaXRpb24gKGluZGV4IDE1KVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNldCQ1KG91dCwgbTAwLCBtMDEsIG0wMiwgbTAzLCBtMTAsIG0xMSwgbTEyLCBtMTMsIG0yMCwgbTIxLCBtMjIsIG0yMywgbTMwLCBtMzEsIG0zMiwgbTMzKSB7XG4gICAgb3V0WzBdID0gbTAwO1xuICAgIG91dFsxXSA9IG0wMTtcbiAgICBvdXRbMl0gPSBtMDI7XG4gICAgb3V0WzNdID0gbTAzO1xuICAgIG91dFs0XSA9IG0xMDtcbiAgICBvdXRbNV0gPSBtMTE7XG4gICAgb3V0WzZdID0gbTEyO1xuICAgIG91dFs3XSA9IG0xMztcbiAgICBvdXRbOF0gPSBtMjA7XG4gICAgb3V0WzldID0gbTIxO1xuICAgIG91dFsxMF0gPSBtMjI7XG4gICAgb3V0WzExXSA9IG0yMztcbiAgICBvdXRbMTJdID0gbTMwO1xuICAgIG91dFsxM10gPSBtMzE7XG4gICAgb3V0WzE0XSA9IG0zMjtcbiAgICBvdXRbMTVdID0gbTMzO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCBhIG1hdDQgdG8gdGhlIGlkZW50aXR5IG1hdHJpeFxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGlkZW50aXR5JDIob3V0KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc3Bvc2UgdGhlIHZhbHVlcyBvZiBhIG1hdDRcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIHNvdXJjZSBtYXRyaXhcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc3Bvc2Uob3V0LCBhKSB7XG4gICAgLy8gSWYgd2UgYXJlIHRyYW5zcG9zaW5nIG91cnNlbHZlcyB3ZSBjYW4gc2tpcCBhIGZldyBzdGVwcyBidXQgaGF2ZSB0byBjYWNoZSBzb21lIHZhbHVlc1xuICAgIGlmIChvdXQgPT09IGEpIHtcbiAgICAgIHZhciBhMDEgPSBhWzFdLFxuICAgICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgICAgYTAzID0gYVszXTtcbiAgICAgIHZhciBhMTIgPSBhWzZdLFxuICAgICAgICAgIGExMyA9IGFbN107XG4gICAgICB2YXIgYTIzID0gYVsxMV07XG4gICAgICBvdXRbMV0gPSBhWzRdO1xuICAgICAgb3V0WzJdID0gYVs4XTtcbiAgICAgIG91dFszXSA9IGFbMTJdO1xuICAgICAgb3V0WzRdID0gYTAxO1xuICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgb3V0WzhdID0gYTAyO1xuICAgICAgb3V0WzldID0gYTEyO1xuICAgICAgb3V0WzExXSA9IGFbMTRdO1xuICAgICAgb3V0WzEyXSA9IGEwMztcbiAgICAgIG91dFsxM10gPSBhMTM7XG4gICAgICBvdXRbMTRdID0gYTIzO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRbMF0gPSBhWzBdO1xuICAgICAgb3V0WzFdID0gYVs0XTtcbiAgICAgIG91dFsyXSA9IGFbOF07XG4gICAgICBvdXRbM10gPSBhWzEyXTtcbiAgICAgIG91dFs0XSA9IGFbMV07XG4gICAgICBvdXRbNV0gPSBhWzVdO1xuICAgICAgb3V0WzZdID0gYVs5XTtcbiAgICAgIG91dFs3XSA9IGFbMTNdO1xuICAgICAgb3V0WzhdID0gYVsyXTtcbiAgICAgIG91dFs5XSA9IGFbNl07XG4gICAgICBvdXRbMTBdID0gYVsxMF07XG4gICAgICBvdXRbMTFdID0gYVsxNF07XG4gICAgICBvdXRbMTJdID0gYVszXTtcbiAgICAgIG91dFsxM10gPSBhWzddO1xuICAgICAgb3V0WzE0XSA9IGFbMTFdO1xuICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEludmVydHMgYSBtYXQ0XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBzb3VyY2UgbWF0cml4XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaW52ZXJ0JDIob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM107XG4gICAgdmFyIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG4gICAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICAgIGEyMSA9IGFbOV0sXG4gICAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgICBhMjMgPSBhWzExXTtcbiAgICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgICBhMzIgPSBhWzE0XSxcbiAgICAgICAgYTMzID0gYVsxNV07XG4gICAgdmFyIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgICB2YXIgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICAgIHZhciBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gICAgdmFyIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICB2YXIgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICAgIHZhciBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gICAgdmFyIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgICB2YXIgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICAgIHZhciBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gICAgdmFyIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgICB2YXIgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICAgIHZhciBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICAgIHZhciBkZXQgPSBiMDAgKiBiMTEgLSBiMDEgKiBiMTAgKyBiMDIgKiBiMDkgKyBiMDMgKiBiMDggLSBiMDQgKiBiMDcgKyBiMDUgKiBiMDY7XG5cbiAgICBpZiAoIWRldCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZGV0ID0gMS4wIC8gZGV0O1xuICAgIG91dFswXSA9IChhMTEgKiBiMTEgLSBhMTIgKiBiMTAgKyBhMTMgKiBiMDkpICogZGV0O1xuICAgIG91dFsxXSA9IChhMDIgKiBiMTAgLSBhMDEgKiBiMTEgLSBhMDMgKiBiMDkpICogZGV0O1xuICAgIG91dFsyXSA9IChhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDMpICogZGV0O1xuICAgIG91dFszXSA9IChhMjIgKiBiMDQgLSBhMjEgKiBiMDUgLSBhMjMgKiBiMDMpICogZGV0O1xuICAgIG91dFs0XSA9IChhMTIgKiBiMDggLSBhMTAgKiBiMTEgLSBhMTMgKiBiMDcpICogZGV0O1xuICAgIG91dFs1XSA9IChhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDcpICogZGV0O1xuICAgIG91dFs2XSA9IChhMzIgKiBiMDIgLSBhMzAgKiBiMDUgLSBhMzMgKiBiMDEpICogZGV0O1xuICAgIG91dFs3XSA9IChhMjAgKiBiMDUgLSBhMjIgKiBiMDIgKyBhMjMgKiBiMDEpICogZGV0O1xuICAgIG91dFs4XSA9IChhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDYpICogZGV0O1xuICAgIG91dFs5XSA9IChhMDEgKiBiMDggLSBhMDAgKiBiMTAgLSBhMDMgKiBiMDYpICogZGV0O1xuICAgIG91dFsxMF0gPSAoYTMwICogYjA0IC0gYTMxICogYjAyICsgYTMzICogYjAwKSAqIGRldDtcbiAgICBvdXRbMTFdID0gKGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzEyXSA9IChhMTEgKiBiMDcgLSBhMTAgKiBiMDkgLSBhMTIgKiBiMDYpICogZGV0O1xuICAgIG91dFsxM10gPSAoYTAwICogYjA5IC0gYTAxICogYjA3ICsgYTAyICogYjA2KSAqIGRldDtcbiAgICBvdXRbMTRdID0gKGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMCkgKiBkZXQ7XG4gICAgb3V0WzE1XSA9IChhMjAgKiBiMDMgLSBhMjEgKiBiMDEgKyBhMjIgKiBiMDApICogZGV0O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGFkanVnYXRlIG9mIGEgbWF0NFxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGFkam9pbnQob3V0LCBhKSB7XG4gICAgdmFyIGEwMCA9IGFbMF0sXG4gICAgICAgIGEwMSA9IGFbMV0sXG4gICAgICAgIGEwMiA9IGFbMl0sXG4gICAgICAgIGEwMyA9IGFbM107XG4gICAgdmFyIGExMCA9IGFbNF0sXG4gICAgICAgIGExMSA9IGFbNV0sXG4gICAgICAgIGExMiA9IGFbNl0sXG4gICAgICAgIGExMyA9IGFbN107XG4gICAgdmFyIGEyMCA9IGFbOF0sXG4gICAgICAgIGEyMSA9IGFbOV0sXG4gICAgICAgIGEyMiA9IGFbMTBdLFxuICAgICAgICBhMjMgPSBhWzExXTtcbiAgICB2YXIgYTMwID0gYVsxMl0sXG4gICAgICAgIGEzMSA9IGFbMTNdLFxuICAgICAgICBhMzIgPSBhWzE0XSxcbiAgICAgICAgYTMzID0gYVsxNV07XG4gICAgdmFyIGIwMCA9IGEwMCAqIGExMSAtIGEwMSAqIGExMDtcbiAgICB2YXIgYjAxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICAgIHZhciBiMDIgPSBhMDAgKiBhMTMgLSBhMDMgKiBhMTA7XG4gICAgdmFyIGIwMyA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICB2YXIgYjA0ID0gYTAxICogYTEzIC0gYTAzICogYTExO1xuICAgIHZhciBiMDUgPSBhMDIgKiBhMTMgLSBhMDMgKiBhMTI7XG4gICAgdmFyIGIwNiA9IGEyMCAqIGEzMSAtIGEyMSAqIGEzMDtcbiAgICB2YXIgYjA3ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICAgIHZhciBiMDggPSBhMjAgKiBhMzMgLSBhMjMgKiBhMzA7XG4gICAgdmFyIGIwOSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgICB2YXIgYjEwID0gYTIxICogYTMzIC0gYTIzICogYTMxO1xuICAgIHZhciBiMTEgPSBhMjIgKiBhMzMgLSBhMjMgKiBhMzI7XG4gICAgb3V0WzBdID0gYTExICogYjExIC0gYTEyICogYjEwICsgYTEzICogYjA5O1xuICAgIG91dFsxXSA9IGEwMiAqIGIxMCAtIGEwMSAqIGIxMSAtIGEwMyAqIGIwOTtcbiAgICBvdXRbMl0gPSBhMzEgKiBiMDUgLSBhMzIgKiBiMDQgKyBhMzMgKiBiMDM7XG4gICAgb3V0WzNdID0gYTIyICogYjA0IC0gYTIxICogYjA1IC0gYTIzICogYjAzO1xuICAgIG91dFs0XSA9IGExMiAqIGIwOCAtIGExMCAqIGIxMSAtIGExMyAqIGIwNztcbiAgICBvdXRbNV0gPSBhMDAgKiBiMTEgLSBhMDIgKiBiMDggKyBhMDMgKiBiMDc7XG4gICAgb3V0WzZdID0gYTMyICogYjAyIC0gYTMwICogYjA1IC0gYTMzICogYjAxO1xuICAgIG91dFs3XSA9IGEyMCAqIGIwNSAtIGEyMiAqIGIwMiArIGEyMyAqIGIwMTtcbiAgICBvdXRbOF0gPSBhMTAgKiBiMTAgLSBhMTEgKiBiMDggKyBhMTMgKiBiMDY7XG4gICAgb3V0WzldID0gYTAxICogYjA4IC0gYTAwICogYjEwIC0gYTAzICogYjA2O1xuICAgIG91dFsxMF0gPSBhMzAgKiBiMDQgLSBhMzEgKiBiMDIgKyBhMzMgKiBiMDA7XG4gICAgb3V0WzExXSA9IGEyMSAqIGIwMiAtIGEyMCAqIGIwNCAtIGEyMyAqIGIwMDtcbiAgICBvdXRbMTJdID0gYTExICogYjA3IC0gYTEwICogYjA5IC0gYTEyICogYjA2O1xuICAgIG91dFsxM10gPSBhMDAgKiBiMDkgLSBhMDEgKiBiMDcgKyBhMDIgKiBiMDY7XG4gICAgb3V0WzE0XSA9IGEzMSAqIGIwMSAtIGEzMCAqIGIwMyAtIGEzMiAqIGIwMDtcbiAgICBvdXRbMTVdID0gYTIwICogYjAzIC0gYTIxICogYjAxICsgYTIyICogYjAwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRldGVybWluYW50IG9mIGEgbWF0NFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgc291cmNlIG1hdHJpeFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkZXRlcm1pbmFudCBvZiBhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRldGVybWluYW50KGEpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICB2YXIgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuICAgIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgICAgYTMxID0gYVsxM10sXG4gICAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgICBhMzMgPSBhWzE1XTtcbiAgICB2YXIgYjAgPSBhMDAgKiBhMTEgLSBhMDEgKiBhMTA7XG4gICAgdmFyIGIxID0gYTAwICogYTEyIC0gYTAyICogYTEwO1xuICAgIHZhciBiMiA9IGEwMSAqIGExMiAtIGEwMiAqIGExMTtcbiAgICB2YXIgYjMgPSBhMjAgKiBhMzEgLSBhMjEgKiBhMzA7XG4gICAgdmFyIGI0ID0gYTIwICogYTMyIC0gYTIyICogYTMwO1xuICAgIHZhciBiNSA9IGEyMSAqIGEzMiAtIGEyMiAqIGEzMTtcbiAgICB2YXIgYjYgPSBhMDAgKiBiNSAtIGEwMSAqIGI0ICsgYTAyICogYjM7XG4gICAgdmFyIGI3ID0gYTEwICogYjUgLSBhMTEgKiBiNCArIGExMiAqIGIzO1xuICAgIHZhciBiOCA9IGEyMCAqIGIyIC0gYTIxICogYjEgKyBhMjIgKiBiMDtcbiAgICB2YXIgYjkgPSBhMzAgKiBiMiAtIGEzMSAqIGIxICsgYTMyICogYjA7IC8vIENhbGN1bGF0ZSB0aGUgZGV0ZXJtaW5hbnRcblxuICAgIHJldHVybiBhMTMgKiBiNiAtIGEwMyAqIGI3ICsgYTMzICogYjggLSBhMjMgKiBiOTtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbGllcyB0d28gbWF0NHNcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHkkNShvdXQsIGEsIGIpIHtcbiAgICB2YXIgYTAwID0gYVswXSxcbiAgICAgICAgYTAxID0gYVsxXSxcbiAgICAgICAgYTAyID0gYVsyXSxcbiAgICAgICAgYTAzID0gYVszXTtcbiAgICB2YXIgYTEwID0gYVs0XSxcbiAgICAgICAgYTExID0gYVs1XSxcbiAgICAgICAgYTEyID0gYVs2XSxcbiAgICAgICAgYTEzID0gYVs3XTtcbiAgICB2YXIgYTIwID0gYVs4XSxcbiAgICAgICAgYTIxID0gYVs5XSxcbiAgICAgICAgYTIyID0gYVsxMF0sXG4gICAgICAgIGEyMyA9IGFbMTFdO1xuICAgIHZhciBhMzAgPSBhWzEyXSxcbiAgICAgICAgYTMxID0gYVsxM10sXG4gICAgICAgIGEzMiA9IGFbMTRdLFxuICAgICAgICBhMzMgPSBhWzE1XTsgLy8gQ2FjaGUgb25seSB0aGUgY3VycmVudCBsaW5lIG9mIHRoZSBzZWNvbmQgbWF0cml4XG5cbiAgICB2YXIgYjAgPSBiWzBdLFxuICAgICAgICBiMSA9IGJbMV0sXG4gICAgICAgIGIyID0gYlsyXSxcbiAgICAgICAgYjMgPSBiWzNdO1xuICAgIG91dFswXSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICAgIG91dFsxXSA9IGIwICogYTAxICsgYjEgKiBhMTEgKyBiMiAqIGEyMSArIGIzICogYTMxO1xuICAgIG91dFsyXSA9IGIwICogYTAyICsgYjEgKiBhMTIgKyBiMiAqIGEyMiArIGIzICogYTMyO1xuICAgIG91dFszXSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICAgIGIwID0gYls0XTtcbiAgICBiMSA9IGJbNV07XG4gICAgYjIgPSBiWzZdO1xuICAgIGIzID0gYls3XTtcbiAgICBvdXRbNF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICBvdXRbNV0gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgICBvdXRbNl0gPSBiMCAqIGEwMiArIGIxICogYTEyICsgYjIgKiBhMjIgKyBiMyAqIGEzMjtcbiAgICBvdXRbN10gPSBiMCAqIGEwMyArIGIxICogYTEzICsgYjIgKiBhMjMgKyBiMyAqIGEzMztcbiAgICBiMCA9IGJbOF07XG4gICAgYjEgPSBiWzldO1xuICAgIGIyID0gYlsxMF07XG4gICAgYjMgPSBiWzExXTtcbiAgICBvdXRbOF0gPSBiMCAqIGEwMCArIGIxICogYTEwICsgYjIgKiBhMjAgKyBiMyAqIGEzMDtcbiAgICBvdXRbOV0gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgICBvdXRbMTBdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgb3V0WzExXSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICAgIGIwID0gYlsxMl07XG4gICAgYjEgPSBiWzEzXTtcbiAgICBiMiA9IGJbMTRdO1xuICAgIGIzID0gYlsxNV07XG4gICAgb3V0WzEyXSA9IGIwICogYTAwICsgYjEgKiBhMTAgKyBiMiAqIGEyMCArIGIzICogYTMwO1xuICAgIG91dFsxM10gPSBiMCAqIGEwMSArIGIxICogYTExICsgYjIgKiBhMjEgKyBiMyAqIGEzMTtcbiAgICBvdXRbMTRdID0gYjAgKiBhMDIgKyBiMSAqIGExMiArIGIyICogYTIyICsgYjMgKiBhMzI7XG4gICAgb3V0WzE1XSA9IGIwICogYTAzICsgYjEgKiBhMTMgKyBiMiAqIGEyMyArIGIzICogYTMzO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZSBhIG1hdDQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHRyYW5zbGF0ZVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiB2ZWN0b3IgdG8gdHJhbnNsYXRlIGJ5XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlJDEob3V0LCBhLCB2KSB7XG4gICAgdmFyIHggPSB2WzBdLFxuICAgICAgICB5ID0gdlsxXSxcbiAgICAgICAgeiA9IHZbMl07XG4gICAgdmFyIGEwMCwgYTAxLCBhMDIsIGEwMztcbiAgICB2YXIgYTEwLCBhMTEsIGExMiwgYTEzO1xuICAgIHZhciBhMjAsIGEyMSwgYTIyLCBhMjM7XG5cbiAgICBpZiAoYSA9PT0gb3V0KSB7XG4gICAgICBvdXRbMTJdID0gYVswXSAqIHggKyBhWzRdICogeSArIGFbOF0gKiB6ICsgYVsxMl07XG4gICAgICBvdXRbMTNdID0gYVsxXSAqIHggKyBhWzVdICogeSArIGFbOV0gKiB6ICsgYVsxM107XG4gICAgICBvdXRbMTRdID0gYVsyXSAqIHggKyBhWzZdICogeSArIGFbMTBdICogeiArIGFbMTRdO1xuICAgICAgb3V0WzE1XSA9IGFbM10gKiB4ICsgYVs3XSAqIHkgKyBhWzExXSAqIHogKyBhWzE1XTtcbiAgICB9IGVsc2Uge1xuICAgICAgYTAwID0gYVswXTtcbiAgICAgIGEwMSA9IGFbMV07XG4gICAgICBhMDIgPSBhWzJdO1xuICAgICAgYTAzID0gYVszXTtcbiAgICAgIGExMCA9IGFbNF07XG4gICAgICBhMTEgPSBhWzVdO1xuICAgICAgYTEyID0gYVs2XTtcbiAgICAgIGExMyA9IGFbN107XG4gICAgICBhMjAgPSBhWzhdO1xuICAgICAgYTIxID0gYVs5XTtcbiAgICAgIGEyMiA9IGFbMTBdO1xuICAgICAgYTIzID0gYVsxMV07XG4gICAgICBvdXRbMF0gPSBhMDA7XG4gICAgICBvdXRbMV0gPSBhMDE7XG4gICAgICBvdXRbMl0gPSBhMDI7XG4gICAgICBvdXRbM10gPSBhMDM7XG4gICAgICBvdXRbNF0gPSBhMTA7XG4gICAgICBvdXRbNV0gPSBhMTE7XG4gICAgICBvdXRbNl0gPSBhMTI7XG4gICAgICBvdXRbN10gPSBhMTM7XG4gICAgICBvdXRbOF0gPSBhMjA7XG4gICAgICBvdXRbOV0gPSBhMjE7XG4gICAgICBvdXRbMTBdID0gYTIyO1xuICAgICAgb3V0WzExXSA9IGEyMztcbiAgICAgIG91dFsxMl0gPSBhMDAgKiB4ICsgYTEwICogeSArIGEyMCAqIHogKyBhWzEyXTtcbiAgICAgIG91dFsxM10gPSBhMDEgKiB4ICsgYTExICogeSArIGEyMSAqIHogKyBhWzEzXTtcbiAgICAgIG91dFsxNF0gPSBhMDIgKiB4ICsgYTEyICogeSArIGEyMiAqIHogKyBhWzE0XTtcbiAgICAgIG91dFsxNV0gPSBhMDMgKiB4ICsgYTEzICogeSArIGEyMyAqIHogKyBhWzE1XTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTY2FsZXMgdGhlIG1hdDQgYnkgdGhlIGRpbWVuc2lvbnMgaW4gdGhlIGdpdmVuIHZlYzMgbm90IHVzaW5nIHZlY3Rvcml6YXRpb25cbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBzY2FsZVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiB0aGUgdmVjMyB0byBzY2FsZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICoqL1xuXG4gIGZ1bmN0aW9uIHNjYWxlJDUob3V0LCBhLCB2KSB7XG4gICAgdmFyIHggPSB2WzBdLFxuICAgICAgICB5ID0gdlsxXSxcbiAgICAgICAgeiA9IHZbMl07XG4gICAgb3V0WzBdID0gYVswXSAqIHg7XG4gICAgb3V0WzFdID0gYVsxXSAqIHg7XG4gICAgb3V0WzJdID0gYVsyXSAqIHg7XG4gICAgb3V0WzNdID0gYVszXSAqIHg7XG4gICAgb3V0WzRdID0gYVs0XSAqIHk7XG4gICAgb3V0WzVdID0gYVs1XSAqIHk7XG4gICAgb3V0WzZdID0gYVs2XSAqIHk7XG4gICAgb3V0WzddID0gYVs3XSAqIHk7XG4gICAgb3V0WzhdID0gYVs4XSAqIHo7XG4gICAgb3V0WzldID0gYVs5XSAqIHo7XG4gICAgb3V0WzEwXSA9IGFbMTBdICogejtcbiAgICBvdXRbMTFdID0gYVsxMV0gKiB6O1xuICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM107XG4gICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgbWF0NCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBnaXZlbiBheGlzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBheGlzIHRoZSBheGlzIHRvIHJvdGF0ZSBhcm91bmRcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGUkMShvdXQsIGEsIHJhZCwgYXhpcykge1xuICAgIHZhciB4ID0gYXhpc1swXSxcbiAgICAgICAgeSA9IGF4aXNbMV0sXG4gICAgICAgIHogPSBheGlzWzJdO1xuICAgIHZhciBsZW4gPSBNYXRoLmh5cG90KHgsIHksIHopO1xuICAgIHZhciBzLCBjLCB0O1xuICAgIHZhciBhMDAsIGEwMSwgYTAyLCBhMDM7XG4gICAgdmFyIGExMCwgYTExLCBhMTIsIGExMztcbiAgICB2YXIgYTIwLCBhMjEsIGEyMiwgYTIzO1xuICAgIHZhciBiMDAsIGIwMSwgYjAyO1xuICAgIHZhciBiMTAsIGIxMSwgYjEyO1xuICAgIHZhciBiMjAsIGIyMSwgYjIyO1xuXG4gICAgaWYgKGxlbiA8IEVQU0lMT04pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxlbiA9IDEgLyBsZW47XG4gICAgeCAqPSBsZW47XG4gICAgeSAqPSBsZW47XG4gICAgeiAqPSBsZW47XG4gICAgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdCA9IDEgLSBjO1xuICAgIGEwMCA9IGFbMF07XG4gICAgYTAxID0gYVsxXTtcbiAgICBhMDIgPSBhWzJdO1xuICAgIGEwMyA9IGFbM107XG4gICAgYTEwID0gYVs0XTtcbiAgICBhMTEgPSBhWzVdO1xuICAgIGExMiA9IGFbNl07XG4gICAgYTEzID0gYVs3XTtcbiAgICBhMjAgPSBhWzhdO1xuICAgIGEyMSA9IGFbOV07XG4gICAgYTIyID0gYVsxMF07XG4gICAgYTIzID0gYVsxMV07IC8vIENvbnN0cnVjdCB0aGUgZWxlbWVudHMgb2YgdGhlIHJvdGF0aW9uIG1hdHJpeFxuXG4gICAgYjAwID0geCAqIHggKiB0ICsgYztcbiAgICBiMDEgPSB5ICogeCAqIHQgKyB6ICogcztcbiAgICBiMDIgPSB6ICogeCAqIHQgLSB5ICogcztcbiAgICBiMTAgPSB4ICogeSAqIHQgLSB6ICogcztcbiAgICBiMTEgPSB5ICogeSAqIHQgKyBjO1xuICAgIGIxMiA9IHogKiB5ICogdCArIHggKiBzO1xuICAgIGIyMCA9IHggKiB6ICogdCArIHkgKiBzO1xuICAgIGIyMSA9IHkgKiB6ICogdCAtIHggKiBzO1xuICAgIGIyMiA9IHogKiB6ICogdCArIGM7IC8vIFBlcmZvcm0gcm90YXRpb24tc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgICBvdXRbMF0gPSBhMDAgKiBiMDAgKyBhMTAgKiBiMDEgKyBhMjAgKiBiMDI7XG4gICAgb3V0WzFdID0gYTAxICogYjAwICsgYTExICogYjAxICsgYTIxICogYjAyO1xuICAgIG91dFsyXSA9IGEwMiAqIGIwMCArIGExMiAqIGIwMSArIGEyMiAqIGIwMjtcbiAgICBvdXRbM10gPSBhMDMgKiBiMDAgKyBhMTMgKiBiMDEgKyBhMjMgKiBiMDI7XG4gICAgb3V0WzRdID0gYTAwICogYjEwICsgYTEwICogYjExICsgYTIwICogYjEyO1xuICAgIG91dFs1XSA9IGEwMSAqIGIxMCArIGExMSAqIGIxMSArIGEyMSAqIGIxMjtcbiAgICBvdXRbNl0gPSBhMDIgKiBiMTAgKyBhMTIgKiBiMTEgKyBhMjIgKiBiMTI7XG4gICAgb3V0WzddID0gYTAzICogYjEwICsgYTEzICogYjExICsgYTIzICogYjEyO1xuICAgIG91dFs4XSA9IGEwMCAqIGIyMCArIGExMCAqIGIyMSArIGEyMCAqIGIyMjtcbiAgICBvdXRbOV0gPSBhMDEgKiBiMjAgKyBhMTEgKiBiMjEgKyBhMjEgKiBiMjI7XG4gICAgb3V0WzEwXSA9IGEwMiAqIGIyMCArIGExMiAqIGIyMSArIGEyMiAqIGIyMjtcbiAgICBvdXRbMTFdID0gYTAzICogYjIwICsgYTEzICogYjIxICsgYTIzICogYjIyO1xuXG4gICAgaWYgKGEgIT09IG91dCkge1xuICAgICAgLy8gSWYgdGhlIHNvdXJjZSBhbmQgZGVzdGluYXRpb24gZGlmZmVyLCBjb3B5IHRoZSB1bmNoYW5nZWQgbGFzdCByb3dcbiAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgbWF0cml4IGJ5IHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZVgkMyhvdXQsIGEsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICB2YXIgYyA9IE1hdGguY29zKHJhZCk7XG4gICAgdmFyIGExMCA9IGFbNF07XG4gICAgdmFyIGExMSA9IGFbNV07XG4gICAgdmFyIGExMiA9IGFbNl07XG4gICAgdmFyIGExMyA9IGFbN107XG4gICAgdmFyIGEyMCA9IGFbOF07XG4gICAgdmFyIGEyMSA9IGFbOV07XG4gICAgdmFyIGEyMiA9IGFbMTBdO1xuICAgIHZhciBhMjMgPSBhWzExXTtcblxuICAgIGlmIChhICE9PSBvdXQpIHtcbiAgICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIHJvd3NcbiAgICAgIG91dFswXSA9IGFbMF07XG4gICAgICBvdXRbMV0gPSBhWzFdO1xuICAgICAgb3V0WzJdID0gYVsyXTtcbiAgICAgIG91dFszXSA9IGFbM107XG4gICAgICBvdXRbMTJdID0gYVsxMl07XG4gICAgICBvdXRbMTNdID0gYVsxM107XG4gICAgICBvdXRbMTRdID0gYVsxNF07XG4gICAgICBvdXRbMTVdID0gYVsxNV07XG4gICAgfSAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cblxuICAgIG91dFs0XSA9IGExMCAqIGMgKyBhMjAgKiBzO1xuICAgIG91dFs1XSA9IGExMSAqIGMgKyBhMjEgKiBzO1xuICAgIG91dFs2XSA9IGExMiAqIGMgKyBhMjIgKiBzO1xuICAgIG91dFs3XSA9IGExMyAqIGMgKyBhMjMgKiBzO1xuICAgIG91dFs4XSA9IGEyMCAqIGMgLSBhMTAgKiBzO1xuICAgIG91dFs5XSA9IGEyMSAqIGMgLSBhMTEgKiBzO1xuICAgIG91dFsxMF0gPSBhMjIgKiBjIC0gYTEyICogcztcbiAgICBvdXRbMTFdID0gYTIzICogYyAtIGExMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIG1hdHJpeCBieSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBZIGF4aXNcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyBtYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVZJDMob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIHZhciBhMDAgPSBhWzBdO1xuICAgIHZhciBhMDEgPSBhWzFdO1xuICAgIHZhciBhMDIgPSBhWzJdO1xuICAgIHZhciBhMDMgPSBhWzNdO1xuICAgIHZhciBhMjAgPSBhWzhdO1xuICAgIHZhciBhMjEgPSBhWzldO1xuICAgIHZhciBhMjIgPSBhWzEwXTtcbiAgICB2YXIgYTIzID0gYVsxMV07XG5cbiAgICBpZiAoYSAhPT0gb3V0KSB7XG4gICAgICAvLyBJZiB0aGUgc291cmNlIGFuZCBkZXN0aW5hdGlvbiBkaWZmZXIsIGNvcHkgdGhlIHVuY2hhbmdlZCByb3dzXG4gICAgICBvdXRbNF0gPSBhWzRdO1xuICAgICAgb3V0WzVdID0gYVs1XTtcbiAgICAgIG91dFs2XSA9IGFbNl07XG4gICAgICBvdXRbN10gPSBhWzddO1xuICAgICAgb3V0WzEyXSA9IGFbMTJdO1xuICAgICAgb3V0WzEzXSA9IGFbMTNdO1xuICAgICAgb3V0WzE0XSA9IGFbMTRdO1xuICAgICAgb3V0WzE1XSA9IGFbMTVdO1xuICAgIH0gLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG5cbiAgICBvdXRbMF0gPSBhMDAgKiBjIC0gYTIwICogcztcbiAgICBvdXRbMV0gPSBhMDEgKiBjIC0gYTIxICogcztcbiAgICBvdXRbMl0gPSBhMDIgKiBjIC0gYTIyICogcztcbiAgICBvdXRbM10gPSBhMDMgKiBjIC0gYTIzICogcztcbiAgICBvdXRbOF0gPSBhMDAgKiBzICsgYTIwICogYztcbiAgICBvdXRbOV0gPSBhMDEgKiBzICsgYTIxICogYztcbiAgICBvdXRbMTBdID0gYTAyICogcyArIGEyMiAqIGM7XG4gICAgb3V0WzExXSA9IGEwMyAqIHMgKyBhMjMgKiBjO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBtYXRyaXggYnkgdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWiBheGlzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IHRoZSByZWNlaXZpbmcgbWF0cml4XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXggdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlWiQzKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTtcbiAgICB2YXIgYTAwID0gYVswXTtcbiAgICB2YXIgYTAxID0gYVsxXTtcbiAgICB2YXIgYTAyID0gYVsyXTtcbiAgICB2YXIgYTAzID0gYVszXTtcbiAgICB2YXIgYTEwID0gYVs0XTtcbiAgICB2YXIgYTExID0gYVs1XTtcbiAgICB2YXIgYTEyID0gYVs2XTtcbiAgICB2YXIgYTEzID0gYVs3XTtcblxuICAgIGlmIChhICE9PSBvdXQpIHtcbiAgICAgIC8vIElmIHRoZSBzb3VyY2UgYW5kIGRlc3RpbmF0aW9uIGRpZmZlciwgY29weSB0aGUgdW5jaGFuZ2VkIGxhc3Qgcm93XG4gICAgICBvdXRbOF0gPSBhWzhdO1xuICAgICAgb3V0WzldID0gYVs5XTtcbiAgICAgIG91dFsxMF0gPSBhWzEwXTtcbiAgICAgIG91dFsxMV0gPSBhWzExXTtcbiAgICAgIG91dFsxMl0gPSBhWzEyXTtcbiAgICAgIG91dFsxM10gPSBhWzEzXTtcbiAgICAgIG91dFsxNF0gPSBhWzE0XTtcbiAgICAgIG91dFsxNV0gPSBhWzE1XTtcbiAgICB9IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuXG4gICAgb3V0WzBdID0gYTAwICogYyArIGExMCAqIHM7XG4gICAgb3V0WzFdID0gYTAxICogYyArIGExMSAqIHM7XG4gICAgb3V0WzJdID0gYTAyICogYyArIGExMiAqIHM7XG4gICAgb3V0WzNdID0gYTAzICogYyArIGExMyAqIHM7XG4gICAgb3V0WzRdID0gYTEwICogYyAtIGEwMCAqIHM7XG4gICAgb3V0WzVdID0gYTExICogYyAtIGEwMSAqIHM7XG4gICAgb3V0WzZdID0gYTEyICogYyAtIGEwMiAqIHM7XG4gICAgb3V0WzddID0gYTEzICogYyAtIGEwMyAqIHM7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgdmVjdG9yIHRyYW5zbGF0aW9uXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgVHJhbnNsYXRpb24gdmVjdG9yXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVRyYW5zbGF0aW9uJDEob3V0LCB2KSB7XG4gICAgb3V0WzBdID0gMTtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDE7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMTtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXTtcbiAgICBvdXRbMTNdID0gdlsxXTtcbiAgICBvdXRbMTRdID0gdlsyXTtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSB2ZWN0b3Igc2NhbGluZ1xuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQ0LnNjYWxlKGRlc3QsIGRlc3QsIHZlYyk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHYgU2NhbGluZyB2ZWN0b3JcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tU2NhbGluZyhvdXQsIHYpIHtcbiAgICBvdXRbMF0gPSB2WzBdO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gdlsxXTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSB2WzJdO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSBhIGdpdmVuIGFuZ2xlIGFyb3VuZCBhIGdpdmVuIGF4aXNcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0NC5yb3RhdGUoZGVzdCwgZGVzdCwgcmFkLCBheGlzKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVJvdGF0aW9uJDEob3V0LCByYWQsIGF4aXMpIHtcbiAgICB2YXIgeCA9IGF4aXNbMF0sXG4gICAgICAgIHkgPSBheGlzWzFdLFxuICAgICAgICB6ID0gYXhpc1syXTtcbiAgICB2YXIgbGVuID0gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbiAgICB2YXIgcywgYywgdDtcblxuICAgIGlmIChsZW4gPCBFUFNJTE9OKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZW4gPSAxIC8gbGVuO1xuICAgIHggKj0gbGVuO1xuICAgIHkgKj0gbGVuO1xuICAgIHogKj0gbGVuO1xuICAgIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIGMgPSBNYXRoLmNvcyhyYWQpO1xuICAgIHQgPSAxIC0gYzsgLy8gUGVyZm9ybSByb3RhdGlvbi1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICAgIG91dFswXSA9IHggKiB4ICogdCArIGM7XG4gICAgb3V0WzFdID0geSAqIHggKiB0ICsgeiAqIHM7XG4gICAgb3V0WzJdID0geiAqIHggKiB0IC0geSAqIHM7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSB4ICogeSAqIHQgLSB6ICogcztcbiAgICBvdXRbNV0gPSB5ICogeSAqIHQgKyBjO1xuICAgIG91dFs2XSA9IHogKiB5ICogdCArIHggKiBzO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geCAqIHogKiB0ICsgeSAqIHM7XG4gICAgb3V0WzldID0geSAqIHogKiB0IC0geCAqIHM7XG4gICAgb3V0WzEwXSA9IHogKiB6ICogdCArIGM7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIHRoZSBnaXZlbiBhbmdsZSBhcm91bmQgdGhlIFggYXhpc1xuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQ0LnJvdGF0ZVgoZGVzdCwgZGVzdCwgcmFkKTtcbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIHRoZSBhbmdsZSB0byByb3RhdGUgdGhlIG1hdHJpeCBieVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21YUm90YXRpb24ob3V0LCByYWQpIHtcbiAgICB2YXIgcyA9IE1hdGguc2luKHJhZCk7XG4gICAgdmFyIGMgPSBNYXRoLmNvcyhyYWQpOyAvLyBQZXJmb3JtIGF4aXMtc3BlY2lmaWMgbWF0cml4IG11bHRpcGxpY2F0aW9uXG5cbiAgICBvdXRbMF0gPSAxO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gYztcbiAgICBvdXRbNl0gPSBzO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAtcztcbiAgICBvdXRbMTBdID0gYztcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTRdID0gMDtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gdGhlIGdpdmVuIGFuZ2xlIGFyb3VuZCB0aGUgWSBheGlzXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDQucm90YXRlWShkZXN0LCBkZXN0LCByYWQpO1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgdGhlIGFuZ2xlIHRvIHJvdGF0ZSB0aGUgbWF0cml4IGJ5XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVlSb3RhdGlvbihvdXQsIHJhZCkge1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkKTtcbiAgICB2YXIgYyA9IE1hdGguY29zKHJhZCk7IC8vIFBlcmZvcm0gYXhpcy1zcGVjaWZpYyBtYXRyaXggbXVsdGlwbGljYXRpb25cblxuICAgIG91dFswXSA9IGM7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAtcztcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gMTtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gcztcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMF0gPSBjO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYXJvdW5kIHRoZSBaIGF4aXNcbiAgICogVGhpcyBpcyBlcXVpdmFsZW50IHRvIChidXQgbXVjaCBmYXN0ZXIgdGhhbik6XG4gICAqXG4gICAqICAgICBtYXQ0LmlkZW50aXR5KGRlc3QpO1xuICAgKiAgICAgbWF0NC5yb3RhdGVaKGRlc3QsIGRlc3QsIHJhZCk7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgdG8gcm90YXRlIHRoZSBtYXRyaXggYnlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tWlJvdGF0aW9uKG91dCwgcmFkKSB7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBjID0gTWF0aC5jb3MocmFkKTsgLy8gUGVyZm9ybSBheGlzLXNwZWNpZmljIG1hdHJpeCBtdWx0aXBsaWNhdGlvblxuXG4gICAgb3V0WzBdID0gYztcbiAgICBvdXRbMV0gPSBzO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAtcztcbiAgICBvdXRbNV0gPSBjO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAwO1xuICAgIG91dFs5XSA9IDA7XG4gICAgb3V0WzEwXSA9IDE7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiBhbmQgdmVjdG9yIHRyYW5zbGF0aW9uXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gICAqICAgICBsZXQgcXVhdE1hdCA9IG1hdDQuY3JlYXRlKCk7XG4gICAqICAgICBxdWF0NC50b01hdDQocXVhdCwgcXVhdE1hdCk7XG4gICAqICAgICBtYXQ0Lm11bHRpcGx5KGRlc3QsIHF1YXRNYXQpO1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdiBUcmFuc2xhdGlvbiB2ZWN0b3JcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiQxKG91dCwgcSwgdikge1xuICAgIC8vIFF1YXRlcm5pb24gbWF0aFxuICAgIHZhciB4ID0gcVswXSxcbiAgICAgICAgeSA9IHFbMV0sXG4gICAgICAgIHogPSBxWzJdLFxuICAgICAgICB3ID0gcVszXTtcbiAgICB2YXIgeDIgPSB4ICsgeDtcbiAgICB2YXIgeTIgPSB5ICsgeTtcbiAgICB2YXIgejIgPSB6ICsgejtcbiAgICB2YXIgeHggPSB4ICogeDI7XG4gICAgdmFyIHh5ID0geCAqIHkyO1xuICAgIHZhciB4eiA9IHggKiB6MjtcbiAgICB2YXIgeXkgPSB5ICogeTI7XG4gICAgdmFyIHl6ID0geSAqIHoyO1xuICAgIHZhciB6eiA9IHogKiB6MjtcbiAgICB2YXIgd3ggPSB3ICogeDI7XG4gICAgdmFyIHd5ID0gdyAqIHkyO1xuICAgIHZhciB3eiA9IHcgKiB6MjtcbiAgICBvdXRbMF0gPSAxIC0gKHl5ICsgenopO1xuICAgIG91dFsxXSA9IHh5ICsgd3o7XG4gICAgb3V0WzJdID0geHogLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHh5IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtICh4eCArIHp6KTtcbiAgICBvdXRbNl0gPSB5eiArIHd4O1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0geHogKyB3eTtcbiAgICBvdXRbOV0gPSB5eiAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0gKHh4ICsgeXkpO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSB2WzBdO1xuICAgIG91dFsxM10gPSB2WzFdO1xuICAgIG91dFsxNF0gPSB2WzJdO1xuICAgIG91dFsxNV0gPSAxO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgbWF0NCBmcm9tIGEgZHVhbCBxdWF0LlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBNYXRyaXhcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIER1YWwgUXVhdGVybmlvblxuICAgKiBAcmV0dXJucyB7bWF0NH0gbWF0NCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tUXVhdDIob3V0LCBhKSB7XG4gICAgdmFyIHRyYW5zbGF0aW9uID0gbmV3IEFSUkFZX1RZUEUoMyk7XG4gICAgdmFyIGJ4ID0gLWFbMF0sXG4gICAgICAgIGJ5ID0gLWFbMV0sXG4gICAgICAgIGJ6ID0gLWFbMl0sXG4gICAgICAgIGJ3ID0gYVszXSxcbiAgICAgICAgYXggPSBhWzRdLFxuICAgICAgICBheSA9IGFbNV0sXG4gICAgICAgIGF6ID0gYVs2XSxcbiAgICAgICAgYXcgPSBhWzddO1xuICAgIHZhciBtYWduaXR1ZGUgPSBieCAqIGJ4ICsgYnkgKiBieSArIGJ6ICogYnogKyBidyAqIGJ3OyAvL09ubHkgc2NhbGUgaWYgaXQgbWFrZXMgc2Vuc2VcblxuICAgIGlmIChtYWduaXR1ZGUgPiAwKSB7XG4gICAgICB0cmFuc2xhdGlvblswXSA9IChheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5KSAqIDIgLyBtYWduaXR1ZGU7XG4gICAgICB0cmFuc2xhdGlvblsxXSA9IChheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6KSAqIDIgLyBtYWduaXR1ZGU7XG4gICAgICB0cmFuc2xhdGlvblsyXSA9IChheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4KSAqIDIgLyBtYWduaXR1ZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zbGF0aW9uWzBdID0gKGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnkpICogMjtcbiAgICAgIHRyYW5zbGF0aW9uWzFdID0gKGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnopICogMjtcbiAgICAgIHRyYW5zbGF0aW9uWzJdID0gKGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYngpICogMjtcbiAgICB9XG5cbiAgICBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiQxKG91dCwgYSwgdHJhbnNsYXRpb24pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRyYW5zbGF0aW9uIHZlY3RvciBjb21wb25lbnQgb2YgYSB0cmFuc2Zvcm1hdGlvblxuICAgKiAgbWF0cml4LiBJZiBhIG1hdHJpeCBpcyBidWlsdCB3aXRoIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uLFxuICAgKiAgdGhlIHJldHVybmVkIHZlY3RvciB3aWxsIGJlIHRoZSBzYW1lIGFzIHRoZSB0cmFuc2xhdGlvbiB2ZWN0b3JcbiAgICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gICAqIEBwYXJhbSAge3ZlYzN9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSB0cmFuc2xhdGlvbiBjb21wb25lbnRcbiAgICogQHBhcmFtICB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICAgKiBAcmV0dXJuIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb24kMShvdXQsIG1hdCkge1xuICAgIG91dFswXSA9IG1hdFsxMl07XG4gICAgb3V0WzFdID0gbWF0WzEzXTtcbiAgICBvdXRbMl0gPSBtYXRbMTRdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNjYWxpbmcgZmFjdG9yIGNvbXBvbmVudCBvZiBhIHRyYW5zZm9ybWF0aW9uXG4gICAqICBtYXRyaXguIElmIGEgbWF0cml4IGlzIGJ1aWx0IHdpdGggZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZVxuICAgKiAgd2l0aCBhIG5vcm1hbGl6ZWQgUXVhdGVybmlvbiBwYXJhbXRlciwgdGhlIHJldHVybmVkIHZlY3RvciB3aWxsIGJlXG4gICAqICB0aGUgc2FtZSBhcyB0aGUgc2NhbGluZyB2ZWN0b3JcbiAgICogIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gICAqIEBwYXJhbSAge3ZlYzN9IG91dCBWZWN0b3IgdG8gcmVjZWl2ZSBzY2FsaW5nIGZhY3RvciBjb21wb25lbnRcbiAgICogQHBhcmFtICB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICAgKiBAcmV0dXJuIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0U2NhbGluZyhvdXQsIG1hdCkge1xuICAgIHZhciBtMTEgPSBtYXRbMF07XG4gICAgdmFyIG0xMiA9IG1hdFsxXTtcbiAgICB2YXIgbTEzID0gbWF0WzJdO1xuICAgIHZhciBtMjEgPSBtYXRbNF07XG4gICAgdmFyIG0yMiA9IG1hdFs1XTtcbiAgICB2YXIgbTIzID0gbWF0WzZdO1xuICAgIHZhciBtMzEgPSBtYXRbOF07XG4gICAgdmFyIG0zMiA9IG1hdFs5XTtcbiAgICB2YXIgbTMzID0gbWF0WzEwXTtcbiAgICBvdXRbMF0gPSBNYXRoLmh5cG90KG0xMSwgbTEyLCBtMTMpO1xuICAgIG91dFsxXSA9IE1hdGguaHlwb3QobTIxLCBtMjIsIG0yMyk7XG4gICAgb3V0WzJdID0gTWF0aC5oeXBvdChtMzEsIG0zMiwgbTMzKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgcXVhdGVybmlvbiByZXByZXNlbnRpbmcgdGhlIHJvdGF0aW9uYWwgY29tcG9uZW50XG4gICAqICBvZiBhIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC4gSWYgYSBtYXRyaXggaXMgYnVpbHQgd2l0aFxuICAgKiAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb24sIHRoZSByZXR1cm5lZCBxdWF0ZXJuaW9uIHdpbGwgYmUgdGhlXG4gICAqICBzYW1lIGFzIHRoZSBxdWF0ZXJuaW9uIG9yaWdpbmFsbHkgc3VwcGxpZWQuXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IFF1YXRlcm5pb24gdG8gcmVjZWl2ZSB0aGUgcm90YXRpb24gY29tcG9uZW50XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICAgKiBAcmV0dXJuIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0Um90YXRpb24ob3V0LCBtYXQpIHtcbiAgICB2YXIgc2NhbGluZyA9IG5ldyBBUlJBWV9UWVBFKDMpO1xuICAgIGdldFNjYWxpbmcoc2NhbGluZywgbWF0KTtcbiAgICB2YXIgaXMxID0gMSAvIHNjYWxpbmdbMF07XG4gICAgdmFyIGlzMiA9IDEgLyBzY2FsaW5nWzFdO1xuICAgIHZhciBpczMgPSAxIC8gc2NhbGluZ1syXTtcbiAgICB2YXIgc20xMSA9IG1hdFswXSAqIGlzMTtcbiAgICB2YXIgc20xMiA9IG1hdFsxXSAqIGlzMjtcbiAgICB2YXIgc20xMyA9IG1hdFsyXSAqIGlzMztcbiAgICB2YXIgc20yMSA9IG1hdFs0XSAqIGlzMTtcbiAgICB2YXIgc20yMiA9IG1hdFs1XSAqIGlzMjtcbiAgICB2YXIgc20yMyA9IG1hdFs2XSAqIGlzMztcbiAgICB2YXIgc20zMSA9IG1hdFs4XSAqIGlzMTtcbiAgICB2YXIgc20zMiA9IG1hdFs5XSAqIGlzMjtcbiAgICB2YXIgc20zMyA9IG1hdFsxMF0gKiBpczM7XG4gICAgdmFyIHRyYWNlID0gc20xMSArIHNtMjIgKyBzbTMzO1xuICAgIHZhciBTID0gMDtcblxuICAgIGlmICh0cmFjZSA+IDApIHtcbiAgICAgIFMgPSBNYXRoLnNxcnQodHJhY2UgKyAxLjApICogMjtcbiAgICAgIG91dFszXSA9IDAuMjUgKiBTO1xuICAgICAgb3V0WzBdID0gKHNtMjMgLSBzbTMyKSAvIFM7XG4gICAgICBvdXRbMV0gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICAgIG91dFsyXSA9IChzbTEyIC0gc20yMSkgLyBTO1xuICAgIH0gZWxzZSBpZiAoc20xMSA+IHNtMjIgJiYgc20xMSA+IHNtMzMpIHtcbiAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20xMSAtIHNtMjIgLSBzbTMzKSAqIDI7XG4gICAgICBvdXRbM10gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICAgIG91dFswXSA9IDAuMjUgKiBTO1xuICAgICAgb3V0WzFdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICBvdXRbMl0gPSAoc20zMSArIHNtMTMpIC8gUztcbiAgICB9IGVsc2UgaWYgKHNtMjIgPiBzbTMzKSB7XG4gICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMjIgLSBzbTExIC0gc20zMykgKiAyO1xuICAgICAgb3V0WzNdID0gKHNtMzEgLSBzbTEzKSAvIFM7XG4gICAgICBvdXRbMF0gPSAoc20xMiArIHNtMjEpIC8gUztcbiAgICAgIG91dFsxXSA9IDAuMjUgKiBTO1xuICAgICAgb3V0WzJdID0gKHNtMjMgKyBzbTMyKSAvIFM7XG4gICAgfSBlbHNlIHtcbiAgICAgIFMgPSBNYXRoLnNxcnQoMS4wICsgc20zMyAtIHNtMTEgLSBzbTIyKSAqIDI7XG4gICAgICBvdXRbM10gPSAoc20xMiAtIHNtMjEpIC8gUztcbiAgICAgIG91dFswXSA9IChzbTMxICsgc20xMykgLyBTO1xuICAgICAgb3V0WzFdID0gKHNtMjMgKyBzbTMyKSAvIFM7XG4gICAgICBvdXRbMl0gPSAwLjI1ICogUztcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBEZWNvbXBvc2VzIGEgdHJhbnNmb3JtYXRpb24gbWF0cml4IGludG8gaXRzIHJvdGF0aW9uLCB0cmFuc2xhdGlvblxuICAgKiBhbmQgc2NhbGUgY29tcG9uZW50cy4gUmV0dXJucyBvbmx5IHRoZSByb3RhdGlvbiBjb21wb25lbnRcbiAgICogQHBhcmFtICB7cXVhdH0gb3V0X3IgUXVhdGVybmlvbiB0byByZWNlaXZlIHRoZSByb3RhdGlvbiBjb21wb25lbnRcbiAgICogQHBhcmFtICB7dmVjM30gb3V0X3QgVmVjdG9yIHRvIHJlY2VpdmUgdGhlIHRyYW5zbGF0aW9uIHZlY3RvclxuICAgKiBAcGFyYW0gIHt2ZWMzfSBvdXRfcyBWZWN0b3IgdG8gcmVjZWl2ZSB0aGUgc2NhbGluZyBmYWN0b3JcbiAgICogQHBhcmFtICB7UmVhZG9ubHlNYXQ0fSBtYXQgTWF0cml4IHRvIGJlIGRlY29tcG9zZWQgKGlucHV0KVxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0X3JcbiAgICovXG5cbiAgZnVuY3Rpb24gZGVjb21wb3NlKG91dF9yLCBvdXRfdCwgb3V0X3MsIG1hdCkge1xuICAgIG91dF90WzBdID0gbWF0WzEyXTtcbiAgICBvdXRfdFsxXSA9IG1hdFsxM107XG4gICAgb3V0X3RbMl0gPSBtYXRbMTRdO1xuICAgIHZhciBtMTEgPSBtYXRbMF07XG4gICAgdmFyIG0xMiA9IG1hdFsxXTtcbiAgICB2YXIgbTEzID0gbWF0WzJdO1xuICAgIHZhciBtMjEgPSBtYXRbNF07XG4gICAgdmFyIG0yMiA9IG1hdFs1XTtcbiAgICB2YXIgbTIzID0gbWF0WzZdO1xuICAgIHZhciBtMzEgPSBtYXRbOF07XG4gICAgdmFyIG0zMiA9IG1hdFs5XTtcbiAgICB2YXIgbTMzID0gbWF0WzEwXTtcbiAgICBvdXRfc1swXSA9IE1hdGguaHlwb3QobTExLCBtMTIsIG0xMyk7XG4gICAgb3V0X3NbMV0gPSBNYXRoLmh5cG90KG0yMSwgbTIyLCBtMjMpO1xuICAgIG91dF9zWzJdID0gTWF0aC5oeXBvdChtMzEsIG0zMiwgbTMzKTtcbiAgICB2YXIgaXMxID0gMSAvIG91dF9zWzBdO1xuICAgIHZhciBpczIgPSAxIC8gb3V0X3NbMV07XG4gICAgdmFyIGlzMyA9IDEgLyBvdXRfc1syXTtcbiAgICB2YXIgc20xMSA9IG0xMSAqIGlzMTtcbiAgICB2YXIgc20xMiA9IG0xMiAqIGlzMjtcbiAgICB2YXIgc20xMyA9IG0xMyAqIGlzMztcbiAgICB2YXIgc20yMSA9IG0yMSAqIGlzMTtcbiAgICB2YXIgc20yMiA9IG0yMiAqIGlzMjtcbiAgICB2YXIgc20yMyA9IG0yMyAqIGlzMztcbiAgICB2YXIgc20zMSA9IG0zMSAqIGlzMTtcbiAgICB2YXIgc20zMiA9IG0zMiAqIGlzMjtcbiAgICB2YXIgc20zMyA9IG0zMyAqIGlzMztcbiAgICB2YXIgdHJhY2UgPSBzbTExICsgc20yMiArIHNtMzM7XG4gICAgdmFyIFMgPSAwO1xuXG4gICAgaWYgKHRyYWNlID4gMCkge1xuICAgICAgUyA9IE1hdGguc3FydCh0cmFjZSArIDEuMCkgKiAyO1xuICAgICAgb3V0X3JbM10gPSAwLjI1ICogUztcbiAgICAgIG91dF9yWzBdID0gKHNtMjMgLSBzbTMyKSAvIFM7XG4gICAgICBvdXRfclsxXSA9IChzbTMxIC0gc20xMykgLyBTO1xuICAgICAgb3V0X3JbMl0gPSAoc20xMiAtIHNtMjEpIC8gUztcbiAgICB9IGVsc2UgaWYgKHNtMTEgPiBzbTIyICYmIHNtMTEgPiBzbTMzKSB7XG4gICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMTEgLSBzbTIyIC0gc20zMykgKiAyO1xuICAgICAgb3V0X3JbM10gPSAoc20yMyAtIHNtMzIpIC8gUztcbiAgICAgIG91dF9yWzBdID0gMC4yNSAqIFM7XG4gICAgICBvdXRfclsxXSA9IChzbTEyICsgc20yMSkgLyBTO1xuICAgICAgb3V0X3JbMl0gPSAoc20zMSArIHNtMTMpIC8gUztcbiAgICB9IGVsc2UgaWYgKHNtMjIgPiBzbTMzKSB7XG4gICAgICBTID0gTWF0aC5zcXJ0KDEuMCArIHNtMjIgLSBzbTExIC0gc20zMykgKiAyO1xuICAgICAgb3V0X3JbM10gPSAoc20zMSAtIHNtMTMpIC8gUztcbiAgICAgIG91dF9yWzBdID0gKHNtMTIgKyBzbTIxKSAvIFM7XG4gICAgICBvdXRfclsxXSA9IDAuMjUgKiBTO1xuICAgICAgb3V0X3JbMl0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgICB9IGVsc2Uge1xuICAgICAgUyA9IE1hdGguc3FydCgxLjAgKyBzbTMzIC0gc20xMSAtIHNtMjIpICogMjtcbiAgICAgIG91dF9yWzNdID0gKHNtMTIgLSBzbTIxKSAvIFM7XG4gICAgICBvdXRfclswXSA9IChzbTMxICsgc20xMykgLyBTO1xuICAgICAgb3V0X3JbMV0gPSAoc20yMyArIHNtMzIpIC8gUztcbiAgICAgIG91dF9yWzJdID0gMC4yNSAqIFM7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dF9yO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLCB2ZWN0b3IgdHJhbnNsYXRpb24gYW5kIHZlY3RvciBzY2FsZVxuICAgKiBUaGlzIGlzIGVxdWl2YWxlbnQgdG8gKGJ1dCBtdWNoIGZhc3RlciB0aGFuKTpcbiAgICpcbiAgICogICAgIG1hdDQuaWRlbnRpdHkoZGVzdCk7XG4gICAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCB2ZWMpO1xuICAgKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICAgKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICAgKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAgICogICAgIG1hdDQuc2NhbGUoZGVzdCwgc2NhbGUpXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gcyBTY2FsaW5nIHZlY3RvclxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGUob3V0LCBxLCB2LCBzKSB7XG4gICAgLy8gUXVhdGVybmlvbiBtYXRoXG4gICAgdmFyIHggPSBxWzBdLFxuICAgICAgICB5ID0gcVsxXSxcbiAgICAgICAgeiA9IHFbMl0sXG4gICAgICAgIHcgPSBxWzNdO1xuICAgIHZhciB4MiA9IHggKyB4O1xuICAgIHZhciB5MiA9IHkgKyB5O1xuICAgIHZhciB6MiA9IHogKyB6O1xuICAgIHZhciB4eCA9IHggKiB4MjtcbiAgICB2YXIgeHkgPSB4ICogeTI7XG4gICAgdmFyIHh6ID0geCAqIHoyO1xuICAgIHZhciB5eSA9IHkgKiB5MjtcbiAgICB2YXIgeXogPSB5ICogejI7XG4gICAgdmFyIHp6ID0geiAqIHoyO1xuICAgIHZhciB3eCA9IHcgKiB4MjtcbiAgICB2YXIgd3kgPSB3ICogeTI7XG4gICAgdmFyIHd6ID0gdyAqIHoyO1xuICAgIHZhciBzeCA9IHNbMF07XG4gICAgdmFyIHN5ID0gc1sxXTtcbiAgICB2YXIgc3ogPSBzWzJdO1xuICAgIG91dFswXSA9ICgxIC0gKHl5ICsgenopKSAqIHN4O1xuICAgIG91dFsxXSA9ICh4eSArIHd6KSAqIHN4O1xuICAgIG91dFsyXSA9ICh4eiAtIHd5KSAqIHN4O1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gKHh5IC0gd3opICogc3k7XG4gICAgb3V0WzVdID0gKDEgLSAoeHggKyB6eikpICogc3k7XG4gICAgb3V0WzZdID0gKHl6ICsgd3gpICogc3k7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSAoeHogKyB3eSkgKiBzejtcbiAgICBvdXRbOV0gPSAoeXogLSB3eCkgKiBzejtcbiAgICBvdXRbMTBdID0gKDEgLSAoeHggKyB5eSkpICogc3o7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IHZbMF07XG4gICAgb3V0WzEzXSA9IHZbMV07XG4gICAgb3V0WzE0XSA9IHZbMl07XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbiwgdmVjdG9yIHRyYW5zbGF0aW9uIGFuZCB2ZWN0b3Igc2NhbGUsIHJvdGF0aW5nIGFuZCBzY2FsaW5nIGFyb3VuZCB0aGUgZ2l2ZW4gb3JpZ2luXG4gICAqIFRoaXMgaXMgZXF1aXZhbGVudCB0byAoYnV0IG11Y2ggZmFzdGVyIHRoYW4pOlxuICAgKlxuICAgKiAgICAgbWF0NC5pZGVudGl0eShkZXN0KTtcbiAgICogICAgIG1hdDQudHJhbnNsYXRlKGRlc3QsIHZlYyk7XG4gICAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBvcmlnaW4pO1xuICAgKiAgICAgbGV0IHF1YXRNYXQgPSBtYXQ0LmNyZWF0ZSgpO1xuICAgKiAgICAgcXVhdDQudG9NYXQ0KHF1YXQsIHF1YXRNYXQpO1xuICAgKiAgICAgbWF0NC5tdWx0aXBseShkZXN0LCBxdWF0TWF0KTtcbiAgICogICAgIG1hdDQuc2NhbGUoZGVzdCwgc2NhbGUpXG4gICAqICAgICBtYXQ0LnRyYW5zbGF0ZShkZXN0LCBuZWdhdGl2ZU9yaWdpbik7XG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtxdWF0NH0gcSBSb3RhdGlvbiBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IFRyYW5zbGF0aW9uIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gcyBTY2FsaW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gbyBUaGUgb3JpZ2luIHZlY3RvciBhcm91bmQgd2hpY2ggdG8gc2NhbGUgYW5kIHJvdGF0ZVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW4ob3V0LCBxLCB2LCBzLCBvKSB7XG4gICAgLy8gUXVhdGVybmlvbiBtYXRoXG4gICAgdmFyIHggPSBxWzBdLFxuICAgICAgICB5ID0gcVsxXSxcbiAgICAgICAgeiA9IHFbMl0sXG4gICAgICAgIHcgPSBxWzNdO1xuICAgIHZhciB4MiA9IHggKyB4O1xuICAgIHZhciB5MiA9IHkgKyB5O1xuICAgIHZhciB6MiA9IHogKyB6O1xuICAgIHZhciB4eCA9IHggKiB4MjtcbiAgICB2YXIgeHkgPSB4ICogeTI7XG4gICAgdmFyIHh6ID0geCAqIHoyO1xuICAgIHZhciB5eSA9IHkgKiB5MjtcbiAgICB2YXIgeXogPSB5ICogejI7XG4gICAgdmFyIHp6ID0geiAqIHoyO1xuICAgIHZhciB3eCA9IHcgKiB4MjtcbiAgICB2YXIgd3kgPSB3ICogeTI7XG4gICAgdmFyIHd6ID0gdyAqIHoyO1xuICAgIHZhciBzeCA9IHNbMF07XG4gICAgdmFyIHN5ID0gc1sxXTtcbiAgICB2YXIgc3ogPSBzWzJdO1xuICAgIHZhciBveCA9IG9bMF07XG4gICAgdmFyIG95ID0gb1sxXTtcbiAgICB2YXIgb3ogPSBvWzJdO1xuICAgIHZhciBvdXQwID0gKDEgLSAoeXkgKyB6eikpICogc3g7XG4gICAgdmFyIG91dDEgPSAoeHkgKyB3eikgKiBzeDtcbiAgICB2YXIgb3V0MiA9ICh4eiAtIHd5KSAqIHN4O1xuICAgIHZhciBvdXQ0ID0gKHh5IC0gd3opICogc3k7XG4gICAgdmFyIG91dDUgPSAoMSAtICh4eCArIHp6KSkgKiBzeTtcbiAgICB2YXIgb3V0NiA9ICh5eiArIHd4KSAqIHN5O1xuICAgIHZhciBvdXQ4ID0gKHh6ICsgd3kpICogc3o7XG4gICAgdmFyIG91dDkgPSAoeXogLSB3eCkgKiBzejtcbiAgICB2YXIgb3V0MTAgPSAoMSAtICh4eCArIHl5KSkgKiBzejtcbiAgICBvdXRbMF0gPSBvdXQwO1xuICAgIG91dFsxXSA9IG91dDE7XG4gICAgb3V0WzJdID0gb3V0MjtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IG91dDQ7XG4gICAgb3V0WzVdID0gb3V0NTtcbiAgICBvdXRbNl0gPSBvdXQ2O1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gb3V0ODtcbiAgICBvdXRbOV0gPSBvdXQ5O1xuICAgIG91dFsxMF0gPSBvdXQxMDtcbiAgICBvdXRbMTFdID0gMDtcbiAgICBvdXRbMTJdID0gdlswXSArIG94IC0gKG91dDAgKiBveCArIG91dDQgKiBveSArIG91dDggKiBveik7XG4gICAgb3V0WzEzXSA9IHZbMV0gKyBveSAtIChvdXQxICogb3ggKyBvdXQ1ICogb3kgKyBvdXQ5ICogb3opO1xuICAgIG91dFsxNF0gPSB2WzJdICsgb3ogLSAob3V0MiAqIG94ICsgb3V0NiAqIG95ICsgb3V0MTAgKiBveik7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyBhIDR4NCBtYXRyaXggZnJvbSB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIFF1YXRlcm5pb24gdG8gY3JlYXRlIG1hdHJpeCBmcm9tXG4gICAqXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLFxuICAgICAgICB5ID0gcVsxXSxcbiAgICAgICAgeiA9IHFbMl0sXG4gICAgICAgIHcgPSBxWzNdO1xuICAgIHZhciB4MiA9IHggKyB4O1xuICAgIHZhciB5MiA9IHkgKyB5O1xuICAgIHZhciB6MiA9IHogKyB6O1xuICAgIHZhciB4eCA9IHggKiB4MjtcbiAgICB2YXIgeXggPSB5ICogeDI7XG4gICAgdmFyIHl5ID0geSAqIHkyO1xuICAgIHZhciB6eCA9IHogKiB4MjtcbiAgICB2YXIgenkgPSB6ICogeTI7XG4gICAgdmFyIHp6ID0geiAqIHoyO1xuICAgIHZhciB3eCA9IHcgKiB4MjtcbiAgICB2YXIgd3kgPSB3ICogeTI7XG4gICAgdmFyIHd6ID0gdyAqIHoyO1xuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IHl4IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gICAgb3V0WzZdID0genkgKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IHp4ICsgd3k7XG4gICAgb3V0WzldID0genkgLSB3eDtcbiAgICBvdXRbMTBdID0gMSAtIHh4IC0geXk7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgZnJ1c3R1bSBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGxlZnQgTGVmdCBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge051bWJlcn0gcmlnaHQgUmlnaHQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IGJvdHRvbSBCb3R0b20gYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHRvcCBUb3AgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge051bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZydXN0dW0ob3V0LCBsZWZ0LCByaWdodCwgYm90dG9tLCB0b3AsIG5lYXIsIGZhcikge1xuICAgIHZhciBybCA9IDEgLyAocmlnaHQgLSBsZWZ0KTtcbiAgICB2YXIgdGIgPSAxIC8gKHRvcCAtIGJvdHRvbSk7XG4gICAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMF0gPSBuZWFyICogMiAqIHJsO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gbmVhciAqIDIgKiB0YjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gKHJpZ2h0ICsgbGVmdCkgKiBybDtcbiAgICBvdXRbOV0gPSAodG9wICsgYm90dG9tKSAqIHRiO1xuICAgIG91dFsxMF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IGZhciAqIG5lYXIgKiAyICogbmY7XG4gICAgb3V0WzE1XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICAgKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbLTEsIDFdLFxuICAgKiB3aGljaCBtYXRjaGVzIFdlYkdML09wZW5HTCdzIGNsaXAgdm9sdW1lLlxuICAgKiBQYXNzaW5nIG51bGwvdW5kZWZpbmVkL25vIHZhbHVlIGZvciBmYXIgd2lsbCBnZW5lcmF0ZSBpbmZpbml0ZSBwcm9qZWN0aW9uIG1hdHJpeC5cbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgKiBAcGFyYW0ge251bWJlcn0gZm92eSBWZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGluIHJhZGlhbnNcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFzcGVjdCBBc3BlY3QgcmF0aW8uIHR5cGljYWxseSB2aWV3cG9ydCB3aWR0aC9oZWlnaHRcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bSwgY2FuIGJlIG51bGwgb3IgSW5maW5pdHlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBwZXJzcGVjdGl2ZU5PKG91dCwgZm92eSwgYXNwZWN0LCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgZiA9IDEuMCAvIE1hdGgudGFuKGZvdnkgLyAyKTtcbiAgICBvdXRbMF0gPSBmIC8gYXNwZWN0O1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAwO1xuICAgIG91dFs0XSA9IDA7XG4gICAgb3V0WzVdID0gZjtcbiAgICBvdXRbNl0gPSAwO1xuICAgIG91dFs3XSA9IDA7XG4gICAgb3V0WzhdID0gMDtcbiAgICBvdXRbOV0gPSAwO1xuICAgIG91dFsxMV0gPSAtMTtcbiAgICBvdXRbMTJdID0gMDtcbiAgICBvdXRbMTNdID0gMDtcbiAgICBvdXRbMTVdID0gMDtcblxuICAgIGlmIChmYXIgIT0gbnVsbCAmJiBmYXIgIT09IEluZmluaXR5KSB7XG4gICAgICB2YXIgbmYgPSAxIC8gKG5lYXIgLSBmYXIpO1xuICAgICAgb3V0WzEwXSA9IChmYXIgKyBuZWFyKSAqIG5mO1xuICAgICAgb3V0WzE0XSA9IDIgKiBmYXIgKiBuZWFyICogbmY7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dFsxMF0gPSAtMTtcbiAgICAgIG91dFsxNF0gPSAtMiAqIG5lYXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBtYXQ0LnBlcnNwZWN0aXZlTk99XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgcGVyc3BlY3RpdmUgPSBwZXJzcGVjdGl2ZU5PO1xuICAvKipcbiAgICogR2VuZXJhdGVzIGEgcGVyc3BlY3RpdmUgcHJvamVjdGlvbiBtYXRyaXggc3VpdGFibGUgZm9yIFdlYkdQVSB3aXRoIHRoZSBnaXZlbiBib3VuZHMuXG4gICAqIFRoZSBuZWFyL2ZhciBjbGlwIHBsYW5lcyBjb3JyZXNwb25kIHRvIGEgbm9ybWFsaXplZCBkZXZpY2UgY29vcmRpbmF0ZSBaIHJhbmdlIG9mIFswLCAxXSxcbiAgICogd2hpY2ggbWF0Y2hlcyBXZWJHUFUvVnVsa2FuL0RpcmVjdFgvTWV0YWwncyBjbGlwIHZvbHVtZS5cbiAgICogUGFzc2luZyBudWxsL3VuZGVmaW5lZC9ubyB2YWx1ZSBmb3IgZmFyIHdpbGwgZ2VuZXJhdGUgaW5maW5pdGUgcHJvamVjdGlvbiBtYXRyaXguXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICogQHBhcmFtIHtudW1iZXJ9IGZvdnkgVmVydGljYWwgZmllbGQgb2YgdmlldyBpbiByYWRpYW5zXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhc3BlY3QgQXNwZWN0IHJhdGlvLiB0eXBpY2FsbHkgdmlld3BvcnQgd2lkdGgvaGVpZ2h0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW0sIGNhbiBiZSBudWxsIG9yIEluZmluaXR5XG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcGVyc3BlY3RpdmVaTyhvdXQsIGZvdnksIGFzcGVjdCwgbmVhciwgZmFyKSB7XG4gICAgdmFyIGYgPSAxLjAgLyBNYXRoLnRhbihmb3Z5IC8gMik7XG4gICAgb3V0WzBdID0gZiAvIGFzcGVjdDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IGY7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTFdID0gLTE7XG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE1XSA9IDA7XG5cbiAgICBpZiAoZmFyICE9IG51bGwgJiYgZmFyICE9PSBJbmZpbml0eSkge1xuICAgICAgdmFyIG5mID0gMSAvIChuZWFyIC0gZmFyKTtcbiAgICAgIG91dFsxMF0gPSBmYXIgKiBuZjtcbiAgICAgIG91dFsxNF0gPSBmYXIgKiBuZWFyICogbmY7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dFsxMF0gPSAtMTtcbiAgICAgIG91dFsxNF0gPSAtbmVhcjtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBwZXJzcGVjdGl2ZSBwcm9qZWN0aW9uIG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBmaWVsZCBvZiB2aWV3LlxuICAgKiBUaGlzIGlzIHByaW1hcmlseSB1c2VmdWwgZm9yIGdlbmVyYXRpbmcgcHJvamVjdGlvbiBtYXRyaWNlcyB0byBiZSB1c2VkXG4gICAqIHdpdGggdGhlIHN0aWxsIGV4cGVyaWVtZW50YWwgV2ViVlIgQVBJLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmb3YgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIGZvbGxvd2luZyB2YWx1ZXM6IHVwRGVncmVlcywgZG93bkRlZ3JlZXMsIGxlZnREZWdyZWVzLCByaWdodERlZ3JlZXNcbiAgICogQHBhcmFtIHtudW1iZXJ9IG5lYXIgTmVhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcGFyYW0ge251bWJlcn0gZmFyIEZhciBib3VuZCBvZiB0aGUgZnJ1c3R1bVxuICAgKiBAcmV0dXJucyB7bWF0NH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3KG91dCwgZm92LCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgdXBUYW4gPSBNYXRoLnRhbihmb3YudXBEZWdyZWVzICogTWF0aC5QSSAvIDE4MC4wKTtcbiAgICB2YXIgZG93blRhbiA9IE1hdGgudGFuKGZvdi5kb3duRGVncmVlcyAqIE1hdGguUEkgLyAxODAuMCk7XG4gICAgdmFyIGxlZnRUYW4gPSBNYXRoLnRhbihmb3YubGVmdERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICAgIHZhciByaWdodFRhbiA9IE1hdGgudGFuKGZvdi5yaWdodERlZ3JlZXMgKiBNYXRoLlBJIC8gMTgwLjApO1xuICAgIHZhciB4U2NhbGUgPSAyLjAgLyAobGVmdFRhbiArIHJpZ2h0VGFuKTtcbiAgICB2YXIgeVNjYWxlID0gMi4wIC8gKHVwVGFuICsgZG93blRhbik7XG4gICAgb3V0WzBdID0geFNjYWxlO1xuICAgIG91dFsxXSA9IDAuMDtcbiAgICBvdXRbMl0gPSAwLjA7XG4gICAgb3V0WzNdID0gMC4wO1xuICAgIG91dFs0XSA9IDAuMDtcbiAgICBvdXRbNV0gPSB5U2NhbGU7XG4gICAgb3V0WzZdID0gMC4wO1xuICAgIG91dFs3XSA9IDAuMDtcbiAgICBvdXRbOF0gPSAtKChsZWZ0VGFuIC0gcmlnaHRUYW4pICogeFNjYWxlICogMC41KTtcbiAgICBvdXRbOV0gPSAodXBUYW4gLSBkb3duVGFuKSAqIHlTY2FsZSAqIDAuNTtcbiAgICBvdXRbMTBdID0gZmFyIC8gKG5lYXIgLSBmYXIpO1xuICAgIG91dFsxMV0gPSAtMS4wO1xuICAgIG91dFsxMl0gPSAwLjA7XG4gICAgb3V0WzEzXSA9IDAuMDtcbiAgICBvdXRbMTRdID0gZmFyICogbmVhciAvIChuZWFyIC0gZmFyKTtcbiAgICBvdXRbMTVdID0gMC4wO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIG9ydGhvZ29uYWwgcHJvamVjdGlvbiBtYXRyaXggd2l0aCB0aGUgZ2l2ZW4gYm91bmRzLlxuICAgKiBUaGUgbmVhci9mYXIgY2xpcCBwbGFuZXMgY29ycmVzcG9uZCB0byBhIG5vcm1hbGl6ZWQgZGV2aWNlIGNvb3JkaW5hdGUgWiByYW5nZSBvZiBbLTEsIDFdLFxuICAgKiB3aGljaCBtYXRjaGVzIFdlYkdML09wZW5HTCdzIGNsaXAgdm9sdW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBvcnRob05PKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgbHIgPSAxIC8gKGxlZnQgLSByaWdodCk7XG4gICAgdmFyIGJ0ID0gMSAvIChib3R0b20gLSB0b3ApO1xuICAgIHZhciBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gLTIgKiBscjtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IC0yICogYnQ7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gMiAqIG5mO1xuICAgIG91dFsxMV0gPSAwO1xuICAgIG91dFsxMl0gPSAobGVmdCArIHJpZ2h0KSAqIGxyO1xuICAgIG91dFsxM10gPSAodG9wICsgYm90dG9tKSAqIGJ0O1xuICAgIG91dFsxNF0gPSAoZmFyICsgbmVhcikgKiBuZjtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQub3J0aG9OT31cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBvcnRobyA9IG9ydGhvTk87XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBvcnRob2dvbmFsIHByb2plY3Rpb24gbWF0cml4IHdpdGggdGhlIGdpdmVuIGJvdW5kcy5cbiAgICogVGhlIG5lYXIvZmFyIGNsaXAgcGxhbmVzIGNvcnJlc3BvbmQgdG8gYSBub3JtYWxpemVkIGRldmljZSBjb29yZGluYXRlIFogcmFuZ2Ugb2YgWzAsIDFdLFxuICAgKiB3aGljaCBtYXRjaGVzIFdlYkdQVS9WdWxrYW4vRGlyZWN0WC9NZXRhbCdzIGNsaXAgdm9sdW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IGZydXN0dW0gbWF0cml4IHdpbGwgYmUgd3JpdHRlbiBpbnRvXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZWZ0IExlZnQgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IHJpZ2h0IFJpZ2h0IGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBib3R0b20gQm90dG9tIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0b3AgVG9wIGJvdW5kIG9mIHRoZSBmcnVzdHVtXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBuZWFyIE5lYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHBhcmFtIHtudW1iZXJ9IGZhciBGYXIgYm91bmQgb2YgdGhlIGZydXN0dW1cbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBvcnRob1pPKG91dCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcbiAgICB2YXIgbHIgPSAxIC8gKGxlZnQgLSByaWdodCk7XG4gICAgdmFyIGJ0ID0gMSAvIChib3R0b20gLSB0b3ApO1xuICAgIHZhciBuZiA9IDEgLyAobmVhciAtIGZhcik7XG4gICAgb3V0WzBdID0gLTIgKiBscjtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMDtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IC0yICogYnQ7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIG91dFs4XSA9IDA7XG4gICAgb3V0WzldID0gMDtcbiAgICBvdXRbMTBdID0gbmY7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IChsZWZ0ICsgcmlnaHQpICogbHI7XG4gICAgb3V0WzEzXSA9ICh0b3AgKyBib3R0b20pICogYnQ7XG4gICAgb3V0WzE0XSA9IG5lYXIgKiBuZjtcbiAgICBvdXRbMTVdID0gMTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBsb29rLWF0IG1hdHJpeCB3aXRoIHRoZSBnaXZlbiBleWUgcG9zaXRpb24sIGZvY2FsIHBvaW50LCBhbmQgdXAgYXhpcy5cbiAgICogSWYgeW91IHdhbnQgYSBtYXRyaXggdGhhdCBhY3R1YWxseSBtYWtlcyBhbiBvYmplY3QgbG9vayBhdCBhbm90aGVyIG9iamVjdCwgeW91IHNob3VsZCB1c2UgdGFyZ2V0VG8gaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgbWF0NCBmcnVzdHVtIG1hdHJpeCB3aWxsIGJlIHdyaXR0ZW4gaW50b1xuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZXllIFBvc2l0aW9uIG9mIHRoZSB2aWV3ZXJcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGNlbnRlciBQb2ludCB0aGUgdmlld2VyIGlzIGxvb2tpbmcgYXRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHVwIHZlYzMgcG9pbnRpbmcgdXBcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBsb29rQXQob3V0LCBleWUsIGNlbnRlciwgdXApIHtcbiAgICB2YXIgeDAsIHgxLCB4MiwgeTAsIHkxLCB5MiwgejAsIHoxLCB6MiwgbGVuO1xuICAgIHZhciBleWV4ID0gZXllWzBdO1xuICAgIHZhciBleWV5ID0gZXllWzFdO1xuICAgIHZhciBleWV6ID0gZXllWzJdO1xuICAgIHZhciB1cHggPSB1cFswXTtcbiAgICB2YXIgdXB5ID0gdXBbMV07XG4gICAgdmFyIHVweiA9IHVwWzJdO1xuICAgIHZhciBjZW50ZXJ4ID0gY2VudGVyWzBdO1xuICAgIHZhciBjZW50ZXJ5ID0gY2VudGVyWzFdO1xuICAgIHZhciBjZW50ZXJ6ID0gY2VudGVyWzJdO1xuXG4gICAgaWYgKE1hdGguYWJzKGV5ZXggLSBjZW50ZXJ4KSA8IEVQU0lMT04gJiYgTWF0aC5hYnMoZXlleSAtIGNlbnRlcnkpIDwgRVBTSUxPTiAmJiBNYXRoLmFicyhleWV6IC0gY2VudGVyeikgPCBFUFNJTE9OKSB7XG4gICAgICByZXR1cm4gaWRlbnRpdHkkMihvdXQpO1xuICAgIH1cblxuICAgIHowID0gZXlleCAtIGNlbnRlcng7XG4gICAgejEgPSBleWV5IC0gY2VudGVyeTtcbiAgICB6MiA9IGV5ZXogLSBjZW50ZXJ6O1xuICAgIGxlbiA9IDEgLyBNYXRoLmh5cG90KHowLCB6MSwgejIpO1xuICAgIHowICo9IGxlbjtcbiAgICB6MSAqPSBsZW47XG4gICAgejIgKj0gbGVuO1xuICAgIHgwID0gdXB5ICogejIgLSB1cHogKiB6MTtcbiAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejI7XG4gICAgeDIgPSB1cHggKiB6MSAtIHVweSAqIHowO1xuICAgIGxlbiA9IE1hdGguaHlwb3QoeDAsIHgxLCB4Mik7XG5cbiAgICBpZiAoIWxlbikge1xuICAgICAgeDAgPSAwO1xuICAgICAgeDEgPSAwO1xuICAgICAgeDIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgeDAgKj0gbGVuO1xuICAgICAgeDEgKj0gbGVuO1xuICAgICAgeDIgKj0gbGVuO1xuICAgIH1cblxuICAgIHkwID0gejEgKiB4MiAtIHoyICogeDE7XG4gICAgeTEgPSB6MiAqIHgwIC0gejAgKiB4MjtcbiAgICB5MiA9IHowICogeDEgLSB6MSAqIHgwO1xuICAgIGxlbiA9IE1hdGguaHlwb3QoeTAsIHkxLCB5Mik7XG5cbiAgICBpZiAoIWxlbikge1xuICAgICAgeTAgPSAwO1xuICAgICAgeTEgPSAwO1xuICAgICAgeTIgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZW4gPSAxIC8gbGVuO1xuICAgICAgeTAgKj0gbGVuO1xuICAgICAgeTEgKj0gbGVuO1xuICAgICAgeTIgKj0gbGVuO1xuICAgIH1cblxuICAgIG91dFswXSA9IHgwO1xuICAgIG91dFsxXSA9IHkwO1xuICAgIG91dFsyXSA9IHowO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0geDE7XG4gICAgb3V0WzVdID0geTE7XG4gICAgb3V0WzZdID0gejE7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB4MjtcbiAgICBvdXRbOV0gPSB5MjtcbiAgICBvdXRbMTBdID0gejI7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IC0oeDAgKiBleWV4ICsgeDEgKiBleWV5ICsgeDIgKiBleWV6KTtcbiAgICBvdXRbMTNdID0gLSh5MCAqIGV5ZXggKyB5MSAqIGV5ZXkgKyB5MiAqIGV5ZXopO1xuICAgIG91dFsxNF0gPSAtKHowICogZXlleCArIHoxICogZXlleSArIHoyICogZXlleik7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgbWF0cml4IHRoYXQgbWFrZXMgc29tZXRoaW5nIGxvb2sgYXQgc29tZXRoaW5nIGVsc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgZnJ1c3R1bSBtYXRyaXggd2lsbCBiZSB3cml0dGVuIGludG9cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGV5ZSBQb3NpdGlvbiBvZiB0aGUgdmlld2VyXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjZW50ZXIgUG9pbnQgdGhlIHZpZXdlciBpcyBsb29raW5nIGF0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB1cCB2ZWMzIHBvaW50aW5nIHVwXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdGFyZ2V0VG8ob3V0LCBleWUsIHRhcmdldCwgdXApIHtcbiAgICB2YXIgZXlleCA9IGV5ZVswXSxcbiAgICAgICAgZXlleSA9IGV5ZVsxXSxcbiAgICAgICAgZXlleiA9IGV5ZVsyXSxcbiAgICAgICAgdXB4ID0gdXBbMF0sXG4gICAgICAgIHVweSA9IHVwWzFdLFxuICAgICAgICB1cHogPSB1cFsyXTtcbiAgICB2YXIgejAgPSBleWV4IC0gdGFyZ2V0WzBdLFxuICAgICAgICB6MSA9IGV5ZXkgLSB0YXJnZXRbMV0sXG4gICAgICAgIHoyID0gZXlleiAtIHRhcmdldFsyXTtcbiAgICB2YXIgbGVuID0gejAgKiB6MCArIHoxICogejEgKyB6MiAqIHoyO1xuXG4gICAgaWYgKGxlbiA+IDApIHtcbiAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICAgIHowICo9IGxlbjtcbiAgICAgIHoxICo9IGxlbjtcbiAgICAgIHoyICo9IGxlbjtcbiAgICB9XG5cbiAgICB2YXIgeDAgPSB1cHkgKiB6MiAtIHVweiAqIHoxLFxuICAgICAgICB4MSA9IHVweiAqIHowIC0gdXB4ICogejIsXG4gICAgICAgIHgyID0gdXB4ICogejEgLSB1cHkgKiB6MDtcbiAgICBsZW4gPSB4MCAqIHgwICsgeDEgKiB4MSArIHgyICogeDI7XG5cbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgbGVuID0gMSAvIE1hdGguc3FydChsZW4pO1xuICAgICAgeDAgKj0gbGVuO1xuICAgICAgeDEgKj0gbGVuO1xuICAgICAgeDIgKj0gbGVuO1xuICAgIH1cblxuICAgIG91dFswXSA9IHgwO1xuICAgIG91dFsxXSA9IHgxO1xuICAgIG91dFsyXSA9IHgyO1xuICAgIG91dFszXSA9IDA7XG4gICAgb3V0WzRdID0gejEgKiB4MiAtIHoyICogeDE7XG4gICAgb3V0WzVdID0gejIgKiB4MCAtIHowICogeDI7XG4gICAgb3V0WzZdID0gejAgKiB4MSAtIHoxICogeDA7XG4gICAgb3V0WzddID0gMDtcbiAgICBvdXRbOF0gPSB6MDtcbiAgICBvdXRbOV0gPSB6MTtcbiAgICBvdXRbMTBdID0gejI7XG4gICAgb3V0WzExXSA9IDA7XG4gICAgb3V0WzEyXSA9IGV5ZXg7XG4gICAgb3V0WzEzXSA9IGV5ZXk7XG4gICAgb3V0WzE0XSA9IGV5ZXo7XG4gICAgb3V0WzE1XSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIG1hdDRcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgbWF0cml4IHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICAgKi9cblxuICBmdW5jdGlvbiBzdHIkNShhKSB7XG4gICAgcmV0dXJuIFwibWF0NChcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIiwgXCIgKyBhWzRdICsgXCIsIFwiICsgYVs1XSArIFwiLCBcIiArIGFbNl0gKyBcIiwgXCIgKyBhWzddICsgXCIsIFwiICsgYVs4XSArIFwiLCBcIiArIGFbOV0gKyBcIiwgXCIgKyBhWzEwXSArIFwiLCBcIiArIGFbMTFdICsgXCIsIFwiICsgYVsxMl0gKyBcIiwgXCIgKyBhWzEzXSArIFwiLCBcIiArIGFbMTRdICsgXCIsIFwiICsgYVsxNV0gKyBcIilcIjtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBGcm9iZW5pdXMgbm9ybSBvZiBhIG1hdDRcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIG1hdHJpeCB0byBjYWxjdWxhdGUgRnJvYmVuaXVzIG5vcm0gb2ZcbiAgICogQHJldHVybnMge051bWJlcn0gRnJvYmVuaXVzIG5vcm1cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvYihhKSB7XG4gICAgcmV0dXJuIE1hdGguaHlwb3QoYVswXSwgYVsxXSwgYVsyXSwgYVszXSwgYVs0XSwgYVs1XSwgYVs2XSwgYVs3XSwgYVs4XSwgYVs5XSwgYVsxMF0sIGFbMTFdLCBhWzEyXSwgYVsxM10sIGFbMTRdLCBhWzE1XSk7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIG1hdDQnc1xuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBhZGQkNShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICBvdXRbNF0gPSBhWzRdICsgYls0XTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XTtcbiAgICBvdXRbNl0gPSBhWzZdICsgYls2XTtcbiAgICBvdXRbN10gPSBhWzddICsgYls3XTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XTtcbiAgICBvdXRbOV0gPSBhWzldICsgYls5XTtcbiAgICBvdXRbMTBdID0gYVsxMF0gKyBiWzEwXTtcbiAgICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXTtcbiAgICBvdXRbMTJdID0gYVsxMl0gKyBiWzEyXTtcbiAgICBvdXRbMTNdID0gYVsxM10gKyBiWzEzXTtcbiAgICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XTtcbiAgICBvdXRbMTVdID0gYVsxNV0gKyBiWzE1XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgbWF0cml4IGIgZnJvbSBtYXRyaXggYVxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzdWJ0cmFjdCQzKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gLSBiWzRdO1xuICAgIG91dFs1XSA9IGFbNV0gLSBiWzVdO1xuICAgIG91dFs2XSA9IGFbNl0gLSBiWzZdO1xuICAgIG91dFs3XSA9IGFbN10gLSBiWzddO1xuICAgIG91dFs4XSA9IGFbOF0gLSBiWzhdO1xuICAgIG91dFs5XSA9IGFbOV0gLSBiWzldO1xuICAgIG91dFsxMF0gPSBhWzEwXSAtIGJbMTBdO1xuICAgIG91dFsxMV0gPSBhWzExXSAtIGJbMTFdO1xuICAgIG91dFsxMl0gPSBhWzEyXSAtIGJbMTJdO1xuICAgIG91dFsxM10gPSBhWzEzXSAtIGJbMTNdO1xuICAgIG91dFsxNF0gPSBhWzE0XSAtIGJbMTRdO1xuICAgIG91dFsxNV0gPSBhWzE1XSAtIGJbMTVdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGx5IGVhY2ggZWxlbWVudCBvZiB0aGUgbWF0cml4IGJ5IGEgc2NhbGFyLlxuICAgKlxuICAgKiBAcGFyYW0ge21hdDR9IG91dCB0aGUgcmVjZWl2aW5nIG1hdHJpeFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSB0aGUgbWF0cml4IHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgbWF0cml4J3MgZWxlbWVudHMgYnlcbiAgICogQHJldHVybnMge21hdDR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseVNjYWxhcihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICBvdXRbM10gPSBhWzNdICogYjtcbiAgICBvdXRbNF0gPSBhWzRdICogYjtcbiAgICBvdXRbNV0gPSBhWzVdICogYjtcbiAgICBvdXRbNl0gPSBhWzZdICogYjtcbiAgICBvdXRbN10gPSBhWzddICogYjtcbiAgICBvdXRbOF0gPSBhWzhdICogYjtcbiAgICBvdXRbOV0gPSBhWzldICogYjtcbiAgICBvdXRbMTBdID0gYVsxMF0gKiBiO1xuICAgIG91dFsxMV0gPSBhWzExXSAqIGI7XG4gICAgb3V0WzEyXSA9IGFbMTJdICogYjtcbiAgICBvdXRbMTNdID0gYVsxM10gKiBiO1xuICAgIG91dFsxNF0gPSBhWzE0XSAqIGI7XG4gICAgb3V0WzE1XSA9IGFbMTVdICogYjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIHR3byBtYXQ0J3MgYWZ0ZXIgbXVsdGlwbHlpbmcgZWFjaCBlbGVtZW50IG9mIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHttYXQ0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIncyBlbGVtZW50cyBieSBiZWZvcmUgYWRkaW5nXG4gICAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHlTY2FsYXJBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICAgIG91dFszXSA9IGFbM10gKyBiWzNdICogc2NhbGU7XG4gICAgb3V0WzRdID0gYVs0XSArIGJbNF0gKiBzY2FsZTtcbiAgICBvdXRbNV0gPSBhWzVdICsgYls1XSAqIHNjYWxlO1xuICAgIG91dFs2XSA9IGFbNl0gKyBiWzZdICogc2NhbGU7XG4gICAgb3V0WzddID0gYVs3XSArIGJbN10gKiBzY2FsZTtcbiAgICBvdXRbOF0gPSBhWzhdICsgYls4XSAqIHNjYWxlO1xuICAgIG91dFs5XSA9IGFbOV0gKyBiWzldICogc2NhbGU7XG4gICAgb3V0WzEwXSA9IGFbMTBdICsgYlsxMF0gKiBzY2FsZTtcbiAgICBvdXRbMTFdID0gYVsxMV0gKyBiWzExXSAqIHNjYWxlO1xuICAgIG91dFsxMl0gPSBhWzEyXSArIGJbMTJdICogc2NhbGU7XG4gICAgb3V0WzEzXSA9IGFbMTNdICsgYlsxM10gKiBzY2FsZTtcbiAgICBvdXRbMTRdID0gYVsxNF0gKyBiWzE0XSAqIHNjYWxlO1xuICAgIG91dFsxNV0gPSBhWzE1XSArIGJbMTVdICogc2NhbGU7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBUaGUgZmlyc3QgbWF0cml4LlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBleGFjdEVxdWFscyQ1KGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXSAmJiBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddICYmIGFbOF0gPT09IGJbOF0gJiYgYVs5XSA9PT0gYls5XSAmJiBhWzEwXSA9PT0gYlsxMF0gJiYgYVsxMV0gPT09IGJbMTFdICYmIGFbMTJdID09PSBiWzEyXSAmJiBhWzEzXSA9PT0gYlsxM10gJiYgYVsxNF0gPT09IGJbMTRdICYmIGFbMTVdID09PSBiWzE1XTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgbWF0cmljZXMgaGF2ZSBhcHByb3hpbWF0ZWx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYSBUaGUgZmlyc3QgbWF0cml4LlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0NH0gYiBUaGUgc2Vjb25kIG1hdHJpeC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIG1hdHJpY2VzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBlcXVhbHMkNShhLCBiKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl0sXG4gICAgICAgIGEzID0gYVszXTtcbiAgICB2YXIgYTQgPSBhWzRdLFxuICAgICAgICBhNSA9IGFbNV0sXG4gICAgICAgIGE2ID0gYVs2XSxcbiAgICAgICAgYTcgPSBhWzddO1xuICAgIHZhciBhOCA9IGFbOF0sXG4gICAgICAgIGE5ID0gYVs5XSxcbiAgICAgICAgYTEwID0gYVsxMF0sXG4gICAgICAgIGExMSA9IGFbMTFdO1xuICAgIHZhciBhMTIgPSBhWzEyXSxcbiAgICAgICAgYTEzID0gYVsxM10sXG4gICAgICAgIGExNCA9IGFbMTRdLFxuICAgICAgICBhMTUgPSBhWzE1XTtcbiAgICB2YXIgYjAgPSBiWzBdLFxuICAgICAgICBiMSA9IGJbMV0sXG4gICAgICAgIGIyID0gYlsyXSxcbiAgICAgICAgYjMgPSBiWzNdO1xuICAgIHZhciBiNCA9IGJbNF0sXG4gICAgICAgIGI1ID0gYls1XSxcbiAgICAgICAgYjYgPSBiWzZdLFxuICAgICAgICBiNyA9IGJbN107XG4gICAgdmFyIGI4ID0gYls4XSxcbiAgICAgICAgYjkgPSBiWzldLFxuICAgICAgICBiMTAgPSBiWzEwXSxcbiAgICAgICAgYjExID0gYlsxMV07XG4gICAgdmFyIGIxMiA9IGJbMTJdLFxuICAgICAgICBiMTMgPSBiWzEzXSxcbiAgICAgICAgYjE0ID0gYlsxNF0sXG4gICAgICAgIGIxNSA9IGJbMTVdO1xuICAgIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJiBNYXRoLmFicyhhMyAtIGIzKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkgJiYgTWF0aC5hYnMoYTQgLSBiNCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTQpLCBNYXRoLmFicyhiNCkpICYmIE1hdGguYWJzKGE1IC0gYjUpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJiBNYXRoLmFicyhhNiAtIGI2KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNiksIE1hdGguYWJzKGI2KSkgJiYgTWF0aC5hYnMoYTcgLSBiNykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTcpLCBNYXRoLmFicyhiNykpICYmIE1hdGguYWJzKGE4IC0gYjgpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE4KSwgTWF0aC5hYnMoYjgpKSAmJiBNYXRoLmFicyhhOSAtIGI5KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhOSksIE1hdGguYWJzKGI5KSkgJiYgTWF0aC5hYnMoYTEwIC0gYjEwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTApLCBNYXRoLmFicyhiMTApKSAmJiBNYXRoLmFicyhhMTEgLSBiMTEpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExMSksIE1hdGguYWJzKGIxMSkpICYmIE1hdGguYWJzKGExMiAtIGIxMikgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEyKSwgTWF0aC5hYnMoYjEyKSkgJiYgTWF0aC5hYnMoYTEzIC0gYjEzKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMTMpLCBNYXRoLmFicyhiMTMpKSAmJiBNYXRoLmFicyhhMTQgLSBiMTQpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExNCksIE1hdGguYWJzKGIxNCkpICYmIE1hdGguYWJzKGExNSAtIGIxNSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTE1KSwgTWF0aC5hYnMoYjE1KSk7XG4gIH1cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgbWF0NC5tdWx0aXBseX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBtdWwkNSA9IG11bHRpcGx5JDU7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIG1hdDQuc3VidHJhY3R9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3ViJDMgPSBzdWJ0cmFjdCQzO1xuXG4gIHZhciBtYXQ0ID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBjcmVhdGU6IGNyZWF0ZSQ1LFxuICAgIGNsb25lOiBjbG9uZSQ1LFxuICAgIGNvcHk6IGNvcHkkNSxcbiAgICBmcm9tVmFsdWVzOiBmcm9tVmFsdWVzJDUsXG4gICAgc2V0OiBzZXQkNSxcbiAgICBpZGVudGl0eTogaWRlbnRpdHkkMixcbiAgICB0cmFuc3Bvc2U6IHRyYW5zcG9zZSxcbiAgICBpbnZlcnQ6IGludmVydCQyLFxuICAgIGFkam9pbnQ6IGFkam9pbnQsXG4gICAgZGV0ZXJtaW5hbnQ6IGRldGVybWluYW50LFxuICAgIG11bHRpcGx5OiBtdWx0aXBseSQ1LFxuICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlJDEsXG4gICAgc2NhbGU6IHNjYWxlJDUsXG4gICAgcm90YXRlOiByb3RhdGUkMSxcbiAgICByb3RhdGVYOiByb3RhdGVYJDMsXG4gICAgcm90YXRlWTogcm90YXRlWSQzLFxuICAgIHJvdGF0ZVo6IHJvdGF0ZVokMyxcbiAgICBmcm9tVHJhbnNsYXRpb246IGZyb21UcmFuc2xhdGlvbiQxLFxuICAgIGZyb21TY2FsaW5nOiBmcm9tU2NhbGluZyxcbiAgICBmcm9tUm90YXRpb246IGZyb21Sb3RhdGlvbiQxLFxuICAgIGZyb21YUm90YXRpb246IGZyb21YUm90YXRpb24sXG4gICAgZnJvbVlSb3RhdGlvbjogZnJvbVlSb3RhdGlvbixcbiAgICBmcm9tWlJvdGF0aW9uOiBmcm9tWlJvdGF0aW9uLFxuICAgIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uOiBmcm9tUm90YXRpb25UcmFuc2xhdGlvbiQxLFxuICAgIGZyb21RdWF0MjogZnJvbVF1YXQyLFxuICAgIGdldFRyYW5zbGF0aW9uOiBnZXRUcmFuc2xhdGlvbiQxLFxuICAgIGdldFNjYWxpbmc6IGdldFNjYWxpbmcsXG4gICAgZ2V0Um90YXRpb246IGdldFJvdGF0aW9uLFxuICAgIGRlY29tcG9zZTogZGVjb21wb3NlLFxuICAgIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGU6IGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGUsXG4gICAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbjogZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbixcbiAgICBmcm9tUXVhdDogZnJvbVF1YXQsXG4gICAgZnJ1c3R1bTogZnJ1c3R1bSxcbiAgICBwZXJzcGVjdGl2ZU5POiBwZXJzcGVjdGl2ZU5PLFxuICAgIHBlcnNwZWN0aXZlOiBwZXJzcGVjdGl2ZSxcbiAgICBwZXJzcGVjdGl2ZVpPOiBwZXJzcGVjdGl2ZVpPLFxuICAgIHBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3OiBwZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldyxcbiAgICBvcnRob05POiBvcnRob05PLFxuICAgIG9ydGhvOiBvcnRobyxcbiAgICBvcnRob1pPOiBvcnRob1pPLFxuICAgIGxvb2tBdDogbG9va0F0LFxuICAgIHRhcmdldFRvOiB0YXJnZXRUbyxcbiAgICBzdHI6IHN0ciQ1LFxuICAgIGZyb2I6IGZyb2IsXG4gICAgYWRkOiBhZGQkNSxcbiAgICBzdWJ0cmFjdDogc3VidHJhY3QkMyxcbiAgICBtdWx0aXBseVNjYWxhcjogbXVsdGlwbHlTY2FsYXIsXG4gICAgbXVsdGlwbHlTY2FsYXJBbmRBZGQ6IG11bHRpcGx5U2NhbGFyQW5kQWRkLFxuICAgIGV4YWN0RXF1YWxzOiBleGFjdEVxdWFscyQ1LFxuICAgIGVxdWFsczogZXF1YWxzJDUsXG4gICAgbXVsOiBtdWwkNSxcbiAgICBzdWI6IHN1YiQzXG4gIH0pO1xuXG4gIC8qKlxuICAgKiAzIERpbWVuc2lvbmFsIFZlY3RvclxuICAgKiBAbW9kdWxlIHZlYzNcbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzNcbiAgICpcbiAgICogQHJldHVybnMge3ZlYzN9IGEgbmV3IDNEIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGUkNCgpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMyk7XG5cbiAgICBpZiAoQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICAgIG91dFswXSA9IDA7XG4gICAgICBvdXRbMV0gPSAwO1xuICAgICAgb3V0WzJdID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB2YWx1ZXMgZnJvbSBhbiBleGlzdGluZyB2ZWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNsb25lXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gY2xvbmUkNChhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDMpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICBvdXRbMl0gPSBhWzJdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiBhIHZlYzNcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBsZW5ndGggb2ZcbiAgICogQHJldHVybnMge051bWJlcn0gbGVuZ3RoIG9mIGFcbiAgICovXG5cbiAgZnVuY3Rpb24gbGVuZ3RoJDQoYSkge1xuICAgIHZhciB4ID0gYVswXTtcbiAgICB2YXIgeSA9IGFbMV07XG4gICAgdmFyIHogPSBhWzJdO1xuICAgIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHopO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHZlYzMgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHt2ZWMzfSBhIG5ldyAzRCB2ZWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVZhbHVlcyQ0KHgsIHksIHopIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMyk7XG4gICAgb3V0WzBdID0geDtcbiAgICBvdXRbMV0gPSB5O1xuICAgIG91dFsyXSA9IHo7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHZlYzMgdG8gYW5vdGhlclxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgc291cmNlIHZlY3RvclxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvcHkkNChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzZXQkNChvdXQsIHgsIHksIHopIHtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkJDQob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU3VidHJhY3RzIHZlY3RvciBiIGZyb20gdmVjdG9yIGFcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc3VidHJhY3QkMihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC0gYlsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNdWx0aXBsaWVzIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbXVsdGlwbHkkNChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICogYlsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBEaXZpZGVzIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZGl2aWRlJDIob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAvIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSAvIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSAvIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTWF0aC5jZWlsIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gY2VpbFxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNlaWwkMihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBNYXRoLmNlaWwoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5jZWlsKGFbMV0pO1xuICAgIG91dFsyXSA9IE1hdGguY2VpbChhWzJdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gZmxvb3JcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmbG9vciQyKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGguZmxvb3IoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5mbG9vcihhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLmZsb29yKGFbMl0pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzMnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtaW4kMihvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1pbihhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbihhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1pbihhWzJdLCBiWzJdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBtYXhpbXVtIG9mIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbWF4JDIob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgoYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5tYXgoYVsxXSwgYlsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5tYXgoYVsyXSwgYlsyXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTWF0aC5yb3VuZCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzNcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIHJvdW5kXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm91bmQkMihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBNYXRoLnJvdW5kKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgucm91bmQoYVsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5yb3VuZChhWzJdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTY2FsZXMgYSB2ZWMzIGJ5IGEgc2NhbGFyIG51bWJlclxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB0aGUgdmVjdG9yIHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgdmVjdG9yIGJ5XG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2NhbGUkNChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYjtcbiAgICBvdXRbMV0gPSBhWzFdICogYjtcbiAgICBvdXRbMl0gPSBhWzJdICogYjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIHR3byB2ZWMzJ3MgYWZ0ZXIgc2NhbGluZyB0aGUgc2Vjb25kIG9wZXJhbmQgYnkgYSBzY2FsYXIgdmFsdWVcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSB0aGUgYW1vdW50IHRvIHNjYWxlIGIgYnkgYmVmb3JlIGFkZGluZ1xuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNjYWxlQW5kQWRkJDIob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXSAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICAgKi9cblxuICBmdW5jdGlvbiBkaXN0YW5jZSQyKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICAgIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gICAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5LCB6KTtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMydzXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICAgKi9cblxuICBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UkMihhLCBiKSB7XG4gICAgdmFyIHggPSBiWzBdIC0gYVswXTtcbiAgICB2YXIgeSA9IGJbMV0gLSBhWzFdO1xuICAgIHZhciB6ID0gYlsyXSAtIGFbMl07XG4gICAgcmV0dXJuIHggKiB4ICsgeSAqIHkgKyB6ICogejtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgYSB2ZWMzXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBjYWxjdWxhdGUgc3F1YXJlZCBsZW5ndGggb2ZcbiAgICogQHJldHVybnMge051bWJlcn0gc3F1YXJlZCBsZW5ndGggb2YgYVxuICAgKi9cblxuICBmdW5jdGlvbiBzcXVhcmVkTGVuZ3RoJDQoYSkge1xuICAgIHZhciB4ID0gYVswXTtcbiAgICB2YXIgeSA9IGFbMV07XG4gICAgdmFyIHogPSBhWzJdO1xuICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG4gIH1cbiAgLyoqXG4gICAqIE5lZ2F0ZXMgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHZlY3RvciB0byBuZWdhdGVcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBuZWdhdGUkMihvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICBvdXRbMl0gPSAtYVsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjM1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaW52ZXJzZSQyKG91dCwgYSkge1xuICAgIG91dFswXSA9IDEuMCAvIGFbMF07XG4gICAgb3V0WzFdID0gMS4wIC8gYVsxXTtcbiAgICBvdXRbMl0gPSAxLjAgLyBhWzJdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIHZlYzNcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdmVjdG9yIHRvIG5vcm1hbGl6ZVxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZSQ0KG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXTtcbiAgICB2YXIgeSA9IGFbMV07XG4gICAgdmFyIHogPSBhWzJdO1xuICAgIHZhciBsZW4gPSB4ICogeCArIHkgKiB5ICsgeiAqIHo7XG5cbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgb3V0WzJdID0gYVsyXSAqIGxlbjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGRvdCQ0KGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSAqIGJbMF0gKyBhWzFdICogYlsxXSArIGFbMl0gKiBiWzJdO1xuICB9XG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMydzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyb3NzJDIob3V0LCBhLCBiKSB7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl07XG4gICAgdmFyIGJ4ID0gYlswXSxcbiAgICAgICAgYnkgPSBiWzFdLFxuICAgICAgICBieiA9IGJbMl07XG4gICAgb3V0WzBdID0gYXkgKiBieiAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXogKiBieCAtIGF4ICogYno7XG4gICAgb3V0WzJdID0gYXggKiBieSAtIGF5ICogYng7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUGVyZm9ybXMgYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byB2ZWMzJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBsZXJwJDQob3V0LCBhLCBiLCB0KSB7XG4gICAgdmFyIGF4ID0gYVswXTtcbiAgICB2YXIgYXkgPSBhWzFdO1xuICAgIHZhciBheiA9IGFbMl07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgb3V0WzJdID0gYXogKyB0ICogKGJbMl0gLSBheik7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUGVyZm9ybXMgYSBzcGhlcmljYWwgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMydzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2xlcnAkMShvdXQsIGEsIGIsIHQpIHtcbiAgICB2YXIgYW5nbGUgPSBNYXRoLmFjb3MoTWF0aC5taW4oTWF0aC5tYXgoZG90JDQoYSwgYiksIC0xKSwgMSkpO1xuICAgIHZhciBzaW5Ub3RhbCA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICB2YXIgcmF0aW9BID0gTWF0aC5zaW4oKDEgLSB0KSAqIGFuZ2xlKSAvIHNpblRvdGFsO1xuICAgIHZhciByYXRpb0IgPSBNYXRoLnNpbih0ICogYW5nbGUpIC8gc2luVG90YWw7XG4gICAgb3V0WzBdID0gcmF0aW9BICogYVswXSArIHJhdGlvQiAqIGJbMF07XG4gICAgb3V0WzFdID0gcmF0aW9BICogYVsxXSArIHJhdGlvQiAqIGJbMV07XG4gICAgb3V0WzJdID0gcmF0aW9BICogYVsyXSArIHJhdGlvQiAqIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUGVyZm9ybXMgYSBoZXJtaXRlIGludGVycG9sYXRpb24gd2l0aCB0d28gY29udHJvbCBwb2ludHNcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBjIHRoZSB0aGlyZCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBkIHRoZSBmb3VydGggb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaGVybWl0ZShvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgICB2YXIgZmFjdG9yVGltZXMyID0gdCAqIHQ7XG4gICAgdmFyIGZhY3RvcjEgPSBmYWN0b3JUaW1lczIgKiAoMiAqIHQgLSAzKSArIDE7XG4gICAgdmFyIGZhY3RvcjIgPSBmYWN0b3JUaW1lczIgKiAodCAtIDIpICsgdDtcbiAgICB2YXIgZmFjdG9yMyA9IGZhY3RvclRpbWVzMiAqICh0IC0gMSk7XG4gICAgdmFyIGZhY3RvcjQgPSBmYWN0b3JUaW1lczIgKiAoMyAtIDIgKiB0KTtcbiAgICBvdXRbMF0gPSBhWzBdICogZmFjdG9yMSArIGJbMF0gKiBmYWN0b3IyICsgY1swXSAqIGZhY3RvcjMgKyBkWzBdICogZmFjdG9yNDtcbiAgICBvdXRbMV0gPSBhWzFdICogZmFjdG9yMSArIGJbMV0gKiBmYWN0b3IyICsgY1sxXSAqIGZhY3RvcjMgKyBkWzFdICogZmFjdG9yNDtcbiAgICBvdXRbMl0gPSBhWzJdICogZmFjdG9yMSArIGJbMl0gKiBmYWN0b3IyICsgY1syXSAqIGZhY3RvcjMgKyBkWzJdICogZmFjdG9yNDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGJlemllciBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYyB0aGUgdGhpcmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gZCB0aGUgZm91cnRoIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGJlemllcihvdXQsIGEsIGIsIGMsIGQsIHQpIHtcbiAgICB2YXIgaW52ZXJzZUZhY3RvciA9IDEgLSB0O1xuICAgIHZhciBpbnZlcnNlRmFjdG9yVGltZXNUd28gPSBpbnZlcnNlRmFjdG9yICogaW52ZXJzZUZhY3RvcjtcbiAgICB2YXIgZmFjdG9yVGltZXMyID0gdCAqIHQ7XG4gICAgdmFyIGZhY3RvcjEgPSBpbnZlcnNlRmFjdG9yVGltZXNUd28gKiBpbnZlcnNlRmFjdG9yO1xuICAgIHZhciBmYWN0b3IyID0gMyAqIHQgKiBpbnZlcnNlRmFjdG9yVGltZXNUd287XG4gICAgdmFyIGZhY3RvcjMgPSAzICogZmFjdG9yVGltZXMyICogaW52ZXJzZUZhY3RvcjtcbiAgICB2YXIgZmFjdG9yNCA9IGZhY3RvclRpbWVzMiAqIHQ7XG4gICAgb3V0WzBdID0gYVswXSAqIGZhY3RvcjEgKyBiWzBdICogZmFjdG9yMiArIGNbMF0gKiBmYWN0b3IzICsgZFswXSAqIGZhY3RvcjQ7XG4gICAgb3V0WzFdID0gYVsxXSAqIGZhY3RvcjEgKyBiWzFdICogZmFjdG9yMiArIGNbMV0gKiBmYWN0b3IzICsgZFsxXSAqIGZhY3RvcjQ7XG4gICAgb3V0WzJdID0gYVsyXSAqIGZhY3RvcjEgKyBiWzJdICogZmFjdG9yMiArIGNbMl0gKiBmYWN0b3IzICsgZFsyXSAqIGZhY3RvcjQ7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJhbmRvbSQzKG91dCwgc2NhbGUpIHtcbiAgICBzY2FsZSA9IHNjYWxlID09PSB1bmRlZmluZWQgPyAxLjAgOiBzY2FsZTtcbiAgICB2YXIgciA9IFJBTkRPTSgpICogMi4wICogTWF0aC5QSTtcbiAgICB2YXIgeiA9IFJBTkRPTSgpICogMi4wIC0gMS4wO1xuICAgIHZhciB6U2NhbGUgPSBNYXRoLnNxcnQoMS4wIC0geiAqIHopICogc2NhbGU7XG4gICAgb3V0WzBdID0gTWF0aC5jb3MocikgKiB6U2NhbGU7XG4gICAgb3V0WzFdID0gTWF0aC5zaW4ocikgKiB6U2NhbGU7XG4gICAgb3V0WzJdID0geiAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDQuXG4gICAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQkMihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdLFxuICAgICAgICB6ID0gYVsyXTtcbiAgICB2YXIgdyA9IG1bM10gKiB4ICsgbVs3XSAqIHkgKyBtWzExXSAqIHogKyBtWzE1XTtcbiAgICB3ID0gdyB8fCAxLjA7XG4gICAgb3V0WzBdID0gKG1bMF0gKiB4ICsgbVs0XSAqIHkgKyBtWzhdICogeiArIG1bMTJdKSAvIHc7XG4gICAgb3V0WzFdID0gKG1bMV0gKiB4ICsgbVs1XSAqIHkgKyBtWzldICogeiArIG1bMTNdKSAvIHc7XG4gICAgb3V0WzJdID0gKG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSkgLyB3O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIG1hdDMuXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBtIHRoZSAzeDMgbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MyQxKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIG91dFswXSA9IHggKiBtWzBdICsgeSAqIG1bM10gKyB6ICogbVs2XTtcbiAgICBvdXRbMV0gPSB4ICogbVsxXSArIHkgKiBtWzRdICsgeiAqIG1bN107XG4gICAgb3V0WzJdID0geCAqIG1bMl0gKyB5ICogbVs1XSArIHogKiBtWzhdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHZlYzMgd2l0aCBhIHF1YXRcbiAgICogQ2FuIGFsc28gYmUgdXNlZCBmb3IgZHVhbCBxdWF0ZXJuaW9ucy4gKE11bHRpcGx5IGl0IHdpdGggdGhlIHJlYWwgcGFydClcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgcXVhdGVybmlvbiB0byB0cmFuc2Zvcm0gd2l0aFxuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybVF1YXQkMShvdXQsIGEsIHEpIHtcbiAgICAvLyBiZW5jaG1hcmtzOiBodHRwczovL2pzcGVyZi5jb20vcXVhdGVybmlvbi10cmFuc2Zvcm0tdmVjMy1pbXBsZW1lbnRhdGlvbnMtZml4ZWRcbiAgICB2YXIgcXggPSBxWzBdLFxuICAgICAgICBxeSA9IHFbMV0sXG4gICAgICAgIHF6ID0gcVsyXSxcbiAgICAgICAgcXcgPSBxWzNdO1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdOyAvLyB2YXIgcXZlYyA9IFtxeCwgcXksIHF6XTtcbiAgICAvLyB2YXIgdXYgPSB2ZWMzLmNyb3NzKFtdLCBxdmVjLCBhKTtcblxuICAgIHZhciB1dnggPSBxeSAqIHogLSBxeiAqIHksXG4gICAgICAgIHV2eSA9IHF6ICogeCAtIHF4ICogeixcbiAgICAgICAgdXZ6ID0gcXggKiB5IC0gcXkgKiB4OyAvLyB2YXIgdXV2ID0gdmVjMy5jcm9zcyhbXSwgcXZlYywgdXYpO1xuXG4gICAgdmFyIHV1dnggPSBxeSAqIHV2eiAtIHF6ICogdXZ5LFxuICAgICAgICB1dXZ5ID0gcXogKiB1dnggLSBxeCAqIHV2eixcbiAgICAgICAgdXV2eiA9IHF4ICogdXZ5IC0gcXkgKiB1dng7IC8vIHZlYzMuc2NhbGUodXYsIHV2LCAyICogdyk7XG5cbiAgICB2YXIgdzIgPSBxdyAqIDI7XG4gICAgdXZ4ICo9IHcyO1xuICAgIHV2eSAqPSB3MjtcbiAgICB1dnogKj0gdzI7IC8vIHZlYzMuc2NhbGUodXV2LCB1dXYsIDIpO1xuXG4gICAgdXV2eCAqPSAyO1xuICAgIHV1dnkgKj0gMjtcbiAgICB1dXZ6ICo9IDI7IC8vIHJldHVybiB2ZWMzLmFkZChvdXQsIGEsIHZlYzMuYWRkKG91dCwgdXYsIHV1dikpO1xuXG4gICAgb3V0WzBdID0geCArIHV2eCArIHV1dng7XG4gICAgb3V0WzFdID0geSArIHV2eSArIHV1dnk7XG4gICAgb3V0WzJdID0geiArIHV2eiArIHV1dno7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlIGEgM0QgdmVjdG9yIGFyb3VuZCB0aGUgeC1heGlzXG4gICAqIEBwYXJhbSB7dmVjM30gb3V0IFRoZSByZWNlaXZpbmcgdmVjM1xuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgdmVjMyBwb2ludCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGIgVGhlIG9yaWdpbiBvZiB0aGUgcm90YXRpb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCBUaGUgYW5nbGUgb2Ygcm90YXRpb24gaW4gcmFkaWFuc1xuICAgKiBAcmV0dXJucyB7dmVjM30gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZVgkMihvdXQsIGEsIGIsIHJhZCkge1xuICAgIHZhciBwID0gW10sXG4gICAgICAgIHIgPSBbXTsgLy9UcmFuc2xhdGUgcG9pbnQgdG8gdGhlIG9yaWdpblxuXG4gICAgcFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIHBbMV0gPSBhWzFdIC0gYlsxXTtcbiAgICBwWzJdID0gYVsyXSAtIGJbMl07IC8vcGVyZm9ybSByb3RhdGlvblxuXG4gICAgclswXSA9IHBbMF07XG4gICAgclsxXSA9IHBbMV0gKiBNYXRoLmNvcyhyYWQpIC0gcFsyXSAqIE1hdGguc2luKHJhZCk7XG4gICAgclsyXSA9IHBbMV0gKiBNYXRoLnNpbihyYWQpICsgcFsyXSAqIE1hdGguY29zKHJhZCk7IC8vdHJhbnNsYXRlIHRvIGNvcnJlY3QgcG9zaXRpb25cblxuICAgIG91dFswXSA9IHJbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IHJbMV0gKyBiWzFdO1xuICAgIG91dFsyXSA9IHJbMl0gKyBiWzJdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZSBhIDNEIHZlY3RvciBhcm91bmQgdGhlIHktYXhpc1xuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzNcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgVGhlIHZlYzMgcG9pbnQgdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVZJDIob3V0LCBhLCBiLCByYWQpIHtcbiAgICB2YXIgcCA9IFtdLFxuICAgICAgICByID0gW107IC8vVHJhbnNsYXRlIHBvaW50IHRvIHRoZSBvcmlnaW5cblxuICAgIHBbMF0gPSBhWzBdIC0gYlswXTtcbiAgICBwWzFdID0gYVsxXSAtIGJbMV07XG4gICAgcFsyXSA9IGFbMl0gLSBiWzJdOyAvL3BlcmZvcm0gcm90YXRpb25cblxuICAgIHJbMF0gPSBwWzJdICogTWF0aC5zaW4ocmFkKSArIHBbMF0gKiBNYXRoLmNvcyhyYWQpO1xuICAgIHJbMV0gPSBwWzFdO1xuICAgIHJbMl0gPSBwWzJdICogTWF0aC5jb3MocmFkKSAtIHBbMF0gKiBNYXRoLnNpbihyYWQpOyAvL3RyYW5zbGF0ZSB0byBjb3JyZWN0IHBvc2l0aW9uXG5cbiAgICBvdXRbMF0gPSByWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSByWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSByWzJdICsgYlsyXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGUgYSAzRCB2ZWN0b3IgYXJvdW5kIHRoZSB6LWF4aXNcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgVGhlIHJlY2VpdmluZyB2ZWMzXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSB2ZWMzIHBvaW50IHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgb3JpZ2luIG9mIHRoZSByb3RhdGlvblxuICAgKiBAcGFyYW0ge051bWJlcn0gcmFkIFRoZSBhbmdsZSBvZiByb3RhdGlvbiBpbiByYWRpYW5zXG4gICAqIEByZXR1cm5zIHt2ZWMzfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlWiQyKG91dCwgYSwgYiwgcmFkKSB7XG4gICAgdmFyIHAgPSBbXSxcbiAgICAgICAgciA9IFtdOyAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG5cbiAgICBwWzBdID0gYVswXSAtIGJbMF07XG4gICAgcFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIHBbMl0gPSBhWzJdIC0gYlsyXTsgLy9wZXJmb3JtIHJvdGF0aW9uXG5cbiAgICByWzBdID0gcFswXSAqIE1hdGguY29zKHJhZCkgLSBwWzFdICogTWF0aC5zaW4ocmFkKTtcbiAgICByWzFdID0gcFswXSAqIE1hdGguc2luKHJhZCkgKyBwWzFdICogTWF0aC5jb3MocmFkKTtcbiAgICByWzJdID0gcFsyXTsgLy90cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gICAgb3V0WzBdID0gclswXSArIGJbMF07XG4gICAgb3V0WzFdID0gclsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gclsyXSArIGJbMl07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2V0IHRoZSBhbmdsZSBiZXR3ZWVuIHR3byAzRCB2ZWN0b3JzXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgYW5nbGUgaW4gcmFkaWFuc1xuICAgKi9cblxuICBmdW5jdGlvbiBhbmdsZSQxKGEsIGIpIHtcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV0sXG4gICAgICAgIGF6ID0gYVsyXSxcbiAgICAgICAgYnggPSBiWzBdLFxuICAgICAgICBieSA9IGJbMV0sXG4gICAgICAgIGJ6ID0gYlsyXSxcbiAgICAgICAgbWFnID0gTWF0aC5zcXJ0KChheCAqIGF4ICsgYXkgKiBheSArIGF6ICogYXopICogKGJ4ICogYnggKyBieSAqIGJ5ICsgYnogKiBieikpLFxuICAgICAgICBjb3NpbmUgPSBtYWcgJiYgZG90JDQoYSwgYikgLyBtYWc7XG4gICAgcmV0dXJuIE1hdGguYWNvcyhNYXRoLm1pbihNYXRoLm1heChjb3NpbmUsIC0xKSwgMSkpO1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWMzIHRvIHplcm9cbiAgICpcbiAgICogQHBhcmFtIHt2ZWMzfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB6ZXJvJDIob3V0KSB7XG4gICAgb3V0WzBdID0gMC4wO1xuICAgIG91dFsxXSA9IDAuMDtcbiAgICBvdXRbMl0gPSAwLjA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0ciQ0KGEpIHtcbiAgICByZXR1cm4gXCJ2ZWMzKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIpXCI7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBvciBub3QgdGhlIHZlY3RvcnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYSBUaGUgZmlyc3QgdmVjdG9yLlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYiBUaGUgc2Vjb25kIHZlY3Rvci5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgdGhlIHZlY3RvcnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGV4YWN0RXF1YWxzJDQoYSwgYikge1xuICAgIHJldHVybiBhWzBdID09PSBiWzBdICYmIGFbMV0gPT09IGJbMV0gJiYgYVsyXSA9PT0gYlsyXTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZXF1YWxzJDQoYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdO1xuICAgIHZhciBiMCA9IGJbMF0sXG4gICAgICAgIGIxID0gYlsxXSxcbiAgICAgICAgYjIgPSBiWzJdO1xuICAgIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKTtcbiAgfVxuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMzLnN1YnRyYWN0fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHN1YiQyID0gc3VidHJhY3QkMjtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5tdWx0aXBseX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBtdWwkNCA9IG11bHRpcGx5JDQ7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGl2aWRlfVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGRpdiQyID0gZGl2aWRlJDI7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuZGlzdGFuY2V9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZGlzdCQyID0gZGlzdGFuY2UkMjtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMy5zcXVhcmVkRGlzdGFuY2V9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3FyRGlzdCQyID0gc3F1YXJlZERpc3RhbmNlJDI7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMubGVuZ3RofVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGxlbiQ0ID0gbGVuZ3RoJDQ7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzMuc3F1YXJlZExlbmd0aH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzcXJMZW4kNCA9IHNxdWFyZWRMZW5ndGgkNDtcbiAgLyoqXG4gICAqIFBlcmZvcm0gc29tZSBvcGVyYXRpb24gb3ZlciBhbiBhcnJheSBvZiB2ZWMzcy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gYSB0aGUgYXJyYXkgb2YgdmVjdG9ycyB0byBpdGVyYXRlIG92ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHN0cmlkZSBOdW1iZXIgb2YgZWxlbWVudHMgYmV0d2VlbiB0aGUgc3RhcnQgb2YgZWFjaCB2ZWMzLiBJZiAwIGFzc3VtZXMgdGlnaHRseSBwYWNrZWRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCBOdW1iZXIgb2YgZWxlbWVudHMgdG8gc2tpcCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBhcnJheVxuICAgKiBAcGFyYW0ge051bWJlcn0gY291bnQgTnVtYmVyIG9mIHZlYzNzIHRvIGl0ZXJhdGUgb3Zlci4gSWYgMCBpdGVyYXRlcyBvdmVyIGVudGlyZSBhcnJheVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZlY3RvciBpbiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIHtPYmplY3R9IFthcmddIGFkZGl0aW9uYWwgYXJndW1lbnQgdG8gcGFzcyB0byBmblxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGFcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBmb3JFYWNoJDIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZlYyA9IGNyZWF0ZSQ0KCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICAgIHZhciBpLCBsO1xuXG4gICAgICBpZiAoIXN0cmlkZSkge1xuICAgICAgICBzdHJpZGUgPSAzO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW9mZnNldCkge1xuICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgIHZlY1swXSA9IGFbaV07XG4gICAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgICB2ZWNbMl0gPSBhW2kgKyAyXTtcbiAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICAgIGFbaSArIDFdID0gdmVjWzFdO1xuICAgICAgICBhW2kgKyAyXSA9IHZlY1syXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbiAgfSgpO1xuXG4gIHZhciB2ZWMzID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBjcmVhdGU6IGNyZWF0ZSQ0LFxuICAgIGNsb25lOiBjbG9uZSQ0LFxuICAgIGxlbmd0aDogbGVuZ3RoJDQsXG4gICAgZnJvbVZhbHVlczogZnJvbVZhbHVlcyQ0LFxuICAgIGNvcHk6IGNvcHkkNCxcbiAgICBzZXQ6IHNldCQ0LFxuICAgIGFkZDogYWRkJDQsXG4gICAgc3VidHJhY3Q6IHN1YnRyYWN0JDIsXG4gICAgbXVsdGlwbHk6IG11bHRpcGx5JDQsXG4gICAgZGl2aWRlOiBkaXZpZGUkMixcbiAgICBjZWlsOiBjZWlsJDIsXG4gICAgZmxvb3I6IGZsb29yJDIsXG4gICAgbWluOiBtaW4kMixcbiAgICBtYXg6IG1heCQyLFxuICAgIHJvdW5kOiByb3VuZCQyLFxuICAgIHNjYWxlOiBzY2FsZSQ0LFxuICAgIHNjYWxlQW5kQWRkOiBzY2FsZUFuZEFkZCQyLFxuICAgIGRpc3RhbmNlOiBkaXN0YW5jZSQyLFxuICAgIHNxdWFyZWREaXN0YW5jZTogc3F1YXJlZERpc3RhbmNlJDIsXG4gICAgc3F1YXJlZExlbmd0aDogc3F1YXJlZExlbmd0aCQ0LFxuICAgIG5lZ2F0ZTogbmVnYXRlJDIsXG4gICAgaW52ZXJzZTogaW52ZXJzZSQyLFxuICAgIG5vcm1hbGl6ZTogbm9ybWFsaXplJDQsXG4gICAgZG90OiBkb3QkNCxcbiAgICBjcm9zczogY3Jvc3MkMixcbiAgICBsZXJwOiBsZXJwJDQsXG4gICAgc2xlcnA6IHNsZXJwJDEsXG4gICAgaGVybWl0ZTogaGVybWl0ZSxcbiAgICBiZXppZXI6IGJlemllcixcbiAgICByYW5kb206IHJhbmRvbSQzLFxuICAgIHRyYW5zZm9ybU1hdDQ6IHRyYW5zZm9ybU1hdDQkMixcbiAgICB0cmFuc2Zvcm1NYXQzOiB0cmFuc2Zvcm1NYXQzJDEsXG4gICAgdHJhbnNmb3JtUXVhdDogdHJhbnNmb3JtUXVhdCQxLFxuICAgIHJvdGF0ZVg6IHJvdGF0ZVgkMixcbiAgICByb3RhdGVZOiByb3RhdGVZJDIsXG4gICAgcm90YXRlWjogcm90YXRlWiQyLFxuICAgIGFuZ2xlOiBhbmdsZSQxLFxuICAgIHplcm86IHplcm8kMixcbiAgICBzdHI6IHN0ciQ0LFxuICAgIGV4YWN0RXF1YWxzOiBleGFjdEVxdWFscyQ0LFxuICAgIGVxdWFsczogZXF1YWxzJDQsXG4gICAgc3ViOiBzdWIkMixcbiAgICBtdWw6IG11bCQ0LFxuICAgIGRpdjogZGl2JDIsXG4gICAgZGlzdDogZGlzdCQyLFxuICAgIHNxckRpc3Q6IHNxckRpc3QkMixcbiAgICBsZW46IGxlbiQ0LFxuICAgIHNxckxlbjogc3FyTGVuJDQsXG4gICAgZm9yRWFjaDogZm9yRWFjaCQyXG4gIH0pO1xuXG4gIC8qKlxuICAgKiA0IERpbWVuc2lvbmFsIFZlY3RvclxuICAgKiBAbW9kdWxlIHZlYzRcbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcsIGVtcHR5IHZlYzRcbiAgICpcbiAgICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGUkMygpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoNCk7XG5cbiAgICBpZiAoQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICAgIG91dFswXSA9IDA7XG4gICAgICBvdXRbMV0gPSAwO1xuICAgICAgb3V0WzJdID0gMDtcbiAgICAgIG91dFszXSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyB2ZWM0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgdmVjdG9yXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjbG9uZVxuICAgKiBAcmV0dXJucyB7dmVjNH0gYSBuZXcgNEQgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsb25lJDMoYSkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdmVjNCBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAgICogQHJldHVybnMge3ZlYzR9IGEgbmV3IDREIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tVmFsdWVzJDMoeCwgeSwgeiwgdykge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg0KTtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSB3O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSB2ZWM0IHRvIGFub3RoZXJcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHNvdXJjZSB2ZWN0b3JcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBjb3B5JDMob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHogWiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcgVyBjb21wb25lbnRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzZXQkMyhvdXQsIHgsIHksIHosIHcpIHtcbiAgICBvdXRbMF0gPSB4O1xuICAgIG91dFsxXSA9IHk7XG4gICAgb3V0WzJdID0gejtcbiAgICBvdXRbM10gPSB3O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIHZlYzQnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBhZGQkMyhvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICsgYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdICsgYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBTdWJ0cmFjdHMgdmVjdG9yIGIgZnJvbSB2ZWN0b3IgYVxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzdWJ0cmFjdCQxKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gLSBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gLSBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgdHdvIHZlYzQnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseSQzKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiWzFdO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiWzJdO1xuICAgIG91dFszXSA9IGFbM10gKiBiWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIERpdmlkZXMgdHdvIHZlYzQnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBkaXZpZGUkMShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdIC8gYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdIC8gYlsxXTtcbiAgICBvdXRbMl0gPSBhWzJdIC8gYlsyXTtcbiAgICBvdXRbM10gPSBhWzNdIC8gYlszXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNYXRoLmNlaWwgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBjZWlsXG4gICAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY2VpbCQxKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGguY2VpbChhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gICAgb3V0WzJdID0gTWF0aC5jZWlsKGFbMl0pO1xuICAgIG91dFszXSA9IE1hdGguY2VpbChhWzNdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNYXRoLmZsb29yIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gZmxvb3JcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBmbG9vciQxKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGguZmxvb3IoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5mbG9vcihhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLmZsb29yKGFbMl0pO1xuICAgIG91dFszXSA9IE1hdGguZmxvb3IoYVszXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWluaW11bSBvZiB0d28gdmVjNCdzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1pbiQxKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IE1hdGgubWluKGFbMF0sIGJbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgubWluKGFbMV0sIGJbMV0pO1xuICAgIG91dFsyXSA9IE1hdGgubWluKGFbMl0sIGJbMl0pO1xuICAgIG91dFszXSA9IE1hdGgubWluKGFbM10sIGJbM10pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1heGltdW0gb2YgdHdvIHZlYzQnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtYXgkMShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLm1heChhWzJdLCBiWzJdKTtcbiAgICBvdXRbM10gPSBNYXRoLm1heChhWzNdLCBiWzNdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjNFxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gcm91bmRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3VuZCQxKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGgucm91bmQoYVswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5yb3VuZChhWzFdKTtcbiAgICBvdXRbMl0gPSBNYXRoLnJvdW5kKGFbMl0pO1xuICAgIG91dFszXSA9IE1hdGgucm91bmQoYVszXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2NhbGVzIGEgdmVjNCBieSBhIHNjYWxhciBudW1iZXJcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNjYWxlJDMob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSAqIGI7XG4gICAgb3V0WzFdID0gYVsxXSAqIGI7XG4gICAgb3V0WzJdID0gYVsyXSAqIGI7XG4gICAgb3V0WzNdID0gYVszXSAqIGI7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQWRkcyB0d28gdmVjNCdzIGFmdGVyIHNjYWxpbmcgdGhlIHNlY29uZCBvcGVyYW5kIGJ5IGEgc2NhbGFyIHZhbHVlXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gc2NhbGUgdGhlIGFtb3VudCB0byBzY2FsZSBiIGJ5IGJlZm9yZSBhZGRpbmdcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBzY2FsZUFuZEFkZCQxKG91dCwgYSwgYiwgc2NhbGUpIHtcbiAgICBvdXRbMF0gPSBhWzBdICsgYlswXSAqIHNjYWxlO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdICogc2NhbGU7XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl0gKiBzY2FsZTtcbiAgICBvdXRbM10gPSBhWzNdICsgYlszXSAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICAgKi9cblxuICBmdW5jdGlvbiBkaXN0YW5jZSQxKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICAgIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gICAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgICB2YXIgdyA9IGJbM10gLSBhWzNdO1xuICAgIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHosIHcpO1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGlhbiBkaXN0YW5jZSBiZXR3ZWVuIHR3byB2ZWM0J3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgZGlzdGFuY2UgYmV0d2VlbiBhIGFuZCBiXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNxdWFyZWREaXN0YW5jZSQxKGEsIGIpIHtcbiAgICB2YXIgeCA9IGJbMF0gLSBhWzBdO1xuICAgIHZhciB5ID0gYlsxXSAtIGFbMV07XG4gICAgdmFyIHogPSBiWzJdIC0gYVsyXTtcbiAgICB2YXIgdyA9IGJbM10gLSBhWzNdO1xuICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjNFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICAgKi9cblxuICBmdW5jdGlvbiBsZW5ndGgkMyhhKSB7XG4gICAgdmFyIHggPSBhWzBdO1xuICAgIHZhciB5ID0gYVsxXTtcbiAgICB2YXIgeiA9IGFbMl07XG4gICAgdmFyIHcgPSBhWzNdO1xuICAgIHJldHVybiBNYXRoLmh5cG90KHgsIHksIHosIHcpO1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIHZlYzRcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNxdWFyZWRMZW5ndGgkMyhhKSB7XG4gICAgdmFyIHggPSBhWzBdO1xuICAgIHZhciB5ID0gYVsxXTtcbiAgICB2YXIgeiA9IGFbMl07XG4gICAgdmFyIHcgPSBhWzNdO1xuICAgIHJldHVybiB4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdztcbiAgfVxuICAvKipcbiAgICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzRcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5lZ2F0ZSQxKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IC1hWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGludmVyc2Ugb2YgdGhlIGNvbXBvbmVudHMgb2YgYSB2ZWM0XG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBpbnZlcnRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpbnZlcnNlJDEob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gMS4wIC8gYVswXTtcbiAgICBvdXRbMV0gPSAxLjAgLyBhWzFdO1xuICAgIG91dFsyXSA9IDEuMCAvIGFbMl07XG4gICAgb3V0WzNdID0gMS4wIC8gYVszXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBOb3JtYWxpemUgYSB2ZWM0XG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHZlY3RvciB0byBub3JtYWxpemVcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBub3JtYWxpemUkMyhvdXQsIGEpIHtcbiAgICB2YXIgeCA9IGFbMF07XG4gICAgdmFyIHkgPSBhWzFdO1xuICAgIHZhciB6ID0gYVsyXTtcbiAgICB2YXIgdyA9IGFbM107XG4gICAgdmFyIGxlbiA9IHggKiB4ICsgeSAqIHkgKyB6ICogeiArIHcgKiB3O1xuXG4gICAgaWYgKGxlbiA+IDApIHtcbiAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSB4ICogbGVuO1xuICAgIG91dFsxXSA9IHkgKiBsZW47XG4gICAgb3V0WzJdID0geiAqIGxlbjtcbiAgICBvdXRbM10gPSB3ICogbGVuO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byB2ZWM0J3NcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGRvdCBwcm9kdWN0IG9mIGEgYW5kIGJcbiAgICovXG5cbiAgZnVuY3Rpb24gZG90JDMoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdICsgYVsyXSAqIGJbMl0gKyBhWzNdICogYlszXTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3Jvc3MtcHJvZHVjdCBvZiB0aHJlZSB2ZWN0b3JzIGluIGEgNC1kaW1lbnNpb25hbCBzcGFjZVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gcmVzdWx0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBVIHRoZSBmaXJzdCB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IFYgdGhlIHNlY29uZCB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IFcgdGhlIHRoaXJkIHZlY3RvclxuICAgKiBAcmV0dXJucyB7dmVjNH0gcmVzdWx0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyb3NzJDEob3V0LCB1LCB2LCB3KSB7XG4gICAgdmFyIEEgPSB2WzBdICogd1sxXSAtIHZbMV0gKiB3WzBdLFxuICAgICAgICBCID0gdlswXSAqIHdbMl0gLSB2WzJdICogd1swXSxcbiAgICAgICAgQyA9IHZbMF0gKiB3WzNdIC0gdlszXSAqIHdbMF0sXG4gICAgICAgIEQgPSB2WzFdICogd1syXSAtIHZbMl0gKiB3WzFdLFxuICAgICAgICBFID0gdlsxXSAqIHdbM10gLSB2WzNdICogd1sxXSxcbiAgICAgICAgRiA9IHZbMl0gKiB3WzNdIC0gdlszXSAqIHdbMl07XG4gICAgdmFyIEcgPSB1WzBdO1xuICAgIHZhciBIID0gdVsxXTtcbiAgICB2YXIgSSA9IHVbMl07XG4gICAgdmFyIEogPSB1WzNdO1xuICAgIG91dFswXSA9IEggKiBGIC0gSSAqIEUgKyBKICogRDtcbiAgICBvdXRbMV0gPSAtKEcgKiBGKSArIEkgKiBDIC0gSiAqIEI7XG4gICAgb3V0WzJdID0gRyAqIEUgLSBIICogQyArIEogKiBBO1xuICAgIG91dFszXSA9IC0oRyAqIEQpICsgSCAqIEIgLSBJICogQTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uIGJldHdlZW4gdHdvIHZlYzQnc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxlcnAkMyhvdXQsIGEsIGIsIHQpIHtcbiAgICB2YXIgYXggPSBhWzBdO1xuICAgIHZhciBheSA9IGFbMV07XG4gICAgdmFyIGF6ID0gYVsyXTtcbiAgICB2YXIgYXcgPSBhWzNdO1xuICAgIG91dFswXSA9IGF4ICsgdCAqIChiWzBdIC0gYXgpO1xuICAgIG91dFsxXSA9IGF5ICsgdCAqIChiWzFdIC0gYXkpO1xuICAgIG91dFsyXSA9IGF6ICsgdCAqIChiWzJdIC0gYXopO1xuICAgIG91dFszXSA9IGF3ICsgdCAqIChiWzNdIC0gYXcpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHJhbmRvbSB2ZWN0b3Igd2l0aCB0aGUgZ2l2ZW4gc2NhbGVcbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZV0gTGVuZ3RoIG9mIHRoZSByZXN1bHRpbmcgdmVjdG9yLiBJZiBvbWl0dGVkLCBhIHVuaXQgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByYW5kb20kMihvdXQsIHNjYWxlKSB7XG4gICAgc2NhbGUgPSBzY2FsZSA9PT0gdW5kZWZpbmVkID8gMS4wIDogc2NhbGU7IC8vIE1hcnNhZ2xpYSwgR2VvcmdlLiBDaG9vc2luZyBhIFBvaW50IGZyb20gdGhlIFN1cmZhY2Ugb2YgYVxuICAgIC8vIFNwaGVyZS4gQW5uLiBNYXRoLiBTdGF0aXN0LiA0MyAoMTk3MiksIG5vLiAyLCA2NDUtLTY0Ni5cbiAgICAvLyBodHRwOi8vcHJvamVjdGV1Y2xpZC5vcmcvZXVjbGlkLmFvbXMvMTE3NzY5MjY0NDtcblxuICAgIHZhciB2MSwgdjIsIHYzLCB2NDtcbiAgICB2YXIgczEsIHMyO1xuXG4gICAgZG8ge1xuICAgICAgdjEgPSBSQU5ET00oKSAqIDIgLSAxO1xuICAgICAgdjIgPSBSQU5ET00oKSAqIDIgLSAxO1xuICAgICAgczEgPSB2MSAqIHYxICsgdjIgKiB2MjtcbiAgICB9IHdoaWxlIChzMSA+PSAxKTtcblxuICAgIGRvIHtcbiAgICAgIHYzID0gUkFORE9NKCkgKiAyIC0gMTtcbiAgICAgIHY0ID0gUkFORE9NKCkgKiAyIC0gMTtcbiAgICAgIHMyID0gdjMgKiB2MyArIHY0ICogdjQ7XG4gICAgfSB3aGlsZSAoczIgPj0gMSk7XG5cbiAgICB2YXIgZCA9IE1hdGguc3FydCgoMSAtIHMxKSAvIHMyKTtcbiAgICBvdXRbMF0gPSBzY2FsZSAqIHYxO1xuICAgIG91dFsxXSA9IHNjYWxlICogdjI7XG4gICAgb3V0WzJdID0gc2NhbGUgKiB2MyAqIGQ7XG4gICAgb3V0WzNdID0gc2NhbGUgKiB2NCAqIGQ7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogVHJhbnNmb3JtcyB0aGUgdmVjNCB3aXRoIGEgbWF0NC5cbiAgICpcbiAgICogQHBhcmFtIHt2ZWM0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAqIEByZXR1cm5zIHt2ZWM0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtTWF0NCQxKG91dCwgYSwgbSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVs4XSAqIHogKyBtWzEyXSAqIHc7XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bOV0gKiB6ICsgbVsxM10gKiB3O1xuICAgIG91dFsyXSA9IG1bMl0gKiB4ICsgbVs2XSAqIHkgKyBtWzEwXSAqIHogKyBtWzE0XSAqIHc7XG4gICAgb3V0WzNdID0gbVszXSAqIHggKyBtWzddICogeSArIG1bMTFdICogeiArIG1bMTVdICogdztcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSB2ZWM0IHdpdGggYSBxdWF0XG4gICAqXG4gICAqIEBwYXJhbSB7dmVjNH0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIHF1YXRlcm5pb24gdG8gdHJhbnNmb3JtIHdpdGhcbiAgICogQHJldHVybnMge3ZlYzR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiB0cmFuc2Zvcm1RdWF0KG91dCwgYSwgcSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIHZhciBxeCA9IHFbMF0sXG4gICAgICAgIHF5ID0gcVsxXSxcbiAgICAgICAgcXogPSBxWzJdLFxuICAgICAgICBxdyA9IHFbM107IC8vIGNhbGN1bGF0ZSBxdWF0ICogdmVjXG5cbiAgICB2YXIgaXggPSBxdyAqIHggKyBxeSAqIHogLSBxeiAqIHk7XG4gICAgdmFyIGl5ID0gcXcgKiB5ICsgcXogKiB4IC0gcXggKiB6O1xuICAgIHZhciBpeiA9IHF3ICogeiArIHF4ICogeSAtIHF5ICogeDtcbiAgICB2YXIgaXcgPSAtcXggKiB4IC0gcXkgKiB5IC0gcXogKiB6OyAvLyBjYWxjdWxhdGUgcmVzdWx0ICogaW52ZXJzZSBxdWF0XG5cbiAgICBvdXRbMF0gPSBpeCAqIHF3ICsgaXcgKiAtcXggKyBpeSAqIC1xeiAtIGl6ICogLXF5O1xuICAgIG91dFsxXSA9IGl5ICogcXcgKyBpdyAqIC1xeSArIGl6ICogLXF4IC0gaXggKiAtcXo7XG4gICAgb3V0WzJdID0gaXogKiBxdyArIGl3ICogLXF6ICsgaXggKiAtcXkgLSBpeSAqIC1xeDtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzQgdG8gemVyb1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzR9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcmV0dXJucyB7dmVjNH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHplcm8kMShvdXQpIHtcbiAgICBvdXRbMF0gPSAwLjA7XG4gICAgb3V0WzFdID0gMC4wO1xuICAgIG91dFsyXSA9IDAuMDtcbiAgICBvdXRbM10gPSAwLjA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHZlY3RvclxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjNH0gYSB2ZWN0b3IgdG8gcmVwcmVzZW50IGFzIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN0ciQzKGEpIHtcbiAgICByZXR1cm4gXCJ2ZWM0KFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiKVwiO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGhhdmUgZXhhY3RseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzR9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBleGFjdEVxdWFscyQzKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWM0fSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZXF1YWxzJDMoYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF0sXG4gICAgICAgIGExID0gYVsxXSxcbiAgICAgICAgYTIgPSBhWzJdLFxuICAgICAgICBhMyA9IGFbM107XG4gICAgdmFyIGIwID0gYlswXSxcbiAgICAgICAgYjEgPSBiWzFdLFxuICAgICAgICBiMiA9IGJbMl0sXG4gICAgICAgIGIzID0gYlszXTtcbiAgICByZXR1cm4gTWF0aC5hYnMoYTAgLSBiMCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTApLCBNYXRoLmFicyhiMCkpICYmIE1hdGguYWJzKGExIC0gYjEpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGExKSwgTWF0aC5hYnMoYjEpKSAmJiBNYXRoLmFicyhhMiAtIGIyKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMiksIE1hdGguYWJzKGIyKSkgJiYgTWF0aC5hYnMoYTMgLSBiMykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTMpLCBNYXRoLmFicyhiMykpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzQuc3VidHJhY3R9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3ViJDEgPSBzdWJ0cmFjdCQxO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWM0Lm11bHRpcGx5fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG11bCQzID0gbXVsdGlwbHkkMztcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXZpZGV9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZGl2JDEgPSBkaXZpZGUkMTtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5kaXN0YW5jZX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBkaXN0JDEgPSBkaXN0YW5jZSQxO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWM0LnNxdWFyZWREaXN0YW5jZX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzcXJEaXN0JDEgPSBzcXVhcmVkRGlzdGFuY2UkMTtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5sZW5ndGh9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbGVuJDMgPSBsZW5ndGgkMztcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjNC5zcXVhcmVkTGVuZ3RofVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNxckxlbiQzID0gc3F1YXJlZExlbmd0aCQzO1xuICAvKipcbiAgICogUGVyZm9ybSBzb21lIG9wZXJhdGlvbiBvdmVyIGFuIGFycmF5IG9mIHZlYzRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBhIHRoZSBhcnJheSBvZiB2ZWN0b3JzIHRvIGl0ZXJhdGUgb3ZlclxuICAgKiBAcGFyYW0ge051bWJlcn0gc3RyaWRlIE51bWJlciBvZiBlbGVtZW50cyBiZXR3ZWVuIHRoZSBzdGFydCBvZiBlYWNoIHZlYzQuIElmIDAgYXNzdW1lcyB0aWdodGx5IHBhY2tlZFxuICAgKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IE51bWJlciBvZiBlbGVtZW50cyB0byBza2lwIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGFycmF5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBOdW1iZXIgb2YgdmVjNHMgdG8gaXRlcmF0ZSBvdmVyLiBJZiAwIGl0ZXJhdGVzIG92ZXIgZW50aXJlIGFycmF5XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmVjdG9yIGluIHRoZSBhcnJheVxuICAgKiBAcGFyYW0ge09iamVjdH0gW2FyZ10gYWRkaXRpb25hbCBhcmd1bWVudCB0byBwYXNzIHRvIGZuXG4gICAqIEByZXR1cm5zIHtBcnJheX0gYVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGZvckVhY2gkMSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmVjID0gY3JlYXRlJDMoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGEsIHN0cmlkZSwgb2Zmc2V0LCBjb3VudCwgZm4sIGFyZykge1xuICAgICAgdmFyIGksIGw7XG5cbiAgICAgIGlmICghc3RyaWRlKSB7XG4gICAgICAgIHN0cmlkZSA9IDQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghb2Zmc2V0KSB7XG4gICAgICAgIG9mZnNldCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb3VudCkge1xuICAgICAgICBsID0gTWF0aC5taW4oY291bnQgKiBzdHJpZGUgKyBvZmZzZXQsIGEubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGwgPSBhLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgZm9yIChpID0gb2Zmc2V0OyBpIDwgbDsgaSArPSBzdHJpZGUpIHtcbiAgICAgICAgdmVjWzBdID0gYVtpXTtcbiAgICAgICAgdmVjWzFdID0gYVtpICsgMV07XG4gICAgICAgIHZlY1syXSA9IGFbaSArIDJdO1xuICAgICAgICB2ZWNbM10gPSBhW2kgKyAzXTtcbiAgICAgICAgZm4odmVjLCB2ZWMsIGFyZyk7XG4gICAgICAgIGFbaV0gPSB2ZWNbMF07XG4gICAgICAgIGFbaSArIDFdID0gdmVjWzFdO1xuICAgICAgICBhW2kgKyAyXSA9IHZlY1syXTtcbiAgICAgICAgYVtpICsgM10gPSB2ZWNbM107XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhO1xuICAgIH07XG4gIH0oKTtcblxuICB2YXIgdmVjNCA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgY3JlYXRlOiBjcmVhdGUkMyxcbiAgICBjbG9uZTogY2xvbmUkMyxcbiAgICBmcm9tVmFsdWVzOiBmcm9tVmFsdWVzJDMsXG4gICAgY29weTogY29weSQzLFxuICAgIHNldDogc2V0JDMsXG4gICAgYWRkOiBhZGQkMyxcbiAgICBzdWJ0cmFjdDogc3VidHJhY3QkMSxcbiAgICBtdWx0aXBseTogbXVsdGlwbHkkMyxcbiAgICBkaXZpZGU6IGRpdmlkZSQxLFxuICAgIGNlaWw6IGNlaWwkMSxcbiAgICBmbG9vcjogZmxvb3IkMSxcbiAgICBtaW46IG1pbiQxLFxuICAgIG1heDogbWF4JDEsXG4gICAgcm91bmQ6IHJvdW5kJDEsXG4gICAgc2NhbGU6IHNjYWxlJDMsXG4gICAgc2NhbGVBbmRBZGQ6IHNjYWxlQW5kQWRkJDEsXG4gICAgZGlzdGFuY2U6IGRpc3RhbmNlJDEsXG4gICAgc3F1YXJlZERpc3RhbmNlOiBzcXVhcmVkRGlzdGFuY2UkMSxcbiAgICBsZW5ndGg6IGxlbmd0aCQzLFxuICAgIHNxdWFyZWRMZW5ndGg6IHNxdWFyZWRMZW5ndGgkMyxcbiAgICBuZWdhdGU6IG5lZ2F0ZSQxLFxuICAgIGludmVyc2U6IGludmVyc2UkMSxcbiAgICBub3JtYWxpemU6IG5vcm1hbGl6ZSQzLFxuICAgIGRvdDogZG90JDMsXG4gICAgY3Jvc3M6IGNyb3NzJDEsXG4gICAgbGVycDogbGVycCQzLFxuICAgIHJhbmRvbTogcmFuZG9tJDIsXG4gICAgdHJhbnNmb3JtTWF0NDogdHJhbnNmb3JtTWF0NCQxLFxuICAgIHRyYW5zZm9ybVF1YXQ6IHRyYW5zZm9ybVF1YXQsXG4gICAgemVybzogemVybyQxLFxuICAgIHN0cjogc3RyJDMsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzJDMsXG4gICAgZXF1YWxzOiBlcXVhbHMkMyxcbiAgICBzdWI6IHN1YiQxLFxuICAgIG11bDogbXVsJDMsXG4gICAgZGl2OiBkaXYkMSxcbiAgICBkaXN0OiBkaXN0JDEsXG4gICAgc3FyRGlzdDogc3FyRGlzdCQxLFxuICAgIGxlbjogbGVuJDMsXG4gICAgc3FyTGVuOiBzcXJMZW4kMyxcbiAgICBmb3JFYWNoOiBmb3JFYWNoJDFcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFF1YXRlcm5pb24gaW4gdGhlIGZvcm1hdCBYWVpXXG4gICAqIEBtb2R1bGUgcXVhdFxuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpZGVudGl0eSBxdWF0XG4gICAqXG4gICAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZSQyKCkge1xuICAgIHZhciBvdXQgPSBuZXcgQVJSQVlfVFlQRSg0KTtcblxuICAgIGlmIChBUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgICAgb3V0WzBdID0gMDtcbiAgICAgIG91dFsxXSA9IDA7XG4gICAgICBvdXRbMl0gPSAwO1xuICAgIH1cblxuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IGEgcXVhdCB0byB0aGUgaWRlbnRpdHkgcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBpZGVudGl0eSQxKG91dCkge1xuICAgIG91dFswXSA9IDA7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0cyBhIHF1YXQgZnJvbSB0aGUgZ2l2ZW4gYW5nbGUgYW5kIHJvdGF0aW9uIGF4aXMsXG4gICAqIHRoZW4gcmV0dXJucyBpdC5cbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBheGlzIHRoZSBheGlzIGFyb3VuZCB3aGljaCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHJhZCB0aGUgYW5nbGUgaW4gcmFkaWFuc1xuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqKi9cblxuICBmdW5jdGlvbiBzZXRBeGlzQW5nbGUob3V0LCBheGlzLCByYWQpIHtcbiAgICByYWQgPSByYWQgKiAwLjU7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIG91dFswXSA9IHMgKiBheGlzWzBdO1xuICAgIG91dFsxXSA9IHMgKiBheGlzWzFdO1xuICAgIG91dFsyXSA9IHMgKiBheGlzWzJdO1xuICAgIG91dFszXSA9IE1hdGguY29zKHJhZCk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2V0cyB0aGUgcm90YXRpb24gYXhpcyBhbmQgYW5nbGUgZm9yIGEgZ2l2ZW5cbiAgICogIHF1YXRlcm5pb24uIElmIGEgcXVhdGVybmlvbiBpcyBjcmVhdGVkIHdpdGhcbiAgICogIHNldEF4aXNBbmdsZSwgdGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gdGhlIHNhbWVcbiAgICogIHZhbHVlcyBhcyBwcm92aWRpZWQgaW4gdGhlIG9yaWdpbmFsIHBhcmFtZXRlciBsaXN0XG4gICAqICBPUiBmdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB2YWx1ZXMuXG4gICAqIEV4YW1wbGU6IFRoZSBxdWF0ZXJuaW9uIGZvcm1lZCBieSBheGlzIFswLCAwLCAxXSBhbmRcbiAgICogIGFuZ2xlIC05MCBpcyB0aGUgc2FtZSBhcyB0aGUgcXVhdGVybmlvbiBmb3JtZWQgYnlcbiAgICogIFswLCAwLCAxXSBhbmQgMjcwLiBUaGlzIG1ldGhvZCBmYXZvcnMgdGhlIGxhdHRlci5cbiAgICogQHBhcmFtICB7dmVjM30gb3V0X2F4aXMgIFZlY3RvciByZWNlaXZpbmcgdGhlIGF4aXMgb2Ygcm90YXRpb25cbiAgICogQHBhcmFtICB7UmVhZG9ubHlRdWF0fSBxICAgICBRdWF0ZXJuaW9uIHRvIGJlIGRlY29tcG9zZWRcbiAgICogQHJldHVybiB7TnVtYmVyfSAgICAgQW5nbGUsIGluIHJhZGlhbnMsIG9mIHRoZSByb3RhdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBnZXRBeGlzQW5nbGUob3V0X2F4aXMsIHEpIHtcbiAgICB2YXIgcmFkID0gTWF0aC5hY29zKHFbM10pICogMi4wO1xuICAgIHZhciBzID0gTWF0aC5zaW4ocmFkIC8gMi4wKTtcblxuICAgIGlmIChzID4gRVBTSUxPTikge1xuICAgICAgb3V0X2F4aXNbMF0gPSBxWzBdIC8gcztcbiAgICAgIG91dF9heGlzWzFdID0gcVsxXSAvIHM7XG4gICAgICBvdXRfYXhpc1syXSA9IHFbMl0gLyBzO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBzIGlzIHplcm8sIHJldHVybiBhbnkgYXhpcyAobm8gcm90YXRpb24gLSBheGlzIGRvZXMgbm90IG1hdHRlcilcbiAgICAgIG91dF9heGlzWzBdID0gMTtcbiAgICAgIG91dF9heGlzWzFdID0gMDtcbiAgICAgIG91dF9heGlzWzJdID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFkO1xuICB9XG4gIC8qKlxuICAgKiBHZXRzIHRoZSBhbmd1bGFyIGRpc3RhbmNlIGJldHdlZW4gdHdvIHVuaXQgcXVhdGVybmlvbnNcbiAgICpcbiAgICogQHBhcmFtICB7UmVhZG9ubHlRdWF0fSBhICAgICBPcmlnaW4gdW5pdCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSAge1JlYWRvbmx5UXVhdH0gYiAgICAgRGVzdGluYXRpb24gdW5pdCBxdWF0ZXJuaW9uXG4gICAqIEByZXR1cm4ge051bWJlcn0gICAgIEFuZ2xlLCBpbiByYWRpYW5zLCBiZXR3ZWVuIHRoZSB0d28gcXVhdGVybmlvbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0QW5nbGUoYSwgYikge1xuICAgIHZhciBkb3Rwcm9kdWN0ID0gZG90JDIoYSwgYik7XG4gICAgcmV0dXJuIE1hdGguYWNvcygyICogZG90cHJvZHVjdCAqIGRvdHByb2R1Y3QgLSAxKTtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbGllcyB0d28gcXVhdCdzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseSQyKG91dCwgYSwgYikge1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgdmFyIGJ4ID0gYlswXSxcbiAgICAgICAgYnkgPSBiWzFdLFxuICAgICAgICBieiA9IGJbMl0sXG4gICAgICAgIGJ3ID0gYlszXTtcbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFsxXSA9IGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYno7XG4gICAgb3V0WzJdID0gYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieCAtIGF5ICogYnkgLSBheiAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBxdWF0ZXJuaW9uIGJ5IHRoZSBnaXZlbiBhbmdsZSBhYm91dCB0aGUgWCBheGlzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byByb3RhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhZCBhbmdsZSAoaW4gcmFkaWFucykgdG8gcm90YXRlXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlWCQxKG91dCwgYSwgcmFkKSB7XG4gICAgcmFkICo9IDAuNTtcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV0sXG4gICAgICAgIGF6ID0gYVsyXSxcbiAgICAgICAgYXcgPSBhWzNdO1xuICAgIHZhciBieCA9IE1hdGguc2luKHJhZCksXG4gICAgICAgIGJ3ID0gTWF0aC5jb3MocmFkKTtcbiAgICBvdXRbMF0gPSBheCAqIGJ3ICsgYXcgKiBieDtcbiAgICBvdXRbMV0gPSBheSAqIGJ3ICsgYXogKiBieDtcbiAgICBvdXRbMl0gPSBheiAqIGJ3IC0gYXkgKiBieDtcbiAgICBvdXRbM10gPSBhdyAqIGJ3IC0gYXggKiBieDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgcXVhdGVybmlvbiBieSB0aGUgZ2l2ZW4gYW5nbGUgYWJvdXQgdGhlIFkgYXhpc1xuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCBxdWF0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXQgdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWQgYW5nbGUgKGluIHJhZGlhbnMpIHRvIHJvdGF0ZVxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZVkkMShvdXQsIGEsIHJhZCkge1xuICAgIHJhZCAqPSAwLjU7XG4gICAgdmFyIGF4ID0gYVswXSxcbiAgICAgICAgYXkgPSBhWzFdLFxuICAgICAgICBheiA9IGFbMl0sXG4gICAgICAgIGF3ID0gYVszXTtcbiAgICB2YXIgYnkgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBidyA9IE1hdGguY29zKHJhZCk7XG4gICAgb3V0WzBdID0gYXggKiBidyAtIGF6ICogYnk7XG4gICAgb3V0WzFdID0gYXkgKiBidyArIGF3ICogYnk7XG4gICAgb3V0WzJdID0gYXogKiBidyArIGF4ICogYnk7XG4gICAgb3V0WzNdID0gYXcgKiBidyAtIGF5ICogYnk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIHF1YXRlcm5pb24gYnkgdGhlIGdpdmVuIGFuZ2xlIGFib3V0IHRoZSBaIGF4aXNcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgcXVhdCByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkIGFuZ2xlIChpbiByYWRpYW5zKSB0byByb3RhdGVcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVaJDEob3V0LCBhLCByYWQpIHtcbiAgICByYWQgKj0gMC41O1xuICAgIHZhciBheCA9IGFbMF0sXG4gICAgICAgIGF5ID0gYVsxXSxcbiAgICAgICAgYXogPSBhWzJdLFxuICAgICAgICBhdyA9IGFbM107XG4gICAgdmFyIGJ6ID0gTWF0aC5zaW4ocmFkKSxcbiAgICAgICAgYncgPSBNYXRoLmNvcyhyYWQpO1xuICAgIG91dFswXSA9IGF4ICogYncgKyBheSAqIGJ6O1xuICAgIG91dFsxXSA9IGF5ICogYncgLSBheCAqIGJ6O1xuICAgIG91dFsyXSA9IGF6ICogYncgKyBhdyAqIGJ6O1xuICAgIG91dFszXSA9IGF3ICogYncgLSBheiAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIFcgY29tcG9uZW50IG9mIGEgcXVhdCBmcm9tIHRoZSBYLCBZLCBhbmQgWiBjb21wb25lbnRzLlxuICAgKiBBc3N1bWVzIHRoYXQgcXVhdGVybmlvbiBpcyAxIHVuaXQgaW4gbGVuZ3RoLlxuICAgKiBBbnkgZXhpc3RpbmcgVyBjb21wb25lbnQgd2lsbCBiZSBpZ25vcmVkLlxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgVyBjb21wb25lbnQgb2ZcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBjYWxjdWxhdGVXKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICBvdXRbMl0gPSB6O1xuICAgIG91dFszXSA9IE1hdGguc3FydChNYXRoLmFicygxLjAgLSB4ICogeCAtIHkgKiB5IC0geiAqIHopKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIGV4cG9uZW50aWFsIG9mIGEgdW5pdCBxdWF0ZXJuaW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgdGhlIGV4cG9uZW50aWFsIG9mXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZXhwKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV0sXG4gICAgICAgIHogPSBhWzJdLFxuICAgICAgICB3ID0gYVszXTtcbiAgICB2YXIgciA9IE1hdGguc3FydCh4ICogeCArIHkgKiB5ICsgeiAqIHopO1xuICAgIHZhciBldCA9IE1hdGguZXhwKHcpO1xuICAgIHZhciBzID0gciA+IDAgPyBldCAqIE1hdGguc2luKHIpIC8gciA6IDA7XG4gICAgb3V0WzBdID0geCAqIHM7XG4gICAgb3V0WzFdID0geSAqIHM7XG4gICAgb3V0WzJdID0geiAqIHM7XG4gICAgb3V0WzNdID0gZXQgKiBNYXRoLmNvcyhyKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdGhlIG5hdHVyYWwgbG9nYXJpdGhtIG9mIGEgdW5pdCBxdWF0ZXJuaW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgcXVhdCB0byBjYWxjdWxhdGUgdGhlIGV4cG9uZW50aWFsIG9mXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbG4ob3V0LCBhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXSxcbiAgICAgICAgeiA9IGFbMl0sXG4gICAgICAgIHcgPSBhWzNdO1xuICAgIHZhciByID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkgKyB6ICogeik7XG4gICAgdmFyIHQgPSByID4gMCA/IE1hdGguYXRhbjIociwgdykgLyByIDogMDtcbiAgICBvdXRbMF0gPSB4ICogdDtcbiAgICBvdXRbMV0gPSB5ICogdDtcbiAgICBvdXRbMl0gPSB6ICogdDtcbiAgICBvdXRbM10gPSAwLjUgKiBNYXRoLmxvZyh4ICogeCArIHkgKiB5ICsgeiAqIHogKyB3ICogdyk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlIHRoZSBzY2FsYXIgcG93ZXIgb2YgYSB1bml0IHF1YXRlcm5pb24uXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSB0aGUgZXhwb25lbnRpYWwgb2ZcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGIgYW1vdW50IHRvIHNjYWxlIHRoZSBxdWF0ZXJuaW9uIGJ5XG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcG93KG91dCwgYSwgYikge1xuICAgIGxuKG91dCwgYSk7XG4gICAgc2NhbGUkMihvdXQsIG91dCwgYik7XG4gICAgZXhwKG91dCwgb3V0KTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIHNwaGVyaWNhbCBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIHR3byBxdWF0XG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNsZXJwKG91dCwgYSwgYiwgdCkge1xuICAgIC8vIGJlbmNobWFya3M6XG4gICAgLy8gICAgaHR0cDovL2pzcGVyZi5jb20vcXVhdGVybmlvbi1zbGVycC1pbXBsZW1lbnRhdGlvbnNcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV0sXG4gICAgICAgIGF6ID0gYVsyXSxcbiAgICAgICAgYXcgPSBhWzNdO1xuICAgIHZhciBieCA9IGJbMF0sXG4gICAgICAgIGJ5ID0gYlsxXSxcbiAgICAgICAgYnogPSBiWzJdLFxuICAgICAgICBidyA9IGJbM107XG4gICAgdmFyIG9tZWdhLCBjb3NvbSwgc2lub20sIHNjYWxlMCwgc2NhbGUxOyAvLyBjYWxjIGNvc2luZVxuXG4gICAgY29zb20gPSBheCAqIGJ4ICsgYXkgKiBieSArIGF6ICogYnogKyBhdyAqIGJ3OyAvLyBhZGp1c3Qgc2lnbnMgKGlmIG5lY2Vzc2FyeSlcblxuICAgIGlmIChjb3NvbSA8IDAuMCkge1xuICAgICAgY29zb20gPSAtY29zb207XG4gICAgICBieCA9IC1ieDtcbiAgICAgIGJ5ID0gLWJ5O1xuICAgICAgYnogPSAtYno7XG4gICAgICBidyA9IC1idztcbiAgICB9IC8vIGNhbGN1bGF0ZSBjb2VmZmljaWVudHNcblxuXG4gICAgaWYgKDEuMCAtIGNvc29tID4gRVBTSUxPTikge1xuICAgICAgLy8gc3RhbmRhcmQgY2FzZSAoc2xlcnApXG4gICAgICBvbWVnYSA9IE1hdGguYWNvcyhjb3NvbSk7XG4gICAgICBzaW5vbSA9IE1hdGguc2luKG9tZWdhKTtcbiAgICAgIHNjYWxlMCA9IE1hdGguc2luKCgxLjAgLSB0KSAqIG9tZWdhKSAvIHNpbm9tO1xuICAgICAgc2NhbGUxID0gTWF0aC5zaW4odCAqIG9tZWdhKSAvIHNpbm9tO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBcImZyb21cIiBhbmQgXCJ0b1wiIHF1YXRlcm5pb25zIGFyZSB2ZXJ5IGNsb3NlXG4gICAgICAvLyAgLi4uIHNvIHdlIGNhbiBkbyBhIGxpbmVhciBpbnRlcnBvbGF0aW9uXG4gICAgICBzY2FsZTAgPSAxLjAgLSB0O1xuICAgICAgc2NhbGUxID0gdDtcbiAgICB9IC8vIGNhbGN1bGF0ZSBmaW5hbCB2YWx1ZXNcblxuXG4gICAgb3V0WzBdID0gc2NhbGUwICogYXggKyBzY2FsZTEgKiBieDtcbiAgICBvdXRbMV0gPSBzY2FsZTAgKiBheSArIHNjYWxlMSAqIGJ5O1xuICAgIG91dFsyXSA9IHNjYWxlMCAqIGF6ICsgc2NhbGUxICogYno7XG4gICAgb3V0WzNdID0gc2NhbGUwICogYXcgKyBzY2FsZTEgKiBidztcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSByYW5kb20gdW5pdCBxdWF0ZXJuaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJhbmRvbSQxKG91dCkge1xuICAgIC8vIEltcGxlbWVudGF0aW9uIG9mIGh0dHA6Ly9wbGFubmluZy5jcy51aXVjLmVkdS9ub2RlMTk4Lmh0bWxcbiAgICAvLyBUT0RPOiBDYWxsaW5nIHJhbmRvbSAzIHRpbWVzIGlzIHByb2JhYmx5IG5vdCB0aGUgZmFzdGVzdCBzb2x1dGlvblxuICAgIHZhciB1MSA9IFJBTkRPTSgpO1xuICAgIHZhciB1MiA9IFJBTkRPTSgpO1xuICAgIHZhciB1MyA9IFJBTkRPTSgpO1xuICAgIHZhciBzcXJ0MU1pbnVzVTEgPSBNYXRoLnNxcnQoMSAtIHUxKTtcbiAgICB2YXIgc3FydFUxID0gTWF0aC5zcXJ0KHUxKTtcbiAgICBvdXRbMF0gPSBzcXJ0MU1pbnVzVTEgKiBNYXRoLnNpbigyLjAgKiBNYXRoLlBJICogdTIpO1xuICAgIG91dFsxXSA9IHNxcnQxTWludXNVMSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiB1Mik7XG4gICAgb3V0WzJdID0gc3FydFUxICogTWF0aC5zaW4oMi4wICogTWF0aC5QSSAqIHUzKTtcbiAgICBvdXRbM10gPSBzcXJ0VTEgKiBNYXRoLmNvcygyLjAgKiBNYXRoLlBJICogdTMpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGludmVyc2Ugb2YgYSBxdWF0XG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0IHRvIGNhbGN1bGF0ZSBpbnZlcnNlIG9mXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaW52ZXJ0JDEob3V0LCBhKSB7XG4gICAgdmFyIGEwID0gYVswXSxcbiAgICAgICAgYTEgPSBhWzFdLFxuICAgICAgICBhMiA9IGFbMl0sXG4gICAgICAgIGEzID0gYVszXTtcbiAgICB2YXIgZG90ID0gYTAgKiBhMCArIGExICogYTEgKyBhMiAqIGEyICsgYTMgKiBhMztcbiAgICB2YXIgaW52RG90ID0gZG90ID8gMS4wIC8gZG90IDogMDsgLy8gVE9ETzogV291bGQgYmUgZmFzdGVyIHRvIHJldHVybiBbMCwwLDAsMF0gaW1tZWRpYXRlbHkgaWYgZG90ID09IDBcblxuICAgIG91dFswXSA9IC1hMCAqIGludkRvdDtcbiAgICBvdXRbMV0gPSAtYTEgKiBpbnZEb3Q7XG4gICAgb3V0WzJdID0gLWEyICogaW52RG90O1xuICAgIG91dFszXSA9IGEzICogaW52RG90O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGNvbmp1Z2F0ZSBvZiBhIHF1YXRcbiAgICogSWYgdGhlIHF1YXRlcm5pb24gaXMgbm9ybWFsaXplZCwgdGhpcyBmdW5jdGlvbiBpcyBmYXN0ZXIgdGhhbiBxdWF0LmludmVyc2UgYW5kIHByb2R1Y2VzIHRoZSBzYW1lIHJlc3VsdC5cbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXQgdG8gY2FsY3VsYXRlIGNvbmp1Z2F0ZSBvZlxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNvbmp1Z2F0ZSQxKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIHF1YXRlcm5pb24gZnJvbSB0aGUgZ2l2ZW4gM3gzIHJvdGF0aW9uIG1hdHJpeC5cbiAgICpcbiAgICogTk9URTogVGhlIHJlc3VsdGFudCBxdWF0ZXJuaW9uIGlzIG5vdCBub3JtYWxpemVkLCBzbyB5b3Ugc2hvdWxkIGJlIHN1cmVcbiAgICogdG8gcmVub3JtYWxpemUgdGhlIHF1YXRlcm5pb24geW91cnNlbGYgd2hlcmUgbmVjZXNzYXJ5LlxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDN9IG0gcm90YXRpb24gbWF0cml4XG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21NYXQzKG91dCwgbSkge1xuICAgIC8vIEFsZ29yaXRobSBpbiBLZW4gU2hvZW1ha2UncyBhcnRpY2xlIGluIDE5ODcgU0lHR1JBUEggY291cnNlIG5vdGVzXG4gICAgLy8gYXJ0aWNsZSBcIlF1YXRlcm5pb24gQ2FsY3VsdXMgYW5kIEZhc3QgQW5pbWF0aW9uXCIuXG4gICAgdmFyIGZUcmFjZSA9IG1bMF0gKyBtWzRdICsgbVs4XTtcbiAgICB2YXIgZlJvb3Q7XG5cbiAgICBpZiAoZlRyYWNlID4gMC4wKSB7XG4gICAgICAvLyB8d3wgPiAxLzIsIG1heSBhcyB3ZWxsIGNob29zZSB3ID4gMS8yXG4gICAgICBmUm9vdCA9IE1hdGguc3FydChmVHJhY2UgKyAxLjApOyAvLyAyd1xuXG4gICAgICBvdXRbM10gPSAwLjUgKiBmUm9vdDtcbiAgICAgIGZSb290ID0gMC41IC8gZlJvb3Q7IC8vIDEvKDR3KVxuXG4gICAgICBvdXRbMF0gPSAobVs1XSAtIG1bN10pICogZlJvb3Q7XG4gICAgICBvdXRbMV0gPSAobVs2XSAtIG1bMl0pICogZlJvb3Q7XG4gICAgICBvdXRbMl0gPSAobVsxXSAtIG1bM10pICogZlJvb3Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHx3fCA8PSAxLzJcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGlmIChtWzRdID4gbVswXSkgaSA9IDE7XG4gICAgICBpZiAobVs4XSA+IG1baSAqIDMgKyBpXSkgaSA9IDI7XG4gICAgICB2YXIgaiA9IChpICsgMSkgJSAzO1xuICAgICAgdmFyIGsgPSAoaSArIDIpICUgMztcbiAgICAgIGZSb290ID0gTWF0aC5zcXJ0KG1baSAqIDMgKyBpXSAtIG1baiAqIDMgKyBqXSAtIG1bayAqIDMgKyBrXSArIDEuMCk7XG4gICAgICBvdXRbaV0gPSAwLjUgKiBmUm9vdDtcbiAgICAgIGZSb290ID0gMC41IC8gZlJvb3Q7XG4gICAgICBvdXRbM10gPSAobVtqICogMyArIGtdIC0gbVtrICogMyArIGpdKSAqIGZSb290O1xuICAgICAgb3V0W2pdID0gKG1baiAqIDMgKyBpXSArIG1baSAqIDMgKyBqXSkgKiBmUm9vdDtcbiAgICAgIG91dFtrXSA9IChtW2sgKiAzICsgaV0gKyBtW2kgKiAzICsga10pICogZlJvb3Q7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIHF1YXRlcm5pb24gZnJvbSB0aGUgZ2l2ZW4gZXVsZXIgYW5nbGUgeCwgeSwgeiB1c2luZyB0aGUgcHJvdmlkZWQgaW50cmluc2ljIG9yZGVyIGZvciB0aGUgY29udmVyc2lvbi5cbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7eH0geCBBbmdsZSB0byByb3RhdGUgYXJvdW5kIFggYXhpcyBpbiBkZWdyZWVzLlxuICAgKiBAcGFyYW0ge3l9IHkgQW5nbGUgdG8gcm90YXRlIGFyb3VuZCBZIGF4aXMgaW4gZGVncmVlcy5cbiAgICogQHBhcmFtIHt6fSB6IEFuZ2xlIHRvIHJvdGF0ZSBhcm91bmQgWiBheGlzIGluIGRlZ3JlZXMuXG4gICAqIEBwYXJhbSB7J3p5eCd8J3h5eid8J3l4eid8J3l6eCd8J3p4eSd8J3p5eCd9IG9yZGVyIEludHJpbnNpYyBvcmRlciBmb3IgY29udmVyc2lvbiwgZGVmYXVsdCBpcyB6eXguXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21FdWxlcihvdXQsIHgsIHksIHopIHtcbiAgICB2YXIgb3JkZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gNCAmJiBhcmd1bWVudHNbNF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s0XSA6IEFOR0xFX09SREVSO1xuICAgIHZhciBoYWxmVG9SYWQgPSBNYXRoLlBJIC8gMzYwO1xuICAgIHggKj0gaGFsZlRvUmFkO1xuICAgIHogKj0gaGFsZlRvUmFkO1xuICAgIHkgKj0gaGFsZlRvUmFkO1xuICAgIHZhciBzeCA9IE1hdGguc2luKHgpO1xuICAgIHZhciBjeCA9IE1hdGguY29zKHgpO1xuICAgIHZhciBzeSA9IE1hdGguc2luKHkpO1xuICAgIHZhciBjeSA9IE1hdGguY29zKHkpO1xuICAgIHZhciBzeiA9IE1hdGguc2luKHopO1xuICAgIHZhciBjeiA9IE1hdGguY29zKHopO1xuXG4gICAgc3dpdGNoIChvcmRlcikge1xuICAgICAgY2FzZSBcInh5elwiOlxuICAgICAgICBvdXRbMF0gPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dFsxXSA9IGN4ICogc3kgKiBjeiAtIHN4ICogY3kgKiBzejtcbiAgICAgICAgb3V0WzJdID0gY3ggKiBjeSAqIHN6ICsgc3ggKiBzeSAqIGN6O1xuICAgICAgICBvdXRbM10gPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwieHp5XCI6XG4gICAgICAgIG91dFswXSA9IHN4ICogY3kgKiBjeiAtIGN4ICogc3kgKiBzejtcbiAgICAgICAgb3V0WzFdID0gY3ggKiBzeSAqIGN6IC0gc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXRbMl0gPSBjeCAqIGN5ICogc3ogKyBzeCAqIHN5ICogY3o7XG4gICAgICAgIG91dFszXSA9IGN4ICogY3kgKiBjeiArIHN4ICogc3kgKiBzejtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJ5eHpcIjpcbiAgICAgICAgb3V0WzBdID0gc3ggKiBjeSAqIGN6ICsgY3ggKiBzeSAqIHN6O1xuICAgICAgICBvdXRbMV0gPSBjeCAqIHN5ICogY3ogLSBzeCAqIGN5ICogc3o7XG4gICAgICAgIG91dFsyXSA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0WzNdID0gY3ggKiBjeSAqIGN6ICsgc3ggKiBzeSAqIHN6O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcInl6eFwiOlxuICAgICAgICBvdXRbMF0gPSBzeCAqIGN5ICogY3ogKyBjeCAqIHN5ICogc3o7XG4gICAgICAgIG91dFsxXSA9IGN4ICogc3kgKiBjeiArIHN4ICogY3kgKiBzejtcbiAgICAgICAgb3V0WzJdID0gY3ggKiBjeSAqIHN6IC0gc3ggKiBzeSAqIGN6O1xuICAgICAgICBvdXRbM10gPSBjeCAqIGN5ICogY3ogLSBzeCAqIHN5ICogc3o7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwienh5XCI6XG4gICAgICAgIG91dFswXSA9IHN4ICogY3kgKiBjeiAtIGN4ICogc3kgKiBzejtcbiAgICAgICAgb3V0WzFdID0gY3ggKiBzeSAqIGN6ICsgc3ggKiBjeSAqIHN6O1xuICAgICAgICBvdXRbMl0gPSBjeCAqIGN5ICogc3ogKyBzeCAqIHN5ICogY3o7XG4gICAgICAgIG91dFszXSA9IGN4ICogY3kgKiBjeiAtIHN4ICogc3kgKiBzejtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJ6eXhcIjpcbiAgICAgICAgb3V0WzBdID0gc3ggKiBjeSAqIGN6IC0gY3ggKiBzeSAqIHN6O1xuICAgICAgICBvdXRbMV0gPSBjeCAqIHN5ICogY3ogKyBzeCAqIGN5ICogc3o7XG4gICAgICAgIG91dFsyXSA9IGN4ICogY3kgKiBzeiAtIHN4ICogc3kgKiBjejtcbiAgICAgICAgb3V0WzNdID0gY3ggKiBjeSAqIGN6ICsgc3ggKiBzeSAqIHN6O1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGFuZ2xlIG9yZGVyICcgKyBvcmRlcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiBhIHF1YXRlcm5pb25cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBzdHIkMihhKSB7XG4gICAgcmV0dXJuIFwicXVhdChcIiArIGFbMF0gKyBcIiwgXCIgKyBhWzFdICsgXCIsIFwiICsgYVsyXSArIFwiLCBcIiArIGFbM10gKyBcIilcIjtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBxdWF0IGluaXRpYWxpemVkIHdpdGggdmFsdWVzIGZyb20gYW4gZXhpc3RpbmcgcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBxdWF0ZXJuaW9uIHRvIGNsb25lXG4gICAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgY2xvbmUkMiA9IGNsb25lJDM7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHF1YXQgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtxdWF0fSBhIG5ldyBxdWF0ZXJuaW9uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZnJvbVZhbHVlcyQyID0gZnJvbVZhbHVlcyQzO1xuICAvKipcbiAgICogQ29weSB0aGUgdmFsdWVzIGZyb20gb25lIHF1YXQgdG8gYW5vdGhlclxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXR9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgdGhlIHNvdXJjZSBxdWF0ZXJuaW9uXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBjb3B5JDIgPSBjb3B5JDM7XG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbXBvbmVudHMgb2YgYSBxdWF0IHRvIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6IFogY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3IFcgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzZXQkMiA9IHNldCQzO1xuICAvKipcbiAgICogQWRkcyB0d28gcXVhdCdzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGFkZCQyID0gYWRkJDM7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQubXVsdGlwbHl9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbXVsJDIgPSBtdWx0aXBseSQyO1xuICAvKipcbiAgICogU2NhbGVzIGEgcXVhdCBieSBhIHNjYWxhciBudW1iZXJcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc2NhbGUkMiA9IHNjYWxlJDM7XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0d28gcXVhdCdzXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZG90JDIgPSBkb3QkMztcbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gcXVhdCdzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHQgaW50ZXJwb2xhdGlvbiBhbW91bnQsIGluIHRoZSByYW5nZSBbMC0xXSwgYmV0d2VlbiB0aGUgdHdvIGlucHV0c1xuICAgKiBAcmV0dXJucyB7cXVhdH0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbGVycCQyID0gbGVycCQzO1xuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgcXVhdFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICAgKi9cblxuICB2YXIgbGVuZ3RoJDIgPSBsZW5ndGgkMztcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdC5sZW5ndGh9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbGVuJDIgPSBsZW5ndGgkMjtcbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgcXVhdFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzcXVhcmVkTGVuZ3RoJDIgPSBzcXVhcmVkTGVuZ3RoJDM7XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQuc3F1YXJlZExlbmd0aH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzcXJMZW4kMiA9IHNxdWFyZWRMZW5ndGgkMjtcbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSBhIHF1YXRcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0fSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIHF1YXRlcm5pb24gdG8gbm9ybWFsaXplXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBub3JtYWxpemUkMiA9IG5vcm1hbGl6ZSQzO1xuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcXVhdGVybmlvbnMgaGF2ZSBleGFjdGx5IHRoZSBzYW1lIGVsZW1lbnRzIGluIHRoZSBzYW1lIHBvc2l0aW9uICh3aGVuIGNvbXBhcmVkIHdpdGggPT09KVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSBUaGUgZmlyc3QgcXVhdGVybmlvbi5cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGIgVGhlIHNlY29uZCBxdWF0ZXJuaW9uLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5cbiAgdmFyIGV4YWN0RXF1YWxzJDIgPSBleGFjdEVxdWFscyQzO1xuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgcXVhdGVybmlvbnMgcG9pbnQgYXBwcm94aW1hdGVseSB0byB0aGUgc2FtZSBkaXJlY3Rpb24uXG4gICAqXG4gICAqIEJvdGggcXVhdGVybmlvbnMgYXJlIGFzc3VtZWQgdG8gYmUgdW5pdCBsZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBhIFRoZSBmaXJzdCB1bml0IHF1YXRlcm5pb24uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBiIFRoZSBzZWNvbmQgdW5pdCBxdWF0ZXJuaW9uLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgcXVhdGVybmlvbnMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVxdWFscyQyKGEsIGIpIHtcbiAgICByZXR1cm4gTWF0aC5hYnMoZG90JDMoYSwgYikpID49IDEgLSBFUFNJTE9OO1xuICB9XG4gIC8qKlxuICAgKiBTZXRzIGEgcXVhdGVybmlvbiB0byByZXByZXNlbnQgdGhlIHNob3J0ZXN0IHJvdGF0aW9uIGZyb20gb25lXG4gICAqIHZlY3RvciB0byBhbm90aGVyLlxuICAgKlxuICAgKiBCb3RoIHZlY3RvcnMgYXJlIGFzc3VtZWQgdG8gYmUgdW5pdCBsZW5ndGguXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvbi5cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IGEgdGhlIGluaXRpYWwgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSBiIHRoZSBkZXN0aW5hdGlvbiB2ZWN0b3JcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICB2YXIgcm90YXRpb25UbyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG1wdmVjMyA9IGNyZWF0ZSQ0KCk7XG4gICAgdmFyIHhVbml0VmVjMyA9IGZyb21WYWx1ZXMkNCgxLCAwLCAwKTtcbiAgICB2YXIgeVVuaXRWZWMzID0gZnJvbVZhbHVlcyQ0KDAsIDEsIDApO1xuICAgIHJldHVybiBmdW5jdGlvbiAob3V0LCBhLCBiKSB7XG4gICAgICB2YXIgZG90ID0gZG90JDQoYSwgYik7XG5cbiAgICAgIGlmIChkb3QgPCAtMC45OTk5OTkpIHtcbiAgICAgICAgY3Jvc3MkMih0bXB2ZWMzLCB4VW5pdFZlYzMsIGEpO1xuICAgICAgICBpZiAobGVuJDQodG1wdmVjMykgPCAwLjAwMDAwMSkgY3Jvc3MkMih0bXB2ZWMzLCB5VW5pdFZlYzMsIGEpO1xuICAgICAgICBub3JtYWxpemUkNCh0bXB2ZWMzLCB0bXB2ZWMzKTtcbiAgICAgICAgc2V0QXhpc0FuZ2xlKG91dCwgdG1wdmVjMywgTWF0aC5QSSk7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgICB9IGVsc2UgaWYgKGRvdCA+IDAuOTk5OTk5KSB7XG4gICAgICAgIG91dFswXSA9IDA7XG4gICAgICAgIG91dFsxXSA9IDA7XG4gICAgICAgIG91dFsyXSA9IDA7XG4gICAgICAgIG91dFszXSA9IDE7XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjcm9zcyQyKHRtcHZlYzMsIGEsIGIpO1xuICAgICAgICBvdXRbMF0gPSB0bXB2ZWMzWzBdO1xuICAgICAgICBvdXRbMV0gPSB0bXB2ZWMzWzFdO1xuICAgICAgICBvdXRbMl0gPSB0bXB2ZWMzWzJdO1xuICAgICAgICBvdXRbM10gPSAxICsgZG90O1xuICAgICAgICByZXR1cm4gbm9ybWFsaXplJDIob3V0LCBvdXQpO1xuICAgICAgfVxuICAgIH07XG4gIH0oKTtcbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgc3BoZXJpY2FsIGxpbmVhciBpbnRlcnBvbGF0aW9uIHdpdGggdHdvIGNvbnRyb2wgcG9pbnRzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdH0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGMgdGhlIHRoaXJkIG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IGQgdGhlIGZvdXJ0aCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB0IGludGVycG9sYXRpb24gYW1vdW50LCBpbiB0aGUgcmFuZ2UgWzAtMV0sIGJldHdlZW4gdGhlIHR3byBpbnB1dHNcbiAgICogQHJldHVybnMge3F1YXR9IG91dFxuICAgKi9cblxuICB2YXIgc3FsZXJwID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0ZW1wMSA9IGNyZWF0ZSQyKCk7XG4gICAgdmFyIHRlbXAyID0gY3JlYXRlJDIoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG91dCwgYSwgYiwgYywgZCwgdCkge1xuICAgICAgc2xlcnAodGVtcDEsIGEsIGQsIHQpO1xuICAgICAgc2xlcnAodGVtcDIsIGIsIGMsIHQpO1xuICAgICAgc2xlcnAob3V0LCB0ZW1wMSwgdGVtcDIsIDIgKiB0ICogKDEgLSB0KSk7XG4gICAgICByZXR1cm4gb3V0O1xuICAgIH07XG4gIH0oKTtcbiAgLyoqXG4gICAqIFNldHMgdGhlIHNwZWNpZmllZCBxdWF0ZXJuaW9uIHdpdGggdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuXG4gICAqIGF4ZXMuIEVhY2ggYXhpcyBpcyBhIHZlYzMgYW5kIGlzIGV4cGVjdGVkIHRvIGJlIHVuaXQgbGVuZ3RoIGFuZFxuICAgKiBwZXJwZW5kaWN1bGFyIHRvIGFsbCBvdGhlciBzcGVjaWZpZWQgYXhlcy5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHZpZXcgIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSB2aWV3aW5nIGRpcmVjdGlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gcmlnaHQgdGhlIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIGxvY2FsIFwicmlnaHRcIiBkaXJlY3Rpb25cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzN9IHVwICAgIHRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBsb2NhbCBcInVwXCIgZGlyZWN0aW9uXG4gICAqIEByZXR1cm5zIHtxdWF0fSBvdXRcbiAgICovXG5cbiAgdmFyIHNldEF4ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1hdHIgPSBjcmVhdGUkNigpO1xuICAgIHJldHVybiBmdW5jdGlvbiAob3V0LCB2aWV3LCByaWdodCwgdXApIHtcbiAgICAgIG1hdHJbMF0gPSByaWdodFswXTtcbiAgICAgIG1hdHJbM10gPSByaWdodFsxXTtcbiAgICAgIG1hdHJbNl0gPSByaWdodFsyXTtcbiAgICAgIG1hdHJbMV0gPSB1cFswXTtcbiAgICAgIG1hdHJbNF0gPSB1cFsxXTtcbiAgICAgIG1hdHJbN10gPSB1cFsyXTtcbiAgICAgIG1hdHJbMl0gPSAtdmlld1swXTtcbiAgICAgIG1hdHJbNV0gPSAtdmlld1sxXTtcbiAgICAgIG1hdHJbOF0gPSAtdmlld1syXTtcbiAgICAgIHJldHVybiBub3JtYWxpemUkMihvdXQsIGZyb21NYXQzKG91dCwgbWF0cikpO1xuICAgIH07XG4gIH0oKTtcblxuICB2YXIgcXVhdCA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgY3JlYXRlOiBjcmVhdGUkMixcbiAgICBpZGVudGl0eTogaWRlbnRpdHkkMSxcbiAgICBzZXRBeGlzQW5nbGU6IHNldEF4aXNBbmdsZSxcbiAgICBnZXRBeGlzQW5nbGU6IGdldEF4aXNBbmdsZSxcbiAgICBnZXRBbmdsZTogZ2V0QW5nbGUsXG4gICAgbXVsdGlwbHk6IG11bHRpcGx5JDIsXG4gICAgcm90YXRlWDogcm90YXRlWCQxLFxuICAgIHJvdGF0ZVk6IHJvdGF0ZVkkMSxcbiAgICByb3RhdGVaOiByb3RhdGVaJDEsXG4gICAgY2FsY3VsYXRlVzogY2FsY3VsYXRlVyxcbiAgICBleHA6IGV4cCxcbiAgICBsbjogbG4sXG4gICAgcG93OiBwb3csXG4gICAgc2xlcnA6IHNsZXJwLFxuICAgIHJhbmRvbTogcmFuZG9tJDEsXG4gICAgaW52ZXJ0OiBpbnZlcnQkMSxcbiAgICBjb25qdWdhdGU6IGNvbmp1Z2F0ZSQxLFxuICAgIGZyb21NYXQzOiBmcm9tTWF0MyxcbiAgICBmcm9tRXVsZXI6IGZyb21FdWxlcixcbiAgICBzdHI6IHN0ciQyLFxuICAgIGNsb25lOiBjbG9uZSQyLFxuICAgIGZyb21WYWx1ZXM6IGZyb21WYWx1ZXMkMixcbiAgICBjb3B5OiBjb3B5JDIsXG4gICAgc2V0OiBzZXQkMixcbiAgICBhZGQ6IGFkZCQyLFxuICAgIG11bDogbXVsJDIsXG4gICAgc2NhbGU6IHNjYWxlJDIsXG4gICAgZG90OiBkb3QkMixcbiAgICBsZXJwOiBsZXJwJDIsXG4gICAgbGVuZ3RoOiBsZW5ndGgkMixcbiAgICBsZW46IGxlbiQyLFxuICAgIHNxdWFyZWRMZW5ndGg6IHNxdWFyZWRMZW5ndGgkMixcbiAgICBzcXJMZW46IHNxckxlbiQyLFxuICAgIG5vcm1hbGl6ZTogbm9ybWFsaXplJDIsXG4gICAgZXhhY3RFcXVhbHM6IGV4YWN0RXF1YWxzJDIsXG4gICAgZXF1YWxzOiBlcXVhbHMkMixcbiAgICByb3RhdGlvblRvOiByb3RhdGlvblRvLFxuICAgIHNxbGVycDogc3FsZXJwLFxuICAgIHNldEF4ZXM6IHNldEF4ZXNcbiAgfSk7XG5cbiAgLyoqXG4gICAqIER1YWwgUXVhdGVybmlvbjxicj5cbiAgICogRm9ybWF0OiBbcmVhbCwgZHVhbF08YnI+XG4gICAqIFF1YXRlcm5pb24gZm9ybWF0OiBYWVpXPGJyPlxuICAgKiBNYWtlIHN1cmUgdG8gaGF2ZSBub3JtYWxpemVkIGR1YWwgcXVhdGVybmlvbnMsIG90aGVyd2lzZSB0aGUgZnVuY3Rpb25zIG1heSBub3Qgd29yayBhcyBpbnRlbmRlZC48YnI+XG4gICAqIEBtb2R1bGUgcXVhdDJcbiAgICovXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaWRlbnRpdHkgZHVhbCBxdWF0XG4gICAqXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gYSBuZXcgZHVhbCBxdWF0ZXJuaW9uIFtyZWFsIC0+IHJvdGF0aW9uLCBkdWFsIC0+IHRyYW5zbGF0aW9uXVxuICAgKi9cblxuICBmdW5jdGlvbiBjcmVhdGUkMSgpIHtcbiAgICB2YXIgZHEgPSBuZXcgQVJSQVlfVFlQRSg4KTtcblxuICAgIGlmIChBUlJBWV9UWVBFICE9IEZsb2F0MzJBcnJheSkge1xuICAgICAgZHFbMF0gPSAwO1xuICAgICAgZHFbMV0gPSAwO1xuICAgICAgZHFbMl0gPSAwO1xuICAgICAgZHFbNF0gPSAwO1xuICAgICAgZHFbNV0gPSAwO1xuICAgICAgZHFbNl0gPSAwO1xuICAgICAgZHFbN10gPSAwO1xuICAgIH1cblxuICAgIGRxWzNdID0gMTtcbiAgICByZXR1cm4gZHE7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgcXVhdCBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHF1YXRlcm5pb25cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIGR1YWwgcXVhdGVybmlvbiB0byBjbG9uZVxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG5ldyBkdWFsIHF1YXRlcm5pb25cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNsb25lJDEoYSkge1xuICAgIHZhciBkcSA9IG5ldyBBUlJBWV9UWVBFKDgpO1xuICAgIGRxWzBdID0gYVswXTtcbiAgICBkcVsxXSA9IGFbMV07XG4gICAgZHFbMl0gPSBhWzJdO1xuICAgIGRxWzNdID0gYVszXTtcbiAgICBkcVs0XSA9IGFbNF07XG4gICAgZHFbNV0gPSBhWzVdO1xuICAgIGRxWzZdID0gYVs2XTtcbiAgICBkcVs3XSA9IGFbN107XG4gICAgcmV0dXJuIGRxO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGR1YWwgcXVhdCBpbml0aWFsaXplZCB3aXRoIHRoZSBnaXZlbiB2YWx1ZXNcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHgxIFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5MSBZIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gejEgWiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcxIFcgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4MiBYIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geTIgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHoyIFogY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3MiBXIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG5ldyBkdWFsIHF1YXRlcm5pb25cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21WYWx1ZXMkMSh4MSwgeTEsIHoxLCB3MSwgeDIsIHkyLCB6MiwgdzIpIHtcbiAgICB2YXIgZHEgPSBuZXcgQVJSQVlfVFlQRSg4KTtcbiAgICBkcVswXSA9IHgxO1xuICAgIGRxWzFdID0geTE7XG4gICAgZHFbMl0gPSB6MTtcbiAgICBkcVszXSA9IHcxO1xuICAgIGRxWzRdID0geDI7XG4gICAgZHFbNV0gPSB5MjtcbiAgICBkcVs2XSA9IHoyO1xuICAgIGRxWzddID0gdzI7XG4gICAgcmV0dXJuIGRxO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGR1YWwgcXVhdCBmcm9tIHRoZSBnaXZlbiB2YWx1ZXMgKHF1YXQgYW5kIHRyYW5zbGF0aW9uKVxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0geDEgWCBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkxIFkgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6MSBaIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gdzEgVyBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHgyIFggY29tcG9uZW50ICh0cmFuc2xhdGlvbilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkyIFkgY29tcG9uZW50ICh0cmFuc2xhdGlvbilcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHoyIFogY29tcG9uZW50ICh0cmFuc2xhdGlvbilcbiAgICogQHJldHVybnMge3F1YXQyfSBuZXcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBmcm9tUm90YXRpb25UcmFuc2xhdGlvblZhbHVlcyh4MSwgeTEsIHoxLCB3MSwgeDIsIHkyLCB6Mikge1xuICAgIHZhciBkcSA9IG5ldyBBUlJBWV9UWVBFKDgpO1xuICAgIGRxWzBdID0geDE7XG4gICAgZHFbMV0gPSB5MTtcbiAgICBkcVsyXSA9IHoxO1xuICAgIGRxWzNdID0gdzE7XG4gICAgdmFyIGF4ID0geDIgKiAwLjUsXG4gICAgICAgIGF5ID0geTIgKiAwLjUsXG4gICAgICAgIGF6ID0gejIgKiAwLjU7XG4gICAgZHFbNF0gPSBheCAqIHcxICsgYXkgKiB6MSAtIGF6ICogeTE7XG4gICAgZHFbNV0gPSBheSAqIHcxICsgYXogKiB4MSAtIGF4ICogejE7XG4gICAgZHFbNl0gPSBheiAqIHcxICsgYXggKiB5MSAtIGF5ICogeDE7XG4gICAgZHFbN10gPSAtYXggKiB4MSAtIGF5ICogeTEgLSBheiAqIHoxO1xuICAgIHJldHVybiBkcTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIGR1YWwgcXVhdCBmcm9tIGEgcXVhdGVybmlvbiBhbmQgYSB0cmFuc2xhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGR1YWwgcXVhdGVybmlvbiByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBhIG5vcm1hbGl6ZWQgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdCB0cmFuc2xhdGlvbiB2ZWN0b3JcbiAgICogQHJldHVybnMge3F1YXQyfSBkdWFsIHF1YXRlcm5pb24gcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgcSwgdCkge1xuICAgIHZhciBheCA9IHRbMF0gKiAwLjUsXG4gICAgICAgIGF5ID0gdFsxXSAqIDAuNSxcbiAgICAgICAgYXogPSB0WzJdICogMC41LFxuICAgICAgICBieCA9IHFbMF0sXG4gICAgICAgIGJ5ID0gcVsxXSxcbiAgICAgICAgYnogPSBxWzJdLFxuICAgICAgICBidyA9IHFbM107XG4gICAgb3V0WzBdID0gYng7XG4gICAgb3V0WzFdID0gYnk7XG4gICAgb3V0WzJdID0gYno7XG4gICAgb3V0WzNdID0gYnc7XG4gICAgb3V0WzRdID0gYXggKiBidyArIGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFs1XSA9IGF5ICogYncgKyBheiAqIGJ4IC0gYXggKiBiejtcbiAgICBvdXRbNl0gPSBheiAqIGJ3ICsgYXggKiBieSAtIGF5ICogYng7XG4gICAgb3V0WzddID0gLWF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZHVhbCBxdWF0IGZyb20gYSB0cmFuc2xhdGlvblxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGR1YWwgcXVhdGVybmlvbiByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gdCB0cmFuc2xhdGlvbiB2ZWN0b3JcbiAgICogQHJldHVybnMge3F1YXQyfSBkdWFsIHF1YXRlcm5pb24gcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21UcmFuc2xhdGlvbihvdXQsIHQpIHtcbiAgICBvdXRbMF0gPSAwO1xuICAgIG91dFsxXSA9IDA7XG4gICAgb3V0WzJdID0gMDtcbiAgICBvdXRbM10gPSAxO1xuICAgIG91dFs0XSA9IHRbMF0gKiAwLjU7XG4gICAgb3V0WzVdID0gdFsxXSAqIDAuNTtcbiAgICBvdXRbNl0gPSB0WzJdICogMC41O1xuICAgIG91dFs3XSA9IDA7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIGR1YWwgcXVhdCBmcm9tIGEgcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGR1YWwgcXVhdGVybmlvbiByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSB0aGUgcXVhdGVybmlvblxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IGR1YWwgcXVhdGVybmlvbiByZWNlaXZpbmcgb3BlcmF0aW9uIHJlc3VsdFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVJvdGF0aW9uKG91dCwgcSkge1xuICAgIG91dFswXSA9IHFbMF07XG4gICAgb3V0WzFdID0gcVsxXTtcbiAgICBvdXRbMl0gPSBxWzJdO1xuICAgIG91dFszXSA9IHFbM107XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIG91dFs2XSA9IDA7XG4gICAgb3V0WzddID0gMDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGR1YWwgcXVhdCBmcm9tIGEgbWF0cml4ICg0eDQpXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBhIHRoZSBtYXRyaXhcbiAgICogQHJldHVybnMge3F1YXQyfSBkdWFsIHF1YXQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGZyb21NYXQ0KG91dCwgYSkge1xuICAgIC8vVE9ETyBPcHRpbWl6ZSB0aGlzXG4gICAgdmFyIG91dGVyID0gY3JlYXRlJDIoKTtcbiAgICBnZXRSb3RhdGlvbihvdXRlciwgYSk7XG4gICAgdmFyIHQgPSBuZXcgQVJSQVlfVFlQRSgzKTtcbiAgICBnZXRUcmFuc2xhdGlvbiQxKHQsIGEpO1xuICAgIGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uKG91dCwgb3V0ZXIsIHQpO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENvcHkgdGhlIHZhbHVlcyBmcm9tIG9uZSBkdWFsIHF1YXQgdG8gYW5vdGhlclxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBzb3VyY2UgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBjb3B5JDEob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gYVswXTtcbiAgICBvdXRbMV0gPSBhWzFdO1xuICAgIG91dFsyXSA9IGFbMl07XG4gICAgb3V0WzNdID0gYVszXTtcbiAgICBvdXRbNF0gPSBhWzRdO1xuICAgIG91dFs1XSA9IGFbNV07XG4gICAgb3V0WzZdID0gYVs2XTtcbiAgICBvdXRbN10gPSBhWzddO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCBhIGR1YWwgcXVhdCB0byB0aGUgaWRlbnRpdHkgZHVhbCBxdWF0ZXJuaW9uXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaWRlbnRpdHkob3V0KSB7XG4gICAgb3V0WzBdID0gMDtcbiAgICBvdXRbMV0gPSAwO1xuICAgIG91dFsyXSA9IDA7XG4gICAgb3V0WzNdID0gMTtcbiAgICBvdXRbNF0gPSAwO1xuICAgIG91dFs1XSA9IDA7XG4gICAgb3V0WzZdID0gMDtcbiAgICBvdXRbN10gPSAwO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgY29tcG9uZW50cyBvZiBhIGR1YWwgcXVhdCB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtOdW1iZXJ9IHgxIFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5MSBZIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0gejEgWiBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHcxIFcgY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4MiBYIGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge051bWJlcn0geTIgWSBjb21wb25lbnRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHoyIFogY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB3MiBXIGNvbXBvbmVudFxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0JDEob3V0LCB4MSwgeTEsIHoxLCB3MSwgeDIsIHkyLCB6MiwgdzIpIHtcbiAgICBvdXRbMF0gPSB4MTtcbiAgICBvdXRbMV0gPSB5MTtcbiAgICBvdXRbMl0gPSB6MTtcbiAgICBvdXRbM10gPSB3MTtcbiAgICBvdXRbNF0gPSB4MjtcbiAgICBvdXRbNV0gPSB5MjtcbiAgICBvdXRbNl0gPSB6MjtcbiAgICBvdXRbN10gPSB3MjtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBHZXRzIHRoZSByZWFsIHBhcnQgb2YgYSBkdWFsIHF1YXRcbiAgICogQHBhcmFtICB7cXVhdH0gb3V0IHJlYWwgcGFydFxuICAgKiBAcGFyYW0gIHtSZWFkb25seVF1YXQyfSBhIER1YWwgUXVhdGVybmlvblxuICAgKiBAcmV0dXJuIHtxdWF0fSByZWFsIHBhcnRcbiAgICovXG5cbiAgdmFyIGdldFJlYWwgPSBjb3B5JDI7XG4gIC8qKlxuICAgKiBHZXRzIHRoZSBkdWFsIHBhcnQgb2YgYSBkdWFsIHF1YXRcbiAgICogQHBhcmFtICB7cXVhdH0gb3V0IGR1YWwgcGFydFxuICAgKiBAcGFyYW0gIHtSZWFkb25seVF1YXQyfSBhIER1YWwgUXVhdGVybmlvblxuICAgKiBAcmV0dXJuIHtxdWF0fSBkdWFsIHBhcnRcbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0RHVhbChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzRdO1xuICAgIG91dFsxXSA9IGFbNV07XG4gICAgb3V0WzJdID0gYVs2XTtcbiAgICBvdXRbM10gPSBhWzddO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFNldCB0aGUgcmVhbCBjb21wb25lbnQgb2YgYSBkdWFsIHF1YXQgdG8gdGhlIGdpdmVuIHF1YXRlcm5pb25cbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBhIHF1YXRlcm5pb24gcmVwcmVzZW50aW5nIHRoZSByZWFsIHBhcnRcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzZXRSZWFsID0gY29weSQyO1xuICAvKipcbiAgICogU2V0IHRoZSBkdWFsIGNvbXBvbmVudCBvZiBhIGR1YWwgcXVhdCB0byB0aGUgZ2l2ZW4gcXVhdGVybmlvblxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0fSBxIGEgcXVhdGVybmlvbiByZXByZXNlbnRpbmcgdGhlIGR1YWwgcGFydFxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0RHVhbChvdXQsIHEpIHtcbiAgICBvdXRbNF0gPSBxWzBdO1xuICAgIG91dFs1XSA9IHFbMV07XG4gICAgb3V0WzZdID0gcVsyXTtcbiAgICBvdXRbN10gPSBxWzNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdldHMgdGhlIHRyYW5zbGF0aW9uIG9mIGEgbm9ybWFsaXplZCBkdWFsIHF1YXRcbiAgICogQHBhcmFtICB7dmVjM30gb3V0IHRyYW5zbGF0aW9uXG4gICAqIEBwYXJhbSAge1JlYWRvbmx5UXVhdDJ9IGEgRHVhbCBRdWF0ZXJuaW9uIHRvIGJlIGRlY29tcG9zZWRcbiAgICogQHJldHVybiB7dmVjM30gdHJhbnNsYXRpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gZ2V0VHJhbnNsYXRpb24ob3V0LCBhKSB7XG4gICAgdmFyIGF4ID0gYVs0XSxcbiAgICAgICAgYXkgPSBhWzVdLFxuICAgICAgICBheiA9IGFbNl0sXG4gICAgICAgIGF3ID0gYVs3XSxcbiAgICAgICAgYnggPSAtYVswXSxcbiAgICAgICAgYnkgPSAtYVsxXSxcbiAgICAgICAgYnogPSAtYVsyXSxcbiAgICAgICAgYncgPSBhWzNdO1xuICAgIG91dFswXSA9IChheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5KSAqIDI7XG4gICAgb3V0WzFdID0gKGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnopICogMjtcbiAgICBvdXRbMl0gPSAoYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCkgKiAyO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zbGF0ZXMgYSBkdWFsIHF1YXQgYnkgdGhlIGdpdmVuIHZlY3RvclxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBkdWFsIHF1YXRlcm5pb24gdG8gdHJhbnNsYXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMzfSB2IHZlY3RvciB0byB0cmFuc2xhdGUgYnlcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKG91dCwgYSwgdikge1xuICAgIHZhciBheDEgPSBhWzBdLFxuICAgICAgICBheTEgPSBhWzFdLFxuICAgICAgICBhejEgPSBhWzJdLFxuICAgICAgICBhdzEgPSBhWzNdLFxuICAgICAgICBieDEgPSB2WzBdICogMC41LFxuICAgICAgICBieTEgPSB2WzFdICogMC41LFxuICAgICAgICBiejEgPSB2WzJdICogMC41LFxuICAgICAgICBheDIgPSBhWzRdLFxuICAgICAgICBheTIgPSBhWzVdLFxuICAgICAgICBhejIgPSBhWzZdLFxuICAgICAgICBhdzIgPSBhWzddO1xuICAgIG91dFswXSA9IGF4MTtcbiAgICBvdXRbMV0gPSBheTE7XG4gICAgb3V0WzJdID0gYXoxO1xuICAgIG91dFszXSA9IGF3MTtcbiAgICBvdXRbNF0gPSBhdzEgKiBieDEgKyBheTEgKiBiejEgLSBhejEgKiBieTEgKyBheDI7XG4gICAgb3V0WzVdID0gYXcxICogYnkxICsgYXoxICogYngxIC0gYXgxICogYnoxICsgYXkyO1xuICAgIG91dFs2XSA9IGF3MSAqIGJ6MSArIGF4MSAqIGJ5MSAtIGF5MSAqIGJ4MSArIGF6MjtcbiAgICBvdXRbN10gPSAtYXgxICogYngxIC0gYXkxICogYnkxIC0gYXoxICogYnoxICsgYXcyO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBkdWFsIHF1YXQgYXJvdW5kIHRoZSBYIGF4aXNcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZHVhbCBxdWF0ZXJuaW9uIHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge251bWJlcn0gcmFkIGhvdyBmYXIgc2hvdWxkIHRoZSByb3RhdGlvbiBiZVxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVYKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIGJ4ID0gLWFbMF0sXG4gICAgICAgIGJ5ID0gLWFbMV0sXG4gICAgICAgIGJ6ID0gLWFbMl0sXG4gICAgICAgIGJ3ID0gYVszXSxcbiAgICAgICAgYXggPSBhWzRdLFxuICAgICAgICBheSA9IGFbNV0sXG4gICAgICAgIGF6ID0gYVs2XSxcbiAgICAgICAgYXcgPSBhWzddLFxuICAgICAgICBheDEgPSBheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5LFxuICAgICAgICBheTEgPSBheSAqIGJ3ICsgYXcgKiBieSArIGF6ICogYnggLSBheCAqIGJ6LFxuICAgICAgICBhejEgPSBheiAqIGJ3ICsgYXcgKiBieiArIGF4ICogYnkgLSBheSAqIGJ4LFxuICAgICAgICBhdzEgPSBhdyAqIGJ3IC0gYXggKiBieCAtIGF5ICogYnkgLSBheiAqIGJ6O1xuICAgIHJvdGF0ZVgkMShvdXQsIGEsIHJhZCk7XG4gICAgYnggPSBvdXRbMF07XG4gICAgYnkgPSBvdXRbMV07XG4gICAgYnogPSBvdXRbMl07XG4gICAgYncgPSBvdXRbM107XG4gICAgb3V0WzRdID0gYXgxICogYncgKyBhdzEgKiBieCArIGF5MSAqIGJ6IC0gYXoxICogYnk7XG4gICAgb3V0WzVdID0gYXkxICogYncgKyBhdzEgKiBieSArIGF6MSAqIGJ4IC0gYXgxICogYno7XG4gICAgb3V0WzZdID0gYXoxICogYncgKyBhdzEgKiBieiArIGF4MSAqIGJ5IC0gYXkxICogYng7XG4gICAgb3V0WzddID0gYXcxICogYncgLSBheDEgKiBieCAtIGF5MSAqIGJ5IC0gYXoxICogYno7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIGR1YWwgcXVhdCBhcm91bmQgdGhlIFkgYXhpc1xuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBkdWFsIHF1YXRlcm5pb24gdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWQgaG93IGZhciBzaG91bGQgdGhlIHJvdGF0aW9uIGJlXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZVkob3V0LCBhLCByYWQpIHtcbiAgICB2YXIgYnggPSAtYVswXSxcbiAgICAgICAgYnkgPSAtYVsxXSxcbiAgICAgICAgYnogPSAtYVsyXSxcbiAgICAgICAgYncgPSBhWzNdLFxuICAgICAgICBheCA9IGFbNF0sXG4gICAgICAgIGF5ID0gYVs1XSxcbiAgICAgICAgYXogPSBhWzZdLFxuICAgICAgICBhdyA9IGFbN10sXG4gICAgICAgIGF4MSA9IGF4ICogYncgKyBhdyAqIGJ4ICsgYXkgKiBieiAtIGF6ICogYnksXG4gICAgICAgIGF5MSA9IGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYnosXG4gICAgICAgIGF6MSA9IGF6ICogYncgKyBhdyAqIGJ6ICsgYXggKiBieSAtIGF5ICogYngsXG4gICAgICAgIGF3MSA9IGF3ICogYncgLSBheCAqIGJ4IC0gYXkgKiBieSAtIGF6ICogYno7XG4gICAgcm90YXRlWSQxKG91dCwgYSwgcmFkKTtcbiAgICBieCA9IG91dFswXTtcbiAgICBieSA9IG91dFsxXTtcbiAgICBieiA9IG91dFsyXTtcbiAgICBidyA9IG91dFszXTtcbiAgICBvdXRbNF0gPSBheDEgKiBidyArIGF3MSAqIGJ4ICsgYXkxICogYnogLSBhejEgKiBieTtcbiAgICBvdXRbNV0gPSBheTEgKiBidyArIGF3MSAqIGJ5ICsgYXoxICogYnggLSBheDEgKiBiejtcbiAgICBvdXRbNl0gPSBhejEgKiBidyArIGF3MSAqIGJ6ICsgYXgxICogYnkgLSBheTEgKiBieDtcbiAgICBvdXRbN10gPSBhdzEgKiBidyAtIGF4MSAqIGJ4IC0gYXkxICogYnkgLSBhejEgKiBiejtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSb3RhdGVzIGEgZHVhbCBxdWF0IGFyb3VuZCB0aGUgWiBheGlzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIGR1YWwgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIGR1YWwgcXVhdGVybmlvbiB0byByb3RhdGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhZCBob3cgZmFyIHNob3VsZCB0aGUgcm90YXRpb24gYmVcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gcm90YXRlWihvdXQsIGEsIHJhZCkge1xuICAgIHZhciBieCA9IC1hWzBdLFxuICAgICAgICBieSA9IC1hWzFdLFxuICAgICAgICBieiA9IC1hWzJdLFxuICAgICAgICBidyA9IGFbM10sXG4gICAgICAgIGF4ID0gYVs0XSxcbiAgICAgICAgYXkgPSBhWzVdLFxuICAgICAgICBheiA9IGFbNl0sXG4gICAgICAgIGF3ID0gYVs3XSxcbiAgICAgICAgYXgxID0gYXggKiBidyArIGF3ICogYnggKyBheSAqIGJ6IC0gYXogKiBieSxcbiAgICAgICAgYXkxID0gYXkgKiBidyArIGF3ICogYnkgKyBheiAqIGJ4IC0gYXggKiBieixcbiAgICAgICAgYXoxID0gYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieCxcbiAgICAgICAgYXcxID0gYXcgKiBidyAtIGF4ICogYnggLSBheSAqIGJ5IC0gYXogKiBiejtcbiAgICByb3RhdGVaJDEob3V0LCBhLCByYWQpO1xuICAgIGJ4ID0gb3V0WzBdO1xuICAgIGJ5ID0gb3V0WzFdO1xuICAgIGJ6ID0gb3V0WzJdO1xuICAgIGJ3ID0gb3V0WzNdO1xuICAgIG91dFs0XSA9IGF4MSAqIGJ3ICsgYXcxICogYnggKyBheTEgKiBieiAtIGF6MSAqIGJ5O1xuICAgIG91dFs1XSA9IGF5MSAqIGJ3ICsgYXcxICogYnkgKyBhejEgKiBieCAtIGF4MSAqIGJ6O1xuICAgIG91dFs2XSA9IGF6MSAqIGJ3ICsgYXcxICogYnogKyBheDEgKiBieSAtIGF5MSAqIGJ4O1xuICAgIG91dFs3XSA9IGF3MSAqIGJ3IC0gYXgxICogYnggLSBheTEgKiBieSAtIGF6MSAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZXMgYSBkdWFsIHF1YXQgYnkgYSBnaXZlbiBxdWF0ZXJuaW9uIChhICogcSlcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZHVhbCBxdWF0ZXJuaW9uIHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdH0gcSBxdWF0ZXJuaW9uIHRvIHJvdGF0ZSBieVxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGVCeVF1YXRBcHBlbmQob3V0LCBhLCBxKSB7XG4gICAgdmFyIHF4ID0gcVswXSxcbiAgICAgICAgcXkgPSBxWzFdLFxuICAgICAgICBxeiA9IHFbMl0sXG4gICAgICAgIHF3ID0gcVszXSxcbiAgICAgICAgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV0sXG4gICAgICAgIGF6ID0gYVsyXSxcbiAgICAgICAgYXcgPSBhWzNdO1xuICAgIG91dFswXSA9IGF4ICogcXcgKyBhdyAqIHF4ICsgYXkgKiBxeiAtIGF6ICogcXk7XG4gICAgb3V0WzFdID0gYXkgKiBxdyArIGF3ICogcXkgKyBheiAqIHF4IC0gYXggKiBxejtcbiAgICBvdXRbMl0gPSBheiAqIHF3ICsgYXcgKiBxeiArIGF4ICogcXkgLSBheSAqIHF4O1xuICAgIG91dFszXSA9IGF3ICogcXcgLSBheCAqIHF4IC0gYXkgKiBxeSAtIGF6ICogcXo7XG4gICAgYXggPSBhWzRdO1xuICAgIGF5ID0gYVs1XTtcbiAgICBheiA9IGFbNl07XG4gICAgYXcgPSBhWzddO1xuICAgIG91dFs0XSA9IGF4ICogcXcgKyBhdyAqIHF4ICsgYXkgKiBxeiAtIGF6ICogcXk7XG4gICAgb3V0WzVdID0gYXkgKiBxdyArIGF3ICogcXkgKyBheiAqIHF4IC0gYXggKiBxejtcbiAgICBvdXRbNl0gPSBheiAqIHF3ICsgYXcgKiBxeiArIGF4ICogcXkgLSBheSAqIHF4O1xuICAgIG91dFs3XSA9IGF3ICogcXcgLSBheCAqIHF4IC0gYXkgKiBxeSAtIGF6ICogcXo7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIGR1YWwgcXVhdCBieSBhIGdpdmVuIHF1YXRlcm5pb24gKHEgKiBhKVxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBkdWFsIHF1YXRlcm5pb25cbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXR9IHEgcXVhdGVybmlvbiB0byByb3RhdGUgYnlcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBkdWFsIHF1YXRlcm5pb24gdG8gcm90YXRlXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZUJ5UXVhdFByZXBlbmQob3V0LCBxLCBhKSB7XG4gICAgdmFyIHF4ID0gcVswXSxcbiAgICAgICAgcXkgPSBxWzFdLFxuICAgICAgICBxeiA9IHFbMl0sXG4gICAgICAgIHF3ID0gcVszXSxcbiAgICAgICAgYnggPSBhWzBdLFxuICAgICAgICBieSA9IGFbMV0sXG4gICAgICAgIGJ6ID0gYVsyXSxcbiAgICAgICAgYncgPSBhWzNdO1xuICAgIG91dFswXSA9IHF4ICogYncgKyBxdyAqIGJ4ICsgcXkgKiBieiAtIHF6ICogYnk7XG4gICAgb3V0WzFdID0gcXkgKiBidyArIHF3ICogYnkgKyBxeiAqIGJ4IC0gcXggKiBiejtcbiAgICBvdXRbMl0gPSBxeiAqIGJ3ICsgcXcgKiBieiArIHF4ICogYnkgLSBxeSAqIGJ4O1xuICAgIG91dFszXSA9IHF3ICogYncgLSBxeCAqIGJ4IC0gcXkgKiBieSAtIHF6ICogYno7XG4gICAgYnggPSBhWzRdO1xuICAgIGJ5ID0gYVs1XTtcbiAgICBieiA9IGFbNl07XG4gICAgYncgPSBhWzddO1xuICAgIG91dFs0XSA9IHF4ICogYncgKyBxdyAqIGJ4ICsgcXkgKiBieiAtIHF6ICogYnk7XG4gICAgb3V0WzVdID0gcXkgKiBidyArIHF3ICogYnkgKyBxeiAqIGJ4IC0gcXggKiBiejtcbiAgICBvdXRbNl0gPSBxeiAqIGJ3ICsgcXcgKiBieiArIHF4ICogYnkgLSBxeSAqIGJ4O1xuICAgIG91dFs3XSA9IHF3ICogYncgLSBxeCAqIGJ4IC0gcXkgKiBieSAtIHF6ICogYno7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUm90YXRlcyBhIGR1YWwgcXVhdCBhcm91bmQgYSBnaXZlbiBheGlzLiBEb2VzIHRoZSBub3JtYWxpc2F0aW9uIGF1dG9tYXRpY2FsbHlcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZHVhbCBxdWF0ZXJuaW9uIHRvIHJvdGF0ZVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjM30gYXhpcyB0aGUgYXhpcyB0byByb3RhdGUgYXJvdW5kXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgaG93IGZhciB0aGUgcm90YXRpb24gc2hvdWxkIGJlXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJvdGF0ZUFyb3VuZEF4aXMob3V0LCBhLCBheGlzLCByYWQpIHtcbiAgICAvL1NwZWNpYWwgY2FzZSBmb3IgcmFkID0gMFxuICAgIGlmIChNYXRoLmFicyhyYWQpIDwgRVBTSUxPTikge1xuICAgICAgcmV0dXJuIGNvcHkkMShvdXQsIGEpO1xuICAgIH1cblxuICAgIHZhciBheGlzTGVuZ3RoID0gTWF0aC5oeXBvdChheGlzWzBdLCBheGlzWzFdLCBheGlzWzJdKTtcbiAgICByYWQgPSByYWQgKiAwLjU7XG4gICAgdmFyIHMgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBieCA9IHMgKiBheGlzWzBdIC8gYXhpc0xlbmd0aDtcbiAgICB2YXIgYnkgPSBzICogYXhpc1sxXSAvIGF4aXNMZW5ndGg7XG4gICAgdmFyIGJ6ID0gcyAqIGF4aXNbMl0gLyBheGlzTGVuZ3RoO1xuICAgIHZhciBidyA9IE1hdGguY29zKHJhZCk7XG4gICAgdmFyIGF4MSA9IGFbMF0sXG4gICAgICAgIGF5MSA9IGFbMV0sXG4gICAgICAgIGF6MSA9IGFbMl0sXG4gICAgICAgIGF3MSA9IGFbM107XG4gICAgb3V0WzBdID0gYXgxICogYncgKyBhdzEgKiBieCArIGF5MSAqIGJ6IC0gYXoxICogYnk7XG4gICAgb3V0WzFdID0gYXkxICogYncgKyBhdzEgKiBieSArIGF6MSAqIGJ4IC0gYXgxICogYno7XG4gICAgb3V0WzJdID0gYXoxICogYncgKyBhdzEgKiBieiArIGF4MSAqIGJ5IC0gYXkxICogYng7XG4gICAgb3V0WzNdID0gYXcxICogYncgLSBheDEgKiBieCAtIGF5MSAqIGJ5IC0gYXoxICogYno7XG4gICAgdmFyIGF4ID0gYVs0XSxcbiAgICAgICAgYXkgPSBhWzVdLFxuICAgICAgICBheiA9IGFbNl0sXG4gICAgICAgIGF3ID0gYVs3XTtcbiAgICBvdXRbNF0gPSBheCAqIGJ3ICsgYXcgKiBieCArIGF5ICogYnogLSBheiAqIGJ5O1xuICAgIG91dFs1XSA9IGF5ICogYncgKyBhdyAqIGJ5ICsgYXogKiBieCAtIGF4ICogYno7XG4gICAgb3V0WzZdID0gYXogKiBidyArIGF3ICogYnogKyBheCAqIGJ5IC0gYXkgKiBieDtcbiAgICBvdXRbN10gPSBhdyAqIGJ3IC0gYXggKiBieCAtIGF5ICogYnkgLSBheiAqIGJ6O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIGR1YWwgcXVhdCdzXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIGR1YWwgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkJDEob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYVswXSArIGJbMF07XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV07XG4gICAgb3V0WzJdID0gYVsyXSArIGJbMl07XG4gICAgb3V0WzNdID0gYVszXSArIGJbM107XG4gICAgb3V0WzRdID0gYVs0XSArIGJbNF07XG4gICAgb3V0WzVdID0gYVs1XSArIGJbNV07XG4gICAgb3V0WzZdID0gYVs2XSArIGJbNl07XG4gICAgb3V0WzddID0gYVs3XSArIGJbN107XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTXVsdGlwbGllcyB0d28gZHVhbCBxdWF0J3NcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG11bHRpcGx5JDEob3V0LCBhLCBiKSB7XG4gICAgdmFyIGF4MCA9IGFbMF0sXG4gICAgICAgIGF5MCA9IGFbMV0sXG4gICAgICAgIGF6MCA9IGFbMl0sXG4gICAgICAgIGF3MCA9IGFbM10sXG4gICAgICAgIGJ4MSA9IGJbNF0sXG4gICAgICAgIGJ5MSA9IGJbNV0sXG4gICAgICAgIGJ6MSA9IGJbNl0sXG4gICAgICAgIGJ3MSA9IGJbN10sXG4gICAgICAgIGF4MSA9IGFbNF0sXG4gICAgICAgIGF5MSA9IGFbNV0sXG4gICAgICAgIGF6MSA9IGFbNl0sXG4gICAgICAgIGF3MSA9IGFbN10sXG4gICAgICAgIGJ4MCA9IGJbMF0sXG4gICAgICAgIGJ5MCA9IGJbMV0sXG4gICAgICAgIGJ6MCA9IGJbMl0sXG4gICAgICAgIGJ3MCA9IGJbM107XG4gICAgb3V0WzBdID0gYXgwICogYncwICsgYXcwICogYngwICsgYXkwICogYnowIC0gYXowICogYnkwO1xuICAgIG91dFsxXSA9IGF5MCAqIGJ3MCArIGF3MCAqIGJ5MCArIGF6MCAqIGJ4MCAtIGF4MCAqIGJ6MDtcbiAgICBvdXRbMl0gPSBhejAgKiBidzAgKyBhdzAgKiBiejAgKyBheDAgKiBieTAgLSBheTAgKiBieDA7XG4gICAgb3V0WzNdID0gYXcwICogYncwIC0gYXgwICogYngwIC0gYXkwICogYnkwIC0gYXowICogYnowO1xuICAgIG91dFs0XSA9IGF4MCAqIGJ3MSArIGF3MCAqIGJ4MSArIGF5MCAqIGJ6MSAtIGF6MCAqIGJ5MSArIGF4MSAqIGJ3MCArIGF3MSAqIGJ4MCArIGF5MSAqIGJ6MCAtIGF6MSAqIGJ5MDtcbiAgICBvdXRbNV0gPSBheTAgKiBidzEgKyBhdzAgKiBieTEgKyBhejAgKiBieDEgLSBheDAgKiBiejEgKyBheTEgKiBidzAgKyBhdzEgKiBieTAgKyBhejEgKiBieDAgLSBheDEgKiBiejA7XG4gICAgb3V0WzZdID0gYXowICogYncxICsgYXcwICogYnoxICsgYXgwICogYnkxIC0gYXkwICogYngxICsgYXoxICogYncwICsgYXcxICogYnowICsgYXgxICogYnkwIC0gYXkxICogYngwO1xuICAgIG91dFs3XSA9IGF3MCAqIGJ3MSAtIGF4MCAqIGJ4MSAtIGF5MCAqIGJ5MSAtIGF6MCAqIGJ6MSArIGF3MSAqIGJ3MCAtIGF4MSAqIGJ4MCAtIGF5MSAqIGJ5MCAtIGF6MSAqIGJ6MDtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHF1YXQyLm11bHRpcGx5fVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIG11bCQxID0gbXVsdGlwbHkkMTtcbiAgLyoqXG4gICAqIFNjYWxlcyBhIGR1YWwgcXVhdCBieSBhIHNjYWxhciBudW1iZXJcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0XG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZHVhbCBxdWF0IHRvIHNjYWxlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBiIGFtb3VudCB0byBzY2FsZSB0aGUgZHVhbCBxdWF0IGJ5XG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICBmdW5jdGlvbiBzY2FsZSQxKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIG91dFsyXSA9IGFbMl0gKiBiO1xuICAgIG91dFszXSA9IGFbM10gKiBiO1xuICAgIG91dFs0XSA9IGFbNF0gKiBiO1xuICAgIG91dFs1XSA9IGFbNV0gKiBiO1xuICAgIG91dFs2XSA9IGFbNl0gKiBiO1xuICAgIG91dFs3XSA9IGFbN10gKiBiO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHR3byBkdWFsIHF1YXQncyAoVGhlIGRvdCBwcm9kdWN0IG9mIHRoZSByZWFsIHBhcnRzKVxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkb3QgcHJvZHVjdCBvZiBhIGFuZCBiXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZG90JDEgPSBkb3QkMjtcbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gZHVhbCBxdWF0cydzXG4gICAqIE5PVEU6IFRoZSByZXN1bHRpbmcgZHVhbCBxdWF0ZXJuaW9ucyB3b24ndCBhbHdheXMgYmUgbm9ybWFsaXplZCAoVGhlIGVycm9yIGlzIG1vc3Qgbm90aWNlYWJsZSB3aGVuIHQgPSAwLjUpXG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIGR1YWwgcXVhdFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAqIEByZXR1cm5zIHtxdWF0Mn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxlcnAkMShvdXQsIGEsIGIsIHQpIHtcbiAgICB2YXIgbXQgPSAxIC0gdDtcbiAgICBpZiAoZG90JDEoYSwgYikgPCAwKSB0ID0gLXQ7XG4gICAgb3V0WzBdID0gYVswXSAqIG10ICsgYlswXSAqIHQ7XG4gICAgb3V0WzFdID0gYVsxXSAqIG10ICsgYlsxXSAqIHQ7XG4gICAgb3V0WzJdID0gYVsyXSAqIG10ICsgYlsyXSAqIHQ7XG4gICAgb3V0WzNdID0gYVszXSAqIG10ICsgYlszXSAqIHQ7XG4gICAgb3V0WzRdID0gYVs0XSAqIG10ICsgYls0XSAqIHQ7XG4gICAgb3V0WzVdID0gYVs1XSAqIG10ICsgYls1XSAqIHQ7XG4gICAgb3V0WzZdID0gYVs2XSAqIG10ICsgYls2XSAqIHQ7XG4gICAgb3V0WzddID0gYVs3XSAqIG10ICsgYls3XSAqIHQ7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgaW52ZXJzZSBvZiBhIGR1YWwgcXVhdC4gSWYgdGhleSBhcmUgbm9ybWFsaXplZCwgY29uanVnYXRlIGlzIGNoZWFwZXJcbiAgICpcbiAgICogQHBhcmFtIHtxdWF0Mn0gb3V0IHRoZSByZWNlaXZpbmcgZHVhbCBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSBkdWFsIHF1YXQgdG8gY2FsY3VsYXRlIGludmVyc2Ugb2ZcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaW52ZXJ0KG91dCwgYSkge1xuICAgIHZhciBzcWxlbiA9IHNxdWFyZWRMZW5ndGgkMShhKTtcbiAgICBvdXRbMF0gPSAtYVswXSAvIHNxbGVuO1xuICAgIG91dFsxXSA9IC1hWzFdIC8gc3FsZW47XG4gICAgb3V0WzJdID0gLWFbMl0gLyBzcWxlbjtcbiAgICBvdXRbM10gPSBhWzNdIC8gc3FsZW47XG4gICAgb3V0WzRdID0gLWFbNF0gLyBzcWxlbjtcbiAgICBvdXRbNV0gPSAtYVs1XSAvIHNxbGVuO1xuICAgIG91dFs2XSA9IC1hWzZdIC8gc3FsZW47XG4gICAgb3V0WzddID0gYVs3XSAvIHNxbGVuO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIGNvbmp1Z2F0ZSBvZiBhIGR1YWwgcXVhdFxuICAgKiBJZiB0aGUgZHVhbCBxdWF0ZXJuaW9uIGlzIG5vcm1hbGl6ZWQsIHRoaXMgZnVuY3Rpb24gaXMgZmFzdGVyIHRoYW4gcXVhdDIuaW52ZXJzZSBhbmQgcHJvZHVjZXMgdGhlIHNhbWUgcmVzdWx0LlxuICAgKlxuICAgKiBAcGFyYW0ge3F1YXQyfSBvdXQgdGhlIHJlY2VpdmluZyBxdWF0ZXJuaW9uXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSBxdWF0IHRvIGNhbGN1bGF0ZSBjb25qdWdhdGUgb2ZcbiAgICogQHJldHVybnMge3F1YXQyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY29uanVnYXRlKG91dCwgYSkge1xuICAgIG91dFswXSA9IC1hWzBdO1xuICAgIG91dFsxXSA9IC1hWzFdO1xuICAgIG91dFsyXSA9IC1hWzJdO1xuICAgIG91dFszXSA9IGFbM107XG4gICAgb3V0WzRdID0gLWFbNF07XG4gICAgb3V0WzVdID0gLWFbNV07XG4gICAgb3V0WzZdID0gLWFbNl07XG4gICAgb3V0WzddID0gYVs3XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgYSBkdWFsIHF1YXRcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIGR1YWwgcXVhdCB0byBjYWxjdWxhdGUgbGVuZ3RoIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IGxlbmd0aCBvZiBhXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgbGVuZ3RoJDEgPSBsZW5ndGgkMjtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgcXVhdDIubGVuZ3RofVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGxlbiQxID0gbGVuZ3RoJDE7XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiBhIGR1YWwgcXVhdFxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgZHVhbCBxdWF0IHRvIGNhbGN1bGF0ZSBzcXVhcmVkIGxlbmd0aCBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGxlbmd0aCBvZiBhXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3F1YXJlZExlbmd0aCQxID0gc3F1YXJlZExlbmd0aCQyO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayBxdWF0Mi5zcXVhcmVkTGVuZ3RofVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNxckxlbiQxID0gc3F1YXJlZExlbmd0aCQxO1xuICAvKipcbiAgICogTm9ybWFsaXplIGEgZHVhbCBxdWF0XG4gICAqXG4gICAqIEBwYXJhbSB7cXVhdDJ9IG91dCB0aGUgcmVjZWl2aW5nIGR1YWwgcXVhdGVybmlvblxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGEgZHVhbCBxdWF0ZXJuaW9uIHRvIG5vcm1hbGl6ZVxuICAgKiBAcmV0dXJucyB7cXVhdDJ9IG91dFxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplJDEob3V0LCBhKSB7XG4gICAgdmFyIG1hZ25pdHVkZSA9IHNxdWFyZWRMZW5ndGgkMShhKTtcblxuICAgIGlmIChtYWduaXR1ZGUgPiAwKSB7XG4gICAgICBtYWduaXR1ZGUgPSBNYXRoLnNxcnQobWFnbml0dWRlKTtcbiAgICAgIHZhciBhMCA9IGFbMF0gLyBtYWduaXR1ZGU7XG4gICAgICB2YXIgYTEgPSBhWzFdIC8gbWFnbml0dWRlO1xuICAgICAgdmFyIGEyID0gYVsyXSAvIG1hZ25pdHVkZTtcbiAgICAgIHZhciBhMyA9IGFbM10gLyBtYWduaXR1ZGU7XG4gICAgICB2YXIgYjAgPSBhWzRdO1xuICAgICAgdmFyIGIxID0gYVs1XTtcbiAgICAgIHZhciBiMiA9IGFbNl07XG4gICAgICB2YXIgYjMgPSBhWzddO1xuICAgICAgdmFyIGFfZG90X2IgPSBhMCAqIGIwICsgYTEgKiBiMSArIGEyICogYjIgKyBhMyAqIGIzO1xuICAgICAgb3V0WzBdID0gYTA7XG4gICAgICBvdXRbMV0gPSBhMTtcbiAgICAgIG91dFsyXSA9IGEyO1xuICAgICAgb3V0WzNdID0gYTM7XG4gICAgICBvdXRbNF0gPSAoYjAgLSBhMCAqIGFfZG90X2IpIC8gbWFnbml0dWRlO1xuICAgICAgb3V0WzVdID0gKGIxIC0gYTEgKiBhX2RvdF9iKSAvIG1hZ25pdHVkZTtcbiAgICAgIG91dFs2XSA9IChiMiAtIGEyICogYV9kb3RfYikgLyBtYWduaXR1ZGU7XG4gICAgICBvdXRbN10gPSAoYjMgLSBhMyAqIGFfZG90X2IpIC8gbWFnbml0dWRlO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSBkdWFsIHF1YXRlcm5pb25cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIGR1YWwgcXVhdGVybmlvbiB0byByZXByZXNlbnQgYXMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkdWFsIHF1YXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc3RyJDEoYSkge1xuICAgIHJldHVybiBcInF1YXQyKFwiICsgYVswXSArIFwiLCBcIiArIGFbMV0gKyBcIiwgXCIgKyBhWzJdICsgXCIsIFwiICsgYVszXSArIFwiLCBcIiArIGFbNF0gKyBcIiwgXCIgKyBhWzVdICsgXCIsIFwiICsgYVs2XSArIFwiLCBcIiArIGFbN10gKyBcIilcIjtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgZHVhbCBxdWF0ZXJuaW9ucyBoYXZlIGV4YWN0bHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24gKHdoZW4gY29tcGFyZWQgd2l0aCA9PT0pXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYSB0aGUgZmlyc3QgZHVhbCBxdWF0ZXJuaW9uLlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5UXVhdDJ9IGIgdGhlIHNlY29uZCBkdWFsIHF1YXRlcm5pb24uXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIHRoZSBkdWFsIHF1YXRlcm5pb25zIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBleGFjdEVxdWFscyQxKGEsIGIpIHtcbiAgICByZXR1cm4gYVswXSA9PT0gYlswXSAmJiBhWzFdID09PSBiWzFdICYmIGFbMl0gPT09IGJbMl0gJiYgYVszXSA9PT0gYlszXSAmJiBhWzRdID09PSBiWzRdICYmIGFbNV0gPT09IGJbNV0gJiYgYVs2XSA9PT0gYls2XSAmJiBhWzddID09PSBiWzddO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSBkdWFsIHF1YXRlcm5pb25zIGhhdmUgYXBwcm94aW1hdGVseSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVF1YXQyfSBhIHRoZSBmaXJzdCBkdWFsIHF1YXQuXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlRdWF0Mn0gYiB0aGUgc2Vjb25kIGR1YWwgcXVhdC5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgdGhlIGR1YWwgcXVhdHMgYXJlIGVxdWFsLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVxdWFscyQxKGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV0sXG4gICAgICAgIGEyID0gYVsyXSxcbiAgICAgICAgYTMgPSBhWzNdLFxuICAgICAgICBhNCA9IGFbNF0sXG4gICAgICAgIGE1ID0gYVs1XSxcbiAgICAgICAgYTYgPSBhWzZdLFxuICAgICAgICBhNyA9IGFbN107XG4gICAgdmFyIGIwID0gYlswXSxcbiAgICAgICAgYjEgPSBiWzFdLFxuICAgICAgICBiMiA9IGJbMl0sXG4gICAgICAgIGIzID0gYlszXSxcbiAgICAgICAgYjQgPSBiWzRdLFxuICAgICAgICBiNSA9IGJbNV0sXG4gICAgICAgIGI2ID0gYls2XSxcbiAgICAgICAgYjcgPSBiWzddO1xuICAgIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpICYmIE1hdGguYWJzKGEyIC0gYjIpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGEyKSwgTWF0aC5hYnMoYjIpKSAmJiBNYXRoLmFicyhhMyAtIGIzKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMyksIE1hdGguYWJzKGIzKSkgJiYgTWF0aC5hYnMoYTQgLSBiNCkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTQpLCBNYXRoLmFicyhiNCkpICYmIE1hdGguYWJzKGE1IC0gYjUpIDw9IEVQU0lMT04gKiBNYXRoLm1heCgxLjAsIE1hdGguYWJzKGE1KSwgTWF0aC5hYnMoYjUpKSAmJiBNYXRoLmFicyhhNiAtIGI2KSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhNiksIE1hdGguYWJzKGI2KSkgJiYgTWF0aC5hYnMoYTcgLSBiNykgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTcpLCBNYXRoLmFicyhiNykpO1xuICB9XG5cbiAgdmFyIHF1YXQyID0gLyojX19QVVJFX18qL09iamVjdC5mcmVlemUoe1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICBjcmVhdGU6IGNyZWF0ZSQxLFxuICAgIGNsb25lOiBjbG9uZSQxLFxuICAgIGZyb21WYWx1ZXM6IGZyb21WYWx1ZXMkMSxcbiAgICBmcm9tUm90YXRpb25UcmFuc2xhdGlvblZhbHVlczogZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25WYWx1ZXMsXG4gICAgZnJvbVJvdGF0aW9uVHJhbnNsYXRpb246IGZyb21Sb3RhdGlvblRyYW5zbGF0aW9uLFxuICAgIGZyb21UcmFuc2xhdGlvbjogZnJvbVRyYW5zbGF0aW9uLFxuICAgIGZyb21Sb3RhdGlvbjogZnJvbVJvdGF0aW9uLFxuICAgIGZyb21NYXQ0OiBmcm9tTWF0NCxcbiAgICBjb3B5OiBjb3B5JDEsXG4gICAgaWRlbnRpdHk6IGlkZW50aXR5LFxuICAgIHNldDogc2V0JDEsXG4gICAgZ2V0UmVhbDogZ2V0UmVhbCxcbiAgICBnZXREdWFsOiBnZXREdWFsLFxuICAgIHNldFJlYWw6IHNldFJlYWwsXG4gICAgc2V0RHVhbDogc2V0RHVhbCxcbiAgICBnZXRUcmFuc2xhdGlvbjogZ2V0VHJhbnNsYXRpb24sXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUsXG4gICAgcm90YXRlWDogcm90YXRlWCxcbiAgICByb3RhdGVZOiByb3RhdGVZLFxuICAgIHJvdGF0ZVo6IHJvdGF0ZVosXG4gICAgcm90YXRlQnlRdWF0QXBwZW5kOiByb3RhdGVCeVF1YXRBcHBlbmQsXG4gICAgcm90YXRlQnlRdWF0UHJlcGVuZDogcm90YXRlQnlRdWF0UHJlcGVuZCxcbiAgICByb3RhdGVBcm91bmRBeGlzOiByb3RhdGVBcm91bmRBeGlzLFxuICAgIGFkZDogYWRkJDEsXG4gICAgbXVsdGlwbHk6IG11bHRpcGx5JDEsXG4gICAgbXVsOiBtdWwkMSxcbiAgICBzY2FsZTogc2NhbGUkMSxcbiAgICBkb3Q6IGRvdCQxLFxuICAgIGxlcnA6IGxlcnAkMSxcbiAgICBpbnZlcnQ6IGludmVydCxcbiAgICBjb25qdWdhdGU6IGNvbmp1Z2F0ZSxcbiAgICBsZW5ndGg6IGxlbmd0aCQxLFxuICAgIGxlbjogbGVuJDEsXG4gICAgc3F1YXJlZExlbmd0aDogc3F1YXJlZExlbmd0aCQxLFxuICAgIHNxckxlbjogc3FyTGVuJDEsXG4gICAgbm9ybWFsaXplOiBub3JtYWxpemUkMSxcbiAgICBzdHI6IHN0ciQxLFxuICAgIGV4YWN0RXF1YWxzOiBleGFjdEVxdWFscyQxLFxuICAgIGVxdWFsczogZXF1YWxzJDFcbiAgfSk7XG5cbiAgLyoqXG4gICAqIDIgRGltZW5zaW9uYWwgVmVjdG9yXG4gICAqIEBtb2R1bGUgdmVjMlxuICAgKi9cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldywgZW1wdHkgdmVjMlxuICAgKlxuICAgKiBAcmV0dXJucyB7dmVjMn0gYSBuZXcgMkQgdmVjdG9yXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICB2YXIgb3V0ID0gbmV3IEFSUkFZX1RZUEUoMik7XG5cbiAgICBpZiAoQVJSQVlfVFlQRSAhPSBGbG9hdDMyQXJyYXkpIHtcbiAgICAgIG91dFswXSA9IDA7XG4gICAgICBvdXRbMV0gPSAwO1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgdmVjMiBpbml0aWFsaXplZCB3aXRoIHZhbHVlcyBmcm9tIGFuIGV4aXN0aW5nIHZlY3RvclxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2xvbmVcbiAgICogQHJldHVybnMge3ZlYzJ9IGEgbmV3IDJEIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBjbG9uZShhKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IGFbMF07XG4gICAgb3V0WzFdID0gYVsxXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IHZlYzIgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHt2ZWMyfSBhIG5ldyAyRCB2ZWN0b3JcbiAgICovXG5cbiAgZnVuY3Rpb24gZnJvbVZhbHVlcyh4LCB5KSB7XG4gICAgdmFyIG91dCA9IG5ldyBBUlJBWV9UWVBFKDIpO1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgZnJvbSBvbmUgdmVjMiB0byBhbm90aGVyXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBzb3VyY2UgdmVjdG9yXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gY29weShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB0aGUgZ2l2ZW4gdmFsdWVzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4IFggY29tcG9uZW50XG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IFkgY29tcG9uZW50XG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2V0KG91dCwgeCwgeSkge1xuICAgIG91dFswXSA9IHg7XG4gICAgb3V0WzFdID0geTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBBZGRzIHR3byB2ZWMyJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gYWRkKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gKyBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFN1YnRyYWN0cyB2ZWN0b3IgYiBmcm9tIHZlY3RvciBhXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHN1YnRyYWN0KG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLSBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLSBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE11bHRpcGxpZXMgdHdvIHZlYzInc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtdWx0aXBseShvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBhWzBdICogYlswXTtcbiAgICBvdXRbMV0gPSBhWzFdICogYlsxXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBEaXZpZGVzIHR3byB2ZWMyJ3NcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIGZpcnN0IG9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgdGhlIHNlY29uZCBvcGVyYW5kXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZGl2aWRlKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gLyBiWzBdO1xuICAgIG91dFsxXSA9IGFbMV0gLyBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIE1hdGguY2VpbCB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGNlaWxcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBjZWlsKG91dCwgYSkge1xuICAgIG91dFswXSA9IE1hdGguY2VpbChhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmNlaWwoYVsxXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTWF0aC5mbG9vciB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIGZsb29yXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gZmxvb3Iob3V0LCBhKSB7XG4gICAgb3V0WzBdID0gTWF0aC5mbG9vcihhWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLmZsb29yKGFbMV0pO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG1pbmltdW0gb2YgdHdvIHZlYzInc1xuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBtaW4ob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4oYVswXSwgYlswXSk7XG4gICAgb3V0WzFdID0gTWF0aC5taW4oYVsxXSwgYlsxXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgbWF4aW11bSBvZiB0d28gdmVjMidzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG1heChvdXQsIGEsIGIpIHtcbiAgICBvdXRbMF0gPSBNYXRoLm1heChhWzBdLCBiWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heChhWzFdLCBiWzFdKTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBNYXRoLnJvdW5kIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gcm91bmRcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3VuZChvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBNYXRoLnJvdW5kKGFbMF0pO1xuICAgIG91dFsxXSA9IE1hdGgucm91bmQoYVsxXSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogU2NhbGVzIGEgdmVjMiBieSBhIHNjYWxhciBudW1iZXJcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byBzY2FsZVxuICAgKiBAcGFyYW0ge051bWJlcn0gYiBhbW91bnQgdG8gc2NhbGUgdGhlIHZlY3RvciBieVxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHNjYWxlKG91dCwgYSwgYikge1xuICAgIG91dFswXSA9IGFbMF0gKiBiO1xuICAgIG91dFsxXSA9IGFbMV0gKiBiO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEFkZHMgdHdvIHZlYzIncyBhZnRlciBzY2FsaW5nIHRoZSBzZWNvbmQgb3BlcmFuZCBieSBhIHNjYWxhciB2YWx1ZVxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIHRoZSBhbW91bnQgdG8gc2NhbGUgYiBieSBiZWZvcmUgYWRkaW5nXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gc2NhbGVBbmRBZGQob3V0LCBhLCBiLCBzY2FsZSkge1xuICAgIG91dFswXSA9IGFbMF0gKyBiWzBdICogc2NhbGU7XG4gICAgb3V0WzFdID0gYVsxXSArIGJbMV0gKiBzY2FsZTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBkaXN0YW5jZSBiZXR3ZWVuIGEgYW5kIGJcbiAgICovXG5cbiAgZnVuY3Rpb24gZGlzdGFuY2UoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgICByZXR1cm4gTWF0aC5oeXBvdCh4LCB5KTtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRpYW4gZGlzdGFuY2UgYmV0d2VlbiB0d28gdmVjMidzXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBzcXVhcmVkIGRpc3RhbmNlIGJldHdlZW4gYSBhbmQgYlxuICAgKi9cblxuICBmdW5jdGlvbiBzcXVhcmVkRGlzdGFuY2UoYSwgYikge1xuICAgIHZhciB4ID0gYlswXSAtIGFbMF0sXG4gICAgICAgIHkgPSBiWzFdIC0gYVsxXTtcbiAgICByZXR1cm4geCAqIHggKyB5ICogeTtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIGEgdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIGxlbmd0aCBvZlxuICAgKiBAcmV0dXJucyB7TnVtYmVyfSBsZW5ndGggb2YgYVxuICAgKi9cblxuICBmdW5jdGlvbiBsZW5ndGgoYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgcmV0dXJuIE1hdGguaHlwb3QoeCwgeSk7XG4gIH1cbiAgLyoqXG4gICAqIENhbGN1bGF0ZXMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIGEgdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gY2FsY3VsYXRlIHNxdWFyZWQgbGVuZ3RoIG9mXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9IHNxdWFyZWQgbGVuZ3RoIG9mIGFcbiAgICovXG5cbiAgZnVuY3Rpb24gc3F1YXJlZExlbmd0aChhKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICByZXR1cm4geCAqIHggKyB5ICogeTtcbiAgfVxuICAvKipcbiAgICogTmVnYXRlcyB0aGUgY29tcG9uZW50cyBvZiBhIHZlYzJcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIG5lZ2F0ZVxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIG5lZ2F0ZShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAtYVswXTtcbiAgICBvdXRbMV0gPSAtYVsxXTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBpbnZlcnNlIG9mIHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gaW52ZXJ0XG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gaW52ZXJzZShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSAxLjAgLyBhWzBdO1xuICAgIG91dFsxXSA9IDEuMCAvIGFbMV07XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogTm9ybWFsaXplIGEgdmVjMlxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB2ZWN0b3IgdG8gbm9ybWFsaXplXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplKG91dCwgYSkge1xuICAgIHZhciB4ID0gYVswXSxcbiAgICAgICAgeSA9IGFbMV07XG4gICAgdmFyIGxlbiA9IHggKiB4ICsgeSAqIHk7XG5cbiAgICBpZiAobGVuID4gMCkge1xuICAgICAgLy9UT0RPOiBldmFsdWF0ZSB1c2Ugb2YgZ2xtX2ludnNxcnQgaGVyZT9cbiAgICAgIGxlbiA9IDEgLyBNYXRoLnNxcnQobGVuKTtcbiAgICB9XG5cbiAgICBvdXRbMF0gPSBhWzBdICogbGVuO1xuICAgIG91dFsxXSA9IGFbMV0gKiBsZW47XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlYzInc1xuICAgKlxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge051bWJlcn0gZG90IHByb2R1Y3Qgb2YgYSBhbmQgYlxuICAgKi9cblxuICBmdW5jdGlvbiBkb3QoYSwgYikge1xuICAgIHJldHVybiBhWzBdICogYlswXSArIGFbMV0gKiBiWzFdO1xuICB9XG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgY3Jvc3MgcHJvZHVjdCBvZiB0d28gdmVjMidzXG4gICAqIE5vdGUgdGhhdCB0aGUgY3Jvc3MgcHJvZHVjdCBtdXN0IGJ5IGRlZmluaXRpb24gcHJvZHVjZSBhIDNEIHZlY3RvclxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzN9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiB0aGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge3ZlYzN9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiBjcm9zcyhvdXQsIGEsIGIpIHtcbiAgICB2YXIgeiA9IGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF07XG4gICAgb3V0WzBdID0gb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSB6O1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFBlcmZvcm1zIGEgbGluZWFyIGludGVycG9sYXRpb24gYmV0d2VlbiB0d28gdmVjMidzXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSBmaXJzdCBvcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIHRoZSBzZWNvbmQgb3BlcmFuZFxuICAgKiBAcGFyYW0ge051bWJlcn0gdCBpbnRlcnBvbGF0aW9uIGFtb3VudCwgaW4gdGhlIHJhbmdlIFswLTFdLCBiZXR3ZWVuIHRoZSB0d28gaW5wdXRzXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gbGVycChvdXQsIGEsIGIsIHQpIHtcbiAgICB2YXIgYXggPSBhWzBdLFxuICAgICAgICBheSA9IGFbMV07XG4gICAgb3V0WzBdID0gYXggKyB0ICogKGJbMF0gLSBheCk7XG4gICAgb3V0WzFdID0gYXkgKyB0ICogKGJbMV0gLSBheSk7XG4gICAgcmV0dXJuIG91dDtcbiAgfVxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgcmFuZG9tIHZlY3RvciB3aXRoIHRoZSBnaXZlbiBzY2FsZVxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlXSBMZW5ndGggb2YgdGhlIHJlc3VsdGluZyB2ZWN0b3IuIElmIG9taXR0ZWQsIGEgdW5pdCB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHJhbmRvbShvdXQsIHNjYWxlKSB7XG4gICAgc2NhbGUgPSBzY2FsZSA9PT0gdW5kZWZpbmVkID8gMS4wIDogc2NhbGU7XG4gICAgdmFyIHIgPSBSQU5ET00oKSAqIDIuMCAqIE1hdGguUEk7XG4gICAgb3V0WzBdID0gTWF0aC5jb3MocikgKiBzY2FsZTtcbiAgICBvdXRbMV0gPSBNYXRoLnNpbihyKSAqIHNjYWxlO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgdGhlIHZlYzIgd2l0aCBhIG1hdDJcbiAgICpcbiAgICogQHBhcmFtIHt2ZWMyfSBvdXQgdGhlIHJlY2VpdmluZyB2ZWN0b3JcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdGhlIHZlY3RvciB0byB0cmFuc2Zvcm1cbiAgICogQHBhcmFtIHtSZWFkb25seU1hdDJ9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MihvdXQsIGEsIG0pIHtcbiAgICB2YXIgeCA9IGFbMF0sXG4gICAgICAgIHkgPSBhWzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHk7XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzNdICogeTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQyZFxuICAgKlxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCB0aGUgcmVjZWl2aW5nIHZlY3RvclxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSB0aGUgdmVjdG9yIHRvIHRyYW5zZm9ybVxuICAgKiBAcGFyYW0ge1JlYWRvbmx5TWF0MmR9IG0gbWF0cml4IHRvIHRyYW5zZm9ybSB3aXRoXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtTWF0MmQob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bM10gKiB5ICsgbVs1XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQzXG4gICAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQzfSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDMob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdLFxuICAgICAgICB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bM10gKiB5ICsgbVs2XTtcbiAgICBvdXRbMV0gPSBtWzFdICogeCArIG1bNF0gKiB5ICsgbVs3XTtcbiAgICByZXR1cm4gb3V0O1xuICB9XG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIHRoZSB2ZWMyIHdpdGggYSBtYXQ0XG4gICAqIDNyZCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzAnXG4gICAqIDR0aCB2ZWN0b3IgY29tcG9uZW50IGlzIGltcGxpY2l0bHkgJzEnXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIHRoZSB2ZWN0b3IgdG8gdHJhbnNmb3JtXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlNYXQ0fSBtIG1hdHJpeCB0byB0cmFuc2Zvcm0gd2l0aFxuICAgKiBAcmV0dXJucyB7dmVjMn0gb3V0XG4gICAqL1xuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybU1hdDQob3V0LCBhLCBtKSB7XG4gICAgdmFyIHggPSBhWzBdO1xuICAgIHZhciB5ID0gYVsxXTtcbiAgICBvdXRbMF0gPSBtWzBdICogeCArIG1bNF0gKiB5ICsgbVsxMl07XG4gICAgb3V0WzFdID0gbVsxXSAqIHggKyBtWzVdICogeSArIG1bMTNdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJvdGF0ZSBhIDJEIHZlY3RvclxuICAgKiBAcGFyYW0ge3ZlYzJ9IG91dCBUaGUgcmVjZWl2aW5nIHZlYzJcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIHZlYzIgcG9pbnQgdG8gcm90YXRlXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIFRoZSBvcmlnaW4gb2YgdGhlIHJvdGF0aW9uXG4gICAqIEBwYXJhbSB7TnVtYmVyfSByYWQgVGhlIGFuZ2xlIG9mIHJvdGF0aW9uIGluIHJhZGlhbnNcbiAgICogQHJldHVybnMge3ZlYzJ9IG91dFxuICAgKi9cblxuICBmdW5jdGlvbiByb3RhdGUob3V0LCBhLCBiLCByYWQpIHtcbiAgICAvL1RyYW5zbGF0ZSBwb2ludCB0byB0aGUgb3JpZ2luXG4gICAgdmFyIHAwID0gYVswXSAtIGJbMF0sXG4gICAgICAgIHAxID0gYVsxXSAtIGJbMV0sXG4gICAgICAgIHNpbkMgPSBNYXRoLnNpbihyYWQpLFxuICAgICAgICBjb3NDID0gTWF0aC5jb3MocmFkKTsgLy9wZXJmb3JtIHJvdGF0aW9uIGFuZCB0cmFuc2xhdGUgdG8gY29ycmVjdCBwb3NpdGlvblxuXG4gICAgb3V0WzBdID0gcDAgKiBjb3NDIC0gcDEgKiBzaW5DICsgYlswXTtcbiAgICBvdXRbMV0gPSBwMCAqIHNpbkMgKyBwMSAqIGNvc0MgKyBiWzFdO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIEdldCB0aGUgYW5nbGUgYmV0d2VlbiB0d28gMkQgdmVjdG9yc1xuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYSBUaGUgZmlyc3Qgb3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlYWRvbmx5VmVjMn0gYiBUaGUgc2Vjb25kIG9wZXJhbmRcbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAgICovXG5cbiAgZnVuY3Rpb24gYW5nbGUoYSwgYikge1xuICAgIHZhciB4MSA9IGFbMF0sXG4gICAgICAgIHkxID0gYVsxXSxcbiAgICAgICAgeDIgPSBiWzBdLFxuICAgICAgICB5MiA9IGJbMV0sXG4gICAgICAgIC8vIG1hZyBpcyB0aGUgcHJvZHVjdCBvZiB0aGUgbWFnbml0dWRlcyBvZiBhIGFuZCBiXG4gICAgbWFnID0gTWF0aC5zcXJ0KCh4MSAqIHgxICsgeTEgKiB5MSkgKiAoeDIgKiB4MiArIHkyICogeTIpKSxcbiAgICAgICAgLy8gbWFnICYmLi4gc2hvcnQgY2lyY3VpdHMgaWYgbWFnID09IDBcbiAgICBjb3NpbmUgPSBtYWcgJiYgKHgxICogeDIgKyB5MSAqIHkyKSAvIG1hZzsgLy8gTWF0aC5taW4oTWF0aC5tYXgoY29zaW5lLCAtMSksIDEpIGNsYW1wcyB0aGUgY29zaW5lIGJldHdlZW4gLTEgYW5kIDFcblxuICAgIHJldHVybiBNYXRoLmFjb3MoTWF0aC5taW4oTWF0aC5tYXgoY29zaW5lLCAtMSksIDEpKTtcbiAgfVxuICAvKipcbiAgICogU2V0IHRoZSBjb21wb25lbnRzIG9mIGEgdmVjMiB0byB6ZXJvXG4gICAqXG4gICAqIEBwYXJhbSB7dmVjMn0gb3V0IHRoZSByZWNlaXZpbmcgdmVjdG9yXG4gICAqIEByZXR1cm5zIHt2ZWMyfSBvdXRcbiAgICovXG5cbiAgZnVuY3Rpb24gemVybyhvdXQpIHtcbiAgICBvdXRbMF0gPSAwLjA7XG4gICAgb3V0WzFdID0gMC4wO1xuICAgIHJldHVybiBvdXQ7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybnMgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgYSB2ZWN0b3JcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgdmVjdG9yIHRvIHJlcHJlc2VudCBhcyBhIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICAgKi9cblxuICBmdW5jdGlvbiBzdHIoYSkge1xuICAgIHJldHVybiBcInZlYzIoXCIgKyBhWzBdICsgXCIsIFwiICsgYVsxXSArIFwiKVwiO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgb3Igbm90IHRoZSB2ZWN0b3JzIGV4YWN0bHkgaGF2ZSB0aGUgc2FtZSBlbGVtZW50cyBpbiB0aGUgc2FtZSBwb3NpdGlvbiAod2hlbiBjb21wYXJlZCB3aXRoID09PSlcbiAgICpcbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGEgVGhlIGZpcnN0IHZlY3Rvci5cbiAgICogQHBhcmFtIHtSZWFkb25seVZlYzJ9IGIgVGhlIHNlY29uZCB2ZWN0b3IuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIHRoZSB2ZWN0b3JzIGFyZSBlcXVhbCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cblxuICBmdW5jdGlvbiBleGFjdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIGFbMF0gPT09IGJbMF0gJiYgYVsxXSA9PT0gYlsxXTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdmVjdG9ycyBoYXZlIGFwcHJveGltYXRlbHkgdGhlIHNhbWUgZWxlbWVudHMgaW4gdGhlIHNhbWUgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBhIFRoZSBmaXJzdCB2ZWN0b3IuXG4gICAqIEBwYXJhbSB7UmVhZG9ubHlWZWMyfSBiIFRoZSBzZWNvbmQgdmVjdG9yLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmVjdG9ycyBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5cbiAgZnVuY3Rpb24gZXF1YWxzKGEsIGIpIHtcbiAgICB2YXIgYTAgPSBhWzBdLFxuICAgICAgICBhMSA9IGFbMV07XG4gICAgdmFyIGIwID0gYlswXSxcbiAgICAgICAgYjEgPSBiWzFdO1xuICAgIHJldHVybiBNYXRoLmFicyhhMCAtIGIwKSA8PSBFUFNJTE9OICogTWF0aC5tYXgoMS4wLCBNYXRoLmFicyhhMCksIE1hdGguYWJzKGIwKSkgJiYgTWF0aC5hYnMoYTEgLSBiMSkgPD0gRVBTSUxPTiAqIE1hdGgubWF4KDEuMCwgTWF0aC5hYnMoYTEpLCBNYXRoLmFicyhiMSkpO1xuICB9XG4gIC8qKlxuICAgKiBBbGlhcyBmb3Ige0BsaW5rIHZlYzIubGVuZ3RofVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGxlbiA9IGxlbmd0aDtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zdWJ0cmFjdH1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBzdWIgPSBzdWJ0cmFjdDtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5tdWx0aXBseX1cbiAgICogQGZ1bmN0aW9uXG4gICAqL1xuXG4gIHZhciBtdWwgPSBtdWx0aXBseTtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5kaXZpZGV9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZGl2ID0gZGl2aWRlO1xuICAvKipcbiAgICogQWxpYXMgZm9yIHtAbGluayB2ZWMyLmRpc3RhbmNlfVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkRGlzdGFuY2V9XG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgc3FyRGlzdCA9IHNxdWFyZWREaXN0YW5jZTtcbiAgLyoqXG4gICAqIEFsaWFzIGZvciB7QGxpbmsgdmVjMi5zcXVhcmVkTGVuZ3RofVxuICAgKiBAZnVuY3Rpb25cbiAgICovXG5cbiAgdmFyIHNxckxlbiA9IHNxdWFyZWRMZW5ndGg7XG4gIC8qKlxuICAgKiBQZXJmb3JtIHNvbWUgb3BlcmF0aW9uIG92ZXIgYW4gYXJyYXkgb2YgdmVjMnMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGEgdGhlIGFycmF5IG9mIHZlY3RvcnMgdG8gaXRlcmF0ZSBvdmVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBzdHJpZGUgTnVtYmVyIG9mIGVsZW1lbnRzIGJldHdlZW4gdGhlIHN0YXJ0IG9mIGVhY2ggdmVjMi4gSWYgMCBhc3N1bWVzIHRpZ2h0bHkgcGFja2VkXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgTnVtYmVyIG9mIGVsZW1lbnRzIHRvIHNraXAgYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50IE51bWJlciBvZiB2ZWMycyB0byBpdGVyYXRlIG92ZXIuIElmIDAgaXRlcmF0ZXMgb3ZlciBlbnRpcmUgYXJyYXlcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCB2ZWN0b3IgaW4gdGhlIGFycmF5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbYXJnXSBhZGRpdGlvbmFsIGFyZ3VtZW50IHRvIHBhc3MgdG8gZm5cbiAgICogQHJldHVybnMge0FycmF5fSBhXG4gICAqIEBmdW5jdGlvblxuICAgKi9cblxuICB2YXIgZm9yRWFjaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmVjID0gY3JlYXRlKCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChhLCBzdHJpZGUsIG9mZnNldCwgY291bnQsIGZuLCBhcmcpIHtcbiAgICAgIHZhciBpLCBsO1xuXG4gICAgICBpZiAoIXN0cmlkZSkge1xuICAgICAgICBzdHJpZGUgPSAyO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW9mZnNldCkge1xuICAgICAgICBvZmZzZXQgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgbCA9IE1hdGgubWluKGNvdW50ICogc3RyaWRlICsgb2Zmc2V0LCBhLmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsID0gYS5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIGZvciAoaSA9IG9mZnNldDsgaSA8IGw7IGkgKz0gc3RyaWRlKSB7XG4gICAgICAgIHZlY1swXSA9IGFbaV07XG4gICAgICAgIHZlY1sxXSA9IGFbaSArIDFdO1xuICAgICAgICBmbih2ZWMsIHZlYywgYXJnKTtcbiAgICAgICAgYVtpXSA9IHZlY1swXTtcbiAgICAgICAgYVtpICsgMV0gPSB2ZWNbMV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhO1xuICAgIH07XG4gIH0oKTtcblxuICB2YXIgdmVjMiA9IC8qI19fUFVSRV9fKi9PYmplY3QuZnJlZXplKHtcbiAgICBfX3Byb3RvX186IG51bGwsXG4gICAgY3JlYXRlOiBjcmVhdGUsXG4gICAgY2xvbmU6IGNsb25lLFxuICAgIGZyb21WYWx1ZXM6IGZyb21WYWx1ZXMsXG4gICAgY29weTogY29weSxcbiAgICBzZXQ6IHNldCxcbiAgICBhZGQ6IGFkZCxcbiAgICBzdWJ0cmFjdDogc3VidHJhY3QsXG4gICAgbXVsdGlwbHk6IG11bHRpcGx5LFxuICAgIGRpdmlkZTogZGl2aWRlLFxuICAgIGNlaWw6IGNlaWwsXG4gICAgZmxvb3I6IGZsb29yLFxuICAgIG1pbjogbWluLFxuICAgIG1heDogbWF4LFxuICAgIHJvdW5kOiByb3VuZCxcbiAgICBzY2FsZTogc2NhbGUsXG4gICAgc2NhbGVBbmRBZGQ6IHNjYWxlQW5kQWRkLFxuICAgIGRpc3RhbmNlOiBkaXN0YW5jZSxcbiAgICBzcXVhcmVkRGlzdGFuY2U6IHNxdWFyZWREaXN0YW5jZSxcbiAgICBsZW5ndGg6IGxlbmd0aCxcbiAgICBzcXVhcmVkTGVuZ3RoOiBzcXVhcmVkTGVuZ3RoLFxuICAgIG5lZ2F0ZTogbmVnYXRlLFxuICAgIGludmVyc2U6IGludmVyc2UsXG4gICAgbm9ybWFsaXplOiBub3JtYWxpemUsXG4gICAgZG90OiBkb3QsXG4gICAgY3Jvc3M6IGNyb3NzLFxuICAgIGxlcnA6IGxlcnAsXG4gICAgcmFuZG9tOiByYW5kb20sXG4gICAgdHJhbnNmb3JtTWF0MjogdHJhbnNmb3JtTWF0MixcbiAgICB0cmFuc2Zvcm1NYXQyZDogdHJhbnNmb3JtTWF0MmQsXG4gICAgdHJhbnNmb3JtTWF0MzogdHJhbnNmb3JtTWF0MyxcbiAgICB0cmFuc2Zvcm1NYXQ0OiB0cmFuc2Zvcm1NYXQ0LFxuICAgIHJvdGF0ZTogcm90YXRlLFxuICAgIGFuZ2xlOiBhbmdsZSxcbiAgICB6ZXJvOiB6ZXJvLFxuICAgIHN0cjogc3RyLFxuICAgIGV4YWN0RXF1YWxzOiBleGFjdEVxdWFscyxcbiAgICBlcXVhbHM6IGVxdWFscyxcbiAgICBsZW46IGxlbixcbiAgICBzdWI6IHN1YixcbiAgICBtdWw6IG11bCxcbiAgICBkaXY6IGRpdixcbiAgICBkaXN0OiBkaXN0LFxuICAgIHNxckRpc3Q6IHNxckRpc3QsXG4gICAgc3FyTGVuOiBzcXJMZW4sXG4gICAgZm9yRWFjaDogZm9yRWFjaFxuICB9KTtcblxuICBleHBvcnRzLmdsTWF0cml4ID0gY29tbW9uO1xuICBleHBvcnRzLm1hdDIgPSBtYXQyO1xuICBleHBvcnRzLm1hdDJkID0gbWF0MmQ7XG4gIGV4cG9ydHMubWF0MyA9IG1hdDM7XG4gIGV4cG9ydHMubWF0NCA9IG1hdDQ7XG4gIGV4cG9ydHMucXVhdCA9IHF1YXQ7XG4gIGV4cG9ydHMucXVhdDIgPSBxdWF0MjtcbiAgZXhwb3J0cy52ZWMyID0gdmVjMjtcbiAgZXhwb3J0cy52ZWMzID0gdmVjMztcbiAgZXhwb3J0cy52ZWM0ID0gdmVjNDtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgeyBDSFVOS19TSVpFLCBNQVBfSEVJR0hULCBNQVBfU0laRSwgTk9JU0VfQ09VTlQgfSBmcm9tIFwiLi9jb25maWdcIjtcbmltcG9ydCBHYW1lIGZyb20gXCIuL0dhbWVcIjtcblxuaW1wb3J0ICogYXMgZ2xNYXRyaXggZnJvbSAnLi9nbE1hdHJpeC9nbC1tYXRyaXgnO1xuXG5jb25zdCBmcHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZwc1wiKSBhcyBIVE1MRGl2RWxlbWVudDtcblxuY29uc3QgbWFwX2hlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdNQVBfSEVJR0hUJykgYXMgSFRNTERpdkVsZW1lbnQ7XG5jb25zdCBjaHVua19zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ0NIVU5LX1NJWkUnKSBhcyBIVE1MRGl2RWxlbWVudDtcbmNvbnN0IG1hcF9zaXplID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ01BUF9TSVpFJykgYXMgSFRNTERpdkVsZW1lbnQ7XG5jb25zdCBub2lzZV9jb3VudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdOT0lTRV9DT1VOVCcpIGFzIEhUTUxEaXZFbGVtZW50O1xuXG5tYXBfaGVpZ2h0LmlubmVyVGV4dCA9IE1BUF9IRUlHSFQudG9TdHJpbmcoKTtcbmNodW5rX3NpemUuaW5uZXJUZXh0ID0gQ0hVTktfU0laRS50b1N0cmluZygpO1xubWFwX3NpemUuaW5uZXJUZXh0ID0gTUFQX1NJWkUudG9TdHJpbmcoKTtcbm5vaXNlX2NvdW50LmlubmVyVGV4dCA9IE5PSVNFX0NPVU5ULnRvU3RyaW5nKCk7XG5cbmxldCBwcmV2ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5sZXQgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbmNvbnN0IGdhbWUgPSBuZXcgR2FtZSgnY2FudmFzJyk7XG5cbmZ1bmN0aW9uIHRpY2soKSB7XG5cdG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG5cdGZwcy5pbm5lclRleHQgPSAoMTAwMCAvIChub3cgLSBwcmV2KSkudG9GaXhlZCgwKTtcblxuXHRwcmV2ID0gbm93O1xuXG5cdGdhbWUucmVuZGVyZXIubW9kZWxNYXRyaXggPSBnbE1hdHJpeC5tYXQ0LmNyZWF0ZSgpO1xuXHRnbE1hdHJpeC5tYXQ0LmlkZW50aXR5KGdhbWUucmVuZGVyZXIubW9kZWxNYXRyaXgpO1xuXG5cdGdsTWF0cml4Lm1hdDQucm90YXRlKGdhbWUucmVuZGVyZXIubW9kZWxNYXRyaXgsIGdhbWUucmVuZGVyZXIubW9kZWxNYXRyaXgsIE1hdGguUEkgLyAzLCBbMSwgMCwgMF0pO1xuXHRnbE1hdHJpeC5tYXQ0LnJvdGF0ZShnYW1lLnJlbmRlcmVyLm1vZGVsTWF0cml4LCBnYW1lLnJlbmRlcmVyLm1vZGVsTWF0cml4LCAoK25ldyBEYXRlKCkpIC8gMTAwMDAsIFswLCAxLCAwXSk7XG5cdGdsTWF0cml4Lm1hdDQudHJhbnNsYXRlKGdhbWUucmVuZGVyZXIubW9kZWxNYXRyaXgsIGdhbWUucmVuZGVyZXIubW9kZWxNYXRyaXgsIFswLCAtTUFQX0hFSUdIVCAqIDIsIDBdKTtcblx0Z2xNYXRyaXgubWF0NC50cmFuc2xhdGUoZ2FtZS5yZW5kZXJlci5tb2RlbE1hdHJpeCwgZ2FtZS5yZW5kZXJlci5tb2RlbE1hdHJpeCwgWy1NQVBfU0laRSAqIENIVU5LX1NJWkUgLyAyLCAwLCAtTUFQX1NJWkUgKiBDSFVOS19TSVpFIC8gMl0pO1xuXG5cdGdhbWUuZHJhdygpO1xuXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbn1cblxucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9