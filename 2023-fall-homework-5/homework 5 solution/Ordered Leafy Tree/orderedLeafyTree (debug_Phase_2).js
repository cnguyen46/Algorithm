*** orderedLeafyTree.js

  match(position, isTooFar) {
    const [leaf, preaccumulation] = this.find(position);
    if (leaf === undefined || this.annotation.compare(position, preaccumulation) !== 0) {
      return undefined;
    }
    let current = leaf;
    let accumulation = this.annotation.identity;
    // console.log(`1. Current: ${current}`);
    // console.log(`2. Accumulation before the loop: ${current}`);
    for (;!isTooFar(accumulation);) {
      // console.log('***Loop start');
      // console.log(`3. Current.parent ${current.parent}:`);
      if (current.parent === undefined) {
        return undefined;
      }
      const information = [current, accumulation];
      const [previousCurrent, backward] = information;
      // console.log(`4. Previous current: ${previousCurrent}`);
      // console.log(`5. Accumulation: ${accumulation}`);
      current = current.parent;
      // console.log(`6. Current after update: ${current}`);
      // console.log(`7. Right child: ${current.children[1]}`);
      if (previousCurrent === current.children[0]) {
        accumulation = this.annotation.combine(accumulation, current.children[1].summary);
        // console.log(`8. Accumulation after update: ${accumulation}`);
        if (isTooFar(accumulation)) {
          accumulation = backward;
          break;
        }
      }
    }
    current = current.children[1];
    for (;current instanceof Branch;) {
      // console.log('------------------------ Second Loop Start -----------------------');
      // console.log(`1. Current: ${current}`);
      const backward = accumulation;
      accumulation = this.annotation.combine(accumulation, current.children[0].summary);
      if (!isTooFar(accumulation)) {
        current = current.children[1];
      } else {
        accumulation = backward;
        current = current.children[0];
      }
      // console.log(`2. Current descending: ${current}`);
      // console.log(`3. Accumulation: ${accumulation}`);
    }
    // console.log(`*** Preaccumulation: ${preaccumulation}`);
    // console.log(`*** Leaf.summary: ${leaf.summary}`);
    return this.annotation.combine(this.annotation.combine(preaccumulation, leaf.summary), accumulation);
  }

*** testingRope.js

import { ParenthesisMatchingRope } from './rope.js';

const rope = new ParenthesisMatchingRope('((()x))xxx(x)(x)');
console.log('Result:', rope.match(0));
// Expected ascending output: 4
// Expected matching output: 6

