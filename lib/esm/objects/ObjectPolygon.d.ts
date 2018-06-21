import { MatterBody } from './MatterBody';
import { PolygonBodyOptions } from '../matter_types';
export declare class ObjectPolygon extends MatterBody {
    r: number;
    sides: number;
    constructor(theOptions: PolygonBodyOptions);
    show(thePNG?: HTMLCanvasElement): void;
}
