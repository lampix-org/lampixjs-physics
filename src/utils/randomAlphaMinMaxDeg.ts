// This function gives you a random degree between the min and max values.
export function randomAlphaMinMaxDeg(min: number, max: number) {
  return (Math.floor(Math.random() * (max - min + 1)) + min) * (Math.PI / 180);
}
