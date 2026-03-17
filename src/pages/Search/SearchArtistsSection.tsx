import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SpotifyArtistResult } from "../../types";
import { api } from "../../api";
import { SearchResultsSection } from "./SearchResultsSection";

function SearchArtistCard({ artist }: { artist: SpotifyArtistResult }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      const result = await api.getSpotifyArtist(artist.spotify_id);
      const data = result as { id: number };
      navigate(`/artists/${data.id}`);
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className="search-results__artist-card"
      onClick={handleClick}
      disabled={loading}
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
    </button>
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
