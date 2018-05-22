// Here you can find a couple of Matter JS objects.

// Global Body ID. Starts at 0 and gets iterated with each new body made.
var bodyID = 0;

// TODO: Create a parent Matter Object class that all the other Objects can inherit (used to reduce code).
function MatterObject() {

}

// This is a rectangle. Use it wisely.
function ObjectRectangle(x, y, w, h, options) {
    this.body = Bodies.rectangle(x, y, w, h, options);
    var hasPNG = null;
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;
    this.noGraphics = false;
    this.w = w;
    this.h = h;
    // Used for scaling animations. Is by default True.
    this.growComplete = true;

    this.setScaleOverTime = function (onX, onY, [point], deltaT) {
        this.growComplete = false;
        this.animSteps = deltaT;
        this.toScaleX = onX / deltaT;
        this.toScaleY = onY / deltaT;
        if(point === undefined) {
            this.point = point;
        } else {
            this.point = null;
        }
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

    // Used to disable the show() function.
    this.setNoGraphics = function () {
        this.noGraphics = true;
    }

    return this;
}

ObjectRectangle.prototype.show = function() {
    if(this.noGraphics) {
        return;
    }
    var pos = this.body.position;
    var angle = this.body.angle;

    globalContext.translate(pos.x, pos.y);
    globalContext.rotate(angle);
    if(this.hasPNG) {
        globalContext.drawImage(this.hasPNG, 0, 0, this.w, this.h);
    } else {
        globalContext.rect(0, 0, this.w, this.h);
    }
}

ObjectRectangle.prototype.update = function() {
    if (!this.growComplete) {
        this.animSteps--;
        scaleBody(this.body, this.toScaleX, this.toScaleY, this.point);
        if(this.animSteps == 0) {
            this.growComplete = true;
        }
    }
}

// This is a circular object. Caution!
function ObjectCircular(cx, cy, r, options) {
    this.body = Bodies.circle(cx, cy, r, options);
    var hasPNG = null;
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;
    this.noGraphics = false;
    this.cx = cx;
    this.cy = cy;
    this.r = r;
    // Used for scaling animations. Is by default True.
    this.growComplete = true;

    this.setScaleOverTime = function (onX, onY, [point], deltaT) {
        this.growComplete = false;
        this.animSteps = deltaT;
        this.toScaleX = onX / deltaT;
        this.toScaleY = onY / deltaT;
        if(point === undefined) {
            this.point = point;
        } else {
            this.point = null;
        }
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

    // Used to disable the show() function.
    this.setNoGraphics = function () {
        this.noGraphics = true;
    }

    return this;
}

ObjectCircular.prototype.show = function() {
    if(this.noGraphics) {
        return;
    }
    var pos = this.body.position;
    var angle = this.body.angle;

    globalContext.translate(pos.x, pos.y);
    globalContext.rotate(angle);
    if(this.hasPNG) {
        globalContext.drawImage(this.hasPNG, 0, 0, this.cx + this.r, this.cy + this.r);
    } else {
        globalContext.ellipse(0, 0, this.r * 2);
    }

}

ObjectCircular.prototype.update = function() {
    if (!this.growComplete) {
        this.animSteps--;
        scaleBody(this.body, this.toScaleX, this.toScaleY, this.point);
        if(this.animSteps == 0) {
            this.growComplete = true;
        }
    }
}

// This is a Polygon! It's Polymisterious.
function ObjectPolygon(x, y, sides, r, options) {
    this.body = Bodies.polygon(x, y, sides, r, options);
    var hasPNG = null;
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;
    this.noGraphics = false;
    this.x = x;
    this.y = y;
    this.r = r;

    // Used for scaling animations. Is by default True.
    this.growComplete = true;

    this.setScaleOverTime = function (onX, onY, [point], deltaT) {
        this.growComplete = false;
        this.animSteps = deltaT;
        this.toScaleX = onX / deltaT;
        this.toScaleY = onY / deltaT;
        if(point === undefined) {
            this.point = point;
        } else {
            this.point = null;
        }
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

    // Used to disable the show() function.
    this.setNoGraphics = function () {
        this.noGraphics = true;
    }

    return this;
}

ObjectPolygon.prototype.show = function() {
    if(this.noGraphics) {
        return;
    }
    var pos = this.body.position;
    var angle = this.body.angle;

    globalContext.translate(pos.x, pos.y);
    globalContext.rotate(angle);
    if(hasPNG) {
        globalContext.drawImage(this.hasPNG, 0, 0, this.hasPNG.width, this.hasPNG.height);
    } else {
        // TODO: Figure out how to draw a Polygon.
        // globalContext.rect(0, 0, w, h);
    }

}

ObjectPolygon.prototype.update = function() {
    if (!this.growComplete) {
        this.animSteps--;
        scaleBody(this.body, this.toScaleX, this.toScaleY, this.point);
        if(this.animSteps == 0) {
            this.growComplete = true;
        }
    }
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
    this.color = options.color;
    // Allocating a body ID to the object so that we can find it later.
    this.bodyID = bodyID;
    bodyID++;
    this.noGraphics = false;

    // Used for a growing constraint, TODO.
    if (options.growOver != null ) {
        this.growComplete = false;
        this.animSteps = options.growOver;
        this.animStep = this.animSteps;
    }

    // Used to define how much the constraint will oscilate in length upon forces applied to the connected bodies.
    this.setDamping = function(newDamping) {
        this.constraint.damping = newDamping;
    }

    // Used to change how fast a modified constraint returns to its original length.
    this.setStiffness = function(newStiffness) {
        this.constraint.stiffness = newStiffness;
    }

    // TODO: Implement this for objects that have no PNG but other graphics.
    this.setGraphics = function (mystery, variables) {

    }

    // Used to disable the show() function.
    this.setNoGraphics = function () {
        this.noGraphics = true;
    }

    return this;
}

ObjectConstraint.prototype.show = function() {
    if(this.noGraphics) {
        return;
    }
    // TODO: Find out if this code is correct.
    var pos1 = options.pointA;
    var pos2 = options.pointB;

    globalContext.beginPath();
    globalContext.moveTo(pos1);
    globalContext.lineTo(pos2);
    globalContext.lineWidth = 4;
    globalContext.strokeStyle = color;
    globalContext.stroke();

}

ObjectConstraint.prototype.update = function() {
    if (!this.growComplete) {
        this.animSteps--;
        // TODO: Implement correct grow methodology for Constraints.
        if(this.animSteps == 0) {
            this.growComplete = true;
        }
    }
}
