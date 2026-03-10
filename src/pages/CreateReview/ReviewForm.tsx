import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { useAuth } from "../../context/AuthContext";
import { createReview, fetchReviews } from "../../store/reviewsSlice";
import { FormField } from "../../components/FormField";
import { AlbumPickerField } from "../../components/AlbumPickerField/AlbumPickerField";
import { StarRatingField } from "../../components/StarRatingField/StarRatingField";
import { Button } from "../../components/Button";
import { FavouriteTrackField } from "./FavouriteTrackField";
import type { AlbumSearchResult } from "../../types";

interface Props {
  defaultAlbum?: AlbumSearchResult;
}

export function ReviewForm({ defaultAlbum }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [album, setAlbum] = useState<AlbumSearchResult | null>(
    defaultAlbum ?? null,
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [favouriteTrack, setFavouriteTrack] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!album) return setError("Please select an album.");
    if (rating === 0) return setError("Please select a rating.");
    setError(null);
    setLoading(true);
    try {
      await dispatch(
        createReview({
          album_id: album.id,
          rating,
          comment: comment || null,
          favorite_song: favouriteTrack || null,
        }),
      );
      if (user) await dispatch(fetchReviews(user.username));
      navigate("/reviews");
    } catch {
      setError("Could not submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="review-form__form" onSubmit={handleSubmit}>
      <FormField label="Album" htmlFor="album-search" className="review-form__field">
        <AlbumPickerField value={album} onChange={setAlbum} />
      </FormField>

      <FormField label="Rating" htmlFor="rating" className="review-form__field">
        <StarRatingField value={rating} onChange={setRating} />
      </FormField>

      <FormField label="Review" htmlFor="comment" className="review-form__field">
        <textarea
          className="form-field__textarea"
          id="comment"
          rows={5}
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </FormField>

      <FavouriteTrackField
        spotifyId={album?.id ?? null}
        value={favouriteTrack}
        onChange={setFavouriteTrack}
      />

      {error && <p className="auth__error">{error}</p>}

      <div className="review-form__actions">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Submitting…" : "Submit Review"}
        </Button>
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
