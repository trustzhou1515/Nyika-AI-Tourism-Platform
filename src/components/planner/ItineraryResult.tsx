import { useState } from "react";
import { destinations } from "../../data/destinations";
import type { ItineraryPlan } from "../../types/tourism";

interface ItineraryResultProps {
  plan: ItineraryPlan | null;
}

function getSeasonCare() {
  const month = new Date().getMonth() + 1;

  if (month >= 5 && month <= 8) {
    return {
      label: "Cool dry season",
      note: "Mornings and evenings can be cold, especially in mountains and on early drives. Pack a jacket or warm layer."
    };
  }

  if (month >= 11 || month <= 3) {
    return {
      label: "Warm rainy season",
      note: "Pack light clothes, rain protection and shoes that can handle wet ground."
    };
  }

  return {
    label: "Warm dry season",
    note: "Pack light clothes for daytime, sun protection and one light layer for evenings."
  };
}

const outfitOptions = [
  {
    id: "warm-layer",
    label: "Warm layer",
    image: "/images/clothing/warm-layer.svg",
    keywords: ["warm", "jacket", "fleece", "layer", "cool", "cold"],
    note: "For cold mornings, evenings and mountain weather."
  },
  {
    id: "rain-ready",
    label: "Rain ready",
    image: "/images/clothing/rain-ready.svg",
    keywords: ["rain", "wet", "mist", "quick-dry", "waterproof"],
    note: "Useful around waterfalls, rainy months and spray-filled paths."
  },
  {
    id: "safari-neutral",
    label: "Safari neutral",
    image: "/images/clothing/safari-neutral.svg",
    keywords: ["neutral", "safari", "wildlife", "long trousers"],
    note: "Soft earth colours work well for parks and game drives."
  },
  {
    id: "water-wear",
    label: "Water wear",
    image: "/images/clothing/water-wear.svg",
    keywords: ["swim", "pool", "boat", "beach", "water"],
    note: "Pack this for boats, pools and water-side activities."
  },
  {
    id: "walking-shoes",
    label: "Walking shoes",
    image: "/images/clothing/walking-shoes.svg",
    keywords: ["shoe", "hiking", "walking", "trail", "grip", "sturdy"],
    note: "Comfortable grip matters on rocks, ruins and trails."
  },
  {
    id: "sun-care",
    label: "Sun care",
    image: "/images/clothing/sun-care.svg",
    keywords: ["sun", "hat", "sunscreen", "breathable", "light"],
    note: "Keep a hat, light clothes and sun protection close."
  },
  {
    id: "smart-casual",
    label: "Smart casual",
    image: "/images/clothing/smart-casual.svg",
    keywords: ["smart", "casual", "city", "evening", "respectful"],
    note: "Good for museums, city stops, dinners and cultural spaces."
  }
];

function getOutfitCards(clothingTips: string[], seasonLabel: string) {
  const text = `${clothingTips.join(" ")} ${seasonLabel}`.toLowerCase();
  const matched = outfitOptions.filter((option) => (
    option.keywords.some((keyword) => text.includes(keyword))
  ));

  const essentials = [
    outfitOptions.find((option) => option.id === "walking-shoes"),
    outfitOptions.find((option) => option.id === "sun-care")
  ].filter(Boolean) as typeof outfitOptions;

  return [...matched, ...essentials]
    .filter((option, index, all) => all.findIndex((item) => item.id === option.id) === index)
    .slice(0, 4);
}

