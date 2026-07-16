import type { ImageSourcePropType } from 'react-native';

export type Destination = {
  id: string;
  name: string;
  region: string;
  category: string;
  match: string;
  image: ImageSourcePropType;
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
    image: require("../../assets/destinations/victoria-falls.png"),
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
    image: require("../../assets/destinations/hwange-national-park.png"),
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
    image: require("../../assets/destinations/mana-pools.png"),
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
  },
  {
    id: "4",
    name: "Lake Kariba",
    region: "Mashonaland West",
    category: "Lake & Relaxation",
    match: "92%",
    image: require("../../assets/destinations/lake-kariba.png"),
    tags: ["Lake", "Fishing", "Boating", "Sunset", "Water", "Crocodiles", "Hippos", "Birds"],
    description: "A wide inland lake for houseboats, fishing, sunset cruises and relaxed family or school trips.",
    highlights: ["Houseboat stays", "Fishing trips", "Sunset boat cruises"],
    bestFor: ["Families", "Schools", "Relaxation", "Water"],
    clothingTips: [
      "Light breathable clothes for hot lake days.",
      "Hat, sunglasses and sunscreen.",
      "Life jacket for boat activities."
    ],
    careTips: [
      "Avoid swimming from open shorelines because hippos and crocodiles may be present.",
      "Use life jackets on boats.",
      "Carry insect repellent in the evening."
    ]
  },
  {
    id: "5",
    name: "Nyanga",
    region: "Manicaland",
    category: "Mountains & Waterfalls",
    match: "91%",
    image: require("../../assets/destinations/nyanga.png"),
    tags: ["Mountains", "Waterfalls", "Hiking", "Cool", "Quiet", "Birds", "Photography", "Nature"],
    description: "Cool mountain air, waterfalls, viewpoints and quiet lodge stays in Zimbabwe’s Eastern Highlands.",
    highlights: ["Mount Nyangani", "Inyangombe Falls", "Trout fishing"],
    bestFor: ["Couples", "Hiking", "Photography", "Quiet trips"],
    clothingTips: [
      "Warm layers for misty mornings and evenings.",
      "Comfortable hiking shoes.",
      "Rain jacket during wet seasons."
    ],
    careTips: [
      "Mountain weather can change quickly.",
      "Use marked trails when hiking.",
      "Start hikes early and avoid poor visibility."
    ]
  },
  {
    id: "6",
    name: "Great Zimbabwe",
    region: "Masvingo",
    category: "Culture & Heritage",
    match: "89%",
    image: require("../../assets/destinations/great-zimbabwe.png"),
    tags: ["Culture", "History", "Heritage", "Ruins", "Architecture", "Stone", "Photography"],
    description: "A powerful stone-city heritage site that tells the story of Zimbabwe’s ancient kingdom and identity.",
    highlights: ["Great Enclosure", "Hill Complex", "Museum"],
    bestFor: ["History", "Culture", "Schools", "Photography"],
    clothingTips: [
      "Comfortable walking shoes for stone paths.",
      "Hat and sunscreen for open areas.",
      "Light clothing for warm afternoons."
    ],
    careTips: [
      "Respect protected heritage structures.",
      "Use guides for richer historical context.",
      "Carry water during warm months."
    ]
  },
  {
    id: "7",
    name: "Matobo National Park",
    region: "Matabeleland South",
    category: "Rocks, Caves & Wildlife",
    match: "88%",
    image: require("../../assets/destinations/matobo-national-park.jpeg"),
    tags: ["Rocks", "Caves", "Rhinos", "Leopards", "Birds", "Culture", "History", "Wildlife"],
    description: "Granite balancing rocks, ancient San rock art, rhino tracking and dramatic views near Bulawayo.",
    highlights: ["Mother and Child rocks", "Rhino tracking", "San rock art"],
    bestFor: ["Wildlife", "Culture", "History", "Photography"],
    clothingTips: [
      "Neutral clothes for rhino tracking.",
      "Closed walking shoes.",
      "Sun hat and water bottle."
    ],
    careTips: [
      "Track rhinos only with licensed guides.",
      "Do not touch ancient rock art.",
      "Stay on safe paths around granite slopes."
    ]
  },
  {
    id: "8",
    name: "Gonarezhou National Park",
    region: "Masvingo Province",
    category: "Remote Wildlife",
    match: "87%",
    image: require("../../assets/destinations/gonarezhou-national-park.jpeg"),
    tags: ["Elephants", "Lions", "Buffalo", "Zebras", "Wildlife", "Safari", "Remote", "Nature"],
    description: "A remote wilderness known as the place of elephants, with big landscapes and the Chilojo Cliffs.",
    highlights: ["Chilojo Cliffs", "Elephant herds", "Remote safari routes"],
    bestFor: ["Adventure", "Wildlife", "Photography"],
    clothingTips: [
      "Neutral safari clothing.",
      "Warm layer for early drives.",
      "Closed shoes for camp and guided stops."
    ],
    careTips: [
      "Plan fuel and supplies before remote routes.",
      "Keep distance from elephants and buffalo.",
      "Use experienced guides for remote drives."
    ]
  },
  {
    id: "9",
    name: "Chinhoyi Caves",
    region: "Mashonaland West",
    category: "Caves & Blue Pool",
    match: "84%",
    image: require("../../assets/destinations/chinhoyi-caves.jpeg"),
    tags: ["Caves", "Blue Pool", "Scuba", "Photography", "Hidden", "Water", "Rocks"],
    description: "A limestone cave system famous for its deep cobalt-blue pool and dramatic underground views.",
    highlights: ["Sleeping Pool", "Dark Cave", "Photography viewpoints"],
    bestFor: ["Photography", "Geology", "Short trips"],
    clothingTips: [
      "Comfortable walking shoes for cave paths.",
      "Light clothes for warm weather.",
      "Swim or dive gear only with approved operators."
    ],
    careTips: [
      "Use official paths and guides.",
      "Technical diving needs certified operators.",
      "Watch your step around wet cave edges."
    ]
  },
  {
    id: "10",
    name: "Lion & Cheetah Park",
    region: "Mashonaland West",
    category: "Wildlife Sanctuary",
    match: "82%",
    image: require("../../assets/destinations/lion-cheetah-park.jpeg"),
    tags: ["Lions", "Cheetahs", "Wildlife", "Family", "Short trip", "Photography", "Harare"],
    description: "A close-to-Harare wildlife stop for travellers who want to see lions, cheetahs and other animals on a short visit.",
    highlights: ["Lion viewing", "Cheetah encounters", "Family day trip"],
    bestFor: ["Families", "Short trips", "Wildlife"],
    clothingTips: [
      "Comfortable day-trip clothing.",
      "Hat and sunscreen.",
      "Closed shoes for walking areas."
    ],
    careTips: [
      "Follow sanctuary rules and staff instructions.",
      "Do not feed or provoke animals.",
      "Keep children supervised near animal areas."
    ]
  }
];
