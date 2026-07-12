import { useMemo, useState } from "react";

const budgetRules = {
  budget: {
    accommodation: 0.34,
    food: 0.18,
    activities: 0.18,
    transport: 0.14,
    entranceFees: 0.10,
    contingency: 0.06
  },
  standard: {
    accommodation: 0.38,
    food: 0.18,
    activities: 0.22,
    transport: 0.12,
    entranceFees: 0.08,
    contingency: 0.02
  },
  premium: {
    accommodation: 0.45,
    food: 0.20,
    activities: 0.20,
    transport: 0.10,
    entranceFees: 0.04,
    contingency: 0.01
  }
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZW", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

export function BudgetCalculator() {
  const [budget, setBudget] = useState(500);
  const [style, setStyle] = useState<"budget" | "standard" | "premium">("standard");

  const breakdown = useMemo(() => {
    const rules = budgetRules[style];
    const total = Number.isFinite(budget) && budget > 0 ? budget : 500;
    return {
      accommodation: total * rules.accommodation,
      food: total * rules.food,
      activities: total * rules.activities,
      transport: total * rules.transport,
      entranceFees: total * rules.entranceFees,
      contingency: total * rules.contingency,
      total
    };
  }, [budget, style]);

  return (
    <section className="section">
      <div className="container">
        <div className="panel">
          <span className="pill">Budget Calculator</span>
          <h2 className="mt">Estimate your trip budget</h2>
          <p className="muted">
            No API needed — this calculator uses a local breakdown model to show accommodation, food, transport, entrance fees and contingency.
          </p>

          <div className="calculatorRow">
            <label>Budget (USD)</label>
            <input
              type="number"
              min={100}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>

          <div className="calculatorRow">
            <label>Travel style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value as "budget" | "standard" | "premium")}> 
              <option value="budget">Budget</option>
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
            </select>
          </div>

          <div className="budgetGrid">
            <div className="budget"><b>{formatCurrency(breakdown.accommodation)}</b>Accommodation</div>
            <div className="budget"><b>{formatCurrency(breakdown.food)}</b>Food</div>
            <div className="budget"><b>{formatCurrency(breakdown.activities)}</b>Activities</div>
            <div className="budget"><b>{formatCurrency(breakdown.transport)}</b>Transport</div>
            <div className="budget"><b>{formatCurrency(breakdown.entranceFees)}</b>Entrance fees</div>
            <div className="budget"><b>{formatCurrency(breakdown.contingency)}</b>Contingency</div>
          </div>

          <p className="muted" style={{ marginTop: 8 }}>
            Total budget: <strong>{formatCurrency(breakdown.total)}</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
