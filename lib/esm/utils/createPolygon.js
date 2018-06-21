import { ObjectPolygon } from '../objects/ObjectPolygon';
import * as Matter from 'matter-js';
// Call this to create a 5+ sided object.
export function createPolygon(ms, theOptions) {
    console.log(this);
    const newObject = new ObjectPolygon(theOptions);
    ms.worldObjects.push(newObject);
    Matter.World.add(ms.world, newObject.body);
    return newObject;
}
