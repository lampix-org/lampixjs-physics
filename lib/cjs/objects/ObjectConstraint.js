"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
const MatterObjects_1 = require("./MatterObjects");
const MatterSetup_1 = require("../utils/MatterSetup");
// You can use a constraint to "tie" two matter objects together, similar to a spring.
class ObjectConstraint {
    constructor(theOptions) {
        this.color = theOptions.color;
        this.growOver = theOptions.growOver;
        this.animSteps = theOptions.animSteps;
        this.constraint = Matter.Constraint.create(theOptions.options);
        this.bodyID = MatterObjects_1.MatterObjects.bodyID;
        MatterObjects_1.MatterObjects.bodyID = MatterObjects_1.MatterObjects.bodyID + 1;
        // Used for a growing constraint, TODO.
        if (this.growOver != null) {
            this.growComplete = false;
            this.animStep = this.animSteps;
        }
    }
    // Used to define how much the constraint will oscilate in length upon forces applied to the connected bodies.
    setDamping(newDamping) {
        this.constraint.damping = newDamping;
    }
    // Used to change how fast a modified constraint returns to its original length.
    setStiffness(newStiffness) {
        this.constraint.stiffness = newStiffness;
    }
    // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
    show() {
        // TODO: Find out if this code is correct.
        const invariant = require('invariant');
        invariant(MatterSetup_1.MatterSetup.prototype.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');
        const pos1 = this.constraint.pointA;
        const pos2 = this.constraint.pointB;
        MatterSetup_1.MatterSetup.prototype.globalContext.beginPath();
        MatterSetup_1.MatterSetup.prototype.globalContext.moveTo(pos1);
        MatterSetup_1.MatterSetup.prototype.globalContext.lineTo(pos2);
        MatterSetup_1.MatterSetup.prototype.globalContext.lineWidth = 4;
        MatterSetup_1.MatterSetup.prototype.globalContext.strokeStyle = this.color;
        MatterSetup_1.MatterSetup.prototype.globalContext.stroke();
    }
    update() {
        if (!this.growComplete) {
            this.animSteps = this.animSteps - 1;
            // TODO: Implement correct grow methodology for Constraints.
            if (this.animSteps === 0) {
                this.growComplete = true;
            }
        }
    }
}
exports.ObjectConstraint = ObjectConstraint;
