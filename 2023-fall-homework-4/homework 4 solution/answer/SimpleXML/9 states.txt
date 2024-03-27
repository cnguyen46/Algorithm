/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 4*/
const VALID = 0;
const OPEN = 1;
const TAG_OPEN = 2;
const CLOSE = 3;
const TAG_CLOSE = 4;
const VOID = 5;
const TAG_VOID = 6;
const END = 7;
const INVALID = 8;

const STAGE_COUNT = 9;

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
  TAG_OPEN,
  CLOSE,
  TAG_CLOSE,
  VOID,
  TAG_VOID,
  END,
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
  INVALID,
]);

const CLOSED_CHEVRON = new MonoidElement([
  INVALID,
  INVALID,
  VALID,
  INVALID,
  VALID,
  INVALID,
  VALID,
  VALID,
  INVALID,
]);

const SPACE = new MonoidElement([
  VALID,
  OPEN,
  TAG_VOID,
  CLOSE,
  END,
  VOID,
  TAG_VOID,
  END,
  INVALID,
]);

const BACKSLASH = new MonoidElement([
  VALID,
  CLOSE,
  END,
  INVALID,
  INVALID,
  END,
  END,
  INVALID,
  INVALID,
]);

const OTHER = new MonoidElement([
  VALID,
  TAG_OPEN,
  TAG_OPEN,
  TAG_CLOSE,
  TAG_CLOSE,
  VOID,
  VOID,
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
