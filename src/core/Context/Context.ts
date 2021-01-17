import { Camera, PerspectiveCamera } from '../Camera';
import { Entity } from '../Entity';
import { Geometry } from '../Geometry';
import { MeshMaterial } from '../Material';
import { Mesh } from '../Mesh';
import { RenderItem } from '../RenderItem';
import { Scene } from '../Scene';

export class Context {
    /** WebGL2 Rendering Context */
    gl: WebGL2RenderingContext;

    /** Scene */
    scene: Scene;

    /** Camera */
    camera: PerspectiveCamera;

    /** Opaque Render Queue */
    opaqueQueue: Map<Mesh<Geometry, MeshMaterial>['id'], RenderItem<Geometry, MeshMaterial>> = new Map();

    /** Transparent Render Queue */
    transparentQueue: Map<Mesh<Geometry, MeshMaterial>['id'], RenderItem<Geometry, MeshMaterial>> = new Map();

    /** Program Cache */
    programs: Map<Entity['id'], WebGLProgram> = new Map();

    /** Render Queue */
    get queue(): RenderItem<Geometry, MeshMaterial>[] {
        return [...Array.from(this.opaqueQueue.values()), ...Array.from(this.transparentQueue.values())];
    }

    constructor(gl: WebGL2RenderingContext, scene: Scene, camera: PerspectiveCamera) {
        this.gl = gl;
        this.scene = scene;
        this.camera = camera;
    }

    /** Adds Draw Context to appropriate queue */
    add(renderItem: RenderItem<Geometry, MeshMaterial>, transparent: boolean) {
        if (transparent) {
            this.transparentQueue.set(renderItem.mesh.id, renderItem);
        } else {
            this.opaqueQueue.set(renderItem.mesh.id, renderItem);
        }
    }

    /** Draw each entry in queue */
    draw(gl: WebGL2RenderingContext) {
        this.queue.forEach(renderItem => renderItem.draw(gl, this.scene, this.camera));
    }
}
