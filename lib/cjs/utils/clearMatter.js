"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// Call this to clear the Matter Library. CAREFUL! If you use this and want to reuse Matter
// you'll need to run matterSetup again.
function clearMatter(ms) {
    for (let x = ms.worldObjects.length - 1; x >= 0; x = x - 1) {
        if (ms.worldObjects[x].body !== undefined) {
            Matter.World.remove(ms.world, ms.worldObjects[x].body);
            ms.worldObjects.splice(x, 1);
        }
        else if (ms.worldObjects[x].constraint !== undefined) {
            Matter.World.remove(ms.world, ms.worldObjects[x].constraint);
            ms.worldObjects.splice(x, 1);
        }
    }
    Matter.Render.stop(ms.render);
    Matter.Engine.clear(ms.engine);
}
exports.clearMatter = clearMatter;
