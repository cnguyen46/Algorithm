/* IMPORTANT: Remove this directive when you start working on the code so that
 * the linter will warn you about code style issues. */
import { subsetsInSizeOrder } from './standardGenerators.js';

function*partitions(positiveInteger, allowedParts, forbiddenCount = 0) {
  if (forbiddenCount === allowedParts.length) {
    if (positiveInteger === 0) {
      yield new Map();
    }
  }
  const part = allowedParts[forbiddenCount];
  const maximumCount = Math.floor(positiveInteger / part);
  // This special case is not necessary for correctness, but helps with performance:
  if (forbiddenCount === allowedParts.length - 1) {
    if (maximumCount * part === positiveInteger) {
      yield maximumCount === 0 ? new Map() : new Map([[part, maximumCount]]);
    }
    return;
  }
  for (let i = maximumCount; i >= 0; --i) {
    for (const completion of partitions(positiveInteger - i * part, allowedParts, forbiddenCount + 1)) {
      if (i > 0) {
        completion.set(part, i);
      }
      yield completion;
    }
  }
}

export function chooseBoxes(quantity, boxSizes) {
  // Implement this function per the assignment instructions.
  const allSubsets = [...subsetsInSizeOrder(boxSizes)];
  for (const subset of allSubsets) {
    for (const bestOption of partitions(quantity, subset)) {
      return bestOption;
    }
  }
}
