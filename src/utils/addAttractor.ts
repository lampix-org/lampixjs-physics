import { MatterBody } from 'objects/MatterBody';
import { MatterSetup } from './MatterSetup';

// Adds a new Attractor body to the world.
export function addAttractor(attractorBody: MatterBody) {
  for (let x: number = 0; x < MatterSetup.aTAM.length; x = x + 1) {
    for (let y:number = 0; y < MatterSetup.aTAM[x].attracted.length; y = y + 1) {
      MatterSetup.aTAM[x].attracted[y].stopAttraction = false;
    }
  }
  const newHierarchy = {
    attractor: attractorBody
  };
  MatterSetup.aTAM.push(newHierarchy);
  // console.log(aTAM);
}
