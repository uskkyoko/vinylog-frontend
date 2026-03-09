import type { SpotifyAlbumResult } from "../../types";

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
    <section className="search-results__section">
      <h2 className="search-results__section-title">Albums</h2>
      <div className="grid grid--four">
        {albums.map((album) => (
          <SearchAlbumCard key={album.spotify_id} album={album} />
        ))}
      </div>
    </section>
  );
}
