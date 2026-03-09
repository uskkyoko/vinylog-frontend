import { useSearchParams } from "react-router-dom";
import { AppLayout } from "../../components/AppLayout";
import { ReviewForm } from "./ReviewForm";

export default function CreateReview() {
  const [searchParams] = useSearchParams();

  // Support pre-filling from album detail: /reviews/new?album_id=...&album_title=...&artist=...&image=...
  const prefillId = searchParams.get("album_id");
  const prefillTitle = searchParams.get("album_title");
  const prefillArtist = searchParams.get("artist");
  const prefillImage = searchParams.get("image");

  const defaultAlbum =
    prefillId && prefillTitle && prefillArtist
      ? {
          id: prefillId,
          title: prefillTitle,
          artist_name: prefillArtist,
          image: prefillImage,
        }
      : undefined;

  return (
    <AppLayout>
      <section className="review-form review-form--page">
        <div className="review-form__card">
          <div className="review-form__header">
            <p className="eyebrow">Share your thoughts</p>
            <h1 className="review-form__title">Create a Review</h1>
          </div>
          <ReviewForm defaultAlbum={defaultAlbum} />
        </div>
      </section>
    </AppLayout>
  );
}
