type ShaderType = WebGL2RenderingContext['VERTEX_SHADER'] | WebGL2RenderingContext['FRAGMENT_SHADER'];

export abstract class Shader {
    /** Shader Type */
    type: ShaderType;

    /** Shader Source */
    source: string;

    /** WebGL Shader */
    webGLShader: WebGLShader;

    constructor(gl: WebGL2RenderingContext, source: string, type: ShaderType) {
        this.type = type;
        this.source = source;
        this.webGLShader = this.initialize(gl);
    }

    initialize(gl: WebGL2RenderingContext): WebGLShader {
        const shader = gl.createShader(this.type);

        if (!shader) {
            throw new Error('Shader could not be instantiated!');
        }

        /** Set Shader Source */
        gl.shaderSource(shader, this.source);

        /** Compile Shader */
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(`Shader compilation failed: ${gl.getShaderInfoLog(shader)}`);
        }

        return shader;
    }
}

export class VertexShader extends Shader {
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, source, gl.VERTEX_SHADER);
    }
}

export class FragmentShader extends Shader {
    constructor(gl: WebGL2RenderingContext, source: string) {
        super(gl, source, gl.FRAGMENT_SHADER);
    }
}
