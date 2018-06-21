"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// This removes a composite object from the world.
function deleteComposite(ms, theComposite) {
    for (let x = ms.worldObjects.length - 1; x >= 0; x = x - 1) {
        if (ms.worldObjects[x].composite !== undefined) {
            if (theComposite.composite.id === ms.worldObjects[x].composite.id) {
                // TODO: Make sure this is correct.
                Matter.World.remove(ms.world, ms.worldObjects[x].composite);
                ms.worldObjects.splice(x, 1);
                return;
            }
        }
    }
}
exports.deleteComposite = deleteComposite;
