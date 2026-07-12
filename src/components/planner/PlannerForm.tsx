import { useEffect, useState } from "react";
import { Calculator, MapPin, PencilLine, Send } from "lucide-react";
import { destinations } from "../../data/destinations";
import { estimateGroupTripBudget, evaluateTripBudget } from "../../engine/budgetGuidance";
import { parsePlannerPromptWithInsight } from "../../engine/promptParser";
import type { PlannerRequest, TravelStyle } from "../../types/tourism";

interface PlannerFormProps {
  onGenerate: (request: PlannerRequest) => void;
  initialRequest?: PlannerRequest;
}

export function PlannerForm({ onGenerate, initialRequest }: PlannerFormProps) {
  const [destination, setDestination] = useState(initialRequest?.destination ?? "Victoria Falls");
  const [days, setDays] = useState(initialRequest?.days ?? 3);
  const [budget, setBudget] = useState(initialRequest ? initialRequest.budget.replace(/[^0-9.]/g, "") : "500");
  const [travelers, setTravelers] = useState(initialRequest?.travelers ?? 1);
  const [style, setStyle] = useState<TravelStyle>(initialRequest?.style ?? "standard");
  const [interests, setInterests] = useState(initialRequest?.interests ?? "wildlife, culture, photography, local food");
  const [budgetError, setBudgetError] = useState("");
  const [destinationTouched, setDestinationTouched] = useState(true);
  const groupEstimate = estimateGroupTripBudget(destination, days, style, travelers);
  const promptSummary = `${destination}, ${days} ${days === 1 ? "day" : "days"}, ${travelers} ${travelers === 1 ? "person" : "people"}`;
  const quickPrompts = [
    { label: "Victoria Falls, 3 days, 2 people", destination: "Victoria Falls", days: 3, travelers: 2, style: "standard" as TravelStyle },
    { label: "Nyanga, 4 days, waterfalls", destination: "Nyanga", days: 4, travelers: 2, style: "standard" as TravelStyle },
    { label: "Kariba, 3 days, 40 people", destination: "Lake Kariba", days: 3, travelers: 40, style: "budget" as TravelStyle }
  ];

  useEffect(() => {
    if (initialRequest) {
      setDestination(initialRequest.destination);
      setDays(initialRequest.days);
      setBudget(initialRequest.budget.replace(/[^0-9.]/g, ""));
      setTravelers(initialRequest.travelers ?? 1);
      setStyle(initialRequest.style);
      setInterests(initialRequest.interests);
      setDestinationTouched(true);
    }
  }, [initialRequest]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericBudget = Number(budget.replace(/[^0-9.]/g, ""));
    const safeTravelers = Number.isFinite(travelers) && travelers > 0 ? Math.round(travelers) : 1;
    const estimatedBudget = estimateGroupTripBudget(destination, days, style, safeTravelers).total;
    const budgetWasProvided = budget.trim().length > 0;

    if (budgetWasProvided && (!Number.isFinite(numericBudget) || numericBudget <= 0)) {
      setBudgetError("Enter a valid budget amount, e.g. 500, or leave it blank so I can estimate what you need.");
      return;
    }

    const finalBudget = budgetWasProvided ? numericBudget : estimatedBudget;
    const budgetCheck = evaluateTripBudget(destination, days, style, finalBudget, safeTravelers);

    if (budgetWasProvided && budgetCheck.isTooLow) {
      setBudgetError(budgetCheck.message);
      return;
    }

    setBudgetError("");
    const parsedNotes = !destinationTouched && interests.trim().length > 0
      ? parsePlannerPromptWithInsight(`${interests}, ${days} days, ${safeTravelers} people, $${finalBudget}`).request
      : null;
    const smartDestination = parsedNotes?.destination ?? destination;

    onGenerate({ destination: smartDestination, days, budget: `$${finalBudget}`, travelers: safeTravelers, style, interests });
  }

  return (
    <form className="nyikaPlanComposer" onSubmit={handleSubmit}>
      <div className="nyikaPromptBar">
        <span className="nyikaPromptIcon">
          <Calculator size={24} />
        </span>
        <textarea
          aria-label="Trip prompt"
          value={interests}
          onChange={(e) => {
            setInterests(e.target.value);
            setDestinationTouched(false);
          }}
          placeholder="Tell Nyika what trip to calculate..."
        />
        <button className="nyikaPlanButton" type="submit">
          <Send size={20} />
          Plan
        </button>
      </div>

      <div className="nyikaQuickPrompts" aria-label="Example prompts">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt.label}
            type="button"
            onClick={() => {
              setDestination(prompt.destination);
              setDays(prompt.days);
              setTravelers(prompt.travelers);
              setStyle(prompt.style);
              setBudget("");
              setInterests(`Plan ${prompt.label}`);
              setDestinationTouched(true);
              setBudgetError("");
            }}
          >
            {prompt.label}
            <span>↗</span>
          </button>
        ))}
      </div>

      <section className="nyikaConfirmCard">
        <div className="nyikaConfirmTop">
          <div>
            <span>Confirm details</span>
            <h3>{destination ? "One destination plan detected" : "Trip plan detected"}</h3>
            <p>Confirm before Nyika calculates the budget and route.</p>
          </div>
          <strong>Trip</strong>
        </div>

        <div className="nyikaDestinationPill">
          <MapPin size={17} />
          {destination || "Destination"}
        </div>

        <div className="nyikaConfirmGrid">
          <label>
            Type
            <select aria-label="Trip type" value="single" disabled>
              <option value="single">One destination</option>
            </select>
          </label>
          <label>
            Days
            <select value={days} onChange={(e) => setDays(Number(e.target.value))}>
              {Array.from({ length: 14 }, (_, index) => index + 1).map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </label>
          <label>
            People
            <input
              type="number"
              min={1}
              step={1}
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              placeholder="1"
            />
          </label>
          <label>
            Style
            <select value={style} onChange={(e) => setStyle(e.target.value as TravelStyle)}>
              <option value="budget">Budget</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </label>
          <label>
            Budget
            <input
              type="number"
              min={1}
              step={1}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Auto estimate"
            />
          </label>
          <label className="nyikaDestinationField">
            Destination
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDestinationTouched(true);
              }}
            >
              {destinations.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="nyikaBudgetAssist">
          <b>{groupEstimate.totalLabel}</b>
          <span>Suggested total for {travelers || 1} traveler{(travelers || 1) === 1 ? "" : "s"} ({groupEstimate.perPersonLabel} per person)</span>
          <button
            type="button"
            onClick={() => {
              setBudget(String(groupEstimate.total));
              setBudgetError("");
            }}
          >
            Use estimate
          </button>
        </div>
        {budgetError && <p className="nyikaErrorText">{budgetError}</p>}

        <div className="nyikaConfirmActions">
          <button
            className="nyikaEditButton"
            type="button"
            onClick={() => {
              setInterests(`Plan ${promptSummary}, ${style} style`);
              setBudgetError("");
            }}
          >
            <PencilLine size={17} />
            Edit prompt
          </button>
          <button className="nyikaGenerateButton" type="submit">
            Confirm and generate
            <span>→</span>
          </button>
        </div>
      </section>
    </form>
  );
}
