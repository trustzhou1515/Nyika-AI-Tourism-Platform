import { type FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, MapPin, Send, ShieldCheck, Sparkles, Users } from "lucide-react";
import { destinations } from "../../data/destinations";
import { searchDestinations } from "../../utils/destinationMatcher";
import { analyzeNyikaQuery, type NyikaInsight } from "../../utils/nyikaIntelligence";
import { createResultSeed, randomizeStrongResults } from "../../utils/resultBatches";

const heroSlides = [
  {
    name: "Victoria Falls",
    image: "/images/hero-victoria-falls.webp",
    line: "Waterfalls, rainforest walks and Zambezi adventure."
  },
  {
    name: "Great Zimbabwe",
    image: "/images/hero-great-zimbabwe.webp",
    line: "Heritage, ancient stone architecture and culture."
  },
  {
    name: "Nyanga",
    image: "/images/hero-nyanga.webp",
    line: "Mountains, viewpoints, waterfalls and cool air."
  },
  {
    name: "Hwange National Park",
    image: "/images/hero-hwange.webp",
    line: "Wildlife, elephants, safari lodges and game drives."
  },
  {
    name: "Lake Kariba",
    image: "/images/hero-lake-kariba.webp",
    line: "Sunsets, houseboats, fishing and lake relaxation."
  }
];

const defaultHeroPrompt = "I want a peaceful getaway with stunning nature, wildlife and breathtaking views.";

const defaultHeroInsight = analyzeNyikaQuery(defaultHeroPrompt);

type HeroPlace = {
  name: string;
  slug: string;
  image: string;
  scoreLabel: string;
  matchScore: number;
  match: string;
};

function buildHeroMatches(query: string): HeroPlace[] {
  const insight = analyzeNyikaQuery(query);
  return searchDestinations(insight.expandedQuery, destinations)
    .map((result) => ({
      name: result.destination.name,
      slug: result.destination.slug,
      image: result.destination.image,
      scoreLabel: `${result.percentage}%`,
      matchScore: result.score,
      match: result.matchedCategories.slice(0, 2).join(" / ") || result.destination.category
    }));
}

