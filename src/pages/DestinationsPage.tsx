import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Droplets, Heart, Landmark, MapPin, MessageCircle, Mountain, PawPrint, Plus, Send, ShieldCheck, SlidersHorizontal, Sparkles, Waves, X } from "lucide-react";
import { destinations } from "../data/destinations";
import type { Destination } from "../types/tourism";
import { searchDestinations, type VisualSearchFilters } from "../utils/destinationMatcher";
import { analyzeNyikaQuery } from "../utils/nyikaIntelligence";

interface ExploreCategory {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  icon: typeof MapPin;
  prompt: string;
  placeSlugs?: string[];
}

const exploreCategories: ExploreCategory[] = [
  {
    id: "all",
    label: "All Destinations",
    shortLabel: "All",
    icon: MapPin,
    description: "Browse every Zimbabwe place currently in the guide, from major icons to smaller hidden gems.",
    prompt: "Plan a Zimbabwe trip for 5 days, 2 people"
  },
  {
    id: "wildlife",
    label: "Wildlife",
    shortLabel: "Wildlife",
    icon: PawPrint,
    description: "Safari parks, sanctuaries and nature spaces for elephants, rhino, birding, game drives and family wildlife days.",
    placeSlugs: [
      "matobo-national-park",
      "hwange-national-park",
      "gonarezhou-national-park",
      "mana-pools-national-park",
      "mbizi-game-park",
      "haka-game-park",
      "mukuvisi-woodlands",
      "kuimba-shiri-bird-park"
    ],
    prompt: "I want wildlife places in Zimbabwe for 3 days, 2 people"
  },
  {
    id: "waterfalls",
    label: "Waterfalls",
    shortLabel: "Waterfalls",
    icon: Droplets,
    description: "Victoria Falls and Eastern Highlands cascades with rainforest walks, skywalks, viewpoints and photography stops.",
    placeSlugs: [
      "victoria-falls",
      "mtarazi-falls",
      "bridalveil-falls",
      "inyangombe-falls",
      "pungwe-falls"
    ],
    prompt: "I want waterfalls in Zimbabwe for 3 days, 2 people"
  },
  {
    id: "culture",
    label: "Culture",
    shortLabel: "Culture",
    icon: Landmark,
    description: "Ancient ruins, rock art, galleries, monuments, dinner shows and living arts communities.",
    placeSlugs: [
      "great-zimbabwe",
      "matobo-national-park",
      "chiremba-balancing-rocks",
      "khami-ruins",
      "national-gallery-of-zimbabwe",
      "national-heroes-acre",
      "the-boma-dinner-drum-show",
      "chitungwiza-arts-centre"
    ],
    prompt: "I want cultural places in Zimbabwe for 3 days, 2 people"
  },
  {
    id: "rocks",
    label: "Rocks & Caves",
    shortLabel: "Rocks & Caves",
    icon: Mountain,
    description: "Blue cave pools, balancing rocks, granite shelters, San rock art and dramatic stone landscapes.",
    placeSlugs: [
      "chinhoyi-caves",
      "domboshava-caves",
      "chiremba-balancing-rocks",
      "matobo-national-park"
    ],
    prompt: "I want rocks and caves in Zimbabwe for 3 days, 2 people"
  },
  {
    id: "mountains",
    label: "Mountains",
    shortLabel: "Mountains",
    icon: Mountain,
    description: "Eastern Highlands, misty viewpoints, rugged peaks, protected mountain wilderness and cool-air retreats.",
    placeSlugs: [
      "nyanga",
      "vumba",
      "chimanimani",
      "honde-valley",
      "mavuradonha-mountains"
    ],
    prompt: "I want mountain places in Zimbabwe for 3 days, 2 people"
  },
  {
    id: "lakes",
    label: "Lakes",
    shortLabel: "Lakes",
    icon: Waves,
    description: "Kariba, Binga, Mutirikwi and Chivero for boats, fishing, sunsets, family breaks and lakefront stays.",
    placeSlugs: [
      "lake-kariba",
      "binga",
      "lake-mutirikwi",
      "lake-chivero"
    ],
    prompt: "I want lakes in Zimbabwe for 3 days, 2 people"
  }
];

