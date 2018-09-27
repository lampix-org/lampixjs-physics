import { GlobalObject } from '../objects/GlobalObject';
import * as Matter from 'matter-js';

// This function can be used to check if a body is currently within the screen bounds.
// Returns true if the object is on screen and false if it isn't.
export function checkOnScreen(ms: any, theBody: GlobalObject) {
  const newBounds = {
    min: {
      x: 0, // ms.render.bounds.min.x,
      y: 0 // ms.render.bounds.min.y
    },
    max: {
      x: ms.setup.width, // ms.render.bounds.max.x,
      y: ms.setup.height // ms.render.bounds.max.y
    }
  };

  if (Matter.Bounds.overlaps(theBody.body.bounds, newBounds)) {
    return true;
  }

  return false;
}
