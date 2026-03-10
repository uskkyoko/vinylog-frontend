import { AppLayout } from "../../components/AppLayout";
import { ButtonLink } from "../../components/Button";
import { ReviewCard } from "../../components/ReviewCard/ReviewCard";
import { useAuth } from "../../context/AuthContext";
import { useAppSelector } from "../../hooks/hooks";
import type { ReviewOut } from "../../types";
import "../Profile/Profile.css";

function ReviewsHeader() {
  return (
    <header className="profile-section__header">
      <div>
        <p className="eyebrow">Activity</p>
        <h1 className="profile-section__title">All Reviews</h1>
      </div>
      <ButtonLink to="/profile" variant="ghost" size="sm">
        Back to profile
      </ButtonLink>
    </header>
  );
}

function ReviewsList({ reviews, username }: { reviews: ReviewOut[]; username: string }) {
  return (
    <div className="profile-reviews">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} username={username} />
        ))
      ) : (
        <div className="profile-reviews__empty">
          <p>No reviews yet.</p>
        </div>
      )}
    </div>
  );
}

export default function Reviews() {
  const { user } = useAuth();
  const reviews = useAppSelector((state) => state.reviews.items);

  if (!user) return null;

  return (
    <AppLayout>
      <section className="profile">
        <div className="container">
          <ReviewsHeader />
          <ReviewsList reviews={reviews} username={user.username} />
        </div>
      </section>
    </AppLayout>
  );
}
