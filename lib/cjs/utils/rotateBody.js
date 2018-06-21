"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matter_js_1 = require("matter-js");
// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
// Matter JS Function for rotating an existing body.
function rotateBody(body, rotation) {
    matter_js_1.Body.rotate(body.body, rotation);
}
exports.rotateBody = rotateBody;
