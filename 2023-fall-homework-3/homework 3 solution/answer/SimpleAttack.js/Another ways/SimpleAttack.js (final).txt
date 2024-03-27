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

export function planAttacks(attacks, maximumHealth) {
  const backpointers = [new Backpointer(undefined, 0)];

  for (let currentHealth = 1; currentHealth <= maximumHealth; currentHealth++) {
    let best = new Backpointer(undefined, Infinity);
    for (const attack of attacks) {
      let previousHealth = 0;
      let candidate = undefined;
      const turn = 1 / attack.probability;

      if (currentHealth <= attack.damage) {
        previousHealth = 0;
      } else {
        previousHealth = currentHealth - attack.damage;
      }

      candidate = new Backpointer(attack, turn + backpointers[previousHealth].totalTurn);
      if (candidate.totalTurn < best.totalTurn) {
        best = candidate;
      }
    }
    backpointers.push(best); // Check this line
  }

  const bestAttacks = [];
  for (const simpleAttack of backpointers) {
    bestAttacks.push(simpleAttack.attack);
  }
  return bestAttacks;
}
