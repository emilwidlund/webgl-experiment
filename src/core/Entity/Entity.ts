import { v4 as uuid } from 'uuid';

import { Scene } from '../Scene';
import { Vector3 } from '../../math/Vector3';
import { Matrix4 } from '../../math/Matrix4';
import { Quaternion } from '../../math/Quaternion';

export abstract class Entity {
    /** Unique identifier */
    id: string = uuid();

    /** Visible */
    visible: boolean = true;

    /** Parent */
    parent?: Scene | Entity;

    /** Children */
    readonly children: Entity[] = [];

    /** Transformation Matrix */
    matrix: Matrix4 = new Matrix4();

    /** World Transformation Matrix */
    worldMatrix: Matrix4 = new Matrix4();

    /** Position */
    position: Vector3 = new Vector3();

    /** Rotation */
    rotation: Quaternion = new Quaternion();

    /** Scale */
    scale: Vector3 = new Vector3(1, 1, 1);

    /** Add Entity as child */
    add(entity: Entity) {
        entity.parent = this;
        this.children.push(entity);
    }

    /** Remove Entity from children */
    remove(entity: Entity) {
        const index = this.children.indexOf(entity);

        if (index > -1) {
            this.children.splice(index, 1);
        }
    }

    /** Rotate X */
    rotateX(radians: number): Entity {
        this.rotation.rotateX(radians);
        return this;
    }

    /** Rotate Y */
    rotateY(radians: number): Entity {
        this.rotation.rotateY(radians);
        return this;
    }

    /** Rotate Z */
    rotateZ(radians: number): Entity {
        this.rotation.rotateZ(radians);
        return this;
    }

    /** Looks at target position */
    lookAt(position: Vector3) {
        this.matrix.targetTo(this.position, position, new Vector3(0, 1, 0));

        this.rotation = Quaternion.fromMatrix(this.matrix);

        this.updateWorldMatrix();
    }

    /** Traverses children */
    traverse(callback: (entity: Entity) => void) {
        callback(this);

        for (const child of this.children) {
            child.traverse(callback);
        }
    }

    /** Updates Matrix */
    updateMatrix() {
        this.matrix.compose(this.position, this.rotation, this.scale);
    }

    /** Update World Matrix */
    updateWorldMatrix() {
        this.updateMatrix();

        if (this.parent) {
            this.worldMatrix = Matrix4.multiply(this.parent.worldMatrix, this.matrix);
        } else {
            this.worldMatrix.copy(this.matrix);
        }

        for (const child of this.children) {
            child.updateWorldMatrix();
        }
    }
}
