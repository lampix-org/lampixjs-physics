import * as Matter from 'matter-js';
import { MatterSetup } from './MatterSetup';

// This function is called when you want to remove a body from the world.
export function deleteBody(theBody: any) {
  for (let x: number = MatterSetup.worldObjects.length - 1; x >= 0; x = x - 1) {
    if (MatterSetup.worldObjects[x].body !== undefined) {
      if (theBody.body.id === MatterSetup.worldObjects[x].body.id) {
        Matter.World.remove(MatterSetup.world, MatterSetup.worldObjects[x].body);
        MatterSetup.worldObjects.splice(x, 1);
        return;
      }
    }
  }
}
