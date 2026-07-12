import { ArrowLeft, Download, Glasses, Share2, Shirt, Sun, Waves, Droplets, ShieldAlert, Footprints } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { destinations } from "../data/destinations";
import type { ItineraryPlan } from "../types/tourism";

function currencyNumber(value: string) {
  return Number(value.replace(/[^0-9.]/g, ""));
}

function currencyRange(value: string) {
  const amount = currencyNumber(value);
  if (!Number.isFinite(amount) || amount <= 0) return value;

  const low = Math.max(1, Math.round(amount * 0.92));
  const high = Math.round(amount * 1.12);
  return `US$ ${low.toLocaleString()} - ${high.toLocaleString()}`;
}

function getStoredPlan() {
  try {
    const stored = localStorage.getItem("juptha.latestPlan");
    return stored ? JSON.parse(stored) as ItineraryPlan : null;
  } catch {
    return null;
  }
}

function getPackItems(plan: ItineraryPlan) {
  const text = `${plan.destination} ${plan.summary} ${plan.conversationalBrief}`.toLowerCase();
  const waterTrip = /kariba|lake|boat|river|zambezi|falls|water|cruise|swim/.test(text);
  const safariTrip = /hwange|mana|gonarezhou|safari|wildlife|game|elephant|rhino/.test(text);

  return [
    { icon: Sun, label: "Wide-brim hat" },
    { icon: Glasses, label: "Sunglasses and SPF" },
    { icon: Shirt, label: "Light, breathable layers" },
    { icon: Footprints, label: safariTrip ? "Closed safari shoes" : "Closed, grippy shoes" },
    { icon: waterTrip ? Waves : Shirt, label: waterTrip ? "Life jacket for water activity" : "Light evening layer" },
    { icon: Droplets, label: "Reusable water bottle" }
  ];
}

export function PlanResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { plan?: ItineraryPlan } | null;
  const plan = state?.plan ?? getStoredPlan();
  const destination = plan ? destinations.find((item) => item.name === plan.destination) : undefined;

  if (!plan) {
    return (
      <section className="simpleTripAnswerPage">
        <div className="simpleTripAnswerWrap">
          <button className="simpleTripBack" type="button" onClick={() => navigate("/planner")}>
            <ArrowLeft size={24} />
            Open planner
          </button>
          <div className="simpleTripEmpty">
            <h1>No trip calculated yet.</h1>
            <p>Start from the planner, confirm your details, and Nyika will open the answer here.</p>
          </div>
        </div>
      </section>
    );
  }

  const heroImage = destination?.image ?? "/images/victoria-falls.png";
  const dailyAverage = currencyRange(`$${Math.max(1, Math.round(currencyNumber(plan.totalBudget) / plan.daysCount))}`);
  const packItems = getPackItems(plan);
  const safetyTips = [
    ...(destination?.careTips ?? []),
    ...plan.safetyTips,
    ...plan.smartWarnings
  ].filter(Boolean).slice(0, 4);

  return (
    <section className="simpleTripAnswerPage">
      <div className="simpleTripAnswerWrap">
        <header className="simpleTripTopbar">
          <button className="simpleTripBack" type="button" aria-label="Back" onClick={() => navigate(-1)}>
            <ArrowLeft size={25} />
          </button>
          <h1>{plan.destination} - {plan.daysCount} days, {plan.travelers} {plan.travelers === 1 ? "person" : "people"}</h1>
          <div className="simpleTripActions">
            <button type="button" aria-label="Download trip"><Download size={24} /></button>
            <button type="button" aria-label="Share trip"><Share2 size={24} /></button>
          </div>
        </header>

        <article className="simpleTripHeroCard">
          <img src={heroImage} alt="" />
          <div>
            <span>Nyika AI answer</span>
            <strong>{plan.summary}</strong>
            <p>{plan.conversationalBrief}</p>
          </div>
        </article>

        <div className="simpleBudgetGrid">
          <article>
            <span>Total estimated cost</span>
            <b>{currencyRange(plan.totalBudget)}</b>
          </article>
          <article>
            <span>Per person</span>
            <b>{plan.perPersonBudget}</b>
          </article>
        </div>

        <section className="simpleAnswerCard">
          <h2>Day-by-day itinerary</h2>
          <div className="simpleDayRows">
            {plan.days.map((day, index) => (
              <div key={day.title}>
                <b>Day {index + 1}</b>
                <p>{day.visitSuggestion}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="simpleAnswerCard">
          <h2>What to pack</h2>
          <p className="simpleMuted">Suggested for {plan.destination} and this itinerary.</p>
          <div className="simplePackGrid">
            {packItems.map(({ icon: Icon, label }) => (
              <span key={label}>
                <Icon size={23} />
                {label}
              </span>
            ))}
          </div>
        </section>

        <section className="simpleCareCard">
          <div>
            <ShieldAlert size={30} />
            <h2>Good to know before you go</h2>
          </div>
          <ul>
            {safetyTips.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
        </section>

        <section className="simpleAnswerCard compact">
          <h2>Budget split</h2>
          <div className="simpleSplitGrid">
            {Object.entries(plan.budgetBreakdown).map(([label, value]) => (
              <div key={label}>
                <span>{label.replace(/([A-Z])/g, " $1")}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
          <p className="simpleMuted">Daily average: {dailyAverage}</p>
        </section>
      </div>
    </section>
  );
}
