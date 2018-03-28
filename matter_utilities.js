// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Constraint = Matter.Constraint;

var engine, render, world;
var worldObjects = [];

function setup() {
    createCanvas(1280, 800);
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

function createConstraint(bodyA, bodyB, options) {
    var newObject = ObjectConstraint(bodyA, bodyB, options);
    worldObjects.push(newObject);

    return newObject;
}

// This function is called when you want to remove a body from the world.
function deleteBody(theBody) {
    for(var x = worldObjects.length - 1; x > 0; x--) {
        if(theBody.bodyID === worldObjects[x].bodyID) {
            worldObjects.splice(x);
            return;
        }
    }
    Matter.Composite.remove(world, theBody)
}