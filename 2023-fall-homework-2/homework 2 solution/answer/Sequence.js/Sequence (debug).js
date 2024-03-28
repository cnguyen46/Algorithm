function findLongestSuitableSequence(list) {
    // Create a map for tracking the keys of given list
    let mapTracking = new Map();
    for (let key = 0; key < list.length; key++) {
        mapTracking.set(key, list[key]);
    }
    // Sorting the value of the tracking map in increasing order
    mapTracking = new Map(Array.from(mapTracking).sort((a, b) => a[1] - b[1]));
    
    // Create a list of index following new order
    const indexList = [];
    for (const key of mapTracking.keys()) {
        indexList.push(key);
    }
    //Check if the size of input list < 3, return the list.
    if (indexList.length < 3) {
        return indexList;
    }
    // alert('This is index List: ', indexList)
    // Find an arithmetic sequence of indices.
    let result = [];
    for (let i = 0; i < indexList.length; i++) {
        // alert("*^^^*This is where checking start from:", indexList[i])
        // alert()
        let maxStride = Math.max(...indexList.slice(i + 1)) - indexList[i];
        for (let stride = 1; stride <= maxStride; stride++) {
            let tempArr = [indexList[i]];
            // alert(`***1. CHECK ${indexList[i]} + ${stride} * ${result.length-1} = ${indexList[i] + stride * (result.length-1)} < ${Math.max(...indexList)} or not`)
            if (indexList[i] + stride * (result.length-1) > Math.max(...indexList)) {
                // alert("***Breaking the loop due to bigger than max value")
                // alert()
                break;
            }
            let multiple = 1;
            let offset = i + 1;
            // alert(`***2. CHECK ${indexList[i]} + ${stride} * ${multiple} = ${indexList[i] + stride * multiple} exist from postion ${offset}`)
            while (indexList.includes((indexList[i] + stride * multiple), offset)) {
                // alert('1. This is an offset before changing', offset)
                // alert('2. This is the value needed to find: ', indexList[i] + stride * multiple)
                tempArr.push(indexList[i] + stride * multiple);
                // alert("3. This is the temporary result: ", tempArr)
                offset = indexList.indexOf(indexList[i] + stride * multiple);
                // alert('4. This is an offset after changing: ', offset)
                multiple++;
            }
            if (result.length < tempArr.length) {
                result = tempArr;
                // alert("5. This is the result: ", result)
            }
        }
    }
    return result;
}



//Testing the result
const inputList = [70, 20, 60, 30, 40, 10, 0, 50];
const result = findLongestSuitableSequence(inputList);
alert(result); // Expected output: [1,4,7]


//Debugging the code
const list = [70, 20, 60, 30, 40, 10, 0, 50];
let mapTracking = new Map();
for (let key = 0; key < list.length; key++) {
    mapTracking.set(key, list[key]);
}

mapTracking = new Map(Array.from(mapTracking).sort((a, b) => a[1] - b[1]));
// alert(mapTracking);

const indexList = [];
for (const key of mapTracking.keys()) {
    indexList.push(key);
}
// alert(indexList)

let slicedList = indexList.slice(1).slice(1);
// alert(slicedList);


//Explaining given code:
// const count = 3; // Number of new array's size. Longest possible sequence
// const index = 0; // The value of this index doesn't affect to the index inside syntax .map().
// const stride = 3; // The difference of index's value between two adjancent elements in new array.
// const offset = 1; // The first element of new array.

// const newArr = Array(count).fill().map((_, index ) => stride * index + offset,0);
// alert(newArr); // Expected output: Array [1,4,7]
    
