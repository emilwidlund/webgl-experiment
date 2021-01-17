export class Color {
    /** Red channel */
    red: number;

    /** Green channel */
    green: number;

    /** Blue channel */
    blue: number;

    /** Alpha channel */
    alpha: number;

    /** Red alias */
    get r(): number {
        return this.red;
    }

    /** Set Red channel */
    set r(red: number) {
        this.red = red;
    }

    /** Green alias */
    get g(): number {
        return this.green;
    }

    /** Set Green channel */
    set g(green: number) {
        this.green = green;
    }

    /** Blue alias */
    get b(): number {
        return this.blue;
    }

    /** Set Blue channel */
    set b(blue: number) {
        this.blue = blue;
    }

    /** Alpha alias */
    get a(): number {
        return this.alpha;
    }

    /** Set Alpha channel */
    set a(alpha: number) {
        this.alpha = alpha;
    }

    constructor(red: number = 255, green: number = 255, blue: number = 255, alpha: number = 255) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }

    /** Return Color as Array */
    toArray(normalize: boolean = false): [number, number, number, number] {
        if (normalize) {
            return [this.red / 255, this.green / 255, this.blue / 255, this.alpha / 255];
        } else {
            return [this.red, this.green, this.blue, this.alpha];
        }
    }
}
