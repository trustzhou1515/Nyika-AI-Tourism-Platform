import type { BookingOption, BusinessRecommendation, ItineraryPlan, PlannerRequest, TravelStyle } from "../types/tourism";
import { evaluateTripBudget } from "./budgetGuidance";

interface LocalStop {
  visit: string;
  lunch: string;
  breakStop: string;
  dinner: string;
  stay: string;
}

const styleBudgetRules: Record<TravelStyle, Record<"accommodation" | "food" | "activities" | "transport" | "entranceFees" | "contingency", number>> = {
  budget: {
    accommodation: 0.32,
    food: 0.18,
    activities: 0.18,
    transport: 0.16,
    entranceFees: 0.1,
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
    food: 0.2,
    activities: 0.2,
    transport: 0.1,
    entranceFees: 0.03,
    contingency: 0.02
  }
};

const destinationProfiles = {
  "Victoria Falls": {
    arrival: "Arrive, check in, then do a light rainforest walk after confirming current park times.",
    core: "Blend the Falls, Zambezi viewpoints, craft markets and a guided sunset activity.",
    departure: "Use the morning for a final viewpoint, local market stop and airport transfer buffer.",
    gems: ["Batoka Gorge viewpoint", "Chinotimba food stop", "Local craft cooperative", "Sunrise rainforest walk"],
    routeNotes: ["Best handled as a compact hub itinerary.", "Activity prices vary sharply between standard and premium operators."],
    localStops: [
      {
        visit: "Victoria Falls Rainforest walk early in the day before the heat and crowds build.",
        lunch: "Elephant's Walk / town center area for an easy lunch and craft-market browsing.",
        breakStop: "Lookout Cafe / Batoka Gorge area for a scenic pause after the Falls.",
        dinner: "Victoria Falls town restaurant strip or a lodge dinner close to your hotel.",
        stay: "Victoria Falls town hotel/lodge zone if the traveler wants quick access to the rainforest and activities."
      },
      {
        visit: "Zambezi River sunset cruise or river-edge activity after a slower morning.",
        lunch: "A lodge cafe or town restaurant before the afternoon river pickup.",
        breakStop: "Elephant's Walk Shopping & Artist Village for crafts, coffee and shade.",
        dinner: "Boma-style dinner or a lodge restaurant after the sunset activity.",
        stay: "River-facing lodge options for premium travelers, or town guesthouses for budget control."
      },
      {
        visit: "Adventure operator day: gorge swing, zipline, helicopter viewpoint or guided bridge-area activity.",
        lunch: "Keep lunch close to the activity desk so transfers do not eat into the day.",
        breakStop: "Return to the hotel pool or a shaded cafe after adrenaline activities.",
        dinner: "Quiet dinner in town because adventure days can run late.",
        stay: "Stay near town if multiple activities are booked with different operators."
      },
      {
        visit: "Craft markets, cultural village experience or Chinotimba food/community stop.",
        lunch: "Local food stop in Chinotimba or a verified community-hosted meal.",
        breakStop: "Hotel rest window before airport transfer or final evening activity.",
        dinner: "Final dinner near accommodation or at the airport-transfer side of town.",
        stay: "Airport-transfer friendly hotel zone for the last night."
      }
    ]
  },
  "Hwange National Park": {
    arrival: "Travel to the park edge, check in and do a late-afternoon game-drive briefing.",
    core: "Prioritize guided game drives, watering holes, birding and lodge-based rest windows.",
    departure: "Leave time for road transfer, fuel, snacks and a final short wildlife stop.",
    gems: ["Nyamandhlovu Pan", "Community craft stalls", "Hide-based birding stop", "Low-traffic sunrise drive"],
    routeNotes: ["Distances are long, so transport buffers matter.", "Use verified guides because park logistics can change quickly."],
    localStops: [
      {
        visit: "Main Camp orientation and an afternoon game drive toward nearby water points.",
        lunch: "Eat before entering deeper park roads or use the lodge/main-camp meal window.",
        breakStop: "Main Camp rest area for permits, bathrooms and guide coordination.",
        dinner: "Lodge dinner after the drive; avoid unnecessary night movement.",
        stay: "Main Camp area or a nearby safari lodge if the traveler wants practical park access."
      },
      {
        visit: "Nyamandhlovu Pan and nearby hides for elephants, plains game and photography.",
        lunch: "Packed safari lunch from the lodge so the day is not broken by long returns.",
        breakStop: "Shaded hide or lodge siesta break during the hottest part of the day.",
        dinner: "Campfire-style lodge dinner with guide debrief and next-day route planning.",
        stay: "Safari lodge near the selected gate or waterhole route."
      },
      {
        visit: "Sinamatella side or a quieter northern route if time and road conditions allow.",
        lunch: "Pre-packed lunch and extra water because distances are wider.",
        breakStop: "Viewpoint or safe rest point selected by the guide.",
        dinner: "Dinner close to accommodation; long transfers after dark are not ideal.",
        stay: "Sinamatella / northern-sector accommodation if the route is part of the plan."
      },
      {
        visit: "Morning birding and a short final game drive before departure.",
        lunch: "Lunch near the exit gate or on the road toward Victoria Falls/Bulawayo.",
        breakStop: "Fuel and snack stop before leaving the Hwange area.",
        dinner: "Destination-side dinner after transfer rather than stretching the park day.",
        stay: "Transit-friendly lodge if continuing to Victoria Falls or Bulawayo."
      }
    ]
  },
  "Great Zimbabwe": {
    arrival: "Arrive in Masvingo, check in and start with the museum for context.",
    core: "Explore the Hill Complex, Great Enclosure, local storytelling and Lake Mutirikwi add-ons.",
    departure: "Use the final morning for photos, crafts and a short heritage recap.",
    gems: ["Hill Complex golden-hour walk", "Local stone craft stop", "Lake Mutirikwi viewpoint", "Guided oral-history session"],
    routeNotes: ["Strong for school, culture and heritage travel.", "Pair with Masvingo accommodation rather than overloading the site day."],
    localStops: [
      {
        visit: "Great Zimbabwe Museum first, then the Great Enclosure for context before photos.",
        lunch: "Use a Masvingo town restaurant or a lodge meal before returning to the ruins.",
        breakStop: "Shaded museum/rest area after the Great Enclosure walk.",
        dinner: "Masvingo town dinner close to accommodation.",
        stay: "Masvingo hotel/lodge zone for easy access to the heritage site."
      },
      {
        visit: "Hill Complex early, when the climb is cooler and visibility is better.",
        lunch: "Simple packed lunch or a lodge lunch after descending from the Hill Complex.",
        breakStop: "Craft/vendor area near the site for a slower cultural stop.",
        dinner: "Quiet dinner near the hotel with time to review photos and history notes.",
        stay: "Accommodation close to the Great Zimbabwe turnoff if heritage is the main focus."
      },
      {
        visit: "Lake Mutirikwi viewpoint or recreational area as a softer nature add-on.",
        lunch: "Lake-side picnic or Masvingo lunch depending on weather and access.",
        breakStop: "Short scenic stop before returning to town.",
        dinner: "Masvingo town dinner before departure day.",
        stay: "Masvingo or Lake Mutirikwi-side lodge options after availability confirmation."
      },
      {
        visit: "Final guided storytelling session, school/group recap or craft stop.",
        lunch: "Lunch in Masvingo before the return drive.",
        breakStop: "Fuel, water and rest stop before leaving Masvingo.",
        dinner: "Dinner at the arrival city rather than trying to stretch the heritage day.",
        stay: "Transit-friendly accommodation if continuing to another destination."
      }
    ]
  },
  "Eastern Highlands": {
    arrival: "Arrive, check in and keep the first day gentle because mountain weather shifts fast.",
    core: "Mix Nyanga or Vumba walks, waterfalls, viewpoints, tea stops and quiet wellness time.",
    departure: "Plan a slow breakfast, short scenic stop and careful return-drive buffer.",
    gems: ["Vumba garden cafe", "Nyanga sunrise lookout", "Hidden waterfall walk", "Tea estate viewpoint"],
    routeNotes: ["Weather can change quickly in the mountains.", "Great for couples, wellness and nature-heavy trips."],
    localStops: [
      {
        visit: "Vumba botanical/garden route for gentle walking, flowers and misty viewpoints.",
        lunch: "Vumba cafe or garden-style lunch stop after the morning walk.",
        breakStop: "Coffee/tea pause near a viewpoint before returning to the lodge.",
        dinner: "Mutare or Vumba lodge dinner close to accommodation.",
        stay: "Vumba lodge/guesthouse area for wellness and garden access."
      },
      {
        visit: "Bvumba mountain viewpoints and forest-edge walks if weather is clear.",
        lunch: "Tea-room style lunch or lodge-packed meal depending on the route.",
        breakStop: "Short scenic stop before descending toward Mutare.",
        dinner: "Mutare dinner for easier access to supplies and transport.",
        stay: "Mutare-side hotel if the next day involves road transfers."
      },
      {
        visit: "Nyanga day trip: Worlds View or a waterfall route if the traveler wants more mountain drama.",
        lunch: "Troutbeck / Juliasdale lunch stop if driving toward Nyanga.",
        breakStop: "Safe scenic pull-off on the return route.",
        dinner: "Return to Vumba or Mutare before dark for dinner.",
        stay: "Stay in the same base if the trip is short; avoid changing lodges every night."
      },
      {
        visit: "Honde Valley / tea estate viewpoint day if road conditions and time allow.",
        lunch: "Tea estate or packed lunch stop after confirming access.",
        breakStop: "Viewpoint reset before the climb back into the highlands.",
        dinner: "Early dinner at the lodge because valley routes can be tiring.",
        stay: "Vumba or Mutare base after the valley day."
      }
    ]
  },
  "Chimanimani": {
    arrival: "Arrive through Mutare or Chimanimani village, check in and confirm weather, guide support and route safety.",
    core: "Focus on guided mountain hiking, waterfall walks, scenic viewpoints and quiet lodge recovery time.",
    departure: "Keep the final morning light with a village stop, breakfast and careful mountain-road buffer.",
    gems: ["Chimanimani mountain route", "Waterfall walk", "Village lodge meal", "Forest-edge viewpoint"],
    routeNotes: ["Use local guidance for hikes.", "Weather can shift quickly, so mornings are better for movement."],
    localStops: [
      {
        visit: "Guided Chimanimani mountain walk or viewpoint route, matched to fitness and weather.",
        lunch: "Packed lunch or lodge meal after the morning walk.",
        breakStop: "Village or lodge rest window before the afternoon cools.",
        dinner: "Dinner close to accommodation; avoid unnecessary night road movement.",
        stay: "Chimanimani village lodge or nearby guesthouse after confirming access."
      },
      {
        visit: "Waterfall or forest walk with a known route and local guidance.",
        lunch: "Simple local lunch or packed meal near the return point.",
        breakStop: "Scenic pause for photos before returning to the lodge.",
        dinner: "Early lodge dinner and next-day route check.",
        stay: "Same Chimanimani base to avoid changing accommodation during a short trip."
      }
    ]
  },
  "Vumba": {
    arrival: "Arrive through Mutare, check in and keep the first afternoon gentle around gardens or a lodge cafe.",
    core: "Use Vumba for botanical gardens, misty viewpoints, birding, cafes and calm mountain-lodge rest.",
    departure: "Use a short garden or coffee stop before descending toward Mutare or Harare.",
    gems: ["Vumba garden route", "Misty viewpoint", "Cafe lunch stop", "Forest-edge birding"],
    routeNotes: ["Great for wellness and couples.", "Mist and rain can affect viewpoints, so keep timing flexible."],
    localStops: [
      {
        visit: "Vumba garden route for flowers, walking paths and cool mountain air.",
        lunch: "Cafe or lodge lunch after the garden walk.",
        breakStop: "Misty viewpoint pause if the weather is clear.",
        dinner: "Vumba or Mutare dinner close to accommodation.",
        stay: "Vumba lodge or guesthouse for garden and viewpoint access."
      },
      {
        visit: "Forest-edge walk or birding-focused morning near the lodge route.",
        lunch: "Tea-room style lunch or simple Mutare meal depending on movement.",
        breakStop: "Coffee stop before the return drive.",
        dinner: "Early dinner because mountain roads can be harder after dark.",
        stay: "Mutare-side hotel if the next day needs easier road access."
      }
    ]
  },
  "Honde Valley": {
    arrival: "Arrive through Mutasa, Nyanga or Mutare and confirm the valley route before descending.",
    core: "Plan tea-estate scenery, green valley viewpoints, waterfall stops and slow road-trip photography.",
    departure: "Leave enough daylight for the climb back out of the valley or onward road movement.",
    gems: ["Tea estate viewpoint", "Green valley road", "Waterfall photo stop", "Local produce stop"],
    routeNotes: ["Road conditions matter after rain.", "Best handled as a daylight scenic route."],
    localStops: [
      {
        visit: "Tea estate and valley viewpoint route with local access guidance.",
        lunch: "Packed lunch or local stop after confirming services along the route.",
        breakStop: "Short viewpoint reset before continuing through the valley.",
        dinner: "Dinner back toward Mutare, Vumba or Nyanga before it gets too late.",
        stay: "Mutare, Vumba or Nyanga base depending on the wider route."
      },
      {
        visit: "Waterfall and green scenery route if road and weather conditions allow.",
        lunch: "Simple meal stop or lodge-packed lunch.",
        breakStop: "Photo pause near a safe valley viewpoint.",
        dinner: "Early dinner close to accommodation after the valley day.",
        stay: "Same base as previous night for easier logistics."
      }
    ]
  },
  "Mavuradonha Mountains": {
    arrival: "Arrive through Harare, Centenary or Muzarabani access routes, then confirm local guidance, road conditions and the safe entry point before moving deeper into the mountains.",
    core: "Use Mavuradonha for rugged mountain scenery, wilderness walking, photography, birdlife and a quieter protected-area experience.",
    departure: "Leave early enough for daylight driving, fuel and rest stops because services can be limited on remote routes.",
    gems: ["Mountain wilderness walk", "Centenary access route", "Scenic nature drive", "Birdlife and quiet viewpoints"],
    routeNotes: ["Confirm access and local guidance before travelling.", "Best for travellers who want a quieter mountain trip rather than a busy resort route."],
    localStops: [
      {
        visit: "Guided mountain wilderness walk or scenic viewpoint route, matched to road conditions and daylight.",
        lunch: "Packed lunch or simple local stop before entering quieter areas.",
        breakStop: "Safe viewpoint reset with water and weather check before continuing.",
        dinner: "Early dinner close to the overnight base rather than driving remote roads at night.",
        stay: "Centenary, Muzarabani-access lodge/guesthouse or verified nearby rural stay."
      },
      {
        visit: "Nature drive and photography route through rugged terrain and protected-area edges.",
        lunch: "Packed meal or confirmed local meal stop depending on access.",
        breakStop: "Short rest stop before the return drive, with fuel and water checked.",
        dinner: "Dinner near the base or on the Harare return route.",
        stay: "Same base as previous night if doing more than one wilderness day."
      }
    ]
  },
  "Binga": {
    arrival: "Arrive at Binga town or lakefront lodge, check in and confirm lake-safety details before any boat activity.",
    core: "Use Binga for lake views, fishing, Tonga culture, sunset time and warm-weather relaxation.",
    departure: "Plan an early departure or short lake-view stop because road distances can be long.",
    gems: ["Quiet lake sunset", "Tonga culture stop", "Fishing operator", "Lakefront lodge meal"],
    routeNotes: ["Boat safety and verified operators matter.", "Heat, fuel, water and road timing should be planned carefully."],
    localStops: [
      {
        visit: "Lakefront orientation and verified fishing or boat-operator check.",
        lunch: "Lakefront lodge lunch or town meal before the hotter afternoon.",
        breakStop: "Shade and rest window near accommodation.",
        dinner: "Sunset lake-view dinner close to the lodge.",
        stay: "Binga town or lakefront lodge area."
      },
      {
        visit: "Tonga culture or local craft/community stop with respectful local guidance.",
        lunch: "Simple local meal or lodge lunch after the cultural visit.",
        breakStop: "Short lake-view photo stop before evening.",
        dinner: "Fish or lodge dinner near accommodation.",
        stay: "Same Binga base for easier lake movement."
      }
    ]
  },
  "Nyanga": {
    arrival: "Arrive through the Eastern Highlands, check in and do a short scenic orientation loop.",
    core: "Focus on mountain views, waterfalls, trout areas, hiking and cool-weather picnic stops.",
    departure: "Keep the last morning open for a short walk and a careful return drive.",
    gems: ["Worlds View", "Pungwe viewpoint", "Quiet waterfall trail", "Local trout stop"],
    routeNotes: ["Pack warm layers even outside winter.", "Best with flexible timing because mist can affect viewpoints."],
    localStops: [
      {
        visit: "Worlds View for the escarpment lookout, especially if the morning is clear.",
        lunch: "Troutbeck area for a relaxed lunch stop before moving deeper into the park.",
        breakStop: "Santa's Grotto / Troutbeck village area for crafts, snacks and a short reset.",
        dinner: "Return toward Troutbeck or Juliasdale for an early dinner because mountain roads get dark quickly.",
        stay: "Troutbeck Resort or a nearby Nyanga lodge if the traveler wants comfort and lake views."
      },
      {
        visit: "Nyanga National Park: Rhodes Dam, Mare Dam and the nearby trout/fishing areas.",
        lunch: "Pack a picnic near Rhodes Dam or use a lodge restaurant after confirming opening times.",
        breakStop: "Nyangombe natural swimming pool area for a gentle afternoon pause if conditions are suitable.",
        dinner: "Rhodes Nyanga Hotel area for a heritage-style dinner option after the park loop.",
        stay: "Rhodes, Mare or Udu rest camp for self-catering travelers who want to stay inside the park."
      },
      {
        visit: "Mount Nyangani trail or a shorter viewpoint walk depending on weather and fitness.",
        lunch: "Light packed lunch, water and warm layers; keep the meal simple for hiking days.",
        breakStop: "Pungwe viewpoint or a safe roadside scenic pull-off on the return loop.",
        dinner: "Juliasdale / Nyanga village dinner stop after the hike, with a simple warm meal.",
        stay: "Montclair Hotel & Casino area or a Juliasdale lodge for easier road access."
      },
      {
        visit: "Mutarazi Falls viewpoint for the big waterfall experience and Honde Valley views.",
        lunch: "Carry lunch or pre-book at the nearest verified lodge because services are spread out.",
        breakStop: "Pungwe Drift or a scenic tea/coffee pause on the southern route.",
        dinner: "Return to the lodge early and keep dinner close to accommodation.",
        stay: "Pungwe Drift lodges or park-linked accommodation after availability confirmation."
      }
    ]
  },
  "Lake Kariba": {
    arrival: "Arrive, settle near the lake and confirm boat-safety details before sunset.",
    core: "Combine lake viewpoints, boat cruises, fishing, wildlife edges and relaxed waterfront meals.",
    departure: "Use the final morning for a short lake activity and leave before late heat or storms.",
    gems: ["Kariba Heights viewpoint", "Local fish meal", "Quiet marina sunset", "Matusadona day-trip planning desk"],
    routeNotes: ["Boat operators must be verified before payment.", "Heat, fuel and water planning are part of the experience."],
    localStops: [
      {
        visit: "Kariba Heights viewpoint for lake photos and orientation.",
        lunch: "Town or lodge lunch before the afternoon heat builds.",
        breakStop: "Marina-side pause to confirm boat operators and safety details.",
        dinner: "Lake-facing lodge dinner or town restaurant close to accommodation.",
        stay: "Kariba town/lakefront lodge area for easy marina and viewpoint access."
      },
      {
        visit: "Sunset boat cruise or short lake activity with a verified operator.",
        lunch: "Light lunch near the lodge before boarding.",
        breakStop: "Hotel pool/rest window after the cruise or fishing session.",
        dinner: "Fresh fish dinner option if available and verified locally.",
        stay: "Lakefront lodge if sunsets and slow travel are the priority."
      },
      {
        visit: "Fishing morning or Matusadona planning desk/day-trip option if budget allows.",
        lunch: "Packed lunch for boat days; keep water and sun protection high.",
        breakStop: "Return to accommodation for a heat break.",
        dinner: "Quiet dinner close to the lodge after a water-heavy day.",
        stay: "Same lodge for continuity; Kariba works better without changing bases daily."
      },
      {
        visit: "Final marina walk, souvenir stop or short viewpoint before departure.",
        lunch: "Early lunch in town before the road transfer.",
        breakStop: "Fuel, water and snack stop before leaving Kariba.",
        dinner: "Dinner at the next destination rather than pushing late on the road.",
        stay: "Transit stop if continuing toward Harare or another long route."
      }
    ]
  }
} as const;

