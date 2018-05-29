import { MatterBody } from './MatterBody';
import { circularBodyOptions, XYPos } from 'matter_types';
import { Bodies } from 'matter-js';
import { MatterSetup } from './../utils/MatterSetup';

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

    MatterSetup.globalContext.translate(pos.x, pos.y);
    MatterSetup.globalContext.rotate(angle);
    if (thePNG !== undefined) {
      MatterSetup.globalContext.drawImage(thePNG, 0, 0, this.x + this.r, this.y + this.r);
    } else {
      MatterSetup.globalContext.ellipse(0, 0, this.r * 2);
    }
  }
}
