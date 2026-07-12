import type { TravelStyle } from "../types/tourism";

interface DestinationCostProfile {
  accommodation: Record<TravelStyle, number>;
  mealsPerDay: Record<TravelStyle, number>;
  localTransportPerDay: number;
  anchorActivity: Record<TravelStyle, number>;
  arrivalBuffer: number;
}

const destinationCostProfiles: Record<string, DestinationCostProfile> = {
  "Victoria Falls": {
    accommodation: { budget: 40, standard: 110, premium: 258 },
    mealsPerDay: { budget: 22, standard: 40, premium: 75 },
    localTransportPerDay: 15,
    anchorActivity: { budget: 55, standard: 85, premium: 150 },
    arrivalBuffer: 25
  },
  "Mtarazi Falls": {
    accommodation: { budget: 35, standard: 85, premium: 170 },
    mealsPerDay: { budget: 18, standard: 34, premium: 62 },
    localTransportPerDay: 22,
    anchorActivity: { budget: 35, standard: 70, premium: 130 },
    arrivalBuffer: 35
  },
  "Bridalveil Falls": {
    accommodation: { budget: 32, standard: 75, premium: 150 },
    mealsPerDay: { budget: 17, standard: 32, premium: 58 },
    localTransportPerDay: 20,
    anchorActivity: { budget: 25, standard: 50, premium: 95 },
    arrivalBuffer: 35
  },
  "Inyangombe Falls": {
    accommodation: { budget: 35, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 32, premium: 60 },
    localTransportPerDay: 16,
    anchorActivity: { budget: 20, standard: 40, premium: 75 },
    arrivalBuffer: 25
  },
  "Pungwe Falls": {
    accommodation: { budget: 35, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 32, premium: 60 },
    localTransportPerDay: 20,
    anchorActivity: { budget: 25, standard: 50, premium: 95 },
    arrivalBuffer: 35
  },
  "Hwange National Park": {
    accommodation: { budget: 65, standard: 145, premium: 320 },
    mealsPerDay: { budget: 25, standard: 45, premium: 80 },
    localTransportPerDay: 35,
    anchorActivity: { budget: 75, standard: 140, premium: 260 },
    arrivalBuffer: 60
  },
  "Mana Pools National Park": {
    accommodation: { budget: 70, standard: 160, premium: 340 },
    mealsPerDay: { budget: 25, standard: 45, premium: 85 },
    localTransportPerDay: 40,
    anchorActivity: { budget: 85, standard: 150, premium: 280 },
    arrivalBuffer: 70
  },
  "Chiremba Balancing Rocks": {
    accommodation: { budget: 30, standard: 85, premium: 170 },
    mealsPerDay: { budget: 18, standard: 35, premium: 65 },
    localTransportPerDay: 18,
    anchorActivity: { budget: 10, standard: 25, premium: 50 },
    arrivalBuffer: 15
  },
  "Chinhoyi Caves": {
    accommodation: { budget: 35, standard: 85, premium: 170 },
    mealsPerDay: { budget: 18, standard: 35, premium: 65 },
    localTransportPerDay: 24,
    anchorActivity: { budget: 15, standard: 35, premium: 75 },
    arrivalBuffer: 25
  },
  "Domboshava Caves": {
    accommodation: { budget: 30, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 34, premium: 62 },
    localTransportPerDay: 18,
    anchorActivity: { budget: 12, standard: 28, premium: 55 },
    arrivalBuffer: 18
  },
  "Matobo National Park": {
    accommodation: { budget: 35, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 32, premium: 60 },
    localTransportPerDay: 18,
    anchorActivity: { budget: 35, standard: 65, premium: 120 },
    arrivalBuffer: 30
  },
  "Gonarezhou National Park": {
    accommodation: { budget: 55, standard: 125, premium: 260 },
    mealsPerDay: { budget: 24, standard: 42, premium: 75 },
    localTransportPerDay: 42,
    anchorActivity: { budget: 65, standard: 120, premium: 230 },
    arrivalBuffer: 70
  },
  "Mbizi Game Park": {
    accommodation: { budget: 25, standard: 60, premium: 120 },
    mealsPerDay: { budget: 16, standard: 28, premium: 50 },
    localTransportPerDay: 14,
    anchorActivity: { budget: 18, standard: 35, premium: 70 },
    arrivalBuffer: 20
  },
  "Haka Game Park": {
    accommodation: { budget: 25, standard: 60, premium: 120 },
    mealsPerDay: { budget: 16, standard: 28, premium: 50 },
    localTransportPerDay: 12,
    anchorActivity: { budget: 15, standard: 30, premium: 60 },
    arrivalBuffer: 15
  },
  "Mukuvisi Woodlands": {
    accommodation: { budget: 25, standard: 60, premium: 120 },
    mealsPerDay: { budget: 16, standard: 28, premium: 50 },
    localTransportPerDay: 12,
    anchorActivity: { budget: 15, standard: 30, premium: 60 },
    arrivalBuffer: 15
  },
  "Great Zimbabwe": {
    accommodation: { budget: 30, standard: 70, premium: 130 },
    mealsPerDay: { budget: 16, standard: 30, premium: 55 },
    localTransportPerDay: 12,
    anchorActivity: { budget: 20, standard: 35, premium: 70 },
    arrivalBuffer: 20
  },
  "Khami Ruins": {
    accommodation: { budget: 30, standard: 75, premium: 150 },
    mealsPerDay: { budget: 17, standard: 32, premium: 58 },
    localTransportPerDay: 14,
    anchorActivity: { budget: 20, standard: 38, premium: 75 },
    arrivalBuffer: 20
  },
  "National Gallery of Zimbabwe": {
    accommodation: { budget: 30, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 35, premium: 65 },
    localTransportPerDay: 12,
    anchorActivity: { budget: 15, standard: 30, premium: 60 },
    arrivalBuffer: 15
  },
  "National Heroes Acre": {
    accommodation: { budget: 30, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 35, premium: 65 },
    localTransportPerDay: 12,
    anchorActivity: { budget: 10, standard: 25, premium: 50 },
    arrivalBuffer: 15
  },
  "The Boma Dinner & Drum Show": {
    accommodation: { budget: 40, standard: 110, premium: 258 },
    mealsPerDay: { budget: 22, standard: 40, premium: 75 },
    localTransportPerDay: 15,
    anchorActivity: { budget: 55, standard: 95, premium: 150 },
    arrivalBuffer: 25
  },
  "Chitungwiza Arts Centre": {
    accommodation: { budget: 30, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 35, premium: 65 },
    localTransportPerDay: 16,
    anchorActivity: { budget: 15, standard: 30, premium: 60 },
    arrivalBuffer: 15
  },
  "Eastern Highlands": {
    accommodation: { budget: 35, standard: 85, premium: 170 },
    mealsPerDay: { budget: 18, standard: 34, premium: 60 },
    localTransportPerDay: 18,
    anchorActivity: { budget: 25, standard: 45, premium: 90 },
    arrivalBuffer: 30
  },
  "Chimanimani": {
    accommodation: { budget: 32, standard: 75, premium: 150 },
    mealsPerDay: { budget: 17, standard: 32, premium: 58 },
    localTransportPerDay: 20,
    anchorActivity: { budget: 25, standard: 50, premium: 95 },
    arrivalBuffer: 35
  },
  "Vumba": {
    accommodation: { budget: 35, standard: 85, premium: 170 },
    mealsPerDay: { budget: 18, standard: 34, premium: 62 },
    localTransportPerDay: 16,
    anchorActivity: { budget: 22, standard: 45, premium: 85 },
    arrivalBuffer: 30
  },
  "Honde Valley": {
    accommodation: { budget: 30, standard: 70, premium: 140 },
    mealsPerDay: { budget: 16, standard: 30, premium: 55 },
    localTransportPerDay: 22,
    anchorActivity: { budget: 20, standard: 42, premium: 80 },
    arrivalBuffer: 35
  },
  "Binga": {
    accommodation: { budget: 38, standard: 90, premium: 180 },
    mealsPerDay: { budget: 20, standard: 36, premium: 65 },
    localTransportPerDay: 24,
    anchorActivity: { budget: 35, standard: 70, premium: 130 },
    arrivalBuffer: 45
  },
  "Nyanga": {
    accommodation: { budget: 35, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 32, premium: 60 },
    localTransportPerDay: 16,
    anchorActivity: { budget: 25, standard: 45, premium: 90 },
    arrivalBuffer: 25
  },
  "Mavuradonha Mountains": {
    accommodation: { budget: 30, standard: 75, premium: 150 },
    mealsPerDay: { budget: 18, standard: 32, premium: 58 },
    localTransportPerDay: 24,
    anchorActivity: { budget: 25, standard: 50, premium: 95 },
    arrivalBuffer: 40
  },
  "Lake Kariba": {
    accommodation: { budget: 45, standard: 100, premium: 220 },
    mealsPerDay: { budget: 22, standard: 38, premium: 70 },
    localTransportPerDay: 20,
    anchorActivity: { budget: 45, standard: 85, premium: 170 },
    arrivalBuffer: 45
  },
  "Lake Mutirikwi": {
    accommodation: { budget: 35, standard: 85, premium: 170 },
    mealsPerDay: { budget: 18, standard: 34, premium: 62 },
    localTransportPerDay: 18,
    anchorActivity: { budget: 20, standard: 45, premium: 90 },
    arrivalBuffer: 30
  },
  "Lake Chivero": {
    accommodation: { budget: 30, standard: 80, premium: 160 },
    mealsPerDay: { budget: 18, standard: 34, premium: 60 },
    localTransportPerDay: 16,
    anchorActivity: { budget: 15, standard: 35, premium: 70 },
    arrivalBuffer: 20
  }
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZW", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(amount);
}

