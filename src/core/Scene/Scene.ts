import { Entity } from '../Entity';
import { Light } from '../Light';

export class Scene extends Entity {
    /** Lights associated with Scene */
    get lights(): Light[] {
        const lights: Light[] = [];

        this.traverse(entity => {
            if (entity instanceof Light) {
                lights.push(entity);
            }
        });

        return lights;
    }
}
