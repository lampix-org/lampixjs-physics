import { MatterBody } from './MatterBody';
import { RectangleBodyOptions, XYPos } from '../matter_types';
import * as Matter from 'matter-js';
import { MatterSetup } from '../utils/MatterSetup';

// This is a rectangle. Use it wisely.
export class ObjectRectangle extends MatterBody {
  w: number;
  h: number;

  constructor(theOptions: RectangleBodyOptions) {
    super(theOptions);
    this.w = theOptions.w;
    this.h = theOptions.h;

    this.body = Matter.Bodies.rectangle(this.x, this.y, this.w, this.h, theOptions.matterOptions);
  }

  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  show(thePNG?: HTMLCanvasElement) {
    const invariant = require('invariant');
    invariant(MatterSetup.prototype.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');
    const pos: XYPos = this.body.position;
    const angle: number = this.body.angle;

    MatterSetup.prototype.globalContext.translate(pos.x, pos.y);
    MatterSetup.prototype.globalContext.rotate(angle);
    if (thePNG) {
      MatterSetup.prototype.globalContext.drawImage(thePNG, 0, 0, this.w, this.h);
    } else {
      MatterSetup.prototype.globalContext.rect(0, 0, this.w, this.h);
    }
  }
}
