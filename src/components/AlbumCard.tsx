import { Link } from "react-router-dom";
import type { AlbumOut } from "../types";

export function AlbumCard({ album }: { album: AlbumOut }) {
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
