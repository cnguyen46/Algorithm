****robot.js:
/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
import { threadId } from 'worker_threads';

const FULL_ROTATION = 360;

class MonoidElement {
  constructor(current, minimum, maximum) {
    this.current = current;
    this.minimum = minimum;
    this.maximum = maximum;
  }

  isSafe(startingAngle, safetyMargin) {
    console.log(`3a. Minimum in Thread ${threadId}: `, this.minimum);
    console.log(`3b. Maximum in Thread ${threadId}: `, this.maximum);
    console.log(`3. Lowest range in Thread ${threadId}: `, startingAngle + this.minimum);
    console.log(`4. Highest range in Thread ${threadId}: `, startingAngle + this.maximum);
    console.log(`5. Safty range in Thread ${threadId}: `, safetyMargin, FULL_ROTATION - safetyMargin);
    return startingAngle + this.minimum >= safetyMargin &&
           startingAngle + this.maximum <= FULL_ROTATION - safetyMargin;
  }
}

export const IDENTITY_ELEMENT = new MonoidElement(0, 0, 0);

export function encodeAsMonoidElement(changeInAngle) {
  console.log(`1. This is changeInangle in Thread ${threadId}: `, changeInAngle);
  return new MonoidElement(changeInAngle, changeInAngle, changeInAngle);
}

export function combineMonoidElements(left, right) {
  console.log(`2. This is left and right in Thread ${threadId}: `, left, right);
  return new MonoidElement(
    left.current + right.current,
    Math.min(left.current + right.minimum, left.minimum),
    Math.max(left.current + right.maximum, left.maximum),
  );
}



****testing.js:
import { parallelMapReduce } from './mapReduce.js';

// eslint-disable-next-line no-magic-numbers
const sequence = [153, -55, -201];
// eslint-disable-next-line no-magic-numbers
console.log((await parallelMapReduce('./robot.js', sequence, 1)).isSafe(155, 52));

