import { MatterSetup } from './MatterSetup';

// This adds Orbit functionality to the Attractor so that attracted bodies don't stick to their attractor.
// The minOrbit is the minimum range between the attractor and the attracted, while maxOrbit is the maximum.
// If you supply the minOrbit only then the attracted object will tend to stick within that range of the 
// attractor, while if you specify both, the attracted will move freely between min and max ranges.
export function addAttractorOrbit(attractorID: number, minOrbit?: number, maxOrbit?:number) {
  for (let x: number = 0; x < MatterSetup.aTAM.length; x = x + 1) {
    if (MatterSetup.aTAM[x].attractor.myID === attractorID) {
      if (minOrbit !== undefined) {
        MatterSetup.aTAM[x].orbitMin = minOrbit;
      }
      if (maxOrbit !== undefined) {
        MatterSetup.aTAM[x].orbitMax = maxOrbit;
      }
      return;
    }
  }
}
