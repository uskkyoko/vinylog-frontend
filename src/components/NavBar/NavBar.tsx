import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          Vinylog
        </Link>
        <ul className="navbar__menu">
          <Link to="/" className="navbar__link">
            Home
          </Link>
          <Link to="/albums" className="navbar__link">
            Albums
          </Link>
          <Link to="/lists" className="navbar__link">
            Lists
          </Link>
          <Link to="/profile" className="navbar__link">
            Profile
          </Link>
        </ul>
      </div>
    </nav>
  );
}
