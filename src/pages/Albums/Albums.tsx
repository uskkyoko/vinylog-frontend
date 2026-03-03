import { useRef } from "react";
import { Link } from "react-router-dom";
import "./Albums.css";
import type { AlbumOut } from "../../types";
import { useAlbums, usePopularAlbums } from "../../hooks/useAlbums";

function AlbumCard({ album }: { album: AlbumOut }) {
  return (
    <article className="album-card">
      <div className="album-card__image">
        <img
          src={album.cover_url ?? ""}
          alt={album.title}
          className="album-card__cover"
        />
      </div>
      <div className="album-card__info">
        <p className="album-card__artist">{album.artist.name}</p>
        <h3 className="album-card__title">{album.title}</h3>
        <Link
          to={`/albums/${album.id}`}
          className="album-card__cta"
          aria-label={`View ${album.title}`}
        />
      </div>
    </article>
  );
}

function AlbumCarousel({
  title,
  albums,
}: {
  title: string;
  albums: AlbumOut[];
}) {
  const viewportRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "prev" | "next") {
    if (!viewportRef.current) return;
    const amount = viewportRef.current.clientWidth * (dir === "next" ? 1 : -1);
    viewportRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="albums-page__section">
      <div className="albums-page__section-header">
        <h2 className="albums-page__section-title">{title}</h2>
        <div className="albums-carousel__controls">
          <button
            className="albums-carousel__control"
            type="button"
            onClick={() => scroll("prev")}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            className="albums-carousel__control"
            type="button"
            onClick={() => scroll("next")}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>
      <div className="albums-carousel">
        <div className="albums-carousel__viewport" ref={viewportRef}>
          <div className="albums-carousel__track">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Albums() {
  const { data: allAlbums, loading } = useAlbums();
  const { data: popularAlbums } = usePopularAlbums();

  if (loading || !allAlbums) {
    return (
      <section className="profile">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="albums-page">
      <div className="container">
        <header className="albums-page__intro">
          <p className="eyebrow">Dig in</p>
          <h1 className="albums-page__title">Discover Music</h1>
          <p className="albums-page__subtitle">
            Fresh spins, trusted favourites, and what your circle is loving.
          </p>
        </header>

        <AlbumCarousel title="Popular Albums" albums={popularAlbums} />
        <AlbumCarousel title="All Albums" albums={allAlbums} />
      </div>
    </section>
  );
}
