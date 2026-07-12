export interface OutfitCatalogItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  gender: "Men" | "Women" | "All";
  event: string;
  tags: string[];
}

export const outfitCatalog: OutfitCatalogItem[] = [
  {
    id: "women-sun",
    title: "Women - Sun",
    subtitle: "Heat & sun ready",
    image: "/images/clothing/real-women-sun.png",
    gender: "Women",
    event: "Sun",
    tags: ["women", "sun", "daytime", "hot", "sunscreen", "hat", "walking", "falls", "heritage", "lakes"]
  },
  {
    id: "men-sun",
    title: "Men - Sun",
    subtitle: "Heat & sun ready",
    image: "/images/clothing/real-men-sun.png",
    gender: "Men",
    event: "Sun",
    tags: ["men", "sun", "daytime", "hot", "sunscreen", "hat", "walking", "falls", "heritage", "lakes"]
  },
  {
    id: "women-walking",
    title: "Women - Walking",
    subtitle: "Trail comfort",
    image: "/images/clothing/real-women-walking.png",
    gender: "Women",
    event: "Walking",
    tags: ["women", "walking", "hiking", "trail", "mountain", "heritage", "park", "adventure", "daytime"]
  },
  {
    id: "men-walking",
    title: "Men - Walking",
    subtitle: "Trail comfort",
    image: "/images/clothing/real-men-walking.png",
    gender: "Men",
    event: "Walking",
    tags: ["men", "walking", "hiking", "trail", "mountain", "heritage", "park", "adventure", "daytime"]
  },
  {
    id: "women-daytime",
    title: "Women - Daytime",
    subtitle: "Light sightseeing",
    image: "/images/clothing/real-women-daytime.png",
    gender: "Women",
    event: "Daytime",
    tags: ["women", "daytime", "sun", "walking", "city", "heritage", "falls", "lakes"]
  },
  {
    id: "men-daytime",
    title: "Men - Daytime",
    subtitle: "Light & comfy",
    image: "/images/clothing/real-daytime-travel.png",
    gender: "Men",
    event: "Daytime",
    tags: ["men", "daytime", "sun", "walking", "city", "heritage", "falls", "lakes"]
  },
  {
    id: "women-water-swim",
    title: "Women - Water",
    subtitle: "Swim & boat ready",
    image: "/images/clothing/real-women-water-swim.png",
    gender: "Women",
    event: "Water",
    tags: ["women", "water", "swim", "boat", "lake", "river", "falls", "pool", "cruise", "beach"]
  },
  {
    id: "men-water",
    title: "Men - Water",
    subtitle: "Quick dry",
    image: "/images/clothing/real-water-activity.png",
    gender: "Men",
    event: "Water",
    tags: ["men", "water", "swim", "boat", "lake", "river", "falls", "pool", "cruise", "beach"]
  },
  {
    id: "women-safari",
    title: "Women - Safari",
    subtitle: "Game park ready",
    image: "/images/clothing/real-women-safari.png",
    gender: "Women",
    event: "Safari",
    tags: ["women", "safari", "wildlife", "game", "park", "hiking", "walking", "neutral", "adventure"]
  },
  {
    id: "men-safari",
    title: "Men - Safari",
    subtitle: "Comfort & safety",
    image: "/images/clothing/real-adventure-safari.png",
    gender: "Men",
    event: "Safari",
    tags: ["men", "safari", "wildlife", "game", "park", "hiking", "walking", "neutral", "adventure"]
  },
  {
    id: "women-evening",
    title: "Women - Evening",
    subtitle: "Smart casual",
    image: "/images/clothing/real-women-evening.png",
    gender: "Women",
    event: "Evening",
    tags: ["women", "evening", "dinner", "smart", "casual", "culture", "city", "heritage"]
  },
  {
    id: "men-evening",
    title: "Men - Evening",
    subtitle: "Smart casual",
    image: "/images/clothing/real-evening-smart-casual.png",
    gender: "Men",
    event: "Evening",
    tags: ["men", "evening", "dinner", "smart", "casual", "culture", "city", "heritage"]
  },
  {
    id: "rainy-season",
    title: "Rainy Season",
    subtitle: "Stay dry",
    image: "/images/clothing/real-rainy-season.png",
    gender: "All",
    event: "Rain",
    tags: ["rain", "rainy", "mist", "wet", "waterproof", "falls", "mountain", "nyanga", "vumba"]
  },
  {
    id: "cool-morning",
    title: "Cool Morning",
    subtitle: "Warm layer",
    image: "/images/clothing/real-cool-morning.png",
    gender: "All",
    event: "Cold",
    tags: ["cold", "cool", "warm", "jacket", "mountain", "morning", "evening", "nyanga", "vumba", "chimanimani"]
  }
];

function scoreOutfit(outfit: OutfitCatalogItem, tags: Set<string>) {
  return outfit.tags.reduce((score, tag) => score + (tags.has(tag) ? 1 : 0), 0);
}

function uniqueOutfits(outfits: OutfitCatalogItem[]) {
  return outfits.filter((outfit, index, all) => all.findIndex((item) => item.id === outfit.id) === index);
}

export function selectOutfitsForTrip(tags: string[], limit = 8) {
  const tagSet = new Set(tags.map((tag) => tag.toLowerCase()));
  const scored = outfitCatalog
    .map((outfit) => ({ outfit, score: scoreOutfit(outfit, tagSet) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.outfit.title.localeCompare(b.outfit.title))
    .map((item) => item.outfit);

  const base = uniqueOutfits([
    ...scored,
    ...outfitCatalog.filter((outfit) => outfit.gender === "Women"),
    ...outfitCatalog
  ]);

  const selected: OutfitCatalogItem[] = [];

  for (const outfit of base) {
    if (selected.length >= limit) break;
    selected.push(outfit);
  }

  const womenCount = selected.filter((outfit) => outfit.gender === "Women").length;
  if (womenCount < 3) {
    for (const outfit of outfitCatalog.filter((item) => item.gender === "Women")) {
      if (selected.some((item) => item.id === outfit.id)) continue;
      selected.splice(Math.max(2, selected.length - 1), 0, outfit);
      if (selected.filter((item) => item.gender === "Women").length >= 3) break;
    }
  }

  return uniqueOutfits(selected).slice(0, limit);
}

export function selectOutfitsForTag(tag: string, fallbackTags: string[], limit = 8) {
  const normalizedTag = tag.toLowerCase();
  const selectedTagOutfits = outfitCatalog.filter((outfit) => {
    if (normalizedTag === "women") return outfit.gender === "Women";
    if (normalizedTag === "men") return outfit.gender === "Men";
    return outfit.tags.includes(normalizedTag);
  });

  const fallback = selectOutfitsForTrip([normalizedTag, ...fallbackTags], limit);
  return uniqueOutfits([...selectedTagOutfits, ...fallback]).slice(0, limit);
}
