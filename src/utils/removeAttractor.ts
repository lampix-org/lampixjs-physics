import { MatterSetup } from './MatterSetup';

// Removes a given attractor body from the aTAM attractor list.
export function removeAttractor(attractorID: number) {
  for (let x: number = MatterSetup.aTAM.length - 1; x >= 0; x = x - 1) {
    if (MatterSetup.aTAM[x].attractor.myID === attractorID) {
      MatterSetup.aTAM.splice(x, 1);
      return;
    }
  }
}
