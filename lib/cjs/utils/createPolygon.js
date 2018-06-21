"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectPolygon_1 = require("../objects/ObjectPolygon");
const Matter = require("matter-js");
// Call this to create a 5+ sided object.
function createPolygon(ms, theOptions) {
    console.log(this);
    const newObject = new ObjectPolygon_1.ObjectPolygon(theOptions);
    ms.worldObjects.push(newObject);
    Matter.World.add(ms.world, newObject.body);
    return newObject;
}
exports.createPolygon = createPolygon;
