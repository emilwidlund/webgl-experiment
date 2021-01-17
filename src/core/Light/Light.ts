import { Color } from '../Color';
import { Entity } from '../Entity';

export class Light extends Entity {
    /** Color */
    color: Color = new Color(255, 255, 255);

    /** Intensity */
    intensity: number = 1;
}
