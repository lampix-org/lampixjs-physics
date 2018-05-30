import { MatterBody } from '../objects/MatterBody';
import { XYPos } from '../matter_types';
import * as Matter from 'matter-js';

// Matter JS Function for moving an existing object.
export function translateBody(body: MatterBody, translation: XYPos) {
  Matter.Body.translate(body.body, translation);
}
