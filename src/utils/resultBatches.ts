export function createResultSeed() {
  return Date.now() + Math.floor(Math.random() * 100000);
}

function seededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], seed: number) {
  const random = seededRandom(seed);
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

export function randomizeStrongResults<T extends { score?: number; matchScore?: number }>(items: T[], seed: number, batchSize: number) {
  if (items.length <= batchSize) return items;

  const getScore = (item: T) => item.score ?? item.matchScore ?? 0;
  const topScore = getScore(items[0] ?? ({} as T));
  const strong = items.filter((item) => getScore(item) >= topScore - 8);
  const good = items.filter((item) => getScore(item) < topScore - 8 && getScore(item) >= topScore - 22);
  const extra = items.filter((item) => getScore(item) < topScore - 22);

  return [
    ...shuffle(strong, seed + 11),
    ...shuffle(good, seed + 37),
    ...shuffle(extra, seed + 73)
  ];
}
