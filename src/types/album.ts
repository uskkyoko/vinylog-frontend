import type { ArtistOut } from "./artist";
import type { UserOut } from "./user";
import type { ReviewOut } from "./review";

export interface TrackOut {
  name: string;
  track_number: number;
}

export interface AlbumSearchResult {
  id: string;
  title: string;
  artist_name: string;
  image: string | null;
}

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
