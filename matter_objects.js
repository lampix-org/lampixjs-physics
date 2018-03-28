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
}

// This is a circular object. Caution!
function ObjectConstraint(bA, bB, options) {
    this.constraint = Constraint.create({
        bodyA: bA,
        bodyB: bB,
        options 
    });
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;

    this.show = function () {
        var pos1 = this.bA.position;
        var pos2 = this.bB.position;
        var angle = this.body.angle;

        push();

        rotate(angle);
        beginPath();
        moveTo(pos1.x, pos1.y);
        lineTo(pos2.x, pos2.y);
        stroke();

        pop();
    }
}