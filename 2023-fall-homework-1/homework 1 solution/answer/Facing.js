// CSCE 310 - SEC 250
// Author: Cong Nguyen
export class Vertex {
  // Implement this class's methods per the assignment instructions.
  // Explaining code: We need to have a constructor that keeps track the current x, current y,
  // and current direction of a Robot. This orginal position and direction of a Robot are [0,0], and east, respectedly.
  constructor(x = 0, y = 0, direction = 'east') {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  // Getter method as a Robot moves forward as one step from its current position and direction.
  get forward() {
    let newHorizontal = this.x;
    let newVertical = this.y;
    if (this.direction === 'east') {
      newHorizontal++;
    } else if (this.direction === 'west') {
      newHorizontal--;
    } else if (this.direction === 'north') {
      newVertical++;
    } else if (this.direction === 'south') {
      newVertical--;
    }
    return new Vertex(newHorizontal, newVertical, this.direction);
  }

  // Getter method as a Robot turns left from its current direction.
  get left() {
    let newDirection = undefined;
    if (this.direction === 'east') {
      newDirection = 'north';
    } else if (this.direction === 'west') {
      newDirection = 'south';
    } else if (this.direction === 'north') {
      newDirection = 'west';
    } else if (this.direction === 'south') {
      newDirection = 'east';
    }
    return new Vertex(this.x, this.y, newDirection);
  }

  // Getter method as a Robot turns right from its current direction.
  get right() {
    let newDirection = undefined;
    if (this.direction === 'east') {
      newDirection = 'south';
    } else if (this.direction === 'west') {
      newDirection = 'north';
    } else if (this.direction === 'north') {
      newDirection = 'east';
    } else if (this.direction === 'south') {
      newDirection = 'west';
    }
    return new Vertex(this.x, this.y, newDirection);
  }
}
