const MIN_OF_LEN = 3;
export function findLongestSuitableSequence(list) {
  // Implement this function per the assignment instructions.
  // Create a map for tracking the index of given list.
  let mapTracking = new Map();
  for (let index = 0; index < list.length; ++index) {
    mapTracking.set(index, list[index]);
  }

  // Sorting the value of the tracking map in increasing order.
  mapTracking = new Map(Array.from(mapTracking).sort((a, b) => a[1] - b[1]));

  // Create a list of indices with increasing order of given list.
  const listOfIndices = [];
  for (const key of mapTracking.keys()) {
    listOfIndices.push(key);
  }

  // Check the size of new list of indicies < 3 ot not, if yes then return the list.
  if (listOfIndices.length < MIN_OF_LEN) {
    return listOfIndices;
  }

  // Find an arithmetic sequence of indices.
  let result = [];
  for (let i = 0; i < listOfIndices.length; ++i) {
  // Check if the current element is max or not. If it's max, start a new loop.
    if (i === Math.max(...listOfIndices)) {
      continue;
    }
    const maxStride = Math.max(...listOfIndices.slice(i)) - listOfIndices[i];
    for (let stride = 1; stride <= maxStride; ++stride) {
      const candidate = [listOfIndices[i]];
      if (listOfIndices[i] + stride * (result.length - 1) > Math.max(...listOfIndices)) {
        break;
      }
      let currentPoint = i + 1;
      /* Check the existing of the checked index from offset's position.
       * If yes, then add the checked index to temporary array, and update offset.
       * If no then stop the loop. */
      for (let index = 1; listOfIndices.includes(listOfIndices[i] + stride * index, currentPoint); ++index) {
        candidate.push(listOfIndices[i] + stride * index);
        currentPoint = listOfIndices.indexOf(listOfIndices[i] + stride * index);
      }
      // Update the result if its length is lower than the candidate's length.
      if (result.length < candidate.length) {
        result = candidate;
      }
    }
  }
  return result;
}
