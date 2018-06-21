import { ObjectCircular } from '../objects/ObjectCircular';
import * as Matter from 'matter-js';
// Call this to make a circular object.
export function createCircular(ms, theOptions) {
    const newObject = new ObjectCircular(theOptions);
    ms.worldObjects.push(newObject);
    Matter.World.add(ms.world, newObject.body);
    return newObject;
}
