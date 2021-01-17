import { glMatrix } from 'gl-matrix';

import { Matrix4 } from '../../math/Matrix4';
import { Entity } from '../Entity';

export abstract class Camera extends Entity {}

export class PerspectiveCamera extends Camera {
    /** Field of View */
    fov: number = 35;

    /** Aspect Ratio */
    aspect: number = 1;

    /** Near Clip */
    near: number = 0.1;

    /** Far Clip */
    far: number = 1000;

    /** Projection Matrix */
    get projectionMatrix(): Matrix4 {
        return new Matrix4().perspective(glMatrix.toRadian(this.fov), this.aspect, this.near, this.far);
    }

    /** View Matrix */
    get viewMatrix(): Matrix4 {
        return new Matrix4().copy(this.matrix).invert();
    }

    /** Projection View Matrix */
    get projectionViewMatrix(): Matrix4 {
        return Matrix4.multiply(this.projectionMatrix, this.viewMatrix);
    }

    constructor(aspect?: number) {
        super();

        if (typeof aspect === 'number') {
            this.aspect = aspect;
        }
    }
}
