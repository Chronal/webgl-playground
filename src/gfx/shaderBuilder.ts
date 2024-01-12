import { Model, ModelData, ShaderData } from "./util.js"
import { Shader } from "./shader.js"
import { Mat4 } from 'gl-matrix';

export class ShaderBuilder {
	glCtx: WebGL2RenderingContext;
	vertShader!: WebGLShader;
	fragShader!: WebGLShader;

	attributes!: Map<string, GLint>;
	uniforms!: Map<string, WebGLUniformLocation>;

	model!: any;

	constructor(gl: WebGL2RenderingContext) {
		this.glCtx = gl;
		// this.view.identity();
		// this.persp.identity();
	}

	private compileShader(shaderSrc: string, shaderType: number): WebGLShader {
		let shader = this.glCtx.createShader(shaderType);

		if (shader == null) {
			throw new Error("Failed to create a shader");
		}

		this.glCtx.shaderSource(shader, shaderSrc);
		this.glCtx.compileShader(shader);

		if (!this.glCtx.getShaderParameter(shader, this.glCtx.COMPILE_STATUS)) {
			let infoLog = this.glCtx.getShaderInfoLog(shader);
			this.glCtx.deleteShader(shader);
			throw new Error(`Failed to compile shader.\n${infoLog}`);
		}

		return shader;
	}

	addVertShader(vertSrc: string): ShaderBuilder {
		this.vertShader = this.compileShader(vertSrc, this.glCtx.VERTEX_SHADER);
		return this;
	}

	addFragShader(fragSrc: string): ShaderBuilder {
		this.fragShader = this.compileShader(fragSrc, this.glCtx.FRAGMENT_SHADER);
		return this;
	}

	addModel(model: Model): ShaderBuilder {
		let vertBuf = this.glCtx.createBuffer();

		if (vertBuf == null) {
			throw new Error("Failed to create buffer");
		}

		this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, vertBuf);
		this.glCtx.bufferData(this.glCtx.ARRAY_BUFFER, model.vertArray, this.glCtx.STATIC_DRAW);

		// let colBuf = this.glCtx.createBuffer();
		// if (colBuf == null) {
		// 	throw new Error("Failed to create buffer");
		// }
		// this.glCtx.bindBuffer(this.glCtx.ARRAY_BUFFER, colBuf);
		// this.glCtx.bufferData(this.glCtx.ARRAY_BUFFER, model.colourArray, this.glCtx.STATIC_DRAW);

		let data: ModelData = {
			vertBuf : vertBuf!,
			// colBuf : colBuf!,
			model: model.model,
		}

		this.model = data;

		return this;
	}

	addUniformMat() {
	}

	addViewMat(view: Mat4): ShaderBuilder {
		//this.view = view;
		return this;
	}

	addPerspMat(persp: Mat4): ShaderBuilder {
		//this.persp = persp;
		return this;
	}

	build(): Shader {
		let prog = this.glCtx.createProgram();

		if (prog == null) {
			throw new Error("Failed to create shader program");
		}

		this.glCtx.attachShader(prog!, this.vertShader);
		this.glCtx.attachShader(prog!, this.fragShader);
		this.glCtx.linkProgram(prog);

		if (!this.glCtx.getProgramParameter(prog, this.glCtx.LINK_STATUS)) {
			const infoLog = this.glCtx.getProgramInfoLog(prog);
			this.glCtx.deleteProgram(prog);
			throw new Error(
				`Failed to compile shader programme.\n${infoLog}`,
			);
		}

		let data = {
			view : Mat4.create(),
			persp : Mat4.create(),
			models : [this.model],
		};
		return new Shader(prog!, data);
	}
}
