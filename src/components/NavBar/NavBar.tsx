import { Link, useNavigate } from "react-router-dom";

function NavLinks() {
  return (
    <>
      <li><Link to="/" className="navbar__link">Home</Link></li>
      <li><Link to="/albums" className="navbar__link">Albums</Link></li>
      <li><Link to="/lists" className="navbar__link">Lists</Link></li>
      <li><Link to="/profile" className="navbar__link">Profile</Link></li>
      <li><Link to="/recommend" className="navbar__link navbar__link--primary">AI Recommend</Link></li>
    </>
  );
}

function SearchBar({ className }: { className?: string }) {
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = (new FormData(e.currentTarget).get("q") as string).trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <form className={`navbar__search-bar${className ? ` ${className}` : ""}`} onSubmit={handleSubmit}>
      <input
        type="search"
        name="q"
        placeholder="Search Vinylog..."
        aria-label="Search Vinylog"
        className="navbar__search-input"
      />
    </form>
  );
}

export default function NavBar() {
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">Vinylog</Link>

        <ul className="navbar__menu navbar__menu--desktop">
          <NavLinks />
        </ul>

        <SearchBar className="navbar__search-bar--desktop" />
      </div>
    </nav>
  );
}
