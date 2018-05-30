import { RectangleBodyOptions } from '../matter_types';
import { ObjectRectangle } from '../objects/ObjectRectangle';
import { MatterSetup } from './MatterSetup';
import * as Matter from 'matter-js';

// Call this to make a rectangular object.
export function createRectangle(theOptions: RectangleBodyOptions) {
  const newObject = new ObjectRectangle(theOptions);
  MatterSetup.worldObjects.push(newObject);
  Matter.World.add(MatterSetup.world, newObject.body);
  return newObject;
}
