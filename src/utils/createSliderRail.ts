import { SliderRailOptions } from '../matter_types';
import * as Matter from 'matter-js';
import { SliderRail } from '../objects/SliderRail';

// Call this to make a circular object.
export function createSliderRail(ms: any, theOptions: SliderRailOptions) {
  const newObject = new SliderRail(ms, theOptions);
  ms.worldObjects.push(newObject);
  Matter.World.add(ms.world, newObject.body);

  return newObject;
}
