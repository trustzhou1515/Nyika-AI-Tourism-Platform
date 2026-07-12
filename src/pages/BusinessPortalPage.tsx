import { StatCard } from "../components/common/StatCard";
import { SectionHeader } from "../components/common/SectionHeader";

export function BusinessPortalPage() {
  return (
    <section className="section pageTop">
      <div className="container">
        <SectionHeader
          eyebrow="Business Portal"
          title="Visibility and analytics for tourism businesses"
          description="For hotels, lodges, restaurants, guides, transport operators and activity providers."
        />

        <div className="dashboard">
          <StatCard value="248" label="Tourist searches" />
          <StatCard value="37" label="Business leads" />
          <StatCard value="12" label="Hidden gems viewed" />
          <StatCard value="4.8" label="Visitor rating" />
        </div>

        <div className="grid3 mtLarge">
          <div className="card"><div className="icon">✅</div><h3>Verified Profiles</h3><p>Businesses add contacts, services, images, packages and locations.</p></div>
          <div className="card"><div className="icon">🎯</div><h3>AI Matching</h3><p>The system recommends businesses based on tourist intent and context.</p></div>
          <div className="card"><div className="icon">📊</div><h3>Tourism Insights</h3><p>Understand visitor interests, demand patterns and destination performance.</p></div>
        </div>
      </div>
    </section>
  );
}
