match(position, isTooFar) {
    const [leaf, preaccumulation] = this.find(position);
    if (leaf === undefined || this.annotation.compare(position, preaccumulation) !== 0) {
      return undefined;
    }
    let current = leaf;
    let accumulation = this.annotation.identity;
    for (;!isTooFar(accumulation);) {
      if (current.parent === undefined) {
        return undefined;
      }
      const child = current;
      current = current.parent;
      if (child === current.children[0]) {
        if (!isTooFar(this.annotation.combine(accumulation, current.children[1].summary))) {
          accumulation = this.annotation.combine(accumulation, current.children[1].summary);
        } else {
          break;
        }
      }
    }
    current = current.children[1];
    for (;current instanceof Branch;) {
      if (!isTooFar(this.annotation.combine(accumulation, current.children[0].summary))) {
        accumulation = this.annotation.combine(accumulation, current.children[0].summary);
        current = current.children[1];
      } else {
        current = current.children[0];
      }
    }
    return this.annotation.combine(this.annotation.combine(preaccumulation, leaf.summary), accumulation);
  }
