"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
// Scales a body in size instantly.
function scaleBody(theBody, onX, onY, point) {
    // If the point is undefined, the center of the body will be used.
    if (point === undefined) {
        Matter.Body.scale(theBody.body, onX, onY);
    }
    else {
        Matter.Body.scale(theBody.body, onX, onY, point);
    }
}
exports.scaleBody = scaleBody;
