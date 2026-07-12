import { ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { recordPrivacyConsent } from "../../services/apiClient";

const CONSENT_KEY = "nyika.privacyConsent.v1";

export function PrivacyConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(CONSENT_KEY) !== "accepted");
  }, []);

  function acceptConsent() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    void recordPrivacyConsent({
      accepted: true,
      version: "2026-07-12",
      purpose: "Trip planning, budgeting improvement, safety recommendations and MVP analytics"
    });
    setVisible(false);
  }

  function dismissForNow() {
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="privacyConsent" aria-label="Data protection notice">
      <div>
        <ShieldCheck size={22} />
        <p>
          <b>Data protection notice.</b> Nyika AI can record trip-planning signals to improve budgeting and recommendations.
          Personal memories stay private on this device unless sharing is enabled.
        </p>
      </div>
      <div className="privacyConsentActions">
        <button type="button" className="button secondary" onClick={dismissForNow}>
          <X size={16} />
          Later
        </button>
        <button type="button" className="button" onClick={acceptConsent}>
          I understand
        </button>
      </div>
    </aside>
  );
}
