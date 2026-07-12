import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { destinations } from "../data/destinations";
import type { Destination } from "../types/tourism";
import type { FormEvent } from "react";

interface TravellerComment {
  id: string;
  name: string;
  origin: string;
  text: string;
  date: string;
}

const COMMENT_STORAGE_PREFIX = "juptha.destinationComments.";

function getSeedComments(destination: Destination): TravellerComment[] {
  const text = [
    destination.name,
    destination.category,
    destination.description,
    ...destination.highlights,
    ...destination.bestFor
  ].join(" ").toLowerCase();

  if (text.includes("falls") || text.includes("waterfall") || text.includes("zambezi")) {
    return [
      {
        id: "seed-water-1",
        name: "Tariro M.",
        origin: "Harare",
        text: "The mist and the sound of the water made the whole trip feel special. I would tell anyone to carry comfortable shoes and leave time for photos.",
        date: "Visited in June"
      },
      {
        id: "seed-water-2",
        name: "Amelia R.",
        origin: "United Kingdom",
        text: "It was easy to build a full day here because there is always another viewpoint, activity or quiet place to enjoy the scenery.",
        date: "Family trip"
      }
    ];
  }

  if (text.includes("wildlife") || text.includes("safari") || text.includes("elephant") || text.includes("rhino")) {
    return [
      {
        id: "seed-wildlife-1",
        name: "Kudzai N.",
        origin: "Bulawayo",
        text: "The wildlife experience felt peaceful and real. Going early made a big difference because the animals were more active.",
        date: "Weekend visit"
      },
      {
        id: "seed-wildlife-2",
        name: "Daniel P.",
        origin: "South Africa",
        text: "A guide helped us understand what we were seeing, not just take pictures. That made the place more meaningful.",
        date: "Group tour"
      }
    ];
  }

  if (text.includes("heritage") || text.includes("culture") || text.includes("ruins") || text.includes("history") || text.includes("rock art")) {
    return [
      {
        id: "seed-culture-1",
        name: "Rudo C.",
        origin: "Masvingo",
        text: "This place makes you feel connected to Zimbabwe's story. It is worth taking your time and listening to the history.",
        date: "Heritage visit"
      },
      {
        id: "seed-culture-2",
        name: "Michael S.",
        origin: "Germany",
        text: "The experience was more powerful than we expected. The architecture, views and stories made it feel alive.",
        date: "Cultural trip"
      }
    ];
  }

  return [
    {
      id: "seed-general-1",
      name: "Nyasha D.",
      origin: "Zimbabwe",
      text: "A beautiful place to slow down and enjoy Zimbabwe properly. The kind of trip that stays in your memory.",
      date: "Recent visit"
    },
    {
      id: "seed-general-2",
      name: "Sarah K.",
      origin: "Australia",
      text: "We found more to do than we expected. It helped to plan the day around the main highlights and leave space to relax.",
      date: "Holiday stop"
    }
  ];
}

