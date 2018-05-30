import * as Matter from 'matter-js';
import { MatterSetup } from './MatterSetup';

// This removes a constraint from the world.
export function deleteConstraint(theConstraint: any) {
  for (let x:number = MatterSetup.worldObjects.length - 1; x >= 0; x = x - 1) {
    if (MatterSetup.worldObjects[x].constraint !== undefined) {
      if (theConstraint.constraint.id === MatterSetup.worldObjects[x].constraint.id) {
        Matter.World.remove(MatterSetup.world, MatterSetup.worldObjects[x].constraint);
        MatterSetup.worldObjects.splice(x, 1);
        return;
      }
    }
  }
}
