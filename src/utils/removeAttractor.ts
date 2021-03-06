// Removes a given attractor body from the aTAM attractor list.
export function removeAttractor(ms: any, attractorID: number) {
  for (let x: number = ms.aTAM.length - 1; x >= 0; x = x - 1) {
    if (ms.aTAM[x].attractor.myID === attractorID) {
      ms.aTAM.splice(x, 1);
      return;
    }
  }
}
