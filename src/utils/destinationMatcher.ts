import type { Destination } from "../types/tourism";
import { parseVisualSearch, type ParsedVisualSearch } from "./searchParser";
import type { SearchConcept } from "./searchSynonyms";

export type VisualBudgetFilter = "all" | "budget" | "mid-range" | "premium";
export type VisualDifficultyFilter = "all" | "easy" | "moderate" | "hard";

export interface VisualSearchFilters {
  province: string;
  budget: VisualBudgetFilter;
  activity: string;
  travellerType: string;
  difficulty: VisualDifficultyFilter;
  hiddenOnly: boolean;
}

export interface VisualSearchResult {
  destination: Destination;
  score: number;
  percentage: number;
  matchedTerms: string[];
  matchedCategories: string[];
  explanation: string;
  budgetLevel: Exclude<VisualBudgetFilter, "all">;
  difficulty: Exclude<VisualDifficultyFilter, "all">;
  hiddenGem: boolean;
  travellerTypes: string[];
}

const hiddenGemSlugs = new Set([
  "binga",
  "honde-valley",
  "mavuradonha-mountains",
  "lake-mutirikwi",
  "lake-chivero",
  "kuimba-shiri-bird-park",
  "domboshava-caves",
  "pungwe-falls",
  "bridalveil-falls"
]);

const premiumSlugs = new Set(["victoria-falls", "lake-kariba", "mana-pools-national-park"]);
const budgetSlugs = new Set(["mukuvisi-woodlands", "haka-game-park", "kuimba-shiri-bird-park", "lake-chivero", "chiremba-balancing-rocks"]);
const hardSlugs = new Set(["chimanimani", "pungwe-falls", "mavuradonha-mountains", "mana-pools-national-park"]);
const easySlugs = new Set(["victoria-falls", "great-zimbabwe", "chinhoyi-caves", "kuimba-shiri-bird-park", "mukuvisi-woodlands", "lake-chivero"]);

const conceptLabels: Record<SearchConcept, string> = {
  adventure: "Adventure",
  birding: "Birding",
  budget: "Budget",
  cave: "Caves",
  easy: "Easy access",
  family: "Family-friendly",
  hard: "Rugged",
  hidden: "Hidden gem",
  lake: "Lake",
  luxury: "Luxury nature",
  booking: "Booking support",
  clothing: "What to wear",
  conservation: "Conservation",
  food: "Food",
  mist: "Mist",
  mountain: "Mountains",
  peaceful: "Peaceful",
  photography: "Photography",
  premium: "Premium",
  romantic: "Romantic",
  ruins: "Heritage",
  safari: "Safari",
  sunset: "Sunset",
  transport: "Transport",
  waterfall: "Waterfall"
};

const conceptMatchers: Record<SearchConcept, RegExp> = {
  adventure: /adventure|zipline|skywalk|bungee|rafting|gorge|hiking|trail|dive|diving|remote|rugged/,
  birding: /bird|birding|birdlife|birdwatching|eagle|falcon|owl|vulture|hornbill|kingfisher|raptor|turaco|water birds|forest birds/,
  budget: /affordable|budget|city|day trip|short|accessible/,
  cave: /cave|caves|underground|blue pool|limestone|granite|rock shelter/,
  easy: /easy|accessible|family|short|city|day trip|picnic/,
  family: /family|families|children|kids|school|education|picnic|day trip/,
  hard: /remote|rugged|multi day|challenging|wilderness|gorge|mountain/,
  hidden: /hidden|quiet|less crowded|remote|valley|wilderness|gem/,
  lake: /lake|dam|boat|cruise|houseboat|fishing|shore|marina|waterfront/,
  luxury: /luxury|premium|lodge|exclusive|honeymoon|comfort/,
  mist: /mist|spray|fog|rainbow|rainforest|cloud/,
  mountain: /mountain|highland|hills|peak|valley|viewpoint|forest|worlds view/,
  peaceful: /peaceful|quiet|calm|relax|wellness|garden|rest|slow/,
  photography: /photo|photography|view|viewpoint|scenic|beautiful|rainbow|sunset/,
  premium: /premium|luxury|lodge|exclusive|helicopter|flight|houseboat/,
  romantic: /romantic|couple|honeymoon|sunset|quiet|lake|lodge/,
  ruins: /ruins|ancient|history|heritage|culture|monument|museum|stone|gallery|art/,
  safari: /safari|wildlife|elephant|rhino|lion|cheetah|cheatah|game drive|animals|zebra|giraffe|buffalo|leopard|hyena|wild dog|hippo|crocodile|antelope|kudu|impala|eland|sable|nyala|warthog|baboon|monkey/,
  sunset: /sunset|evening|dusk|golden|cruise/,
  waterfall: /waterfall|falls|cascade|rainforest|spray|rainbow/,
  booking: /booking|book|reservation|accommodation|stay|hotel|lodge|airport|transfer|taxi|guide/,
  clothing: /clothing|clothes|wear|outfit|raincoat|jacket|hat|sunscreen|boots|swimwear|safety/,
  conservation: /conservation|sanctuary|rhino tracking|anti poaching|wildlife protection|photo safari|photographic safari|ethical/,
  food: /food|dinner|lunch|restaurant|traditional|boma|meal|cuisine|drum show/,
  transport: /transport|taxi|transfer|airport|drive|road|pickup|shuttle|car hire|arrival/
};

