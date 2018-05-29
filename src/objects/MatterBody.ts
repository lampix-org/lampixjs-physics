import { GlobalObject } from './GlobalObject';
import { MatterObjects } from './MatterObjects';
import { XYPos, basicBodyOptions } from 'matter_types';
import { scaleBody } from 'utils/scaleBody';

// Base Matter Object that extends all others below.
export class MatterBody extends GlobalObject {
  x: number;
  y: number;
  matterOptions: object;
  myID: number;
  // In case objects should scale, these are the attributes needed.
  growComplete: boolean = true;
  animSteps: number;
  toScaleX: number;
  toScaleY: number;
  point: XYPos;
  
  constructor(theOptions: basicBodyOptions) {
    super();
    this.x = theOptions.x;
    this.y = theOptions.y;
    this.matterOptions = theOptions.matterOptions;
    // Allocating a body ID to the object so that we can find it later.
    this.myID = MatterObjects.bodyID;
    MatterObjects.bodyID = MatterObjects.bodyID + 1;
  }
  
  // Used to update the object. For now you can update the object scale in case such an animation over time is desired.
  // Make sure you don't forget to scale the graphics with it as well.
  objectUpdate() {
    if (!this.growComplete) {
      this.animSteps = this.animSteps - 1;
      scaleBody(this.body, this.toScaleX, this.toScaleY, this.point);
      if (this.animSteps === 0) {
        this.growComplete = true;
      }
    }
  }
  
  // Used to scale the physical object over time. Make sur you adapt the graphics after calling this.
  // onX is used to stretch on the X axis, onY for the Y axis; point is the point from which the stretching begins;
  // deltaT is the amount of time that the scaling is going to be done over.
  setScaleOverTime(onX: number, onY: number, point: XYPos, deltaT: number) {
    this.growComplete = false;
    this.animSteps = deltaT;
    this.toScaleX = onX / deltaT;
    this.toScaleY = onY / deltaT;
    if (point !== undefined) {
      this.point = point;
    } else {
      this.point = null;
    }
  }
  
  // Sets the amount of friction that this body will exert on others.
  // 0 for no friction, 1 for very high friction.
  setFriction(newFriction: number) {
    this.body.friction = newFriction;
  }
  
  // Sets the elasticity of the body experienced when it collides with others.
  // 0 for no elasticity, 1 for 100% kinetic bounce.
  setElasticity(newElasticity: number) {
    this.body.restitution = newElasticity;
  }
  
  // Sets a new angle for the body. Messing with the body's angle may have a negative impact on the physics engine.
  setNewAngle(newAngle: number) {
    this.body.setAngle(newAngle);
  }
}
