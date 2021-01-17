import { mat2, mat3, mat4 } from 'gl-matrix';
import { Matrix3 } from '../../math/Matrix3';
import { Matrix4 } from '../../math/Matrix4';

import { Vector2 } from '../../math/Vector2';
import { Vector3 } from '../../math/Vector3';
import { Vector4 } from '../../math/Vector4';

export type UniformArrayValue = number[] | Vector2[] | Vector3[] | Vector4[];
export type UniformValue = number | Vector2 | Vector3 | Vector4 | Matrix4 | Matrix3 | UniformArrayValue;

export enum UniformValueType {
    MATRIX_4,
    MATRIX_3,

    VECTOR_4_FLOAT,
    VECTOR_4_INT,
    VECTOR_4_FLOAT_ARRAY,
    VECTOR_4_INT_ARRAY,

    VECTOR_3_FLOAT,
    VECTOR_3_INT,
    VECTOR_3_FLOAT_ARRAY,
    VECTOR_3_INT_ARRAY,

    VECTOR_2_FLOAT,
    VECTOR_2_INT,
    VECTOR_2_FLOAT_ARRAY,
    VECTOR_2_INT_ARRAY,

    FLOAT,
    INT,
    FLOAT_ARRAY,
    INT_ARRAY
}

export class Uniform {
    /** WebGL Rendering Context */
    gl: WebGL2RenderingContext;

    /** Uniform Name */
    name: string;

    /** Uniform Location */
    location: WebGLUniformLocation | null;

    /** Associated Program */
    program: WebGLProgram;

    /** Value Type */
    type: UniformValueType;

    /** Value */
    _value?: UniformValue;

    /** Get Value */
    get value(): UniformValue | undefined {
        return this._value;
    }

    /** Uploads uniform to GPU */
    set value(value: UniformValue | undefined) {
        this.gl.useProgram(this.program);

        const location = this.location;

        switch (this.type) {
            /** Matrix */

            case UniformValueType.MATRIX_4:
                this.gl.uniformMatrix4fv(location, false, new Float32Array((value as Matrix4).elements));
                break;
            case UniformValueType.MATRIX_3:
                this.gl.uniformMatrix3fv(location, false, new Float32Array((value as Matrix3).elements));
                break;

            /** Vector 4 */

            case UniformValueType.VECTOR_4_FLOAT:
                this.gl.uniform4f(location, ...(value as Vector4).toArray());
                break;
            case UniformValueType.VECTOR_4_INT:
                this.gl.uniform4i(location, ...(value as Vector4).toArray());
                break;
            case UniformValueType.VECTOR_4_FLOAT_ARRAY:
                this.gl.uniform4fv(
                    location,
                    new Float32Array((value as Vector4[]).map(value => value.toArray()).flat())
                );
                break;
            case UniformValueType.VECTOR_4_INT_ARRAY:
                this.gl.uniform4iv(location, new Int32Array((value as Vector4[]).map(value => value.toArray()).flat()));
                break;

            /** Vector 3 */

            case UniformValueType.VECTOR_3_FLOAT:
                this.gl.uniform3f(location, ...(value as Vector3).toArray());
                break;
            case UniformValueType.VECTOR_3_INT:
                this.gl.uniform3i(location, ...(value as Vector3).toArray());
                break;
            case UniformValueType.VECTOR_3_FLOAT_ARRAY:
                this.gl.uniform3fv(
                    location,
                    new Float32Array((value as Vector3[]).map(value => value.toArray()).flat())
                );
                break;
            case UniformValueType.VECTOR_3_INT_ARRAY:
                this.gl.uniform3iv(location, new Int32Array((value as Vector3[]).map(value => value.toArray()).flat()));
                break;

            /** Vector 2 */

            case UniformValueType.VECTOR_2_FLOAT:
                this.gl.uniform2f(location, ...(value as Vector2).toArray());
                break;
            case UniformValueType.VECTOR_2_INT:
                this.gl.uniform2i(location, ...(value as Vector2).toArray());
                break;
            case UniformValueType.VECTOR_2_FLOAT_ARRAY:
                this.gl.uniform2fv(
                    location,
                    new Float32Array((value as Vector2[]).map(value => value.toArray()).flat())
                );
                break;
            case UniformValueType.VECTOR_2_INT_ARRAY:
                this.gl.uniform2iv(location, new Int32Array((value as Vector2[]).map(value => value.toArray()).flat()));
                break;

            /** Float & Int */

            case UniformValueType.FLOAT:
                this.gl.uniform1f(location, value as number);
                break;
            case UniformValueType.INT:
                this.gl.uniform1i(location, value as number);
                break;
            case UniformValueType.FLOAT_ARRAY:
                this.gl.uniform1fv(location, new Float32Array(value as number[]));
                break;
            case UniformValueType.INT_ARRAY:
                this.gl.uniform1iv(location, new Int32Array(value as number[]));
                break;
        }

        this._value = value;
    }

    constructor(
        name: string,
        value: UniformValue,
        type: UniformValueType,
        program: WebGLProgram,
        gl: WebGL2RenderingContext
    ) {
        this.name = name;
        this.type = type;
        this.gl = gl;
        this.program = program;
        this.location = gl.getUniformLocation(this.program, this.name);
        this.value = value;
    }
}
