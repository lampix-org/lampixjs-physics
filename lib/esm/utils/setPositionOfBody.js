import * as Matter from 'matter-js';
// Matter JS Function for moving instantly an existing body.
export function setPositionOfBody(body, position) {
    Matter.Body.setPosition(body.body, position);
}
