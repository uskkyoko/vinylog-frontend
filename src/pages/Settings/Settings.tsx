import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import type { AlbumSearchResult, UserOut } from "../../types";
import { api } from "../../api";
import { useUser } from "../../hooks/useUser";

const CURRENT_USERNAME = "uskyoko";
const MAX_FAVOURITES = 4;

interface FavAlbum {
  spotify_id: string;
  title: string;
  artist_name: string;
  cover_url: string | null;
}

function toFavAlbum(result: AlbumSearchResult): FavAlbum {
  return {
    spotify_id: result.id,
    title: result.title,
    artist_name: result.artist_name,
    cover_url: result.image,
  };
}

function userFavToFavAlbum(
  album: UserOut["favourite_albums"][number],
): FavAlbum {
  return {
    spotify_id: album.spotify_id,
    title: album.title,
    artist_name: album.artist.name,
    cover_url: album.cover_url,
  };
}

export default function Settings() {
  const { data: user, loading } = useUser(CURRENT_USERNAME);

  if (loading || !user) {
    return (
      <section className="settings settings--page">
        <div className="settings__card">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return <SettingsForm user={user} />;
}

function SettingsForm({ user }: { user: UserOut }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(user.full_name);
  const [biography, setBiography] = useState(user.biography ?? "");
  const [birthDate, setBirthDate] = useState(user.birth_date);
  const [fileLabel, setFileLabel] = useState("Upload new picture");
  const [selectedAlbums, setSelectedAlbums] = useState<FavAlbum[]>(
    user.favourite_albums.map(userFavToFavAlbum),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<AlbumSearchResult[]>([]);

  useEffect(() => {
    if (!searchQuery) return;
    api.searchAlbums(searchQuery).then(setSearchResults).catch(console.error);
  }, [searchQuery]);

  function addAlbum(result: AlbumSearchResult) {
    if (selectedAlbums.length >= MAX_FAVOURITES) return;
    if (selectedAlbums.some((a) => a.spotify_id === result.id)) return;
    setSelectedAlbums((prev) => [...prev, toFavAlbum(result)]);
    setSearchQuery("");
    setSearchResults([]);
  }

  function removeAlbum(spotifyId: string) {
    setSelectedAlbums((prev) => prev.filter((a) => a.spotify_id !== spotifyId));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete("favourite_albums");
    selectedAlbums.forEach((a) =>
      formData.append("favourite_albums", a.spotify_id),
    );
    await api.updateUser(formData);
    navigate("/profile");
  }

  const atMax = selectedAlbums.length >= MAX_FAVOURITES;

  return (
    <section className="settings settings--page">
      <div className="settings__card">
        <div className="settings__header">
          <p className="eyebrow">Personalize</p>
          <h1 className="settings__title">User Profile</h1>
        </div>

        <form className="settings__form" onSubmit={handleSubmit}>
          <div className="form-field settings__field">
            <label className="form-field__label" htmlFor="full-name">
              Full Name
            </label>
            <input
              className="form-field__input"
              type="text"
              id="full-name"
              name="full_name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-field settings__field">
            <label className="form-field__label" htmlFor="biography">
              Biography
            </label>
            <textarea
              className="form-field__textarea"
              id="biography"
              name="biography"
              rows={4}
              placeholder="Tell us about yourself..."
              value={biography}
              onChange={(e) => setBiography(e.target.value)}
            />
          </div>

          <div className="form-field settings__field">
            <label className="form-field__label" htmlFor="birth-date">
              Birth Date
            </label>
            <input
              className="form-field__input"
              type="date"
              id="birth-date"
              name="birth_date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div className="form-field settings__field">
            <label className="form-field__label">Profile Picture</label>
            <div className="file-upload-wrapper">
              <input
                type="file"
                id="profile-picture"
                name="profile_picture"
                className="file-upload__input"
                accept="image/*"
                onChange={(e) =>
                  setFileLabel(
                    e.target.files?.[0]?.name ?? "Upload new picture",
                  )
                }
              />
              <label
                htmlFor="profile-picture"
                className={`file-upload__label${fileLabel !== "Upload new picture" ? " has-file" : ""}`}
              >
                <span className="file-upload__text" id="file-name-display">
                  {fileLabel}
                </span>
              </label>
            </div>
          </div>

          <div className="settings__favourites">
            <div className="settings__favourites-header">
              <label className="form-field__label" htmlFor="album-search">
                Favourite Albums (max {MAX_FAVOURITES})
              </label>
              <p className="settings__helper">
                Give a quick shout to the releases you live with.
              </p>
            </div>

            {!atMax && (
              <input
                className="form-field__input"
                type="text"
                id="album-search"
                placeholder="Search albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}

            {atMax && (
              <p className="settings__limit-message">
                Maximum of {MAX_FAVOURITES} favourite albums selected. Remove
                one to search again.
              </p>
            )}

            {searchQuery && searchResults.length > 0 && (
              <div className="settings__results">
                {searchResults.map((result) => (
                  <div key={result.id} className="settings__search-item">
                    {result.image && (
                      <img src={result.image} width={50} alt={result.title} />
                    )}
                    <span className="settings__search-text">
                      {result.title} — {result.artist_name}
                    </span>
                    <button
                      type="button"
                      className="btn btn--ghost btn--sm settings__add"
                      onClick={() => addAlbum(result)}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="settings__selected-list">
              {selectedAlbums.map((album) => (
                <div key={album.spotify_id} className="settings__selected">
                  {album.cover_url && (
                    <img
                      src={album.cover_url}
                      width={40}
                      className="settings__selected-cover"
                      alt={album.title}
                    />
                  )}
                  <span className="settings__selected-title">
                    {album.title} — {album.artist_name}
                  </span>
                  <button
                    type="button"
                    className="settings__remove"
                    aria-label="Remove album"
                    onClick={() => removeAlbum(album.spotify_id)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <hr className="divider" />

          <div className="settings__actions">
            <div>
              <button type="submit" className="btn btn--primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </button>
            </div>
            <button
              type="button"
              className="btn btn--danger"
              onClick={() => navigate("/logout")}
            >
              Log Out
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
