import { CircularBodyOptions } from '../matter_types';
import { ObjectCircular } from '../objects/ObjectCircular';
import * as Matter from 'matter-js';

// Call this to make a circular object.
export function createCircular(ms: any, theOptions: CircularBodyOptions) {
  const newObject = new ObjectCircular(theOptions);
  ms.worldObjects.push(newObject);
  Matter.World.add(ms.world, newObject.body);

  return newObject;
}
