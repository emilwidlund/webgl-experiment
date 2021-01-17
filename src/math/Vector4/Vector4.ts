import { clamp } from '../../utils';

export class Vector4 {
    /** X */
    x: number = 0;

    /** Y */
    y: number = 0;

    /** Z */
    z: number = 0;

    /** W */
    w: number = 1;

    /** Returns magnitude */
    get magnitude(): number {
        const x = this.x * this.x;
        const y = this.y * this.y;
        const z = this.z * this.z;
        const w = this.w * this.w;

        return Math.sqrt(x + y + z + w);
    }

    /** Compares vectors */
    static equals(a: Vector4, b: Vector4): boolean {
        const x = a.x === b.x;
        const y = a.y === b.y;
        const z = a.z === b.z;
        const w = a.w === b.w;

        return x && y && z && w;
    }

    /** Returns distance between vectors */
    static distance(a: Vector4, b: Vector4): number {
        return Vector4.subtract(a, b).magnitude;
    }

    /** Add vectors */
    static add(a: Vector4, b: Vector4): Vector4 {
        return new Vector4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }

    /** Subtract vectors */
    static subtract(a: Vector4, b: Vector4): Vector4 {
        return new Vector4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    /** Multiply vectors */
    static multiply(a: Vector4, b: Vector4): Vector4 {
        return new Vector4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
    }

    /** Divide vectors */
    static divide(a: Vector4, b: Vector4): Vector4 {
        return new Vector4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
    }

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.set(x, y, z, w);
    }

    /** Sets X, Y, Z & W */
    set(x: number, y: number, z: number, w: number): Vector4 {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;

        return this;
    }

    /** Sets X */
    setX(x: number): Vector4 {
        this.x = x;

        return this;
    }

    /** Sets Y */
    setY(y: number): Vector4 {
        this.y = y;

        return this;
    }

    /** Sets Y */
    setZ(z: number): Vector4 {
        this.z = z;

        return this;
    }

    /** Sets W */
    setW(w: number): Vector4 {
        this.w = w;

        return this;
    }

    /** Sets Magnitude */
    setMagnitude(magnitude: number): Vector4 {
        return this.normalize().multiplyScalar(magnitude);
    }

    /** Compares Vector */
    equals(vector: Vector4): boolean {
        return Vector4.equals(this, vector);
    }

    /** Copy Vector */
    copy(vector: Vector4): Vector4 {
        this.set(vector.x, vector.y, vector.z, vector.w);

        return this;
    }

    /** Add Vector */
    add(vector: Vector4): Vector4 {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;
        this.w += vector.w;

        return this;
    }

    /** Add Scalar */
    addScalar(scalar: number): Vector4 {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        this.w += scalar;

        return this;
    }

    /** Subtract Vector */
    subtract(vector: Vector4): Vector4 {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;
        this.w -= vector.w;

        return this;
    }

    /** Subtract Scalar */
    subtractScalar(scalar: number): Vector4 {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        this.w -= scalar;

        return this;
    }

    /** Multiply Vector */
    multiply(vector: Vector4): Vector4 {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;
        this.w *= vector.w;

        return this;
    }

    /** Multiply Scalar */
    multiplyScalar(scalar: number): Vector4 {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        this.w *= scalar;

        return this;
    }

    /** Divide Vector */
    divide(vector: Vector4): Vector4 {
        this.x /= vector.x;
        this.y /= vector.y;
        this.z /= vector.z;
        this.w /= vector.w;

        return this;
    }

    /** Divide Scalar */
    divideScalar(scalar: number): Vector4 {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        this.w /= scalar;

        return this;
    }

    /** Clamp Vector */
    clamp(min: Vector4, max: Vector4): Vector4 {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        this.z = clamp(this.z, min.z, max.z);
        this.w = clamp(this.w, min.w, max.w);

        return this;
    }

    /** Clamp Scalar */
    clampScalar(min: number, max: number): Vector4 {
        this.x = clamp(this.x, min, max);
        this.y = clamp(this.y, min, max);
        this.z = clamp(this.z, min, max);
        this.w = clamp(this.w, min, max);

        return this;
    }

    /** Clamp Magnitude */
    clampMagnitude(min: number, max: number): Vector4 {
        this.setMagnitude(clamp(this.magnitude, min, max));

        return this;
    }

    /** Normalize Vector */
    normalize(): Vector4 {
        return this.divideScalar(this.magnitude || 1);
    }

    /** Limit Vector magnitude */
    limit(limit: number): Vector4 {
        if (this.magnitude > limit) {
            this.setMagnitude(limit);
        }

        return this;
    }

    /** Floor Vector */
    floor(): Vector4 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);
        this.w = Math.floor(this.w);

        return this;
    }

    /** Ceil Vector */
    ceil(): Vector4 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);
        this.w = Math.ceil(this.w);

        return this;
    }

    /** Round Vector */
    round(): Vector4 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);
        this.w = Math.round(this.w);

        return this;
    }

    /** Distance to vector */
    distanceTo(to: Vector4): number {
        return Vector4.distance(this, to);
    }

    /** Return Vector as Array */
    toArray(): [number, number, number, number] {
        return [this.x, this.y, this.z, this.w];
    }
}
