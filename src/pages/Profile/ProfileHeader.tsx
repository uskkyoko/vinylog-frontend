import { useMemo } from "react";
import { ButtonLink } from "../../components/Button";
import type { UserOut, AlbumOut } from "../../types";

export function ProfileHeader({
  user,
  favouriteAlbums,
}: {
  user: UserOut;
  favouriteAlbums: AlbumOut[];
}) {
  return (
    <div className="card profile__header">
      <div className="profile__head-row">
        <div className="profile__identity">
          {user.profile_picture && (
            <img
              src={user.profile_picture}
              alt={`${user.username}'s profile picture`}
              className="profile__avatar"
            />
          )}
          <div className="profile__identity-info">
            <p className="eyebrow">@{user.username}</p>
            <h1 className="profile__name">{user.full_name}</h1>
            {user.biography && (
              <p className="lead profile__bio">{user.biography}</p>
            )}
          </div>
        </div>
        <div className="profile__actions">
          <ButtonLink to="/settings" variant="ghost">
            Edit Profile
          </ButtonLink>
        </div>
      </div>

      <FavouriteAlbums albums={favouriteAlbums} />
    </div>
  );
}

function FavouriteAlbums({ albums }: { albums: AlbumOut[] }) {
  const displayAlbums = useMemo(() => albums.slice(0, 8), [albums]);

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
