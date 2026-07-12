import { destinations } from "../data/destinations";
import { estimateGroupTripBudget } from "./budgetGuidance";
import type { PlannerRequest, TravelStyle } from "../types/tourism";

const placeAliases: Record<string, string[]> = {
  "Victoria Falls": [
    "victoria falls",
    "vic falls",
    "vicfalls",
    "the falls",
    "zambezi falls",
    "zambezi",
    "mosi oa tunya",
    "mosi-oa-tunya"
  ],
  "Mtarazi Falls": [
    "mtarazi falls",
    "mutarazi falls",
    "mtarazi",
    "mutarazi",
    "far and wide",
    "skywalk"
  ],
  "Bridalveil Falls": [
    "bridalveil falls",
    "bridal veil falls",
    "bridalveil",
    "bridal veil",
    "tessa's pool",
    "tessas pool"
  ],
  "Inyangombe Falls": [
    "inyangombe falls",
    "inyangombe",
    "nyangombe falls",
    "brighton beach"
  ],
  "Pungwe Falls": [
    "pungwe falls",
    "pungwe",
    "pungwe gorge",
    "pungwe drift"
  ],
  "Hwange National Park": [
    "hwange",
    "hwange national park",
    "hwange park",
    "main camp",
    "nyamandhlovu",
    "sinamatella"
  ],
  "Mana Pools National Park": [
    "mana pools",
    "mana pools national park",
    "mana",
    "zambezi valley safari"
  ],
  "Chiremba Balancing Rocks": [
    "chiremba balancing rocks",
    "balancing rocks",
    "balancing rock",
    "balancing rock tourist places",
    "chiremba rocks",
    "epworth balancing rocks",
    "epworth rocks",
    "domboremari",
    "domboremari money rock",
    "money rock",
    "flying boat rock",
    "egg rock"
  ],
  "Chinhoyi Caves": [
    "caves in zimbabwe",
    "rocks and caves",
    "zimbabwe caves",
    "chinhoyi caves",
    "chinhoyi cave",
    "chinhoyi caves recreational park",
    "sleeping pool",
    "chirorodziva",
    "blue pool",
    "wonder hole",
    "dark cave",
    "cobalt blue pool",
    "technical diving chinhoyi",
    "scuba diving chinhoyi"
  ],
  "Domboshava Caves": [
    "domboshava",
    "domboshava caves",
    "domboshava cave",
    "domboshava rock shelters",
    "domboshava rock art",
    "domboshava hill",
    "granite dome",
    "rainmaking caves",
    "rock shelters near harare"
  ],
  "Matobo National Park": [
    "matobo",
    "matobo national park",
    "matobo hills",
    "matopos",
    "matobo balancing rocks",
    "mother and child rocks",
    "mother and child balancing rocks",
    "san rock art",
    "worlds view matobo",
    "world's view matobo",
    "rhino tracking"
  ],
  "Gonarezhou National Park": [
    "gonarezhou",
    "gonarezhou national park",
    "chilojo cliffs",
    "place of elephants"
  ],
  "Mbizi Game Park": [
    "mbizi",
    "mbizi game park",
    "mbizi park"
  ],
  "Haka Game Park": [
    "haka",
    "haka game park",
    "haka park"
  ],
  "Mukuvisi Woodlands": [
    "mukuvisi",
    "mukuvisi woodlands",
    "mukuvisi woodland",
    "woodlands harare"
  ],
  "Great Zimbabwe": [
    "great zimbabwe",
    "masvingo ruins",
    "zimbabwe ruins",
    "great enclosure",
    "hill complex",
    "masvingo"
  ],
  "Khami Ruins": [
    "khami",
    "khami ruins",
    "khami national monument",
    "torwa dynasty"
  ],
  "National Gallery of Zimbabwe": [
    "national gallery",
    "national gallery of zimbabwe",
    "zimbabwe national gallery",
    "shona sculpture",
    "harare gallery"
  ],
  "National Heroes Acre": [
    "national heroes acre",
    "heroes acre",
    "warren hills",
    "liberation heroes"
  ],
  "The Boma Dinner & Drum Show": [
    "the boma",
    "boma dinner",
    "boma dinner and drum show",
    "boma drum show",
    "dinner and drum show"
  ],
  "Chitungwiza Arts Centre": [
    "chitungwiza arts centre",
    "chitungwiza art centre",
    "chitungwiza artists",
    "stone carvers",
    "stone carving"
  ],
  "Eastern Highlands": [
    "eastern highlands",
    "mutare",
    "tea estates"
  ],
  "Chimanimani": [
    "chimanimani",
    "chimanimani national park",
    "chimanimani mountains",
    "chimanimani village",
    "quartzite peaks",
    "bridal veil falls",
    "bridalveil falls",
    "outward bound"
  ],
  "Vumba": [
    "vumba",
    "bvumba",
    "vumba mountains",
    "bvumba mountains",
    "mountains of mist",
    "vumba gardens",
    "bvumba botanical gardens",
    "vumba botanical gardens",
    "bunga forest",
    "leopard rock",
    "swynnerton"
  ],
  "Honde Valley": [
    "honde valley",
    "honde",
    "mutasa",
    "tea estates",
    "tea estate"
  ],
  "Binga": [
    "binga",
    "binga village",
    "binga town",
    "tonga culture"
  ],
  "Nyanga": [
    "nyanga",
    "mountain places",
    "mountain destinations",
    "mountains in zimbabwe",
    "zimbabwe mountains",
    "eastern highlands",
    "worlds view",
    "world's view",
    "troutbeck",
    "juliasdale",
    "mount nyangani",
    "nyanga mountains",
    "nyanga mountain",
    "nyangani",
    "mutarazi",
    "mtarazi",
    "nyangwe fort",
    "rhodes dam",
    "mare dam",
    "udu"
  ],
  "Mavuradonha Mountains": [
    "mavuradonha",
    "mavuradonha mountains",
    "mavuradonha wilderness",
    "mavhuradonha",
    "mavuradona",
    "mavuradonha range",
    "centenary mountains",
    "muzarabani mountains"
  ],
  "Lake Mutirikwi": [
    "lake mutirikwi",
    "mutirikwi",
    "mutirikwi lake",
    "lake mutirikwe",
    "mutirikwe",
    "lake near masvingo",
    "masvingo lake",
    "lake by great zimbabwe"
  ],
  "Lake Chivero": [
    "lake chivero",
    "chivero",
    "chivero lake",
    "lake near harare",
    "harare lake",
    "lake chivero recreational park",
    "chivero recreational park"
  ],
  "Lake Kariba": [
    "lakes in zimbabwe",
    "zimbabwe lakes",
    "lakes",
    "lake trip",
    "lake places",
    "lake kariba",
    "kariba",
    "kariba dam",
    "kariba heights",
    "matusadona",
    "marina"
  ]
};

