import * as Matter from 'matter-js';
import { MatterSetup } from './MatterSetup';

// This removes a composite object from the world.
export function deleteComposite(theComposite: any) {
  for (let x:number = MatterSetup.worldObjects.length - 1; x >= 0; x = x - 1) {
    if (MatterSetup.worldObjects[x].composite !== undefined) {
      if (theComposite.composite.id === MatterSetup.worldObjects[x].composite.id) {
        // TODO: Make sure this is correct.
        Matter.World.remove(MatterSetup.world, MatterSetup.worldObjects[x].composite);
        MatterSetup.worldObjects.splice(x, 1);
        return;
      }
    }
  }
}
