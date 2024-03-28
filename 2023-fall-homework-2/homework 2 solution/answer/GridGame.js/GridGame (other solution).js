get incidences() {
    const results = [];
    // Implement this getter per the assignment instructions.
    for (const direction of DIRECTIONS) {
      const newGrid = this.cells.map((row) => row.map((cell) => cell === WALL ? WALL : FLOOR));
      for (const coordinate of [...this.getLocations()]) {
        /* Check if the current location of the old grid is PAWN,
        and if the current location of the new grid is FLOOR.
        If true, then we continue to check the next location from current location of the old grid.
        If false, then we move to the next current location of the old grid.
        This helps to reduce duplicated checking location of the old grid.
        */
        if (this.at(coordinate) === PAWN && newGrid[coordinate[1]][coordinate[0]] === FLOOR) {
          newGrid[coordinate[1]][coordinate[0]] = PAWN;
          let newCoordinate = shift(coordinate, direction);
          while (this.at(newCoordinate) === PAWN) {
            newGrid[newCoordinate[1]][newCoordinate[0]] = PAWN;
            newCoordinate = shift(newCoordinate, direction);
          }
          if (this.at(newCoordinate) === FLOOR) {
            newGrid[coordinate[1]][coordinate[0]] = FLOOR;
            newGrid[newCoordinate[1]][newCoordinate[0]] = PAWN;
          } else {
            newGrid[coordinate[1]][coordinate[0]] = PAWN;
          }
        }
      }
      results.push({
        child: new Vertex(newGrid),
      });
    }
    return results;
  }
