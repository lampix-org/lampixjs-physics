import { PolygonBodyOptions } from '../matter_types';
import { ObjectPolygon } from '../objects/ObjectPolygon';
import * as Matter from 'matter-js';

// Call this to create a 5+ sided object.
export function createPolygon(ms: any, theOptions: PolygonBodyOptions) {
  console.log(this);
  const newObject = new ObjectPolygon(theOptions);
  ms.worldObjects.push(newObject);
  Matter.World.add(ms.world, newObject.body);

  return newObject;
}