type AnimalIntentRule = {
  label: string;
  aliases: string[];
  tags: string[];
  points: number;
};

const animalIntentRules: AnimalIntentRule[] = [
  { label: "Elephants", aliases: ["elephant", "elephants"], tags: ["elephant"], points: 34 },
  { label: "Lions", aliases: ["lion", "lions"], tags: ["lion"], points: 34 },
  { label: "Cheetahs", aliases: ["cheetah", "cheetahs", "cheatah", "cheatahs"], tags: ["cheetah", "cheatah"], points: 36 },
  { label: "Zebras", aliases: ["zebra", "zebras"], tags: ["zebra"], points: 32 },
  { label: "Rhinos", aliases: ["rhino", "rhinos", "rhinoceros"], tags: ["rhino", "black rhino", "white rhino"], points: 36 },
  { label: "Birdlife", aliases: ["bird", "birds", "birding", "birdwatching", "birdlife", "raptors", "eagle", "fish eagle", "hornbill", "kingfisher"], tags: ["birdlife", "water birds", "forest birds", "raptors", "eagle", "fish eagle", "black eagle", "kingfisher", "swynnertons robin", "turaco"], points: 34 },
  { label: "Hippos", aliases: ["hippo", "hippos"], tags: ["hippo"], points: 32 },
  { label: "Crocodiles", aliases: ["crocodile", "crocodiles"], tags: ["crocodile"], points: 32 },
  { label: "Wild dogs", aliases: ["wild dog", "wild dogs", "painted dog", "painted dogs"], tags: ["wild dog"], points: 34 },
  { label: "Leopards", aliases: ["leopard", "leopards"], tags: ["leopard"], points: 32 },
  { label: "Buffalo", aliases: ["buffalo", "buffalos", "buffaloes"], tags: ["buffalo"], points: 30 },
  { label: "Giraffes", aliases: ["giraffe", "giraffes"], tags: ["giraffe"], points: 30 },
  { label: "Antelope", aliases: ["antelope", "kudu", "impala", "eland", "sable", "nyala", "waterbuck", "bushbuck"], tags: ["antelope", "kudu", "impala", "eland", "sable antelope", "nyala", "waterbuck", "bushbuck"], points: 28 },
  { label: "Fishing", aliases: ["fish", "fishing", "tiger fish", "tiger fishing", "angling"], tags: ["fish", "tiger fish", "trout"], points: 34 }
];

function includesQueryAlias(parsed: ParsedVisualSearch, alias: string) {
  const normalizedAlias = alias.toLowerCase();
  return normalizedAlias.includes(" ") ? parsed.normalized.includes(normalizedAlias) : parsed.tokens.includes(normalizedAlias);
}

function addAnimalMatches(destination: Destination, parsed: ParsedVisualSearch, matches: Map<string, { label: string; categories: Set<string>; points: number }>) {
  const destinationTags = (destination.wildlifeTags ?? []).map((tag) => tag.toLowerCase());
  if (destinationTags.length === 0) return 0;

  let bonus = 0;
  for (const rule of animalIntentRules) {
    if (!rule.aliases.some((alias) => includesQueryAlias(parsed, alias))) continue;

    const hasTag = rule.tags.some((tag) => destinationTags.includes(tag));
    if (!hasTag) continue;

    addMatch(matches, rule.label, rule.label === "Fishing" ? "Activity" : "Wildlife", rule.points);
    bonus += rule.points;
  }

  return bonus;
}

