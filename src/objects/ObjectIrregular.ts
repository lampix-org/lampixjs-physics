import { MatterBody } from './MatterBody';
import { IrregularBodyOptions } from '../matter_types';
import * as Matter from 'matter-js';
import { MatterSetup } from '../utils/MatterSetup';

// This is a circular object. Caution!
export class ObjectIrregular extends MatterBody {
  vertices: any;
  colorStroke: string;
  colorFill: string;
  lineWidth: number;

  constructor(theOptions: IrregularBodyOptions) {
    super(theOptions);
    this.vertices = theOptions.vertices;
    this.colorStroke = theOptions.colorStroke;
    if (this.colorStroke === null)  {
      this.colorStroke = '#C0C0C0';
    }
    this.colorFill = theOptions.colorFill;
    if (this.colorFill === null) {
      this.colorFill = '#008080';
    }
    this.lineWidth = theOptions.lineWidth;
    if (this.lineWidth === null) {
      this.lineWidth = 4;
    }
    this.body = Matter.Bodies.fromVertices(this.x, this.y, this.vertices, theOptions.matterOptions);
  }

  // This can be used to draw the object manually. WARNING! Matter Render must be enabled for this to work!
  show() {
    const invariant = require('invariant');
    invariant(MatterSetup.prototype.setup.noRenderer, 'Matter Render was not enabled! This function cannot be called.');

    MatterSetup.prototype.globalContext.beginPath();
    MatterSetup.prototype.globalContext.moveTo(this.vertices[0].x, this.vertices[0].y);
    for (let x = 1; x < this.vertices.length; x = x + 1) {
      MatterSetup.prototype.globalContext.lineTo(this.vertices[x].x, this.vertices[x].y);
    }
    MatterSetup.prototype.globalContext.lineWidth = this.lineWidth;
    MatterSetup.prototype.globalContext.strokeStyle = this.colorStroke;
    MatterSetup.prototype.globalContext.stroke();
    MatterSetup.prototype.globalContext.fillStyle = this.colorFill;
    MatterSetup.prototype.globalContext.fill();
  }
}
