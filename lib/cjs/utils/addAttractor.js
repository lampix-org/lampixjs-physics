"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Adds a new Attractor body to the world.
function addAttractor(ms, attractorBody) {
    for (let x = 0; x < ms.aTAM.length; x = x + 1) {
        for (let y = 0; y < ms.aTAM[x].attracted.length; y = y + 1) {
            ms.aTAM[x].attracted[y].stopAttraction = false;
        }
    }
    const newHierarchy = {
        attractor: attractorBody
    };
    ms.aTAM.push(newHierarchy);
}
exports.addAttractor = addAttractor;
