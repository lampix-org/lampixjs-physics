import { GlobalObject } from './GlobalObject';
import { XYPos, BasicBodyOptions, MatterBodyOptions } from '../matter_types';
export declare class MatterBody extends GlobalObject {
    x: number;
    y: number;
    matterOptions: MatterBodyOptions;
    myID: number;
    growComplete: boolean;
    animSteps: number;
    toScaleX: number;
    toScaleY: number;
    point: XYPos;
    constructor(theOptions: BasicBodyOptions);
    update(): void;
    setScaleOverTime(onX: number, onY: number, point: XYPos, deltaT: number): void;
    setFriction(newFriction: number): void;
    setElasticity(newElasticity: number): void;
    setNewAngle(newAngle: number): void;
}
