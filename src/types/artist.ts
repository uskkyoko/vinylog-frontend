import type { AlbumOut } from "./album";

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

export interface ArtistAlbumSummary {
  id: number;
  title: string;
  spotify_id: string;
  cover_url: string | null;
  release_date: string;
  review_count: number;
  average_rating: number | null;
}

export interface ArtistDetails {
  id: number;
  name: string;
  biography: string | null;
  profile_picture: string | null;
  spotify_id: string | null;
  average_rating: number | null;
  total_reviews: number;
  albums: ArtistAlbumSummary[];
}
