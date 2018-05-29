import { rectangleBodyOptions } from 'matter_types';
import { ObjectRectangle } from 'objects/ObjectRectangle';
import { MatterSetup } from './MatterSetup';
import { World } from 'matter-js';

// Call this to make a rectangular object.
export function createRectangle(theOptions: rectangleBodyOptions) {
  const newObject = new ObjectRectangle(theOptions);
  MatterSetup.worldObjects.push(newObject);
  World.add(MatterSetup.world, newObject.body);
  return newObject;
}
