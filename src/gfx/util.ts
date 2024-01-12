import { Vec3, Mat4 } from 'gl-matrix';

type Model = {
	vertArray: Float32Array;
	// colArray: Float32Array;
	model: Mat4;
};

type BufLayout = {
	buffer: Float32Array;
	index: GLuint;
	size: GLint
	type: GLenum;
	normalized: GLboolean;
	stride: GLsizei;
	offset: GLintptr;
};

type ModelData = {
	vertBuf: WebGLBuffer;
	// colBuf: WebGLBuffer;
	model: Mat4;
};

type ShaderData = {
	view: Mat4;
	persp: Mat4;
	models: ModelData[];
};

function initWebGL(): [HTMLCanvasElement, WebGL2RenderingContext] {
	const canvas: HTMLCanvasElement = document.querySelector("#glcanvas")!;
	const gl = canvas.getContext("webgl2");

	if (gl === null) {
		throw new Error("Unable to initialize WebGL. Your browser or machine may not support it.");
	}

	// TODO: Till I figure out front vs back
	gl.disable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);

	return [canvas, gl];
}

function genCube(): Vec3[] {
	let verts: [number, number, number][] = [
		// 1st face
		// 2nd face
		// 3rd face
		// 4th face
		// 5th face
		// 6th face
	];

	return verts.map((v) => Vec3.fromValues(...v));
}

// TODO: Check if I goofed with orientation (backfaces)
function genPyramid(): Float32Array {
	return Float32Array.from([
		// 1st face
		 0.5,   0, 0,
		-0.5,   0, 0,
		   0, 0.5, 0,
		
		// 2nd face
		 0.5, 0, 0,
		-0.5, 0, 0,
		   0, 0, 1,

		// 3rd face
		 0.5,   0, 0,
		   0, 0.5, 0,
		   0,   0, 1,
	
		// 4th face
		-0.5,   0, 0,
		   0, 0.5, 0,
		   0,   0, 1,
	]);       		
}


export {genPyramid, initWebGL, Model, ModelData, ShaderData};
