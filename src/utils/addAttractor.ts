import { MatterBody } from '../objects/MatterBody';

// Adds a new Attractor body to the world.
export function addAttractor(ms: any, attractorBody: MatterBody) {
  for (let x: number = 0; x < ms.aTAM.length; x = x + 1) {
    for (let y:number = 0; y < ms.aTAM[x].attracted.length; y = y + 1) {
      ms.aTAM[x].attracted[y].stopAttraction = false;
    }
  }
  const newHierarchy = {
    attractor: attractorBody
  };
  ms.aTAM.push(newHierarchy);
  ms.aTAM[ms.aTAM.length - 1].attracted = [];
}
