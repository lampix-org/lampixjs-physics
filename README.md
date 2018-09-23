# Lampix Physics Layout

The @lampix/physics library is built upon and uses [Matter.JS](http://brm.io/matter-js/).
With it you can create a “physical” environment / simulation that helps you replicate real life object interactions like deformation, rolling, attraction, gravity, etc.

## Table of Contents

1. [Usage / Installation](#Usage-/-Installation)
2. [Project Source Structure](#Project-Source-Structure)
3. [Objects](#Objects)
4. [Utils](#Utils)
5. [matter_types](#matter_types)
6. [License](#License)

## Usage / Installation
`npm install @lampix/physics.`
`import lampixPhysics from '@lampix/physics'.`
#### Create the setupOptions object
`setupOptions = {`
`	width: yourScreenWidth,`
`	height: yourScreenHeight,`
`	noWalls: disableWallsOutsideTheScreen,`
`	noRenderer: disableMatterJSRenderer`
`}`
Instantiate the library (preferably when your app is still loading) by creating an object 
`MatterSetup = lampixPhysics` 
and then creating a local object with 
`new MatterSetup(setupOptions)`

## Project Source Structure
#### @types
Used to import the matter-attractors types. No modifications needed here.
#### objects
Houses different Object types like Circular, Polygon, Contraint, etc. You can add here future object types.
#### utils
Here you can find the different functions needed to build objects, add attractors, check for screen space, remove objects, move them around, scale them, etc. More of these functionalities should be added here.
#### index.js
The standard index file needed to load the library.
#### matter_types.js
A repository for the object types needed to create different physical bodies, add attraction properties, render options, etc.

## Objects
#### GlobalObject
This is the smallest building block for any and all Matter Objects. It can become either a body, a constraint or a composite.
#### MatterBody
Archetype for all sorts of physical bodies which extends the GlobalObject.
#### MatterObjects
Is a global singleton that is needed when the library creates new objects.
#### ObjectCircular
This is a circular body that extends the MatterBody class. You can build such an object by creating a CircularBodyOptions object and passing it to the appropiate utils function.
#### ObjectComposite
A composite body which consists of more bodies. Still in the works.
#### ObjectConstraint
This is a Constraint which can be placed between two bodies. Check out the ConstraintOptions to find out what options you have to making one.
#### ObjectPolygon
A physical body with more than 4 sides.
#### ObjectRectangle
A physical body with just 4 sides.

## Utils
#### addAttracted
This adds a new attracted body to a specific attractor.
#### addAttractor
Adds a new Attractor body to the world.
#### addAttractorOrbit
This adds Orbit functionality to the Attractor so that attracted bodies don't stick to their attractor. Check out the object for more information.
#### applyForceToBody
This can be used to “hit” a physical body with a given force.
#### attractAllToOne
Is used to attract everybody else to the body that has this applied to it.
#### attractSomeToOne
A very complex function that helps you decide which bodies attract which other ones. You can basically have 2 or more different physical bodies that exert attraction forces on whichever other bodies you so desire.
#### checkIfSpaceOccupied
Can be used to determine whether or not a position on the screen is already occupied by some other body.
#### checkOnScreen
You can check whether or not a body is currently within the screen bounds or not. This can be helpful if you disable the screen Walls.
#### clearMatter
Call to clear the whole Matter world. If you use this you will have to re-create the Matter world with the MatterSetup method.
#### createCircular
Used to make a circular object.
#### createComposite
Can be used to create a composite of 2 or more objects. Still in the works.
#### createConstraint
Used to make a line constraint between 2 objects. The line is slightly elastic but will try to keep the 2 objects within the same distance of each other.
#### createPolygon
Used to make a 5+ sided object.
#### createRectangle
Used for making 4 sided objects.
#### deleteBody
This function is called when you want to remove a body from the world.
#### deleteComposite
This is called to remove a composite from the world.
#### deleteConstraint
Removes a constraint from the world.
#### getAngleBetweenTwoPoints
Returns the angle between two given points.
#### MatterSetup
This is a complex class that needs to be called in order for a valid instance of @lampix/physics to be created. You need to feed it a valid MatterSetupObject in order to build one. Please refer to the class comments for more information.
#### randomAlphaMinMaxDeg
This function gives you a random degree between the min and max given values.
#### removeAttracted
Removes a given attracted body from the local attractor to attracted list. The result of calling this function is that the given attracted body will no longer be subjected to vectorial forces towards the attractor body.
#### removeAttractor
Removes a given attractor body from the local ATAM list. The result is that this body will no longer be an attractor to others.
#### rotateBody
Function for rotating an existing body.
#### scaleBody
Scales a body in size instantly.
#### scaleBodyOverTime
Sets a body to be scaled over a delta T time.
#### setPositionOfBody
Used to move instantly an existing body.
#### setStaticToBody
Function for making an existing object static or not. (static objects are NOT affected by any physical forces)
#### suggestPositionWithinScreenBounds
This calculates a valid position within the screen bounds for a desired recommendation object. Refer to the code for more information. This function will soon be refactored.
#### translateBody
Function for moving an existing object. Might get deleted in the future.
#### updateMatterEngine
Needed to update the physics engine as fast as you with. You may either call it at your discretion, which makes you responsible for how often the physics will update or you may pass it a timestep variable which will automate the update process.

## matter_types
#### XYPos
Used to describe a 2D point by using an x and y.
#### ObjectIdentifiers
Necessary when you want to use the suggesstPositionWithinScreenBounds function. The variables needed are the object index, center x and center y and width and height.
#### Circle
Used to define a circular object. Uses center x, center y and radius.
#### ATAMObject
Attractor si Attracted object map. Constains at least an attractor and may contain orbitMin and orbitMax for defining orbits as well as the list of attracted objects.
#### AttractedObject
This defines the attracted object used in the ATAMObject map. You can define a customOrbit which will supersede the attractor orbit definitions. You can also stop any attraction if you so desire.
#### MatterSetupObject
Needed for setting up the @lampix/physics instance. It uses a width and height as well as booleans for noWalls and noRenderer.
#### BasicBodyOptions
Interface that defines the basic attributes that any and all matter bodies need. This includes x and y and the matterOptions which are optional.
#### MatterBodyOptions
Are the Matter JS options that may be used when you create a body. Check out the online documentation for more information.
#### MatterColFilterOptions
Used within the MatterBodyOptions if you want to define special collision filter rules.
#### MatterPluginOptions
Define the attraction function that the target object is subjected to.
#### MatterRenderOptions
Specific render options which may be used when you define a Matter object.
#### MatterSpriteOptions
Matter JS can use Sprites so you may want to define this if your object consists of a texture / sprite.
#### RectangleBodyOptions
This extends the BasicBodyOptions in order to create rectangle shaped bodies. It only uses a width and height.
#### CircularBodyOptions
Used to make circular objects and extends the BasicBodyOptions. You only need to define the radius of the object.
#### PolygonBodyOptions
Extends the BasicBodyOptions and is used when making 5+ sided objects. You need to define the radius and the amount of sides the objects has.
#### ConstraintOptions
This interface is needed when making a constraint. It needs to be given a MatterConstraintOptions object. Additionally you may specify a constraint color, the growOver number which is a delta T for growth animation time and an animSteps number for specifying how many animation steps there are.
#### MatterConstraintOptions
The required object for defining a Matter JS constraint. Here you have to specify bodyA and bodyB, which should be the two bodies that are being linked together, pointA and pointB which should be the points where the link occurs. You will also need to specify the length and the stiffness of the constraint. Additionally you may give it a render object which should be instanced before hand.

## License

#### (The MIT License)

Copyright (c) 2018 Lampix

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

**[Back to top](#table-of-contents)**
