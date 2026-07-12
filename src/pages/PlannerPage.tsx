import { useLocation, useNavigate } from "react-router-dom";
import { HelpCircle, Map } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PlannerForm } from "../components/planner/PlannerForm";
import { GuidedJourneyBuilder } from "../components/planner/GuidedJourneyBuilder";
import { generateMockItinerary } from "../engine/mockItineraryEngine";
import { parsePlannerPromptWithInsight } from "../engine/promptParser";
import { recordGeneratedPlan } from "../services/apiClient";
import type { PlannerRequest, TravelStyle } from "../types/tourism";

type ParsedPrompt = ReturnType<typeof parsePlannerPromptWithInsight>;
type PlanMode = "single" | "journey";

export function PlannerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as {
    heroQuery?: string;
    generateFromHero?: boolean;
    journeyPrompt?: string;
    journeyPlaceSlugs?: string[];
    journeyDays?: number;
    journeyTravelers?: number;
    journeyStyle?: TravelStyle;
    generateJourneyFromHome?: boolean;
  } | null;
  const heroQuery = locationState?.heroQuery;
  const generateFromHero = locationState?.generateFromHero === true;
  const generateJourneyFromHome = locationState?.generateJourneyFromHome === true;

  const parsedPrompt = useMemo<ParsedPrompt | undefined>(() => {
    if (!heroQuery) return undefined;
    return parsePlannerPromptWithInsight(heroQuery);
  }, [heroQuery]);
  const initialRequest = parsedPrompt?.request;

  const initialJourney = useMemo(
    () =>
      generateJourneyFromHome
        ? {
            prompt: locationState?.journeyPrompt,
            placeSlugs: locationState?.journeyPlaceSlugs ?? [],
            days: locationState?.journeyDays,
            travelers: locationState?.journeyTravelers,
            style: locationState?.journeyStyle,
            autoGenerate: true
          }
        : undefined,
    [
      generateJourneyFromHome,
      locationState?.journeyDays,
      locationState?.journeyPlaceSlugs,
      locationState?.journeyPrompt,
      locationState?.journeyStyle,
      locationState?.journeyTravelers
    ]
  );

  const [planMode, setPlanMode] = useState<PlanMode>(location.hash === "#journey-builder" || generateJourneyFromHome ? "journey" : "single");

  useEffect(() => {
    if (initialRequest && generateFromHero) {
      const generatedPlan = generateMockItinerary(initialRequest);
      localStorage.setItem("juptha.latestPlan", JSON.stringify(generatedPlan));
      void recordGeneratedPlan(generatedPlan, heroQuery);
      navigate("/planner/result", { state: { plan: generatedPlan } });
      setPlanMode("single");
    }
  }, [initialRequest, generateFromHero, heroQuery, navigate]);

  useEffect(() => {
    if (!location.hash) return;

    if (location.hash === "#journey-builder") {
      setPlanMode("journey");
    }

    window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [location.hash]);

  function handleGenerate(request: PlannerRequest) {
    const generatedPlan = generateMockItinerary(request);
    localStorage.setItem("juptha.latestPlan", JSON.stringify(generatedPlan));
    void recordGeneratedPlan(generatedPlan, `${request.destination}, ${request.days} days, ${request.travelers} people, ${request.style} style`);
    navigate("/planner/result", { state: { plan: generatedPlan } });
  }

  return (
    <section className="section pageTop">
      <div className="container">
        <div className="pageIntro">
          <span className="pill">Trip Planner</span>
          <h1>Plan with clarity.</h1>
          <p className="lead">Choose one destination or build a journey across Zimbabwe. The app keeps the numbers first, then shows the route.</p>
        </div>

        <div className="planModeSwitcher" aria-label="Choose planning mode">
          <button
            className={planMode === "single" ? "planModeButton active" : "planModeButton"}
            type="button"
            onClick={() => setPlanMode("single")}
          >
            One destination
          </button>
          <button
            className={planMode === "journey" ? "planModeButton active" : "planModeButton"}
            type="button"
            onClick={() => setPlanMode("journey")}
          >
            Across Zimbabwe
          </button>
        </div>

        {planMode === "single" ? (
          <div className="nyikaTripPlannerShell">
            <div className="nyikaTripPlannerHeader">
              <div>
                <span className="nyikaHeaderIcon"><Map size={22} /></span>
                <h2>Nyika Trip Planner</h2>
              </div>
              <p>
                What trip should I calculate?
                <HelpCircle size={18} />
              </p>
            </div>

            <div className="nyikaPlannerGrid">
              <PlannerForm onGenerate={handleGenerate} initialRequest={initialRequest} />
            </div>
          </div>
        ) : (
          <>
            <div className="sectionHeaderCompact journeyPlannerHeader">
              <span className="pill">Across Zimbabwe</span>
              <h3>Build a route</h3>
            </div>

            <GuidedJourneyBuilder initialJourney={initialJourney} />
          </>
        )}
      </div>
    </section>
  );
}
