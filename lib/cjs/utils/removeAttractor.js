"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Removes a given attractor body from the aTAM attractor list.
function removeAttractor(ms, attractorID) {
    for (let x = ms.aTAM.length - 1; x >= 0; x = x - 1) {
        if (ms.aTAM[x].attractor.myID === attractorID) {
            ms.aTAM.splice(x, 1);
            return;
        }
    }
}
exports.removeAttractor = removeAttractor;
