"use strict";
// The old Matter Objects file that was reduced to single components.
// Right now we only use it for the bodyID singleton which is needed when creating objects.
Object.defineProperty(exports, "__esModule", { value: true });
class MatterObjects {
}
// Global Body ID. Starts at 0 and gets iterated with each new body made.
MatterObjects.bodyID = 0;
exports.MatterObjects = MatterObjects;
