import { ConstraintOptions } from '../matter_types';
import { ObjectConstraint } from '../objects/ObjectConstraint';
import * as Matter from 'matter-js';
import { MatterSetup } from './MatterSetup';

// Call this to make a line linking 2 bodies together.
export function createConstraint(theOptions: ConstraintOptions) {
  const newObject = new ObjectConstraint(theOptions);
  MatterSetup.worldObjects.push(newObject);
  Matter.World.add(MatterSetup.world, newObject.constraint);

  return newObject;
}
