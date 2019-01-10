import { RailBearingOptions } from '../matter_types';
import * as Matter from 'matter-js';
import { RailBearing } from '../objects/RailBearing';

// Call this to make a circular object.
export function createRailBearing(ms: any, theOptions: RailBearingOptions) {
  const newObject = new RailBearing(theOptions);
  ms.worldObjects.push(newObject);
  Matter.World.add(ms.world, newObject.body);

  return newObject;
}
