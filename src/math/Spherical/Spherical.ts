import { Vector3 } from '../Vector3';
import { clamp } from '../../utils';

export class Spherical {
    /** Radius */
    radius: number = 1;

    /** Polar Angle */
    phi: number = 0;

    /** Azimuthal Angle */
    theta: number = 0;

    /** Returns cartesian coordinates */
    get cartesianCoordinates(): Vector3 {
        return Vector3.fromSphericalCoordinates(this.radius, this.theta, this.phi);
    }

    /** Compares vectors */
    static equals(a: Spherical, b: Spherical): boolean {
        const radius = a.radius === b.radius;
        const phi = a.phi === b.phi;
        const theta = a.theta === b.theta;

        return radius && phi && theta;
    }

    /** Create new Spherical coordinates from cartesian coordinates */
    static fromCartesianCoordinates(x: number, y: number, z: number): Spherical {
        const vector = new Vector3(x, y, z);

        const radius = vector.magnitude;
        const phi = radius === 0 ? 0 : Math.acos(clamp(y / radius, -1, 1));
        const theta = radius === 0 ? 0 : Math.atan2(x, z);

        return new Spherical(radius, phi, theta);
    }

    constructor(radius: number = 1, phi: number = 0, theta: number = 0) {
        this.set(radius, phi, theta);
    }

    /** Compares spherical */
    equals(spherical: Spherical): boolean {
        return Spherical.equals(this, spherical);
    }

    /** Copy spherical */
    copy(spherical: Spherical): Spherical {
        this.set(spherical.radius, spherical.phi, spherical.theta);

        return this;
    }

    /** Sets Spherical coordinates */
    set(radius: number, phi: number, theta: number): Spherical {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;

        return this;
    }

    /** Sets Radius */
    setRadius(radius: number): Spherical {
        this.radius = radius;

        return this;
    }

    /** Sets phi */
    setPhi(phi: number): Spherical {
        this.phi = phi;

        return this;
    }

    /** Sets theta */
    setTheta(theta: number): Spherical {
        this.theta = theta;

        return this;
    }

    /** Return Spherical as Array */
    toArray(): [number, number, number] {
        return [this.radius, this.phi, this.theta];
    }
}
