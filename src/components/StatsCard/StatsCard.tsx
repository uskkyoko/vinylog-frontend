import { Link } from "react-router-dom";
import type { UserOut } from "../../types";

export const StatsCard = ({ user }: { user: UserOut | null }) => {
  if (!user) {
    return (
      <div className="home-hero__card home-hero__card--guest">
        <p className="eyebrow">Welcome to Vinylog</p>
        <h3 className="card-title">Join the community</h3>
        <p className="card-text">
          Start logging your collection and sharing reviews today.
        </p>
        <Link className="btn btn--primary home-hero__cta" to="/signup">
          Start tracking
        </Link>
      </div>
    );
  }

  return (
    <div className="home-hero__card">
      <p className="eyebrow">Quick stats</p>
      <ul className="home-hero__stats">
        <li>
          <span className="stat-number">{user.reviews?.length ?? 0}</span>
          Albums Logged
        </li>
        <li>
          <span className="stat-number">
            {user.favourite_albums?.length ?? 0}
          </span>
          Favorite Albums
        </li>
        <li>
          <span className="stat-number">{user.lists?.length ?? 0}</span>
          Your Lists
        </li>
      </ul>
      <Link className="btn btn--primary home-hero__cta" to="/reviews/new">
        Log a new review
      </Link>
    </div>
  );
};
