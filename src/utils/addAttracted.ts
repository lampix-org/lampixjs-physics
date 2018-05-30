import { MatterBody } from '../objects/MatterBody';
import { MatterSetup } from './MatterSetup';

// Adds a new attracted body to an attractor.
export function addAttracted(attractedBody: MatterBody, attractorID: number, customOrbit?: number) {
  for (let x: number = 0; x < MatterSetup.aTAM.length; x = x + 1) {
    if (MatterSetup.aTAM[x].attractor.myID === attractorID) {
      const newAttracted = {
        object: attractedBody,
        customOrbit: 0,
        stopAttraction: false
      };
      if (customOrbit !== undefined) {
        newAttracted.customOrbit = customOrbit;
      }
      MatterSetup.aTAM[x].attracted.push(newAttracted);
      return;
    }
  }
}
