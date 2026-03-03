import { Link } from "react-router-dom";
import "./Profile.css";
import { useUser } from "../../hooks/useUser";
import { useReviews } from "../../hooks/useReviews";

const CURRENT_USERNAME = "uskyoko";

export default function Profile() {
  const { data: user, loading } = useUser(CURRENT_USERNAME);

  const { data: recentReviews } = useReviews(CURRENT_USERNAME);

  if (loading || !user) {
    return (
      <section className="profile">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="profile">
      <div className="container">
        <div className="card profile__header">
          <div className="profile__head-row">
            <div className="profile__identity">
              {user.profile_picture && (
                <img
                  src={user.profile_picture}
                  alt={`${user.username}'s profile picture`}
                  className="profile__avatar"
                />
              )}
              <div className="profile__identity-info">
                <p className="eyebrow">@{user.username}</p>
                <h1 className="profile__name">{user.full_name}</h1>
                {user.biography && (
                  <p className="lead profile__bio">{user.biography}</p>
                )}
              </div>
            </div>
            <div className="profile__actions">
              <Link to="/settings" className="btn btn--ghost">
                Edit Profile
              </Link>
            </div>
          </div>

          <ul className="stats">
            <li>
              <span>{user.followers?.length ?? 0}</span>
              Followers
            </li>
            <li>
              <span>{user.following?.length ?? 0}</span>
              Following
            </li>
          </ul>

          <div className="profile__favorites">
            <div className="profile__favorites-header">
              <p className="eyebrow">Favourites</p>
              {(user.favourite_albums?.length ?? 0) > 0 && (
                <span className="profile__favorites-count">
                  {user.favourite_albums.length} picks
                </span>
              )}
            </div>
            {(user.favourite_albums?.length ?? 0) > 0 ? (
              <div className="profile__favorites-grid">
                {user.favourite_albums.slice(0, 8).map((album) => (
                  <div key={album.id} className="profile__favorite">
                    <img
                      src={album.cover_url ?? ""}
                      alt={album.title}
                      className="profile__favorite-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="profile__favorites-empty">
                Add favourite albums to see art highlights here.
              </p>
            )}
          </div>
        </div>

        <div className="profile__sections">
          <section className="profile-section">
            <header className="profile-section__header">
              <div>
                <p className="eyebrow">Lists Shelf</p>
                <h2 className="profile-section__title">
                  Currently on rotation
                </h2>
              </div>
              <Link to="/lists/new" className="btn btn--ghost btn--sm">
                Add list
              </Link>
            </header>
            <div className="profile-lists">
              {user.lists.length === 0 ? (
                <div className="profile-lists__empty">
                  <p>No lists yet. Start curating!</p>
                </div>
              ) : (
                user.lists.map((list) => (
                  <article key={list.id} className="profile-lists__card">
                    <div>
                      <p className="profile-lists__title">{list.name}</p>
                      {list.description && (
                        <p className="profile-lists__meta">
                          {list.description}
                        </p>
                      )}
                    </div>
                    <Link
                      to={`lists/${list.id}`}
                      className="profile-lists__link"
                    >
                      View
                    </Link>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="profile-section">
            <header className="profile-section__header">
              <div>
                <p className="eyebrow">Activity</p>
                <h2 className="profile-section__title">Recent reviews</h2>
              </div>
              <Link to="/reviews/new" className="btn btn--ghost btn--sm">
                Add review
              </Link>
            </header>
            <div className="profile-reviews">
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <article key={review.id} className="profile-reviews__card">
                    <Link
                      to={`/reviews/${review.id}`}
                      className="profile-reviews__album"
                    >
                      {review.album.cover_url && (
                        <img
                          src={review.album.cover_url}
                          alt={review.album.title}
                        />
                      )}
                    </Link>
                    <div className="profile-reviews__body">
                      <div className="profile-reviews__meta">
                        <p className="profile-reviews__title">
                          {user.username} rated{" "}
                          <strong>{review.album.title}</strong>
                        </p>
                        <span className="profile-reviews__rating">
                          {review.rating} ★
                        </span>
                      </div>
                      <p className="profile-reviews__date">
                        {new Date(review.created_at).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </p>
                      {review.comment && (
                        <p className="profile-reviews__text">
                          "{review.comment}"
                        </p>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <div className="profile-reviews__empty">
                  <p>No reviews yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
