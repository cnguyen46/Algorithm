getTimeOnOverlap(source, destination) {
    // This is condition 1 + 6
    if (this.destination < source || this.source > destination) {
      return 0;
    }
    let beginOverLap = undefined;
    let endOverlap = undefined;
    let usingExpressTrain = getDirectTravelTime(source, destination);
    // This is condition 2
    if (this.source < source && this.destination > destination) {
      beginOverLap = source;
      endOverlap = destination;
    // This is condition 3
    } else if (this.source < source && this.destination < destination) {
      beginOverLap = source;
      endOverlap = this.destination;
      usingExpressTrain += getLocalTrainTravelTime(this.destination, destination);
    // This is condition 4
    } else if (this.source > source && this.destination > destination) {
      beginOverLap = this.source;
      endOverlap = destination;
      usingExpressTrain += getLocalTrainTravelTime(source, this.source);
    // This is condition 5
    } else if (this.source > source && this.destination < destination) {
      beginOverLap = this.source;
      endOverlap = this.destination;
      usingExpressTrain += getLocalTrainTravelTime(source, this.source) +
      getLocalTrainTravelTime(this.destination, destination);
    }
    const usingLocalTrain = getLocalTrainTravelTime(beginOverLap, endOverlap);
    if (usingLocalTrain < usingExpressTrain) {
      return usingLocalTrain;
    }
    return usingExpressTrain;
  }
}
