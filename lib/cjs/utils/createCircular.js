"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectCircular_1 = require("../objects/ObjectCircular");
const Matter = require("matter-js");
// Call this to make a circular object.
function createCircular(ms, theOptions) {
    const newObject = new ObjectCircular_1.ObjectCircular(theOptions);
    ms.worldObjects.push(newObject);
    Matter.World.add(ms.world, newObject.body);
    return newObject;
}
exports.createCircular = createCircular;
