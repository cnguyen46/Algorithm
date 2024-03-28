*** Explaining given functions in standardGenerators.js

1/ Create subsets from contaning most elements to least elements
function*subsets(universe) {
  const pool = [...universe];
  for (let mask = 1n << BigInt(pool.length); mask-- > 0n;) {
    yield pool.filter((element, index) => (mask >> BigInt(index)) & 1n);
  }
}

alert([...subsets([6,5,4])]);
// Output:
[
  [ 6, 5, 4 ], [ 5, 4 ],
  [ 6, 4 ],    [ 4 ],
  [ 6, 5 ],    [ 5 ],
  [ 6 ],       []
]

2/ Create subsets from contaning least elements to most elements
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

alert([...subsetsInSizeOrder([6,5,4])]);
// Output:
[
  [],       [ 4 ],
  [ 5 ],    [ 6 ],
  [ 5, 4 ], [ 6, 4 ],
  [ 6, 5 ], [ 6, 5, 4 ]
]

3/ Create subsets with same size of parent set, but changes the position of elements
function*permutations(sequence) {
  yield sequence;
  const indices = [...sequence.keys()];
  const counters = indices.map(() => 0);
  for (let level = 1; level < indices.length;) {
    if (counters[level] < level) {
      const other = (level % 2) * counters[level];
      [indices[other], indices[level]] = [indices[level], indices[other]];
      yield indices.map((index) => sequence[index]);
      ++counters[level];
      level = 1;
    } else {
      counters[level] = 0;
      ++level;
    }
  }
}

alert([...permutations([6,5,4])]);
// Output:
[
  [ 6, 5, 4 ],
  [ 5, 6, 4 ],
  [ 4, 6, 5 ],
  [ 6, 4, 5 ],
  [ 5, 4, 6 ],
  [ 4, 5, 6 ]
]

4/ The same output liked #3, but has different output's order.
function*permutationsInLexicographicOrder(sequence) {
  if (sequence.length < 2) {
    yield sequence;
    return;
  }
  const indices = [...sequence.keys()];
  for (;;) {
    yield indices.map((index) => sequence[index]);
    let left = indices.length - 2;
    while (indices[left] >= indices[left + 1]) {
      --left;
      if (left < 0) {
        return;
      }
    }
    let right = indices.length - 1;
    while (indices[right] <= indices[left]) {
      --right;
    }
    [indices[left], indices[right]] = [indices[right], indices[left]];
    ++left;
    right = indices.length - 1;
    while (left < right) {
      [indices[left], indices[right]] = [indices[right], indices[left]];
      ++left;
      --right;
    }
  }
}

alert([...permutationsInLexicographicOrder([6,5,4])]);
// Output:
[
  [ 6, 5, 4 ],
  [ 6, 4, 5 ],
  [ 5, 6, 4 ],
  [ 5, 4, 6 ],
  [ 4, 6, 5 ],
  [ 4, 5, 6 ]
]
