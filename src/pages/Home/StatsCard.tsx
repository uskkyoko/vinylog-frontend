import { ButtonLink } from "../../components/Button";
import { useAppSelector } from "../../hooks/hooks";

export function GuestCard() {
  return (
    <div className="home-hero__card home-hero__card--guest">
      <p className="eyebrow">Welcome to Vinylog</p>
      <h3 className="card-title">Join the community</h3>
      <p className="card-text">
        Start logging your collection and sharing reviews today.
      </p>
      <ButtonLink variant="primary" to="/signup" className="home-hero__cta">
        Start tracking
      </ButtonLink>
    </div>
  );
}

export function StatsCard() {
  const lists = useAppSelector((state) => state.lists.items);
  const reviews = useAppSelector((state) => state.reviews.items);
  const favouriteAlbums = useAppSelector((state) => state.users.favouriteAlbums);

  return (
    <div className="home-hero__card">
      <p className="eyebrow">Quick stats</p>
      <ul className="home-hero__stats">
        <li>
          <span className="stat-number">{reviews.length}</span>
          Albums Logged
        </li>
        <li>
          <span className="stat-number">{favouriteAlbums.length}</span>
          Favorite Albums
        </li>
        <li>
          <span className="stat-number">{lists.length}</span>
          Your Lists
        </li>
      </ul>
      <ButtonLink
        variant="primary"
        to="/reviews/new"
        className="home-hero__cta"
      >
        Log a new review
      </ButtonLink>
    </div>
  );
}
