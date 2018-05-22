Matter.use('matter-attractors');

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Composite = Matter.Composites,
    Bounds = Matter.Bounds;

var engine, render, world, globalContext;
// All World Objects.
var worldObjects = [];
// Attractor to attracted object map. Also includes the Min and Max distance for orbits.
// If Orbits are left undefined, object will automatically stick together.
var aTAM = [{
    attractor: Object,
    orbitMin: Number,
    orbitMax: Number,
    attracted: [{
        object: Object,
        customOrbit: Number,
        stopAttraction: Number
    }]
}];

// Call this to setup the Matter library. Give it the width and height of your screen.
// Optional: The noWalls variable is used to disable canvas border walls.
function matterSetup(width, height, noWalls = false) {
    engine = Engine.create();
    // engine.enableSleeping = true;
    /*render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: width,
            height: height,
            background: '#000000',
            showAngleIndicator: false,
            wireframes: false
        },
        bounds: {
            min: { 
                x: 0, 
                y: 0 
            },
            max: { 
                x: width, 
                y: height 
            }
         }
    });
    Render.run(render);
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
    });
    globalContext = render.context;*/
    world = engine.world;
    // We disable the Gravity from the start, not needed for Lampix.
    world.gravity.y = 0;
    // Engine.run(engine);  // Updates the physics as fast as it can, exceeding 60fps.

    // Creating border walls around the canvas.
    if(!noWalls) { 
        var lW, rW, tW, bW;
        var options = {
            isStatic: true
        };

        lW = createRectangle(-25, height / 2, 50, height, options);
        rW = createRectangle(width + 25, height / 2, 50, height, options);
        tW = createRectangle(width / 2, -25, width, 50, options);
        bW = createRectangle(width / 2, height + 25, width, 50, options);
    }
}