export function ItineraryResult({ plan }: ItineraryResultProps) {
  const [savedMessage, setSavedMessage] = useState("");

  if (!plan) {
    return (
      <div className="panel answerPanel emptyAnswerPanel">
        <span className="answerBadge">Answer</span>
        <h2 className="mt">Your plan will appear here</h2>
        <p className="muted">Add trip details and calculate. Keep it simple first.</p>
      </div>
    );
  }

  function handleSavePlan() {
    if (!plan) return;

    const savedTrips = JSON.parse(localStorage.getItem("juptha.savedTrips") ?? "[]") as ItineraryPlan[];
    const nextTrips = [
      plan,
      ...savedTrips.filter((trip) => trip.generatedAt !== plan.generatedAt)
    ].slice(0, 12);

    localStorage.setItem("juptha.savedTrips", JSON.stringify(nextTrips));
    setSavedMessage("Saved to trips");
  }

  const firstDay = plan.days[0];
  const destinationInfo = destinations.find((destination) => destination.name === plan.destination);
  const seasonCare = getSeasonCare();
  const priorityActions = [
    {
      label: "Sleep",
      title: plan.bookingOptions.find((option) => option.type === "Accommodation")?.title ?? firstDay.staySuggestion,
      detail: firstDay.staySuggestion
    },
    {
      label: "Arrive",
      title: plan.bookingOptions.find((option) => option.type === "Airport Transfer")?.title ?? "Pre-book arrival transfer",
      detail: plan.arrivalChecklist[0]
    },
    {
      label: "Move",
      title: plan.bookingOptions.find((option) => option.type === "Taxi")?.title ?? "Arrange local taxi",
      detail: "Use this for dinner, short hops and activity pickup points."
    },
    {
      label: "Today",
      title: firstDay.visitSuggestion,
      detail: firstDay.dinnerSuggestion
    }
  ];
  const outfitCards = destinationInfo ? getOutfitCards(destinationInfo.clothingTips, seasonCare.label) : [];

  return (
    <div className="panel answerPanel fadeIn">
      <div className="resultHeader">
        <span className="answerBadge">Answer</span>
        <button className="button secondary smallButton" type="button" onClick={handleSavePlan}>
          Save trip
        </button>
      </div>
      <h2 className="mt">{plan.title}</h2>
      <p className="muted">{plan.summary}</p>
      <p className="conversationBrief">{plan.conversationalBrief}</p>
      {savedMessage && <p className="muted successText">{savedMessage}</p>}

      <section className="assistantAnswer">
        <div>
          <span className="pill">Budget First</span>
          <h3>Your money plan</h3>
          <p>
            Start with the figures. This shows the total budget, what each person roughly needs,
            and how the money can be divided before you travel.
          </p>
        </div>
        <div className="insightGrid">
          <div className="budget"><b>{plan.totalBudget}</b>Total budget</div>
          <div className="budget"><b>{plan.perPersonBudget}</b>Per person</div>
          <div className="budget"><b>{plan.travelers}</b>People</div>
          <div className="budget"><b>{plan.daysCount} days</b>Trip length</div>
          <div className="budget"><b>{plan.destination}</b>Destination</div>
          <div className="budget"><b>{plan.style}</b>Style</div>
        </div>
      </section>

      <article className="itineraryCard">
        <strong>How you may spend it</strong>
        <p className="muted">A simple split of the total budget.</p>
        <div className="budgetGrid">
          <div className="budget"><b>{plan.budgetBreakdown.accommodation}</b>Sleep</div>
          <div className="budget"><b>{plan.budgetBreakdown.food}</b>Food</div>
          <div className="budget"><b>{plan.budgetBreakdown.activities}</b>Activities</div>
          <div className="budget"><b>{plan.budgetBreakdown.transport}</b>Transport</div>
          <div className="budget"><b>{plan.budgetBreakdown.entranceFees}</b>Entry fees</div>
          <div className="budget"><b>{plan.budgetBreakdown.contingency}</b>Backup money</div>
        </div>
      </article>

      <article className="itineraryCard">
        <strong>Budget check</strong>
        <ul>
          {plan.smartWarnings.map((warning) => <li key={warning}>{warning}</li>)}
        </ul>
      </article>

      {destinationInfo && (
        <article className="itineraryCard">
          <strong>What you can find in {destinationInfo.name}</strong>
          <p className="muted">{destinationInfo.description}</p>
          <div className="budgetGrid">
            {destinationInfo.highlights.map((highlight) => (
              <div className="budget" key={highlight}>
                <b>{highlight}</b>
                Activity or place
              </div>
            ))}
          </div>
          <div className="quickToolsRow" style={{ marginTop: 14 }}>
            {destinationInfo.bestFor.map((item) => (
              <span className="toolPill" key={item}>{item}</span>
            ))}
          </div>
        </article>
      )}

      {destinationInfo && (
        <article className="itineraryCard">
          <strong>Travel with care</strong>
          <p className="muted">Simple things to know before going to {destinationInfo.name}.</p>
          <ul>
            {destinationInfo.careTips.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>
        </article>
      )}

      {destinationInfo && (
        <article className="itineraryCard">
          <strong>What to wear</strong>
          <p className="muted">
            {seasonCare.label}: {seasonCare.note}
          </p>
          <div className="outfitGrid" aria-label={`Clothing guide for ${destinationInfo.name}`}>
            {outfitCards.map((outfit) => (
              <article className="outfitCard" key={outfit.id}>
                <img src={outfit.image} alt={`${outfit.label} clothing`} />
                <div>
                  <b>{outfit.label}</b>
                  <span>{outfit.note}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="wearTipList" aria-label="Extra packing notes">
            {destinationInfo.clothingTips.map((tip) => <span key={tip}>{tip}</span>)}
          </div>
        </article>
      )}

      <section className="assistantAnswer">
        <div>
          <span className="pill">Next</span>
          <h3>What to arrange first</h3>
          <p>
            First secure where you sleep. Then arrange arrival transport. After that, choose your first activity.
          </p>
        </div>
        <div className="priorityGrid">
          {priorityActions.map((action) => (
            <article className="priorityCard" key={action.label}>
              <span>{action.label}</span>
              <b>{action.title}</b>
              <p>{action.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <article className="itineraryCard bookingPanel">
        <strong>Book before you travel</strong>
        <p className="muted">These are the most important things to arrange early.</p>
        <div className="bookingGrid">
          {plan.bookingOptions.map((option) => {
            const isComingSoon = option.type === "Flight" || option.type === "Taxi";

            return (
              <div className={`bookingCard ${isComingSoon ? "comingSoon" : ""}`} key={`${option.type}-${option.title}`}>
                <span>{isComingSoon ? `${option.type} - Coming soon` : option.type}</span>
                <b>{option.title}</b>
                <p>{option.description}</p>
                <small>{option.paymentNote}</small>
                <button className="button secondary smallButton" type="button" disabled={isComingSoon}>
                  {isComingSoon ? "Coming soon" : option.actionLabel}
                </button>
              </div>
            );
          })}
        </div>
      </article>

      <article className="itineraryCard">
        <strong>Arrival Checklist</strong>
        <ul>
          {plan.arrivalChecklist.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </article>

      <section className="timelineBlock">
        <div className="sectionHeaderCompact">
          <span className="pill">Day Plan</span>
          <h3>Simple daily guide</h3>
        </div>

        {plan.days.map((day, index) => (
          <article className="itineraryCard dayCard" key={day.title}>
            <div className="dayNumber">{index + 1}</div>
            <div className="dayContent">
              <strong>{day.title}</strong>
              <div className="dayGuide primaryDayGuide">
                <p><b>Visit:</b> {day.visitSuggestion}</p>
                <p><b>Lunch:</b> {day.lunchSuggestion}</p>
                <p><b>Break:</b> {day.breakSuggestion}</p>
                <p><b>Dinner:</b> {day.dinnerSuggestion}</p>
                <p><b>Stay:</b> {day.staySuggestion}</p>
              </div>
              <details className="dayDetails">
                <summary>Show full timing</summary>
                <p><b>Morning:</b> {day.morning}</p>
                <p><b>Afternoon:</b> {day.afternoon}</p>
                <p><b>Evening:</b> {day.evening}</p>
              </details>
            </div>
          </article>
        ))}
      </section>

      <details className="itineraryCard">
        <summary>More suggestions</summary>
        <div className="recommendationList">
          {[...plan.localGuide, ...plan.businessRecommendations].map((business) => (
            <div className="recommendation" key={`${business.name}-${business.type}`}>
              <b>{business.name}</b>
              <span>{business.type} / {business.priceLevel}</span>
              <p>{business.fit}</p>
            </div>
          ))}
        </div>
      </details>

      <details className="itineraryCard">
        <summary>Extra travel notes</summary>
        <strong>Hidden gems</strong>
        <ul>
          {plan.hiddenGems.map((gem) => <li key={gem}>{gem}</li>)}
        </ul>
        <strong>Safety</strong>
        <ul>
          {plan.safetyTips.map((tip) => <li key={tip}>{tip}</li>)}
        </ul>
        <strong>Route notes</strong>
        <ul>
          {plan.routeNotes.map((note) => <li key={note}>{note}</li>)}
        </ul>
      </details>
    </div>
  );
}
