import { MatterSetup } from './MatterSetup';

// Removes a given attracted body from the aTAM attracted bodies sublist.
export function removeAttracted(attractedID: number, attractorID: number) {
  for (let x: number = 0; x < MatterSetup.aTAM.length; x = x + 1) {
    if (MatterSetup.aTAM[x].attractor.myID === attractorID) {
      for (let y: number = MatterSetup.aTAM[x].attracted.length - 1; y >= 0; y = y - 1) {
        if (MatterSetup.aTAM[x].attracted[y].object.myID === attractedID) {
          MatterSetup.aTAM[x].attracted.splice(y, 1);
        }
      }
      return;
    }
  }
}
