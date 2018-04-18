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
var worldObjects = [];

// Call this to setup the Matter library. Give it the width and height of your screen.
// Optional: The noWalls variable is used to disable canvas border walls.
function matterSetup(width, height, noWalls = false) {
    engine = Engine.create();
    // engine.enableSleeping = true;
    render = Render.create({
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
    globalContext = render.context;
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

        lW = createRectangle(-26, height / 2, 50, height, options);
        rW = createRectangle(width + 26, height / 2, 50, height, options);
        tW = createRectangle(width / 2, -26, width, 50, options);
        bW = createRectangle(width / 2, height + 26, width, 50, options);
    }
}

// Call this to update the physics engine as fast as you wish.
function updateMatterEngine() {
    Engine.update(engine);  // Updates the physics once per draw, theoretically at 60fps.
}

/* Here is a list of the possible options structure:
options = {
    isStatic: true,
    friction: 0.5,
    elasticity: 0.5,
    angle: PI,
    ...
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

// ----------------------------------------------------------------------------