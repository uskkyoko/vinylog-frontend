import { useMemo } from "react";
import type { AlbumOut } from "../../types";

export function FavouriteAlbums({ albums }: { albums: AlbumOut[] }) {
  const displayAlbums = useMemo(() => albums.slice(0, 4), [albums]);

  return (
    <div className="profile__favorites">
      <div className="profile__favorites-header">
        <p className="eyebrow">Favourites</p>
        {albums.length > 0 && (
          <span className="profile__favorites-count">
            {albums.length} picks
          </span>
        )}
      </div>
      {displayAlbums.length > 0 ? (
        <div className="profile__favorites-grid">
          {displayAlbums.map((album) => (
            <div key={album.id} className="profile__favorite">
              <img
                src={album.cover_url ?? ""}
                alt={album.title}
                className="profile__favorite-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="profile__favorites-empty">
          Add favourite albums to see art highlights here.
        </p>
      )}
    </div>
  );
}
