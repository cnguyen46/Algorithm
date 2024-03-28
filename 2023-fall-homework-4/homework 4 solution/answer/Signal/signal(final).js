/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
export const UNKNOWN = 'UNKNOWN';
export const INCONSISTENT = 'INCONSISTENT';

function join(leftPeriod, rightPeriod) {
  if (leftPeriod === UNKNOWN) {
    return rightPeriod;
  }
  if (rightPeriod === UNKNOWN || rightPeriod === leftPeriod) {
    return leftPeriod;
  }
  return INCONSISTENT;
}

class MonoidElement {
  constructor(period, isTrueExist, countLeft, countRight) {
    this.period = period;
    this.isTrueExist = isTrueExist;
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
  return new MonoidElement(
    left.isTrueExist === true && right.isTrueExist === true ?
      join(join(left.period, right.period), left.countRight + right.countLeft + 1) :
      join(left.period, right.period),
    !(left.isTrueExist === false && right.isTrueExist === false),
    left.isTrueExist === true ? left.countLeft : left.countLeft + right.countLeft,
    right.isTrueExist === true ? right.countRight : left.countRight + right.countRight,
  );
}