// Call this to update the physics engine as fast as you wish.
function updateMatterEngine() {
    Engine.update(engine, 33);  // Updates the physics once per draw, theoretically at 60fps.
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
function createRectangle(x, y, w, h, options) {
    var newObject = new ObjectRectangle(x, y, w, h, options);
    worldObjects.push(newObject);
    World.add(world, newObject.body);

    return newObject;
}

// Call this to make a circular object.
function createCircular(cx, cy, r, options) {
    var newObject = new ObjectCircular(cx, cy, r, options);
    worldObjects.push(newObject);
    World.add(world, newObject.body);

    return newObject;
}

// Call this to create a 5+ sided object.
function createPolygon(x, y, sides, r, options) {
    var newObject = new ObjectPolygon(x, y, sides, r, options);
    worldObjects.push(newObject);
    World.add(world, newObject.body);

    return newObject;
}

// Call this to make a line linking 2 bodies together.
function createConstraint(options) {
    var newObject = new ObjectConstraint(options);
    worldObjects.push(newObject);
    World.add(world, newObject.constraint);

    return newObject;
}

// This function is called when you want to remove a body from the world.
function deleteBody(theBody) {
    for(var x = worldObjects.length - 1; x >= 0; x--) {
        if(worldObjects[x].body !== undefined) {
            if(theBody.body.id === worldObjects[x].body.id) {
                // console.log("Deleting ", worldObjects[x]);
                World.remove(world, worldObjects[x].body);
                worldObjects.splice(x, 1);
                return;
            }
        }
    }
}

function deleteConstraint(theConstraint) {
    for(var x = worldObjects.length - 1; x >= 0; x--) {
        if(worldObjects[x].constraint !== undefined) {
            if(theConstraint.constraint.id === worldObjects[x].constraint.id) {
                // console.log("Deleting ", worldObjects[x]);
                World.remove(world, worldObjects[x].constraint);
                worldObjects.splice(x, 1);
                return;
            }
        }
    }
}

// Call this to clear the Matter Library. CAREFUL! If you use this and want to reuse Matter
// you'll need to run matterSetup again.
function clearMatter() {
    for(var x = worldObjects.length - 1; x >= 0; x--) {
        if(worldObjects[x].body !== undefined) {
            World.remove(world, worldObjects[x].body);
            worldObjects.splice(x, 1);
        } else if(worldObjects[x].constraint !== undefined) {
            World.remove(world, worldObjects[x].constraint);
            worldObjects.splice(x, 1);
        }
    };
    Render.stop(render);
    Engine.clear(engine);
}

// This can be used to check if a certain space within the world is occupied with another body or not.
function checkIfSpaceOccupied(cx, cy, approximateRange) {
    var newBounds = {
        min: {
            x: cx - approximateRange,
            y: cy - approximateRange
        },
        max: {
            x: cx + approximateRange,
            y: cy + approximateRange
        }
    }
    for(var j = 0; j < worldObjects.length; j++) {
        // console.log(worldObjects[j]);
        if(worldObjects[j].body !== undefined) {
            if (Bounds.overlaps(worldObjects[j].body.bounds, newBounds)) {
                return true;
            }
        }
    }
    return false;
}

// This function can be used to check if a body is currently within the screen bounds.
// Returns true if the object is on screen and false if it isn't.
function checkOnScreen(theBody) {
    var newBounds = {
        min: {
            x: render.bounds.min.x,
            y: render.bounds.min.y
        },
        max: {
            x: render.bounds.max.x,
            y: render.bounds.max.y
        }
    }

    if (Bounds.overlaps(theBody.bounds, newBounds)) {
        return true;
    }

    return false;
}

/* The following functions are taken from Matter JS directly.
For more Body. functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
TODO: Check to see if the graphics of the objects remain unaffected by these changes.
*/

// Scales a body in size instantly.
function scaleBody(theBody, onX, onY, [point]) {
    // If the point is undefined, the center of the body will be used.
    if(point === undefined) {
        Body.scale(theBody, onX, onY);
    } else {
        Body.scale(theBody, onX, onY, point);
    }
}

// Sets a body to be scaled over a delta T time.
function scaleBodyOverTime(theBody, onX, onY, [point], deltaT) {
    theBody.setScaleOverTime(onX, onY, [point], deltaT);
}

// Matter JS Function for rotating an existing body.
function rotateBody(body, rotation, [point]) {
    Body.rotate(body, rotation, [point]);
}

// Matter JS Function for hitting an existing body.
function applyForceToBody(body, position, force) {
    Body.applyForce(body, position, force);
}

// Matter JS Function for moving instantly an existing body.
function setPositionOfBody(body, position) {
    Body.setPosition(body, position);
}

// Matter JS Function for making an existing object static or not.
function setStaticToBody(body, isStatic) {
    Body.setStatic(body, isStatic);
}

// Matter JS Function for moving an existing object.
function translateBody(body, translation) {
    Body.translate(body, translation);
}

// Adds a new Attractor body to the world.
function addAttractor(attractorBody) {
    for(var x = 0; x < aTAM.length; x++) {
        for(var y = 0; y < aTAM[x].attracted.length; y++){
            aTAM[x].attracted[y].stopAttraction = false;
        }
    }
    var newHierarchy = {
        attractor: attractorBody,
        attracted: []
    };
    aTAM.push(newHierarchy);
    // console.log(aTAM);
}

// Adds a new attracted body to an attractor.
function addAttracted(attractedBody, attractorID, customOrbit) {
    for(var x = 0; x < aTAM.length; x++) {
        if(aTAM[x].attractor.id === attractorID) {
            var newAttracted = {
                object: attractedBody,
                customOrbit: 0,
                stopAttraction: false
            };
            if(customOrbit !== undefined) {
                newAttracted.customOrbit = customOrbit;
            };
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
function addAttractorOrbit(attractorID, minOrbit, maxOrbit) {
    for(var x = 0; x < aTAM.length; x++) {
        if(aTAM[x].attractor.id === attractorID) {
            if(minOrbit !== undefined) {
                aTAM[x].orbitMin = minOrbit;
            }
            if(maxOrbit !== undefined) {
                aTAM[x].orbitMax = maxOrbit;
            }
            return;
        }
    }
}

// Removes a given attractor body from the aTAM attractor list.
function removeAttractor(attractorID) {
    for(var x = aTAM.length - 1; x >= 0; x--) {
        if(aTAM[x].attractor.id === attractorID) {
            aTAM.splice(x, 1);
            return;
        }
    }
}

// Removes a given attracted body from the aTAM attracted bodies sublist.
function removeAttracted(attractedID, attractorID) {
    for(var x = 0; x < aTAM.length; x++) {
        if(aTAM[x].attractor.id === attractorID) {
            for(var y = aTAM[x].attracted.length - 1; y >= 0; y--) {
                if(aTAM[x].attracted[y].id === attractedID) {
                    aTAM[x].attracted.splice(y, 1);
                }
            }
            return;
        }
    }
}

// The following are attractor functions for making bodies have gravity / attraction.

// This function is used to attract everybody else to the body that has this applied to it.
var attractAllToOne = function(bodyA, bodyB) {
    return {
        x: (bodyA.position.x - bodyB.position.x) * 1e-5,
        y: (bodyA.position.y - bodyB.position.y) * 1e-5,
    };
}

// This attracts specific bodies to another specific one. We use the aTAM object to map the
// attractor to attracted relationships so make sure you add your attractors and attracted first!
// You can also simulate a certain orbit around the attractor if you define a minimum Orbit range.
var attractSomeToOne = function(bodyA, bodyB) {
    for(var x = 0; x < aTAM.length; x++) {
        if(aTAM[x].attractor.id === bodyA.id) {
            for(var y = 0; y < aTAM[x].attracted.length; y++) {
                if(aTAM[x].attracted[y].stopAttraction === false && aTAM[x].attracted[y].object.id === bodyB.id) {
                    var force = {
                        x: Number,
                        y: Number
                    };
                    if(aTAM[x].orbitMin !== undefined) {
                        // console.log("Calculating min orbit Min");
                        var angleBetween = getAngleBetweenTwoPoints(aTAM[x].attractor.position.x,
                        aTAM[x].attractor.position.y, aTAM[x].attracted[y].object.position.x,
                        aTAM[x].attracted[y].object.position.y);
                        // var dx = (aTAM[x].orbitMin + bodyA.position.x) * Math.sin(angleBetween);
                        var dx = bodyA.position.x + Math.sin(angleBetween) * aTAM[x].orbitMin;
                        // var dy = (aTAM[x].orbitMin + bodyA.position.y) * Math.cos(angleBetween);
                        var dy = bodyA.position.y + Math.cos(angleBetween) * aTAM[x].orbitMin;
                        var xDiff = Math.abs(dx) - bodyB.position.x;
                        var yDiff = Math.abs(dy) - bodyB.position.y;
                        // force = {
                        //     x: (Math.abs(dx) - bodyB.position.x) * 1e-6,
                        //     y: (Math.abs(dy) - bodyB.position.y) * 1e-6
                        // };
                        if(xDiff > -10 && xDiff < 10) {
                            force.x = 0;
                        } else {
                            force.x = (Math.abs(dx) - bodyB.position.x) * 1e-5;
                        }
                        if(yDiff > -10 && yDiff < 10) {
                            force.y = 0;
                        } else {
                            force.y = (Math.abs(dy) - bodyB.position.y) * 1e-5;
                        }
                        if(force.x === 0 && force.y === 0) {
                            aTAM[x].attracted[y].stopAttraction = true;
                        }
                    } else {
                        if(aTAM[x].attracted[y].customOrbit > 0) {
                            // console.log("Calculating custom orbit force");
                            var angleBetween = getAngleBetweenTwoPoints(aTAM[x].attractor.position.x,
                            aTAM[x].attractor.position.y, aTAM[x].attracted[y].object.position.x,
                            aTAM[x].attracted[y].object.position.y);
                            // var dx = (aTAM[x].attracted[y].customOrbit + bodyA.position.x) * Math.sin(angleBetween);
                            var dx = bodyA.position.x + Math.sin(angleBetween) * aTAM[x].attracted[y].customOrbit;
                            // var dy = (aTAM[x].attracted[y].customOrbit + bodyA.position.y) * Math.cos(angleBetween);
                            var dy = bodyA.position.y + Math.cos(angleBetween) * aTAM[x].attracted[y].customOrbit;
                            var xDiff = Math.abs(dx) - bodyB.position.x;
                            var yDiff = Math.abs(dy) - bodyB.position.y;
                            // force = {
                            //     x: (Math.abs(dx) - bodyB.position.x) * 1e-6,
                            //     y: (Math.abs(dy) - bodyB.position.y) * 1e-6
                            // };
                            if(xDiff > -10 && xDiff < 10) {
                                force.x = 0;
                            } else {
                                force.x = (Math.abs(dx) - bodyB.position.x) * 1e-5;
                            }
                            if(yDiff > -10 && yDiff < 10) {
                                force.y = 0;
                            } else {
                                force.y = (Math.abs(dy) - bodyB.position.y) * 1e-5;
                            }
                            if(force.x === 0 && force.y === 0) {
                                aTAM[x].attracted[y].stopAttraction = true;
                            }
                        } else {
                            // console.log("Calculating normal force");
                            force = {
                                x: (bodyA.position.x - bodyB.position.x) * 1e-5,
                                y: (bodyA.position.y - bodyB.position.y) * 1e-5
                            };
                        }
                    }
                    if(force.x != 0 || force.y != 0) {
                        Body.applyForce(bodyB, bodyB.position, force);
                    }
                }
            }
            return;
        }
    }
}

// ----------------------------------------------------------------------------

// Returns the angle between two given points.
function getAngleBetweenTwoPoints(anchorX, anchorY, pointX, pointY) {
    // var angle = Math.atan2(anchorY - pointY, anchorX - pointX) * (180 / Math.PI);
    var angle = Math.atan2(anchorY - pointY, anchorX - pointX) * 180 / Math.PI + 180;
    // if(angle < 0) {
    //     angle += 360;
    // }
    return angle;
}

// This calculates a valid position within the screen bounds for a desired recommendation object.
// The index represents the recommendation index for the product.
// cx and cy are the center points for the product.
// objectWidth and objectHeight are the width and height of the reccomended object.
function suggestPositionWithinScreenBounds(index, cx, cy, objectWidth, objectHeight) {

    var linelength = 70;// + Math.random() * 50;
    var alpha = randomAlphaMinMaxDeg((index * 90) + 90, (index * 90) + 120);
    var destx = cx + Math.sin(alpha + 60) * linelength;
    var desty = cy + Math.cos(alpha + 60) * linelength;
    
    do {
        if (destx < (objectWidth / 2) || desty < (objectHeight / 2) || 
        destx > canvas.width - (objectWidth / 2) || 
        desty > canvas.height - (objectHeight / 2)) {
            if(destx < (objectWidth / 2)) {
                alpha = randomAlphaMinMaxDeg(index, 30 + index * 45);
            }
            if(desty < (objectHeight / 2)) {
                alpha = randomAlphaMinMaxDeg(index * 45, 30 + index * 90);
            }
            if(destx > canvas.width - (objectWidth / 2)) {
                alpha = randomAlphaMinMaxDeg(index * 180, 30 + index * 245);
            }
            if(desty > canvas.height - (objectHeight / 2)) {
                alpha = randomAlphaMinMaxDeg(index * 245, 30 + index * 300);
            }
            linelength = linelength - 1;
            destx = cx + Math.sin(alpha) * linelength;
            desty = cy + Math.cos(alpha) * linelength;
        }
    } while (destx < (objectWidth / 2) || desty < (objectHeight / 2) || 
        destx > canvas.width - (objectWidth / 2) || 
        desty > canvas.height - (objectHeight / 2))
    // by here in the code the destx and desty coords should be set

    return { x: destx, y: desty };
}