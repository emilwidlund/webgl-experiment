import { v4 as uuid } from 'uuid';
import { Vector3 } from '../../math/Vector3';

export class Geometry {
    /** Unique identifier */
    id: string = uuid();

    /** Vertices */
    vertices: number[] = [];

    /** Faces */
    faces: number[] = [];

    /** Normals */
    normals: number[] = [];

    /** UVs */
    uv: number[] = [];

    constructor(vertices: number[], faces: number[], normals: number[], uvs: number[]) {
        this.vertices = vertices;
        this.faces = faces;
        this.normals = normals;
        this.uv = uvs;
    }
}
