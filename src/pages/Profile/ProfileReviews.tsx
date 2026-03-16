import { useMemo } from "react";
import { ButtonLink } from "../../components/Button";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";
import type { ReviewOut } from "../../types";

export function ProfileReviews({
  reviews,
  username,
  isOwner = true,
}: {
  reviews: ReviewOut[];
  username: string;
  isOwner?: boolean;
}) {
  const displayedReviews = useMemo(
    () => (isOwner ? reviews.slice(0, 3) : reviews),
    [reviews, isOwner],
  );

  return (
    <section className="profile-section">
      <header className="profile-section__header">
        <div>
          <p className="eyebrow">Activity</p>
          <h2 className="profile-section__title">Recent reviews</h2>
        </div>
        {isOwner && (
          <ButtonLink to="/reviews/new" variant="ghost" size="sm">
            Add review
          </ButtonLink>
        )}
      </header>
      <div className="profile-reviews">
        {displayedReviews.length > 0 ? (
          displayedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              username={username}
            />
          ))
        ) : (
          <div className="profile-reviews__empty">
            <p>No reviews yet.</p>
          </div>
        )}
        {isOwner && reviews.length > 3 && (
          <ButtonLink to="/reviews" variant="ghost" size="sm">
            View all {reviews.length} reviews
          </ButtonLink>
        )}
      </div>
    </section>
  );
}
