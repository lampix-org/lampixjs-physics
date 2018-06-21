"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// Matter JS Function for moving instantly an existing body.
function setPositionOfBody(body, position) {
    Matter.Body.setPosition(body.body, position);
}
exports.setPositionOfBody = setPositionOfBody;
