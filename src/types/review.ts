import type { UserOut } from "./user";
import type { AlbumOut } from "./album";

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
