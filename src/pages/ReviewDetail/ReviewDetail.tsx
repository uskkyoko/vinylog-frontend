import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "../../components/AppLayout";
import { ButtonLink } from "../../components/Button";
import { ReviewDetailCard } from "../../components/ReviewCard/ReviewDetailCard";
import { PageLoading } from "../../components/PageLoading";
import { useAuth } from "../../context/AuthContext";
import { useAppDispatch } from "../../hooks/hooks";
import { deleteReview } from "../../store/reviewsSlice";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../api";
import "../Review.css";

export default function ReviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  const reviewId = Number(id);
  const {
    data: review,
    loading,
    error,
  } = useFetch(() => api.getReview(reviewId), null, [reviewId]);

  async function handleDelete() {
    await dispatch(deleteReview(reviewId));
    navigate("/reviews");
  }

  if (loading) return <PageLoading />;
  if (error || !review) {
    return (
      <AppLayout>
        <section className="review-detail">
          <div className="container">
            <p>Review not found.</p>
          </div>
        </section>
      </AppLayout>
    );
  }

  const isOwner = user?.id === review.user_id;

  return (
    <AppLayout>
      <section className="review-detail">
        <div className="container">
          <header className="profile-section__header">
            <div>
              <p className="eyebrow">Review</p>
              <h1 className="profile-section__title">{review.album.title}</h1>
            </div>
            <ButtonLink to="/reviews" variant="ghost" size="sm">
              All reviews
            </ButtonLink>
          </header>
          <ReviewDetailCard
            review={review}
            isOwner={isOwner}
            onDelete={handleDelete}
          />
        </div>
      </section>
    </AppLayout>
  );
}
