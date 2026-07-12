import type { Destination } from "../types/tourism";

export const destinations: Destination[] = [
  {
    id: "1",
    slug: "victoria-falls",
    name: "Victoria Falls",
    region: "Matabeleland North",
    category: "Wonder",
    image: "/images/downloads/victoria-falls-waterfall.jpeg",
    description: "Zimbabwe's iconic natural wonder with rainforest walks, adventure, culture and sunset experiences.",
    coordinates: { lat: -17.9243, lng: 25.856 },
    mapNote: "Use Victoria Falls town as the base for rainforest walks, airport pickup, river activities and dinner movement.",
    driveTimeFromHarare: "About 8-10 hours by road, or fly into Victoria Falls Airport.",
    nearestArrivalHub: "Victoria Falls Airport / Victoria Falls town",
    highlights: ["Rainforest walk", "Zambezi sunset", "Craft markets", "Adventure activities"],
    bestFor: ["Photography", "Adventure", "Culture", "Honeymoon"],
    careTips: [
      "Stay on marked rainforest and gorge paths, especially near wet viewpoints.",
      "Use licensed activity operators for rafting, gorge, helicopter or bridge activities.",
      "Keep distance from the Zambezi River edge because hippos and crocodiles can be dangerous.",
      "Carry water, mosquito protection and confirm pickup times before evening movement."
    ],
    clothingTips: [
      "Comfortable walking shoes for the rainforest and town movement.",
      "Light clothes for daytime, plus a light jacket for winter mornings and evenings.",
      "Raincoat or quick-dry layer near the Falls spray zone.",
      "Hat, sunglasses and mosquito protection for river or sunset activities."
    ],
    estimatedEntryFee: "From US$30 for international visitors",
    activities: [
      {
        title: "Rainforest viewpoints",
        description: "Walk the spray-filled paths, take photos at the viewpoints and feel the Falls up close.",
        image: "/images/downloads/victoria-falls-rainforest.jpeg",
        note: "Best early in the day; carry a raincoat or quick-dry layer."
      },
      {
        title: "Devil's Pool experience",
        description: "A seasonal edge-water experience for confident visitors when water levels and operators allow it.",
        image: "/images/victoria-falls-devils-pool.png",
        note: "Only use licensed operators and check if the season is safe."
      },
      {
        title: "Flight of Angels",
        description: "See the Falls, gorges and upper Zambezi from above for the big-picture memory.",
        image: "/images/downloads/victoria-falls-helicopter.jpeg",
        note: "Good premium activity for photography, couples and first-time visitors."
      },
      {
        title: "Zambezi river cruise",
        description: "A calmer sunset or river activity where visitors can enjoy the water, views and wildlife edges.",
        image: "/images/zambezi-sunset-cruise.png",
        note: "Good for evening plans after the Falls walk or town movement."
      }
    ],
    wildlifeStory: {
      eyebrow: "A journey back to the wild",
      title: "Seven orphaned elephants travelled 1,100 kilometres toward freedom",
      summary: "After years of care in Harare, seven rescued elephants made a long road journey to Panda Masuie near Victoria Falls.",
      body: [
        "The seven elephants were between three and thirteen years old. Each had lost its mother and herd, and some had survived serious injuries before receiving long-term care at the Wild is Life elephant nursery in Harare.",
        "Their move to Panda Masuie took about seventeen hours by truck. It was more than a change of location: the protected forest near Victoria Falls gave them space to browse, make choices and become less dependent on their human carers.",
        "Panda Masuie forms part of a much larger connected wildlife landscape. Rescued elephants there can meet free-roaming herds and slowly practise the skills needed for an independent life in the wild."
      ],
      image: "/images/safari-elephant-drive.png",
      imageNote: "Illustrative wildlife image; not a photograph of the rescued group.",
      sourceName: "International Fund for Animal Welfare and Wild is Life"
    }
  },
  {
    id: "2",
    slug: "hwange-national-park",
    name: "Hwange National Park",
    region: "Matabeleland North",
    category: "Wildlife",
    image: "/images/explore-hwange-safari-sunset.png",
    description: "Zimbabwe's largest national park, known for elephants, safari lodges and game drives.",
    coordinates: { lat: -18.7318, lng: 26.9547 },
    mapNote: "Confirm the gate, camp or lodge before travel because distances inside and around Hwange are wide.",
    driveTimeFromHarare: "About 9-11 hours by road depending on gate/lodge route.",
    nearestArrivalHub: "Victoria Falls Airport, Bulawayo, or Hwange Main Camp area",
    highlights: ["Elephants", "Game drives", "Safari lodges", "Birding"],
    bestFor: ["Wildlife", "Families", "Photography"],
    careTips: [
      "Do not leave vehicles or walk near wildlife unless a licensed guide says it is safe.",
      "Confirm gate, camp and lodge distances because park transfers can be long.",
      "Carry water, snacks and offline contacts because signal can be weak.",
      "Avoid night driving between camps unless arranged through the lodge or guide."
    ],
    clothingTips: [
      "Neutral colours for safari such as khaki, olive, grey or brown.",
      "Warm jacket for early morning game drives, especially in winter.",
      "Closed shoes, hat and sunglasses for dust and sun.",
      "Long sleeves or light layers for insects around camp."
    ],
    estimatedEntryFee: "Varies by visitor category",
    activities: [
      {
        title: "Elephant waterhole viewing",
        description: "Watch Hwange's famous elephant herds around pans and waterholes, especially in the dry season.",
        image: "/images/explore-hwange-waterhole-drive.png",
        note: "Best with a guide or lodge vehicle; keep quiet and stay inside the vehicle."
      },
      {
        title: "Guided game drives",
        description: "Move through woodland and open pans looking for elephants, antelope, lions and other wildlife.",
        image: "/images/explore-hwange-elephant-drive-close.png",
        note: "Early morning and late afternoon drives usually feel richer."
      },
      {
        title: "Birding & nature photography",
        description: "Use the slower moments around pans to photograph birds, light, tracks and landscape details.",
        image: "/images/hwange-birding.png",
        note: "Carry binoculars, neutral clothing and dust protection for cameras."
      }
    ],
    wildlifeStory: {
      eyebrow: "Conservation in action",
      title: "The trails where wildlife started returning",
      summary: "Camera traps north of Hwange are recording elephants at dusk and lions moving through the night.",
      body: [
        "In February 2026, conservation teams placed eleven motion-triggered cameras across Matetsi Unit 5. The cameras were positioned along paths marked by tracks, dung and other signs that animals were moving through the area.",
        "Within weeks, the photographs confirmed elephants, buffalo, lions and leopards. These were not simply beautiful images: every record helped researchers map where animals travelled and which parts of the recovering landscape needed protection.",
        "Matetsi lies between Hwange National Park and the Zambezi River, making it an important wildlife corridor. Its gradual move from hunting use toward conservation and photographic tourism offers hope for wildlife and nearby communities."
      ],
      image: "/images/hwange-elephants.png",
      imageNote: "Illustrative Hwange wildlife image.",
      sourceName: "International Fund for Animal Welfare and ZimParks"
    }
  },
  {
    id: "10",
    slug: "mana-pools-national-park",
    name: "Mana Pools National Park",
    region: "Mashonaland West",
    category: "Wildlife",
    image: "/images/zambezi-river-elephants.png",
    description: "A UNESCO World Heritage wildlife area along the Zambezi River, known for walking safaris, canoeing, elephants, hippos and wild dogs.",
    coordinates: { lat: -15.819, lng: 29.374 },
    mapNote: "Use Mana Pools access points and operator pickups carefully because this is a remote Zambezi valley safari area.",
    driveTimeFromHarare: "About 5-7 hours by road depending on route, season and access point.",
    nearestArrivalHub: "Harare / Karoi / Mana Pools operator pickup",
    highlights: ["Walking safaris", "Canoeing", "Zambezi River", "Wild dogs"],
    bestFor: ["Wildlife", "Safari", "Photography", "Adventure"],
    careTips: [
      "Use licensed guides for walking safaris and river activities.",
      "Confirm access, park conditions and operator pickup before travelling.",
      "Keep distance from elephants, hippos and river edges.",
      "Carry water, sun protection, insect protection and offline contacts."
    ],
    clothingTips: [
      "Neutral safari colours such as khaki, olive and grey.",
      "Closed shoes for guided walks.",
      "Hat, sunglasses and sunscreen for river heat.",
      "Warm layer for early morning and evening game viewing."
    ],
    estimatedEntryFee: "Varies by visitor category and operator",
    activities: [
      {
        title: "Walking safari",
        description: "Experience Mana Pools on foot with a licensed guide for careful wildlife interpretation.",
        image: "/images/explore-zambezi-river-wildlife.png",
        note: "Only walk with qualified guides and follow safety instructions."
      },
      {
        title: "Zambezi canoeing",
        description: "Use the river frontage for guided canoeing, scenery and wildlife viewing from the water.",
        image: "/images/zambezi-sunset-cruise.png",
        note: "Use verified operators and life jackets."
      },
      {
        title: "Wildlife photography",
        description: "Photograph elephants, hippos, birds and river scenes around safe viewing areas.",
        image: "/images/zambezi-river-elephants.png",
        note: "Best with early morning or late afternoon light."
      }
    ],
    wildlifeStory: {
      eyebrow: "A rescue from Mana Pools",
      title: "Amira was found just in time",
      summary: "A seven-month-old elephant calf was discovered alone, weak and collapsed beneath a tree after losing her mother.",
      body: [
        "Her mother had died and the young calf could not survive alone. With a storm and darkness approaching, rangers, veterinarians and rescuers had about one hour to locate her and return to a waiting aircraft.",
        "They found her within twenty minutes, collapsed beneath a tree. After carefully sedating her, the team moved her by vehicle to the plane and monitored her breathing and vital signs throughout the flight to Harare.",
        "At the elephant nursery, a resident elephant named Moyo reached across to touch and comfort the frightened newcomer. The calf settled in the presence of her own kind and was later named Amira, meaning princess.",
        "Her rescue began a longer rehabilitation journey: growing stronger, learning from other elephants and, one day, having the opportunity to return to a wild herd."
      ],
      image: "/images/zambezi-river-elephants.png",
      imageNote: "Illustrative Mana Pools wildlife image; not a photograph of Amira.",
      sourceName: "International Fund for Animal Welfare and Zimbabwe Elephant Nursery"
    }
  },
  {
    id: "26",
    slug: "chiremba-balancing-rocks",
    name: "Chiremba Balancing Rocks",
    region: "Harare / Epworth",
    category: "Rock Formations",
    image: "/images/downloads/chiremba-balancing-rocks.jpeg",
    description: "An accessible Harare-area heritage site known for dramatic granite balancing rocks, photography, short walks, picnics and national-symbol value.",
    coordinates: { lat: -17.842, lng: 31.113 },
    mapNote: "Use Chiremba Road and Epworth access as practical anchors, then confirm current opening times, entry fees and payment options before travelling.",
    driveTimeFromHarare: "About 20-40 minutes from central Harare depending on traffic.",
    nearestArrivalHub: "Harare / Epworth / Chiremba Road",
    highlights: ["Domboremari Money Rock", "Granite formations", "Photography", "Short walks"],
    bestFor: ["Culture", "Photography", "Families", "Quick city trip"],
    careTips: [
      "Confirm current opening times and entry fees before travelling.",
      "Carry small cash and water because payment options and nearby services can vary.",
      "Wear shoes with grip because granite surfaces can be uneven or slippery after rain.",
      "Respect rock art, heritage rules and any restricted areas."
    ],
    clothingTips: [
      "Comfortable walking shoes with grip.",
      "Light daytime clothes for Harare weather.",
      "Hat, sunscreen and sunglasses for exposed rock areas.",
      "Light jacket in cooler months or for early morning visits."
    ],
    estimatedEntryFee: "Confirm current fee before visiting",
    activities: [
      {
        title: "Domboremari Money Rock",
        description: "See the famous balancing rock cluster associated with Zimbabwe's national imagery and currency symbolism.",
        image: "/images/downloads/chiremba-balancing-rocks.jpeg",
        note: "Good for photos and short guided explanation."
      },
      {
        title: "Granite rock photography",
        description: "Walk the rock area for dramatic formations such as balancing clusters, high viewpoints and natural shapes.",
        image: "/images/downloads/chiremba-rocks-people.jpeg",
        note: "Best in softer morning or late afternoon light."
      },
      {
        title: "Picnic and heritage walk",
        description: "Use the site for a short relaxed outing with a picnic, light walking and cultural context.",
        image: "/images/downloads/chiremba-balancing-rocks.jpeg",
        note: "Keep the visit respectful and leave no litter."
      }
    ]
  },
  {
    id: "27",
    slug: "chinhoyi-caves",
    name: "Chinhoyi Caves",
    region: "Mashonaland West",
    category: "Caves & Blue Pool",
    image: "/images/downloads/chinhoyi-caves-pool.jpeg",
    description: "Zimbabwe's best-known cave system, famous for the cobalt-blue Sleeping Pool, limestone caverns, underground viewpoints, guided walks and technical diving.",
    coordinates: { lat: -17.3567, lng: 30.1247 },
    mapNote: "Use the A1 Harare-to-Chirundu route and Chinhoyi Caves Recreational Park as the anchor, then confirm current fees, opening times and diving requirements before travelling.",
    driveTimeFromHarare: "About 1.5-2 hours from Harare by road depending on traffic.",
    nearestArrivalHub: "Harare / Chinhoyi town / A1 Chirundu road",
    highlights: ["Sleeping Pool", "Wonder Hole", "Dark Cave", "Technical diving"],
    bestFor: ["Caves", "Photography", "Families", "Adventure"],
    careTips: [
      "Stay on marked cave paths and follow site staff or guide instructions.",
      "Confirm current entry fees, opening times and diving rules before travelling.",
      "Use qualified technical diving operators only; the pool is deep and not a casual swim site.",
      "Carry water, comfortable shoes and small cash for practical travel needs."
    ],
    clothingTips: [
      "Comfortable walking shoes with grip for steps and cave paths.",
      "Light daytime clothes for the drive and outdoor areas.",
      "A light layer if spending time in cooler shaded cave areas.",
      "Diving gear only through qualified operators if doing technical diving."
    ],
    estimatedEntryFee: "Confirm current conservation fee before visiting",
    activities: [
      {
        title: "Sleeping Pool viewpoint",
        description: "Look down into the famous cobalt-blue pool from the Wonder Hole and surrounding viewpoints.",
        image: "/images/explore-chinhoyi-caves-blue-pool.png",
        note: "Best for photos, families and first-time cave visitors."
      },
      {
        title: "Dark Cave walk",
        description: "Use the underground route to see the blue water from a different interior cave angle.",
        image: "/images/downloads/chinhoyi-caves-view.jpeg",
        note: "Follow marked routes and avoid rushing on steps or damp surfaces."
      },
      {
        title: "Technical diving planning",
        description: "Experienced divers can plan specialist deep-water diving only through approved, qualified operators.",
        image: "/images/explore-chinhoyi-technical-diving.png",
        note: "This is not a casual swimming activity; confirm safety and operator rules first."
      }
    ]
  },
  {
    id: "28",
    slug: "domboshava-caves",
    name: "Domboshava Caves",
    region: "Mashonaland East",
    category: "Rock Shelters & Caves",
    image: "/images/explore-domboshava-balancing-rock.png",
    description: "A sacred granite hill and rock shelter site north of Harare, known for San rock art, smooth dome hiking, cultural history and wide sunset views.",
    coordinates: { lat: -17.608, lng: 31.14 },
    mapNote: "Use the Domboshava road north of Harare as the access anchor, then confirm current site rules, guide options and sunset timing before travelling.",
    driveTimeFromHarare: "About 40-60 minutes from Harare depending on traffic and route.",
    nearestArrivalHub: "Harare / Domboshava road",
    highlights: ["San rock art", "Granite dome", "Rock shelters", "Sunset views"],
    bestFor: ["Caves", "Culture", "Photography", "Short hikes"],
    careTips: [
      "Respect the rock art, sacred history and site rules.",
      "Use shoes with grip because the granite dome can be slippery, especially after rain.",
      "Avoid climbing down after dark without lights or local guidance.",
      "Carry water, sun protection and small cash for practical travel needs."
    ],
    clothingTips: [
      "Walking shoes with grip for granite surfaces.",
      "Light outdoor clothes for hiking and warm afternoons.",
      "Hat, sunscreen and sunglasses for exposed rock areas.",
      "Light jacket if staying for sunset or cooler months."
    ],
    estimatedEntryFee: "Confirm current fee before visiting",
    activities: [
      {
        title: "Rock art shelters",
        description: "View ancient San rock art inside the granite shelters and learn why the site carries cultural memory.",
        image: "/images/explore-domboshava-rock-shelter.png",
        note: "Do not touch or damage rock art surfaces."
      },
      {
        title: "Granite dome hike",
        description: "Walk the smooth rock dome for open views, fresh air and a simple city escape from Harare.",
        image: "/images/explore-domboshava-granite-dome.png",
        note: "Wear shoes with grip and avoid wet slippery sections."
      },
      {
        title: "Sunset viewpoint",
        description: "Use Domboshava for a calm sunset stop with 360-degree views and photography.",
        image: "/images/explore-domboshava-balancing-rock.png",
        note: "Leave enough daylight for a safe descent."
      }
    ]
  },
  {
    id: "11",
    slug: "matobo-national-park",
    name: "Matobo National Park",
    region: "Matabeleland South",
    category: "Wildlife & Heritage",
    image: "/images/downloads/matobo-rocks.jpeg",
    description: "A UNESCO-listed landscape near Bulawayo with dramatic granite domes, balancing rock formations, ancient San rock art, rhino tracking and leopard habitat.",
    coordinates: { lat: -20.533, lng: 28.5 },
    mapNote: "Use Bulawayo as the practical base, then plan rhino tracking, rock formations and cultural heritage stops with guides.",
    driveTimeFromHarare: "About 5-6 hours to Bulawayo, then a shorter transfer south to Matobo.",
    nearestArrivalHub: "Bulawayo / Matobo park access",
    highlights: ["Mother and Child rocks", "Rhino tracking", "San rock art", "World's View"],
    bestFor: ["Wildlife", "Culture", "History", "Photography"],
    careTips: [
      "Use registered guides for rhino tracking and heritage interpretation.",
      "Wear shoes with grip for granite rock areas.",
      "Carry water and sun protection because exposed rock areas can be hot.",
      "Respect rock art, sacred areas and park rules."
    ],
    clothingTips: [
      "Comfortable walking shoes with grip.",
      "Neutral outdoor clothing for wildlife activities.",
      "Hat, sunscreen and sunglasses.",
      "Light jacket for cooler mornings and evenings."
    ],
    estimatedEntryFee: "Varies by visitor category and activity",
    activities: [
      {
        title: "Rhino tracking",
        description: "Track rhino with qualified guides in one of Zimbabwe's important rhino conservation landscapes.",
        image: "/images/downloads/matobo-rocks.jpeg",
        note: "Follow guide instructions and keep safe distances."
      },
      {
        title: "Mother and Child rocks",
        description: "Explore the dramatic granite formations and iconic balancing rock shapes that define the Matobo landscape.",
        image: "/images/downloads/matobo-balancing-rocks.jpeg",
        note: "Wear shoes with grip and carry water."
      },
      {
        title: "Rock art and heritage",
        description: "Visit cave painting areas and learn the cultural history of the Matobo hills.",
        image: "/images/downloads/matobo-worlds-view.jpeg",
        note: "Use a guide so the site is understood respectfully."
      }
    ]
  },
  {
    id: "12",
    slug: "gonarezhou-national-park",
    name: "Gonarezhou National Park",
    region: "Masvingo / Chiredzi",
    category: "Wildlife",
    image: "/images/downloads/gonarezhou-landscape.jpeg",
    description: "A remote southeast Zimbabwe park known as the Place of Elephants, with large wilderness areas and the dramatic Chilojo Cliffs.",
    coordinates: { lat: -21.65, lng: 31.73 },
    mapNote: "Plan around Chiredzi, park gates and road conditions because Gonarezhou is remote and distances are wide.",
    driveTimeFromHarare: "About 7-9 hours by road depending on gate, route and conditions.",
    nearestArrivalHub: "Chiredzi / Gonarezhou park gates",
    highlights: ["Elephants", "Chilojo Cliffs", "Remote safari", "Birding"],
    bestFor: ["Wildlife", "Photography", "Adventure", "Remote safari"],
    careTips: [
      "Confirm gate access, road conditions and fuel before entering the park.",
      "Use a capable vehicle and verified guide support where needed.",
      "Do not approach elephants or leave vehicles in unsafe areas.",
      "Carry water, supplies and offline contacts because services are limited."
    ],
    clothingTips: [
      "Neutral safari clothing.",
      "Closed shoes for camp and vehicle movement.",
      "Hat, sunglasses and sunscreen for hot lowveld weather.",
      "Light long sleeves for insects and sun."
    ],
    estimatedEntryFee: "Varies by visitor category and gate",
    activities: [
      {
        title: "Chilojo Cliffs viewing",
        description: "See the red sandstone cliffs that make Gonarezhou one of Zimbabwe's most dramatic wildlife landscapes.",
        image: "/images/downloads/gonarezhou-cliffs.jpeg",
        note: "Plan timing and road access carefully."
      },
      {
        title: "Elephant safari",
        description: "Look for elephants, antelope, predators and birds across remote lowveld scenery.",
        image: "/images/downloads/gonarezhou-elephants.jpeg",
        note: "Use safe viewing distances and avoid pressuring wildlife."
      },
      {
        title: "Remote camp rest",
        description: "Slow the safari with camp meals, evening sounds and wide wilderness skies.",
        image: "/images/downloads/gonarezhou-river.jpeg",
        note: "Carry supplies because services are spread out."
      }
    ]
  },
  {
    id: "13",
    slug: "mbizi-game-park",
    name: "Mbizi Game Park",
    region: "Mashonaland West",
    category: "Wildlife Sanctuary",
    image: "/images/downloads/zebra-wildlife.jpeg",
    description: "An accessible game park experience for short wildlife drives, family outings and nature breaks near the Harare side of Zimbabwe.",
    coordinates: { lat: -17.88, lng: 30.7 },
    mapNote: "Confirm current opening times, booking requirements and road directions before travelling.",
    driveTimeFromHarare: "About 1-2 hours by road depending on the exact access route.",
    nearestArrivalHub: "Harare / Norton road access",
    highlights: ["Game viewing", "Family outings", "Short drives", "Nature breaks"],
    bestFor: ["Wildlife", "Families", "Local trips", "Relaxation"],
    careTips: [
      "Confirm opening times and booking rules before departure.",
      "Follow park staff instructions around animals.",
      "Carry water, snacks and sun protection for family visits.",
      "Avoid feeding animals unless staff clearly allow it."
    ],
    clothingTips: [
      "Comfortable casual clothes.",
      "Closed shoes for walking areas.",
      "Hat and sunscreen for daytime visits.",
      "Light jacket in winter mornings."
    ],
    estimatedEntryFee: "Confirm with the operator",
    activities: [
      {
        title: "Short game drive",
        description: "Enjoy an accessible wildlife drive suitable for families and local day trips.",
        image: "/images/downloads/giraffe-wildlife.jpeg",
        note: "Confirm vehicle rules and opening times first."
      },
      {
        title: "Picnic and rest",
        description: "Use the park as a relaxed nature break with food, photos and slower movement.",
        image: "/images/downloads/zebra-wildlife.jpeg",
        note: "Keep picnic areas clean and follow park rules."
      },
      {
        title: "Family wildlife learning",
        description: "Give children an easy introduction to wildlife before bigger safari trips.",
        image: "/images/downloads/birds-sanctuary-1.jpeg",
        note: "Keep children supervised around animals and roads."
      }
    ]
  },
  {
    id: "14",
    slug: "haka-game-park",
    name: "Haka Game Park",
    region: "Harare",
    category: "City Wildlife",
    image: "/images/downloads/birds-sanctuary-2.jpeg",
    description: "A close-to-city wildlife and nature park in Harare for short walks, birding, family time and light game viewing.",
    coordinates: { lat: -17.83, lng: 31.16 },
    mapNote: "Use Harare east-side access and confirm current operating times before visiting.",
    driveTimeFromHarare: "Usually a short city drive depending on starting point and traffic.",
    nearestArrivalHub: "Harare / Cleveland Dam side",
    highlights: ["Birding", "Short walks", "Family nature", "City wildlife"],
    bestFor: ["Wildlife", "Families", "Local trips", "Birding"],
    careTips: [
      "Confirm current entry rules and opening times.",
      "Use marked areas and avoid isolated walking routes late in the day.",
      "Carry water and sun protection.",
      "Keep children supervised near water, roads or animals."
    ],
    clothingTips: [
      "Comfortable walking shoes.",
      "Casual outdoor clothing.",
      "Hat and sunscreen.",
      "Light jacket during winter mornings."
    ],
    estimatedEntryFee: "Confirm with the park",
    activities: [
      {
        title: "Birding and nature walks",
        description: "Use Haka for accessible birding, short walks and calm outdoor time near the city.",
        image: "/images/downloads/birds-sanctuary-1.jpeg",
        note: "Best in cooler morning or late afternoon periods."
      },
      {
        title: "Family nature outing",
        description: "Plan a short wildlife and nature break without leaving Harare for long.",
        image: "/images/downloads/zebra-wildlife.jpeg",
        note: "Confirm picnic and access rules before travelling."
      },
      {
        title: "Photography stop",
        description: "Capture birds, water edges and open nature scenes close to Harare.",
        image: "/images/downloads/birds-sanctuary-2.jpeg",
        note: "Carry water and avoid walking alone late."
      }
    ]
  },
  {
    id: "15",
    slug: "mukuvisi-woodlands",
    name: "Mukuvisi Woodlands",
    region: "Harare",
    category: "City Wildlife",
    image: "/images/downloads/giraffe-wildlife.jpeg",
    description: "An accessible Harare woodland sanctuary for wildlife education, birding, guided walks and family-friendly nature experiences.",
    coordinates: { lat: -17.86, lng: 31.09 },
    mapNote: "Use the Harare east-side woodland access and confirm guided walk or education visit times before arriving.",
    driveTimeFromHarare: "Usually a short city drive depending on traffic.",
    nearestArrivalHub: "Harare / Mukuvisi Woodlands access",
    highlights: ["Guided walks", "Birding", "Wildlife education", "Family nature"],
    bestFor: ["Wildlife", "Education", "Families", "Birding"],
    careTips: [
      "Use marked paths and follow staff guidance.",
      "Confirm opening times and guided walk availability.",
      "Carry water and sun protection.",
      "Keep children supervised during wildlife education walks."
    ],
    clothingTips: [
      "Comfortable walking shoes.",
      "Casual outdoor clothing.",
      "Hat, sunscreen and water bottle.",
      "Neutral colours if birding or photographing wildlife."
    ],
    estimatedEntryFee: "Confirm with the sanctuary",
    activities: [
      {
        title: "Guided woodland walk",
        description: "Walk with guides through accessible woodland areas for wildlife and nature education.",
        image: "/images/downloads/giraffe-wildlife.jpeg",
        note: "Book or confirm guide availability before visiting."
      },
      {
        title: "Birding and photography",
        description: "Use the sanctuary for birds, trees, calm trails and close-to-city photos.",
        image: "/images/downloads/birds-sanctuary-1.jpeg",
        note: "Morning visits usually feel cooler and richer."
      },
      {
        title: "Family wildlife learning",
        description: "Introduce children and visitors to Zimbabwean nature without a long-distance safari.",
        image: "/images/downloads/zebra-wildlife.jpeg",
        note: "Good for schools, families and short visits."
      }
    ]
  },
  {
    id: "32",
    slug: "kuimba-shiri-bird-park",
    name: "Kuimba Shiri Bird Park",
    region: "Lake Chivero / Harare",
    category: "Birdlife",
    image: "/images/downloads/kuimba-shiri-birds.jpeg",
    description: "A birdlife and family nature destination near Lake Chivero, known for bird displays, photography, lake-side scenery and easy Harare day trips.",
    coordinates: { lat: -17.911, lng: 30.763 },
    mapNote: "Use Lake Chivero and Kuimba Shiri access as anchors, then confirm show times, entry fees and road conditions before travelling.",
    driveTimeFromHarare: "About 40-70 minutes from central Harare depending on traffic and route.",
    nearestArrivalHub: "Harare / Lake Chivero access",
    highlights: ["Bird displays", "Lake Chivero scenery", "Family day trip", "Photography"],
    bestFor: ["Birding", "Families", "Photography", "Education"],
    careTips: [
      "Confirm opening hours and bird display times before travelling.",
      "Use safe transport and avoid returning too late if unfamiliar with the route.",
      "Carry sun protection, water and comfortable walking shoes.",
      "Follow staff guidance around birds, enclosures and lake edges."
    ],
    clothingTips: [
      "Comfortable walking shoes.",
      "Light daytime clothes for warm weather.",
      "Hat, sunglasses and sunscreen.",
      "Neutral colours if photographing birds."
    ],
    estimatedEntryFee: "Confirm current day visitor fee before travelling",
    activities: [
      {
        title: "Bird display and photography",
        description: "Watch bird displays, take close-up photos and learn about Zimbabwean birdlife in a family-friendly setting.",
        image: "/images/downloads/kuimba-shiri-show.jpeg",
        note: "Check show times before leaving Harare."
      },
      {
        title: "Lake Chivero nature stop",
        description: "Combine the bird park with lake views, relaxed photos and a softer outdoor day near Harare.",
        image: "/images/downloads/birds-sanctuary-1.jpeg",
        note: "Keep children supervised around open water and viewing areas."
      },
      {
        title: "Birding learning day",
        description: "Use the visit for school groups, families or first-time bird watchers who want an easy nature experience.",
        image: "/images/downloads/birds-sanctuary-2.jpeg",
        note: "Carry binoculars if you have them."
      }
    ]
  },
  {
    id: "3",
    slug: "great-zimbabwe",
    name: "Great Zimbabwe",
    region: "Masvingo",
    category: "Heritage",
    image: "/images/downloads/great-zimbabwe-wide.jpeg",
    description: "A powerful heritage site telling the story of ancient architecture, culture and national identity.",
    coordinates: { lat: -20.2675, lng: 30.9338 },
    mapNote: "Use Masvingo as the practical overnight base, then move to the monument and Lake Mutirikwi areas.",
    driveTimeFromHarare: "About 4-5 hours by road.",
    nearestArrivalHub: "Masvingo town",
    highlights: ["Great Enclosure", "Hill Complex", "Museum", "Cultural history"],
    bestFor: ["History", "Culture", "Education"],
    careTips: [
      "Wear comfortable shoes because the Hill Complex has uneven stone paths.",
      "Carry water and sun protection for school or group visits.",
      "Use a guide for children or first-time visitors so the site makes sense.",
      "Keep enough time for Masvingo town transport after the monument visit."
    ],
    clothingTips: [
      "Comfortable walking shoes with grip for stone paths.",
      "Light breathable clothing for daytime site walks.",
      "Hat, sunscreen and water bottle for exposed areas.",
      "A light jacket in winter or for early morning departures."
    ],
    estimatedEntryFee: "Varies by visitor category",
    activities: [
      {
        title: "Great Enclosure walk",
        description: "Walk through the stone walls, passageways and the Conical Tower area that define the monument.",
        image: "/images/explore-great-zimbabwe-group-ruins.png",
        note: "Use a guide so visitors understand the site beyond taking photos."
      },
      {
        title: "Hill Complex viewpoints",
        description: "Climb carefully to higher ruins and viewpoints for context across the monument landscape.",
        image: "/images/great-zimbabwe-culture.png",
        note: "Wear shoes with grip and carry water, especially for school groups."
      },
      {
        title: "Culture & museum learning",
        description: "Use the museum and guided storytelling to connect architecture, identity and Shona history.",
        image: "/images/downloads/great-zimbabwe-tower.jpeg",
        note: "Good for education trips, heritage tourism and first-time visitors."
      }
    ]
  },
  {
    id: "20",
    slug: "khami-ruins",
    name: "Khami Ruins",
    region: "Bulawayo",
    category: "Heritage",
    image: "/images/downloads/khami-ruins-wide.jpeg",
    description: "A UNESCO World Heritage archaeological site west of Bulawayo, preserving the stone-built capital of the Torwa dynasty.",
    coordinates: { lat: -20.158, lng: 28.376 },
    mapNote: "Use Bulawayo as the practical base, then plan a guided heritage visit to the ruins and nearby cultural stops.",
    driveTimeFromHarare: "About 5-6 hours to Bulawayo, then a short drive west to Khami.",
    nearestArrivalHub: "Bulawayo / Khami road access",
    highlights: ["UNESCO ruins", "Torwa dynasty", "Stone terraces", "Guided history"],
    bestFor: ["Culture", "History", "Education", "Photography"],
    careTips: [
      "Use a guide to understand the archaeology and stone terraces.",
      "Wear comfortable shoes for uneven paths.",
      "Carry water and sun protection.",
      "Respect protected heritage structures and avoid climbing where not allowed."
    ],
    clothingTips: [
      "Comfortable walking shoes.",
      "Light breathable clothing.",
      "Hat, sunscreen and water bottle.",
      "Light jacket for winter mornings."
    ],
    estimatedEntryFee: "Varies by visitor category",
    activities: [
      {
        title: "Stone terraces walk",
        description: "Explore Khami's stone walls, platforms and archaeological layers with heritage context.",
        image: "/images/downloads/khami-ruins-wide.jpeg",
        note: "Use a guide so visitors understand the site beyond photos."
      },
      {
        title: "Torwa dynasty history",
        description: "Learn how Khami connects to Zimbabwe's wider pre-colonial state and trade history.",
        image: "/images/downloads/khami-ruins-detail.jpeg",
        note: "Good for school groups and cultural visitors."
      },
      {
        title: "Bulawayo heritage route",
        description: "Combine Khami with Bulawayo museum, Matobo or city cultural stops.",
        image: "/images/downloads/khami-ruins-stone.jpeg",
        note: "Plan enough road time between sites."
      }
    ]
  },
  {
    id: "21",
    slug: "national-gallery-of-zimbabwe",
    name: "National Gallery of Zimbabwe",
    region: "Harare",
    category: "Art & Culture",
    image: "/images/downloads/national-gallery-wide.jpeg",
    description: "A central Harare art hub showcasing historic and contemporary Zimbabwean art, including Shona stone sculpture.",
    coordinates: { lat: -17.824, lng: 31.051 },
    mapNote: "Use central Harare as the access point and confirm exhibitions or opening hours before visiting.",
    driveTimeFromHarare: "Central Harare access; timing depends on city traffic.",
    nearestArrivalHub: "Harare CBD / National Gallery",
    highlights: ["Shona sculpture", "Contemporary art", "Exhibitions", "Harare culture"],
    bestFor: ["Culture", "Art", "Education", "City trips"],
    careTips: [
      "Confirm opening times and current exhibitions.",
      "Use safe city transport and parking arrangements.",
      "Follow gallery photography and artwork rules.",
      "Plan city traffic time if combining with other Harare stops."
    ],
    clothingTips: [
      "Smart casual city clothing.",
      "Comfortable shoes for gallery walking.",
      "Light jacket in cooler months.",
      "Simple day bag for city movement."
    ],
    estimatedEntryFee: "Confirm with the gallery",
    activities: [
      {
        title: "Gallery exhibition visit",
        description: "View Zimbabwean visual art, sculpture and rotating contemporary exhibitions.",
        image: "/images/downloads/national-gallery-wide.jpeg",
        note: "Check current exhibition times before arrival."
      },
      {
        title: "Shona sculpture learning",
        description: "Use the gallery to understand Zimbabwe's globally recognised stone sculpture tradition.",
        image: "/images/downloads/national-gallery-interior.jpeg",
        note: "Good for art lovers, students and city visitors."
      },
      {
        title: "Harare culture stop",
        description: "Combine the gallery with nearby cafes, city walks or arts-focused stops.",
        image: "/images/downloads/national-gallery-wide.jpeg",
        note: "Use safe transport between city stops."
      }
    ]
  },
  {
    id: "22",
    slug: "national-heroes-acre",
    name: "National Heroes Acre",
    region: "Harare",
    category: "National Monument",
    image: "/images/downloads/national-heroes-acre-wide.jpeg",
    description: "A national monument and burial site on Warren Hills dedicated to Zimbabwe's liberation war heroes.",
    coordinates: { lat: -17.838, lng: 30.94 },
    mapNote: "Use Warren Hills as the route anchor and confirm visitor access or ceremony restrictions before arrival.",
    driveTimeFromHarare: "Short Harare drive depending on traffic.",
    nearestArrivalHub: "Harare / Warren Hills",
    highlights: ["National monument", "Liberation history", "City viewpoint", "Memorial site"],
    bestFor: ["Culture", "History", "Education", "City trips"],
    careTips: [
      "Respect memorial rules, ceremonies and restricted areas.",
      "Use appropriate quiet conduct at the site.",
      "Carry water and sun protection for exposed areas.",
      "Confirm access before visiting during national events."
    ],
    clothingTips: [
      "Respectful smart casual clothing.",
      "Comfortable shoes for walking around the monument.",
      "Hat and sunscreen for daytime visits.",
      "Light jacket in winter."
    ],
    estimatedEntryFee: "Confirm current visitor access",
    activities: [
      {
        title: "Memorial visit",
        description: "Visit the national monument and learn about liberation history and national remembrance.",
        image: "/images/downloads/national-heroes-acre-wide.jpeg",
        note: "Keep conduct respectful because this is a memorial site."
      },
      {
        title: "History learning",
        description: "Use the site to understand modern Zimbabwean national history and identity.",
        image: "/images/downloads/national-heroes-acre-portrait.jpeg",
        note: "Good for educational and civic trips."
      },
      {
        title: "City viewpoint stop",
        description: "Take in Warren Hills views while keeping the visit respectful and brief.",
        image: "/images/downloads/national-heroes-acre-wide.jpeg",
        note: "Confirm photography rules first."
      }
    ]
  },
  {
    id: "23",
    slug: "the-boma-dinner-drum-show",
    name: "The Boma Dinner & Drum Show",
    region: "Matabeleland North",
    category: "Cultural Experience",
    image: "/images/downloads/boma-dinner-wide.jpeg",
    description: "A Victoria Falls cultural dinner experience with traditional dance, drumming, storytelling and local cuisine.",
    coordinates: { lat: -17.932, lng: 25.83 },
    mapNote: "Use Victoria Falls town or lodge pickup arrangements and book dinner/show times ahead.",
    driveTimeFromHarare: "Best combined with Victoria Falls travel; fly to Victoria Falls Airport or drive about 8-10 hours.",
    nearestArrivalHub: "Victoria Falls town / lodge pickup",
    highlights: ["Drum show", "Traditional dance", "Local cuisine", "Storytelling"],
    bestFor: ["Culture", "Food", "Families", "Evening activity"],
    careTips: [
      "Book ahead during busy travel seasons.",
      "Confirm pickup and return transport before the evening.",
      "Check dietary requirements when booking.",
      "Keep valuables secure during busy evening movement."
    ],
    clothingTips: [
      "Smart casual evening clothing.",
      "Light jacket in winter evenings.",
      "Comfortable shoes for movement and dancing.",
      "Mosquito protection for evening outdoor areas."
    ],
    estimatedEntryFee: "Activity price varies by operator and package",
    activities: [
      {
        title: "Dinner and local cuisine",
        description: "Experience a hosted dinner built around local flavours and Victoria Falls evening hospitality.",
        image: "/images/downloads/boma-dinner-show.jpeg",
        note: "Confirm dietary needs and booking time."
      },
      {
        title: "Drumming and dance",
        description: "Join an interactive cultural performance with drumming, dance and storytelling.",
        image: "/images/downloads/boma-drumming.jpeg",
        note: "Good evening activity after daytime Falls visits."
      },
      {
        title: "Victoria Falls cultural night",
        description: "Use the Boma as a memorable cultural close to a Falls itinerary.",
        image: "/images/downloads/boma-dinner-wide.jpeg",
        note: "Arrange transport back to accommodation before going."
      }
    ]
  },
  {
    id: "24",
    slug: "chitungwiza-arts-centre",
    name: "Chitungwiza Arts Centre",
    region: "Harare Metropolitan",
    category: "Art & Culture",
    image: "/images/downloads/national-gallery-interior.jpeg",
    description: "A vibrant cooperative south of Harare known for stone carving, visual artists and local creative enterprise.",
    coordinates: { lat: -18.01, lng: 31.08 },
    mapNote: "Use Harare or Chitungwiza as the route anchor and arrange a guided visit where possible.",
    driveTimeFromHarare: "About 30-60 minutes from central Harare depending on traffic.",
    nearestArrivalHub: "Harare / Chitungwiza",
    highlights: ["Stone carving", "Local artists", "Craft buying", "Creative workshops"],
    bestFor: ["Culture", "Art", "Shopping", "Education"],
    careTips: [
      "Arrange a guided visit or confirmed artist contact before arrival.",
      "Carry cash or confirmed payment options for art purchases.",
      "Ask before photographing artists or works.",
      "Use safe transport and plan around city traffic."
    ],
    clothingTips: [
      "Comfortable casual city clothing.",
      "Closed shoes for workshop spaces.",
      "Hat and sunscreen for outdoor areas.",
      "Simple bag for purchases or small artworks."
    ],
    estimatedEntryFee: "Usually depends on visit arrangement or purchases",
    activities: [
      {
        title: "Stone carving studios",
        description: "Meet local artists and see Zimbabwean stone sculpture work in progress.",
        image: "/images/downloads/national-gallery-interior.jpeg",
        note: "Ask before taking photos or handling artworks."
      },
      {
        title: "Art buying and learning",
        description: "Use the centre to buy directly from artists and understand local creative enterprise.",
        image: "/images/downloads/national-gallery-wide.jpeg",
        note: "Carry confirmed payment options and agree prices respectfully."
      },
      {
        title: "Harare creative route",
        description: "Combine Chitungwiza Arts Centre with the National Gallery or city culture stops.",
        image: "/images/downloads/national-gallery-wide.jpeg",
        note: "Plan traffic time carefully."
      }
    ]
  },
  {
    id: "4",
    slug: "chimanimani",
    name: "Chimanimani",
    region: "Manicaland",
    category: "Mountain Adventure",
    image: "/images/downloads/chimanimani-mountains.jpeg",
    description: "A rugged mountain wilderness of quartzite peaks, deep gorges, natural pools, waterfall walks and quiet nature stays.",
    coordinates: { lat: -19.8, lng: 32.86 },
    mapNote: "Use Chimanimani village and the national park access points as anchors, then confirm guides, routes and weather before hiking.",
    driveTimeFromHarare: "About 6-7 hours by road through Mutare depending on route and road conditions.",
    nearestArrivalHub: "Mutare / Chimanimani village",
    highlights: ["Quartzite peaks", "Bridalveil Falls", "Natural pools", "Mountain hiking"],
    bestFor: ["Hiking", "Adventure", "Nature", "Photography"],
    careTips: [
      "Use a local guide for unfamiliar mountain routes and waterfall walks.",
      "Start hikes early because mist, rain and darkness can make trails risky.",
      "Carry water, snacks, rain protection and offline contact details.",
      "Drive carefully on mountain roads and avoid night movement where possible."
    ],
    clothingTips: [
      "Hiking shoes with grip for mountain paths.",
      "Warm layers for cool mountain air and changing weather.",
      "Rain jacket or windbreaker for mist and sudden showers.",
      "Long trousers and comfortable outdoor clothes for grass, rocks and trails."
    ],
    estimatedEntryFee: "Depends on park access and guide arrangements",
    activities: [
      {
        title: "Quartzite mountain hiking",
        description: "Walk rugged Chimanimani routes with a guide for quartzite peaks, open views and fresh mountain air.",
        image: "/images/downloads/chimanimani-hiking.jpeg",
        note: "Start early and check weather before entering mountain routes."
      },
      {
        title: "Bridalveil Falls & pools",
        description: "Visit waterfall areas, forest routes and nearby natural pools for calm nature moments and photography.",
        image: "/images/downloads/bridalveil-falls-wide.jpeg",
        note: "Use known routes and avoid slippery edges after rain."
      },
      {
        title: "Village and basecamp rest",
        description: "Slow the trip down with Chimanimani village stops, lodge meals and basecamp-style mountain evenings.",
        image: "/images/downloads/chimanimani-mountains.jpeg",
        note: "Good for visitors who want adventure without rushing the route."
      }
    ]
  },
  {
    id: "7",
    slug: "vumba",
    name: "Vumba",
    region: "Manicaland",
    category: "Garden Escape",
    image: "/images/downloads/vumba-mountains.jpeg",
    description: "The Mountains of Mist near Mutare, known for cool botanical gardens, indigenous forest, birdlife, viewpoints, cafes and peaceful lodge stays.",
    coordinates: { lat: -19.1, lng: 32.75 },
    mapNote: "Use Mutare and Vumba road bases for garden visits, viewpoints, cafes and lodge movement.",
    driveTimeFromHarare: "About 4-5 hours by road through Mutare.",
    nearestArrivalHub: "Mutare / Vumba lodge road",
    highlights: ["Bvumba Botanical Gardens", "Mountains of Mist", "Birdwatching", "Leopard Rock views"],
    bestFor: ["Wellness", "Couples", "Nature", "Photography"],
    careTips: [
      "Mountain mist can reduce visibility, so avoid late unfamiliar drives.",
      "Confirm garden and cafe opening times before travelling.",
      "Carry warm clothing because Vumba can be cool and damp.",
      "Use local guidance for viewpoints and forest walks."
    ],
    clothingTips: [
      "Light jacket or fleece for cool misty weather.",
      "Comfortable walking shoes for gardens and viewpoints.",
      "Rain jacket or umbrella during wet periods.",
      "Smart casual clothes for lodge meals and cafe stops."
    ],
    estimatedEntryFee: "Depends on garden or attraction",
    activities: [
      {
        title: "Bvumba Botanical Gardens",
        description: "Explore peaceful gardens, flowers, walking paths and the cool mountain air that gives Vumba its misty identity.",
        image: "/images/downloads/vumba-mountains.jpeg",
        note: "Good for relaxed couples, families and photography."
      },
      {
        title: "Misty viewpoints & birding",
        description: "Stop at highland viewpoints and forest-edge areas for layered scenery, birdwatching and quiet photos.",
        image: "/images/downloads/vumba-mist.jpeg",
        note: "Go in clear weather for the best view."
      },
      {
        title: "Cafe and lodge route",
        description: "Use Vumba for calm meals, tea stops and peaceful lodge rest.",
        image: "/images/downloads/vumba-view.jpeg",
        note: "Plan daylight movement back to Mutare or the lodge."
      }
    ]
  },
  {
    id: "8",
    slug: "honde-valley",
    name: "Honde Valley",
    region: "Manicaland",
    category: "Valley Scenic",
    image: "/images/downloads/honde-valley-tea.jpeg",
    description: "A lush valley known for tea estates, green scenery, waterfall views and road-trip photography.",
    coordinates: { lat: -18.55, lng: 32.85 },
    mapNote: "Use Mutasa, Nyanga or Mutare as practical anchors before entering the valley routes.",
    driveTimeFromHarare: "About 4.5-6 hours by road depending on route and road conditions.",
    nearestArrivalHub: "Mutare / Mutasa / Nyanga route",
    highlights: ["Tea estates", "Valley views", "Waterfall routes", "Green scenery"],
    bestFor: ["Nature", "Photography", "Road trips", "Wellness"],
    careTips: [
      "Check road conditions before valley drives, especially after rain.",
      "Use local guidance for tea estate viewpoints and waterfall routes.",
      "Avoid rushing the drive because curves, mist and wet roads can be difficult.",
      "Carry cash, water and offline directions for rural stops."
    ],
    clothingTips: [
      "Comfortable casual clothes for scenic drives and short walks.",
      "Light jacket for cool valley mornings and mist.",
      "Walking shoes with grip for waterfall or tea viewpoint stops.",
      "Rain protection during wet weather."
    ],
    estimatedEntryFee: "Depends on activity or estate access",
    activities: [
      {
        title: "Tea estate views",
        description: "Enjoy green tea landscapes, valley scenery and quiet photography stops.",
        image: "/images/downloads/honde-valley-tea.jpeg",
        note: "Respect private access rules and use local guidance."
      },
      {
        title: "Waterfall and valley photos",
        description: "Use the valley route for waterfalls, mountain edges and soft landscape views.",
        image: "/images/downloads/honde-valley-view.jpeg",
        note: "Avoid slippery places after rain."
      },
      {
        title: "Scenic road trip",
        description: "Plan a slower drive through green valley areas with food, rest and viewpoint stops.",
        image: "/images/downloads/honde-valley-tea.jpeg",
        note: "Best done in daylight with enough time for the return route."
      }
    ]
  },
  {
    id: "9",
    slug: "binga",
    name: "Binga",
    region: "Matabeleland North",
    category: "Lake Culture",
    image: "/images/lake-kariba-houseboat.png",
    description: "A quieter Lake Kariba-side destination for fishing, lake views, Tonga culture and warm-weather rest.",
    coordinates: { lat: -17.62, lng: 27.34 },
    mapNote: "Use Binga town, lakefront lodges and local boat operators as practical anchors before planning lake activities.",
    driveTimeFromHarare: "About 8-10 hours by road depending on route, or combine with a wider Kariba or Victoria Falls journey.",
    nearestArrivalHub: "Binga town / lakefront lodge areas",
    highlights: ["Lake views", "Fishing", "Tonga culture", "Boating"],
    bestFor: ["Relaxation", "Culture", "Fishing", "Families"],
    careTips: [
      "Use verified boat operators and life jackets for lake activities.",
      "Keep away from unsafe lake edges because crocodiles and hippos may be present.",
      "Confirm road timing, fuel and lodge booking before travelling.",
      "Carry sun protection, water and mosquito protection for hot lake weather."
    ],
    clothingTips: [
      "Light breathable clothing for hot days.",
      "Hat, sunglasses and sunscreen for lakefront time.",
      "Sandals or comfortable shoes for lodge and boat movement.",
      "Light long sleeves for mosquitoes around sunset."
    ],
    estimatedEntryFee: "Activity prices vary by operator",
    activities: [
      {
        title: "Lake and fishing time",
        description: "Use Binga for quiet lake activities, fishing plans and warm-water scenery.",
        image: "/images/lake-kariba-houseboat.png",
        note: "Confirm operator safety rules before going on the water."
      },
      {
        title: "Tonga culture stops",
        description: "Learn about local Tonga culture, crafts and community identity around the Binga area.",
        image: "/images/great-zimbabwe-culture.png",
        note: "Use respectful local guidance for cultural visits."
      },
      {
        title: "Sunset lake views",
        description: "Slow down with lakefront sunsets, lodge meals and quiet evening photos.",
        image: "/images/lake-kariba-sunset.png",
        note: "Good for relaxed travellers and family trips."
      }
    ]
  },
  {
    id: "5",
    slug: "nyanga",
    name: "Nyanga",
    region: "Manicaland",
    category: "Mountain Escape",
    image: "/images/downloads/nyanga-worlds-view-real.jpeg",
    description: "Zimbabwe's highland escape with Mount Nyangani, the country's highest peak, cool air, trout waters, waterfalls, ancient stone ruins and quiet lodges.",
    coordinates: { lat: -18.2167, lng: 32.75 },
    mapNote: "Plan around Troutbeck, Worlds View, Nyanga National Park and Juliasdale because mountain roads get dark quickly.",
    driveTimeFromHarare: "About 4-5 hours by road.",
    nearestArrivalHub: "Nyanga village / Juliasdale / Troutbeck area",
    highlights: ["Mount Nyangani", "Worlds View", "Mutarazi Falls", "Trout fishing"],
    bestFor: ["Wellness", "Couples", "Nature", "Photography"],
    careTips: [
      "Start hikes early and avoid walking in thick mist around mountains or cliffs.",
      "Stay on known paths at Worlds View, Mount Nyangani and waterfall areas.",
      "Carry warm layers because Nyanga can become cold quickly.",
      "Plan driving before dark because mountain roads are harder at night."
    ],
    clothingTips: [
      "Warm jacket, jersey or fleece because Nyanga can be cold.",
      "Walking shoes for viewpoints, waterfalls and light hiking.",
      "Rain jacket or windbreaker for misty mountain weather.",
      "Long trousers or comfortable outdoor clothes for grass and trails."
    ],
    estimatedEntryFee: "Depends on attraction",
    activities: [
      {
        title: "Mount Nyangani & Worlds View",
        description: "Use clear-weather mornings for Mount Nyangani routes, open viewpoints, cool air and quiet photography.",
        image: "/images/downloads/nyanga-worlds-view-real.jpeg",
        note: "Go in clear weather and avoid cliff edges or thick mist."
      },
      {
        title: "Mutarazi Falls & skywalk",
        description: "Experience one of Zimbabwe's dramatic waterfall landscapes and Honde Valley views.",
        image: "/images/downloads/nyanga-skywalk-real.jpeg",
        note: "Check access, weather and operator availability before travelling."
      },
      {
        title: "Trout, dams & ancient ruins",
        description: "Slow the trip down with trout waters, dams, Nyanga lodge meals and ancient stone ruin stops like Nyangwe Fort.",
        image: "/images/downloads/inyangombe-falls-pool.jpeg",
        note: "Good for families, couples and visitors who want a calmer plan."
      }
    ]
  },
  {
    id: "25",
    slug: "mavuradonha-mountains",
    name: "Mavuradonha Mountains",
    region: "Mashonaland Central",
    category: "Mountain Wilderness",
    image: "/images/downloads/chimanimani-mountains.jpeg",
    description: "A protected national heritage mountain wilderness north of Harare, known for rugged terrain, wildlife edges, hiking and quiet nature exploration.",
    coordinates: { lat: -16.52, lng: 31.67 },
    mapNote: "Use Centenary, Muzarabani or local access guidance as anchors, then confirm roads, permissions and weather before entering wilderness areas.",
    driveTimeFromHarare: "About 3-4.5 hours by road depending on the access route and road conditions.",
    nearestArrivalHub: "Harare / Centenary / Muzarabani access routes",
    highlights: ["Mountain wilderness", "Hiking", "Wildlife edges", "Remote scenery"],
    bestFor: ["Mountains", "Adventure", "Nature", "Photography"],
    careTips: [
      "Confirm access, local guidance and road conditions before travelling.",
      "Avoid entering remote routes late in the day or without enough fuel, water and phone backup.",
      "Use a local guide for unfamiliar hiking or wilderness routes.",
      "Carry cash, offline directions and basic first-aid because services can be limited."
    ],
    clothingTips: [
      "Hiking shoes or sturdy outdoor shoes.",
      "Lightweight long trousers and breathable outdoor clothing.",
      "Hat, sunscreen and enough water for exposed terrain.",
      "Warm layer or rain jacket depending on season and weather."
    ],
    estimatedEntryFee: "Depends on access point, guide and activity arrangements",
    activities: [
      {
        title: "Mountain wilderness walk",
        description: "Explore rugged mountain scenery with local guidance and enough time for safe daylight movement.",
        image: "/images/downloads/chimanimani-hiking.jpeg",
        note: "Best for travellers who want a quieter, less commercial mountain experience."
      },
      {
        title: "Scenic nature drive",
        description: "Use the approach roads and viewpoints for photography, landscape stops and slow exploration.",
        image: "/images/downloads/nyanga-worlds-view-real.jpeg",
        note: "Check road conditions before travelling, especially after rain."
      },
      {
        title: "Wildlife-edge exploring",
        description: "Look for birdlife, small wildlife signs and natural scenery while respecting protected-area rules.",
        image: "/images/downloads/birds-sanctuary-2.jpeg",
        note: "Keep distance from wildlife and travel with people who know the area."
      }
    ]
  },
  {
    id: "6",
    slug: "lake-kariba",
    name: "Lake Kariba",
    region: "Mashonaland West",
    category: "Lake & Leisure",
    image: "/images/explore-kariba-lake-sunset.png",
    description: "A relaxed lake destination for sunsets, boating, fishing, family stays and wildlife edges.",
    coordinates: { lat: -16.5167, lng: 28.8 },
    mapNote: "Use Kariba town, the marina and lakefront lodge areas as practical GPS anchors before booking boat activities.",
    driveTimeFromHarare: "About 5-6 hours by road.",
    nearestArrivalHub: "Kariba town / marina area",
    highlights: ["Kariba Heights", "Boat cruises", "Fishing", "Sunset views"],
    bestFor: ["Families", "Relaxation", "Fishing", "Wildlife"],
    careTips: [
      "Use verified boat operators and life jackets for lake activities.",
      "Keep away from the water edge because crocodiles and hippos can be present.",
      "Confirm fuel, road timing and pickup points before leaving Harare or Kariba town.",
      "Carry sun protection, water and mosquito protection around the lake."
    ],
    clothingTips: [
      "Light casual clothes for hot lake days.",
      "Swimwear or quick-dry clothes if the lodge has safe pool or boat activities.",
      "Hat, sunglasses, sandals and sunscreen for lakefront time.",
      "Light long sleeves for mosquitoes around sunset."
    ],
    estimatedEntryFee: "Activity prices vary by operator",
    activities: [
      {
        title: "Lake sunset cruise",
        description: "Use the evening for soft lake views, photos, food and relaxed movement on the water.",
        image: "/images/explore-kariba-premium-cruise.png",
        note: "Use verified operators and wear a life jacket on boats."
      },
      {
        title: "Houseboat experience",
        description: "Plan a slower family or group stay with lake time, meals and views from the water.",
        image: "/images/lake-kariba-houseboat.png",
        note: "Confirm capacity, meals, fuel and safety rules before paying."
      },
      {
        title: "Kariba Dam & heights",
        description: "Visit the dam wall and viewpoints around Kariba Heights for context and photos.",
        image: "/images/kariba-dam-heights.png",
        note: "Good first activity before a cruise, lodge check-in or fishing plan."
      }
    ],
    wildlifeStory: {
      eyebrow: "A historic Kariba rescue",
      title: "Operation Noah saved wildlife from the rising lake",
      summary: "As Lake Kariba filled, rescuers crossed the new waters to reach animals stranded on shrinking islands.",
      body: [
        "When the dam began holding back the Zambezi, rising water covered the valley and turned its highest ground into temporary islands. Animals, birds and smaller creatures gathered on land that continued to shrink.",
        "By 1959, several rescue teams were operating on the lake. Rangers, veterinary staff, local workers and volunteers travelled by boat, captured stranded wildlife and moved the animals to safer mainland areas.",
        "The work was difficult and dangerous. Submerged trees threatened the boats while frightened animals and reptiles defended themselves on the islands. Despite those conditions, the historical account records that no rescuers lost their lives during the operation.",
        "A monument at Kariba Heights remembers Operation Noah. It gives today's lake views a deeper meaning: Kariba is not only a place of sunsets and houseboats, but also a landscape shaped by displacement, courage and rescue."
      ],
      image: "/images/lake-kariba-houseboat.png",
      imageNote: "Illustrative Lake Kariba image.",
      sourceName: "Visit Kariba historical account"
    }
  },
  {
    id: "29",
    slug: "lake-mutirikwi",
    name: "Lake Mutirikwi",
    region: "Masvingo",
    category: "Lake & Heritage",
    image: "/images/downloads/lake-mutirikwi-dam.jpeg",
    description: "A scenic Masvingo lake destination often paired with Great Zimbabwe, known for viewpoints, picnics, fishing, lodges and relaxed nature add-ons.",
    coordinates: { lat: -20.23, lng: 31.02 },
    mapNote: "Use Masvingo, Great Zimbabwe and Lake Mutirikwi recreational areas as practical anchors, then confirm access points and lodge availability before travelling.",
    driveTimeFromHarare: "About 4-5 hours to Masvingo by road, then local movement toward the lake.",
    nearestArrivalHub: "Masvingo / Great Zimbabwe route",
    highlights: ["Lake viewpoints", "Fishing", "Picnic stops", "Great Zimbabwe add-on"],
    bestFor: ["Lake", "Families", "Culture", "Photography"],
    careTips: [
      "Confirm current access points, fees and activity rules before travelling.",
      "Use verified operators for any boat or fishing activity.",
      "Keep away from unsafe water edges and supervise children near the lake.",
      "Carry sun protection, water and enough time for the Masvingo return route."
    ],
    clothingTips: [
      "Light casual clothes for warm lake days.",
      "Comfortable shoes for viewpoints and picnic areas.",
      "Hat, sunglasses and sunscreen.",
      "Light jacket for cooler evenings near the water."
    ],
    estimatedEntryFee: "Confirm current fee before visiting",
    activities: [
      {
        title: "Lake viewpoint picnic",
        description: "Use the lake for a softer picnic and photo stop after Great Zimbabwe or Masvingo town movement.",
        image: "/images/downloads/lake-mutirikwi-view.jpeg",
        note: "Good for families and relaxed heritage itineraries."
      },
      {
        title: "Fishing and water-side rest",
        description: "Plan fishing or quiet water-side time through verified local arrangements.",
        image: "/images/downloads/lake-mutirikwi-dam.jpeg",
        note: "Confirm rules, equipment and safe access before paying."
      },
      {
        title: "Great Zimbabwe add-on",
        description: "Pair the lake with Great Zimbabwe for a balanced culture-and-nature day.",
        image: "/images/great-zimbabwe-ruins.png",
        note: "Keep enough daylight for the return to Masvingo."
      }
    ]
  },
  {
    id: "30",
    slug: "lake-chivero",
    name: "Lake Chivero",
    region: "Mashonaland West / Harare Metro",
    category: "Lake Day Trip",
    image: "/images/downloads/lake-chivero-view.jpeg",
    description: "A Harare-area lake and recreational park option for day trips, water views, picnics, birding and short family outings.",
    coordinates: { lat: -17.88, lng: 30.78 },
    mapNote: "Use Harare and Lake Chivero Recreational Park access points as anchors, then confirm current access, park rules and activity availability before travelling.",
    driveTimeFromHarare: "About 40-70 minutes from central Harare depending on traffic and access point.",
    nearestArrivalHub: "Harare / Lake Chivero access roads",
    highlights: ["Harare day trip", "Picnic areas", "Birding", "Lake views"],
    bestFor: ["Lake", "Families", "Birding", "Short trips"],
    careTips: [
      "Confirm current park access, fees and safety rules before travelling.",
      "Do not swim or move close to unsafe water edges unless the area is clearly approved.",
      "Carry water, snacks, sun protection and small cash for practical needs.",
      "Leave before it gets too late if returning to Harare by road."
    ],
    clothingTips: [
      "Comfortable casual clothes for a day trip.",
      "Walking shoes or sturdy sandals.",
      "Hat, sunscreen and sunglasses.",
      "Light jacket for windy or cooler lake-side conditions."
    ],
    estimatedEntryFee: "Confirm current fee before visiting",
    activities: [
      {
        title: "Lake picnic day",
        description: "Use Lake Chivero for a simple picnic, family rest and water-side scenery close to Harare.",
        image: "/images/downloads/lake-chivero-view.jpeg",
        note: "Keep the plan simple and confirm park rules before travelling."
      },
      {
        title: "Birding and nature viewing",
        description: "Look for birdlife and quiet nature moments around approved viewing areas.",
        image: "/images/downloads/lake-chivero-ostrich.jpeg",
        note: "Go earlier in the day for calmer light and easier movement."
      },
      {
        title: "Short Harare escape",
        description: "Make it a half-day or full-day break from Harare with food, rest and photos.",
        image: "/images/downloads/lake-chivero-ostrich.jpeg",
        note: "Best for users who want a nearby lake without a long trip."
      }
    ]
  },
  {
    id: "16",
    slug: "mtarazi-falls",
    name: "Mtarazi Falls",
    region: "Manicaland",
    category: "Waterfall",
    image: "/images/downloads/nyanga-skywalk-bridge-real.jpeg",
    description: "Zimbabwe's highest waterfall in Mutarazi National Park, known for its 762-meter drop, skywalk, zipline and Honde Valley views.",
    coordinates: { lat: -18.495, lng: 32.82 },
    mapNote: "Use Nyanga, Mutasa or Honde Valley routes as anchors, then confirm road conditions, weather and operator availability.",
    driveTimeFromHarare: "About 4-5 hours by road depending on the route and final base.",
    nearestArrivalHub: "Nyanga / Mutasa / Honde Valley route",
    highlights: ["Highest waterfall", "Skywalk", "Zipline", "Honde Valley views"],
    bestFor: ["Waterfalls", "Adventure", "Photography", "Nature"],
    careTips: [
      "Confirm weather and operator availability before travelling.",
      "Use licensed operators for skywalk or zipline activities.",
      "Stay on marked paths near cliff and waterfall edges.",
      "Carry warm layers and rain protection because mountain weather changes quickly."
    ],
    clothingTips: [
      "Walking shoes with grip for viewpoints and paths.",
      "Warm jacket or windbreaker for mountain air.",
      "Rain jacket or quick-dry layer near misty areas.",
      "Comfortable outdoor clothes for skywalk or zipline activities."
    ],
    estimatedEntryFee: "Depends on park access and activity operator",
    activities: [
      {
        title: "Skywalk and viewpoint",
        description: "Stand above the dramatic drop and see the waterfall landscape open toward Honde Valley.",
        image: "/images/downloads/nyanga-skywalk-bridge-real.jpeg",
        note: "Check weather and operator rules before arriving."
      },
      {
        title: "Waterfall photography",
        description: "Use the viewpoints for big landscape photos, mist and mountain scenery.",
        image: "/images/downloads/nyanga-skywalk-real.jpeg",
        note: "Clear weather gives the strongest views."
      },
      {
        title: "Adventure add-on",
        description: "Add zipline or guided adventure experiences when available through verified operators.",
        image: "/images/downloads/nyanga-worlds-view-real.jpeg",
        note: "Use licensed operators only."
      }
    ]
  },
  {
    id: "17",
    slug: "bridalveil-falls",
    name: "Bridalveil Falls",
    region: "Manicaland",
    category: "Waterfall",
    image: "/images/downloads/bridalveil-falls-wide.jpeg",
    description: "A misty 50-meter waterfall inside the Chimanimani area, known for hiking, natural pools and a veil-like spray.",
    coordinates: { lat: -19.78, lng: 32.86 },
    mapNote: "Use Chimanimani village as the base, then confirm trail access and local guidance before walking to the falls.",
    driveTimeFromHarare: "About 6-7 hours by road through Mutare and Chimanimani.",
    nearestArrivalHub: "Chimanimani village",
    highlights: ["Misty waterfall", "Hiking", "Natural pools", "Chimanimani trails"],
    bestFor: ["Waterfalls", "Hiking", "Nature", "Photography"],
    careTips: [
      "Use local guidance for trail conditions and safe access.",
      "Avoid slippery rocks and waterfall edges after rain.",
      "Start walks early and avoid returning after dark.",
      "Carry water, snacks and rain protection."
    ],
    clothingTips: [
      "Hiking shoes with grip.",
      "Quick-dry or outdoor clothing for mist and pool areas.",
      "Light rain jacket or windbreaker.",
      "Long trousers for grass and trail protection."
    ],
    estimatedEntryFee: "Depends on access and guide arrangements",
    activities: [
      {
        title: "Waterfall hike",
        description: "Walk to the falls through Chimanimani scenery and enjoy the misty waterfall setting.",
        image: "/images/downloads/bridalveil-falls-wide.jpeg",
        note: "Use known paths and avoid late starts."
      },
      {
        title: "Natural pool stop",
        description: "Relax near clear natural pools where conditions and local guidance allow.",
        image: "/images/downloads/bridalveil-falls-portrait.jpeg",
        note: "Check safety before swimming or wading."
      },
      {
        title: "Chimanimani nature day",
        description: "Combine the falls with village rest, mountain views and a guided nature walk.",
        image: "/images/downloads/chimanimani-hiking.jpeg",
        note: "Keep dinner close to accommodation after the trail day."
      }
    ]
  },
  {
    id: "18",
    slug: "inyangombe-falls",
    name: "Inyangombe Falls",
    region: "Manicaland",
    category: "Waterfall",
    image: "/images/downloads/inyangombe-falls-real.jpeg",
    description: "A series of cascading tiers on the Inyangombe River in Nyanga National Park, popular for scenic viewing, photography and picnics.",
    coordinates: { lat: -18.25, lng: 32.69 },
    mapNote: "Use Nyanga National Park and nearby lodge routes as anchors for easy vehicle access and picnic planning.",
    driveTimeFromHarare: "About 4-5 hours by road to Nyanga, then local park movement.",
    nearestArrivalHub: "Nyanga / Juliasdale / Troutbeck area",
    highlights: ["Cascading falls", "Picnics", "Photography", "Brighton Beach area"],
    bestFor: ["Waterfalls", "Families", "Photography", "Nature"],
    careTips: [
      "Use marked access points and avoid slippery rocks.",
      "Supervise children closely near riverbanks and wading areas.",
      "Carry water and warm layers because Nyanga weather can change.",
      "Plan park movement before dark."
    ],
    clothingTips: [
      "Comfortable walking shoes with grip.",
      "Warm jacket or fleece for Nyanga weather.",
      "Quick-dry clothes if wading is safe and allowed.",
      "Hat and sunscreen for daytime picnics."
    ],
    estimatedEntryFee: "Depends on park access",
    activities: [
      {
        title: "Cascading falls viewing",
        description: "View and photograph the stepped waterfall sections along the Inyangombe River.",
        image: "/images/downloads/inyangombe-falls-real.jpeg",
        note: "Take care on wet rocks and river edges."
      },
      {
        title: "Picnic and wading area",
        description: "Use safe riverbank areas for family rest, photos and gentle nature time.",
        image: "/images/downloads/inyangombe-falls-pool.jpeg",
        note: "Only wade where conditions are safe and permitted."
      },
      {
        title: "Nyanga park loop",
        description: "Combine the falls with Rhodes Dam, lodges or nearby scenic stops.",
        image: "/images/downloads/nyanga-worlds-view-real.jpeg",
        note: "Good for families and relaxed Nyanga itineraries."
      }
    ]
  },
  {
    id: "19",
    slug: "pungwe-falls",
    name: "Pungwe Falls",
    region: "Manicaland",
    category: "Waterfall",
    image: "/images/eastern-highlands-waterfall-view.png",
    description: "A powerful multi-tiered waterfall dropping into the Pungwe Gorge, reached through scenic Nyanga mountain routes.",
    coordinates: { lat: -18.38, lng: 32.78 },
    mapNote: "Use Nyanga and Pungwe Drift routes carefully, checking road and weather conditions before travelling.",
    driveTimeFromHarare: "About 4-5.5 hours by road depending on base and route.",
    nearestArrivalHub: "Nyanga / Pungwe Drift route",
    highlights: ["Pungwe Gorge", "Mountain trails", "Waterfall viewpoints", "Photography"],
    bestFor: ["Waterfalls", "Hiking", "Adventure", "Photography"],
    careTips: [
      "Confirm access and road conditions before heading to the gorge area.",
      "Avoid unmarked trails and cliff edges.",
      "Carry water, warm layers and rain protection.",
      "Use local guidance if unfamiliar with the route."
    ],
    clothingTips: [
      "Hiking shoes with good grip.",
      "Warm layers for mountain conditions.",
      "Rain jacket or windbreaker.",
      "Comfortable outdoor clothes for trail movement."
    ],
    estimatedEntryFee: "Depends on park or route access",
    activities: [
      {
        title: "Pungwe Gorge viewing",
        description: "Use the viewpoints and mountain routes to see the waterfall dropping into the gorge.",
        image: "/images/eastern-highlands-scenic-road.png",
        note: "Stay back from cliff edges and use safe viewpoints."
      },
      {
        title: "Mountain trail photography",
        description: "Capture waterfall, gorge and mountain scenery along the Nyanga route.",
        image: "/images/nyanga-worlds-view.png",
        note: "Clear mornings are usually better for views."
      },
      {
        title: "Pungwe Drift route",
        description: "Plan a careful scenic drive with short stops and enough daylight for return movement.",
        image: "/images/nyanga-trout-dam-lodge.png",
        note: "Avoid rushing the route in wet or misty conditions."
      }
    ]
  },
  {
    id: "31",
    slug: "imire-rhino-wildlife-conservation",
    name: "Imire Rhino & Wildlife Conservation",
    region: "Mashonaland East",
    category: "Wildlife",
    image: "/images/downloads/imire-nzou-buffalo.png",
    description: "A conservation destination near Hwedza where visitors can learn about rhinos, elephants, buffalo and the people protecting Zimbabwe's wildlife.",
    coordinates: { lat: -18.446, lng: 31.483 },
    mapNote: "Use Imire and Hwedza as route anchors, then confirm your visit, transfer and activity times directly with the conservancy before travelling.",
    driveTimeFromHarare: "About 1.5-2 hours by road depending on the route and traffic.",
    nearestArrivalHub: "Harare / Marondera / Hwedza",
    highlights: ["Nzou and her buffalo herd", "Rhino conservation", "Guided wildlife viewing", "Conservation stories"],
    bestFor: ["Wildlife", "Families", "Conservation", "Photography"],
    careTips: [
      "Book or confirm the visit before travelling because activities and access can change.",
      "Follow every guide instruction around elephants, buffalo and rhinos.",
      "Never approach or feed wildlife without direct permission from trained staff.",
      "Carry water, sun protection and closed shoes for outdoor movement."
    ],
    clothingTips: [
      "Neutral, comfortable outdoor clothing.",
      "Closed walking shoes.",
      "Hat, sunglasses and sunscreen.",
      "A warm layer for early morning or winter visits."
    ],
    estimatedEntryFee: "Confirm current visitor package with Imire",
    activities: [
      {
        title: "Guided conservation visit",
        description: "Learn how the conservancy protects rhinos, elephants and other wildlife while supporting surrounding communities.",
        image: "/images/downloads/giraffe-wildlife-real.jpeg",
        note: "Confirm the current visitor programme and booking requirements."
      },
      {
        title: "Meet Nzou's unusual herd",
        description: "Hear the remarkable story of an orphaned elephant who grew up with buffalo and became their matriarch.",
        image: "/images/downloads/imire-nzou-buffalo.png",
        note: "Wildlife sightings and animal movements are never guaranteed."
      },
      {
        title: "Wildlife photography",
        description: "Photograph Zimbabwean wildlife and the conservancy landscape from guide-approved viewing areas.",
        image: "/images/downloads/birds-sanctuary-2.jpeg",
        note: "Keep a respectful distance and avoid flash around animals."
      }
    ],
    wildlifeStory: {
      eyebrow: "A true story from Imire",
      title: "Nzou, the elephant who became a buffalo matriarch",
      summary: "Orphaned as a calf, Nzou grew up alongside Cape buffalo at Imire and chose their herd as her family.",
      body: [
        "Nzou arrived at Imire as a young orphan in the 1970s. Because elephants need company, she was placed with the largest herd animals available at the time: the resident Cape buffalo.",
        "The relationship became permanent. Attempts to introduce Nzou to other elephants did not persuade her to leave the buffalo, and she eventually became the herd's matriarch, communicating and moving with them as family.",
        "Her loyalty became especially clear when a young buffalo badly injured one of her handlers. Nzou stood over the man and guarded him from further attacks while help was on the way.",
        "Imire still describes Nzou as its oldest female elephant and confirms that she lives with the buffalo herd. Her unusual life is a powerful story about belonging, memory and bonds that cross species."
      ],
      image: "/images/downloads/imire-nzou-buffalo.png",
      imageNote: "Story visual for Nzou and the buffalo herd at Imire.",
      sourceName: "Imire and Conservation Travel Africa"
    }
  }
];
