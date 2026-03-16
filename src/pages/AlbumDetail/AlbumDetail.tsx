import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AlbumDetail.css";
import { AppLayout } from "../../components/AppLayout";
import { PageLoading } from "../../components/PageLoading";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../api";
import { AlbumDetailHero } from "./AlbumDetailHero";
import { AlbumDetailReviews } from "./AlbumDetailReviews";
import { AlbumSpotifyEmbed } from "./AlbumSpotifyEmbed";

const isNumericId = (id: string) => /^\d+$/.test(id);

export default function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [resolveError, setResolveError] = useState(false);

  // If the id looks like a spotify_id (non-numeric), resolve it to a DB id first
  useEffect(() => {
    if (!id || isNumericId(id)) return;
    setResolveError(false);
    api
      .getAlbumBySpotifyId(id)
      .then(({ id: numericId }) => navigate(`/albums/${numericId}`, { replace: true }))
      .catch(() => setResolveError(true));
  }, [id, navigate]);

  const numericId = id && isNumericId(id) ? Number(id) : null;

  const {
    data: album,
    loading,
    error,
  } = useFetch(
    () => (numericId != null ? api.getAlbumDetails(numericId) : Promise.resolve(null)),
    null,
    [numericId],
  );

  if (resolveError) {
    return (
      <AppLayout>
        <section className="album-detail">
          <div className="container">
            <p>Album not found.</p>
          </div>
        </section>
      </AppLayout>
    );
  }

  if (loading || numericId == null) return <PageLoading />;

  if (error || !album) {
    return (
      <AppLayout>
        <section className="album-detail">
          <div className="container">
            <p>Album not found.</p>
          </div>
        </section>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <section className="album-detail">
        <div className="container">
          <AlbumDetailHero album={album} />
          {album.spotify_id && <AlbumSpotifyEmbed spotifyId={album.spotify_id} />}
          <AlbumDetailReviews reviews={album.reviews} album={album} />
        </div>
      </section>
    </AppLayout>
  );
}
