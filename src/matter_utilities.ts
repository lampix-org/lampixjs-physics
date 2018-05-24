import * as Matter from 'matter-js';
import { ObjectRectangle, 
        ObjectCircular, 
        ObjectPolygon, 
        ObjectConstraint, 
        GlobalObject, 
        MatterBody } from 'matter_objects';
import { aTAMObject, 
        matterSetupObject, 
        rectangleBodyOptions, 
        circularBodyOptions, 
        polygonBodyOptions, 
        constraintOptions, 
        XYPos, 
        Circle,
        ObjectIdentifiers } from 'matter_types';

Matter.use('matter-attractors');

// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Body = Matter.Body;
const Bounds = Matter.Bounds;

let engine: any;
let world: any;
let render: any;
export let globalContext: any;
export let aTAM: aTAMObject;
export let setup: matterSetupObject;

// All World Objects.
const worldObjects: GlobalObject[] = [];

// Call this to setup the Matter library. Give it the width and height of your screen.
// Optional: The noWalls variable is used to disable canvas border walls.
export function matterSetup(setupOptions: matterSetupObject) {
  setup = setupOptions;
  engine = Engine.create();
  // engine.enableSleeping = true;
  if (!setupOptions.noRenderer) {
    render = Render.create({
      element: document.body,
      engine: engine,
      options: {
        width: setupOptions.width,
        height: setupOptions.height,
        // background: '#000000',
        // showAngleIndicator: false,
        wireframes: false
      },
      bounds: {
        min: { 
          x: 0, 
          y: 0 
        },
        max: { 
          x: setupOptions.width, 
          y: setupOptions.height 
        }
      }
    });
    Render.run(render);
    // Render.lookAt(render, {
    //   min: { x: 0, y: 0 },
    //   max: { x: width, y: height }
    // });
    globalContext = render.context;
  }
  world = engine.world;
  // We disable the Gravity from the start, not needed for Lampix.
  world.gravity.y = 0;
  // Engine.run(engine);  // Updates the physics as fast as it can, exceeding 60fps.

  // Creating border walls around the canvas.
  if (!setupOptions.noWalls) { 
    const options: object = {
      isStatic: true
    };

    let localOptions: rectangleBodyOptions;
    localOptions = {
      x:-25, y:setupOptions.height / 2, w:50, h:setupOptions.height, matterOptions: options
    };
    createRectangle(localOptions);
    localOptions = {
      x:setupOptions.width + 25, y:setupOptions.height / 2, w:50, h:setupOptions.height, matterOptions:options
    };
    createRectangle(localOptions);
    localOptions = {
      x:setupOptions.width / 2, y:-25, w:setupOptions.width, h:50, matterOptions: options
    };
    createRectangle(localOptions);
    localOptions = {
      x:setupOptions.width / 2, y:setupOptions.height + 25, w:setupOptions.width, h:50, matterOptions: options
    };
    createRectangle(localOptions);
  }
}

// Call this to update the physics engine as fast as you wish.
export function updateMatterEngine(timestep: number) {
  if (timestep === undefined) {
    Engine.update(engine);
  } else {
    Engine.update(engine, timestep);  // Updates the physics once per draw (60fps) when no timestep is given.
  }
}

/* Here is a list of the possible options structure:
options = {
    isStatic: true,
    friction: 0.5,
    elasticity: 0.5,
    angle: PI,
    ...,
    // This following code should be used for creating attractors between two bodies, 
    // the direction of the force being bodyB towards bodyA (bodyA is the attractor).
    // Further examples of these functions can be found below (used them!).
    plugin: {
        attractors: [
            function(bodyA, bodyB) {
                var force = {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                };

                // apply force to both bodies
                Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
                Body.applyForce(bodyB, bodyB.position, force);
            }
        ]
    }
}*/

// Call this to make a rectangular object.
export function createRectangle(theOptions: rectangleBodyOptions) {
  const newObject = new ObjectRectangle(theOptions);
  worldObjects.push(newObject);
  World.add(world, newObject.body);

  return newObject;
}

// Call this to make a circular object.
export function createCircular(theOptions: circularBodyOptions) {
  const newObject = new ObjectCircular(theOptions);
  worldObjects.push(newObject);
  World.add(world, newObject.body);

  return newObject;
}

// Call this to create a 5+ sided object.
export function createPolygon(theOptions: polygonBodyOptions) {
  const newObject = new ObjectPolygon(theOptions);
  worldObjects.push(newObject);
  World.add(world, newObject.body);

  return newObject;
}

