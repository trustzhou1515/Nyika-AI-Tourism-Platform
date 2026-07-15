import { normalizeSearchText } from "./searchParser";

export type NyikaNoticeTone = "care" | "warning" | "block";

export interface NyikaNotice {
  tone: NyikaNoticeTone;
  title: string;
  message: string;
  alternatives: string[];
}

export interface NyikaInsight {
  normalized: string;
  expandedQuery: string;
  detectedTags: string[];
  notice?: NyikaNotice;
}

const tagRules: Array<{ tag: string; pattern: RegExp; expansion: string }> = [
  { tag: "Elephants", pattern: /elephant|elephants/, expansion: "elephant elephants hwange gonarezhou mana pools imire victoria falls lake kariba safari conservation" },
  { tag: "Lions", pattern: /lion|lions|big cat|big cats/, expansion: "lion lions hwange gonarezhou lion and cheetah park safari big cats wildlife" },
  { tag: "Cheetahs", pattern: /cheetah|cheetahs|cheatah|cheatahs/, expansion: "cheetah cheetahs cheatah lion and cheetah park hwange gonarezhou big cats wildlife" },
  { tag: "Zebras", pattern: /zebra|zebras/, expansion: "zebra zebras hwange gonarezhou matobo mukuvisi haka mbizi imire wildlife" },
  { tag: "Rhinos", pattern: /rhino|rhinos|rhinoceros/, expansion: "rhino rhinos matobo imire matusadona conservation tracking wildlife" },
  { tag: "Birds", pattern: /bird|birds|birding|birdwatching|birdlife|eagle|fish eagle|hornbill|kingfisher|raptor|owl|vulture|falcon/, expansion: "birdlife birding kuimba shiri haka mukuvisi vumba lake chivero mana pools hwange fish eagle raptors" },
  { tag: "Water wildlife", pattern: /hippo|hippos|crocodile|crocodiles/, expansion: "hippo crocodile mana pools lake kariba victoria falls lake chivero binga zambezi wildlife safety" },
  { tag: "Antelope", pattern: /antelope|kudu|impala|eland|sable|nyala|waterbuck|bushbuck/, expansion: "antelope kudu impala eland sable nyala hwange gonarezhou mana pools matobo mbizi haka mukuvisi" },
  { tag: "Wildlife", pattern: /wildlife|animal|animals|elephant|lion|rhino|buffalo|leopard|cheetah|cheatah|zebra|giraffe|hyena|wild dog|hippo|crocodile|antelope|safari|game drive|game park|national park/, expansion: "wildlife safari game drive elephant rhino national park conservation" },
  { tag: "Fishing", pattern: /fishing|fish|angling|anglers/, expansion: "fishing lake dam river boat houseboat shore marina lake kariba lake chivero lake mutirikwi binga" },
  { tag: "Lakes & rivers", pattern: /lake|dam|river|zambezi|boat|cruise|houseboat|shore|marina|waterfront|canoe/, expansion: "lake dam river boat cruise houseboat canoe waterfront" },
  { tag: "Waterfalls", pattern: /waterfall|waterfalls|falls|cascade|rainforest|spray|rainbow/, expansion: "waterfall falls cascade rainforest mist spray rainbow" },
  { tag: "Water", pattern: /water|swim|swimming|pool|beach/, expansion: "lake river swimming pool water activity" },
  { tag: "Mountains", pattern: /mountain|highland|hills|peak|hike|hiking|walk|walking|forest|cool weather|mist|valley|viewpoint/, expansion: "mountain highlands hiking forest viewpoint cool weather" },
  { tag: "Heritage", pattern: /history|historic|heritage|culture|ruins|ancient|stone|monument|museum|art|gallery|traditional/, expansion: "heritage culture ruins ancient stone museum art" },
  { tag: "Rocks & caves", pattern: /rock|rocks|cave|caves|granite|balancing|blue pool|limestone|underground|shelter/, expansion: "rocks caves granite balancing blue pool heritage" },
  { tag: "Quiet", pattern: /quiet|peaceful|calm|relax|relaxing|private|hidden|secret|less crowded|rest|wellness/, expansion: "quiet peaceful hidden relaxing wellness" },
  { tag: "Family", pattern: /family|children|kids|school|students|group|siblings|friends|parents/, expansion: "family children school group easy access" },
  { tag: "Photos", pattern: /photo|photos|photography|camera|picture|pictures|video|content|instagram|beautiful|scenic|view/, expansion: "photography scenic viewpoint beautiful sunset" },
  { tag: "Bookings", pattern: /book|booking|reservation|reserve|pay|payment|accommodation|sleep|stay|hotel|lodge|room/, expansion: "booking accommodation lodge hotel stay" },
  { tag: "Transport", pattern: /transport|taxi|transfer|airport|pickup|pick up|shuttle|car hire|drive|road|arrive|arrival/, expansion: "transport taxi airport transfer arrival" },
  { tag: "Outfits", pattern: /clothes|clothing|wear|outfit|dress|shoes|boots|jacket|raincoat|hat|sunscreen|swimwear/, expansion: "clothing what to wear outfit safety sun rain swimwear" },
  { tag: "Food", pattern: /food|eat|eating|lunch|dinner|breakfast|restaurant|meal|traditional food|boma|drum show/, expansion: "food dinner restaurant traditional boma" }
];

const poachingPattern = /poach|poaching|snare|ivory|rhino horn|illegal hunt|illegal hunting|kill animal|kill animals|bushmeat/;
const huntingPattern = /hunting|hunt|trophy hunt|trophy hunting|shooting safari|rifle|professional hunter/;

function buildExpandedQuery(normalized: string, detectedExpansions: string[], notice?: NyikaNotice) {
  const safetyExpansion = notice ? "wildlife conservation photo safari game drive sanctuary ethical safari rhino tracking" : "";
  return [normalized, ...detectedExpansions, safetyExpansion].filter(Boolean).join(" ");
}

export function analyzeNyikaQuery(query: string): NyikaInsight {
  const normalized = normalizeSearchText(query);
  const detectedTags: string[] = [];
  const detectedExpansions: string[] = [];

  for (const rule of tagRules) {
    if (!rule.pattern.test(normalized)) continue;
    detectedTags.push(rule.tag);
    detectedExpansions.push(rule.expansion);
  }

  let notice: NyikaNotice | undefined;

  if (poachingPattern.test(normalized)) {
    notice = {
      tone: "block",
      title: "Wildlife must be protected",
      message: "Poaching is illegal and harmful. I can help with safe wildlife viewing, conservation visits and photo safaris instead.",
      alternatives: ["Photo safari", "Game drive", "Rhino tracking", "Conservation visit"]
    };
  } else if (huntingPattern.test(normalized)) {
    notice = {
      tone: "warning",
      title: "Hunting is highly regulated",
      message: "Nyika AI will not guide illegal hunting. For tourism, I can suggest legal wildlife viewing, licensed guide experiences and conservation-friendly safaris.",
      alternatives: ["Wildlife photography", "Game drive", "Walking safari", "Birding"]
    };
  }

  return {
    normalized,
    expandedQuery: buildExpandedQuery(normalized, detectedExpansions, notice),
    detectedTags,
    notice
  };
}
