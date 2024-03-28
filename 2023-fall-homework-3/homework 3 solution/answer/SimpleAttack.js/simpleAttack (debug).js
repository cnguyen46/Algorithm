class SimpleAttack {
  constructor(name, damage, probability) {
    this.name = name;
    this.damage = damage;
    this.probability = probability;
  }
}

class Backpointer {
  constructor(attack, totalTurn) {
    this.attack = attack;
    this.totalTurn = totalTurn;
  }
}

function chooseBackpointer(attacks, backPointers) {
  const currentHealth = backPointers.length;
  let best = new Backpointer(undefined, Infinity);
  // console.log('*** This is best: ', best);
  for (const attack of attacks) {
    const previousHealth = currentHealth - attack.damage;
    let candidate = undefined;
    if (previousHealth <= 0) {
      candidate = new Backpointer(attack, 1 / attack.probability);
       console.log('1. This is a candidate that have health <= 0: ', candidate);
    } else {
      candidate = new Backpointer(attack, 1 / attack.probability + backPointers[previousHealth].totalTurn);
       console.log('2. This is a candidate that have health > 0: ', candidate);
    }
    console.log('3. Best total turn: ', best.totalTurn);
    if (candidate.totalTurn < best.totalTurn) {
      best = candidate;
    }
  }
  return best;
}

function planAttacks(attacks, maximumHealth) {
  const backPointers = [new Backpointer(undefined, 0)];
  while (backPointers.length <= maximumHealth) {
    backPointers.push(chooseBackpointer(attacks, backPointers));
  }
  console.log('### This is a list of Backpointers: ', backPointers);
  const result = [];
  for (let health = 0; health <= maximumHealth; ++health) {
    const attack = backPointers[health].attack;
    result.push(attack);
  }
  return result; // Implement this function per the assignment instructions.
}

const a = new SimpleAttack('A', 4, 5 / 12);
const b = new SimpleAttack('B', 2, 2 / 3);
const c = new SimpleAttack('C', 5, 1 / 3);
console.log(planAttacks([a, b, c], 5));
// Expected output: [undefined, b, b, a, a, c]
