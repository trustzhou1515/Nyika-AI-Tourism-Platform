import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Camera, MapPin, ShieldCheck, Sparkles, Users } from "lucide-react";

const heroSlides = [
  {
    name: "Victoria Falls",
    image: "/images/victoria-falls.png",
    line: "Waterfalls, rainforest walks and Zambezi adventure."
  },
  {
    name: "Great Zimbabwe",
    image: "/images/great-zimbabwe-ruins.png",
    line: "Heritage, ancient stone architecture and culture."
  },
  {
    name: "Nyanga",
    image: "/images/nyanga-highlands.png",
    line: "Mountains, viewpoints, waterfalls and cool air."
  },
  {
    name: "Hwange National Park",
    image: "/images/hwange-elephants.png",
    line: "Wildlife, elephants, safari lodges and game drives."
  },
  {
    name: "Lake Kariba",
    image: "/images/lake-kariba-sunset.png",
    line: "Sunsets, houseboats, fishing and lake relaxation."
  }
];

const demoPlaces = [
  {
    name: "Victoria Falls",
    slug: "victoria-falls",
    image: "/images/victoria-falls.png",
    score: "96%",
    match: "Waterfalls / Adventure"
  },
  {
    name: "Hwange National Park",
    slug: "hwange-national-park",
    image: "/images/hwange-elephants.png",
    score: "91%",
    match: "Wildlife / Safari"
  }
];

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
  const currentSlide = heroSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="container heroCard heroNyikaCard">
        <div className="heroMedia" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.name}
              className={index === activeSlide ? "active" : undefined}
              src={slide.image}
              alt=""
            />
          ))}
        </div>

        <div className="heroOverlay"></div>

        <div className="heroContent heroNyikaContent">
          <div className="heroWelcomeCopy">
            <span className="heroLabel">Nyika AI</span>
            <h1>
              <span>Nyika AI</span> finds the places you imagine.
            </h1>
            <p className="heroSub">
              Smart matching, local knowledge, budgeting.
            </p>
            <div className="heroPremiumSignals" aria-label="Nyika AI capabilities">
              <span>Smart matching</span>
              <span>Local knowledge</span>
              <span>Budgeting</span>
            </div>

            <div className="heroStatsPanel" aria-label="Explore Zimbabwe platform highlights">
              {heroStats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div className="heroStat" key={stat.label}>
                    <Icon size={24} />
                    <strong>{stat.value}</strong>
                    <small>{stat.label}</small>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="heroNyikaExperience">
            <div className="heroDemoLabel">
              <Sparkles size={15} />
              Example demo
            </div>

            <div className="homeNyikaChatCard heroNyikaChatCard" aria-live="polite">
              <div className="homeNyikaBubble assistant">
                <span>Nyika AI</span>
                <p>Tell me the kind of Zimbabwe trip you are imagining.</p>
              </div>
              <div className="homeNyikaBubble user">
                <span>You</span>
                <p>I love wildlife and waterfalls, but I also want a quiet place for photos.</p>
              </div>
              <div className="homeNyikaBubble assistant answer heroNyikaAnswer">
                <span>Nyika AI</span>
                <p>I found places that fit that feeling.</p>
                <img src={demoPlaces[0].image} alt="" />

                <div className="heroChatPlaces" aria-label="Nyika AI matched places">
                  {demoPlaces.map((place) => (
                    <Link className="heroChatPlaceCard" to={`/destinations/${place.slug}`} key={place.slug}>
                      <img src={place.image} alt="" />
                      <div>
                        <strong>{place.name}</strong>
                        <span>{place.score} match</span>
                        <small>{place.match}</small>
                      </div>
                      <MapPin size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="heroSlideMeta">
            <div className="heroSlideCaption">
              <span>{currentSlide.name}</span>
              <p>{currentSlide.line}</p>
            </div>

            <div className="heroSlideDots" aria-label="Featured Zimbabwe places">
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
        </div>
      </div>
    </section>
  );
}
