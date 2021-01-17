import { PerspectiveCamera } from '../../core/Camera';
import { Mesh } from '../../core/Mesh';
import { Scene } from '../../core/Scene';
import { Entity } from '../../core/Entity';
import { Context } from '../Context';
import { RenderItem } from '../RenderItem';
import { Geometry } from '../Geometry';
import { MeshMaterial } from '../Material';
import { Color } from '../Color';

export class Renderer {
    /** WebGL Manager */
    gl: WebGL2RenderingContext;

    /** Current Context */
    context?: Context;

    /** Renderer Width */
    width: number = 480;

    /** Renderer Height */
    height: number = 320;

    /** Antialias */
    antialias: boolean = true;

    /** Background Color */
    backgroundColor: Color = new Color(191, 204, 217);

    constructor(gl: WebGL2RenderingContext) {
        this.gl = gl;
    }

    render(scene: Scene, camera: PerspectiveCamera) {
        this.clear(this.backgroundColor);

        if (!this.context) {
            this.context = new Context(this.gl, scene, camera);
        }

        scene.updateWorldMatrix();
        camera.updateWorldMatrix();

        scene.traverse(entity => this.createRenderItem(entity, scene, camera));

        this.context.draw(this.gl);
    }

    createRenderItem(entity: Entity, scene: Scene, camera: PerspectiveCamera) {
        if (!this.context) return;

        if (entity instanceof Mesh) {
            new RenderItem(this.context, entity as Mesh<Geometry, MeshMaterial>);
        }
    }

    /** Clear Color Buffer */
    clear(color?: Color) {
        if (color) {
            this.gl.clearColor(...color.toArray(true));
        }

        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}
