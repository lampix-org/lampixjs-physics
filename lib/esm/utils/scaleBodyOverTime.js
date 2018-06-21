// For more Body functionalities go to http://brm.io/matter-js/docs/classes/Body.html 
// Sets a body to be scaled over a delta T time.
export function scaleBodyOverTime(theBody, onX, onY, point, deltaT) {
    theBody.setScaleOverTime(onX, onY, point, deltaT);
}