const defaultVisualIdeas = [
  "I love wildlife and waterfalls in one trip",
  "I want a quiet mountain place with cool air",
  "I want safari sunsets with elephants",
  "I like ancient ruins, stone walls and culture",
  "I want a lake sunset with boats and calm views",
  "I am imagining hidden caves and rocks"
];

const visualIdeaIcons: Record<string, typeof Sparkles> = {
  "I love wildlife and waterfalls in one trip": Droplets,
  "I want a quiet mountain place with cool air": Mountain,
  "I want safari sunsets with elephants": PawPrint,
  "I like ancient ruins, stone walls and culture": Landmark,
  "I want a lake sunset with boats and calm views": Waves,
  "I am imagining hidden caves and rocks": Landmark
};

const visualStorageKeys = {
  recent: "exploreZimbabwe.visualSearch.recent",
  favourites: "exploreZimbabwe.visualSearch.favourites",
  savedTrips: "exploreZimbabwe.visualSearch.savedTrips"
};

const defaultVisualFilters: VisualSearchFilters = {
  province: "all",
  budget: "all",
  activity: "all",
  travellerType: "all",
  difficulty: "all",
  hiddenOnly: false
};

function readStoredList(key: string) {
  try {
    const value = window.localStorage.getItem(key);
    if (!value) return [];
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function writeStoredList(key: string, items: string[]) {
  window.localStorage.setItem(key, JSON.stringify(items));
}

function getCategoryDestinations(activeCategory: string) {
  if (activeCategory === "all") {
    return destinations;
  }

  const category = exploreCategories.find((item) => item.id === activeCategory);
  return (category?.placeSlugs ?? [])
    .map((slug) => destinations.find((destination) => destination.slug === slug))
    .filter(Boolean) as Destination[];
}

function getVisualWords(destination: Destination) {
  const text = [
    destination.name,
    destination.region,
    destination.category,
    destination.description,
    ...destination.highlights,
    ...destination.bestFor,
    ...(destination.activities?.flatMap((activity) => [activity.title, activity.description, activity.note]) ?? [])
  ].join(" ").toLowerCase();

  const visualWords = new Set<string>();
  const rules: Array<[RegExp, string[]]> = [
    [/falls|waterfall|rainforest|zambezi|river|spray|rainbow/, ["water", "waterfall", "rainbow", "river", "mist", "photography"]],
    [/lake|boat|cruise|houseboat|fishing|dam|sunset|marina/, ["lake", "boat", "sunset", "fishing", "relaxing", "water"]],
    [/wildlife|safari|elephant|rhino|lion|game|bird|animals|park/, ["wildlife", "safari", "animals", "elephants", "game drive", "nature"]],
    [/mountain|highlands|mist|viewpoint|hike|valley|forest|cool air/, ["mountains", "mist", "hiking", "forest", "viewpoint", "nature"]],
    [/heritage|culture|ruins|museum|history|monument|stone|architecture|gallery/, ["heritage", "ruins", "culture", "history", "stone", "architecture"]],
    [/rock|cave|granite|balancing|shelter|blue pool|limestone|dome/, ["rocks", "caves", "granite", "blue pool", "photography", "heritage"]],
    [/adventure|zipline|skywalk|bungee|gorge|rafting|diving/, ["adventure", "movement", "thrill", "operator", "water"]],
    [/family|kids|picnic|quiet|relax|wellness|garden/, ["family", "calm", "relaxing", "easy", "wellness"]]
  ];

  for (const [pattern, words] of rules) {
    if (pattern.test(text)) {
      words.forEach((word) => visualWords.add(word));
    }
  }

  destination.highlights.slice(0, 4).forEach((highlight) => visualWords.add(highlight.toLowerCase()));
  destination.bestFor.slice(0, 3).forEach((item) => visualWords.add(item.toLowerCase()));

  return Array.from(visualWords);
}

function normalizeVisualQuery(query: string) {
  return query
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[-_/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function expandVisualQuery(query: string) {
  const normalized = normalizeVisualQuery(query);
  const tokens = new Set(normalized.split(" ").filter((word) => word.length > 2));
  const synonymRules: Array<[RegExp, string[]]> = [
    [/water|falls|waterfall|rainbow|river|zambezi|swim|pool/, ["water", "waterfall", "rainbow", "river", "mist"]],
    [/animal|wild|safari|elephant|lion|rhino|game/, ["wildlife", "safari", "animals", "elephants", "game drive"]],
    [/mountain|mist|hike|walk|forest|green|valley/, ["mountains", "mist", "hiking", "forest", "viewpoint"]],
    [/ruin|old|ancient|history|heritage|culture|stone/, ["heritage", "ruins", "culture", "history", "stone"]],
    [/rock|cave|granite|blue/, ["rocks", "caves", "granite", "blue pool"]],
    [/lake|boat|sunset|fish|cruise|relax/, ["lake", "boat", "sunset", "fishing", "relaxing"]],
    [/adventure|zip|sky|bungee|gorge|thrill/, ["adventure", "movement", "thrill"]]
  ];

  for (const [pattern, words] of synonymRules) {
    if (pattern.test(normalized)) {
      words.forEach((word) => tokens.add(word));
    }
  }

  return Array.from(tokens);
}

function getVisualIntentBoost(destination: Destination, query: string) {
  const normalized = normalizeVisualQuery(query);
  const profile = [
    destination.slug,
    destination.name,
    destination.category,
    destination.region,
    destination.description,
    ...destination.highlights,
    ...destination.bestFor
  ].join(" ").toLowerCase();

  let boost = 0;

  if (/water|falls|waterfall|rainbow|river|zambezi|swim|pool/.test(normalized)) {
    if (/falls|waterfall/.test(profile)) boost += 8;
    if (/victoria-falls|mtarazi|bridalveil|inyangombe|pungwe/.test(profile)) boost += 5;
  }

  if (/animal|wild|safari|elephant|lion|rhino|game/.test(normalized)) {
    if (/wildlife|safari|game drive|elephant|rhino|lion/.test(profile)) boost += 8;
    if (/hwange|mana-pools|gonarezhou|matobo|imire|mbizi|haka|mukuvisi|kuimba|bird/.test(profile)) boost += 5;
    if (/elephant|safari|game/.test(normalized) && destination.slug === "hwange-national-park") boost += 8;
    if (/river|canoe|wild dog/.test(normalized) && destination.slug === "mana-pools-national-park") boost += 6;
    if (/rhino/.test(normalized) && /matobo-national-park|imire-rhino-wildlife-conservation/.test(destination.slug)) boost += 7;
  }

  if (/ruin|old|ancient|history|heritage|culture|stone|monument|museum/.test(normalized)) {
    if (/heritage|culture|ruins|monument|museum|gallery|stone/.test(profile)) boost += 8;
    if (/great-zimbabwe|khami|matobo|national-gallery|national-heroes|chiremba|chitungwiza|boma/.test(profile)) boost += 5;
    if (/ruin|ancient|kingdom|stone/.test(normalized) && destination.slug === "great-zimbabwe") boost += 10;
    if (/ruin|ancient|torwa/.test(normalized) && destination.slug === "khami-ruins") boost += 7;
  }

  if (/rock|cave|granite|blue|balancing/.test(normalized)) {
    if (/rock|cave|granite|balancing|blue pool|limestone/.test(profile)) boost += 8;
    if (/chinhoyi|domboshava|chiremba|matobo/.test(profile)) boost += 5;
    if (/cave|blue|pool/.test(normalized) && destination.slug === "chinhoyi-caves") boost += 8;
    if (/balancing|rock/.test(normalized) && destination.slug === "chiremba-balancing-rocks") boost += 7;
    if (/cave|blue|balancing|granite/.test(normalized) && !/rock|cave|granite|balancing|blue pool|limestone|chinhoyi|domboshava|chiremba|matobo/.test(profile)) boost -= 22;
  }

  if (/lake|boat|sunset|fish|cruise|relax|houseboat|dam/.test(normalized)) {
    if (/lake|boat|sunset|fishing|houseboat|dam|marina/.test(profile)) boost += 8;
    if (/lake-kariba|binga|lake-mutirikwi|lake-chivero/.test(profile)) boost += 6;
    if (/lake|sunset|boat|houseboat|cruise|fish/.test(normalized) && destination.slug === "lake-kariba") boost += 9;
    if (/tonga|binga/.test(normalized) && destination.slug === "binga") boost += 8;
  }

  if (/mountain|mist|hike|walk|forest|green|valley|highlands/.test(normalized)) {
    if (/mountain|highlands|mist|hiking|valley|forest|viewpoint/.test(profile)) boost += 8;
    if (/nyanga|vumba|chimanimani|honde|mavuradonha/.test(profile)) boost += 5;
    if (/highest|nyangani|waterfall|mountain/.test(normalized) && destination.slug === "nyanga") boost += 6;
    if (/mist|garden|bird/.test(normalized) && destination.slug === "vumba") boost += 5;
    if (/rugged|hike|pool|bridalveil/.test(normalized) && destination.slug === "chimanimani") boost += 5;
  }

  return boost;
}

function getVisualAIMatches(query: string) {
  const terms = expandVisualQuery(query);
  const activeTerms = terms.length > 0 ? terms : expandVisualQuery("waterfalls and wildlife");

  return destinations
    .map((destination) => {
      const visualWords = getVisualWords(destination);
      const searchable = visualWords.join(" ");
      const profile = [
        destination.slug,
        destination.name,
        destination.category,
        destination.description,
        ...destination.highlights,
        ...destination.bestFor
      ].join(" ").toLowerCase();
      const score = activeTerms.reduce((total, term) => {
        const exactVisualMatch = visualWords.some((word) => word === term);
        const visualMatch = searchable.includes(term) || visualWords.some((word) => term.includes(word));
        const profileMatch = profile.includes(term);
        return total + (exactVisualMatch ? 3 : visualMatch ? 2 : profileMatch ? 1 : 0);
      }, 0) + getVisualIntentBoost(destination, query);
      const confidence = Math.min(98, Math.max(58, Math.round(54 + score * 3.2)));
      const matchedWords = visualWords.filter((word) => activeTerms.some((term) => word.includes(term) || term.includes(word))).slice(0, 4);

      return {
        destination,
        confidence,
        matchedWords: matchedWords.length > 0 ? matchedWords : visualWords.slice(0, 3),
        score
      };
    })
    .filter((match) => match.score > 0)
    .sort((left, right) => right.score - left.score || right.confidence - left.confidence)
    .slice(0, 4);
}

function getCardCategory(destination: Destination, activeCategory: string) {
  const findCategory = (id: string) => exploreCategories.find((item) => item.id === id) ?? exploreCategories[0];
  const text = [
    destination.name,
    destination.category,
    destination.description,
    destination.region,
    ...destination.highlights,
    ...destination.bestFor
  ].join(" ").toLowerCase();

  if (activeCategory !== "all") {
    return findCategory(activeCategory);
  }

  if (destination.slug.includes("falls") || text.includes(" waterfall") || text.includes("rainforest")) return findCategory("waterfalls");
  if (destination.slug.includes("lake") || destination.slug === "binga" || text.includes(" lake ")) return findCategory("lakes");
  if (
    destination.slug.includes("caves") ||
    text.includes(" cave") ||
    text.includes("cavern") ||
    text.includes("balancing rock") ||
    text.includes("granite") ||
    text.includes("limestone") ||
    text.includes("blue pool") ||
    text.includes("rock shelter")
  ) {
    return findCategory("rocks");
  }
  if (text.includes("wildlife") || text.includes("safari") || text.includes("elephant") || text.includes("rhino") || text.includes("game")) {
    return findCategory("wildlife");
  }
  if (text.includes("culture") || text.includes("heritage") || text.includes("history") || text.includes("ruins") || text.includes("monument") || text.includes("art")) {
    return findCategory("culture");
  }

  return findCategory("mountains");
}

export function DestinationsContent() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visualAIDraft, setVisualAIDraft] = useState("I love wildlife and waterfalls, somewhere beautiful for photos.");
  const [visualAIQuery, setVisualAIQuery] = useState("I love wildlife and waterfalls, somewhere beautiful for photos.");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [favouriteSlugs, setFavouriteSlugs] = useState<string[]>([]);
  const [savedTripSlugs, setSavedTripSlugs] = useState<string[]>([]);
  const [visualFilters, setVisualFilters] = useState<VisualSearchFilters>(defaultVisualFilters);
  const activeCategoryData = exploreCategories.find((category) => category.id === activeCategory) ?? exploreCategories[0];
  const galleryDestinations = getCategoryDestinations(activeCategory);
  const visualAIInsight = useMemo(() => analyzeNyikaQuery(visualAIQuery), [visualAIQuery]);
  const visualAIMatches = useMemo(
    () => searchDestinations(visualAIInsight.expandedQuery, destinations, visualFilters),
    [visualAIInsight.expandedQuery, visualFilters]
  );
  const visualConcepts = useMemo(
    () => Array.from(new Set(visualAIMatches.flatMap((match) => match.matchedTerms))).slice(0, 3),
    [visualAIMatches]
  );
  const provinces = useMemo(() => Array.from(new Set(destinations.map((destination) => destination.region))).sort(), []);
  const activityOptions = useMemo(
    () => [
      "all",
      "waterfall",
      "safari",
      "history",
      "lake",
      "hiking",
      "bird",
      "photography",
      "culture"
    ],
    []
  );
  const travellerOptions = ["all", "family", "couples", "adventure", "photography", "culture", "wildlife"];

  useEffect(() => {
    setFavouriteSlugs(readStoredList(visualStorageKeys.favourites));
    setSavedTripSlugs(readStoredList(visualStorageKeys.savedTrips));
  }, []);

  function runVisualSearch(query: string) {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setVisualAIDraft(trimmedQuery);
    setIsAnalyzing(true);
    window.setTimeout(() => {
      setVisualAIQuery(trimmedQuery);
      setIsAnalyzing(false);
    }, 420);
  }

  function handleVisualSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runVisualSearch(visualAIDraft);
  }

  function clearVisualSearch() {
    setVisualAIDraft("");
    setVisualAIQuery("");
  }

  function toggleFavourite(slug: string) {
    setFavouriteSlugs((current) => {
      const next = current.includes(slug) ? current.filter((item) => item !== slug) : [slug, ...current].slice(0, 40);
      writeStoredList(visualStorageKeys.favourites, next);
      return next;
    });
  }

  function addToTrip(slug: string) {
    setSavedTripSlugs((current) => {
      const next = current.includes(slug) ? current : [slug, ...current].slice(0, 40);
      writeStoredList(visualStorageKeys.savedTrips, next);
      return next;
    });
  }

  function updateFilter<Key extends keyof VisualSearchFilters>(key: Key, value: VisualSearchFilters[Key]) {
    setVisualFilters((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="container explorePageShell">
      <section className="visualAISection mosiAISection" aria-label="Nyika AI image intelligence">
        <div className="mosiHeroRow">
          <div className="mosiHeroCopy">
            <span className="mosiBadge"><MessageCircle size={14} /> Nyika AI</span>
            <h2>
              Tell Nyika what you want.
            </h2>
            <p>Write a sentence. Nyika matches places, activities and moods across Zimbabwe.</p>
          </div>

          <div className="mosiChatPreview" aria-live="polite">
            <div className="mosiChatBubble assistant">
              <span>Nyika AI</span>
              <p>Tell me the kind of trip you are imagining. I will find the best places for you.</p>
            </div>
            <div className="mosiChatBubble user">
              <span>You</span>
              <p>{visualAIQuery || "I love wildlife and waterfalls..."}</p>
            </div>
            <div className="mosiChatBubble assistant answer">
              <span>Nyika AI</span>
              <p>{isAnalyzing ? "I am reading your imagination..." : visualAIInsight.notice ? "I picked up a sensitive travel intent." : `I found ${visualAIMatches.length} places that fit that feeling.`}</p>
              {visualAIMatches[0] && <img src={visualAIMatches[0].destination.image} alt="" />}
            </div>
          </div>
        </div>

        <form className="visualSearchForm mosiSearchBar mosiChatComposer" role="search" aria-label="Chat with Nyika AI to match destinations" onSubmit={handleVisualSearchSubmit}>
          <span className="mosiSearchIcon"><MessageCircle size={25} /></span>
          <textarea
            rows={2}
            value={visualAIDraft}
            onChange={(event) => setVisualAIDraft(event.target.value)}
            placeholder="I love wildlife and waterfalls, somewhere peaceful with beautiful views..."
            aria-label="Tell Nyika AI what kind of place you imagine"
          />
          {visualAIDraft && (
            <button className="visualSearchIconButton mosiClearButton" type="button" onClick={clearVisualSearch} aria-label="Clear visual search">
              <X size={20} />
            </button>
          )}
          <button className="visualSearchSubmit mosiSearchButton" type="submit" disabled={isAnalyzing}>
            <Send size={18} />
            {isAnalyzing ? "Thinking" : "Send"}
          </button>
        </form>

        <div className="mosiIdeasRow">
          <span><Sparkles size={17} /> Say it like this</span>
          <div className="mosiIdeaScroller">
            {defaultVisualIdeas.map((idea) => {
              const Icon = visualIdeaIcons[idea] ?? Sparkles;

              return (
                <button key={idea} type="button" onClick={() => runVisualSearch(idea)}>
                  <Icon size={21} />
                  {idea}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mosiMatchesPanel">
          {visualAIInsight.notice && (
            <div className={`nyikaGuidanceBox exploreGuidance ${visualAIInsight.notice.tone}`}>
              <ShieldCheck size={20} />
              <div>
                <strong>{visualAIInsight.notice.title}</strong>
                <p>{visualAIInsight.notice.message}</p>
                <div>
                  {visualAIInsight.notice.alternatives.map((alternative) => (
                    <span key={alternative}>{alternative}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mosiMatchesHeader">
            <div>
              <h3><Sparkles size={21} /> Top matches for you</h3>
              <p>Based on {visualConcepts.join(", ") || visualAIQuery || "your description"}</p>
            </div>
            <details className="visualFilterMenu">
              <summary><SlidersHorizontal size={16} /> Filters <ChevronDown size={15} /></summary>
              <div className="visualSearchFilters" aria-label="Visual search filters">
                <label>
                  Province
                  <select value={visualFilters.province} onChange={(event) => updateFilter("province", event.target.value)}>
                    <option value="all">All</option>
                    {provinces.map((province) => (
                      <option key={province} value={province}>{province}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Budget
                  <select value={visualFilters.budget} onChange={(event) => updateFilter("budget", event.target.value as VisualSearchFilters["budget"])}>
                    <option value="all">All</option>
                    <option value="budget">Budget</option>
                    <option value="mid-range">Mid-range</option>
                    <option value="premium">Premium</option>
                  </select>
                </label>
                <label>
                  Activity
                  <select value={visualFilters.activity} onChange={(event) => updateFilter("activity", event.target.value)}>
                    {activityOptions.map((activity) => (
                      <option key={activity} value={activity}>{activity === "all" ? "All" : activity}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Traveller
                  <select value={visualFilters.travellerType} onChange={(event) => updateFilter("travellerType", event.target.value)}>
                    {travellerOptions.map((traveller) => (
                      <option key={traveller} value={traveller}>{traveller === "all" ? "All" : traveller}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Difficulty
                  <select value={visualFilters.difficulty} onChange={(event) => updateFilter("difficulty", event.target.value as VisualSearchFilters["difficulty"])}>
                    <option value="all">All</option>
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                  </select>
                </label>
                <button
                  className={visualFilters.hiddenOnly ? "visualHiddenToggle active" : "visualHiddenToggle"}
                  type="button"
                  onClick={() => updateFilter("hiddenOnly", !visualFilters.hiddenOnly)}
                >
                  Hidden gems only
                </button>
              </div>
            </details>
          </div>

          <div className="visualAIMatchGrid mosiMatchGrid">
            {visualAIMatches.map(({ destination, percentage, matchedTerms }) => (
              <article className="visualAIMatchCard mosiMatchCard" key={destination.slug}>
                <div className="mosiMatchImage" style={{ backgroundImage: `url(${destination.image})` }}>
                  <span className="visualAIConfidence">{percentage}% <small>Match</small></span>
                  <button
                    className={favouriteSlugs.includes(destination.slug) ? "visualFavourite active" : "visualFavourite"}
                    type="button"
                    onClick={() => toggleFavourite(destination.slug)}
                    aria-label={`Save ${destination.name} as favourite`}
                  >
                    <Heart size={18} />
                  </button>
                  <div className="visualAICardBody">
                    <h3><MapPin size={18} /> {destination.name}</h3>
                    <p>{destination.region}</p>
                    <div className="visualReasonPills">
                      {matchedTerms.slice(0, 4).map((term) => (
                        <span key={term}>{term}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="visualCardActions mosiCardActions">
                  <Link to={`/destinations/${destination.slug}`}>View details</Link>
                  <button type="button" onClick={() => addToTrip(destination.slug)}>
                    <Plus size={15} />
                    {savedTripSlugs.includes(destination.slug) ? "Added" : "Add to trip"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="exploreFilterBar" aria-label="Explore categories">
        {exploreCategories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;

          return (
            <button
              className={isActive ? "exploreFilter active" : "exploreFilter"}
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon size={18} />
              <span>{category.shortLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="exploreCategorySummary" id="explore-results">
        <div>
          <span className="pill">{galleryDestinations.length} places</span>
          <h2>{activeCategoryData.label}</h2>
          <p>{activeCategoryData.description}</p>
        </div>
        <Link
          className="button secondary smallButton"
          to="/planner"
          state={{ heroQuery: activeCategoryData.prompt, generateFromHero: true }}
        >
          Plan this
        </Link>
      </div>

      <div className="exploreDestinationGrid">
        {galleryDestinations.map((destination) => {
          const category = getCardCategory(destination, activeCategory);
          const Icon = category.icon;

          return (
            <Link
              className="exploreDestinationCard"
              to={`/destinations/${destination.slug}`}
              key={destination.slug}
              style={{ backgroundImage: `url(${destination.image})` }}
            >
              <span className="exploreHeart" aria-label={`Save ${destination.name}`}>
                <Heart size={20} />
              </span>
              <div className="exploreDestinationContent">
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
                <span className={`exploreCategoryBadge ${category.id}`}>
                  <Icon size={15} />
                  {category.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function DestinationsPage() {
  return (
    <section className="section pageTop">
      <DestinationsContent />
    </section>
  );
}
