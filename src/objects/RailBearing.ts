import { RailBearingOptions } from 'matter_types';
import { MatterBody } from './MatterBody';
import Matter from 'matter-js';

// This is a round object used on top of the Rail.
export class RailBearing extends MatterBody {
  r: number;
  id: number;
  parentId: number;

  constructor(theOptions: RailBearingOptions) {
    super(theOptions);
    this.r = 4;
    this.id = theOptions.id;
    if (theOptions.parentId != null) {
      this.parentId = theOptions.parentId;
    }
    const collisionFilter = {
      category: 1,
      group: -1,
      mask: 0x9999
    };
    if (theOptions.matterOptions != null) {
      theOptions.matterOptions.collisionFilter = collisionFilter;
    } else {
      const matterOptions = {
        collisionFilter: collisionFilter,
        density: 100,
        frictionStatic: 0.5
      };
      theOptions.matterOptions = matterOptions;
    }
    this.body = Matter.Bodies.circle(this.x, this.y, this.r, theOptions.matterOptions);
    // this.body = Matter.Bodies.rectangle(this.x, this.y, 10, 10, theOptions.matterOptions);
  }
}
