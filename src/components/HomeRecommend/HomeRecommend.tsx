import { Link } from "react-router-dom";
import type { UserOut } from "../../types";

export function HomeRecommend({ user }: { user: UserOut | null }) {
  if (!user) return null;

  return (
    <>
      <hr className="divider" />
      <section className="home-recommend">
        <div className="container home-recommend__container">
          <div className="home-recommend__info">
            <p className="eyebrow">Need inspiration?</p>
            <h2 className="home-recommend__title">
              Describe a vibe, get instant AI crate pulls.
            </h2>
            <p className="home-recommend__copy">
              Powered by your prompt plus Spotify previews. Dial in mood-based
              spins for your next listening session.
            </p>
          </div>

          <div className="home-recommend__actions">
            <Link className="btn btn--primary" to="/recommend">
              Open AI Recommend
            </Link>
            <Link className="btn btn--ghost" to="/reviews/new">
              Share a review
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
