"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This function gives you a random degree between the min and max values.
function randomAlphaMinMaxDeg(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min) * (Math.PI / 180);
}
exports.randomAlphaMinMaxDeg = randomAlphaMinMaxDeg;
