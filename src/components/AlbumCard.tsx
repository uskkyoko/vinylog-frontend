import { Link } from "react-router-dom";
import type { AlbumCardData } from "../types";

export function AlbumCard({ album }: { album: AlbumCardData }) {
  const artistName = album.artist?.name ?? album.artist_name;
  const to = `/albums/${album.spotify_id ?? album.id}`;

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
        <p className="album-card__artist">{artistName}</p>
        <h3 className="album-card__title">{album.title}</h3>
        <Link
          to={to}
          className="album-card__cta"
          aria-label={`View ${album.title}`}
        />
      </div>
    </article>
  );
}
