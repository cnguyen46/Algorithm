class Item {
  constructor(weight, value) {
    console.assert(weight > 0, `Tried to create an item with a nonpositive weight ${weight}.`);
    console.assert(Number.isInteger(weight), `Tried to create an item with a noninteger weight ${weight}.`);
    this.weight = weight;
    this.value = value;
  }
}

const KILOGRAM_OF_NOTHING = new Item(1, 0);

class Backpointer {
  constructor(item, totalValue) {
    this.item = item;
    this.totalValue = totalValue;
  }
}

function chooseBackpointer(items, backpointers) {
  const currentWeight = backpointers.length;
  let best = new Backpointer(
    KILOGRAM_OF_NOTHING,
    backpointers[currentWeight - 1].totalValue,
  );
  for (const item of items) {
    const previousWeight = currentWeight - item.weight;
    if (previousWeight >= 0) {
      const candidate = new Backpointer(
        item,
        item.value + backpointers[previousWeight].totalValue,
      );
      if (candidate.totalValue > best.totalValue) {
        best = candidate;
      }
    }
  }
  return best;
}

function chooseItems(items, weightLimit) {
  console.assert(Number.isInteger(weightLimit), `Tried to choose items with a noninteger weight limit ${weightLimit}.`);
  const backpointers = [new Backpointer(undefined, 0)];
  while (backpointers.length <= weightLimit) {
    backpointers.push(chooseBackpointer(items, backpointers));
  }
  console.log('*** This is backpointers: ', backpointers);
  const reversedPath = [];
  for (let weight = weightLimit; weight > 0; weight -= backpointers[weight].item.weight) {
    const item = backpointers[weight].item;
    if (item !== KILOGRAM_OF_NOTHING) {
      reversedPath.push(item);
    }
  }
  return reversedPath.reverse();
}

const ITEMS = [
  new Item(3, 10),
  new Item(4, 14),
];
const WEIGHT_LIMIT = 10;

console.log(chooseItems(ITEMS, WEIGHT_LIMIT))
