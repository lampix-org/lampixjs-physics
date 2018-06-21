"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// Call this to update the physics engine as fast as you wish.
function updateMatterEngine(ms, timestep) {
    if (timestep === undefined) {
        Matter.Engine.update(ms.engine);
    }
    else {
        // Updates the physics once per draw (60fps) when no timestep is given.
        Matter.Engine.update(ms.engine, timestep);
    }
}
exports.updateMatterEngine = updateMatterEngine;
