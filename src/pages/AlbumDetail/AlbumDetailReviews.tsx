import type { ReviewOut, AlbumOut } from "../../types";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";

export function AlbumDetailReviews({
  reviews,
  album,
}: {
  reviews: ReviewOut[];
  album: AlbumOut;
}) {
  return (
    <section className="album-detail__reviews">
      <h2 className="album-detail__reviews-title">
        Reviews{reviews.length > 0 && ` (${reviews.length})`}
      </h2>
      {reviews.length > 0 ? (
        <div className="album-detail__reviews-list">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              username={review.user.username}
              album={album}
            />
          ))}
        </div>
      ) : (
        <p className="album-detail__reviews-empty">No reviews yet.</p>
      )}
    </section>
  );
}
