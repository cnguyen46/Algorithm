/* Author : Cong Nguyen
 * Class  : CSCE 310 - SEC 250
 * Project: Homework 3*/
export class SimpleAttack {
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
  for (const attack of attacks) {
    const previousHealth = currentHealth - attack.damage;
    let candidate = undefined;
    if (previousHealth <= 0) {
      candidate = new Backpointer(attack, 1 / attack.probability);
    } else {
      candidate = new Backpointer(attack, 1 / attack.probability + backPointers[previousHealth].totalTurn);
    }
    if (candidate.totalTurn < best.totalTurn) {
      best = candidate;
    }
  }
  return best;
}

export function planAttacks(attacks, maximumHealth) {
  const backPointers = [new Backpointer(undefined, 0)];
  while (backPointers.length <= maximumHealth) {
    backPointers.push(chooseBackpointer(attacks, backPointers));
  }
  const result = [];
  for (let health = 0; health <= maximumHealth; ++health) {
    result.push(backPointers[health].attack);
  }
  return result;
}