export function DestinationDetailsPage() {
  const { slug } = useParams();
  const destination = destinations.find((item) => item.slug === slug);
  const [travellerName, setTravellerName] = useState("");
  const [travellerComment, setTravellerComment] = useState("");
  const [savedComments, setSavedComments] = useState<TravellerComment[]>([]);
  const plannerState = destination
    ? { heroQuery: `Plan 3 days in ${destination.name} for 2 people`, generateFromHero: true }
    : undefined;
  const seedComments = useMemo(() => (destination ? getSeedComments(destination) : []), [destination]);
  const allComments = [...savedComments, ...seedComments];

  useEffect(() => {
    if (!destination) return;

    const storedComments = JSON.parse(
      localStorage.getItem(`${COMMENT_STORAGE_PREFIX}${destination.slug}`) ?? "[]"
    ) as TravellerComment[];

    setSavedComments(storedComments);
  }, [destination]);

  function handleCommentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!destination || !travellerComment.trim()) return;

    const comment: TravellerComment = {
      id: `comment-${Date.now()}`,
      name: travellerName.trim() || "Traveller",
      origin: "Shared in app",
      text: travellerComment.trim(),
      date: "Just now"
    };
    const nextComments = [comment, ...savedComments];

    localStorage.setItem(`${COMMENT_STORAGE_PREFIX}${destination.slug}`, JSON.stringify(nextComments));
    setSavedComments(nextComments);
    setTravellerName("");
    setTravellerComment("");
  }

  function handleCommentDelete(commentId: string) {
    if (!destination) return;

    const nextComments = savedComments.filter((comment) => comment.id !== commentId);
    localStorage.setItem(`${COMMENT_STORAGE_PREFIX}${destination.slug}`, JSON.stringify(nextComments));
    setSavedComments(nextComments);
  }

  if (!destination) {
    return (
      <section className="section pageTop">
        <div className="container">
          <h1>Destination not found</h1>
          <Link className="button" to="/destinations">Back to destinations</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section pageTop">
      <div className="container">
        <div className="detailsGrid">
          <div className="destinationInfoPanel">
            <span className="pill">{destination.category}</span>
            <h1 className="destinationTitle">{destination.name}</h1>
            <p className="destinationDescription">{destination.description}</p>

            <div className="destinationMetaGrid">
              <p><b>Region</b><span>{destination.region}</span></p>
              <p><b>Estimated fee</b><span>{destination.estimatedEntryFee}</span></p>
            </div>

            <div className="destinationChipSection">
              <h3>Highlights</h3>
              <ul className="chipList destinationChipList">
                {destination.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="destinationChipSection">
              <h3>Best for</h3>
              <ul className="chipList destinationChipList">
                {destination.bestFor.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <Link className="button" to="/planner" state={plannerState}>Plan a trip here</Link>
          </div>

          <img className="detailImage" src={destination.image} alt={destination.name} />
        </div>

        {destination.activities && (
          <div className="activityShowcase">
            <div className="sectionHeaderRow">
              <div>
                <span className="pill">Activities</span>
                <h2>What you can experience here</h2>
                <p className="lead">A visual guide to help visitors understand the trip before they calculate the budget.</p>
              </div>
              <Link className="button secondary smallButton" to="/planner" state={plannerState}>Calculate</Link>
            </div>

            <div className="activityGrid">
              {destination.activities.map((activity) => (
                <article className="activityCard" key={activity.title}>
                  <img src={activity.image} alt={activity.title} />
                  <div>
                    <h3>{activity.title}</h3>
                    <p>{activity.description}</p>
                    <small>{activity.note}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {destination.wildlifeStory && (
          <section className="wildlifeStory">
            <div className="wildlifeStoryImage">
              <img src={destination.wildlifeStory.image} alt="" />
              <small>{destination.wildlifeStory.imageNote}</small>
            </div>
            <div className="wildlifeStoryCopy">
              <span className="pill">{destination.wildlifeStory.eyebrow}</span>
              <h2>{destination.wildlifeStory.title}</h2>
              <p className="wildlifeStoryLead">{destination.wildlifeStory.summary}</p>
              <div className="wildlifeStoryBody">
                {destination.wildlifeStory.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <small className="wildlifeStorySource">
                Story sources: {destination.wildlifeStory.sourceName}. Rewritten for Explore Zimbabwe.
              </small>
              <div className="wildlifeStoryActions">
                <Link className="button" to="/planner" state={plannerState}>Plan a visit</Link>
              </div>
            </div>
          </section>
        )}

        <section className="travellerVoices">
          <div className="sectionHeaderRow">
            <div>
              <span className="pill">Traveller voices</span>
              <h2>What others say about this place</h2>
              <p className="lead">Short notes from travellers help visitors feel the place before they plan the budget.</p>
            </div>
          </div>

          <div className="travellerVoiceGrid">
            {allComments.slice(0, 4).map((comment) => {
              const canRemove = savedComments.some((savedComment) => savedComment.id === comment.id);

              return (
                <article className="travellerVoiceCard" key={comment.id}>
                  <p>"{comment.text}"</p>
                  <div>
                    <b>{comment.name}</b>
                    <span>{comment.origin} - {comment.date}</span>
                    {canRemove && (
                      <button
                        className="commentRemoveButton"
                        type="button"
                        onClick={() => handleCommentDelete(comment.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <form className="travellerCommentForm" onSubmit={handleCommentSubmit}>
            <div>
              <h3>Leave your own note</h3>
              <p>Share a short memory, helpful tip or feeling that can encourage the next traveller.</p>
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={travellerName}
              onChange={(event) => setTravellerName(event.target.value)}
            />
            <textarea
              placeholder={`What did you enjoy about ${destination.name}?`}
              value={travellerComment}
              onChange={(event) => setTravellerComment(event.target.value)}
              rows={4}
            />
            <button className="button" type="submit">Add comment</button>
          </form>
        </section>
      </div>
    </section>
  );
}
