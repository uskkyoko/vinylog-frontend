import type { SpotifyArtistResult } from "../../types";
import { SearchResultsSection } from "./SearchResultsSection";

function SearchArtistCard({ artist }: { artist: SpotifyArtistResult }) {
  return (
    <a
      href={`https://open.spotify.com/artist/${artist.spotify_id}`}
      target="_blank"
      rel="noreferrer"
      className="search-results__artist-card"
    >
      {artist.image_url ? (
        <img
          src={artist.image_url}
          alt={artist.name}
          className="search-results__artist-image"
        />
      ) : (
        <div className="search-results__artist-placeholder">
          <span className="search-results__artist-placeholder-text">
            {artist.name[0]}
          </span>
        </div>
      )}
      <h3 className="search-results__artist-name">{artist.name}</h3>
    </a>
  );
}

export function SearchArtistsSection({
  artists,
}: {
  artists: SpotifyArtistResult[];
}) {
  if (artists.length === 0) return null;
  return (
    <SearchResultsSection title="Artists">
      {artists.map((artist) => (
        <SearchArtistCard key={artist.spotify_id} artist={artist} />
      ))}
    </SearchResultsSection>
  );
}
