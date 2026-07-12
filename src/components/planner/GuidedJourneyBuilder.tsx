import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Calculator,
  CalendarDays,
  ChevronRight,
  Droplets,
  Gem,
  Landmark,
  Mountain,
  PawPrint,
  Users,
  Waves,
  type LucideIcon
} from "lucide-react";
import { destinations } from "../../data/destinations";
import { estimateGroupTripBudget } from "../../engine/budgetGuidance";
import type { TravelStyle } from "../../types/tourism";

type JourneyInterestOption = {
  id: string;
  label: string;
  Icon: LucideIcon;
  destinationSlugs: string[];
};

const journeyInterestOptions: JourneyInterestOption[] = [
  {
    id: "wildlife",
    label: "Wildlife",
    Icon: PawPrint,
    destinationSlugs: ["hwange-national-park", "mana-pools-national-park", "matobo-national-park", "gonarezhou-national-park"]
  },
  {
    id: "water",
    label: "Water",
    Icon: Waves,
    destinationSlugs: ["victoria-falls", "lake-kariba", "mtarazi-falls", "lake-mutirikwi"]
  },
  {
    id: "culture",
    label: "Culture",
    Icon: Landmark,
    destinationSlugs: ["great-zimbabwe", "matobo-national-park", "khami-ruins", "the-boma-dinner-drum-show"]
  },
  {
    id: "mountains",
    label: "Mountains",
    Icon: Mountain,
    destinationSlugs: ["vumba", "nyanga", "chimanimani", "mavuradonha-mountains"]
  },
  {
    id: "lakes",
    label: "Lakes",
    Icon: Droplets,
    destinationSlugs: ["lake-kariba", "binga", "lake-mutirikwi", "lake-chivero"]
  },
  {
    id: "rocks-caves",
    label: "Rocks & Caves",
    Icon: Gem,
    destinationSlugs: ["chinhoyi-caves", "domboshava-caves", "chiremba-balancing-rocks", "matobo-national-park"]
  }
];

export interface InitialJourneyInput {
  prompt?: string;
  placeSlugs?: string[];
  days?: number;
  travelers?: number;
  style?: TravelStyle;
  autoGenerate?: boolean;
}

function getPlacesBySlug(slugs: string[]) {
  return slugs
    .map((slug) => destinations.find((destination) => destination.slug === slug))
    .filter(Boolean) as typeof destinations;
}

