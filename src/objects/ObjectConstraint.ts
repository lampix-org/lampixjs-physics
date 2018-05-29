import { ConstraintOptions, XYPos } from 'matter_types';
import { Constraint } from 'matter-js';
import { MatterObjects } from './MatterObjects';
import { MatterSetup } from 'utils/MatterSetup';

// You can use a constraint to "tie" two matter objects together, similar to a spring.
export class ObjectConstraint {

  color: string;
  growOver: number;
  growComplete: boolean;
  animSteps: number;
  animStep: number;
  constraint: any;
  bodyID: number;

  constructor(theOptions: ConstraintOptions) {
    this.color = theOptions.color;
    this.growOver = theOptions.growOver;
    this.animSteps = theOptions.animSteps;

    this.constraint = Constraint.create(theOptions.options);

    this.bodyID = MatterObjects.bodyID;
    MatterObjects.bodyID = MatterObjects.bodyID + 1;

    // Used for a growing constraint, TODO.
    if (this.growOver != null) {
      this.growComplete = false;
      this.animStep = this.animSteps;
    }
  }

  // Used to define how much the constraint will oscilate in length upon forces applied to the connected bodies.
  setDamping(newDamping: number) {
    this.constraint.damping = newDamping;
  }

  // Used to change how fast a modified constraint returns to its original length.
  setStiffness(newStiffness: number) {
    this.constraint.stiffness = newStiffness;
  }

  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  show() {
    // TODO: Find out if this code is correct.
    const invariant = require('invariant');
    invariant(MatterSetup.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');
    const pos1: XYPos = this.constraint.pointA;
    const pos2: XYPos = this.constraint.pointB;

    MatterSetup.globalContext.beginPath();
    MatterSetup.globalContext.moveTo(pos1);
    MatterSetup.globalContext.lineTo(pos2);
    MatterSetup.globalContext.lineWidth = 4;
    MatterSetup.globalContext.strokeStyle = this.color;
    MatterSetup.globalContext.stroke();
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
