import { MatterBody } from './MatterBody';
import * as Matter from 'matter-js';
import { SliderRailOptions, RailBearingOptions } from 'matter_types';
import { RailBearing } from './RailBearing';
import { createRailBearing } from '../utils/createRailBearing';
import { ObjectRectangle } from './ObjectRectangle';
import { createRectangle } from '../utils/createRectangle';
import { deleteBody } from '../utils/deleteBody';
import { createConstraint } from '../utils/createConstraint';
import { deleteConstraint } from '../utils/deleteConstraint';

// This object defines a Rail object which can be placed anywhere on
// or off the screen and to which constraint points can be linked.
export class SliderRail extends MatterBody {
  w: number;
  h: number;
  bearings: RailBearing[] = [];
  railGuardLeft: ObjectRectangle;
  railGuardRight: ObjectRectangle;
  topGuard: ObjectRectangle;
  id: number;
  ms: any;

  // This creates the Slider Rail.
  constructor(ms: any, theOptions: SliderRailOptions) {
    super(theOptions);
    this.ms = ms;
    this.w = theOptions.w;
    this.h = 10;
    this.id = theOptions.id;
    const collisionFilter = {
      category: 1,
      group: -2,
      mask: 0x9999
    };
    if (theOptions.matterOptions != null) {
      theOptions.matterOptions.isStatic = true;
    } else {
      theOptions.matterOptions = {
        isStatic: true,
        collisionFilter: collisionFilter,
        density: Infinity
      };
    }
    this.body = Matter.Bodies.rectangle(this.x, this.y, this.w - 20, this.h, theOptions.matterOptions);
    let guardOptions = {
      x: this.x - this.w / 2 + 5,
      y: this.y - 5,
      w: 10,
      h: this.h + 10,
      matterOptions: {
        isStatic: true
      }
    };
    this.railGuardLeft = createRectangle(ms, guardOptions);
    guardOptions = {
      x: this.x + this.w / 2 - 5,
      y: this.y - 5,
      w: 10,
      h: this.h + 10,
      matterOptions: {
        isStatic: true
      }
    };
    this.railGuardRight = createRectangle(ms, guardOptions);
    guardOptions = {
      x: this.x,
      y: this.y - 20,
      w: this.w,
      h: this.h,
      matterOptions: {
        isStatic: true
      }
    };
    this.topGuard = createRectangle(ms, guardOptions);
    // We now instantiate the Rail Bearings. The default setup is going to assume that the gravity
    // is running from top to bottom.
    if (theOptions.bearings != null) {
      theOptions.bearings.forEach((bearing) => {
        if (bearing.x < this.x - this.w / 2) {
          bearing.x = this.x - this.w / 2 + 12;
        }
        if (bearing.x > this.w / 2 + this.x) {
          bearing.x = this.w / 2 + this.x - 12;
        }
        // if (bearing.y < this.y - this.w / 2 - 5) {
        //   bearing.y = this.y - 1;
        // }
        if (bearing.y >= this.y - this.h / 2) {
          bearing.y = this.y - this.h / 2 - 1;
        }
        const newBearing: RailBearing = createRailBearing(ms, bearing);
        if (bearing.targetObject != null) {
          const constOptions = {
            options: {
              bodyA: newBearing.body,
              bodyB: bearing.targetObject.body,
              length: bearing.targetObject.y - newBearing.y,
              stiffness: 0.8
            }
          };
          const newConstraint = createConstraint(ms, constOptions);
          newBearing.constraint = newConstraint;
          newBearing.targetObject = bearing.targetObject;
        }
        this.bearings.push(newBearing);
      });
    }
  }

  addBearing(bearing: RailBearingOptions) {
    if (bearing.x < this.x - this.w / 2) {
      bearing.x = this.x - this.w / 2 + 12;
    }
    if (bearing.x > this.w / 2 + this.x) {
      bearing.x = this.w / 2 + this.x - 12;
    }
    // if (bearing.y < this.y) {
    //   bearing.y = this.y - 1;
    // }
    if (bearing.y >= this.y) {
      bearing.y = this.y - this.h / 2 - 1;
    }
    bearing.parentId = this.id;
    const newBearing = createRailBearing(this.ms, bearing);
    if (bearing.targetObject != null) {
      const constOptions = {
        options: {
          bodyA: newBearing.body,
          bodyB: bearing.targetObject.body,
          length: bearing.targetObject.y - newBearing.y,
          stiffness: 0.8
        }
      };
      const newConstraint = createConstraint(this.ms, constOptions);
      newBearing.constraint = newConstraint;
      newBearing.targetObject = bearing.targetObject;
    }
    this.bearings.push(newBearing);
  }

  removeBearing(targetId: number) {
    for (let x: number = this.bearings.length - 1; x >= 0; x -= 1) {
      if (this.bearings[x].id === targetId) {
        if (this.bearings[x].body !== undefined) {
          deleteBody(this.ms, this.bearings[x].body);
        }
        if (this.bearings[x].constraint != null) {
          deleteConstraint(this.ms, this.bearings[x].constraint);
        }
        this.bearings.splice(x, 1);
        return;
      }
    }
  }

  getBearing(targetId: number) {
    for (let x: number = this.bearings.length - 1; x >= 0; x -= 1) {
      if (this.bearings[x].id === targetId) {
        return this.bearings[x];
      }
    }
  }

  linkToSlider(targetObject: MatterBody, targetBearing?: RailBearing) {
    if (targetBearing != null) {
      const constOptions = {
        options: {
          bodyA: targetBearing.body,
          bodyB: targetObject.body,
          length: targetObject.y - targetBearing.y,
          stiffness: 0.8
        }
      };
      const newConstraint = createConstraint(this.ms, constOptions);
      targetBearing.constraint = newConstraint;
      targetBearing.targetObject = targetObject;
    } else {
      const bearingOptions: RailBearingOptions = {
        x: targetObject.x,
        y: 100,
        r: 4,
        id: this.bearings[this.bearings.length - 1].id + 1,
        parentId: this.id,
        targetObject: targetObject
      };
      this.addBearing(bearingOptions);
    }
  }

  unlinkFromSlider(targetObject: MatterBody) {
    for (let x: number = this.bearings.length - 1; x >= 0; x -= 1) {
      if (this.bearings[x].targetObject === targetObject) {
        this.removeBearing(this.bearings[x].id);
        return;
      }
    }
  }
}
