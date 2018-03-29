// Here you can find a couple of Matter JS objects.

var bodyID = 0;

// This is a rectangle. Use it wisely.
function ObjectRectangle(x, y, w, h, options) {
    this.body = Bodies.rectangle(x, y, w, h, options);
    var hasPNG = null;
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();

        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        if(hasPNG) {
            drawImage(hasPNG, 0, 0, w, h);
        } else {
            rect(0, 0, w, h);
        }

        pop();
    }

    // Sets the amount of friction that this body will exert on others.
    // 0 for no friction, 1 for very high friction.
    this.setFriction = function (newFriction) {
        this.body.friction = newFriction;
    }

    // Sets the elasticity of the body experienced when it collides with others.
    // 0 for no elasticity, 1 for 100% kinetic bounce.
    this.setElasticity = function (newElasticity) {
        this.body.restitution = newElasticity;
    }

    // Sets a new angle for the body. Messing with the body's angle may have a negative impact on the physics engine.
    this.setNewAngle = function (newAngle) {
        this.body.setAngle(newAngle);
    }

    // Sets a PNG photo for the object and then calls the show function.
    this.setPNG = function (newPNG) {
        this.hasPNG = newPNG;
        this.show();
    }

    // TODO: Implement this for objects that have no PNG but other graphics.
    this.setGraphics = function (mystery, variables) {

    }

    return this.body;
}

// This is a circular object. Caution!
function ObjectCircular(cx, cy, r, options) {
    this.body = Bodies.circle(cx, cy, r, options);
    var hasPNG = null;
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();

        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        if(hasPNG) {
            drawImage(hasPNG, 0, 0, cx + r, cy + r);
        } else {
            ellipse(0, 0, r * 2);
        }

        pop();
    }

    // Sets the amount of friction that this body will exert on others.
    // 0 for no friction, 1 for very high friction.
    this.setFriction = function (newFriction) {
        this.body.friction = newFriction;
    }

    // Sets the elasticity of the body experienced when it collides with others.
    // 0 for no elasticity, 1 for 100% kinetic bounce.
    this.setElasticity = function (newElasticity) {
        this.body.restitution = newElasticity;
    }

    // Sets a new angle for the body. Messing with the body's angle may have a negative impact on the physics engine.
    this.setNewAngle = function (newAngle) {
        this.body.setAngle(newAngle);
    }

    // Sets a PNG photo for the object and then calls the show function.
    this.setPNG = function (newPNG) {
        this.hasPNG = newPNG;
        this.show();
    }

    // TODO: Implement this for objects that have no PNG but other graphics.
    this.setGraphics = function (mystery, variables) {

    }

    return this.body;
}

// This is a Polygon! It's Polymisterious.
function ObjectPolygon(x, y, sides, r, options) {
    this.body = Bodies.polygon(x, y, sides, r, options);
    var hasPNG = null;
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;

    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;

        push();

        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        if(hasPNG) {
            drawImage(hasPNG, 0, 0, w, h);
        } else {
            rect(0, 0, w, h);
        }

        pop();
    }

    // Sets the amount of friction that this body will exert on others.
    // 0 for no friction, 1 for very high friction.
    this.setFriction = function (newFriction) {
        this.body.friction = newFriction;
    }

    // Sets the elasticity of the body experienced when it collides with others.
    // 0 for no elasticity, 1 for 100% kinetic bounce.
    this.setElasticity = function (newElasticity) {
        this.body.restitution = newElasticity;
    }

    // Sets a new angle for the body. Messing with the body's angle may have a negative impact on the physics engine.
    this.setNewAngle = function (newAngle) {
        this.body.setAngle(newAngle);
    }

    // Sets a PNG photo for the object and then calls the show function.
    this.setPNG = function (newPNG) {
        this.hasPNG = newPNG;
    }

    // TODO: Implement this for objects that have no PNG but other graphics.
    this.setGraphics = function (mystery, variables) {

    }

    return this.body;
}

// This is a constraint.Very dangerous!
function ObjectConstraint(options) {
    /* Possible structure of options:
    options = {
        bodyA: any body object,
        bodyB: any other body,
        pointA: { x: , y: } just an offset for the first point if you don't want the constraint to start
        from the middle of the first object,
        pointB: { x: , y: } the same as above but for the second object,
        length: pixels you want for the line,
        stiffness: 0 for very elastic, 1 for very stiff
    }*/
    this.constraint = Constraint.create(options);
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;

    this.show = function () {
        // TODO: Find out if this code is correct.
        var pos1 = options.bodyA.position;
        var pos2 = options.bodyB.position;

        push();

        beginPath();
        moveTo(pos1);
        lineTo(pos2);
        stroke();

        pop();
    }

    // TODO: Implement this for objects that have no PNG but other graphics.
    this.setGraphics = function (mystery, variables) {

    }

    return this.constraint;
}