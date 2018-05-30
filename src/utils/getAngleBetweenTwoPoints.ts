import { XYPos } from '../matter_types';

// Returns the angle between two given points.
export function getAngleBetweenTwoPoints(anchor: XYPos, point: XYPos) {
  // var angle = Math.atan2(anchorY - pointY, anchorX - pointX) * (180 / Math.PI);
  const angle = Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180 / Math.PI + 180;
  // if(angle < 0) {
  //     angle += 360;
  // }
  return angle;
}
