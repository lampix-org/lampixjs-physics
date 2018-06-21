"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectConstraint_1 = require("../objects/ObjectConstraint");
const Matter = require("matter-js");
// Call this to make a line linking 2 bodies together.
function createConstraint(ms, theOptions) {
    const newObject = new ObjectConstraint_1.ObjectConstraint(theOptions);
    ms.worldObjects.push(newObject);
    Matter.World.add(ms.world, newObject.constraint);
    return newObject;
}
exports.createConstraint = createConstraint;
