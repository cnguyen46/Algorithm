export function catalogReachingSources(M) {
  
  const R = new Map();
  for (const [k] of M) {
    R.set(k, new Set());
  }

  for (const [s] of M) {
    if (![...M.values()].includes(s)){
      const O = new Set();
      let i = s;
      while (!O.has(i)) {
        R.get(i).add(s);
        O.add(i);
        i = M.get(i);
      }
    }
  }
  return R;
}
