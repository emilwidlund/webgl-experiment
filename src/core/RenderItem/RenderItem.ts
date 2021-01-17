import { PhongMaterial, phongUniforms } from '../../materials/PhongMaterial';
import { Mesh } from '../Mesh';
import { FragmentShader, VertexShader } from '../Shader';
import { Uniform } from '../Uniform';
import { Geometry } from '../Geometry';
import { Camera, PerspectiveCamera } from '../Camera';
import { MeshMaterial } from '../Material';

import defaultVertexShader from '../../shaders/vertex/standard.glsl';
import phongFragmentShader from '../../shaders/fragment/phong.glsl';
import { Context } from '../Context';
import { Scene } from '../Scene';

export class RenderItem<TGeometry extends Geometry, TMaterial extends MeshMaterial> {
    /** Associated Mesh */
    mesh: Mesh<TGeometry, TMaterial>;

    /** Associated VAO */
    vao: WebGLVertexArrayObject | null;

    /** Associated WebGL Program */
    program: WebGLProgram;

    /** Associated Uniforms */
    uniforms: Map<string, Uniform> = new Map();

    constructor(context: Context, mesh: Mesh<TGeometry, TMaterial>) {
        this.mesh = mesh;

        if (context.programs.has(mesh.id)) {
            this.program = context.programs.get(mesh.id)!;
        } else {
            this.program = this.createProgram(context.gl, defaultVertexShader, phongFragmentShader);
            context.programs.set(mesh.id, this.program);
        }

        this.vao = this.setupAttributes(context.gl, this.program, this.mesh.geometry);

        context.add(this, mesh.material.color.alpha < 255);
    }

    /** Setup VAO **/
    setupAttributes(
        gl: WebGL2RenderingContext,
        program: WebGLProgram,
        geometry: Geometry
    ): WebGLVertexArrayObject | null {
        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        /** Geometry Indices */
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(geometry.faces), gl.STATIC_DRAW);

        /** Geometry Vertices */
        const vertPositionLocation = gl.getAttribLocation(program, 'vertPosition');
        gl.enableVertexAttribArray(vertPositionLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.vertices), gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertPositionLocation, 3, gl.FLOAT, false, 0, 0);

        /** Geometry Normals */
        const vertNormalLocation = gl.getAttribLocation(program, 'vertNormal');
        gl.enableVertexAttribArray(vertNormalLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.normals), gl.STATIC_DRAW);
        gl.vertexAttribPointer(vertNormalLocation, 3, gl.FLOAT, false, 0, 0);

        /** Geometry UV */
        const uvLocation = gl.getAttribLocation(program, 'uv');
        gl.enableVertexAttribArray(uvLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geometry.uv), gl.STATIC_DRAW);
        gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);

        /** Unbind VAO */
        gl.bindVertexArray(null);

        return vao;
    }

    /** Create Shader Program */
    createProgram(gl: WebGL2RenderingContext, vertexSource: string, fragmentSource: string): WebGLProgram {
        const program = gl.createProgram();
        const vertexShader = new VertexShader(gl, vertexSource);
        const fragmentShader = new FragmentShader(gl, fragmentSource);

        if (!program) {
            throw new Error('Program could not be instantiated!');
        }

        /** Attach Shaders */
        gl.attachShader(program, vertexShader.webGLShader);
        gl.attachShader(program, fragmentShader.webGLShader);

        /** Link Program */
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            throw new Error(`Program linking failed: ${gl.getProgramInfoLog(program)}`);
        }

        /** Validate Program */
        gl.validateProgram(program);

        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
            throw new Error(`Program validation failed: ${gl.getProgramInfoLog(program)}`);
        }

        return program;
    }

    draw(gl: WebGL2RenderingContext, scene: Scene, camera: PerspectiveCamera) {
        gl.useProgram(this.program);

        /** Attach VAO */
        gl.bindVertexArray(this.vao);

        /** Initialize WebGL State */

        // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        // gl.enable(gl.BLEND);

        gl.enable(gl.DEPTH_TEST);

        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
        gl.frontFace(gl.CCW);

        switch (Object.getPrototypeOf(this.mesh.material).constructor) {
            case PhongMaterial:
                this.uniforms = phongUniforms(
                    gl,
                    this.program,
                    scene,
                    camera,
                    this.mesh as Mesh<TGeometry, PhongMaterial>
                );
                break;
        }

        /** Draw primitive */

        if (this.mesh.geometry.faces.length) {
            gl.drawElements(gl.TRIANGLES, this.mesh.geometry.faces.length, gl.UNSIGNED_SHORT, 0);
        } else {
            gl.drawArrays(gl.TRIANGLES, 0, this.mesh.geometry.vertices.length / 3);
        }
    }
}

/* this.manager.uploadUniform(
    'uDirectionalLightPositions',
    program,
    this.lights.map(light => light.position),
    UniformValueType.VECTOR_3_FLOAT_ARRAY
);
this.manager.uploadUniform(
    'uDirectionalLightColors',
    program,
    this.lights.map(light => new Vector3(...light.color.unitArray())),
    UniformValueType.VECTOR_3_FLOAT_ARRAY
);
this.manager.uploadUniform(
    'uDirectionalLightDirections',
    program,
    this.lights.map(light => (light as DirectionalLight).direction),
    UniformValueType.VECTOR_3_FLOAT_ARRAY
);
this.manager.uploadUniform('uDirectionalLightsSize', program, this.lights.length, UniformValueType.INT);
 */
