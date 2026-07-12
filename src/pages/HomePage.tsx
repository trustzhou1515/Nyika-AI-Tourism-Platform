import { type FormEvent, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Calculator, Compass, Diamond, MapPin, MapPinned, MessageCircle, Send, ShieldCheck, Sparkles, X } from "lucide-react";
import { Hero } from "../components/home/Hero";
import { destinations } from "../data/destinations";
import type { TravelStyle } from "../types/tourism";
import { searchDestinations, type VisualSearchFilters } from "../utils/destinationMatcher";
import { analyzeNyikaQuery } from "../utils/nyikaIntelligence";
import { TravelMapOverview } from "./TravelMapPage";

const homeDefaultVisualFilters: VisualSearchFilters = {
  province: "all",
  budget: "all",
  activity: "all",
  travellerType: "all",
  difficulty: "all",
  hiddenOnly: false
};

const homeExploreInterests = [
  {
    label: "Mountains",
    description: "Nyanga, Vumba, Chimanimani, Matobo and Mavuradonha mountain escapes.",
    match: ["Hiking", "Nature", "Wellness", "Mountains", "Worlds View"],
    prompt: "I want mountain places in Zimbabwe for 3 days, 2 people"
  },
  {
    label: "Lakes",
    description: "Kariba, Binga, Mutirikwi and Chivero lake trips.",
    match: ["Lake", "Fishing", "Boat", "Sunset views"],
    placeSlugs: ["lake-kariba", "binga", "lake-mutirikwi", "lake-chivero"],
    prompt: "I want lakes in Zimbabwe for 3 days, 2 people"
  },
  {
    label: "Rocks & Caves",
    description: "Chinhoyi, Domboshava, Chiremba and Matobo stone landscapes.",
    match: ["Caves", "Rock Formations", "Rock Shelters", "Photography", "Culture"],
    placeSlugs: ["chinhoyi-caves", "domboshava-caves", "chiremba-balancing-rocks", "matobo-national-park"],
    prompt: "I want rocks and caves in Zimbabwe for 3 days, 2 people"
  }
];

const nyikaPopularIdeas = [
  "I want waterfalls, wildlife and beautiful photos",
  "Show me quiet mountains and cool weather",
  "I love history, stone ruins and culture",
  "Find lakes, sunsets and relaxed family places",
  "I want caves, rocks and hidden places"
];

const planPopularIdeas = [
  "Plan Victoria Falls for 3 days, 2 people, standard style",
  "Plan Nyanga for 4 days with waterfalls, mountains and quiet stays",
  "Plan Victoria Falls and Nyanga for 5 days, 2 people",
  "Plan a 7 day Zimbabwe trip for a family of 5",
  "Plan Kariba for 3 days with boat cruise, lake sunset and accommodation"
];

type HomeDestination = (typeof destinations)[number];
type PlanConfirmation = {
  prompt: string;
  mode: "single" | "journey";
  destinations: HomeDestination[];
  days: number;
  travelers: number;
  style: TravelStyle;
  budget?: string;
};

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
  fourteen: 14
};

const planAliasOverrides: Record<string, string[]> = {
  "victoria-falls": ["vic falls", "vicfalls", "mosi oa tunya", "the falls"],
  "lake-kariba": ["kariba", "kariba dam", "kariba lake"],
  "great-zimbabwe": ["great zimbabwe ruins", "masvingo ruins", "great enclosure"],
  "hwange-national-park": ["hwange", "hwange park"],
  "mana-pools-national-park": ["mana pools", "mana"],
  "matobo-national-park": ["matobo", "matopos", "matobo hills"],
  "chinhoyi-caves": ["chinhoyi cave", "sleeping pool", "blue pool"],
  "chiremba-balancing-rocks": ["balancing rocks", "chiremba rocks"],
  "mtarazi-falls": ["mutarazi falls", "mtarazi", "mutarazi"],
  nyanga: ["mount nyangani", "nyangani", "worlds view", "juliasdale"]
};

const defaultZimbabweRouteSlugs = ["victoria-falls", "great-zimbabwe", "nyanga", "lake-kariba"];

function getMatches(terms: string[]) {
  return destinations.filter((destination) => {
    const searchable = [
      destination.category,
      destination.description,
      ...destination.highlights,
      ...destination.bestFor
    ].join(" ").toLowerCase();

    return terms.some((term) => searchable.includes(term.toLowerCase()));
  });
}

function getPlacesBySlug(slugs: string[]) {
  return slugs
    .map((slug) => destinations.find((destination) => destination.slug === slug))
    .filter(Boolean) as typeof destinations;
}

