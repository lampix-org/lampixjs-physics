import { constraintOptions } from 'matter_types';
import { ObjectConstraint } from 'objects/ObjectConstraint';
import { World } from 'matter-js';
import { MatterSetup } from './MatterSetup';

// Call this to make a line linking 2 bodies together.
export function createConstraint(theOptions: constraintOptions) {
  const newObject = new ObjectConstraint(theOptions);
  MatterSetup.worldObjects.push(newObject);
  World.add(MatterSetup.world, newObject.constraint);

  return newObject;
}
