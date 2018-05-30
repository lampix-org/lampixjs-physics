import { GlobalObject } from '../objects/GlobalObject';
import * as Matter from 'matter-js';
import { MatterSetup } from './MatterSetup';

// This function can be used to check if a body is currently within the screen bounds.
// Returns true if the object is on screen and false if it isn't.
export function checkOnScreen(theBody: GlobalObject) {
  const newBounds = {
    min: {
      x: MatterSetup.render.bounds.min.x,
      y: MatterSetup.render.bounds.min.y
    },
    max: {
      x: MatterSetup.render.bounds.max.x,
      y: MatterSetup.render.bounds.max.y
    }
  };

  if (Matter.Bounds.overlaps(theBody.body.bounds, newBounds)) {
    return true;
  }

  return false;
}
