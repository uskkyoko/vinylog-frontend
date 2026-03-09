import { Link } from "react-router-dom";
import type { ReviewOut, AlbumOut } from "../../types";

export function ReviewCard({
  review,
  username,
  album,
}: {
  review: ReviewOut;
  username: string;
  album?: AlbumOut;
}) {
  const displayAlbum = album || review.album;
  return (
    <article className="profile-reviews__card">
      <Link to={`/reviews/${review.id}`} className="profile-reviews__album">
        {displayAlbum.cover_url && (
          <img src={displayAlbum.cover_url} alt={displayAlbum.title} />
        )}
      </Link>
      <div className="profile-reviews__body">
        <div className="profile-reviews__meta">
          <p className="profile-reviews__title">
            {username} rated <strong>{displayAlbum.title}</strong>
          </p>
          <span className="profile-reviews__rating">{review.rating} ★</span>
        </div>
        <p className="profile-reviews__date">
          {new Date(review.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        {review.comment && (
          <p className="profile-reviews__text">"{review.comment}"</p>
        )}
      </div>
    </article>
  );
}
