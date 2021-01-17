import { Entity } from '../Entity';

import { Geometry } from '../Geometry';
import { Material, MeshMaterial } from '../Material';

export class Mesh<TGeometry extends Geometry, TMaterial extends MeshMaterial> extends Entity {
    /** Geometry */
    geometry: TGeometry;

    /** Material */
    material: TMaterial;

    constructor(geometry: TGeometry, material: TMaterial) {
        super();

        this.geometry = geometry;
        this.material = material;
    }
}
