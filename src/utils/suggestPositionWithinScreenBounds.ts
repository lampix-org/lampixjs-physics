import { ObjectIdentifiers } from '../matter_types';
import { randomAlphaMinMaxDeg } from './randomAlphaMinMaxDeg';

// This calculates a valid position within the screen bounds for a desired recommendation object.
// The index represents the recommendation index for the product.
// cx and cy are the center points for the product.
// objectWidth and objectHeight are the width and height of the reccomended object.
export function suggestPositionWithinScreenBounds(ms: any, theOptions: ObjectIdentifiers) {

  let linelength: number = 70;// + Math.random() * 50;
  let alpha = randomAlphaMinMaxDeg((theOptions.index * 90) + 90, (theOptions.index * 90) + 120);
  let destx = theOptions.cx + Math.sin(alpha + 60) * linelength;
  let desty = theOptions.cy + Math.cos(alpha + 60) * linelength;
    
  do {
    if (destx < (theOptions.w / 2) || desty < (theOptions.h / 2) || 
    destx > ms.setup.width - (theOptions.w / 2) || 
    desty > ms.setup.height - (theOptions.h / 2)) {
      if (destx < (theOptions.w / 2)) {
        alpha = randomAlphaMinMaxDeg(theOptions.index, 30 + theOptions.index * 45);
      }
      if (desty < (theOptions.h / 2)) {
        alpha = randomAlphaMinMaxDeg(theOptions.index * 45, 30 + theOptions.index * 90);
      }
      if (destx > ms.setup.width - (theOptions.w / 2)) {
        alpha = randomAlphaMinMaxDeg(theOptions.index * 180, 30 + theOptions.index * 245);
      }
      if (desty > ms.setup.height - (theOptions.h / 2)) {
        alpha = randomAlphaMinMaxDeg(theOptions.index * 245, 30 + theOptions.index * 300);
      }
      linelength = linelength - 1;
      destx = theOptions.cx + Math.sin(alpha) * linelength;
      desty = theOptions.cy + Math.cos(alpha) * linelength;
    }
  } while (destx < (theOptions.w / 2) || desty < (theOptions.h / 2) || 
        destx > ms.setup.width - (theOptions.w / 2) || 
        desty > ms.setup.height - (theOptions.h / 2));
    // by here in the code the destx and desty coords should be set

  return { x: destx, y: desty };
}
