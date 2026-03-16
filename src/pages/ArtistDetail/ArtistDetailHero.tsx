import type { ArtistDetails } from "../../types";

export function ArtistDetailHero({ artist }: { artist: ArtistDetails }) {
  return (
    <div className="artist-details__header">
      <div className="artist-details__side">
        {artist.profile_picture ? (
          <img
            src={artist.profile_picture}
            alt={artist.name}
            className="artist-details__image"
          />
        ) : (
          <div className="artist-details__image-placeholder">
            {artist.name[0]}
          </div>
        )}
      </div>
      <div className="artist-details__info">
        <p className="eyebrow">Artist</p>
        <h1 className="artist-details__title">{artist.name}</h1>
        <div className="artist-details__meta">
          {artist.average_rating != null && (
            <span>★ {artist.average_rating.toFixed(1)} / 5.0</span>
          )}
          {artist.total_reviews > 0 && (
            <span>{artist.total_reviews} reviews</span>
          )}
          <span>{artist.albums.length} albums</span>
        </div>
        {artist.biography && (
          <p className="artist-details__biography">{artist.biography}</p>
        )}
      </div>
    </div>
  );
}
