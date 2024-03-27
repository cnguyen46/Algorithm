/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
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
  return new MonoidElement(Infinity, number, 0, 0, 1);
}

export function combineMonoidElements(left, right) {
  return new MonoidElement(
    left.minimum < right.minimum ? left.gap : left.minimum > right.minimum ? right.gap :
      left.minimum === right.minimum ? right.minimum === Infinity ? Infinity :
        Math.min(left.gap, left.length - left.lastIndex + right.firstIndex, right.gap) :
        Math.min(left.gap, right.gap),
    Math.min(left.minimum, right.minimum),
    left.minimum < right.minimum ? left.lastIndex : left.minimum > right.minimum ?
      left.length + right.firstIndex : left.minimum === right.minimum ? right.firstIndex === right.lastIndex ?
        left.lastIndex : left.length + right.firstIndex : left.lastIndex,
    left.minimum < right.minimum ? left.lastIndex : left.length + right.lastIndex,
    left.length + right.length,
  );
}