// Call this to make a line linking 2 bodies together.
export function createConstraint(theOptions: constraintOptions) {
  const newObject = new ObjectConstraint(theOptions);
  worldObjects.push(newObject);
  World.add(world, newObject.constraint);

  return newObject;
}

// This function is called when you want to remove a body from the world.
export function deleteBody(theBody: any) {
  for (let x: number = worldObjects.length - 1; x >= 0; x = x - 1) {
    if (worldObjects[x].body !== undefined) {
      if (theBody.body.id === worldObjects[x].body.id) {
        // console.log("Deleting ", worldObjects[x]);
        World.remove(world, worldObjects[x].body);
        worldObjects.splice(x, 1);
        return;
      }
    }
  }
}

// This removes a constraint from the world.
export function deleteConstraint(theConstraint: any) {
  for (let x:number = worldObjects.length - 1; x >= 0; x = x - 1) {
    if (worldObjects[x].constraint !== undefined) {
      if (theConstraint.constraint.id === worldObjects[x].constraint.id) {
        // console.log("Deleting ", worldObjects[x]);
        World.remove(world, worldObjects[x].constraint);
        worldObjects.splice(x, 1);
        return;
      }
    }
  }
}

// This removes a composite object from the world.
export function deleteComposite(theComposite: any) {
  for (let x:number = worldObjects.length - 1; x >= 0; x = x - 1) {
    if (worldObjects[x].composite !== undefined) {
      if (theComposite.composite.id === worldObjects[x].composite.id) {
        // TODO: Make sure this is correct.
        World.remove(world, worldObjects[x].composite);
        worldObjects.splice(x, 1);
        return;
      }
    }
  }
}

// Call this to clear the Matter Library. CAREFUL! If you use this and want to reuse Matter
// you'll need to run matterSetup again.
export function clearMatter() {
  for (let x:number = worldObjects.length - 1; x >= 0; x = x - 1) {
    if (worldObjects[x].body !== undefined) {
      World.remove(world, worldObjects[x].body);
      worldObjects.splice(x, 1);
    } else if (worldObjects[x].constraint !== undefined) {
      World.remove(world, worldObjects[x].constraint);
      worldObjects.splice(x, 1);
    }
  }
  Render.stop(render);
  Engine.clear(engine);
}

// This can be used to check if a certain space within the world is occupied with another body or not.
export function checkIfSpaceOccupied(theOptions: Circle) {
  const newBounds = {
    min: {
      x: theOptions.cx - theOptions.radius,
      y: theOptions.cy - theOptions.radius
    },
    max: {
      x: theOptions.cx + theOptions.radius,
      y: theOptions.cy + theOptions.radius
    }
  };
  for (let j: number = 0; j < worldObjects.length; j = j + 1) {
    // console.log(worldObjects[j]);
    if (worldObjects[j].body !== undefined) {
      if (Bounds.overlaps(worldObjects[j].body.bounds, newBounds)) {
        return true;
      }
    }
  }
  return false;
}

// This function can be used to check if a body is currently within the screen bounds.
// Returns true if the object is on screen and false if it isn't.
export function checkOnScreen(theBody: GlobalObject) {
  const newBounds = {
    min: {
      x: render.bounds.min.x,
      y: render.bounds.min.y
    },
    max: {
      x: render.bounds.max.x,
      y: render.bounds.max.y
    }
  };

  if (Bounds.overlaps(theBody.body.bounds, newBounds)) {
    return true;
  }

  return false;
}

/* The following functions are taken from Matter JS directly.
For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
TODO: Check to see if the graphics of the objects remain unaffected by these changes.
*/

// Scales a body in size instantly.
export function scaleBody(theBody: GlobalObject, onX: number, onY: number, point: XYPos) {
  // If the point is undefined, the center of the body will be used.
  if (point === undefined) {
    Body.scale(theBody.body, onX, onY);
  } else {
    Body.scale(theBody.body, onX, onY, point);
  }
}

// Sets a body to be scaled over a delta T time.
export function scaleBodyOverTime(theBody: MatterBody, onX: number, onY: number, point: XYPos, deltaT: number) {
  theBody.setScaleOverTime(onX, onY, point, deltaT);
}

// Matter JS Function for rotating an existing body.
export function rotateBody(body: MatterBody, rotation: number) {
  Body.rotate(body.body, rotation);
}

// Matter JS Function for hitting an existing body.
export function applyForceToBody(body: MatterBody, position: XYPos, force: XYPos) {
  Body.applyForce(body.body, position, force);
}

// Matter JS Function for moving instantly an existing body.
export function setPositionOfBody(body: MatterBody, position: XYPos) {
  Body.setPosition(body.body, position);
}

