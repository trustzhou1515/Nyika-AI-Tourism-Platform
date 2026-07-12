export type TravelStyle = "budget" | "standard" | "premium";

export interface Destination {
  id: string;
  slug: string;
  name: string;
  region: string;
  category: string;
  image: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapNote: string;
  driveTimeFromHarare: string;
  nearestArrivalHub: string;
  highlights: string[];
  bestFor: string[];
  careTips: string[];
  clothingTips: string[];
  estimatedEntryFee: string;
  activities?: {
    title: string;
    description: string;
    image: string;
    note: string;
  }[];
  wildlifeStory?: {
    eyebrow: string;
    title: string;
    summary: string;
    body: string[];
    image: string;
    imageNote: string;
    sourceName: string;
  };
}

export interface PlannerRequest {
  destination: string;
  days: number;
  budget: string;
  travelers: number;
  interests: string;
  style: TravelStyle;
}

export interface ItineraryDay {
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  visitSuggestion: string;
  lunchSuggestion: string;
  breakSuggestion: string;
  dinnerSuggestion: string;
  staySuggestion: string;
}

export interface BusinessRecommendation {
  name: string;
  type: string;
  fit: string;
  priceLevel: string;
}

export interface BookingOption {
  title: string;
  type: "Accommodation" | "Airport Transfer" | "Taxi" | "Guide" | "Activity";
  description: string;
  actionLabel: string;
  paymentNote: string;
}

export interface ItineraryPlan {
  title: string;
  summary: string;
  conversationalBrief: string;
  destination: string;
  daysCount: number;
  totalBudget: string;
  travelers: number;
  perPersonBudget: string;
  style: TravelStyle;
  days: ItineraryDay[];
  budgetSplit: {
    accommodation: string;
    food: string;
    activities: string;
    transport: string;
    safety: string;
    entranceFees: string;
  };
  budgetBreakdown: {
    accommodation: string;
    food: string;
    activities: string;
    transport: string;
    entranceFees: string;
    contingency: string;
  };
  hiddenGems: string[];
  safetyTips: string[];
  smartWarnings: string[];
  businessRecommendations: BusinessRecommendation[];
  localGuide: BusinessRecommendation[];
  bookingOptions: BookingOption[];
  arrivalChecklist: string[];
  routeNotes: string[];
  generatedAt: string;
}
