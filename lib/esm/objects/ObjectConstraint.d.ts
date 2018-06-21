import { ConstraintOptions } from '../matter_types';
export declare class ObjectConstraint {
    color: string;
    growOver: number;
    growComplete: boolean;
    animSteps: number;
    animStep: number;
    constraint: any;
    bodyID: number;
    constructor(theOptions: ConstraintOptions);
    setDamping(newDamping: number): void;
    setStiffness(newStiffness: number): void;
    show(): void;
    update(): void;
}
