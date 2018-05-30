import { PolygonBodyOptions } from '../matter_types';
import { ObjectPolygon } from '../objects/ObjectPolygon';
import { World } from 'matter-js';
import { MatterSetup } from './MatterSetup';

// Call this to create a 5+ sided object.
export function createPolygon(theOptions: PolygonBodyOptions) {
  const newObject = new ObjectPolygon(theOptions);
  MatterSetup.worldObjects.push(newObject);
  World.add(MatterSetup.world, newObject.body);

  return newObject;
}
