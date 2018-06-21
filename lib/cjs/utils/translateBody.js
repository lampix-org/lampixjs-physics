"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
// Matter JS Function for moving an existing object.
function translateBody(body, translation) {
    Matter.Body.translate(body.body, translation);
}
exports.translateBody = translateBody;
