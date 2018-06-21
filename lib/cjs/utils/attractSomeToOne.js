"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
const getAngleBetweenTwoPoints_1 = require("./getAngleBetweenTwoPoints");
// This attracts specific bodies to another specific one. We use the aTAM object to map the
// attractor to attracted relationships so make sure you add your attractors and attracted first!
// You can also simulate a certain orbit around the attractor if you define a minimum Orbit range.
function attractSomeToOne(ms, bodyA, bodyB) {
    for (let x = 0; x < ms.aTAM.length; x = x + 1) {
        if (ms.aTAM[x].attractor.myID === bodyA.myID) {
            for (let y = 0; y < ms.aTAM[x].attracted.length; y = y + 1) {
                if (ms.aTAM[x].attracted[y].stopAttraction === false &&
                    ms.aTAM[x].attracted[y].object.myID === bodyB.myID) {
                    let force;
                    if (ms.aTAM[x].orbitMin !== undefined) {
                        const anchor = {
                            x: ms.aTAM[x].attractor.body.position.x,
                            y: ms.aTAM[x].attractor.body.position.y
                        };
                        const point = {
                            x: ms.aTAM[x].attracted[y].object.body.position.x,
                            y: ms.aTAM[x].attracted[y].object.body.position.y
                        };
                        const angleBetween = getAngleBetweenTwoPoints_1.getAngleBetweenTwoPoints(anchor, point);
                        // var dx = (aTAM[x].orbitMin + bodyA.position.x) * Math.sin(angleBetween);
                        const dx = bodyA.body.position.x + Math.sin(angleBetween) * ms.aTAM[x].orbitMin;
                        // var dy = (aTAM[x].orbitMin + bodyA.position.y) * Math.cos(angleBetween);
                        const dy = bodyA.body.position.y + Math.cos(angleBetween) * ms.aTAM[x].orbitMin;
                        const xDiff = Math.abs(dx) - bodyB.body.position.x;
                        const yDiff = Math.abs(dy) - bodyB.body.position.y;
                        // force = {
                        //     x: (Math.abs(dx) - bodyB.position.x) * 1e-6,
                        //     y: (Math.abs(dy) - bodyB.position.y) * 1e-6
                        // };
                        if (xDiff > -10 && xDiff < 10) {
                            force.x = 0;
                        }
                        else {
                            force.x = (Math.abs(dx) - bodyB.body.position.x) * 1e-5;
                        }
                        if (yDiff > -10 && yDiff < 10) {
                            force.y = 0;
                        }
                        else {
                            force.y = (Math.abs(dy) - bodyB.body.position.y) * 1e-5;
                        }
                        if (force.x === 0 && force.y === 0) {
                            ms.aTAM[x].attracted[y].stopAttraction = true;
                        }
                    }
                    else {
                        if (ms.aTAM[x].attracted[y].customOrbit > 0) {
                            const anchor = {
                                x: ms.aTAM[x].attractor.body.position.x,
                                y: ms.aTAM[x].attractor.body.position.y
                            };
                            const point = {
                                x: ms.aTAM[x].attracted[y].object.body.position.x,
                                y: ms.aTAM[x].attracted[y].object.body.position.y
                            };
                            const angleBetween = getAngleBetweenTwoPoints_1.getAngleBetweenTwoPoints(anchor, point);
                            // var dx = (aTAM[x].attracted[y].customOrbit + bodyA.position.x) * Math.sin(angleBetween);
                            const dx = bodyA.body.position.x + Math.sin(angleBetween) * ms.aTAM[x].attracted[y].customOrbit;
                            // var dy = (aTAM[x].attracted[y].customOrbit + bodyA.position.y) * Math.cos(angleBetween);
                            const dy = bodyA.body.position.y + Math.cos(angleBetween) * ms.aTAM[x].attracted[y].customOrbit;
                            const xDiff = Math.abs(dx) - bodyB.body.position.x;
                            const yDiff = Math.abs(dy) - bodyB.body.position.y;
                            // force = {
                            //     x: (Math.abs(dx) - bodyB.position.x) * 1e-6,
                            //     y: (Math.abs(dy) - bodyB.position.y) * 1e-6
                            // };
                            if (xDiff > -10 && xDiff < 10) {
                                force.x = 0;
                            }
                            else {
                                force.x = (Math.abs(dx) - bodyB.body.position.x) * 1e-5;
                            }
                            if (yDiff > -10 && yDiff < 10) {
                                force.y = 0;
                            }
                            else {
                                force.y = (Math.abs(dy) - bodyB.body.position.y) * 1e-5;
                            }
                            if (force.x === 0 && force.y === 0) {
                                ms.aTAM[x].attracted[y].stopAttraction = true;
                            }
                        }
                        else {
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
exports.attractSomeToOne = attractSomeToOne;
