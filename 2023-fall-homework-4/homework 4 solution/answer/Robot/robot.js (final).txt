/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
const FULL_ROTATION = 360;

class MonoidElement {
  constructor(current, minimum, maximum) {
    this.current = current;
    this.minimum = minimum;
    this.maximum = maximum;
  }

  isSafe(startingAngle, safetyMargin) {
    return startingAngle + this.minimum >= safetyMargin &&
           startingAngle + this.maximum <= FULL_ROTATION - safetyMargin;
  }
}

export const IDENTITY_ELEMENT = new MonoidElement(0, 0, 0);

export function encodeAsMonoidElement(changeInAngle) {
  return new MonoidElement(changeInAngle, changeInAngle, changeInAngle);
}

export function combineMonoidElements(left, right) {
  return new MonoidElement(
    left.current + right.current,
    Math.min(left.current + right.minimum, left.minimum),
    Math.max(left.current + right.maximum, left.maximum),
  );
}
