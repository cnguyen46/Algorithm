/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
const VALID = 0;
const OPEN = 1;
const AFTER_OPEN = 2;
const CLOSE = 3;
const AFTER_CLOSE = 4;
const BEFORE_VOID = 5;
const VAID = 6;
const INVALID = 7;

const STAGE_COUNT = 8;

class MonoidElement {
  constructor(stage) {
    this.stage = stage;
  }

  get valid() {
    return this.stage[VALID] === VALID;
  }
}

export const IDENTITY_ELEMENT = new MonoidElement([
  VALID,
  OPEN,
  AFTER_OPEN,
  CLOSE,
  AFTER_CLOSE,
  BEFORE_VOID,
  VAID,
  INVALID,
]);

const OPENED_CHEVRON = new MonoidElement([
  OPEN,
  INVALID,
  INVALID,
  INVALID,
  INVALID,
  INVALID,
  INVALID,
  INVALID,
]);

const CLOSED_CHEVRON = new MonoidElement([
  INVALID,
  INVALID,
  VALID,
  INVALID,
  VALID,
  VALID,
  VALID,
  INVALID,
]);

const SPACE = new MonoidElement([
  VALID,
  OPEN,
  BEFORE_VOID,
  CLOSE,
  VAID,
  BEFORE_VOID,
  VAID,
  INVALID,
]);

const BACKSLASH = new MonoidElement([
  VALID,
  CLOSE,
  VAID,
  INVALID,
  INVALID,
  VAID,
  INVALID,
  INVALID,
]);

const OTHER = new MonoidElement([
  VALID,
  AFTER_OPEN,
  AFTER_OPEN,
  AFTER_CLOSE,
  AFTER_CLOSE,
  INVALID,
  INVALID,
  INVALID,
]);

export function encodeAsMonoidElement(character) {
  switch (character) {
  case '<':
    return OPENED_CHEVRON;
  case '>':
    return CLOSED_CHEVRON;
  case ' ':
    return SPACE;
  case '/':
    return BACKSLASH;
  default:
    return OTHER;
  }
}

export function combineMonoidElements(left, right) {
  const stages = [];
  let step = 0;
  while (step < STAGE_COUNT) {
    stages.push(right.stage[left.stage[step]]);
    ++step;
  }
  return new MonoidElement(stages);
}
