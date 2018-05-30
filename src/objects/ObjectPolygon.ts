import { MatterBody } from './MatterBody';
import { PolygonBodyOptions } from '../matter_types';
import { Bodies } from 'matter-js';
import { MatterSetup } from '../utils/MatterSetup';

// This is a Polygon! It's Polymisterious.
export class ObjectPolygon extends MatterBody {
  r: number;
  sides: number;

  constructor(theOptions: PolygonBodyOptions) {
    super(theOptions);

    this.r = theOptions.r;
    this.sides = theOptions.sides;

    this.body = Bodies.polygon(this.x, this.y, this.sides, this.r, theOptions.matterOptions);
  }
  
  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  show(thePNG?: HTMLCanvasElement) {
    const invariant = require('invariant');
    invariant(MatterSetup.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');
    const pos = this.body.position;
    const angle = this.body.angle;

    MatterSetup.globalContext.translate(pos.x, pos.y);
    MatterSetup.globalContext.rotate(angle);
    if (thePNG) {
      MatterSetup.globalContext.drawImage(thePNG, 0, 0, this.x + this.r, this.y + this.r);
    } else {
      // TODO: Figure out how to draw a Polygon.
    }
  }
}
