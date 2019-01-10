import { SliderRail } from 'objects/SliderRail';
import { deleteBody } from './deleteBody';
import { deleteConstraint } from './deleteConstraint';

// This function is called when you want to remove a body from the world.
export function deleteSliderRail(ms: any, theRail: SliderRail) {
  for (let x: number = theRail.bearings.length - 1; x >= 0; x = x - 1) {
    if (theRail.bearings[x].body !== undefined) {
      deleteBody(ms, theRail.bearings[x].body);
    }
    if (theRail.bearings[x].constraint != null) {
      deleteConstraint(ms, theRail.bearings[x].constraint);
    }
    theRail.bearings.splice(x, 1);
  }
  deleteBody(ms, theRail.railGuardLeft.body);
  deleteBody(ms, theRail.railGuardRight.body);
  deleteBody(ms, theRail.topGuard);
  deleteBody(ms, theRail.body);
}
