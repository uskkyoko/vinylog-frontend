import { Link } from "react-router-dom";
import { StatsCard } from "../StatsCard/StatsCard";
import type { UserOut } from "../../types";

export const HomeHero = ({ user }: { user: UserOut | null }) => {
  return (
    <header className="home-hero">
      <div className="container home-hero__grid">
        <div className="home-hero__copy">
          <p className="eyebrow">Collectors unite</p>
          <h1 className="home-hero__title">Spin records. Share stories.</h1>
          <p className="home-hero__lead">
            Catalog collections, follow friends, and discover new pressings
            curated by the Vinylog community.
          </p>

          <div className="home-hero__actions">
            <Link className="btn btn--ghost" to="/albums">
              Browse albums
            </Link>
            <Link className="btn btn--ghost" to="/lists">
              Dig lists
            </Link>
            {user && (
              <Link className="btn btn--ai" to="/recommend">
                AI recommend
              </Link>
            )}
          </div>
        </div>

        <StatsCard user={user} />
      </div>
    </header>
  );
};
