import { genPyramid, initWebGL, Model, ShaderData } from "./gfx/util.js";
import { ShaderBuilder } from "./gfx/shaderBuilder.js";
import { Vec3, Mat4 } from 'gl-matrix';

export {};

main();

function main() {
	const [canvas, gl]  = initWebGL();

	const id = Mat4.create();
	id.identity();

	// vert data
	const verts =  genPyramid();
	
	// const colours = new Float32Array(Math.floor(verts.length / 3)); 
	// colours.fill(0.0);
	
	let model: Model = {
		vertArray : verts, 
		//colArray: colours, 
		model : id
	};

	const vertSrc = `#version 300 es
        in vec4 pos;

	uniform mat4 model;
        uniform mat4 view;
        uniform mat4 proj;

        void main() {
            gl_Position = proj * view * model * pos;
        }`;

	const fragSrc = `#version 300 es
	precision highp float;
        out vec4 col;

        void main() {
            col = vec4(1.0, 0.0, 0.0, 1.0);
        }`;
 
	let shaderProg = new ShaderBuilder(gl)
		.addModel(model)
		.addVertShader(vertSrc)
		.addFragShader(fragSrc)
		.build();

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}
