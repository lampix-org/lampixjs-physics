import { MatterBody } from 'objects/MatterBody';
import { MatterSetup } from './MatterSetup';
import { XYPos } from 'matter_types';
import * as Matter from 'matter-js';
import { getAngleBetweenTwoPoints } from './getAngleBetweenTwoPoints';

// This attracts specific bodies to another specific one. We use the aTAM object to map the
// attractor to attracted relationships so make sure you add your attractors and attracted first!
// You can also simulate a certain orbit around the attractor if you define a minimum Orbit range.
export function attractSomeToOne(bodyA: MatterBody, bodyB: MatterBody) {
  for (let x: number = 0; x < MatterSetup.aTAM.length; x = x + 1) {
    if (MatterSetup.aTAM[x].attractor.myID === bodyA.myID) {
      for (let y: number = 0; y < MatterSetup.aTAM[x].attracted.length; y = y + 1) {
        if (MatterSetup.aTAM[x].attracted[y].stopAttraction === false && 
          MatterSetup.aTAM[x].attracted[y].object.myID === bodyB.myID) {
          let force: XYPos;
          if (MatterSetup.aTAM[x].orbitMin !== undefined) {
            const anchor: XYPos = {
              x: MatterSetup.aTAM[x].attractor.body.position.x,
              y: MatterSetup.aTAM[x].attractor.body.position.y
            };
            const point: XYPos = {
              x: MatterSetup.aTAM[x].attracted[y].object.body.position.x,
              y: MatterSetup.aTAM[x].attracted[y].object.body.position.y
            };
            const angleBetween = getAngleBetweenTwoPoints(anchor, point);
            // var dx = (aTAM[x].orbitMin + bodyA.position.x) * Math.sin(angleBetween);
            const dx = bodyA.body.position.x + Math.sin(angleBetween) * MatterSetup.aTAM[x].orbitMin;
            // var dy = (aTAM[x].orbitMin + bodyA.position.y) * Math.cos(angleBetween);
            const dy = bodyA.body.position.y + Math.cos(angleBetween) * MatterSetup.aTAM[x].orbitMin;
            const xDiff = Math.abs(dx) - bodyB.body.position.x;
            const yDiff = Math.abs(dy) - bodyB.body.position.y;
            // force = {
            //     x: (Math.abs(dx) - bodyB.position.x) * 1e-6,
            //     y: (Math.abs(dy) - bodyB.position.y) * 1e-6
            // };
            if (xDiff > -10 && xDiff < 10) {
              force.x = 0;
            } else {
              force.x = (Math.abs(dx) - bodyB.body.position.x) * 1e-5;
            }
            if (yDiff > -10 && yDiff < 10) {
              force.y = 0;
            } else {
              force.y = (Math.abs(dy) - bodyB.body.position.y) * 1e-5;
            }
            if (force.x === 0 && force.y === 0) {
              MatterSetup.aTAM[x].attracted[y].stopAttraction = true;
            }
          } else {
            if (MatterSetup.aTAM[x].attracted[y].customOrbit > 0) {
              const anchor: XYPos = {
                x: MatterSetup.aTAM[x].attractor.body.position.x,
                y: MatterSetup.aTAM[x].attractor.body.position.y
              };
              const point: XYPos = {
                x: MatterSetup.aTAM[x].attracted[y].object.body.position.x,
                y: MatterSetup.aTAM[x].attracted[y].object.body.position.y
              };
              const angleBetween = getAngleBetweenTwoPoints(anchor, point);
              // var dx = (aTAM[x].attracted[y].customOrbit + bodyA.position.x) * Math.sin(angleBetween);
              const dx = bodyA.body.position.x + Math.sin(angleBetween) * MatterSetup.aTAM[x].attracted[y].customOrbit;
              // var dy = (aTAM[x].attracted[y].customOrbit + bodyA.position.y) * Math.cos(angleBetween);
              const dy = bodyA.body.position.y + Math.cos(angleBetween) * MatterSetup.aTAM[x].attracted[y].customOrbit;
              const xDiff = Math.abs(dx) - bodyB.body.position.x;
              const yDiff = Math.abs(dy) - bodyB.body.position.y;
              // force = {
              //     x: (Math.abs(dx) - bodyB.position.x) * 1e-6,
              //     y: (Math.abs(dy) - bodyB.position.y) * 1e-6
              // };
              if (xDiff > -10 && xDiff < 10) {
                force.x = 0;
              } else {
                force.x = (Math.abs(dx) - bodyB.body.position.x) * 1e-5;
              }
              if (yDiff > -10 && yDiff < 10) {
                force.y = 0;
              } else {
                force.y = (Math.abs(dy) - bodyB.body.position.y) * 1e-5;
              }
              if (force.x === 0 && force.y === 0) {
                MatterSetup.aTAM[x].attracted[y].stopAttraction = true;
              }
            } else {
              force = {
                x: (bodyA.body.position.x - bodyB.body.position.x) * 1e-5,
                y: (bodyA.body.position.y - bodyB.body.position.y) * 1e-5
              };
            }
          }
          if (force.x !== 0 || force.y !== 0) {
            Matter.Body.applyForce(bodyB.body, bodyB.body.position, force);
          }
        }
      }
      return;
    }
  }
}
