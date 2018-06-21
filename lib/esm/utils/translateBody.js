import * as Matter from 'matter-js';
// Matter JS Function for moving an existing object.
export function translateBody(body, translation) {
    Matter.Body.translate(body.body, translation);
}
