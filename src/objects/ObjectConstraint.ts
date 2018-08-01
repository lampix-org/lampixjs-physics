import { ConstraintOptions, XYPos } from '../matter_types';
import * as Matter from 'matter-js';
import { MatterObjects } from './MatterObjects';
import { MatterSetup } from '../utils/MatterSetup';
import { GlobalObject } from './GlobalObject';

// You can use a constraint to "tie" two matter objects together, similar to a spring.
export class ObjectConstraint extends GlobalObject{

  color: string;
  growOver: number;
  growComplete: boolean;
  animSteps: number;
  animStep: number;
  constraint: any;
  bodyID: number;

  constructor(theOptions: ConstraintOptions) {
    super();
    this.color = theOptions.color;
    this.growOver = theOptions.growOver;
    this.animSteps = theOptions.animSteps;

    this.constraint = Matter.Constraint.create(theOptions.options);

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
    invariant(MatterSetup.prototype.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');
    const pos1: XYPos = this.constraint.pointA;
    const pos2: XYPos = this.constraint.pointB;

    MatterSetup.prototype.globalContext.beginPath();
    MatterSetup.prototype.globalContext.moveTo(pos1);
    MatterSetup.prototype.globalContext.lineTo(pos2);
    MatterSetup.prototype.globalContext.lineWidth = 4;
    MatterSetup.prototype.globalContext.strokeStyle = this.color;
    MatterSetup.prototype.globalContext.stroke();
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
