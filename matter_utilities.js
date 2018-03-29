// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Constraint = Matter.Constraint,
    Composite = Matter.Composites;

var engine, render, world;
var worldObjects = [];
// Hardcoded screen size for Lampix.
var screenWidth = 1280;
var screenHeight = 800;

function setup() {
    createCanvas(screenWidth, screenHeight);
    engine = Engine.create();
    render = Render.create({
        element: document.body,
        engine: engine
    });
    world = engine.world;
    // We disable the Gravity from the start, not needed for Lampix.
    world.gravity.y = 0;
    // Engine.run(engine);  // Updates the physics as fast as it can, exceeding 60fps.
    World.add(world, worldObjects);
};

function draw() {
    Engine.update(engine);  // Updates the physics once per draw, theoretically at 60fps.
    worldObjects.forEach(element => {
        element.show();
    });
};

/* Here is a list of the possible options structure:
options = {
    isStatic = true,
    friction = 0.5,
    elasticity = 0.5,
    angle = PI,
    ...
}*/

// Call this to make a rectangular object.
function createRectangle(x, y, w, h, options) {
    var newObject = ObjectRectangle(x, y, w, h, options);
    worldObjects.push(newObject);

    return newObject;
}

// Call this to make a circular object.
function createCircular(cx, cy, r, options) {
    var newObject = ObjectCircular(cx, cy, r, options);
    worldObjects.push(newObject);

    return newObject;
}

// Call this to create a 5+ sided object.
function createPolygon(x, y, sides, r, options) {
    var newObject = ObjectPolygon(x, y, sides, r, options);
    worldObjects.push(newObject);

    return newObject;
}

// Call this to make a line linking 2 bodies together.
function createConstraint(options) {
    var newObject = ObjectConstraint(options);
    worldObjects.push(newObject);

    return newObject;
}

// This function is called when you want to remove a body from the world.
function deleteBody(theBody) {
    for(var x = worldObjects.length - 1; x > 0; x--) {
        if(theBody.bodyID === worldObjects[x].bodyID) {
            World.remove(world, theBody);
            worldObjects.splice(x, 1);
            return;
        }
    }
}

// This function can be used to check if a body is currently withing the screen bounds.
// Returns true if the object is on screen and false if it isn't.
function checkOnScreen(theBody) {
    var pos = theBody.position;
    // TODO: Find out what body.position gives back, is it the center of the body or a corner? which corner?
    if(pos.y < 0 || pos.y > screenHeight || pos.x < 0 || pos.x > screenWidth) {
        // TODO: Adjust this check for a generally accepted use case.
        return false;
    }

    return true;
}

/* The following functions are taken from Matter JS directly.
For more Body. functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
TODO: Check to see if the graphics of the objects remain unaffected by these changes.
*/

// Matter JS Function for rotating an existing body.
function rotateBody(body, rotation, [point]) {
    Body.rotate(body, rotation, [point]);
}

// Matter JS Function for scaling an existing body.
function scaleBody(body, scaleX, scaleY, [point]) {
    Body.scale(body, scaleX, scaleY, [point]);
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