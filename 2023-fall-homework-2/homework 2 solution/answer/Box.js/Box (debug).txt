function*subsetsInSizeOrder(universe) {
  const pool = [...universe];
  const initialMask = 1n << BigInt(pool.length);
  let mask = initialMask;
  do {
    // eslint-disable-next-line no-loop-func -- false positive
    yield pool.filter((element, index) => (mask >> BigInt(index)) & 1n);
    const wiped = (mask + 1n) & mask;
    const suffix = (wiped - 1n) & ~wiped;
    const low = (mask + 1n) & ~mask;
    mask = (wiped - (suffix + 1n) / (low << 1n)) | initialMask;
  } while (mask !== initialMask);
}


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

function chooseBoxes(quantity, boxSizes) {
    const allSubsets = [...subsetsInSizeOrder(boxSizes)];
    for (const subset of allSubsets) {
        for (const bestOption of partitions(quantity, subset)) {
            if (quantity) {
            return bestOption;
      }
    }
  }
}

/* This alert syntax is for checking debug function partitions.
   Using test cases from VSCode. 
   This prints out a list of Map of boxes' choices.*/
alert('This is all the possible option: ', [...partitions(155,[20, 9, 6])]);

/* This alert syntax is for debug function partitions
   This gives us the best boxes' choices. */
alert('This is the best option: ', chooseBoxes(155, [20, 9, 6]));
// Expect: Map(2) {20 => 1, 9 => 15}

/* This alert syntax check the subsets of function subsetsInSizeOrder. */
const subset = [...subsetsInSizeOrder([20, 9, 6])];
alert('This the subsets: ',subset)
