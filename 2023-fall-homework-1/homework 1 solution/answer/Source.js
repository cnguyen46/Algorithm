// CSCE 310 - SEC 250
// Author: Cong Nguyen
export function catalogReachingSources(functionalGraph) {
  // Implement this function per the assignment instructions.
  const resultMap = new Map(); // This is the map R

  // Add keys and values to R, which has exactly number of keys of M, but with empty set of values.
  for (const i of functionalGraph.keys()) {
    resultMap.set(i, new Set());
  }

  const valueIterator = new Set(); // This is the set V of values in Map M
  const deductedSet = new Set(); // This set contains only elements that belongs to set of keys, after removing set V

  // Deducting those elements in valueIterator, that also in keyIterator.
  // After that, add those remaining elements in keyIterator to a new set.
  for (const i of functionalGraph.values()) {
    valueIterator.add(i);
  }

  for (const s of functionalGraph.keys()) {
    if (!valueIterator.has(s)) {
      deductedSet.add(s);
    }
  }

  // Loop the element inside the new set after deducting the elements v.
  for (const s of deductedSet) {
    const temporarySet = new Set();
    let i = s;
    while (!temporarySet.has(i)) {
      resultMap.get(i).add(s);
      temporarySet.add(i);
      i = functionalGraph.get(i);
    }
  }
  return resultMap;
}
