import { v4 as uuid } from 'uuid';

import { Color } from '../Color';
import { PhongMaterial } from '../../materials/PhongMaterial';

export type MeshMaterial = PhongMaterial;

export class Material {
    /** Unique identifier */
    id: string = uuid();

    /** Color */
    color: Color = new Color();

    constructor(color: Color) {
        this.color = color;
    }
}
