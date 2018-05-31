import * as Matter from 'matter-js';

// Call this to clear the Matter Library. CAREFUL! If you use this and want to reuse Matter
// you'll need to run matterSetup again.
export function clearMatter(ms: any) {
  for (let x:number = ms.worldObjects.length - 1; x >= 0; x = x - 1) {
    if (ms.worldObjects[x].body !== undefined) {
      Matter.World.remove(ms.world, ms.worldObjects[x].body);
      ms.worldObjects.splice(x, 1);
    } else if (ms.worldObjects[x].constraint !== undefined) {
      Matter.World.remove(ms.world, ms.worldObjects[x].constraint);
      ms.worldObjects.splice(x, 1);
    }
  }
  Matter.Render.stop(ms.render);
  Matter.Engine.clear(ms.engine);
}
