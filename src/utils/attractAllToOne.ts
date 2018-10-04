// This function is used to attract everybody else to the body that has this applied to it.
export function attractAllToOne(bodyA: any, bodyB: any) {
  return {
    x: (bodyA.position.x - bodyB.position.x) * 1e-5,
    y: (bodyA.position.y - bodyB.position.y) * 1e-5,
  };
}
