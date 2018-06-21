"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// This removes a constraint from the world.
function deleteConstraint(ms, theConstraint) {
    for (let x = ms.worldObjects.length - 1; x >= 0; x = x - 1) {
        if (ms.worldObjects[x].constraint !== undefined) {
            if (theConstraint.constraint.id === ms.worldObjects[x].constraint.id) {
                Matter.World.remove(ms.world, ms.worldObjects[x].constraint);
                ms.worldObjects.splice(x, 1);
                return;
            }
        }
    }
}
exports.deleteConstraint = deleteConstraint;
