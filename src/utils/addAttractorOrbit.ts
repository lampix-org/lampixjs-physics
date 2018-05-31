// This adds Orbit functionality to the Attractor so that attracted bodies don't stick to their attractor.
// The minOrbit is the minimum range between the attractor and the attracted, while maxOrbit is the maximum.
// If you supply the minOrbit only then the attracted object will tend to stick within that range of the 
// attractor, while if you specify both, the attracted will move freely between min and max ranges.
export function addAttractorOrbit(ms: any, attractorID: number, minOrbit?: number, maxOrbit?:number) {
  for (let x: number = 0; x < ms.aTAM.length; x = x + 1) {
    if (ms.aTAM[x].attractor.myID === attractorID) {
      if (minOrbit !== undefined) {
        ms.aTAM[x].orbitMin = minOrbit;
      }
      if (maxOrbit !== undefined) {
        ms.aTAM[x].orbitMax = maxOrbit;
      }
      return;
    }
  }
}
