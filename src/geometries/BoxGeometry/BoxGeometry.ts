import { Vector3 } from '../../math/Vector3';
import { Geometry } from '../../core/Geometry';

export class BoxGeometry extends Geometry {
    constructor(
        width: number = 1,
        height: number = 1,
        depth: number = 1,
        widthSegments: number = 1,
        heightSegments: number = 1,
        depthSegments: number = 1
    ) {
        const vertices: number[] = [];
        const normals: number[] = [];
        const uvs: number[] = [];
        const indices: number[] = [];

        let numberOfVertices = 0;

        const createPlane = (
            u: 'x' | 'y' | 'z',
            v: 'x' | 'y' | 'z',
            w: 'x' | 'y' | 'z',
            uDirection: number,
            vDirection: number,
            width: number,
            height: number,
            depth: number,
            xSegments: number,
            ySegments: number
        ) => {
            const segmentWidth = width / xSegments;
            const segmentHeight = height / ySegments;

            const widthHalf = width / 2;
            const heightHalf = height / 2;
            const depthHalf = depth / 2;

            const xSegmentsOffset = xSegments + 1;
            const ySegmentsOffset = ySegments + 1;

            let vertexCounter = 0;

            const vector = new Vector3();

            /** Generate vertices, normals & uvs */
            for (let iy = 0; iy < ySegmentsOffset; iy++) {
                const y = iy * segmentHeight - heightHalf;

                for (let ix = 0; ix < xSegmentsOffset; ix++) {
                    const x = ix * segmentWidth - widthHalf;

                    vector[u] = x * uDirection;
                    vector[v] = y * vDirection;
                    vector[w] = depthHalf;

                    vertices.push(...vector.toArray());

                    vector[u] = 0;
                    vector[v] = 0;
                    vector[w] = depth > 0 ? 1 : -1;

                    normals.push(...vector.toArray());

                    uvs.push(ix / xSegments);
                    uvs.push(1 - iy / ySegments);

                    vertexCounter += 1;
                }
            }

            /** Generate indices */
            for (let iy = 0; iy < ySegments; iy++) {
                for (let ix = 0; ix < xSegments; ix++) {
                    const a = numberOfVertices + ix + xSegmentsOffset * iy;
                    const b = numberOfVertices + ix + xSegmentsOffset * (iy + 1);
                    const c = numberOfVertices + (ix + 1) + xSegmentsOffset * (iy + 1);
                    const d = numberOfVertices + (ix + 1) + xSegmentsOffset * iy;

                    indices.push(a, b, d);
                    indices.push(b, c, d);
                }
            }

            numberOfVertices += vertexCounter;
        };

        createPlane('z', 'y', 'x', -1, -1, depth, height, width, depthSegments, heightSegments);
        createPlane('z', 'y', 'x', 1, -1, depth, height, -width, depthSegments, heightSegments);
        createPlane('x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments);
        createPlane('x', 'z', 'y', 1, -1, width, depth, -height, widthSegments, depthSegments);
        createPlane('x', 'y', 'z', 1, -1, width, height, depth, widthSegments, heightSegments);
        createPlane('x', 'y', 'z', -1, -1, width, height, -depth, widthSegments, heightSegments);

        super(vertices, indices, normals, uvs);
    }
}
