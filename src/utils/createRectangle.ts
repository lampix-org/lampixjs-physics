import { RectangleBodyOptions } from '../matter_types';
import { ObjectRectangle } from '../objects/ObjectRectangle';
import * as Matter from 'matter-js';

// Call this to make a rectangular object.
export function createRectangle(ms: any, theOptions: RectangleBodyOptions) {
  const newObject = new ObjectRectangle(theOptions);
  ms.worldObjects.push(newObject);
  Matter.World.add(ms.world, newObject.body);
  return newObject;
}
