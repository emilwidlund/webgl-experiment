import { Geometry } from '../../core/Geometry';
import { Vector3 } from '../../math/Vector3';
import { lerp } from '../../utils';

export class SphereGeometry extends Geometry {
    constructor(radius: number = 1, widthSegments: number = 48, heightSegments: number = 64) {
        const vertices: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];

        let index = 0;
        const grid: number[][] = [];

        for (let iy = 0; iy <= heightSegments; iy++) {
            const vertexRow = [];

            const y = lerp(-Math.PI, Math.PI, iy / heightSegments);

            for (let ix = 0; ix <= widthSegments; ix++) {
                const x = lerp(-Math.PI, Math.PI, ix / widthSegments);
                const vector = Vector3.fromSphericalCoordinates(radius, x, y);

                vertices.push(vector.x, vector.y, vector.z);
                vertexRow.push(index++);

                const normal = new Vector3().copy(vector).normalize();
                normals.push(normal.x, normal.y, normal.z);
            }

            grid.push(vertexRow);
        }

        for (let iy = 0; iy < heightSegments; iy++) {
            for (let ix = 0; ix < widthSegments; ix++) {
                const a = grid[iy][ix + 1];
                const b = grid[iy][ix];
                const c = grid[iy + 1][ix];
                const d = grid[iy + 1][ix + 1];

                if (iy !== 0) indices.push(a, b, d);
                if (iy !== heightSegments - 1) indices.push(b, c, d);
            }
        }

        super(vertices, indices, normals, uvs);
    }
}
