import * as Matter from 'matter-js';
// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
// Matter JS Function for hitting an existing body.
export function applyForceToBody(body, position, force) {
    Matter.Body.applyForce(body.body, position, force);
}
