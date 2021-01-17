import { mat3, vec2 } from 'gl-matrix';

import { Vector2 } from '../Vector2';

export class Matrix3 {
    /** Matrix elements */
    elements: mat3 = mat3.create();

    /** Compares matrices */
    static equals(a: Matrix3, b: Matrix3): boolean {
        return mat3.equals(a.elements, b.elements);
    }

    /** Add matrices */
    static add(a: Matrix3, b: Matrix3): Matrix3 {
        const matrix = new Matrix3();
        mat3.add(matrix.elements, a.elements, b.elements);

        return matrix;
    }

    /** Subtract matrices */
    static subtract(a: Matrix3, b: Matrix3): Matrix3 {
        const matrix = new Matrix3();
        mat3.subtract(matrix.elements, a.elements, b.elements);

        return matrix;
    }

    /** Multiply matrices */
    static multiply(a: Matrix3, b: Matrix3): Matrix3 {
        const matrix = new Matrix3();
        mat3.multiply(matrix.elements, a.elements, b.elements);

        return matrix;
    }

    /** Compares matrix */
    equals(matrix: Matrix3): boolean {
        return Matrix3.equals(this, matrix);
    }

    /** Copy matrix */
    copy(matrix: Matrix3): Matrix3 {
        this.elements = mat3.clone(matrix.elements);

        return this;
    }

    /** Apply identity matrix to elements */
    identity(): Matrix3 {
        mat3.identity(this.elements);

        return this;
    }

    /** Add matrix */
    add(matrix: Matrix3): Matrix3 {
        mat3.add(this.elements, this.elements, matrix.elements);

        return this;
    }

    /** Subtract matrix */
    subtract(matrix: Matrix3): Matrix3 {
        mat3.subtract(this.elements, this.elements, matrix.elements);

        return this;
    }

    /** Multiply matrix */
    multiply(matrix: Matrix3, bMatrix?: Matrix3): Matrix3 {
        mat3.multiply(this.elements, this.elements, matrix.elements);

        return this;
    }

    /** Translate matrix */
    translate(vector: Vector2): Matrix3 {
        mat3.translate(this.elements, this.elements, vector.toArray());
        return this;
    }

    /** Rotate matrix */
    rotate(radians: number): Matrix3 {
        mat3.rotate(this.elements, this.elements, radians);
        return this;
    }

    /** Scale matrix */
    scale(vector: Vector2): Matrix3 {
        mat3.scale(this.elements, this.elements, vector.toArray());
        return this;
    }

    /** Invert matrix */
    invert(): Matrix3 {
        mat3.invert(this.elements, this.elements);
        return this;
    }

    /** Transpose matrix */
    transpose(): Matrix3 {
        mat3.transpose(this.elements, this.elements);

        return this;
    }
}
