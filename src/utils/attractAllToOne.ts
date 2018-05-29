import { MatterBody } from 'objects/MatterBody';

// This function is used to attract everybody else to the body that has this applied to it.
export function attractAllToOne(bodyA: MatterBody, bodyB: MatterBody) {
  return {
    x: (bodyA.body.position.x - bodyB.body.position.x) * 1e-5,
    y: (bodyA.body.position.y - bodyB.body.position.y) * 1e-5,
  };
}
