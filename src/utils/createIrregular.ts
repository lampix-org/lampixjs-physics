import { IrregularBodyOptions } from '../matter_types';
import { ObjectIrregular } from '../objects/ObjectIrregular';
import * as Matter from 'matter-js';

// Call this to make a rectangular object.
export function createIrregular(ms: any, theOptions: IrregularBodyOptions) {
  const newObject = new ObjectIrregular(theOptions);
  ms.worldObjects.push(newObject);
  Matter.World.add(ms.world, newObject.body);
  return newObject;
}
