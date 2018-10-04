import { XYPos } from '../matter_types';
import * as Matter from 'matter-js';
import { getAngleBetweenTwoPoints } from './getAngleBetweenTwoPoints';

// This attracts specific bodies to another specific one. We use the aTAM object to map the
// attractor to attracted relationships so make sure you add your attractors and attracted first!
// You can also simulate a certain orbit around the attractor if you define a minimum Orbit range.
export function attractSomeToOne(ms: any, bodyA: any, bodyB: any) {
  for (let x: number = 0; x < ms.aTAM.length; x = x + 1) {
    const aTAMEntry = ms.aTAM[x];
    if (aTAMEntry.attractor.body.id === bodyA.id) {
      const theAttractor = aTAMEntry.attractor.body;
      for (let y: number = 0; y < aTAMEntry.attracted.length; y = y + 1) {
        const theAttracted = aTAMEntry.attracted[y];
        if (theAttracted.stopAttraction === false &&
          theAttracted.object.body.id === bodyB.id) {
          let force: XYPos = {
            x: 0,
            y: 0
          };
          if (aTAMEntry.orbitMin !== undefined) {
            const anchor: XYPos = {
              x: theAttractor.position.x,
              y: theAttractor.position.y
            };
            const point: XYPos = {
              x: theAttracted.object.body.position.x,
              y: theAttracted.object.body.position.y
            };
            const angleBetween = getAngleBetweenTwoPoints(anchor, point);
            const dx = bodyA.position.x + Math.cos(angleBetween / 180 * Math.PI) * aTAMEntry.orbitMin;
            const dy = bodyA.position.y + (Math.sin(angleBetween / 180 * Math.PI) * aTAMEntry.orbitMin * -1);
            const xDiff = Math.abs(dx) - bodyB.position.x;
            const yDiff = Math.abs(dy) - bodyB.position.y;
            // force = {
            //     x: (Math.abs(dx) - bodyB.position.x) * 1e-6,
            //     y: (Math.abs(dy) - bodyB.position.y) * 1e-6
            // };
            if (xDiff > -10 && xDiff < 10) {
              force.x = 0;
            } else {
              force.x = (Math.abs(dx) - bodyB.position.x) * 1e-5;
            }
            if (yDiff > -10 && yDiff < 10) {
              force.y = 0;
            } else {
              force.y = (Math.abs(dy) - bodyB.position.y) * 1e-5;
            }
            // if (force.x === 0 && force.y === 0) {
            //   theAttracted.stopAttraction = true;
            // }
          } else {
            if (theAttracted.customOrbit > 0) {
              const anchor: XYPos = {
                x: theAttractor.position.x,
                y: theAttractor.position.y
              };
              const point: XYPos = {
                x: theAttracted.object.body.position.x,
                y: theAttracted.object.body.position.y
              };
              const angleBetween = getAngleBetweenTwoPoints(anchor, point);
              const dx = bodyA.position.x + Math.cos(angleBetween / 180 * Math.PI)
                * theAttracted.customOrbit;
              const dy = bodyA.position.y + (Math.sin(angleBetween / 180 * Math.PI)
                * theAttracted.customOrbit * -1);
              const xDiff = Math.abs(dx) - bodyB.position.x;
              const yDiff = Math.abs(dy) - bodyB.position.y;
              // force = {
              //     x: (Math.abs(dx) - bodyB.position.x) * 1e-6,
              //     y: (Math.abs(dy) - bodyB.position.y) * 1e-6
              // };
              if (xDiff > -1 && xDiff < 1) {
                force.x = 0;
                bodyB.velocity.x = 0;
              } else {
                force.x = (Math.abs(dx) - bodyB.position.x) * 1e-5;
              }
              if (yDiff > -1 && yDiff < 1) {
                force.y = 0;
                bodyB.velocity.y = 0;
              } else {
                force.y = (Math.abs(dy) - bodyB.position.y) * 1e-5;
              }
              // if (force.x === 0 && force.y === 0) {
              //   theAttracted.stopAttraction = true;
              // }
            } else {
              force = {
                x: (bodyA.position.x - bodyB.position.x) * 1e-5,
                y: (bodyA.position.y - bodyB.position.y) * 1e-5
              };
            }
          }
          if (force.x !== 0 || force.y !== 0) {
            Matter.Body.applyForce(bodyB, bodyB.position, force);
          }
        }
      }
      return;
    }
  }
}
