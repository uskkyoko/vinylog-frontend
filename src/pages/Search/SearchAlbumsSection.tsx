import type { SpotifyAlbumResult } from "../../types";
import { SearchResultsSection } from "./SearchResultsSection";

function SearchAlbumCard({ album }: { album: SpotifyAlbumResult }) {
  return (
    <a
      href={`https://open.spotify.com/album/${album.spotify_id}`}
      target="_blank"
      rel="noreferrer"
      className="card-album"
    >
      <div className="card-album__image-wrapper">
        <img
          src={album.cover_url ?? ""}
          alt={album.title}
          className="card-album__image"
        />
      </div>
      <div className="card-album__info">
        <h3 className="card-album__title">{album.title}</h3>
        <p className="card-album__artist">{album.artist_name}</p>
      </div>
    </a>
  );
}

export function SearchAlbumsSection({
  albums,
}: {
  albums: SpotifyAlbumResult[];
}) {
  if (albums.length === 0) return null;
  return (
    <SearchResultsSection title="Albums">
      {albums.map((album) => (
        <SearchAlbumCard key={album.spotify_id} album={album} />
      ))}
    </SearchResultsSection>
  );
}
