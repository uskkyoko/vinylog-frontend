import { Link } from "react-router-dom";
import type { UserSearchResult } from "../../types";

function SearchUserCard({ user }: { user: UserSearchResult }) {
  return (
    <Link
      to={`/profile/${user.username}`}
      className="search-results__user-card"
    >
      {user.profile_picture ? (
        <img
          src={user.profile_picture}
          alt={user.username}
          className="search-results__user-avatar"
        />
      ) : (
        <div className="search-results__artist-placeholder">
          <span className="search-results__artist-placeholder-text">
            {user.username[0].toUpperCase()}
          </span>
        </div>
      )}
      <span className="search-results__user-name">{user.username}</span>
    </Link>
  );
}

export function SearchUsersSection({ users }: { users: UserSearchResult[] }) {
  if (users.length === 0) return null;
  return (
    <section className="search-results__section">
      <h2 className="search-results__section-title">Community Members</h2>
      <div className="grid grid--four">
        {users.map((user) => (
          <SearchUserCard key={user.username} user={user} />
        ))}
      </div>
    </section>
  );
}