function getMixedFeaturedActivities(limit: number) {
  const activityGroups = destinations
    .map((destination) => ({
      destination,
      activities: destination.activities ?? []
    }))
    .filter((group) => group.activities.length > 0);
  const mixedActivities = [];
  const longestGroup = Math.max(...activityGroups.map((group) => group.activities.length));

  for (let index = 0; index < longestGroup; index += 1) {
    for (const group of activityGroups) {
      const activity = group.activities[index];
      if (!activity) continue;

      mixedActivities.push({ ...activity, destination: group.destination });
      if (mixedActivities.length >= limit) return mixedActivities;
    }
  }

  return mixedActivities;
}

function normalizePlanText(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[-_/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readPlanNumber(value?: string) {
  if (!value) return null;
  const normalized = normalizePlanText(value);
  const numeric = Number(normalized);
  if (Number.isFinite(numeric) && numeric > 0) return numeric;
  return numberWords[normalized] ?? null;
}

function findMentionedPlanDestinations(prompt: string) {
  const normalized = normalizePlanText(prompt);
  const matches = destinations
    .map((destination) => {
      const aliases = [
        destination.name,
        destination.slug.replace(/-/g, " "),
        ...(planAliasOverrides[destination.slug] ?? [])
      ].map(normalizePlanText);
      const matchedAlias = aliases.find((alias) => alias.length > 3 && normalized.includes(alias));
      return matchedAlias ? { destination, index: normalized.indexOf(matchedAlias) } : null;
    })
    .filter(Boolean) as Array<{ destination: HomeDestination; index: number }>;

  return matches
    .sort((left, right) => left.index - right.index)
    .map((match) => match.destination)
    .filter((destination, index, list) => list.findIndex((item) => item.slug === destination.slug) === index);
}

function parsePlanFacts(prompt: string) {
  const normalized = normalizePlanText(prompt);
  const numberPattern = "one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|\\d+";
  const daysMatch = normalized.match(new RegExp(`(${numberPattern})\\s*(?:days?|nights?)`));
  const travelersMatch =
    normalized.match(new RegExp(`(?:for|with|group of)\\s*(${numberPattern})\\s*(?:people|travelers|travellers|guests|tourists|family|students|kids|children)`)) ??
    normalized.match(new RegExp(`(${numberPattern})\\s*(?:people|travelers|travellers|guests|tourists|students|kids|children)`));
  const budgetMatch = normalized.match(/(?:us\$|\$|usd)\s*([\d,]+)|([\d,]+)\s*(?:usd|dollars|budget)/);
  const style: TravelStyle = /premium|luxury|high end|executive/.test(normalized)
    ? "premium"
    : /budget|cheap|affordable|student|school|low cost/.test(normalized)
      ? "budget"
      : "standard";

  return {
    days: Math.min(Math.max(Math.round(readPlanNumber(daysMatch?.[1]) ?? 3), 1), 14),
    travelers: Math.min(Math.max(Math.round(readPlanNumber(travelersMatch?.[1]) ?? 1), 1), 200),
    style,
    budget: budgetMatch ? `$${(budgetMatch[1] ?? budgetMatch[2]).replace(/,/g, "")}` : undefined
  };
}

function buildPlanConfirmation(prompt: string): PlanConfirmation {
  const mentionedDestinations = findMentionedPlanDestinations(prompt);
  const normalized = normalizePlanText(prompt);
  const facts = parsePlanFacts(prompt);
  const fallbackDestination = searchDestinations(prompt, destinations, homeDefaultVisualFilters)[0]?.destination ?? destinations[0];
  const countryOnlyPlan = /\b(?:zimbabwe|zimbabwean|zim)\b/.test(normalized) && mentionedDestinations.length === 0;
  const selectedDestinations = mentionedDestinations.length > 0
    ? mentionedDestinations
    : countryOnlyPlan
      ? getPlacesBySlug(defaultZimbabweRouteSlugs)
      : [fallbackDestination];

  return {
    prompt,
    mode: countryOnlyPlan || selectedDestinations.length > 1 ? "journey" : "single",
    destinations: selectedDestinations.slice(0, 5),
    ...facts
  };
}

export function HomePage() {
  const navigate = useNavigate();
  const [nyikaDraft, setNyikaDraft] = useState("I love wildlife and waterfalls, but I also want a quiet place for photos.");
  const [nyikaQuery, setNyikaQuery] = useState("");
  const [planDraft, setPlanDraft] = useState("Plan Victoria Falls for 3 days, 2 people, standard style");
  const [planConfirmation, setPlanConfirmation] = useState<PlanConfirmation | null>(null);
  const featuredActivities = getMixedFeaturedActivities(4);
  const wildlifeStories = destinations.filter((destination) => destination.wildlifeStory);
  const nyikaInsight = useMemo(() => analyzeNyikaQuery(nyikaQuery), [nyikaQuery]);
  const nyikaMatches = useMemo(
    () => (nyikaQuery ? searchDestinations(nyikaInsight.expandedQuery, destinations, homeDefaultVisualFilters).slice(0, 4) : []),
    [nyikaInsight.expandedQuery, nyikaQuery]
  );

  function handleNyikaSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = nyikaDraft.trim();
    if (!trimmedQuery) return;
    setNyikaDraft(trimmedQuery);
    setNyikaQuery(trimmedQuery);
  }

  function usePopularIdea(idea: string) {
    setNyikaDraft(idea);
    setNyikaQuery(idea);
  }

  function handlePlanSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedPrompt = planDraft.trim();
    if (!trimmedPrompt) return;
    setPlanDraft(trimmedPrompt);
    setPlanConfirmation(buildPlanConfirmation(trimmedPrompt));
  }

  function confirmPlan() {
    if (!planConfirmation) return;

    if (planConfirmation.mode === "journey") {
      navigate("/planner#journey-builder", {
        state: {
          journeyPrompt: planConfirmation.prompt,
          journeyPlaceSlugs: planConfirmation.destinations.map((destination) => destination.slug),
          journeyDays: planConfirmation.days,
          journeyTravelers: planConfirmation.travelers,
          journeyStyle: planConfirmation.style,
          generateJourneyFromHome: true
        }
      });
      return;
    }

    navigate("/planner", { state: { heroQuery: planConfirmation.prompt, generateFromHero: true } });
  }

  return (
    <>
      <Hero />

      <section className="section homeNyikaLiveShell">
        <div className="container">
          <section className="homeNyikaAISection homeNyikaLiveSection" aria-label="Chat with Nyika AI">
            <div className="homeNyikaLiveHeader">
              <span className="pill">Nyika AI</span>
              <h2>Chat with your imagination.</h2>
            </div>

            <div className="homeNyikaChatCard" aria-live="polite">
              <div className="homeNyikaBubble assistant">
                <span>Nyika AI</span>
                <p>Tell me the kind of Zimbabwe trip you are imagining.</p>
              </div>
              {nyikaQuery && (
                <>
                  <div className="homeNyikaBubble user">
                    <span>You</span>
                    <p>{nyikaQuery}</p>
                  </div>
                  <div className="homeNyikaBubble assistant answer heroNyikaAnswer">
                    <span>Nyika AI</span>
                    <p>{nyikaInsight.notice ? "I picked up a sensitive travel intent." : `I found ${nyikaMatches.length} places that fit that feeling.`}</p>
                    {nyikaMatches[0] && <img src={nyikaMatches[0].destination.image} alt="" />}

                    {nyikaInsight.notice && (
                      <div className={`nyikaGuidanceBox ${nyikaInsight.notice.tone}`}>
                        <ShieldCheck size={20} />
                        <div>
                          <strong>{nyikaInsight.notice.title}</strong>
                          <p>{nyikaInsight.notice.message}</p>
                          <div>
                            {nyikaInsight.notice.alternatives.map((alternative) => (
                              <span key={alternative}>{alternative}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {!nyikaInsight.notice && nyikaInsight.detectedTags.length > 0 && (
                      <div className="nyikaDetectedTags" aria-label="Nyika AI detected interests">
                        {nyikaInsight.detectedTags.slice(0, 5).map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}

                    <div className="heroChatPlaces" aria-label="Nyika AI matched places">
                      {nyikaMatches.map(({ destination, percentage, matchedTerms }) => (
                        <Link className="heroChatPlaceCard" to={`/destinations/${destination.slug}`} key={destination.slug}>
                          <img src={destination.image} alt="" />
                          <div>
                            <strong>{destination.name}</strong>
                            <span>{percentage}% match</span>
                            <small>{matchedTerms.slice(0, 2).join(" / ") || destination.region}</small>
                          </div>
                          <MapPin size={16} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {!nyikaQuery && (
                <div className="homeNyikaBubble assistant quiet">
                  <span>Nyika AI</span>
                  <p>Use a full sentence. I will match places, activities and moods.</p>
                </div>
              )}
            </div>

            <div className="homeNyikaIdeas" aria-label="Popular Nyika AI ideas">
              <span>Popular ideas</span>
              <div>
                {nyikaPopularIdeas.map((idea) => (
                  <button type="button" key={idea} onClick={() => usePopularIdea(idea)}>
                    {idea}
                  </button>
                ))}
              </div>
            </div>

            <form className="homeNyikaComposer" role="search" aria-label="Tell Nyika AI the Zimbabwe trip you imagine" onSubmit={handleNyikaSearch}>
              <span className="homeNyikaComposerIcon"><MessageCircle size={42} /></span>
              <textarea
                rows={1}
                value={nyikaDraft}
                onChange={(event) => setNyikaDraft(event.target.value)}
                placeholder="I love wildlife and waterfalls, but I also want a quiet place for photos."
                aria-label="Tell Nyika AI what kind of Zimbabwe trip you imagine"
              />
              {nyikaDraft && (
                <button className="homeNyikaClear" type="button" onClick={() => setNyikaDraft("")} aria-label="Clear Nyika AI message">
                  <X size={38} />
                </button>
              )}
              <button className="homeNyikaSend" type="submit">
                <Send size={35} />
                Send
              </button>
            </form>
          </section>
        </div>
      </section>

      <section className="section homePremiumIntro">
        <div className="container">
          <div className="homeFeatureHeader compactHomeHeader">
            <span className="pill">Plan with Nyika AI</span>
            <h2>Tell Nyika the trip. Get the budget and route.</h2>
            <p className="lead">
              Type the destination, days and people. Nyika turns it into a practical tourism plan.
            </p>
          </div>

          <div className="homePlanAIBox" aria-label="Plan with Nyika AI">
            <div className="homePlanAIIntro">
              <span>Plan AI</span>
              <strong>What trip should I calculate?</strong>
            </div>

            <form className="homePlanComposer" onSubmit={handlePlanSearch}>
              <span className="homePlanComposerIcon"><Calculator size={24} /></span>
              <textarea
                rows={1}
                value={planDraft}
                onChange={(event) => {
                  setPlanDraft(event.target.value);
                  setPlanConfirmation(null);
                }}
                placeholder="Plan Victoria Falls for 3 days, 2 people, standard style"
                aria-label="Tell Nyika AI what trip to plan"
              />
              <button className="homePlanSend" type="submit">
                <Send size={18} />
                Plan
              </button>
            </form>

            <div className="homePlanIdeas" aria-label="Popular planning examples">
              {planPopularIdeas.map((idea) => (
                <button
                  type="button"
                  key={idea}
                  onClick={() => {
                    setPlanDraft(idea);
                    setPlanConfirmation(null);
                  }}
                >
                  {idea}
                </button>
              ))}
            </div>

            {planConfirmation && (
              <div className="homePlanConfirmation" aria-live="polite">
                <div className="homePlanConfirmHeader">
                  <div>
                    <span>Confirmation</span>
                    <h3>{planConfirmation.mode === "journey" ? "Across Zimbabwe plan detected" : "One destination plan detected"}</h3>
                  </div>
                  <strong>{planConfirmation.mode === "journey" ? "Route" : "Trip"}</strong>
                </div>

                <p>Please confirm these details before Nyika calculates the budget and route.</p>

                <div className="homePlanDetectedPlaces" aria-label="Detected places">
                  {planConfirmation.destinations.map((destination) => (
                    <span key={destination.slug}>{destination.name}</span>
                  ))}
                </div>

                <div className="homePlanFactGrid">
                  <div>
                    <span>Type</span>
                    <strong>{planConfirmation.mode === "journey" ? "Across Zimbabwe" : "One destination"}</strong>
                  </div>
                  <div>
                    <span>Days</span>
                    <strong>{planConfirmation.days}</strong>
                  </div>
                  <div>
                    <span>People</span>
                    <strong>{planConfirmation.travelers}</strong>
                  </div>
                  <div>
                    <span>Style</span>
                    <strong>{planConfirmation.style}</strong>
                  </div>
                  <div>
                    <span>Budget</span>
                    <strong>{planConfirmation.budget ?? "Auto estimate"}</strong>
                  </div>
                </div>

                <div className="homePlanConfirmActions">
                  <button type="button" onClick={() => setPlanConfirmation(null)}>
                    Edit prompt
                  </button>
                  <button type="button" onClick={confirmPlan}>
                    Confirm and generate <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="homeObjectiveGrid">
            <Link className="homeObjectiveCard" to="/planner">
              <Calculator size={22} />
              <span>Planning</span>
              <h3>Know the budget first</h3>
              <p>Estimate days, people, destination costs, food, transport and activities in one guided flow.</p>
              <b>Start planning <ArrowRight size={15} /></b>
            </Link>

            <Link className="homeObjectiveCard featuredObjective" to="/destinations">
              <Compass size={22} />
              <span>Explore</span>
              <h3>See what Zimbabwe offers</h3>
              <p>Browse destinations by interest, activities, visual discovery and guided journeys.</p>
              <b>View more on Explore <ArrowRight size={15} /></b>
            </Link>

            <Link className="homeObjectiveCard" to="/map">
              <MapPinned size={22} />
              <span>Map</span>
              <h3>Find places on the map</h3>
              <p>View Zimbabwe, tourism pins, nearby places and activities in a simple map experience.</p>
              <b>Open map <ArrowRight size={15} /></b>
            </Link>
          </div>
        </div>
      </section>

      <section className="section homeMapLiveSection">
        <div className="container">
          <TravelMapOverview
            title="Explore using map"
            description="Move the map, tap pins, and see what a traveller can find in each area."
          />
          <div className="homeMapActionBar">
            <p className="muted">Use the full map page for destination details, nearby tourism places and directions.</p>
            <Link className="button" to="/map">
              <MapPinned size={16} />
              Open full map
            </Link>
          </div>
        </div>
      </section>

      <section className="section homeDiscoverySection">
        <div className="container">
          <div className="sectionHeaderRow premiumSectionRow">
            <div>
              <span className="pill">Visual discovery</span>
              <h2>Discover places by what you love.</h2>
              <p className="lead">Choose an interest, see matching places, then open Explore for the full discovery experience.</p>
            </div>
            <Link className="button secondary smallButton" to="/destinations">
              Explore more
            </Link>
          </div>

          <div className="discoveryGrid homeExploreDiscoveryGrid">
            {homeExploreInterests.map((interest) => {
              const matches = "placeSlugs" in interest && interest.placeSlugs ? getPlacesBySlug(interest.placeSlugs) : getMatches(interest.match);

              return (
                <article className="discoveryCard" key={interest.label}>
                  <div>
                    <span className="pill">{matches.length} places</span>
                    <h3>{interest.label}</h3>
                    <p>{interest.description}</p>
                  </div>
                  <div className="chipList">
                    {matches.slice(0, 3).map((destination) => (
                      <Link key={destination.slug} to={`/destinations/${destination.slug}`}>
                        {destination.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    className="button secondary smallButton"
                    to="/planner"
                    state={{ heroQuery: interest.prompt, generateFromHero: true }}
                  >
                    Plan this
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="sectionHeaderCompact homeExploreActivityHeader">
            <span className="pill">Visual discovery</span>
            <h3>See what you can do</h3>
          </div>

          <div className="visualDiscoveryGrid homeExploreActivityGrid">
            {featuredActivities.map((activity) => (
              <Link
                className="visualDiscoveryCard"
                to={`/destinations/${activity.destination.slug}`}
                key={`${activity.destination.slug}-${activity.title}`}
              >
                <img src={activity.image} alt={activity.title} />
                <div>
                  <span>{activity.destination.name}</span>
                  <h3>{activity.title}</h3>
                  <p>{activity.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="center">
            <Link className="button secondary" to="/destinations">
              <Compass size={17} />
              Explore more
            </Link>
          </div>
        </div>
      </section>

      <section className="section homeClosingSection">
        <div className="container">
          <div className="homeClosingCard">
            <Diamond size={24} />
            <div>
              <span className="pill">Core focus</span>
              <h2>Built for practical tourism decisions.</h2>
              <p className="lead">
                The app stays simple: budget first, discover visually, open the map, and save memories when the journey starts.
              </p>
            </div>
            <Link className="button secondary" to="/planner">
              <Sparkles size={16} />
              Try planning
            </Link>
          </div>
        </div>
      </section>

      <section className="section homeStoriesSection">
        <div className="container">
          <div className="sectionHeaderRow premiumSectionRow">
            <div>
              <span className="pill">True wildlife stories</span>
              <h2>Zimbabwe has stories worth remembering.</h2>
              <p className="lead">
                Meet rescued animals, returning wildlife and the people who protected them.
              </p>
            </div>
            <Link className="button secondary smallButton" to="/destinations">
              <Compass size={16} />
              Explore places
            </Link>
          </div>

          <div className="homeStoryGrid">
            {wildlifeStories.map((destination) => {
              const story = destination.wildlifeStory;
              if (!story) return null;

              return (
                <Link
                  className="homeStoryCard"
                  to={`/destinations/${destination.slug}`}
                  key={destination.slug}
                >
                  <img src={story.image} alt={`Wildlife near ${destination.name}`} />
                  <div className="homeStoryContent">
                    <span><BookOpen size={14} /> {destination.name}</span>
                    <h3>{story.title}</h3>
                    <p>{story.summary}</p>
                    <b>Read the story <ArrowRight size={15} /></b>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
