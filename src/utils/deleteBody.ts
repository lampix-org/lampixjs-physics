import * as Matter from 'matter-js';

// This function is called when you want to remove a body from the world.
export function deleteBody(ms: any, theBody: any) {
  for (let x: number = ms.worldObjects.length - 1; x >= 0; x = x - 1) {
    if (ms.worldObjects[x].body !== undefined) {
      if (theBody.body.id === ms.worldObjects[x].body.id) {
        Matter.World.remove(ms.world, ms.worldObjects[x].body);
        ms.worldObjects.splice(x, 1);
        return;
      }
    }
  }
}
