import * as Matter from 'matter-js';
// Matter JS Function for making an existing object static or not.
export function setStaticToBody(body, isStatic) {
    Matter.Body.setStatic(body.body, isStatic);
}
