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

// Create a new instance of the Queue
const taskQueue = new Queue();

// Add tasks to the queue
taskQueue.insert("Task 1");
taskQueue.insert("Task 2");
taskQueue.insert("Task 3");
taskQueue.insert("Task 4");

// Get the size of the queue
console.log("Queue size:", taskQueue.size); // Output: Queue size: 3

// See what constructor looks like at this moment.
console.log(taskQueue);

// Process tasks in the queue
while (taskQueue.size > 0) {
  const task = taskQueue.remove();
  console.log("Processing task:", task);
}

// After processing, the queue should be empty
console.log("Queue size:", taskQueue.size); // Output: Queue size: 0
