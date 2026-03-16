import { useParams } from "react-router-dom";
import { AppLayout } from "../../components/AppLayout";
import { useAppSelector } from "../../hooks/hooks";
import { ReviewForm } from "../CreateReview/ReviewForm";
import "../Reviews/Review.css";

export default function EditReview() {
  const { id } = useParams<{ id: string }>();
  const reviewId = Number(id);

  const review = useAppSelector((state) =>
    state.reviews.items.find((r) => r.id === reviewId),
  );

  if (!review) {
    return (
      <AppLayout>
        <section className="review-form review-form--page">
          <div className="review-form__card">
            <p>Review not found.</p>
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <section className="review-form review-form--page">
        <div className="review-form__card">
          <div className="review-form__header">
            <p className="eyebrow">Update your thoughts</p>
            <h1 className="review-form__title">Edit Review</h1>
          </div>
          <ReviewForm review={review} />
        </div>
      </section>
    </AppLayout>
  );
}
