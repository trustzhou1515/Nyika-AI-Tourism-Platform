const destinationProfiles = [
  { name: "Victoria Falls", tags: ["waterfall", "wildlife", "mist", "adventure", "family", "photography"] },
  { name: "Lake Kariba", tags: ["lake", "boat", "sunset", "fishing", "family", "relaxing"] },
  { name: "Great Zimbabwe", tags: ["heritage", "ruins", "culture", "history", "stone"] },
  { name: "Nyanga", tags: ["mountain", "waterfall", "hiking", "cool", "photography"] }
];

const synonyms = new Map([
  ["animals", "wildlife"],
  ["safari", "wildlife"],
  ["falls", "waterfall"],
  ["river", "waterfall"],
  ["quiet", "relaxing"],
  ["ancient", "heritage"],
  ["old", "heritage"],
  ["photos", "photography"],
  ["pictures", "photography"]
]);

export function normalizeQuery(query) {
  return String(query).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean).map((word) => synonyms.get(word) ?? word);
}

export function matchPlaces(query) {
  const words = normalizeQuery(query);
  return destinationProfiles
    .map((destination) => {
      const matched = destination.tags.filter((tag) => words.includes(tag));
      return {
        name: destination.name,
        matched,
        score: matched.length * 10 + (words.some((word) => destination.name.toLowerCase().includes(word)) ? 20 : 0)
      };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score);
}
