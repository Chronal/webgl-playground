import { Model, ShaderData } from "./util.js"

export class Shader {
	shaderProg: WebGLProgram;
	// shaderData: ShaderData;

	constructor(shader: WebGLProgram, data: ShaderData) {
		this.shaderProg = shader;
		// this.shaderData = data;
	}

	draw() {
	}

	update() {

	}
}
