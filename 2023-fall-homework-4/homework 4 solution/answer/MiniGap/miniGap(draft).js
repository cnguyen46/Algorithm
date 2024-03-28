*** This code still passes all test cases, but it shows logic error 
when you run the test case of four threads.
For more detail: [90, 70, 140, 120, 120, 70, 90, 70, 70, 140, 90];
Where your combined monoid of first, second, and third thread should be
(2, 70, 5, 7, 8), but not (2, 70, 1, 7, 8)

*** miniGap.js

/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
import { threadId } from 'worker_threads';
class MonoidElement {
  constructor(gap, minimum, firstIndex, lastIndex, length) {
    this.gap = gap;
    this.minimum = minimum;
    this.firstIndex = firstIndex;
    this.lastIndex = lastIndex;
    this.length = length;
  }
}

export const IDENTITY_ELEMENT = new MonoidElement(Infinity, Infinity, 0, 0, 0);

export function encodeAsMonoidElement(number) {
  console.log(`1. Number Thread ${threadId}:`, number);
  return new MonoidElement(Infinity, number, 0, 0, 1);
}

export function combineMonoidElements(left, right) {
  console.log(`2. Left and right Thread ${threadId}:`, left, right);
  if (left.minimum < right.minimum) {
    return new MonoidElement(
      left.gap,
      Math.min(right.minimum, left.minimum),
      left.firstIndex,
      left.lastIndex,
      left.length + right.length,
    );
  } else if (left.minimum > right.minimum) {
    return new MonoidElement(
      right.gap,
      Math.min(right.minimum, left.minimum),
      left.length + right.firstIndex,
      left.length + right.lastIndex,
      left.length + right.length,
    );
  } else if (left.minimum === right.minimum) {
    return new MonoidElement(
      right.minimum === Infinity ? Infinity :
        Math.min(left.gap, left.length - left.lastIndex + right.firstIndex, right.gap),
      Math.min(right.minimum, left.minimum),
      left.lastIndex, // Logic error
      left.length + right.lastIndex,
      left.length + right.length,
    );
  }
  return IDENTITY_ELEMENT;
}

*** testingMiniGap.js
/* eslint-disable no-magic-numbers */
import { parallelMapReduce } from './mapReduce.js';

const sequence = [90, 70, 140, 120, 120, 70, 90, 70, 70, 140, 90];
console.log((await parallelMapReduce('./minimaGap.js', sequence, 4)).gap);
// Expected value: 1

// Thread 2:
// [110, 130, 110, 110, 130, 110];
// [50, 120, 50];

// Thread 4:
// [90, 70, 140, 120, 120, 70, 90, 70, 70, 140, 90];

// My test case:
// [40, 50, 40, 40, 20, 30, 20, 50]