function parseBudgetAmount(budget: string) {
  const cleaned = budget.replace(/[^0-9.]/g, "");
  const amount = Number(cleaned);
  return Number.isFinite(amount) && amount > 0 ? amount : 500;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-ZW", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

const wildlifeReserveDestinations = new Set([
  "Mana Pools National Park",
  "Matobo National Park",
  "Gonarezhou National Park",
  "Mbizi Game Park",
  "Haka Game Park",
  "Mukuvisi Woodlands"
]);

const waterfallDestinations = new Set([
  "Mtarazi Falls",
  "Bridalveil Falls",
  "Inyangombe Falls",
  "Pungwe Falls"
]);

const caveDestinations = new Set([
  "Chinhoyi Caves",
  "Domboshava Caves"
]);

const lakeDestinations = new Set([
  "Lake Mutirikwi",
  "Lake Chivero"
]);

const cultureDestinations = new Set([
  "Chiremba Balancing Rocks",
  "Khami Ruins",
  "National Gallery of Zimbabwe",
  "National Heroes Acre",
  "The Boma Dinner & Drum Show",
  "Chitungwiza Arts Centre"
]);

function getProfile(destination: string) {
  const profile = destinationProfiles[destination as keyof typeof destinationProfiles];
  if (profile) return profile;

  if (lakeDestinations.has(destination)) {
    return {
      arrival: `Arrive near ${destination}, confirm access points, current fees, water-safety rules and available food or picnic options before starting the visit.`,
      core: "Focus on lake viewpoints, picnic time, safe water-side movement, birding or fishing where allowed, and a simple meal plan close to the route.",
      departure: "Use the final morning for a short lake-view stop, photos and a careful return drive with enough daylight.",
      gems: ["Lake viewpoint", "Picnic stop", "Birding or fishing", "Sunset photo moment"],
      routeNotes: ["Use verified operators for boat or fishing activities.", "Keep children and groups away from unsafe water edges."],
      localStops: [
        {
          visit: `${destination} viewpoint, picnic or approved recreational area.`,
          lunch: "Packed lunch, park picnic or nearby verified restaurant depending on access rules.",
          breakStop: "Shaded rest point after the lake walk or viewpoint stop.",
          dinner: "Dinner close to the nearest town or accommodation base.",
          stay: `Accommodation near ${destination} or the nearest practical city/town base.`
        },
        {
          visit: `${destination} birding, fishing or short family-friendly lake route.`,
          lunch: "Simple local meal or packed lunch after confirming what is allowed.",
          breakStop: "Safe water-side photo stop before leaving.",
          dinner: "Keep evening movement simple and close to accommodation.",
          stay: "Same base if the visit is short, to avoid unnecessary transfers."
        }
      ]
    };
  }

  if (caveDestinations.has(destination)) {
    return {
      arrival: `Arrive at ${destination}, confirm current opening times, entry fees, guide rules and safe walking areas before starting the visit.`,
      core: "Focus on cave viewpoints, rock shelters, guided walking, photography, heritage context and enough rest time so the visit feels easy.",
      departure: "Use the final morning for a short photo stop, cafe/lunch pause or nearby Harare/Chinhoyi movement before returning.",
      gems: ["Cave viewpoint", "Guided rock walk", "Photography stop", "Picnic or cafe pause"],
      routeNotes: ["Confirm current access rules before travel.", "Cave and rock areas can be slippery, so use shoes with grip."],
      localStops: [
        {
          visit: `${destination} main cave, rock shelter or viewpoint route with guide or site-staff guidance where available.`,
          lunch: "Use a nearby verified restaurant, picnic area or packed lunch depending on site rules.",
          breakStop: "Shaded rest point after the main cave or rock walk.",
          dinner: "Dinner back toward Harare, Chinhoyi or the stay area to avoid late road movement.",
          stay: `Accommodation near ${destination} or a practical Harare/Chinhoyi base.`
        },
        {
          visit: `${destination} photography and cultural/geological learning route.`,
          lunch: "Simple local meal or packed lunch after confirming what is allowed.",
          breakStop: "Visitor area or safe viewpoint pause before leaving.",
          dinner: "Keep evening movement simple and close to accommodation.",
          stay: "Same base if the visit is short, to avoid unnecessary transfers."
        }
      ]
    };
  }

  if (cultureDestinations.has(destination)) {
    return {
      arrival: `Arrive at ${destination}, confirm opening times, access rules and any guide or booking requirements.`,
      core: "Focus on heritage interpretation, art or cultural learning, slow food stops and enough time to understand the place beyond photos.",
      departure: "Use the final morning for a short cultural stop, shopping or reflection before returning.",
      gems: ["Guided interpretation", "Local art/storytelling", "Museum or monument stop", "Cafe/food pause"],
      routeNotes: ["Confirm opening times before travel.", "Some cultural sites need respectful conduct and photography rules."],
      localStops: [
        {
          visit: `${destination} guided or self-guided cultural visit.`,
          lunch: "Use a nearby verified cafe, lodge or city restaurant after the main visit.",
          breakStop: "Short rest stop for photos, notes or shopping where appropriate.",
          dinner: "Dinner close to accommodation or the next transfer point.",
          stay: `Accommodation near ${destination} or the nearest practical city/town base.`
        },
        {
          visit: `${destination} learning, art, monument or heritage-focused experience.`,
          lunch: "Local meal or packed lunch depending on the site rules.",
          breakStop: "Visitor area, gallery shop, craft stop or shaded rest point.",
          dinner: "Keep evening movement simple and close to the stay area.",
          stay: "Same base if the visit is short, to avoid unnecessary transfers."
        }
      ]
    };
  }

  if (waterfallDestinations.has(destination)) {
    return {
      arrival: `Arrive near ${destination}, check weather, access and safe viewpoint conditions before starting the waterfall visit.`,
      core: "Focus on waterfall viewpoints, short hikes, photography, safe rest stops and early dinner close to the stay area.",
      departure: "Use the final morning for a short scenic stop, photos and a careful mountain-road return buffer.",
      gems: ["Waterfall viewpoint", "Short nature walk", "Picnic/photo stop", "Mountain lodge meal"],
      routeNotes: ["Waterfall routes can be slippery after rain.", "Start early because mist and darkness affect safety."],
      localStops: [
        {
          visit: `${destination} main viewpoint or guided waterfall walk.`,
          lunch: "Packed lunch, lodge meal or nearby verified stop depending on the route.",
          breakStop: "Safe scenic pause away from slippery edges.",
          dinner: "Early dinner close to accommodation after the waterfall visit.",
          stay: `Nearest practical lodge or town base for ${destination}.`
        },
        {
          visit: `${destination} photography and surrounding nature route.`,
          lunch: "Simple local lunch or packed meal after checking access.",
          breakStop: "Short viewpoint reset before returning by daylight.",
          dinner: "Keep dinner close to the lodge or town base.",
          stay: "Same base if the trip is short, to avoid unnecessary night driving."
        }
      ]
    };
  }

  if (wildlifeReserveDestinations.has(destination)) {
    return {
      arrival: `Arrive at ${destination}, confirm entry times, guide needs and safe movement rules before starting activities.`,
      core: "Prioritize wildlife viewing, guided interpretation, nature photography, rest breaks and realistic travel buffers.",
      departure: "Use the final morning for a short nature stop, photos and a careful return-transfer buffer.",
      gems: ["Guided wildlife viewing", "Birding stop", "Family nature walk", "Scenic picnic/rest point"],
      routeNotes: ["Confirm opening times before travel.", "Use verified guides or staff instructions around wildlife."],
      localStops: [
        {
          visit: `${destination} guided wildlife or nature viewing route.`,
          lunch: "Use a lodge, picnic area or nearby verified restaurant depending on the destination rules.",
          breakStop: "Shaded rest point or visitor area after the main wildlife activity.",
          dinner: "Dinner close to accommodation or back in the nearest town.",
          stay: `Accommodation near ${destination} or the nearest practical town base.`
        },
        {
          visit: `${destination} birding, photography or short family-friendly nature stop.`,
          lunch: "Simple packed lunch or local meal after confirming what is allowed.",
          breakStop: "Visitor center, picnic area or safe viewpoint pause.",
          dinner: "Keep evening movement simple and close to the stay area.",
          stay: "Same base if the visit is short, to avoid unnecessary transfers."
        }
      ]
    };
  }

  return destinationProfiles["Victoria Falls"];
}

function getLocalStop(profile: ReturnType<typeof getProfile>, index: number): LocalStop {
  if ("localStops" in profile && profile.localStops.length > 0) {
    return profile.localStops[index % profile.localStops.length];
  }

  return {
    visit: profile.core,
    lunch: "Use a nearby verified restaurant or lodge stop close to the main attraction.",
    breakStop: "Take a short scenic pause before moving to the next activity.",
    dinner: "Keep dinner close to accommodation to avoid unnecessary night travel.",
    stay: "Choose a verified stay partner near the next morning's activity."
  };
}

function inferInterestTags(interests: string) {
  const lowered = interests.toLowerCase();
  return {
    wildlife: /wildlife|safari|animal|game|elephant|rhino|lion/.test(lowered),
    culture: /culture|heritage|history|museum|story/.test(lowered),
    family: /family|kids|children/.test(lowered),
    adventure: /adventure|hike|rafting|zip|extreme|bungee|skywalk|gorge/.test(lowered),
    wellness: /wellness|rest|retreat|quiet|relax/.test(lowered),
    water: /water|swim|swimming|pool|lake|boat|cruise|canoe|river|fishing|fish/.test(lowered),
    fishing: /fishing|fish|angling|tiger fishing/.test(lowered),
    hunting: /hunting|hunt|professional hunter|trophy hunting|game hunting/.test(lowered)
  };
}

function createWarnings(request: PlannerRequest, totalBudget: number) {
  const warnings: string[] = [];
  const perDay = totalBudget / request.days;
  const interests = inferInterestTags(request.interests);
  const budgetCheck = evaluateTripBudget(request.destination, request.days, request.style, totalBudget, request.travelers ?? 1);

  if (budgetCheck.isTooLow) {
    warnings.push(`Kind budget check: ${budgetCheck.message}`);
  }

  if (request.style === "premium" && perDay < 180) {
    warnings.push("Premium travel may feel tight at this budget; prioritize accommodation and one signature activity.");
  }

  if (request.style === "budget" && perDay > 250) {
    warnings.push("Budget style with this spend leaves room for one comfort upgrade without changing the plan.");
  }

  if (request.days <= 2 && interests.wildlife) {
    warnings.push("Wildlife trips need travel buffers; avoid packing too many game-drive sessions into a short stay.");
  }

  if (interests.hunting) {
    warnings.push("Hunting is strictly regulated: use licensed professional operators only, confirm permits, and treat national parks as wildlife-viewing areas.");
  }

  if (interests.water) {
    warnings.push("For water activities, use verified operators, wear life jackets where required and avoid unsafe river or lake edges.");
  }

  if (/kariba|hwange/i.test(request.destination)) {
    warnings.push("Confirm transport, fuel and operator availability before accepting bookings.");
  }

  if (warnings.length === 0) {
    warnings.push("Plan looks balanced for the selected budget, duration and travel style.");
  }

  return warnings;
}

function createBusinessRecommendations(request: PlannerRequest): BusinessRecommendation[] {
  const interests = inferInterestTags(request.interests);
  const priceLevel = request.style === "premium" ? "$$$" : request.style === "budget" ? "$" : "$$";
  const base: BusinessRecommendation[] = [
    {
      name: `${request.destination} verified stay partner`,
      type: "Accommodation",
      fit: `${request.style} rooms close to the core itinerary route`,
      priceLevel
    },
    {
      name: `${request.destination} local transfer desk`,
      type: "Transport",
      fit: "Point-to-point transfers with tourist support and pickup coordination",
      priceLevel: request.style === "premium" ? "$$$" : "$$"
    }
  ];

  if (interests.wildlife) {
    base.push({
      name: "Licensed safari guide",
      type: "Guide",
      fit: "Wildlife interpretation, safety briefing and route timing",
      priceLevel
    });
  }

  if (interests.hunting) {
    base.push({
      name: "Licensed professional hunting operator",
      type: "Regulated activity",
      fit: "Permit guidance, legal area checks, safety controls and conservation compliance",
      priceLevel: "$$$"
    });
  }

  if (interests.fishing) {
    base.push({
      name: "Verified fishing and boat operator",
      type: "Activity",
      fit: "Boat safety, gear guidance, local rules and lake timing",
      priceLevel
    });
  }

  if (interests.culture) {
    base.push({
      name: "Community heritage host",
      type: "Experience",
      fit: "Storytelling, craft stops and respectful cultural context",
      priceLevel: "$"
    });
  }

  if (interests.adventure) {
    base.push({
      name: "Adventure activity operator",
      type: "Activities",
      fit: "Bookable experiences matched to energy level and budget",
      priceLevel
    });
  }

  return base.slice(0, 4);
}

function createLocalGuide(request: PlannerRequest): BusinessRecommendation[] {
  const guideByDestination: Record<string, BusinessRecommendation[]> = {
    "Victoria Falls": [
      {
        name: "Victoria Falls Rainforest / park gate area",
        type: "Main visit anchor",
        fit: "Best first stop for the Falls walk, photos and orientation.",
        priceLevel: "$$"
      },
      {
        name: "Elephant's Walk / town center area",
        type: "Lunch, crafts and easy break",
        fit: "Useful for lunch, gifts, coffee and a gentle reset between activities.",
        priceLevel: request.style === "premium" ? "$$" : "$"
      },
      {
        name: "Lookout Cafe / Batoka Gorge area",
        type: "Scenic break and dinner option",
        fit: "Strong for gorge views, sundowners and a memorable non-rushed stop.",
        priceLevel: "$$"
      },
      {
        name: "Zambezi river/lodge zone",
        type: "Sunset and stay base",
        fit: "Good for cruises, premium dinners and river-facing accommodation.",
        priceLevel: request.style === "budget" ? "$$" : "$$$"
      }
    ],
    "Hwange National Park": [
      {
        name: "Main Camp area",
        type: "Park entry, stay and logistics base",
        fit: "Useful for permits, guides, bathrooms, meals and first game-drive planning.",
        priceLevel: "$$"
      },
      {
        name: "Nyamandhlovu Pan route",
        type: "Wildlife and photography anchor",
        fit: "Strong elephant and water-point day when paired with a packed lunch.",
        priceLevel: "$$"
      },
      {
        name: "Safari lodge near selected gate",
        type: "Stay and dinner base",
        fit: "Keeps drives practical and avoids long night movements.",
        priceLevel: request.style === "premium" ? "$$$" : "$$"
      },
      {
        name: "Sinamatella / northern-sector option",
        type: "Extended route",
        fit: "Better for longer trips where quieter routes and broader landscapes matter.",
        priceLevel: "$$"
      }
    ],
    "Great Zimbabwe": [
      {
        name: "Great Zimbabwe Museum",
        type: "Context first stop",
        fit: "Sets up the history before the Great Enclosure and Hill Complex.",
        priceLevel: "$"
      },
      {
        name: "Great Enclosure and Hill Complex",
        type: "Main heritage walk",
        fit: "The core visit for photos, guided explanation and national heritage context.",
        priceLevel: "$$"
      },
      {
        name: "Masvingo town restaurant/hotel zone",
        type: "Lunch, dinner and stay base",
        fit: "Practical for meals and accommodation without overloading the heritage site.",
        priceLevel: request.style === "premium" ? "$$" : "$"
      },
      {
        name: "Lake Mutirikwi viewpoint area",
        type: "Nature add-on",
        fit: "Good softer afternoon after a heavy culture/history morning.",
        priceLevel: "$"
      }
    ],
    "Eastern Highlands": [
      {
        name: "Vumba garden and cafe route",
        type: "Wellness, lunch and soft walking",
        fit: "Good first-day pacing with flowers, mist and gentle viewpoints.",
        priceLevel: "$$"
      },
      {
        name: "Mutare base",
        type: "Supplies, dinner and transfer access",
        fit: "Practical when travelers need road access, restaurants and a simpler base.",
        priceLevel: "$"
      },
      {
        name: "Nyanga day-trip route",
        type: "Mountain drama add-on",
        fit: "Works for travelers who want Worlds View, waterfalls or highland photos.",
        priceLevel: "$$"
      },
      {
        name: "Honde Valley / tea viewpoint option",
        type: "Scenic extended day",
        fit: "Best when road conditions and time allow a longer, greener loop.",
        priceLevel: "$$"
      }
    ],
    "Nyanga": [
      {
        name: "Troutbeck Resort / Troutbeck area",
        type: "Stay, lunch and lake-view base",
        fit: "Good for comfort, meals, fishing atmosphere and easy access to Worlds View.",
        priceLevel: request.style === "budget" ? "$$" : "$$$"
      },
      {
        name: "Rhodes, Mare or Udu rest camps",
        type: "Self-catering park accommodation",
        fit: "Useful for travelers who want to stay inside Nyanga National Park and move between dams, waterfalls and trails.",
        priceLevel: "$$"
      },
      {
        name: "Rhodes Nyanga Hotel area",
        type: "Heritage stay and dinner stop",
        fit: "Works well after Rhodes Dam, park loops and heritage-focused days.",
        priceLevel: "$$"
      },
      {
        name: "Juliasdale / Nyanga village stops",
        type: "Road break, dinner and supplies",
        fit: "Practical for refueling, simple meals, warm clothing checks and route resets.",
        priceLevel: "$"
      }
    ],
    "Mavuradonha Mountains": [
      {
        name: "Centenary / Muzarabani access route",
        type: "Arrival, supplies and route check",
        fit: "Useful before entering quieter mountain areas where services and directions need planning.",
        priceLevel: "$"
      },
      {
        name: "Guided wilderness walk",
        type: "Mountain activity",
        fit: "The best fit for travellers who want rugged terrain, nature and safe local context.",
        priceLevel: "$$"
      },
      {
        name: "Scenic viewpoint drive",
        type: "Photography and soft adventure",
        fit: "Good for visitors who want mountain scenery without a heavy multi-day hike.",
        priceLevel: "$$"
      },
      {
        name: "Verified rural lodge or guesthouse base",
        type: "Stay and dinner base",
        fit: "Keeps the trip practical by reducing night driving on remote roads.",
        priceLevel: request.style === "premium" ? "$$" : "$"
      }
    ],
    "Lake Kariba": [
      {
        name: "Kariba Heights viewpoint",
        type: "Orientation and photo stop",
        fit: "Best first stop for lake scale, photos and route context.",
        priceLevel: "$"
      },
      {
        name: "Marina / verified boat operator area",
        type: "Cruise, fishing and activity desk",
        fit: "Use this for safety checks, boat bookings and sunset cruise planning.",
        priceLevel: request.style === "premium" ? "$$$" : "$$"
      },
      {
        name: "Lakefront lodge zone",
        type: "Stay, dinner and rest base",
        fit: "Keeps meals and activities close during hot afternoons.",
        priceLevel: request.style === "budget" ? "$$" : "$$$"
      },
      {
        name: "Matusadona planning desk / day-trip option",
        type: "Wildlife add-on",
        fit: "Best for higher-budget or longer itineraries that can handle water logistics.",
        priceLevel: "$$$"
      }
    ]
  };

  return guideByDestination[request.destination] ?? createBusinessRecommendations(request);
}

function createConversationalBrief(request: PlannerRequest) {
  const briefs: Record<string, string> = {
    "Victoria Falls": "For Victoria Falls, I would keep it compact and experience-led: do the rainforest walk early, pause around town or Elephant's Walk, then use the late afternoon for the Zambezi, gorge views or a lodge dinner.",
    "Hwange National Park": "For Hwange, I would plan like a safari guide: early drives, packed lunches, hot-afternoon rest, and dinners at the lodge so you are not moving around the park after dark.",
    "Great Zimbabwe": "For Great Zimbabwe, I would make the trip educational but relaxed: museum first, Great Enclosure and Hill Complex when it is cooler, then Masvingo or Lake Mutirikwi for food and a slower afternoon.",
    "Chiremba Balancing Rocks": "For Chiremba Balancing Rocks, I would keep it as a clean Harare-area heritage outing: arrive early, photograph Domboremari and the granite formations, take a short guided walk, then finish with lunch or dinner back toward Harare.",
    "Chinhoyi Caves": "For Chinhoyi Caves, I would plan it as a blue-pool cave day: arrive early from Harare, view the Sleeping Pool and Dark Cave carefully, pause for lunch, and only treat diving as a specialist operator activity.",
    "Domboshava Caves": "For Domboshava, I would plan it as a short Harare-area rocks-and-caves trip: rock art first, granite dome walk next, then a sunset viewpoint if there is enough daylight to descend safely.",
    "Eastern Highlands": "For the Eastern Highlands, I would plan it as a soft mountain loop: gardens, cafes, waterfalls, viewpoints and early dinners because mist and road conditions can change quickly.",
    "Chimanimani": "For Chimanimani, I would plan it around guided mountain movement: clear mornings for hikes or waterfalls, slow lunches, and early dinners because weather and mountain roads need respect.",
    "Vumba": "For Vumba, I would keep it calm and premium-feeling: gardens, misty viewpoints, cafe stops and lodge rest without rushing the mountain roads.",
    "Honde Valley": "For Honde Valley, I would treat the valley as a scenic daylight route: tea views, waterfall photos, slower driving and enough time to return before dark.",
    "Binga": "For Binga, I would let the lake set the pace: safe boat or fishing plans, Tonga culture, shade breaks and a sunset meal close to the water.",
    "Nyanga": "For Nyanga, I would plan it like a mountain conversation: clear mornings for viewpoints, slow lunches near Troutbeck or the park, short scenic breaks, then dinner close to your lodge before the roads get dark.",
    "Mavuradonha Mountains": "For Mavuradonha, I would plan it as a quiet mountain-wilderness trip: confirm local access first, move in daylight, carry supplies, use guided walks, and keep dinners close to the overnight base.",
    "Lake Kariba": "For Kariba, I would make the lake set the pace: viewpoint first, boat safety confirmed early, heat breaks in the afternoon, then sunset or fish dinner close to the water.",
    "Lake Mutirikwi": "For Lake Mutirikwi, I would pair the water with Masvingo and Great Zimbabwe: a lake viewpoint or picnic, simple lunch, then a calm return to town before dark.",
    "Lake Chivero": "For Lake Chivero, I would keep it as a simple Harare-area lake day: picnic, birding, safe water-side photos, and an easy return before evening traffic."
  };

  return briefs[request.destination] ?? "I would plan this around one strong activity per day, nearby food stops, realistic travel buffers and verified operators.";
}

function createBookingOptions(request: PlannerRequest): BookingOption[] {
  const stayZoneByDestination: Record<string, string> = {
    "Victoria Falls": "Victoria Falls town, river/lodge zone or airport-transfer friendly hotel area",
    "Hwange National Park": "Main Camp area, selected gate lodge or safari lodge near the planned drive route",
    "Great Zimbabwe": "Masvingo hotel/lodge zone or accommodation close to the Great Zimbabwe turnoff",
    "Chiremba Balancing Rocks": "Harare, Epworth-access guesthouse area or city hotel close to Chiremba Road movement",
    "Chinhoyi Caves": "Chinhoyi town, Harare stopover hotel or A1 road-trip accommodation base",
    "Domboshava Caves": "Harare city hotel, Borrowdale/north Harare guesthouse or Domboshava-access stay",
    "Eastern Highlands": "Vumba, Mutare or Nyanga base depending on the route",
    "Chimanimani": "Chimanimani village lodge or nearby mountain guesthouse",
    "Vumba": "Vumba lodge, garden guesthouse or Mutare-side hotel",
    "Honde Valley": "Mutare, Vumba, Nyanga or valley-access lodge base",
    "Binga": "Binga town, lakefront lodge or fishing camp area",
    "Nyanga": "Troutbeck area, Rhodes/Mare/Udu rest camps, Juliasdale or Nyanga village",
    "Mavuradonha Mountains": "Centenary, Muzarabani-access lodge/guesthouse or verified rural stay near the planned route",
    "Lake Kariba": "Kariba town, lakefront lodge zone or marina-adjacent accommodation",
    "Lake Mutirikwi": "Masvingo town, Lake Mutirikwi-side lodge option or Great Zimbabwe route accommodation",
    "Lake Chivero": "Harare city hotel, west Harare guesthouse or Lake Chivero day-trip base"
  };

  const airportByDestination: Record<string, string> = {
    "Victoria Falls": "Victoria Falls Airport pickup to hotel/lodge",
    "Hwange National Park": "Victoria Falls Airport or Bulawayo transfer toward Hwange",
    "Great Zimbabwe": "Harare/Bulawayo road transfer or Masvingo pickup coordination",
    "Chiremba Balancing Rocks": "Harare city pickup or Robert Gabriel Mugabe International Airport transfer toward Epworth/Chiremba Road",
    "Chinhoyi Caves": "Harare-to-Chinhoyi A1 road transfer or Chinhoyi town pickup",
    "Domboshava Caves": "Harare city pickup toward Domboshava road and return transfer",
    "Eastern Highlands": "Harare-to-Mutare transfer or Mutare local taxi coordination",
    "Chimanimani": "Harare-to-Mutare/Chimanimani road transfer or Mutare pickup",
    "Vumba": "Harare-to-Mutare transfer or Vumba local taxi coordination",
    "Honde Valley": "Mutare/Honde Valley day transfer or valley route driver",
    "Binga": "Binga road transfer, lake lodge pickup or wider Kariba/Vic Falls route transfer",
    "Nyanga": "Harare-to-Nyanga road transfer or Mutare/Nyanga taxi coordination",
    "Mavuradonha Mountains": "Harare-to-Centenary/Muzarabani road transfer with local route guidance",
    "Lake Kariba": "Harare-to-Kariba road transfer or Kariba local pickup",
    "Lake Mutirikwi": "Harare/Bulawayo-to-Masvingo road transfer and lake local pickup",
    "Lake Chivero": "Harare city pickup toward Lake Chivero and return transfer"
  };

  return [
    {
      title: `Reserve accommodation in ${stayZoneByDestination[request.destination] ?? request.destination}`,
      type: "Accommodation",
      description: "Send travel dates, room count, budget level and preferred area so the platform can hold matching stay options before arrival.",
      actionLabel: "Request stay options",
      paymentNote: "Request flow: operator confirmation first, then deposit or full payment when payment integration is enabled."
    },
    {
      title: airportByDestination[request.destination] ?? `${request.destination} arrival transfer`,
      type: "Airport Transfer",
      description: "Pre-book a verified driver with arrival time, flight/bus details, passenger count and luggage notes.",
      actionLabel: "Book airport transfer",
      paymentNote: "Request flow: pickup details are captured now, with prepaid vouchers and driver assignment ready for integration."
    },
    {
      title: `${request.destination} local taxi / day movement`,
      type: "Taxi",
      description: "Request a local taxi for dinner, short hops, market visits or moving between hotel and activity pickup points.",
      actionLabel: "Request local taxi",
      paymentNote: "Request flow: captures taxi need now, with fare estimate, driver rating and pay-in-app support ready for integration."
    },
    {
      title: `${request.destination} guide or activity booking`,
      type: request.destination === "Hwange National Park" ? "Guide" : "Activity",
      description: "Reserve guided activities, park support, cruises, hikes or heritage interpretation matched to the itinerary.",
      actionLabel: "Request guide/activity",
      paymentNote: "Request flow: captures guide/activity demand now, with deposit, confirmation and itinerary sync ready for integration."
    }
  ];
}

function createArrivalChecklist(request: PlannerRequest) {
  const base = [
    "Confirm arrival time and share flight, bus or driving ETA before travel.",
    "Book accommodation before arrival if traveling in peak season or with family.",
    "Pre-arrange first transfer so the visitor is not negotiating transport while tired.",
    "Save the lodge, driver and emergency contacts offline."
  ];

  if (request.destination === "Victoria Falls") {
    return [
      "Decide whether the visitor lands at Victoria Falls Airport or arrives by road.",
      "Pre-book airport pickup to the hotel, lodge or town accommodation.",
      "Choose stay area: town for easy walking, river/lodge zone for premium relaxation, or airport-transfer friendly hotel for short stays.",
      "Confirm first evening plan: simple dinner, Boma-style dinner, sunset cruise or rest after travel."
    ];
  }

  if (request.destination === "Hwange National Park") {
    return [
      "Confirm gate, camp or lodge before the visitor starts traveling.",
      "Pre-book transfer from Victoria Falls, Bulawayo or the selected arrival point.",
      "Confirm whether meals and game drives are included in the lodge/camp booking.",
      "Carry water, snacks and printed/offline booking details because signal can be weak."
    ];
  }

  if (request.destination === "Lake Kariba") {
    return [
      "Confirm road transfer timing, fuel stop and lakefront accommodation before departure.",
      "Book any boat activity through a verified operator before paying.",
      "Check whether the lodge includes meals, marina pickup or sunset-cruise coordination.",
      "Carry sun protection, water and offline contacts."
    ];
  }

  return base;
}

export function generateMockItinerary(request: PlannerRequest): ItineraryPlan {
  const totalBudget = parseBudgetAmount(request.budget);
  const travelers = request.travelers ?? 1;
  const rules = styleBudgetRules[request.style];
  const profile = getProfile(request.destination);
  const breakdown = {
    accommodation: totalBudget * rules.accommodation,
    food: totalBudget * rules.food,
    activities: totalBudget * rules.activities,
    transport: totalBudget * rules.transport,
    entranceFees: totalBudget * rules.entranceFees,
    contingency: totalBudget * rules.contingency
  };

  return {
    title: `${request.days}-Day ${request.destination} AI Travel Plan`,
    summary: `Personalized for ${request.style} travel with a ${formatCurrency(totalBudget)} budget. The planner balances destination fit, daily pacing, route logistics, verified operators and safety buffers.`,
    conversationalBrief: createConversationalBrief(request),
    destination: request.destination,
    daysCount: request.days,
    totalBudget: formatCurrency(totalBudget),
    travelers,
    perPersonBudget: formatCurrency(Math.ceil(totalBudget / travelers)),
    style: request.style,
    days: Array.from({ length: request.days }, (_, index) => {
      const stop = getLocalStop(profile, index);

      return {
        title: `Day ${index + 1} - ${index === 0 ? "Arrival & Orientation" : index === request.days - 1 ? "Hidden Gems & Departure" : "Discovery, Operators & Local Value"}`,
        morning: index === 0 ? profile.arrival : "Start with the highest-value attraction while energy and light are good.",
        afternoon: index === 0 ? "Confirm bookings, transport details and emergency contacts." : profile.core,
        evening: index === request.days - 1 ? profile.departure : "Choose a nearby meal or sunset stop so the day does not become transport-heavy.",
        visitSuggestion: stop.visit,
        lunchSuggestion: stop.lunch,
        breakSuggestion: stop.breakStop,
        dinnerSuggestion: stop.dinner,
        staySuggestion: stop.stay
      };
    }),
    budgetSplit: {
      accommodation: `${Math.round(rules.accommodation * 100)}%`,
      food: `${Math.round(rules.food * 100)}%`,
      activities: `${Math.round(rules.activities * 100)}%`,
      transport: `${Math.round(rules.transport * 100)}%`,
      safety: `${Math.round(rules.contingency * 100)}%`,
      entranceFees: `${Math.round(rules.entranceFees * 100)}%`
    },
    budgetBreakdown: {
      accommodation: formatCurrency(breakdown.accommodation),
      food: formatCurrency(breakdown.food),
      activities: formatCurrency(breakdown.activities),
      transport: formatCurrency(breakdown.transport),
      entranceFees: formatCurrency(breakdown.entranceFees),
      contingency: formatCurrency(breakdown.contingency)
    },
    hiddenGems: [...profile.gems],
    safetyTips: ["Use verified operators", "Confirm prices before payment", "Save emergency contacts offline", "Share your route with a trusted contact"],
    smartWarnings: createWarnings(request, totalBudget),
    businessRecommendations: createBusinessRecommendations(request),
    localGuide: createLocalGuide(request),
    bookingOptions: createBookingOptions(request),
    arrivalChecklist: createArrivalChecklist(request),
    routeNotes: [...profile.routeNotes],
    generatedAt: new Date().toISOString()
  };
}