function profileText(destination: Destination) {
  return [
    destination.slug,
    destination.name,
    destination.region,
    destination.category,
    destination.description,
    destination.mapNote,
    destination.nearestArrivalHub,
    ...destination.highlights,
    ...destination.bestFor,
    ...(destination.wildlifeTags ?? []),
    ...(destination.activities?.flatMap((activity) => [activity.title, activity.description, activity.note]) ?? [])
  ].join(" ").toLowerCase();
}

export function getVisualDestinationMeta(destination: Destination) {
  const text = profileText(destination);
  const budgetLevel: VisualSearchResult["budgetLevel"] = premiumSlugs.has(destination.slug)
    ? "premium"
    : budgetSlugs.has(destination.slug)
      ? "budget"
      : "mid-range";
  const difficulty: VisualSearchResult["difficulty"] = hardSlugs.has(destination.slug)
    ? "hard"
    : easySlugs.has(destination.slug)
      ? "easy"
      : "moderate";
  const hiddenGem = hiddenGemSlugs.has(destination.slug);
  const travellerTypes = [
    /family|children|kids|school|education/.test(text) ? "Family" : "",
    /honeymoon|couple|romantic|sunset/.test(text) ? "Couples" : "",
    /adventure|hiking|zipline|rafting|bungee|rugged/.test(text) ? "Adventure" : "",
    /photography|photo|view|scenic/.test(text) ? "Photography" : "",
    /culture|history|heritage|museum|ruins|art/.test(text) ? "Culture" : "",
    /wildlife|safari|bird|rhino|elephant/.test(text) ? "Wildlife" : ""
  ].filter(Boolean);

  return {
    budgetLevel,
    difficulty,
    hiddenGem,
    travellerTypes: Array.from(new Set(travellerTypes))
  };
}

function addMatch(matches: Map<string, { label: string; categories: Set<string>; points: number }>, label: string, category: string, points: number) {
  const key = label.toLowerCase();
  const existing = matches.get(key);

  if (existing) {
    existing.categories.add(category);
    existing.points = Math.max(existing.points, points);
    return;
  }

  matches.set(key, { label, categories: new Set([category]), points });
}

function currentMonthMatches(destination: Destination) {
  const month = new Date().getMonth() + 1;
  const text = profileText(destination);
  if (/winter|cool|dry|safari|wildlife|hwange|mana|gonarezhou/.test(text)) return [5, 6, 7, 8, 9, 10].includes(month);
  if (/waterfall|falls|rainforest|mist|green|highland|mountain/.test(text)) return [1, 2, 3, 4, 11, 12].includes(month);
  return true;
}

function buildExplanation(matchedTerms: string[], matchedCategories: string[]) {
  if (matchedTerms.length === 0) {
    return "Closest suggestion based on Zimbabwe destination features and traveller preferences.";
  }

  const readableTerms = matchedTerms.slice(0, 4).join(", ");
  const readableCategories = matchedCategories.slice(0, 3).join(", ").toLowerCase();
  return `Recommended because it matches ${readableTerms}${readableCategories ? ` through ${readableCategories}` : ""}.`;
}

function passesFilters(result: VisualSearchResult, filters?: VisualSearchFilters) {
  if (!filters) return true;
  if (filters.province !== "all" && result.destination.region !== filters.province) return false;
  if (filters.budget !== "all" && result.budgetLevel !== filters.budget) return false;
  if (filters.difficulty !== "all" && result.difficulty !== filters.difficulty) return false;
  if (filters.hiddenOnly && !result.hiddenGem) return false;
  if (filters.travellerType !== "all" && !result.travellerTypes.some((type) => type.toLowerCase() === filters.travellerType)) return false;
  if (filters.activity !== "all") {
    const text = profileText(result.destination);
    if (!text.includes(filters.activity)) return false;
  }
  return true;
}

