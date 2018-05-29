import { constraintOptions, XYPos } from 'matter_types';
import { Constraint } from 'matter-js';
import { MatterObjects } from './MatterObjects';
import { MatterSetup } from './../utils/MatterSetup';

// This is a constraint.Very dangerous!
export class ObjectConstraint {
  /* Possible structure of options:
  options = {
    bodyA: any body object,
    bodyB: any other body,
    pointA: { x: , y: } just an offset for the first point if you don't want the constraint to start
    from the middle of the first object,
    pointB: { x: , y: } the same as above but for the second object,
    length: pixels you want for the line,
    stiffness: 0 for very elastic, 1 for very stiff
  }*/

  color: string;
  growOver: number;
  growComplete: boolean;
  animSteps: number;
  animStep: number;
  constraint: any;
  bodyID: number;

  constructor(theOptions: constraintOptions) {
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
  objectShow() {
    // TODO: Find out if this code is correct.
    const pos1: XYPos = this.constraint.pointA;
    const pos2: XYPos = this.constraint.pointB;

    MatterSetup.globalContext.beginPath();
    MatterSetup.globalContext.moveTo(pos1);
    MatterSetup.globalContext.lineTo(pos2);
    MatterSetup.globalContext.lineWidth = 4;
    MatterSetup.globalContext.strokeStyle = this.color;
    MatterSetup.globalContext.stroke();
  }

  objectUpdate() {
    if (!this.growComplete) {
      this.animSteps = this.animSteps - 1;
      // TODO: Implement correct grow methodology for Constraints.
      if (this.animSteps === 0) {
        this.growComplete = true;
      }
    }
  }
}
