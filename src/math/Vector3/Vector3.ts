import { Spherical } from '../Spherical';
import { clamp } from '../../utils';

export class Vector3 {
    /** X */
    x: number = 0;

    /** Y */
    y: number = 0;

    /** Z */
    z: number = 0;

    /** Returns magnitude */
    get magnitude(): number {
        const x = this.x * this.x;
        const y = this.y * this.y;
        const z = this.z * this.z;

        return Math.sqrt(x + y + z);
    }

    /** Returns spherical coordinates */
    get sphericalCoordinates(): Spherical {
        return Spherical.fromCartesianCoordinates(this.x, this.y, this.z);
    }

    /** Compares vectors */
    static equals(a: Vector3, b: Vector3): boolean {
        const x = a.x === b.x;
        const y = a.y === b.y;
        const z = a.z === b.z;

        return x && y && z;
    }

    /** Returns distance between vectors */
    static distance(a: Vector3, b: Vector3): number {
        return Vector3.subtract(a, b).magnitude;
    }

    /** Add vectors */
    static add(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    /** Subtract vectors */
    static subtract(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    /** Multiply vectors */
    static multiply(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    }

    /** Divide vectors */
    static divide(a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x / b.x, a.y / b.y, a.z / b.z);
    }

    /** Cross vectors */
    static cross(a: Vector3, b: Vector3): Vector3 {
        const ax = a.x,
            ay = a.y,
            az = a.z;
        const bx = b.x,
            by = b.y,
            bz = b.z;

        const x = ay * bz - az * by;
        const y = az * bx - ax * bz;
        const z = ax * by - ay * bx;

        return new Vector3(x, y, z);
    }

    /** Create new Vector3 from spherical coordinates */
    static fromSphericalCoordinates(radius: number, theta: number, phi: number): Vector3 {
        const sinPhiRadius = Math.sin(phi) * radius;

        const x = sinPhiRadius * Math.sin(theta);
        const y = Math.cos(phi) * radius;
        const z = sinPhiRadius * Math.cos(theta);

        return new Vector3(x, y, z);
    }

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        this.set(x, y, z);
    }

    /** Sets X, Y & Z */
    set(x: number, y: number, z: number): Vector3 {
        this.x = x;
        this.y = y;
        this.z = z;

        return this;
    }

    /** Sets X */
    setX(x: number): Vector3 {
        this.x = x;

        return this;
    }

    /** Sets Y */
    setY(y: number): Vector3 {
        this.y = y;

        return this;
    }

    /** Sets Z */
    setZ(z: number): Vector3 {
        this.z = z;

        return this;
    }

    /** Sets Magnitude */
    setMagnitude(magnitude: number): Vector3 {
        return this.normalize().multiplyScalar(magnitude);
    }

    /** Compares Vector */
    equals(vector: Vector3): boolean {
        return Vector3.equals(this, vector);
    }

    /** Copy Vector */
    copy(vector: Vector3): Vector3 {
        this.set(vector.x, vector.y, vector.z);

        return this;
    }

    /** Add Vector */
    add(vector: Vector3): Vector3 {
        this.x += vector.x;
        this.y += vector.y;
        this.z += vector.z;

        return this;
    }

    /** Add Scalar */
    addScalar(scalar: number): Vector3 {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;

        return this;
    }

    /** Subtract Vector */
    subtract(vector: Vector3): Vector3 {
        this.x -= vector.x;
        this.y -= vector.y;
        this.z -= vector.z;

        return this;
    }

    /** Subtract Scalar */
    subtractScalar(scalar: number): Vector3 {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;

        return this;
    }

    /** Multiply Vector */
    multiply(vector: Vector3): Vector3 {
        this.x *= vector.x;
        this.y *= vector.y;
        this.z *= vector.z;

        return this;
    }

    /** Multiply Scalar */
    multiplyScalar(scalar: number): Vector3 {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;

        return this;
    }

    /** Divide Vector */
    divide(vector: Vector3): Vector3 {
        this.x /= vector.x;
        this.y /= vector.y;
        this.z /= vector.z;

        return this;
    }

    /** Divide Scalar */
    divideScalar(scalar: number): Vector3 {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;

        return this;
    }

    /** Clamp Vector */
    clamp(min: Vector3, max: Vector3): Vector3 {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);
        this.z = clamp(this.z, min.z, max.z);

        return this;
    }

    /** Clamp Scalar */
    clampScalar(min: number, max: number): Vector3 {
        this.x = clamp(this.x, min, max);
        this.y = clamp(this.y, min, max);
        this.z = clamp(this.z, min, max);

        return this;
    }

    /** Clamp Magnitude */
    clampMagnitude(min: number, max: number): Vector3 {
        this.setMagnitude(clamp(this.magnitude, min, max));

        return this;
    }

    /** Normalize Vector */
    normalize(): Vector3 {
        return this.divideScalar(this.magnitude || 1);
    }

    /** Limit Vector magnitude */
    limit(limit: number): Vector3 {
        if (this.magnitude > limit) {
            this.setMagnitude(limit);
        }

        return this;
    }

    /** Floor Vector */
    floor(): Vector3 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        this.z = Math.floor(this.z);

        return this;
    }

    /** Ceil Vector */
    ceil(): Vector3 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        this.z = Math.ceil(this.z);

        return this;
    }

    /** Round Vector */
    round(): Vector3 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);

        return this;
    }

    /** Cross Vector */
    cross(vector: Vector3): Vector3 {
        this.copy(Vector3.cross(this, vector));

        return this;
    }

    /** Distance to vector */
    distanceTo(to: Vector3): number {
        return Vector3.distance(this, to);
    }

    /** Return Vector as Array */
    toArray(): [number, number, number] {
        return [this.x, this.y, this.z];
    }
}
