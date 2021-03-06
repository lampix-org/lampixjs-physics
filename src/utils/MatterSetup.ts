import * as Matter from 'matter-js';

import {
  ATAMObject,
  MatterSetupObject,
  RectangleBodyOptions
} from '../matter_types';
import { GlobalObject } from '../objects/GlobalObject';

import { addAttracted } from '../utils/addAttracted';
import { addAttractor } from '../utils/addAttractor';
import { addAttractorOrbit } from '../utils/addAttractorOrbit';
import { applyForceToBody } from '../utils/applyForceToBody';
import { attractAllToOne } from '../utils/attractAllToOne';
import { attractSomeToOne } from '../utils/attractSomeToOne';
import { checkIfSpaceOccupied } from '../utils/checkIfSpaceOccupied';
import { checkOnScreen } from '../utils/checkOnScreen';
import { clearMatter } from '../utils/clearMatter';
import { createCircular } from '../utils/createCircular';
import { createConstraint } from '../utils/createConstraint';
import { createPolygon } from '../utils/createPolygon';
import { createRectangle } from '../utils/createRectangle';
import { createIrregular } from '../utils/createIrregular';
import { deleteBody } from '../utils/deleteBody';
import { deleteComposite } from '../utils/deleteComposite';
import { deleteConstraint } from '../utils/deleteConstraint';
import { getAngleBetweenTwoPoints } from '../utils/getAngleBetweenTwoPoints';
import { randomAlphaMinMaxDeg } from '../utils/randomAlphaMinMaxDeg';
import { removeAttracted } from '../utils/removeAttracted';
import { removeAttractor } from '../utils/removeAttractor';
import { rotateBody } from '../utils/rotateBody';
import { scaleBody } from '../utils/scaleBody';
import { scaleBodyOverTime } from '../utils/scaleBodyOverTime';
import { setPositionOfBody } from '../utils/setPositionOfBody';
import { setStaticToBody } from '../utils/setStaticToBody';
import { suggestPositionWithinScreenBounds } from '../utils/suggestPositionWithinScreenBounds';
import { translateBody } from '../utils/translateBody';
import { updateMatterEngine } from '../utils/updateMatterEngine';
import 'matter-attractors';
import { setGravity } from './setGravity';
import { createRailBearing } from './createRailBearing';
import { createSliderRail } from './createSliderRail';
import { deleteSliderRail } from './deleteSliderRail';

// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;

Matter.use('matter-attractors');

// Call this to setup the Matter library. Give it the width and height of your screen.
// Optional: The noWalls variable is used to disable canvas border walls.
export class MatterSetup {
  globalContext: any;
  aTAM: ATAMObject[] = [];
  setup: MatterSetupObject;
  engine: any;
  world: any;
  render: any;
  Matter = Matter;

  // All World Objects.
  worldObjects: GlobalObject[] = [];

  constructor(setupOptions: MatterSetupObject) {
    this.setup = setupOptions;
    this.engine = Engine.create();
    // engine.enableSleeping = true;
    if (!setupOptions.noRenderer) {
      this.render = Render.create({
        element: document.body,
        engine: this.engine,
        options: {
          width: setupOptions.width,
          height: setupOptions.height,
          // background: '#000000',
          // showAngleIndicator: false,
          wireframes: setupOptions.debugWireFrames
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
      Render.run(this.render);
      // Render.lookAt(render, {
      //   min: { x: 0, y: 0 },
      //   max: { x: width, y: height }
      // });
      this.globalContext = this.render.context;
    }
    this.world = this.engine.world;
    // Check to see if the gravity was given, else disable it.
    if (setupOptions.gravityY === undefined) {
      this.world.gravity.y = 0;
    } else {
      this.world.gravity.y = setupOptions.gravityY;
    }
    if (setupOptions.gravityX === undefined) {
      this.world.gravity.x = 0;
    } else {
      this.world.gravity.x = setupOptions.gravityX;
    }

    if (setupOptions.enableSleeping !== undefined &&
      setupOptions.enableSleeping) {
      this.engine.enableSleeping = true;
    }
    // Engine.run(engine);  // Updates the physics as fast as it can, exceeding 60fps.

    // Creating border walls around the canvas.
    if (!setupOptions.noWalls) {
      const options: object = {
        isStatic: true
      };

      let localOptions: RectangleBodyOptions;
      localOptions = {
        x: -25, y: setupOptions.height / 2, w: 50, h: setupOptions.height, matterOptions: options
      };
      createRectangle(this, localOptions);
      localOptions = {
        x: setupOptions.width + 25, y: setupOptions.height / 2, w: 50, h: setupOptions.height, matterOptions: options
      };
      createRectangle(this, localOptions);
      localOptions = {
        x: setupOptions.width / 2, y: -25, w: setupOptions.width, h: 50, matterOptions: options
      };
      createRectangle(this, localOptions);
      localOptions = {
        x: setupOptions.width / 2, y: setupOptions.height + 25, w: setupOptions.width, h: 50, matterOptions: options
      };
      createRectangle(this, localOptions);
    }
  }

  utils = {
    addAttracted: addAttracted.bind(null, this),
    addAttractor: addAttractor.bind(null, this),
    addAttractorOrbit: addAttractorOrbit.bind(null, this),
    applyForceToBody: applyForceToBody.bind(null),
    attractAllToOne: attractAllToOne.bind(null),
    attractSomeToOne: attractSomeToOne.bind(null, this),
    checkIfSpaceOccupied: checkIfSpaceOccupied.bind(null, this),
    checkOnScreen: checkOnScreen.bind(null, this),
    clearMatter: clearMatter.bind(null, this),
    createCircular: createCircular.bind(null, this),
    createRailBearing: createRailBearing.bind(null, this),
    createSliderRail: createSliderRail.bind(null, this),
    createConstraint: createConstraint.bind(null, this),
    createPolygon: createPolygon.bind(null, this),
    createRectangle: createRectangle.bind(null, this),
    createIrregular: createIrregular.bind(null, this),
    deleteBody: deleteBody.bind(null, this),
    deleteComposite: deleteComposite.bind(null, this),
    deleteConstraint: deleteConstraint.bind(null, this),
    deleteSliderRail: deleteSliderRail.bind(null, this),
    getAngleBetweenTwoPoints: getAngleBetweenTwoPoints.bind(null),
    randomAlphaMinMaxDeg: randomAlphaMinMaxDeg.bind(null),
    removeAttracted: removeAttracted.bind(null, this),
    removeAttractor: removeAttractor.bind(null, this),
    rotateBody: rotateBody.bind(null),
    scaleBody: scaleBody.bind(null),
    scaleBodyOverTime: scaleBodyOverTime.bind(null),
    setGravity: setGravity.bind(null, this),
    setPositionOfBody: setPositionOfBody.bind(null),
    setStaticToBody: setStaticToBody.bind(null),
    suggestPositionWithinScreenBounds: suggestPositionWithinScreenBounds.bind(null, this),
    translateBody: translateBody.bind(null),
    updateMatterEngine: updateMatterEngine.bind(null, this)
  };
}
