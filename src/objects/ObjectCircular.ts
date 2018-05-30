import { MatterBody } from './MatterBody';
import { CircularBodyOptions, XYPos } from '../matter_types';
import * as Matter from 'matter-js';
import { MatterSetup } from '../utils/MatterSetup';

// This is a circular object. Caution!
export class ObjectCircular extends MatterBody {
  r: number;

  constructor(theOptions: CircularBodyOptions) {
    super(theOptions);
    this.r = theOptions.r;

    this.body = Matter.Bodies.circle(this.x, this.y, this.r, theOptions.matterOptions);
  }

  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  show(thePNG?: HTMLCanvasElement) {
    const invariant = require('invariant');
    invariant(MatterSetup.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');
    const pos: XYPos = this.body.position;
    const angle: number = this.body.angle;

    MatterSetup.globalContext.translate(pos.x, pos.y);
    MatterSetup.globalContext.rotate(angle);
    if (thePNG) {
      MatterSetup.globalContext.drawImage(thePNG, 0, 0, this.x + this.r, this.y + this.r);
    } else {
      MatterSetup.globalContext.ellipse(0, 0, this.r * 2);
    }
  }
}
