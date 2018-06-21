/// <reference types="matter-js" />
import { MatterBody } from './objects/MatterBody';
import { IConstraintRenderDefinition } from 'matter-js';
export declare type XYPos = {
    x: number;
    y: number;
};
export declare type ObjectIdentifiers = {
    index: number;
    cx: number;
    cy: number;
    w: number;
    h: number;
};
export declare type Circle = {
    cx: number;
    cy: number;
    radius: number;
};
export declare type ATAMObject = {
    attractor: MatterBody;
    orbitMin?: number;
    orbitMax?: number;
    attracted?: AttractedObject[];
};
export declare type AttractedObject = {
    object?: MatterBody;
    customOrbit?: number;
    stopAttraction?: boolean;
};
export declare type MatterSetupObject = {
    width: number;
    height: number;
    noWalls: boolean;
    noRenderer: boolean;
};
export interface BasicBodyOptions {
    x: number;
    y: number;
    matterOptions?: MatterBodyOptions;
}
export interface MatterBodyOptions {
    isStatic?: boolean;
    friction?: number;
    angle?: number;
    density?: number;
    frictionAir?: number;
    frictionStatic?: number;
    force?: XYPos;
    inertia?: number;
    inverseInertia?: number;
    mass?: number;
    inverseMass?: number;
    isSensor?: boolean;
    isSleeping?: boolean;
    label?: string;
    parent?: Matter.Body;
    parts?: Matter.Body[];
    posision?: XYPos;
    restitution?: number;
    sleepThreshold?: number;
    slop?: number;
    timeScale?: number;
    torque?: number;
    type?: string;
    vertices?: XYPos[];
    collisionFilter?: MatterColFilterOptions;
    plugin?: MatterPluginOptions;
    render?: MatterRenderOptions;
}
export interface MatterColFilterOptions {
    category: number;
    group: number;
    mask: number;
}
export interface MatterPluginOptions {
    attractors?: VoidFunction[];
}
export interface MatterRenderOptions {
    fillStyle?: string;
    lineWidth?: number;
    opacity?: number;
    sprite?: MatterSpriteOptions;
    strokeStyle?: string;
    visible?: boolean;
}
export interface MatterSpriteOptions {
    texture: string;
    xScale: number;
    xOffset?: number;
    yScale: number;
    yOffset?: number;
}
export interface RectangleBodyOptions extends BasicBodyOptions {
    w: number;
    h: number;
}
export interface CircularBodyOptions extends BasicBodyOptions {
    r: number;
}
export interface PolygonBodyOptions extends BasicBodyOptions {
    r: number;
    sides: number;
}
export interface ConstraintOptions {
    options: MatterConstraintOptions;
    color?: string;
    growOver?: number;
    animSteps?: number;
}
export declare type MatterConstraintOptions = {
    bodyA: Matter.Body;
    bodyB: Matter.Body;
    pointA: XYPos;
    pointB: XYPos;
    length: number;
    stiffness: number;
    render?: IConstraintRenderDefinition;
};
