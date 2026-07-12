export type SearchConcept =
  | "waterfall"
  | "safari"
  | "mountain"
  | "peaceful"
  | "romantic"
  | "family"
  | "ruins"
  | "lake"
  | "adventure"
  | "photography"
  | "cave"
  | "mist"
  | "sunset"
  | "luxury"
  | "hidden"
  | "budget"
  | "premium"
  | "easy"
  | "hard"
  | "birding"
  | "conservation"
  | "food"
  | "booking"
  | "transport"
  | "clothing";

export const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "at",
  "by",
  "for",
  "from",
  "i",
  "in",
  "is",
  "me",
  "my",
  "of",
  "on",
  "or",
  "place",
  "places",
  "show",
  "that",
  "the",
  "they",
  "there",
  "thing",
  "things",
  "to",
  "travel",
  "trip",
  "visit",
  "want",
  "we",
  "with",
  "would",
  "zimbabwe"
]);

export const searchSynonyms: Record<SearchConcept, string[]> = {
  waterfall: ["waterfall", "waterfalls", "falls", "fall", "cascade", "cascades", "spray", "river falls", "big water", "thundering water"],
  safari: ["safari", "wildlife", "animal", "animals", "game", "game drive", "elephant", "elephants", "lion", "lions", "rhino", "rhinos", "zebra", "giraffe", "buffalo", "leopard", "wild dog", "bush", "big five", "game park", "national park", "nature reserve"],
  mountain: ["mountain", "mountains", "highland", "highlands", "hill", "hills", "peak", "peaks", "valley", "viewpoint", "cool weather", "fresh air", "misty mountain", "green hills", "forest walk"],
  peaceful: ["peaceful", "quiet", "calm", "relax", "relaxing", "serene", "slow", "rest", "wellness", "private", "not crowded", "less people", "escape", "retreat", "refresh"],
  romantic: ["romantic", "couple", "couples", "honeymoon", "love", "anniversary"],
  family: ["family", "families", "children", "kids", "parents", "school", "schools", "students", "group", "class trip", "siblings", "friends", "team"],
  ruins: ["ruins", "ruin", "ancient", "history", "historic", "heritage", "culture", "monument", "museum", "stone", "old kingdom", "traditional", "art", "gallery", "sculpture", "rock art", "cultural show"],
  lake: ["lake", "lakes", "dam", "waterfront", "shore", "boat", "boats", "cruise", "houseboat", "fishing", "canoe", "canoeing", "kayak", "water sport", "swimming", "beach", "island", "marina"],
  adventure: ["adventure", "thrilling", "exciting", "zipline", "skywalk", "bungee", "rafting", "hike", "hiking", "gorge", "dive", "diving", "walk", "walking", "trail", "climb", "climbing", "swim", "swimming", "adrenaline", "extreme"],
  photography: ["photo", "photos", "photography", "camera", "instagram", "view", "views", "scenic", "beautiful", "pictures", "video", "content", "memories", "selfie", "landscape"],
  cave: ["cave", "caves", "underground", "cavern", "pool", "blue pool", "limestone", "rock", "rocks", "balancing rocks", "granite", "shelter", "dark cave"],
  mist: ["mist", "spray", "fog", "rainbow", "rainbows", "cloud", "clouds", "wet", "rainforest"],
  sunset: ["sunset", "sunsets", "golden hour", "evening", "evening view", "dusk", "sundowner", "orange sky"],
  luxury: ["luxury", "premium", "lodge", "lodges", "exclusive", "comfort", "resort", "hotel", "villa", "spa"],
  hidden: ["hidden", "secret", "less crowded", "quiet", "undiscovered", "gem", "gems", "unknown", "not popular", "remote", "local"],
  budget: ["budget", "cheap", "affordable", "low cost", "saving", "save money", "small budget", "low budget", "economy"],
  premium: ["premium", "luxury", "high end", "exclusive", "comfortable"],
  easy: ["easy", "accessible", "short", "family friendly", "children", "kids", "near town", "near harare", "simple", "safe walk"],
  hard: ["hard", "difficult", "rugged", "remote", "challenging", "multi day", "wilderness", "trek", "expedition"],
  birding: ["bird", "birds", "birding", "birdwatching", "birdlife", "swynnertons robin", "eagle"],
  conservation: ["conservation", "protect animals", "animal rescue", "sanctuary", "rhino tracking", "anti poaching", "wildlife protection", "ethical safari", "photo safari", "photographic safari"],
  food: ["food", "dinner", "lunch", "breakfast", "restaurant", "eat", "eating", "traditional food", "boma", "drum show", "local meal"],
  booking: ["booking", "book", "reservation", "reserve", "pay", "payment", "accommodation", "sleep", "stay", "hotel", "lodge", "room"],
  transport: ["transport", "taxi", "transfer", "airport", "bus", "drive", "road", "pickup", "pick up", "shuttle", "car hire"],
  clothing: ["clothes", "clothing", "wear", "outfit", "dress", "shoes", "jacket", "raincoat", "hat", "sunscreen", "swimwear", "boots"]
};
