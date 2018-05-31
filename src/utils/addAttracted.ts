import { MatterBody } from '../objects/MatterBody';

// Adds a new attracted body to an attractor.
export function addAttracted(ms: any, attractedBody: MatterBody, attractorID: number, customOrbit?: number) {
  for (let x: number = 0; x < ms.aTAM.length; x = x + 1) {
    if (ms.aTAM[x].attractor.myID === attractorID) {
      const newAttracted = {
        object: attractedBody,
        customOrbit: 0,
        stopAttraction: false
      };
      if (customOrbit !== undefined) {
        newAttracted.customOrbit = customOrbit;
      }
      ms.aTAM[x].attracted.push(newAttracted);
      return;
    }
  }
}
