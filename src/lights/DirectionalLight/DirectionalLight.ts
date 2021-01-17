import { Light } from '../../core/Light';
import { Vector3 } from '../../math/Vector3';

export class DirectionalLight extends Light {
    /** Target */
    direction: Vector3 = new Vector3(0, 0, -1);
}
