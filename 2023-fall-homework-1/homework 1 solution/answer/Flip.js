// CSCE 310 - SEC 250
// Author: Cong Nguyen
export function flipZeroDelimitedBlocks(list) {
  // Implement this function per the assignment instructions.
  // Explaining code:
  // For example: the list A = {0,1,2,3,0,0,4,5}
  // after flipping, A becomes {0,3,2,1,0,0}
  // Checking the element at index i in the list A, whether:
  // - If element == 0, then check if the tempArr is empty or not:
  //    + If temporary array is not empty -> Reverse the tempArr -> Concat tempArr to newArr -> Add zero to newArr
  //    + If temporary array is empty -> Add zero to newArr
  // - If element != 0, then add element to tempArr -> Check whether index i is the last index or not:
  //    + If yes, Reverse the tempArr -> Concat tempArr to newArr
  //    + If no, start a new loop.
  let tempArr = [];
  let newArr = [];

  for (let i = 0; i <= list.length - 1; i++) {
    if (list[i] === 0) {
      if (tempArr.length > 0) {
        newArr = newArr.concat(tempArr.reverse());
        tempArr = [];
        newArr.push(0);
      } else {
        newArr.push(0);
      }
    } else {
      tempArr.push(list[i]);
      if (i === list.length - 1) {
        newArr = newArr.concat(tempArr.reverse());
      }
    }
  }
  return newArr;
}
