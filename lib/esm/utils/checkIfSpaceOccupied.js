import * as Matter from 'matter-js';
// This can be used to check if a certain space within the world is occupied with another body or not.
export function checkIfSpaceOccupied(ms, theOptions) {
    const newBounds = {
        min: {
            x: theOptions.cx - theOptions.radius,
            y: theOptions.cy - theOptions.radius
        },
        max: {
            x: theOptions.cx + theOptions.radius,
            y: theOptions.cy + theOptions.radius
        }
    };
    for (let j = 0; j < ms.worldObjects.length; j = j + 1) {
        if (ms.worldObjects[j].body !== undefined) {
            if (Matter.Bounds.overlaps(ms.worldObjects[j].body.bounds, newBounds)) {
                return true;
            }
        }
    }
    return false;
}