type ActivityIntent = {
  label: string;
  aliases: string[];
  destination: string;
  interests: string[];
  note?: string;
};

const activityIntents: ActivityIntent[] = [
  {
    label: "licensed wildlife hunting enquiry",
    aliases: [
      "hunting",
      "hunt",
      "game hunting",
      "trophy hunting",
      "safari hunting",
      "professional hunter",
      "professional hunting",
      "hunting safari"
    ],
    destination: "Hwange National Park",
    interests: ["wildlife", "safari", "licensed operator", "conservation rules"],
    note: "Hunting is highly regulated. The app should guide users toward licensed operators, permits and safe wildlife-viewing alternatives; national parks are for viewing, not hunting."
  },
  {
    label: "game drive",
    aliases: ["game drive", "game drives", "safari drive", "wildlife drive", "see animals", "see elephants", "elephants", "lion viewing", "big five", "animal viewing"],
    destination: "Hwange National Park",
    interests: ["wildlife", "safari", "game drives", "photography"]
  },
  {
    label: "walking safari",
    aliases: ["walking safari", "walk safari", "guided walk", "zambezi walk", "wild dogs", "canoe safari"],
    destination: "Mana Pools National Park",
    interests: ["wildlife", "walking safari", "zambezi", "canoeing"]
  },
  {
    label: "fishing",
    aliases: ["fishing", "fish", "tiger fishing", "angling", "kapenta", "lake fishing"],
    destination: "Lake Kariba",
    interests: ["lake", "fishing", "boat", "sunset"]
  },
  {
    label: "boat cruise",
    aliases: ["boat cruise", "sunset cruise", "river cruise", "zambezi cruise", "houseboat", "boat", "boating", "lake cruise"],
    destination: "Lake Kariba",
    interests: ["lake", "boat cruise", "sunset", "relaxation"]
  },
  {
    label: "swimming and water",
    aliases: ["swimming", "swim", "water activity", "water activities", "pool", "beach", "waterfall pool", "devils pool", "devil pool"],
    destination: "Victoria Falls",
    interests: ["water", "swimming", "waterfall", "safety"]
  },
  {
    label: "waterfalls",
    aliases: ["waterfalls", "waterfall", "falls", "rainforest walk", "spray", "rainbow falls", "view falls"],
    destination: "Victoria Falls",
    interests: ["waterfalls", "rainforest", "photography"]
  },
  {
    label: "zipline and skywalk",
    aliases: ["zipline", "zip line", "skywalk", "sky walk", "gorge swing", "bungee", "bungee jump", "adrenaline", "extreme activity"],
    destination: "Victoria Falls",
    interests: ["adventure", "gorge", "licensed operator"]
  },
  {
    label: "mountain hiking",
    aliases: ["hiking", "hike", "mountain hike", "mountain climbing", "climb mountain", "trekking", "walk mountains", "cool air"],
    destination: "Nyanga",
    interests: ["mountains", "hiking", "viewpoints", "nature"]
  },
  {
    label: "rocks and caves",
    aliases: ["caves", "cave", "rocks", "rock art", "rock shelters", "balancing rocks", "granite rocks", "blue pool", "scuba diving"],
    destination: "Chinhoyi Caves",
    interests: ["caves", "rocks", "photography", "heritage"]
  },
  {
    label: "rhino tracking",
    aliases: ["rhino tracking", "rhinos", "rhino", "track rhino", "leopards", "matobo rocks"],
    destination: "Matobo National Park",
    interests: ["wildlife", "rhino tracking", "rocks", "heritage"]
  },
  {
    label: "culture and ruins",
    aliases: ["culture", "heritage", "history", "ruins", "ancient city", "museum", "stone walls", "great enclosure"],
    destination: "Great Zimbabwe",
    interests: ["culture", "heritage", "history", "guided storytelling"]
  },
  {
    label: "birding",
    aliases: ["birding", "birds", "bird watching", "birdwatching", "rare birds", "forest birds"],
    destination: "Vumba",
    interests: ["birding", "forest", "nature", "quiet travel"]
  }
];

