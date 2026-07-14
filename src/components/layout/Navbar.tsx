import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";

export function Navbar() {
  return (
    <header className="appBar">
      <div className="appBarInner">
        <button className="iconButton" aria-label="Open menu">
          <Menu size={20} />
        </button>

        <div className="appTitle">
          <strong>Explore Zimbabwe</strong>
        </div>

        <Link className="iconButton" to="/login" aria-label="Profile and login">
          <User size={20} />
        </Link>
      </div>
    </header>
  );
}
