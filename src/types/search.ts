export interface SpotifyArtistResult {
  spotify_id: string;
  name: string;
  image_url: string | null;
}

export interface SpotifyAlbumResult {
  spotify_id: string;
  title: string;
  artist_name: string;
  cover_url: string | null;
}

export interface UserSearchResult {
  username: string;
  profile_picture: string | null;
}

export interface ListSearchResult {
  id: number;
  name: string;
  user: { username: string };
}

export interface SearchResults {
  spotify_artists: SpotifyArtistResult[];
  spotify_albums: SpotifyAlbumResult[];
  users: UserSearchResult[];
  lists: ListSearchResult[];
}
