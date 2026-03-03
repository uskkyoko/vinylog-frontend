// ─── Search ──────────────────────────────────────────────────────────────────

export interface AlbumSearchResult {
  id: string;
  title: string;
  artist_name: string;
  image: string | null;
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  full_name: string;
  username: string;
  email: string;
  password: string;
  birth_date: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export interface UserUpdate {
  full_name?: string | null;
  biography?: string | null;
  birth_date?: string | null;
  profile_picture?: string | null;
}

export interface AdminUserUpdate extends UserUpdate {
  username?: string | null;
  email?: string | null;
  role?: string | null;
  archived?: boolean | null;
}

export interface UserOut {
  id: number;
  username: string;
  full_name: string;
  biography: string | null;
  birth_date: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string | null;
  favourite_albums: AlbumOut[];
  followers: UserOut[];
  following: UserOut[];
  reviews: ReviewOut[];
  lists: ListOut[];
}

export interface AdminUserOut extends UserOut {
  email: string;
  role: string;
  archived: boolean;
}

// ─── Artists ─────────────────────────────────────────────────────────────────

export interface ArtistCreate {
  name: string;
  biography?: string | null;
  debut_date?: string | null;
  profile_picture?: string | null;
}

export interface ArtistUpdate {
  name?: string | null;
  biography?: string | null;
  debut_date?: string | null;
  profile_picture?: string | null;
}

export interface ArtistOut {
  id: number;
  name: string;
  biography: string | null;
  debut_date: string | null;
  profile_picture: string | null;
  archived: boolean;
  albums: AlbumOut[];
}

// ─── Albums ──────────────────────────────────────────────────────────────────

export interface AlbumCreate {
  spotify_id: string;
  title: string;
  artist: string;
  release_date: string;
  cover_url?: string | null;
}

export interface AlbumUpdate {
  title?: string | null;
  artist?: string | null;
  release_date?: string | null;
  cover_url?: string | null;
}

export interface AlbumOut {
  id: number;
  spotify_id: string;
  title: string;
  release_date: string;
  cover_url: string | null;
  archived: boolean;
  artist: ArtistOut;
  favoured_by_users: UserOut[];
  reviews: ReviewOut[];
}

// ─── Reviews ─────────────────────────────────────────────────────────────────

export interface ReviewCreate {
  album_id: string; // DB integer ID or Spotify ID
  rating: number; // 1–5
  comment?: string | null;
  favorite_song?: string | null;
}

export interface ReviewUpdate {
  rating?: number | null; // 1–5
  comment?: string | null;
  favorite_song?: string | null;
}

export interface ReviewOut {
  id: number;
  rating: number;
  comment: string | null;
  favorite_song: string | null;
  created_at: string;
  updated_at: string | null;
  user: UserOut;
  album: AlbumOut;
}

// ─── Lists ───────────────────────────────────────────────────────────────────

export type ListType = "liked" | "hearlist" | "custom";

export interface ListCreate {
  name: string;
  list_type: ListType;
  description?: string | null;
}

export interface ListUpdate {
  name?: string | null;
  description?: string | null;
  albums?: AlbumOut[] | null;
}

export interface ListOut {
  id: number;
  name: string;
  list_type: ListType;
  description: string | null;
  created_at: string;
  updated_at: string | null;
  archived: boolean;
  albums: AlbumOut[];
  user: UserOut;
}

// ─── Recommendations ─────────────────────────────────────────────────────────

export interface AlbumRecommendation {
  artist_name: string;
  album_title: string;
  reason: string;
}

export interface RecommendRequest {
  user_input?: string | null;
}

export interface RecommendResponse {
  artist_name: string;
  album_title: string;
  reason: string;
  original_prompt: string;
  album_id?: number | null;
  spotify_id?: string | null;
  cover_url?: string | null;
}
