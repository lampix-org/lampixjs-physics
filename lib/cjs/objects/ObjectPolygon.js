"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MatterBody_1 = require("./MatterBody");
const Matter = require("matter-js");
const MatterSetup_1 = require("../utils/MatterSetup");
// This is a Polygon! It's Polymisterious.
class ObjectPolygon extends MatterBody_1.MatterBody {
    constructor(theOptions) {
        super(theOptions);
        this.r = theOptions.r;
        this.sides = theOptions.sides;
        this.body = Matter.Bodies.polygon(this.x, this.y, this.sides, this.r, theOptions.matterOptions);
    }
    // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
    show(thePNG) {
        const invariant = require('invariant');
        invariant(MatterSetup_1.MatterSetup.prototype.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');
        const pos = this.body.position;
        const angle = this.body.angle;
        MatterSetup_1.MatterSetup.prototype.globalContext.translate(pos.x, pos.y);
        MatterSetup_1.MatterSetup.prototype.globalContext.rotate(angle);
        if (thePNG) {
            MatterSetup_1.MatterSetup.prototype.globalContext.drawImage(thePNG, 0, 0, this.x + this.r, this.y + this.r);
        }
        else {
            // TODO: Figure out how to draw a Polygon.
        }
    }
}
exports.ObjectPolygon = ObjectPolygon;
