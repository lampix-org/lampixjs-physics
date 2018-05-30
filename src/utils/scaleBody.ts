import { GlobalObject } from '../objects/GlobalObject';
import { XYPos } from '../matter_types';
import * as Matter from 'matter-js';

// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 

// Scales a body in size instantly.
export function scaleBody(theBody: GlobalObject, onX: number, onY: number, point?: XYPos) {
  // If the point is undefined, the center of the body will be used.
  if (point === undefined) {
    Matter.Body.scale(theBody.body, onX, onY);
  } else {
    Matter.Body.scale(theBody.body, onX, onY, point);
  }
}
