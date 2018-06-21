import { Body } from 'matter-js';
// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
// Matter JS Function for rotating an existing body.
export function rotateBody(body, rotation) {
    Body.rotate(body.body, rotation);
}
