*** signal.js

/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
import { threadId } from 'worker_threads';
export const UNKNOWN = 'UNKNOWN';
export const INCONSISTENT = 'INCONSISTENT';

function join(leftPeriod, rightPeriod) {
  console.log(`1. Function join Thread ${threadId}:`, leftPeriod, rightPeriod);
  if (leftPeriod === UNKNOWN) { // (UNKNOWN, <numbere>)
    return rightPeriod;
  }
  if (rightPeriod === UNKNOWN || rightPeriod === leftPeriod) { // (UNKNOWN, UNKNOWN), (1, 1) ,(1, UNKNOWN)
    return leftPeriod;
  }
  return INCONSISTENT;
}

class MonoidElement {
  constructor(period, isTrue, countLeft, countRight) {
    this.period = period;
    this.isTrue = isTrue;
    this.countLeft = countLeft;
    this.countRight = countRight;
  }
}

export const IDENTITY_ELEMENT = new MonoidElement(UNKNOWN, false, 0, 0);

export function encodeAsMonoidElement(signal) {
  return new MonoidElement(
    UNKNOWN,
    signal,
    signal === false ? 1 : 0,
    signal === false ? 1 : 0,
  );
}

export function combineMonoidElements(left, right) {
  console.log(`2. Left and right Thread ${threadId}:`, left, right);
  if (left.isTrue === true && right.isTrue === true) {
    return new MonoidElement(
      join(join(left.period, right.period), left.countRight + right.countLeft + 1),
      true,
      left.countLeft,
      right.countRight,
    );
  } else if (left.isTrue === true && right.isTrue === false) {
    return new MonoidElement(
      join(left.period, right.period),
      true,
      left.countLeft,
      left.countRight + right.countRight,
    );
  } else if (left.isTrue === false && right.isTrue === true) {
    return new MonoidElement(
      join(left.period, right.period),
      true,
      left.countLeft + right.countLeft,
      right.countRight,
    );
  } else if (left.isTrue === false && right.isTrue === false) {
    return new MonoidElement(
      join(left.period, right.period),
      false,
      left.countLeft + right.countLeft,
      left.countRight + right.countRight,
    );
  }
  return IDENTITY_ELEMENT;
}

*** testingSignal.js

import { parallelMapReduce } from './mapReduce.js';
const signals = [
  true, false, true, false, true, false, true, false,
  false, false, true, false, true, false, true, false,
  true,
];
console.log((await parallelMapReduce('./signal.js', signals, 2)).period);
