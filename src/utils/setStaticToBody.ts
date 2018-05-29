import { MatterBody } from 'objects/MatterBody';
import * as Matter from 'matter-js';

// Matter JS Function for making an existing object static or not.
export function setStaticToBody(body: MatterBody, isStatic: boolean) {
  Matter.Body.setStatic(body.body, isStatic);
}
