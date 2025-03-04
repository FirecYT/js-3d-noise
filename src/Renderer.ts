import Mash from "./Mash";
import Transform from "./Transform";
import * as glMatrix from './glMatrix/gl-matrix';

export default class Renderer {
	private gl: WebGLRenderingContext;

	private vertexShader: WebGLShader;
	private fragmentShader: WebGLShader;

	private program: WebGLProgram;

	public modelMatrix: any;
	public perspectiveMatrix: any;

	private positionAttribute: GLint;
	private offsetUniform: WebGLUniformLocation;
	private modelUniform: WebGLUniformLocation;
	private perspectiveUniform: WebGLUniformLocation;

	private known: {[key: string]: {
		verticesBuffer: WebGLBuffer,
		indicesBuffer: WebGLBuffer
	}} = {};

	constructor(canvas: HTMLCanvasElement) {
		this.gl = canvas.getContext('webgl', {
			desynchronized: true,
			preserveDrawingBuffer: true
		}) as WebGLRenderingContext;

		this.vertexShader = this.createShader(this.gl.VERTEX_SHADER, `
			attribute vec4 a_position;

			uniform vec3 u_offset;

			uniform mat4 u_model_matrix;
			uniform mat4 u_perspective_matrix;

			varying vec4 v_position;
			varying float v_distance;

			void main() {
				gl_Position = u_perspective_matrix * u_model_matrix * (a_position + vec4(u_offset, 0));

				v_distance = length(gl_Position);
				v_position = a_position;
			}
		`);
		this.fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, `
			precision mediump float;

			varying vec4 v_position;
			varying float v_distance;

			void main() {
				float factor = 1. - v_distance / 75.;

				vec3 coord = v_position.xyz;
				vec3 moded = fract(coord);

				float _color = .125;

				if (moded.x < 0.1 || moded.x > 0.9) {
					_color *= 2.;
				}

				if (moded.y < 0.1 || moded.y > 0.9) {
					_color *= 2.;
				}

				if (moded.z < 0.1 || moded.z > 0.9) {
					_color *= 2.;
				}

				gl_FragColor = vec4(vec3(_color) * factor, 1.);
			}
		`);

		this.program = this.createProgram(this.vertexShader, this.fragmentShader);

		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

		this.modelMatrix = glMatrix.mat4.create();
		this.perspectiveMatrix = glMatrix.mat4.create();

		glMatrix.mat4.perspective(this.perspectiveMatrix, 1.04, this.gl.canvas.width / this.gl.canvas.height, 0.1, 100.0);

		glMatrix.mat4.identity(this.modelMatrix);

		glMatrix.mat4.translate(this.modelMatrix, this.modelMatrix, [0, -64, 0]);
		glMatrix.mat4.rotate(this.modelMatrix, this.modelMatrix, Math.PI / 4 + Math.PI / 2, [0, 1, 0]);

		this.gl.useProgram(this.program);

		this.positionAttribute = this.gl.getAttribLocation(this.program, 'a_position');
		this.offsetUniform = this.gl.getUniformLocation(this.program, 'u_offset') as WebGLUniformLocation;
		this.modelUniform = this.gl.getUniformLocation(this.program, 'u_model_matrix') as WebGLUniformLocation;
		this.perspectiveUniform = this.gl.getUniformLocation(this.program, 'u_perspective_matrix') as WebGLUniformLocation;

		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
	}

	drawCube(transform: Transform, mash: Mash) {
		if (!this.known[mash.toString()]) {
			const verticesBuffer = this.gl.createBuffer() as WebGLBuffer;
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, verticesBuffer);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(mash.vertices), this.gl.STATIC_DRAW);

			const indicesBuffer = this.gl.createBuffer() as WebGLBuffer;
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
			this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mash.indices), this.gl.STATIC_DRAW);

			this.known[mash.toString()] = {verticesBuffer, indicesBuffer};
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.known[mash.toString()].verticesBuffer);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.known[mash.toString()].indicesBuffer);

		this.gl.uniform3fv(this.offsetUniform, [transform.position.x, transform.position.y, transform.position.z]);
		this.gl.uniformMatrix4fv(this.modelUniform, false, this.modelMatrix);
		this.gl.uniformMatrix4fv(this.perspectiveUniform, false, this.perspectiveMatrix);

		this.gl.enableVertexAttribArray(this.positionAttribute);
		this.gl.vertexAttribPointer(this.positionAttribute, 3, this.gl.FLOAT, false, 0, 0);

		this.gl.drawElements(this.gl.TRIANGLES, mash.indices.length, this.gl.UNSIGNED_SHORT, 0);
	}

	clearScreen() {
		this.gl.clearColor(0, 0, 0, 1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	private createShader(type: number, source: string): WebGLShader {
		const shader = this.gl.createShader(type) as WebGLShader;

		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);

		const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);

		if (success) {
			return shader as WebGLShader;
		}

		console.log(this.gl.getShaderInfoLog(shader));
		this.gl.deleteShader(shader);

		throw new Error("Ошибка при инициализации шейдера");
	}

	private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
		const program = this.gl.createProgram() as WebGLProgram;

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
