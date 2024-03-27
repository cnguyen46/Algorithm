class Outcome {
  constructor(damage, probability) {
    this.damage = damage;
    this.probability = probability;
  }
}

export class ComplexAttack {
  constructor(name, ...damageProbabilityPairs) {
    console.assert(damageProbabilityPairs.length % 2 === 0);
    this.name = name;
    this.outcomes = [];
    this.probability = 0;
    for (let i = 0; i < damageProbabilityPairs.length; i += 2) {
      const outcome = new Outcome(damageProbabilityPairs[i], damageProbabilityPairs[i + 1]);
      this.outcomes.push(outcome);
      this.probability += outcome.probability;
    }
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
    let turn = 1 / attack.probability;
    for (const outcome of attack.outcomes) {
      let previousHealth = undefined;
      if (currentHealth <= outcome.damage) {
        previousHealth = 0;
      } else {
        previousHealth = currentHealth - outcome.damage;
      }
      turn += (outcome.probability / attack.probability) * backPointers[previousHealth].totalTurn;
    }
    const candidate = new Backpointer(attack, turn);
    if (candidate.totalTurn < best.totalTurn) {
      best = candidate;
    }
  }
  return best;
}

export function planAttacks(attacks, maximumHealth) {
  const listBackPointers = [new Backpointer(undefined, 0)];
  while (listBackPointers.length <= maximumHealth) {
    listBackPointers.push(chooseBackpointer(attacks, listBackPointers));
  }
  const result = [];
  let health = 0;
  while (health <= maximumHealth) {
    result.push(listBackPointers[health].attack);
    ++health;
  }
  return result;
}
