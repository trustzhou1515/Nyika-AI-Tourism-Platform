import type { ItineraryPlan } from "../types/tourism";

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
const API_BASE_URL = viteEnv?.VITE_NYIKA_API_URL ?? "http://127.0.0.1:8787";

type ConsentPayload = {
  accepted: boolean;
  version: string;
  purpose: string;
};

async function postJson<TPayload extends object>(path: string, payload: TPayload) {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Nyika-Client": "explore-zimbabwe-web"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) return null;
    return response.json() as Promise<{ ok: boolean; id?: string; message?: string }>;
  } catch {
    return null;
  }
}

export function recordPrivacyConsent(payload: ConsentPayload) {
  return postJson("/api/privacy/consent", {
    ...payload,
    acceptedAt: new Date().toISOString(),
    app: "Explore Zimbabwe"
  });
}

export function recordGeneratedPlan(plan: ItineraryPlan, prompt?: string) {
  return postJson("/api/plans", {
    destination: plan.destination,
    days: plan.daysCount,
    travelers: plan.travelers,
    style: plan.style,
    totalBudget: plan.totalBudget,
    perPersonBudget: plan.perPersonBudget,
    prompt,
    generatedAt: plan.generatedAt,
    plan
  });
}
