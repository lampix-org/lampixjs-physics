// Function used to change the Matter World Gravity.
export function setGravity(ms: any, gravityX: 0, gravityY: 0) {
  ms.world.gravity.x = gravityX;
  ms.world.gravity.y = gravityY;
}
