import { ConstraintOptions } from '../matter_types';
import { ObjectConstraint } from '../objects/ObjectConstraint';
import * as Matter from 'matter-js';

// Call this to make a line linking 2 bodies together.
export function createConstraint(ms: any, theOptions: ConstraintOptions) {
  const newObject = new ObjectConstraint(theOptions);
  ms.worldObjects.push(newObject);
  Matter.World.add(ms.world, newObject.constraint);

  return newObject;
}
