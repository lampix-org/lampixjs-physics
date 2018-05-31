// Removes a given attracted body from the aTAM attracted bodies sublist.
export function removeAttracted(ms: any, attractedID: number, attractorID: number) {
  for (let x: number = 0; x < ms.aTAM.length; x = x + 1) {
    if (ms.aTAM[x].attractor.myID === attractorID) {
      for (let y: number = ms.aTAM[x].attracted.length - 1; y >= 0; y = y - 1) {
        if (ms.aTAM[x].attracted[y].object.myID === attractedID) {
          ms.aTAM[x].attracted.splice(y, 1);
        }
      }
      return;
    }
  }
}