// Matter JS Function for making an existing object static or not.
export function setStaticToBody(body: MatterBody, isStatic: boolean) {
  Body.setStatic(body.body, isStatic);
}

// Matter JS Function for moving an existing object.
export function translateBody(body: MatterBody, translation: XYPos) {
  Body.translate(body.body, translation);
}

// Adds a new Attractor body to the world.
export function addAttractor(attractorBody: MatterBody) {
  for (let x: number = 0; x < aTAM.length; x = x + 1) {
    for (let y:number = 0; y < aTAM[x].attracted.length; y = y + 1) {
      aTAM[x].attracted[y].stopAttraction = false;
    }
  }
  const newHierarchy = {
    attractor: attractorBody
  };
  aTAM.push(newHierarchy);
  // console.log(aTAM);
}

// Adds a new attracted body to an attractor.
export function addAttracted(attractedBody: MatterBody, attractorID: number, customOrbit: number) {
  for (let x: number = 0; x < aTAM.length; x = x + 1) {
    if (aTAM[x].attractor.myID === attractorID) {
      const newAttracted = {
        object: attractedBody,
        customOrbit: 0,
        stopAttraction: false
      };
      if (customOrbit !== undefined) {
        newAttracted.customOrbit = customOrbit;
      }
      // console.log(newAttracted);
      aTAM[x].attracted.push(newAttracted);
      return;
    }
  }
}

// This adds Orbit functionality to the Attractor so that attracted bodies don't stick to their attractor.
// The minOrbit is the minimum range between the attractor and the attracted, while maxOrbit is the maximum.
// If you supply the minOrbit only then the attracted object will tend to stick within that range of the 
// attractor, while if you specify both, the attracted will move freely between min and max ranges.
export function addAttractorOrbit(attractorID: number, minOrbit: number, maxOrbit:number) {
  for (let x: number = 0; x < aTAM.length; x = x + 1) {
    if (aTAM[x].attractor.myID === attractorID) {
      if (minOrbit !== undefined) {
        aTAM[x].orbitMin = minOrbit;
      }
      if (maxOrbit !== undefined) {
        aTAM[x].orbitMax = maxOrbit;
      }
      return;
    }
  }
}

// Removes a given attractor body from the aTAM attractor list.
export function removeAttractor(attractorID: number) {
  for (let x: number = aTAM.length - 1; x >= 0; x = x - 1) {
    if (aTAM[x].attractor.myID === attractorID) {
      aTAM.splice(x, 1);
      return;
    }
  }
}

// Removes a given attracted body from the aTAM attracted bodies sublist.
export function removeAttracted(attractedID: number, attractorID: number) {
  for (let x: number = 0; x < aTAM.length; x = x + 1) {
    if (aTAM[x].attractor.myID === attractorID) {
      for (let y: number = aTAM[x].attracted.length - 1; y >= 0; y = y - 1) {
        if (aTAM[x].attracted[y].object.myID === attractedID) {
          aTAM[x].attracted.splice(y, 1);
        }
      }
      return;
    }
  }
}

// The following are attractor functions for making bodies have gravity / attraction.

// This function is used to attract everybody else to the body that has this applied to it.
export function attractAllToOne(bodyA: MatterBody, bodyB: MatterBody) {
  return {
    x: (bodyA.body.position.x - bodyB.body.position.x) * 1e-5,
    y: (bodyA.body.position.y - bodyB.body.position.y) * 1e-5,
  };
}

