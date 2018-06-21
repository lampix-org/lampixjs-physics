"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectRectangle_1 = require("../objects/ObjectRectangle");
const Matter = require("matter-js");
// Call this to make a rectangular object.
function createRectangle(ms, theOptions) {
    const newObject = new ObjectRectangle_1.ObjectRectangle(theOptions);
    ms.worldObjects.push(newObject);
    Matter.World.add(ms.world, newObject.body);
    return newObject;
}
exports.createRectangle = createRectangle;
