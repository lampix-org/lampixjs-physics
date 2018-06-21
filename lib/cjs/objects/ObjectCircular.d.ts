import { MatterBody } from './MatterBody';
import { CircularBodyOptions } from '../matter_types';
export declare class ObjectCircular extends MatterBody {
    r: number;
    constructor(theOptions: CircularBodyOptions);
    show(thePNG?: HTMLCanvasElement): void;
}
