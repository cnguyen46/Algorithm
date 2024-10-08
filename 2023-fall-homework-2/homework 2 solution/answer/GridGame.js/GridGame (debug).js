/* This is a Queue */

class Queue {
  constructor() {
    this.head = undefined;
    this.tail = undefined;
    this._size = 0;
  }

  get size() {
    return this._size;
  }

  insert(element) {
    const oldTail = this.tail;
    this.tail = {
      element,
      next: undefined,
    };
    if (oldTail === undefined) {
      this.head = this.tail;
    } else {
      oldTail.next = this.tail;
    }
    ++this._size;
  }

  remove() {
    console.assert(this.head !== undefined, 'Cannot remove an element from an empty queue');
    const element = this.head.element;
    this.head = this.head.next;
    if (this.head === undefined) {
      this.tail = undefined;
    }
    --this._size;
    return element;
  }
}

/* This is Breadth First Search */
class Edge {
  constructor(from, action, to, distance = undefined) {
    this.from = from;
    this.action = action;
    this.to = to;
    this.distance = distance;
  }
}

function bfs(source, isDestination) {
  const backpointers = new Map();
  const worklist = new Queue();
  worklist.insert(new Edge(undefined, undefined, source));
  while (worklist.size > 0) {
    const workitem = worklist.remove();
    if (backpointers.has(`${workitem.to}`)) {
      continue;
    }
    backpointers.set(`${workitem.to}`, workitem);
    if (isDestination(workitem.to)) {
      const reversedPath = [];
      for (let current = workitem;
        current.from !== undefined;
        current = backpointers.get(`${current.from}`)) {
        reversedPath.push(current);
      }
      return reversedPath.reverse();
    }
    for (const { action, child } of workitem.to.incidences) {
      worklist.insert(new Edge(workitem.to, action, child));
      ++explorationCounter;
    }
  }
  return undefined;
}

/* This is the main program */
const FLOOR = '□';
const WALL = '■';
const PAWN = '●';

const DIRECTIONS = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];

function shift([x, y], [dx, dy]) {
  return [x + dx, y + dy];
}

class Vertex {
  constructor(cells) {
    this.cells = cells;
  }

  *getLocations() {
    for (let y = 0; y < this.cells.length; ++y) {
      const row = this.cells[y];
      for (let x = 0; x < row.length; ++x) {
        yield [x, y];
      }
    }
  }

  at([x, y]) {
    if (y >= 0 && y < this.cells.length) {
      const row = this.cells[y];
      if (x >= 0 && x < row.length) {
        return row[x];
      }
    }
    return WALL;
  }

  get incidences() {
    const results = [];
    // Implement this getter per the assignment instructions.
    //
    // For each direction, push a result that gives the vertex that would be
    // reached by pushing all pawns in the direction, like this:
    console.log('*** This is where the grid start to move');
    for (const direction of DIRECTIONS) {
      // This is for debug (delete when finishing)
      if (direction[0] === 1 && direction[1] === 0) {
        console.log('Moving East');
      } else if (direction[0] === 0 && direction[1] === -1) {
        console.log('Moving South');
      } else if (direction[0] === -1 && direction[1] === 0) {
        console.log('Moving West');
      } else if (direction[0] === 0 && direction[1] === 1) {
        console.log('Moving North');
      }
      //
      const newGrid = this.cells.map((row) => row.map((cell) => cell === WALL ? WALL : cell === PAWN ? PAWN : FLOOR));
      let isMoved = false;
      console.log('1. This is a begin grid: ', newGrid);
      for (const [y, row] of this.cells.entries()) {
        for (const [x, cell] of row.entries()) {
          // Check if the cell is PAWN, then shift to new cell.
          if (cell === PAWN) {
            const [newX, newY] = shift([x, y], direction);
            // Check if the new cells are in the bound of the grid.
            if ((newX >= 0 && newX < row.length) &&
                (newY >= 0 && newY < this.cells.length)) {
              // Check to move the cell if there is a FLOOR, and don't move if there is a WALL.
              if (newGrid[newY][newX] === FLOOR) {
                newGrid[newY][newX] = PAWN;
                newGrid[y][x] = FLOOR;
                isMoved = true;
              }
            }
          }
        }
      }
      if (isMoved) {
        results.push({
          child: new Vertex(newGrid),
        });
      }
      console.log('2. This is an end grid:   ', newGrid);
    }
    // For this problem it okay to omit actions and costs.
    return results;
  }

  toString() {
    return this.cells.map((row) => row.join('')).join('\n');
  }
}

// Run this function to check the results
function solveGridGame(initialGrid, goalGrid) {
  const edges = bfs(
    new Vertex(initialGrid.split('\n').map((row) => [...row])),
    (vertex) => `${vertex}` === goalGrid,
  );
  return edges !== undefined ? [initialGrid, ...edges.map((edge) => `${edge.to}`)] : undefined;
}

const initialGrid = '□●●\n□●●\n■□□';
const goalGrid = '□□□\n□●●\n■●●';
console.log(solveGridGame(initialGrid, goalGrid));
