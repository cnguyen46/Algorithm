/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
const OPENED_BOOK = 0;
const CLOSED_BOOK = 1;
const INVALID = 2;

const STAGE_LIMIT = 3;

class MonoidElement {
  constructor(stage) {
    this.stage = stage;
  }

  get valid() {
    return this.stage[CLOSED_BOOK] === CLOSED_BOOK;
  }
}

export const IDENTITY_ELEMENT = new MonoidElement([
  OPENED_BOOK,
  CLOSED_BOOK,
  INVALID,
]);

const OPEN = new MonoidElement([
  INVALID,
  OPENED_BOOK,
  INVALID,
]);

const CLOSE = new MonoidElement([
  CLOSED_BOOK,
  INVALID,
  INVALID,
]);

const READ_OR_WRITE = new MonoidElement([
  OPENED_BOOK,
  INVALID,
  INVALID,
]);

export function encodeAsMonoidElement(action) {
  switch (action) {
  case 'open':
    return OPEN;
  case 'close':
    return CLOSE;
  default:
    return READ_OR_WRITE;
  }
}

export function combineMonoidElements(left, right) {
  const stages = [];
  let step = 0;
  while (step < STAGE_LIMIT) {
    stages.push(right.stage[left.stage[step]]);
    ++step;
  }
  return new MonoidElement(stages);
}
