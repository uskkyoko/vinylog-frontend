import "./Albums.css";
import { useAlbums, usePopularAlbums } from "../../hooks/useAlbums";
import { AppLayout } from "../../components/AppLayout";
import { PageLoading } from "../../components/PageLoading";
import { AlbumsIntro } from "./AlbumsIntro";
import { AlbumCarousel } from "./AlbumCarousel";

export default function Albums() {
  const { data: allAlbums, loading } = useAlbums();
  const { data: popularAlbums } = usePopularAlbums();

  if (loading || !allAlbums) return <PageLoading />;

  return (
    <AppLayout>
      <section className="albums-page">
        <div className="container">
          <AlbumsIntro />
          <AlbumCarousel title="Popular Albums" albums={popularAlbums} />
          <AlbumCarousel title="All Albums" albums={allAlbums} />
        </div>
      </section>
    </AppLayout>
  );
}
