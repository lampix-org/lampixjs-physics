import { Circle } from '../matter_types';
import { Bounds } from 'matter-js';
import { MatterSetup } from './MatterSetup';

// This can be used to check if a certain space within the world is occupied with another body or not.
export function checkIfSpaceOccupied(theOptions: Circle) {
  const newBounds = {
    min: {
      x: theOptions.cx - theOptions.radius,
      y: theOptions.cy - theOptions.radius
    },
    max: {
      x: theOptions.cx + theOptions.radius,
      y: theOptions.cy + theOptions.radius
    }
  };
  for (let j: number = 0; j < MatterSetup.worldObjects.length; j = j + 1) {
    if (MatterSetup.worldObjects[j].body !== undefined) {
      if (Bounds.overlaps(MatterSetup.worldObjects[j].body.bounds, newBounds)) {
        return true;
      }
    }
  }
  return false;
}
