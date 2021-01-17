import { clamp } from '../../utils';

export class Vector2 {
    /** X */
    x: number = 0;

    /** Y */
    y: number = 0;

    /** Returns magnitude */
    get magnitude(): number {
        const x = this.x * this.x;
        const y = this.y * this.y;

        return Math.sqrt(x + y);
    }

    /** Compares vectors */
    static equals(a: Vector2, b: Vector2): boolean {
        const x = a.x === b.x;
        const y = a.y === b.y;

        return x && y;
    }

    /** Returns distance between vectors */
    static distance(a: Vector2, b: Vector2): number {
        return Vector2.subtract(a, b).magnitude;
    }

    /** Add vectors */
    static add(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x + b.x, a.y + b.y);
    }

    /** Subtract vectors */
    static subtract(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x - b.x, a.y - b.y);
    }

    /** Multiply vectors */
    static multiply(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x * b.x, a.y * b.y);
    }

    /** Divide vectors */
    static divide(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(a.x / b.x, a.y / b.y);
    }

    constructor(x: number = 0, y: number = 0) {
        this.set(x, y);
    }

    /** Sets X & Y */
    set(x: number, y: number): Vector2 {
        this.x = x;
        this.y = y;

        return this;
    }

    /** Sets X */
    setX(x: number): Vector2 {
        this.x = x;

        return this;
    }

    /** Sets Y */
    setY(y: number): Vector2 {
        this.y = y;

        return this;
    }

    /** Sets Magnitude */
    setMagnitude(magnitude: number): Vector2 {
        return this.normalize().multiplyScalar(magnitude);
    }

    /** Compares Vector */
    equals(vector: Vector2): boolean {
        return Vector2.equals(this, vector);
    }

    /** Copy Vector */
    copy(vector: Vector2): Vector2 {
        this.set(vector.x, vector.y);

        return this;
    }

    /** Add Vector */
    add(vector: Vector2): Vector2 {
        this.x += vector.x;
        this.y += vector.y;

        return this;
    }

    /** Add Scalar */
    addScalar(scalar: number): Vector2 {
        this.x += scalar;
        this.y += scalar;

        return this;
    }

    /** Subtract Vector */
    subtract(vector: Vector2): Vector2 {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    }

    /** Subtract Scalar */
    subtractScalar(scalar: number): Vector2 {
        this.x -= scalar;
        this.y -= scalar;

        return this;
    }

    /** Multiply Vector */
    multiply(vector: Vector2): Vector2 {
        this.x *= vector.x;
        this.y *= vector.y;

        return this;
    }

    /** Multiply Scalar */
    multiplyScalar(scalar: number): Vector2 {
        this.x *= scalar;
        this.y *= scalar;

        return this;
    }

    /** Divide Vector */
    divide(vector: Vector2): Vector2 {
        this.x /= vector.x;
        this.y /= vector.y;

        return this;
    }

    /** Divide Scalar */
    divideScalar(scalar: number): Vector2 {
        this.x /= scalar;
        this.y /= scalar;

        return this;
    }

    /** Clamp Vector */
    clamp(min: Vector2, max: Vector2): Vector2 {
        this.x = clamp(this.x, min.x, max.x);
        this.y = clamp(this.y, min.y, max.y);

        return this;
    }

    /** Clamp Scalar */
    clampScalar(min: number, max: number): Vector2 {
        this.x = clamp(this.x, min, max);
        this.y = clamp(this.y, min, max);

        return this;
    }

    /** Clamp Magnitude */
    clampMagnitude(min: number, max: number): Vector2 {
        this.setMagnitude(clamp(this.magnitude, min, max));

        return this;
    }

    /** Normalize Vector */
    normalize(): Vector2 {
        return this.divideScalar(this.magnitude || 1);
    }

    /** Limit Vector magnitude */
    limit(limit: number): Vector2 {
        if (this.magnitude > limit) {
            this.setMagnitude(limit);
        }

        return this;
    }

    /** Floor Vector */
    floor(): Vector2 {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;
    }

    /** Ceil Vector */
    ceil(): Vector2 {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;
    }

    /** Round Vector */
    round(): Vector2 {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;
    }

    /** Cross vector */
    cross(vector: Vector2): number {
        return this.x * vector.y - this.y * vector.x;
    }

    /** Distance to vector */
    distanceTo(to: Vector2): number {
        return Vector2.distance(this, to);
    }

    /** Return Vector as Array */
    toArray(): [number, number] {
        return [this.x, this.y];
    }
}
