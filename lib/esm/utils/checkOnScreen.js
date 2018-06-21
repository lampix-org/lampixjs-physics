import * as Matter from 'matter-js';
// This function can be used to check if a body is currently within the screen bounds.
// Returns true if the object is on screen and false if it isn't.
export function checkOnScreen(ms, theBody) {
    const newBounds = {
        min: {
            x: ms.render.bounds.min.x,
            y: ms.render.bounds.min.y
        },
        max: {
            x: ms.render.bounds.max.x,
            y: ms.render.bounds.max.y
        }
    };
    if (Matter.Bounds.overlaps(theBody.body.bounds, newBounds)) {
        return true;
    }
    return false;
}
