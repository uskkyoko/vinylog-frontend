import { Link } from "react-router-dom";
import type { AlbumOut } from "../../types";

export function ListAlbumItem({ album, index }: { album: AlbumOut; index: number }) {
  return (
    <article className="list-details__item">
      <div className="list-details__item-rank">
        <span className="list-details__item-rank-number">{index + 1}</span>
      </div>
      <Link to={`/albums/${album.spotify_id}`} className="list-details__item-cover-link">
        <img
          src={album.cover_url ?? ""}
          alt={album.title}
          className="list-details__item-cover"
        />
        <div className="list-details__item-overlay">
          <span className="list-details__item-overlay-text">View Album</span>
        </div>
      </Link>
      <div className="list-details__item-info">
        <h3 className="list-details__item-title">
          <Link to={`/albums/${album.spotify_id}`} className="list-details__item-title-link">
            {album.title}
          </Link>
        </h3>
        <p className="list-details__item-artist">{album.artist?.name}</p>
        <p className="list-details__item-year">
          {new Date(album.release_date).getFullYear()}
        </p>
      </div>
    </article>
  );
}
