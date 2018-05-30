import { MatterBody } from '../objects/MatterBody';
import { XYPos } from '../matter_types';
import * as Matter from 'matter-js';

// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 

// Matter JS Function for hitting an existing body.
export function applyForceToBody(body: MatterBody, position: XYPos, force: XYPos) {
  Matter.Body.applyForce(body.body, position, force);
}
