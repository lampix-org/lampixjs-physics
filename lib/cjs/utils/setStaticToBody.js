"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// Matter JS Function for making an existing object static or not.
function setStaticToBody(body, isStatic) {
    Matter.Body.setStatic(body.body, isStatic);
}
exports.setStaticToBody = setStaticToBody;
