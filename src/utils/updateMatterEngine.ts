import { Engine } from 'matter-js';
import { MatterSetup } from './MatterSetup';

// Call this to update the physics engine as fast as you wish.
export function updateMatterEngine(timestep: number) {
  if (timestep === undefined) {
    Engine.update(MatterSetup.engine);
  } else {
    // Updates the physics once per draw (60fps) when no timestep is given.
    Engine.update(MatterSetup.engine, timestep);  
  }
}
