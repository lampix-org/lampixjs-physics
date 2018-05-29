import { MatterBody } from 'objects/MatterBody';
import { XYPos } from 'matter_types';
import * as Matter from 'matter-js';

// Matter JS Function for moving instantly an existing body.
export function setPositionOfBody(body: MatterBody, position: XYPos) {
  Matter.Body.setPosition(body.body, position);
}
