import { MatterBody } from './MatterBody';
import { polygonBodyOptions } from 'matter_types';
import { Bodies } from 'matter-js';
import { MatterSetup } from './../utils/MatterSetup';

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
  objectShow(thePNG?: HTMLCanvasElement) {
    const pos = this.body.position;
    console.log('Is the position correct? ', pos);
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
