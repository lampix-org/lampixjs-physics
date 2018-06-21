"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
// Matter JS Function for hitting an existing body.
function applyForceToBody(body, position, force) {
    Matter.Body.applyForce(body.body, position, force);
}
exports.applyForceToBody = applyForceToBody;
