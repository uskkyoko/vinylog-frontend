import { useState } from "react";
import { Button, ButtonLink } from "../../components/Button";
import type { UserOut, AlbumOut } from "../../types";
import { FollowModal } from "./FollowModal";
import { FavouriteAlbums } from "./FavouriteAlbums";

export function ProfileHeader({
  user,
  favouriteAlbums,
  isOwner = true,
  isFollowing,
  onFollow,
  onUnfollow,
}: {
  user: UserOut;
  favouriteAlbums: AlbumOut[];
  isOwner?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onUnfollow?: () => void;
}) {
  const [openModal, setOpenModal] = useState<"followers" | "following" | null>(
    null,
  );

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
          {isOwner ? (
            <ButtonLink to="/settings" variant="ghost">
              Edit Profile
            </ButtonLink>
          ) : onFollow ? (
            <Button
              variant={isFollowing ? "ghost" : "primary"}
              onClick={isFollowing ? onUnfollow : onFollow}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          ) : null}
        </div>
      </div>

      <ul className="stats">
        <li>
          <button
            className="stats__btn"
            onClick={() => setOpenModal("followers")}
          >
            <span>{user.followers_count ?? 0}</span>
            Followers
          </button>
        </li>
        <li>
          <button
            className="stats__btn"
            onClick={() => setOpenModal("following")}
          >
            <span>{user.following_count ?? 0}</span>
            Following
          </button>
        </li>
      </ul>

      <FavouriteAlbums albums={favouriteAlbums} />

      {openModal && (
        <FollowModal
          username={user.username}
          kind={openModal}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
}
