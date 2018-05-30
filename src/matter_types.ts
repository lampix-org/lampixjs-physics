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
export type ATAMObject = {
  attractor: MatterBody,
  orbitMin?: number,
  orbitMax?: number,
  attracted?: AttractedObject[]
};

export type AttractedObject = {
  object?: MatterBody,
  customOrbit?: number,
  stopAttraction?: boolean
};

export type MatterSetupObject = {
  width: number, 
  height: number, 
  noWalls: boolean,
  noRenderer: boolean
};

// This interface defines the basic attributes that any and all matter bodies need.
export interface BasicBodyOptions {
  // Basic attributes.
  x: number; 
  y: number;
  // Matter JS Options for creating the physical body.
  matterOptions: MatterBodyOptions;
}

export type MatterBodyOptions = {
  isStatic?: boolean,
  friction?: number, // Ex: 0.5.
  elasticity?: number, // Ex: 0.5.
  angle?: number, // Value of PI.
  // ...,
  // // This following code should be used for creating attractors between two bodies, 
  // // the direction of the force being bodyB towards bodyA (bodyA is the attractor).
  // // Further examples of these functions can be found below (used them!).
  // plugin?: {
  //     attractors: [
  //         function(bodyA, bodyB) {
  //             var force = {
  //             x: (bodyA.position.x - bodyB.position.x) * 1e-6,
  //             y: (bodyA.position.y - bodyB.position.y) * 1e-6,
  //             };

  //             // apply force to both bodies
  //             Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
  //             Body.applyForce(bodyB, bodyB.position, force);
  //         }
  //     ]
  // }
};

// export type 

// Extended options for rectangle bodies.
export interface RectangleBodyOptions extends BasicBodyOptions {
  w: number;
  h: number;
}

// Extended options for circular bodies.
export interface CircularBodyOptions extends BasicBodyOptions {
  r: number;
}

// Extended options for polygonal bodies.
export interface PolygonBodyOptions extends BasicBodyOptions {
  r: number;
  sides:number;
}

// Options for creating a Matter Constraint.
export interface ConstraintOptions {
  options: MatterConstraintOptions;
  color: string;
  growOver: number;
  animSteps: number;
}

// Possible structure of options for creating a Constraint with Matter JS.
export type MatterConstraintOptions = {
  bodyA: Matter.Body; // any body object.
  bodyB: Matter.Body;// any other body.
  pointA: { x: number, y: number}; // just an offset for the first point if you don't want the constraint to start
                                   // from the middle of the first object.
  pointB: { x: number, y: number}; // the same as above but for the second object,
  length: number; // pixels you want for the line.
  stiffness: number;// 0 for very elastic, 1 for very stiff.
};
