"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// This function is called when you want to remove a body from the world.
function deleteBody(ms, theBody) {
    for (let x = ms.worldObjects.length - 1; x >= 0; x = x - 1) {
        if (ms.worldObjects[x].body !== undefined) {
            if (theBody.body.id === ms.worldObjects[x].body.id) {
                Matter.World.remove(ms.world, ms.worldObjects[x].body);
                ms.worldObjects.splice(x, 1);
                return;
            }
        }
    }
}
exports.deleteBody = deleteBody;
