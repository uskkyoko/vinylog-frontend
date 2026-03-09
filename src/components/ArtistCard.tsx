import { Link } from "react-router-dom";
import type { ArtistOut } from "../types";

export function ArtistCard({ artist }: { artist: ArtistOut }) {
  const albumCount = artist.albums?.length ?? 0;

  return (
    <article className="artist-card">
      <Link to={`/artists/${artist.id}`} className="artist-card__link">
        <div className="artist-card__image">
          {artist.profile_picture ? (
            <img
              src={artist.profile_picture}
              alt={artist.name}
              className="artist-card__photo"
            />
          ) : (
            <div className="artist-card__placeholder">
              <span>{artist.name[0]}</span>
            </div>
          )}
        </div>

        <div className="artist-card__info">
          <h3 className="artist-card__name">{artist.name}</h3>

          <div className="artist-card__meta">
            {albumCount > 0 && (
              <span className="badge">
                {albumCount} album{albumCount !== 1 ? "s" : ""}
              </span>
            )}
            {artist.debut_date && (
              <span className="badge">Debut {artist.debut_date}</span>
            )}
          </div>

          {artist.biography && (
            <p className="artist-card__bio">{artist.biography}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
