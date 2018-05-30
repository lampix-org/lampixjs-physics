import { MatterBody } from '../objects/MatterBody';
import { XYPos } from '../matter_types';

// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 

// Sets a body to be scaled over a delta T time.
export function scaleBodyOverTime(theBody: MatterBody, onX: number, onY: number, point: XYPos, deltaT: number) {
  theBody.setScaleOverTime(onX, onY, point, deltaT);
}
