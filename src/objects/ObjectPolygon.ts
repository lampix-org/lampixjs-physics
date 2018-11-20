import { MatterBody } from './MatterBody';
import { PolygonBodyOptions } from '../matter_types';
import * as Matter from 'matter-js';
import { MatterSetup } from '../utils/MatterSetup';

// This is a Polygon! It's Polymisterious.
export class ObjectPolygon extends MatterBody {
  r: number;
  sides: number;

  constructor(theOptions: PolygonBodyOptions) {
    super(theOptions);

    this.r = theOptions.r;
    this.sides = theOptions.sides;

    this.body = Matter.Bodies.polygon(this.x, this.y, this.sides, this.r, theOptions.matterOptions);

    if (theOptions.onSleepStart !== undefined) {
      this.body.sleepThreshold = 15;
      Matter.Events.on(this.body, 'sleepStart', () => { theOptions.onSleepStart(); });
    }

    if (theOptions.onSleepStop !== undefined) {
      this.body.sleepThreshold = 15;
      Matter.Events.on(this.body, 'sleepEnd', () => { theOptions.onSleepStop(); });
    }
  }

  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  show(thePNG?: HTMLCanvasElement) {
    const invariant = require('invariant');
    invariant(MatterSetup.prototype.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');
    const pos = this.body.position;
    const angle = this.body.angle;

    MatterSetup.prototype.globalContext.translate(pos.x, pos.y);
    MatterSetup.prototype.globalContext.rotate(angle);
    if (thePNG) {
      MatterSetup.prototype.globalContext.drawImage(thePNG, 0, 0, this.x + this.r, this.y + this.r);
    } else {
      // TODO: Figure out how to draw a Polygon.
    }
  }
}
