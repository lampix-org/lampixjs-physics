import * as Matter from 'matter-js';
import { ATAMObject, 
        MatterSetupObject, 
        RectangleBodyOptions } from 'matter_types';
import { createRectangle } from './createRectangle';
import { GlobalObject } from 'objects/GlobalObject';

// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;

// Call this to setup the Matter library. Give it the width and height of your screen.
// Optional: The noWalls variable is used to disable canvas border walls.
export class MatterSetup {
  static globalContext: any;
  static aTAM: ATAMObject[] = [];
  static setup: MatterSetupObject;
  static engine: any;
  static world: any;
  static render: any;

  // All World Objects.
  static worldObjects: GlobalObject[] = [];

  constructor(setupOptions: MatterSetupObject) {
    Matter.use('matter-attractors');
    MatterSetup.setup = setupOptions;
    MatterSetup.engine = Engine.create();
    // engine.enableSleeping = true;
    if (!setupOptions.noRenderer) {
      MatterSetup.render = Render.create({
        element: document.body,
        engine: MatterSetup.engine,
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
      Render.run(MatterSetup.render);
      // Render.lookAt(render, {
      //   min: { x: 0, y: 0 },
      //   max: { x: width, y: height }
      // });
      MatterSetup.globalContext = MatterSetup.render.context;
    }
    MatterSetup.world = MatterSetup.engine.world;
    // We disable the Gravity from the start, not needed for Lampix.
    MatterSetup.world.gravity.y = 0;
    // Engine.run(engine);  // Updates the physics as fast as it can, exceeding 60fps.

    // Creating border walls around the canvas.
    if (!setupOptions.noWalls) { 
      const options: object = {
        isStatic: true
      };

      let localOptions: RectangleBodyOptions;
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
