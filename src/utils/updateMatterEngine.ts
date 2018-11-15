import * as Matter from 'matter-js';

// Call this to update the physics engine as fast as you wish.
export function updateMatterEngine(ms: any, timestep?: number) {
  if (timestep === undefined) {
    Matter.Engine.update(ms.engine);
  } else {
    Matter.Engine.update(ms.engine, timestep);
  }
}
