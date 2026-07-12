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
  { tag: "Wildlife", pattern: /wildlife|animal|animals|elephant|lion|rhino|buffalo|leopard|zebra|giraffe|safari|game drive|game park|national park/, expansion: "wildlife safari game drive elephant rhino national park conservation" },
  { tag: "Water", pattern: /water|waterfall|falls|river|zambezi|lake|dam|boat|cruise|swim|swimming|pool|canoe|fishing|beach/, expansion: "waterfall lake river boat cruise swimming fishing" },
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
