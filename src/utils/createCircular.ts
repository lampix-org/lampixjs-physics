import { CircularBodyOptions } from '../matter_types';
import { ObjectCircular } from '../objects/ObjectCircular';
import * as Matter from 'matter-js';
import { MatterSetup } from './MatterSetup';

// Call this to make a circular object.
export function createCircular(theOptions: CircularBodyOptions) {
  const newObject = new ObjectCircular(theOptions);
  MatterSetup.worldObjects.push(newObject);
  Matter.World.add(MatterSetup.world, newObject.body);

  return newObject;
}
