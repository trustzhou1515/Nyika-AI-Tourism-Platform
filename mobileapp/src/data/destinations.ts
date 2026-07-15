export type Destination = {
  id: string;
  name: string;
  region: string;
  category: string;
  match: string;
  tags: string[];
  description: string;
  highlights: string[];
  bestFor: string[];
  clothingTips: string[];
  careTips: string[];
};

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Victoria Falls",
    region: "Matabeleland North",
    category: "Waterfall & Adventure",
    match: "98%",
    tags: ["Waterfalls", "Nature", "Adventure"],
    description: "Zimbabwe’s most iconic natural wonder, perfect for river cruises, rainforest walks and premium sunset experiences.",
    highlights: ["Rainforest viewpoints", "Helicopter flights", "Zambezi sunset cruises"],
    bestFor: ["Couples", "Photography", "Adventure"],
    clothingTips: [
      "Light layers for mist and evening coolness.",
      "Waterproof jacket near the Falls spray.",
      "Comfortable walking shoes and hat."
    ],
    careTips: [
      "Stay on marked paths near wet viewpoints.",
      "Use licensed operators for river or adventure activities.",
      "Carry water, mosquito protection and a rain layer."
    ]
  },
  {
    id: "2",
    name: "Hwange National Park",
    region: "Matabeleland North",
    category: "Wildlife Safari",
    match: "95%",
    tags: ["Wildlife", "Safari", "Elephants"],
    description: "A world-class safari destination with elephants, game drives and quiet bush lodge nights.",
    highlights: ["Elephant waterholes", "Guided game drives", "Birding hides"],
    bestFor: ["Families", "Wildlife", "Photography"],
    clothingTips: [
      "Neutral safari colors and dust-proof layers.",
      "Warm jacket for early morning drives.",
      "Closed shoes and sun protection."
    ],
    careTips: [
      "Never leave the vehicle without a guide.",
      "Keep a safe distance from wildlife.",
      "Carry snacks and extra water when transfers are long."
    ]
  },
  {
    id: "3",
    name: "Mana Pools",
    region: "Mashonaland West",
    category: "River Safari",
    match: "92%",
    tags: ["Wildlife", "River", "Quiet"],
    description: "Remote Zambezi wilderness offering walking safaris, canoe trips and intimate wildlife moments.",
    highlights: ["Walking safaris", "Canoeing", "Hippo river views"],
    bestFor: ["Adventure", "Wildlife", "Nature lovers"],
    clothingTips: [
      "Light layers for river heat.",
      "Hat, sunglasses and sunscreen.",
      "Close-toed shoes for walking safari days."
    ],
    careTips: [
      "Only walk with a licensed guide.",
      "Use life jackets for river canoe trips.",
      "Respect the river edge and hippo territory."
    ]
  }
];
