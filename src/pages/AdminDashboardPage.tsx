import { StatCard } from "../components/common/StatCard";
import { SectionHeader } from "../components/common/SectionHeader";

export function AdminDashboardPage() {
  return (
    <section className="section pageTop">
      <div className="container">
        <SectionHeader
          eyebrow="Admin"
          title="Tourism intelligence dashboard"
          description="A focused dashboard for tourism stakeholders, destination demand, booking signals and project reporting."
        />

        <div className="dashboard">
          <StatCard value="1,204" label="Visitors assisted" />
          <StatCard value="83" label="Businesses listed" />
          <StatCard value="26" label="Destinations indexed" />
          <StatCard value="91%" label="Positive feedback" />
        </div>

        <div className="panel mtLarge">
          <h3>Platform controls</h3>
          <ul>
            <li>Approve tourism business profiles</li>
            <li>Manage destination data</li>
            <li>Monitor AI-generated itinerary quality</li>
            <li>Export AI4I impact reports</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
