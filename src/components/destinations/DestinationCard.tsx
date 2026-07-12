import { Link } from "react-router-dom";
import type { Destination } from "../../types/tourism";

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Link
      to={`/destinations/${destination.slug}`}
      className="place"
      style={{ backgroundImage: `url(${destination.image})` }}
    >
      <span className="tag">{destination.category}</span>
      <h3>{destination.name}</h3>
      <p>{destination.description}</p>
    </Link>
  );
}
