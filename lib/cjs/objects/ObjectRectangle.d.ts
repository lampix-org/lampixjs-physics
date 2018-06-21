import { MatterBody } from './MatterBody';
import { RectangleBodyOptions } from '../matter_types';
export declare class ObjectRectangle extends MatterBody {
    w: number;
    h: number;
    constructor(theOptions: RectangleBodyOptions);
    show(thePNG?: HTMLCanvasElement): void;
}
