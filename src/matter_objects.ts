// Here you can find a couple of predefined Matter JS objects.
import * as Matter from 'matter-js';
import { XYPos, 
    basicBodyOptions, 
    rectangleBodyOptions, 
    circularBodyOptions, 
    polygonBodyOptions, 
    constraintOptions } from 'matter_types';
import { globalContext, scaleBody } from 'matter_utilities';
// Matter Archetypes.
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
// Global Body ID. Starts at 0 and gets iterated with each new body made.
let bodyID: number = 0;

// A global object that may be a body, a constraint or a composite.
export class GlobalObject {
  body?: any;
  constraint?: any;
  composite?: any;
}

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
    this.myID = bodyID;
    bodyID = bodyID + 1;
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

// This is a rectangle. Use it wisely.
export class ObjectRectangle extends MatterBody {
  w: number;
  h: number;

  constructor(theOptions: rectangleBodyOptions) {
    super(theOptions);
    this.w = theOptions.w;
    this.h = theOptions.h;

    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, this.matterOptions);
  }

  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  objectShow(thePNG: string) {
    const pos: XYPos = this.body.position;
    console.log('Is the position correct? ', pos);
    const angle: number = this.body.angle;

    globalContext.translate(pos.x, pos.y);
    globalContext.rotate(angle);
    if (thePNG !== undefined) {
      globalContext.drawImage(thePNG, 0, 0, this.w, this.h);
    } else {
      globalContext.rect(0, 0, this.w, this.h);
    }
  }
}

// This is a circular object. Caution!
export class ObjectCircular extends MatterBody {
  r: number;

  constructor(theOptions: circularBodyOptions) {
    super(theOptions);
    this.r = theOptions.r;

    this.body = Bodies.circle(this.x, this.y, this.r, theOptions.matterOptions);
  }

  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  objectShow(thePNG: string) {
    const pos: XYPos = this.body.position;
    console.log('Is the position correct? ', pos);
    const angle: number = this.body.angle;

    globalContext.translate(pos.x, pos.y);
    globalContext.rotate(angle);
    if (thePNG !== undefined) {
      globalContext.drawImage(thePNG, 0, 0, this.x + this.r, this.y + this.r);
    } else {
      globalContext.ellipse(0, 0, this.r * 2);
    }
  }
}

// This is a Polygon! It's Polymisterious.
export class ObjectPolygon extends MatterBody {
  r: number;
  sides: number;

  constructor(theOptions: polygonBodyOptions) {
    super(theOptions);

    this.r = theOptions.r;
    this.sides = theOptions.sides;

    this.body = Bodies.polygon(this.x, this.y, this.sides, this.r, theOptions.matterOptions);
  }
  
  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  objectShow(thePNG: string) {
    const pos = this.body.position;
    console.log('Is the position correct? ', pos);
    const angle = this.body.angle;

    globalContext.translate(pos.x, pos.y);
    globalContext.rotate(angle);
    if (thePNG !== undefined) {
      globalContext.drawImage(thePNG, 0, 0, this.x + this.r, this.y + this.r);
    } else {
      // TODO: Figure out how to draw a Polygon.
    }
  }
}

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

    this.bodyID = bodyID;
    bodyID = bodyID + 1;

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

    globalContext.beginPath();
    globalContext.moveTo(pos1);
    globalContext.lineTo(pos2);
    globalContext.lineWidth = 4;
    globalContext.strokeStyle = this.color;
    globalContext.stroke();
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
