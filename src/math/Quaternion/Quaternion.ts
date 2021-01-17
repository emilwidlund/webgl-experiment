import { quat, mat4 } from 'gl-matrix';

import { Matrix4 } from '../Matrix4';

export class Quaternion {
    /** Internal Quaternion */
    elements: quat = quat.create();

    /** X */
    get x(): number {
        return this.elements[0];
    }

    /** Y */
    get y(): number {
        return this.elements[1];
    }

    /** Z */
    get z(): number {
        return this.elements[2];
    }

    /** W */
    get w(): number {
        return this.elements[3];
    }

    /** Compares quaternions */
    static equals(a: Quaternion, b: Quaternion): boolean {
        const x = a.x === b.x;
        const y = a.y === b.y;
        const z = a.z === b.z;
        const w = a.w === b.w;

        return x && y && z && w;
    }

    /** From Matrix */
    static fromMatrix(matrix: Matrix4): Quaternion {
        const quaternion = new Quaternion();
        mat4.getRotation(quaternion.elements, matrix.elements);

        return quaternion;
    }

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
        this.set(x, y, z, w);
    }

    /** Sets X, Y, Z & W */
    set(x: number, y: number, z: number, w: number): Quaternion {
        quat.set(this.elements, x, y, z, w);

        return this;
    }

    /** Compares Quaternion */
    equals(quaternion: Quaternion): boolean {
        return Quaternion.equals(this, quaternion);
    }

    /** Copy Quaternion */
    copy(quaternion: Quaternion): Quaternion {
        quat.set(this.elements, quaternion.x, quaternion.y, quaternion.z, quaternion.w);

        return this;
    }

    /** Rotate X */
    rotateX(angle: number): Quaternion {
        quat.rotateX(this.elements, this.elements, angle);

        return this;
    }

    /** Rotate Y */
    rotateY(angle: number): Quaternion {
        quat.rotateY(this.elements, this.elements, angle);

        return this;
    }

    /** Rotate Y */
    rotateZ(angle: number): Quaternion {
        quat.rotateZ(this.elements, this.elements, angle);

        return this;
    }

    /** To Array */
    toArray(): [number, number, number, number] {
        return [this.elements[0], this.elements[1], this.elements[2], this.elements[3]];
    }
}
