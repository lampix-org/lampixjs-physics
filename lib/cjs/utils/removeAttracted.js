"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Removes a given attracted body from the aTAM attracted bodies sublist.
function removeAttracted(ms, attractedID, attractorID) {
    for (let x = 0; x < ms.aTAM.length; x = x + 1) {
        if (ms.aTAM[x].attractor.myID === attractorID) {
            for (let y = ms.aTAM[x].attracted.length - 1; y >= 0; y = y - 1) {
                if (ms.aTAM[x].attracted[y].object.myID === attractedID) {
                    ms.aTAM[x].attracted.splice(y, 1);
                }
            }
            return;
        }
    }
}
exports.removeAttracted = removeAttracted;
