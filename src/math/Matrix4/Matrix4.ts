import { mat4, vec3 } from 'gl-matrix';

import { Quaternion } from '../Quaternion';
import { Vector3 } from '../Vector3';

export class Matrix4 {
    /** Matrix elements */
    elements: mat4 = mat4.create();

    /** Returns translation */
    get translation(): Vector3 {
        const vec = vec3.create();
        mat4.getTranslation(vec, this.elements);

        return new Vector3(vec[0], vec[1], vec[2]);
    }

    /** Returns rotation */
    get rotation(): Quaternion {
        const quaternion = new Quaternion();
        mat4.getRotation(quaternion.elements, this.elements);

        return quaternion;
    }

    /** Returns scale */
    get scaling(): Vector3 {
        const vec = vec3.create();
        mat4.getScaling(vec, this.elements);

        return new Vector3(vec[0], vec[1], vec[2]);
    }

    /** Compares matrices */
    static equals(a: Matrix4, b: Matrix4): boolean {
        return mat4.equals(a.elements, b.elements);
    }

    /** Add matrices */
    static add(a: Matrix4, b: Matrix4): Matrix4 {
        const matrix = new Matrix4();
        mat4.add(matrix.elements, a.elements, b.elements);

        return matrix;
    }

    /** Subtract matrices */
    static subtract(a: Matrix4, b: Matrix4): Matrix4 {
        const matrix = new Matrix4();
        mat4.subtract(matrix.elements, a.elements, b.elements);

        return matrix;
    }

    /** Multiply matrices */
    static multiply(a: Matrix4, b: Matrix4): Matrix4 {
        const matrix = new Matrix4();
        mat4.multiply(matrix.elements, a.elements, b.elements);

        return matrix;
    }

    /** Compares matrix */
    equals(matrix: Matrix4): boolean {
        return Matrix4.equals(this, matrix);
    }

    /** Copy matrix */
    copy(matrix: Matrix4): Matrix4 {
        this.elements = mat4.clone(matrix.elements);

        return this;
    }

    /** Apply identity matrix to elements */
    identity(): Matrix4 {
        mat4.identity(this.elements);

        return this;
    }

    /** Add matrix */
    add(matrix: Matrix4): Matrix4 {
        mat4.add(this.elements, this.elements, matrix.elements);

        return this;
    }

    /** Subtract matrix */
    subtract(matrix: Matrix4): Matrix4 {
        mat4.subtract(this.elements, this.elements, matrix.elements);

        return this;
    }

    /** Multiply matrix */
    multiply(matrix: Matrix4): Matrix4 {
        mat4.multiply(this.elements, this.elements, matrix.elements);

        return this;
    }

    /** Translate matrix */
    translate(vector: Vector3): Matrix4 {
        mat4.translate(this.elements, this.elements, vector.toArray());

        return this;
    }

    /** Rotate matrix */
    rotate(radians: number, axis: Vector3): Matrix4 {
        mat4.rotate(this.elements, this.elements, radians, axis.toArray());

        return this;
    }

    /** Rotate matrix along X axis */
    rotateX(radians: number): Matrix4 {
        mat4.rotateX(this.elements, this.elements, radians);

        return this;
    }

    /** Rotate matrix along Y axis */
    rotateY(radians: number): Matrix4 {
        mat4.rotateY(this.elements, this.elements, radians);

        return this;
    }

    /** Rotate matrix along Z axis */
    rotateZ(radians: number): Matrix4 {
        mat4.rotateZ(this.elements, this.elements, radians);

        return this;
    }

    /** Scale matrix */
    scale(vector: Vector3): Matrix4 {
        mat4.scale(this.elements, this.elements, vector.toArray());

        return this;
    }

    /** Invert matrix */
    invert(): Matrix4 {
        mat4.invert(this.elements, this.elements);

        return this;
    }

    /** Transpose matrix */
    transpose(): Matrix4 {
        mat4.transpose(this.elements, this.elements);

        return this;
    }

    /** Apply perspective to matrix */
    perspective(fov: number, aspect: number, near: number, far: number): Matrix4 {
        mat4.perspective(this.elements, fov, aspect, near, far);

        return this;
    }

    /** Look At */
    lookAt(eye: Vector3, center: Vector3, up: Vector3): Matrix4 {
        mat4.lookAt(this.elements, eye.toArray(), center.toArray(), up.toArray());

        return this;
    }

    /** Target To */
    targetTo(eye: Vector3, target: Vector3, up: Vector3): Matrix4 {
        mat4.targetTo(this.elements, eye.toArray(), target.toArray(), up.toArray());

        return this;
    }

    /** Compose Position, Rotation & Scaling */
    compose(position: Vector3, rotation: Quaternion, scale: Vector3) {
        mat4.fromRotationTranslationScale(this.elements, rotation.toArray(), position.toArray(), scale.toArray());
    }
}