// This attracts specific bodies to another specific one. We use the aTAM object to map the
// attractor to attracted relationships so make sure you add your attractors and attracted first!
// You can also simulate a certain orbit around the attractor if you define a minimum Orbit range.
export function attractSomeToOne(bodyA: MatterBody, bodyB: MatterBody) {
  for (let x: number = 0; x < aTAM.length; x = x + 1) {
    if (aTAM[x].attractor.myID === bodyA.myID) {
      for (let y: number = 0; y < aTAM[x].attracted.length; y = y + 1) {
        if (aTAM[x].attracted[y].stopAttraction === false && aTAM[x].attracted[y].object.myID === bodyB.myID) {
          let force: XYPos;
          if (aTAM[x].orbitMin !== undefined) {
            // console.log("Calculating min orbit Min");
            const anchor: XYPos = {
              x: aTAM[x].attractor.body.position.x,
              y: aTAM[x].attractor.body.position.y
            };
            const point: XYPos = {
              x: aTAM[x].attracted[y].object.body.position.x,
              y: aTAM[x].attracted[y].object.body.position.y
            };
            const angleBetween = getAngleBetweenTwoPoints(anchor, point);
            // var dx = (aTAM[x].orbitMin + bodyA.position.x) * Math.sin(angleBetween);
            const dx = bodyA.body.position.x + Math.sin(angleBetween) * aTAM[x].orbitMin;
            // var dy = (aTAM[x].orbitMin + bodyA.position.y) * Math.cos(angleBetween);
            const dy = bodyA.body.position.y + Math.cos(angleBetween) * aTAM[x].orbitMin;
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
              aTAM[x].attracted[y].stopAttraction = true;
            }
          } else {
            if (aTAM[x].attracted[y].customOrbit > 0) {
              // console.log("Calculating custom orbit force");
              const anchor: XYPos = {
                x: aTAM[x].attractor.body.position.x,
                y: aTAM[x].attractor.body.position.y
              };
              const point: XYPos = {
                x: aTAM[x].attracted[y].object.body.position.x,
                y: aTAM[x].attracted[y].object.body.position.y
              };
              const angleBetween = getAngleBetweenTwoPoints(anchor, point);
              // var dx = (aTAM[x].attracted[y].customOrbit + bodyA.position.x) * Math.sin(angleBetween);
              const dx = bodyA.body.position.x + Math.sin(angleBetween) * aTAM[x].attracted[y].customOrbit;
              // var dy = (aTAM[x].attracted[y].customOrbit + bodyA.position.y) * Math.cos(angleBetween);
              const dy = bodyA.body.position.y + Math.cos(angleBetween) * aTAM[x].attracted[y].customOrbit;
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
                aTAM[x].attracted[y].stopAttraction = true;
              }
            } else {
              // console.log("Calculating normal force");
              force = {
                x: (bodyA.body.position.x - bodyB.body.position.x) * 1e-5,
                y: (bodyA.body.position.y - bodyB.body.position.y) * 1e-5
              };
            }
          }
          if (force.x !== 0 || force.y !== 0) {
            Body.applyForce(bodyB.body, bodyB.body.position, force);
          }
        }
      }
      return;
    }
  }
}

// ----------------------------------------------------------------------------

// Returns the angle between two given points.
export function getAngleBetweenTwoPoints(anchor: XYPos, point: XYPos) {
  // var angle = Math.atan2(anchorY - pointY, anchorX - pointX) * (180 / Math.PI);
  const angle = Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI + 180;
  // if(angle < 0) {
  //     angle += 360;
  // }
  return angle;
}

// This calculates a valid position within the screen bounds for a desired recommendation object.
// The index represents the recommendation index for the product.
// cx and cy are the center points for the product.
// objectWidth and objectHeight are the width and height of the reccomended object.
export function suggestPositionWithinScreenBounds(theOptions: ObjectIdentifiers) {

  let linelength: number = 70;// + Math.random() * 50;
  let alpha = randomAlphaMinMaxDeg((theOptions.index * 90) + 90, (theOptions.index * 90) + 120);
  let destx = theOptions.cx + Math.sin(alpha + 60) * linelength;
  let desty = theOptions.cy + Math.cos(alpha + 60) * linelength;
    
  do {
    if (destx < (theOptions.w / 2) || desty < (theOptions.h / 2) || 
    destx > setup.width - (theOptions.w / 2) || 
    desty > setup.height - (theOptions.h / 2)) {
      if (destx < (theOptions.w / 2)) {
        alpha = randomAlphaMinMaxDeg(theOptions.index, 30 + theOptions.index * 45);
      }
      if (desty < (theOptions.h / 2)) {
        alpha = randomAlphaMinMaxDeg(theOptions.index * 45, 30 + theOptions.index * 90);
      }
      if (destx > setup.width - (theOptions.w / 2)) {
        alpha = randomAlphaMinMaxDeg(theOptions.index * 180, 30 + theOptions.index * 245);
      }
      if (desty > setup.height - (theOptions.h / 2)) {
        alpha = randomAlphaMinMaxDeg(theOptions.index * 245, 30 + theOptions.index * 300);
      }
      linelength = linelength - 1;
      destx = theOptions.cx + Math.sin(alpha) * linelength;
      desty = theOptions.cy + Math.cos(alpha) * linelength;
    }
  } while (destx < (theOptions.w / 2) || desty < (theOptions.h / 2) || 
        destx > setup.width - (theOptions.w / 2) || 
        desty > setup.height - (theOptions.h / 2));
    // by here in the code the destx and desty coords should be set

  return { x: destx, y: desty };
}

export function randomAlphaMinMaxDeg(min: number, max: number) {
  return (Math.floor(Math.random() * (max - min + 1)) + min) * (Math.PI / 180);
}