function inferInterestsForSlugs(slugs: string[]) {
  return journeyInterestOptions
    .filter((option) => slugs.some((slug) => option.destinationSlugs.includes(slug)))
    .map((option) => option.id);
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZW", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

function getStopCount(days: number, availableStops: number) {
  if (availableStops <= 0) return 0;
  if (days <= 3) return Math.min(2, availableStops, days);
  if (days <= 7) return Math.min(3, availableStops);
  if (days <= 10) return Math.min(4, availableStops);
  return Math.min(5, availableStops);
}

function buildJourneyRoute(selectedInterests: string[], days: number, travelers: number, style: TravelStyle, preferredSlugs: string[] = []) {
  const selectedOptions = journeyInterestOptions.filter((option) => selectedInterests.includes(option.id));
  if (selectedOptions.length === 0 && preferredSlugs.length === 0) return [];

  const routeSlugs = preferredSlugs.length > 0
    ? Array.from(new Set(preferredSlugs))
    : Array.from(
        new Set(
          selectedOptions.flatMap((option) => option.destinationSlugs)
        )
      );
  const routePlaces = getPlacesBySlug(routeSlugs);
  const safeDays = Math.max(1, Math.round(days));
  const stopCount = getStopCount(safeDays, routePlaces.length);
  const chosenPlaces = preferredSlugs.length > 0 ? routePlaces : routePlaces.slice(0, stopCount);
  const baseDays = Math.max(1, Math.floor(safeDays / Math.max(stopCount, 1)));
  let remainingDays = Math.max(0, safeDays - baseDays * stopCount);
  let dayCursor = 1;

  return chosenPlaces.map((destination) => {
    const stopDays = baseDays + (remainingDays > 0 ? 1 : 0);
    remainingDays = Math.max(0, remainingDays - 1);
    const startDay = dayCursor;
    const endDay = dayCursor + stopDays - 1;
    dayCursor += stopDays;
    const estimate = estimateGroupTripBudget(destination.name, stopDays, style, travelers);

    return {
      destination,
      days: stopDays,
      dayLabel: startDay === endDay ? `Day ${startDay}` : `Days ${startDay}-${endDay}`,
      estimate,
      note: destination.highlights.slice(0, 3).join(", ")
    };
  });
}

type GeneratedJourney = {
  interests: string[];
  placeSlugs?: string[];
  prompt?: string;
  days: number;
  travelers: number;
  style: TravelStyle;
};

export function GuidedJourneyBuilder({ initialJourney }: { initialJourney?: InitialJourneyInput }) {
  const initialSlugs = useMemo(() => initialJourney?.placeSlugs ?? [], [initialJourney?.placeSlugs]);
  const initialInterests = useMemo(() => inferInterestsForSlugs(initialSlugs), [initialSlugs]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests);
  const [days, setDays] = useState(initialJourney?.days ?? 7);
  const [travelers, setTravelers] = useState(initialJourney?.travelers ?? 2);
  const [style, setStyle] = useState<TravelStyle>(initialJourney?.style ?? "standard");
  const [generatedJourney, setGeneratedJourney] = useState<GeneratedJourney | null>(null);

  const safeDays = Number.isFinite(days) && days > 0 ? Math.min(Math.round(days), 21) : 1;
  const safeTravelers = Number.isFinite(travelers) && travelers > 0 ? Math.min(Math.round(travelers), 200) : 1;
  const generatedDays = generatedJourney?.days ?? safeDays;
  const generatedTravelers = generatedJourney?.travelers ?? safeTravelers;
  const generatedStyle = generatedJourney?.style ?? style;
  const route = useMemo(
    () =>
      generatedJourney
        ? buildJourneyRoute(
            generatedJourney.interests,
            generatedJourney.days,
            generatedJourney.travelers,
            generatedJourney.style,
            generatedJourney.placeSlugs ?? []
          )
        : [],
    [generatedJourney]
  );
  const totalBudget = route.reduce((sum, stop) => sum + stop.estimate.total, 0);
  const perPersonBudget = Math.ceil(totalBudget / Math.max(generatedTravelers, 1) / 10) * 10;
  const selectedPlaceLabels = getPlacesBySlug(generatedJourney?.placeSlugs ?? [])
    .map((destination) => destination.name)
    .join(", ");
  const selectedLabels = selectedPlaceLabels || journeyInterestOptions
    .filter((option) => generatedJourney?.interests.includes(option.id))
    .map((option) => option.label)
    .join(", ");
  const canGenerate = selectedInterests.length > 0 || initialSlugs.length > 0;

  useEffect(() => {
    if (!initialJourney?.autoGenerate) return;

    const slugs = initialJourney.placeSlugs ?? [];
    const inferredInterests = inferInterestsForSlugs(slugs);
    const nextInterests = inferredInterests.length > 0 ? inferredInterests : ["wildlife"];
    const nextDays = initialJourney.days ?? 7;
    const nextTravelers = initialJourney.travelers ?? 2;
    const nextStyle = initialJourney.style ?? "standard";

    setSelectedInterests(nextInterests);
    setDays(nextDays);
    setTravelers(nextTravelers);
    setStyle(nextStyle);
    setGeneratedJourney({
      interests: nextInterests,
      placeSlugs: slugs,
      prompt: initialJourney.prompt,
      days: nextDays,
      travelers: nextTravelers,
      style: nextStyle
    });

    window.requestAnimationFrame(() => {
      document.getElementById("journey-answer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [
    initialJourney?.autoGenerate,
    initialJourney?.days,
    initialJourney?.placeSlugs,
    initialJourney?.prompt,
    initialJourney?.style,
    initialJourney?.travelers
  ]);

  function toggleInterest(id: string) {
    setGeneratedJourney(null);
    setSelectedInterests((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  function generateJourney() {
    if (!canGenerate) return;

    setGeneratedJourney({
      interests: selectedInterests,
      placeSlugs: initialJourney?.placeSlugs ?? [],
      prompt: initialJourney?.prompt,
      days: safeDays,
      travelers: safeTravelers,
      style
    });

    window.requestAnimationFrame(() => {
      document.getElementById("journey-answer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <article className="journeyBuilder" id="journey-builder">
      <div className="journeyBuilderGrid">
        <div className="journeyBuilderPanel questionPanel">
          <span className="pill">Plan type 2</span>
          <h3>Plan a trip across Zimbabwe</h3>
          <span className="questionUnderline" aria-hidden="true" />
          <p>Choose what you like. The app estimates the budget first, then suggests where to spend each part of the trip.</p>

          <label className="journeyQuestionLabel">What do you like?</label>
          <div className="interestButtonGrid">
            {journeyInterestOptions.map(({ Icon, ...option }) => (
              <button
                className={selectedInterests.includes(option.id) ? "interestButton active" : "interestButton"}
                key={option.id}
                type="button"
                onClick={() => toggleInterest(option.id)}
              >
                <Icon size={28} strokeWidth={2.3} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>

          <div className="journeyInputGrid compactJourneyInputGrid">
            <label>
              Days
              <span className="journeyFieldShell">
                <CalendarDays size={18} />
                <input
                  min="1"
                  max="21"
                  type="number"
                  value={days}
                  onChange={(event) => {
                    setGeneratedJourney(null);
                    setDays(Number(event.target.value));
                  }}
                />
              </span>
            </label>
            <label>
              People
              <span className="journeyFieldShell">
                <Users size={18} />
                <input
                  min="1"
                  max="200"
                  type="number"
                  value={travelers}
                  onChange={(event) => {
                    setGeneratedJourney(null);
                    setTravelers(Number(event.target.value));
                  }}
                />
              </span>
            </label>
            <label>
              Style
              <span className="journeyFieldShell">
                <Briefcase size={18} />
                <select
                  value={style}
                  onChange={(event) => {
                    setGeneratedJourney(null);
                    setStyle(event.target.value as TravelStyle);
                  }}
                >
                  <option value="budget">Budget</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </span>
            </label>
          </div>

          <button
            className="button journeyEstimateButton"
            disabled={!canGenerate}
            type="button"
            onClick={generateJourney}
          >
            {canGenerate ? "Get my estimated trip" : "Choose an interest first"}
          </button>
        </div>

        <div className="journeyAnswerPanel answerPanel" id="journey-answer">
          {!generatedJourney ? (
            <div className="journeyEmptyAnswer">
              <span className="answerBadge">Answer</span>
              <h3>Your journey answer will appear here</h3>
              <p>Choose what you like, confirm days and people, then generate the trip estimate.</p>
            </div>
          ) : (
            <>
              <div className="journeyAnswerTop">
                <div>
                  <span className="answerBadge">Answer</span>
                  <h3>Your estimated journey</h3>
                  <p>{selectedLabels ? `Based on: ${selectedLabels}.` : "Based on your selected interests."}</p>
                </div>
              </div>

              <div className="routeBudgetGrid">
                <div className="journeyBudgetCard">
                  <Calculator size={24} />
                  <div>
                    <span>Total estimate</span>
                    <b>{formatCurrency(totalBudget)}</b>
                  </div>
                </div>
                <div className="journeyBudgetCard">
                  <Users size={24} />
                  <div>
                    <span>Per person</span>
                    <b>{formatCurrency(perPersonBudget)}</b>
                  </div>
                </div>
                <div className="journeyBudgetCard">
                  <Users size={24} />
                  <div>
                    <span>Group size</span>
                    <b>{generatedTravelers} {generatedTravelers === 1 ? "Person" : "People"}</b>
                  </div>
                </div>
              </div>

              <div className="journeyBudgetNote">
                <Calculator size={24} />
                <div>
                  <b>Budget detected automatically</b>
                  <p>The app estimates the money needed from your days, group size, travel style and selected interests.</p>
                </div>
              </div>

              <div className="journeyResultPanel">
                <div className="journeyResultHeader">
                  <div>
                    <span>Route overview</span>
                    <h3>{generatedDays} days across Zimbabwe</h3>
                  </div>
                  <strong>{route.length} stops</strong>
                </div>

                <div className="journeyStops generatedJourneyStops">
                  {route.map((stop, index) => (
                    <div className="journeyStop" key={stop.destination.slug}>
                      <img src={stop.destination.image} alt="" />
                      <span>{index + 1}</span>
                      <div>
                        <b>{stop.destination.name}</b>
                        <small>{stop.dayLabel}</small>
                      </div>
                      <strong>{stop.estimate.totalLabel}</strong>
                      <ChevronRight size={20} />
                      <div className="journeyLinks">
                        <Link to={`/destinations/${stop.destination.slug}`}>View place</Link>
                        <Link
                          to="/planner"
                          state={{
                            heroQuery: `${stop.days} days in ${stop.destination.name}, ${generatedTravelers} people, ${generatedStyle} style`,
                            generateFromHero: true
                          }}
                        >
                          Plan stop
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
