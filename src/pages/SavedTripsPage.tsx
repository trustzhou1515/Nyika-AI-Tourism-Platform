import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { SectionHeader } from "../components/common/SectionHeader";
import { destinations } from "../data/destinations";
import type { ItineraryPlan } from "../types/tourism";

interface TravelHistoryEntry {
  id: string;
  place: string;
  visitedOn: string;
  experience: string;
  photo?: string;
  photoName?: string;
  createdAt: string;
}

const HISTORY_STORAGE_KEY = "juptha.travelHistory";
const SAVED_TRIPS_STORAGE_KEY = "juptha.savedTrips";
const exampleMemories = [
  {
    id: "example-victoria-falls",
    place: "Victoria Falls",
    date: "12 Aug 2025",
    photo: "/images/memory-victoria-falls-family.png",
    experience: "We had such a good time at Victoria Falls as a family. The mist, the sound of the water, and the photos we took together made the whole day feel special. Me and my siblings kept laughing because everywhere we stood, the spray from the Falls reached us."
  },
  {
    id: "example-kariba",
    place: "Lake Kariba",
    date: "18 Sep 2025",
    photo: "/images/memory-kariba-family.png",
    experience: "Kariba gave us one of those quiet family moments we will always remember. We sat by the water, watched the sunset, talked, took pictures, and just enjoyed being together. It felt peaceful, warm, and beautiful."
  },
  {
    id: "example-great-zimbabwe",
    place: "Great Zimbabwe",
    date: "04 Oct 2025",
    photo: "/images/memory-great-zimbabwe-solo-woman.png",
    experience: "I visited Great Zimbabwe on my own and it was such a beautiful experience. I walked through the stone ruins, took photos, learned more about the history, and felt proud seeing how much culture and heritage Zimbabwe carries."
  }
];

