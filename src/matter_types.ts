import { MatterBody } from 'objects/MatterBody';

// Simple X,Y point.
export type XYPos = {
  x: number,
  y: number
};

// Use this to define a matter object within the world.
export type ObjectIdentifiers = {
  index: number,
  cx: number,
  cy: number,
  w: number,
  h: number
};

// Circle object.
export type Circle = {
  cx: number,
  cy: number,
  radius: number
};

// Attractor to attracted object map. Also includes the Min and Max distance for orbits.
// If Orbits are left undefined, object will automatically stick together.
export type aTAMObject = {
  attractor: MatterBody,
  orbitMin?: number,
  orbitMax?: number,
  attracted?: [{
    object?: MatterBody,
    customOrbit?: number,
    stopAttraction?: boolean
  }]
};

export type matterSetupObject = {
  width: number, 
  height: number, 
  noWalls: boolean,
  noRenderer: boolean
};

// This interface defines the basic attributes that any and all matter bodies need.
export interface basicBodyOptions {
  // Basic attributes.
  x: number; 
  y: number;
  // Matter JS Options for creating the physical body.
  matterOptions: object;
}

// Extended options for rectangle bodies.
export interface rectangleBodyOptions extends basicBodyOptions {
  w: number;
  h: number;
}

// Extended options for circular bodies.
export interface circularBodyOptions extends basicBodyOptions {
  r: number;
}

// Extended options for polygonal bodies.
export interface polygonBodyOptions extends basicBodyOptions {
  r: number;
  sides:number;
}

// Options for creating a Matter Constraint.
export interface constraintOptions {
  options: matterConstraintOptions;
  color: string;
  growOver: number;
  animSteps: number;
}

// Possible structure of options for creating a Constraint with Matter JS.
export type matterConstraintOptions = {
  bodyA: Matter.Body; // any body object.
  bodyB: Matter.Body;// any other body.
  pointA: { x: number, y: number}; // just an offset for the first point if you don't want the constraint to start
                      // from the middle of the first object.
  pointB: { x: number, y: number}; // the same as above but for the second object,
  length: number; // pixels you want for the line.
  stiffness: number;// 0 for very elastic, 1 for very stiff.
};
