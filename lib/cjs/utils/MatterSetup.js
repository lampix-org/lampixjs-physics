"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Matter = require("matter-js");
const addAttracted_1 = require("utils/addAttracted");
const addAttractor_1 = require("utils/addAttractor");
const addAttractorOrbit_1 = require("utils/addAttractorOrbit");
const applyForceToBody_1 = require("utils/applyForceToBody");
const attractAllToOne_1 = require("utils/attractAllToOne");
const attractSomeToOne_1 = require("utils/attractSomeToOne");
const checkIfSpaceOccupied_1 = require("utils/checkIfSpaceOccupied");
const checkOnScreen_1 = require("utils/checkOnScreen");
const clearMatter_1 = require("utils/clearMatter");
const createCircular_1 = require("utils/createCircular");
const createConstraint_1 = require("utils/createConstraint");
const createPolygon_1 = require("utils/createPolygon");
const createRectangle_1 = require("utils/createRectangle");
const deleteBody_1 = require("utils/deleteBody");
const deleteComposite_1 = require("utils/deleteComposite");
const deleteConstraint_1 = require("utils/deleteConstraint");
const getAngleBetweenTwoPoints_1 = require("utils/getAngleBetweenTwoPoints");
const randomAlphaMinMaxDeg_1 = require("utils/randomAlphaMinMaxDeg");
const removeAttracted_1 = require("utils/removeAttracted");
const removeAttractor_1 = require("utils/removeAttractor");
const rotateBody_1 = require("utils/rotateBody");
const scaleBody_1 = require("utils/scaleBody");
const scaleBodyOverTime_1 = require("utils/scaleBodyOverTime");
const setPositionOfBody_1 = require("utils/setPositionOfBody");
const setStaticToBody_1 = require("utils/setStaticToBody");
const suggestPositionWithinScreenBounds_1 = require("utils/suggestPositionWithinScreenBounds");
const translateBody_1 = require("utils/translateBody");
const updateMatterEngine_1 = require("utils/updateMatterEngine");
require("matter-attractors");
// module aliases
const Engine = Matter.Engine;
const Render = Matter.Render;
Matter.use('matter-attractors');
// Call this to setup the Matter library. Give it the width and height of your screen.
// Optional: The noWalls variable is used to disable canvas border walls.
class MatterSetup {
    constructor(setupOptions) {
        this.aTAM = [];
        // All World Objects.
        this.worldObjects = [];
        this.utils = {
            addAttracted: addAttracted_1.addAttracted.bind(null, this),
            addAttractor: addAttractor_1.addAttractor.bind(null, this),
            addAttractorOrbit: addAttractorOrbit_1.addAttractorOrbit.bind(null, this),
            applyForceToBody: applyForceToBody_1.applyForceToBody.bind(null, this),
            attractAllToOne: attractAllToOne_1.attractAllToOne.bind(null, this),
            attractSomeToOne: attractSomeToOne_1.attractSomeToOne.bind(null, this),
            checkIfSpaceOccupied: checkIfSpaceOccupied_1.checkIfSpaceOccupied.bind(null, this),
            checkOnScreen: checkOnScreen_1.checkOnScreen.bind(null, this),
            clearMatter: clearMatter_1.clearMatter.bind(null, this),
            createCircular: createCircular_1.createCircular.bind(null, this),
            // createComposite: createComposite.bind(null, this),
            createConstraint: createConstraint_1.createConstraint.bind(null, this),
            createPolygon: createPolygon_1.createPolygon.bind(null, this),
            createRectangle: createRectangle_1.createRectangle.bind(null, this),
            deleteBody: deleteBody_1.deleteBody.bind(null, this),
            deleteComposite: deleteComposite_1.deleteComposite.bind(null, this),
            deleteConstraint: deleteConstraint_1.deleteConstraint.bind(null, this),
            getAngleBetweenTwoPoints: getAngleBetweenTwoPoints_1.getAngleBetweenTwoPoints.bind(null, this),
            randomAlphaMinMaxDeg: randomAlphaMinMaxDeg_1.randomAlphaMinMaxDeg.bind(null, this),
            removeAttracted: removeAttracted_1.removeAttracted.bind(null, this),
            removeAttractor: removeAttractor_1.removeAttractor.bind(null, this),
            rotateBody: rotateBody_1.rotateBody.bind(null, this),
            scaleBody: scaleBody_1.scaleBody.bind(null, this),
            scaleBodyOverTime: scaleBodyOverTime_1.scaleBodyOverTime.bind(null, this),
            setPositionOfBody: setPositionOfBody_1.setPositionOfBody.bind(null, this),
            setStaticToBody: setStaticToBody_1.setStaticToBody.bind(null, this),
            suggestPositionWithinScreenBounds: suggestPositionWithinScreenBounds_1.suggestPositionWithinScreenBounds.bind(null, this),
            translateBody: translateBody_1.translateBody.bind(null, this),
            updateMatterEngine: updateMatterEngine_1.updateMatterEngine.bind(null, this)
        };
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
            Render.run(this.render);
            // Render.lookAt(render, {
            //   min: { x: 0, y: 0 },
            //   max: { x: width, y: height }
            // });
            this.globalContext = this.render.context;
        }
        this.world = this.engine.world;
        // We disable the Gravity from the start, not needed for Lampix.
        this.world.gravity.y = 0;
        // Engine.run(engine);  // Updates the physics as fast as it can, exceeding 60fps.
        // Creating border walls around the canvas.
        if (!setupOptions.noWalls) {
            const options = {
                isStatic: true
            };
            let localOptions;
            localOptions = {
                x: -25, y: setupOptions.height / 2, w: 50, h: setupOptions.height, matterOptions: options
            };
            createRectangle_1.createRectangle(this, localOptions);
            localOptions = {
                x: setupOptions.width + 25, y: setupOptions.height / 2, w: 50, h: setupOptions.height, matterOptions: options
            };
            createRectangle_1.createRectangle(this, localOptions);
            localOptions = {
                x: setupOptions.width / 2, y: -25, w: setupOptions.width, h: 50, matterOptions: options
            };
            createRectangle_1.createRectangle(this, localOptions);
            localOptions = {
                x: setupOptions.width / 2, y: setupOptions.height + 25, w: setupOptions.width, h: 50, matterOptions: options
            };
            createRectangle_1.createRectangle(this, localOptions);
        }
    }
}
exports.MatterSetup = MatterSetup;
