const FULL_ROTATION = 360; // degrees
function isSafe (changesInAngle, startingAngle, safetyMargin) {
    let current = 0;
    let minimum = 0;
    let maximum = 0;
    for ( const changeInAngle of changesInAngle ) {
        console.log('*** Starting a new loop')
        current += changeInAngle ;
        minimum = Math.min(current, minimum);
        maximum = Math.max(current, maximum);
        console.log('1. Current: ', current)
        console.log('2. Minimum: ', minimum)
        console.log('3. Maximum: ', maximum)
    }
    console.log('4. +++ Minimum: ', startingAngle + minimum)
    console.log('5. +++ Maximum: ', startingAngle + maximum)
    return startingAngle + minimum >= safetyMargin &&
    startingAngle + maximum <= FULL_ROTATION - safetyMargin;
}

const changesInAngle = [59, 12, -93, 26, -55, -76, -144];
const startingAngle = 280;
const safetyMargin = 9;
console.log(isSafe (changesInAngle, startingAngle, safetyMargin))