export function estimateMinimumTripBudget(destination: string, days: number, style: TravelStyle) {
  const profile = destinationCostProfiles[destination] ?? destinationCostProfiles["Great Zimbabwe"];
  const safeDays = Number.isFinite(days) && days > 0 ? days : 1;
  const nights = Math.max(safeDays - 1, 0);
  const accommodation = profile.accommodation[style] * nights;
  const meals = profile.mealsPerDay[style] * safeDays;
  const localTransport = profile.localTransportPerDay * safeDays;
  const activity = profile.anchorActivity[style];
  const buffer = profile.arrivalBuffer;

  return Math.ceil((accommodation + meals + localTransport + activity + buffer) / 10) * 10;
}

function getGroupMultiplier(travelers: number) {
  if (travelers >= 30) return 0.9;
  if (travelers >= 15) return 0.92;
  if (travelers >= 8) return 0.95;
  return 1;
}

export function estimateGroupTripBudget(destination: string, days: number, style: TravelStyle, travelers: number) {
  const safeTravelers = Number.isFinite(travelers) && travelers > 0 ? Math.round(travelers) : 1;
  const perPerson = estimateMinimumTripBudget(destination, days, style);
  const groupMultiplier = getGroupMultiplier(safeTravelers);
  const total = Math.ceil((perPerson * safeTravelers * groupMultiplier) / 10) * 10;

  return {
    perPerson,
    total,
    travelers: safeTravelers,
    perPersonLabel: formatCurrency(perPerson),
    totalLabel: formatCurrency(total)
  };
}

export function evaluateTripBudget(destination: string, days: number, style: TravelStyle, budget: number, travelers = 1) {
  const groupEstimate = estimateGroupTripBudget(destination, days, style, travelers);
  const minimum = groupEstimate.total;
  const gap = Math.max(minimum - budget, 0);
  const isTooLow = gap > 0;

  return {
    minimum,
    perPersonMinimum: groupEstimate.perPerson,
    gap,
    isTooLow,
    minimumLabel: formatCurrency(minimum),
    perPersonMinimumLabel: groupEstimate.perPersonLabel,
    budgetLabel: formatCurrency(budget),
    gapLabel: formatCurrency(gap),
    message: isTooLow
      ? `This may be too low for ${travelers} traveler${travelers === 1 ? "" : "s"} on a ${days}-day ${style} trip to ${destination}. A safer starting budget is around ${formatCurrency(minimum)} total, about ${groupEstimate.perPersonLabel} per person. Please add about ${formatCurrency(gap)}, choose a shorter trip, or switch to Budget style if you are traveling locally.`
      : `This budget looks workable for ${travelers} traveler${travelers === 1 ? "" : "s"} on a ${days}-day ${style} trip to ${destination}.`
  };
}
