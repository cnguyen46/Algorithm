/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 3*/
const TRAIN_LOADING_AND_UNLOADING_TIME = 3;
const LOCAL_TRAIN_CONNECTION_TIME = TRAIN_LOADING_AND_UNLOADING_TIME + 1;

function getLocalTrainTravelTime(from, to) {
  return LOCAL_TRAIN_CONNECTION_TIME * Math.abs(to - from);
}

function getDirectTravelTime(from, to) {
  return from !== to ? TRAIN_LOADING_AND_UNLOADING_TIME + Math.abs(to - from) : 0;
}

export class Journey {
  constructor(source, destination, popularity) {
    this.source = source;
    this.destination = destination;
    this.popularity = popularity;
  }

  getTimeOnOverlap(source, destination) {
    if (this.destination < source || this.source > destination) {
      return 0;
    }
    let beginOverLap = undefined;
    let endOverlap = undefined;
    let usingExpressTrain = getDirectTravelTime(source, destination);
    if (this.source <= source) {
      if (this.destination >= destination) {
        beginOverLap = source;
        endOverlap = destination;
      } else if (this.destination <= destination) {
        beginOverLap = source;
        endOverlap = this.destination;
        usingExpressTrain += getLocalTrainTravelTime(this.destination, destination);
      }
    } else if (this.source >= source) {
      if (this.destination >= destination) {
        beginOverLap = this.source;
        endOverlap = destination;
        usingExpressTrain += getLocalTrainTravelTime(source, this.source);
      } else if (this.destination <= destination) {
        beginOverLap = this.source;
        endOverlap = this.destination;
        usingExpressTrain += getLocalTrainTravelTime(source, this.source) +
                             getLocalTrainTravelTime(this.destination, destination);
      }
    }
    const usingOnlyLocalTrain = getLocalTrainTravelTime(beginOverLap, endOverlap);
    if (usingOnlyLocalTrain < usingExpressTrain) {
      return usingOnlyLocalTrain;
    }
    return usingExpressTrain;
  }
}

class Backpointer {
  constructor(previousStation, totalDelay) {
    this.previousStation = previousStation;
    this.totalDelay = totalDelay;
  }
}

function chooseBackpointer(journeys, backPointers) {
  const currentStation = backPointers.length;
  let best = new Backpointer(undefined, Infinity);
  for (let source = 0; source < currentStation; ++source) {
    let delay = backPointers[source].totalDelay;
    for (const journey of journeys) {
      delay += journey.getTimeOnOverlap(source, currentStation) * journey.popularity;
    }
    const candidate = new Backpointer(source, delay);
    if (candidate.totalDelay < best.totalDelay) {
      best = candidate;
    }
  }
  return best;
}

export function planExpressStops(journeys, finalStation) {
  const listBackPointers = [new Backpointer(undefined, 0)];
  while (listBackPointers.length <= finalStation) {
    listBackPointers.push(chooseBackpointer(journeys, listBackPointers));
  }
  const reversedPath = [];
  let currentStation = finalStation;
  while (currentStation !== undefined) {
    reversedPath.push(currentStation);
    currentStation = listBackPointers[currentStation].previousStation;
  }
  return reversedPath.reverse();
}