export function searchDestinations(query: string, destinationList: Destination[], filters?: VisualSearchFilters) {
  const parsed = parseVisualSearch(query);
  const hasSpecificQuery = parsed.normalized.length > 0;
  const fallbackParsed = hasSpecificQuery ? parsed : parseVisualSearch("misty waterfall safari sunset ancient stone ruins lake nature");
  const results = destinationList
    .map((destination) => buildResult(destination, fallbackParsed, hasSpecificQuery))
    .sort((left, right) => right.score - left.score)
    .map((result, index) => ({
      ...result,
      percentage: Math.min(98, Math.max(55, Math.round(53 + Math.sqrt(result.score) * 5 - index * 4)))
    }));
  const filteredResults = results.filter((result) => passesFilters(result, filters));

  if (filteredResults.length > 0) return filteredResults.slice(0, hasSpecificQuery ? 8 : 6);
  return results.slice(0, 3);
}

function buildResult(destination: Destination, parsed: ParsedVisualSearch, hasSpecificQuery: boolean): VisualSearchResult {
  const text = profileText(destination);
  const meta = getVisualDestinationMeta(destination);
  const matches = new Map<string, { label: string; categories: Set<string>; points: number }>();
  let score = 0;

  if (hasSpecificQuery) {
    const destinationName = destination.name.toLowerCase();
    const nameMatch = destinationName.includes(parsed.normalized) || parsed.normalized.includes(destinationName);
    if (nameMatch) {
      addMatch(matches, destination.name, "Name", 50);
      score += 50;
    }
  }

  score += addAnimalMatches(destination, parsed, matches);

  for (const concept of parsed.concepts) {
    const label = conceptLabels[concept];
    const matcher = conceptMatchers[concept];
    if (!matcher.test(text)) continue;

    let points = 10;
    let category = "Tags";
    if (["waterfall", "lake", "mountain", "cave", "mist", "sunset"].includes(concept)) {
      points = 15;
      category = "Landscape";
    } else if (["safari", "adventure", "birding", "photography", "conservation"].includes(concept)) {
      points = 12;
      category = "Activity";
    } else if (["peaceful", "romantic"].includes(concept)) {
      points = 9;
      category = "Mood";
    } else if (["family"].includes(concept)) {
      points = 8;
      category = "Traveller";
    } else if (["booking", "transport", "clothing", "food"].includes(concept)) {
      points = 6;
      category = "Support";
    } else if (["budget", "premium", "luxury"].includes(concept)) {
      points = concept === meta.budgetLevel || (concept === "luxury" && meta.budgetLevel === "premium") ? 6 : 2;
      category = "Budget";
    } else if (["easy", "hard"].includes(concept)) {
      points = concept === meta.difficulty ? 5 : 1;
      category = "Difficulty";
    }

    if (concept === "hidden" && meta.hiddenGem) points += 8;
    addMatch(matches, label, category, points);
    score += points;
  }

  for (const token of parsed.tokens) {
    if (text.includes(token)) {
      addMatch(matches, token, "Keyword", 4);
      score += 4;
    }
  }

  const wantsFishing = /fishing|fish|angling|anglers/.test(parsed.normalized);
  if (wantsFishing) {
    const hasFishing = /fishing|fish|angling/.test(text);
    const hasLakeOrRiver = /lake|dam|river|zambezi|kariba|chivero|mutirikwi|binga|shore|marina|houseboat|waterfront/.test(text);
    const isWaterfallLed = /waterfall|falls|cascade|rainforest|spray/.test(text);

    if (hasFishing) {
      addMatch(matches, "Fishing", "Activity", 28);
      score += 34;
    }

    if (hasLakeOrRiver) {
      addMatch(matches, /lake|dam|kariba|chivero|mutirikwi|binga/.test(text) ? "Lake" : "River", "Landscape", 22);
      score += 24;
    }

    if (isWaterfallLed && !hasFishing) {
      score -= 32;
      matches.delete("waterfall");
    }
  }

  if (currentMonthMatches(destination)) {
    addMatch(matches, "Good season", "Season", 4);
    score += 4;
  }

  const sortedMatches = Array.from(matches.values()).sort((left, right) => right.points - left.points);
  const matchedTerms = sortedMatches.map((match) => match.label).slice(0, 7);
  const matchedCategories = Array.from(new Set(sortedMatches.flatMap((match) => Array.from(match.categories)))).slice(0, 5);

  return {
    destination,
    score,
    percentage: 55,
    matchedTerms,
    matchedCategories,
    explanation: buildExplanation(matchedTerms, matchedCategories),
    ...meta
  };
}
