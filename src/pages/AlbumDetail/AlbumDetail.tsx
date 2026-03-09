import { useParams } from "react-router-dom";
import "./AlbumDetail.css";
import { AppLayout } from "../../components/AppLayout";
import { PageLoading } from "../../components/PageLoading";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../api";
import { AlbumDetailHero } from "./AlbumDetailHero";
import { AlbumDetailReviews } from "./AlbumDetailReviews";

export default function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);

  const {
    data: album,
    loading,
    error,
  } = useFetch(
    //fix needed
    () => api.getAlbumDetails(albumId),
    null,
    [albumId],
  );

  if (loading) return <PageLoading />;
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
          <AlbumDetailReviews reviews={album.reviews} album={album} />
        </div>
      </section>
    </AppLayout>
  );
}