const heroStats = [
  {
    icon: MapPin,
    value: "50+",
    label: "Destinations"
  },
  {
    icon: Camera,
    value: "1K+",
    label: "Experiences"
  },
  {
    icon: Users,
    value: "10K+",
    label: "Happy explorers"
  },
  {
    icon: ShieldCheck,
    value: "Trusted",
    label: "Curated by locals"
  }
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [heroPrompt, setHeroPrompt] = useState("");
  const [submittedPrompt, setSubmittedPrompt] = useState(defaultHeroPrompt);
  const [heroInsight, setHeroInsight] = useState<NyikaInsight>(defaultHeroInsight);
  const [heroAllMatches, setHeroAllMatches] = useState<HeroPlace[]>(() => randomizeStrongResults(buildHeroMatches(defaultHeroPrompt), createResultSeed(), 3));
  const [heroVisibleBatches, setHeroVisibleBatches] = useState(1);
  const [heroMoreDismissed, setHeroMoreDismissed] = useState(false);
  const heroMatches = heroAllMatches.slice(0, heroVisibleBatches * 3);
  const hasMoreHeroMatches = heroMatches.length < heroAllMatches.length;

  function handleHeroChat(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const prompt = heroPrompt.trim();
    if (!prompt) return;

    const nextInsight = analyzeNyikaQuery(prompt);
    const seed = createResultSeed();
    setSubmittedPrompt(prompt);
    setHeroInsight(nextInsight);
    setHeroAllMatches(randomizeStrongResults(buildHeroMatches(prompt), seed, 3));
    setHeroVisibleBatches(1);
    setHeroMoreDismissed(false);
    setHeroPrompt("");
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero nyikaHeroShowcase">
      <div className="container heroCard heroNyikaCard nyikaHeroStage">
        <div className="heroMedia nyikaHeroMedia" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.name}
              className={index === activeSlide ? "active" : undefined}
              src={slide.image}
              alt=""
            />
          ))}
        </div>

        <div className="heroOverlay nyikaHeroOverlay"></div>

        <div className="nyikaHeroRail" aria-label="Nyika AI hero navigation preview">
          <div className="nyikaHeroMark">
            <Sparkles size={22} />
            <div>
              <strong>Nyika AI</strong>
              <span>Explore Zimbabwe</span>
            </div>
          </div>

          <div className="nyikaHeroRailMenu">
            <span className="active">Home</span>
            <span>Explore</span>
            <span>Plan</span>
            <span>Map</span>
            <span>Memories</span>
          </div>

          <div className="nyikaHeroRailFoot">
            {heroStats.slice(0, 2).map((stat) => {
              const Icon = stat.icon;
              return (
                <span key={stat.label}>
                  <Icon size={16} />
                  {stat.value} {stat.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="nyikaHeroConversation" aria-live="polite">
          <div className="nyikaHeroTopLine">
            <span>Nyika AI</span>
            <small>Smart matching · Local knowledge · Budgeting</small>
          </div>

          <div className="nyikaHeroBubble assistant">
            <div className="nyikaHeroAvatar">Nyika</div>
            <div>
              <strong>Chat with your imagination.</strong>
              <p>Tell me the kind of place, feeling or trip you want. I will suggest places that feel right for you.</p>
            </div>
          </div>

          <div className="nyikaHeroBubble user">
            <p>{submittedPrompt}</p>
            <span>09:31</span>
          </div>

          <div className="nyikaHeroBubble assistant short">
            <div className="nyikaHeroAvatar">Nyika</div>
            <p>{heroInsight.notice ? heroInsight.notice.message : "Great choice. I found places that fit your feeling."}</p>
          </div>

          <div className="nyikaHeroResults">
            <div className="nyikaHeroResultHeader">
              <span><Sparkles size={17} /> Here are {heroMatches.length} matches for you</span>
              <small>Powered by Nyika AI</small>
            </div>

            <div className="nyikaHeroTags" aria-label="Detected interests">
              {(heroInsight.notice?.alternatives ?? (heroInsight.detectedTags.length > 0 ? heroInsight.detectedTags : ["Zimbabwe", "Places", "Trip ideas"])).slice(0, 4).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <div className="nyikaHeroMatchList">
              {heroMatches.map((place) => (
                <Link className="nyikaHeroMatch" to={`/destinations/${place.slug}`} key={place.slug}>
                  <img src={place.image} alt="" />
                  <div>
                    <strong>{place.name}</strong>
                    <span>{place.scoreLabel} match</span>
                    <small>{place.match}</small>
                  </div>
                  <MapPin size={18} />
                </Link>
              ))}
            </div>

            {hasMoreHeroMatches && !heroMoreDismissed && heroAllMatches.length > 3 && (
              <div className="nyikaMorePrompt">
                <span>Do you want more places?</span>
                <button type="button" onClick={() => setHeroVisibleBatches((current) => current + 1)}>
                  Yes
                </button>
                <button type="button" onClick={() => setHeroMoreDismissed(true)}>
                  No
                </button>
              </div>
            )}
          </div>

          <form className="nyikaHeroComposer" aria-label="Chat with Nyika AI from the hero" onSubmit={handleHeroChat}>
            <textarea
              rows={1}
              value={heroPrompt}
              onChange={(event) => setHeroPrompt(event.target.value)}
              placeholder="Type your message..."
              aria-label="Tell Nyika AI what kind of Zimbabwe trip you imagine"
            />
            <button type="submit" aria-label="Send message to Nyika AI">
              <Send size={20} />
            </button>
          </form>
        </div>

        <div className="nyikaHeroDots" aria-label="Featured Zimbabwe places">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.name}
              className={index === activeSlide ? "active" : undefined}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${slide.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