const numberWords: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
  hundred: 100,
  thousand: 1000
};

const numberWordPattern = Object.keys(numberWords).join("|");
const flexibleNumberPattern = `(?:\\d+(?:\\.\\d+)?|${numberWordPattern})(?:\\s+(?:${numberWordPattern}))*`;
const budgetValuePattern = `(?:\\d+(?:[ ,]?\\d{3})*(?:\\.\\d+)?\\s*(?:k|thousand)?|${flexibleNumberPattern})`;

function normalizePrompt(prompt: string) {
  return prompt
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[-_/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseNumberWord(value: string) {
  const tokens = normalizePrompt(value).split(" ");
  let total = 0;
  let current = 0;

  for (const token of tokens) {
    const amount = numberWords[token];
    if (!amount) continue;

    if (amount === 100 || amount === 1000) {
      current = Math.max(current, 1) * 100;
      if (amount === 1000) {
        total += Math.max(current, 1) * 10;
        current = 0;
      }
      continue;
    }

    current += amount;
  }

  total += current;
  return total > 0 ? total : null;
}

function parseFlexibleNumber(value: string) {
  const raw = value.trim().toLowerCase();
  const cleaned = /^[\d,.\s]+(?:k|thousand)?$/i.test(raw) ? raw.replace(/[,\s]/g, "") : raw.replace(/,/g, "");
  const numeric = cleaned.match(/(\d+(?:\.\d+)?)\s*(k|thousand)?/i);

  if (numeric) {
    const base = Number(numeric[1]);
    return numeric[2] ? base * 1000 : base;
  }

  return parseNumberWord(cleaned);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function levenshteinDistance(left: string, right: string) {
  const distances = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let previous = distances[0];
    distances[0] = leftIndex;

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const current = distances[rightIndex];
      const replacementCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;

      distances[rightIndex] = Math.min(
        distances[rightIndex] + 1,
        distances[rightIndex - 1] + 1,
        previous + replacementCost
      );
      previous = current;
    }
  }

  return distances[right.length];
}

function getPromptPhrases(prompt: string, maxWords: number) {
  const words = normalizePrompt(prompt)
    .split(" ")
    .filter((word) => word.length > 2);
  const phrases: string[] = [];

  for (let size = 1; size <= maxWords; size += 1) {
    for (let index = 0; index <= words.length - size; index += 1) {
      phrases.push(words.slice(index, index + size).join(" "));
    }
  }

  return phrases;
}

type DestinationMatch = {
  name: string;
  confidence: "high" | "medium" | "fallback";
  matchedText?: string;
  correction?: string;
};

type ActivityMatch = {
  label: string;
  destination: string;
  confidence: "high" | "medium";
  matchedText?: string;
  correction?: string;
  interests: string[];
  note?: string;
};

function findClosestDestination(prompt: string, candidates: { name: string; aliases: string[] }[]): DestinationMatch | null {
  let bestMatch: { name: string; distance: number; aliasLength: number; phrase: string } | null = null;
  const longestAlias = Math.max(
    ...candidates.flatMap((candidate) => candidate.aliases.map((alias) => normalizePrompt(alias).split(" ").length))
  );
  const phrases = getPromptPhrases(prompt, longestAlias);

  for (const candidate of candidates) {
    for (const alias of candidate.aliases) {
      const normalizedAlias = normalizePrompt(alias);
      if (normalizedAlias.length < 4) continue;

      for (const phrase of phrases) {
        if (Math.abs(phrase.length - normalizedAlias.length) > 4) continue;

        const distance = levenshteinDistance(phrase, normalizedAlias);
        const allowedDistance = Math.max(1, Math.floor(normalizedAlias.length * 0.24));

        if (
          distance <= allowedDistance &&
          (!bestMatch || distance < bestMatch.distance || (distance === bestMatch.distance && normalizedAlias.length > bestMatch.aliasLength))
        ) {
          bestMatch = { name: candidate.name, distance, aliasLength: normalizedAlias.length, phrase };
        }
      }
    }
  }

  return bestMatch
    ? {
        name: bestMatch.name,
        confidence: "medium",
        matchedText: bestMatch.phrase,
        correction: bestMatch.name
      }
    : null;
}

function findClosestActivity(prompt: string): ActivityMatch | null {
  let bestMatch: { intent: ActivityIntent; distance: number; aliasLength: number; phrase: string; alias: string } | null = null;
  const longestAlias = Math.max(...activityIntents.flatMap((intent) => intent.aliases.map((alias) => normalizePrompt(alias).split(" ").length)));
  const phrases = getPromptPhrases(prompt, longestAlias);

  for (const intent of activityIntents) {
    for (const alias of intent.aliases) {
      const normalizedAlias = normalizePrompt(alias);
      if (normalizedAlias.length < 4) continue;

      for (const phrase of phrases) {
        if (Math.abs(phrase.length - normalizedAlias.length) > 4) continue;

        const distance = levenshteinDistance(phrase, normalizedAlias);
        const allowedDistance = Math.max(1, Math.floor(normalizedAlias.length * 0.22));

        if (
          distance <= allowedDistance &&
          (!bestMatch || distance < bestMatch.distance || (distance === bestMatch.distance && normalizedAlias.length > bestMatch.aliasLength))
        ) {
          bestMatch = { intent, distance, aliasLength: normalizedAlias.length, phrase, alias: normalizedAlias };
        }
      }
    }
  }

  return bestMatch
    ? {
        label: bestMatch.intent.label,
        destination: bestMatch.intent.destination,
        confidence: "medium",
        matchedText: bestMatch.phrase,
        correction: bestMatch.intent.label,
        interests: bestMatch.intent.interests,
        note: bestMatch.intent.note
      }
    : null;
}

function parseDestinationInsight(prompt: string): DestinationMatch {
  const normalized = normalizePrompt(prompt);
  const candidates = destinations.map((destination) => ({
    name: destination.name,
    aliases: placeAliases[destination.name] ?? [destination.name.toLowerCase()]
  }));

  for (const candidate of candidates) {
    const alias = candidate.aliases.find((item) => normalized.includes(normalizePrompt(item)));

    if (alias) {
      return {
        name: candidate.name,
        confidence: "high",
        matchedText: alias
      };
    }
  }

  return findClosestDestination(prompt, candidates) ?? {
    name: "Victoria Falls",
    confidence: "fallback"
  };
}

function parseActivityInsight(prompt: string): ActivityMatch | null {
  const normalized = normalizePrompt(prompt);

  for (const intent of activityIntents) {
    const alias = intent.aliases.find((item) => normalized.includes(normalizePrompt(item)));

    if (alias) {
      return {
        label: intent.label,
        destination: intent.destination,
        confidence: "high",
        matchedText: alias,
        interests: intent.interests,
        note: intent.note
      };
    }
  }

  return findClosestActivity(prompt);
}

export function parseDestinationFromPrompt(prompt: string) {
  return parseDestinationInsight(prompt).name;
}

export function parsePlannerPromptWithInsight(prompt: string) {
  const normalized = normalizePrompt(prompt);
  const destinationMatch = parseDestinationInsight(prompt);
  const activityMatch = parseActivityInsight(prompt);
  const destination = destinationMatch.confidence === "fallback" && activityMatch ? activityMatch.destination : destinationMatch.name;
  const style: TravelStyle = /premium|luxury|executive|high end|hotel|resort/.test(normalized)
    ? "premium"
    : /budget|cheap|affordable|low cost|local|student|school|learners|pupils/.test(normalized)
      ? "budget"
      : "standard";

  const daysMatch = normalized.match(new RegExp(`(${flexibleNumberPattern})\\s*(?:days?|nights?)`, "i"));
  const daysFromPrompt = daysMatch ? parseFlexibleNumber(daysMatch[1]) : null;
  const days = normalized.includes("weekend")
    ? 2
    : /\b(one|1)\s*week\b/.test(normalized) || /\ba\s*week\b/.test(normalized)
      ? 7
      : /\btwo\s*weeks?\b|\b2\s*weeks?\b/.test(normalized)
        ? 14
      : clamp(daysFromPrompt ?? 3, 1, 14);

  const travelersMatch =
    normalized.match(new RegExp(`(?:group of|for|with)\\s*(${flexibleNumberPattern})\\s*(?:people|travelers|travellers|students|learners|pupils|guests|tourists|staff|children|kids)`, "i")) ??
    normalized.match(new RegExp(`(${flexibleNumberPattern})\\s*(?:people|travelers|travellers|students|learners|pupils|guests|tourists|staff|children|kids|group)`, "i"));
  const travelers = clamp(travelersMatch ? parseFlexibleNumber(travelersMatch[1]) ?? 1 : 1, 1, 200);

  const budgetMatch =
    normalized.match(new RegExp(`(?:us\\$|\\$|usd)\\s*(${budgetValuePattern})`, "i")) ??
    normalized.match(new RegExp(`(${budgetValuePattern})\\s*(?:usd|dollars|budget)`, "i")) ??
    normalized.match(new RegExp(`(?:budget of|budget is|with|around|about)\\s*(${budgetValuePattern})`, "i")) ??
    normalized.match(new RegExp(`(${flexibleNumberPattern})\\s*(?:usd|dollars|budget)`, "i"));
  const budgetAmount = budgetMatch ? parseFlexibleNumber(budgetMatch[1]) : null;
  const estimatedBudget = estimateGroupTripBudget(destination, days, style, travelers).total;
  const finalBudget = budgetAmount ?? estimatedBudget;
  const friendlyDestination =
    destinationMatch.confidence === "medium"
      ? `${destination} - I corrected a close spelling from "${destinationMatch.matchedText}"`
      : destination;
  const activityIntro = activityMatch
    ? ` I also detected ${activityMatch.label} from "${activityMatch.matchedText}" and matched it to the plan.`
    : "";
  const assistantIntro = `I have started a ${days}-day ${style} plan for ${friendlyDestination}. I set it for ${travelers} traveler${travelers === 1 ? "" : "s"} with a working budget of $${finalBudget}.${activityIntro}`;
  const nextQuestion =
    !budgetMatch
      ? "If you already have a budget in mind, add it and I will adjust the plan kindly."
      : "You can still change the budget, days or travelers before generating the final plan.";
  const suggestions = [
    destinationMatch.confidence === "fallback"
      ? activityMatch
        ? `I could not see a clear place name, so I used ${activityMatch.destination} because it best matches ${activityMatch.label}.`
        : "I could not see a clear place name, so I started with Victoria Falls. You can change it before generating."
      : null,
    destinationMatch.confidence === "medium"
      ? `I matched "${destinationMatch.matchedText}" to ${destinationMatch.correction}.`
      : null,
    activityMatch?.confidence === "high"
      ? `I understood the activity "${activityMatch.matchedText}" as ${activityMatch.label}.`
      : null,
    activityMatch?.confidence === "medium"
      ? `I matched the activity "${activityMatch.matchedText}" to ${activityMatch.correction}.`
      : null,
    activityMatch?.note ?? null,
    !daysMatch && !normalized.includes("weekend") && !/\bweeks?\b/.test(normalized)
      ? "I did not see the trip length, so I used 3 days to get you started."
      : null,
    !travelersMatch
      ? "I did not see how many people are traveling, so I planned for 1 traveler."
      : null,
    !budgetMatch
      ? `I did not see a budget, so I estimated a working amount of $${estimatedBudget}.`
      : null
  ].filter(Boolean) as string[];

  const request: PlannerRequest = {
    destination,
    days,
    budget: `$${finalBudget}`,
    travelers,
    style,
    interests: [
      prompt.trim() || "wildlife, culture, photography, local food",
      ...(activityMatch?.interests ?? []),
      activityMatch?.label ?? null,
      activityMatch?.note ?? null
    ].filter(Boolean).join(", ")
  };

  return {
    request,
    insight: {
      destinationConfidence: destinationMatch.confidence,
      matchedDestinationText: destinationMatch.matchedText,
      assistantIntro,
      nextQuestion,
      suggestions
    }
  };
}

export function parsePlannerPrompt(prompt: string): PlannerRequest {
  return parsePlannerPromptWithInsight(prompt).request;
}