export function SavedTripsPage() {
  const [savedTrips, setSavedTrips] = useState<ItineraryPlan[]>([]);
  const [historyEntries, setHistoryEntries] = useState<TravelHistoryEntry[]>([]);
  const [place, setPlace] = useState(destinations[0].name);
  const [customPlace, setCustomPlace] = useState("");
  const [visitedOn, setVisitedOn] = useState("");
  const [experience, setExperience] = useState("");
  const [memoryPhoto, setMemoryPhoto] = useState("");
  const [memoryPhotoName, setMemoryPhotoName] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem(SAVED_TRIPS_STORAGE_KEY) ?? "[]") as ItineraryPlan[];
    const entries = JSON.parse(localStorage.getItem(HISTORY_STORAGE_KEY) ?? "[]") as TravelHistoryEntry[];
    setSavedTrips(trips);
    setHistoryEntries(entries);
  }, []);

  useEffect(() => {
    const targetMemory = new URLSearchParams(window.location.search).get("memory");
    if (!targetMemory) return;

    window.requestAnimationFrame(() => {
      document.getElementById(`memory-${targetMemory}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [historyEntries.length]);

  function saveHistoryEntries(nextEntries: TravelHistoryEntry[]) {
    setHistoryEntries(nextEntries);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextEntries));
  }

  function handleAddEntry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const entryPlace = place === "Other" ? customPlace.trim() : place;
    if (!entryPlace || !experience.trim()) {
      setFormMessage("Please add the place and the memory you want to keep.");
      return;
    }

    const nextEntry: TravelHistoryEntry = {
      id: `${Date.now()}`,
      place: entryPlace,
      visitedOn,
      experience: experience.trim(),
      photo: memoryPhoto || undefined,
      photoName: memoryPhotoName || undefined,
      createdAt: new Date().toISOString()
    };

    saveHistoryEntries([nextEntry, ...historyEntries]);
    setCustomPlace("");
    setExperience("");
    setVisitedOn("");
    setMemoryPhoto("");
    setMemoryPhotoName("");
    setFormMessage("Memory saved.");
  }

  function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormMessage("Please choose an image file for the memory photo.");
      return;
    }

    if (file.size > 1_500_000) {
      setFormMessage("Please choose a smaller photo for this memory preview.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setMemoryPhoto(String(reader.result));
      setMemoryPhotoName(file.name);
      setFormMessage("Photo ready for this memory.");
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setMemoryPhoto("");
    setMemoryPhotoName("");
  }

  function deleteHistoryEntry(id: string) {
    saveHistoryEntries(historyEntries.filter((entry) => entry.id !== id));
  }

  function clearHistory() {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    setHistoryEntries([]);
    setFormMessage("");
  }

  function clearTrips() {
    localStorage.removeItem(SAVED_TRIPS_STORAGE_KEY);
    setSavedTrips([]);
  }

  async function shareMemory(memoryId: string, title: string) {
    const shareUrl = `${window.location.origin}/saved-trips?memory=${encodeURIComponent(memoryId)}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${title} memory`,
          text: `View this Zimbabwe travel memory: ${title}`,
          url: shareUrl
        });
        setShareMessage("Memory link ready to share.");
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("Memory link copied.");
    } catch {
      setShareMessage(`Memory link: ${shareUrl}`);
    }
  }

  return (
    <section className="section pageTop">
      <div className="container">
        <SectionHeader
          eyebrow="Saved"
          title="Memories and saved plans"
          description="Keep the moments, places and feelings from your Zimbabwe journey, plus the plans saved on this device."
        />

        <div className="savedJournalGrid mtLarge">
          <form className="panel travelNoteForm" onSubmit={handleAddEntry}>
            <span className="pill">Memories</span>
            <h2 className="mt">Add a memory</h2>
            <p className="muted">Write where you went, what you saw, and the feeling you want to remember.</p>

            <label>
              Place visited
              <select value={place} onChange={(event) => setPlace(event.target.value)}>
                {destinations.map((destination) => (
                  <option key={destination.slug} value={destination.name}>{destination.name}</option>
                ))}
                <option value="Other">Other place</option>
              </select>
            </label>

            {place === "Other" && (
              <label>
                Place name
                <input
                  value={customPlace}
                  onChange={(event) => setCustomPlace(event.target.value)}
                  placeholder="Example: Domboshava Caves"
                />
              </label>
            )}

            <label>
              Date visited
              <input type="date" value={visitedOn} onChange={(event) => setVisitedOn(event.target.value)} />
            </label>

            <label>
              Memory
              <textarea
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                rows={5}
                placeholder="Example: We walked near the Falls, saw the mist, took photos and had lunch in town."
              />
            </label>

            <label className="premiumMemoryUpload">
              <span>
                Memory photo
                <b>Premium</b>
              </span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} />
            </label>

            {memoryPhoto && (
              <div className="memoryPhotoPreview">
                <img src={memoryPhoto} alt="Selected memory" />
                <div>
                  <strong>{memoryPhotoName}</strong>
                  <button className="inlineAction" type="button" onClick={removePhoto}>Remove photo</button>
                </div>
              </div>
            )}

            <button className="button" type="submit">Save memory</button>
            {formMessage && <p className="muted successText">{formMessage}</p>}
          </form>

          <div className="panel">
            <div className="resultHeader">
              <div>
                <span className="pill">{historyEntries.length} memories</span>
                <h2 className="mt">Your memories so far</h2>
              </div>
              {historyEntries.length > 0 && (
                <button className="button secondary smallButton" type="button" onClick={clearHistory}>
                  Clear memories
                </button>
              )}
            </div>
            {shareMessage && <p className="shareStatus">{shareMessage}</p>}

            {historyEntries.length === 0 ? (
              <div className="travelHistoryList">
                {exampleMemories.map((memory) => (
                  <article className="travelHistoryCard exampleMemoryCard" id={`memory-${memory.id}`} key={memory.place}>
                    <img className="memoryPhoto" src={memory.photo} alt={`${memory.place} example memory`} />
                    <div>
                      <span>{memory.date} · Example memory</span>
                      <h3>{memory.place}</h3>
                    </div>
                    <p>{memory.experience}</p>
                    <button className="inlineAction" type="button" onClick={() => shareMemory(memory.id, memory.place)}>
                      Share link
                    </button>
                    <small>This is only a placeholder. Your own memories will appear here after you save them.</small>
                  </article>
                ))}
              </div>
            ) : (
              <div className="travelHistoryList">
                {historyEntries.map((entry) => (
                  <article className="travelHistoryCard" id={`memory-${entry.id}`} key={entry.id}>
                    {entry.photo && <img className="memoryPhoto" src={entry.photo} alt={`${entry.place} memory`} />}
                    <div>
                      <span>{entry.visitedOn || "Date not added"}</span>
                      <h3>{entry.place}</h3>
                    </div>
                    <p>{entry.experience}</p>
                    <button className="inlineAction" type="button" onClick={() => shareMemory(entry.id, entry.place)}>
                      Share link
                    </button>
                    <button className="inlineAction" type="button" onClick={() => deleteHistoryEntry(entry.id)}>
                      Remove
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="savedTripsHeader mtLarge">
          <div>
            <span className="pill">Saved plans</span>
            <h2 className="mt">Generated trips</h2>
          </div>
          {savedTrips.length > 0 && (
            <button className="button secondary smallButton" type="button" onClick={clearTrips}>
              Clear saved trips
            </button>
          )}
        </div>

        {savedTrips.length === 0 ? (
          <div className="panel mtLarge">
            <h3>No saved trips yet</h3>
            <p className="muted">Generate a travel plan, save it, then return here to compare options.</p>
            <Link className="button mtLarge" to="/planner">Open planner</Link>
          </div>
        ) : (
          <div className="grid3 mtLarge">
            {savedTrips.map((trip) => (
              <article className="card savedTripCard" key={trip.generatedAt}>
                <span className="pill">{trip.style}</span>
                <h3>{trip.title}</h3>
                <p>{trip.summary}</p>
                <div className="savedTripMeta">
                  <span>{trip.totalBudget}</span>
                  <span>{trip.daysCount} days</span>
                  <span>{trip.destination}</span>
                </div>
                <strong>Top warning</strong>
                <p>{trip.smartWarnings[0]}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
