import { World, Render, Engine } from 'matter-js';
import { MatterSetup } from './MatterSetup';

// Call this to clear the Matter Library. CAREFUL! If you use this and want to reuse Matter
// you'll need to run matterSetup again.
export function clearMatter() {
  for (let x:number = MatterSetup.worldObjects.length - 1; x >= 0; x = x - 1) {
    if (MatterSetup.worldObjects[x].body !== undefined) {
      World.remove(MatterSetup.world, MatterSetup.worldObjects[x].body);
      MatterSetup.worldObjects.splice(x, 1);
    } else if (MatterSetup.worldObjects[x].constraint !== undefined) {
      World.remove(MatterSetup.world, MatterSetup.worldObjects[x].constraint);
      MatterSetup.worldObjects.splice(x, 1);
    }
  }
  Render.stop(MatterSetup.render);
  Engine.clear(MatterSetup.engine);
}
